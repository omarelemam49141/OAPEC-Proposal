import { CLIENT_FIXED_TOTAL, clientTimelineWeeks } from "./client-proposal-config";

export const addonPrices = {
  base: CLIENT_FIXED_TOTAL,
  mobileUx: 300,
  mobileApps: 2000,
  conference: 2800,
  conferenceAdvanced: 1000,
  cmsStrapi: 1300,
  cmsCustom: 2500,
} as const;

export type WeekRange = { min: number; max: number };

export const addonTimelineWeeks = {
  website: { min: clientTimelineWeeks.min, max: clientTimelineWeeks.max },
  mobile: { min: 8, max: 9 },
  conference: { min: 5, max: 6 },
  conferenceAdvanced: 1,
  cmsStrapi: { min: 2, max: 2.5 },
  cmsCustom: { min: 5, max: 6 },
} as const;

export const addonTimelines = {
  website: clientTimelineWeeks,
  mobile: { labelEn: "8–9 weeks", labelAr: "8–9 أسابيع" },
  conference: { labelEn: "5–6 weeks", labelAr: "5–6 أسابيع" },
  cmsStrapi: { labelEn: "+2–2.5 weeks (Phase 2)", labelAr: "+2–2.5 أسابيع (المرحلة 2)" },
  cmsCustom: { labelEn: "+5–6 weeks (Phase 2)", labelAr: "+5–6 أسابيع (المرحلة 2)" },
} as const;

export type CmsChoice = "none" | "strapi" | "custom";

export type AddonSelection = {
  mobile: boolean;
  conference: boolean;
  conferenceAdvanced: boolean;
  cms: CmsChoice;
};

export const defaultAddonSelection: AddonSelection = {
  mobile: false,
  conference: false,
  conferenceAdvanced: false,
  cms: "none",
};

export function conferenceDurationWeeks(advanced: boolean): WeekRange {
  const c = addonTimelineWeeks.conference;
  if (!advanced) return { min: c.min, max: c.max };
  const extra = addonTimelineWeeks.conferenceAdvanced;
  return { min: c.min + extra, max: c.max + extra };
}

export function conferenceTotalPrice(advanced: boolean): number {
  return addonPrices.conference + (advanced ? addonPrices.conferenceAdvanced : 0);
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
    total += conferenceTotalPrice(selection.conferenceAdvanced);
  }
  if (selection.cms === "strapi") total += addonPrices.cmsStrapi;
  if (selection.cms === "custom") total += addonPrices.cmsCustom;
  return total;
}

/**
 * Website and mobile run in parallel (mobile: 8–9 wks).
 * Conference starts after mobile ends (if mobile selected), else after website ends.
 * CMS Phase 2 is sequential after the above completes.
 */
export function computeTotalDuration(selection: AddonSelection): WeekRange {
  const w = addonTimelineWeeks.website;
  const m = addonTimelineWeeks.mobile;
  const c = conferenceDurationWeeks(selection.conferenceAdvanced);

  let endMin: number;
  let endMax: number;

  if (selection.conference) {
    const startMin = selection.mobile ? m.min : w.min;
    const startMax = selection.mobile ? m.max : w.max;
    endMin = startMin + c.min;
    endMax = startMax + c.max;
  } else if (selection.mobile) {
    endMin = m.min;
    endMax = m.max;
  } else {
    endMin = w.min;
    endMax = w.max;
  }

  if (selection.cms === "strapi") {
    endMin += addonTimelineWeeks.cmsStrapi.min;
    endMax += addonTimelineWeeks.cmsStrapi.max;
  }
  if (selection.cms === "custom") {
    endMin += addonTimelineWeeks.cmsCustom.min;
    endMax += addonTimelineWeeks.cmsCustom.max;
  }

  return { min: endMin, max: endMax };
}

export type TimelineLine = { key: string; labelEn: string; labelAr: string };

export function computeAddonTimelines(selection: AddonSelection): TimelineLine[] {
  const lines: TimelineLine[] = [
    {
      key: "website",
      labelEn: `Website: ${addonTimelines.website.labelEn}`,
      labelAr: `الموقع: ${addonTimelines.website.labelAr}`,
    },
  ];
  if (selection.mobile) {
    lines.push({
      key: "mobile",
      labelEn: `Native apps (iOS + Android): ${addonTimelines.mobile.labelEn}`,
      labelAr: `التطبيقات (iOS + Android): ${addonTimelines.mobile.labelAr}`,
    });
  }
  if (selection.conference) {
    const confWeeks = conferenceDurationWeeks(selection.conferenceAdvanced);
    const confLabelEn =
      confWeeks.min === confWeeks.max
        ? `${confWeeks.min} weeks`
        : `${confWeeks.min}–${confWeeks.max} weeks`;
    const confLabelAr =
      confWeeks.min === confWeeks.max
        ? `${confWeeks.min} أسابيع`
        : `${confWeeks.min}–${confWeeks.max} أسابيع`;
    const afterEn = selection.mobile
      ? "starts after native apps complete (week 8–9)"
      : "starts after website complete (week 6–7)";
    const afterAr = selection.mobile
      ? "يبدأ بعد اكتمال التطبيقات (الأسبوع 8–9)"
      : "يبدأ بعد اكتمال الموقع (الأسبوع 6–7)";
    const advancedEn = selection.conferenceAdvanced ? ", incl. advanced add-ons" : "";
    const advancedAr = selection.conferenceAdvanced ? "، شامل الإضافات المتقدمة" : "";
    lines.push({
      key: "conference",
      labelEn: `Conference module: ${confLabelEn} (${afterEn}${advancedEn})`,
      labelAr: `وحدة المؤتمرات: ${confLabelAr} (${afterAr}${advancedAr})`,
    });
  }
  if (selection.cms === "strapi") {
    lines.push({
      key: "cms",
      labelEn: `CMS (Strapi): ${addonTimelines.cmsStrapi.labelEn}`,
      labelAr: `CMS (Strapi): ${addonTimelines.cmsStrapi.labelAr}`,
    });
  }
  if (selection.cms === "custom") {
    lines.push({
      key: "cms",
      labelEn: `Custom CMS: ${addonTimelines.cmsCustom.labelEn}`,
      labelAr: `CMS مخصص: ${addonTimelines.cmsCustom.labelAr}`,
    });
  }
  return lines;
}
