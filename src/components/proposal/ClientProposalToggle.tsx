"use client";

import { useLanguage } from "@/components/language/language-provider";
import { clientCopy } from "@/lib/client-proposal-i18n";

export function ClientViewBanner() {
  const { lang } = useLanguage();

  return (
    <div className="no-print fixed top-16 inset-x-0 z-40 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-2 px-4 text-sm font-semibold shadow-md">
      {clientCopy[lang].viewBanner}
    </div>
  );
}
