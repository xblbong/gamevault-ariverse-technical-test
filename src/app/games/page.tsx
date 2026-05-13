"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterPanel } from "@/components/catalog/FilterPanel";
import { SearchBar } from "@/components/catalog/SearchBar";
import { GameCard } from "@/components/ui/GameCard";
import { GameCardSkeleton } from "@/components/ui/GameCardSkeleton";
import { SlidersHorizontal, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useFilteredGames } from "@/components/hooks/useFilteredGames";
import { cardVariants, pageVariants, staggerContainer } from "@/components/lib/motion";

export default function CatalogPage() {
  const {
    search, setSearch,
    selectedGenres, setSelectedGenres,
    selectedPlatforms, setSelectedPlatforms,
    sortBy, setSortBy,
    filteredGames, totalResults
  } = useFilteredGames();

  // Infinite Scroll logic
  const [displayCount, setDisplayCount] = useState(12);
  const displayedGames = filteredGames.slice(0, displayCount);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" className="container-page py-8 md:py-12">
      <header className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-display-lg">Katalog Game</h1>
            <p className="text-text-secondary">
              Menampilkan {filteredGames.length} dari 30 game
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <FilterPanel
            selectedGenres={selectedGenres}
            onGenreChange={setSelectedGenres}
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={setSelectedPlatforms}
          />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between bg-bg-surface p-4 rounded-xl border border-border-subtle">
            <div className="flex items-center gap-2 text-text-secondary">
              <LayoutGrid size={18} />
              <span className="text-label-sm">Grid View</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-text-primary text-body-sm focus:outline-none cursor-pointer"
            >
              <option value="rating-desc">Rating Tertinggi</option>
              <option value="newest">Terbaru</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>

          <AnimatePresence mode="wait">
            {filteredGames.length > 0 ? (
              <motion.div
                key="grid"
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
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-4"
              >
                <div className="p-6 bg-bg-surface rounded-full">
                  <SlidersHorizontal size={48} className="text-text-muted" />
                </div>
                <h3 className="text-heading-md">Game tidak ditemukan</h3>
                <p className="text-text-secondary max-w-xs">
                  Coba sesuaikan filter atau kata kunci pencarian kamu.
                </p>
                <Button variant="outline" onClick={() => { setSearch(""); setSelectedGenres([]); setSelectedPlatforms([]); }}>
                  Reset Semua Filter
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load More Trigger (Infinite Scroll Manual for now) */}
          {displayCount < filteredGames.length && (
            <div className="flex justify-center pt-8">
              <Button variant="outline" onClick={() => setDisplayCount(prev => prev + 6)}>
                Muat Lebih Banyak
              </Button>
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
}