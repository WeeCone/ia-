"use client";

/**
 * The visitor's choice about advertising cookies (the Meta pixel). Kept in this browser only; asked again after 6 months,
 * as the CNIL recommends. Without a choice, or after a refusal, nothing advertising-related is loaded.
 */
export type Consent = "granted" | "denied";

const KEY = "scanzivo:consent";
const CHANGE = "scanzivo:consent-change";
const OPEN = "scanzivo:consent-open";
const MAX_AGE = 182 * 24 * 3600 * 1000;

export function readConsent(): Consent | null {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "null") as { value: Consent; at: number } | null;
    return stored && Date.now() - stored.at < MAX_AGE ? stored.value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ value, at: Date.now() }));
  } catch {}
  window.dispatchEvent(new Event(CHANGE));
}

export function onConsentChange(listener: () => void) {
  window.addEventListener(CHANGE, listener);
  return () => window.removeEventListener(CHANGE, listener);
}

/** Shows the cookie banner again (footer link), so a choice can be changed at any time. */
export function openConsent() {
  window.dispatchEvent(new Event(OPEN));
}

export function onOpenConsent(listener: () => void) {
  window.addEventListener(OPEN, listener);
  return () => window.removeEventListener(OPEN, listener);
}
