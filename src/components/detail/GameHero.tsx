"use client";

import Image from "next/image";
import { Star, Calendar, Building2, Rocket } from "lucide-react";
import { Badge } from "../ui/Badge";
import { WishlistButton } from "../ui/WishlistButton";
import { Game } from "../types/game";
import { cn, formatPrice, getRatingColor } from "../lib/utils";

export const GameHero = ({ game }: { game: Game }) => {
    return (
        <section className="relative w-full py-12 md:py-20 overflow-hidden">
            {/* Background Blur Effect */}
            <div className="absolute inset-0 -z-10">
                <Image src={game.coverImage} alt="" fill className="object-cover opacity-20 blur-3xl scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-bg-base/0 via-bg-base/80 to-bg-base" />
            </div>

            <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left: Cover Image */}
                <div className="lg:col-span-4 flex justify-center">
                    <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-border-strong shadow-2xl">
                        <Image src={game.coverImage} alt={game.title} fill priority sizes="(max-width: 1024px) 100vw, 400px" className="object-cover" />
                    </div>
                </div>

                {/* Right: Info */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {game.genres.map((g) => (
                                <Badge key={g} variant="genre">{g}</Badge>
                            ))}
                        </div>
                        <h1 className="text-display-lg md:text-display-xl leading-none">{game.title}</h1>

                        <div className="flex flex-wrap items-center gap-6 text-text-secondary">
                            <div className="flex items-center gap-2">
                                <Star className="text-warning fill-warning" size={20} />
                                <span className={cn("text-heading-md font-bold", getRatingColor(game.rating))}>
                                    {game.rating.toFixed(1)} / 10
                                </span>
                            </div>
                            <div className="flex items-center gap-2 border-l border-border-strong pl-6">
                                <Calendar size={18} />
                                <span className="text-body-md">{new Date(game.releaseDate).getFullYear()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-bg-surface/50 p-6 rounded-2xl border border-border-subtle backdrop-blur-sm">
                        <div className="space-y-1">
                            <p className="text-label-sm text-text-muted flex items-center gap-2"><Building2 size={14} /> Developer</p>
                            <p className="font-semibold">{game.developer}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-label-sm text-text-muted flex items-center gap-2"><Rocket size={14} /> Publisher</p>
                            <p className="font-semibold">{game.publisher}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                        <div className="space-y-1">
                            <p className="text-label-sm text-text-muted">Harga Sekarang</p>
                            <p className="text-display-lg text-accent-cyan leading-none">{formatPrice(game.price)}</p>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto pt-2 sm:pt-0">
                            <WishlistButton gameId={game.id} className="h-14 px-8 text-base flex-1 sm:flex-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
