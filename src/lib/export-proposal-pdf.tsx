import type { AddonSelection } from "./client-addons-config";
import { registerProposalPdfFonts } from "./proposal-pdf-fonts";

const PDF_TIMEOUT_MS = 45_000;
const PDF_LANG = "en" as const;

/** Browser build of react-pdf — required for client-side PDF generation in Next.js. */
async function loadReactPdf() {
  return import("@react-pdf/renderer/lib/react-pdf.browser.js");
}

/** Proposal PDF is English-only (react-pdf does not reliably render Arabic). */
export async function exportProposalAsPdf(selection: AddonSelection): Promise<void> {
  const { pdf, Font } = await loadReactPdf();
  await registerProposalPdfFonts(Font);

  const { ProposalPdfDocument } = await import("@/components/proposal/ProposalPdfDocument");

  const blob = await Promise.race([
    pdf(<ProposalPdfDocument selection={selection} lang={PDF_LANG} />).toBlob(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("PDF generation timed out. Please try again.")), PDF_TIMEOUT_MS)
    ),
  ]);

  if (!blob || blob.size === 0) {
    throw new Error("PDF generation produced an empty file.");
  }

  const filename = `OAPEC-Proposal-Estimate-${new Date().toISOString().slice(0, 10)}.pdf`;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
