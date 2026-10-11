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
2. Renseignez l'URL des conditions générales (`https://<domaine>/legal/cgv`) dans Paramètres → **Informations publiques** :
   la page de paiement demande l'acceptation des CGV et la renonciation au droit de rétractation, et refuse de s'ouvrir sans cette URL.
3. Activez le **portail client** (Dashboard Stripe → Paramètres → Billing → Portail client).
4. Webhook vers `https://<votre-domaine>/api/billing/webhook` avec les événements
   `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `invoice.paid`,
   `customer.subscription.updated`, `customer.subscription.deleted` ;
   copiez le secret de signature dans `STRIPE_WEBHOOK_SECRET`.
   En local : `stripe listen --forward-to localhost:3000/api/billing/webhook`.

## Emails

- **Bienvenue** : envoyé une seule fois après l'inscription, via [Resend](https://resend.com).
  Vérifiez votre domaine dans Resend puis renseignez `RESEND_API_KEY` et `EMAIL_FROM`. Sans eux, l'envoi est ignoré sans bloquer l'inscription.
- **Paiement** : activez les reçus Stripe (Paramètres → **Emails clients** → paiements réussis et remboursements).
  Stripe envoie aussi les rappels de renouvellement et d'échec de paiement de l'abonnement si vous les activez dans Billing → Emails.

## Avis clients

Après 3 analyses, le tableau de bord propose de laisser un avis (note, texte, accord de publication),
enregistré dans la collection Firestore `reviews`. Rien n'est publié automatiquement : choisissez dans la
console Firebase les avis avec `publishConsent: true`, puis ajoutez-les à `src/lib/testimonials.ts` (sans `example: true`).

## Pages légales

`/legal/mentions`, `/legal/cgv` et `/legal/confidentialite` sont prêtes, mais **complétez les champs `[À COMPLÉTER]`**
(société, adresse, SIREN, TVA, contact, médiateur de la consommation) dans `src/lib/legal.ts` et `src/app/legal/cgv/page.tsx`,
et faites-les relire par un professionnel avant le lancement.

## Mise en production (Firebase App Hosting)

1. Passez le projet Firebase en offre **Blaze** (requise par App Hosting).
2. Remplissez les valeurs `REMPLACER` de `apphosting.yaml`.
3. Créez les secrets :
   ```bash
   firebase apphosting:secrets:set anthropicApiKey
   firebase apphosting:secrets:set stripeSecretKey
   firebase apphosting:secrets:set stripeWebhookSecret
   firebase apphosting:secrets:set resendApiKey
   ```
4. Console Firebase → App Hosting → **Créer un backend**, reliez ce dépôt GitHub (branche `main`) :
   chaque push sur `main` redéploie automatiquement.
5. Ajoutez le domaine du backend dans Authentication → Paramètres → **Domaines autorisés**,
   puis pointez le webhook Stripe vers `https://<domaine>/api/billing/webhook`.
