"use client";

import { sendEmailVerification, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";
import { auth } from "@/lib/firebase";

/** Reminds email/password users to confirm their address (Google accounts are already verified). */
export function EmailBanner({ user }: { user: User }) {
  const needsCheck = !user.emailVerified && user.providerData.some((provider) => provider.providerId === "password");
  const [visible, setVisible] = useState(needsCheck);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { t, locale } = useI18n();
  const e = t.emailBanner;

  // The flag only refreshes on reload: re-check once, in case the link was clicked in another tab.
  useEffect(() => {
    if (!needsCheck) return;
    user
      .reload()
      .then(() => user.emailVerified && setVisible(false))
      .catch(() => {});
  }, [needsCheck, user]);

  if (!visible) return null;

  async function resend() {
    setStatus("sending");
    try {
      auth.languageCode = locale;
      await sendEmailVerification(user);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex items-center gap-3 border-b border-amber-400/25 bg-amber-400/10 px-4 py-2.5 text-sm text-warn">
      <span aria-hidden>✉</span>
      <p className="flex-1">{e.text}</p>
      {status === "sent" ? (
        <span className="text-xs text-warn">{e.sent}</span>
      ) : (
        <button type="button" onClick={resend} disabled={status === "sending"} className="text-xs font-medium underline underline-offset-4 hover:text-white">
          {status === "error" ? e.failed : status === "sending" ? e.sending : e.resend}
        </button>
      )}
      <button type="button" onClick={() => setVisible(false)} aria-label={e.hide} className="px-1 text-lg leading-none text-warn hover:text-white">
        ×
      </button>
    </div>
  );
}
