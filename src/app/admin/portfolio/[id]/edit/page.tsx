import { notFound } from "next/navigation";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { PortfolioForm } from "../../PortfolioForm";

export default async function EditPortfolioItemPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;
  const item = await prisma.portfolioItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">Edit portfolio item</h1>
      <div className="mt-8">
        <PortfolioForm
          initial={{
            id: item.id,
            title: item.title,
            description: item.description,
            mediaType: item.mediaType as "image" | "video",
            mediaUrl: item.mediaUrl,
            serviceTag: item.serviceTag,
            featured: item.featured,
          }}
        />
      </div>
    </div>
  );
}
