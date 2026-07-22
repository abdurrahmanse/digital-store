import { couponController } from "@/features/coupon/controllers/coupon.controller";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return couponController.updateCoupon(req, { params });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return couponController.deleteCoupon(req, { params });
}
