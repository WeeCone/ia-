import "server-only";
import { OFFER_PRICE_CENTS, type Offer } from "./plans";
import { getStripe } from "./stripe";

/**
 * The Stripe product each offer is billed on. Pro and À vie use the existing "Mensuel" and "À vie" products, read once
 * from STRIPE_PRICE_MONTHLY / STRIPE_PRICE_LIFETIME; Starter's product is found by its metadata, or made the first time.
 * Prices themselves are set inline (OFFER_PRICE_CENTS), so changing one never needs a new Price in the dashboard.
 */
const products: Partial<Record<Offer, Promise<string>>> = {};

function productFor(offer: Offer) {
  products[offer] ??= (async () => {
    const stripe = getStripe();
    if (offer === "starter") {
      const found = await stripe.products.search({ query: "metadata['scanzivo_offer']:'starter' AND active:'true'", limit: 1 });
      if (found.data[0]) return found.data[0].id;
      return (await stripe.products.create({ name: "Scanzivo – Starter", metadata: { scanzivo_offer: "starter" } })).id;
    }
    const price = await stripe.prices.retrieve((offer === "monthly" ? process.env.STRIPE_PRICE_MONTHLY : process.env.STRIPE_PRICE_LIFETIME)!);
    return typeof price.product === "string" ? price.product : price.product.id;
  })().catch((err) => {
    delete products[offer];
    throw err;
  });
  return products[offer]!;
}

export async function lineFor(offer: Offer) {
  const product = await productFor(offer);
  const recurring = offer === "lifetime" ? {} : { recurring: { interval: "month" as const } };
  return { price_data: { currency: "eur", unit_amount: OFFER_PRICE_CENTS[offer], product, ...recurring }, quantity: 1 };
}

