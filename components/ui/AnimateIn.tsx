"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface AnimateInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  y?: number;
}

export default function AnimateIn({
  children,
  className,
  delay = 0,
  y = 28,
  ...props
}: AnimateInProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
