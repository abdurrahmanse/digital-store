import { contactController } from "@/features/contact/controllers/contact.controller";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return contactController.markAsRead(req, { params: resolvedParams });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return contactController.deleteMessage(req, { params: resolvedParams });
}
