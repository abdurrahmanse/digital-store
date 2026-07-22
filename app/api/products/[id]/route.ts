import { productController } from "@/features/product/controllers/product.controller";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return productController.getProduct(req, { params: resolvedParams });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return productController.updateProduct(req, { params: resolvedParams });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return productController.deleteProduct(req, { params: resolvedParams });
}
