"use client";

import { LanguageProvider } from "@/components/language/language-provider";
import { Navbar } from "@/components/layout/Navbar";
import {
  ClientHeroSection,
  ClientIdentitySection,
  SiteGapsSection,
  ClientOptionsSection,
  ClientScenarioSection,
  ClientTimelineSection,
  ClientPricingSection,
  ClientPortfolioSection,
  ClientInquiriesSection,
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
          <ClientOptionsSection />
          <ClientScenarioSection />
          <ClientTimelineSection />
          <ClientPricingSection />
          <ClientAddonsSection />
          <ClientPortfolioSection />
          <ClientInquiriesSection />
          <ClientSupportSection />
        </main>
        <ClientFooterSection />
      </div>
    </LanguageProvider>
  );
}
