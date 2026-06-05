"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppInquiryUrl } from "@/lib/constants";
import HeroVisual from "./HeroVisual";
import AnimateIn from "./ui/AnimateIn";
import { WhatsAppIcon } from "./ui/Icons";
import { WhatsAppButton } from "./ui/SectionHeading";
import type { TravelPackage } from "@/types/package";

export default function Hero({ miniPackages }: { miniPackages: TravelPackage[] }) {
  const { t } = useLanguage();
  const whatsappHref = getWhatsAppInquiryUrl(t.whatsapp.general);

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 start-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-accent/12 blur-3xl" />
        <div className="absolute bottom-0 end-0 h-80 w-80 rounded-full bg-sky-200/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(71,71,71,0.06) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12 xl:gap-14 lg:px-8">
        <AnimateIn className="mx-auto max-w-xl text-center lg:max-w-2xl">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-accent shadow-sm backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            {t.hero.badge}
          </motion.span>

          <h1 className="mb-8 text-3xl font-bold leading-[1.05] tracking-tight text-brand-dark sm:text-4xl lg:text-[2.65rem]">
            <span className="block">{t.hero.titleLine1}</span>
            <span className="block text-brand-dark/90">{t.hero.titleLine2}</span>
          </h1>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center">
            <motion.a
              href="#packages"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-dark px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-dark/20 transition-colors hover:bg-brand-dark/90 sm:text-base"
            >
              {t.hero.ctaPackages}
            </motion.a>
            <WhatsAppButton href={whatsappHref} variant="outline" className="!py-3.5">
              <WhatsAppIcon />
              {t.hero.ctaWhatsApp}
            </WhatsAppButton>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-brand-dark/10 pt-6 text-center">
            {[
              { value: "50+", label: t.hero.stats.domestic },
              { value: "30+", label: t.hero.stats.international },
              { value: "7+", label: t.hero.stats.offers },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-brand-accent">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-brand-dark/65 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15} className="relative flex justify-center lg:justify-end">
          <HeroVisual miniPackages={miniPackages} />
        </AnimateIn>
      </div>
    </section>
  );
}
