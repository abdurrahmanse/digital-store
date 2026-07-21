const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@digitalstore.com' },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date()
    },
    create: {
      email: 'admin@digitalstore.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date()
    }
  });
  console.log('Admin user created/updated:', user.email);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
