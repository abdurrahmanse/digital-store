import { Suspense } from "react";
import { ProductsClient } from "./ProductsClient";
import { prisma } from "@/lib/prisma";
import { SortSelect } from "@/components/SortSelect";

export default async function ProductsPage({ searchParams }: { searchParams?: Promise<{ sort?: string }> }) {
  const params = await searchParams;
  const sort = params?.sort ?? "latest";

  // Determine orderBy based on sort param
  const orderBy: any = {};
  if (sort === "latest") {
    orderBy.createdAt = "desc";
  } else if (sort === "price-asc") {
    orderBy.price = "asc";
  } else if (sort === "price-desc") {
    orderBy.price = "desc";
  }

  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy,
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
