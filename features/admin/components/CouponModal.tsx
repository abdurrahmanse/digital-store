"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export type CouponFormValues = {
  id?: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  usageLimit: number | "";
  isActive: boolean;
};

export function CouponModal({
  open,
  setOpen,
  coupon,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  coupon?: CouponFormValues | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;
    const discountType = formData.get("discountType") as string;
    const discountValue = Number(formData.get("discountValue"));
    const usageLimitRaw = formData.get("usageLimit") as string;
    const usageLimit = usageLimitRaw ? Number(usageLimitRaw) : null;
    const isActive = formData.get("isActive") === "on";

    const payload = { code, discountType, discountValue, usageLimit, isActive };
    const isEdit = !!coupon?.id;
    const url = isEdit ? `/api/coupons/${coupon.id}` : "/api/coupons";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(`Coupon ${isEdit ? "updated" : "created"} successfully`);
        setOpen(false);
        router.refresh();
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{coupon ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Coupon Code</label>
            <Input 
              name="code" 
              defaultValue={coupon?.code || ""} 
              placeholder="e.g. SUMMER20" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Discount Type</label>
              <select 
                name="discountType" 
                defaultValue={coupon?.discountType || "PERCENTAGE"}
                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed Amount (Cents)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Value</label>
              <Input 
                name="discountValue" 
                type="number" 
                defaultValue={coupon?.discountValue || ""} 
                placeholder="20" 
                required 
                min={1}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Usage Limit (Optional)</label>
            <Input 
              name="usageLimit" 
              type="number" 
              defaultValue={coupon?.usageLimit || ""} 
              placeholder="e.g. 100" 
              min={1}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-base font-medium">Active Status</label>
              <p className="text-sm text-slate-500">Enable or disable this coupon.</p>
            </div>
            <Switch 
              name="isActive" 
              defaultChecked={coupon ? coupon.isActive : true} 
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Coupon"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
