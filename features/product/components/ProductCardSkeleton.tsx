import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-border bg-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <CardContent className="flex flex-1 flex-col gap-2 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border p-5">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </CardFooter>
    </Card>
  );
}
