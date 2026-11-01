import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

let icon: Promise<string> | null = null;
const iconDataUrl = () =>
  (icon ??= readFile(path.join(process.cwd(), "public/brand/scanzivo-icon-512.png")).then((bytes) => `data:image/png;base64,${bytes.toString("base64")}`));

/**
 * The share card (Open Graph / X): Scanzivo's dark ground, a headline, a line under it, and a stylised chart with its
 * levels in the brand colours. Used for the site and for each blog article.
 */
export async function ogCard({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  const logo = await iconDataUrl().catch(() => null);
  // A rising run of candles with wicks (a picture of a chart, no data), and a resistance and a support line.
  const candles: { open: number; close: number; high: number; low: number }[] = [];
  let price = 40;
  [6, -3, 8, -4, 7, 5, -6, 9, -3, 8, 6, -4].forEach((move, index) => {
    const open = price;
    const close = price + move;
    candles.push({ open, close, high: Math.max(open, close) + 3 + (index % 3), low: Math.min(open, close) - 3 - (index % 2) * 2 });
    price = close;
  });
  const scale = (value: number) => 300 - (value - 25) * 3.6;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b0e14", color: "#f3f6fa", padding: 64, fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", right: -120, top: -160, width: 520, height: 520, borderRadius: 520, background: "rgba(0,245,160,0.12)", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {logo && <img src={logo} width={64} height={64} alt="" style={{ borderRadius: 14 }} />}
          <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: 1 }}>SCANZIVO</span>
          <span style={{ marginLeft: 18, fontSize: 24, color: "#00f5a0", textTransform: "uppercase", letterSpacing: 3 }}>{kicker}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div style={{ fontSize: title.length > 60 ? 54 : 64, fontWeight: 800, lineHeight: 1.08, display: "flex" }}>{title}</div>
            <div style={{ marginTop: 22, fontSize: 28, color: "#9aa4b2", lineHeight: 1.35, display: "flex" }}>{subtitle}</div>
          </div>
          <div style={{ display: "flex", position: "relative", width: 300, height: 300, flexShrink: 0 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: scale(78), borderTop: "3px dashed #ff4d6d", display: "flex" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: scale(43), borderTop: "3px dashed #00f5a0", display: "flex" }} />
            {candles.map((candle, index) => {
              const up = candle.close >= candle.open;
              const colour = up ? "#00f5a0" : "#ff4d6d";
              const left = 8 + index * 24;
              return (
                <div key={index} style={{ display: "flex", position: "absolute", left, top: 0, width: 16, height: 300 }}>
                  <div style={{ position: "absolute", left: 7, width: 2, top: scale(candle.high), height: scale(candle.low) - scale(candle.high), background: colour, display: "flex" }} />
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      width: 16,
                      top: scale(Math.max(candle.open, candle.close)),
                      height: Math.max(4, Math.abs(candle.close - candle.open) * 3.6),
                      borderRadius: 3,
                      background: colour,
                      display: "flex",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
