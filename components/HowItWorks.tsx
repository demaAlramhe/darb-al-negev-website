"use client";

import { MessageCircle, Search, Settings, PlaneTakeoff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";
import TravelDecor from "./ui/TravelDecor";

const stepIcons = [MessageCircle, Search, Settings, PlaneTakeoff];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="section-divider relative overflow-hidden py-20 sm:py-24">
      <TravelDecor variant="routes" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.howItWorks.label}
          title={t.howItWorks.title}
          subtitle={t.howItWorks.subtitle}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.howItWorks.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <AnimateIn key={step.title} delay={index * 0.1}>
                <div className="premium-card relative h-full p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/12 text-brand-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-3xl font-bold text-brand-accent/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-brand-dark">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-dark/70">{step.description}</p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
