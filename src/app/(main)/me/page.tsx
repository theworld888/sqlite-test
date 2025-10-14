'use client'
// cog-6-tooth

import {
  HomeIcon,
  FireIcon,
  PlusCircleIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  MoonIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export default function MePage() {
  // 占位数据，后续接 /api/auth/me
  const user = {
    avatar: 'https://morefun-active.oss-cn-beijing.aliyuncs.com/test_gyj/f8ba735a4cebcf41ef79f9596cd6a34.jpg',
    name: '药勺勺',
    id: '123456',
    level: 5,
    bCoin: '0.0',
    coin: 947,
    dynamic: 545,
    following: 7,
    follower: 128,
  }

  const icons = [
    { name: '动态', icon: Cog6ToothIcon },
    { name: '消息', icon: ChatBubbleLeftIcon },
    { name: '夜间模式', icon: MoonIcon },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 顶部头部（与截图 1:1） ===== */}
      <div className="relative h-64 w-full rounded-b-3xl bg-gradient-to-br text-gray-500">
        {/* 第一行：时间 + 大会员标签 */}
        <div className="flex h-10 items-center justify-end px-5 pt-4 text-xs">
          {
            icons.map((tab) => {
              const Icon = tab.icon
              return (
                <div key={tab.name} className="flex items-center space-x-1 ml-6">
                  <Icon className={`h-6 w-6 text-gray-500`} />
                </div>
              )
            })}
          {/* <Icon className={`h-6 w-6 text-gray-500`} /> */}
        </div>

        {/* 第二行：头像 + 名字 + Lv + 空间入口 */}
        <div className="mt-3 flex items-center px-5">
          <img src={user.avatar} alt="avatar" className="h-16 w-16 rounded-full border-2 border-white/40" />
          <div className="ml-3 flex-1">
            <div className="text-lg  text-pink-500">{user.name}</div>
            <div className="mt-0.5 text-xs opacity-80">ID: {user.id}</div>
          </div>
          <div className="flex items-center space-x-1 text-xs">

            <span className="opacity-80">空间〉</span>
          </div>
        </div>



        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-white/20 p-3 backdrop-blur">
          <div className="text-center">
            <div className="text-lg ">{user.dynamic}</div>
            <div className="text-xs opacity-80">动态</div>
          </div>
          <div className="text-center">
            <div className="text-lg ">{user.following}</div>
            <div className="text-xs opacity-80">关注</div>
          </div>
          <div className="text-center">
            <div className="text-lg ">{user.follower}</div>
            <div className="text-xs opacity-80">粉丝</div>
          </div>
        </div>
      </div>

      {/* ===== 下方留白区域（后续接内容） ===== */}
      <div className="h-96 bg-gray-50">{/* 留白 */}</div>
    </div >
  )
}