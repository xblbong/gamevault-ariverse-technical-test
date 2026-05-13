"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FilterPanel } from "@/components/catalog/FilterPanel";
import { SearchBar } from "@/components/catalog/SearchBar";
import { SortDropdown } from "@/components/catalog/SortDropdown";
import { InfiniteGameList } from "@/components/catalog/InfiniteGameList";
import { SlidersHorizontal, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useFilteredGames } from "@/components/hooks/useFilteredGames";
import { useInfiniteScroll } from "@/components/hooks/useInfiniteScroll";
import { pageVariants } from "@/components/lib/motion";

export default function CatalogPage() {
  const {
    search, setSearch,
    selectedGenres, setSelectedGenres,
    selectedPlatforms, setSelectedPlatforms,
    sortBy, setSortBy,
    filteredGames
  } = useFilteredGames();

  const { displayedItems, hasMore, loadMore } = useInfiniteScroll(filteredGames);

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" className="container-page py-8 md:py-12">
      <header className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-display-lg">Katalog Game</h1>
            <p className="text-text-secondary">
              Menampilkan {filteredGames.length} dari 30 game
            </p>
          </div>
          <div className="w-full md:w-96">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block lg:col-span-1">
          <FilterPanel
            selectedGenres={selectedGenres}
            onGenreChange={setSelectedGenres}
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={setSelectedPlatforms}
          />
        </aside>

        <section className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-bg-surface p-4 rounded-2xl border border-border-subtle">
            <div className="flex items-center gap-2 text-text-secondary">
              <LayoutGrid size={18} />
              <span className="text-label-sm">Grid View</span>
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          <AnimatePresence mode="wait">
            {filteredGames.length > 0 ? (
              <InfiniteGameList 
                key="list"
                games={filteredGames}
                displayedGames={displayedItems}
                loadMore={loadMore}
                hasMore={hasMore}
              />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center space-y-4"
              >
                <SlidersHorizontal size={48} className="text-text-muted" />
                <h3 className="text-heading-md">Game tidak ditemukan</h3>
                <p className="text-text-secondary max-w-xs">Coba sesuaikan filter pencarian kamu.</p>
                <Button variant="outline" onClick={() => { setSearch(""); setSelectedGenres([]); setSelectedPlatforms([]); }}>
                  Reset Filter
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </motion.main>
  );
}