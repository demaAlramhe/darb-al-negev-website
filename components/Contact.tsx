"use client";

import { FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE,
  PHONE_DISPLAY,
  getWhatsAppInquiryUrl,
} from "@/lib/constants";
import AnimateIn from "./ui/AnimateIn";
import SectionHeading from "./ui/SectionHeading";
import { WhatsAppButton } from "./ui/SectionHeading";
import TravelDecor from "./ui/TravelDecor";
import { FacebookIcon, InstagramIcon } from "./ui/Icons";

export default function Contact() {
  const { t } = useLanguage();
  const whatsappHref = getWhatsAppInquiryUrl(t.whatsapp.general);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const text = [
      t.contact.form.whatsappIntro,
      "",
      `${t.contact.form.name}: ${name}`,
      `${t.contact.form.phone}: ${phone}`,
      "",
      `${t.contact.form.message}:`,
      message,
    ].join("\n");

    window.open(getWhatsAppInquiryUrl(text), "_blank", "noopener,noreferrer");
  }

  const contactCards = [
    {
      href: whatsappHref,
      external: true,
      icon: MessageCircle,
      label: t.contact.whatsApp,
      value: PHONE_DISPLAY,
      desc: t.contact.whatsAppDesc,
      iconBg: "bg-[#25D366]/10",
      iconColor: "text-[#128C7E]",
      hover: "hover:border-[#25D366]/40",
    },
    {
      href: `tel:${PHONE}`,
      external: false,
      icon: Phone,
      label: t.contact.phone,
      value: PHONE_DISPLAY,
      desc: t.contact.phoneDesc,
      iconBg: "bg-brand-accent/10",
      iconColor: "text-brand-accent",
      hover: "hover:border-brand-accent/40",
    },
    {
      href: `mailto:${EMAIL}`,
      external: false,
      icon: Mail,
      label: t.contact.email,
      value: EMAIL,
      desc: t.contact.emailDesc,
      iconBg: "bg-brand-accent/10",
      iconColor: "text-brand-accent",
      hover: "hover:border-brand-accent/40",
    },
  ];

  return (
    <section id="contact" className="section-soft-gradient relative overflow-hidden py-20 sm:py-24">
      <TravelDecor variant="pins" />
      <div className="pointer-events-none absolute -end-20 top-1/4 h-72 w-72 rounded-full bg-brand-accent/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t.contact.label}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {contactCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <AnimateIn key={card.label} delay={index * 0.08}>
                  <a
                    href={card.href}
                    {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group premium-card flex items-center gap-4 p-5 ${card.hover}`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark/55">
                        {card.label}
                      </p>
                      <p className="truncate font-bold text-brand-dark" dir="ltr">
                        {card.value}
                      </p>
                      <p className="text-xs text-brand-dark/60">{card.desc}</p>
                    </div>
                  </a>
                </AnimateIn>
              );
            })}

            <AnimateIn delay={0.3}>
              <div className="rounded-2xl border border-brand-dark/8 bg-white/80 p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-dark/55">
                  {t.contact.followUs}
                </p>
                <p className="mb-4 text-sm text-brand-dark/65">{t.contact.socialDesc}</p>
                <div className="flex gap-3">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-dark/10 bg-brand-bg text-brand-dark transition-all hover:border-brand-accent hover:text-brand-accent"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-dark/10 bg-brand-bg text-brand-dark transition-all hover:border-brand-accent hover:text-brand-accent"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn delay={0.15} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-brand-dark/8 bg-white p-6 shadow-md shadow-brand-dark/5 sm:p-8"
            >
              <h3 className="mb-6 text-xl font-bold text-brand-dark">{t.contact.formTitle}</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    {t.contact.form.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    suppressHydrationWarning
                    className="w-full rounded-xl border border-brand-dark/10 bg-brand-bg/50 px-4 py-3.5 text-brand-dark outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    {t.contact.form.phone}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    dir="ltr"
                    suppressHydrationWarning
                    className="w-full rounded-xl border border-brand-dark/10 bg-brand-bg/50 px-4 py-3.5 text-brand-dark outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    suppressHydrationWarning
                    className="w-full resize-none rounded-xl border border-brand-dark/10 bg-brand-bg/50 px-4 py-3.5 text-brand-dark outline-none transition-all focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="mt-6 w-full rounded-full bg-brand-dark px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-dark/15 transition-colors hover:bg-brand-dark/90 sm:text-base"
                suppressHydrationWarning
              >
                {t.contact.form.submit}
              </motion.button>

              <p className="mt-3 text-xs text-brand-dark/55">{t.contact.form.note}</p>
            </form>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.35} className="mt-12">
          <div className="flex flex-col items-center justify-between gap-5 rounded-3xl border border-brand-accent/20 bg-gradient-to-r from-brand-accent/10 via-white/90 to-brand-bg/80 p-6 text-center shadow-sm sm:flex-row sm:p-8 sm:text-start">
            <div>
              <p className="text-lg font-bold text-brand-dark sm:text-xl">{t.contact.ctaTitle}</p>
              <p className="mt-1 text-sm text-brand-dark/70 sm:text-base">{t.contact.ctaSubtitle}</p>
            </div>
            <WhatsAppButton href={whatsappHref} className="shrink-0">
              {t.contact.ctaButton}
            </WhatsAppButton>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
