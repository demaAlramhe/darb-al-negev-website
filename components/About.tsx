"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { TravelPackage } from "@/types/package";
import HeroVisual from "./HeroVisual";
import { aboutFeatureVisuals } from "./about/AboutFeatureVisuals";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";

export default function About({ miniPackages }: { miniPackages: TravelPackage[] }) {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-soft-gradient relative py-20 sm:py-24">
      <div className="pointer-events-none absolute -start-20 bottom-0 h-56 w-56 rounded-full bg-brand-accent/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.about.label}
          title={t.about.title}
          subtitle={t.about.description}
        />

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14">
          <AnimateIn className="flex justify-center lg:justify-start">
            <HeroVisual
              miniPackages={miniPackages}
              className="mx-auto max-w-[400px] sm:max-w-[420px] lg:max-w-[440px]"
            />
          </AnimateIn>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
            {t.about.points.map((point, index) => {
              const Visual = aboutFeatureVisuals[index];
              return (
                <AnimateIn key={point} delay={0.08 + index * 0.08}>
                  <div className="premium-card group flex h-full flex-col p-6 text-center sm:text-start lg:flex-row lg:items-center lg:gap-5 lg:text-start">
                    <div className="mx-auto mb-5 flex h-24 w-full max-w-[200px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-bg/80 via-white to-brand-accent/10 px-4 lg:mx-0 lg:mb-0 lg:h-20 lg:w-24">
                      {Visual ? <Visual className="h-16 w-full lg:h-14" /> : null}
                    </div>
                    <p className="font-semibold leading-relaxed text-brand-dark">{point}</p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
