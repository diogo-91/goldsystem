"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

function SculpturePoster() {
  const id = useId();
  return (
    <svg viewBox="0 0 600 600" className="sculpture-poster" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-segment`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#91b8df" />
          <stop offset=".28" stopColor="#173b6c" />
          <stop offset=".66" stopColor="#071b36" />
          <stop offset="1" stopColor="#3b75b5" />
        </linearGradient>
        <filter id={`${id}-ground`}>
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <ellipse
        cx="300"
        cy="498"
        rx="147"
        ry="19"
        fill="#071b36"
        opacity=".12"
        filter={`url(#${id}-ground)`}
      />
      {Array.from({ length: 132 }, (_, i) => {
        const t = (i / 132) * Math.PI * 2;
        const x = 300 + Math.sin(t * 2) * (112 + Math.cos(t * 3) * 40);
        const y = 280 + Math.cos(t * 2) * (126 + Math.cos(t * 3) * 50);
        const z = Math.sin(t * 3);
        const angle = (t * 360) / Math.PI + 30;
        return (
          <rect
            key={i}
            x={x - 24}
            y={y - 6}
            width={48 + z * 12}
            height="12"
            rx="2"
            fill={`url(#${id}-segment)`}
            stroke="#9ab7d2"
            strokeWidth=".5"
            transform={`rotate(${angle} ${x} ${y})`}
            opacity={0.8 + z * 0.15}
          />
        );
      })}
    </svg>
  );
}

export default function Sculpture({ finale = false }: { finale?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanScene: (() => void) | undefined;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        try {
          const { mountSculpture } = await import("@/lib/sculpture-scene");
          if (disposed) return;
          cleanScene = await mountSculpture(element, finale, (available) => {
            if (!disposed) setReady(available);
          });
          if (disposed) cleanScene?.();
        } catch {
          // The vector geometry remains visible if the 3D chunk cannot load.
        }
      },
      { rootMargin: "180px" },
    );
    observer.observe(element);
    return () => {
      disposed = true;
      observer.disconnect();
      cleanScene?.();
    };
  }, [finale]);

  return (
    <div
      ref={host}
      className={`sculpture ${finale ? "sculpture-finale" : ""} ${ready ? "is-ready" : ""}`}
      role="img"
      aria-label="Escultura autoral: segmentos geométricos formam um sistema tridimensional conectado"
    >
      <SculpturePoster />
      {!finale && (
        <>
          <span className="sculpture-note note-top">
            <i /> SISTEMA EM EVOLUÇÃO
          </span>
          <span className="sculpture-note note-bottom">
            FORMA 001 <ArrowUpRight size={12} /> POSSIBILIDADES INFINITAS
          </span>
          <span className="sculpture-coordinate">GS / ENGINEERING</span>
        </>
      )}
    </div>
  );
}
