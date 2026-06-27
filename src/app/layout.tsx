import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OAPEC Website Redesign Proposal",
  description:
    "Bilingual proposal for rebuilding oapecorg.org on Next.js — scenario-based estimates, decision matrices, and implementation options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${inter.variable} font-sans antialiased min-h-full bg-background text-foreground`}
      >
        {/* Initialize language direction early (before React hydration) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  try {
    var lang = localStorage.getItem("oapec_lang") || localStorage.getItem("aims_lang") || "ar";
    document.documentElement.setAttribute("lang", lang === "ar" ? "ar" : "en");
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  } catch (e) {}
})()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
