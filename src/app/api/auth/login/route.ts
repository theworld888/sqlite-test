import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const bodySchema = z.object({
  username: z.string().min(2).max(20),
  password: z.string().min(6),
})

export async function POST(req: NextRequest) {
  try {
    const { username, password } = bodySchema.parse(await req.json())

    // 1. 找用户（用户名即 name 字段）
    const user = await prisma.user.findUnique({
      where: { name: username },
      select: { id: true, password: true, email: true, name: true, avatar: true },
    })
    
    if (!user) {
      return NextResponse.json({ message: '用户不存在' }, { status: 401 })
    }

    // 2. 验密码
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return NextResponse.json({ message: '密码错误' }, { status: 401 })
    }

    // 3. 生成 JWT
    // @ts-ignore
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES,
    })

    // 4. 返回用户基础信息
    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar ? user.avatar : '' },
    })
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ message: err }, { status: 500 })
  }
}