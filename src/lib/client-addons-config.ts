import { CLIENT_FIXED_TOTAL, clientTimelineWeeks } from "./client-proposal-config";

export const addonPrices = {
  base: CLIENT_FIXED_TOTAL,
  mobileUx: 300,
  mobileApps: 2000,
  conference: 5000,
} as const;

export type WeekRange = { min: number; max: number };

export const addonTimelineWeeks = {
  /** Website + custom CMS (merged base package) */
  base: { min: clientTimelineWeeks.min, max: clientTimelineWeeks.max },
  mobile: { min: 9, max: 10 },
  conference: { min: 5, max: 5 },
} as const;

function timelineRangeLabel(range: WeekRange, lang: "en" | "ar"): string {
  if (range.min === range.max) {
    return lang === "ar" ? `${range.min} أسابيع` : `${range.min} weeks`;
  }
  return lang === "ar" ? `${range.min}–${range.max} أسابيع` : `${range.min}–${range.max} weeks`;
}

function weekRangeShort(range: WeekRange): string {
  return range.min === range.max ? `${range.min}` : `${range.min}–${range.max}`;
}

export const addonTimelines = {
  base: clientTimelineWeeks,
  mobile: {
    labelEn: timelineRangeLabel(addonTimelineWeeks.mobile, "en"),
    labelAr: timelineRangeLabel(addonTimelineWeeks.mobile, "ar"),
  },
  conference: {
    labelEn: timelineRangeLabel(addonTimelineWeeks.conference, "en"),
    labelAr: timelineRangeLabel(addonTimelineWeeks.conference, "ar"),
  },
} as const;

export type AddonSelection = {
  mobile: boolean;
  conference: boolean;
};

export const defaultAddonSelection: AddonSelection = {
  mobile: false,
  conference: false,
};

export function conferenceDurationWeeks(): WeekRange {
  return addonTimelineWeeks.conference;
}

export function conferenceTotalPrice(): number {
  return addonPrices.conference;
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export function formatWeekRange(range: WeekRange, lang: "en" | "ar"): string {
  if (range.min === range.max) {
    return lang === "ar" ? `${range.min} أسابيع` : `${range.min} weeks`;
  }
  return lang === "ar" ? `${range.min}–${range.max} أسابيع` : `${range.min}–${range.max} weeks`;
}

export function computeAddonTotal(selection: AddonSelection): number {
  let total = addonPrices.base;
  if (selection.mobile) {
    total += addonPrices.mobileApps + addonPrices.mobileUx;
  }
  if (selection.conference) {
    total += addonPrices.conference;
  }
  return total;
}

/**
 * Base package: 11–13 wks. Mobile (9–10 wks) runs in parallel inside that window.
 * Conference (5 wks) starts after the base package completes — mobile does not gate it.
 */
export function computeTotalDuration(selection: AddonSelection): WeekRange {
  const base = addonTimelineWeeks.base;
  const c = conferenceDurationWeeks();

  if (selection.conference) {
    return { min: base.min + c.min, max: base.max + c.max };
  }

  // Base only, or base + mobile (parallel) — overall window is the base package
  return { min: base.min, max: base.max };
}

export type TimelineLine = { key: string; labelEn: string; labelAr: string };

export function computeAddonTimelines(selection: AddonSelection): TimelineLine[] {
  const lines: TimelineLine[] = [
    {
      key: "base",
      labelEn: `Website + custom CMS: ${addonTimelines.base.labelEn}`,
      labelAr: `الموقع + CMS مخصص: ${addonTimelines.base.labelAr}`,
    },
  ];
  if (selection.mobile) {
    lines.push({
      key: "mobile",
      labelEn: `Native apps (iOS + Android): ${addonTimelines.mobile.labelEn} (parallel with base package)`,
      labelAr: `التطبيقات (iOS + Android): ${addonTimelines.mobile.labelAr} (بالتوازي مع الباقة الأساسية)`,
    });
  }
  if (selection.conference) {
    const confWeeks = conferenceDurationWeeks();
    const confLabelEn =
      confWeeks.min === confWeeks.max
        ? `${confWeeks.min} weeks`
        : `${confWeeks.min}–${confWeeks.max} weeks`;
    const confLabelAr =
      confWeeks.min === confWeeks.max
        ? `${confWeeks.min} أسابيع`
        : `${confWeeks.min}–${confWeeks.max} أسابيع`;
    const afterEn = `starts after base package complete (week ${weekRangeShort(addonTimelineWeeks.base)})`;
    const afterAr = `يبدأ بعد اكتمال الباقة الأساسية (الأسبوع ${weekRangeShort(addonTimelineWeeks.base)})`;
    lines.push({
      key: "conference",
      labelEn: `Conference module: ${confLabelEn} (${afterEn})`,
      labelAr: `وحدة المؤتمرات: ${confLabelAr} (${afterAr})`,
    });
  }
  return lines;
}
