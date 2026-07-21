"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    const updateData: any = {};

    if (name && name.trim().length > 0) {
      updateData.name = name.trim();
    }

    if (password && password.trim().length >= 6) {
      updateData.password = await hash(password, 12);
    } else if (password && password.trim().length > 0) {
      return { error: "Password must be at least 6 characters" };
    }

    if (Object.keys(updateData).length === 0) {
      return { error: "Nothing to update" };
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: updateData,
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { error: "Something went wrong" };
  }
}
