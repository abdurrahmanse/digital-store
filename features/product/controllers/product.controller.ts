import { NextResponse } from "next/server";
import { productService } from "@/features/product/services/product.service";
import { auth } from "@/auth";

export const productController = {
  async getProducts(req: Request) {
    try {
      const products = await productService.getProducts();
      return NextResponse.json(products, { status: 200 });
    } catch (error: any) {
      console.error("Get products error:", error);
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
  },

  async getProduct(req: Request, { params }: { params: { id: string } }) {
    try {
      const product = await productService.getProductById(params.id);
      return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
      console.error("Get product error:", error);
      return NextResponse.json({ error: error.message || "Failed to fetch product" }, { status: 404 });
    }
  },

  async createProduct(req: Request) {
    try {
      const session = await auth();
      if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      const formData = await req.formData();
      const result = await productService.createProduct(formData);
      return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
      console.error("Create product error:", error);
      return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 400 });
    }
  },

  async updateProduct(req: Request, { params }: { params: { id: string } }) {
    try {
      const session = await auth();
      if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      const formData = await req.formData();
      const result = await productService.updateProduct(params.id, formData);
      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      console.error("Update product error:", error);
      return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 400 });
    }
  },

  async deleteProduct(req: Request, { params }: { params: { id: string } }) {
    try {
      const session = await auth();
      if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      const result = await productService.deleteProduct(params.id);
      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      console.error("Delete product error:", error);
      return NextResponse.json({ error: error.message || "Failed to delete product" }, { status: 400 });
    }
  }
};
