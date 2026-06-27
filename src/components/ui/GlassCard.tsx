"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
  delay?: number;
  glowColor?: string;
}

export function GlassCard({ children, className, hoverLift = true, delay = 0, glowColor }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverLift ? { y: -6, transition: { duration: 0.25 } } : undefined}
      className={cn(
        "relative bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 shadow-sm print-avoid-break",
        "hover:shadow-xl hover:border-slate-300/80 transition-shadow duration-300",
        glowColor && `hover:shadow-[0_0_30px_${glowColor}]`,
        className
      )}
    >
      {children}
    </motion.div>
  );
}
