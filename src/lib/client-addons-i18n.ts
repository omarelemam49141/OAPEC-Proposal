import type { Lang } from "./i18n";
import { addonPrices, formatUsd } from "./client-addons-config";

export const addonsCopy: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    base: {
      title: string;
      badge: string;
      includes: string[];
      timeline: string;
      price: string;
    };
    mobile: {
      title: string;
      description: string;
      includes: string[];
      mobileUxNote: string;
      timeline: string;
      price: string;
      uxPrice: string;
    };
    conference: {
      title: string;
      description: string;
      includes: string[];
      breakdown: { label: string; value: string }[];
      timeline: string;
      price: string;
      disclaimer: string;
    };
    cms: {
      title: string;
      subtitle: string;
      none: string;
      strapiTitle: string;
      customTitle: string;
      comparisonTitle: string;
      columns: { factor: string; strapi: string; custom: string };
      rows: { factor: string; strapi: string; custom: string }[];
      strapiTimeline: string;
      customTimeline: string;
      phaseNote: string;
    };
    summary: {
      title: string;
      totalLabel: string;
      totalDurationLabel: string;
      timelinesTitle: string;
      selectedLabel: string;
      noneSelected: string;
    };
  }
> = {
  en: {
    title: "Optional add-ons",
    subtitle: "Select modules to build a tailored estimate. Base website timeline stays 6–7 weeks unless noted.",
    base: {
      title: "Base package (included)",
      badge: "Always included",
      includes: [
        "Fully responsive website — desktop, tablet, and mobile browsers (AR + EN, RTL).",
        "Not a native app; optimized layout for all screen sizes in the browser.",
        "Static bilingual site with search, contact, newsletter, and social embed.",
        "Content from copy OAPEC provides; DataBank & e-library as external links.",
      ],
      timeline: "6–7 weeks",
      price: formatUsd(addonPrices.base),
    },
    mobile: {
      title: "Native mobile apps (iOS + Android)",
      description: "Same static content and structure as the website — delivered on a separate schedule.",
      includes: [
        "iOS and Android apps (cross-platform codebase).",
        "Mirrors main site sections and bilingual content.",
        "Does not extend the 6–7 week website delivery window.",
      ],
      mobileUxNote: `Includes mobile UI/UX design (+${formatUsd(addonPrices.mobileUx)}) — required for native apps.`,
      timeline: "8–9 weeks (mobile track)",
      price: formatUsd(addonPrices.mobileApps),
      uxPrice: formatUsd(addonPrices.mobileUx),
    },
    conference: {
      title: "Conference module (events + management)",
      description: "~12 pages (indicative) — website + mobile apps + UI/UX + backend. Starts after the static website (or native apps, if selected) is complete.",
      includes: [
        "Public event pages: program, sessions, speakers, registration, and more.",
        "Backend admin to manage events, sessions, speakers, and registrations.",
        "Native iOS + Android apps for the conference experience.",
      ],
      breakdown: [
        { label: "Web + backend", value: "$1,500" },
        { label: "UI/UX", value: "$300" },
        { label: "Mobile (iOS + Android)", value: "$1,000" },
      ],
      timeline: "5–6 weeks (separate module schedule)",
      price: formatUsd(addonPrices.conference),
      disclaimer:
        "Important: Conference module cost and timeline are indicative only. They may change once OAPEC finalizes business rules, workflows, integrations, and the page list. Business scope for this module is not finalized yet.",
    },
    cms: {
      title: "Content management (website + mobile)",
      subtitle: "Phase 2 — after static go-live. Choose one approach:",
      none: "No CMS add-on",
      strapiTitle: `Strapi CMS — ${formatUsd(addonPrices.cmsStrapi)}`,
      customTitle: `Custom CMS (OAPEC-owned) — ${formatUsd(addonPrices.cmsCustom)}`,
      comparisonTitle: "Strapi vs custom CMS — detailed comparison",
      columns: { factor: "Factor", strapi: "Strapi CMS", custom: "Custom CMS" },
      rows: [
        {
          factor: "Best for",
          strapi: "Faster editorial self-service with a proven admin UI",
          custom: "Full control, custom workflows, no third-party CMS dependency",
        },
        {
          factor: "Website + mobile",
          strapi: "Yes — shared API for web and apps",
          custom: "Yes — APIs built for your web and mobile clients",
        },
        {
          factor: "Estimated cost",
          strapi: formatUsd(addonPrices.cmsStrapi),
          custom: formatUsd(addonPrices.cmsCustom),
        },
        {
          factor: "Extra timeline",
          strapi: "+2–2.5 weeks (Phase 2)",
          custom: "+5–6 weeks (Phase 2)",
        },
        {
          factor: "Third-party dependency",
          strapi: "Yes (Strapi + database hosting)",
          custom: "No — fully owned stack",
        },
        {
          factor: "Admin & training",
          strapi: "Standard Strapi admin; quicker handover",
          custom: "Bespoke admin panel; more training documentation",
        },
        {
          factor: "Maintenance risk",
          strapi: "Lower — mature product",
          custom: "Higher — security, backups, and upgrades are yours",
        },
      ],
      strapiTimeline: "+2–2.5 weeks after static launch",
      customTimeline: "+5–6 weeks after static launch",
      phaseNote:
        "CMS work does not delay the 6–7 week static website launch when delivered as Phase 2.",
    },
    summary: {
      title: "Your estimate",
      totalLabel: "Total investment",
      totalDurationLabel: "Total estimated duration",
      timelinesTitle: "Delivery schedules",
      selectedLabel: "Selected add-ons",
      noneSelected: "Base package only",
    },
  },

  ar: {
    title: "إضافات اختيارية",
    subtitle: "اختر الوحدات لبناء تقدير مخصص. جدول الموقع الأساسي يبقى 6–7 أسابيع ما لم يُذكر غير ذلك.",
    base: {
      title: "الباقة الأساسية (مشمولة)",
      badge: "دائماً مشمولة",
      includes: [
        "موقع متجاوب بالكامل — سطح مكتب، جهاز لوحي، ومتصفح الجوال (عربي + إنجليزي، RTL).",
        "ليس تطبيقاً أصلياً؛ تخطيط محسّن لجميع أحجام الشاشات في المتصفح.",
        "موقع ثابت ثنائي اللغة مع بحث، تواصل، نشرة، وتضمين اجتماعي.",
        "محتوى من نصوص تزودنا بها أوابك؛ بنك البيانات والمكتبة كروابط خارجية.",
      ],
      timeline: "6–7 أسابيع",
      price: formatUsd(addonPrices.base),
    },
    mobile: {
      title: "تطبيقات أصلية (iOS + Android)",
      description: "نفس المحتوى والهيكل الثابت للموقع — بجدول تسليم منفصل.",
      includes: [
        "تطبيقان iOS وAndroid (قاعدة كود مشتركة).",
        "يعكس أقسام الموقع الرئيسي والمحتوى ثنائي اللغة.",
        "لا يمدّ نافذة تسليم الموقع (6–7 أسابيع).",
      ],
      mobileUxNote: `يشمل تصميم UI/UX للتطبيق (+${formatUsd(addonPrices.mobileUx)}) — مطلوب للتطبيقات الأصلية.`,
      timeline: "8–9 أسابيع (مسار التطبيق)",
      price: formatUsd(addonPrices.mobileApps),
      uxPrice: formatUsd(addonPrices.mobileUx),
    },
    conference: {
      title: "وحدة المؤتمرات (فعاليات + إدارة)",
      description: "~12 صفحة (تقديرية) — موقع + تطبيقات + UI/UX + backend. يبدأ بعد اكتمال الموقع الثابت (أو التطبيقات إن وُجدت).",
      includes: [
        "صفحات عامة: البرنامج، الجلسات، المتحدثون، التسجيل، وغيرها.",
        "لوحة إدارة للفعاليات والجلسات والمتحدثين والتسجيلات.",
        "تطبيقات iOS وAndroid لتجربة المؤتمر.",
      ],
      breakdown: [
        { label: "ويب + backend", value: "$1,500" },
        { label: "UI/UX", value: "$300" },
        { label: "تطبيقات (iOS + Android)", value: "$1,000" },
      ],
      timeline: "5–6 أسابيع (جدول الوحدة منفصل)",
      price: formatUsd(addonPrices.conference),
      disclaimer:
        "مهم: تكلفة وجدول وحدة المؤتمرات تقديرية فقط. قد تتغير بعد اعتماد أوابك للقواعد التجارية وسير العمل والتكاملات وقائمة الصفحات. نطاق الأعمال لهذه الوحدة غير نهائي بعد.",
    },
    cms: {
      title: "إدارة المحتوى (الموقع + التطبيق)",
      subtitle: "المرحلة 2 — بعد الإطلاق الثابت. اختر نهجاً واحداً:",
      none: "بدون إضافة CMS",
      strapiTitle: `Strapi CMS — ${formatUsd(addonPrices.cmsStrapi)}`,
      customTitle: `CMS مخصص (ملكية أوابك) — ${formatUsd(addonPrices.cmsCustom)}`,
      comparisonTitle: "Strapi مقابل CMS مخصص — مقارنة تفصيلية",
      columns: { factor: "العامل", strapi: "Strapi CMS", custom: "CMS مخصص" },
      rows: [
        {
          factor: "الأنسب لـ",
          strapi: "تحرير ذاتي أسرع بواجهة إدارة جاهزة",
          custom: "تحكم كامل، سير عمل مخصص، بلا اعتماد على CMS طرف ثالث",
        },
        {
          factor: "الموقع + التطبيق",
          strapi: "نعم — API مشترك",
          custom: "نعم — APIs مبنية لتطبيقاتكم",
        },
        {
          factor: "التكلفة التقديرية",
          strapi: formatUsd(addonPrices.cmsStrapi),
          custom: formatUsd(addonPrices.cmsCustom),
        },
        {
          factor: "مدة إضافية",
          strapi: "+2–2.5 أسابيع (المرحلة 2)",
          custom: "+5–6 أسابيع (المرحلة 2)",
        },
        {
          factor: "اعتماد طرف ثالث",
          strapi: "نعم (Strapi + قاعدة بيانات)",
          custom: "لا — مكدس مملوك بالكامل",
        },
        {
          factor: "الإدارة والتدريب",
          strapi: "واجهة Strapi القياسية؛ تسليم أسرع",
          custom: "لوحة إدارة مخصصة؛ توثيق وتدريب أوسع",
        },
        {
          factor: "مخاطر الصيانة",
          strapi: "أقل — منتج ناضج",
          custom: "أعلى — أمن ونسخ احتياطي وتحديثات على عاتقكم",
        },
      ],
      strapiTimeline: "+2–2.5 أسابيع بعد الإطلاق الثابت",
      customTimeline: "+5–6 أسابيع بعد الإطلاق الثابت",
      phaseNote: "عمل CMS لا يؤخر إطلاق الموقع الثابت (6–7 أسابيع) عند تنفيذه كمرحلة 2.",
    },
    summary: {
      title: "تقديركم",
      totalLabel: "إجمالي الاستثمار",
      totalDurationLabel: "إجمالي المدة التقديرية",
      timelinesTitle: "جداول التسليم",
      selectedLabel: "الإضافات المختارة",
      noneSelected: "الباقة الأساسية فقط",
    },
  },
};
