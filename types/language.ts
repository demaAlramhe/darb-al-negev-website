export type Locale = "ar" | "he";

export const DEFAULT_LOCALE: Locale = "ar";

export const LOCALES: Locale[] = ["ar", "he"];

export const LOCALE_LABELS: Record<Locale, string> = {
  ar: "العربية",
  he: "עברית",
};
