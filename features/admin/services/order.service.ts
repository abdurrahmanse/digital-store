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
        // Automatically attach delivery info and type to the order item if it has a delivery configuration
        if (item.product.deliveryInfo) {
          await prisma.orderItem.update({
            where: { id: item.id },
            data: {
              deliveryType: item.product.deliveryType,
              deliveryInfo: item.product.deliveryInfo,
            }
          });
        }
      }
    }

    return { success: true };
  }
};
