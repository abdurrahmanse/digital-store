import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Zap, Download } from "lucide-react";

export default function ProductDetailsPage() {
  return (
    <div className="container px-4 md:px-8 mx-auto py-12 md:py-20 max-w-screen-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-6">
          <div className="aspect-[4/3] rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
            <span className="text-slate-400 font-medium">Product Box Art / Image</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center hover:border-primary cursor-pointer transition-colors">
                <span className="text-xs text-slate-400">Thumb {i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Checkout */}
        <div className="flex flex-col">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/10">Software Licenses</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
              Windows 11 Pro License Key
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Official retail license key for Windows 11 Professional. Instant delivery via email and dashboard. Bindable to your Microsoft account for lifetime activation.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-slate-900 tracking-tight">$29.00</span>
              <span className="text-lg text-slate-400 line-through mb-1">$199.00</span>
              <Badge variant="destructive" className="mb-2 bg-red-100 text-red-700 border-transparent">Save 85%</Badge>
            </div>
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-2">
              <Shield className="w-4 h-4 text-emerald-500" /> Secure payment via Stripe
            </p>
          </div>

          <Card className="mb-10 border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-slate-50/50">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <Link href="/checkout" className="w-full">
                  <Button size="lg" className="w-full text-base font-semibold h-14 rounded-xl shadow-sm">
                    Buy Now — $29.00
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/60 mt-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <Zap className="w-4 h-4 text-amber-500" /> Instant Key Delivery
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <Shield className="w-4 h-4 text-primary" /> Genuine Guarantee
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-xl text-slate-900 mb-5 tracking-tight">What's Included</h3>
              <ul className="space-y-4">
                {[
                  "1x Retail License Key (25 characters)",
                  "Official Microsoft Download Link",
                  "Lifetime Activation for 1 PC",
                  "24/7 Installation Support",
                  "All Pro features (BitLocker, Hyper-V, Remote Desktop)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <div className="bg-emerald-100 rounded-full p-1 mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-8 border-t border-slate-100">
              <h3 className="font-semibold text-xl text-slate-900 mb-5 tracking-tight">Delivery Method</h3>
              <div className="flex gap-3">
                <Badge variant="outline" className="px-4 py-1.5 bg-white text-sm font-medium rounded-lg border-primary text-primary">License Key</Badge>
                <Badge variant="outline" className="px-4 py-1.5 bg-white text-sm font-medium rounded-lg">Email Delivery</Badge>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
