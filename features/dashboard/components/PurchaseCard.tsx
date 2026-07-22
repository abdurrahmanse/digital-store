"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type Purchase = {
  id: string;
  purchaseDate: Date;
  pricePaid: number;
  product: {
    id: string;
    name: string;
    description: string;
    productType: "LICENSE" | "DOWNLOAD" | "SUBSCRIPTION" | "SERVICE";
    fileUrl: string | null;
    imageUrl: string | null;
  };
  status: string;
  deliveryType?: string;
  deliveryInfo?: any;
};

export function PurchaseCard({ purchase }: { purchase: Purchase }) {


  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-slate-300 transition-colors">
      <div className="flex-shrink-0 w-full md:w-48 h-32 bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden relative border border-slate-100 dark:border-slate-800">
        {purchase.product.imageUrl ? (
          <Image 
            src={purchase.product.imageUrl} 
            alt={purchase.product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow min-w-0">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold truncate bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                {purchase.product.name}
              </h3>
              <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-md uppercase ${
                purchase.status === "COMPLETED" || purchase.status === "PAID"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                  : purchase.status === "PROCESSING"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : purchase.status === "PENDING"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
              }`}>
                {purchase.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
              {purchase.product.description}
            </p>
          </div>
          <div className="text-right flex-shrink-0 hidden sm:block">
            <p className="text-sm font-medium text-slate-900 dark:text-white">৳{(purchase.pricePaid / 100).toFixed(2)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5" suppressHydrationWarning>
              {new Date(purchase.purchaseDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <OrderTimeline currentStatus={purchase.status} />

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            {purchase.status === "PENDING" && (
              <>
                <Link href={`/checkout?productId=${purchase.product.id}`}>
                  <Button className="bg-primary text-white h-9 px-4 rounded-lg">
                    Continue Payment
                  </Button>
                </Link>
                <Link href={`/dashboard/purchases/${purchase.id}`}>
                  <Button variant="outline" className="h-9 px-4 rounded-lg bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                    Order Details
                  </Button>
                </Link>
              </>
            )}

            {(purchase.status === "PROCESSING" || purchase.status === "CANCELLED" || purchase.status === "FAILED") && (
              <Link href={`/dashboard/purchases/${purchase.id}`}>
                <Button variant="outline" className="h-9 px-4 rounded-lg bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                  View Order Details
                </Button>
              </Link>
            )}

            {(purchase.status === "COMPLETED" || purchase.status === "PAID") && (
              <>
                <Link href={`/dashboard/my-products`} className="inline-block">
                  <Button 
                    variant="outline" 
                    className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950 hover:text-slate-900 dark:text-white text-sm h-9 px-4 rounded-lg flex items-center gap-2"
                  >
                    View Access Details
                  </Button>
                </Link>
                
                <Link href={`/dashboard/purchases/${purchase.id}`} className="sm:ml-auto">
                  <Button variant="ghost" className="h-9 px-4 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    Order Details
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderTimeline({ currentStatus }: { currentStatus: string }) {
  const steps = ["PENDING", "PROCESSING", "COMPLETED"];
  
  let currentIndex = steps.indexOf(currentStatus);
  if (currentStatus === "PAID") currentIndex = 1;

  if (currentStatus === "CANCELLED" || currentStatus === "FAILED") {
    return (
      <div className="text-sm text-rose-600 bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-100 dark:border-rose-900/20 inline-flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        Order was {currentStatus.toLowerCase()}.
      </div>
    );
  }

  // If status is somehow not in the steps and not cancelled/failed, default to first step
  if (currentIndex === -1) currentIndex = 0;

  return (
    <div className="w-full max-w-md pt-2 pb-6">
      <div className="flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full z-0"></div>
        {/* Progress Line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 rounded-full z-0 transition-all duration-500" 
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={step} className="relative z-10 flex flex-col items-center group">
              <div className="bg-white dark:bg-slate-950 p-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-500 ${
                  isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 
                  isCurrent ? 'bg-blue-500 border-blue-500 text-white shadow-[0_0_0_4px_rgba(59,130,246,0.15)] dark:shadow-[0_0_0_4px_rgba(59,130,246,0.2)]' : 
                  'bg-slate-50 border-slate-300 text-slate-400 dark:bg-slate-900 dark:border-slate-700'
                }`}>
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : index + 1}
                </div>
              </div>
              <span className={`absolute top-10 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap ${
                isCompleted ? 'text-emerald-600 dark:text-emerald-500' :
                isCurrent ? 'text-blue-600 dark:text-blue-500' :
                'text-slate-400 dark:text-slate-500'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
