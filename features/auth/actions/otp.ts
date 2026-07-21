"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { hash } from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function generateAndSendOTP(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return success anyway to prevent email enumeration
      return { success: true };
    }

    // Generate a 6-digit code
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration to 15 minutes from now
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    // Delete existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { email },
    });

    await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    const { data, error } = await resend.emails.send({
      from: "DigitalStore <onboarding@resend.dev>",
      to: email,
      subject: "Your Password Reset Code",
      html: `<p>Your password reset code is: <strong>${token}</strong></p><p>This code will expire in 15 minutes.</p>`,
      text: `Your password reset code is: ${token}\n\nThis code will expire in 15 minutes.`,
    });

    // Log the token to the console for easy local development
    console.log(`[DEV] Password Reset OTP for ${email}: ${token}`);

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message || "Failed to send reset code" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error generating OTP:", error);
    return { success: false, error: "Failed to send reset code" };
  }
}

export async function verifyOTPAndResetPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;
  const newPassword = formData.get("password") as string;

  if (!email || !token || !newPassword) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        email_token: {
          email,
          token,
        },
      },
    });

    if (!verificationToken) {
      return { success: false, error: "Invalid code" };
    }

    if (verificationToken.expires < new Date()) {
      return { success: false, error: "Code has expired" };
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);

    // Update user
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Delete token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, error: "An error occurred while resetting password" };
  }
}

export async function generateAndSendRegistrationOTP(email: string) {
  if (!email) {
    return { success: false, error: "Email is required" };
  }

  try {
    // Generate a 6-digit code
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration to 15 minutes from now
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    // Delete existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { email },
    });

    await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    const { data, error } = await resend.emails.send({
      from: "DigitalStore <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email address",
      html: `<p>Your email verification code is: <strong>${token}</strong></p><p>This code will expire in 15 minutes.</p>`,
      text: `Your email verification code is: ${token}\n\nThis code will expire in 15 minutes.`,
    });

    // Log the token to the console for easy local development without a verified Resend domain
    console.log(`[DEV] Registration OTP for ${email}: ${token}`);

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message || "Failed to send email" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error generating registration OTP:", error);
    return { success: false, error: "Failed to send verification code" };
  }
}

export async function verifyRegistrationOTP(formData: FormData) {
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;

  if (!email || !token) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        email_token: {
          email,
          token,
        },
      },
    });

    if (!verificationToken) {
      return { success: false, error: "Invalid code" };
    }

    if (verificationToken.expires < new Date()) {
      return { success: false, error: "Code has expired" };
    }

    // Update user's emailVerified field
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    // Delete token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error verifying registration OTP:", error);
    return { success: false, error: "An error occurred while verifying email" };
  }
}
