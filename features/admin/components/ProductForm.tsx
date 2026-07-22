"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ProductType, DeliveryType, ProductStatus } from "@prisma/client";

type ProductFormProps = {
  initialData?: any;
  categories: { id: string; name: string }[];
};

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(initialData?.deliveryType || DeliveryType.DOWNLOAD_FILE);

  // Delivery Info States
  const [deliveryInfo, setDeliveryInfo] = useState<any>(initialData?.deliveryInfo || {});

  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("deliveryInfo", JSON.stringify(deliveryInfo));
      
      const url = isEditing ? `/api/products/${initialData.id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        body: formData, // Sending FormData directly for multipart/form-data
      });
      
      const result = await response.json();

      if (response.ok) {
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

          <div className="space-y-4">
            <h3 className="font-medium">Product Visibility</h3>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="isFeatured" className="text-base">Featured Product</Label>
                <p className="text-sm text-muted-foreground">
                  Display this product prominently on the home page and top of listings.
                </p>
              </div>
              <Switch 
                id="isFeatured" 
                name="isFeatured" 
                defaultChecked={initialData?.isFeatured ?? false} 
              />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <Label htmlFor="imageFile">Product Image</Label>
            {imagePreview && (
              <div className="mb-2">
                <img 
                  src={imagePreview} 
                  alt="Product image preview" 
                  className="h-20 w-auto rounded-md border border-border object-cover" 
                />
              </div>
            )}
            <Input 
              id="imageFile" 
              name="imageFile" 
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setImagePreview(initialData?.imageUrl || null);
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              {initialData?.imageUrl ? "Upload a new image to replace the current one." : "Upload a product image."}
            </p>
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
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
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

      {/* Delivery Information Section */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="font-medium text-lg">Delivery Information</h3>
        <p className="text-sm text-muted-foreground">
          Configure the digital access details that will be provided to the customer after purchase.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliveryType === "LICENSE_KEY" && (
            <>
              <div className="space-y-2">
                <Label>Product Key</Label>
                <Input 
                  value={deliveryInfo.productKey || ""} 
                  onChange={e => setDeliveryInfo({ ...deliveryInfo, productKey: e.target.value })} 
                  placeholder="XXXX-XXXX-XXXX-XXXX" 
                />
              </div>
              <div className="space-y-2">
                <Label>Activation Instructions</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={deliveryInfo.instructions || ""} 
                  onChange={e => setDeliveryInfo({ ...deliveryInfo, instructions: e.target.value })} 
                  placeholder="How to activate the key..." 
                />
              </div>
            </>
          )}

          {(deliveryType === "ACCOUNT_CREDENTIALS" || deliveryType === "SUBSCRIPTION_ACCESS") && (
            <>
              <div className="space-y-2">
                <Label>Login Email / Username</Label>
                <Input 
                  value={deliveryInfo.loginEmail || ""} 
                  onChange={e => setDeliveryInfo({ ...deliveryInfo, loginEmail: e.target.value })} 
                  placeholder="user@example.com" 
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input 
                  value={deliveryInfo.password || ""} 
                  onChange={e => setDeliveryInfo({ ...deliveryInfo, password: e.target.value })} 
                  placeholder="SecretPassword123" 
                />
              </div>
              <div className="space-y-2">
                <Label>Subscription Duration (Optional)</Label>
                <Input 
                  value={deliveryInfo.duration || ""} 
                  onChange={e => setDeliveryInfo({ ...deliveryInfo, duration: e.target.value })} 
                  placeholder="e.g. 1 Year, Lifetime" 
                />
              </div>
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={deliveryInfo.notes || ""} 
                  onChange={e => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })} 
                  placeholder="Rules or extra instructions..." 
                />
              </div>
            </>
          )}

          {deliveryType === "DOWNLOAD_FILE" && (
            <>
              <div className="space-y-2">
                <Label>Download Link</Label>
                <Input 
                  value={deliveryInfo.downloadLink || ""} 
                  onChange={e => setDeliveryInfo({ ...deliveryInfo, downloadLink: e.target.value })} 
                  placeholder="https://mega.nz/..." 
                />
              </div>
              <div className="space-y-2">
                <Label>Download Instructions</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={deliveryInfo.instructions || ""} 
                  onChange={e => setDeliveryInfo({ ...deliveryInfo, instructions: e.target.value })} 
                  placeholder="Password for archive, how to extract..." 
                />
              </div>
            </>
          )}
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
