"use client";

import { useSearchParams } from "next/navigation";
import { SortSelect } from "@/features/product/components/SortSelect";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import { CategoryFilter } from "@/features/product/components/CategoryFilter";
import { useProductFilters } from "@/features/product/hooks/useProductFilters";
import { Search } from "lucide-react";
import { Container } from "@/components/layout/container";

export function ProductsClient({ allProducts }: { allProducts: any[] }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const {
    selectedCategory,
    selectedTypes,
    handleCategoryChange,
    handleTypeChange,
    handleReset,
    filteredProducts,
    displayedProducts,
    hasMore,
    loadMore
  } = useProductFilters(allProducts, searchQuery);

  return (
    <Container className="py-12 md:py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-2">Browse our entire collection of digital products.</p>
        </div>
        <div className="shrink-0">
          <SortSelect />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          selectedTypes={selectedTypes}
          onCategoryChange={handleCategoryChange}
          onTypeChange={handleTypeChange}
          onReset={handleReset}
        />

        <div className="flex-1">
          {displayedProducts.length > 0 ? (
            <ProductGrid products={displayedProducts} />
          ) : (
            <EmptyState 
              title="No products found"
              description="Try adjusting your filters or search query to find what you're looking for."
              icon={<Search className="w-8 h-8" />}
            />
          )}
          
          <Pagination 
            hasMore={hasMore} 
            onLoadMore={loadMore} 
            label="Load More Products"
          />
        </div>
      </div>
    </Container>
  );
}
