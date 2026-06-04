import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-secondary text-secondary-foreground">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Crafting cinematic holidays since 2011 — from Maldives overwater villas to Kerala backwaters, with a 24/7 concierge that never sleeps.
            </p>
            <div className="mt-6 flex gap-2">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-primary hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:grid-cols-3">
            <FooterCol title="Explore" items={[["Destinations","/destinations"],["Packages","/packages"],["Honeymoon","/honeymoon"],["International","/international"],["Kerala","/kerala"]]} />
            <FooterCol title="Company" items={[["About","/about"],["Gallery","/gallery"],["Testimonials","/testimonials"],["Blog","/blog"],["Contact","/contact"]]} />
            <FooterCol title="Services" items={[["Visa","/services"],["Flights","/services"],["Hotels","/services"],["Custom tour","/custom-tour"],["FAQ","/faq"]]} />
          </div>
          <div className="lg:col-span-3">
            <h4 className="font-display text-lg text-white">Reach us</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> Aundh, Pune, Maharashtra</li>
              <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> +91 98608 74848</li>
              <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary" /> travelkingdomindia@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Travel Kingdom. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/terms" className="hover:text-primary transition">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
            <Link href="/careers" className="hover:text-primary transition">Careers</Link>
            <Link href="/feedback" className="hover:text-primary transition">Feedback</Link>
          </div>
          <p>Crafted with care. From concern to freedom.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-lg text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-white/70">
        {items.map(([l, to]) => (
          <li key={l}><Link href={to} className="transition hover:text-primary">{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}