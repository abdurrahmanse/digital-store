import { authController } from "@/features/auth/controllers/auth.controller";

export async function POST(req: Request) {
  return authController.generateOTP(req);
}
