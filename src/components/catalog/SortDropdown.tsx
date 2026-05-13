import { ChevronDown } from "lucide-react";
import { SortOption } from "../types/game";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const options = [
    { label: "Rating Tertinggi", value: "rating-desc" },
    { label: "Terbaru", value: "newest" },
    { label: "Harga Terendah", value: "price-asc" },
    { label: "Alfabetis (A-Z)", value: "alphabetical" },
  ];

  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none bg-bg-elevated text-text-primary text-body-sm px-4 py-2 pr-10 rounded-xl border border-border-subtle focus:outline-none focus:border-primary-500 cursor-pointer transition-all"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" />
    </div>
  );
};