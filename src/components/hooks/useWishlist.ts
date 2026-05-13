"use client";

import { useWishlist as useWishlistContext } from "../context/WishlistContext";

export const useWishlist = () => {
  const context = useWishlistContext();
  return context;
};