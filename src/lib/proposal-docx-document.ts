import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  type IPropertiesOptions,
} from "docx";
import type { Lang } from "./i18n";
import {
  buildInvestmentRows,
  buildProposalPdfData,
  type ProposalPdfData,
  type PdfScopeItem,
} from "./proposal-pdf-data";
import type { AddonSelection } from "./client-addons-config";
import type { DocxFontBundle } from "./proposal-docx-fonts";

const colors = {
  green: "1B5E4B",
  teal: "0D3B2E",
  slate: "1E293B",
  slateLight: "64748B",
  gold: "C9A227",
};

type Ctx = {
  lang: Lang;
  rtl: boolean;
  fonts: DocxFontBundle;
};

const AR_LANG = { value: "en-US", bidirectional: "ar-KW" } as const;
const EN_LANG = { value: "en-US" } as const;

function run(
  text: string,
  ctx: Ctx,
  opts?: { bold?: boolean; italics?: boolean; size?: number; color?: string; ltr?: boolean }
): TextRun {
  const useRtl = ctx.rtl && !opts?.ltr;
  return new TextRun({
    text,
    font: opts?.bold ? ctx.fonts.bold : ctx.fonts.regular,
    bold: opts?.bold,
    italics: opts?.italics,
    size: opts?.size,
    color: opts?.color,
    rightToLeft: useRtl,
    language: useRtl ? AR_LANG : opts?.ltr ? EN_LANG : undefined,
  });
}

function paragraph(
  ctx: Ctx,
  children: TextRun | TextRun[],
  opts?: {
    spacingAfter?: number;
    spacingBefore?: number;
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
  }
): Paragraph {
  const runs = Array.isArray(children) ? children : [children];
  return new Paragraph({
    bidirectional: ctx.rtl,
    alignment: opts?.align ?? (ctx.rtl ? AlignmentType.START : AlignmentType.LEFT),
    spacing: { before: opts?.spacingBefore, after: opts?.spacingAfter ?? 160 },
    children: runs,
  });
}

function heading(
  text: string,
  ctx: Ctx,
  level: (typeof HeadingLevel)[keyof typeof HeadingLevel] = HeadingLevel.HEADING_1
): Paragraph {
  return new Paragraph({
    bidirectional: ctx.rtl,
    heading: level,
    alignment: ctx.rtl ? AlignmentType.START : AlignmentType.LEFT,
    spacing: { before: 240, after: 160 },
    children: [
      run(text, ctx, {
        bold: true,
        size: level === HeadingLevel.HEADING_1 ? 48 : 28,
        color: colors.teal,
      }),
    ],
  });
}

function tableCell(text: string, ctx: Ctx, opts?: { bold?: boolean; color?: string; ltr?: boolean; fill?: string }) {
  return new TableCell({
    ...(opts?.fill ? { shading: { fill: opts.fill } } : {}),
    children: [
      paragraph(
        ctx,
        run(text, ctx, { bold: opts?.bold, color: opts?.color, ltr: opts?.ltr }),
        { spacingAfter: 0 }
      ),
    ],
  });
}

function investmentTable(
  rows: { label: string; price: string }[],
  labels: ProposalPdfData["labels"],
  ctx: Ctx
): Table {
  const itemHeader = ctx.lang === "ar" ? "البند" : "Item";

  const header = new TableRow({
    children: [
      tableCell(itemHeader, ctx, { bold: true, color: "FFFFFF", fill: colors.teal }),
      tableCell(labels.price, ctx, { bold: true, color: "FFFFFF", fill: colors.teal }),
    ],
  });

  const body = rows.map(
    (row) =>
      new TableRow({
        children: [
          tableCell(row.label, ctx),
          tableCell(row.price, ctx, { bold: true, ltr: true }),
        ],
      })
  );

  return new Table({
    visuallyRightToLeft: ctx.rtl,
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [header, ...body],
  });
}

function scopeBlock(item: PdfScopeItem, labels: ProposalPdfData["labels"], ctx: Ctx): Paragraph[] {
  const blocks: Paragraph[] = [
    paragraph(
      ctx,
      [
        run(item.title, ctx, { bold: true, size: 24, color: colors.teal }),
        run(`   ${item.price}`, ctx, { bold: true, ltr: true, color: colors.green }),
        run(` · ${item.duration}`, ctx, { color: colors.slateLight, size: 20 }),
      ],
      { spacingAfter: 80 }
    ),
    paragraph(ctx, run(labels.features, ctx, { bold: true, size: 18, color: colors.slateLight }), {
      spacingAfter: 60,
    }),
  ];

  for (const feature of item.features) {
    blocks.push(paragraph(ctx, run(`• ${feature}`, ctx, { size: 20 }), { spacingAfter: 60 }));
  }

  if (item.note) {
    blocks.push(
      paragraph(ctx, run(item.note, ctx, { size: 18, color: colors.gold, italics: true }), {
        spacingAfter: 120,
      })
    );
  }

  return blocks;
}

function sectionProperties() {
  return {
    page: {
      margin: { top: 720, right: 720, bottom: 720, left: 720 },
    },
  };
}

