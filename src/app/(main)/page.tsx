'use client'
import { useEffect, useState } from 'react'

// type Comment = {
//   id: number
//   content: string
//   createdAt: string
//   postId: number
//   parentId?: number | null
//   user?: { name: string; avatar?: string } // 简易用户字段
// }

// export default function CommentSection({ postId }: { postId: number }) {
//   const [list, setList] = useState<Comment[]>([])

//   /* 拉取评论（只拿一级） */
//   const fetchComments = async () => {
//     const res = await fetch(`/api/posts`)
//     const data: Comment[] = await res.json()
//     setList(data)
//   }
//   useEffect(() => {
//     fetchComments()
//   }, [])

//   /* 发一级评论 */
//   const addTopComment = async () => {
//     const body = prompt('写点什么呢？')
//     if (!body?.trim()) return
//     await fetch(`/api/posts`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title:'1', content:body }),
//     })
//     fetchComments()
//   }

//   return (
//     <section className="mt-6 w-full max-w-4xl mx-auto">
//       <div className="flex items-center justify-between mb-4">
//         <span className="text-sm text-gray-500">共 {list.length} 条评论</span>
//         <button
//           onClick={addTopComment}
//           className="px-4 py-1 rounded border border-sky-500 text-sky-500 text-sm hover:bg-sky-50"
//         >
//           发评论
//         </button>
//       </div>

//       <div className="space-y-4">
//         {list.map((c) => (
//           <CommentItem key={c.id} c={c} onRefresh={fetchComments} />
//         ))}
//       </div>
//     </section>
//   )
// }

// /* 单条一级评论 */
// function CommentItem({ c, onRefresh }: { c: Comment; onRefresh: () => void }) {
//   const [openReply, setOpenReply] = useState(false)
//   const [replies, setReplies] = useState<Comment[]>([])

//   /* 拉二级回复 */
//   const fetchReplies = async (id: number) => {
//     // 假设 /api/comments/[id]/replies 返回二级
//     const res = await fetch(`/api/posts/${id}/comments`)
//     setReplies(await res.json())
//   }
//   useEffect(() => {
//     fetchReplies(c.id)
//   }, [])

//   /* 发回复 */
//   const addReply = async () => {
//     const body = prompt('回复 @' + (c.user?.name || '楼主') + '：')
//     if (!body?.trim()) return
//     await fetch(`/api/posts/${c.id}/comments`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ body }),
//     })
//     fetchReplies(c.id)
//     onRefresh() // 可选：刷新一级时间戳
//   }

//   return (
//     <div className="flex items-start space-x-3 p-3 rounded bg-white border border-gray-100">
//       {/* 头像 */}
//       <img
//         src={c.user?.avatar || 'https://morefun-active.oss-cn-beijing.aliyuncs.com/test_gyj/f8ba735a4cebcf41ef79f9596cd6a34.jpg'}
//         alt="avatar"
//         className="w-10 h-10 rounded-full object-cover"
//       />

//       <div className="flex-1 text-sm">
//         {/* 头部行 */}
//         <div className="flex items-center space-x-2 text-gray-500">
//           <span className="text-gray-800 font-medium">{c.user?.name || '匿名'}</span>
//           <span>·</span>
//           <span>{new Date(c.createdAt).toLocaleString()}</span>
//         </div>

//         {/* 正文 */}
//         <div className="mt-2 text-gray-900 leading-relaxed">{c.content}</div>

//         {/* 操作区 */}
//         <div className="mt-2 flex items-center space-x-4 text-gray-500">
//           <button
//             onClick={() => setOpenReply((v) => !v)}
//             className="hover:text-sky-500"
//           >
//             {openReply ? '收起回复' : '回复'}
//           </button>
//           <span className="text-xs">点赞</span>
//         </div>

//         {/* 二级回复 */}
//         {openReply && (
//           <div className="mt-3 pl-4 border-l-2 border-gray-100">
//             <button
//               onClick={addReply}
//               className="mb-2 text-xs text-sky-500 hover:underline"
//             >
//               写回复
//             </button>
//             <ReplyList data={replies} />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// /* 二级回复列表 */
// function ReplyList({ data }: { data: Comment[] }) {
//   if (!data.length) return <div className="text-xs text-gray-400">暂无回复</div>
//   return (
//     <div className="space-y-2">
//       {data.map((r) => (
//         <div key={r.id} className="flex items-start space-x-2">
//           <img
//             src={r.user?.avatar || 'https://morefun-active.oss-cn-beijing.aliyuncs.com/test_gyj/f8ba735a4cebcf41ef79f9596cd6a34.jpg'}
//             className="w-7 h-7 rounded-full object-cover"
//           />
//           <div className="flex-1 text-xs">
//             <span className="font-medium text-gray-700">{r.user?.name || '匿名'} </span>
//             <span className="text-gray-900">{r.body}</span>
//             <div className="text-gray-400 mt-1">{new Date(r.createdAt).toLocaleString()}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

export default function Page() {
  return <h1>home</h1>
}