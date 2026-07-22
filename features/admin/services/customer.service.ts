import { prisma } from "@/lib/prisma";

export const customerService = {
  async deleteCustomer(userId: string, currentUserId: string) {
    if (currentUserId === userId) {
      throw new Error("You cannot delete your own account");
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true };
  }
};
