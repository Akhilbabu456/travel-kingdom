import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/logo.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <Image
        src={logoImg}
        alt="Travel Kingdom Logo"
        className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          height: "48px",
          width: "auto",
          filter: light ? "brightness(0) invert(1)" : "none",
        }}
        priority
      />
    </Link>
  );
}
