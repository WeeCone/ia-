import type { Offer } from "./plans";

/**
 * Black Friday 2026: the first month of Starter at a tenth of its price (1 € on the euro grid), then the normal price,
 * cancel any time. Ends Monday 30 November at midnight, Paris time (23:00 UTC, the winter offset): after it the normal
 * price comes back by itself, in the pages and at Stripe (the coupon expires at the same moment). Remove this file's
 * use from the packs and the checkout route to retire it.
 */
export const BLACK_FRIDAY = {
  offer: "starter" as Offer,
  percentOff: 90,
  /** 2026-11-30 23:59:59 in Paris. */
  endsAt: Date.UTC(2026, 10, 30, 22, 59, 59),
  couponId: "BLACKFRIDAY2026STARTER",
};

export const blackFridayActive = (offer: Offer | null | undefined, now = Date.now()) => offer === BLACK_FRIDAY.offer && now < BLACK_FRIDAY.endsAt;

/** The first month's price, from the normal one. */
export const blackFridayPrice = (amount: number) => Math.round(amount * (100 - BLACK_FRIDAY.percentOff)) / 100;
