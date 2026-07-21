"use client";

import { Button } from "@/components/ui/button";
import { Download, Key, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

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
  licenseKey: string | null;
};

export function PurchaseCard({ purchase }: { purchase: Purchase }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (purchase.licenseKey) {
      navigator.clipboard.writeText(purchase.licenseKey);
      setCopied(true);
      toast.success("License key copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
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
          {purchase.status !== "COMPLETED" ? (
            <div className="text-sm text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-900/20 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Your order is currently {purchase.status.toLowerCase()}. Access to files and licenses will be available once the order is completed.
            </div>
          ) : (
            <>
              {purchase.product.productType === "DOWNLOAD" && (
                <a href={purchase.product.fileUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button 
                    variant="outline" 
                    className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950 hover:text-slate-900 dark:text-white text-sm h-9 px-4 rounded-lg flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download File
                  </Button>
                </a>
              )}

              {purchase.product.productType === "LICENSE" && (
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">License Key</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 max-w-md px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 font-mono truncate">
                      {purchase.licenseKey || "Generating..."}
                    </code>
                    <Button
                      variant="outline"
                      onClick={handleCopy}
                      className="h-9 w-9 p-0 flex-shrink-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Key className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
