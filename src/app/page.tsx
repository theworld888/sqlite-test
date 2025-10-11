// app/page.tsx
'use client'
import { useEffect, useState } from 'react'

type Post = {
  id: number
  title: string
  content?: string
  published: boolean
  createdAt: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // 读取
  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then(setPosts)
  }, [])

  // 新建
  async function createPost(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
    setTitle('')
    setContent('')
    // 重新拉取
    const updated = await fetch('/api/posts').then((r) => r.json())
    setPosts(updated)
  }

  const getComments = (id: number) => {
    fetch(`/api/posts/${id}/comments`)
      .then((r) => r.json())
      .then(console.log)
  }

  /* 点击按钮：弹窗 → 调接口 → 刷新列表 */
  async function addComment(postId: number) {
    const body = prompt('请输入评论：') // 浏览器自带弹窗
    if (body === null) return // 用户点“取消”
    if (!body.trim()) {
      alert('评论不能为空')
      return
    }

    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    })

    if (!res.ok) {
      alert('提交失败')
      return
    }
    const newComment = await res.json()
    console.log(newComment);



  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Prisma + SQLite Demo</h1>

      <form onSubmit={createPost} className="mb-6 space-y-2">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full rounded border px-3 py-2"
          placeholder="内容（可选）"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">发布</button>
      </form>

      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id} className="border rounded p-3">
            <div className="font-semibold">{p.title}</div>
            {p.content && <div className="text-sm text-gray-600">{p.content}</div>}
            <div className="text-xs text-gray-400 mt-1">{p.createdAt}</div>
            <div onClick={() => { addComment(p.id) }}>添加评论</div>
            <div onClick={() => { getComments(p.id) }}>查询评论</div>
          </li>
        ))}
      </ul>
    </main>
  )
}