"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppInquiryUrl, HERO_BACKGROUND_PATH } from "@/lib/constants";
import HeroBrandLogo from "./HeroBrandLogo";
import AnimateIn from "./ui/AnimateIn";
import { WhatsAppIcon } from "./ui/Icons";
import { WhatsAppButton } from "./ui/SectionHeading";

export default function Hero() {
  const { t } = useLanguage();
  const whatsappHref = getWhatsAppInquiryUrl(t.whatsapp.general);

  const stats = [
    { value: "50+", label: t.hero.stats.domestic },
    { value: "30+", label: t.hero.stats.international },
    { value: "7+", label: t.hero.stats.offers },
  ];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-[7.75rem] pb-24 sm:pt-32 sm:pb-28 lg:min-h-[620px] lg:pt-36 lg:pb-14"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <Image
          src={HERO_BACKGROUND_PATH}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-brand-bg/35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-brand-bg/95 via-brand-bg/70 to-transparent sm:h-36" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-bg/88 via-brand-bg/72 to-brand-bg/82 sm:from-brand-bg/82 sm:via-brand-bg/58 sm:to-brand-bg/70" />
      <div className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-l from-brand-bg/95 via-brand-bg/55 to-transparent lg:block" />

      {/* Mobile: Title → Logo → Buttons → Stats */}
      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-0 px-4 sm:gap-5 sm:px-6 lg:hidden">
        <AnimateIn className="w-full text-center">
          <h1 className="mb-1 text-3xl font-bold leading-[1.05] tracking-tight text-brand-dark drop-shadow-sm sm:mb-2 sm:text-4xl">
            <span className="block">{t.hero.titleLine1}</span>
            <span className="block text-brand-dark/90">{t.hero.titleLine2}</span>
          </h1>
          <p className="mb-0 text-sm font-medium leading-snug tracking-wide text-brand-dark/65 sm:text-base">
            {t.hero.titleTagline}
          </p>
        </AnimateIn>

        <AnimateIn delay={0.08} className="-mt-6 flex w-full justify-center sm:-mt-3">
          <HeroBrandLogo alt={t.siteName} compact />
        </AnimateIn>

        <AnimateIn delay={0.12} className="flex w-full flex-col items-center gap-3">
          <motion.a
            href="/offers"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-brand-dark px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-dark/25 transition-colors hover:bg-brand-dark/90 sm:max-w-sm sm:text-base"
          >
            {t.hero.ctaPackages}
          </motion.a>
          <WhatsAppButton
            href={whatsappHref}
            variant="outline"
            className="w-full max-w-xs !border-white/70 !bg-white/75 !py-3.5 !backdrop-blur-md sm:max-w-sm"
          >
            <WhatsAppIcon />
            {t.hero.ctaWhatsApp}
          </WhatsAppButton>
        </AnimateIn>

        <AnimateIn delay={0.16} className="mt-4 w-full sm:mt-5">
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/50 bg-white/55 px-3 py-4 text-center shadow-sm backdrop-blur-md sm:px-4 sm:py-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-brand-accent">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-brand-dark/70 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Desktop / laptop — unchanged layout */}
      <div className="relative mx-auto hidden max-w-7xl items-center gap-0 px-4 sm:gap-8 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12 xl:gap-14 lg:px-8">
        <AnimateIn className="mx-auto max-w-xl text-center lg:max-w-2xl">
          <h1 className="mb-3 text-3xl font-bold leading-[1.05] tracking-tight text-brand-dark drop-shadow-sm sm:text-4xl lg:text-[2.65rem]">
            <span className="block">{t.hero.titleLine1}</span>
            <span className="block text-brand-dark/90">{t.hero.titleLine2}</span>
          </h1>
          <p className="mb-8 text-sm font-medium tracking-wide text-brand-dark/65 sm:text-base">
            {t.hero.titleTagline}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center">
            <motion.a
              href="/offers"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-dark px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-dark/25 transition-colors hover:bg-brand-dark/90 sm:text-base"
            >
              {t.hero.ctaPackages}
            </motion.a>
            <WhatsAppButton href={whatsappHref} variant="outline" className="!border-white/70 !bg-white/75 !py-3.5 !backdrop-blur-md">
              <WhatsAppIcon />
              {t.hero.ctaWhatsApp}
            </WhatsAppButton>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/50 bg-white/55 px-3 py-5 text-center shadow-sm backdrop-blur-md sm:px-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-brand-accent">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-brand-dark/70 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15} className="relative flex justify-center lg:-translate-y-7 lg:justify-end xl:-translate-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <HeroBrandLogo alt={t.siteName} />
          </motion.div>
        </AnimateIn>
      </div>
    </section>
  );
}
