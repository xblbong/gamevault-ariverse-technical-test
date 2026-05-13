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
            className={cn(
              "absolute right-3 top-3 z-10 rounded-full p-2.5 backdrop-blur-md transition-all duration-300",
              isFavorite
                ? "bg-primary-500 text-white shadow-glow-primary scale-110"
                : "bg-black/20 text-white hover:bg-black/40"
            )}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
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
            <div className="flex flex-wrap gap-1 mb-2">
              {game.genres.slice(0, 2).map((genre) => (
                <Badge key={genre}>{genre}</Badge>
              ))}
            </div>
            <h3 className="text-heading-md line-clamp-2 text-white mb-1">
              {game.title}
            </h3>
            <p className="text-label-lg text-accent-cyan font-bold">
              {formatPrice(game.price)}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};