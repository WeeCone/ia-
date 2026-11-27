"use client";

import { useSyncExternalStore } from "react";
import { blackFridayActive } from "@/lib/promo";
import type { Offer } from "@/lib/plans";

const subscribe = () => () => {};

/**
 * Is the Black Friday offer running for this pack? False while the page is built and on its first paint, then read from
 * the visitor's clock in the browser (no clock read at build time, which Next.js forbids, and no mismatch on hydration).
 */
export function useBlackFriday(offer: Offer | null | undefined) {
  return useSyncExternalStore(
    subscribe,
    () => blackFridayActive(offer),
    () => false,
  );
}
