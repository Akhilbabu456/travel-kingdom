import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell, PageHero } from "./page-shell";
import { Reveal } from "./reveal";
import { Newsletter } from "./newsletter";

export function StubPage({ eyebrow, title, sub, image }: { eyebrow: string; title: string; sub: string; image: string }) {
  return (
    <PageShell>
      <PageHero eyebrow={eyebrow} title={title} sub={sub} image={image} />
      <section className="mx-auto max-w-3xl px-5 py-24 text-center lg:px-8">
        <Reveal>
          <div className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">In the atelier</div>
          <h2 className="mt-6 font-display text-3xl text-foreground sm:text-4xl">This chapter is being hand-crafted.</h2>
          <p className="mt-4 text-muted-foreground">Our designers are putting the final brushstrokes on this experience. In the meantime, speak to a specialist — they'll get you exactly what you need.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">Talk to a specialist</Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary"><ArrowLeft className="h-4 w-4" /> Back home</Link>
          </div>
        </Reveal>
      </section>
      <div className="pb-24"><Newsletter /></div>
    </PageShell>
  );
}