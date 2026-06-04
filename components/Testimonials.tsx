"use client";

import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useLanguage } from "@/context/LanguageContext";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";

export default function Testimonials() {
  const { locale, t } = useLanguage();

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.testimonials.label}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <AnimateIn key={item.id} delay={index * 0.1}>
              <article className="flex h-full flex-col rounded-3xl border border-brand-dark/8 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <Quote className="mb-4 h-8 w-8 text-brand-accent/40" />
                <p className="mb-6 flex-1 text-sm leading-relaxed text-brand-dark/80 sm:text-base">
                  &ldquo;{item.text[locale]}&rdquo;
                </p>
                <div className="flex items-center gap-1 text-brand-accent">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-accent text-brand-accent" />
                  ))}
                </div>
                <div className="mt-4 border-t border-brand-dark/8 pt-4">
                  <p className="font-bold text-brand-dark">{item.name[locale]}</p>
                  <p className="text-xs text-brand-dark/55">{item.trip[locale]}</p>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
