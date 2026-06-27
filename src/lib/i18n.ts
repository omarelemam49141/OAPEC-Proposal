import type { MatrixRow } from "@/components/proposal/ComparisonMatrix";
import {
  formatCost,
  formatHoursRange,
  formatWeeksRange,
  withBuffers,
  calcScenario,
  migrationHours,
  cmsHours,
  frontendBase,
  HOURLY_RATE,
  HOURS_PER_WEEK,
  DEV_SCHEDULE_EN,
  DEV_SCHEDULE_AR,
} from "./proposal-estimates";

export { assetPath } from "./base-path";

export type Lang = "en" | "ar";

export const navSectionIds = {
  executiveSummary: "executive-summary",
  identity: "proposed-identity",
  scope: "scope",
  options: "options",
  matrices: "decision-matrices",
  scenarios: "scenarios",
  decision: "decision",
  timeline: "timeline",
  pricing: "pricing",
  addons: "addons",
  portfolio: "portfolio",
  inquiries: "inquiries",
  support: "support",
  nextSteps: "next-steps",
} as const;

export type NavSectionId = (typeof navSectionIds)[keyof typeof navSectionIds];

const feBuffered = `${withBuffers(frontendBase.parityMin)}–${withBuffers(frontendBase.parityMax)} h`;
const feCost = `${formatCost(withBuffers(frontendBase.parityMin))}–${formatCost(withBuffers(frontendBase.parityMax))}`;

export const copy: Record<
  Lang,
  {
    brandName: string;
    brandTag: string;
    proposalTitle: string;
    proposalSubtitle: string;
    nav: Record<keyof typeof navSectionIds, string>;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    sections: {
      executiveSummary: { title: string; bullets: string[] };
      identity: {
        title: string;
        subtitle: string;
        disclaimer: string;
        downloadLabel: string;
        paletteTitle: string;
      };
      scope: {
        title: string;
        intro: string;
        templatesTitle: string;
        interactiveTitle: string;
        note: string;
        databankNote: string;
      };
      options: {
        title: string;
        description: string;
        optionA: { title: string; timeline: string; includes: string[]; goodFor: string };
        optionB: { title: string; timeline: string; includes: string[]; goodFor: string };
      };
      matrices: {
        title: string;
        subtitle: string;
        iaTitle: string;
        migrationTitle: string;
        featuresTitle: string;
        featuresNote: string;
        ia: MatrixRow[];
        migration: MatrixRow[];
        features: MatrixRow[];
      };
      scenarios: {
        title: string;
        subtitle: string;
        disclaimer: string;
        columns: { label: string; ia: string; cms: string; migration: string; hours: string; cost: string; weeks: string };
        items: {
          id: string;
          name: string;
          ia: string;
          cms: string;
          migration: string;
          hours: string;
          cost: string;
          weeks: string;
          recommended?: boolean;
        }[];
      };
      decision: {
        title: string;
        lead: string;
        staticPros: string[];
        cmsPros: string[];
        rows: { label: string; static: string; cms: string; staticWin: boolean }[];
      };
      timeline: { title: string; assumptions: string[] };
      pricing: {
        title: string;
        subtitle: string;
        note: string;
        rows: { label: string; optionA: string; optionB: string }[];
      };
      addons: {
        title: string;
        outOfScopeTitle: string;
        outOfScope: string[];
        optionalTitle: string;
        optional: { label: string; hours: string; cost: string }[];
      };
      portfolio: {
        title: string;
        subtitle: string;
        teamTitle: string;
        teamNote: string;
        projectsTitle: string;
        viewProject: string;
        featuredLabel: string;
      };
      inquiries: { title: string; subtitle: string; items: { q: string; status: string; impact: string }[] };
      support: {
        title: string;
        packagesTitle: string;
        packages: { name: string; durationPlaceholder: string; details: string[] }[];
      };
      nextSteps: { title: string; details: string[]; decisionPrompt: string };
    };
  }
