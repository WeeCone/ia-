"use client";

import { useEffect, useRef } from "react";

/**
 * Animated hero background: an endless candlestick chart drifting left while a blue "AI scan" sweeps across it,
 * lighting up the candles it passes and the key levels it finds. Drawn on canvas in the site palette.
 * Honors prefers-reduced-motion (renders a single still frame) and pauses when off-screen.
 */

type Candle = { open: number; high: number; low: number; close: number };

const CANDLE_WIDTH = 26; // px per candle slot (CSS pixels)
const SPEED = 22; // px per second
const SCAN_PERIOD = 7; // seconds per sweep

function nextCandle(prevClose: number, drift: number): Candle {
  const open = prevClose;
  const close = open + (Math.random() - 0.5 + drift) * 2.4;
  const high = Math.max(open, close) + Math.random() * 1.2;
  const low = Math.min(open, close) - Math.random() * 1.2;
  return { open, high, low, close };
}

export function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const css = getComputedStyle(document.documentElement);
    const color = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
    const BULL = color("--bull", "#22c997");
    const BEAR = color("--bear", "#f05d6c");
    const BRAND = color("--brand", "#4f8cff");
    const BORDER = color("--border", "#263247");
    const BACKGROUND = color("--background", "#0b0f19");
    // Canvas fonts can't read CSS variables, so resolve the mono family once.
    const MONO = `700 11px ${color("--font-jetbrains-mono", "ui-monospace")}, ui-monospace, monospace`;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const candles: Candle[] = [];
    let offset = 0; // horizontal scroll within the first candle slot
    let drift = 0.08; // gentle trend bias, flips occasionally
    let lo = 0;
    let hi = 1;

    const fill = () => {
      const needed = Math.ceil(width / CANDLE_WIDTH) + 3;
      if (!candles.length) candles.push(nextCandle(100, drift));
      while (candles.length < needed) candles.push(nextCandle(candles[candles.length - 1].close, drift));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fill();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly follow the visible price range so the chart never leaves the frame.
      const targetLo = Math.min(...candles.map((c) => c.low));
      const targetHi = Math.max(...candles.map((c) => c.high));
      lo += (targetLo - lo) * 0.05;
      hi += (targetHi - hi) * 0.05;
      const pad = (hi - lo) * 0.25 + 1;
      const top = height * 0.12;
      const bottom = height * 0.92;
      const y = (price: number) => bottom - ((price - (lo - pad)) / (hi - lo + 2 * pad)) * (bottom - top);

      // Faint price grid.
      ctx.strokeStyle = BORDER;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      for (let i = 1; i < 6; i++) {
        const gy = Math.round(top + ((bottom - top) * i) / 6) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      const scanX = reduceMotion ? width * 0.62 : ((time / 1000 / SCAN_PERIOD) % 1) * (width + 200) - 100;

      // Key levels: recent swing high / low, revealed once the scan has passed over them.
      const levels = [
        { price: targetHi - (targetHi - targetLo) * 0.08, tone: BEAR },
        { price: targetLo + (targetHi - targetLo) * 0.08, tone: BULL },
      ];
      ctx.setLineDash([6, 6]);
      for (const level of levels) {
        ctx.strokeStyle = level.tone;
        ctx.globalAlpha = 0.7;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, y(level.price));
        ctx.lineTo(Math.max(0, scanX), y(level.price));
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Candles: dim by default, lit up near the scan line.
      candles.forEach((candle, index) => {
        const x = index * CANDLE_WIDTH - offset + CANDLE_WIDTH / 2;
        const distance = Math.abs(x - scanX);
        const glow = Math.max(0, 1 - distance / 160);
        ctx.globalAlpha = 0.4 + glow * 0.6;
        ctx.fillStyle = ctx.strokeStyle = candle.close >= candle.open ? BULL : BEAR;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y(candle.high));
        ctx.lineTo(x, y(candle.low));
        ctx.stroke();
        const bodyTop = y(Math.max(candle.open, candle.close));
        const bodyHeight = Math.max(2, Math.abs(y(candle.open) - y(candle.close)));
        ctx.fillRect(x - CANDLE_WIDTH * 0.3, bodyTop, CANDLE_WIDTH * 0.6, bodyHeight);
      });

      // The scan beam.
      const beam = ctx.createLinearGradient(scanX - 120, 0, scanX + 4, 0);
      beam.addColorStop(0, "transparent");
      beam.addColorStop(1, BRAND);
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = beam;
      ctx.fillRect(scanX - 120, 0, 124, height);
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = BRAND;
      ctx.fillRect(scanX, 0, 2, height);

      // Tag riding the beam.
      ctx.font = MONO;
      const tag = "SCAN IA";
      const tagWidth = ctx.measureText(tag).width + 16;
      ctx.globalAlpha = 1;
      ctx.fillRect(scanX - tagWidth / 2, top - 30, tagWidth, 22);
      ctx.fillStyle = BACKGROUND;
      ctx.fillText(tag, scanX - tagWidth / 2 + 8, top - 15);
      ctx.globalAlpha = 1;
    };

    resize();
    lo = Math.min(...candles.map((c) => c.low));
    hi = Math.max(...candles.map((c) => c.high));

    if (reduceMotion) {
      draw(0);
      const onResize = () => {
        resize();
        draw(0);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let frame = 0;
    let last = performance.now();
    let visible = true;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      offset += SPEED * dt;
      while (offset >= CANDLE_WIDTH) {
        offset -= CANDLE_WIDTH;
        candles.shift();
        if (Math.random() < 0.04) drift = -drift;
        candles.push(nextCandle(candles[candles.length - 1].close, drift));
      }
      draw(now);
      if (visible) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = performance.now();
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
