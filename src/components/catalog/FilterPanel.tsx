"use client";

import { cn } from "../lib/utils";
import { Genre, Platform } from "../types/game";
import { Badge } from "../ui/Badge";

const GENRES: Genre[] = ["Action", "RPG", "Strategy", "Simulation", "Sports", "Horror", "Adventure", "Puzzle", "Racing", "Fighting", "Shooter", "Indie"];
const PLATFORMS: Platform[] = ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox One", "Nintendo Switch", "Mobile", "Mac"];

interface FilterPanelProps {
  selectedGenres: Genre[];
  onGenreChange: (g: Genre[]) => void;
  selectedPlatforms: Platform[];
  onPlatformChange: (p: Platform[]) => void;
}

export const FilterPanel = ({ selectedGenres, onGenreChange, selectedPlatforms, onPlatformChange }: FilterPanelProps) => {
  const toggleGenre = (genre: Genre) => {
    onGenreChange(selectedGenres.includes(genre) ? selectedGenres.filter(g => g !== genre) : [...selectedGenres, genre]);
  };

  const togglePlatform = (platform: Platform) => {
    onPlatformChange(selectedPlatforms.includes(platform) ? selectedPlatforms.filter(p => p !== platform) : [...selectedPlatforms, platform]);
  };

  return (
    <div className="space-y-8 p-6 bg-bg-surface rounded-2xl border border-border-subtle">
      <div>
        <h4 className="text-label-sm text-text-muted mb-4">Genre</h4>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <button key={genre} onClick={() => toggleGenre(genre)}>
              <Badge className={cn("cursor-pointer py-1.5 px-3", selectedGenres.includes(genre) ? "bg-primary-500 text-white border-none shadow-glow-primary" : "opacity-60 hover:opacity-100")}>
                {genre}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-label-sm text-text-muted mb-4">Platform</h4>
        <div className="grid grid-cols-2 gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => togglePlatform(p)}
              className={cn(
                "text-body-sm px-3 py-2 rounded-lg border text-left transition-all",
                selectedPlatforms.includes(p) ? "bg-primary-500/10 border-primary-500 text-primary-500" : "border-border-default text-text-secondary hover:border-border-strong"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};