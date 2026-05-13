"use client";

import { motion } from "framer-motion";
import gamesData from "../../../data/games.json";
import { GameCard } from "../ui/GameCard";
import { Game } from "../types/game";
import { cardVariants, staggerContainer } from "../lib/motion";

export const GameGrid = () => {
  const allGames = gamesData as Game[];

  return (
    <section className="container-page py-8 md:py-12">
      <div className="mb-6 md:mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-heading-xl mb-1.5">Jelajahi Semua Game</h2>
          <p className="text-text-secondary text-body-md">Temukan petualangan berikutnya dari koleksi terbaik kami.</p>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      >
        {allGames.map((game) => (
          <motion.div key={game.id} variants={cardVariants}>
            <GameCard game={game} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};