export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4 animate-pulse">
          <div className="h-48 w-full bg-muted rounded-xl" />
          <div className="space-y-2">
            <div className="h-5 w-2/3 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
