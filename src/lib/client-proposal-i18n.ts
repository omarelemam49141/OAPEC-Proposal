import type { Lang } from "./i18n";
import {
  clientEstimate,
  clientTimelineWeeks,
  clientMilestoneWeeks,
  DEV_TEAM_SIZE,
} from "./client-proposal-config";

export const clientCopy: Record<
  Lang,
  {
    brandTag: string;
    proposalTitle: string;
    proposalSubtitle: string;
    heroTitle: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    viewBanner: string;
    toggleToClient: string;
    toggleToInternal: string;
    nav: {
      executiveSummary: string;
      identity: string;
      siteGaps: string;
      options: string;
      scenarios: string;
      timeline: string;
      pricing: string;
      portfolio: string;
      inquiries: string;
      support: string;
    };
    siteGaps: {
      title: string;
      subtitle: string;
      bullets: string[];
    };
    options: {
      title: string;
      description: string;
      selectedLabel: string;
      optionA: { title: string; includes: string[]; agileNote: string; goodFor: string };
      optionB: { title: string; upsellNote: string; includes: string[]; goodFor: string };
    };
    scenario: {
      title: string;
      subtitle: string;
      name: string;
      ia: string;
      cms: string;
      content: string;
      integrations: string;
      weeks: string;
      cost: string;
    };
    timeline: {
      title: string;
      totalWeeks: string;
      milestones: { title: string; weeks: string; desc: string }[];
      weeksUnit: string;
    };
    pricing: {
      title: string;
      subtitle: string;
      rows: { label: string; value: string }[];
      totalLabel: string;
      totalValue: string;
      cmsNote: string;
    };
    ai: {
      title: string;
      body: string;
      bullets: string[];
    };
    included: {
      title: string;
      supportTitle: string;
      supportDuration: string;
      supportDetails: string[];
      sourceCodeTitle: string;
      sourceCodeDetails: string[];
      disclaimer: string;
    };
    portfolio: {
      title: string;
      subtitle: string;
      projectsTitle: string;
    };
    inquiries: {
      title: string;
      subtitle: string;
      item: { q: string; status: string; impact: string };
    };
    support: {
      title: string;
      packageName: string;
      badge: string;
      details: string[];
    };
    footerNote: string;
  }
