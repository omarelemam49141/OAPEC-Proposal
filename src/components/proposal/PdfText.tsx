import { Text } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { splitBidiSegments } from "react-pdf-rtl";
import { pdfTextAlign } from "@/lib/proposal-pdf-text";
import type { Lang } from "@/lib/i18n";

type PdfTextProps = {
  children: string | number;
  lang: Lang;
  style?: Style | Style[];
  /** Force LTR for numbers, currency, page numbers */
  forceLtr?: boolean;
  align?: "start" | "end" | "center";
  wrap?: boolean;
};

function textDirection(lang: Lang, forceLtr: boolean): "ltr" | "rtl" {
  return lang === "ar" && !forceLtr ? "rtl" : "ltr";
}

function textStyles(
  lang: Lang,
  forceLtr: boolean,
  align: "start" | "end" | "center",
  style?: Style | Style[]
): Style[] {
  return [
    {
      direction: textDirection(lang, forceLtr),
      textAlign: forceLtr ? "left" : pdfTextAlign(lang, align),
    },
    ...(style ? (Array.isArray(style) ? style : [style]) : []),
  ];
}

export function PdfText({
  children,
  lang,
  style,
  forceLtr = false,
  align = "start",
  wrap = true,
}: PdfTextProps) {
  const raw = String(children);
  const styles = textStyles(lang, forceLtr, align, style);

  if (lang !== "ar" || forceLtr) {
    return (
      <Text wrap={wrap} style={styles}>
        {raw}
      </Text>
    );
  }

  const segments = splitBidiSegments(raw).filter((seg) => seg.text.length > 0);

  if (segments.length <= 1) {
    return (
      <Text wrap={wrap} style={styles}>
        {raw}
      </Text>
    );
  }

  return (
    <Text wrap={wrap} style={styles}>
      {segments.map((seg, i) => (
        <Text
          key={i}
          style={{
            direction: seg.direction === "ltr" ? "ltr" : "rtl",
          }}
        >
          {seg.text}
        </Text>
      ))}
    </Text>
  );
}
