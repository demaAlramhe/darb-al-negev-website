"use client";

import { useLanguage } from "@/context/LanguageContext";
import { emptyPackageMessage } from "@/lib/packages";
import type { TravelPackage } from "@/types/package";
import PackageCard from "./PackageCard";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";

export default function Packages({ packages }: { packages: TravelPackage[] }) {
  const { locale, t } = useLanguage();

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
    <section id="packages" className="section-divider py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.packages.label}
          title={t.packages.title}
          subtitle={t.packages.subtitle}
        />

        {packages.length === 0 ? (
          <div className="rounded-3xl border border-brand-dark/10 bg-white/70 px-6 py-12 text-center text-base text-brand-dark/70">
            {emptyPackageMessage(locale)}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg, index) => (
              <AnimateIn key={pkg.id} delay={(index % 3) * 0.08}>
                <PackageCard pkg={pkg} locale={locale} labels={labels} />
              </AnimateIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
