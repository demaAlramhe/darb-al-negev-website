"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import { useLanguage } from "@/context/LanguageContext";
import { HOMEPAGE_PACKAGE_PREVIEW_LIMIT } from "@/lib/packages";
import type { TravelPackage } from "@/types/package";

export default function HomePage({ packages }: { packages: TravelPackage[] }) {
  const { dir, locale } = useLanguage();
  const featuredPackages = packages.filter((pkg) => pkg.featured).slice(0, 2);
  const miniPackages = featuredPackages.length > 0 ? featuredPackages : packages.slice(0, 2);

  return (
    <div dir={dir} lang={locale} className={locale === "ar" ? "font-arabic" : "font-hebrew"}>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About miniPackages={miniPackages} />
        <HowItWorks />
        <Services />
        <Packages
          packages={packages}
          limit={HOMEPAGE_PACKAGE_PREVIEW_LIMIT}
          showViewAll
          variant="home"
        />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <ScrollProgress />
      <BackToTop />
      <StickyWhatsApp />
    </div>
  );
}
