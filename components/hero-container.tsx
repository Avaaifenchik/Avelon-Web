"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

interface HeroContainerProps {
  onPricingClick?: () => void;
  onFeaturesClick?: () => void;
}

const plusMarks = [
  { x: 90, y: 78, size: 22, rotate: 90, opacity: 0.24 },
  { x: 210, y: 132, size: 18, rotate: 0, opacity: 0.18 },
  { x: 340, y: 70, size: 28, rotate: 90, opacity: 0.22 },
  { x: 480, y: 172, size: 20, rotate: 0, opacity: 0.2 },
  { x: 620, y: 96, size: 34, rotate: 90, opacity: 0.16 },
  { x: 770, y: 150, size: 22, rotate: 0, opacity: 0.2 },
  { x: 930, y: 82, size: 26, rotate: 90, opacity: 0.2 },
  { x: 1080, y: 146, size: 18, rotate: 0, opacity: 0.18 },
  { x: 1210, y: 90, size: 24, rotate: 90, opacity: 0.22 },
  { x: 160, y: 286, size: 24, rotate: 90, opacity: 0.16 },
  { x: 320, y: 324, size: 18, rotate: 0, opacity: 0.18 },
  { x: 470, y: 258, size: 30, rotate: 90, opacity: 0.15 },
  { x: 660, y: 314, size: 20, rotate: 0, opacity: 0.2 },
  { x: 850, y: 274, size: 26, rotate: 90, opacity: 0.16 },
  { x: 1040, y: 320, size: 18, rotate: 0, opacity: 0.18 },
  { x: 1240, y: 292, size: 24, rotate: 90, opacity: 0.18 },
  { x: 250, y: 448, size: 28, rotate: 90, opacity: 0.14 },
  { x: 560, y: 430, size: 20, rotate: 0, opacity: 0.16 },
  { x: 820, y: 452, size: 30, rotate: 90, opacity: 0.14 },
  { x: 1110, y: 438, size: 22, rotate: 0, opacity: 0.16 },
];

