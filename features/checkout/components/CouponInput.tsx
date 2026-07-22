import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CouponInputProps {
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedCoupon: { code: string; discountType: string; discountValue: number } | null;
  setAppliedCoupon: (coupon: any) => void;
  couponLoading: boolean;
  handleApplyCoupon: () => void;
}

export function CouponInput({ 
  couponCode, 
  setCouponCode, 
  appliedCoupon, 
  setAppliedCoupon, 
  couponLoading, 
  handleApplyCoupon 
}: CouponInputProps) {
  return (
    <div className="mb-8">
      <div className="flex gap-2">
        <Input 
          placeholder="Coupon Code" 
          className="bg-white dark:bg-slate-950 h-11 border-slate-200 dark:border-slate-800"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          disabled={!!appliedCoupon || couponLoading}
        />
        <Button 
          type="button" 
          variant="outline" 
          className="shrink-0 h-11 bg-white dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-white"
          onClick={handleApplyCoupon}
          disabled={!couponCode || !!appliedCoupon || couponLoading}
        >
          {couponLoading ? "..." : (appliedCoupon ? "Applied" : "Apply")}
        </Button>
      </div>
      {appliedCoupon && (
        <div className="mt-2 text-sm flex items-center justify-between text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-md">
          <span>Coupon {appliedCoupon.code} applied!</span>
          <button type="button" onClick={() => { setAppliedCoupon(null); setCouponCode(""); }} className="text-xs hover:underline">Remove</button>
        </div>
      )}
    </div>
  );
}
