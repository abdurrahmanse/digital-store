"use client";

import { Button } from "@/components/ui/button";
import { Plus, Ticket } from "lucide-react";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { CouponActions } from "./CouponActions";
import { CouponModal } from "./CouponModal";
import { useState } from "react";

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
  const [createOpen, setCreateOpen] = useState(false);

  const header = (
    <PageHeader 
      title="Discount Coupons" 
      description="Create and manage promotional codes."
      action={
        <Button onClick={() => setCreateOpen(true)} className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Coupon
        </Button>
      }
    />
  );

  return (
    <>
      <DataTable
        header={header}
        columns={["Code", "Discount", "Usage", "Status", "Expires", "Actions"]}
      isEmpty={coupons.length === 0}
      emptyMessage="No coupons active."
      currentPage={currentPage}
      totalPages={totalPages}
    >
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
            <StatusBadge status={coupon.isActive ? "ACTIVE" : "INACTIVE"} />
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
          <td className="px-6 py-4 text-right">
            <CouponActions coupon={{
              id: coupon.id,
              code: coupon.code,
              discountType: coupon.discountType as any,
              discountValue: coupon.discountValue,
              usageLimit: coupon.usageLimit || "",
              isActive: coupon.isActive
            }} />
          </td>
        </tr>
      ))}
      </DataTable>

      {createOpen && (
        <CouponModal open={createOpen} setOpen={setCreateOpen} />
      )}
    </>
  );
}
