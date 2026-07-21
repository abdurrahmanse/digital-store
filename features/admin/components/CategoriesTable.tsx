"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FolderTree } from "lucide-react";
import Image from "next/image";

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
  return (
    <Card className="border-slate-200 dark:border-slate-800/60 shadow-none rounded-xl bg-white dark:bg-slate-950 overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 tracking-tight">Categories</CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Organize products into distinct categories.</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {categories.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm flex flex-col items-center">
            <FolderTree className="w-8 h-8 text-slate-300 mb-3" />
            <p>No categories found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wide">Category</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Slug</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Total Products</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-50/40 transition-colors group">
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
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