> = {
  en: {
    brandName: "OAPEC",
    brandTag: "Proposal",
    proposalTitle: "Website Redesign Proposal",
    proposalSubtitle:
      "Complete rebuild of oapecorg.org on Next.js — bilingual (EN + AR), scenario-based estimates @ $12/hr, one developer.",

    nav: {
      executiveSummary: "Summary",
      identity: "Identity",
      scope: "Site Inventory",
      options: "Options A/B",
      matrices: "Decision Matrices",
      scenarios: "Scenarios",
      decision: "Static vs CMS",
      timeline: "Timeline",
      pricing: "Pricing",
      addons: "Add-ons",
      portfolio: "Portfolio",
      inquiries: "Open Inquiries",
      support: "Support",
      nextSteps: "Next Steps",
    },

    heroCtaPrimary: "View Scenarios",
    heroCtaSecondary: "Decision Matrices",

    sections: {
      executiveSummary: {
        title: "What this proposal covers",
        bullets: [
          "Full frontend rebuild of the OAPEC website (oapecorg.org) using Next.js — English and Arabic (RTL) from day one.",
          "Frontend development only: UI/UX design is a separate track; estimates include a 15% design-iteration buffer.",
          "Two content models only: static pages (Option A) or CMS-powered (Option B). No custom content APIs.",
          "Lightweight backend only for utilities: search, contact form, newsletter — billed via features matrix.",
          "Content migration is included in estimates (not free) and final tier is confirmed with the business team.",
          "No single fixed price yet — bundled scenarios and decision matrices let OAPEC choose scope in discovery meetings.",
          `One developer · ${HOURS_PER_WEEK} hours/week · $12/hour · client review cycles included (+10% buffer).`,
        ],
      },
      identity: {
        title: "Proposed visual direction",
        subtitle:
          "Directional preview from the proposed identity study — not final Figma. Full brand guidelines will follow the UI/UX phase.",
        disclaimer:
          "Frontend estimates assume iterative alignment with upcoming Figma deliverables. Major layout changes after sign-off may require a change request.",
        downloadLabel: "Download identity PDF",
        paletteTitle: "Proposed palette",
      },
      scope: {
        title: "Current site inventory (oapecorg.org)",
        intro:
          "Based on the public sitemap and homepage audit. The site is larger than a brochure: media archives, publications, DataBank, library, activities, and a conference microsite. English and Arabic share layouts.",
        templatesTitle: "~20 unique page templates",
        interactiveTitle: "Interactive elements to confirm",
        note:
          "Templates ≠ content volume. Hundreds of news items and PDFs use the same listing/detail templates — migration hours depend on the tier chosen below.",
        databankNote:
          "DataBank is confirmed: one simple page with introductory content and a link to the external system (oapecdbsys.oapecorg.org) — no embed or rebuild options needed.",
      },
      options: {
        title: "Implementation options — static vs CMS",
        description:
          "Both options deliver the same redesigned bilingual interface. The only difference is how OAPEC manages content after launch.",
        optionA: {
          title: "Option A: Static site (Next.js SSG)",
          timeline: `${feBuffered} · ${formatWeeksRange(frontendBase.parityMin, frontendBase.parityMax)}`,
          includes: [
            "Next.js static site for all templates (EN + AR, RTL).",
            "Content stored in the codebase (MDX/JSON/markdown); rebuild to publish.",
            "No CMS — content changes go through the developer.",
            "Lightweight APIs only if needed for search, forms, or newsletter (see features matrix).",
          ],
          goodFor:
            "When content rarely changes, or OAPEC prefers a fixed archive with minimal ongoing cost.",
        },
        optionB: {
          title: "Option B: CMS-powered site (Strapi)",
          timeline: `+${withBuffers(cmsHours.strapiMin)}–${withBuffers(cmsHours.strapiMax)} h CMS · ${formatCost(withBuffers(cmsHours.strapiMin))}–${formatCost(withBuffers(cmsHours.strapiMax))} add-on`,
          includes: [
            "Same Next.js frontend as Option A.",
            "Strapi: content types for news, publications, media, pages.",
            "Media library, roles, admin UI, preview workflow.",
            "OAPEC staff edit content without a developer.",
          ],
          goodFor:
            "When OAPEC needs to update news, reports, and media regularly.",
        },
      },
      matrices: {
        title: "Decision matrices — pick one row per topic",
        subtitle:
          "Each choice changes hours and cost. Final estimate = selected rows combined (see scenario bundles).",
        iaTitle: "Information architecture",
        migrationTitle: "Content migration depth",
        featuresTitle: "Interactive features (per feature)",
        featuresNote:
          "Any backend work is limited to these utilities (search, forms, newsletter). Content is never managed via custom APIs.",
        ia: [
          {
            id: "ia-parity",
            label: "IA-1: Full parity",
            pros: "Mirrors current menu and URLs; lowest stakeholder friction.",
            cons: "More templates and navigation depth; higher build and migration cost.",
            impact: "Baseline (0%)",
          },
          {
            id: "ia-hybrid",
            label: "IA-2: Hybrid",
            pros: "Consolidate Activities/Events; keep Publications/Media structure.",
            cons: "Mixed rules; some URLs may change.",
            impact: "−5% to −10% frontend",
            recommended: true,
          },
          {
            id: "ia-consolidated",
            label: "IA-3: Consolidated hubs",
            pros: "Media hub + Publications center + event archive; cleaner UX, fewer templates.",
            cons: "Requires OAPEC approval; bigger navigation change.",
            impact: "−15% to −20% frontend",
          },
        ],
        migration: [
          {
            id: "m0",
            label: "M0: Structure + samples",
            pros: "Fastest launch; validates design on real templates.",
            cons: "Site feels sparse until content is added.",
            impact: formatHoursRange(migrationHours.m0.min, migrationHours.m0.max),
          },
          {
            id: "m1",
            label: "M1: Partial archive (2–3 years)",
            pros: "Balanced; recent news and publications live.",
            cons: "Older items missing or PDF-only links.",
            impact: formatHoursRange(migrationHours.m1.min, migrationHours.m1.max),
            recommended: true,
          },
          {
            id: "m2",
            label: "M2: Full historical archive",
            pros: "Complete parity with legacy content.",
            cons: "Longest effort; legacy quality varies.",
            impact: formatHoursRange(migrationHours.m2.min, migrationHours.m2.max),
          },
        ],
        features: [
          {
            id: "search-full",
            label: "Full-site search",
            pros: "Users find news, PDFs, pages quickly.",
            cons: "Indexing setup; higher complexity with CMS.",
            impact: "+16–32 h · $192–$384",
          },
          {
            id: "newsletter",
            label: "Newsletter signup",
            pros: "Keeps current engagement channel.",
            cons: "Requires email provider (Mailchimp, etc.).",
            impact: "+8–16 h · $96–$192",
          },
          {
            id: "contact",
            label: "Contact form",
            pros: "Direct inquiries to OAPEC staff.",
            cons: "Spam protection + email routing needed.",
            impact: "+8–12 h · $96–$144",
          },
          {
            id: "twitter",
            label: "Twitter/X embed",
            pros: "Live social feed on homepage.",
            cons: "Dependency on X API/embed policies.",
            impact: "+2–4 h · $24–$48",
          },
        ],
      },
      scenarios: {
        title: "Scenario bundles (illustrative totals)",
        subtitle:
          "Pre-combined choices for discussion. No price is final until OAPEC selects one row per matrix.",
        disclaimer:
          "All figures include 15% design-iteration and 10% client-review buffers. Migration tier confirmed in business workshop.",
        columns: {
          label: "Scenario",
          ia: "Information architecture",
          cms: "Content layer",
          migration: "Migration",
          hours: "Hours",
          cost: "Cost @ $12/hr",
          weeks: "Calendar",
        },
        items: [
          {
            id: "s1",
            name: "S1 — Minimum viable",
            ia: "Consolidated hubs",
            cms: "Static (A)",
            migration: "M0 samples",
            ...(() => {
              const s = calcScenario("consolidated", "none", "m0");
              return {
                hours: `${s.min}–${s.max} h`,
                cost: `${formatCost(s.min)}–${formatCost(s.max)}`,
                weeks: formatWeeksRange(s.min, s.max),
              };
            })(),
          },
          {
            id: "s2",
            name: "S2 — Recommended pending confirmation",
            ia: "Hybrid",
            cms: "Strapi (B)",
            migration: "M1 partial",
            recommended: true,
            ...(() => {
              const s = calcScenario("hybrid", "strapi", "m1");
              return {
                hours: `${s.min}–${s.max} h`,
                cost: `${formatCost(s.min)}–${formatCost(s.max)}`,
                weeks: formatWeeksRange(s.min, s.max),
              };
            })(),
          },
          {
            id: "s3",
            name: "S3 — Full parity + CMS",
            ia: "Full parity",
            cms: "Strapi (B)",
            migration: "M2 full archive",
            ...(() => {
              const s = calcScenario("parity", "strapi", "m2");
              return {
                hours: `${s.min}–${s.max} h`,
                cost: `${formatCost(s.min)}–${formatCost(s.max)}`,
                weeks: formatWeeksRange(s.min, s.max),
              };
            })(),
          },
        ],
      },
      decision: {
        title: "Static vs CMS — which fits OAPEC?",
        lead:
          "For an institutional site with news, publications, and media, CMS (Option B) is usually the better long-term fit. Static (Option A) works when content rarely changes.",
        staticPros: [
          "Lower cost and simpler hosting — no CMS server or database.",
          "Maximum performance: fully static pages at the edge.",
          "Best when the archive is fixed and updates are infrequent.",
        ],
        cmsPros: [
          "OAPEC staff update news, publications, and media without developers.",
          "Polished admin UI: roles, rich fields, media library, drafts.",
          "Proven Strapi stack — no custom content APIs to build or maintain.",
        ],
        rows: [
          { label: "Content updates", static: "Developer required", cms: "OAPEC self-service", staticWin: false },
          { label: "Development cost", static: "Lower (baseline)", cms: "+$620–$897 CMS add-on", staticWin: true },
          { label: "Hosting complexity", static: "Simple static deploy", cms: "CMS + database", staticWin: true },
          { label: "News & publications", static: "Poor fit long-term", cms: "Strong fit", staticWin: false },
          { label: "Maintenance", static: "Dev for every change", cms: "Editorial team", staticWin: false },
        ],
      },
      timeline: {
        title: "Timeline & working assumptions",
        assumptions: [
          `One developer · ${HOURS_PER_WEEK} hours/week (${DEV_SCHEDULE_EN}).`,
          `Rate: $${HOURLY_RATE}/hour. No fixed deadline — calendar weeks derived from total hours.`,
          "15% buffer for design iteration (Figma not finalized). 10% buffer for client review rounds.",
          "UI/UX design, hosting, translation, and professional QA are out of scope unless added below.",
          "Content migration scope (M0/M1/M2) confirmed in workshop with OAPEC business team.",
        ],
      },
      pricing: {
        title: "Pricing overview",
        subtitle: "Frontend baseline (parity IA, before migration & CMS extras)",
        note:
          "Add migration tier + feature matrix rows for final total. See scenario bundles for combined ranges.",
        rows: [
          { label: "Frontend (all templates)", optionA: feCost, optionB: feCost },
          {
            label: "Strapi CMS layer",
            optionA: "—",
            optionB: `${formatCost(withBuffers(cmsHours.strapiMin))}–${formatCost(withBuffers(cmsHours.strapiMax))}`,
          },
          {
            label: "Content migration (tier)",
            optionA: "M0–M2 (see matrix)",
            optionB: "M0–M2 (see matrix)",
          },
          {
            label: "Suggested scenario total",
            optionA: (() => {
              const s = calcScenario("consolidated", "none", "m0");
              return `${formatCost(s.min)}–${formatCost(s.max)}`;
            })(),
            optionB: (() => {
              const s = calcScenario("hybrid", "strapi", "m1");
              return `${formatCost(s.min)}–${formatCost(s.max)}`;
            })(),
          },
        ],
      },
      addons: {
        title: "Out of scope & optional add-ons",
        outOfScopeTitle: "Excluded from base estimate (default)",
        outOfScope: [
          "UI/UX design and final Figma deliverables (separate track).",
          "Content writing, editing, and Arabic/English translation.",
          "Hosting, DevOps, SSL, and production infrastructure setup.",
          "Dedicated QA team (developer performs basic responsive + RTL checks).",
          "WCAG accessibility audit and legal compliance review.",
          "SEO migration, analytics, and 301 redirect mapping (unless add-on).",
        ],
        optionalTitle: "If added — estimated impact",
        optional: [
          { label: "SEO migration + 301 redirects", hours: "16–24 h", cost: "$192–$288" },
          { label: "WCAG 2.1 AA audit + fixes", hours: "24–40 h", cost: "$288–$480" },
          { label: "Hosting setup + CI/CD", hours: "8–16 h", cost: "$96–$192" },
          { label: "Analytics + consent banner", hours: "4–8 h", cost: "$48–$96" },
          { label: "Extra CMS training sessions", hours: "4–6 h", cost: "$48–$72" },
        ],
      },
      portfolio: {
        title: "Development team portfolio",
        subtitle: "سابقة أعمال فريق التطوير — selected projects delivered by the team.",
        teamTitle: "Team",
        teamNote:
          "The team behind this proposal and the selected work below.",
        projectsTitle: "Selected work",
        viewProject: "View live site",
        featuredLabel: "Relevant to OAPEC",
      },
      inquiries: {
        title: "Open inquiries (blocking final estimate)",
        subtitle: "Pending OAPEC responses — each item maps to a decision matrix row above.",
        items: [
          { q: "Static (A) vs CMS (B)?", status: "Awaiting response", impact: "±45–65 h (CMS)" },
          { q: "Content archive depth (M0 / M1 / M2)?", status: "Business workshop", impact: "±25–260 h" },
          { q: "Information architecture (parity / hybrid / consolidated)?", status: "Discovery meeting", impact: "±0–20% frontend" },
          { q: "Conference microsite scope (full subsite vs single page)?", status: "Awaiting response", impact: "8–40 h" },
          { q: "Newsletter, search, contact form — keep which?", status: "Awaiting response", impact: "2–32 h each" },
          { q: "Who provides Arabic copy and translation?", status: "Business workshop", impact: "Out of scope unless added" },
        ],
      },
      support: {
        title: "Post-launch support packages",
        packagesTitle: "Optional packages to reduce risk after go-live.",
        packages: [
          {
            name: "Package 1: Launch fix support",
            durationPlaceholder: "14 days",
            details: [
              "Bug fixes on delivered pages and CMS integration.",
              "Minor CSS/spacing adjustments after initial OAPEC review.",
            ],
          },
          {
            name: "Package 2: CMS training",
            durationPlaceholder: "2 sessions",
            details: [
              "Training: news, publications, media, pages, and member content.",
              "Admin handover checklist and usage guide.",
            ],
          },
          {
            name: "Package 3: Maintenance retainer",
            durationPlaceholder: "3 months (TBD)",
            details: [
              "Minor updates, dependency patches, and small content-structure changes.",
              "Pricing quoted separately after scope confirmation.",
            ],
          },
        ],
      },
      nextSteps: {
        title: "Next steps",
        details: [
          "Discovery meeting: select one row per decision matrix (IA, migration, features).",
          "Confirm Option A (static) or Option B (CMS) for content management.",
          "Content workshop with OAPEC business team → lock M0/M1/M2.",
          "UI/UX team delivers Figma → frontend implementation begins.",
          "Choose scenario bundle (or custom combination) → sign statement of work.",
        ],
        decisionPrompt:
          "This proposal is ready for discussion today — final hours and cost are calculated from your selections, not guesses.",
      },
    },
  },

  ar: {
    brandName: "أوابك",
    brandTag: "اقتراح",
    proposalTitle: "اقتراح إعادة تصميم الموقع",
    proposalSubtitle:
      "إعادة بناء كاملة لموقع oapecorg.org على Next.js — ثنائي اللغة (عربي + إنجليزي)، تقديرات حسب السيناريو @ 12$/ساعة، مطور واحد.",

    nav: {
      executiveSummary: "ملخص",
      identity: "الهوية",
      scope: "جرد الموقع",
      options: "خيارات A/B",
      matrices: "مصفوفات القرار",
      scenarios: "السيناريوهات",
      decision: "ثابت مقابل CMS",
      timeline: "الجدول",
      pricing: "التسعير",
      addons: "إضافات",
      portfolio: "سابقة الأعمال",
      inquiries: "استفسارات",
      support: "الدعم",
      nextSteps: "الخطوات",
    },

    heroCtaPrimary: "عرض السيناريوهات",
    heroCtaSecondary: "مصفوفات القرار",

    sections: {
      executiveSummary: {
        title: "ماذا يغطي هذا الاقتراح؟",
        bullets: [
          "إعادة بناء كاملة لواجهة موقع أوابك (oapecorg.org) باستخدام Next.js — عربي وإنجليزي (RTL) من اليوم الأول.",
          "تطوير الواجهة فقط: تصميم UI/UX مسار منفصل؛ التقديرات تشمل هامش 15% لتكرارات التصميم.",
          "نموذجان للمحتوى فقط: صفحات ثابتة (الخيار A) أو CMS (الخيار B). لا APIs مخصصة لإدارة المحتوى.",
          "backend خفيف فقط للأدوات: بحث، نموذج تواصل، نشرة — يُحسب عبر مصفوفة الميزات.",
          "هجرة المحتوى مُقدّرة ضمن التكلفة (ليست مجانية) ويُؤكد المستوى النهائي مع فريق الأعمال.",
          "لا يوجد سعر نهائي واحد بعد — السيناريوهات ومصفوفات القرار تتيح لأوابك اختيار النطاق في اجتماعات الاكتشاف.",
          `مطور واحد · ${HOURS_PER_WEEK} ساعة/أسبوع · 12$/ساعة · دورات مراجعة العميل (+10% هامش).`,
        ],
      },
      identity: {
        title: "الاتجاه البصري المقترح",
        subtitle:
          "معاينة توجيهية من دراسة الهوية المقترحة — ليست Figma نهائية. إرشادات العلامة الكاملة تأتي مع مرحلة UI/UX.",
        disclaimer:
          "تقديرات الواجهة تفترض مواءمة تكرارية مع تسليمات Figma القادمة. تغييرات جوهرية بعد الاعتماد قد تتطلب طلب تغيير.",
        downloadLabel: "تحميل PDF الهوية",
        paletteTitle: "اللوحة اللونية المقترحة",
      },
      scope: {
        title: "جرد الموقع الحالي (oapecorg.org)",
        intro:
          "بناءً على خريطة الموقع والصفحة الرئيسية. الموقع أكبر من موقع تعريفي: أرشيف إعلامي، منشورات، بنك بيانات، مكتبة، أنشطة، وموقع فرعي للمؤتمرات. العربية والإنجليزية تشتركان في القوالب.",
        templatesTitle: "~20 قالب صفحة فريد",
        interactiveTitle: "عناصر تفاعلية تحتاج تأكيد",
        note:
          "القوالب ≠ حجم المحتوى. مئات الأخبار وملفات PDF تستخدم قوالب قائمة/تفاصيل — ساعات الهجرة تعتمد على المستوى المختار أدناه.",
        databankNote:
          "بنك البيانات مؤكد: صفحة بسيطة بمحتوى تعريفي ورابط للنظام الخارجي (oapecdbsys.oapecorg.org) — لا حاجة لتضمين أو إعادة بناء.",
      },
      options: {
        title: "خيارات التنفيذ — ثابت مقابل CMS",
        description:
          "كلا الخيارين يُسلّمان نفس الواجهة ثنائية اللغة. الفرق الوحيد في كيفية إدارة أوابك للمحتوى بعد الإطلاق.",
        optionA: {
          title: "الخيار A: موقع ثابت (Next.js SSG)",
          timeline: `${feBuffered} · ${formatWeeksRange(frontendBase.parityMin, frontendBase.parityMax)}`,
          includes: [
            "موقع Next.js ثابت لكل القوالب (EN + AR، RTL).",
            "المحتوى في الكود (MDX/JSON/markdown)؛ إعادة بناء للنشر.",
            "بدون CMS — تغيير المحتوى عبر المطور.",
            "APIs خفيفة فقط للبحث أو النماذج أو النشرة (انظر مصفوفة الميزات).",
          ],
          goodFor:
            "عندما نادراً ما يتغير المحتوى، أو تفضّل أوابك أرشيفاً ثابتاً بتكلفة تشغيل أقل.",
        },
        optionB: {
          title: "الخيار B: موقع بـ CMS (Strapi)",
          timeline: `+${withBuffers(cmsHours.strapiMin)}–${withBuffers(cmsHours.strapiMax)} ساعة CMS · ${formatCost(withBuffers(cmsHours.strapiMin))}–${formatCost(withBuffers(cmsHours.strapiMax))} إضافة`,
          includes: [
            "نفس واجهة Next.js كالخيار A.",
            "Strapi: أنواع محتوى للأخبار والمنشورات والإعلام والصفحات.",
            "مكتبة وسائط، صلاحيات، لوحة إدارة، معاينة.",
            "فريق أوابك يحرر المحتوى بدون مطور.",
          ],
          goodFor:
            "عندما تحتاج أوابك تحديث الأخبار والتقارير والإعلام بانتظام.",
        },
      },
      matrices: {
        title: "مصفوفات القرار — اختر صفاً لكل موضوع",
        subtitle:
          "كل اختيار يغيّر الساعات والتكلفة. التقدير النهائي = الصفوف المختارة مجتمعة (انظر حزم السيناريو).",
        iaTitle: "هيكلة المعلومات",
        migrationTitle: "عمق هجرة المحتوى",
        featuresTitle: "ميزات تفاعلية (لكل ميزة)",
        featuresNote:
          "أي عمل backend يقتصر على هذه الأدوات (بحث، نماذج، نشرة). المحتوى لا يُدار عبر APIs مخصصة.",
        ia: [
          {
            id: "ia-parity",
            label: "IA-1: مطابقة كاملة",
            pros: "يعكس القائمة والروابط الحالية؛ أقل مقاومة من أصحاب المصلحة.",
            cons: "قوالب وتنقل أكثر؛ تكلفة بناء وهجرة أعلى.",
            impact: "خط الأساس (0%)",
          },
          {
            id: "ia-hybrid",
            label: "IA-2: هجين",
            pros: "دمج الأنشطة/الفعاليات؛ الإبقاء على هيكل المنشورات/الإعلام.",
            cons: "قواعد مختلطة؛ قد تتغير بعض الروابط.",
            impact: "−5% إلى −10% واجهة",
            recommended: true,
          },
          {
            id: "ia-consolidated",
            label: "IA-3: مراكز موحّدة",
            pros: "مركز إعلام + مركز منشورات + أرشيف فعاليات؛ تجربة أنظف وقوالب أقل.",
            cons: "يتطلب موافقة أوابك؛ تغيير تنقل أكبر.",
            impact: "−15% إلى −20% واجهة",
          },
        ],
        migration: [
          {
            id: "m0",
            label: "M0: هيكل + عينات",
            pros: "أسرع إطلاق؛ التحقق من التصميم على قوالب حقيقية.",
            cons: "الموقع يبدو فارغاً حتى تُضاف المحتويات.",
            impact: formatHoursRange(migrationHours.m0.min, migrationHours.m0.max),
          },
          {
            id: "m1",
            label: "M1: أرشيف جزئي (2–3 سنوات)",
            pros: "متوازن؛ أخبار ومنشورات حديثة مباشرة.",
            cons: "عناصر أقدم ناقصة أو روابط PDF فقط.",
            impact: formatHoursRange(migrationHours.m1.min, migrationHours.m1.max),
            recommended: true,
          },
          {
            id: "m2",
            label: "M2: أرشيف تاريخي كامل",
            pros: "مطابقة كاملة مع المحتوى القديم.",
            cons: "أطول جهد؛ جودة المحتوى القديم متفاوتة.",
            impact: formatHoursRange(migrationHours.m2.min, migrationHours.m2.max),
          },
        ],
        features: [
          {
            id: "search-full",
            label: "بحث في الموقع كاملاً",
            pros: "المستخدم يجد الأخبار وPDF والصفحات بسرعة.",
            cons: "إعداد فهرسة؛ تعقيد أعلى مع CMS.",
            impact: "+16–32 س · $192–$384",
          },
          {
            id: "newsletter",
            label: "اشتراك النشرة",
            pros: "يحافظ على قناة التواصل الحالية.",
            cons: "يتطلب مزود بريد (Mailchimp، إلخ).",
            impact: "+8–16 س · $96–$192",
          },
          {
            id: "contact",
            label: "نموذج اتصل بنا",
            pros: "استفسارات مباشرة لفريق أوابك.",
            cons: "حماية سبام وتوجيه بريد.",
            impact: "+8–12 س · $96–$144",
          },
          {
            id: "twitter",
            label: "تضمين Twitter/X",
            pros: "خلاصة اجتماعية حية في الرئيسية.",
            cons: "اعتماد على سياسات X.",
            impact: "+2–4 س · $24–$48",
          },
        ],
      },
      scenarios: {
        title: "حزم السيناريو (مجاميع توضيحية)",
        subtitle:
          "خيارات مجمّعة للنقاش. لا سعر نهائي حتى تختار أوابك صفاً لكل مصفوفة.",
        disclaimer:
          "جميع الأرقام تشمل 15% تكرار تصميم و10% مراجعة عميل. مستوى الهجرة يُؤكد في ورشة الأعمال.",
        columns: {
          label: "السيناريو",
          ia: "هيكلة المعلومات",
          cms: "طبقة المحتوى",
          migration: "الهجرة",
          hours: "الساعات",
          cost: "التكلفة @ 12$/س",
          weeks: "التقويم",
        },
        items: [
          {
            id: "s1",
            name: "S1 — الحد الأدنى",
            ia: "مراكز موحّدة",
            cms: "ثابت (A)",
            migration: "M0 عينات",
            ...(() => {
              const s = calcScenario("consolidated", "none", "m0");
              return {
                hours: `${s.min}–${s.max} س`,
                cost: `${formatCost(s.min)}–${formatCost(s.max)}`,
                weeks: formatWeeksRange(s.min, s.max),
              };
            })(),
          },
          {
            id: "s2",
            name: "S2 — مُقترح pending التأكيد",
            ia: "هجين",
            cms: "Strapi (B)",
            migration: "M1 جزئي",
            recommended: true,
            ...(() => {
              const s = calcScenario("hybrid", "strapi", "m1");
              return {
                hours: `${s.min}–${s.max} س`,
                cost: `${formatCost(s.min)}–${formatCost(s.max)}`,
                weeks: formatWeeksRange(s.min, s.max),
              };
            })(),
          },
          {
            id: "s3",
            name: "S3 — مطابقة كاملة + CMS",
            ia: "مطابقة كاملة",
            cms: "Strapi (B)",
            migration: "M2 أرشيف كامل",
            ...(() => {
              const s = calcScenario("parity", "strapi", "m2");
              return {
                hours: `${s.min}–${s.max} س`,
                cost: `${formatCost(s.min)}–${formatCost(s.max)}`,
                weeks: formatWeeksRange(s.min, s.max),
              };
            })(),
          },
        ],
      },
      decision: {
        title: "ثابت مقابل CMS — أيهما يناسب أوابك؟",
        lead:
          "لموقع مؤسسي بأخبار ومنشورات وإعلام، CMS (الخيار B) غالباً الأنسب على المدى الطويل. الثابت (A) يناسب المحتوى نادر التغيير.",
        staticPros: [
          "تكلفة أقل واستضافة أبسط — بدون خادم CMS أو قاعدة بيانات.",
          "أقصى أداء: صفحات ثابتة بالكامل.",
          "الأفضل عندما يكون الأرشيف ثابتاً والتحديثات نادرة.",
        ],
        cmsPros: [
          "فريق أوابك يحدّث الأخبار والمنشورات والإعلام بدون مطورين.",
          "لوحة إدارة جاهزة: صلاحيات، حقول غنية، مكتبة وسائط، مسودات.",
          "Strapi مُجرّب — بدون APIs مخصصة لإدارة المحتوى.",
        ],
        rows: [
          { label: "تحديث المحتوى", static: "يتطلب مطوراً", cms: "ذاتي من أوابك", staticWin: false },
          { label: "تكلفة التطوير", static: "أقل (خط الأساس)", cms: "+$620–$897 إضافة CMS", staticWin: true },
          { label: "تعقيد الاستضافة", static: "نشر ثابت بسيط", cms: "CMS + قاعدة بيانات", staticWin: true },
          { label: "الأخبار والمنشورات", static: "غير مناسب طويل الأمد", cms: "مناسب جداً", staticWin: false },
          { label: "الصيانة", static: "مطور لكل تغيير", cms: "فريق تحرير", staticWin: false },
        ],
      },
      timeline: {
        title: "الجدول الزمني وافتراضات العمل",
        assumptions: [
          `مطور واحد · ${HOURS_PER_WEEK} ساعة/أسبوع (${DEV_SCHEDULE_AR}).`,
          `السعر: ${HOURLY_RATE}$/ساعة. لا موعد نهائي — الأسابيع تُحسب من إجمالي الساعات.`,
          "هامش 15% لتكرار التصميم (Figma غير نهائي). 10% لدورات مراجعة العميل.",
          "تصميم UI/UX والاستضافة والترجمة وQA احترافي خارج النطاق ما لم تُضاف أدناه.",
          "نطاق هجرة المحتوى (M0/M1/M2) يُؤكد في ورشة مع فريق أعمال أوابك.",
        ],
      },
      pricing: {
        title: "نظرة على التسعير",
        subtitle: "خط أساس الواجهة (مطابقة كاملة، قبل الهجرة وإضافات CMS)",
        note:
          "أضف مستوى الهجرة + صفوف الميزات للمجموع النهائي. انظر حزم السيناريو.",
        rows: [
          { label: "الواجهة (كل القوالب)", optionA: feCost, optionB: feCost },
          {
            label: "طبقة Strapi CMS",
            optionA: "—",
            optionB: `${formatCost(withBuffers(cmsHours.strapiMin))}–${formatCost(withBuffers(cmsHours.strapiMax))}`,
          },
          {
            label: "هجرة المحتوى (المستوى)",
            optionA: "M0–M2 (انظر المصفوفة)",
            optionB: "M0–M2 (انظر المصفوفة)",
          },
          {
            label: "مجموع السيناريو المقترح",
            optionA: (() => {
              const s = calcScenario("consolidated", "none", "m0");
              return `${formatCost(s.min)}–${formatCost(s.max)}`;
            })(),
            optionB: (() => {
              const s = calcScenario("hybrid", "strapi", "m1");
              return `${formatCost(s.min)}–${formatCost(s.max)}`;
            })(),
          },
        ],
      },
      addons: {
        title: "خارج النطاق وإضافات اختيارية",
        outOfScopeTitle: "مستبعد من التقدير الأساسي (افتراضياً)",
        outOfScope: [
          "تصميم UI/UX وتسليمات Figma النهائية (مسار منفصل).",
          "كتابة المحتوى والتحرير والترجمة عربي/إنجليزي.",
          "الاستضافة وDevOps وSSL والبنية التحتية.",
          "فريق QA منفصل (المطور يجري فحوصات متجاوبية وRTL أساسية).",
          "تدقيق WCAG والامتثال القانوني.",
          "هجرة SEO والتحليلات و301 (ما لم تُضاف كإضافة).",
        ],
        optionalTitle: "عند الإضافة — التأثير التقديري",
        optional: [
          { label: "هجرة SEO + تحويلات 301", hours: "16–24 س", cost: "$192–$288" },
          { label: "تدقيق WCAG 2.1 AA + إصلاحات", hours: "24–40 س", cost: "$288–$480" },
          { label: "إعداد استضافة + CI/CD", hours: "8–16 س", cost: "$96–$192" },
          { label: "تحليلات + شريط موافقة", hours: "4–8 س", cost: "$48–$96" },
          { label: "جلسات تدريب CMS إضافية", hours: "4–6 س", cost: "$48–$72" },
        ],
      },
      portfolio: {
        title: "سابقة أعمال فريق التطوير",
        subtitle: "مشاريع مختارة نفّذها الفريق — مراجع حية لجودة التسليم.",
        teamTitle: "الفريق",
        teamNote: "الفريق وراء هذا الاقتراح والأعمال المختارة أدناه.",
        projectsTitle: "أعمال مختارة",
        viewProject: "زيارة الموقع",
        featuredLabel: "قريب من نطاق أوابك",
      },
      inquiries: {
        title: "استفسارات مفتوحة (تعيق التقدير النهائي)",
        subtitle: "بانتظار رد أوابك — كل بند يرتبط بصف في مصفوفة القرار أعلاه.",
        items: [
          { q: "ثابت (A) أم CMS (B)؟", status: "بانتظار الرد", impact: "±45–65 س (CMS)" },
          { q: "عمق الأرشيف (M0 / M1 / M2)؟", status: "ورشة أعمال", impact: "±25–260 س" },
          { q: "هيكلة المعلومات (مطابقة / هجين / موحّد)؟", status: "اجتماع اكتشاف", impact: "±0–20% واجهة" },
          { q: "نظام المكتبة الإلكترونية — داخل الموقع أم خارجي؟", status: "بانتظار الرد", impact: "يُحدد لاحقاً" },
          { q: "نطاق موقع المؤتمر (فرعي كامل أم صفحة واحدة)؟", status: "بانتظار الرد", impact: "8–40 س" },
          { q: "النشرة، البحث، نموذج التواصل — أيها نُبقي؟", status: "بانتظار الرد", impact: "2–32 س لكل ميزة" },
          { q: "من يوفّر النص العربي والترجمة؟", status: "ورشة أعمال", impact: "خارج النطاق ما لم يُضف" },
        ],
      },
      support: {
        title: "باكجات دعم ما بعد الإطلاق",
        packagesTitle: "باكجات اختيارية لتقليل المخاطر بعد go-live.",
        packages: [
          {
            name: "باكيج 1: دعم إصلاحات الإطلاق",
            durationPlaceholder: "14 يوماً",
            details: [
              "إصلاح أخطاء الصفحات المُسلّمة وتكامل CMS.",
              "تعديلات CSS/مسافات بسيطة بعد مراجعة أوابك الأولى.",
            ],
          },
          {
            name: "باكيج 2: تدريب CMS",
            durationPlaceholder: "جلستان",
            details: [
              "تدريب: أخبار، منشورات، إعلام، صفحات، محتوى الأعضاء.",
              "قائمة تسليم ودليل استخدام لوحة الإدارة.",
            ],
          },
          {
            name: "باكيج 3: صيانة شهرية",
            durationPlaceholder: "3 أشهر (يُحدد لاحقاً)",
            details: [
              "تحديثات طفيفة وتصحيحات تبعيات وتغييرات هيكل محتوى صغيرة.",
              "التسعير يُقتبس منفصلاً بعد تأكيد النطاق.",
            ],
          },
        ],
      },
      nextSteps: {
        title: "الخطوات القادمة",
        details: [
          "اجتماع اكتشاف: اختيار صف لكل مصفوفة قرار (IA، هجرة، ميزات).",
          "تأكيد الخيار A (ثابت) أو B (CMS) لإدارة المحتوى.",
          "ورشة محتوى مع فريق أعمال أوابك → تحديد M0/M1/M2.",
          "فريق UI/UX يُسلّم Figma → يبدأ تنفيذ الواجهة.",
          "اختيار حزمة سيناريو (أو تركيبة مخصصة) → توقيع نطاق العمل.",
        ],
        decisionPrompt:
          "هذا الاقتراح جاهز للنقاش اليوم — الساعات والتكلفة النهائية تُحسب من اختياراتكم، وليس تخمينات.",
      },
    },
  },
};

