'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  HomeIcon,
  FireIcon,
  PlusCircleIcon,
  ChatBubbleLeftIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { HomeIcon as HomeSolid, FireIcon as FireSolid, PlusCircleIcon as PlusSolid, ChatBubbleLeftIcon as ChatSolid, UserIcon as UserSolid } from '@heroicons/react/24/solid'
import "./globals.css"

const TABS = [
  { name: '首页', href: '/', icon: HomeIcon, iconSolid: HomeSolid },
  { name: '动态', href: '/dynamic', icon: FireIcon, iconSolid: FireSolid },
  { name: '投稿', href: '/publish', icon: PlusCircleIcon, iconSolid: PlusSolid },
  { name: '消息', href: '/msg', icon: ChatBubbleLeftIcon, iconSolid: ChatSolid },
  { name: '我的', href: '/me', icon: UserIcon, iconSolid: UserSolid },
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <html><body>
        {/* 顶部搜索栏 */}
        

        {/* 内容区 */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>

        {/* 底部 TabBar */}
        <nav className="fixed w-[100vw] bottom-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 bg-white">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = isActive ? tab.iconSolid : tab.icon
          return (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center flex-1">
              <Icon className={`h-6 w-6 ${isActive ? 'text-pink-500' : 'text-gray-600'}`} />
              <span className={`mt-1 text-xs ${isActive ? 'text-pink-500' : 'text-gray-600'}`}>
                {tab.name}
              </span>
            </Link>
          )
        })}
      </nav>
      </body></html>
    </>
  )
}