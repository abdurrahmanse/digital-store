"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!email || !message) {
    return { success: false, error: "Email and message are required" };
  }

  try {
    const data = await resend.emails.send({
      from: "DigitalStore <onboarding@resend.dev>",
      to: "hello@digitalstore.com", // Replace with store owner's email
      replyTo: email,
      subject: `New Contact Request: ${subject || 'No Subject'}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
