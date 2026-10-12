import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

// Lazy so that `next build` works without Stripe keys in the environment.
export function getStripe() {
  if (client) return client;
  // Trim: a secret pasted with a trailing newline or space would otherwise be rejected as invalid.
  const key = process.env.STRIPE_SECRET_KEY?.trim() ?? "";
  // Catch the usual copy mistakes (key ID "mk_…", publishable key, empty value) with a readable message.
  if (!/^(sk|rk)_(live|test)_/.test(key)) {
    throw new Error("Clé Stripe mal configurée : le secret stripeSecretKey doit commencer par sk_live_, rk_live_, sk_test_ ou rk_test_.");
  }
  client = new Stripe(key);
  return client;
}

export function appUrl(request: Request) {
  return process.env.APP_URL ?? new URL(request.url).origin;
}

/**
 * Wraps a billing route so failures come back as a readable JSON error instead of a bare 500.
 * Stripe's own message is surfaced: it names the misconfiguration (missing terms URL, wrong key…).
 */
export function withBillingErrors(handler: (request: Request) => Promise<Response>) {
  return async (request: Request) => {
    try {
      return await handler(request);
    } catch (err) {
      console.error("billing route failed", err);
      if (err instanceof Stripe.errors.StripeError) {
        return Response.json({ error: `Paiement indisponible (Stripe) : ${err.message}` }, { status: 502 });
      }
      const code = (err as { code?: unknown })?.code;
      if (code === 7 || code === "permission-denied") {
        return Response.json({ error: "Paiement indisponible : le serveur n'a pas accès à la base de données." }, { status: 500 });
      }
      const message = err instanceof Error ? err.message : String(err);
      return Response.json({ error: `Paiement indisponible : ${message}` }, { status: 500 });
    }
  };
}
