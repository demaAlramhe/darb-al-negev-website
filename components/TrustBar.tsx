"use client";

import { RefreshCw, Shield, MessageCircle, Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AnimateIn from "./ui/AnimateIn";

const icons = [RefreshCw, Tag, MessageCircle, Shield];

export default function TrustBar() {
  const { t } = useLanguage();

  return (
    <section aria-label="Trust highlights" className="relative z-10 -mt-4 pb-6 sm:-mt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="overflow-hidden rounded-2xl border border-brand-dark/8 bg-white/95 shadow-lg shadow-brand-dark/8 backdrop-blur-md transition-shadow hover:shadow-xl sm:rounded-3xl">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {t.trustBar.points.map((point, index) => {
                const Icon = icons[index];
                return (
                  <div
                    key={point}
                    className={`flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5 ${
                      index % 2 === 0 ? "border-e border-brand-dark/8 lg:border-e" : ""
                    } ${index < 2 ? "border-b border-brand-dark/8 lg:border-b-0" : ""} ${
                      index < 3 ? "lg:border-e lg:border-brand-dark/8" : ""
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/12 text-brand-accent sm:h-11 sm:w-11">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm font-bold leading-snug text-brand-dark sm:text-base">{point}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
