import { useState, useMemo } from "react";

export function useProductFilters(allProducts: any[], initialSearchQuery: string = "") {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setVisibleCount(6);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(6);
  };

  const handleReset = () => {
    setSelectedCategory("All Products");
    setSelectedTypes([]);
    setVisibleCount(6);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Mock category mapping
      const catName = product.category?.name || "Software Licenses";
      const categoryMatch = selectedCategory === "All Products" || catName === selectedCategory;
      
      // Map productType enum to label
      const typeLabel = product.productType === "LICENSE" ? "License Key" : 
                        product.productType === "SUBSCRIPTION" ? "Subscription" : "Download";
      
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(typeLabel);
      const searchMatch = !initialSearchQuery || product.title.toLowerCase().includes(initialSearchQuery);
      
      return categoryMatch && typeMatch && searchMatch;
    });
  }, [allProducts, selectedCategory, selectedTypes, initialSearchQuery]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return {
    selectedCategory,
    selectedTypes,
    handleCategoryChange,
    handleTypeChange,
    handleReset,
    filteredProducts,
    displayedProducts,
    hasMore,
    loadMore
  };
}
