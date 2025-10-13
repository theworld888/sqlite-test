import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const bodySchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(20),
  password: z.string().min(6),
  code: z.string().length(6),
})

export async function POST(req: NextRequest) {
  const { email, username, password, code } = bodySchema.parse(await req.json())

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || user.emailVerifyToken !== code || new Date() > user.emailVerifyExpire!) {
    return NextResponse.json({ message: '验证码错误或已过期' }, { status: 400 })
  }

  await prisma.user.update({
    where: { email },
    data: {
      name: username,
      password: await bcrypt.hash(password, 10),
      emailVerified: true,
      emailVerifyToken: null,
      emailVerifyExpire: null,
    },
  })

  return NextResponse.json({ message: '注册成功' })
}