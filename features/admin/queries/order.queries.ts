import { prisma } from "@/lib/prisma";

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
