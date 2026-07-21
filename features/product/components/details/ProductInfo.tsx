import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { ProductBadge } from "@/components/shared/ProductBadge";

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
        <ProductBadge type={productType} className="mb-4 text-primary bg-primary/10 border-transparent" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4 leading-tight">
          {name}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-8 mt-10">
        <div>
          <h3 className="font-semibold text-xl text-foreground mb-5 tracking-tight">What's Included</h3>
          <ul className="space-y-4">
            {whatsIncluded.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <div className="bg-emerald-100 dark:bg-emerald-900/40 rounded-full p-1 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-8 border-t border-border">
          <h3 className="font-semibold text-xl text-foreground mb-5 tracking-tight">Delivery Method</h3>
          <div className="flex gap-3">
            <ProductBadge type={productType} className="border-primary text-primary" />
            <Badge variant="outline" className="px-4 py-1.5 bg-background text-sm font-medium rounded-lg">Email Delivery</Badge>
          </div>
        </div>
      </div>
    </>
  );
}
