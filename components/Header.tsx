"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveSection } from "@/hooks/useActiveSection";
import { CloseIcon, MenuIcon } from "./ui/Icons";

const navLinks = [
  { key: "home" as const, href: "#home", sectionId: "home" },
  { key: "about" as const, href: "#about", sectionId: "about" },
  { key: "services" as const, href: "#services", sectionId: "services" },
  { key: "packages" as const, href: "#packages", sectionId: "packages" },
  { key: "faq" as const, href: "#faq", sectionId: "faq" },
  { key: "contact" as const, href: "#contact", sectionId: "contact" },
];

export default function Header() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = useMemo(() => navLinks.map((link) => link.sectionId), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function linkClass(sectionId: string, mobile = false) {
    const isActive = activeSection === sectionId;

    if (mobile) {
      return `rounded-xl px-3 py-3 text-base font-medium transition-colors ${
        isActive
          ? "bg-brand-accent/12 text-brand-accent"
          : "text-brand-dark hover:bg-brand-accent/10 hover:text-brand-accent"
      }`;
    }

    return `relative inline-block py-1 transition-colors ${
      isActive ? "font-semibold text-brand-accent" : "text-brand-dark/80 hover:text-brand-accent"
    }`;
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-brand-dark/10 bg-brand-bg/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-4 px-4 sm:h-[5rem] sm:px-6 lg:px-8">
        <Link
          href="#home"
          className="relative z-10 flex h-full shrink-0 items-center overflow-visible"
          onClick={() => setMenuOpen(false)}
        >
          <Logo size="header" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.key} href={link.href} className={`text-sm font-medium ${linkClass(link.sectionId)}`}>
              {t.nav[link.key]}
              {activeSection === link.sectionId ? (
                <span className="absolute -bottom-1 inset-x-0 mx-auto h-0.5 w-4 rounded-full bg-brand-accent" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher compact />
          <button
            type="button"
            className="rounded-xl border border-brand-dark/10 bg-white/80 p-2 text-brand-dark"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.common.closeMenu : t.common.openMenu}
            suppressHydrationWarning
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-brand-dark/10 bg-brand-bg/98 px-4 py-5 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={linkClass(link.sectionId, true)}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[link.key]}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
