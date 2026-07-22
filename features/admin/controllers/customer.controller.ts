import { NextResponse } from "next/server";
import { customerService } from "@/features/admin/services/customer.service";
import { auth } from "@/auth";

export const customerController = {
  async deleteCustomer(req: Request, { params }: { params: { id: string } }) {
    try {
      const session = await auth();
      if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      const result = await customerService.deleteCustomer(params.id, session.user.id);
      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      console.error("Delete customer error:", error);
      return NextResponse.json({ error: error.message || "Failed to delete customer" }, { status: 400 });
    }
  }
};
