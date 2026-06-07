"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { TravelPackage } from "@/types/package";
import PackageCard from "./PackageCard";
import AnimateIn from "./ui/AnimateIn";

export default function FeaturedOffers({ packages }: { packages: TravelPackage[] }) {
  const { locale, t } = useLanguage();

  if (packages.length === 0) return null;

  const labels = {
    destination: t.packages.destination,
    price: t.packages.price,
    priceOptions: t.packages.priceOptions,
    date: t.packages.date,
    duration: t.packages.duration,
    perPerson: t.packages.perPerson,
    notes: t.packages.notes,
    inquireWhatsApp: t.packages.inquireWhatsApp,
    badges: t.packages.badges,
    packagePrefix: t.whatsapp.packagePrefix,
  };

  return (
    <section className="relative overflow-hidden bg-brand-dark py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(174,145,114,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-brand-accent/20 px-4 py-1.5 text-sm font-semibold text-brand-accent">
            {t.featuredOffers.label}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t.featuredOffers.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-white/70 sm:text-lg">
            {t.featuredOffers.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {packages.map((pkg, index) => (
            <AnimateIn key={pkg.id} delay={index * 0.08}>
              <PackageCard pkg={pkg} locale={locale} labels={labels} variant="featured" />
            </AnimateIn>
          ))}
        </div>

        <AnimateIn className="mt-10 text-center" delay={0.3}>
          <Link
            href="/offers"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg hover:shadow-black/10"
          >
            {t.featuredOffers.viewAll}
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
