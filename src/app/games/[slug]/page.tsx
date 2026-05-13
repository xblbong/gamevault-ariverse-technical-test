import { Metadata } from "next";
import { notFound } from "next/navigation";
import gamesDataRaw from "../../../../data/games.json";
import { GameHero } from "@/components/detail/GameHero";
import { ScreenshotGallery } from "@/components/detail/ScreenshotGallery";
import { Badge } from "@/components/ui/Badge";
import * as motion from "framer-motion/client";
import { Game } from "@/components/types/game";
import { pageVariants } from "@/components/lib/motion";
import { GameInfo } from "@/components/detail/GameInfo";

const gamesData = gamesDataRaw as Game[];

// Spek 4.1: Pre-generate all static routes
export async function generateStaticParams() {
    return gamesData.map((game) => ({
        slug: game.slug,
    }));
}

// Spek Bonus: Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const game = gamesData.find((g) => g.slug === params.slug);
    if (!game) return { title: "Game Not Found" };
    return { title: `${game.title} - GameVault`, description: game.description };
}

export default function GameDetailPage({ params }: { params: { slug: string } }) {
    const game = gamesData.find((g) => g.slug === params.slug);

    if (!game) return notFound();

    return (
        <motion.main variants={pageVariants} initial="initial" animate="animate">
            {/* 1. Hero Section */}
            <GameHero game={game} />

            {/* 2. Content Section */}
            <div className="container-page py-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Left: Main Details */}
                <div className="lg:col-span-2 space-y-12">
                    <GameInfo game={game} />

                    <ScreenshotGallery screenshots={game.screenshots} />
                </div>

                {/* Right: Sidebar Info */}
                <aside className="space-y-8">
                    <div className="bg-bg-surface p-8 rounded-3xl border border-border-subtle space-y-8">
                        <div className="space-y-4">
                            <h4 className="text-label-sm text-text-muted">Platform Tersedia</h4>
                            <div className="flex flex-wrap gap-2">
                                {game.platforms.map((p) => (
                                    <Badge key={p} variant="platform" className="bg-bg-base border-border-strong px-3 py-1">
                                        {p}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-label-sm text-text-muted">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {game.tags.map((tag) => (
                                    <span key={tag} className="text-body-sm text-text-secondary px-3 py-1 rounded-lg bg-bg-elevated border border-border-subtle lowercase">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </motion.main>
    );
}