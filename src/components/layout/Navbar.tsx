"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { copy } from "@/lib/i18n";
import { clientCopy } from "@/lib/client-proposal-i18n";
import { clientNavSectionIds } from "@/lib/client-proposal-config";
import { cn } from "@/lib/utils";

const clientNav = [
  "executiveSummary",
  "identity",
  "siteGaps",
  "options",
  "scenarios",
  "timeline",
  "pricing",
  "portfolio",
  "support",
] as const;

export function Navbar() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  const navItems = clientNav.map((key) => ({
    key,
    id: clientNavSectionIds[key],
    label: clientCopy[lang].nav[key],
  }));

  const homeId = clientNavSectionIds.executiveSummary;
  const brandTag = clientCopy[lang].brandTag;
  const brandName = copy[lang].brandName;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const mid = window.scrollY + window.innerHeight / 2;
      document.querySelectorAll("section[id]").forEach((s) => {
        const el = s as HTMLElement;
        if (mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
          setActiveId(s.id);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={cn(
        "no-print fixed inset-x-0 top-0 z-50 transition-all duration-300 overflow-visible",
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-md py-2" : "bg-white/70 backdrop-blur-sm py-3"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 overflow-visible">
        <button type="button" className="flex items-center gap-2 shrink-0" onClick={() => go(homeId)}>
          <span className="text-xl font-black bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
            {brandName}
          </span>
          <span className="font-bold text-slate-400 text-xs hidden sm:inline">{brandTag}</span>
        </button>

        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center max-w-4xl min-w-0 overflow-x-auto scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => go(item.id)}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0",
                activeId === item.id
                  ? "text-white bg-gradient-to-r from-emerald-700 to-teal-600"
                  : "text-slate-600 hover:bg-emerald-50"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 border border-emerald-200/60 text-emerald-800"
          >
            <Globe size={14} />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden max-h-[70vh] overflow-y-auto"
          >
            <div className="flex flex-col p-3 gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => go(item.id)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-semibold text-start",
                    activeId === item.id ? "bg-emerald-700 text-white" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
