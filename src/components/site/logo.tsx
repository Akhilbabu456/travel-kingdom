import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5 shrink-0">
      <img
        src="/logo.png"
        alt="Travel Kingdom Logo"
        className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          height: "44px",
          width: "auto",
        }}
      />
    </Link>
  );
}
