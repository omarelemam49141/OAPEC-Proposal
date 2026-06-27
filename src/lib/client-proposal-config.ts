/**
 * Locked choices and computed totals for the client-facing «اقتراح مبدئي» view.
 * Internal view continues to use proposal-estimates.ts @ $12/hr.
 */

import { HOURS_PER_WEEK } from "./proposal-estimates";

/** Fixed total shown to client (design + development combined) */
export const CLIENT_FIXED_TOTAL = 3000;

/** UI/UX phase — fixed calendar duration */
export const UX_WEEKS = 2;

/** Implementation team size (parallel development) */
export const DEV_TEAM_SIZE = 2;

/** Development phase — fixed calendar duration (2 developers) */
export const DEV_WEEKS_MIN = 4;
export const DEV_WEEKS_MAX = 5;

export const clientChoices = {
  ia: "consolidated" as const,
  contentModel: "static" as const,
  migration: "client-provided" as const,
  integrations: ["search", "newsletter", "contact", "twitter"] as const,
  library: "external-link" as const,
  databank: "external-link" as const,
};

export const uxHours = UX_WEEKS * HOURS_PER_WEEK;

const devHoursMin = DEV_WEEKS_MIN * HOURS_PER_WEEK * DEV_TEAM_SIZE;
const devHoursMax = DEV_WEEKS_MAX * HOURS_PER_WEEK * DEV_TEAM_SIZE;

/** Dev phases after UI/UX: sign-off, core, remaining, integrations, launch */
const DEV_PHASE_WEIGHTS = [1, 3, 4, 2, 1];

function distributeDevWeeks(totalWeeks: number): string[] {
  const totalWeight = DEV_PHASE_WEIGHTS.reduce((a, b) => a + b, 0);
  const allocated = DEV_PHASE_WEIGHTS.map((w) =>
    Math.max(1, Math.floor((totalWeeks * w) / totalWeight))
  );
  let remainder = totalWeeks - allocated.reduce((a, b) => a + b, 0);
  let i = 0;
  while (remainder > 0) {
    allocated[i % allocated.length]++;
    remainder--;
    i++;
  }
  while (remainder < 0) {
    const idx = allocated.findIndex((n) => n > 1);
    if (idx === -1) break;
    allocated[idx]--;
    remainder++;
  }
  return allocated.map(String);
}

const weeksMin = UX_WEEKS + DEV_WEEKS_MIN;
const weeksMax = UX_WEEKS + DEV_WEEKS_MAX;

const devWeeksForMilestones = Math.round((DEV_WEEKS_MIN + DEV_WEEKS_MAX) / 2);
const devMilestoneWeeks = distributeDevWeeks(devWeeksForMilestones);

export const clientEstimate = {
  devHours: { min: devHoursMin, max: devHoursMax },
  uxHours,
  uxWeeks: UX_WEEKS,
  devWeeks: { min: DEV_WEEKS_MIN, max: DEV_WEEKS_MAX },
  devTeamSize: DEV_TEAM_SIZE,
  totalCost: CLIENT_FIXED_TOTAL,
  totalCostFormatted: `$${CLIENT_FIXED_TOTAL.toLocaleString("en-US")}`,
};

export const clientTimelineWeeks = {
  min: weeksMin,
  max: weeksMax,
  labelEn: `${weeksMin}–${weeksMax} weeks`,
  labelAr: `${weeksMin}–${weeksMax} أسابيع`,
};

export const clientMilestoneWeeks = [String(UX_WEEKS), ...devMilestoneWeeks] as const;

export const clientNavSectionIds = {
  executiveSummary: "executive-summary",
  identity: "proposed-identity",
  siteGaps: "site-gaps",
  options: "options",
  scenarios: "scenarios",
  timeline: "timeline",
  pricing: "pricing",
  portfolio: "portfolio",
  inquiries: "inquiries",
  support: "support",
  addons: "addons",
} as const;

export type ClientNavSectionId =
  (typeof clientNavSectionIds)[keyof typeof clientNavSectionIds];
