import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {sub && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{sub}</p>}
      </Reveal>
    </div>
  );
}
