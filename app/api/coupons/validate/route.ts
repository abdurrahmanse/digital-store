import { couponController } from "@/features/coupon/controllers/coupon.controller";

export async function POST(req: Request) {
  return couponController.validateCoupon(req);
}
