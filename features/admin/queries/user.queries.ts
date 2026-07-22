import { prisma } from "@/lib/prisma";

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

export async function getUserDetails(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          orders: true
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
