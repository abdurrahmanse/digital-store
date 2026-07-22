import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [totalRevenueResult, salesCount, activeUsers, totalProducts, pendingOrders, activeSubscriptions] = await Promise.all([
    prisma.order.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "COMPLETED",
      },
    }),
    prisma.order.count({
      where: {
        status: "COMPLETED",
      },
    }),
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count({
      where: {
        status: "PENDING"
      }
    }),
    prisma.orderItem.count({
      where: {
        order: { status: "COMPLETED" },
        product: { productType: "SUBSCRIPTION" }
      }
    })
  ]);

  const totalRevenue = totalRevenueResult._sum.amount || 0;

  return {
    totalRevenue,
    salesCount,
    activeUsers,
    totalProducts,
    pendingOrders,
    activeSubscriptions
  };
}

export async function getRecentOrders() {
  const orders = await prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  return orders;
}

export async function getTopProducts() {
  // Using groupBy on OrderItem to find top products by sales
  const topOrderItems = await prisma.orderItem.groupBy({
    by: ["productId"],
    _count: {
      productId: true,
    },
    _sum: {
      price: true,
    },
    orderBy: {
      _count: {
        productId: "desc",
      },
    },
    take: 4,
  });

  // Fetch the actual product details for these top items
  const productIds = topOrderItems.map((item) => item.productId);
  
  if (productIds.length === 0) {
    return [];
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  // Merge the aggregated data with the product details
  const topProducts = topOrderItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      id: item.productId,
      name: product?.name || "Unknown Product",
      sales: item._count.productId,
      revenue: item._sum.price || 0,
    };
  });

  return topProducts;
}
