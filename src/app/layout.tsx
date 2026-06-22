import type { Metadata } from "next";
import { Noto_Sans_Thai, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ฟอนต์ไทยสำหรับเนื้อหา
const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-thai",
});

// ฟอนต์ monospace สำหรับตัวเลข/ป้ายเทคนิค (ลุค blueprint)
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "ระบบคำนวณโหลดไฟฟ้า | hw3",
  description: "คำนวณกำลังไฟ พลังงาน และค่าไฟของอุปกรณ์ไฟฟ้า สร้างด้วย Next.js + Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${notoThai.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
