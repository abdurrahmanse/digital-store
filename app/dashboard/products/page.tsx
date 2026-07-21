import { getAllProducts } from "@/features/admin/queries";
import { ProductsTable } from "@/features/admin/components/ProductsTable";

export default async function AdminProductsPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams;
  const page = parseInt(params?.page || "1", 10);
  const products = await getAllProducts({ page, limit: 10 });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ProductsTable 
        products={products.data} 
        currentPage={products.currentPage}
        totalPages={products.totalPages}
      />
    </div>
  );
}
