import { customerController } from "@/features/admin/controllers/customer.controller";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return customerController.deleteCustomer(req, { params: resolvedParams });
}
