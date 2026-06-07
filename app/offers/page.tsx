import type { Metadata } from "next";
import OffersPage from "@/components/OffersPage";
import { getActivePackages } from "@/lib/packages";

export const metadata: Metadata = {
  title: "العروض والبكجات | דרך הנגב — Darb Al Negev",
  description:
    "تصفح كل عروض السفر والبكجات المتوفرة. עיון בכל הצעות הנסיעה והחבילות הזמינות.",
};

export default async function Page() {
  const packages = await getActivePackages();
  return <OffersPage packages={packages} />;
}
