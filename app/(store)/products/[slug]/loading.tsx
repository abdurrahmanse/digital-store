import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Skeleton */}
        <Skeleton className="aspect-video lg:aspect-square w-full rounded-2xl" />

        {/* Details Skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-10 md:h-12 w-3/4 mb-4" />
            <Skeleton className="h-8 w-24 mb-6" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-4/6" />
          </div>

          <div className="pt-6 border-t border-border">
            <Skeleton className="h-14 w-full md:w-64 rounded-xl" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
