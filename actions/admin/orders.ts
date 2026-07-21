"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

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

  // Update order status
  await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus }
  });

  // If status is changed to COMPLETED, and it wasn't already completed, assign licenses
  if (newStatus === "COMPLETED" && order.status !== "COMPLETED") {
    for (const item of order.items) {
      if (item.product.productType === "LICENSE") {
        // Check if a license already exists for this order item to avoid duplicates
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

  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard/purchases");
  revalidatePath("/dashboard");
  
  return { success: true };
}
