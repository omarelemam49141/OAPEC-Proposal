"use client";

import { LanguageProvider } from "@/components/language/language-provider";
import { Navbar } from "@/components/layout/Navbar";
import { ClientViewBanner } from "@/components/proposal/ClientProposalToggle";
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
      <div className="min-h-full bg-background text-foreground">
        <Navbar />
        <ClientViewBanner />
        <main className="pt-28">
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
