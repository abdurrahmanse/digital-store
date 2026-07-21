import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { ProductCard } from "@/features/product/components/ProductCard";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/layout/container";

export async function BestSellingProducts() {
  // 1. Get product IDs sorted by count of completed order items
  const topOrderItems = await prisma.orderItem.groupBy({
    by: ['productId'],
    where: {
      order: {
        status: { in: ['COMPLETED', 'PAID'] }
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
  
  if (topOrderItems.length > 0) {
    // 2. Fetch the actual products
    const productIds = topOrderItems.map(item => item.productId);
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
    // Fallback: If no sales data, just fetch 4 latest products
    products = await prisma.product.findMany({
      where: { isActive: true, isFeatured: false },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });
  }

  const featuredProducts = products.map((p) => ({
    title: p.name,
    price: p.price,
    originalPrice: p.discountPrice || undefined,
    slug: p.slug,
    imageUrl: p.imageUrl || "",
  }));

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-t border-border bg-background/50 py-12 md:py-20">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <Container className="relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none">
                Best Sellers
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-5xl mb-4">
                Most Popular Products
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Explore our best-selling software, subscriptions, and assets trusted by thousands of creators and professionals.
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
        
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
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
      </Container>
    </section>
  );
}
