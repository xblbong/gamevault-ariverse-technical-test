"use client";

import { useMemo, useState } from "react";
import { Game, Genre, Platform, SortOption } from "../types/game";
import gamesDataRaw from "../../../data/games.json";
import { useDebounce } from "./useDebounce";

const gamesData = gamesDataRaw as Game[];

export const useFilteredGames = () => {
    const [search, setSearch] = useState("");
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>(""); // STATE BARU
    const [sortBy, setSortBy] = useState<SortOption>("rating-desc");

    const debouncedSearch = useDebounce(search, 300);

    const filteredGames = useMemo(() => {
        let result = [...gamesData];

        if (debouncedSearch) {
            result = result.filter((g) =>
                g.title.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        if (selectedGenres.length > 0) {
            result = result.filter((g) =>
                selectedGenres.some((genre) => g.genres.includes(genre))
            );
        }

        if (selectedPlatforms.length > 0) {
            result = result.filter((g) =>
                selectedPlatforms.some((p) => g.platforms.includes(p))
            );
        }

        // LOGIKA FILTER TAHUN BARU
        if (selectedYear) {
            result = result.filter((g) => {
                const gameYear = new Date(g.releaseDate).getFullYear();
                if (selectedYear === "old") return gameYear <= 2021;
                return gameYear === parseInt(selectedYear);
            });
        }

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
    }, [debouncedSearch, selectedGenres, selectedPlatforms, selectedYear, sortBy]);

    return {
        search, setSearch,
        selectedGenres, setSelectedGenres,
        selectedPlatforms, setSelectedPlatforms,
        selectedYear, setSelectedYear, // RETURN BARU
        sortBy, setSortBy,
        filteredGames,
    };
};