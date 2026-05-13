export const GameCardSkeleton = () => {
  return (
    <div className="game-card group cursor-default border-border-subtle">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg-elevated">
        {/* Shimmer Effect */}
        <div className="skeleton h-full w-full" />
        
        {/* Skeleton Content */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex gap-2 mb-3">
            <div className="skeleton h-5 w-16 rounded-full" />
            <div className="skeleton h-5 w-16 rounded-full" />
          </div>
          <div className="skeleton h-7 w-3/4 mb-2 rounded-md" />
          <div className="skeleton h-5 w-1/3 rounded-md" />
        </div>
      </div>
    </div>
  );
};