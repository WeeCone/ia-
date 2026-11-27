import "server-only";
import { BLACK_FRIDAY } from "./promo";
import { getStripe } from "./stripe";

/**
 * The Stripe coupon behind the Black Friday offer, made the first time it is needed: a percentage off the first invoice
 * only, valid until the offer's end whatever the code does (Stripe refuses it afterwards).
 */
let coupon: Promise<string> | undefined;

export function blackFridayCoupon() {
  coupon ??= (async () => {
    const stripe = getStripe();
    try {
      return (await stripe.coupons.retrieve(BLACK_FRIDAY.couponId)).id;
    } catch {
      return (
        await stripe.coupons.create({
          id: BLACK_FRIDAY.couponId,
          name: "Black Friday – Starter, 1er mois",
          percent_off: BLACK_FRIDAY.percentOff,
          duration: "once",
          redeem_by: Math.floor(BLACK_FRIDAY.endsAt / 1000),
        })
      ).id;
    }
  })().catch((err) => {
    coupon = undefined;
    throw err;
  });
  return coupon;
}
