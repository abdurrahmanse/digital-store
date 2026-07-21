import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { ProductCard } from "@/features/product/components/ProductCard";
import { ChevronRight } from "lucide-react";

export function FeaturedProducts() {
  // Mock data for featured products covering various digital products
  const featuredProducts = [
    { title: "Windows 11 Pro License Key", price: 2900, originalPrice: 19900, slug: "windows-11-pro", imageUrl: "/images/p1.jpg" },
    { title: "JetBrains All Products Pack (1 Year)", price: 14900, slug: "jetbrains-pack", imageUrl: "/images/p2.jpg" },
    { title: "Premium VPS Hosting - 8GB RAM", price: 1200, originalPrice: 2400, slug: "vps-8gb", imageUrl: "/images/p3.jpg" },
  ];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background/50 py-24 md:py-32">
      {/* Subtle background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container px-4 md:px-8 mx-auto relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none">
                Curated Collection
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-5xl mb-4">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Hand-picked software, subscriptions, and assets designed to elevate your workflow and unlock your creative potential.
              </p>
            </div>
            <Link href="/products" className="shrink-0">
              <Button variant="outline" className="hidden md:flex group rounded-full px-8 h-12 border-border/50 hover:border-primary/50 transition-all">
                Explore all products
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
              </Button>
            </Link>
          </div>
        </FadeIn>
        
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {featuredProducts.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard {...product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/products" className="w-full max-w-sm">
            <Button variant="outline" className="w-full rounded-full h-12 border-border/50">Explore all products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
