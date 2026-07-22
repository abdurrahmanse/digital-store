import { prisma } from "@/lib/prisma";

export const checkoutService = {
  async createOrder(data: { items: { productId: string; quantity: number }[]; email: string; userId: string; couponCode?: string }) {
    const { items, email, userId, couponCode } = data;

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

    // Apply Coupon if exists
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() }
      });

      if (!coupon || !coupon.isActive || (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit)) {
        throw new Error("Invalid or expired coupon");
      }

      if (coupon.discountType === "PERCENTAGE") {
        const discountAmount = Math.floor((totalAmount * coupon.discountValue) / 100);
        totalAmount = Math.max(0, totalAmount - discountAmount);
      } else {
        totalAmount = Math.max(0, totalAmount - coupon.discountValue);
      }

      // Increment used count
      await prisma.coupon.update({
        where: { id: coupon.id },
        data: { usedCount: { increment: 1 } }
      });
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
