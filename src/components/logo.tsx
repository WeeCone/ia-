import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="grid size-9 place-items-center border-[3px] border-foreground bg-brand font-display text-lg leading-none">N</span>
      <span className="font-display text-xl uppercase tracking-tight">NeuralTrade</span>
    </Link>
  );
}
