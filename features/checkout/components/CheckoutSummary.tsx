"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";

import { CartItemList } from "./CartItemList";
import { CouponInput } from "./CouponInput";

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
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string; discountType: string; discountValue: number} | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const { items, getTotalPrice, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCartCheckout = !product;
  const cartItems = isCartCheckout ? items : [];
  
  // Calculate total price based on single product or cart
  const totalPrice = isCartCheckout ? getTotalPrice() : (product?.price || 0);
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "PERCENTAGE") {
      discountAmount = Math.floor((totalPrice * appliedCoupon.discountValue) / 100);
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }
  
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  const priceFormatted = (totalPrice / 100).toFixed(2);
  const discountFormatted = (discountAmount / 100).toFixed(2);
  const finalPriceFormatted = (finalPrice / 100).toFixed(2);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setAppliedCoupon(data);
        toast.success("Coupon applied!");
      } else {
        toast.error(data.error || "Invalid coupon code");
        setAppliedCoupon(null);
      }
    } catch (err) {
      toast.error("Error validating coupon");
    } finally {
      setCouponLoading(false);
    }
  };

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
      ? { email, items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity })), couponCode: appliedCoupon?.code }
      : { email, items: [{ productId: product!.id, quantity: 1 }], couponCode: appliedCoupon?.code };
    
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
          router.push(`/success?orderId=${res.orderId}`);
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
      <h2 className="text-xl font-semibold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Order Summary</h2>
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl">
        <CardContent className="p-6">
          
          <CartItemList 
            isCartCheckout={isCartCheckout}
            product={product}
            cartItems={cartItems}
          />
          
          <div className="space-y-3 pt-5 border-t border-slate-200 dark:border-slate-800 mb-6 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span>৳{priceFormatted}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Discount ({appliedCoupon.code})</span>
                <span>-৳{discountFormatted}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Tax</span>
              <span>৳0.00</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-slate-800 mt-2">
              <span>Total</span>
              <span>৳{finalPriceFormatted}</span>
            </div>
          </div>

          <CouponInput 
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            appliedCoupon={appliedCoupon}
            setAppliedCoupon={setAppliedCoupon}
            couponLoading={couponLoading}
            handleApplyCoupon={handleApplyCoupon}
          />

          <form id="checkout-form" onSubmit={handleSubmit} className="w-full">
            <Button type="submit" disabled={loading || (isCartCheckout && cartItems.length === 0)} size="lg" className="w-full h-14 rounded-xl text-base font-semibold shadow-sm text-white">
              <Lock className="w-4 h-4 mr-2" /> {loading ? `Processing...` : `Pay ৳${finalPriceFormatted}`}
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
