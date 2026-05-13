"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, LayoutGrid, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useWishlist } from "../context/WishlistContext";
import { cn } from "../lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/", icon: Gamepad2 },
  { name: "Katalog", href: "/games", icon: LayoutGrid },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wishlistIds } = useWishlist();

  return (
    <nav className="navbar-glass">
      <div className="container-page flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary-500 p-1.5 rounded-lg group-hover:shadow-glow-primary transition-all">
            <Gamepad2 className="text-white" size={24} />
          </div>
          <span className="text-heading-md font-extrabold tracking-tight hidden sm:block">
            GAME<span className="text-primary-500">VAULT</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-xl text-body-md font-medium transition-all",
                  isActive ? "text-primary-500" : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                )}
              >
                <Icon size={18} />
                {link.name}
                
                {/* Wishlist Badge Counter */}
                {link.name === "Wishlist" && wishlistIds.length > 0 && (
                  <motion.span
                    key={wishlistIds.length}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white shadow-glow-primary"
                  >
                    {wishlistIds.length}
                  </motion.span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
          <div className="ml-2 pl-2 border-l border-border-subtle">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Toggle & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-text-primary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border-subtle bg-bg-surface overflow-hidden"
          >
            <div className="container-page py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl",
                      isActive ? "bg-primary-500/10 text-primary-500" : "text-text-secondary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-medium">{link.name}</span>
                    </div>
                    {link.name === "Wishlist" && wishlistIds.length > 0 && (
                      <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {wishlistIds.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};