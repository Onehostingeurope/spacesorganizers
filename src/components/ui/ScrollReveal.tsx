"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale";
  delay?: number;
}

export function ScrollReveal({
  children,
  variant = "slide-up",
  delay = 0,
  ...props
}: ScrollRevealProps) {
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1], // Luxury cubic bezier
      }}
      variants={variants[variant]}
      {...props}
    >
      {children}
    </motion.div>
  );
}
