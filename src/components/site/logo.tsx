import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      {/* SVG Vector Icon */}
      <svg
        viewBox="0 0 100 100"
        className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Hexagon Shape */}
        <path d="M 50 5 L 89 27.5 L 89 72.5 L 50 95 L 11 72.5 L 11 27.5 Z" fill="#e07a1b" />
        {/* White Letter T */}
        <text
          x="49"
          y="71"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="56"
          fill="white"
          textAnchor="middle"
        >
          T
        </text>
        {/* Blue Airplane Taking Off */}
        <path
          d="M 72 32 L 80 20 L 84 22 L 80 32 L 88 38 L 92 36 L 94 40 L 86 44 L 82 52 L 78 52 L 80 44 L 72 40 L 64 42 L 64 38 L 72 32 Z"
          fill={light ? "#38bdf8" : "#0284c7"}
        />
      </svg>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline font-sans text-xl font-bold tracking-tight">
          <span
            className={`transition-colors duration-300 ${light ? "text-white" : "text-[#1e3a8a]"}`}
          >
            Travel
          </span>
          <span className="text-[#e07a1b]">Kingdom</span>
        </div>
        <span
          className={`font-sans text-[9px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
            light ? "text-white/75" : "text-slate-500"
          }`}
        >
          From Concern to Freedom
        </span>
      </div>
    </Link>
  );
}
