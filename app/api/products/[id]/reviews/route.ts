import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to leave a review." },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const productId = resolvedParams.id;
    const body = await req.json();
    const { rating, comment } = body;

    // Validate inputs
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Valid rating between 1 and 5 is required." },
        { status: 400 }
      );
    }

    if (!comment || typeof comment !== "string" || comment.trim().length === 0) {
      return NextResponse.json(
        { error: "Review comment is required." },
        { status: 400 }
      );
    }

    // Optional: Check if user already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        userId: session.user.id,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product." },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        rating,
        comment: comment.trim(),
        productId,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
          }
        }
      }
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    console.error("Create review error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while saving your review." },
      { status: 500 }
    );
  }
}
