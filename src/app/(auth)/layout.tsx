'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastContainer from '@/app/components/Toast/ToastContainer'
import { useEffect } from 'react'
import VConsole from 'vconsole'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      new VConsole() // 右下角出现绿色按钮
    }
  }, [])
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen flex-col bg-white">
          {/* 顶部返回栏 */}


          {/* 内容区 */}
          <main className="flex-1 overflow-y-auto">{children}</main>
          <ToastContainer /> {/* 一次挂载，全站可用 */}
        </div>
      </body>
    </html>
  )
}