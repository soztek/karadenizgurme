"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export function TagPicker({
  name,
  label,
  options,
  defaultValue = [],
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string[];
}) {
  const [selected, setSelected] = useState<string[]>(defaultValue);
  const [custom, setCustom] = useState("");

  function toggle(tag: string) {
    setSelected((s) =>
      s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag],
    );
  }
  function addCustom() {
    const t = custom.trim();
    if (t && !selected.includes(t)) setSelected((s) => [...s, t]);
    setCustom("");
  }

  const suggestions = options.filter((o) => !selected.includes(o));

  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-brand">{label}</span>
      <input type="hidden" name={name} value={JSON.stringify(selected)} />

      {selected.length ? (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {selected.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand"
            >
              {t}
              <button type="button" onClick={() => toggle(t)} aria-label={`${t} kaldır`}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      {suggestions.length ? (
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => toggle(o)}
              className="rounded-full border border-brand/20 px-2.5 py-1 text-xs text-charcoal/70 hover:border-mustard hover:text-mustard"
            >
              + {o}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-2 flex gap-2">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
          placeholder="Özel etiket ekle"
          className="flex-1 rounded-lg border border-brand/15 bg-white px-3 py-1.5 text-xs outline-none focus:border-mustard"
        />
        <button
          type="button"
          onClick={addCustom}
          className="inline-flex items-center gap-1 rounded-lg border border-brand/20 px-3 py-1.5 text-xs text-brand hover:bg-brand/5"
        >
          <Plus className="h-3 w-3" />
          Ekle
        </button>
      </div>
    </div>
  );
}
