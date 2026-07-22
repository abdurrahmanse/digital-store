import { ProductBadge } from "@/components/shared/ProductBadge";
import { Check } from "lucide-react";

interface ProductInfoProps {
  name: string;
  description: string | null;
  productType: "LICENSE" | "DOWNLOAD" | "SUBSCRIPTION" | "SERVICE";
  whatsIncluded: string[];
}

export function ProductInfo({ name, description, productType, whatsIncluded }: ProductInfoProps) {
  return (
    <>
      <div className="mb-6">
        <ProductBadge type={productType} className="mb-3 text-primary bg-primary/10 border-transparent text-xs" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
          {name}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {whatsIncluded && whatsIncluded.length > 0 && (
        <div className="mt-8">
          <ul className="space-y-3">
            {whatsIncluded.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
