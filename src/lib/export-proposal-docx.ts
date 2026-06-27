import type { AddonSelection } from "./client-addons-config";
import type { Lang } from "./i18n";
import { buildProposalDocxDocument } from "./proposal-docx-document";
import { loadProposalDocxFonts } from "./proposal-docx-fonts";

const DOCX_TIMEOUT_MS = 45_000;

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/** Export proposal as Word (.docx) using embedded Cairo fonts and RTL for Arabic. */
export async function exportProposalAsDocx(
  selection: AddonSelection,
  lang: Lang
): Promise<void> {
  const { Packer } = await import("docx");
  const fonts = await loadProposalDocxFonts(lang);
  const doc = buildProposalDocxDocument(selection, lang, fonts);

  const blob = await Promise.race([
    Packer.toBlob(doc),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Word export timed out. Please try again.")), DOCX_TIMEOUT_MS)
    ),
  ]);

  if (!blob || blob.size === 0) {
    throw new Error("Word export produced an empty file.");
  }

  const date = new Date().toISOString().slice(0, 10);
  const filename =
    lang === "ar"
      ? `OAPEC-اقتراح-${date}.docx`
      : `OAPEC-Proposal-Estimate-${date}.docx`;

  downloadBlob(blob, filename);
}
