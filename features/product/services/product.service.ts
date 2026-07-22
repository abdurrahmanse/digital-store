import { prisma } from "@/lib/prisma";
import { ProductType, DeliveryType, ProductStatus } from "@prisma/client";
import { cloudinary } from "@/lib/cloudinary";

async function uploadToCloudinary(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "digital-store/products" },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    ).end(buffer);
  });
}

export const productService = {
  async getProducts() {
    return await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  async getProductById(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");
    return product;
  },

  async createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const discountPriceStr = formData.get("discountPrice") as string;
    const imageFile = formData.get("imageFile") as File | null;
    const categoryId = formData.get("categoryId") as string;
    const productType = formData.get("productType") as ProductType;
    const deliveryType = formData.get("deliveryType") as DeliveryType;
    const status = formData.get("status") as ProductStatus;
    const stockStr = formData.get("stock") as string;
    const isFeatured = formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true";

    const price = Math.round(parseFloat(priceStr) * 100);
    const discountPrice = discountPriceStr ? Math.round(parseFloat(discountPriceStr) * 100) : null;
    const stock = stockStr ? parseInt(stockStr, 10) : null;

    let imageUrl = null;
    let imagePublicId = null;

    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadToCloudinary(imageFile);
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        shortDescription,
        description,
        price,
        discountPrice,
        imageUrl,
        imagePublicId,
        categoryId: categoryId || null,
        productType,
        deliveryType,
        status,
        stock,
        isActive: status === ProductStatus.PUBLISHED,
        isFeatured,
      },
    });

    return { success: true, product };
  },

  async updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const discountPriceStr = formData.get("discountPrice") as string;
    const imageFile = formData.get("imageFile") as File | null;
    const categoryId = formData.get("categoryId") as string;
    const productType = formData.get("productType") as ProductType;
    const deliveryType = formData.get("deliveryType") as DeliveryType;
    const status = formData.get("status") as ProductStatus;
    const stockStr = formData.get("stock") as string;
    const isFeatured = formData.get("isFeatured") === "on" || formData.get("isFeatured") === "true";

    const price = Math.round(parseFloat(priceStr) * 100);
    const discountPrice = discountPriceStr ? Math.round(parseFloat(discountPriceStr) * 100) : null;
    const stock = stockStr ? parseInt(stockStr, 10) : null;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) throw new Error("Product not found");

    let imageUrl = existingProduct.imageUrl;
    let imagePublicId = existingProduct.imagePublicId;

    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadToCloudinary(imageFile);
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;

      // Delete old image from Cloudinary
      if (existingProduct.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(existingProduct.imagePublicId);
        } catch (e) {
          console.error("Failed to delete old image from Cloudinary:", e);
        }
      }
    }

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
        imagePublicId,
        categoryId: categoryId || null,
        productType,
        deliveryType,
        status,
        stock,
        isActive: status === ProductStatus.PUBLISHED,
        isFeatured,
      },
    });

    return { success: true, product };
  },

  async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(product.imagePublicId);
      } catch (e) {
        console.error("Failed to delete image from Cloudinary:", e);
      }
    }

    await prisma.product.delete({
      where: { id },
    });

    return { success: true };
  }
};
