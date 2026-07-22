import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function updateProfile(userId: string, data: { name?: string; password?: string }) {
  const { name, password } = data;
  const updateData: any = {};

  if (name && name.trim().length > 0) {
    updateData.name = name.trim();
  }

  if (password && password.trim().length >= 6) {
    updateData.password = await hash(password, 12);
  } else if (password && password.trim().length > 0) {
    throw new Error("Password must be at least 6 characters");
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error("Nothing to update");
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  return { success: true };
}
