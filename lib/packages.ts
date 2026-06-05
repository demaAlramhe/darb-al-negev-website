import type { Locale } from "@/types/language";
import type { DbPackageWithImages } from "@/types/database";
import type { PackageBadge, TravelPackage } from "@/types/package";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabasePublic } from "@/lib/supabase/public";

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

export function dbPackageToTravelPackage(
  pkg: DbPackageWithImages,
  index = 0,
): TravelPackage {
  const mainImage = pkg.package_images?.[0]?.image_url;

  return {
    id: pkg.id,
    imageGradient: FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length],
    imageIcon: "✈️",
    imageUrl: mainImage,
    badge: parseBadge(pkg.badge),
    featured: index < 2,
    title: { ar: pkg.title_ar, he: pkg.title_he },
    destination: { ar: pkg.destination_ar, he: pkg.destination_he },
    price: { ar: pkg.price, he: pkg.price },
    date: { ar: pkg.travel_date, he: pkg.travel_date },
    duration: { ar: pkg.duration_ar, he: pkg.duration_he },
    description: { ar: pkg.description_ar, he: pkg.description_he },
    includes: { ar: pkg.includes_ar, he: pkg.includes_he },
    notes: { ar: pkg.notes_ar, he: pkg.notes_he },
  };
}

export async function getActivePackages(): Promise<TravelPackage[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = getSupabasePublic();
    const { data, error } = await supabase
      .from("packages")
      .select("*, package_images(*)")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return (data as DbPackageWithImages[]).map(dbPackageToTravelPackage);
  } catch {
    return [];
  }
}

export async function getAllPackagesAdmin(): Promise<DbPackageWithImages[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("packages")
    .select("*, package_images(*)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as DbPackageWithImages[];
}

export async function getPackageByIdAdmin(id: string): Promise<DbPackageWithImages | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("packages")
    .select("*, package_images(*)")
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
