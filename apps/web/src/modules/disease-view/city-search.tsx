"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search } from "lucide-react";

interface CityResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface CitySearchProps {
  onCitySelect: (lat: number, lng: number, name: string) => void;
  placeholder?: string;
}

export function CitySearch({ onCitySelect, placeholder = "Search city..." }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q,
        format: "json",
        limit: "5",
        featuretype: "city",
        addressdetails: "0",
      });
      // Restrict to cities/towns/villages — no streets
      params.append("type", "city");
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`,
        { headers: { "Accept-Language": "es,en" } },
      );
      const data: CityResult[] = await res.json();
      setResults(data);
      setOpen(data.length > 0);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 350);
  };

  const handleSelect = (r: CityResult) => {
    const shortName = r.display_name.split(",")[0];
    setQuery(shortName);
    setOpen(false);
    onCitySelect(parseFloat(r.lat), parseFloat(r.lon), shortName);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex items-center border-b-2 border-ink bg-transparent">
        <Search className="w-4 h-4 text-ink opacity-50 mr-2 flex-shrink-0" strokeWidth={1.5} />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent py-2 text-[0.875rem] font-body text-ink placeholder:text-ink/40 outline-none"
        />
        {loading && (
          <span className="text-[0.625rem] font-label uppercase tracking-widest text-ink/40 ml-2 flex-shrink-0">
            ...
          </span>
        )}
      </div>
      {open && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 z-50 bg-surface border border-ink border-t-0 max-h-48 overflow-y-auto">
          {results.map((r) => (
            <li key={r.place_id}>
              <button
                type="button"
                onClick={() => handleSelect(r)}
                className="w-full text-left px-3 py-2 text-[0.8125rem] font-body text-ink hover:bg-surface-container-high transition-colors border-b border-ink/10 last:border-b-0"
              >
                {r.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
