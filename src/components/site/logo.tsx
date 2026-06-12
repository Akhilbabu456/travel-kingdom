import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/logo.webp";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <Image
        src={logoImg}
        alt="Travel Kingdom Logo"
        className="h-10 w-auto object-contain"
        priority
      />
    </Link>
  );
}
