import { auth } from "./firebase";

/** Calls an admin API with the signed-in account's ID token; throws with the server's message and status. */
export async function adminFetch(path: string, init?: RequestInit) {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(path, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...init?.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(data.error ?? "Erreur serveur."), { status: response.status });
  return data;
}
