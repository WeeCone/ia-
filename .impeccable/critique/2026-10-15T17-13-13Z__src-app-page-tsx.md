---
target: page d accueil
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
target_identity: "file:/home/user/ia-/src/app/page.tsx"
target_fingerprint: "sha256:6e3138a7058ef50eb7d101ff630e0de66f455c7453b678461a988eea444a95e5"
target_path: /home/user/ia-/src/app/page.tsx
timestamp: 2026-10-15T17-13-13Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser overlay)

## Score de santé design : 26/40 (Acceptable)
| # | Heuristique | Note | Problème clé |
|---|---|---|---|
| 1 | Visibilité de l'état | 3 | Le dépôt d'une image mène à l'inscription puis au paiement sans prévenir |
| 2 | Langage du monde réel | 3 | « 1m » affiché « 1M » (lu « 1 mois ») par la majuscule forcée des chips |
| 3 | Contrôle et liberté | 3 | Aucun résultat réel visible sans payer |
| 4 | Cohérence | 2 | Triangle ascendant (hero) vs TRIANGLE SYMÉTRIQUE (bento) ; 4H vs 1W ; 4 libellés de CTA |
| 5 | Prévention des erreurs | 2 | Dépôt accepté puis mur d'inscription/paiement non annoncé |
| 6 | Reconnaissance | 3 | Tarifs : deux listes identiques à comparer pour 1 différence |
| 7 | Flexibilité | 3 | Ctrl+V pratique, mais affiché sur mobile |
| 8 | Esthétique minimaliste | 2 | Hero surchargé : 2 titres, rayons, laser, bulle, 9 halos |
| 9 | Récupération d'erreur | 2 | Message d'erreur brut, sans conseil de capture |
| 10 | Aide | 3 | FAQ honnête, mais placée après les tarifs |

## Verdict de spécificité
Partiellement propre au produit : avant/après du hero, niveaux chiffrés, couleurs haussier/baissier. Le reste suit le gabarit « SaaS IA néon » : H1 générique, dégradé `.mark` sur 7 titres, sur-titres mono partout, bento à icônes, 01/02/03, alternance sombre/clair à chaque section. L'idée forte (« un verdict, ou attendre ») n'est qu'une tuile du bento.
Détecteur : CLI 1 alerte (grille décorative globals.css:116) ; overlay navigateur 35 alertes (texte en dégradé 9, contraste faible 7, icônes en tuile 6, halos 5, textes trop petits 5, cartes imbriquées 2-3 (faux positifs : maquette du hero), Inter sur-utilisée 1).

## Problèmes prioritaires
- [P0] Promesse d'action gratuite, produit payant non annoncé près des CTA ; démo vidéo terminée sur un cadenas. → clarify, onboard
- [P1] Démo incohérente (motif, unité de temps, 1M, prix coupé « 65 / 400 »). → harden, polish
- [P1] Hero générique en haut, surchargé en dessous ; CTA hors du premier écran (mobile ~1,9 écran). → distill, typeset
- [P1] Mobile : pas de CTA ni de menu dans l'en-tête, texte « Glissez / Ctrl+V » sur téléphone, vidéo illisible. → adapt
- [P2] Contraste des sections claires (boutons blanc sur #059669 3,8:1, sur-titres 3,5:1) ; tarifs sans raison de choisir. → colorize, layout

## Personas
Jordan : 62 % et 1 : 1,5 non expliqués ; dépôt → inscription incomprise. Riley : « en 1 clic » vs 3 étapes + paiement ; « Aucun piège » sans offre gratuite ; « Acheter sur confirmation » sans avertissement à côté. Casey : pas de CTA avant ~2 écrans, vidéo autoplay lourde, pas de CTA collant.
