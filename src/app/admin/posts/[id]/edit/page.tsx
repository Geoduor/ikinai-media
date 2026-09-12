import { notFound } from "next/navigation";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { PostForm } from "../../PostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">Edit post</h1>
      <div className="mt-8">
        <PostForm
          initial={{
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            body: post.body,
            coverImage: post.coverImage ?? "",
            category: post.category,
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
