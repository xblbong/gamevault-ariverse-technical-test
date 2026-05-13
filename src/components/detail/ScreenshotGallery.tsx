"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";
import { thumbnailVariants } from "../lib/motion";

export const ScreenshotGallery = ({ screenshots }: { screenshots: string[] }) => {
  const [index, setIndex] = useState(-1);

  return (
    <section className="space-y-6">
      <h3 className="text-heading-lg">Galeri Screenshot</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {screenshots.map((src, i) => (
          <motion.div
            key={i}
            variants={thumbnailVariants}
            initial="rest"
            whileHover="hover"
            onClick={() => setIndex(i)}
            className="relative aspect-video overflow-hidden rounded-xl border border-border-subtle cursor-zoom-in bg-bg-elevated"
          >
            <Image src={src} alt={`Screenshot ${i + 1}`} fill className="object-cover" />
          </motion.div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={screenshots.map((src) => ({ src }))}
      />
    </section>
  );
};