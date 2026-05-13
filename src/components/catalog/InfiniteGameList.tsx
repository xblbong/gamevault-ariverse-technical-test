"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { GameCard } from "../ui/GameCard";
import { GameCardSkeleton } from "../ui/GameCardSkeleton";
import { Game } from "../types/game";
import { cardVariants, staggerContainer } from "../lib/motion";

interface InfiniteGameListProps {
  games: Game[];
  displayedGames: Game[];
  loadMore: () => void;
  hasMore: boolean;
}

export const InfiniteGameList = ({ games, displayedGames, loadMore, hasMore }: InfiniteGameListProps) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, hasMore, loadMore]);

  return (
    <div className="space-y-10">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {displayedGames.map((game) => (
          <motion.div key={game.id} variants={cardVariants}>
            <GameCard game={game} />
          </motion.div>
        ))}
      </motion.div>

      {/* Loading Trigger Area */}
      {hasMore && (
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
          {[...Array(3)].map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};