// กราฟแท่งแสดงพลังงาน (kWh/เดือน) ของแต่ละอุปกรณ์
// สร้างเองด้วย div ล้วน ๆ ไม่ต้องลงไลบรารีกราฟเพิ่ม
import { Device, computeMetrics, fmt } from "@/lib/calc";

export default function EnergyChart({
  devices,
  rate,
}: {
  devices: Device[];
  rate: number;
}) {
  // คำนวณพลังงานของแต่ละชิ้น แล้วเรียงจากมากไปน้อย
  const rows = devices
    .map((d) => ({ name: d.name, energy: computeMetrics(d, rate).energy }))
    .sort((a, b) => b.energy - a.energy);

  const max = Math.max(...rows.map((r) => r.energy), 1); // กันหารศูนย์

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
        📊 พลังงานแยกตามอุปกรณ์
      </h2>

      {rows.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">ยังไม่มีข้อมูล</p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-600">{r.name}</span>
                <span className="font-medium text-slate-700">{fmt(r.energy)} kWh</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                  style={{ width: `${(r.energy / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
