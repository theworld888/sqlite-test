import Redis from 'ioredis'

let redis: Redis | null = null

export function getRedis() {
  if (!redis) {
    redis = new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      lazyConnect: true, // 避免 Next.js 启动时报错
    })

    // 连接异常时打印提示
    redis.on('error', (err) => {
      console.error('[Redis Error]', err)
    })
  }

  return redis
}
