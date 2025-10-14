'use client'
import { useState } from 'react'
import Link from 'next/link'
import toast from '@/app/components/Toast'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
export default function LoginPage() {
  const [mode, setMode] = useState<'sms' | 'pwd'>('pwd') // 短信/密码切换
  const [form, setForm] = useState({ username: '', code: '', password: '' })

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: form.username, password: form.password }),
    })
    const data = await res.json()
    if (!res.ok) {
      toast.error(data.message) // 用户不存在 / 密码错误
      return
    }
    // 成功
    toast.success('登录成功')
    console.log(data,'登录信息');
    
    localStorage.setItem('token', data.token) // 或 cookie
    location.href = '/' // 跳首页
  }

  return (
    <>
      <header className="flex h-12 items-center justify-between px-4 shadow-sm">
        <Link href="/">
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </Link>
        <span className="text-base font-medium text-gray-900">
          登录
        </span>
        <div className="w-6" />
      </header>
      <div className="px-6 pt-8">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-400 to-blue-400" />
        </div>

        {/* 切换 Tab */}
        <div className="mb-6 flex rounded-full border border-gray-200 p-1">
          <button
            onClick={() => setMode('pwd')}
            className={`flex-1 rounded-full py-2 text-sm ${mode === 'pwd' ? 'bg-pink-500 text-white' : 'text-gray-700'
              }`}
          >
            密码登录
          </button>
          <button
            // disabled
            onClick={() => {
              // setMode('sms')
              // 使用好看的提示暂未开通
              toast.warning('暂未开通此功能')

            }}
            className={`flex-1 rounded-full py-2 text-sm ${mode === 'sms' ? 'bg-pink-500 text-white' : 'text-gray-700'
              }`}
          >
            短信登录
          </button>
        </div>

        {/* 输入区 */}
        <div className="space-y-4">
          <input
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="请输入账号"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          {mode === 'sms' ? (
            <div className="flex space-x-2">
              <input
                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="验证码"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
              />
              <button className="rounded-lg bg-gray-200 px-4 py-3 text-sm text-gray-700 active:bg-gray-300">
                获取验证码
              </button>
            </div>
          ) : (
            <input
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              type="password"
              placeholder="请输入密码"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          )}
        </div>

        {/* 登录按钮 */}
        <button
          onClick={handleLogin}
          className="mt-6 w-full rounded-full bg-pink-500 py-3 text-white shadow-md active:bg-pink-600"
        >
          登录
        </button>
        <div className="mt-6 text-center text-sm text-gray-500">
          还没有账号？
          <Link href="/register" className="ml-1 text-pink-500 hover:underline">
            立即注册
          </Link>
        </div>

        {/* 底部第三方登录 */}
        <div className="mt-8 text-center">
          {/* <div className="mb-4 text-xs text-gray-400">第三方登录</div>
        <div className="flex justify-center space-x-6">
          <div className="h-10 w-10 rounded-full bg-green-500" />
          <div className="h-10 w-10 rounded-full bg-blue-500" />
          <div className="h-10 w-10 rounded-full bg-gray-800" />
        </div> */}
          <div className="mt-6 text-xs text-gray-400">
            登录即代表你同意
            <Link href="/agreement" className="text-pink-500">用户协议</Link>
            和
            <Link href="/privacy" className="text-pink-500">隐私政策</Link>
          </div>
        </div>
      </div></>
  )
}