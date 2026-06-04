import type { ReactNode } from "react";
import { SectionLabel } from "./Icons";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-start items-start";

  return (
    <div className={`mb-10 flex max-w-3xl flex-col gap-3 ${alignment} ${align === "center" ? "mx-auto" : ""}`}>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">{title}</h2>
      {subtitle ? <p className="text-base leading-relaxed text-brand-dark/75 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

export function WhatsAppButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "dark";
  className?: string;
}) {
  const styles = {
    primary: "bg-[#25D366] text-white hover:bg-[#1ebe5d] shadow-lg shadow-[#25D366]/25",
    outline: "border-2 border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10",
    dark: "bg-brand-dark text-white hover:bg-brand-dark/90",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 sm:px-6 sm:text-base ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
