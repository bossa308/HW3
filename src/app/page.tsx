"use client";

// ============================================================
//  หน้าหลัก — สมองกลางถือข้อมูลอุปกรณ์ + จัด layout (ธีม blueprint)
// ============================================================
import { useEffect, useState } from "react";
import { Device } from "@/lib/calc";
import { loadDevices, saveDevices, SEED_DEVICES } from "@/lib/storage";
import SummaryCards from "@/components/SummaryCards";
import LiveCalculator from "@/components/LiveCalculator";
import EnergyChart from "@/components/EnergyChart";
import DeviceTable from "@/components/DeviceTable";
import { BoltIcon } from "@/components/icons";

export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [rate, setRate] = useState(4.5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // โหลดข้อมูลจาก localStorage ครั้งแรกหลัง mount (อ่านจาก external system โดยตั้งใจ)
    const stored = loadDevices();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDevices(stored ?? SEED_DEVICES);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveDevices(devices);
  }, [devices, mounted]);

  const addDevice = (d: Device) => setDevices((prev) => [...prev, d]);
  const deleteDevice = (id: string) =>
    setDevices((prev) => prev.filter((d) => d.id !== id));

  return (
    <main className="min-h-screen">
      {/* แถบหัว = ช่องชื่อแบบกระดาษเขียนแบบ (title block) */}
      <header className="border-b border-cyan-400/25 bg-[#0a1c38]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center border border-cyan-300/60 text-cyan-300">
              <BoltIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-400/60">
                Electrical Load Schematic · ว.001
              </p>
              <h1 className="font-mono text-xl font-bold uppercase tracking-[0.12em] text-cyan-100 sm:text-2xl">
                ระบบคำนวณโหลดไฟฟ้า
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 border border-cyan-400/30 bg-[#0d2748]/60 px-3 py-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/60">
              Rate
            </span>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="w-16 border-b border-cyan-400/30 bg-transparent px-1 py-0.5 text-right font-mono font-semibold text-cyan-100 outline-none focus:border-cyan-300"
            />
            <span className="font-mono text-[11px] text-cyan-400/60">฿/kWh</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-7">
        <SummaryCards devices={devices} rate={rate} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <LiveCalculator rate={rate} onAdd={addDevice} />
          <EnergyChart devices={devices} rate={rate} />
        </div>

        <DeviceTable devices={devices} rate={rate} onDelete={deleteDevice} />

        <footer className="border-t border-cyan-400/15 pt-3 text-center font-mono text-[11px] uppercase tracking-widest text-cyan-400/40">
          hw3 · Next.js + Tailwind · deployed on Vercel
        </footer>
      </div>
    </main>
  );
}
