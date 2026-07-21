import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  try {
    const users = await prisma.user.findMany()
    console.log('Connected, users:', users.length)
  } catch (e) {
    console.error('Prisma Error:', e)
  }
}
main()
