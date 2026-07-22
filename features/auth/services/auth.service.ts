import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export const authService = {
  async registerUser(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: null,
      },
    });

    return await this.generateAndSendRegistrationOTP(email);
  },

  async loginUser(
    data: { email: string; password: string },
    clientInfo: { userAgent: string; ip: string; city: string | null; region: string | null; country: string | null }
  ) {
    const { email, password } = data;

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
          const { userAgent, ip: realIp, city, region, country } = clientInfo;
          const { browser, os } = parseUserAgent(userAgent);
          
          let resolvedCity = city;
          let resolvedRegion = region;
          let resolvedCountry = country;

          // Fallback to IP geolocation API if headers are missing and IP is public
          if (!resolvedCountry && realIp !== "127.0.0.1" && realIp !== "::1") {
            const geoRes = await fetch(`http://ip-api.com/json/${realIp}?fields=status,countryCode,regionName,city`)
              .then(res => res.json())
              .catch(() => null);
            if (geoRes && geoRes.status === "success") {
              resolvedCity = geoRes.city;
              resolvedRegion = geoRes.regionName;
              resolvedCountry = geoRes.countryCode;
            }
          }

          await prisma.deviceSession.create({
            data: {
              userId: user.id,
              ipAddress: realIp,
              browser,
              os,
              city: resolvedCity,
              region: resolvedRegion,
              country: resolvedCountry,
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
          throw new Error("unverified");
        }
        switch (error.type) {
          case "CredentialsSignin":
            throw new Error("Invalid credentials.");
          default:
            throw new Error("Something went wrong.");
        }
      }
      throw error;
    }
  },

  async generateAndSendOTP(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: true }; // prevent email enumeration
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.verificationToken.deleteMany({
      where: { email },
    });

    await prisma.verificationToken.create({
      data: { email, token, expires },
    });

    const { error } = await resend.emails.send({
      from: "DigitalStore <onboarding@resend.dev>",
      to: email,
      subject: "Your Password Reset Code",
      html: `<p>Your password reset code is: <strong>${token}</strong></p><p>This code will expire in 15 minutes.</p>`,
      text: `Your password reset code is: ${token}\n\nThis code will expire in 15 minutes.`,
    });

    console.log(`[DEV] Password Reset OTP for ${email}: ${token}`);

    if (error) {
      throw new Error(error.message || "Failed to send reset code");
    }

    return { success: true };
  },

  async verifyOTPAndResetPassword(data: { email: string; token: string; password: string }) {
    const { email, token, password: newPassword } = data;

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        email_token: { email, token },
      },
    });

    if (!verificationToken) {
      throw new Error("Invalid code");
    }

    if (verificationToken.expires < new Date()) {
      throw new Error("Code has expired");
    }

    const hashedPassword = await hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return { success: true };
  },

  async generateAndSendRegistrationOTP(email: string) {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.verificationToken.deleteMany({
      where: { email },
    });

    await prisma.verificationToken.create({
      data: { email, token, expires },
    });

    const { error } = await resend.emails.send({
      from: "DigitalStore <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email address",
      html: `<p>Your email verification code is: <strong>${token}</strong></p><p>This code will expire in 15 minutes.</p>`,
      text: `Your email verification code is: ${token}\n\nThis code will expire in 15 minutes.`,
    });

    console.log(`[DEV] Registration OTP for ${email}: ${token}`);

    if (error) {
      throw new Error(error.message || "Failed to send email");
    }

    return { success: true, pendingVerification: true };
  },

  async verifyRegistrationOTP(data: { email: string; token: string }) {
    const { email, token } = data;

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        email_token: { email, token },
      },
    });

    if (!verificationToken) {
      throw new Error("Invalid code");
    }

    if (verificationToken.expires < new Date()) {
      throw new Error("Code has expired");
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return { success: true };
  },

  async updateProfile(userId: string, data: { name?: string; password?: string }) {
    const { name, password } = data;
    const updateData: any = {};

    if (name && name.trim().length > 0) {
      updateData.name = name.trim();
    }

    if (password && password.trim().length >= 6) {
      updateData.password = await hash(password, 12);
    } else if (password && password.trim().length > 0) {
      throw new Error("Password must be at least 6 characters");
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("Nothing to update");
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return { success: true };
  }
};
