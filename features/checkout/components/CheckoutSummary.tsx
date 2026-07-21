import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { Lock, ShieldCheck } from "lucide-react";
import { createOrder } from "@/features/checkout/actions";

interface CheckoutSummaryProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
  };
}

export function CheckoutSummary({ product }: CheckoutSummaryProps) {
  const priceFormatted = (product.price / 100).toFixed(2);

  return (
    <div className="sticky top-24">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5">Order Summary</h2>
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-6">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-20 h-16 rounded-lg shrink-0 object-cover border border-slate-200/60 dark:border-slate-700/60" />
            ) : (
              <div className="w-20 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0 border border-slate-200/60 dark:border-slate-700/60"></div>
            )}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug">{product.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Instant Digital Delivery</p>
            </div>
          </div>
          
          <div className="space-y-3 pt-5 border-t border-slate-200 dark:border-slate-800 mb-6 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span>৳{priceFormatted}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Tax</span>
              <span>৳0.00</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-slate-800 mt-2">
              <span>Total</span>
              <span>৳{priceFormatted}</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex gap-2">
              <Input placeholder="Coupon Code" className="bg-white dark:bg-slate-950 h-11 border-slate-200 dark:border-slate-800" />
              <Button type="button" variant="outline" className="shrink-0 h-11 bg-white dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-white">Apply</Button>
            </div>
          </div>

          <form id="checkout-form" action={createOrder} className="w-full">
            <input type="hidden" name="productId" value={product.id} />
            <SubmitButton size="lg" className="w-full h-14 rounded-xl text-base font-semibold shadow-sm text-white" loadingText={`Paying ৳${priceFormatted}...`}>
              <Lock className="w-4 h-4 mr-2" /> Pay ৳{priceFormatted}
            </SubmitButton>
          </form>
          
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-5 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Secured by 256-bit SSL encryption
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
