import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { ProductCard } from "@/features/product/components/ProductCard";
import { Flame } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function TrendingProducts() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // 1. Get product IDs sorted by count of completed order items in the last 30 days
  const trendingItems = await prisma.orderItem.groupBy({
    by: ['productId'],
    where: {
      order: {
        status: { in: ['COMPLETED', 'PAID'] },
        createdAt: { gte: thirtyDaysAgo }
      },
      product: {
        isActive: true,
        isFeatured: false,
      }
    },
    _count: {
      productId: true,
    },
    orderBy: {
      _count: {
        productId: 'desc'
      }
    },
    take: 4,
  });

  let products = [];
  
  if (trendingItems.length > 0) {
    // 2. Fetch the actual products
    const productIds = trendingItems.map(item => item.productId);
    const fetchedProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
      }
    });
    
    // Sort them in the exact order they were returned from the aggregation
    products = productIds
      .map(id => fetchedProducts.find(p => p.id === id))
      .filter(Boolean) as typeof fetchedProducts;
  } else {
    // Fallback: If no recent sales data, fetch 4 different products (or just newest)
    products = await prisma.product.findMany({
      where: { isActive: true, isFeatured: false },
      orderBy: { createdAt: 'desc' },
      skip: 4, // Skip first 4 to differ from Best Sellers if possible
      take: 4,
    });

    // If skip returned nothing, just get something so the section isn't empty on a small DB
    if (products.length === 0) {
      products = await prisma.product.findMany({
        where: { isActive: true, isFeatured: false },
        orderBy: { name: 'asc' },
        take: 4,
      });
    }
  }

  const trendingProductsList = products.map((p) => ({
    title: p.name,
    price: p.price,
    originalPrice: p.discountPrice || undefined,
    slug: p.slug,
    imageUrl: p.imageUrl || "",
  }));

  if (trendingProductsList.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-t border-border bg-slate-50 dark:bg-slate-950 py-24 md:py-32">
      <div className="container px-4 md:px-8 mx-auto relative z-10">
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-16 gap-6">
            <div className="max-w-2xl flex flex-col items-center">
              <Badge variant="secondary" className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:hover:bg-orange-900/50 transition-colors border-none flex items-center gap-1.5 px-3 py-1 text-sm font-semibold shadow-sm">
                <Flame className="w-4 h-4 fill-current" />
                Trending Now
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-5xl mb-4">
                Hot & Trending
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                See what everyone is buying right now. These top-rated digital products are currently flying off the shelves.
              </p>
            </div>
          </div>
        </FadeIn>
        
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
          {trendingProductsList.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard {...product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <div className="mt-12 flex justify-center">
          <Link href="/products" className="w-full max-w-sm">
            <Button variant="outline" className="w-full rounded-full h-12 border-border/50">View trending items</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
