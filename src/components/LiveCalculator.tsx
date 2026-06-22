"use client";

// เครื่องคำนวณสด — กรอกค่าแล้วโชว์ P, I, R, พลังงาน, ค่าไฟ ทันที (ธีม blueprint)
import { useState } from "react";
import { Device, InputMode, computeMetrics, fmt } from "@/lib/calc";
import { newId } from "@/lib/storage";
import Panel from "./Panel";
import { PlusIcon } from "./icons";

export default function LiveCalculator({
  rate,
  onAdd,
}: {
  rate: number;
  onAdd: (device: Device) => void;
}) {
  const [name, setName] = useState("");
  const [voltage, setVoltage] = useState("220");
  const [mode, setMode] = useState<InputMode>("power");
  const [value, setValue] = useState("");
  const [hours, setHours] = useState("8");
  const [error, setError] = useState("");

  const draft = {
    voltage: Number(voltage) || 0,
    mode,
    value: Number(value) || 0,
    hoursPerDay: Number(hours) || 0,
  };
  const m = computeMetrics(draft, rate);

  function handleAdd() {
    if (!name.trim()) return setError("กรุณาใส่ชื่ออุปกรณ์");
    if (draft.value <= 0) return setError("ค่าต้องมากกว่า 0");
    if (draft.voltage <= 0) return setError("แรงดันต้องมากกว่า 0");

    onAdd({ id: newId(), name: name.trim(), ...draft });
    setName("");
    setValue("");
    setError("");
  }

  const inputClass =
    "w-full rounded-sm border border-cyan-400/30 bg-[#0a1c38] px-3 py-2 font-mono text-cyan-50 placeholder:text-cyan-300/30 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/20";
  const labelClass =
    "mb-1 block font-mono text-[11px] uppercase tracking-wider text-cyan-300/70";

  return (
    <Panel index="01" title="Calculator · เพิ่มอุปกรณ์">
      <div className="space-y-3">
        <div>
          <label className={labelClass}>ชื่ออุปกรณ์ / Name</label>
          <input
            className={inputClass}
            placeholder="เช่น เครื่องปรับอากาศ"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>แรงดัน V</label>
            <input
              className={inputClass}
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>ชม./วัน</label>
            <input
              className={inputClass}
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>ระบุค่าด้วย / Input</label>
          <div className="grid grid-cols-2 gap-2">
            {(["power", "current"] as InputMode[]).map((mOpt) => (
              <button
                key={mOpt}
                type="button"
                onClick={() => setMode(mOpt)}
                className={`rounded-sm border px-3 py-2 font-mono text-sm transition ${
                  mode === mOpt
                    ? "border-cyan-300 bg-cyan-400/10 text-cyan-200"
                    : "border-cyan-400/20 bg-transparent text-cyan-300/50 hover:border-cyan-400/40"
                }`}
              >
                {mOpt === "power" ? "กำลังไฟ (W)" : "กระแส (A)"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>
            {mode === "power" ? "กำลังไฟ (วัตต์)" : "กระแส (แอมป์)"}
          </label>
          <input
            className={inputClass}
            type="number"
            placeholder={mode === "power" ? "เช่น 1200" : "เช่น 5.5"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* แผงผลคำนวณสด เหมือนหน้าปัดมิเตอร์ */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-cyan-400/20 bg-cyan-400/20 sm:grid-cols-3">
          <Readout label="P" value={`${fmt(m.power)} W`} />
          <Readout label="I" value={`${fmt(m.current)} A`} />
          <Readout label="R" value={`${fmt(m.resistance)} Ω`} />
          <Readout label="kWh/ด." value={fmt(m.energy)} />
          <Readout label="฿/ด." value={fmt(m.cost)} highlight />
          <Readout label="V" value={`${fmt(draft.voltage, 0)} V`} />
        </div>

        {error && <p className="font-mono text-sm text-rose-400">! {error}</p>}

        <button
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 rounded-sm border border-cyan-300 bg-cyan-400/15 px-4 py-2.5 font-mono text-sm font-semibold uppercase tracking-wider text-cyan-100 transition hover:bg-cyan-400/25 active:scale-[0.99]"
        >
          <PlusIcon className="h-4 w-4" /> เพิ่มอุปกรณ์
        </button>
      </div>
    </Panel>
  );
}

function Readout({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-[#0a1c38] px-3 py-2">
      <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-400/50">
        {label}
      </div>
      <div
        className={`font-mono text-sm font-semibold tabular-nums ${
          highlight ? "text-amber-300" : "text-cyan-100"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
