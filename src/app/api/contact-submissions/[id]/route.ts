import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { read } = await req.json();
  const updated = await prisma.contactSubmission.update({ where: { id }, data: { read: Boolean(read) } });
  return NextResponse.json(updated);
}
