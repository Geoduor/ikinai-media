import { requireSession } from "@/lib/session";
import { PostForm } from "../PostForm";

export default async function NewPostPage() {
  await requireSession();
  return (
    <div>
      <h1 className="font-display text-3xl">New post</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
