import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import type { AddonSelection } from "@/lib/client-addons-config";
import type { Lang } from "@/lib/i18n";
import {
  buildInvestmentRows,
  buildProposalPdfData,
  type PdfScopeItem,
} from "@/lib/proposal-pdf-data";
import { pdfRowDirection } from "@/lib/proposal-pdf-text";
import { PdfText } from "@/components/proposal/PdfText";

const colors = {
  green: "#1B5E4B",
  teal: "#0D3B2E",
  gold: "#C9A227",
  slate: "#1E293B",
  slateLight: "#64748B",
  surface: "#F4F7F6",
  white: "#FFFFFF",
  border: "#E2E8F0",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Cairo",
    fontSize: 10,
    color: colors.slate,
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 40,
    backgroundColor: colors.white,
  },
  headerBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: colors.green,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 8,
    color: colors.slateLight,
  },
  coverHeader: {
    marginTop: 24,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: colors.surface,
    color: colors.green,
    fontSize: 9,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  badgeRtl: {
    alignSelf: "flex-end",
  },
  badgeLtr: {
    alignSelf: "flex-start",
  },
  coverTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.teal,
    marginBottom: 10,
    lineHeight: 1.3,
  },
  coverSubtitle: {
    fontSize: 11,
    color: colors.slateLight,
    lineHeight: 1.6,
    maxWidth: 480,
  },
  coverDate: {
    fontSize: 9,
    color: colors.slateLight,
    marginTop: 8,
  },
  coverDateRtl: {
    alignSelf: "flex-end",
  },
  heroMetrics: {
    flexDirection: "row",
    gap: 12,
    marginTop: 28,
    marginBottom: 24,
  },
  metricBox: {
    flex: 1,
    backgroundColor: colors.teal,
    borderRadius: 8,
    padding: 16,
  },
  metricBoxGold: {
    flex: 1,
    backgroundColor: colors.green,
    borderRadius: 8,
    padding: 16,
  },
  metricLabel: {
    fontSize: 9,
    color: "#A7F3D0",
    marginBottom: 6,
    fontWeight: 700,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.white,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.teal,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: colors.gold,
  },
  scopeCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  scopeCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: colors.surface,
    padding: 12,
    gap: 8,
  },
  scopeCardTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.teal,
    flex: 1,
  },
  scopeMeta: {
    minWidth: 80,
  },
  scopeMetaRtl: {
    alignItems: "flex-start",
  },
  scopeMetaLtr: {
    alignItems: "flex-end",
  },
  scopePrice: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.green,
  },
  scopeDuration: {
    fontSize: 9,
    color: colors.slateLight,
    marginTop: 2,
  },
  scopeBody: {
    padding: 12,
    paddingTop: 8,
  },
  featureLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: colors.slateLight,
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  featureRow: {
    flexDirection: "row",
    marginBottom: 4,
    gap: 6,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gold,
    marginTop: 4,
  },
  featureText: {
    fontSize: 9,
    color: colors.slate,
    lineHeight: 1.5,
    flex: 1,
  },
  noteBox: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#FFFBEB",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  noteText: {
    fontSize: 8,
    color: "#92400E",
    lineHeight: 1.45,
  },
  scheduleRow: {
    flexDirection: "row",
    marginBottom: 6,
    gap: 8,
    alignItems: "flex-start",
  },
  scheduleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.green,
    marginTop: 3,
  },
  scheduleText: {
    fontSize: 9,
    color: colors.slate,
    flex: 1,
    lineHeight: 1.45,
  },
  milestoneRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 8,
    gap: 10,
  },
  milestoneWeeks: {
    width: 52,
    fontSize: 9,
    fontWeight: 700,
    color: colors.green,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.slate,
    marginBottom: 2,
  },
  milestoneDesc: {
    fontSize: 8,
    color: colors.slateLight,
    lineHeight: 1.4,
  },
  table: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.teal,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.white,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableRowAlt: {
    backgroundColor: colors.surface,
  },
  tableCell: {
    fontSize: 9,
    color: colors.slate,
  },
  tableCellBold: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.teal,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.green,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.white,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.white,
  },
  includedBox: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  includedHeading: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.teal,
    marginBottom: 6,
  },
  twoCol: {
    flexDirection: "row",
    gap: 12,
  },
  col: {
    flex: 1,
  },
});

function pageStyle(lang: Lang) {
  return lang === "ar"
    ? [styles.page, { direction: "rtl" as const, textAlign: "right" as const }]
    : [styles.page];
}

function footerStyle(lang: Lang) {
  return [styles.footer, { flexDirection: pdfRowDirection(lang) }];
}

type ProposalPdfData = ReturnType<typeof buildProposalPdfData>;

