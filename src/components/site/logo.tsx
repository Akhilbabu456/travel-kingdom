import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/logo.webp";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <>
      {/* SVG filter to programmatically erode/reduce the white stroke thickness */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="logo-stroke-reduce">
            <feMorphology operator="erode" radius="0.75" />
          </filter>
        </defs>
      </svg>
      <Link href="/" className="group flex items-center gap-2.5">
        <Image
          src={logoImg}
          alt="Travel Kingdom Logo"
          className="h-14 w-auto object-contain"
          style={{
            height: "56px",
            width: "auto",
            filter: "url(#logo-stroke-reduce)",
          }}
          priority
        />
      </Link>
    </>
  );
}
