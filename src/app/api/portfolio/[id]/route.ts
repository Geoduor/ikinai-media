import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.portfolioItem.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { title, description, mediaType, mediaUrl, serviceTag, featured } = body;

  if (mediaType && mediaType !== "image" && mediaType !== "video") {
    return NextResponse.json({ error: "Media type must be 'image' or 'video'." }, { status: 400 });
  }

  const existing = await prisma.portfolioItem.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const item = await prisma.portfolioItem.update({
    where: { id },
    data: { title, description, mediaType, mediaUrl, serviceTag, featured: Boolean(featured) },
  });

  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.portfolioItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
