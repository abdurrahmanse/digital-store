import { getAllCoupons } from "@/features/admin/queries";
import { CouponsTable } from "@/features/admin/components/CouponsTable";

export default async function AdminCouponsPage() {
  const coupons = await getAllCoupons();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <CouponsTable coupons={coupons.data} />
    </div>
  );
}
