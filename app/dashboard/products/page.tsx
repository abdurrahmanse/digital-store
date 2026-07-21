import { getAllProducts } from "@/features/admin/queries";
import { ProductsTable } from "@/features/admin/components/ProductsTable";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ProductsTable products={products.data} />
    </div>
  );
}
