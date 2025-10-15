'use client'
import { useState } from 'react'
import { useConfirmStore } from '@/app/store/useConfirmStore'
import { useTheme } from 'next-themes'

export default function AvatarUpload({ onSuccess }: { onSuccess: (url: string) => void }) {
  const [progress, setProgress] = useState(0)
  const { confirm } = useConfirmStore()
  const { theme } = useTheme()

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // ① 获取直传 token
    const res = await fetch('/api/upload/token', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    if (!res.ok) return alert('获取上传凭证失败')
    const { token, url } = await res.json()

    // ② 直传七牛（不进后端内存）
    const form = new FormData()
    form.append('token', token)
    form.append('file', file)
    form.append('key', 'avatar/'+url.split('/').pop()!) // 文件名
    console.log(url.split('/').pop()!,'+====+++==');
    

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://upload-z2.qiniup.com') // 华南机房，按实际改
    xhr.upload.onprogress = (e) => setProgress(Math.round((e.loaded / e.total) * 100))
    xhr.onload = () => {
      if (xhr.status === 200) {
        onSuccess(url) // 上传成功，返回最终 URL
        setProgress(0)
      } else {
        alert('上传失败')
        setProgress(0)
      }
    }
    xhr.send(form)
  }

  const handleClick = () => {
    confirm('确定上传头像？', () => {
      document.getElementById('avatar-input')?.click()
    })
  }

  return (
    <div className="flex items-center space-x-4">
      <input
        id="avatar-input"
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFile}
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="rounded-full bg-pink-500 px-6 py-2 text-sm text-white shadow-md active:bg-pink-600"
      >
        上传头像
      </button>

      {/* 进度条（B 站味） */}
      {progress > 0 && (
        <div className="w-32 rounded-full bg-gray-200">
          <div
            className="rounded-full bg-pink-500 py-1 text-center text-xs text-white"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}
    </div>
  )
}