"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { Badge } from "./Badge";
import { useWishlist } from "../context/WishlistContext";
import { Game } from "../types/game";
import { cardHoverVariants } from "../lib/motion";
import { cn, formatPrice, getRatingColor } from "../lib/utils";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(game.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah Link ter-klik saat menekan tombol Heart
    toggleWishlist(game.id);
  };

  return (
    <Link href={`/games/${game.slug}`}>
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="game-card group"
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Wishlist Button Overlay */}
          <button
            onClick={handleWishlist}
            aria-label={isFavorite ? "Hapus dari wishlist" : "Tambah ke wishlist"}
            className={cn(
              "absolute right-2 top-2 z-10 rounded-full p-2 sm:p-2.5 backdrop-blur-md transition-all duration-300",
              isFavorite
                ? "bg-primary-500 text-white shadow-glow-primary scale-110"
                : "bg-black/20 text-white hover:bg-black/40"
            )}
          >
            <Heart size={15} className="sm:hidden" fill={isFavorite ? "currentColor" : "none"} />
            <Heart size={18} className="hidden sm:block" fill={isFavorite ? "currentColor" : "none"} />
          </button>

          {/* Rating Badge Overlay */}
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-lg bg-black/40 px-2 py-1 backdrop-blur-md">
            <Star size={14} className="fill-warning text-warning" />
            <span className={cn("text-label-sm font-bold", getRatingColor(game.rating))}>
              {game.rating.toFixed(1)}
            </span>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="game-card-overlay flex flex-col justify-end">
            <div className="flex flex-wrap gap-1 mb-1 sm:mb-2">
              {game.genres.slice(0, 1).map((genre) => (
                <Badge key={genre} className="text-[10px] sm:text-xs px-1.5 sm:px-2">{genre}</Badge>
              ))}
            </div>
            <h3 className="text-body-sm sm:text-heading-md line-clamp-2 text-white mb-0.5 sm:mb-1 font-semibold">
              {game.title}
            </h3>
            <p className="text-[11px] sm:text-label-lg text-accent-cyan font-bold">
              {formatPrice(game.price)}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};