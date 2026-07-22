import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export const orderService = {
  async updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!order) {
      throw new Error("Order not found");
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus }
    });

    if (newStatus === "COMPLETED" && order.status !== "COMPLETED") {
      for (const item of order.items) {
        if (item.product.productType === "LICENSE") {
          const existingLicense = await prisma.license.findFirst({
            where: {
              orderId: order.id,
              productId: item.productId,
            }
          });

          if (!existingLicense) {
            await prisma.license.create({
              data: {
                productId: item.productId,
                orderId: order.id,
                userId: order.userId,
                status: "ASSIGNED",
              },
            });
          }
        }
      }
    }

    return { success: true };
  }
};
