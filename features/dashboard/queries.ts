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

  // Since a user might have licenses generated for their purchases, fetch those too
  const licenses = await prisma.license.findMany({
    where: {
      userId: userId,
    },
  });

  // Map the licenses back to the corresponding order items based on productId and orderId
  // Note: If a user buys the same product multiple times, this requires mapping by orderId
  const purchases = orderItems.map((item) => {
    const license = licenses.find(
      (l) => l.productId === item.productId && l.orderId === item.orderId
    );

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
      licenseKey: license?.key || null,
    };
  });

  return purchases;
}
