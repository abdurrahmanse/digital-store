import { prisma } from "@/lib/prisma";

export async function getUserPurchases(userId: string) {
  // Find all order items that belong to completed orders for this user
  const orderItems = await prisma.orderItem.findMany({
    where: {
      order: {
        userId: userId,
      },
    },
    include: {
      product: true,
      order: {
        select: {
          createdAt: true,
          status: true,
        },
      },
    },
    orderBy: {
      order: {
        createdAt: "desc",
      },
    },
  });

  const purchases = orderItems.map((item) => {
    return {
      id: item.id, // OrderItem ID
      purchaseDate: item.order.createdAt,
      pricePaid: item.price,
      product: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        productType: item.product.productType,
        fileUrl: item.product.fileUrl,
        imageUrl: item.product.imageUrl,
      },
      status: item.order.status,
      deliveryType: item.deliveryType || item.product.deliveryType,
      deliveryInfo: item.deliveryInfo || item.product.deliveryInfo,
    };
  });

  return purchases;
}
