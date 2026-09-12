import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }

  await prisma.contactSubmission.create({
    data: { name: String(name), email: String(email), message: String(message) },
  });

  // Optional next step: wire an email/notification provider here so the
  // admin also gets an email alert, not just an inbox entry.

  return NextResponse.json({ ok: true });
}
