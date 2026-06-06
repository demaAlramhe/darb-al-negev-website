"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { LOGO_FULL_PATH } from "@/lib/constants";

const TILT = 7;

export default function HeroBrandLogo({
  alt,
  compact = false,
}: {
  alt: string;
  compact?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 140, damping: 22, mass: 0.6 });
  const springRotateY = useSpring(rotateY, { stiffness: 140, damping: 22, mass: 0.6 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(px * TILT);
    rotateX.set(py * -TILT);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${
        compact
          ? "max-w-[min(100%,260px)] -mt-2 -translate-y-4"
          : "max-w-[min(100%,280px)] sm:max-w-[440px] lg:max-w-[480px] xl:max-w-[520px]"
      }`}
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/14 blur-3xl"
      />

      <motion.div
        className="relative will-change-transform"
        style={
          reduceMotion
            ? undefined
            : {
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
              }
        }
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={
          reduceMotion
            ? undefined
            : {
                y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              }
        }
        whileHover={reduceMotion ? undefined : { scale: 1.035 }}
      >
        <Image
          src={LOGO_FULL_PATH}
          alt={alt}
          width={560}
          height={224}
          priority
          className="relative mx-auto w-full object-contain drop-shadow-[0_14px_36px_rgba(71,71,71,0.16)] transition-[filter] duration-500 hover:drop-shadow-[0_18px_44px_rgba(174,145,114,0.28)]"
        />
      </motion.div>
    </div>
  );
}
