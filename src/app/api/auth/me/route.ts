// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        // 1. 取出 httpOnly cookie 中的 access_token
        const auth = req.headers.get('authorization') // "Bearer xxx"
        const token = auth?.replace('Bearer ', '')
        console.log(token, 'token');

        if (!token) return NextResponse.json({ message: '未登录' }, { status: 401 })

        // 2. 验证 JWT
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string }
        const userId = payload.sub

        // 3. 查用户基础信息 + 计数（示例写死，后续换聚合）
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                createdAt: true,
            },
        })
        if (!user) {
            return NextResponse.json({ message: '用户不存在' }, { status: 401 })
        }

        // 4. 组装 B 站风格数据（示例值，后续换真实聚合）
        const data = {
            user: {
                ...user,
                bCoin: '10.0',              // B 币（后续换真实字段）
                coin: 947,                 // 硬币
                dynamic: 545,              // 动态数
                following: 7,              // 关注数
                follower: 128,             // 粉丝数
            },
        }

        return NextResponse.json(data)
    } catch (err) {
        // Token 无效或过期
        return NextResponse.json({ message: 'Token 无效' }, { status: 401 })
    }
}