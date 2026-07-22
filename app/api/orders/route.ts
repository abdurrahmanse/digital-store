import { checkoutController } from "@/features/checkout/controllers/checkout.controller";

export async function POST(req: Request) {
  return checkoutController.createOrder(req);
}
