"use client";

import { Game } from "../types/game";

interface WishlistContextType {
  wishlist: Game[];
  wishlistIds: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  isHydrated: boolean; // Memberitahu komponen jika data localStorage sudah siap
}
