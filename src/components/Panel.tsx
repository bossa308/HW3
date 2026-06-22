import { ReactNode } from "react";

// กรอบสไตล์กระดาษเขียนแบบ (blueprint) — ขอบบาง + เครื่องหมายมุม (corner ticks)
// ใช้ครอบทุกกล่องในหน้าให้ดูเป็นแผนผังเดียวกัน

export function Corners() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-cyan-300/80" />
      <span className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-cyan-300/80" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-cyan-300/80" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-cyan-300/80" />
    </>
  );
}

export default function Panel({
  index,
  title,
  right,
  children,
  className = "",
  bodyClass = "p-5",
}: {
  index?: string;
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClass?: string;
}) {
  return (
    <section
      className={`relative border border-cyan-400/25 bg-[#0d2748]/50 ${className}`}
    >
      <Corners />
      {(title || right) && (
        <header className="flex items-center justify-between border-b border-cyan-400/20 px-4 py-2.5">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/90">
            {index && <span className="text-cyan-500/60">{index}</span>}
            <span>{title}</span>
          </div>
          {right}
        </header>
      )}
      <div className={bodyClass}>{children}</div>
    </section>
  );
}
