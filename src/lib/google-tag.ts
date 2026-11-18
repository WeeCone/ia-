"use client";

import { readConsent } from "./consent";

/**
 * Google Tag Manager (the container behind Google Ads conversion tracking), in the page head with consent mode on
 * "denied" until the visitor accepts advertising cookies, which switches it to "granted". Every call is a no-op without a
 * container id or without consent. The conversions themselves (free reading, checkout, purchase) are pushed as named
 * events on the data layer; the triggers live in the container.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

let granted = false;

// GTM reads consent commands as `arguments` objects, not arrays: this mirrors Google's own snippet.
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer!.push(arguments);
}

function setConsent(value: "granted" | "denied") {
  gtag("consent", "update", { ad_storage: value, ad_user_data: value, ad_personalization: value, analytics_storage: value });
  granted = value === "granted";
}

/** The tag itself sits in the head (app/[lang]/layout.tsx); this tells it the visitor's choice. Safe on every page. */
export function loadGoogleTag() {
  if (!GTM_ID || readConsent() !== "granted") return false;
  window.dataLayer = window.dataLayer ?? [];
  if (!granted) setConsent("granted");
  return true;
}

/** After a refusal following an acceptance: Google stops storing and sending advertising data from this page on. */
export function revokeGoogleTag() {
  if (!GTM_ID || !granted) return;
  setConsent("denied");
}

type GoogleEvent = "free_reading" | "sign_up" | "begin_checkout" | "purchase";

/** One conversion event for the container's triggers; nothing happens without consent. */
export function googleEvent(event: GoogleEvent, params?: { value?: number; currency?: string; transaction_id?: string }) {
  if (!loadGoogleTag()) return;
  window.dataLayer!.push({ event, ...params });
}
