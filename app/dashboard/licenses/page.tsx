import { getAllLicenses } from "@/features/admin/queries";
import { LicensesTable } from "@/features/admin/components/LicensesTable";

export default async function AdminLicensesPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams;
  const page = parseInt(params?.page || "1", 10);
  const licenses = await getAllLicenses({ page, limit: 10 });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <LicensesTable 
        licenses={licenses.data} 
        currentPage={licenses.currentPage}
        totalPages={licenses.totalPages}
      />
    </div>
  );
}
