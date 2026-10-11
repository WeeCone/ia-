import type { User } from "firebase/auth";
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Plan } from "./plans";

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  plan: Plan;
  credits: number;
  creditsPeriod?: string;
  stripeCustomerId?: string;
};

/** Creates users/{uid} on first sign-in; leaves existing profiles untouched. */
export async function ensureUserProfile(user: User, displayName?: string) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return;
  await setDoc(ref, {
    uid: user.uid,
    email: user.email,
    displayName: displayName ?? user.displayName,
    plan: "none",
    credits: 0,
    createdAt: serverTimestamp(),
  });
  // Fire-and-forget: a failed welcome email must never block sign-up.
  user
    .getIdToken()
    .then((token) => fetch("/api/emails/welcome", { method: "POST", headers: { Authorization: `Bearer ${token}` } }))
    .catch(() => {});
}

/** Live profile updates, so credits refresh after an analysis or a Stripe webhook. */
export function subscribeUserProfile(uid: string, onChange: (profile: UserProfile | null) => void) {
  return onSnapshot(doc(db, "users", uid), (snap) => onChange(snap.exists() ? (snap.data() as UserProfile) : null));
}