function documentStyles(ctx: Ctx): IPropertiesOptions["styles"] {
  if (!ctx.rtl) return undefined;
  return {
    default: {
      document: {
        run: {
          font: ctx.fonts.regular,
          rightToLeft: true,
          language: AR_LANG,
        },
        paragraph: {
          alignment: AlignmentType.START,
        },
      },
    },
  };
}

export function buildProposalDocxDocument(
  selection: AddonSelection,
  lang: Lang,
  fonts: DocxFontBundle
): Document {
  const data = buildProposalPdfData(selection, lang);
  const investmentRows = buildInvestmentRows(selection, lang);
  const ctx: Ctx = { lang, rtl: lang === "ar", fonts };

  const children: (Paragraph | Table)[] = [
    paragraph(ctx, run(data.labels.customEstimate, ctx, { bold: true, size: 18, color: colors.green }), {
      spacingAfter: 120,
    }),
    heading(data.title, ctx),
    paragraph(ctx, run(data.subtitle, ctx, { size: 22, color: colors.slateLight }), { spacingAfter: 80 }),
    paragraph(ctx, run(data.date, ctx, { size: 18, color: colors.slateLight }), { spacingAfter: 240 }),
    paragraph(
      ctx,
      [
        run(`${data.labels.totalInvestment}: `, ctx, { bold: true, color: colors.green }),
        run(data.totalCost, ctx, { bold: true, size: 36, ltr: true, color: colors.green }),
        run("    ", ctx),
        run(`${data.labels.totalDuration}: `, ctx, { bold: true, color: colors.teal }),
        run(data.totalDuration, ctx, { bold: true, size: 36, ltr: true, color: colors.teal }),
      ],
      { spacingAfter: 320 }
    ),
    heading(data.investmentTitle, ctx, HeadingLevel.HEADING_2),
    investmentTable(investmentRows, data.labels, ctx),
    paragraph(
      ctx,
      [
        run(`${data.labels.totalInvestment}: `, ctx, { bold: true, size: 24 }),
        run(data.totalCost, ctx, { bold: true, size: 28, ltr: true, color: colors.green }),
      ],
      { spacingAfter: 320 }
    ),
    heading(data.scopeTitle, ctx, HeadingLevel.HEADING_2),
  ];

  for (const item of data.scopeItems) {
    children.push(...scopeBlock(item, data.labels, ctx));
  }

  children.push(
    heading(data.scheduleTitle, ctx, HeadingLevel.HEADING_2),
    ...data.scheduleLines.map((line) =>
      paragraph(ctx, run(`• ${line}`, ctx, { size: 20 }), { spacingAfter: 80 })
    ),
    heading(data.milestonesTitle, ctx, HeadingLevel.HEADING_2),
    paragraph(ctx, run(data.milestonesSubtitle, ctx, { size: 20, color: colors.slateLight }), {
      spacingAfter: 120,
    })
  );

  for (const m of data.milestones) {
    children.push(
      paragraph(
        ctx,
        [
          run(m.weeks, ctx, { bold: true, ltr: true, color: colors.green, size: 20 }),
          run(" — ", ctx),
          run(m.title, ctx, { bold: true, size: 22 }),
        ],
        { spacingAfter: 40 }
      ),
      paragraph(ctx, run(m.desc, ctx, { size: 20, color: colors.slateLight }), { spacingAfter: 120 })
    );
  }

  children.push(
    heading(data.includedSectionTitle, ctx, HeadingLevel.HEADING_2),
    paragraph(ctx, run(data.supportTitle, ctx, { bold: true, size: 24, color: colors.teal }), {
      spacingAfter: 80,
    }),
    ...data.supportDetails.map((d) =>
      paragraph(ctx, run(`• ${d}`, ctx, { size: 20 }), { spacingAfter: 60 })
    ),
    paragraph(ctx, run(data.sourceCodeTitle, ctx, { bold: true, size: 24, color: colors.teal }), {
      spacingAfter: 80,
      spacingBefore: 160,
    }),
    ...data.sourceCodeDetails.map((d) =>
      paragraph(ctx, run(`• ${d}`, ctx, { size: 20 }), { spacingAfter: 60 })
    ),
    paragraph(
      ctx,
      [
        run(`${data.labels.totalInvestment}: `, ctx, { bold: true, color: colors.green }),
        run(data.totalCost, ctx, { bold: true, size: 36, ltr: true, color: colors.green }),
        run("    ", ctx),
        run(`${data.labels.totalDuration}: `, ctx, { bold: true, color: colors.teal }),
        run(data.totalDuration, ctx, { bold: true, size: 36, ltr: true, color: colors.teal }),
      ],
      { spacingAfter: 160 }
    )
  );

  if (data.disclaimer) {
    children.push(
      paragraph(ctx, run(data.disclaimer, ctx, { size: 18, italics: true, color: colors.gold }), {
        spacingAfter: 120,
      })
    );
  }

  children.push(
    paragraph(ctx, run(data.footerNote, ctx, { size: 16, color: colors.slateLight }), { spacingAfter: 0 })
  );

  return new Document({
    fonts: fonts.embedded as unknown as IPropertiesOptions["fonts"],
    styles: documentStyles(ctx),
    sections: [
      {
        properties: sectionProperties(),
        children,
      },
    ],
  });
}
