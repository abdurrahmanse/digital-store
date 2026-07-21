"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteProduct } from "@/features/admin/actions";
import { toast } from "sonner";
import { useTransition } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  productType: string;
  status: string;
  stock: number | null;
  createdAt: Date;
  category: { name: string } | null;
};

export function ProductsTable({ products }: { products: Product[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      startTransition(async () => {
        const result = await deleteProduct(id);
        if (result.success) {
          toast.success("Product deleted successfully.");
        } else {
          toast.error(result.error || "Failed to delete product.");
        }
      });
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800/60 shadow-none rounded-xl bg-white dark:bg-slate-950 overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 tracking-tight">All Products</CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your digital inventory.</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {products.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>No products found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wide">Product</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Category & Type</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Price</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Stock</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Status</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Added</th>
                  <th className="px-6 py-4 font-medium tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">{product.name}</div>
                      <div className="text-slate-400 text-xs mt-0.5 font-mono">{product.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 dark:text-slate-400 font-medium">{product.category?.name || "Uncategorized"}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{product.productType}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                      ৳{(product.price / 100).toFixed(2)}
                      {product.discountPrice && (
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                          Sale: ৳{(product.discountPrice / 100).toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {product.stock !== null ? product.stock : "∞"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        product.status === "PUBLISHED" 
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}>
                        {product.status === "PUBLISHED" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400" suppressHydrationWarning>
                      {new Date(product.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 transition-opacity">
                        <Link href={`/dashboard/products/${product.id}/edit`}>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-slate-500 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 dark:bg-slate-900 hover:text-slate-900 dark:hover:text-white">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 dark:text-red-400 dark:border-slate-700 dark:bg-slate-900 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 dark:hover:text-red-300"
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
