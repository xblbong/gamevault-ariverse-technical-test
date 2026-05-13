import { Genre } from "../types/game";

export const GENRE_COLORS: Record<Genre | string, string> = {
  Action: "bg-primary-500/10 text-primary-400 border-primary-500/20",
  RPG: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
  Strategy: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Simulation: "bg-accent-neon/10 text-accent-neon border-accent-neon/20",
  Horror: "bg-red-500/10 text-red-500 border-red-500/20",
  Adventure: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  Shooter: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  Indie: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  // Default color for others
  Default: "bg-bg-elevated text-text-secondary border-border-default",
};