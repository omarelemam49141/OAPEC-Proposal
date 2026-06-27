import { CharacterSet } from "docx";
import type { Lang } from "./i18n";
import { assetPath } from "./base-path";

export type DocxFontBundle = {
  regular: string;
  bold: string;
  /** Passed to `Document` constructor */
  embedded: {
    readonly name: string;
    readonly data: Uint8Array;
    readonly characterSet: (typeof CharacterSet)[keyof typeof CharacterSet];
  }[];
};

async function fetchFontBytes(relativePath: string): Promise<Uint8Array> {
  const url =
    typeof window === "undefined"
      ? assetPath(relativePath)
      : `${window.location.origin}${assetPath(relativePath)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Word export font missing: ${url}`);
  }
  return new Uint8Array(await res.arrayBuffer());
}

/** Load Cairo TTFs for embedded Word fonts (Arabic or Latin subset). */
export async function loadProposalDocxFonts(lang: Lang): Promise<DocxFontBundle> {
  const isAr = lang === "ar";
  const regularPath = isAr ? "/fonts/Cairo-Regular.ttf" : "/fonts/Cairo-Latin-Regular.ttf";
  const boldPath = isAr ? "/fonts/Cairo-Bold.ttf" : "/fonts/Cairo-Latin-Bold.ttf";
  const charset = isAr ? CharacterSet.ARABIC : CharacterSet.ANSI;

  const [regularData, boldData] = await Promise.all([
    fetchFontBytes(regularPath),
    fetchFontBytes(boldPath),
  ]);

  return {
    regular: "Cairo",
    bold: "CairoBold",
    embedded: [
      { name: "Cairo", data: regularData, characterSet: charset },
      { name: "CairoBold", data: boldData, characterSet: charset },
    ],
  };
}
