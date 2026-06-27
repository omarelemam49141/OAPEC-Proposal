/** OAPEC proposal estimation constants — anchored to site inventory (Jun 2025). */

export const HOURLY_RATE = 12;
/** Sun–Thu 3 h/day + Fri–Sat 5 h/day = 25 h/week */
export const HOURS_PER_WEEK = 25;
export const DEV_SCHEDULE_EN = "3 h Sun–Thu, 5 h Fri–Sat";
export const DEV_SCHEDULE_AR = "3 س أحد–خميس، 5 س جمعة–سبت";
export const DESIGN_BUFFER = 1.15;
export const REVIEW_BUFFER = 1.1;

export function withBuffers(hours: number): number {
  return Math.round(hours * DESIGN_BUFFER * REVIEW_BUFFER);
}

export function formatCost(hours: number): string {
  return `$${(hours * HOURLY_RATE).toLocaleString("en-US")}`;
}

export function formatCostRange(minH: number, maxH: number): string {
  return `${formatCost(minH)} – ${formatCost(withBuffers(maxH))}`;
}

export function formatHoursRange(min: number, max: number): string {
  return `${withBuffers(min)}–${withBuffers(max)} h`;
}

export function hoursToWeeks(hours: number): string {
  const weeks = hours / HOURS_PER_WEEK;
  if (weeks < 1) return "< 1";
  return `${Math.ceil(weeks)}`;
}

export function formatWeeksRange(minH: number, maxH: number): string {
  return `${hoursToWeeks(withBuffers(minH))}–${hoursToWeeks(withBuffers(maxH))} wks`;
}

/** Unique frontend templates identified from oapecorg.org sitemap (EN + AR share layouts). */
export const templateInventory = {
  totalTemplates: 20,
  groups: [
    { key: "home", count: 1, labelEn: "Home", labelAr: "الرئيسية" },
    { key: "about", count: 8, labelEn: "About Us (+ joint ventures)", labelAr: "نبذة عنا (+ المشاريع المشتركة)" },
    { key: "media", count: 3, labelEn: "Media (hub, listing, detail)", labelAr: "الإعلام (مركز، قائمة، تفاصيل)" },
    { key: "publications", count: 4, labelEn: "Publications & studies", labelAr: "المنشورات والدراسات" },
    { key: "databank", count: 1, labelEn: "DataBank (info + external link)", labelAr: "بنك البيانات (تعريف + رابط خارجي)" },
    { key: "library", count: 2, labelEn: "Library", labelAr: "المكتبة" },
    { key: "activities", count: 4, labelEn: "Activities & events", labelAr: "الأنشطة والفعاليات" },
    { key: "utility", count: 4, labelEn: "Contact, FAQs, links, sitemap", labelAr: "اتصل بنا، أسئلة شائعة، روابط" },
  ],
  interactiveFeatures: [
    "Newsletter signup modal",
    "Site search",
    "Twitter/X embed",
    "PDF downloads / publication archives",
    "Image & video carousels",
    "Study / video modals",
  ],
  bilingualNote:
    "English + Arabic (RTL) from day one — layouts are shared; copy and QA are duplicated.",
};

/** Base frontend hours (parity IA, before buffers). */
export const frontendBase = { parityMin: 155, parityMax: 195 };
export const iaMultiplier = { parity: 1, hybrid: 0.9, consolidated: 0.82 };
export const cmsHours = { none: 0, strapiMin: 45, strapiMax: 65 };
export const migrationHours = {
  m0: { min: 25, max: 40 },
  m1: { min: 70, max: 120 },
  m2: { min: 140, max: 260 },
};

export type ScenarioId = "s1" | "s2" | "s3";

export function calcScenario(
  ia: keyof typeof iaMultiplier,
  cms: "none" | "strapi",
  migration: keyof typeof migrationHours
): { min: number; max: number } {
  const feMin = Math.round(frontendBase.parityMin * iaMultiplier[ia]);
  const feMax = Math.round(frontendBase.parityMax * iaMultiplier[ia]);
  const mig = migrationHours[migration];
  const cmsMin = cms === "strapi" ? cmsHours.strapiMin : 0;
  const cmsMax = cms === "strapi" ? cmsHours.strapiMax : 0;
  return {
    min: withBuffers(feMin + mig.min + cmsMin),
    max: withBuffers(feMax + mig.max + cmsMax),
  };
}

export const scenarios: {
  id: ScenarioId;
  ia: keyof typeof iaMultiplier;
  cms: "none" | "strapi";
  migration: keyof typeof migrationHours;
  recommended?: boolean;
}[] = [
  { id: "s1", ia: "consolidated", cms: "none", migration: "m0" },
  { id: "s2", ia: "hybrid", cms: "strapi", migration: "m1", recommended: true },
  { id: "s3", ia: "parity", cms: "strapi", migration: "m2" },
];

/** Identity palette extracted from proposed design direction. */
export const brandColors = [
  { name: "OAPEC Green", hex: "#1B5E4B" },
  { name: "Deep Teal", hex: "#0D3B2E" },
  { name: "Gold Accent", hex: "#C9A227" },
  { name: "Slate Text", hex: "#1E293B" },
  { name: "Light Surface", hex: "#F4F7F6" },
];