function ScopeCard({
  item,
  labels,
  lang,
}: {
  item: PdfScopeItem;
  labels: ProposalPdfData["labels"];
  lang: Lang;
}) {
  const isRtl = lang === "ar";

  return (
    <View style={styles.scopeCard} wrap={false}>
      <View style={[styles.scopeCardHeader, { flexDirection: pdfRowDirection(lang) }]}>
        <PdfText lang={lang} style={styles.scopeCardTitle}>
          {item.title}
        </PdfText>
        <View style={[styles.scopeMeta, isRtl ? styles.scopeMetaRtl : styles.scopeMetaLtr]}>
          <PdfText lang={lang} style={styles.scopePrice} forceLtr>
            {item.price}
          </PdfText>
          <PdfText lang={lang} style={styles.scopeDuration} forceLtr={!isRtl || /^\d/.test(item.duration)}>
            {item.duration}
          </PdfText>
        </View>
      </View>
      <View style={styles.scopeBody}>
        <PdfText
          lang={lang}
          style={[styles.featureLabel, isRtl ? { textTransform: "none", letterSpacing: 0 } : {}]}
        >
          {labels.features}
        </PdfText>
        {item.features.map((f, i) => (
          <View key={i} style={[styles.featureRow, { flexDirection: pdfRowDirection(lang) }]}>
            <View style={styles.bullet} />
            <PdfText lang={lang} style={styles.featureText}>
              {f}
            </PdfText>
          </View>
        ))}
        {item.note && (
          <View style={styles.noteBox}>
            <PdfText lang={lang} style={styles.noteText}>
              {item.note}
            </PdfText>
          </View>
        )}
      </View>
    </View>
  );
}

type Props = {
  selection: AddonSelection;
  lang: Lang;
};

function InvestmentTable({
  lang,
  labels,
  rows,
}: {
  lang: Lang;
  labels: ProposalPdfData["labels"];
  rows: { label: string; price: string }[];
}) {
  const itemLabel = lang === "ar" ? "البند" : "Item";

  return (
    <View style={styles.table}>
      <View style={[styles.tableHeader, { flexDirection: pdfRowDirection(lang) }]}>
        <PdfText lang={lang} style={[styles.tableHeaderCell, { flex: 1 }]}>
          {itemLabel}
        </PdfText>
        <PdfText lang={lang} style={[styles.tableHeaderCell, { width: 80 }]} align="end">
          {labels.price}
        </PdfText>
      </View>
      {rows.map((row, i) => (
        <View
          key={i}
          style={[
            styles.tableRow,
            { flexDirection: pdfRowDirection(lang) },
            i % 2 === 1 ? styles.tableRowAlt : {},
          ]}
        >
          <PdfText lang={lang} style={[styles.tableCell, { flex: 1 }]}>
            {row.label}
          </PdfText>
          <PdfText lang={lang} style={[styles.tableCellBold, { width: 80 }]} align="end" forceLtr>
            {row.price}
          </PdfText>
        </View>
      ))}
    </View>
  );
}

