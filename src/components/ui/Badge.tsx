import { GENRE_COLORS } from "../lib/constants";
import { cn } from "../lib/utils";

interface BadgeProps {
  children: string;
  className?: string;
  variant?: "genre" | "platform" | "outline";
}

export const Badge = ({ children, className, variant = "genre" }: BadgeProps) => {
  const colorClass = variant === "genre" 
    ? (GENRE_COLORS[children] || GENRE_COLORS.Default)
    : "bg-bg-elevated text-text-secondary border-border-default";

  return (
    <span
      className={cn(
        "text-label-sm inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors",
        colorClass,
        className
      )}
    >
      {children}
    </span>
  );
};