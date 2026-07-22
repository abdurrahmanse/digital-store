"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DeliveryType } from "@prisma/client";

import { BasicInfoSection } from "./product-form/BasicInfoSection";
import { PricingStockSection } from "./product-form/PricingStockSection";
import { DescriptionsSection } from "./product-form/DescriptionsSection";
import { TypesStatusSection } from "./product-form/TypesStatusSection";
import { DeliveryInfoSection } from "./product-form/DeliveryInfoSection";

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
        <BasicInfoSection initialData={initialData} categories={categories} />
        <PricingStockSection initialData={initialData} imagePreview={imagePreview} setImagePreview={setImagePreview} />
      </div>

      <DescriptionsSection initialData={initialData} />
      
      <TypesStatusSection initialData={initialData} deliveryType={deliveryType} setDeliveryType={setDeliveryType} />
      
      <DeliveryInfoSection deliveryType={deliveryType} deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo} />

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
