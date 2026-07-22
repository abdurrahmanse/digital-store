import { NextResponse } from "next/server";
import { checkoutService } from "@/features/checkout/services/checkout.service";
import { auth } from "@/auth";

export const checkoutController = {
  async createOrder(req: Request) {
    try {
      const session = await auth();
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized. Please log in to complete your purchase." }, { status: 401 });
      }

      const body = await req.json();
      const { productId, email } = body;

      if (!productId || !email) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const result = await checkoutService.createOrder({ 
        productId, 
        email, 
        userId: session.user.id 
      });
      
      return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
      console.error("Create order error:", error);
      return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 400 });
    }
  }
};
