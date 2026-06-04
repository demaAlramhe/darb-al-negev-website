export const A11Y_STORAGE_KEY = "darb-a11y-settings";

export type ContrastMode = "default" | "high" | "dark" | "light";

export interface AccessibilitySettings {
  fontScale: number;
  contrast: ContrastMode;
  grayscale: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  letterSpacing: boolean;
  reduceMotion: boolean;
  largeCursor: boolean;
  hideImages: boolean;
  underlineLinks: boolean;
  keyboardFocus: boolean;
}

export const FONT_SCALE_MIN = 80;
export const FONT_SCALE_MAX = 150;
export const FONT_SCALE_STEP = 10;

export const DEFAULT_A11Y_SETTINGS: AccessibilitySettings = {
  fontScale: 100,
  contrast: "default",
  grayscale: false,
  highlightLinks: false,
  readableFont: false,
  letterSpacing: false,
  reduceMotion: false,
  largeCursor: false,
  hideImages: false,
  underlineLinks: false,
  keyboardFocus: false,
};

const BOOLEAN_ATTRS: { attr: string; key: keyof AccessibilitySettings }[] = [
  { attr: "grayscale", key: "grayscale" },
  { attr: "highlight-links", key: "highlightLinks" },
  { attr: "readable-font", key: "readableFont" },
  { attr: "letter-spacing", key: "letterSpacing" },
  { attr: "reduce-motion", key: "reduceMotion" },
  { attr: "large-cursor", key: "largeCursor" },
  { attr: "hide-images", key: "hideImages" },
  { attr: "underline-links", key: "underlineLinks" },
  { attr: "keyboard-focus", key: "keyboardFocus" },
];

export function normalizeSettings(raw: Partial<AccessibilitySettings>): AccessibilitySettings {
  const fontScale = Math.min(
    FONT_SCALE_MAX,
    Math.max(FONT_SCALE_MIN, raw.fontScale ?? DEFAULT_A11Y_SETTINGS.fontScale),
  );

  const contrast: ContrastMode =
    raw.contrast === "high" || raw.contrast === "dark" || raw.contrast === "light"
      ? raw.contrast
      : "default";

  return {
    fontScale,
    contrast,
    grayscale: Boolean(raw.grayscale),
    highlightLinks: Boolean(raw.highlightLinks),
    readableFont: Boolean(raw.readableFont),
    letterSpacing: Boolean(raw.letterSpacing),
    reduceMotion: Boolean(raw.reduceMotion),
    largeCursor: Boolean(raw.largeCursor),
    hideImages: Boolean(raw.hideImages),
    underlineLinks: Boolean(raw.underlineLinks),
    keyboardFocus: Boolean(raw.keyboardFocus),
  };
}

export function loadAccessibilitySettings(): AccessibilitySettings {
  if (typeof window === "undefined") return { ...DEFAULT_A11Y_SETTINGS };

  try {
    const stored = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!stored) return { ...DEFAULT_A11Y_SETTINGS };
    return normalizeSettings(JSON.parse(stored) as Partial<AccessibilitySettings>);
  } catch {
    return { ...DEFAULT_A11Y_SETTINGS };
  }
}

export function saveAccessibilitySettings(settings: AccessibilitySettings): void {
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
}

export function applyAccessibilitySettings(settings: AccessibilitySettings): void {
  const html = document.documentElement;

  html.style.fontSize = settings.fontScale === 100 ? "" : `${settings.fontScale}%`;

  if (settings.contrast === "default") {
    html.removeAttribute("data-a11y-contrast");
  } else {
    html.setAttribute("data-a11y-contrast", settings.contrast);
  }

  for (const { attr, key } of BOOLEAN_ATTRS) {
    if (settings[key]) {
      html.setAttribute(`data-a11y-${attr}`, "true");
    } else {
      html.removeAttribute(`data-a11y-${attr}`);
    }
  }
}

export function clearAccessibilitySettings(): AccessibilitySettings {
  if (typeof window !== "undefined") {
    localStorage.removeItem(A11Y_STORAGE_KEY);
  }
  applyAccessibilitySettings(DEFAULT_A11Y_SETTINGS);
  return { ...DEFAULT_A11Y_SETTINGS };
}

export const A11Y_INIT_SCRIPT = `(function(){try{var k="${A11Y_STORAGE_KEY}";var r=localStorage.getItem(k);if(!r)return;var s=JSON.parse(r);var h=document.documentElement;if(s.fontScale&&s.fontScale!==100)h.style.fontSize=s.fontScale+"%";if(s.contrast&&s.contrast!=="default")h.setAttribute("data-a11y-contrast",s.contrast);var m=[["grayscale","grayscale"],["highlight-links","highlightLinks"],["readable-font","readableFont"],["letter-spacing","letterSpacing"],["reduce-motion","reduceMotion"],["large-cursor","largeCursor"],["hide-images","hideImages"],["underline-links","underlineLinks"],["keyboard-focus","keyboardFocus"]];for(var i=0;i<m.length;i++){if(s[m[i][1]])h.setAttribute("data-a11y-"+m[i][0],"true");}}catch(e){}})();`;
