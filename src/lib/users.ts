import type { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const FREE_CREDITS = 3;

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  plan: "free" | "pro";
  credits: number;
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
    plan: "free",
    credits: FREE_CREDITS,
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}
