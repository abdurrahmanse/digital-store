import { NextResponse } from "next/server";
import { couponService } from "@/features/coupon/services/coupon.service";

export const couponController = {
  async createCoupon(req: Request) {
    try {
      const data = await req.json();
      const coupon = await couponService.createCoupon(data);
      return NextResponse.json(coupon, { status: 201 });
    } catch (error: any) {
      const status = error.message.includes("already exists") ? 400 : 500;
      return NextResponse.json(
        { error: error.message || "Failed to create coupon" },
        { status }
      );
    }
  },

  async updateCoupon(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const data = await req.json();
      const coupon = await couponService.updateCoupon(id, data);
      return NextResponse.json(coupon);
    } catch (error: any) {
      const status = error.message.includes("already exists") ? 400 : 500;
      return NextResponse.json(
        { error: error.message || "Failed to update coupon" },
        { status }
      );
    }
  },

  async deleteCoupon(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      await couponService.deleteCoupon(id);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Failed to delete coupon" },
        { status: 500 }
      );
    }
  },

  async validateCoupon(req: Request) {
    try {
      const { code } = await req.json();
      const result = await couponService.validateCoupon(code);
      return NextResponse.json(result);
    } catch (error: any) {
      const status = error.message.includes("is required") ? 400 : 
                     error.message.includes("Invalid") ? 404 : 400;
      return NextResponse.json(
        { error: error.message || "Failed to validate coupon" },
        { status }
      );
    }
  }
};
