import { orderController } from "@/features/admin/controllers/order.controller";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return orderController.updateOrderStatus(req, { params: resolvedParams });
}
