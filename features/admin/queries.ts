import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [totalRevenueResult, salesCount, activeUsers, totalProducts, pendingOrders] = await Promise.all([
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
    })
  ]);

  const totalRevenue = totalRevenueResult._sum.amount || 0;

  return {
    totalRevenue,
    salesCount,
    activeUsers,
    totalProducts,
    pendingOrders
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

export async function getAllProducts({ page = 1, limit = 10 } = {}) {
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { category: { select: { name: true } } }
    }),
    prisma.product.count()
  ]);

  return {
    data: products,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      _count: { select: { products: true } }
    }
  });
  return categories;
}

export async function getAllOrders({ page = 1, limit = 10 } = {}) {
  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { email: true, name: true } },
        items: {
          include: { product: { select: { name: true } } }
        }
      },
    }),
    prisma.order.count()
  ]);

  return {
    data: orders,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getAllLicenses({ page = 1, limit = 10 } = {}) {
  const skip = (page - 1) * limit;
  const [licenses, total] = await Promise.all([
    prisma.license.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        product: { select: { name: true } },
        user: { select: { email: true, name: true } },
        order: { select: { id: true, amount: true } }
      }
    }),
    prisma.license.count()
  ]);

  return {
    data: licenses,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getAllUsers({ page = 1, limit = 10 } = {}) {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: { select: { orders: true } }
      }
    }),
    prisma.user.count()
  ]);

  return {
    data: users,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getAllCoupons({ page = 1, limit = 10 } = {}) {
  const skip = (page - 1) * limit;
  const [coupons, total] = await Promise.all([
    prisma.coupon.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.coupon.count()
  ]);

  return {
    data: coupons,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getUserDetails(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          orders: true,
          licenses: true
        }
      },
      deviceSessions: {
        orderBy: {
          lastLogin: 'desc'
        }
      }
    }
  });
  
  if (!user) return null;

  return user;
}
