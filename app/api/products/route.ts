import { productController } from "@/features/product/controllers/product.controller";

export async function GET(req: Request) {
  return productController.getProducts(req);
}

export async function POST(req: Request) {
  return productController.createProduct(req);
}
