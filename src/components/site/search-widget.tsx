"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users } from "lucide-react";

export function SearchWidget({ floating = false }: { floating?: boolean }) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState("");

  const handleFind = () => {
    const params = new URLSearchParams();
    if (destination) params.append("q", destination);
    if (date) params.append("date", date);
    if (travellers) params.append("travellers", travellers);
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <div className={`w-full overflow-hidden rounded-3xl p-4 sm:p-5 shadow-2xl ${
      floating 
        ? "bg-black/75 sm:glass-dark border border-white/20" 
        : "bg-white border border-black/10"
    }`}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:gap-3.5">
        <Field 
          icon={MapPin} 
          label="Destination" 
          placeholder="Where to? (e.g., Maldives, Bali)" 
          floating={floating} 
          value={destination}
          onChange={setDestination}
        />
        <Field 
          icon={Calendar} 
          label="Travel date" 
          placeholder="Add dates" 
          floating={floating} 
          type="date"
          value={date}
          onChange={setDate}
        />
        <Field 
          icon={Users} 
          label="Travellers" 
          placeholder="2 adults" 
          floating={floating} 
          value={travellers}
          onChange={setTravellers}
        />
        <button 
          onClick={handleFind}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#e07a1b] hover:bg-[#e07a1b]/90 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_25px_rgba(224,122,27,0.4)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <Search className="h-4.5 w-4.5" /> Find
        </button>
      </div>
    </div>
  );
}

function Field({ 
  icon: Icon, 
  label, 
  placeholder, 
  floating,
  type = "text",
  value,
  onChange
}: { 
  icon: typeof Search; 
  label: string; 
  placeholder: string; 
  floating: boolean;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
      floating 
        ? "bg-white/15 text-white border border-white/10 focus-within:bg-white/25 focus-within:border-white/30" 
        : "bg-slate-50 text-slate-800 border border-slate-200 focus-within:bg-white focus-within:border-[#e07a1b]/40 focus-within:shadow-md"
    }`}>
      <Icon className={`h-5 w-5 shrink-0 ${floating ? "text-[#e07a1b] sm:text-white" : "text-[#e07a1b]"}`} />
      <div className="min-w-0 flex-1">
        <div className={`text-[10px] uppercase tracking-[0.12em] font-bold pb-0.5 ${floating ? "text-white/80" : "text-slate-500"}`}>{label}</div>
        <input 
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-transparent text-sm font-semibold outline-none focus:ring-0 ${
            floating ? "placeholder:text-white/60 text-white [color-scheme:dark]" : "placeholder:text-slate-400 text-slate-800"
          }`} 
          placeholder={placeholder} 
        />
      </div>
    </div>
  );
}