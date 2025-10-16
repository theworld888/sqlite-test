import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getRedis } from '@/lib/redis'

const bodySchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(20),
  password: z.string().min(6),
  code: z.string().length(6),
})

const redis = getRedis()

export async function POST(req: NextRequest) {
  const { email, username, password, code } = bodySchema.parse(await req.json())



  // ✅ 从 Redis 获取验证码
  const cacheCode = await redis.get(`verify:${email}`)
  if (!cacheCode) {
    return NextResponse.json({ message: '验证码已失效' }, { status: 400 })
  }
  if (cacheCode !== code) {
    return NextResponse.json({ message: '验证码错误' }, { status: 400 })
  }

  // ✅ 检查邮箱是否已存在
  const exist = await prisma.user.findUnique({ where: { email } })
  if (exist) {
    return NextResponse.json({ message: '该邮箱已注册' }, { status: 400 })
  }

  // ✅ 写入数据库
  await prisma.user.create({
    data: {
      email,
      name: username,
      password: await bcrypt.hash(password, 10),
      emailVerified: true,
    },
  })

  // ✅ 删除验证码，避免重复使用
  await redis.del(`verify:${email}`)
  return NextResponse.json({ message: '注册成功' })


  // const user = await prisma.user.findUnique({ where: { email } })
  // if (!user || user.emailVerifyToken !== code || new Date() > user.emailVerifyExpire!) {
  //   return NextResponse.json({ message: '验证码错误或已过期' }, { status: 400 })
  // }

  // await prisma.user.update({
  //   where: { email },
  //   data: {
  //     name: username,
  //     password: await bcrypt.hash(password, 10),
  //     emailVerified: true,
  //     emailVerifyToken: null,
  //     emailVerifyExpire: null,
  //   },
  // })

  // return NextResponse.json({ message: '注册成功' })
}