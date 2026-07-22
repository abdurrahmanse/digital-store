import { prisma } from "@/lib/prisma";

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
