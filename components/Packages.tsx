"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { emptyPackageMessage } from "@/lib/packages";
import type { TravelPackage } from "@/types/package";
import PackageCard from "./PackageCard";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";

interface PackagesProps {
  packages: TravelPackage[];
  /** When set, only the first N packages are shown (homepage preview). */
  limit?: number;
  /** Show a link to the full offers page (homepage preview). */
  showViewAll?: boolean;
  /** Use homepage or dedicated offers page headings. */
  variant?: "home" | "offers";
  sectionId?: string;
  className?: string;
}

export default function Packages({
  packages,
  limit,
  showViewAll = false,
  variant = "home",
  sectionId = "packages",
  className = "",
}: PackagesProps) {
  const { locale, t } = useLanguage();
  const heading = variant === "offers" ? t.offers : t.packages;
  const displayed = limit ? packages.slice(0, limit) : packages;

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
    <section id={sectionId} className={`section-divider py-20 sm:py-24 ${className}`}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={heading.label} title={heading.title} subtitle={heading.subtitle} />

        {displayed.length === 0 ? (
          <div className="rounded-3xl border border-brand-dark/10 bg-white/70 px-6 py-12 text-center text-base text-brand-dark/70">
            {emptyPackageMessage(locale)}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayed.map((pkg, index) => (
              <AnimateIn key={pkg.id} delay={(index % 3) * 0.08}>
                <PackageCard pkg={pkg} locale={locale} labels={labels} />
              </AnimateIn>
            ))}
          </div>
        )}

        {showViewAll && packages.length > 0 ? (
          <AnimateIn className="mt-10 text-center" delay={0.2}>
            <Link
              href="/offers"
              className="inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-white px-6 py-3 text-sm font-semibold text-brand-dark shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-accent hover:shadow-md hover:shadow-brand-dark/10"
            >
              {t.packages.viewAll}
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </AnimateIn>
        ) : null}
      </div>
    </section>
  );
}
