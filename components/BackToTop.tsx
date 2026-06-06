"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BackToTop() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 520);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduceMotion ? undefined : { scale: 1.06, y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          onClick={scrollToTop}
          className="fixed bottom-5 end-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-brand-dark/10 bg-white/90 text-brand-dark shadow-lg shadow-brand-dark/10 backdrop-blur-md transition-colors hover:border-brand-accent/30 hover:text-brand-accent sm:bottom-6 sm:end-6 sm:h-12 sm:w-12"
          aria-label={t.common.backToTop}
        >
          <ChevronUp className="h-5 w-5" strokeWidth={2} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
