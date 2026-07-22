import { contactController } from "@/features/contact/controllers/contact.controller";

export async function POST(req: Request) {
  return contactController.createMessage(req);
}
