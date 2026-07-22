import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, question, productId } = body;

    if (!email || !question) {
      return NextResponse.json(
        { error: "Email and question are required" },
        { status: 400 }
      );
    }

    const newQuestion = await prisma.question.create({
      data: {
        email,
        question,
        ...(productId && { productId }),
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error: any) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { error: "Failed to submit question" },
      { status: 500 }
    );
  }
}
