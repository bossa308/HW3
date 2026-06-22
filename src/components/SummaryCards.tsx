// แถวค่าสรุปด้านบน — สไตล์ "หน้าปัดเครื่องวัด" (instrument readout)
import { Device, computeTotals, fmt } from "@/lib/calc";
import { Corners } from "./Panel";
import { GridIcon, BoltIcon, BatteryIcon, BanknoteIcon } from "./icons";

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
      tag: "QTY",
      label: "จำนวนอุปกรณ์",
      value: fmt(devices.length, 0),
      unit: "รายการ",
      Icon: GridIcon,
      color: "text-cyan-200",
    },
    {
      tag: "P-TOT",
      label: "กำลังไฟฟ้ารวม",
      value: fmt(totals.power, 0),
      unit: `วัตต์ · ${fmt(totals.power / 1000)} kW`,
      Icon: BoltIcon,
      color: "text-cyan-300",
    },
    {
      tag: "E-TOT",
      label: "พลังงาน/เดือน",
      value: fmt(totals.energy),
      unit: "kWh / เดือน",
      Icon: BatteryIcon,
      color: "text-sky-300",
    },
    {
      tag: "COST",
      label: "ค่าไฟโดยประมาณ",
      value: fmt(totals.cost),
      unit: "บาท / เดือน",
      Icon: BanknoteIcon,
      color: "text-amber-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.tag}
          className="relative border border-cyan-400/25 bg-[#0d2748]/40 p-4"
        >
          <Corners />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/60">
              {c.tag}
            </span>
            <c.Icon className={`h-5 w-5 ${c.color} opacity-70`} />
          </div>
          <div className={`mt-3 font-mono text-3xl font-bold tabular-nums ${c.color}`}>
            {c.value}
          </div>
          <div className="mt-1.5 text-xs text-sky-100/60">{c.label}</div>
          <div className="font-mono text-[11px] text-cyan-400/50">{c.unit}</div>
        </div>
      ))}
    </div>
  );
}
