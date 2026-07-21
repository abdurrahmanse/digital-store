"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProduct, updateProduct } from "@/features/admin/actions";
import { toast } from "sonner";
import { ProductType, DeliveryType, ProductStatus } from "@prisma/client";

type ProductFormProps = {
  initialData?: any;
  categories: { id: string; name: string }[];
};

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      let result;
      if (isEditing) {
        result = await updateProduct(initialData.id, formData);
      } else {
        result = await createProduct(formData);
      }

      if (result.success) {
        toast.success(isEditing ? "Product updated successfully!" : "Product created successfully!");
        router.push("/dashboard/products");
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-white dark:bg-slate-950 p-8 rounded-xl border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" name="name" required defaultValue={initialData?.name} placeholder="e.g. Windows 11 Pro" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" name="slug" required defaultValue={initialData?.slug} placeholder="e.g. windows-11-pro" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <select
              id="categoryId"
              name="categoryId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={initialData?.categoryId || ""}
            >
              <option value="">Uncategorized</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (BDT) *</Label>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                step="0.01" 
                min="0"
                required 
                defaultValue={initialData ? (initialData.price / 100).toFixed(2) : ""} 
                placeholder="29.00" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountPrice">Discount Price (BDT)</Label>
              <Input 
                id="discountPrice" 
                name="discountPrice" 
                type="number" 
                step="0.01"
                min="0"
                defaultValue={initialData?.discountPrice ? (initialData.discountPrice / 100).toFixed(2) : ""} 
                placeholder="19.00" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock (Optional)</Label>
            <Input 
              id="stock" 
              name="stock" 
              type="number" 
              defaultValue={initialData?.stock ?? ""} 
              placeholder="Leave empty for infinite" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              defaultValue={initialData?.imageUrl || ""} 
              placeholder="/images/p1.jpg" 
            />
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description *</Label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            required
            defaultValue={initialData?.shortDescription}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Brief overview of the product..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Full Description *</Label>
          <textarea
            id="description"
            name="description"
            required
            defaultValue={initialData?.description}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Detailed description, features, etc..."
          />
        </div>
      </div>

      {/* Types and Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
        <div className="space-y-2">
          <Label htmlFor="productType">Product Type</Label>
          <select
            id="productType"
            name="productType"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue={initialData?.productType || ProductType.DOWNLOAD}
          >
            {Object.values(ProductType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deliveryType">Delivery Type</Label>
          <select
            id="deliveryType"
            name="deliveryType"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue={initialData?.deliveryType || DeliveryType.INSTANT}
          >
            {Object.values(DeliveryType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue={initialData?.status || ProductStatus.PUBLISHED}
          >
            {Object.values(ProductStatus).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-border">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/dashboard/products")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
