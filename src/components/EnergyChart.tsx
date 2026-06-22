// กราฟแท่งพลังงาน (kWh/เดือน) ต่ออุปกรณ์ — ธีม blueprint (แท่ง cyan เรืองแสง)
import { Device, computeMetrics, fmt } from "@/lib/calc";
import Panel from "./Panel";

export default function EnergyChart({
  devices,
  rate,
}: {
  devices: Device[];
  rate: number;
}) {
  const rows = devices
    .map((d) => ({ name: d.name, energy: computeMetrics(d, rate).energy }))
    .sort((a, b) => b.energy - a.energy);

  const max = Math.max(...rows.map((r) => r.energy), 1);

  return (
    <Panel index="02" title="Energy · พลังงานต่ออุปกรณ์">
      {rows.length === 0 ? (
        <p className="py-8 text-center font-mono text-sm text-cyan-300/40">
          — ไม่มีข้อมูล —
        </p>
      ) : (
        <div className="space-y-3.5">
          {rows.map((r) => (
            <div key={r.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-sky-100/80">{r.name}</span>
                <span className="font-mono tabular-nums text-cyan-300">
                  {fmt(r.energy)} <span className="text-cyan-400/50">kWh</span>
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-sm border border-cyan-400/10 bg-cyan-950/40">
                <div
                  className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  style={{ width: `${(r.energy / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
