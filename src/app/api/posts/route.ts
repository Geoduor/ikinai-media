import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/slugify";

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, excerpt, content, coverImage, category, published } = body;

  if (!title || !excerpt || !content || !category) {
    return NextResponse.json({ error: "Title, excerpt, body and category are required." }, { status: 400 });
  }

  let slug = slugify(title);
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      body: content,
      coverImage: coverImage || null,
      category,
      published: Boolean(published),
      publishedAt: published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
