"use client";

import { readConsent } from "./consent";

/**
 * Google Tag Manager (the container behind Google Ads conversion tracking), loaded only once the visitor accepts
 * advertising cookies, with Google's consent mode set to "granted" at that moment. Every call is a no-op without a
 * container id or without consent. The conversions themselves (free reading, checkout, purchase) are pushed as named
 * events on the data layer; the triggers live in the container.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

let loaded = false;

// GTM reads consent commands as `arguments` objects, not arrays: this mirrors Google's own snippet.
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer!.push(arguments);
}

/** Loads the container if the visitor accepted; safe to call on every page. Returns whether it is active. */
export function loadGoogleTag() {
  if (!GTM_ID || readConsent() !== "granted") return false;
  if (!loaded) {
    window.dataLayer = window.dataLayer ?? [];
    gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
    gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    document.head.appendChild(script);
    loaded = true;
  }
  return true;
}

/** After a refusal following an acceptance: Google stops storing and sending advertising data from this page on. */
export function revokeGoogleTag() {
  if (!loaded) return;
  gtag("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
  loaded = false;
}

type GoogleEvent = "free_reading" | "sign_up" | "begin_checkout" | "purchase";

/** One conversion event for the container's triggers; nothing happens without consent. */
export function googleEvent(event: GoogleEvent, params?: { value?: number; currency?: string; transaction_id?: string }) {
  if (!loadGoogleTag()) return;
  window.dataLayer!.push({ event, ...params });
}
