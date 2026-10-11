import { FirebaseError } from "firebase/app";

const messages: Record<string, string> = {
  "auth/email-already-in-use": "Un compte existe déjà avec cet email.",
  "auth/invalid-email": "Adresse email invalide.",
  "auth/weak-password": "Le mot de passe doit contenir au moins 6 caractères.",
  "auth/invalid-credential": "Email ou mot de passe incorrect.",
  "auth/user-not-found": "Aucun compte trouvé avec cet email.",
  "auth/wrong-password": "Email ou mot de passe incorrect.",
  "auth/too-many-requests": "Trop de tentatives. Réessayez dans quelques minutes.",
  "auth/popup-closed-by-user": "Connexion Google annulée.",
  "auth/network-request-failed": "Problème de connexion réseau.",
  "auth/popup-blocked": "La fenêtre de connexion Google a été bloquée. Autorisez les fenêtres surgissantes pour ce site, puis réessayez.",
  "auth/cancelled-popup-request": "Connexion Google annulée.",
  "auth/unauthorized-domain": "Connexion Google indisponible sur cette adresse (domaine non autorisé dans Firebase).",
  "auth/operation-not-allowed": "Ce mode de connexion n'est pas activé.",
  "auth/account-exists-with-different-credential":
    "Un compte existe déjà avec cet email : connectez-vous avec votre mot de passe.",
};

export function authErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError && messages[error.code]) {
    return messages[error.code];
  }
  // Keep the Firebase code visible so support can tell unexpected failures apart.
  if (error instanceof FirebaseError) return `Une erreur est survenue (${error.code}). Veuillez réessayer.`;
  return "Une erreur est survenue. Veuillez réessayer.";
}
