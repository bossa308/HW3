import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ระบุโฟลเดอร์โปรเจกต์ให้ชัด กัน Next เตือนเรื่องเจอ lockfile หลายไฟล์
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
