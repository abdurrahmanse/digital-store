import { ProductForm } from "@/features/admin/components/ProductForm";
import { getAllCategories } from "@/features/admin/queries";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const [categories, product] = await Promise.all([
    getAllCategories(),
    prisma.product.findUnique({ where: { id } })
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Edit Product</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Update details for {product.name}
        </p>
      </div>

      <ProductForm initialData={product} categories={categories} />
    </div>
  );
}
