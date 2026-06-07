"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import {
  DEVELOPER_NAME,
  DEVELOPER_URL,
  EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE,
  PHONE_DISPLAY,
} from "@/lib/constants";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon } from "./ui/Icons";

const footerLinks = [
  { key: "about" as const, href: "/#about" },
  { key: "services" as const, href: "/#services" },
  { key: "packages" as const, href: "/offers" },
  { key: "faq" as const, href: "/#faq" },
  { key: "contact" as const, href: "/#contact" },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-dark/10 bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-block">
              <Logo variant="light" size="footer" />
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              {t.footer.description}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-accent">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-accent">
              {t.footer.contactInfo}
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0 text-brand-accent" />
                <a href={`tel:${PHONE}`} dir="ltr" className="hover:text-white">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 shrink-0 text-brand-accent" />
                <a href={`mailto:${EMAIL}`} dir="ltr" className="hover:text-white">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 transition-colors hover:text-white"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 transition-colors hover:text-white"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/55">
          © {year} {t.siteName}. {t.footer.rights}.
          <p className="mt-2 text-xs text-white/40">
            {t.footer.developedBy}{" "}
            <a
              href={DEVELOPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 transition-colors hover:text-brand-accent"
            >
              {DEVELOPER_NAME}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
