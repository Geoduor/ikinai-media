"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/site-data";

type PortfolioFormValues = {
  id?: string;
  title: string;
  description: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  serviceTag: string;
  featured: boolean;
};

export function PortfolioForm({ initial }: { initial?: PortfolioFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<PortfolioFormValues>(
    initial ?? {
      title: "",
      description: "",
      mediaType: "image",
      mediaUrl: "",
      serviceTag: services[0].name,
      featured: false,
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = Boolean(initial?.id);

  async function save() {
    setSaving(true);
    setError(null);
    const res = await fetch(isEdit ? `/api/portfolio/${initial!.id}` : "/api/portfolio", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not save portfolio item.");
      return;
    }
    router.push("/admin/portfolio");
    router.refresh();
  }

  async function remove() {
    if (!isEdit) return;
    if (!confirm("Delete this portfolio item? This can't be undone.")) return;
    await fetch(`/api/portfolio/${initial!.id}`, { method: "DELETE" });
    router.push("/admin/portfolio");
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
        <label className="font-mono text-[12px] uppercase tracking-wider text-ink/60">Service</label>
        <select
          value={values.serviceTag}
          onChange={(e) => setValues({ ...values, serviceTag: e.target.value })}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
        >
          {services.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-mono text-[12px] uppercase tracking-wider text-ink/60">Media type</label>
        <div className="mt-2 flex gap-3">
          {(["image", "video"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setValues({ ...values, mediaType: t })}
              className={`rounded-full border px-4 py-2 font-mono text-[12px] uppercase tracking-wider ${
                values.mediaType === t
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink/60 hover:border-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-mono text-[12px] uppercase tracking-wider text-ink/60">
          {values.mediaType === "image" ? "Image URL" : "Video embed URL (YouTube/Vimeo embed link)"}
        </label>
        <input
          value={values.mediaUrl}
          onChange={(e) => setValues({ ...values, mediaUrl: e.target.value })}
          placeholder={
            values.mediaType === "image"
              ? "https://…"
              : "https://www.youtube.com/embed/VIDEO_ID"
          }
          className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
        />
        {values.mediaType === "video" && (
          <p className="mt-1 text-xs text-ink/50">
            Use the embeddable player link, not a regular watch link — e.g.
            youtube.com/embed/… rather than youtube.com/watch?v=…
          </p>
        )}
      </div>

      <div>
        <label className="font-mono text-[12px] uppercase tracking-wider text-ink/60">Description</label>
        <textarea
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
          rows={3}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(e) => setValues({ ...values, featured: e.target.checked })}
        />
        Feature this item
      </label>

      {error && <p className="text-sm text-maroon">{error}</p>}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-paper hover:bg-signal hover:text-ink disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Add to portfolio"}
        </button>
        {isEdit && (
          <button
            onClick={remove}
            className="rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-maroon hover:underline"
          >
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}
