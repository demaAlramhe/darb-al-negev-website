"use client";

import { packages } from "@/data/packages";
import { useLanguage } from "@/context/LanguageContext";
import PackageCard from "./PackageCard";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";

export default function Packages() {
  const { locale, t } = useLanguage();

  const labels = {
    destination: t.packages.destination,
    date: t.packages.date,
    duration: t.packages.duration,
    perPerson: t.packages.perPerson,
    inquireWhatsApp: t.packages.inquireWhatsApp,
    badges: t.packages.badges,
    packagePrefix: t.whatsapp.packagePrefix,
  };

  return (
    <section id="packages" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.packages.label}
          title={t.packages.title}
          subtitle={t.packages.subtitle}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg, index) => (
            <AnimateIn key={pkg.id} delay={(index % 3) * 0.08}>
              <PackageCard pkg={pkg} locale={locale} labels={labels} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
