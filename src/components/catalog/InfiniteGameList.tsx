"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
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

  // Empty state — tidak ada hasil dari filter / search
  if (games.length === 0) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="empty-catalog"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-24 text-center gap-6"
          role="status"
          aria-label="Tidak ada hasil ditemukan"
        >
          <div className="p-6 bg-bg-surface rounded-3xl border border-border-subtle">
            <SearchX size={48} className="text-text-muted" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-heading-md text-text-primary">Game Tidak Ditemukan</h3>
            <p className="text-body-md text-text-secondary">
              Coba ubah kata kunci pencarian atau hapus beberapa filter yang aktif.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

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