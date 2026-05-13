import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper untuk menggabungkan class Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper untuk format Rupiah
export function formatPrice(price: number) {
  if (price === 0) return "GRATIS";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

// Helper warna rating
export function getRatingColor(rating: number) {
  if (rating >= 9.0) return "text-rating-excellent";
  if (rating >= 7.0) return "text-rating-great";
  if (rating >= 5.0) return "text-rating-average";
  return "text-rating-poor";
}