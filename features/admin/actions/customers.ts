"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function deleteCustomer(userId: string) {
  const session = await auth();

  // 1. Verify ADMIN role
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // 2. Prevent self-deletion
  if (session.user.id === userId) {
    throw new Error("You cannot delete your own account");
  }

  // 3. Delete the user (Prisma relations with onDelete: SetNull or Cascade will handle the rest)
  await prisma.user.delete({
    where: { id: userId },
  });

  // 4. Revalidate cache
  revalidatePath("/dashboard/customers");
  
  return { success: true };
}
