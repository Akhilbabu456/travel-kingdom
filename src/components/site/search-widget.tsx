"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users, Globe } from "lucide-react";
import { fetchRawLocations, type ApiLocation } from "@/lib/api";

export function SearchWidget({ floating = false }: { floating?: boolean }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"search" | "domestic" | "international">("search");
  const [locations, setLocations] = useState<ApiLocation[]>([]);
  const [loading, setLoading] = useState(false);

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState("");

  useEffect(() => {
    if (activeTab !== "search" && locations.length === 0) {
      setLoading(true);
      fetchRawLocations().then((res) => {
        setLocations(res);
        setLoading(false);
      });
    }
  }, [activeTab, locations.length]);

  const handleFind = () => {
    const params = new URLSearchParams();
    if (destination) params.append("q", destination);
    if (date) params.append("date", date);
    if (travellers) params.append("travellers", travellers);
    router.push(`/packages?${params.toString()}`);
  };

  const handleLocationClick = (name: string) => {
    router.push(`/packages?q=${encodeURIComponent(name)}`);
  };

  const normalize = (val?: string | null) => (val || "").trim().toLowerCase();

  const domesticList = locations.filter(
    (loc) => normalize(loc.country) === "india" && loc.type === "state"
  );

  const internationalList = locations.filter(
    (loc) => !normalize(loc.country).includes("india") && loc.type === "country"
  );

  // Sorting alphabetically
  domesticList.sort((a, b) => a.name.localeCompare(b.name));
  internationalList.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      className={`w-full overflow-hidden rounded-3xl p-5 sm:p-6 shadow-2xl transition-all duration-300 ${
        floating
          ? "bg-black/75 sm:glass-dark border border-white/20"
          : "bg-card border border-border"
      }`}
    >
      {/* Tabs list */}
      <div className="flex gap-2 p-1.5 bg-black/10 dark:bg-white/5 rounded-full w-fit mb-5 border border-black/5 dark:border-white/10">
        {(["search", "domestic", "international"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === tab
                ? "bg-[#e07a1b] text-white shadow-glow"
                : floating
                ? "text-white/70 hover:text-white hover:bg-white/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {tab === "search" ? "Search" : tab === "domestic" ? "Domestic" : "International"}
          </button>
        ))}
      </div>

      {activeTab === "search" && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:gap-3.5 animate-fadeIn">
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
            suppressHydrationWarning
          >
            <Search className="h-4.5 w-4.5" /> Find
          </button>
        </div>
      )}

      {(activeTab === "domestic" || activeTab === "international") && (
        <div className="animate-fadeIn">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto no-scrollbar">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 rounded-2xl p-2.5 animate-pulse ${
                    floating ? "bg-white/5 border border-white/10" : "bg-muted border border-border"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 shrink-0" />
                  <div className="h-3 w-20 bg-white/20 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto no-scrollbar pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {(activeTab === "domestic" ? domesticList : internationalList).map((loc) => {
                  const fallback =
                    activeTab === "domestic"
                      ? "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=100&h=100&q=80"
                      : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=100&h=100&q=80";

                  return (
                    <button
                      key={loc.id}
                      onClick={() => handleLocationClick(loc.name)}
                      className={`flex items-center gap-3 rounded-2xl p-2.5 text-left transition-all duration-300 hover:-translate-y-0.5 border cursor-pointer group ${
                        floating
                          ? "bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/20 text-white/95"
                          : "bg-muted/40 border-border/50 hover:bg-muted hover:border-border text-foreground"
                      }`}
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-white/10 border border-black/10 dark:border-white/10">
                        <img
                          src={loc.image || fallback}
                          alt={loc.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = fallback;
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold tracking-wide capitalize group-hover:text-[#e07a1b] transition-colors">
                          {loc.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
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
  onChange,
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
    <div
      className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
        floating
          ? "bg-white/15 text-white border border-white/10 focus-within:bg-white/25 focus-within:border-white/30"
          : "bg-slate-50 text-slate-800 border border-slate-200 focus-within:bg-white focus-within:border-[#e07a1b]/40 focus-within:shadow-md"
      }`}
    >
      <Icon
        className={`h-5 w-5 shrink-0 ${floating ? "text-[#e07a1b] sm:text-white" : "text-[#e07a1b]"}`}
      />
      <div className="min-w-0 flex-1">
        <div
          className={`text-[10px] uppercase tracking-[0.12em] font-bold pb-0.5 ${
            floating ? "text-white/80" : "text-slate-500"
          }`}
        >
          {label}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-transparent text-sm font-semibold outline-none focus:ring-0 ${
            floating
              ? "placeholder:text-white/60 text-white [color-scheme:dark]"
              : "placeholder:text-slate-400 text-slate-800"
          }`}
          placeholder={placeholder}
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}
