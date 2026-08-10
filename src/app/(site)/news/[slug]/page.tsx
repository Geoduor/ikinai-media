import { notFound } from "next/navigation";
import { Eyebrow, Section } from "@/components/ui";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  return (
    <Section className="max-w-3xl">
      <Eyebrow>{post.category}</Eyebrow>
      <h1 className="mt-3 font-display text-4xl leading-tight">{post.title}</h1>
      {post.publishedAt && (
        <p className="mt-3 font-mono text-[12px] uppercase tracking-wider text-ink/50">
          {new Date(post.publishedAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      )}
      <div className="prose prose-neutral mt-10 max-w-none whitespace-pre-wrap text-ink/85">
        {post.body}
      </div>
    </Section>
  );
}
