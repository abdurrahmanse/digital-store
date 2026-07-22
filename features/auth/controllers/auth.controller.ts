import { NextResponse } from "next/server";
import { authService } from "@/features/auth/services/auth.service";
import { LoginSchema, RegisterSchema } from "@/features/auth/validations/auth";
import { auth } from "@/auth";

export const authController = {
  async register(req: Request) {
    try {
      const body = await req.json();
      const validatedFields = RegisterSchema.safeParse(body);

      if (!validatedFields.success) {
        return NextResponse.json(
          { error: validatedFields.error.issues[0].message },
          { status: 400 }
        );
      }

      const result = await authService.registerUser(validatedFields.data);
      return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
      console.error("Register controller error:", error);
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 400 }
      );
    }
  },

  async login(req: Request) {
    try {
      const body = await req.json();
      const validatedFields = LoginSchema.safeParse(body);

      if (!validatedFields.success) {
        return NextResponse.json(
          { error: validatedFields.error.issues[0].message },
          { status: 400 }
        );
      }

      const userAgent = req.headers.get("user-agent") || "";
      const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
      const city = req.headers.get("x-vercel-ip-city") || null;
      const region = req.headers.get("x-vercel-ip-country-region") || null;
      const country = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || null;

      const clientInfo = {
        userAgent,
        ip: ip.split(",")[0].trim(),
        city,
        region,
        country
      };

      const result = await authService.loginUser(validatedFields.data, clientInfo);
      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      console.error("Login controller error:", error);
      if (error.message === "unverified") {
        return NextResponse.json({ error: "unverified" }, { status: 403 });
      }
      return NextResponse.json(
        { error: error.message || "Invalid credentials." },
        { status: 401 }
      );
    }
  },

  async generateOTP(req: Request) {
    try {
      const body = await req.json();
      const { email, type } = body;

      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }

      let result;
      if (type === "registration") {
        result = await authService.generateAndSendRegistrationOTP(email);
      } else {
        result = await authService.generateAndSendOTP(email);
      }

      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      console.error("Generate OTP controller error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send code" },
        { status: 400 }
      );
    }
  },

  async verifyOTP(req: Request) {
    try {
      const body = await req.json();
      const { email, token, password, type } = body;

      if (!email || !token) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      let result;
      if (type === "registration") {
        result = await authService.verifyRegistrationOTP({ email, token });
      } else {
        if (!password) {
          return NextResponse.json({ error: "Missing new password" }, { status: 400 });
        }
        result = await authService.verifyOTPAndResetPassword({ email, token, password });
      }

      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      console.error("Verify OTP controller error:", error);
      return NextResponse.json(
        { error: error.message || "Verification failed" },
        { status: 400 }
      );
    }
  },

  async updateProfile(req: Request) {
    try {
      const session = await auth();

      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json();
      const result = await authService.updateProfile(session.user.id, body);
      
      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      console.error("Update profile controller error:", error);
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 400 }
      );
    }
  }
};
