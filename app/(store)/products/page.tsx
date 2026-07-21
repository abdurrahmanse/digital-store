"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Code, CreditCard, Globe, PenTool, Key, Download, Repeat } from "lucide-react";

const allProducts = [
  { title: "Windows 11 Pro License Key", price: 2900, originalPrice: 19900, slug: "windows-11-pro", imageUrl: "/images/p1.jpg", category: "Software Licenses", type: "License Key" },
  { title: "JetBrains All Products Pack (1 Year)", price: 14900, slug: "jetbrains-pack", imageUrl: "/images/p2.jpg", category: "Software Licenses", type: "Subscription" },
  { title: "Premium VPS Hosting - 8GB RAM", price: 1200, originalPrice: 2400, slug: "vps-8gb", imageUrl: "/images/p3.jpg", category: "Web & Hosting", type: "Subscription" },
  { title: "Adobe Creative Cloud (1 Year)", price: 29900, originalPrice: 59900, slug: "adobe-cc", imageUrl: "/images/p1.jpg", category: "Creative & Learning", type: "Subscription" },
  { title: "ExpressVPN 12-Month Subscription", price: 9900, slug: "expressvpn-1yr", imageUrl: "/images/p2.jpg", category: "Subscriptions", type: "Subscription" },
  { title: "Mastering React 19 E-Book", price: 4900, slug: "react-ebook", imageUrl: "/images/p3.jpg", category: "Creative & Learning", type: "Download" },
  { title: "Microsoft Office 2021 Professional Plus", price: 4900, originalPrice: 34900, slug: "office-2021", imageUrl: "/images/p1.jpg", category: "Software Licenses", type: "License Key" },
  { title: "Figma Professional (1 Year)", price: 14400, slug: "figma-pro", imageUrl: "/images/p2.jpg", category: "Creative & Learning", type: "Subscription" },
  { title: "Node.js API Masterclass", price: 3900, slug: "nodejs-masterclass", imageUrl: "/images/p3.jpg", category: "Creative & Learning", type: "Download" },
  { title: "NordVPN 2-Year Plan", price: 8900, originalPrice: 19900, slug: "nordvpn-2yr", imageUrl: "/images/p1.jpg", category: "Subscriptions", type: "Subscription" },
  { title: "Dedicated Server - 32GB RAM", price: 4900, slug: "dedicated-32gb", imageUrl: "/images/p2.jpg", category: "Web & Hosting", type: "Subscription" },
  { title: "Next.js 15 Starter Template", price: 2900, slug: "nextjs-starter", imageUrl: "/images/p3.jpg", category: "Creative & Learning", type: "Download" },
];

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

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setVisibleCount(6); // Reset visible count on filter change
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(6); // Reset visible count on filter change
  };

  const handleReset = () => {
    setSelectedCategory("All Products");
    setSelectedTypes([]);
    setVisibleCount(6);
  };

  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategory === "All Products" || product.category === selectedCategory;
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);
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
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
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

        {/* Product Grid */}
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center text-muted-foreground">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
