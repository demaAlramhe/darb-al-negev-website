"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import FeaturedOffers from "@/components/FeaturedOffers";
import Packages from "@/components/Packages";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { dir, locale } = useLanguage();

  return (
    <div dir={dir} lang={locale} className={locale === "ar" ? "font-arabic" : "font-hebrew"}>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <HowItWorks />
        <Services />
        <FeaturedOffers />
        <Packages />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}
