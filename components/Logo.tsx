"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const LOGO_EXTENSIONS = ["png", "webp", "jpg", "jpeg", "svg"] as const;

export default function Logo({
  className = "",
  variant = "default",
  size = "header",
}: {
  className?: string;
  variant?: "default" | "light";
  size?: "header" | "footer";
}) {
  const { t } = useLanguage();
  const [extensionIndex, setExtensionIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const textColor = variant === "light" ? "text-white" : "text-brand-dark";
  const subTextColor = variant === "light" ? "text-white/70" : "text-brand-dark/70";

  const imageSizeClass =
    size === "footer"
      ? "max-h-20 w-auto max-w-[220px] object-contain sm:max-h-24 sm:max-w-[260px]"
      : "h-[4.35rem] w-auto max-w-[min(52vw,220px)] object-contain sm:h-[4.6rem] sm:max-w-[min(44vw,280px)] lg:max-w-[320px] scale-[1.2] sm:scale-[1.28] lg:scale-[1.34] origin-center";

  if (failed || extensionIndex >= LOGO_EXTENSIONS.length) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-white">
          {t.siteName.charAt(0)}
        </div>
        <div className="leading-tight">
          <p className={`text-base font-bold ${textColor}`}>{t.siteName}</p>
          <p className={`text-xs ${subTextColor}`}>{t.siteTagline}</p>
        </div>
      </div>
    );
  }

  const ext = LOGO_EXTENSIONS[extensionIndex];

  return (
    <div
      className={`relative flex items-center overflow-visible ${
        size === "footer" ? "" : "h-full"
      } ${className}`}
    >
      <Image
        src={`/logoNoBackground.${ext}`}
        alt={t.siteName}
        width={280}
        height={112}
        className={imageSizeClass}
        priority
        onError={() => {
          if (extensionIndex < LOGO_EXTENSIONS.length - 1) {
            setExtensionIndex((i) => i + 1);
          } else {
            setFailed(true);
          }
        }}
      />
    </div>
  );
}
