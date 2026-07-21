"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { deleteProduct } from "@/features/admin/actions";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ActionMenu } from "@/components/dashboard/ActionMenu";

type Product = {
  id: string;
  name: string;
  imageUrl: string | null;
  price: number;
  discountPrice: number | null;
  productType: string;
  status: string;
  stock: number | null;
  createdAt: Date;
  category: { name: string } | null;
};

export function ProductsTable({ 
  products,
  currentPage,
  totalPages
}: { 
  products: Product[];
  currentPage: number;
  totalPages: number;
}) {
  const handleDelete = async (id: string) => {
    return await deleteProduct(id);
  };

  const header = (
    <PageHeader 
      title="All Products" 
      description="Manage your digital inventory."
      action={
        <Link href="/dashboard/products/new">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      }
    />
  );

  return (
    <DataTable
      header={header}
      columns={["Product", "Category & Type", "Price", "Stock", "Status", "Added", "Actions"]}
      isEmpty={products.length === 0}
      emptyMessage="No products found."
      currentPage={currentPage}
      totalPages={totalPages}
    >
      {products.map((product) => (
        <tr key={product.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-colors group">
          <td className="px-6 py-4 flex items-center gap-3">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md object-cover border border-border" />
            ) : (
              <div className="w-10 h-10 rounded-md bg-muted border border-border flex items-center justify-center text-[10px] text-muted-foreground">
                No IMG
              </div>
            )}
            <div>
              <div className="font-medium text-slate-900 dark:text-white">{product.name}</div>
              <div className="text-slate-400 text-xs mt-0.5 font-mono">{product.id}</div>
            </div>
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
            <StatusBadge status={product.status} />
          </td>
          <td className="px-6 py-4 text-slate-500 dark:text-slate-400" suppressHydrationWarning>
            {new Date(product.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </td>
          <td className="px-6 py-4 text-right">
            <ActionMenu 
              editUrl={`/dashboard/products/${product.id}/edit`}
              onDelete={() => handleDelete(product.id)}
              deleteConfirmMessage={`Are you sure you want to delete ${product.name}?`}
            />
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
