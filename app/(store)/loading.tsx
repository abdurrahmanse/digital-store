import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <Container className="py-12 md:py-20 animate-in fade-in duration-500">
      <div className="space-y-4 max-w-4xl mx-auto">
        <Skeleton className="h-12 w-3/4 md:w-1/2 rounded-lg" />
        <Skeleton className="h-6 w-full md:w-3/4 rounded-md" />
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl hidden md:block" />
          <Skeleton className="h-64 rounded-xl hidden lg:block" />
        </div>
      </div>
    </Container>
  );
}
