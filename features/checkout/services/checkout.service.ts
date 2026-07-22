import { prisma } from "@/lib/prisma";

export const checkoutService = {
  async createOrder(data: { productId: string; email: string; userId: string }) {
    const { productId, email, userId } = data;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const order = await prisma.order.create({
      data: {
        userId: userId,
        amount: product.price,
        status: "PENDING",
        items: {
          create: [
            {
              productId: product.id,
              price: product.price,
            },
          ],
        },
      },
    });

    return { success: true, orderId: order.id };
  }
};
