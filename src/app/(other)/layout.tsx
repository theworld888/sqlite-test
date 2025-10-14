'use client'
import { usePathname } from 'next/navigation'
import "./globals.css"
import VConsole from 'vconsole'
import { useEffect } from 'react'
import { Providers } from '@/app/providers'
import ConfirmDialog from '../components/ConfirmDialog'



export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      new VConsole() // 右下角出现绿色按钮
    }
  }, [])
  return (
    <>
      <html>
        <body>
          {/* 内容区 */}
          <main className="flex-1 overflow-y-auto">
            <Providers>{children}</Providers>
            <ConfirmDialog />
          </main>
        </body></html>
    </>
  )
}