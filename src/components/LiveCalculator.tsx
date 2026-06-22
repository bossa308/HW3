"use client";

// เครื่องคำนวณสด — กรอกค่าแล้วโชว์ P, I, R, พลังงาน, ค่าไฟ ทันที
// กดปุ่ม "เพิ่มอุปกรณ์" เพื่อส่งข้อมูลขึ้นไปให้หน้าหลักเก็บลงรายการ
import { useState } from "react";
import { Device, InputMode, computeMetrics, fmt } from "@/lib/calc";
import { newId } from "@/lib/storage";

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

  // แปลงข้อความในช่องกรอกเป็นตัวเลขเพื่อคำนวณสด
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
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
        📐 เครื่องคำนวณ + เพิ่มอุปกรณ์
      </h2>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">ชื่ออุปกรณ์</label>
          <input
            className={inputClass}
            placeholder="เช่น เครื่องปรับอากาศ"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">แรงดัน (V)</label>
            <input
              className={inputClass}
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">ชั่วโมง/วัน</label>
            <input
              className={inputClass}
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
        </div>

        {/* สลับโหมดการกรอก: กำลังไฟ หรือ กระแส */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">ระบุค่าด้วย</label>
          <div className="grid grid-cols-2 gap-2">
            {(["power", "current"] as InputMode[]).map((mOpt) => (
              <button
                key={mOpt}
                type="button"
                onClick={() => setMode(mOpt)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  mode === mOpt
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-300 bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {mOpt === "power" ? "กำลังไฟ (W)" : "กระแส (A)"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
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

        {/* ผลคำนวณสด */}
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 text-sm sm:grid-cols-3">
          <Stat label="กำลังไฟ P" value={`${fmt(m.power)} W`} />
          <Stat label="กระแส I" value={`${fmt(m.current)} A`} />
          <Stat label="ความต้านทาน R" value={`${fmt(m.resistance)} Ω`} />
          <Stat label="พลังงาน" value={`${fmt(m.energy)} kWh`} />
          <Stat label="ค่าไฟ/เดือน" value={`${fmt(m.cost)} ฿`} highlight />
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button
          onClick={handleAdd}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.99]"
        >
          ➕ เพิ่มอุปกรณ์ลงรายการ
        </button>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`font-semibold ${highlight ? "text-rose-600" : "text-slate-700"}`}>
        {value}
      </div>
    </div>
  );
}
