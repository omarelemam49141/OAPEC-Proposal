"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  CalendarDays,
  Database,
  CheckCircle2,
  AlertTriangle,
  Package,
  Plus,
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
  type CmsChoice,
} from "@/lib/client-addons-config";
import { clientNavSectionIds } from "@/lib/client-proposal-config";
import { clientCopy } from "@/lib/client-proposal-i18n";
import { cn } from "@/lib/utils";

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
          className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 shrink-0"
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
      const confPrice = conferenceTotalPrice(selection.conferenceAdvanced);
      const label =
        lang === "ar"
          ? `وحدة المؤتمرات (${formatUsd(confPrice)}${selection.conferenceAdvanced ? " — إضافات متقدمة" : ""})`
          : `Conference module (${formatUsd(confPrice)}${selection.conferenceAdvanced ? " — advanced add-ons" : ""})`;
      items.push(label);
    }
    if (selection.cms === "strapi") {
      items.push(lang === "ar" ? `Strapi CMS (${formatUsd(addonPrices.cmsStrapi)})` : `Strapi CMS (${formatUsd(addonPrices.cmsStrapi)})`);
    }
    if (selection.cms === "custom") {
      items.push(
        lang === "ar" ? `CMS مخصص (${formatUsd(addonPrices.cmsCustom)})` : `Custom CMS (${formatUsd(addonPrices.cmsCustom)})`
      );
    }
    return items;
  }, [selection, lang]);

  const conferenceWeeks = conferenceDurationWeeks(selection.conferenceAdvanced);
  const conferencePrice = conferenceTotalPrice(selection.conferenceAdvanced);

  const setCms = (cms: CmsChoice) => {
    setSelection((s) => ({ ...s, cms: s.cms === cms ? "none" : cms }));
  };

  return (
    <section id={clientNavSectionIds.addons} className="scroll-mt-28 py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading badge={nav.addons} title={t.title} subtitle={t.subtitle} badgeColor="purple" />

        {/* Base package */}
        <GlassCard className="mb-6 !p-6 border-emerald-200/80 bg-emerald-50/30">
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
          <div
            className={cn(
              "rounded-3xl border-2 p-6 transition-all",
              selection.conference ? "border-emerald-400 bg-emerald-50/40 shadow-md" : "border-slate-200 bg-white"
            )}
          >
            <label className="flex items-start gap-4 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={selection.conference}
                onChange={(e) =>
                  setSelection((s) => ({
                    ...s,
                    conference: e.target.checked,
                    conferenceAdvanced: e.target.checked ? s.conferenceAdvanced : false,
                  }))
                }
                className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap justify-between gap-2">
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
              </div>
            </label>
            <p className="text-sm text-slate-600 mb-3 ps-9">{t.conference.description}</p>
            <ul className="space-y-1.5 mb-3 ps-9">
              {t.conference.includes.map((line, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <Plus size={12} className="text-amber-500 shrink-0 mt-1" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mb-3 ps-9">
              {t.conference.breakdown.map((row) => (
                <span
                  key={row.label}
                  className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                >
                  {row.label}: {row.value}
                </span>
              ))}
            </div>

            {/* Advanced add-ons — nested option */}
            <div
              className={cn(
                "ms-9 mb-3 rounded-2xl border-2 p-4 transition-all",
                !selection.conference && "opacity-50 pointer-events-none",
                selection.conferenceAdvanced
                  ? "border-amber-300 bg-amber-50/60"
                  : "border-slate-200 bg-white"
              )}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selection.conferenceAdvanced}
                  disabled={!selection.conference}
                  onChange={(e) =>
                    setSelection((s) => ({ ...s, conferenceAdvanced: e.target.checked }))
                  }
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-slate-900 text-sm">{t.conference.advanced.title}</span>
                    <span className="text-xs font-semibold text-amber-800">
                      {t.conference.advanced.priceNote} · {t.conference.advanced.timelineNote}
                    </span>
                  </div>
                  <ol className="space-y-1 list-decimal list-inside text-sm text-slate-600">
                    {t.conference.advanced.includes.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ol>
                </div>
              </label>
            </div>

            <p className="text-xs font-semibold text-amber-900 bg-amber-50 border-2 border-amber-200 rounded-xl px-3 py-2.5 flex gap-2 leading-relaxed ms-9">
              <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-600" />
              {t.conference.disclaimer}
            </p>
          </div>
        </div>

        {/* CMS */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Database size={22} className="text-purple-600" />
            <h3 className="font-bold text-lg text-slate-900">{t.cms.title}</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">{t.cms.subtitle}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setCms("strapi")}
              className={cn(
                "text-start rounded-2xl border-2 p-5 transition-all",
                selection.cms === "strapi"
                  ? "border-purple-400 bg-purple-50 shadow-md"
                  : "border-slate-200 bg-white hover:border-slate-300"
              )}
            >
              <div className="font-bold text-slate-900 mb-1">{t.cms.strapiTitle}</div>
              <div className="text-xs text-slate-500">{t.cms.strapiTimeline}</div>
            </button>
            <button
              type="button"
              onClick={() => setCms("custom")}
              className={cn(
                "text-start rounded-2xl border-2 p-5 transition-all",
                selection.cms === "custom"
                  ? "border-purple-400 bg-purple-50 shadow-md"
                  : "border-slate-200 bg-white hover:border-slate-300"
              )}
            >
              <div className="font-bold text-slate-900 mb-1">{t.cms.customTitle}</div>
              <div className="text-xs text-slate-500">{t.cms.customTimeline}</div>
            </button>
          </div>

          <p className="text-sm text-purple-800 bg-purple-50 border border-purple-200/60 rounded-xl px-4 py-3 mb-6">
            {t.cms.phaseNote}
          </p>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-x-auto">
            <h4 className="font-bold text-slate-900 px-6 py-4 border-b border-slate-100 bg-purple-50/50">
              {t.cms.comparisonTitle}
            </h4>
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                  <th className="p-4 text-start">{t.cms.columns.factor}</th>
                  <th className="p-4 text-start">{t.cms.columns.strapi}</th>
                  <th className="p-4 text-start">{t.cms.columns.custom}</th>
                </tr>
              </thead>
              <tbody>
                {t.cms.rows.map((row, i) => (
                  <tr key={i} className={cn("border-b border-slate-50", i % 2 === 0 ? "bg-white" : "bg-slate-50/40")}>
                    <td className="p-4 font-semibold text-slate-700">{row.factor}</td>
                    <td
                      className={cn(
                        "p-4 text-slate-600",
                        selection.cms === "strapi" && "bg-purple-50/60 font-medium text-purple-900"
                      )}
                    >
                      {row.strapi}
                    </td>
                    <td
                      className={cn(
                        "p-4 text-slate-600",
                        selection.cms === "custom" && "bg-purple-50/60 font-medium text-purple-900"
                      )}
                    >
                      {row.custom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <motion.div
          layout
          className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-8 shadow-xl"
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
      </div>
    </section>
  );
}
