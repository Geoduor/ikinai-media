import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, mediaType, mediaUrl, serviceTag, featured } = body;

  if (!title || !description || !mediaType || !mediaUrl || !serviceTag) {
    return NextResponse.json(
      { error: "Title, description, media type, media URL and service are required." },
      { status: 400 }
    );
  }
  if (mediaType !== "image" && mediaType !== "video") {
    return NextResponse.json({ error: "Media type must be 'image' or 'video'." }, { status: 400 });
  }

  const item = await prisma.portfolioItem.create({
    data: { title, description, mediaType, mediaUrl, serviceTag, featured: Boolean(featured) },
  });

  return NextResponse.json(item, { status: 201 });
}
