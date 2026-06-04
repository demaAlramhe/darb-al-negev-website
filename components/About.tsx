"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";
import { CheckIcon } from "./ui/Icons";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.about.label}
          title={t.about.title}
          subtitle={t.about.description}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {t.about.points.map((point, index) => (
            <AnimateIn key={point} delay={index * 0.08}>
              <div className="h-full rounded-3xl border border-brand-dark/8 bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-accent/12 text-brand-accent">
                  <CheckIcon />
                </div>
                <p className="font-semibold leading-relaxed text-brand-dark">{point}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
