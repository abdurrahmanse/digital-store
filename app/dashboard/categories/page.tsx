import { getAllCategories } from "@/features/admin/queries";
import { CategoriesTable } from "@/features/admin/components/CategoriesTable";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <CategoriesTable categories={categories} />
    </div>
  );
}
