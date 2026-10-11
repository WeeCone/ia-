import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="grid size-9 place-items-center border-2 border-border bg-brand font-display text-lg leading-none text-background">S</span>
      <span className="font-display text-xl uppercase tracking-tight">Scanzivo</span>
    </Link>
  );
}
