import { authController } from "@/features/auth/controllers/auth.controller";

export async function PUT(req: Request) {
  return authController.updateProfile(req);
}

export async function PATCH(req: Request) {
  return authController.updateProfile(req);
}
