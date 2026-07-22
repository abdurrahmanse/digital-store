import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { resend } from "./auth.utils";

export async function generateAndSendOTP(email: string) {
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
}

export async function verifyOTPAndResetPassword(data: { email: string; token: string; password: string }) {
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
}
