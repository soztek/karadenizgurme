"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const KEY = "kg-cookie-consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* localStorage yoksa gösterme */
    }
  }, []);

  function decide(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* yoksay */
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-20 z-50 px-4 lg:bottom-4">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-[var(--radius-card)] border border-cream/15 bg-charcoal p-4 text-cream shadow-xl sm:flex-row sm:items-center sm:gap-4">
        <Cookie className="hidden h-6 w-6 shrink-0 text-mustard-400 sm:block" />
        <p className="flex-1 text-sm leading-relaxed text-cream/85">
          Bu sitede deneyiminizi iyileştirmek için gerekli çerezler
          kullanılabilir. Detaylar için{" "}
          <Link href="/gizlilik" className="font-medium text-mustard-400 underline">
            Gizlilik ve Çerez Politikası
          </Link>
          .
        </p>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="flex-1 rounded-full border border-cream/25 px-4 py-2 text-sm font-medium text-cream/85 transition-colors hover:bg-cream/10 sm:flex-none"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="flex-1 rounded-full bg-mustard px-5 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-mustard-600 sm:flex-none"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
