// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/posts  获取所有文章
export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(posts)
}

// POST /api/posts  新建文章
export async function POST(req: NextRequest) {
  const body = await req.json()
  const post = await prisma.post.create({
    data: { title: body.title, content: body.content },
  })
  return NextResponse.json(post, { status: 201 })
}