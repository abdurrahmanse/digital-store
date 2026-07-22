"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Power, PowerOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CouponModal, CouponFormValues } from "./CouponModal";

export function CouponActions({ coupon }: { coupon: CouponFormValues }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/coupons/${coupon.id}`, { 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !coupon.isActive })
      });
      if (res.ok) {
        toast.success(`Coupon ${coupon.isActive ? "disabled" : "enabled"}`);
        router.refresh();
      } else {
        toast.error("Failed to update coupon status");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/coupons/${coupon.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Coupon deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete coupon");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20" 
          title="Edit coupon"
          onClick={() => setEditOpen(true)}
          disabled={loading}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          size="icon" 
          variant="ghost" 
          className={`h-8 w-8 ${coupon.isActive ? 'text-amber-600 dark:text-amber-400 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20' : 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`}
          title={coupon.isActive ? "Disable coupon" : "Enable coupon"}
          onClick={handleToggle}
          disabled={loading}
        >
          {coupon.isActive ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
        </Button>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20" 
          title="Delete coupon"
          onClick={handleDelete}
          disabled={loading}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {editOpen && (
        <CouponModal 
          open={editOpen} 
          setOpen={setEditOpen} 
          coupon={coupon} 
        />
      )}
    </>
  );
}
