"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Palette,
  Star,
  Globe2,
  Briefcase,
  ExternalLink,
  Sparkles,
  Gift,
  Code,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { clientCopy } from "@/lib/client-proposal-i18n";
import { copy, assetPath } from "@/lib/i18n";
import { brandColors } from "@/lib/proposal-estimates";
import { clientNavSectionIds, clientEstimate } from "@/lib/client-proposal-config";
import { portfolioProjects } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ClientHeroSection() {
  const { lang } = useLanguage();
  const t = clientCopy[lang];
  const Arrow = lang === "ar" ? ChevronLeft : ChevronRight;

  return (
    <section
      id={clientNavSectionIds.executiveSummary}
      className="scroll-mt-28 relative min-h-[85vh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-slate-50 to-teal-50/40" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-400/12 rounded-full blur-[120px]" />

      <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-bold text-amber-800 bg-amber-50 border border-amber-200/70 rounded-full"
          >
            <Star size={16} className="text-amber-500" />
            {t.proposalTitle}
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-[1.15] text-slate-900 tracking-tight">
            {lang === "ar" ? (
              <>
                اقتراح تطوير موقع{" "}
                <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  أوابك
                </span>
              </>
            ) : (
              <>
                <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  OAPEC
                </span>{" "}
                Website Development Proposal
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t.proposalSubtitle}
          </p>

          <div className="no-print flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo(clientNavSectionIds.pricing)}
              className="flex items-center gap-2 px-8 py-4 text-lg font-bold bg-gradient-to-r from-emerald-700 to-teal-600 text-white rounded-2xl shadow-xl shadow-emerald-600/20"
            >
              {t.heroCtaPrimary}
              <Arrow size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo(clientNavSectionIds.identity)}
              className="flex items-center gap-2 px-8 py-4 text-lg font-bold border-2 border-slate-200 text-slate-700 rounded-2xl hover:bg-white"
            >
              {t.heroCtaSecondary}
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="no-print mt-14 flex justify-center text-slate-400"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ArrowDown size={28} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto"
        >
          {[
            { value: "EN+AR", label: lang === "ar" ? "ثنائي اللغة" : "Bilingual", icon: <Globe2 size={20} /> },
            { value: clientCopy[lang].scenario.weeks, label: lang === "ar" ? "المدة" : "Duration", icon: <Clock size={20} /> },
            { value: clientEstimate.totalCostFormatted, label: lang === "ar" ? "الاستثمار" : "Investment", icon: <Gift size={20} /> },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/75 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 text-center"
            >
              <div className="flex justify-center mb-2 text-emerald-700">{stat.icon}</div>
              <div className="text-xl md:text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function SiteGapsSection() {
  const { lang } = useLanguage();
  const t = clientCopy[lang].siteGaps;

  return (
    <section id={clientNavSectionIds.siteGaps} className="scroll-mt-28 py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge={clientCopy[lang].nav.siteGaps}
          title={t.title}
          subtitle={t.subtitle}
          badgeColor="purple"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {t.bullets.map((bullet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 leading-relaxed">{bullet}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientPricingSection() {
  const { lang } = useLanguage();
  const t = clientCopy[lang].pricing;
  const ai = clientCopy[lang].ai;

  return (
    <section id={clientNavSectionIds.pricing} className="scroll-mt-28 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading badge={clientCopy[lang].nav.pricing} title={t.title} subtitle={t.subtitle} badgeColor="green" />

        <GlassCard className="mb-8 !p-6 border-violet-200/60 bg-gradient-to-br from-violet-50/80 to-indigo-50/50 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{ai.title}</h3>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">{ai.body}</p>
              <ul className="space-y-1.5">
                {ai.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={14} className="text-violet-500 shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-3xl mx-auto">
          {t.rows.map((row, i) => (
            <div
              key={i}
              className={cn(
                "flex justify-between gap-4 px-6 py-4 border-b border-slate-100 text-sm",
                i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
              )}
            >
              <span className="font-semibold text-slate-700">{row.label}</span>
              <span className="font-bold text-slate-900">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between gap-4 px-6 py-6 bg-gradient-to-r from-emerald-700 to-teal-600 text-white">
            <span className="font-bold text-lg">{t.totalLabel}</span>
            <span className="font-black text-2xl">{t.totalValue}</span>
          </div>
        </div>
        <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto text-sm">{t.cmsNote}</p>
      </div>
    </section>
  );
}

export function ClientPortfolioSection() {
  const { lang } = useLanguage();
  const t = clientCopy[lang].portfolio;
  const viewProject = copyFallback(lang);
  const sorted = [...portfolioProjects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section id={clientNavSectionIds.portfolio} className="scroll-mt-28 py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading badge={clientCopy[lang].nav.portfolio} title={t.title} subtitle={t.subtitle} badgeColor="blue" />

        <h3 className="font-bold text-lg text-slate-900 mb-5 flex items-center gap-2">
          <Briefcase size={20} className="text-blue-600" />
          {t.projectsTitle}
          <span className="text-sm font-normal text-slate-500">({sorted.length})</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((project, i) => {
            const title = lang === "ar" ? project.titleAr : project.titleEn;
            const desc = lang === "ar" ? project.descAr : project.descEn;
            return (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group block bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all",
                  project.featured ? "border-emerald-300 ring-1 ring-emerald-200/80" : "border-slate-200 hover:border-slate-300"
                )}
              >
                <h4 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-2">{title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">{desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                  {viewProject}
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function copyFallback(lang: "en" | "ar") {
  return lang === "ar" ? "عرض المشروع" : "View live site";
}

export function ClientSupportSection() {
  const { lang } = useLanguage();
  const t = clientCopy[lang].support;
  const inc = clientCopy[lang].included;

  return (
    <section id={clientNavSectionIds.support} className="scroll-mt-28 py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading badge={clientCopy[lang].nav.support} title={t.title} badgeColor="purple" />

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <GlassCard className="!p-0 overflow-hidden border-2 border-emerald-300 shadow-lg h-full flex flex-col">
            <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white p-6">
              <div className="flex items-center gap-3 mb-2">
                <Gift size={24} />
                <h3 className="font-black text-xl">{t.packageName}</h3>
              </div>
              <span className="inline-block text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                {t.badge}
              </span>
            </div>
            <ul className="p-6 space-y-3 flex-1">
              {t.details.map((d, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  {d}
                </li>
              ))}
            </ul>
          </GlassCard>

          <div className="space-y-4">
            <GlassCard className="!p-5">
              <div className="flex items-center gap-3 mb-3">
                <Shield size={20} className="text-emerald-700" />
                <div>
                  <h4 className="font-bold text-slate-900">{inc.supportTitle}</h4>
                  <span className="text-xs font-bold text-emerald-700">{inc.supportDuration}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {inc.supportDetails.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-1" />
                    {d}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="!p-5">
              <div className="flex items-center gap-3 mb-3">
                <Code size={20} className="text-blue-700" />
                <h4 className="font-bold text-slate-900">{inc.sourceCodeTitle}</h4>
              </div>
              <ul className="space-y-2">
                {inc.sourceCodeDetails.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={12} className="text-blue-500 shrink-0 mt-1" />
                    {d}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <p className="text-xs text-slate-500 leading-relaxed px-1">{inc.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClientIdentitySection() {
  const { lang } = useLanguage();
  const t = copy[lang].sections.identity;
  const nav = clientCopy[lang].nav;
  const previews = [1, 2, 3, 4].map((n) => assetPath(`/identity-section-${n}.png`));

  return (
    <section id={clientNavSectionIds.identity} className="scroll-mt-28 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading badge={nav.identity} title={t.title} subtitle={t.subtitle} badgeColor="green" />

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {previews.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-50"
              >
                <Image src={src} alt={`Identity preview ${i + 1}`} width={800} height={600} className="w-full h-auto" unoptimized />
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <GlassCard className="!p-5">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Palette size={18} className="text-emerald-700" />
                {t.paletteTitle}
              </h4>
              <div className="space-y-3">
                {brandColors.map((c) => (
                  <div key={c.hex} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border border-slate-200 shadow-inner" style={{ backgroundColor: c.hex }} />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{c.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{c.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200/70 rounded-xl p-4 leading-relaxed flex gap-2">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              {t.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClientFooterSection() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const clientT = clientCopy[lang];

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white no-print">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl font-black text-emerald-300">{t.brandName}</span>
          <span className="font-bold text-white/50">{clientT.brandTag}</span>
        </div>
        <p className="text-slate-400 max-w-md mx-auto text-sm">
          {clientT.footerNote} · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