function PlusMark({
  x,
  y,
  size,
  rotate,
  opacity,
}: {
  x: number;
  y: number;
  size: number;
  rotate: number;
  opacity: number;
}) {
  const half = size / 2;

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} opacity={opacity}>
      <path d={`M ${-half} 0 H ${half}`} />
      <path d={`M 0 ${-half} V ${half}`} />
    </g>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function TerminalCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const setDefaultTilt = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--rotate-x", "2deg");
    card.style.setProperty("--rotate-y", "-8deg");
    card.style.setProperty("--pointer-x", "60%");
    card.style.setProperty("--pointer-y", "40%");
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = clamp(2 + ((centerY - y) / centerY) * 7, -8, 10);
    const rotateY = clamp(-8 + ((x - centerX) / centerX) * 10, -16, 2);

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--pointer-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--pointer-y", `${(y / rect.height) * 100}%`);
  };

  useEffect(() => {
    setDefaultTilt();
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={setDefaultTilt}
      className="group absolute right-[3%] top-1/2 z-20 hidden w-[420px] -translate-y-1/2 md:block lg:right-[4%] lg:w-[540px] xl:right-[5%] xl:w-[610px]"
    >
      <div
        ref={cardRef}
        className="relative rounded-lg border border-orange-200/80 bg-[#fffaf5] text-stone-900 shadow-[0_30px_80px_rgba(249,115,22,0.12)] transition-[transform,box-shadow] duration-300 ease-out [transform-style:preserve-3d] dark:border-white/10 dark:bg-[#151515] dark:text-white dark:shadow-[0_30px_80px_rgba(0,0,0,0.48)]"
        style={
          {
            transform:
              "perspective(1200px) rotateX(var(--rotate-x, 2deg)) rotateY(var(--rotate-y, -8deg)) translateZ(0)",
            "--rotate-x": "2deg",
            "--rotate-y": "-8deg",
            "--pointer-x": "60%",
            "--pointer-y": "40%",
          } as CSSProperties
        }
      >
        <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_var(--pointer-x)_var(--pointer-y),rgba(249,115,22,0.14),transparent_44%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 rounded-lg pointer-events-none bg-orange-950/[0.03] dark:bg-white/[0.018]" />

        <div className="relative z-10 flex flex-col">
          <div className="flex items-center gap-2 border-b border-orange-200/70 px-4 py-3 dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-red-500/90" />
              <span className="size-3 rounded-full bg-yellow-400/90" />
              <span className="size-3 rounded-full bg-green-500/90" />
            </div>
            <div className="ml-2 flex-1 text-center text-[11px] uppercase tracking-[0.22em] text-orange-400 dark:text-white/40" />
          </div>

          <div className="space-y-2 px-5 py-5 font-mono text-sm leading-6 text-stone-900/90 lg:px-6 lg:py-6 lg:text-[15px] dark:text-white/90">
            <p>
              <span className="text-orange-600 dark:text-orange-300">root@saintproject</span>
              <span className="text-stone-500 dark:text-white/55">:~$</span>{" "}
              <span className="text-amber-600 dark:text-amber-200">saintproject create</span>{" "}
              <span className="text-stone-700 dark:text-white/75">-y --plan coding code-2</span>
            </p>

            <p className="text-stone-600 dark:text-white/65">Provisioning hardware...</p>
            <p className="text-stone-600 dark:text-white/65">Mounting NVMe Gen5...</p>
            <p className="text-stone-600 dark:text-white/65">Enabling Anti-DDoS protection...</p>
            <p className="text-orange-600 dark:text-orange-300">Server ready in 3.8s</p>

            <p className="pt-2">
              <span className="text-orange-600 dark:text-orange-300">root@saintproject</span>
              <span className="text-stone-500 dark:text-white/55">:~$</span>{" "}
              <span className="text-amber-600 dark:text-amber-200">status</span>
            </p>
            <p className="text-stone-900/90 dark:text-white/90">
              online <span className="text-orange-400 dark:text-white/30">·</span>{" "}
              <span className="text-orange-600 dark:text-orange-300">mc.saintproject.xyz:25565</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroContainer({ onPricingClick, onFeaturesClick }: HeroContainerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[1320px] aspect-[1320/430]">
      <div
        className={`relative w-full max-w-[1320px] aspect-[1320/430] rounded-3xl overflow-hidden border border-orange-200/80 bg-[#fff8f1] transition-opacity duration-700 ease-out dark:border-white/20 dark:bg-[#111111] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/your-minecraft-bg.jpg"
          alt="Background"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-75 brightness-125 dark:opacity-100 dark:brightness-100"
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1320 528"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect width="1320" height="528" fill="#fff4e8" className="dark:fill-[#1e1e1e]" />

          <g
            fill="none"
            stroke="#fdba74"
            strokeWidth="6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="dark:stroke-[#666666]"
          >
            {plusMarks.map((mark) => (
              <PlusMark key={`${mark.x}-${mark.y}`} {...mark} />
            ))}
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-50/55 via-white/20 to-orange-50/55 dark:from-black/20 dark:via-black/10 dark:to-black/20" />

        <TerminalCard />

        <div className="relative z-10 flex h-full flex-col justify-between p-8">
          <div />
        </div>
      </div>

      <div
        className={`absolute left-[2%] top-[6%] bottom-[8%] rounded-xl border p-3 backdrop-blur-sm transition-all duration-700 ease-out sm:rounded-3xl sm:p-5 md:p-7 ${
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        } bg-white/60 border-orange-200/70 shadow-[0_16px_40px_rgba(249,115,22,0.08)] dark:bg-black/5 dark:border-white/10`}
        style={{ transitionDelay: "200ms" }}
      >
        <h1 className="mb-1.5 font-heading text-sm font-bold text-stone-900 sm:mb-3 sm:text-xl md:mb-4 md:text-3xl dark:text-white">
          Хостинг нового поколения
        </h1>
        <p className="font-heading text-[10px] leading-relaxed text-stone-700 max-w-[200px] flex flex-wrap items-center gap-1 sm:max-w-[380px] sm:text-sm md:max-w-[480px] md:text-base dark:text-white/80">
          <span>Качественные услуги, хорошая поддержка - незабываемый опыт</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-orange-500/10 px-1.5 py-0.5 dark:bg-white/10">
            <svg
              className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Uptime SLA 99.9%</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-orange-500/10 px-1.5 py-0.5 dark:bg-white/10">
            <svg
              className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>XDP eBPF AntiDDoS фильтрация L3, L4-L7.</span>
          </span>
        </p>
        <div className="my-2 h-px w-full bg-orange-200 sm:my-3 dark:bg-white/15" />
        <p className="mt-1 max-w-[200px] font-heading text-[10px] text-stone-700 sm:max-w-[380px] sm:text-sm md:max-w-[480px] md:text-base dark:text-white/80">
          Запустите свои проекты прямо сейчас с нашим хостингом.
        </p>

        <div
          className={`relative z-10 mt-2 flex items-center gap-2 transition-all duration-500 ease-out sm:mt-4 md:mt-6 sm:gap-3 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <button
            onClick={onPricingClick}
            className="group cursor-pointer rounded-lg bg-orange-600 px-2.5 py-1.5 text-[10px] font-medium text-white transition-opacity hover:opacity-90 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-xs md:px-6 md:py-3 md:text-sm dark:bg-foreground dark:text-background font-heading"
          >
            <span className="group-hover">Посмотреть тарифы</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
}
