import { prisma } from "@/lib/prisma";

export const checkoutService = {
  async createOrder(data: { items: { productId: string; quantity: number }[]; email: string; userId: string }) {
    const { items, email, userId } = data;

    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== new Set(productIds).size) {
      throw new Error("One or more products not found");
    }

    const productMap = products.reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {} as Record<string, any>);

    let totalAmount = 0;
    const orderItemsData: any[] = [];
    
    for (const item of items) {
      const dbProduct = productMap[item.productId];
      const itemPrice = dbProduct.discountPrice || dbProduct.price;
      
      for (let i = 0; i < item.quantity; i++) {
        orderItemsData.push({
          productId: item.productId,
          price: itemPrice,
        });
        totalAmount += itemPrice;
      }
    }

    const order = await prisma.order.create({
      data: {
        userId: userId,
        amount: totalAmount,
        status: "PENDING",
        items: {
          create: orderItemsData,
        },
      },
    });

    return { success: true, orderId: order.id };
  }
};
