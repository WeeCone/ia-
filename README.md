# ChartPilot

Application web d'analyse de graphiques de trading par IA (concept inspiré de BullGPT).

**V1 :** page d'accueil, inscription / connexion (email + Google), mot de passe oublié, tableau de bord protégé.
Chaque nouvel utilisateur reçoit un profil Firestore `users/{uid}` (plan `free`, 3 crédits).

## Démarrage

1. Créez un projet Firebase, activez **Authentication** (Email/Mot de passe + Google) et **Firestore**.
2. `cp .env.example .env.local` puis renseignez la config web Firebase.
3. `npm install && npm run dev` → http://localhost:3000
4. Déployez les règles : `firebase deploy --only firestore:rules`

## Prochaines étapes

- Upload d'une capture + analyse via l'API Claude (vision) dans une route serveur, décompte des crédits côté serveur.
- Historique des analyses.
- Abonnement Stripe.
