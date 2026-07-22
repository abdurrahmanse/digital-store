import { ProductForm } from "@/features/admin/components/ProductForm";
import { getAllCategories } from "@/features/admin/queries";

export default async function NewProductPage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Add New Product</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Create a new digital product to sell on your store.
        </p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
