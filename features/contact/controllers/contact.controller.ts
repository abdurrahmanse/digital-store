import { NextResponse } from "next/server";
import { contactService } from "@/features/contact/services/contact.service";
import { ContactSchema } from "@/features/contact/validations/contact";
import { auth } from "@/auth";

export const contactController = {
  async createMessage(req: Request) {
    try {
      const body = await req.json();
      const validatedFields = ContactSchema.safeParse(body);

      if (!validatedFields.success) {
        return NextResponse.json({ error: validatedFields.error.issues[0].message }, { status: 400 });
      }

      const result = await contactService.sendContactMessage(validatedFields.data);
      return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
      console.error("Create contact message error:", error);
      return NextResponse.json({ error: "Failed to process your request." }, { status: 400 });
    }
  },

  async markAsRead(req: Request, { params }: { params: { id: string } }) {
    try {
      const session = await auth();
      if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      const result = await contactService.markMessageAsRead(params.id);
      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      console.error("Mark message read error:", error);
      return NextResponse.json({ error: "Failed to update message" }, { status: 400 });
    }
  },

  async deleteMessage(req: Request, { params }: { params: { id: string } }) {
    try {
      const session = await auth();
      if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      const result = await contactService.deleteMessage(params.id);
      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      console.error("Delete message error:", error);
      return NextResponse.json({ error: "Failed to delete message" }, { status: 400 });
    }
  }
};
