"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Loader2,
  type LucideIcon,
} from "lucide-react";

type Daily = { date: string; code: number; max: number; min: number };
type WeatherData = { temp: number; code: number; daily: Daily[] };

function codeInfo(code: number): { label: string; Icon: LucideIcon } {
  if (code === 0) return { label: "Açık", Icon: Sun };
  if (code <= 2) return { label: "Az bulutlu", Icon: CloudSun };
  if (code === 3) return { label: "Bulutlu", Icon: Cloud };
  if (code <= 48) return { label: "Sisli", Icon: CloudFog };
  if (code <= 67) return { label: "Yağmurlu", Icon: CloudRain };
  if (code <= 77) return { label: "Karlı", Icon: CloudSnow };
  if (code <= 82) return { label: "Sağanak", Icon: CloudRain };
  if (code <= 86) return { label: "Kar sağanağı", Icon: CloudSnow };
  return { label: "Gök gürültülü", Icon: CloudLightning };
}

const days = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

export function WeatherWidget({
  lat,
  lng,
  label = "Tesis çevresi",
}: {
  lat: number | null;
  lng: number | null;
  label?: string;
}) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (lat == null || lng == null) return;
    setState("loading");
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3`;
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        const daily: Daily[] = (j.daily?.time ?? []).map(
          (t: string, i: number) => ({
            date: t,
            code: j.daily.weather_code[i],
            max: Math.round(j.daily.temperature_2m_max[i]),
            min: Math.round(j.daily.temperature_2m_min[i]),
          }),
        );
        setData({
          temp: Math.round(j.current.temperature_2m),
          code: j.current.weather_code,
          daily,
        });
        setState("idle");
      })
      .catch(() => setState("error"));
  }, [lat, lng]);

  if (lat == null || lng == null) {
    return (
      <div className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-5">
        <h3 className="font-display text-lg font-semibold text-brand">
          Hava Durumu
        </h3>
        <p className="mt-2 text-sm text-charcoal/60">
          Harita koordinatları yönetim panelinden girildiğinde güzergah hava
          durumu burada canlı olarak gösterilecektir.
        </p>
      </div>
    );
  }

  const now = data ? codeInfo(data.code) : null;

  return (
    <div className="rounded-[var(--radius-card)] border border-brand/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-brand">
          Hava Durumu
        </h3>
        <span className="text-xs text-charcoal/45">{label}</span>
      </div>

      {state === "loading" ? (
        <div className="mt-4 flex items-center gap-2 text-sm text-charcoal/50">
          <Loader2 className="h-4 w-4 animate-spin" /> Yükleniyor...
        </div>
      ) : state === "error" || !data || !now ? (
        <p className="mt-4 text-sm text-charcoal/60">
          Hava durumu şu an alınamadı.
        </p>
      ) : (
        <>
          <div className="mt-3 flex items-center gap-3">
            <now.Icon className="h-11 w-11 text-mustard" />
            <div>
              <p className="text-3xl font-bold text-brand">{data.temp}°</p>
              <p className="text-sm text-charcoal/60">{now.label}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-brand/10 pt-3">
            {data.daily.map((d) => {
              const info = codeInfo(d.code);
              const label =
                d === data.daily[0]
                  ? "Bugün"
                  : days[new Date(d.date).getDay()];
              return (
                <div key={d.date} className="text-center">
                  <p className="text-xs text-charcoal/50">{label}</p>
                  <info.Icon className="mx-auto my-1 h-5 w-5 text-mustard-600" />
                  <p className="text-xs">
                    <span className="font-semibold text-brand">{d.max}°</span>{" "}
                    <span className="text-charcoal/45">{d.min}°</span>
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[10px] text-charcoal/35">
            Kaynak: Open-Meteo
          </p>
        </>
      )}
    </div>
  );
}
