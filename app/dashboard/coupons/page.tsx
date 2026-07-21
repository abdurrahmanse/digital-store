import { getAllCoupons } from "@/features/admin/queries";
import { CouponsTable } from "@/features/admin/components/CouponsTable";

export default async function AdminCouponsPage({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const coupons = await getAllCoupons({ page, limit: 10 });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <CouponsTable 
        coupons={coupons.data} 
        currentPage={coupons.currentPage}
        totalPages={coupons.totalPages}
      />
    </div>
  );
}
