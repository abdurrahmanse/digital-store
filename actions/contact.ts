"use server";

import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { ContactSchema } from "@/validations/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const validatedFields = ContactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.issues[0].message };
  }

  const { firstName, lastName, email, subject, message } = validatedFields.data;

  try {
    // 1. Save to Database
    await prisma.contactMessage.create({
      data: {
        firstName,
        lastName,
        email,
        subject,
        message,
      },
    });

    // 2. Send email notification
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "DigitalStore <onboarding@resend.dev>",
        to: "hello@digitalstore.com", // Replace with store owner's email
        replyTo: email,
        subject: `New Contact Request: ${subject}`,
        html: `
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        `,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: "Failed to process your request." };
  }
}
