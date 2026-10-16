import { FirebaseError } from "firebase/app";
import type { Locale } from "@/i18n/config";
import { DICTIONARIES } from "@/i18n/dictionaries";

export function authErrorMessage(error: unknown, locale: Locale): string {
  const text = DICTIONARIES[locale].auth;
  if (error instanceof FirebaseError && text.errors[error.code]) return text.errors[error.code];
  // Keep the Firebase code visible so support can tell unexpected failures apart.
  if (error instanceof FirebaseError) return text.unknownCode(error.code);
  return text.unknown;
}
