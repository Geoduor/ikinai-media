import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { InboxList } from "./InboxList";

export default async function InboxPage() {
  await requireSession();
  const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-3xl">Contact inbox</h1>
      <p className="mt-1 text-ink/60">Messages sent through the public contact form.</p>
      <div className="mt-8">
        <InboxList
          submissions={submissions.map((s) => ({
            ...s,
            createdAt: s.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
