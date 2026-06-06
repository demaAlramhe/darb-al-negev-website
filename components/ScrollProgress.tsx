"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? scrollTop / max : 0);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-brand-dark/5"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-brand-accent/80 to-brand-accent"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
