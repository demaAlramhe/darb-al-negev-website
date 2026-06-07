"use client";

import Header from "@/components/Header";
import Packages from "@/components/Packages";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import { useLanguage } from "@/context/LanguageContext";
import type { TravelPackage } from "@/types/package";

export default function OffersPage({ packages }: { packages: TravelPackage[] }) {
  const { dir, locale } = useLanguage();

  return (
    <div dir={dir} lang={locale} className={locale === "ar" ? "font-arabic" : "font-hebrew"}>
      <Header />
      <main className="pt-[4.75rem] sm:pt-[5rem]">
        <Packages packages={packages} variant="offers" sectionId="offers-list" />
      </main>
      <Footer />
      <ScrollProgress />
      <BackToTop />
      <StickyWhatsApp />
    </div>
  );
}
