"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";
import TravelDecor from "./ui/TravelDecor";

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section className="section-divider relative overflow-hidden bg-white/50 py-20 sm:py-24">
      <TravelDecor variant="stamps" />
      <div className="pointer-events-none absolute -top-24 end-0 h-64 w-64 rounded-full bg-brand-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 start-0 h-48 w-48 rounded-full bg-brand-dark/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.whyUs.label}
          title={t.whyUs.title}
          subtitle={t.whyUs.subtitle}
        />

        <AnimateIn className="mb-10">
          <div className="flex items-center gap-4 rounded-2xl border border-brand-accent/20 bg-gradient-to-r from-brand-accent/10 via-white/80 to-brand-accent/5 p-5 sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-accent text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-base font-semibold text-brand-dark sm:text-lg">{t.whyUs.highlight}</p>
          </div>
        </AnimateIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.whyUs.items.map((item, index) => (
            <AnimateIn key={item.title} delay={index * 0.06}>
              <div className="premium-card group h-full p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/12 text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-bold leading-snug text-brand-dark">{item.title}</h3>
                <p className="text-sm leading-relaxed text-brand-dark/70">{item.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
