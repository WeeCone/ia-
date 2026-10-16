"use client";

import { useI18n } from "@/i18n/client";

/** Two-step first-visit tour shown above the composer. */
export function TourPopover({ step, onNext, onSkip }: { step: 1 | 2; onNext: () => void; onSkip: () => void }) {
  const { t } = useI18n();
  const { title, text } = t.tour.steps[step - 1];
  return (
    <div
      role="dialog"
      aria-label={t.tour.label}
      className={`relative z-50 mb-3 w-full max-w-sm rounded-2xl border border-border bg-card p-4 shadow-2xl ${step === 2 ? "ml-auto" : "mr-auto md:ml-[18%]"}`}
    >
      <p className="font-display font-semibold">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="font-mono text-xs text-muted">{step}/2</span>
        <button type="button" onClick={onSkip} className="btn-ghost ml-auto px-2 py-1 text-xs">
          {t.tour.skip}
        </button>
        <button type="button" onClick={onNext} className="btn-primary px-4 py-2 text-xs">
          {step === 1 ? t.tour.next : t.tour.done}
        </button>
      </div>
      <span className={`absolute -bottom-1.5 size-3 rotate-45 border-b border-r border-border bg-card ${step === 2 ? "right-10" : "left-1/2 -translate-x-1/2"}`} aria-hidden />
    </div>
  );
}
