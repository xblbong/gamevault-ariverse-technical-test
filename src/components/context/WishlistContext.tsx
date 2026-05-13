"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Game } from "../types/game";
import gamesDataRaw from "../../../data/games.json"; 


const gamesData = gamesDataRaw as Game[];

interface WishlistContextType {
  wishlist: Game[];
  wishlistIds: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  isHydrated: boolean; // Memberitahu komponen jika data localStorage sudah siap
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = "gamevault_wishlist";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Ambil data dari localStorage saat pertama kali client-side load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setWishlistIds(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse wishlist:", error);
      }
    }
    setIsHydrated(true); //tandai true setelah mencoba load data (berhasil atau tidak)
  }, []);

  // 2. Simpan ke localStorage setiap kali wishlistIds berubah
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    }
  }, [wishlistIds, isHydrated]);

  // 3. Derive data Game lengkap berdasarkan ID yang disimpan
  const wishlist = (gamesData as Game[]).filter((game) =>
    wishlistIds.includes(game.id)
  );

  const addToWishlist = (id: number) => {
    setWishlistIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWishlist = (id: number) => {
    setWishlistIds((prev) => prev.filter((wishId) => wishId !== id));
  };

  const toggleWishlist = (id: number) => {
    if (wishlistIds.includes(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const isInWishlist = (id: number) => wishlistIds.includes(id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistIds,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        isHydrated,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom Hook untuk akses wishlist
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
