"use client";

import { motion } from "framer-motion";
import { GameCard } from "../ui/GameCard";
import { cardVariants, staggerContainer } from "../lib/motion";
import { Game } from "../types/game";

interface WishlistGridProps {
  games: Game[];
}

export const WishlistGrid = ({ games }: WishlistGridProps) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {games.map((game) => (
        <motion.div key={game.id} variants={cardVariants}>
          <GameCard game={game} />
        </motion.div>
      ))}
    </motion.div>
  );
};