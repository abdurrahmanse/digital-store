import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { ProductCard } from "@/features/product/components/ProductCard";
import { Sparkles, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { 
      isActive: true,
      isFeatured: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 8,
  });

  const featuredProductsList = products.map((p) => ({
    title: p.name,
    price: p.price,
    originalPrice: p.discountPrice || undefined,
    slug: p.slug,
    imageUrl: p.imageUrl || "",
  }));

  if (featuredProductsList.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-white dark:bg-slate-950/50 py-16 md:py-24">
      <div className="container px-4 md:px-8 mx-auto relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-400 dark:hover:bg-indigo-900/50 transition-colors border-none flex items-center w-fit gap-1.5 px-3 py-1 text-sm font-semibold shadow-sm">
                <Sparkles className="w-4 h-4 fill-current" />
                Featured Selections
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-5xl mb-4">
                Staff Picks
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Our hand-picked selection of premium tools and resources to help you create your best work.
              </p>
            </div>
            <Link href="/products" className="shrink-0">
              <Button variant="outline" className="hidden md:flex group rounded-full px-8 h-12 border-border/50 hover:border-primary/50 transition-all">
                Browse all products
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
              </Button>
            </Link>
          </div>
        </FadeIn>
        
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
          {featuredProductsList.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard {...product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/products" className="w-full max-w-sm">
            <Button variant="outline" className="w-full rounded-full h-12 border-border/50">Browse all products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
