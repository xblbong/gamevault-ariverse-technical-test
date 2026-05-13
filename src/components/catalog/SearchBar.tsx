import { Search } from "lucide-react";

export const SearchBar = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => (
  <div className="relative w-full">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
    <input
      type="text"
      placeholder="Cari judul game..."
      className="input-base pl-12"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);