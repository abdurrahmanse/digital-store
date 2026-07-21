import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function CheckoutForm() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">1</span>
          Account Details
        </h2>
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
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
  );
}
