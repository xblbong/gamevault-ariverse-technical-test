"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameCard } from "@/components/ui/GameCard";
import { GameCardSkeleton } from "@/components/ui/GameCardSkeleton";
import { EmptyWishlist } from "@/components/wishlist/EmptyWishlist";
import { Heart } from "lucide-react";
import { useWishlist } from "@/components/context/WishlistContext";
import { cardVariants, pageVariants, staggerContainer } from "@/components/lib/motion";
import { WishlistGrid } from "@/components/wishlist/WishlistGrid";

export default function WishlistPage() {
    const { wishlist, isHydrated } = useWishlist();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Tampilkan Skeleton saat loading data dari localStorage
    if (!mounted || !isHydrated) {
        return (
            <div className="container-page py-12 space-y-8">
                <div className="h-12 w-48 bg-bg-elevated animate-pulse rounded-xl" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => <GameCardSkeleton key={i} />)}
                </div>
            </div>
        );
    }

    return (
        <motion.main
            variants={pageVariants}
            initial="initial"
            animate="animate"
            className="container-page py-12 min-h-[70vh]"
        >
            <header className="mb-12 flex items-center gap-4">
                <div className="p-3 bg-primary-500/10 rounded-2xl border border-primary-500/20">
                    <Heart className="text-primary-500" size={32} />
                </div>
                <div>
                    <h1 className="text-display-lg">Wishlist Saya</h1>
                    <p className="text-text-secondary">
                        {wishlist.length} game tersimpan di browser ini
                    </p>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {wishlist.length > 0 ? (
                    <WishlistGrid games={wishlist} />
                ) : (
                    <EmptyWishlist key="empty" />
                )}
            </AnimatePresence>
        </motion.main>
    );
}