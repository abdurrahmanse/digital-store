interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({ price, originalPrice, className = "", size = "md" }: PriceDisplayProps) {
  const formattedPrice = (price / 100).toFixed(2);
  const formattedOriginalPrice = originalPrice ? (originalPrice / 100).toFixed(2) : null;

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const discountClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  };

  return (
    <div className={`flex items-end gap-2 ${className}`}>
      <span className={`font-bold text-foreground tracking-tight ${sizeClasses[size]}`}>
        ৳{formattedPrice}
      </span>
      {formattedOriginalPrice && (
        <span className={`font-medium text-muted-foreground line-through decoration-muted-foreground/50 mb-0.5 ${discountClasses[size]}`}>
          ৳{formattedOriginalPrice}
        </span>
      )}
    </div>
  );
}
