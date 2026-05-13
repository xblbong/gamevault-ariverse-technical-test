"use client";

import { useState } from "react"; // Tambahkan useState
import { motion, AnimatePresence } from "framer-motion";
import { FilterPanel } from "@/components/catalog/FilterPanel";
import { SearchBar } from "@/components/catalog/SearchBar";
import { SortDropdown } from "@/components/catalog/SortDropdown";
import { InfiniteGameList } from "@/components/catalog/InfiniteGameList";
import { SlidersHorizontal, LayoutGrid, X } from "lucide-react"; // Tambah X dan Sliders
import { Button } from "@/components/ui/Button";
import { useFilteredGames } from "@/components/hooks/useFilteredGames";
import { useInfiniteScroll } from "@/components/hooks/useInfiniteScroll";
import { pageVariants } from "@/components/lib/motion";

export default function CatalogPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State untuk kontrol filter mobile
  
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
      <header className="mb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-display-lg">Katalog Game</h1>
            <p className="text-text-secondary">
              Menampilkan {filteredGames.length} dari 30 game
            </p>
          </div>
          
          {/* BAGIAN SEARCH & FILTER BUTTON */}
          <div className="w-full md:w-96 flex gap-2">
            <SearchBar value={search} onChange={setSearch} />
            
            {/* Tombol Filter ini HANYA muncul di Mobile (lg:hidden) */}
            <Button 
              variant="outline" 
              size="icon" 
              className="lg:hidden shrink-0 w-12 h-12 rounded-xl border-border-strong"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR DESKTOP (Tetap tampil di layar besar) */}
        <aside className="hidden lg:block lg:col-span-1">
          <FilterPanel
            selectedGenres={selectedGenres}
            onGenreChange={setSelectedGenres}
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={setSelectedPlatforms}
          />
        </aside>

        {/* DRAWER FILTER UNTUK MOBILE */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              {/* Overlay / Background Hitam Transparan */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
              />
              
              {/* Panel Menu yang bergeser dari kanan */}
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 z-[101] w-full max-w-[300px] bg-bg-surface p-6 shadow-2xl lg:hidden overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-heading-md">Filter Game</h2>
                  <button 
                    onClick={() => setIsFilterOpen(false)} 
                    className="p-2 hover:bg-bg-elevated rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <FilterPanel
                  selectedGenres={selectedGenres}
                  onGenreChange={setSelectedGenres}
                  selectedPlatforms={selectedPlatforms}
                  onPlatformChange={setSelectedPlatforms}
                />

                <Button 
                  className="w-full mt-8 shadow-glow-primary" 
                  onClick={() => setIsFilterOpen(false)}
                >
                  Terapkan Filter
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <section className="lg:col-span-3 space-y-6">
          {/* Toolbar Grid View & Sort */}
          <div className="flex items-center justify-between bg-bg-surface p-4 rounded-2xl border border-border-subtle">
             <div className="flex items-center gap-2 text-text-secondary">
               <LayoutGrid size={18} />
               <span className="text-label-sm uppercase tracking-wider">Grid View</span>
             </div>
             <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* List Game */}
          <AnimatePresence mode="wait">
             <InfiniteGameList 
                key="list"
                games={filteredGames}
                displayedGames={displayedItems}
                loadMore={loadMore}
                hasMore={hasMore}
              />
          </AnimatePresence>
        </section>
      </div>
    </motion.main>
  );
}