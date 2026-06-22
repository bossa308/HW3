import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

// ฟอนต์ที่รองรับภาษาไทยสวย ๆ จาก Google Fonts
const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-thai",
});

export const metadata: Metadata = {
  title: "ระบบจัดการโหลดไฟฟ้า | hw3",
  description: "คำนวณกำลังไฟ พลังงาน และค่าไฟของอุปกรณ์ไฟฟ้า",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoThai.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
