"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ProductType, DeliveryType, ProductStatus } from "@prisma/client";

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const discountPriceStr = formData.get("discountPrice") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const categoryId = formData.get("categoryId") as string;
    const productType = formData.get("productType") as ProductType;
    const deliveryType = formData.get("deliveryType") as DeliveryType;
    const status = formData.get("status") as ProductStatus;
    const stockStr = formData.get("stock") as string;

    const price = Math.round(parseFloat(priceStr) * 100);
    const discountPrice = discountPriceStr ? Math.round(parseFloat(discountPriceStr) * 100) : null;
    const stock = stockStr ? parseInt(stockStr, 10) : null;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        shortDescription,
        description,
        price,
        discountPrice,
        imageUrl,
        categoryId: categoryId || null,
        productType,
        deliveryType,
        status,
        stock,
        isActive: status === ProductStatus.PUBLISHED,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
    revalidatePath("/");
    
    return { success: true, product };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message || "Failed to create product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const discountPriceStr = formData.get("discountPrice") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const categoryId = formData.get("categoryId") as string;
    const productType = formData.get("productType") as ProductType;
    const deliveryType = formData.get("deliveryType") as DeliveryType;
    const status = formData.get("status") as ProductStatus;
    const stockStr = formData.get("stock") as string;

    const price = Math.round(parseFloat(priceStr) * 100);
    const discountPrice = discountPriceStr ? Math.round(parseFloat(discountPriceStr) * 100) : null;
    const stock = stockStr ? parseInt(stockStr, 10) : null;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        shortDescription,
        description,
        price,
        discountPrice,
        imageUrl,
        categoryId: categoryId || null,
        productType,
        deliveryType,
        status,
        stock,
        isActive: status === ProductStatus.PUBLISHED,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
    revalidatePath(`/products/${slug}`);
    revalidatePath("/");

    return { success: true, product };
  } catch (error: any) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message || "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message || "Failed to delete product" };
  }
}
