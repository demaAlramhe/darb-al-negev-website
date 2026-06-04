"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  Accessibility,
  Contrast,
  ImageOff,
  Keyboard,
  Link2,
  Minus,
  Moon,
  MousePointer2,
  PauseCircle,
  Plus,
  RotateCcw,
  Sun,
  Type,
  Underline,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  applyAccessibilitySettings,
  clearAccessibilitySettings,
  DEFAULT_A11Y_SETTINGS,
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
  FONT_SCALE_STEP,
  loadAccessibilitySettings,
  normalizeSettings,
  saveAccessibilitySettings,
  type AccessibilitySettings,
  type ContrastMode,
} from "@/lib/accessibility";

type ToggleKey = Exclude<keyof AccessibilitySettings, "fontScale" | "contrast">;

export default function AccessibilityWidget() {
  const { t, dir, locale } = useLanguage();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_A11Y_SETTINGS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loaded = loadAccessibilitySettings();
    setSettings(loaded);
    applyAccessibilitySettings(loaded);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyAccessibilitySettings(settings);
    saveAccessibilitySettings(settings);
  }, [settings, mounted]);

  const closePanel = useCallback(() => {
    setOpen(false);
    openButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closePanel]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const updateSettings = useCallback((patch: Partial<AccessibilitySettings>) => {
    setSettings((current) => normalizeSettings({ ...current, ...patch }));
  }, []);

  const increaseText = () => {
    updateSettings({ fontScale: Math.min(FONT_SCALE_MAX, settings.fontScale + FONT_SCALE_STEP) });
  };

  const decreaseText = () => {
    updateSettings({ fontScale: Math.max(FONT_SCALE_MIN, settings.fontScale - FONT_SCALE_STEP) });
  };

  const resetText = () => updateSettings({ fontScale: 100 });

  const toggleContrast = (mode: ContrastMode) => {
    updateSettings({ contrast: settings.contrast === mode ? "default" : mode });
  };

  const toggleFeature = (key: ToggleKey) => {
    updateSettings({ [key]: !settings[key] });
  };

  const resetAll = () => {
    setSettings(clearAccessibilitySettings());
  };

  const toggleItems: { key: ToggleKey; label: string; icon: typeof Type; active: boolean }[] = [
    { key: "grayscale", label: t.accessibility.grayscale, icon: Contrast, active: settings.grayscale },
    {
      key: "highlightLinks",
      label: t.accessibility.highlightLinks,
      icon: Link2,
      active: settings.highlightLinks,
    },
    {
      key: "readableFont",
      label: t.accessibility.readableFont,
      icon: Type,
      active: settings.readableFont,
    },
    {
      key: "letterSpacing",
      label: t.accessibility.letterSpacing,
      icon: Type,
      active: settings.letterSpacing,
    },
    {
      key: "reduceMotion",
      label: t.accessibility.reduceMotion,
      icon: PauseCircle,
      active: settings.reduceMotion,
    },
    {
      key: "largeCursor",
      label: t.accessibility.largeCursor,
      icon: MousePointer2,
      active: settings.largeCursor,
    },
    {
      key: "hideImages",
      label: t.accessibility.hideImages,
      icon: ImageOff,
      active: settings.hideImages,
    },
    {
      key: "underlineLinks",
      label: t.accessibility.underlineLinks,
      icon: Underline,
      active: settings.underlineLinks,
    },
    {
      key: "keyboardFocus",
      label: t.accessibility.keyboardFocus,
      icon: Keyboard,
      active: settings.keyboardFocus,
    },
  ];

  const contrastItems: { mode: ContrastMode; label: string; icon: typeof Contrast; active: boolean }[] =
    [
      {
        mode: "high",
        label: t.accessibility.highContrast,
        icon: Contrast,
        active: settings.contrast === "high",
      },
      { mode: "dark", label: t.accessibility.darkContrast, icon: Moon, active: settings.contrast === "dark" },
      { mode: "light", label: t.accessibility.lightContrast, icon: Sun, active: settings.contrast === "light" },
    ];

  if (!mounted) return null;

  return (
    <div data-a11y-widget dir={dir} lang={locale} className={locale === "ar" ? "font-arabic" : "font-hebrew"}>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-[55] cursor-default bg-brand-dark/25 backdrop-blur-[2px] sm:bg-brand-dark/15"
          aria-label={t.accessibility.closePanel}
          onClick={closePanel}
          tabIndex={-1}
        />
      ) : null}

      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t.accessibility.title}
        className="fixed bottom-5 end-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-brand-dark text-white shadow-xl shadow-brand-dark/25 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:bottom-6 sm:end-6 sm:h-16 sm:w-16"
      >
        <Accessibility className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${panelId}-title`}
          className="fixed z-[60] flex max-h-[min(calc(100vh-6.5rem),720px)] w-[min(calc(100vw-2.5rem),380px)] flex-col overflow-hidden rounded-3xl border border-brand-dark/10 bg-brand-bg shadow-2xl shadow-brand-dark/20 bottom-[5.5rem] end-5 sm:bottom-[6.25rem] sm:end-6 sm:w-[min(calc(100vw-3rem),400px)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-brand-dark/10 bg-white/70 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-accent/15 text-brand-accent">
                <Accessibility className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 id={`${panelId}-title`} className="text-base font-bold text-brand-dark">
                  {t.accessibility.title}
                </h2>
                <p className="text-xs text-brand-dark/60">{t.accessibility.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={closePanel}
              aria-label={t.accessibility.closePanel}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-dark/10 bg-white text-brand-dark transition-colors hover:border-brand-accent hover:text-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <section className="mb-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-dark/55">
                {t.accessibility.textSizeSection}
              </p>
              <div className="flex items-center gap-2 rounded-2xl border border-brand-dark/10 bg-white/80 p-2">
                <button
                  type="button"
                  onClick={decreaseText}
                  disabled={settings.fontScale <= FONT_SCALE_MIN}
                  aria-label={t.accessibility.decreaseText}
                  className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-dark/10 bg-brand-bg text-sm font-semibold text-brand-dark transition-colors hover:border-brand-accent hover:text-brand-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{t.accessibility.decreaseText}</span>
                </button>
                <div className="min-w-[4.5rem] text-center">
                  <p className="text-lg font-bold text-brand-accent">{settings.fontScale}%</p>
                </div>
                <button
                  type="button"
                  onClick={increaseText}
                  disabled={settings.fontScale >= FONT_SCALE_MAX}
                  aria-label={t.accessibility.increaseText}
                  className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-dark/10 bg-brand-bg text-sm font-semibold text-brand-dark transition-colors hover:border-brand-accent hover:text-brand-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{t.accessibility.increaseText}</span>
                </button>
              </div>
              <button
                type="button"
                onClick={resetText}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-brand-dark/70 transition-colors hover:bg-white/70 hover:text-brand-accent"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                {t.accessibility.resetText}
              </button>
            </section>

            <section className="mb-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-dark/55">
                {t.accessibility.contrastSection}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {contrastItems.map(({ mode, label, icon: Icon, active }) => (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleContrast(mode)}
                    className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-xs font-semibold transition-all ${
                      active
                        ? "border-brand-accent bg-brand-accent text-white shadow-md"
                        : "border-brand-dark/10 bg-white/80 text-brand-dark hover:border-brand-accent/40"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-dark/55">
                {t.accessibility.toolsSection}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {toggleItems.map(({ key, label, icon: Icon, active }) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleFeature(key)}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-start text-sm font-medium transition-all ${
                      active
                        ? "border-brand-accent bg-brand-accent/12 text-brand-dark shadow-sm"
                        : "border-brand-dark/10 bg-white/80 text-brand-dark/85 hover:border-brand-accent/35"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        active ? "bg-brand-accent text-white" : "bg-brand-accent/10 text-brand-accent"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="border-t border-brand-dark/10 bg-white/70 px-5 py-4">
            <button
              type="button"
              onClick={resetAll}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t.accessibility.resetAll}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
