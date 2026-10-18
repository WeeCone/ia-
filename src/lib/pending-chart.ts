// Hands a chart dropped on the landing page over to the dashboard uploader (same tab, survives sign-up and checkout).
// It stays stored until analysed or replaced, so a detour through payment never loses it.
const KEY = "scanzivo:pending-chart";

export async function savePendingChart(file: File) {
  const url = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ name: file.name, url }));
  } catch {
    // Storage full or blocked: the user simply picks the image again on the dashboard.
  }
}

export function clearPendingChart() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}

export function hasPendingChart() {
  try {
    return sessionStorage.getItem(KEY) !== null;
  } catch {
    return false;
  }
}

export async function readPendingChart(): Promise<File | null> {
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const { name, url } = JSON.parse(raw) as { name: string; url: string };
    const blob = await (await fetch(url)).blob();
    return new File([blob], name, { type: blob.type });
  } catch {
    return null;
  }
}

/** The waiting chart as an image URL (data URL), for a preview; null when there is none. */
export function pendingChartUrl(): string | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as { url: string }).url : null;
  } catch {
    return null;
  }
}
