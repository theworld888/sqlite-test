import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'
import * as qiniu from 'qiniu'

// 七牛配置（环境变量）
const QINIU_ACCESS_KEY = process.env.QINIU_ACCESS_KEY!
const QINIU_SECRET_KEY = process.env.QINIU_SECRET_KEY!
const QINIU_BUCKET = process.env.QINIU_BUCKET!
const QINIU_DOMAIN = process.env.QINIU_DOMAIN! // 如 https://xxx.cdn.com





// 生成七牛直传 token
function getUploadToken(userId: string) {
    const key = `avatar/${randomUUID()}.png`
    const accessKey = "mzgTPLUNyenv5mXh5fhUKkwWOFaIIFUPixvXPNyq";
	const secretKey = "8sYFARzvIUsPRybeFLqrIrHJDzqxYC-KzswGR1_C";
	const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

	const options = {
		scope: "sqlite-test",
		expires: 30,
	};
	const putPolicy = new qiniu.rs.PutPolicy(options);
	const uploadToken = putPolicy.uploadToken(mac);
    return { token: uploadToken, key }
}

export async function GET(req: NextRequest) {
    try {
        // JWT 鉴权（你已有的 /api/auth/me 逻辑）
        const token = req.headers.get('authorization')?.replace('Bearer ', '')
        if (!token) return NextResponse.json({ message: '未登录' }, { status: 401 })
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string }

        console.log(payload, 'payload');


        // 生成直传凭证
        const { token: uploadToken, key } = getUploadToken(payload.sub)

        console.log(uploadToken, key, '999');


        // 返回前端：token + 最终访问 URL
        return NextResponse.json({
            token: uploadToken,
            url: `${QINIU_DOMAIN}/${key}`, // 上传成功后可直接访问
        })
    } catch (err) {
        console.log(err, 'err');

        return NextResponse.json({ message: 'Token 无效' }, { status: 401 })
    }
}