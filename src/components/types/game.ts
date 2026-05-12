export interface Game {
  id: number;
  title: string;
  slug: string;
  coverImage: string;         // URL gambar cover (gunakan RAWG API images / placeholder)
  screenshots: string[];      // Array URL screenshot (min. 3 per game)
  description: string;        // Deskripsi pendek (maks. 160 karakter)
  longDescription: string;    // Deskripsi panjang (min. 200 karakter)
  genres: Genre[];
  platforms: Platform[];
  developer: string;
  publisher: string;
  releaseDate: string;        // Format: "YYYY-MM-DD"
  rating: number;             // Skala 0.0 – 10.0
  price: number;              // Dalam IDR (0 = gratis)
  tags: string[];             // Array tag bebas
  featured: boolean;          // true = tampil di hero banner
}

export type Genre =
  | "Action"
  | "RPG"
  | "Strategy"
  | "Simulation"
  | "Sports"
  | "Horror"
  | "Adventure"
  | "Puzzle"
  | "Racing"
  | "Fighting"
  | "Shooter"
  | "Indie"
  | "MMORPG"
  | "Battle Royale";
 
export type Platform =
  | "PC"
  | "PlayStation 5"
  | "PlayStation 4"
  | "Xbox Series X"
  | "Xbox One"
  | "Nintendo Switch"
  | "Mobile"
  | "Mac";
 
export interface FilterState {
  search: string;
  genres: Genre[];
  platforms: Platform[];
  yearRange: [number, number];
  sortBy: SortOption;
}
 
export type SortOption =
  | "rating-desc"
  | "newest"
  | "price-asc"
  | "alphabetical";