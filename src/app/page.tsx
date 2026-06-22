"use client";

// ============================================================
//  หน้าหลัก — เป็น "สมองกลาง" ที่ถือข้อมูลอุปกรณ์ทั้งหมด
//  แล้วส่ง props ลงไปให้คอมโพเนนต์ย่อย ๆ แสดงผล
// ============================================================
import { useEffect, useState } from "react";
import { Device } from "@/lib/calc";
import { loadDevices, saveDevices, SEED_DEVICES } from "@/lib/storage";
import SummaryCards from "@/components/SummaryCards";
import LiveCalculator from "@/components/LiveCalculator";
import EnergyChart from "@/components/EnergyChart";
import DeviceTable from "@/components/DeviceTable";

export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [rate, setRate] = useState(4.5); // อัตราค่าไฟ บาท/หน่วย
  const [mounted, setMounted] = useState(false);

  // โหลดข้อมูลครั้งแรก (ทำงานเฉพาะฝั่งเบราว์เซอร์)
  useEffect(() => {
    const stored = loadDevices();
    setDevices(stored ?? SEED_DEVICES); // ครั้งแรกใช้ข้อมูลตัวอย่าง
    setMounted(true);
  }, []);

  // บันทึกลง localStorage ทุกครั้งที่รายการเปลี่ยน
  useEffect(() => {
    if (mounted) saveDevices(devices);
  }, [devices, mounted]);

  const addDevice = (d: Device) => setDevices((prev) => [...prev, d]);
  const deleteDevice = (id: string) =>
    setDevices((prev) => prev.filter((d) => d.id !== id));

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* แถบหัวเรื่อง */}
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">⚡ ระบบจัดการโหลดไฟฟ้า</h1>
            <p className="mt-1 text-sm text-indigo-100">
              คำนวณกำลังไฟ พลังงาน และค่าไฟของอุปกรณ์ในบ้าน — Next.js + Vercel
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 backdrop-blur">
            <label className="text-sm text-indigo-100">อัตราค่าไฟ</label>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="w-20 rounded-md bg-white/90 px-2 py-1 text-right font-semibold text-slate-800 outline-none"
            />
            <span className="text-sm text-indigo-100">฿/หน่วย</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        {/* การ์ดสรุป */}
        <SummaryCards devices={devices} rate={rate} />

        {/* เครื่องคำนวณ + กราฟ วางคู่กัน */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <LiveCalculator rate={rate} onAdd={addDevice} />
          <EnergyChart devices={devices} rate={rate} />
        </div>

        {/* ตารางอุปกรณ์ */}
        <DeviceTable devices={devices} rate={rate} onDelete={deleteDevice} />

        <footer className="pt-2 text-center text-xs text-slate-400">
          hw3 · สร้างด้วย Next.js + Tailwind CSS · Deploy บน Vercel
        </footer>
      </div>
    </main>
  );
}
