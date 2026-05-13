"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <h1 className="text-[120px] font-black leading-none text-primary-500 opacity-20">404</h1>
        <div className="space-y-2">
          <h2 className="text-heading-xl">Waduh! Game Tidak Ditemukan</h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Halaman yang kamu cari sepertinya sudah pindah ke dimensi lain atau tidak pernah ada.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/">
            <Button className="gap-2 px-8">
              <Home size={18} /> Kembali ke Beranda
            </Button>
          </Link>
          <Link href="/games">
            <Button variant="outline" className="gap-2 px-8">
              <Search size={18} /> Cari Game Lain
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}