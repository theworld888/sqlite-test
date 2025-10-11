// app/api/posts/[id]/comments/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/posts/1/comments
export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params // ← 先 await 再取 id
    const postId = Number(id)

    // 可选：先检查文章是否存在
    const postExists = await prisma.post.findUnique({
        where: { id: postId },
        select: { id: true },
    })
    if (!postExists) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // 只查评论，按时间倒序
    const comments = await prisma.comment.findMany({
        where: { postId },
        orderBy: { createdAt: 'desc' },
        select: { id: true, body: true, createdAt: true }, // 按需返回字段
    })

    return NextResponse.json(comments)
}

// POST /api/posts/1/comments
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params // ← 先 await 再取 id
    const postId = Number(id)
    const { body } = await req.json()

    if (!body || typeof body !== 'string' || body.trim().length === 0) {
        return NextResponse.json({ error: '评论内容不能为空' }, { status: 400 })
    }

    const comment = await prisma.comment.create({
        data: { body: body.trim(), postId },
    })

    return NextResponse.json(comment, { status: 201 })
}