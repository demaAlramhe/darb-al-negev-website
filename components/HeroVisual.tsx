"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Luggage,
  MapPin,
  Plane,
  Stamp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { TravelPackage } from "@/types/package";
import LogoIcon from "./LogoIcon";

const routes = [
  { d: "M 48 148 Q 120 72 188 108", delay: 0 },
  { d: "M 72 188 Q 168 148 248 88", delay: 0.35 },
  { d: "M 108 208 Q 188 108 288 168", delay: 0.7 },
  { d: "M 56 108 Q 148 188 272 128", delay: 1.05 },
];

const destinationPositions = [
  { position: "left-[18%] top-[18%]", delay: 0 },
  { position: "right-[14%] top-[10%]", delay: 0.2 },
  { position: "right-[16%] bottom-[30%]", delay: 0.4 },
  { position: "left-[14%] bottom-[24%]", delay: 0.6 },
];

const iconOrbs = [
  { Icon: Building2, position: "left-[20%] top-[38%]", delay: 0 },
  { Icon: Luggage, position: "right-[18%] top-[36%]", delay: 0.15 },
  { Icon: Stamp, position: "left-[22%] bottom-[20%]", delay: 0.3 },
];

export default function HeroVisual({ miniPackages }: { miniPackages: TravelPackage[] }) {
  const { t, locale } = useLanguage();
  const miniOffers = miniPackages.slice(0, 2);

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[400px]">
      <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/95 via-brand-bg/60 to-brand-accent/12 shadow-xl shadow-brand-dark/10 ring-1 ring-white/70 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-1/3 left-1/2 h-2/5 w-2/5 -translate-x-1/2 rounded-full bg-brand-accent/12 blur-2xl" />
          <div className="absolute bottom-0 end-0 h-1/3 w-1/3 rounded-full bg-sky-200/25 blur-2xl" />
        </div>

        <div className="relative flex h-full flex-col p-3.5 sm:p-4">
          <div className="mb-2 flex flex-wrap justify-center gap-1">
            {t.hero.visual.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                className="rounded-full border border-brand-accent/20 bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-brand-dark/75 shadow-sm backdrop-blur-sm sm:text-[11px]"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="relative min-h-0 flex-1">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-[62%] w-[62%] rounded-full border border-dashed border-brand-accent/20" />
            </motion.div>

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 320 240"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="heroRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ae9172" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ae9172" stopOpacity="0.85" />
                </linearGradient>
              </defs>
              {routes.map((route) => (
                <g key={route.d}>
                  <motion.path
                    d={route.d}
                    stroke="url(#heroRouteGrad)"
                    strokeWidth="1.5"
                    strokeDasharray="5 7"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.65 }}
                    transition={{ duration: 2.2, delay: route.delay, ease: "easeOut" }}
                  />
                </g>
              ))}
            </svg>

            <motion.div
              className="absolute left-1/2 top-[46%] z-20 flex h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white p-1.5 shadow-lg ring-2 ring-brand-accent/25 sm:p-2"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-brand-bg/80">
                <LogoIcon size="hero" priority className="h-[92%] w-[92%]" />
              </div>
            </motion.div>

            {t.hero.visual.destinations.map((name, index) => {
              const pos = destinationPositions[index];
              return (
                <motion.div
                  key={name}
                  className={`absolute ${pos.position} flex items-center gap-1 rounded-full border border-white/80 bg-white/90 px-2 py-1 shadow-md backdrop-blur-sm`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
                  transition={{
                    opacity: { delay: 0.5 + pos.delay, duration: 0.4 },
                    scale: { delay: 0.5 + pos.delay, duration: 0.4 },
                    y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut", delay: pos.delay },
                  }}
                >
                  <MapPin className="h-2.5 w-2.5 shrink-0 text-brand-accent" />
                  <span className="text-[9px] font-semibold text-brand-dark sm:text-[10px]">{name}</span>
                </motion.div>
              );
            })}

            {iconOrbs.map(({ Icon, position, delay }) => (
              <motion.div
                key={position}
                className={`absolute ${position} flex h-8 w-8 items-center justify-center rounded-xl bg-white/95 text-brand-accent shadow-md ring-1 ring-brand-dark/5`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                transition={{
                  opacity: { delay: 0.6 + delay, duration: 0.35 },
                  scale: { delay: 0.6 + delay, duration: 0.35 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
                }}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </motion.div>
            ))}

            <motion.div
              className="absolute left-[58%] top-[40%] z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-brand-dark text-white shadow-lg"
              animate={{
                x: [0, 6, 12, 6, 0],
                y: [0, -4, 0, 4, 0],
                rotate: [-35, -30, -35],
              }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <Plane className="h-3.5 w-3.5 -rotate-45" />
            </motion.div>

            {miniOffers.length > 0
              ? miniOffers.map((pkg, index) => {
              const badge = pkg.badge ? t.packages.badges[pkg.badge] : null;
              const position =
                index === 0
                  ? "absolute left-[4%] top-[6%] z-30 max-w-[44%]"
                  : "absolute right-[4%] bottom-[4%] z-30 max-w-[44%]";

              return (
                <motion.a
                  key={pkg.id}
                  href="#packages"
                  className={`${position} block rounded-xl border border-white/80 bg-white/95 p-2.5 shadow-lg backdrop-blur-md transition-shadow hover:shadow-xl`}
                  initial={{ opacity: 0, y: index === 0 ? -10 : 10 }}
                  animate={{ opacity: 1, y: [0, index === 0 ? -3 : 3, 0] }}
                  transition={{
                    opacity: { delay: 0.85 + index * 0.15, duration: 0.5 },
                    y: { duration: 5 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
                  }}
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
            className="mt-2 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-dark/8 bg-white/70 px-3 py-1 text-[10px] font-semibold text-brand-dark/70 shadow-sm">
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
