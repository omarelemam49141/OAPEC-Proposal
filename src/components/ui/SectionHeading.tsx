"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  subtitleClassName?: string;
  badgeColor?: "blue" | "purple" | "green" | "amber";
}

const colorMap = {
  blue: "text-blue-600 bg-blue-50 border-blue-200/60",
  purple: "text-purple-600 bg-purple-50 border-purple-200/60",
  green: "text-emerald-600 bg-emerald-50 border-emerald-200/60",
  amber: "text-amber-600 bg-amber-50 border-amber-200/60",
};

export function SectionHeading({ badge, title, subtitle, subtitleClassName, badgeColor = "blue" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <span className={`inline-block px-4 py-1.5 text-sm font-bold tracking-wide rounded-full border ${colorMap[badgeColor]}`}>
        {badge}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mt-5 mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
