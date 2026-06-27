"use client";

import { LanguageProvider } from "@/components/language/language-provider";
import { Navbar } from "@/components/layout/Navbar";
import {
  ClientHeroSection,
  ClientIdentitySection,
  SiteGapsSection,
  ClientPricingSection,
  ClientPortfolioSection,
  ClientSupportSection,
  ClientFooterSection,
} from "@/components/proposal/ClientProposalSections";
import { ClientAddonsSection } from "@/components/proposal/ClientAddonsSection";

export default function ProposalPage() {
  return (
    <LanguageProvider>
      <div id="proposal-print-root" className="min-h-full bg-background text-foreground">
        <Navbar />
        <main className="pt-24">
          <ClientHeroSection />
          <ClientIdentitySection />
          <SiteGapsSection />
          <ClientPricingSection />
          <ClientAddonsSection />
          <ClientPortfolioSection />
          <ClientSupportSection />
        </main>
        <ClientFooterSection />
      </div>
    </LanguageProvider>
  );
}
