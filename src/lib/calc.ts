// ============================================================
//  สูตรคำนวณทางวิศวกรรมไฟฟ้า (Pure functions — ไม่มี UI)
//  แยกไว้ไฟล์เดียวเพื่อให้ทดสอบง่ายและเรียกใช้ซ้ำได้
// ============================================================

/** จำนวนวันต่อเดือนที่ใช้คิดพลังงาน (เหมือน Hw4) */
export const DAYS_PER_MONTH = 30;

/** ระบุค่าอุปกรณ์ด้วย "กำลังไฟ (W)" หรือ "กระแส (A)" */
export type InputMode = "power" | "current";

/** ข้อมูลอุปกรณ์ไฟฟ้า 1 ชิ้นที่ผู้ใช้กรอก */
export interface Device {
  id: string;
  name: string;
  voltage: number;     // แรงดันไฟฟ้า V (โวลต์)
  mode: InputMode;     // กรอกเป็นกำลังไฟ หรือ กระแส
  value: number;       // ตัวเลขตาม mode: W หรือ A
  hoursPerDay: number; // ชั่วโมงใช้งานต่อวัน
}

/** ค่าที่คำนวณได้จากอุปกรณ์ 1 ชิ้น */
export interface DeviceMetrics {
  power: number;       // กำลังไฟ P (วัตต์)
  current: number;     // กระแส I (แอมป์)
  resistance: number;  // ความต้านทาน R (โอห์ม)
  energy: number;      // พลังงาน (kWh ต่อเดือน)
  cost: number;        // ค่าไฟ (บาท ต่อเดือน)
}

/**
 * หัวใจของทั้งแอป — รับอุปกรณ์ + อัตราค่าไฟ แล้วคืนค่าที่คำนวณได้
 *   P = V × I            (กำลังไฟ)
 *   I = P / V            (กระแสจากกำลังไฟ)
 *   R = V / I            (กฎของโอห์ม)
 *   kWh = P × ชม. × 30 / 1000   (พลังงานต่อเดือน)
 *   ค่าไฟ = kWh × อัตรา        (บาทต่อเดือน)
 */
export function computeMetrics(
  d: Pick<Device, "voltage" | "mode" | "value" | "hoursPerDay">,
  rate: number,
): DeviceMetrics {
  const V = d.voltage;
  let power: number;
  let current: number;

  if (d.mode === "power") {
    power = d.value;                       // ผู้ใช้กรอกกำลังไฟมาตรง ๆ
    current = V > 0 ? power / V : 0;       // I = P / V
  } else {
    current = d.value;                     // ผู้ใช้กรอกกระแสมา
    power = V * current;                   // P = V × I
  }

  const resistance = current > 0 ? V / current : 0;          // R = V / I
  const energy = (power * d.hoursPerDay * DAYS_PER_MONTH) / 1000; // kWh/เดือน
  const cost = energy * rate;                                // บาท/เดือน

  return { power, current, resistance, energy, cost };
}

/** รวมยอดของทุกอุปกรณ์ไว้แสดงในการ์ดสรุป */
export function computeTotals(devices: Device[], rate: number) {
  return devices.reduce(
    (acc, d) => {
      const m = computeMetrics(d, rate);
      acc.power += m.power;
      acc.energy += m.energy;
      acc.cost += m.cost;
      return acc;
    },
    { power: 0, energy: 0, cost: 0 },
  );
}

/** จัดรูปตัวเลขแบบไทย เช่น 1234.5 -> "1,234.5" */
export function fmt(n: number, digits = 2): string {
  return new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);
}
