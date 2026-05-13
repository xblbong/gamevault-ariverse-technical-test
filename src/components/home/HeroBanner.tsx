"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, Info } from "lucide-react";
import gamesData from "../../../data/games.json";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Game } from "../types/game";
import { heroContainerVariants, heroItemVariants } from "../lib/motion";
import { cn, formatPrice } from "../lib/utils";

export const HeroBanner = () => {
  const featuredGames = (gamesData as Game[]).filter((g) => g.featured);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-carousel setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredGames.length]);

  const currentGame = featuredGames[currentIndex];

  return (
    <section className="relative w-full overflow-hidden bg-bg-base pt-3 sm:pt-8 pb-8 sm:pb-12">
      <div className="container-page">
        <div className="relative h-[420px] sm:h-[500px] md:h-[600px] w-full overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border-subtle bg-bg-surface">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGame.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {/* Background Image with Gradient Hero Mask */}
              <Image
                src={currentGame.coverImage}
                alt={currentGame.title}
                fill
                priority
                className="object-cover opacity-60 md:opacity-100 md:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 md:bg-gradient-to-r md:from-bg-base md:via-bg-base/60 md:to-transparent" />

              {/* Content Container */}
              <div className="absolute inset-0 flex items-center">
                <div className="container-page">
                  <motion.div
                    variants={heroContainerVariants}
                    initial="initial"
                    animate="animate"
                    className="max-w-2xl space-y-4 md:space-y-6"
                  >
                    <motion.div variants={heroItemVariants} className="flex flex-wrap gap-2">
                      <Badge variant="genre" className="bg-primary-500 text-white border-none px-4 py-1">
                        Featured Title
                      </Badge>
                      {currentGame.genres.map((g) => (
                        <Badge key={g}>{g}</Badge>
                      ))}
                    </motion.div>

                    <motion.h1 
                      variants={heroItemVariants}
                      className="text-display-lg md:text-display-xl tracking-tighter"
                    >
                      {currentGame.title}
                    </motion.h1>

                    <motion.div variants={heroItemVariants} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 rounded-full bg-bg-elevated/80 px-3 py-1 backdrop-blur-md">
                        <Star className="fill-warning text-warning" size={16} />
                        <span className="font-bold text-rating-excellent">{currentGame.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-heading-md font-bold text-accent-cyan">
                        {formatPrice(currentGame.price)}
                      </span>
                    </motion.div>

                    <motion.p 
                      variants={heroItemVariants}
                      className="text-body-md md:text-body-lg text-text-secondary line-clamp-2 md:line-clamp-none max-w-lg"
                    >
                      {currentGame.description}
                    </motion.p>

                    <motion.div variants={heroItemVariants} className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                      <Link href={`/games/${currentGame.slug}`}>
                        <Button size="lg" className="gap-2 px-5 sm:px-8 text-sm sm:text-base">
                          Lihat Detail <ChevronRight size={16} />
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            {featuredGames.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "h-1.5 transition-all rounded-full",
                  currentIndex === idx ? "w-8 bg-primary-500 shadow-glow-primary" : "w-2 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};