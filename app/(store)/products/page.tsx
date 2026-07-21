import { Suspense } from "react";
import { ProductsClient } from "./ProductsClient";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  const formattedProducts = products.map(p => ({
    title: p.name,
    price: p.price,
    originalPrice: p.discountPrice || undefined,
    slug: p.slug,
    imageUrl: p.imageUrl || "",
    category: p.category,
    productType: p.productType,
  }));

  return (
    <Suspense fallback={<div className="container py-20 text-center text-muted-foreground">Loading products...</div>}>
      <ProductsClient allProducts={formattedProducts} />
    </Suspense>
  );
}
