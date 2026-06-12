import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <img src="/logo.webp" alt="Travel Kingdom Logo" className="h-10 w-auto object-contain" />
    </Link>
  );
}
