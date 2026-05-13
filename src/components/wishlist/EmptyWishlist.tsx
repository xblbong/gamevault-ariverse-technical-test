"use client";

import { Heart, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { emptyStateVariants } from "../lib/motion";

export const EmptyWishlist = () => {
  return (
    <motion.div
      variants={emptyStateVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center justify-center py-20 text-center space-y-6"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full" />
        <div className="relative p-8 bg-bg-surface rounded-full border border-border-subtle shadow-glow-primary">
          <Heart size={64} className="text-text-muted opacity-40" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-heading-xl">Wishlist Kamu Kosong</h2>
        <p className="text-text-secondary max-w-sm mx-auto">
          Sepertinya kamu belum menambahkan game apapun ke daftar favoritmu.
        </p>
      </div>

      <Link href="/games">
        <Button size="lg" className="gap-2">
          <LayoutGrid size={18} /> Jelajahi Katalog
        </Button>
      </Link>
    </motion.div>
  );
};