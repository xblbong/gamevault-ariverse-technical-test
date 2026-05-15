# GameVault 🎮

> Platform katalog game modern untuk para gamer Indonesia — temukan, eksplorasi, dan simpan game favoritmu ke wishlist.

**🌐 Live Demo:** [gamevault-two-theta.vercel.app](https://gamevault-two-theta.vercel.app)

**🎬 Video Demo:** [Lihat di Google Drive](https://drive.google.com/file/d/1OSV16l1dBVR-2ykQEsTmYOp_QkolQ2GQ/view?usp=sharing)

---

## 🚀 Cara Menjalankan Secara Lokal

### Prasyarat
- Node.js versi **18.x** ke atas
- npm versi **9.x** ke atas

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/username/gamevault-ariverse-technical-test.git
cd gamevault-ariverse-technical-test

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Menjalankan Unit Test

```bash
npm test
```

---

## 🛠️ Tech Stack & Alasan Pemilihan

| Teknologi | Versi | Alasan Pemilihan |
|---|---|---|
| **Next.js** | 16.x (App Router) | Framework yang diminta. App Router mendukung React Server Components, SSG per-route via `generateStaticParams`, dan file-based routing yang bersih. |
| **TypeScript** | 5.x | Type safety mengurangi bug runtime, terutama saat mengelola struktur data `Game` yang kompleks dengan banyak field. |
| **Tailwind CSS** | v4 | Utility-first yang cepat dan konsisten. Versi 4 via PostCSS plugin memberikan performa build yang lebih baik dari versi sebelumnya. |
| **Framer Motion** | 12.x | Animasi transisi halaman, stagger card, dan mobile drawer yang smooth tanpa boilerplate besar. |
| **next-themes** | 0.4.x | Integrasi dark/light mode paling mulus dengan Next.js App Router, zero layout shift. |
| **Lucide React** | Latest | Icon library yang konsisten, ringan, dan tree-shakeable. |
| **yet-another-react-lightbox** | 3.x | Lightbox screenshot yang accessible, customizable, dan ringan. |
| **Jest + Testing Library** | 30.x / 16.x | Setup unit testing yang terintegrasi langsung dengan Next.js via `next/jest`. |

**Alasan memilih Next.js vs SvelteKit:** Next.js dipilih karena familiaritas yang lebih tinggi, ekosistem yang lebih matang (terutama `next/image` untuk optimisasi gambar), dan dukungan komunitas yang luas untuk debugging cepat dalam timeline yang terbatas.

---

## 📁 Struktur Folder

```
gamevault/
├── __tests__/
│   └── GameCard.test.tsx        # Unit test komponen GameCard (8 test cases)
├── data/
│   └── games.json               # Data 30 game dummy dengan gambar Unsplash
├── scripts/
│   └── update-images.js         # Script utilitas untuk update URL gambar
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout (Navbar, Footer, Provider)
│   │   ├── page.tsx             # Homepage (/)
│   │   ├── not-found.tsx        # Global 404 page
│   │   ├── globals.css          # Design system & CSS custom properties
│   │   ├── games/
│   │   │   ├── page.tsx         # Katalog game (/games)
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Detail game (/games/[slug])
│   │   └── wishlist/
│   │       └── page.tsx         # Halaman wishlist (/wishlist)
│   └── components/
│       ├── catalog/             # Komponen halaman /games
│       │   ├── FilterPanel.tsx
│       │   ├── InfiniteGameList.tsx
│       │   ├── SearchBar.tsx
│       │   └── SortDropdown.tsx
│       ├── context/
│       │   └── WishlistContext.tsx   # Global wishlist state + localStorage
│       ├── detail/              # Komponen halaman /games/[slug]
│       │   ├── GameHero.tsx
│       │   ├── GameInfo.tsx
│       │   └── ScreenshotGallery.tsx
│       ├── home/                # Komponen homepage
│       │   ├── HeroBanner.tsx
│       │   └── GameGrid.tsx
│       ├── hooks/               # Custom React hooks
│       │   ├── useDebounce.ts
│       │   ├── useFilteredGames.ts
│       │   ├── useInfiniteScroll.ts
│       │   └── useWishlist.ts
│       ├── layout/              # Komponen layout global
│       │   ├── Navbar.tsx
│       │   └── Footer.tsx
│       ├── lib/                 # Utilities & constants
│       │   ├── motion.ts        # Framer Motion animation variants
│       │   └── utils.ts         # Helper functions (formatPrice, cn, dll)
│       ├── types/
│       │   └── game.ts          # TypeScript type definitions
│       ├── ui/                  # Shared UI components
│       │   ├── Badge.tsx
│       │   ├── Button.tsx
│       │   ├── GameCard.tsx
│       │   ├── GameCardSkeleton.tsx
│       │   ├── ThemeToggle.tsx
│       │   └── WishlistButton.tsx
│       └── wishlist/
│           ├── EmptyWishlist.tsx
│           └── WishlistGrid.tsx
├── jest.config.ts
├── jest.setup.ts
├── next.config.ts
└── tsconfig.json
```

---

## ✅ Daftar Fitur

### Fitur Wajib — Selesai ✅

| Fitur | Keterangan |
|---|---|
| **Homepage `/`** | Hero banner carousel otomatis (5 detik) untuk game `featured: true` + grid semua game |
| **Katalog `/games`** | Search by title (debounced 300ms), filter multi-select genre & platform, filter tahun rilis, sorting 4 opsi, infinite scroll |
| **Detail `/games/[slug]`** | Info lengkap, galeri screenshot dengan lightbox, tombol Add/Remove Wishlist |
| **Wishlist `/wishlist`** | Daftar tersimpan, hapus item, persistent via localStorage, skeleton loader |
| **404 Page** | Custom not-found page dengan tombol navigasi kembali |
| **Loading State** | Skeleton loader di katalog dan wishlist |
| **Empty State** | Pesan kosong untuk wishlist dan 0 hasil filter/search |
| **Image Optimization** | `next/image` dengan `sizes` yang tepat di semua komponen |
| **Deploy** | ✅ Live di Vercel |

### Bonus — Selesai ✅

| Bonus | Keterangan |
|---|---|
| **Dark/Light Mode** | Toggle tema via `next-themes`, default dark |
| **Animasi Transisi Halaman** | Framer Motion `pageVariants` di semua page |
| **Hover Effects** | Card hover dengan scale + image zoom |
| **Multi-select Filter** | Genre dan platform bisa dipilih lebih dari satu |
| **Unit Test** | 8 test cases untuk komponen `GameCard` (semua passing ✅) |

### Fitur yang Belum Diimplementasi

| Fitur | Catatan |
|---|---|
| **Accessibility lengkap** | ARIA labels baru ada di elemen kritis (wishlist button). Keyboard navigation belum optimal |
| **Range slider tahun** | Saat ini menggunakan dropdown kategori tahun, bukan range slider interaktif |

---

## ⚖️ Trade-off & Catatan Teknis

### Static Data Layer
Data game disimpan sebagai file JSON statis (`data/games.json`) dan dibaca langsung tanpa API call. Keputusan ini mempercepat load time (zero network request untuk data) dan memungkinkan full static generation via `generateStaticParams`, tapi mengorbankan kemampuan update data secara dinamis.

### Filter Tahun
Spesifikasi menyebutkan _"range tahun rilis"_. Implementasi saat ini menggunakan dropdown kategori (2024, 2023, 2022, ≤2021) yang lebih user-friendly untuk dataset kecil dibanding range slider, namun kurang fleksibel untuk dataset besar.

### Wishlist Persistence
Wishlist disimpan di `localStorage` hanya dengan **array ID game**, bukan objek game lengkap. Ini lebih efisien dan aman — data game selalu fresh dari `games.json`, tidak ada risiko stale data di storage. Hydration mismatch ditangani dengan flag `isHydrated`.

### Static vs Server Rendering
Halaman detail menggunakan `generateStaticParams` untuk pre-render saat build, memberikan TTFB sangat cepat. Trade-off-nya: jika data game berubah, perlu rebuild. Untuk proyek skala produksi, akan lebih baik menggunakan ISR (Incremental Static Regeneration).

### TypeScript Strict Types
Field `genres` dan `platforms` menggunakan union literal type (`Genre[]`, `Platform[]`) untuk type safety penuh. Konsekuensinya, test data harus menggunakan `as Genre[]` / `as Platform[]` cast.