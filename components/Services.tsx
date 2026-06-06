"use client";

import { Plane, Globe, Hotel, Tag, Users, Headphones } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";
import TravelDecor from "./ui/TravelDecor";

const serviceIcons = [Plane, Globe, Hotel, Tag, Users, Headphones];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="section-divider relative overflow-hidden bg-white/40 py-20 sm:py-24">
      <TravelDecor variant="globe" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.services.label}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <AnimateIn key={service.title} delay={index * 0.06}>
                <article className="premium-card group h-full p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/12 text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-brand-dark">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-dark/75">{service.description}</p>
                </article>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
