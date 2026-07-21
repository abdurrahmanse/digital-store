"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  onLoadMore: () => void;
  hasMore: boolean;
  label?: string;
}

export function Pagination({ onLoadMore, hasMore, label = "Load More" }: PaginationProps) {
  if (!hasMore) return null;

  return (
    <div className="mt-12 flex justify-center">
      <Button 
        variant="outline" 
        size="lg" 
        className="px-8 rounded-full"
        onClick={onLoadMore}
      >
        {label}
      </Button>
    </div>
  );
}
