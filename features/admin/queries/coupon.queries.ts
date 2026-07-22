import { prisma } from "@/lib/prisma";

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
