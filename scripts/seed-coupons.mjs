import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding coupons...");
  const coupons = [
    { code: 'WELCOME10', discountType: 'PERCENTAGE', discountValue: 10, isActive: true },
    { code: 'SUMMER20', discountType: 'PERCENTAGE', discountValue: 20, isActive: true },
    { code: 'SAVE500', discountType: 'FIXED', discountValue: 500, isActive: true }, // $5.00 off
    { code: 'VIP25', discountType: 'PERCENTAGE', discountValue: 25, isActive: true, usageLimit: 100 },
    { code: 'FLASH50', discountType: 'PERCENTAGE', discountValue: 50, isActive: true, usageLimit: 10 }
  ];

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: coupon
    });
  }
  
  console.log('5 coupons seeded successfully.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
