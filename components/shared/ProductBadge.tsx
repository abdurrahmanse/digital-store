import { Badge } from "@/components/ui/badge";

interface ProductBadgeProps {
  type: "LICENSE" | "DOWNLOAD" | "SUBSCRIPTION" | "SERVICE";
  className?: string;
}

export function ProductBadge({ type, className = "" }: ProductBadgeProps) {
  const label = type === "LICENSE" ? "License Key" :
                type === "SUBSCRIPTION" ? "Subscription" :
                type === "SERVICE" ? "Service" : "Digital Download";
                
  return (
    <Badge variant="outline" className={`px-4 py-1.5 bg-background text-sm font-medium rounded-lg ${className}`}>
      {label}
    </Badge>
  );
}
