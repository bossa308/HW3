// การ์ดสรุปยอดด้านบนสุดของหน้า (จำนวนอุปกรณ์ / กำลังไฟรวม / พลังงานรวม / ค่าไฟ)
import { Device, computeTotals, fmt } from "@/lib/calc";

export default function SummaryCards({
  devices,
  rate,
}: {
  devices: Device[];
  rate: number;
}) {
  const totals = computeTotals(devices, rate);

  const cards = [
    {
      label: "จำนวนอุปกรณ์",
      value: fmt(devices.length, 0),
      unit: "รายการ",
      icon: "🔌",
      ring: "ring-indigo-200",
      bg: "from-indigo-50 to-white",
      text: "text-indigo-600",
    },
    {
      label: "กำลังไฟฟ้ารวม",
      value: fmt(totals.power, 0),
      unit: `วัตต์ (${fmt(totals.power / 1000)} kW)`,
      icon: "⚡",
      ring: "ring-amber-200",
      bg: "from-amber-50 to-white",
      text: "text-amber-600",
    },
    {
      label: "พลังงานรวมต่อเดือน",
      value: fmt(totals.energy),
      unit: "kWh / เดือน",
      icon: "🔋",
      ring: "ring-emerald-200",
      bg: "from-emerald-50 to-white",
      text: "text-emerald-600",
    },
    {
      label: "ค่าไฟโดยประมาณ",
      value: fmt(totals.cost),
      unit: "บาท / เดือน",
      icon: "💸",
      ring: "ring-rose-200",
      bg: "from-rose-50 to-white",
      text: "text-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`rounded-2xl bg-gradient-to-br ${c.bg} p-5 shadow-sm ring-1 ${c.ring}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">{c.label}</span>
            <span className="text-2xl">{c.icon}</span>
          </div>
          <div className={`mt-2 text-3xl font-bold ${c.text}`}>{c.value}</div>
          <div className="mt-1 text-xs text-slate-400">{c.unit}</div>
        </div>
      ))}
    </div>
  );
}
