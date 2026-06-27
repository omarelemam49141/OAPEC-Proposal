"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MinusCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { cn } from "@/lib/utils";

export type MatrixRow = {
  id: string;
  label: string;
  pros: string;
  cons: string;
  impact: string;
  recommended?: boolean;
};

type ComparisonMatrixProps = {
  rows: MatrixRow[];
  columns?: { factor: string; pros: string; cons: string; impact: string };
  highlightRecommended?: boolean;
};

const defaultColumns = {
  en: { factor: "Option", pros: "Advantages", cons: "Disadvantages", impact: "Est. impact" },
  ar: { factor: "الخيار", pros: "المزايا", cons: "العيوب", impact: "التأثير التقديري" },
};

export function ComparisonMatrix({
  rows,
  columns,
  highlightRecommended = true,
}: ComparisonMatrixProps) {
  const { lang } = useLanguage();
  const cols = columns ?? defaultColumns[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
    >
      <div className="hidden md:grid md:grid-cols-4 text-center font-bold text-sm border-b border-slate-100 bg-slate-50/80">
        <div className="p-4 text-slate-600 text-start px-6">{cols.factor}</div>
        <div className="p-4 text-emerald-700 border-s border-slate-100">{cols.pros}</div>
        <div className="p-4 text-amber-800 border-s border-slate-100">{cols.cons}</div>
        <div className="p-4 text-blue-700">{cols.impact}</div>
      </div>

      {rows.map((row, i) => (
        <div
          key={row.id}
          className={cn(
            "border-b border-slate-50 last:border-b-0",
            highlightRecommended && row.recommended && "bg-emerald-50/40 ring-1 ring-inset ring-emerald-200/60"
          )}
        >
          {/* Mobile: stacked card */}
          <div className="md:hidden p-5 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900">{row.label}</span>
              {row.recommended && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  {lang === "ar" ? "مُقترح" : "Suggested"}
                </span>
              )}
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase">{cols.pros}</span>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{row.pros}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase">{cols.cons}</span>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{row.cons}</p>
            </div>
            <div className="text-sm font-semibold text-blue-700">{row.impact}</div>
          </div>

          {/* Desktop: table row */}
          <div
            className={cn(
              "hidden md:grid md:grid-cols-4 text-sm",
              i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
            )}
          >
            <div className="p-4 font-semibold text-slate-800 text-start px-6 flex items-start gap-2">
              {row.recommended ? (
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <MinusCircle size={16} className="text-slate-300 shrink-0 mt-0.5" />
              )}
              <span>
                {row.label}
                {row.recommended && (
                  <span className="block text-xs font-bold text-emerald-600 mt-1">
                    {lang === "ar" ? "نقطة انطلاق مقترحة" : "Suggested starting point"}
                  </span>
                )}
              </span>
            </div>
            <div className="p-4 border-s border-slate-100 text-slate-600 leading-relaxed">{row.pros}</div>
            <div className="p-4 border-s border-slate-100 text-slate-600 leading-relaxed">{row.cons}</div>
            <div className="p-4 font-semibold text-blue-700 leading-relaxed flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0 opacity-60" />
              {row.impact}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
