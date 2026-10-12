"use client";

const STEPS = [
  { title: "Déposez votre graphique ici", text: "Glissez une capture directement dans cette zone, ou collez-la avec Ctrl+V. Un seul graphique suffit." },
  { title: "Puis lancez l'analyse", text: "Une fois le graphique déposé, ce bouton la démarre. Votre plan arrive en moins d'une minute." },
];

/** Two-step first-visit tour shown above the composer. */
export function TourPopover({ step, onNext, onSkip }: { step: 1 | 2; onNext: () => void; onSkip: () => void }) {
  const { title, text } = STEPS[step - 1];
  return (
    <div
      role="dialog"
      aria-label="Visite guidée"
      className={`relative z-50 mb-3 w-full max-w-sm rounded-2xl border border-border bg-card p-4 shadow-2xl ${step === 2 ? "ml-auto" : "mx-auto"}`}
    >
      <p className="font-display font-semibold">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="font-mono text-xs text-muted">{step}/2</span>
        <button type="button" onClick={onSkip} className="btn-ghost ml-auto px-2 py-1 text-xs">
          Passer
        </button>
        <button type="button" onClick={onNext} className="btn-primary px-4 py-2 text-xs">
          {step === 1 ? "Suivant" : "J'ai compris"}
        </button>
      </div>
      <span className={`absolute -bottom-1.5 size-3 rotate-45 border-b border-r border-border bg-card ${step === 2 ? "right-6" : "left-1/2 -translate-x-1/2"}`} aria-hidden />
    </div>
  );
}
