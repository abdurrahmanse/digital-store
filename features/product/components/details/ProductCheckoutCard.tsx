import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap } from "lucide-react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";

interface ProductCheckoutCardProps {
  productId: string;
  price: number;
  discountPrice: number | null;
}

export function ProductCheckoutCard({ productId, price, discountPrice }: ProductCheckoutCardProps) {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-end gap-3 mb-2">
          <PriceDisplay price={price} originalPrice={discountPrice || undefined} size="lg" />
          {discountPrice && (
            <Badge variant="destructive" className="mb-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-transparent">
              Sale
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-2">
          <Shield className="w-4 h-4 text-emerald-500" /> Secure payment via Stripe
        </p>
      </div>

      <Card className="mb-10 border-border shadow-sm rounded-2xl overflow-hidden bg-muted/30">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <Link href={`/checkout?productId=${productId}`} className="w-full">
              <Button size="lg" className="w-full text-base font-semibold h-14 rounded-xl shadow-sm">
                Buy Now — ৳{(price / 100).toFixed(2)}
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border mt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Zap className="w-4 h-4 text-amber-500" /> Instant Delivery
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Shield className="w-4 h-4 text-primary" /> Genuine Guarantee
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
