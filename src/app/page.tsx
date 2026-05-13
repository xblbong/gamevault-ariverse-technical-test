import { HeroBanner } from "@/components/home/HeroBanner";
import { GameGrid } from "@/components/home/GameGrid";
import * as motion from "framer-motion/client"; // Next.js Client Motion Utility
import { pageVariants } from "@/components/lib/motion";

export default function HomePage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Banner untuk Featured Games */}
      <HeroBanner />

      {/* Grid semua game */}
      <GameGrid />
    </motion.div>
  );
}