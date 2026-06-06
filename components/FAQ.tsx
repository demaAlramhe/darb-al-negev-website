"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";
import { useLanguage } from "@/context/LanguageContext";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";

export default function FAQ() {
  const { locale, t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="section-divider bg-white/40 py-20 sm:py-24">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.faq.label}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
        />

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <AnimateIn key={item.id} delay={index * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-brand-accent/30 bg-white shadow-md shadow-brand-dark/5"
                      : "border-brand-dark/8 bg-white/70 hover:border-brand-accent/20 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start transition-colors hover:text-brand-accent sm:px-6 sm:py-5"
                    aria-expanded={isOpen}
                    suppressHydrationWarning
                  >
                    <span className="font-semibold text-brand-dark">{item.question[locale]}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-brand-accent transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="border-t border-brand-dark/8 px-5 pb-5 pt-3 text-sm leading-relaxed text-brand-dark/75 sm:px-6 sm:pb-6">
                          {item.answer[locale]}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
