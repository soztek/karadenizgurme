"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Loader2, Link2, Trash2 } from "lucide-react";
import { uploadMedia } from "@/lib/actions/media";
import { fieldInput } from "./ui";

export function ImageField({
  name,
  label = "Görsel",
  defaultValue = "",
  folder = "genel",
  required,
}: {
  name: string;
  label?: string;
  defaultValue?: string;
  folder?: string;
  required?: boolean;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await uploadMedia(fd);
    setUploading(false);
    if (res.ok && res.url) setUrl(res.url);
    else setError(res.error || "Yükleme başarısız.");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-brand">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>
      <input type="hidden" name={name} value={url} />

      <div className="flex items-start gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-brand/15 bg-cream">
          {url ? (
            <Image src={url} alt="" fill sizes="80px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-brand/30">
              <Upload className="h-6 w-6" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-brand/20 px-3 py-2 text-xs font-medium text-brand hover:bg-brand/5 disabled:opacity-60"
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              {uploading ? "Yükleniyor..." : "Dosya Yükle"}
            </button>
            {url ? (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Kaldır
              </button>
            ) : null}
          </div>
          <div className="relative">
            <Link2 className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/40" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="veya görsel bağlantısı yapıştırın"
              className={`${fieldInput} pl-8 text-xs`}
            />
          </div>
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