> = {
  en: {
    brandTag: "Initial Proposal",
    proposalTitle: "Initial Proposal",
    proposalSubtitle:
      "A focused plan to modernize the OAPEC website — bilingual (Arabic + English), improved experience, and a clear delivery path.",
    heroTitle: "OAPEC Website Development Proposal",
    heroCtaPrimary: "View estimate",
    heroCtaSecondary: "Proposed identity",
    viewBanner: "Initial proposal — pre-selected scope for discussion",
    toggleToClient: "Client proposal",
    toggleToInternal: "Internal view",
    nav: {
      executiveSummary: "Overview",
      identity: "Identity",
      siteGaps: "Why update?",
      options: "Approach",
      scenarios: "Estimate",
      timeline: "Timeline",
      pricing: "Investment",
      portfolio: "Portfolio",
      inquiries: "Note",
      support: "Included",
    },
    siteGaps: {
      title: "Why does the current site need an update?",
      subtitle:
        "oapecorg.org serves an important institutional role. A refresh addresses real gaps — without changing what works.",
      bullets: [
        "Visual experience does not fully reflect OAPEC's institutional stature.",
        "Updating content often requires developer involvement.",
        "Navigation across many sections can feel complex for visitors.",
        "Mobile performance and RTL experience can be improved.",
        "Some tools (DataBank, e-library) live on separate sites — the main site can connect them more clearly.",
        "The new visual identity can be applied consistently across all pages.",
      ],
    },
    options: {
      title: "Our recommended approach",
      description:
        "We propose a high-performance static website with bilingual support. A content management system remains available as a future upgrade if OAPEC needs self-service editing later.",
      selectedLabel: "Selected for this proposal",
      optionA: {
        title: "Static bilingual website",
        includes: [
          "Modern, fast pages in Arabic and English (RTL from day one).",
          "Content implemented from copy OAPEC provides for each page.",
          "Search, contact form, newsletter, and social embed — as on the current site.",
          "DataBank and e-library as clear links to existing external systems.",
        ],
        agileNote:
          "We deliver using Agile — time-boxed sprints with progress tracked and shared with OAPEC in Jira.",
        goodFor:
          "Predictable cost, excellent performance, and a clean launch with content you control.",
      },
      optionB: {
        title: "Optional future upgrade: CMS (Strapi)",
        upsellNote: "Not included in this estimate — available when editorial needs grow.",
        includes: [
          "Same frontend design and user experience.",
          "OAPEC staff could update news, publications, and media without a developer.",
          "Can be scoped and priced separately after launch.",
        ],
        goodFor: "When frequent in-house content updates become a priority.",
      },
    },
    scenario: {
      title: "Project estimate",
      subtitle: "Consolidated IA · static site · client content · 2 developers on implementation",
      name: "Recommended scope",
      ia: "Consolidated hubs (streamlined navigation)",
      cms: "Static pages (no CMS in base scope)",
      content: "OAPEC provides copy per page; we implement during build",
      integrations: "Site search, contact form, newsletter, social embed",
      weeks: clientTimelineWeeks.labelEn,
      cost: clientEstimate.totalCostFormatted,
    },
    timeline: {
      title: "Delivery timeline",
      totalWeeks: `Estimated duration: ${clientTimelineWeeks.labelEn}`,
      weeksUnit: "weeks",
      milestones: [
        {
          title: "UI/UX design",
          weeks: clientMilestoneWeeks[0],
          desc: "Wireframes and visual design for key templates (Arabic + English).",
        },
        {
          title: "Design sign-off & shared components",
          weeks: clientMilestoneWeeks[1],
          desc: "Header, footer, navigation, cards, and RTL layout system.",
        },
        {
          title: "Core pages & hubs",
          weeks: clientMilestoneWeeks[2],
          desc: "Home, About, Media hub, and Publications center.",
        },
        {
          title: "Remaining templates & content",
          weeks: clientMilestoneWeeks[3],
          desc: "Activities, library links, utilities, and content placement from OAPEC copy.",
        },
        {
          title: "Integrations & QA",
          weeks: clientMilestoneWeeks[4],
          desc: "Search, forms, newsletter, responsive and bilingual testing.",
        },
        {
          title: "Launch & handover",
          weeks: clientMilestoneWeeks[5],
          desc: "Go-live support, source code delivery, and documentation.",
        },
      ],
    },
    pricing: {
      title: "Investment",
      subtitle: "Fixed estimate for the scope described in this proposal",
      rows: [
        {
          label: `UI/UX design + website development (${clientTimelineWeeks.labelEn}, bilingual, ${DEV_TEAM_SIZE} developers, AI-assisted)`,
          value: clientEstimate.totalCostFormatted,
        },
      ],
      totalLabel: "Total project investment",
      totalValue: clientEstimate.totalCostFormatted,
      cmsNote:
        "Content management system (Strapi) is an optional future upgrade — priced separately on request.",
    },
    ai: {
      title: "AI-assisted delivery",
      body: "We use modern AI tools to speed up coding and integrations — always under senior developer review. UI/UX design remains a human-led craft; AI savings are reflected in development hours only.",
      bullets: [
        "Faster component implementation and consistency checks.",
        "Smarter scaffolding for search, forms, and newsletter integrations.",
        "OAPEC retains full editorial control; AI supports delivery, not content decisions.",
      ],
    },
    included: {
      title: "What you receive",
      supportTitle: "1 month free post-launch support",
      supportDuration: "30 days after go-live",
      supportDetails: [
        "Bug fixes on delivered pages and integrations.",
        "Minor visual adjustments discovered after launch.",
        "Scope limited to what was delivered — no new features or content writing.",
        "Response within standard market windows for complimentary support tiers.",
      ],
      sourceCodeTitle: "Full source code ownership",
      sourceCodeDetails: [
        "Complete project repository handed over at launch.",
        "No vendor lock-in — OAPEC owns the codebase.",
        "Documentation for deployment and content updates.",
      ],
      disclaimer:
        "Free support follows customary market limits: defects in delivered scope only, excluding enhancements, third-party outages, and hosting issues.",
    },
    portfolio: {
      title: "Selected work",
      subtitle: "Projects delivered by our team — relevant experience for institutional and bilingual sites.",
      projectsTitle: "Projects",
    },
    inquiries: {
      title: "Open point for discussion",
      subtitle: "One optional decision for the future — not blocking this proposal.",
      item: {
        q: "CMS (self-service content) as a future upgrade?",
        status: "Optional — not in current scope",
        impact: "Can be added later when editorial needs require it",
      },
    },
    support: {
      title: "Included with this proposal",
      packageName: "Launch success package",
      badge: "Included at no extra cost",
      details: [
        "1 full month of post-launch support (bug fixes & minor adjustments).",
        "Complete source code and deployment documentation.",
        "Peace of mind during the critical first weeks after go-live.",
      ],
    },
    footerNote: "Initial proposal · oapecorg.org website development",
  },

  ar: {
    brandTag: "اقتراح مبدئي",
    proposalTitle: "اقتراح مبدئي",
    proposalSubtitle:
      "خطة مركّزة لتحديث موقع أوابك — ثنائي اللغة (عربي + إنجليزي)، تجربة محسّنة، ومسار تسليم واضح.",
    heroTitle: "اقتراح تطوير موقع أوابك",
    heroCtaPrimary: "عرض التقدير",
    heroCtaSecondary: "الهوية المقترحة",
    viewBanner: "اقتراح مبدئي — نطاق محدد مسبقاً للنقاش",
    toggleToClient: "عرض العميل",
    toggleToInternal: "العرض الداخلي",
    nav: {
      executiveSummary: "نظرة عامة",
      identity: "الهوية",
      siteGaps: "لماذا التحديث؟",
      options: "المنهجية",
      scenarios: "التقدير",
      timeline: "الجدول",
      pricing: "الاستثمار",
      portfolio: "سابقة الأعمال",
      inquiries: "ملاحظة",
      support: "المشمول",
    },
    siteGaps: {
      title: "لماذا يحتاج الموقع الحالي إلى تحديث؟",
      subtitle:
        "موقع oapecorg.org يؤدي دوراً مؤسسياً مهماً. التحديث يعالج فجوات حقيقية — دون المساس بما يعمل جيداً.",
      bullets: [
        "التجربة البصرية لا تعكس بالكامل مكانة أوابك المؤسسية.",
        "تحديث المحتوى غالباً يتطلب تدخل مطور.",
        "التنقل بين أقسام كثيرة قد يبدو معقداً للزائر.",
        "يمكن تحسين الأداء على الجوال وتجربة RTL.",
        "بعض الأدوات (بنك البيانات، المكتبة الإلكترونية) على مواقع منفصلة — يمكن ربطها أوضح من الموقع الرئيسي.",
        "فرصة لتطبيق الهوية البصرية الجديدة بشكل موحّد على جميع الصفحات.",
      ],
    },
    options: {
      title: "منهجيتنا المقترحة",
      description:
        "نقترح موقعاً ثابتاً عالي الأداء بدعم ثنائي اللغة. نظام إدارة المحتوى (CMS) يبقى متاحاً كترقية مستقبلية إذا احتاجت أوابك التحرير الذاتي لاحقاً.",
      selectedLabel: "المختار في هذا الاقتراح",
      optionA: {
        title: "موقع ثابت ثنائي اللغة",
        includes: [
          "صفحات حديثة وسريعة بالعربية والإنجليزية (RTL من اليوم الأول).",
          "تنفيذ المحتوى من النصوص التي تزودنا بها أوابك لكل صفحة.",
          "بحث، نموذج تواصل، نشرة بريدية، وتضمين اجتماعي — كما في الموقع الحالي.",
          "بنك البيانات والمكتبة الإلكترونية كروابط واضحة للأنظمة الخارجية القائمة.",
        ],
        agileNote:
          "سنعمل وفق منهجية أجايل (سبرنتات زمنية)، مع متابعة المهام والتقدم عبر Jira.",
        goodFor: "تكلفة متوقعة، أداء ممتاز، وإطلاق نظيف بمحتوى تتحكمون به.",
      },
      optionB: {
        title: "ترقية مستقبلية اختيارية: CMS (Strapi)",
        upsellNote: "غير مشمول في هذا التقدير — متاح عند نمو احتياجات التحرير.",
        includes: [
          "نفس تصميم الواجهة وتجربة المستخدم.",
          "يمكن لموظفي أوابك تحديث الأخبار والمنشورات والإعلام دون مطور.",
          "يُقدّر ويُسعّر بشكل منفصل بعد الإطلاق.",
        ],
        goodFor: "عندما تصبح التحديثات الداخلية المتكررة أولوية.",
      },
    },
    scenario: {
      title: "تقدير المشروع",
      subtitle: "هيكلة موحّدة · موقع ثابت · محتوى من أوابك · مطوران في التنفيذ",
      name: "النطاق المقترح",
      ia: "مراكز موحّدة (تنقل مبسّط)",
      cms: "صفحات ثابتة (بدون CMS في النطاق الأساسي)",
      content: "أوابك تزودنا بنصوص كل صفحة؛ ننفّذها أثناء البناء",
      integrations: "بحث الموقع، نموذج تواصل، نشرة بريدية، تضمين اجتماعي",
      weeks: clientTimelineWeeks.labelAr,
      cost: clientEstimate.totalCostFormatted,
    },
    timeline: {
      title: "جدول التسليم",
      totalWeeks: `المدة التقديرية: ${clientTimelineWeeks.labelAr}`,
      weeksUnit: "أسابيع",
      milestones: [
        {
          title: "تصميم UI/UX",
          weeks: clientMilestoneWeeks[0],
          desc: "مخططات وتصميم بصري للقوالب الرئيسية (عربي + إنجليزي).",
        },
        {
          title: "اعتماد التصميم والمكونات المشتركة",
          weeks: clientMilestoneWeeks[1],
          desc: "هيدر، فوتر، تنقل، كروت، ونظام RTL.",
        },
        {
          title: "الصفحات الأساسية والمراكز",
          weeks: clientMilestoneWeeks[2],
          desc: "الرئيسية، نبذة عنا، مركز الإعلام، ومركز المنشورات.",
        },
        {
          title: "القوالب المتبقية والمحتوى",
          weeks: clientMilestoneWeeks[3],
          desc: "الأنشطة، روابط المكتبة، الصفحات المساعدة، ووضع محتوى أوابك.",
        },
        {
          title: "التكاملات وضمان الجودة",
          weeks: clientMilestoneWeeks[4],
          desc: "بحث، نماذج، نشرة، واختبار متجاوب وثنائي اللغة.",
        },
        {
          title: "الإطلاق والتسليم",
          weeks: clientMilestoneWeeks[5],
          desc: "دعم الإطلاق، تسليم الكود المصدري، والتوثيق.",
        },
      ],
    },
    pricing: {
      title: "الاستثمار",
      subtitle: "تقدير ثابت للنطاق الموضح في هذا الاقتراح",
      rows: [
        {
          label: `تصميم UI/UX + تطوير الموقع (${clientTimelineWeeks.labelAr}، ثنائي اللغة، ${DEV_TEAM_SIZE} مطورين، بمساعدة الذكاء الاصطناعي)`,
          value: clientEstimate.totalCostFormatted,
        },
      ],
      totalLabel: "إجمالي استثمار المشروع",
      totalValue: clientEstimate.totalCostFormatted,
      cmsNote:
        "نظام إدارة المحتوى (Strapi) ترقية مستقبلية اختيارية — يُسعّر بشكل منفصل عند الطلب.",
    },
    ai: {
      title: "تسليم بمساعدة الذكاء الاصطناعي",
      body: "نستخدم أدوات الذكاء الاصطناعي لتسريع البرمجة والتكاملات — دائماً تحت إشراف مطورين خبراء. تصميم UI/UX يبقى عملاً بشرياً؛ وفورات الذكاء الاصطناعي تنعكس على ساعات التطوير فقط.",
      bullets: [
        "تنفيذ أسرع للمكونات وفحوصات اتساق.",
        "بناء أسرع لتكاملات البحث والنماذج والنشرة.",
        "أوابك تحتفظ بالتحكم التحريري الكامل؛ الذكاء الاصطناعي يدعم التسليم وليس قرارات المحتوى.",
      ],
    },
    included: {
      title: "ما الذي تحصلون عليه",
      supportTitle: "شهر مجاني دعم بعد الإطلاق",
      supportDuration: "30 يوماً بعد الإطلاق",
      supportDetails: [
        "إصلاح الأخطاء في الصفحات والتكاملات المُسلّمة.",
        "تعديلات بصرية طفيفة تظهر بعد الإطلاق.",
        "النطاق محدود بما تم تسليمه — لا ميزات جديدة ولا كتابة محتوى.",
        "الاستجابة ضمن النوافذ المعتادة في السوق للدعم المجاني.",
      ],
      sourceCodeTitle: "ملكية كاملة للكود المصدري",
      sourceCodeDetails: [
        "مستودع المشروع الكامل يُسلّم عند الإطلاق.",
        "لا قفل على مزود — أوابك تملك الكود.",
        "توثيق للنشر وتحديث المحتوى.",
      ],
      disclaimer:
        "الدعم المجاني يتبع حدود السوق المعتادة: عيوب في النطاق المُسلّم فقط، دون تحسينات أو أعطال طرف ثالث أو استضافة.",
    },
    portfolio: {
      title: "سابقة أعمال مختارة",
      subtitle: "مشاريع نفّذها فريقنا — خبرة ذات صلة بالمواقع المؤسسية وثنائية اللغة.",
      projectsTitle: "المشاريع",
    },
    inquiries: {
      title: "نقطة مفتوحة للنقاش",
      subtitle: "قرار اختياري للمستقبل — لا يعيق هذا الاقتراح.",
      item: {
        q: "CMS (تحرير ذاتي للمحتوى) كترقية مستقبلية؟",
        status: "اختياري — خارج النطاق الحالي",
        impact: "يمكن إضافته لاحقاً عند الحاجة التحريرية",
      },
    },
    support: {
      title: "مشمول مع هذا الاقتراح",
      packageName: "باقة نجاح الإطلاق",
      badge: "مجاني — بدون تكلفة إضافية",
      details: [
        "شهر كامل دعم بعد الإطلاق (إصلاح أخطاء وتعديلات طفيفة).",
        "الكود المصدري الكامل وتوثيق النشر.",
        "راحة بال في الأسابيع الحرجة الأولى بعد الإطلاق.",
      ],
    },
    footerNote: "اقتراح مبدئي · تطوير موقع oapecorg.org",
  },
};
