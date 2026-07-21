import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Copy, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="container px-4 md:px-8 mx-auto py-16 md:py-24 max-w-3xl">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-24 h-24 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-8 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Payment Successful!</h1>
        <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
          Thank you for your purchase. We've sent a receipt to your email. You can access your digital products immediately below.
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm mb-10 overflow-hidden rounded-2xl">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-600">Order #ORD-8492-AX</span>
          <span className="text-sm font-medium text-slate-400">Today at 10:42 AM</span>
        </div>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-24 bg-slate-100 border border-slate-200 rounded-xl shrink-0"></div>
            <div className="flex-1 text-center md:text-left w-full">
              <h3 className="text-xl font-bold text-slate-900 mb-1">SaaS Dashboard UI Kit - Pro Edition</h3>
              <p className="text-sm text-slate-500 mb-5">Lifetime Access</p>
              
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex items-center justify-between w-full">
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">License Key</p>
                  <code className="text-slate-900 font-mono font-bold tracking-wider text-sm md:text-base">XXXX-XXXX-XXXX-XXXX</code>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary bg-white border border-slate-200 shadow-sm">
                  <Copy className="w-4 h-4 md:mr-1.5" /> <span className="hidden md:inline">Copy</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full flex-1 h-14 rounded-xl text-base font-semibold shadow-sm">
              <Download className="w-5 h-5 mr-2" /> Download Assets
            </Button>
            <Button size="lg" variant="outline" className="w-full flex-1 h-14 rounded-xl text-base font-semibold bg-white border-slate-200 text-slate-700">
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link href="/">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900 font-medium">
             Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
