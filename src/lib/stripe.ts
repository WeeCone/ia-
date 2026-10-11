import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

// Lazy so that `next build` works without Stripe keys in the environment.
export function getStripe() {
  client ??= new Stripe(process.env.STRIPE_SECRET_KEY!);
  return client;
}

export function appUrl(request: Request) {
  return process.env.APP_URL ?? new URL(request.url).origin;
}
