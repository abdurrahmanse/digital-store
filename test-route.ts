import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({ where: { role: 'USER' } });
  console.log("User:", user?.email);
  
  if (user) {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        order: {
          userId: user.id,
          status: "COMPLETED",
        }
      },
      include: {
        product: true,
        order: true,
      },
      orderBy: {
        order: {
          createdAt: "desc"
        }
      }
    });
    console.log("Order items:", orderItems.length);
    if (orderItems.length > 0) {
      console.log("First item:", orderItems[0].product.name);
      console.log("Delivery info:", orderItems[0].deliveryInfo);
    }
  }
}
main().finally(() => prisma.$disconnect());
