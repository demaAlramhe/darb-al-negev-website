import type { Locale } from "@/types/language";
import type { DbPackagePriceOption, DbPackageWithImages } from "@/types/database";
import type { PackageBadge, PackagePriceOption, TravelPackage } from "@/types/package";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabasePublic } from "@/lib/supabase/public";

export const MAX_PACKAGE_IMAGES = 3;
export const HOMEPAGE_PACKAGE_PREVIEW_LIMIT = 3;

const PACKAGE_SELECT = "*, package_images(*), package_price_options(*)";

const FALLBACK_GRADIENTS = [
  "from-slate-700 via-blue-800 to-indigo-950",
  "from-teal-600 via-cyan-700 to-blue-900",
  "from-amber-600 via-orange-700 to-yellow-900",
  "from-green-700 via-emerald-800 to-teal-900",
  "from-violet-700 via-purple-800 to-indigo-950",
  "from-sky-600 via-blue-700 to-slate-900",
];

function parseBadge(badge: string | null): PackageBadge | undefined {
  if (badge === "new" || badge === "special" || badge === "popular") return badge;
  return undefined;
}

function sortPackageImages(images: DbPackageWithImages["package_images"]) {
  return [...(images ?? [])].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}

export function sortPackagePriceOptions(options: DbPackagePriceOption[] | undefined) {
  return [...(options ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order || new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}

function mapPriceOptions(options: DbPackagePriceOption[]): PackagePriceOption[] {
  return options.map((opt) => ({
    label: { ar: opt.label_ar, he: opt.label_he?.trim() || opt.label_ar },
    price: { ar: opt.price_ar, he: opt.price_he?.trim() || opt.price_ar },
  }));
}

export function dbPackageToTravelPackage(
  pkg: DbPackageWithImages,
  index = 0,
): TravelPackage {
  const sortedImages = sortPackageImages(pkg.package_images);
  const imageUrls = sortedImages.map((img) => img.image_url).slice(0, 3);
  const mainImage = imageUrls[0];

  const sortedPriceOptions = sortPackagePriceOptions(pkg.package_price_options);
  const priceOptions = sortedPriceOptions.length > 0 ? mapPriceOptions(sortedPriceOptions) : undefined;
  const firstOption = sortedPriceOptions[0];
  const legacyPrice = pkg.price?.trim() ?? "";

  const displayPriceAr = firstOption?.price_ar ?? legacyPrice;
  const displayPriceHe = firstOption?.price_he?.trim() || firstOption?.price_ar || legacyPrice;

  return {
    id: pkg.id,
    imageGradient: FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length],
    imageIcon: "✈️",
    imageUrl: mainImage,
    imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
    badge: parseBadge(pkg.badge),
    featured: index < 2,
    title: { ar: pkg.title_ar, he: pkg.title_he },
    destination: { ar: pkg.destination_ar, he: pkg.destination_he },
    price: { ar: displayPriceAr, he: displayPriceHe },
    priceOptions,
    date: { ar: pkg.travel_date, he: pkg.travel_date },
    duration: { ar: pkg.duration_ar, he: pkg.duration_he },
    description: { ar: pkg.description_ar, he: pkg.description_he },
    includes: { ar: pkg.includes_ar, he: pkg.includes_he },
    notes: { ar: pkg.notes_ar ?? "", he: pkg.notes_he ?? "" },
  };
}

export function getAdminPackageDisplayPrice(pkg: DbPackageWithImages): string {
  const sorted = sortPackagePriceOptions(pkg.package_price_options);
  if (sorted.length > 0) {
    const first = sorted[0];
    return sorted.length > 1 ? `${first.price_ar} (+${sorted.length - 1})` : first.price_ar;
  }
  return pkg.price?.trim() || "—";
}

export async function getActivePackages(): Promise<TravelPackage[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = getSupabasePublic();
    const { data, error } = await supabase
      .from("packages")
      .select(PACKAGE_SELECT)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error || !data) return [];
    return (data as DbPackageWithImages[]).map((pkg, index) =>
      dbPackageToTravelPackage(pkg, index),
    );
  } catch {
    return [];
  }
}

export async function getAllPackagesAdmin(): Promise<DbPackageWithImages[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("packages")
    .select(PACKAGE_SELECT)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as DbPackageWithImages[];
}

export async function getPackageByIdAdmin(id: string): Promise<DbPackageWithImages | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("packages")
    .select(PACKAGE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as DbPackageWithImages | null) ?? null;
}

export async function getPackageStats() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("packages").select("id, is_active, created_at, title_ar");

  if (error) throw new Error(error.message);

  const rows = data ?? [];
  const sorted = [...rows].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  return {
    total: rows.length,
    active: rows.filter((p) => p.is_active).length,
    hidden: rows.filter((p) => !p.is_active).length,
    latest: sorted.slice(0, 5),
  };
}

export function emptyPackageMessage(locale: Locale): string {
  return locale === "ar"
    ? "لا توجد عروض متاحة حاليًا، تواصل معنا لمعرفة أحدث البكجات."
    : "אין הצעות זמינות כרגע, ניתן ליצור קשר לקבלת החבילות העדכניות.";
}
