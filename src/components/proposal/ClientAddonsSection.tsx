"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
  Package,
  Plus,
  FileText,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { addonsCopy } from "@/lib/client-addons-i18n";
import {
  addonPrices,
  defaultAddonSelection,
  computeAddonTotal,
  computeTotalDuration,
  formatWeekRange,
  computeAddonTimelines,
  formatUsd,
  conferenceTotalPrice,
  conferenceDurationWeeks,
  type AddonSelection,
} from "@/lib/client-addons-config";
import { clientNavSectionIds } from "@/lib/client-proposal-config";
import { clientCopy } from "@/lib/client-proposal-i18n";
import { cn } from "@/lib/utils";
import { exportProposalAsDocx } from "@/lib/export-proposal-docx";

function CheckboxCard({
  checked,
  onChange,
  disabled,
  children,
  className,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "block cursor-pointer rounded-3xl border-2 p-6 transition-all",
        disabled && "opacity-60 cursor-not-allowed",
        checked ? "border-emerald-400 bg-emerald-50/40 shadow-md" : "border-slate-200 bg-white hover:border-slate-300",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="no-print mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 shrink-0"
        />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </label>
  );
}

export function ClientAddonsSection() {
  const { lang } = useLanguage();
  const t = addonsCopy[lang];
  const nav = clientCopy[lang].nav;

  const [selection, setSelection] = useState<AddonSelection>(defaultAddonSelection);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExportDocx = useCallback(async () => {
    setExporting(true);
    setExportError(null);
    try {
      await exportProposalAsDocx(selection, lang);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : lang === "ar"
            ? "فشل إنشاء Word. حاول مرة أخرى."
            : "Word export failed. Please try again.";
      setExportError(message);
      console.error("Word export failed:", err);
    } finally {
      setExporting(false);
    }
  }, [selection, lang]);

  const total = useMemo(() => computeAddonTotal(selection), [selection]);
  const totalDuration = useMemo(() => computeTotalDuration(selection), [selection]);
  const timelines = useMemo(() => computeAddonTimelines(selection), [selection]);

  const selectedLabels = useMemo(() => {
    const items: string[] = [];
    if (selection.mobile) {
      items.push(
        lang === "ar"
          ? `تطبيقات أصلية + UI/UX (${formatUsd(addonPrices.mobileApps + addonPrices.mobileUx)})`
          : `Native apps + UI/UX (${formatUsd(addonPrices.mobileApps + addonPrices.mobileUx)})`
      );
    }
    if (selection.conference) {
      items.push(
        lang === "ar"
          ? `وحدة المؤتمرات (${formatUsd(conferenceTotalPrice())})`
          : `Conference module (${formatUsd(conferenceTotalPrice())})`
      );
    }
    return items;
  }, [selection, lang]);

  const conferenceWeeks = conferenceDurationWeeks();
  const conferencePrice = conferenceTotalPrice();

  return (
    <section id={clientNavSectionIds.addons} className="scroll-mt-28 py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading badge={nav.addons} title={t.title} subtitle={t.subtitle} subtitleClassName="no-print" badgeColor="purple" />

        {/* Base package */}
        <GlassCard className="mb-6 !p-6 border-emerald-200/80 bg-emerald-50/30 print-avoid-break">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Package size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{t.base.title}</h3>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {t.base.badge}
                </span>
              </div>
            </div>
            <div className="text-end">
              <div className="text-2xl font-black text-emerald-800">{t.base.price}</div>
              <div className="text-sm text-slate-600 font-medium">{t.base.timeline}</div>
            </div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-2">
            {t.base.includes.map((line, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                {line}
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Mobile */}
          <CheckboxCard
            checked={selection.mobile}
            onChange={(mobile) => setSelection((s) => ({ ...s, mobile }))}
            className={cn("print-avoid-break", !selection.mobile && "print:hidden")}
          >
            <div className="flex flex-wrap justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Smartphone size={20} className="text-blue-600" />
                <h4 className="font-bold text-slate-900">{t.mobile.title}</h4>
              </div>
              <div className="text-end">
                <div className="font-black text-emerald-800">
                  {t.mobile.price}{" "}
                  <span className="text-sm font-semibold text-slate-500">+ {t.mobile.uxPrice} UI/UX</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">{t.mobile.timeline}</div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">{t.mobile.description}</p>
            <ul className="space-y-1.5 mb-3">
              {t.mobile.includes.map((line, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <Plus size={12} className="text-blue-500 shrink-0 mt-1" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200/60 rounded-lg px-3 py-2">
              {t.mobile.mobileUxNote}
            </p>
          </CheckboxCard>

          {/* Conference */}
          <CheckboxCard
            checked={selection.conference}
            onChange={(conference) => setSelection((s) => ({ ...s, conference }))}
            className={cn("print-avoid-break", !selection.conference && "print:hidden")}
          >
            <div className="flex flex-wrap justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <CalendarDays size={20} className="text-amber-600" />
                <h4 className="font-bold text-slate-900">{t.conference.title}</h4>
              </div>
              <div className="text-end">
                <div className="font-black text-emerald-800">{formatUsd(conferencePrice)}</div>
                <div className="text-xs text-slate-500 font-medium">
                  {formatWeekRange(conferenceWeeks, lang)} ({t.conference.timelineSuffix})
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">{t.conference.description}</p>
            <ul className="space-y-1.5 mb-3">
              {t.conference.includes.map((line, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <Plus size={12} className="text-amber-500 shrink-0 mt-1" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mb-3">
              {t.conference.breakdown.map((row) => (
                <span
                  key={row.label}
                  className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                >
                  {row.label}: {row.value}
                </span>
              ))}
            </div>
            <p className="text-xs font-semibold text-amber-900 bg-amber-50 border-2 border-amber-200 rounded-xl px-3 py-2.5 flex gap-2 leading-relaxed">
              <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-600" />
              {t.conference.disclaimer}
            </p>
          </CheckboxCard>
        </div>

        {/* Summary */}
        <motion.div
          layout
          className="proposal-summary-print bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-8 shadow-xl print-avoid-break"
        >
          <h3 className="text-xl font-black mb-6">{t.summary.title}</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-sm text-emerald-200/80 font-semibold mb-2">{t.summary.selectedLabel}</div>
              <ul className="space-y-1.5 text-sm text-slate-200">
                <li className="flex gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  {lang === "ar" ? `الباقة الأساسية (${formatUsd(addonPrices.base)})` : `Base package (${formatUsd(addonPrices.base)})`}
                </li>
                {selectedLabels.length === 0 ? (
                  <li className="text-slate-400 italic">{t.summary.noneSelected}</li>
                ) : (
                  selectedLabels.map((label) => (
                    <li key={label} className="flex gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      {label}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div>
              <div className="text-sm text-emerald-200/80 font-semibold mb-2">{t.summary.timelinesTitle}</div>
              <ul className="space-y-1.5 text-sm text-slate-200 mb-6">
                {timelines.map((line) => (
                  <li key={line.key}>{lang === "ar" ? line.labelAr : line.labelEn}</li>
                ))}
              </ul>
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center gap-4">
                  <span className="font-bold text-lg">{t.summary.totalDurationLabel}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${totalDuration.min}-${totalDuration.max}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl sm:text-3xl font-black text-emerald-300 text-end"
                    >
                      {formatWeekRange(totalDuration, lang)}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="font-bold text-lg">{t.summary.totalLabel}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl sm:text-3xl font-black text-emerald-300 text-end"
                    >
                      {formatUsd(total)}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleExportDocx}
            disabled={exporting}
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto min-w-[260px] px-8 py-4 text-lg font-bold bg-gradient-to-r from-emerald-700 to-teal-600 text-white rounded-2xl shadow-xl shadow-emerald-600/20 hover:from-emerald-800 hover:to-teal-700 transition-colors disabled:opacity-70 disabled:cursor-wait"
          >
            {exporting ? <Loader2 size={22} className="animate-spin" /> : <FileText size={22} />}
            {exporting ? t.summary.exportDocxLoading : t.summary.exportDocx}
          </button>
          <p className="mt-3 text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">{t.summary.exportDocxHint}</p>
          {exportError && (
            <p className="mt-3 text-sm text-red-600 font-medium max-w-lg mx-auto leading-relaxed" role="alert">
              {exportError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
