import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { resend } from "./auth.utils";

export async function generateAndSendRegistrationOTP(email: string) {
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
}

export async function registerUser(data: { name: string; email: string; password: string }) {
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

  return await generateAndSendRegistrationOTP(email);
}

export async function verifyRegistrationOTP(data: { email: string; token: string }) {
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
}
