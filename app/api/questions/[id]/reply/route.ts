import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { replyMessage } = await req.json();

    if (!replyMessage) {
      return NextResponse.json(
        { error: "Reply message is required" },
        { status: 400 }
      );
    }

    const question = await prisma.question.findUnique({
      where: { id },
      include: { product: true }
    });

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      const subject = question.product 
        ? `Re: Your question about ${question.product.name}`
        : "Re: Your question";

      await resend.emails.send({
        from: "DigitalStore <onboarding@resend.dev>",
        to: question.email, // Sends to the customer
        subject,
        html: `
          <p>Hi there,</p>
          <p>You asked:</p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
            ${question.question}
          </blockquote>
          <p><strong>Our Reply:</strong></p>
          <p style="white-space: pre-wrap;">${replyMessage}</p>
          <br />
          <p>Best regards,<br/>The DigitalStore Team</p>
        `,
        text: `Hi there,\n\nYou asked:\n"${question.question}"\n\nOur Reply:\n${replyMessage}\n\nBest regards,\nThe DigitalStore Team`,
      });
    }

    // Update status to answered
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: { status: "ANSWERED" },
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error("Error replying to question:", error);
    return NextResponse.json(
      { error: "Failed to reply to question" },
      { status: 500 }
    );
  }
}
