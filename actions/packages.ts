"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth/session";
import { deleteCloudinaryImage, uploadPackageImage } from "@/lib/cloudinary";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { adminAr } from "@/data/admin-ar";
import type { PackageFormData } from "@/types/database";

async function assertAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
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

export async function createPackageAction(formData: FormData) {
  await assertAdmin();
  const payload = parsePackageForm(formData);
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.from("packages").insert(payload).select("id").single();
  if (error || !data) return { error: error?.message ?? adminAr.form.errors.createFailed };

  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  for (const file of files) {
    const uploaded = await uploadPackageImage(file);
    await supabase.from("package_images").insert({
      package_id: data.id,
      image_url: uploaded.image_url,
      cloudinary_public_id: uploaded.cloudinary_public_id,
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/packages");
  revalidatePath("/admin/dashboard");
  redirect(`/admin/packages/${data.id}/edit?success=created`);
}

export async function updatePackageAction(id: string, formData: FormData) {
  await assertAdmin();
  const payload = parsePackageForm(formData);
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("packages").update(payload).eq("id", id);
  if (error) return { error: error.message };

  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  for (const file of files) {
    const uploaded = await uploadPackageImage(file);
    await supabase.from("package_images").insert({
      package_id: id,
      image_url: uploaded.image_url,
      cloudinary_public_id: uploaded.cloudinary_public_id,
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/packages");
  revalidatePath(`/admin/packages/${id}/edit`);
  return { success: true };
}

export async function togglePackageActiveAction(id: string, isActive: boolean) {
  await assertAdmin();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("packages").update({ is_active: isActive }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
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

  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
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
  revalidatePath("/");
  return { success: true };
}
