import { Game } from "../types/game";
import { Badge } from "../ui/Badge";

export const GameInfo = ({ game }: { game: Game }) => {
  return (
    <div className="space-y-12">
      {/* Deskripsi Panjang */}
      <section className="space-y-6">
        <h3 className="text-heading-lg border-l-4 border-primary-500 pl-4">Tentang Game</h3>
        <p className="text-body-lg text-text-secondary leading-relaxed text-justify">
          {game.longDescription}
        </p>
      </section>

      {/* Info Tambahan Mobile Only (akan disembunyikan di desktop karena sudah ada di sidebar) */}
      <section className="lg:hidden space-y-6 pt-6 border-t border-border-subtle">
        <div className="space-y-4">
          <h4 className="text-label-sm text-text-muted uppercase tracking-wider">Platform</h4>
          <div className="flex flex-wrap gap-2">
            {game.platforms.map((p) => (
              <Badge key={p} variant="platform">{p}</Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-label-sm text-text-muted uppercase tracking-wider">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span key={tag} className="text-body-sm text-text-muted px-3 py-1 rounded-lg bg-bg-elevated border border-border-subtle">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};