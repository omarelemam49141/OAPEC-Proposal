"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ProposalView = "internal" | "client";

type ProposalViewContextValue = {
  view: ProposalView;
  isClientView: boolean;
  toggleView: () => void;
  setView: (view: ProposalView) => void;
};

const ProposalViewContext = createContext<ProposalViewContextValue | null>(null);

export function ProposalViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ProposalView>("internal");

  const toggleView = useCallback(() => {
    setView((v) => (v === "internal" ? "client" : "internal"));
  }, []);

  return (
    <ProposalViewContext.Provider
      value={{
        view,
        isClientView: view === "client",
        toggleView,
        setView,
      }}
    >
      {children}
    </ProposalViewContext.Provider>
  );
}

export function useProposalView() {
  const ctx = useContext(ProposalViewContext);
  if (!ctx) {
    throw new Error("useProposalView must be used within ProposalViewProvider");
  }
  return ctx;
}
