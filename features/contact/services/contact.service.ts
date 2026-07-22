import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const contactService = {
  async sendContactMessage(data: { firstName: string; lastName: string; email: string; subject: string; message: string; }) {
    const { firstName, lastName, email, subject, message } = data;

    const contactMsg = await prisma.contactMessage.create({
      data: {
        firstName,
        lastName,
        email,
        subject,
        message,
      },
    });

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "DigitalStore <onboarding@resend.dev>",
        to: "learn.abdurrahman@gmail.com", // Replace with store owner's email
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

    return { success: true, id: contactMsg.id };
  },

  async markMessageAsRead(id: string) {
    await prisma.contactMessage.update({
      where: { id },
      data: { status: "READ" },
    });
    return { success: true };
  },

  async deleteMessage(id: string) {
    await prisma.contactMessage.delete({
      where: { id },
    });
    return { success: true };
  }
};
