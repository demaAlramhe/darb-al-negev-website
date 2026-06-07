"use client";

import Image from "next/image";
import type { Locale } from "@/types/language";
import type { PackageBadge, TravelPackage } from "@/types/package";
import { getWhatsAppInquiryUrl } from "@/lib/constants";
import { Calendar, Clock, MapPin } from "lucide-react";
import PackageCardImageGallery from "./PackageCardImageGallery";
import { WhatsAppIcon } from "./ui/Icons";
import { WhatsAppButton } from "./ui/SectionHeading";

interface PackageCardProps {
  pkg: TravelPackage;
  locale: Locale;
  labels: {
    destination: string;
    price: string;
    priceOptions: string;
    date: string;
    duration: string;
    perPerson: string;
    notes: string;
    inquireWhatsApp: string;
    badges: Record<PackageBadge, string>;
    packagePrefix: string;
  };
  variant?: "default" | "featured";
}

const badgeStyles: Record<PackageBadge, string> = {
  new: "bg-emerald-500/90 text-white",
  special: "bg-brand-accent text-white",
  popular: "bg-brand-dark/90 text-white",
};

export default function PackageCard({
  pkg,
  locale,
  labels,
  variant = "default",
}: PackageCardProps) {
  const title = pkg.title[locale];
  const whatsappHref = getWhatsAppInquiryUrl(`${labels.packagePrefix} ${title}`);
  const galleryImages = pkg.imageUrls ?? (pkg.imageUrl ? [pkg.imageUrl] : []);
  const hasPhotos = galleryImages.length > 0;
  const notesText = pkg.notes?.[locale]?.trim();

  const options = pkg.priceOptions ?? [];
  const hasPriceOptions = options.length > 0;
  const singleOption = hasPriceOptions && options.length === 1;
  const multipleOptions = hasPriceOptions && options.length > 1;
  const legacyPrice = pkg.price[locale]?.trim();

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-dark/10 ${
        variant === "featured"
          ? "border-brand-accent/25 shadow-brand-accent/10 ring-1 ring-brand-accent/10"
          : "border-brand-dark/8 hover:border-brand-accent/25"
      }`}
    >
      <div className={`relative h-52 ${hasPhotos ? "bg-brand-dark/5" : `bg-gradient-to-br ${pkg.imageGradient}`}`}>
        {hasPhotos ? (
          <PackageCardImageGallery images={galleryImages} alt={title} />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5" />
            <span className="absolute start-4 top-4 text-4xl drop-shadow-md">{pkg.imageIcon}</span>
          </>
        )}
        {pkg.badge ? (
          <span
            className={`absolute end-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${badgeStyles[pkg.badge]}`}
          >
            {labels.badges[pkg.badge]}
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-4 pt-10">
          <p className="text-xs font-medium text-white/80">{pkg.destination[locale]}</p>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-brand-dark/75">
          {pkg.description[locale]}
        </p>

        <ul className="mb-5 space-y-2.5 text-sm">
          <li className="flex items-center gap-2 text-brand-dark/80">
            <MapPin className="h-4 w-4 shrink-0 text-brand-accent" />
            <span>{pkg.destination[locale]}</span>
          </li>
          <li className="flex items-center gap-2 text-brand-dark/80">
            <Calendar className="h-4 w-4 shrink-0 text-brand-accent" />
            <span>{pkg.date[locale]}</span>
          </li>
          <li className="flex items-center gap-2 text-brand-dark/80">
            <Clock className="h-4 w-4 shrink-0 text-brand-accent" />
            <span>{pkg.duration[locale]}</span>
          </li>
        </ul>

        {notesText ? (
          <div className="mb-5 rounded-xl border border-brand-accent/15 bg-brand-bg/60 px-3.5 py-3">
            <p className="mb-1 text-xs font-semibold text-brand-accent">{labels.notes}</p>
            <p className="text-sm leading-relaxed text-brand-dark/75">{notesText}</p>
          </div>
        ) : null}

        <div className="mb-5 mt-auto border-t border-brand-dark/8 pt-4">
          {singleOption ? (
            <>
              <p className="text-xs text-brand-dark/55">{labels.price}</p>
              <p className="text-2xl font-bold text-brand-accent">
                {options[0].price[locale]}
                <span className="ms-1 text-sm font-normal text-brand-dark/60">
                  {options[0].label[locale]}
                </span>
              </p>
            </>
          ) : multipleOptions ? (
            <div className="rounded-xl border border-brand-accent/15 bg-brand-bg/40 px-3.5 py-3">
              <p className="mb-2 text-xs font-semibold text-brand-accent">{labels.priceOptions}</p>
              <ul className="space-y-1.5">
                {options.map((option, index) => (
                  <li
                    key={`${option.label[locale]}-${index}`}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="text-brand-dark/75">{option.label[locale]}</span>
                    <span className="shrink-0 font-bold text-brand-accent">{option.price[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : legacyPrice ? (
            <>
              <p className="text-xs text-brand-dark/55">{labels.price}</p>
              <p className="text-2xl font-bold text-brand-accent">
                {legacyPrice}
                <span className="ms-1 text-sm font-normal text-brand-dark/60">{labels.perPerson}</span>
              </p>
            </>
          ) : null}
        </div>

        <WhatsAppButton href={whatsappHref} className="w-full">
          <WhatsAppIcon className="h-4 w-4" />
          {labels.inquireWhatsApp}
        </WhatsAppButton>
      </div>
    </article>
  );
}
