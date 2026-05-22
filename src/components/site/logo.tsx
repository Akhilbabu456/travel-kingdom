import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl gradient-warm shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16" />
          <path d="M12 6v14" />
          <path d="m17 11 4-2-1 4-3 1" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.15rem] font-semibold tracking-tight ${light ? "text-white" : "text-foreground"}`}>
          Travel<span className="gradient-text">Kingdom</span>
        </span>
        <span className={`mt-0.5 text-[0.62rem] uppercase tracking-[0.18em] ${light ? "text-white/70" : "text-muted-foreground"}`}>
          From concern to freedom
        </span>
      </span>
    </Link>
  );
}