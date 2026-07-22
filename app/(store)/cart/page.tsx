"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { PriceDisplay } from "@/components/shared/PriceDisplay";

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Container className="py-12 md:py-20 min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      </Container>
    );
  }

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <Container className="py-12 md:py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="bg-primary/10 p-4 rounded-full mb-6">
          <ShoppingCart className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
          Your cart is empty
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our digital products and find something you love.
        </p>
        <Link href="/products">
          <Button size="lg" className="rounded-xl px-8">
            Continue Shopping
          </Button>
        </Link>
      </Container>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <Container className="py-12 md:py-20">
      <h1 className="text-3xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="border-border shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                {/* Product Image */}
                <div className="w-full sm:w-24 h-24 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative border border-border">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col sm:flex-row justify-between w-full gap-4">
                  <div className="flex-1">
                    <Link href={`/products/${item.slug}`} className="hover:underline">
                      <h3 className="font-semibold text-base sm:text-lg line-clamp-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="mt-2 text-primary font-bold text-lg">
                      ৳{(item.price / 100).toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4 sm:gap-2">
                    <div className="flex items-center border border-border rounded-lg bg-background">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-l-lg transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium text-sm">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-r-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 p-2 sm:p-0 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <Card className="border-border shadow-sm rounded-2xl bg-muted/30">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>৳{(totalPrice / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>৳0.00</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>৳{(totalPrice / 100).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full h-14 rounded-xl text-base font-semibold shadow-sm"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Link href="/products" className="block w-full">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full h-12 rounded-xl text-sm"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
