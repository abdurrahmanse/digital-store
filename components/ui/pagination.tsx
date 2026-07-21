"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (totalPages <= 1) {
    return null;
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    router.push(createPageURL(page));
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-8 px-2 text-slate-500 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Button>
        
        {/* Simple page numbers for now */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Logic to show a window of pages around current page
            let pageNum = i + 1;
            if (totalPages > 5) {
              if (currentPage > 3 && currentPage < totalPages - 1) {
                pageNum = currentPage - 2 + i;
              } else if (currentPage >= totalPages - 1) {
                pageNum = totalPages - 4 + i;
              }
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
                className={`h-8 w-8 p-0 ${
                  currentPage === pageNum
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "text-slate-500 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800"
                }`}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-8 px-2 text-slate-500 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>
    </div>
  );
}
