"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth/session";
import { deleteCloudinaryImage, uploadPackageImage } from "@/lib/cloudinary";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { MAX_PACKAGE_IMAGES } from "@/lib/packages";
import { adminAr } from "@/data/admin-ar";
import type { PackageFormData, PriceOptionFormEntry } from "@/types/database";

async function assertAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

function revalidatePublicPackagePages() {
  revalidatePath("/");
  revalidatePath("/offers");
}

function parsePackageForm(formData: FormData): PackageFormData {
  return {
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    title_he: String(formData.get("title_he") ?? "").trim(),
    destination_ar: String(formData.get("destination_ar") ?? "").trim(),
    destination_he: String(formData.get("destination_he") ?? "").trim(),
    description_ar: String(formData.get("description_ar") ?? "").trim(),
    description_he: String(formData.get("description_he") ?? "").trim(),
    includes_ar: String(formData.get("includes_ar") ?? "").trim(),
    includes_he: String(formData.get("includes_he") ?? "").trim(),
    notes_ar: String(formData.get("notes_ar") ?? "").trim(),
    notes_he: String(formData.get("notes_he") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    travel_date: String(formData.get("travel_date") ?? "").trim(),
    duration_ar: String(formData.get("duration_ar") ?? "").trim(),
    duration_he: String(formData.get("duration_he") ?? "").trim(),
    badge: String(formData.get("badge") ?? "") as PackageFormData["badge"],
    is_active: formData.get("is_active") === "on" || formData.get("is_active") === "true",
  };
}

function parsePriceOptions(
  formData: FormData,
): { options: PriceOptionFormEntry[] } | { error: string } {
  const raw = String(formData.get("price_options_json") ?? "[]");

  try {
    const parsed = JSON.parse(raw) as PriceOptionFormEntry[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return { error: adminAr.form.errors.priceOptionsRequired };
    }

    const options: PriceOptionFormEntry[] = [];
    for (const [index, opt] of parsed.entries()) {
      const label_ar = String(opt.label_ar ?? "").trim();
      const price_ar = String(opt.price_ar ?? "").trim();
      if (!label_ar || !price_ar) {
        return { error: adminAr.form.errors.priceOptionInvalid };
      }
      options.push({
        id: opt.id ? String(opt.id) : undefined,
        label_ar,
        label_he: String(opt.label_he ?? "").trim(),
        price_ar,
        price_he: String(opt.price_he ?? "").trim(),
        sort_order: index,
      });
    }

    return { options };
  } catch {
    return { error: adminAr.form.errors.priceOptionInvalid };
  }
}

async function syncPriceOptions(
  packageId: string,
  options: PriceOptionFormEntry[],
) {
  const supabase = getSupabaseAdmin();

  const { data: existing, error: fetchError } = await supabase
    .from("package_price_options")
    .select("id")
    .eq("package_id", packageId);

  if (fetchError) throw new Error(fetchError.message);

  const keepIds = new Set(options.map((opt) => opt.id).filter(Boolean) as string[]);
  const deleteIds = (existing ?? []).map((row) => row.id).filter((id) => !keepIds.has(id));

  if (deleteIds.length > 0) {
    const { error: deleteError } = await supabase
      .from("package_price_options")
      .delete()
      .in("id", deleteIds);
    if (deleteError) throw new Error(deleteError.message);
  }

  for (const opt of options) {
    const row = {
      package_id: packageId,
      label_ar: opt.label_ar,
      label_he: opt.label_he || null,
      price_ar: opt.price_ar,
      price_he: opt.price_he || null,
      sort_order: opt.sort_order,
    };

    if (opt.id) {
      const { error } = await supabase.from("package_price_options").update(row).eq("id", opt.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("package_price_options").insert(row);
      if (error) throw new Error(error.message);
    }
  }
}

export async function createPackageAction(formData: FormData) {
  await assertAdmin();

  const priceResult = parsePriceOptions(formData);
  if ("error" in priceResult) return { error: priceResult.error };

  const payload = parsePackageForm(formData);
  payload.price = priceResult.options[0].price_ar;

  const supabase = getSupabaseAdmin();

  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_PACKAGE_IMAGES) {
    return { error: adminAr.form.errors.maxImages };
  }

  const { data, error } = await supabase.from("packages").insert(payload).select("id").single();
  if (error || !data) return { error: error?.message ?? adminAr.form.errors.createFailed };

  try {
    await syncPriceOptions(data.id, priceResult.options);
  } catch (syncError) {
    await supabase.from("packages").delete().eq("id", data.id);
    return { error: syncError instanceof Error ? syncError.message : adminAr.form.errors.createFailed };
  }

  for (const file of files) {
    const uploaded = await uploadPackageImage(file);
    const { error: imageError } = await supabase.from("package_images").insert({
      package_id: data.id,
      image_url: uploaded.image_url,
      cloudinary_public_id: uploaded.cloudinary_public_id,
    });
    if (imageError) return { error: imageError.message };
  }

  revalidatePublicPackagePages();
  revalidatePath("/admin/packages");
  revalidatePath("/admin/dashboard");
  redirect(`/admin/packages/${data.id}/edit?success=created`);
}

export async function updatePackageAction(id: string, formData: FormData) {
  await assertAdmin();

  const priceResult = parsePriceOptions(formData);
  if ("error" in priceResult) return { error: priceResult.error };

  const payload = parsePackageForm(formData);
  payload.price = priceResult.options[0].price_ar;

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("packages").update(payload).eq("id", id);
  if (error) return { error: error.message };

  try {
    await syncPriceOptions(id, priceResult.options);
  } catch (syncError) {
    return { error: syncError instanceof Error ? syncError.message : adminAr.form.errors.createFailed };
  }

  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

  const { count, error: countError } = await supabase
    .from("package_images")
    .select("*", { count: "exact", head: true })
    .eq("package_id", id);

  if (countError) return { error: countError.message };
  if ((count ?? 0) + files.length > MAX_PACKAGE_IMAGES) {
    return { error: adminAr.form.errors.maxImages };
  }

  for (const file of files) {
    const uploaded = await uploadPackageImage(file);
    const { error: imageError } = await supabase.from("package_images").insert({
      package_id: id,
      image_url: uploaded.image_url,
      cloudinary_public_id: uploaded.cloudinary_public_id,
    });
    if (imageError) return { error: imageError.message };
  }

  revalidatePublicPackagePages();
  revalidatePath("/admin/packages");
  revalidatePath(`/admin/packages/${id}/edit`);
  return { success: true };
}

export async function togglePackageActiveAction(id: string, isActive: boolean) {
  await assertAdmin();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("packages").update({ is_active: isActive }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePublicPackagePages();
  revalidatePath("/admin/packages");
  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function deletePackageAction(id: string) {
  await assertAdmin();
  const supabase = getSupabaseAdmin();

  const { data: images, error: imagesError } = await supabase
    .from("package_images")
    .select("cloudinary_public_id")
    .eq("package_id", id);

  if (imagesError) return { error: imagesError.message };

  for (const image of images ?? []) {
    await deleteCloudinaryImage(image.cloudinary_public_id);
  }

  await supabase.from("package_images").delete().eq("package_id", id);
  await supabase.from("package_price_options").delete().eq("package_id", id);

  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePublicPackagePages();
  revalidatePath("/admin/packages");
  revalidatePath("/admin/dashboard");
  redirect("/admin/packages?success=deleted");
}

export async function deletePackageImageAction(imageId: string, packageId: string) {
  await assertAdmin();
  const supabase = getSupabaseAdmin();

  const { data: image, error: fetchError } = await supabase
    .from("package_images")
    .select("cloudinary_public_id")
    .eq("id", imageId)
    .maybeSingle();

  if (fetchError || !image) return { error: fetchError?.message ?? adminAr.form.errors.imageNotFound };

  await deleteCloudinaryImage(image.cloudinary_public_id);
  const { error } = await supabase.from("package_images").delete().eq("id", imageId);
  if (error) return { error: error.message };

  revalidatePath(`/admin/packages/${packageId}/edit`);
  revalidatePublicPackagePages();
  return { success: true };
}
