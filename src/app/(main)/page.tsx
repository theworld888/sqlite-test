'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from '@prisma/client'
import { useTheme } from 'next-themes'


export default function Page() {
  const [avatar, setAvatar] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    const raw = localStorage.getItem('userInfo')
    const cacheUser: User | null = raw ? JSON.parse(raw) : null
    setAvatar(cacheUser?.avatar || '')
  }, [])
  return <>
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between px-4 shadow-sm">
      <div className="text-lg font-bold text-pink-500">bilibili</div>
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="搜索视频、动态、用户"
          className="w-full rounded-full  px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
      {
        avatar ?
          <Link href="/me" className="h-9 w-9 rounded-full " >
            <img src={avatar} alt="avatar" className="h-9 w-9 rounded-full border-2 border-white/40" />
          </Link>
          :
          <Link href="/login" className="h-9 w-9 rounded-full " ></Link>
      }
    </header>
    <div>home</div>
  </>
}