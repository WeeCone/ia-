"use client";

import { readConsent } from "./consent";

/**
 * The Meta pixel, loaded only once the visitor accepts advertising cookies. It tells Meta which ads lead to sign-ups and
 * payments, so campaigns can be optimised on them. Every call is a no-op without a pixel id or without consent.
 */
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[]; loaded: boolean; version: string; push: unknown };
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let loaded = false;

/** Meta's standard loader: a queue that buffers calls until fbevents.js arrives. */
function install() {
  const queue: unknown[] = [];
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else queue.push(args);
  }) as Fbq;
  fbq.queue = queue;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

/** Loads the pixel if the visitor accepted; safe to call on every page. Returns whether it is active. */
export function loadPixel() {
  if (!PIXEL_ID || readConsent() !== "granted") return false;
  if (!loaded) {
    if (!window.fbq) install();
    window.fbq!("consent", "grant");
    window.fbq!("init", PIXEL_ID);
    loaded = true;
  }
  return true;
}

/** After a refusal following an acceptance: Meta stops sending anything from this page on. */
export function revokePixel() {
  if (loaded) window.fbq?.("consent", "revoke");
  loaded = false;
}

type PixelEvent = "PageView" | "CompleteRegistration" | "InitiateCheckout" | "Purchase";

/** One standard event. `eventId` lets Meta merge it with a server-side copy later (Conversions API). */
export function pixel(event: PixelEvent, params?: { value?: number; currency?: string }, eventId?: string) {
  if (!loadPixel()) return;
  window.fbq!("track", event, params ?? {}, eventId ? { eventID: eventId } : undefined);
}
