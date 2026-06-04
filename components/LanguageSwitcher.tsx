"use client";

import { useEffect, useState } from "react";
import { DEFAULT_LOCALE, LOCALE_LABELS, LOCALES, type Locale } from "@/types/language";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wrapperClass = `inline-flex rounded-full border border-brand-dark/10 bg-white/70 p-1 backdrop-blur-sm ${
    compact ? "text-xs" : "text-sm"
  }`;

  if (!mounted) {
    return (
      <div className={wrapperClass} role="group" aria-label="Language switcher" aria-hidden>
        {LOCALES.map((lang) => (
          <span
            key={lang}
            className={`rounded-full px-3 py-1.5 font-medium ${
              lang === DEFAULT_LOCALE ? "bg-brand-accent text-white shadow-sm" : "text-brand-dark/70"
            }`}
          >
            {LOCALE_LABELS[lang]}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={wrapperClass} role="group" aria-label="Language switcher">
      {LOCALES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang as Locale)}
          className={`rounded-full px-3 py-1.5 font-medium transition-all ${
            locale === lang
              ? "bg-brand-accent text-white shadow-sm"
              : "text-brand-dark/70 hover:text-brand-dark"
          }`}
          aria-pressed={locale === lang}
          suppressHydrationWarning
        >
          {LOCALE_LABELS[lang]}
        </button>
      ))}
    </div>
  );
}
