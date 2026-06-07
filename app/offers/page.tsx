import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import OffersPage from "@/components/OffersPage";
import { getActivePackages } from "@/lib/packages";

/** Always fetch fresh packages — do not serve a stale static snapshot. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "العروض والبكجات | דרך הנגב — Darb Al Negev",
  description:
    "تصفح كل عروض السفر والبكجات المتوفرة. עיון בכל הצעות הנסיעה והחבילות הזמינות.",
};

export default async function Page() {
  noStore();
  const packages = await getActivePackages();
  return <OffersPage packages={packages} />;
}
