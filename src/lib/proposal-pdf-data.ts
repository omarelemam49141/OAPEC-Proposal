import type { Lang } from "./i18n";
import { clientCopy } from "./client-proposal-i18n";
import { addonsCopy } from "./client-addons-i18n";
import {
  type AddonSelection,
  addonPrices,
  addonTimelines,
  computeAddonTotal,
  computeAddonTimelines,
  computeTotalDuration,
  conferenceDurationWeeks,
  conferenceTotalPrice,
  formatUsd,
  formatWeekRange,
} from "./client-addons-config";

export type PdfScopeItem = {
  id: string;
  title: string;
  price: string;
  duration: string;
  features: string[];
  note?: string;
};

export type ProposalPdfData = {
  lang: Lang;
  isRtl: boolean;
  date: string;
  title: string;
  subtitle: string;
  totalCost: string;
  totalDuration: string;
  scopeItems: PdfScopeItem[];
  scheduleLines: string[];
  milestones: { title: string; weeks: string; desc: string }[];
  includedTitle: string;
  supportTitle: string;
  supportDetails: string[];
  sourceCodeTitle: string;
  sourceCodeDetails: string[];
  investmentTitle: string;
  scheduleTitle: string;
  scopeTitle: string;
  milestonesTitle: string;
  includedSectionTitle: string;
  footerNote: string;
  disclaimer?: string;
  labels: {
    price: string;
    duration: string;
    features: string;
    totalInvestment: string;
    totalDuration: string;
    customEstimate: string;
  };
};

export function buildProposalPdfData(selection: AddonSelection, lang: Lang): ProposalPdfData {
  const client = clientCopy[lang];
  const addons = addonsCopy[lang];
  const total = computeAddonTotal(selection);
  const duration = computeTotalDuration(selection);
  const timelines = computeAddonTimelines(selection);

  const scopeItems: PdfScopeItem[] = [
    {
      id: "base",
      title: addons.base.title,
      price: formatUsd(addonPrices.base),
      duration: addons.base.timeline,
      features: addons.base.includes,
    },
  ];

  if (selection.mobile) {
    scopeItems.push({
      id: "mobile",
      title: addons.mobile.title,
      price: `${formatUsd(addonPrices.mobileApps + addonPrices.mobileUx)} (${addons.mobile.uxPrice} UI/UX)`,
      duration: addons.mobile.timeline,
      features: addons.mobile.includes,
    });
  }

  if (selection.conference) {
    const confWeeks = conferenceDurationWeeks(selection.conferenceAdvanced);
    const features = [...addons.conference.includes];
    if (selection.conferenceAdvanced) {
      features.push(
        `${addons.conference.advanced.title}: ${addons.conference.advanced.includes.join(", ")}`
      );
    }
    scopeItems.push({
      id: "conference",
      title: addons.conference.title,
      price: formatUsd(conferenceTotalPrice(selection.conferenceAdvanced)),
      duration: formatWeekRange(confWeeks, lang),
      features,
      note: addons.conference.disclaimer,
    });
  }

  if (selection.cms === "strapi") {
    scopeItems.push({
      id: "cms-strapi",
      title: addons.cms.strapiTitle,
      price: formatUsd(addonPrices.cmsStrapi),
      duration: addons.cms.strapiTimeline,
      features: [
        lang === "ar"
          ? "تحرير ذاتي للمحتوى عبر Strapi — مشترك للموقع والتطبيق"
          : "Self-service content editing via Strapi — shared for web and mobile",
        lang === "ar" ? "المرحلة 2 — بعد الإطلاق الثابت" : "Phase 2 — after static go-live",
      ],
    });
  }

  if (selection.cms === "custom") {
    scopeItems.push({
      id: "cms-custom",
      title: addons.cms.customTitle,
      price: formatUsd(addonPrices.cmsCustom),
      duration: addons.cms.customTimeline,
      features: [
        lang === "ar"
          ? "CMS مخصص بالكامل — ملكية أوابك، بدون اعتماد على طرف ثالث"
          : "Fully custom CMS — OAPEC-owned, no third-party dependency",
        lang === "ar" ? "المرحلة 2 — بعد الإطلاق الثابت" : "Phase 2 — after static go-live",
      ],
    });
  }

  const labels =
    lang === "ar"
      ? {
          price: "التكلفة",
          duration: "المدة",
          features: "الميزات",
          totalInvestment: "إجمالي الاستثمار",
          totalDuration: "إجمالي المدة",
          customEstimate: "تقدير مخصص",
        }
      : {
          price: "Cost",
          duration: "Duration",
          features: "Features",
          totalInvestment: "Total investment",
          totalDuration: "Total duration",
          customEstimate: "Custom estimate",
        };

  return {
    lang,
    isRtl: lang === "ar",
    date: new Date().toLocaleDateString(lang === "ar" ? "ar-KW" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    title: client.heroTitle,
    subtitle: client.proposalSubtitle,
    totalCost: formatUsd(total),
    totalDuration: formatWeekRange(duration, lang),
    scopeItems,
    scheduleLines: timelines.map((l) => (lang === "ar" ? l.labelAr : l.labelEn)),
    milestones: client.timeline.milestones.map((m) => ({
      title: m.title,
      weeks: `${m.weeks} ${client.timeline.weeksUnit}`,
      desc: m.desc,
    })),
    includedTitle: client.included.title,
    supportTitle: client.included.supportTitle,
    supportDetails: client.included.supportDetails.slice(0, 3),
    sourceCodeTitle: client.included.sourceCodeTitle,
    sourceCodeDetails: client.included.sourceCodeDetails,
    investmentTitle: client.pricing.title,
    scheduleTitle: addons.summary.timelinesTitle,
    scopeTitle: lang === "ar" ? "نطاق المشروع والميزات" : "Project scope & features",
    milestonesTitle: client.timeline.title,
    includedSectionTitle: client.support.title,
    footerNote: client.footerNote,
    disclaimer: selection.conference ? addons.conference.disclaimer : undefined,
    labels,
  };
}

/** Line-item rows for the investment summary table */
export function buildInvestmentRows(selection: AddonSelection, lang: Lang) {
  const rows: { label: string; price: string }[] = [
    {
      label: addonsCopy[lang].base.title,
      price: formatUsd(addonPrices.base),
    },
  ];
  if (selection.mobile) {
    rows.push({
      label: addonsCopy[lang].mobile.title,
      price: formatUsd(addonPrices.mobileApps + addonPrices.mobileUx),
    });
  }
  if (selection.conference) {
    rows.push({
      label: addonsCopy[lang].conference.title,
      price: formatUsd(conferenceTotalPrice(selection.conferenceAdvanced)),
    });
  }
  if (selection.cms === "strapi") {
    rows.push({ label: "Strapi CMS", price: formatUsd(addonPrices.cmsStrapi) });
  }
  if (selection.cms === "custom") {
    rows.push({
      label: lang === "ar" ? "CMS مخصص" : "Custom CMS",
      price: formatUsd(addonPrices.cmsCustom),
    });
  }
  return rows;
}
