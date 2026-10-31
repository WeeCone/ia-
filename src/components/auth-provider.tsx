"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { clearPendingWork } from "@/lib/offers-client";

type AuthState = { user: User | null; loading: boolean };

const AuthContext = createContext<AuthState>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    // Signing out, or another account signing in: what the previous one left waiting is dropped. A visitor who signs
    // up keeps their chart (no account before).
    let previous: string | null | undefined;
    return onAuthStateChanged(auth, (user) => {
      if (previous && previous !== user?.uid) clearPendingWork();
      previous = user?.uid ?? null;
      setState({ user, loading: false });
    });
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
