import { prisma } from "@/lib/prisma";

export const couponService = {
  async createCoupon(data: any) {
    // Check if code already exists
    const existing = await prisma.coupon.findUnique({
      where: { code: data.code.toUpperCase() }
    });
    
    if (existing) {
      throw new Error("A coupon with this code already exists");
    }
    
    return await prisma.coupon.create({
      data: {
        code: data.code.toUpperCase(),
        discountType: data.discountType,
        discountValue: Number(data.discountValue),
        usageLimit: data.usageLimit ? Number(data.usageLimit) : null,
        isActive: data.isActive,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      }
    });
  },

  async updateCoupon(id: string, data: any) {
    if (data.code) {
      // Check if another coupon uses this code
      const existing = await prisma.coupon.findUnique({
        where: { code: data.code.toUpperCase() }
      });
      if (existing && existing.id !== id) {
        throw new Error("Another coupon with this code already exists");
      }
    }

    const updateData: any = {};
    if (data.code !== undefined) updateData.code = data.code.toUpperCase();
    if (data.discountType !== undefined) updateData.discountType = data.discountType;
    if (data.discountValue !== undefined) updateData.discountValue = Number(data.discountValue);
    if (data.usageLimit !== undefined) updateData.usageLimit = data.usageLimit ? Number(data.usageLimit) : null;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.expiresAt !== undefined) updateData.expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;

    return await prisma.coupon.update({
      where: { id },
      data: updateData,
    });
  },

  async deleteCoupon(id: string) {
    return await prisma.coupon.delete({
      where: { id },
    });
  },

  async validateCoupon(code: string) {
    if (!code) {
      throw new Error("Coupon code is required");
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!coupon) {
      throw new Error("Invalid coupon code");
    }

    if (!coupon.isActive) {
      throw new Error("This coupon is currently inactive");
    }

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      throw new Error("This coupon has reached its usage limit");
    }

    if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
      throw new Error("This coupon has expired");
    }

    return {
      valid: true,
      id: coupon.id,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue
    };
  }
};
