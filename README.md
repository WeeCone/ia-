# NeuralTrade

Application web d'analyse de graphiques de trading par IA (concept inspiré de BullGPT).

- Page d'accueil, inscription / connexion (email + Google), mot de passe oublié.
- Tableau de bord : import d'une capture (glisser-déposer, clic ou Ctrl+V) → analyse par Claude (vision) :
  actif, unité de temps, tendance, supports / résistances, signaux, scénarios haussier et baissier probabilisés.
- Crédits : 3 offerts à l'inscription (`users/{uid}`), débités côté serveur uniquement si l'image est bien un graphique.
- Historique des 20 dernières analyses (`users/{uid}/analyses`).

L'analyse passe par la route `POST /api/analyze`, qui vérifie le jeton Firebase, contrôle les crédits,
appelle Claude Opus 5.5 avec sortie structurée (schéma Zod dans `src/lib/analysis.ts`) puis enregistre le résultat.

## Démarrage

1. Créez un projet Firebase, activez **Authentication** (Email/Mot de passe + Google) et **Firestore**.
2. `cp .env.example .env.local` puis renseignez la config web Firebase, `ANTHROPIC_API_KEY`
   et `FIREBASE_SERVICE_ACCOUNT` (JSON du compte de service, sur une ligne).
3. `npm install && npm run dev` → http://localhost:3000
4. Déployez les règles : `firebase deploy --only firestore:rules`

## Prochaines étapes

- Abonnement Stripe.
