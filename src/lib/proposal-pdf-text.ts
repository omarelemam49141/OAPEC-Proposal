import type { Lang } from "./i18n";

export function pdfTextAlign(lang: Lang, align: "start" | "end" | "center" = "start") {
  if (lang !== "ar") {
    return align === "end" ? "right" : align === "center" ? "center" : "left";
  }
  return align === "end" ? "left" : align === "center" ? "center" : "right";
}

export function pdfRowDirection(lang: Lang) {
  return lang === "ar" ? ("row-reverse" as const) : ("row" as const);
}
