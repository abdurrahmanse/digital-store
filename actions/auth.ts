"use server";

import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { generateAndSendRegistrationOTP } from "@/actions/otp";
import { LoginSchema, RegisterSchema } from "@/validations/auth";

function parseUserAgent(userAgent: string) {
  let browser = "Unknown";
  let os = "Unknown";

  if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("Edg")) browser = "Edge";
  else if (userAgent.includes("Chrome")) browser = "Chrome";
  else if (userAgent.includes("Safari")) browser = "Safari";

  if (userAgent.includes("Win")) os = "Windows";
  else if (userAgent.includes("Mac")) os = "macOS";
  else if (userAgent.includes("Linux")) os = "Linux";
  else if (userAgent.includes("Android")) os = "Android";
  else if (userAgent.includes("like Mac")) os = "iOS";

  return { browser, os };
}

export async function registerUser(formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: null, // Ensure they start unverified
      },
    });

    // Send OTP
    const otpRes = await generateAndSendRegistrationOTP(email);
    if (!otpRes.success) {
      return { error: otpRes.error || "Failed to send verification email" };
    }

    return { success: true, pendingVerification: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong" };
  }
}

export async function loginUser(formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    // Login successful, track session
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      try {
        const headersList = await headers();
        const userAgent = headersList.get("user-agent") || "";
        const ipHeader = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "127.0.0.1";
        const realIp = ipHeader.split(",")[0].trim();
        
        const { browser, os } = parseUserAgent(userAgent);
        
        let city = headersList.get("x-vercel-ip-city") || null;
        let region = headersList.get("x-vercel-ip-country-region") || null;
        let country = headersList.get("x-vercel-ip-country") || headersList.get("cf-ipcountry") || null;
        
        // Fallback to IP geolocation API if headers are missing and IP is public
        if (!country && realIp !== "127.0.0.1" && realIp !== "::1") {
          const geoRes = await fetch(`http://ip-api.com/json/${realIp}?fields=status,countryCode,regionName,city`)
            .then(res => res.json())
            .catch(() => null);
          if (geoRes && geoRes.status === "success") {
            city = geoRes.city;
            region = geoRes.regionName;
            country = geoRes.countryCode;
          }
        }
        
        await prisma.deviceSession.create({
          data: {
            userId: user.id,
            ipAddress: realIp,
            browser,
            os,
            city,
            region,
            country,
            isActive: true,
            lastLogin: new Date(),
          }
        });
      } catch (e) {
        console.error("Failed to track session", e);
      }
    }
    
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err?.message === "unverified" || error.message === "unverified" || error.message.includes("unverified")) {
        return { error: "unverified" };
      }
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}
