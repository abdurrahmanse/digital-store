"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/features/product/components/ProductCard";
import { SortSelect } from "@/components/SortSelect";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Code, CreditCard, Globe, PenTool, Key, Download, Repeat } from "lucide-react";

const CATEGORIES = ["All Products", "Software Licenses", "Subscriptions", "Web & Hosting", "Creative & Learning"];
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "All Products": <LayoutGrid className="w-4 h-4" />,
  "Software Licenses": <Code className="w-4 h-4" />,
  "Subscriptions": <CreditCard className="w-4 h-4" />,
  "Web & Hosting": <Globe className="w-4 h-4" />,
  "Creative & Learning": <PenTool className="w-4 h-4" />
};

const PRODUCT_TYPES = ["License Key", "Download", "Subscription"];
const TYPE_ICONS: Record<string, React.ReactNode> = {
  "License Key": <Key className="w-4 h-4" />,
  "Download": <Download className="w-4 h-4" />,
  "Subscription": <Repeat className="w-4 h-4" />
};

export function ProductsClient({ allProducts }: { allProducts: any[] }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

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

  const filteredProducts = allProducts.filter(product => {
    // We mock the category mapping since Category is a relation in DB
    // For now we just use a generic matching if category name exists
    const catName = product.category?.name || "Software Licenses";
    const categoryMatch = selectedCategory === "All Products" || catName === selectedCategory;
    
    // Map productType enum to label
    const typeLabel = product.productType === "LICENSE" ? "License Key" : 
                      product.productType === "SUBSCRIPTION" ? "Subscription" : "Download";
    
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(typeLabel);
    const searchMatch = !searchQuery || product.title.toLowerCase().includes(searchQuery);
    return categoryMatch && typeMatch && searchMatch;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="container px-4 md:px-8 mx-auto py-12 md:py-20 max-w-screen-xl">
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
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  <input 
                    type="radio" 
                    name="category" 
                    className="rounded border-border text-primary focus:ring-primary h-4 w-4 bg-background" 
                    checked={selectedCategory === cat}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <span className="flex items-center gap-1.5">
                    {CATEGORY_ICONS[cat]}
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product Type</h3>
            <div className="space-y-2">
              {PRODUCT_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  <input 
                    type="checkbox" 
                    className="rounded border-border text-primary focus:ring-primary h-4 w-4 bg-background" 
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  <span className="flex items-center gap-1.5">
                    {TYPE_ICONS[type]}
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <Button variant="outline" className="w-full" onClick={handleReset}>
            Reset Filters
          </Button>
        </aside>

        <div className="flex-1">
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayedProducts.map((product) => (
                <ProductCard 
                  key={product.slug} 
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  imageUrl={product.imageUrl}
                  slug={product.slug}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center border border-border rounded-xl border-dashed">
              <h3 className="text-lg font-medium text-foreground">No products found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your filters or search query to find what you're looking for.</p>
              <Button variant="outline" className="mt-4" onClick={handleReset}>
                Reset Filters
              </Button>
            </div>
          )}
          
          {visibleCount < filteredProducts.length && (
            <div className="mt-12 flex justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 rounded-full"
                onClick={() => setVisibleCount(prev => prev + 6)}
              >
                Load More Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
