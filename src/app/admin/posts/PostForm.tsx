"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["News", "Podcast", "Documentary", "Event Recap"];

type PostFormValues = {
  id?: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  category: string;
  published: boolean;
};

export function PostForm({ initial }: { initial?: PostFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>(
    initial ?? { title: "", excerpt: "", body: "", coverImage: "", category: CATEGORIES[0], published: false }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = Boolean(initial?.id);

  async function save(publish?: boolean) {
    setSaving(true);
    setError(null);
    const payload = {
      title: values.title,
      excerpt: values.excerpt,
      content: values.body,
      coverImage: values.coverImage,
      category: values.category,
      published: publish ?? values.published,
    };
    const res = await fetch(isEdit ? `/api/posts/${initial!.id}` : "/api/posts", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not save post.");
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  async function remove() {
    if (!isEdit) return;
    if (!confirm("Delete this post? This can't be undone.")) return;
    await fetch(`/api/posts/${initial!.id}`, { method: "DELETE" });
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <label className="font-mono text-[12px] uppercase tracking-wider text-ink/60">Title</label>
        <input
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
        />
      </div>
      <div>
        <label className="font-mono text-[12px] uppercase tracking-wider text-ink/60">Category</label>
        <select
          value={values.category}
          onChange={(e) => setValues({ ...values, category: e.target.value })}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="font-mono text-[12px] uppercase tracking-wider text-ink/60">Cover image URL</label>
        <input
          value={values.coverImage}
          onChange={(e) => setValues({ ...values, coverImage: e.target.value })}
          placeholder="https://…"
          className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
        />
      </div>
      <div>
        <label className="font-mono text-[12px] uppercase tracking-wider text-ink/60">Excerpt</label>
        <textarea
          value={values.excerpt}
          onChange={(e) => setValues({ ...values, excerpt: e.target.value })}
          rows={2}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
        />
      </div>
      <div>
        <label className="font-mono text-[12px] uppercase tracking-wider text-ink/60">Body</label>
        <textarea
          value={values.body}
          onChange={(e) => setValues({ ...values, body: e.target.value })}
          rows={12}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
        />
      </div>

      {error && <p className="text-sm text-maroon">{error}</p>}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={() => save(false)}
          disabled={saving}
          className="rounded-full border border-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider hover:bg-ink hover:text-paper disabled:opacity-50"
        >
          Save draft
        </button>
        <button
          onClick={() => save(true)}
          disabled={saving}
          className="rounded-full bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-paper hover:bg-signal hover:text-ink disabled:opacity-50"
        >
          {values.published ? "Save & keep published" : "Publish"}
        </button>
        {isEdit && (
          <button
            onClick={remove}
            className="rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-maroon hover:underline"
          >
            Delete post
          </button>
        )}
      </div>
    </div>
  );
}
