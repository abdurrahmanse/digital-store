import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    
    if (data.code) {
      // Check if another coupon uses this code
      const existing = await prisma.coupon.findUnique({
        where: { code: data.code.toUpperCase() }
      });
      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: "Another coupon with this code already exists" },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    if (data.code !== undefined) updateData.code = data.code.toUpperCase();
    if (data.discountType !== undefined) updateData.discountType = data.discountType;
    if (data.discountValue !== undefined) updateData.discountValue = Number(data.discountValue);
    if (data.usageLimit !== undefined) updateData.usageLimit = data.usageLimit ? Number(data.usageLimit) : null;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.expiresAt !== undefined) updateData.expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;

    const coupon = await prisma.coupon.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json(coupon);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update coupon" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.coupon.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete coupon" },
      { status: 500 }
    );
  }
}
