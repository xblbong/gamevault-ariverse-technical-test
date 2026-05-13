"use client";

import { Heart } from "lucide-react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import { cn } from "../lib/utils";
import { wishlistButtonVariants } from "../lib/motion";

interface WishlistButtonProps {
  gameId: number;
  showText?: boolean;
  className?: string;
}

export const WishlistButton = ({ gameId, showText = true, className }: WishlistButtonProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(gameId);

  return (
    <Button
      variant={isFavorite ? "primary" : "outline"}
      onClick={() => toggleWishlist(gameId)}
      className={cn("gap-2 min-w-[44px]", className)}
    >
      <motion.div
        variants={wishlistButtonVariants}
        animate={isFavorite ? "added" : "idle"}
        whileTap="tap"
      >
        <Heart 
          size={20} 
          className={cn(isFavorite && "fill-white")} 
        />
      </motion.div>
      
      {showText && (
        <AnimatePresence mode="wait">
          <motion.span
            key={isFavorite ? "added" : "not"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isFavorite ? "In Wishlist" : "Add to Wishlist"}
          </motion.span>
        </AnimatePresence>
      )}
    </Button>
  );
};
