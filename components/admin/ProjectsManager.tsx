"use client";

import { useEffect, useState } from "react";
import { Trash2, Pencil, Plus, Upload, X, Star, Loader2, Tag } from "lucide-react";
import { subscribeToProjects, createProject, updateProject, deleteProject } from "@/lib/projects";
import { uploadProjectImage } from "@/lib/uploadImage";
import type { Project, ProjectInput } from "@/lib/types";

const EMPTY_FORM: ProjectInput = {
  title: "",
  description: "",
  tags: [],
  imageUrl: "",
  sourceUrl: "",
  liveUrl: "",
  featured: false,
  order: 0,
  forSale: false,
  price: "",
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectInput>(EMPTY_FORM);
  const [tagsText, setTagsText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToProjects(setProjects, (e) => setError(e.message));
    return unsubscribe;
  }, []);

  function resetForm() {
    setForm({ ...EMPTY_FORM, order: projects.length });
    setTagsText("");
    setEditingId(null);
  }

  function startEdit(project: Project) {
    setForm({
      title: project.title,
      description: project.description,
      tags: project.tags,
      imageUrl: project.imageUrl,
      sourceUrl: project.sourceUrl || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured,
      order: project.order,
      forSale: project.forSale || false,
      price: project.price || "",
    });
    setTagsText(project.tags.join(", "));
    setEditingId(project.id);
    setShowForm(true);
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadProjectImage(file);
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.imageUrl) {
      setError("Upload an image before saving.");
      return;
    }
    setSaving(true);
    const payload: ProjectInput = {
      ...form,
      tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await deleteProject(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-xl text-fg">Projects ({projects.length})</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm((s) => !s);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-fg text-bg font-semibold text-xs uppercase tracking-wide hover:bg-fg-dim transition-colors"
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? "Close" : "Add Project"}
        </button>
      </div>

      {error && (
        <p className="text-fg-dim text-xs font-mono mb-4 border border-border px-3 py-2">
          {error}
        </p>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="card-frame p-6 mb-8 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
            {editingId ? "Edit Project" : "New Project"}
          </h3>

          <div>
            <label className="block font-mono text-xs text-muted uppercase mb-1">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full bg-transparent border border-border px-3 py-2 text-sm focus:border-fg outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-muted uppercase mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full bg-transparent border border-border px-3 py-2 text-sm focus:border-fg outline-none resize-none"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-muted uppercase mb-1">
              Tags (comma separated)
            </label>
            <input
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="React, Firebase, TypeScript"
              className="w-full bg-transparent border border-border px-3 py-2 text-sm focus:border-fg outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-muted uppercase mb-1">Source URL</label>
              <input
                value={form.sourceUrl}
                onChange={(e) => setForm((f) => ({ ...f, sourceUrl: e.target.value }))}
                placeholder="https://github.com/..."
                className="w-full bg-transparent border border-border px-3 py-2 text-sm focus:border-fg outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-muted uppercase mb-1">Live URL</label>
              <input
                value={form.liveUrl}
                onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
                placeholder="https://..."
                className="w-full bg-transparent border border-border px-3 py-2 text-sm focus:border-fg outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-muted uppercase mb-2">Image</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 border border-border cursor-pointer hover:border-fg transition-colors text-xs font-mono uppercase">
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                {uploading ? "Uploading to GitHub…" : "Upload Image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              {form.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.imageUrl} alt="preview" className="w-16 h-16 object-cover border border-border" />
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border">
            <label className="flex items-center gap-2 font-mono text-xs uppercase text-muted pt-4">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 font-mono text-xs uppercase text-muted pt-4">
              <input
                type="checkbox"
                checked={form.forSale}
                onChange={(e) => setForm((f) => ({ ...f, forSale: e.target.checked }))}
              />
              <Tag size={12} /> For Sale
            </label>
          </div>

          {form.forSale && (
            <div>
              <label className="block font-mono text-xs text-muted uppercase mb-1">
                Price (shown as a badge on the card)
              </label>
              <input
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="₹4,999 or Starts at ₹9,999"
                className="w-full bg-transparent border border-border px-3 py-2 text-sm focus:border-fg outline-none"
              />
              <p className="text-muted text-xs font-mono mt-1">
                Clicking the card will open an email inquiry instead of the source link.
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="font-mono text-xs uppercase text-muted">Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
              className="w-20 bg-transparent border border-border px-2 py-1 text-sm focus:border-fg outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving || uploading}
            className="px-5 py-2.5 bg-fg text-bg font-semibold text-sm uppercase tracking-wide hover:bg-fg-dim transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Update Project" : "Publish Project"}
          </button>
        </form>
      )}

      <div className="grid gap-3">
        {projects.map((p) => (
          <div key={p.id} className="card-frame p-4 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.imageUrl} alt={p.title} className="w-16 h-16 object-cover border border-border flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-fg truncate">{p.title}</h4>
                {p.featured && <Star size={12} className="text-fg flex-shrink-0" fill="currentColor" />}
                {p.forSale && (
                  <span className="text-[10px] font-mono border border-border-strong px-1.5 py-0.5 flex-shrink-0">
                    {p.price || "For Sale"}
                  </span>
                )}
              </div>
              <p className="text-muted text-xs truncate">{p.tags.join(" · ")}</p>
            </div>
            <button
              onClick={() => startEdit(p)}
              className="p-2 border border-border hover:border-fg transition-colors"
              aria-label="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="p-2 border border-border invert-hover transition-colors"
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-muted text-sm font-mono">No projects yet — add your first one.</p>
        )}
      </div>
    </div>
  );
}
