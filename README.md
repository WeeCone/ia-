# NeuralTrade

Application web d'analyse de graphiques de trading par IA (concept inspiré de BullGPT).

- Page d'accueil, inscription / connexion (email + Google), mot de passe oublié.
- Tableau de bord : import d'une capture (glisser-déposer, clic ou Ctrl+V) → analyse par Claude (vision) :
  actif, unité de temps, tendance, supports / résistances, signaux, scénarios haussier et baissier probabilisés.
- Offres (calquées sur BullGPT, pas d'offre gratuite) : **Mensuel 40 €/mois** (abonnement) ou **À vie 180 €** (paiement unique).
  Les deux donnent 100 analyses par mois (usage raisonnable), débitées côté serveur uniquement si l'image est bien un graphique.
- Historique des 20 dernières analyses (`users/{uid}/analyses`).
- Paiement Stripe (page `/pricing`) : crédits rechargés à chaque facture mensuelle, ou le 1er de chaque mois pour l'accès à vie ;
  gestion / résiliation de l'abonnement via le portail client Stripe.

L'analyse passe par la route `POST /api/analyze`, qui vérifie le jeton Firebase, contrôle les crédits,
appelle Claude Opus 5.5 avec sortie structurée (schéma Zod dans `src/lib/analysis.ts`) puis enregistre le résultat.

## Démarrage

1. Créez un projet Firebase, activez **Authentication** (Email/Mot de passe + Google) et **Firestore**.
2. `cp .env.example .env.local` puis renseignez la config web Firebase, `ANTHROPIC_API_KEY`
   et `FIREBASE_SERVICE_ACCOUNT` (JSON du compte de service, sur une ligne).
3. `npm install && npm run dev` → http://localhost:3000
4. Déployez les règles : `firebase deploy --only firestore:rules`

## Stripe

1. Créez deux prix : un **récurrent mensuel** (`STRIPE_PRICE_MONTHLY`) et un **paiement unique** (`STRIPE_PRICE_LIFETIME`).
   Les montants affichés et le quota sont dans `src/lib/plans.ts` (`OFFERS`, `MONTHLY_CREDITS`).
2. Activez le **portail client** (Dashboard Stripe → Paramètres → Billing → Portail client).
3. Webhook vers `https://<votre-domaine>/api/billing/webhook` avec les événements
   `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `invoice.paid`,
   `customer.subscription.updated`, `customer.subscription.deleted` ;
   copiez le secret de signature dans `STRIPE_WEBHOOK_SECRET`.
   En local : `stripe listen --forward-to localhost:3000/api/billing/webhook`.
