"use client";

import { useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";
import { Game, Genre, Platform, SortOption } from "../types/game";
import gamesData from "../../../data/games.json";

export const useFilteredGames = () => {
  const allGames = gamesData as Game[];

  // States
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("rating-desc");

  const debouncedSearch = useDebounce(search, 300);

  const filteredGames = useMemo(() => {
    let result = [...allGames];

    // 1. Filter by Search
    if (debouncedSearch) {
      result = result.filter((g) =>
        g.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // 2. Filter by Genre
    if (selectedGenres.length > 0) {
      result = result.filter((g) =>
        selectedGenres.some((genre) => g.genres.includes(genre))
      );
    }

    // 3. Filter by Platform
    if (selectedPlatforms.length > 0) {
      result = result.filter((g) =>
        selectedPlatforms.some((p) => g.platforms.includes(p))
      );
    }

    // 4. Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "rating-desc": return b.rating - a.rating;
        case "newest": return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case "price-asc": return a.price - b.price;
        case "alphabetical": return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

    return result;
  }, [allGames, debouncedSearch, selectedGenres, selectedPlatforms, sortBy]);

  return {
    search,
    setSearch,
    selectedGenres,
    setSelectedGenres,
    selectedPlatforms,
    setSelectedPlatforms,
    sortBy,
    setSortBy,
    filteredGames,
    totalResults: filteredGames.length,
  };
};