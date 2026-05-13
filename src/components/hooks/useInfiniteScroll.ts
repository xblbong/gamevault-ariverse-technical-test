"use client";

import { useState, useMemo } from "react";

export function useInfiniteScroll<T>(items: T[], batchSize: number = 12) {
  const [displayCount, setDisplayCount] = useState(batchSize);

  const displayedItems = useMemo(() => {
    return items.slice(0, displayCount);
  }, [items, displayCount]);

  const hasMore = displayCount < items.length;

  const loadMore = () => {
    if (hasMore) {
      setDisplayCount((prev) => prev + batchSize);
    }
  };

  const resetScroll = () => setDisplayCount(batchSize);

  return { displayedItems, hasMore, loadMore, resetScroll };
}