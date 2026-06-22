// ============================================================
//  เก็บข้อมูลไว้ใน localStorage ของเบราว์เซอร์
//  (เวอร์ชันนี้ไม่ต้องมีฐานข้อมูล — deploy ขึ้น Vercel ได้ทันที)
//  ถ้าอยากต่อฐานข้อมูลจริงทีหลัง แค่เปลี่ยน 2 ฟังก์ชันนี้ให้ยิง API
// ============================================================
import { Device } from "./calc";

const STORAGE_KEY = "hw3-electric-devices";

/** ข้อมูลตัวอย่าง โหลดอัตโนมัติครั้งแรกที่เปิดแอป */
export const SEED_DEVICES: Device[] = [
  { id: "seed-1", name: "เครื่องปรับอากาศ", voltage: 220, mode: "power", value: 1200, hoursPerDay: 8 },
  { id: "seed-2", name: "ตู้เย็น",          voltage: 220, mode: "power", value: 150,  hoursPerDay: 24 },
  { id: "seed-3", name: "เครื่องทำน้ำอุ่น", voltage: 220, mode: "power", value: 4500, hoursPerDay: 0.5 },
  { id: "seed-4", name: "พัดลม",            voltage: 220, mode: "power", value: 45,   hoursPerDay: 10 },
  { id: "seed-5", name: "หลอดไฟ LED",       voltage: 220, mode: "power", value: 9,    hoursPerDay: 6 },
];

/** อ่านรายการอุปกรณ์ — คืน null ถ้ายังไม่เคยบันทึก (จะได้รู้ว่าควรใส่ข้อมูลตัวอย่าง) */
export function loadDevices(): Device[] | null {
  if (typeof window === "undefined") return null; // กันพังตอน render ฝั่งเซิร์ฟเวอร์
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Device[]) : null;
  } catch {
    return null;
  }
}

/** บันทึกรายการอุปกรณ์ลง localStorage */
export function saveDevices(devices: Device[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
}

/** สร้าง id แบบไม่ซ้ำสำหรับอุปกรณ์ใหม่ */
export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "dev-" + Date.now() + "-" + Math.floor(Math.random() * 1e6);
}
