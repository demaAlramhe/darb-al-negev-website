"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LOGO_ICON_PATH } from "@/lib/constants";

const sizeClasses = {
  hero: "h-[88%] w-[88%]",
  footer: "h-24 w-24",
  sm: "h-10 w-10",
} as const;

export default function LogoIcon({
  size = "hero",
  className = "",
  priority = false,
  decorative = false,
}: {
  size?: keyof typeof sizeClasses;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <Image
      src={LOGO_ICON_PATH}
      alt={decorative ? "" : t.siteName}
      width={256}
      height={256}
      className={`rounded-full object-contain ${sizeClasses[size]} ${className}`}
      priority={priority}
      aria-hidden={decorative}
    />
  );
}
