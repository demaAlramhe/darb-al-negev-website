"use client";

import { motion } from "framer-motion";
import { MapPin, Plane } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { TravelPackage } from "@/types/package";
import HeroMapBackground from "./HeroMapBackground";

const destinationPositions = [
  { position: "right-[10%] top-[14%]", delay: 0 },
  { position: "left-[12%] bottom-[22%]", delay: 0.25 },
];

export default function HeroVisual({
  miniPackages,
  className = "",
}: {
  miniPackages: TravelPackage[];
  className?: string;
}) {
  const { t, locale } = useLanguage();
  const miniOffers = miniPackages.slice(0, 2);
  const destinations = t.hero.visual.destinations.slice(0, 2);

  return (
    <div className={`relative w-full max-w-[360px] sm:max-w-[380px] ${className}`}>
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-white/90 shadow-xl shadow-brand-dark/15 ring-1 ring-white/80 backdrop-blur-md">
        <div className="relative flex h-full flex-col p-3.5 sm:p-4">
          <div className="mb-3 flex flex-wrap justify-center gap-1.5">
            {t.hero.visual.tags.slice(0, 3).map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                className="rounded-full border border-brand-accent/15 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-brand-dark/75 shadow-sm sm:text-[11px]"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="relative min-h-0 flex-1">
            <HeroMapBackground />

            <motion.div
              className="absolute left-[54%] top-[38%] z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-dark text-white shadow-lg"
              animate={{
                x: [0, 5, 0],
                y: [0, -3, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Plane className="h-4 w-4 -rotate-45" />
            </motion.div>

            {destinations.map((name, index) => {
              const pos = destinationPositions[index];
              return (
                <motion.div
                  key={name}
                  className={`absolute ${pos.position} flex items-center gap-1 rounded-full border border-white/80 bg-white/95 px-2.5 py-1 shadow-md`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + pos.delay, duration: 0.4 }}
                >
                  <MapPin className="h-2.5 w-2.5 shrink-0 text-brand-accent" />
                  <span className="text-[9px] font-semibold text-brand-dark sm:text-[10px]">{name}</span>
                </motion.div>
              );
            })}

            {miniOffers.length > 0
              ? miniOffers.map((pkg, index) => {
                  const badge = pkg.badge ? t.packages.badges[pkg.badge] : null;
                  const position =
                    index === 0
                      ? "absolute left-[5%] top-[8%] z-20 max-w-[46%]"
                      : "absolute right-[5%] bottom-[6%] z-20 max-w-[46%]";

                  return (
                    <motion.a
                      key={pkg.id}
                      href="#packages"
                      className={`${position} block rounded-xl border border-white/90 bg-white/95 p-2.5 shadow-lg transition-shadow hover:shadow-xl`}
                      initial={{ opacity: 0, y: index === 0 ? -8 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.12, duration: 0.45 }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-sm">
                          {pkg.imageIcon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-1">
                            <p className="truncate text-[10px] font-bold leading-tight text-brand-dark sm:text-[11px]">
                              {pkg.title[locale]}
                            </p>
                            {badge ? (
                              <span className="shrink-0 rounded-full bg-brand-accent/15 px-1.5 py-0.5 text-[8px] font-bold text-brand-accent">
                                {badge}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-0.5 truncate text-[9px] text-brand-dark/55">{pkg.duration[locale]}</p>
                        </div>
                      </div>
                      <p className="mt-1.5 text-[10px] font-bold text-brand-accent">
                        {t.hero.visual.startingFrom} {pkg.price[locale]}
                      </p>
                    </motion.a>
                  );
                })
              : null}
          </div>

          <motion.div
            className="mt-3 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-dark/8 bg-white/85 px-3 py-1 text-[10px] font-semibold text-brand-dark/75 shadow-sm">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
                ✓
              </span>
              {t.hero.visual.trusted}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
