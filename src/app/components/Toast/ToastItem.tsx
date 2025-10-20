'use client'
import { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ToastMessage, useToastStore } from '@/app/store/useToastStore'

export default function ToastItem({ toast }: { toast: ToastMessage }) {
  const { remove } = useToastStore()
  const { id, type, message, duration = 3000 } = toast

  useEffect(() => {
    const t = setTimeout(() => remove(id), duration)
    return () => clearTimeout(t)
  }, [id, duration, remove])

 const colors = {
  success: 'bg-pink-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
}

  return (
    <div
  className={`pointer-events-auto flex w-full max-w-sm items-center rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-md`}
>
  {/* 左侧彩色圆点（保持 B 站粉）*/}
  <div className={`mr-3 h-2.5 w-2.5 rounded-full ${colors[type]}`} />

  {/* 文字 */}
  <div className="flex-1 text-sm text-gray-900">{message}</div>

  {/* 关闭按钮 */}
  <button onClick={() => remove(id)} className="ml-3 text-gray-400 hover:text-gray-500">
    <XMarkIcon className="h-5 w-5" />
  </button>
</div>
  )
}