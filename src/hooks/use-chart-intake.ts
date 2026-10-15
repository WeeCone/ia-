"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { prepareImage } from "@/lib/image";
import { savePendingChart } from "@/lib/pending-chart";

/**
 * Takes a chart screenshot from the landing page (drop, file picker or paste) and carries it to the dashboard,
 * via sign-up when the visitor has no account. `listenPaste` must be on for one intake per page only.
 */
export function useChartIntake({ listenPaste = false }: { listenPaste?: boolean } = {}) {
  const router = useRouter();
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function take(file: File | undefined | null) {
    if (!file || busy) return;
    setError(null);
    setBusy(true);
    try {
      await savePendingChart(await prepareImage(file));
      router.push(user ? "/dashboard" : "/auth/signup");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de lire cette image.");
      setBusy(false);
    }
  }

  // One paste listener for the page's lifetime, always calling the latest `take`.
  const takeRef = useRef(take);
  useEffect(() => {
    takeRef.current = take;
  });
  useEffect(() => {
    if (!listenPaste) return;
    const onPaste = (event: ClipboardEvent) => {
      const pasted = event.clipboardData?.files[0];
      if (pasted?.type.startsWith("image/")) takeRef.current(pasted);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [listenPaste]);

  const dropProps = {
    onDragOver: (event: React.DragEvent) => {
      event.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: (event: React.DragEvent) => {
      event.preventDefault();
      setDragging(false);
      take(event.dataTransfer.files[0]);
    },
  };

  const pick = () => inputRef.current?.click();
  const input = {
    ref: inputRef,
    type: "file" as const,
    accept: "image/*",
    className: "hidden",
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => take(event.target.files?.[0]),
  };

  return { dragging, busy, error, dropProps, pick, input };
}
