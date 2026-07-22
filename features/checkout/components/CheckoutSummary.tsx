"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";

interface CheckoutSummaryProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
  } | null;
}

export function CheckoutSummary({ product }: CheckoutSummaryProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, getTotalPrice, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCartCheckout = !product;
  const cartItems = isCartCheckout ? items : [];
  
  // Calculate total price based on single product or cart
  const totalPrice = isCartCheckout ? getTotalPrice() : (product?.price || 0);
  const priceFormatted = (totalPrice / 100).toFixed(2);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCartCheckout && cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    // Create the payload
    const payload = isCartCheckout 
      ? { email, items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity })) }
      : { email, items: [{ productId: product!.id, quantity: 1 }] };
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const res = await response.json();
      
      if (response.ok) {
        if (isCartCheckout) clearCart();
        
        if (res.url) {
          router.push(res.url);
        } else {
          router.push("/checkout/success");
        }
      } else {
        toast.error(res.error || "Failed to create order");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>;

  return (
    <div className="sticky top-24">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5">Order Summary</h2>
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl">
        <CardContent className="p-6">
          
          {/* Items Display */}
          <div className="max-h-[300px] overflow-y-auto mb-6 space-y-4 pr-2">
            {!isCartCheckout && product && (
              <div className="flex items-start gap-4">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg shrink-0 object-cover border border-slate-200/60 dark:border-slate-700/60" />
                ) : (
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0 border border-slate-200/60 dark:border-slate-700/60"></div>
                )}
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white line-clamp-2 leading-snug">{product.name}</h3>
                  <p className="text-sm font-semibold text-primary mt-1">৳{(product.price / 100).toFixed(2)}</p>
                </div>
              </div>
            )}

            {isCartCheckout && cartItems.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg shrink-0 object-cover border border-slate-200/60 dark:border-slate-700/60" />
                ) : (
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0 border border-slate-200/60 dark:border-slate-700/60"></div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug">{item.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-primary">৳{((item.price * item.quantity) / 100).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}

            {isCartCheckout && cartItems.length === 0 && (
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-4">Your cart is empty.</p>
            )}
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

          <form id="checkout-form" onSubmit={handleSubmit} className="w-full">
            <Button type="submit" disabled={loading || (isCartCheckout && cartItems.length === 0)} size="lg" className="w-full h-14 rounded-xl text-base font-semibold shadow-sm text-white">
              <Lock className="w-4 h-4 mr-2" /> {loading ? `Processing...` : `Pay ৳${priceFormatted}`}
            </Button>
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
