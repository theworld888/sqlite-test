'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import toast from '@/components/Toast' // 全局 Toast

export default function RegisterPage() {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirm: '',
        code: '',
    })

    /** 发送邮箱验证码 */
    const sendCode = async () => {
        if (!form.email) return toast.error('请先填写邮箱')
        const res = await fetch('/api/auth/send-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: form.email }),
        })
        if (res.ok) toast.success('验证码已发送，请查收')
        else toast.error('发送失败，请重试')
    }

    /** 提交注册 */
    const handleRegister = async () => {
        if (form.password !== form.confirm) return toast.error('两次密码不一致')
        console.log({
            email: form.email,
            username: form.username,
            password: form.password,
            code: form.code,
        });

        // const res = await fetch('/api/auth/register', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         email: form.email,
        //         username: form.username,
        //         password: form.password,
        //         code: form.code,
        //     }),
        // })
        // if (res.ok) {
        //     toast.success('注册成功！正在跳转...')
        //     location.href = '/login' // 简单跳转，可换 router.push
        // } else {
        //     const data = await res.json()
        //     toast.error(data.message || '注册失败')
        // }
    }

    return (
        <div className="px-6 pt-8">
            {/* 头部返回栏 */}
            <header className="flex items-center mb-8">
                <Link href="/login">
                    <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                </Link>
                <span className="ml-4 text-lg font-medium text-gray-900">注册</span>
            </header>

            {/* Logo */}
            <div className="mb-8 flex justify-center">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-400 to-blue-400" />
            </div>

            {/* 表单 */}
            <div className="space-y-4">

                <input
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="账号（用户名）"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="邮箱"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <div className="flex space-x-2">
                    <input
                        className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        placeholder="邮箱验证码"
                        value={form.code}
                        onChange={(e) => setForm({ ...form, code: e.target.value })}
                    />
                    <button
                        onClick={sendCode}
                        type="button"
                        className="rounded-lg bg-gray-200 px-4 py-3 text-sm text-gray-700 active:bg-gray-300"
                    >
                        发送验证码
                    </button>
                </div>
                <input
                    type="password"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="密码"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <input
                    type="password"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="确认密码"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                />

            </div>

            {/* 注册按钮 */}
            <button
                onClick={handleRegister}
                className="mt-6 w-full rounded-full bg-pink-500 py-3 text-white shadow-md active:bg-pink-600"
            >
                注册并登录
            </button>

            {/* 底部入口 */}
            <div className="mt-6 text-center text-sm text-gray-500">
                已有账号？
                <Link href="/login" className="ml-1 text-pink-500 hover:underline">
                    立即登录
                </Link>
            </div>
        </div>
    )
}