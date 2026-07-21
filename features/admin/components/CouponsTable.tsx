"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Ticket } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

type Coupon = {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  isActive: boolean;
  usageLimit: number | null;
  usedCount: number;
  expiresAt: Date | null;
  createdAt: Date;
};

export function CouponsTable({ 
  coupons,
  currentPage,
  totalPages
}: { 
  coupons: Coupon[];
  currentPage: number;
  totalPages: number;
}) {
  return (
    <Card className="border-slate-200 dark:border-slate-800/60 shadow-none rounded-xl bg-white dark:bg-slate-950 overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 tracking-tight">Discount Coupons</CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Create and manage promotional codes.</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Coupon
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {coupons.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>No coupons active.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wide">Code</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Discount</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Usage</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Status</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Expires</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-slate-400" />
                        <code className="font-mono text-slate-700 dark:text-slate-300 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-sm uppercase">
                          {coupon.code}
                        </code>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                      {coupon.discountType === "PERCENTAGE" 
                        ? `${coupon.discountValue}% OFF` 
                        : `৳${(coupon.discountValue / 100).toFixed(2)} OFF`}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {coupon.usedCount} / {coupon.usageLimit || "∞"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        coupon.isActive 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}>
                        {coupon.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400" suppressHydrationWarning>
                      {coupon.expiresAt 
                        ? new Date(coupon.expiresAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })
                        : "Never"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </Card>
  );
}
