import { Search, MapPin, Calendar, Users } from "lucide-react";

export function SearchWidget({ floating = false }: { floating?: boolean }) {
  return (
    <div className={`w-full overflow-hidden rounded-3xl p-4 sm:p-5 shadow-2xl ${
      floating ? "glass-dark border border-white/15" : "glass border border-black/5"
    }`}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:gap-3.5">
        <Field icon={MapPin} label="Destination" placeholder="Where to?" floating={floating} />
        <Field icon={Calendar} label="Travel date" placeholder="Add dates" floating={floating} />
        <Field icon={Users} label="Travellers" placeholder="2 adults" floating={floating} />
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#e07a1b] hover:bg-[#e07a1b]/95 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_25px_rgba(224,122,27,0.3)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
          <Search className="h-4.5 w-4.5" /> Find
        </button>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, placeholder, floating }: { icon: typeof Search; label: string; placeholder: string; floating: boolean }) {
  return (
    <div className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
      floating 
        ? "bg-white/10 text-white border border-white/5 focus-within:bg-white/15 focus-within:border-white/20" 
        : "bg-white/80 text-slate-800 border border-slate-100 focus-within:bg-white focus-within:border-[#e07a1b]/40 focus-within:shadow-md"
    }`}>
      <Icon className={`h-5 w-5 shrink-0 ${floating ? "text-white/70" : "text-[#e07a1b]"}`} />
      <div className="min-w-0 flex-1">
        <div className={`text-[10px] uppercase tracking-[0.12em] font-bold pb-0.5 ${floating ? "text-white/60" : "text-slate-500"}`}>{label}</div>
        <input className={`w-full bg-transparent text-sm font-semibold outline-none ${
          floating ? "placeholder:text-white/50 text-white" : "placeholder:text-slate-400 text-slate-800"
        }`} placeholder={placeholder} />
      </div>
    </div>
  );
}