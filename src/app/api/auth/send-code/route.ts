import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { promises as dns } from 'dns'
import Levenshtein from 'fast-levenshtein'
import { randomCode } from '@/lib/auth'
import { sendMail } from '@/lib/mail'
import { prisma } from '@/lib/prisma'
import { addMinutes } from 'date-fns'
import { getRedis } from '@/lib/redis'
const bodySchema = z.object({ email: z.string().email() })
// console.log(bodySchema,'bodySchema');

const redis = getRedis()
// 常用域名（用于拼写提示）
const COMMON_DOMAINS = [
  'qq.com', '163.com', '126.com', 'gmail.com', 'outlook.com',
  'hotmail.com', 'yahoo.com', 'foxmail.com', '139.com', 'yeah.net',
]

/** 检查域名是否存在且可收信 */
async function domainValid(domain: string): Promise<boolean> {
  try {
    // 1. 能解析到 MX 记录 → 真正邮件服务器
    const mx = await dns.resolveMx(domain)
    return mx.length > 0
  } catch {
    // 2. 无 MX 再试 A 记录（少数服务商只用 A）
    try {
      await dns.resolve4(domain)
      return true
    } catch {
      return false
    }
  }
}

/** 拼写检查：返回最相近的域名 */
function suggestDomain(input: string): string | null {
  for (const d of COMMON_DOMAINS) {
    if (Levenshtein.get(input, d) <= 2) return d
  }
  return null
}

export async function POST(req: NextRequest) {
  try {
    const { email } = bodySchema.parse(await req.json())
    const domain = email.split('@')[1]?.toLowerCase()

    // 1. 域名是否存在 & 可收信
    const valid = await domainValid(domain)
    if (!valid) {
      const suggest = suggestDomain(domain)
      return NextResponse.json(
        {
          message: suggest
            ? `邮箱域名错误，你是不是想写 ${suggest}？`
            : '该邮箱域名无法接收邮件，请更换',
        },
        { status: 400 }
      )
    }

    // 2. 域名 OK → 生成验证码并发送
    const code = randomCode()
    // ✅ 存入 Redis，设置 10 分钟过期
    await redis.set(`verify:${email}`, code, 'EX', 600)

    await sendMail(email, '验证码', `<p>你的验证码是 <b>${code}</b>，10 分钟内有效。</p>`)

    return NextResponse.json({ message: '已发送' })

    // await prisma.user.upsert({
    //   where: { email },
    //   update: {
    //     emailVerifyToken: code,
    //     emailVerifyExpire: addMinutes(new Date(), 10),
    //   },
    //   create: {
    //     email,
    //     name: email.split('@')[0],
    //     password: 'CHANGE_ME',
    //     emailVerifyToken: code,
    //     emailVerifyExpire: addMinutes(new Date(), 10),
    //   },
    // })

    // const res = await sendMail(email, '验证码', `<p>你的验证码是 <b>${code}</b>，10 分钟内有效。</p>`)
    // console.log('测试', res);

    // return NextResponse.json({ message: '已发送' })
  } catch (err) {

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "邮箱格式错误" }, // 第一条错误提示
        { status: 400 }
      )
    }

    if (err.code === "ECONNECTION" || "EAUTH" || "ESOCKET" || "EMESSAGE") {
      return NextResponse.json(
        { message: "邮箱不可用" }, // 第一条错误提示
        { status: 400 }
      )
    }
    // 其他未知错误
    return NextResponse.json({ message: "服务器异常" }, { status: 500 })
  }
}