export function ProposalPdfDocument({ selection, lang }: Props) {
  const data = buildProposalPdfData(selection, lang);
  const investmentRows = buildInvestmentRows(selection, lang);
  const { labels } = data;
  const isRtl = lang === "ar";

  return (
    <Document
      title={data.title}
      author="AIMS"
      subject="OAPEC Website Development Proposal"
    >
      {/* Cover */}
      <Page size="A4" style={pageStyle(lang)}>
        <View style={styles.headerBar} fixed />
        <View style={styles.coverHeader}>
          <PdfText
            lang={lang}
            style={[styles.badge, isRtl ? styles.badgeRtl : styles.badgeLtr]}
          >
            {labels.customEstimate}
          </PdfText>
          <PdfText lang={lang} style={styles.coverTitle}>
            {data.title}
          </PdfText>
          <PdfText lang={lang} style={styles.coverSubtitle}>
            {data.subtitle}
          </PdfText>
          <PdfText lang={lang} style={[styles.coverDate, isRtl ? styles.coverDateRtl : {}]}>
            {data.date}
          </PdfText>
        </View>

        <View style={[styles.heroMetrics, { flexDirection: pdfRowDirection(lang) }]}>
          <View style={styles.metricBoxGold}>
            <PdfText lang={lang} style={styles.metricLabel}>
              {labels.totalInvestment}
            </PdfText>
            <PdfText lang={lang} style={styles.metricValue} forceLtr>
              {data.totalCost}
            </PdfText>
          </View>
          <View style={styles.metricBox}>
            <PdfText lang={lang} style={styles.metricLabel}>
              {labels.totalDuration}
            </PdfText>
            <PdfText lang={lang} style={styles.metricValue} forceLtr>
              {data.totalDuration}
            </PdfText>
          </View>
        </View>

        <PdfText lang={lang} style={styles.sectionTitle}>
          {data.investmentTitle}
        </PdfText>
        <InvestmentTable lang={lang} labels={labels} rows={investmentRows} />

        <View style={[styles.totalRow, { flexDirection: pdfRowDirection(lang) }]}>
          <PdfText lang={lang} style={styles.totalLabel}>
            {labels.totalInvestment}
          </PdfText>
          <PdfText lang={lang} style={styles.totalValue} forceLtr>
            {data.totalCost}
          </PdfText>
        </View>

        <View style={footerStyle(lang)} fixed>
          <PdfText lang={lang} style={styles.footerText}>
            {data.footerNote}
          </PdfText>
          <PdfText lang={lang} style={styles.footerText} forceLtr>
            {`1 / 4`}
          </PdfText>
        </View>
      </Page>

      {/* Scope & features */}
      <Page size="A4" style={pageStyle(lang)}>
        <View style={styles.headerBar} fixed />
        <PdfText lang={lang} style={styles.sectionTitle}>
          {data.scopeTitle}
        </PdfText>
        {data.scopeItems.map((item) => (
          <ScopeCard key={item.id} item={item} labels={labels} lang={lang} />
        ))}

        <View style={footerStyle(lang)} fixed>
          <PdfText lang={lang} style={styles.footerText}>
            {data.footerNote}
          </PdfText>
          <PdfText lang={lang} style={styles.footerText} forceLtr>
            {`2 / 4`}
          </PdfText>
        </View>
      </Page>

      {/* Timeline */}
      <Page size="A4" style={pageStyle(lang)}>
        <View style={styles.headerBar} fixed />
        <PdfText lang={lang} style={styles.sectionTitle}>
          {data.scheduleTitle}
        </PdfText>
        {data.scheduleLines.map((line, i) => (
          <View key={i} style={[styles.scheduleRow, { flexDirection: pdfRowDirection(lang) }]}>
            <View style={styles.scheduleDot} />
            <PdfText lang={lang} style={styles.scheduleText}>
              {line}
            </PdfText>
          </View>
        ))}

        <PdfText lang={lang} style={[styles.sectionTitle, { marginTop: 20 }]}>
          {data.milestonesTitle}
        </PdfText>
        <PdfText lang={lang} style={{ fontSize: 9, color: colors.slateLight, marginBottom: 10 }}>
          {data.milestonesSubtitle}
        </PdfText>
        {data.milestones.map((m, i) => (
          <View
            key={i}
            style={[styles.milestoneRow, { flexDirection: pdfRowDirection(lang) }]}
            wrap={false}
          >
            <PdfText lang={lang} style={styles.milestoneWeeks} forceLtr>
              {m.weeks}
            </PdfText>
            <View style={styles.milestoneContent}>
              <PdfText lang={lang} style={styles.milestoneTitle}>
                {m.title}
              </PdfText>
              <PdfText lang={lang} style={styles.milestoneDesc}>
                {m.desc}
              </PdfText>
            </View>
          </View>
        ))}

        <View style={footerStyle(lang)} fixed>
          <PdfText lang={lang} style={styles.footerText}>
            {data.footerNote}
          </PdfText>
          <PdfText lang={lang} style={styles.footerText} forceLtr>
            {`3 / 4`}
          </PdfText>
        </View>
      </Page>

      {/* Included & summary */}
      <Page size="A4" style={pageStyle(lang)}>
        <View style={styles.headerBar} fixed />
        <PdfText lang={lang} style={styles.sectionTitle}>
          {data.includedSectionTitle}
        </PdfText>

        <View style={[styles.twoCol, { flexDirection: pdfRowDirection(lang) }]}>
          <View style={[styles.col, styles.includedBox]}>
            <PdfText lang={lang} style={styles.includedHeading}>
              {data.supportTitle}
            </PdfText>
            {data.supportDetails.map((d, i) => (
              <View key={i} style={[styles.featureRow, { flexDirection: pdfRowDirection(lang) }]}>
                <View style={styles.bullet} />
                <PdfText lang={lang} style={styles.featureText}>
                  {d}
                </PdfText>
              </View>
            ))}
          </View>
          <View style={[styles.col, styles.includedBox]}>
            <PdfText lang={lang} style={styles.includedHeading}>
              {data.sourceCodeTitle}
            </PdfText>
            {data.sourceCodeDetails.map((d, i) => (
              <View key={i} style={[styles.featureRow, { flexDirection: pdfRowDirection(lang) }]}>
                <View style={styles.bullet} />
                <PdfText lang={lang} style={styles.featureText}>
                  {d}
                </PdfText>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.heroMetrics, { marginTop: 16, flexDirection: pdfRowDirection(lang) }]}>
          <View style={styles.metricBoxGold}>
            <PdfText lang={lang} style={styles.metricLabel}>
              {labels.totalInvestment}
            </PdfText>
            <PdfText lang={lang} style={styles.metricValue} forceLtr>
              {data.totalCost}
            </PdfText>
          </View>
          <View style={styles.metricBox}>
            <PdfText lang={lang} style={styles.metricLabel}>
              {labels.totalDuration}
            </PdfText>
            <PdfText lang={lang} style={styles.metricValue} forceLtr>
              {data.totalDuration}
            </PdfText>
          </View>
        </View>

        {data.disclaimer && (
          <View style={[styles.noteBox, { marginTop: 16 }]}>
            <PdfText lang={lang} style={styles.noteText}>
              {data.disclaimer}
            </PdfText>
          </View>
        )}

        <View style={footerStyle(lang)} fixed>
          <PdfText lang={lang} style={styles.footerText}>
            {data.footerNote}
          </PdfText>
          <PdfText lang={lang} style={styles.footerText} forceLtr>
            {`4 / 4`}
          </PdfText>
        </View>
      </Page>
    </Document>
  );
}
