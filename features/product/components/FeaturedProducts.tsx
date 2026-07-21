import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { ProductCard } from "@/features/product/components/ProductCard";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function FeaturedProducts() {
  // Fetch up to 10 active products from the database
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  const featuredProducts = products.map((p) => ({
    title: p.name,
    price: p.price,
    originalPrice: p.discountPrice || undefined,
    slug: p.slug,
    imageUrl: p.imageUrl || "",
  }));

  if (featuredProducts.length === 0) {
    return null; // Return nothing if no products are available
  }

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
