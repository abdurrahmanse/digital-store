import { NextResponse } from "next/server";
import { orderService } from "@/features/admin/services/order.service";
import { auth } from "@/auth";

export const orderController = {
  async updateOrderStatus(req: Request, { params }: { params: { id: string } }) {
    try {
      const session = await auth();
      if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      const body = await req.json();
      const { status } = body;
      
      if (!status) {
        return NextResponse.json({ error: "Missing status field" }, { status: 400 });
      }

      const result = await orderService.updateOrderStatus(params.id, status);
      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      console.error("Update order status error:", error);
      return NextResponse.json({ error: error.message || "Failed to update order status" }, { status: 400 });
    }
  }
};
