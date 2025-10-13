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
        {/* <header className="sticky top-0 z-50 flex h-14 items-center justify-between bg-white px-4 shadow-sm">
          <div className="text-lg font-bold text-pink-500">bilibili</div>
          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="搜索视频、动态、用户"
              className="w-full rounded-full bg-gray-100 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-300" />
        </header> */}

        {/* 内容区 */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>

        {/* 底部 TabBar */}
        <nav className="fixed bottom-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 bg-white">
          {TABS.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center flex-1 text-xs ${isActive ? 'text-pink-500' : 'text-gray-600'
                  }`}
              >
                {/* 图标占位：用 css 画个圆点，也可换 svg */}
                <span
                  className={`mb-1 h-6 w-6 rounded-full ${isActive ? 'bg-pink-500' : 'bg-gray-400'
                    }`}
                />
                {tab.name}
              </Link>
            )
          })}
        </nav>
      </body></html>
    </>
  )
}