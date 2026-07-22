"use client";

import { Button } from "@/components/ui/button";
import { Plus, FolderTree } from "lucide-react";
import Image from "next/image";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader";

type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  createdAt: Date;
  _count: {
    products: number;
  };
};

export function CategoriesTable({ categories }: { categories: Category[] }) {
  const header = (
    <PageHeader 
      title="Categories" 
      description="Organize products into distinct categories."
      action={
        <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      }
    />
  );

  return (
    <DataTable
      header={header}
      columns={["Category", "Slug", "Total Products", "Added"]}
      isEmpty={categories.length === 0}
      emptyMessage="No categories found."
    >
      {categories.map((category) => (
        <tr key={category.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/50 transition-colors group">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              {category.imageUrl ? (
                <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 relative shrink-0">
                  <Image src={category.imageUrl} alt={category.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <FolderTree className="w-4 h-4 text-slate-400" />
                </div>
              )}
              <div className="font-medium text-slate-900 dark:text-white">{category.name}</div>
            </div>
          </td>
          <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
            {category.slug}
          </td>
          <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
            {category._count.products} products
          </td>
          <td className="px-6 py-4 text-slate-500 dark:text-slate-400" suppressHydrationWarning>
            {new Date(category.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
