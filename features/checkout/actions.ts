"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function createOrder(formData: FormData) {
  const productId = formData.get("productId") as string;
  const email = formData.get("email") as string;

  if (!productId || !email) {
    throw new Error("Missing required fields");
  }

  // 1. Fetch the product to get the price
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // 2. Enforce authentication
  const session = await auth();
  const userId = session?.user?.id;
  
  if (!userId) {
    throw new Error("Unauthorized. Please log in to complete your purchase.");
  }

  // 3. Create the order and order items inside a transaction
  const order = await prisma.order.create({
    data: {
      userId: userId,
      amount: product.price,
      status: "PENDING", // Wait for admin approval
      items: {
        create: [
          {
            productId: product.id,
            price: product.price,
          },
        ],
      },
    },
  });

  // 5. Redirect to success page
  redirect(`/success?orderId=${order.id}`);
}
