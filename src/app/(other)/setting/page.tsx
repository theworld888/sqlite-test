'use client'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
export default function LoginPage() {
    const router = useRouter()
    const menu = [
        { name: '账号与安全', href: '/me/setting/account' },
        { name: '通知设置', href: '/me/setting/notify' },
        { name: '隐私设置', href: '/me/setting/privacy' },
        { name: '关于我们', href: '/me/setting/about' },
    ]

    const signOut = () => {
        console.log('signOut')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token') // 如果之前存过

        
        // ③ 跳登录页
        router.push('/login')
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


            <div className=" pt-4">
                {menu.map((m) => (
                    <div
                        key={m.name}
                        onClick={() => {
                            console.log(m.name);

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