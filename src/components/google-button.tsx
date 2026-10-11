"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authErrorMessage } from "@/lib/auth-errors";
import { auth } from "@/lib/firebase";
import { ensureUserProfile } from "@/lib/users";

export function GoogleButton({ onError }: { onError: (message: string) => void }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
      await ensureUserProfile(user);
      router.replace("/dashboard");
    } catch (error) {
      onError(authErrorMessage(error));
      setPending(false);
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={pending} className="btn-secondary w-full">
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.6 2.3 2.3 6.6 2.3 12S6.6 21.7 12 21.7c5.6 0 9.3-3.9 9.3-9.5 0-.6-.1-1.1-.2-1.6H12z" />
      </svg>
      Continuer avec Google
    </button>
  );
}
