import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, ShieldCheck } from "lucide-react";
import { createOrder } from "@/features/checkout/actions";
import { prisma } from "@/lib/prisma";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ productId?: string }> }) {
  const params = await searchParams;
  const productId = params.productId;
  
  // Try to fetch the product. If not found or no ID provided, fallback to a mocked state or error
  const product = productId ? await prisma.product.findUnique({
    where: { id: productId }
  }) : null;

  if (!product) {
    return (
      <div className="container px-4 md:px-8 mx-auto py-12 md:py-20 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">Product Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">The product you are trying to checkout does not exist or was not specified.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  const priceFormatted = (product.price / 100).toFixed(2);

  return (
    <div className="container px-4 md:px-8 mx-auto py-12 md:py-20 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">Secure Checkout</h1>
        <p className="text-slate-500 dark:text-slate-400">Complete your purchase to get instant access.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">1</span>
              Account Details
            </h2>
            <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  {/* The form will wrap the entire page layout or just be linked to these inputs via form attribute */}
                  <Input form="checkout-form" name="email" id="email" type="email" required placeholder="you@example.com" className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-primary/20" />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">We'll send your receipt and download links here.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">2</span>
              Payment Method
            </h2>
            <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="rounded-xl border-2 border-primary bg-primary/5 dark:bg-primary/10 p-4 flex items-center gap-4 cursor-pointer">
                  <input type="radio" id="card" name="payment" className="w-4 h-4 text-primary accent-primary" defaultChecked />
                  <label htmlFor="card" className="font-semibold text-slate-900 dark:text-white cursor-pointer flex-1 flex items-center justify-between">
                    Credit or Debit Card
                    <div className="flex gap-1.5">
                      <div className="w-9 h-6 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                      <div className="w-9 h-6 bg-slate-200 dark:bg-slate-800 rounded-sm"></div>
                    </div>
                  </label>
                </div>
                
                {/* Mock Card Input Area */}
                <div className="mt-5 space-y-4">
                  <Input placeholder="Card number" className="h-12 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM / YY" className="h-12 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                    <Input placeholder="CVC" className="h-12 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
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
                  <Button type="submit" size="lg" className="w-full h-14 rounded-xl text-base font-semibold shadow-sm text-white">
                    <Lock className="w-4 h-4 mr-2" /> Pay ৳{priceFormatted}
                  </Button>
                </form>
                
                <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-5 flex items-center justify-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Secured by 256-bit SSL encryption
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
