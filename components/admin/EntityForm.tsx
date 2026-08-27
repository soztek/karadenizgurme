"use client";

import { useState, useTransition } from "react";
import { Loader2, AlertCircle, Save } from "lucide-react";
import type { ActionResult } from "@/lib/actions/helpers";

export function EntityForm({
  action,
  onDone,
  children,
  submitLabel = "Kaydet",
}: {
  action: (formData: FormData) => Promise<ActionResult>;
  onDone: () => void;
  children: React.ReactNode;
  submitLabel?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError("");
    startTransition(async () => {
      const res = await action(formData);
      if (res.ok) onDone();
      else setError(res.error || "Kaydedilemedi.");
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
      {error ? (
        <p className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : null}
      <div className="flex justify-end gap-2 border-t border-brand/10 pt-4">
        <button
          type="button"
          onClick={onDone}
          className="rounded-full px-4 py-2 text-sm font-medium text-charcoal/60 hover:bg-brand/5"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-cream hover:bg-brand-600 disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export function DeleteButton({
  onDelete,
  label = "Sil",
  confirmText = "Bu kaydı silmek istediğinize emin misiniz?",
  className = "",
  children,
}: {
  onDelete: () => Promise<ActionResult>;
  label?: string;
  confirmText?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [pending, startTransition] = useTransition();
  function handle() {
    if (!window.confirm(confirmText)) return;
    startTransition(async () => {
      await onDelete();
    });
  }
  return (
    <button
      type="button"
      onClick={handle}
      disabled={pending}
      aria-label={label}
      className={
        className ||
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
      }
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : children}
    </button>
  );
}
