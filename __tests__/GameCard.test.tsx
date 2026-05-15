/**
 * Unit Test: GameCard Component
 *
 * Menguji rendering dan interaksi dasar komponen GameCard,
 * termasuk tampilan info game dan fungsi tombol wishlist.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { GameCard } from "@/components/ui/GameCard";
import { WishlistContext } from "@/components/context/WishlistContext";
import { Game, Genre, Platform } from "@/components/types/game";

// ─── Mock next/image ───────────────────────────────────────────────────────────
// next/image menggunakan optimisasi server-side yang tidak tersedia di test env
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

// ─── Mock next/link ────────────────────────────────────────────────────────────
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

// ─── Mock framer-motion ────────────────────────────────────────────────────────
// Nonaktifkan animasi dan strip motion props agar tidak ada warning DOM
jest.mock("framer-motion", () => {
  const stripMotionProps = ({
    children,
    variants: _v,
    initial: _i,
    animate: _a,
    exit: _e,
    transition: _t,
    whileHover: _wh,
    ...rest
  }: React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    variants?: unknown; initial?: unknown; animate?: unknown;
    exit?: unknown; transition?: unknown; whileHover?: unknown;
  }) => <div {...rest}>{children}</div>;

  return {
    motion: { div: stripMotionProps },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// ─── Data Dummy Game ───────────────────────────────────────────────────────────
const mockGame: Game = {
  id: 1,
  title: "Elden Ring",
  slug: "elden-ring",
  coverImage: "https://picsum.photos/seed/elden/400/600",
  screenshots: [
    "https://picsum.photos/seed/s1/1280/720",
    "https://picsum.photos/seed/s2/1280/720",
    "https://picsum.photos/seed/s3/1280/720",
  ],
  description: "An action RPG set in a vast open world.",
  longDescription: "Elden Ring is a 2022 action role-playing game...",
  genres: ["RPG", "Action"] as Genre[],
  platforms: ["PC", "PlayStation 5"] as Platform[],
  developer: "FromSoftware",
  publisher: "Bandai Namco",
  releaseDate: "2022-02-25",
  rating: 9.6,
  price: 699000,
  tags: ["Open World", "Souls-like"],
  featured: true,
};

// ─── Helper: Wrapper dengan WishlistContext ────────────────────────────────────
const createWishlistContext = (overrides = {}) => ({
  wishlist: [],
  wishlistIds: [],
  addToWishlist: jest.fn(),
  removeFromWishlist: jest.fn(),
  toggleWishlist: jest.fn(),
  isInWishlist: jest.fn().mockReturnValue(false),
  isHydrated: true,
  ...overrides,
});

const renderWithWishlist = (contextValue = createWishlistContext()) => {
  return render(
    <WishlistContext.Provider value={contextValue}>
      <GameCard game={mockGame} />
    </WishlistContext.Provider>
  );
};

// ─── Test Suite ────────────────────────────────────────────────────────────────
describe("GameCard", () => {
  it("menampilkan judul game dengan benar", () => {
    renderWithWishlist();
    expect(screen.getByText("Elden Ring")).toBeInTheDocument();
  });

  it("menampilkan rating game dengan benar", () => {
    renderWithWishlist();
    // Rating 9.6 harus ditampilkan sebagai "9.6"
    expect(screen.getByText("9.6")).toBeInTheDocument();
  });

  it("menampilkan harga game dalam format IDR", () => {
    renderWithWishlist();
    // Harga 699000 harus diformat menjadi "Rp699.000" atau serupa
    expect(screen.getByText(/699/)).toBeInTheDocument();
  });

  it("menampilkan genre game (hanya genre pertama yang ditampilkan)", () => {
    renderWithWishlist();
    // Komponen menggunakan .slice(0, 1), hanya genre pertama yang dirender
    expect(screen.getByText("RPG")).toBeInTheDocument();
    expect(screen.queryByText("Action")).not.toBeInTheDocument();
  });

  it("link mengarah ke halaman detail yang benar", () => {
    renderWithWishlist();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/games/elden-ring");
  });

  it("tombol wishlist memanggil toggleWishlist saat diklik", () => {
    const mockContext = createWishlistContext();
    renderWithWishlist(mockContext);

    // Cari tombol wishlist (Heart button)
    const wishlistButton = screen.getByRole("button");
    fireEvent.click(wishlistButton);

    expect(mockContext.toggleWishlist).toHaveBeenCalledWith(mockGame.id);
    expect(mockContext.toggleWishlist).toHaveBeenCalledTimes(1);
  });

  it("icon Heart terisi saat game ada di wishlist", () => {
    const mockContext = createWishlistContext({
      isInWishlist: jest.fn().mockReturnValue(true),
      wishlistIds: [1],
    });
    renderWithWishlist(mockContext);

    const button = screen.getByRole("button");
    // Tombol wishlist aktif harus memiliki class berbeda
    expect(button).toHaveClass("bg-primary-500");
  });

  it("menampilkan cover image dengan alt text yang benar", () => {
    renderWithWishlist();
    const img = screen.getByAltText("Elden Ring");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockGame.coverImage);
  });
});
