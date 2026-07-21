import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/features/product/components/ProductCardSkeleton";
import { Container } from "@/components/layout/container";

export default function ProductsLoading() {
  return (
    <Container className="py-12 md:py-20 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Skeleton className="h-10 w-full md:w-48" />
          <Skeleton className="h-10 w-32 hidden md:block" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
}
