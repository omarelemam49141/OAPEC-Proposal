export type TeamMember = {
  id: string;
  nameEn: string;
  nameAr: string;
  role: string;
  initials: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "ebrahim",
    nameEn: "Ebrahim Dawood",
    nameAr: "إبراهيم داود",
    role: "Senior Backend Developer",
    initials: "ED",
  },
  {
    id: "omar-elemam",
    nameEn: "Omar Elemam",
    nameAr: "عمر الإمام",
    role: "Senior Full Stack Developer",
    initials: "OE",
  },
  {
    id: "omar-ragab",
    nameEn: "Omar Ragab",
    nameAr: "عمر رجب",
    role: "Mid-level Frontend Developer · Odoo implementor & developer",
    initials: "OR",
  },
];

export type PortfolioProject = {
  id: string;
  url: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  tags: string[];
  featured?: boolean;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "eitinaa",
    url: "https://eitinaa.com/ar/home",
    titleEn: "Eitinaa",
    titleAr: "إيتيناء",
    descEn: "Bilingual corporate website (Arabic + English) with rich content sections.",
    descAr: "موقع مؤسسي ثنائي اللغة (عربي + إنجليزي) بأقسام محتوى متعددة.",
    tags: ["Next.js", "RTL", "Bilingual"],
    featured: true,
  },
  {
    id: "excp",
    url: "https://dev.excp.sa:8022/home",
    titleEn: "EXCP Platform",
    titleAr: "منصة EXCP",
    descEn: "Enterprise web platform — multi-section institutional application.",
    descAr: "منصة ويب مؤسسية — تطبيق متعدد الأقسام.",
    tags: ["Enterprise", "Dashboard"],
    featured: true,
  },
  {
    id: "ku-bookshop",
    url: "https://bookshop.ku.edu.kw/#/home",
    titleEn: "KU Student Bookshop",
    titleAr: "مكتبة جامعة الكويت للطلاب",
    descEn: "Student bookshop administration system for Kuwait University.",
    descAr: "نظام إدارة مكتبة الطلاب في جامعة الكويت.",
    tags: ["Institutional", "Admin", "Kuwait"],
    featured: true,
  },
  {
    id: "roadmap",
    url: "https://roadmaptracking.omarragab.dev/",
    titleEn: "AI Roadmap Tracker",
    titleAr: "متتبع خارطة الطريق بالذكاء الاصطناعي",
    descEn: "AI-powered roadmap generator with goals, assistant chat, Pomodoro focus, and progress tracking.",
    descAr: "منصة لتوليد خارطة طريق بالذكاء الاصطناعي مع أهداف ومساعد ذكي وبومودورو وتتبع التقدم.",
    tags: ["Next.js", "AI", "SaaS"],
  },
  {
    id: "elahram",
    url: "https://elahram.coffee/",
    titleEn: "El Ahram Coffee",
    titleAr: "الأهرام للقهوة",
    descEn: "Full e-commerce store for coffee with a private client dashboard.",
    descAr: "متجر إلكتروني كامل لبيع القهوة مع لوحة تحكم خاصة للعميل.",
    tags: ["E-commerce", "Dashboard"],
  },
  {
    id: "ppcassits",
    url: "https://ppcassits.netlify.app/",
    titleEn: "PPC Assists",
    titleAr: "PPC Assists",
    descEn: "Marketing landing page for a SaaS product.",
    descAr: "صفحة هبوط تسويقية لمنتج SaaS.",
    tags: ["Landing Page", "SaaS"],
  },
  {
    id: "furniture",
    url: "https://furniture-ecommerce-six.vercel.app/",
    titleEn: "Furniture Store",
    titleAr: "متجر الأثاث",
    descEn: "E-commerce storefront for furniture products.",
    descAr: "متجر إلكتروني لبيع الأثاث.",
    tags: ["E-commerce", "Next.js"],
  },
  {
    id: "vue-dashboard",
    url: "https://omar-ragab-projects.github.io/vue-dashboard/#/",
    titleEn: "Analytics Dashboard",
    titleAr: "لوحة تحكم تحليلية",
    descEn: "Interactive admin dashboard with charts and data views.",
    descAr: "لوحة تحكم تفاعلية مع رسوم بيانية وعروض بيانات.",
    tags: ["Vue.js", "Dashboard"],
  },
  {
    id: "software-landing",
    url: "https://omar-ragab-projects.github.io/Html-Css-JavaScript/",
    titleEn: "Software Services Landing",
    titleAr: "صفحة خدمات برمجية",
    descEn: "Landing page for a software services company.",
    descAr: "صفحة هبوط لشركة تقدم خدمات برمجية.",
    tags: ["Landing Page", "HTML/CSS/JS"],
  },
  {
    id: "jahez",
    url: "https://omarelemam49141.github.io/landing-page-jahez/home",
    titleEn: "Jahez-style Landing",
    titleAr: "صفحة هبوط (نمط جاهز)",
    descEn: "High-fidelity landing page UI implementation.",
    descAr: "تنفيذ واجهة صفحة هبوط عالية الدقة.",
    tags: ["Landing Page", "UI"],
  },
];
