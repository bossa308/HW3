"use client";

// ตารางอุปกรณ์ — ค้นหา + ลบ + แถวรวม (ธีม blueprint)
import { useState } from "react";
import { Device, computeMetrics, computeTotals, fmt } from "@/lib/calc";
import Panel from "./Panel";
import { SearchIcon, TrashIcon } from "./icons";

export default function DeviceTable({
  devices,
  rate,
  onDelete,
}: {
  devices: Device[];
  rate: number;
  onDelete: (id: string) => void;
}) {
  const [q, setQ] = useState("");

  const filtered = devices.filter((d) =>
    d.name.toLowerCase().includes(q.trim().toLowerCase()),
  );
  const totals = computeTotals(filtered, rate);

  const search = (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300/40" />
      <input
        className="w-44 rounded-sm border border-cyan-400/30 bg-[#0a1c38] py-1.5 pl-8 pr-3 font-mono text-sm text-cyan-50 placeholder:text-cyan-300/30 outline-none focus:border-cyan-300 sm:w-56"
        placeholder="ค้นหา..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </div>
  );

  return (
    <Panel
      index="03"
      title={`Devices · รายการ (${filtered.length})`}
      right={search}
      bodyClass="p-0"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cyan-400/20 text-left font-mono text-[11px] uppercase tracking-wider text-cyan-300/60">
              <th className="px-4 py-2.5 font-medium">อุปกรณ์</th>
              <th className="px-3 py-2.5 text-right font-medium">V</th>
              <th className="px-3 py-2.5 text-right font-medium">P (W)</th>
              <th className="px-3 py-2.5 text-right font-medium">I (A)</th>
              <th className="px-3 py-2.5 text-right font-medium">R (Ω)</th>
              <th className="px-3 py-2.5 text-right font-medium">ชม.</th>
              <th className="px-3 py-2.5 text-right font-medium">kWh</th>
              <th className="px-3 py-2.5 text-right font-medium">฿/ด.</th>
              <th className="px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-cyan-300/40">
                  — ไม่พบอุปกรณ์ —
                </td>
              </tr>
            ) : (
              filtered.map((d) => {
                const m = computeMetrics(d, rate);
                return (
                  <tr
                    key={d.id}
                    className="border-b border-cyan-400/10 transition hover:bg-cyan-400/5"
                  >
                    <td className="px-4 py-2 font-sans text-sky-50">{d.name}</td>
                    <td className="px-3 py-2 text-right text-sky-100/70">{fmt(d.voltage, 0)}</td>
                    <td className="px-3 py-2 text-right text-cyan-200">{fmt(m.power)}</td>
                    <td className="px-3 py-2 text-right text-sky-100/70">{fmt(m.current)}</td>
                    <td className="px-3 py-2 text-right text-sky-100/70">{fmt(m.resistance)}</td>
                    <td className="px-3 py-2 text-right text-sky-100/70">{fmt(d.hoursPerDay)}</td>
                    <td className="px-3 py-2 text-right text-sky-100/70">{fmt(m.energy)}</td>
                    <td className="px-3 py-2 text-right font-semibold text-amber-300">{fmt(m.cost)}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => onDelete(d.id)}
                        className="rounded-sm p-1 text-cyan-300/40 transition hover:bg-rose-500/10 hover:text-rose-400"
                        title="ลบ"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          {filtered.length > 0 && (
            <tfoot className="font-mono tabular-nums">
              <tr className="border-t border-cyan-300/40 text-cyan-100">
                <td className="px-4 py-2.5 font-sans font-semibold uppercase tracking-wider">รวม</td>
                <td></td>
                <td className="px-3 py-2.5 text-right font-semibold">{fmt(totals.power)}</td>
                <td colSpan={3}></td>
                <td className="px-3 py-2.5 text-right font-semibold">{fmt(totals.energy)}</td>
                <td className="px-3 py-2.5 text-right font-semibold text-amber-300">{fmt(totals.cost)}</td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </Panel>
  );
}
