import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="container px-4 md:px-8 mx-auto py-12 md:py-20 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">Secure Checkout</h1>
        <p className="text-slate-500">Complete your purchase to get instant access.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-5 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">1</span>
              Account Details
            </h2>
            <Card className="border-slate-200 shadow-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</label>
                  <Input id="email" type="email" placeholder="you@example.com" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-primary/20" />
                  <p className="text-xs text-slate-500 mt-1.5">We'll send your receipt and download links here.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-5 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">2</span>
              Payment Method
            </h2>
            <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="rounded-xl border-2 border-primary bg-primary/5 p-4 flex items-center gap-4 cursor-pointer">
                  <input type="radio" id="card" name="payment" className="w-4 h-4 text-primary accent-primary" defaultChecked />
                  <label htmlFor="card" className="font-semibold text-slate-900 cursor-pointer flex-1 flex items-center justify-between">
                    Credit or Debit Card
                    <div className="flex gap-1.5">
                      <div className="w-9 h-6 bg-slate-200 rounded-sm"></div>
                      <div className="w-9 h-6 bg-slate-200 rounded-sm"></div>
                    </div>
                  </label>
                </div>
                
                {/* Mock Card Input Area */}
                <div className="mt-5 space-y-4">
                  <Input placeholder="Card number" className="h-12 bg-white border-slate-200" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM / YY" className="h-12 bg-white border-slate-200" />
                    <Input placeholder="CVC" className="h-12 bg-white border-slate-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <h2 className="text-xl font-semibold text-slate-900 mb-5">Order Summary</h2>
            <Card className="border-slate-200 shadow-sm bg-slate-50/50 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-16 bg-slate-200 rounded-lg shrink-0 border border-slate-200/60"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900 line-clamp-2 leading-snug">SaaS Dashboard UI Kit - Pro Edition</h3>
                    <p className="text-sm text-slate-500 mt-1">Instant Digital Download</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-5 border-t border-slate-200 mb-6 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>$49.00</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl text-slate-900 pt-4 border-t border-slate-200 mt-2">
                    <span>Total</span>
                    <span>$49.00</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex gap-2">
                    <Input placeholder="Coupon Code" className="bg-white h-11 border-slate-200" />
                    <Button variant="outline" className="shrink-0 h-11 bg-white">Apply</Button>
                  </div>
                </div>

                <Link href="/success" className="w-full">
                  <Button size="lg" className="w-full h-14 rounded-xl text-base font-semibold shadow-sm">
                    <Lock className="w-4 h-4 mr-2" /> Pay $49.00
                  </Button>
                </Link>
                
                <p className="text-xs text-center text-slate-500 mt-5 flex items-center justify-center gap-1.5 font-medium">
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
