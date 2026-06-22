"use client";

// ตารางอุปกรณ์ทั้งหมด — ค้นหาได้ + ลบได้ + มีแถวสรุปรวมด้านล่าง
import { useState } from "react";
import { Device, computeMetrics, computeTotals, fmt } from "@/lib/calc";

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

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
          📋 รายการอุปกรณ์ ({filtered.length})
        </h2>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
          placeholder="🔍 ค้นหาชื่ออุปกรณ์..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 pr-3 font-medium">อุปกรณ์</th>
              <th className="py-2 px-3 text-right font-medium">แรงดัน (V)</th>
              <th className="py-2 px-3 text-right font-medium">กำลังไฟ (W)</th>
              <th className="py-2 px-3 text-right font-medium">กระแส (A)</th>
              <th className="py-2 px-3 text-right font-medium">R (Ω)</th>
              <th className="py-2 px-3 text-right font-medium">ชม./วัน</th>
              <th className="py-2 px-3 text-right font-medium">พลังงาน (kWh)</th>
              <th className="py-2 px-3 text-right font-medium">ค่าไฟ (฿)</th>
              <th className="py-2 pl-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  ไม่พบอุปกรณ์
                </td>
              </tr>
            ) : (
              filtered.map((d) => {
                const m = computeMetrics(d, rate);
                return (
                  <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 pr-3 font-medium text-slate-800">{d.name}</td>
                    <td className="py-2 px-3 text-right text-slate-600">{fmt(d.voltage, 0)}</td>
                    <td className="py-2 px-3 text-right text-slate-600">{fmt(m.power)}</td>
                    <td className="py-2 px-3 text-right text-slate-600">{fmt(m.current)}</td>
                    <td className="py-2 px-3 text-right text-slate-600">{fmt(m.resistance)}</td>
                    <td className="py-2 px-3 text-right text-slate-600">{fmt(d.hoursPerDay)}</td>
                    <td className="py-2 px-3 text-right text-slate-600">{fmt(m.energy)}</td>
                    <td className="py-2 px-3 text-right font-semibold text-rose-600">{fmt(m.cost)}</td>
                    <td className="py-2 pl-3 text-right">
                      <button
                        onClick={() => onDelete(d.id)}
                        className="rounded-md px-2 py-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                        title="ลบ"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          {filtered.length > 0 && (
            <tfoot>
              <tr className="border-t-2 border-slate-200 font-semibold text-slate-800">
                <td className="py-2 pr-3">รวม</td>
                <td></td>
                <td className="py-2 px-3 text-right">{fmt(totals.power)}</td>
                <td colSpan={3}></td>
                <td className="py-2 px-3 text-right">{fmt(totals.energy)}</td>
                <td className="py-2 px-3 text-right text-rose-600">{fmt(totals.cost)}</td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
