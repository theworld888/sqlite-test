'use client'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { useConfirmStore } from '@/app/store/useConfirmStore'
import AvatarEditModal from '@/app/components/AvatarEditModal'
import { useEffect, useState } from 'react'


export default function SettingPage() {
    const { confirm } = useConfirmStore()
    const [isOpen, setIsOpen] = useState(false)
    const [avatar, setAvatar] = useState('')
    console.log(1234);
    
    useEffect(() => {
        console.log(123);

        const raw = localStorage.getItem('userInfo')
        console.log(raw, 'raw');

        const user = raw ? JSON.parse(raw) : null
        setAvatar(user?.avatar || '')

    }, [])
    const router = useRouter()
    const menu = [
        { name: '头像设置', href: '/me/setting/avatar' },
        { name: '账号与安全', href: '/me/setting/account' },
        { name: '通知设置', href: '/me/setting/notify' },
        { name: '隐私设置', href: '/me/setting/privacy' },
        { name: '关于我们', href: '/me/setting/about' },
    ]

    const signOut = () => {
        // 使用
        confirm('退出登录', () => {
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token') // 如果之前存过
            router.push('/login')
        })
    }

    return (
        <div className="h-lvh  bg-[#f1f2f4] dark:bg-[#0a0b0d]">
            <header className="flex h-12 items-center justify-between px-4  bg-white dark:bg-[#17181a]">
                <Link href="/me">
                    <ChevronLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </Link>
                <span className="text-base font-medium text-black/80 dark:text-gray-300">
                    设置
                </span>
                <div className="w-6" />
            </header>

            <AvatarEditModal defaultImage={avatar} isOpen={isOpen} onClose={() => {
                setIsOpen(false)
            }} onSave={(url) => { }} />
            {/* 
            <AvatarUpload onSuccess={(url) => {
                console.log('新头像地址：', url)
                // 后续：调用 /api/user/avatar 更新数据库
            }} /> */}


            <div className=" pt-4">
                {menu.map((m) => (
                    <div
                        key={m.name}
                        onClick={() => {
                            console.log(m.name);
                            if (m.name === '头像设置') {
                                setIsOpen(true)
                            }

                        }}
                        className="w-full flex items-center justify-between  bg-white dark:bg-[#17181a] p-3  "
                    >
                        <span className="text-sm text-gray-800 dark:text-gray-300">{m.name}</span>
                    </div>
                ))}

                <div onClick={signOut} className="w-full flex items-center justify-center mt-4  bg-white dark:bg-[#17181a] p-3 ">
                    <span className="text-sm text-gray-800 dark:text-gray-300">退出登录</span>
                </div>
            </div>



        </div>
    )
}