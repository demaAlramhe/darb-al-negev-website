"use client";

import Image from "next/image";
import type { Locale } from "@/types/language";
import type { PackageBadge, TravelPackage } from "@/types/package";
import { getWhatsAppInquiryUrl } from "@/lib/constants";
import { Calendar, Clock, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./ui/Icons";
import { WhatsAppButton } from "./ui/SectionHeading";

interface PackageCardProps {
  pkg: TravelPackage;
  locale: Locale;
  labels: {
    destination: string;
    price: string;
    date: string;
    duration: string;
    perPerson: string;
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

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
        variant === "featured"
          ? "border-brand-accent/25 shadow-brand-accent/10 ring-1 ring-brand-accent/10"
          : "border-brand-dark/8 hover:border-brand-accent/25"
      }`}
    >
      <div className={`relative h-52 ${pkg.imageUrl ? "bg-brand-dark/5" : `bg-gradient-to-br ${pkg.imageGradient}`}`}>
        {pkg.imageUrl ? (
          <>
            <Image src={pkg.imageUrl} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5" />
            <span className="absolute start-4 top-4 text-4xl drop-shadow-md">{pkg.imageIcon}</span>
          </>
        )}
        {pkg.badge ? (
          <span
            className={`absolute end-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${badgeStyles[pkg.badge]}`}
          >
            {labels.badges[pkg.badge]}
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 pt-10">
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

        <div className="mb-5 mt-auto border-t border-brand-dark/8 pt-4">
          <p className="text-xs text-brand-dark/55">{labels.price}</p>
          <p className="text-2xl font-bold text-brand-accent">
            {pkg.price[locale]}
            <span className="ms-1 text-sm font-normal text-brand-dark/60">{labels.perPerson}</span>
          </p>
        </div>

        <WhatsAppButton href={whatsappHref} className="w-full">
          <WhatsAppIcon className="h-4 w-4" />
          {labels.inquireWhatsApp}
        </WhatsAppButton>
      </div>
    </article>
  );
}
