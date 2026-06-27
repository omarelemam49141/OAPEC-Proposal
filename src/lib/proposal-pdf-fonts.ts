import { assetPath } from "./base-path";

type FontModule = typeof import("@react-pdf/renderer").Font;

let registered = false;

function fontUrl(relativePath: string): string {
  if (typeof window === "undefined") {
    return assetPath(relativePath);
  }
  return `${window.location.origin}${assetPath(relativePath)}`;
}

async function toFontDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Proposal PDF font missing: ${url}`);
  }
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return `data:font/truetype;base64,${btoa(binary)}`;
}

/** Register Cairo Latin for English-only proposal PDFs. */
export async function registerProposalPdfFonts(Font: FontModule): Promise<void> {
  if (registered) return;

  const [regularSrc, boldSrc] = await Promise.all([
    toFontDataUrl(fontUrl("/fonts/Cairo-Latin-Regular.ttf")),
    toFontDataUrl(fontUrl("/fonts/Cairo-Latin-Bold.ttf")),
  ]);

  Font.register({
    family: "Cairo",
    fonts: [
      { src: regularSrc, fontWeight: 400 },
      { src: boldSrc, fontWeight: 700 },
    ],
  });

  const { disableHyphenation } = await import("react-pdf-rtl");
  disableHyphenation();

  registered = true;
}
