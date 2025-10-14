## 注意

拉取项目后需要初始化数据库

```bash
npx prisma migrate dev
```

### 10/13
1. 创建注册页layout + 主要 layout ,通过(xxx)格式的文件路径,分别使用不同的layout
2. 创建toast通知组件
3. 添加vcnsole插件,方便调试
4. 实现邮箱发送验证码
5. 添加用户注册功能

### 10/14
1. 完成登录功能，保存用户信息到本地
2. 完成“我的”页面，展示用户信息



# 🧪 项目开发日志（2024-10-13 ~ 2024-10-14）

&gt; 基于 **Next.js 13 App Router + Prisma + Redis + Tailwind CSS** 的 **B 站风格移动端 Web**  
&gt; 邮箱注册、登录、个人中心、像素级 UI 还原、全栈可部署

---

## 📅 10 月 13 日 — 基础架构 & 注册链路

| 序号 | 工作内容 | 技术栈 / 库 | 实现细节 |
| ---- | -------- | ----------- | -------- |
| ① | 创建注册页 Layout & 主站 Layout | Next.js App Router `(auth)` / `(main)` | 使用路由组语法分离样式：登录注册无 TabBar，主站有底部导航；同 URL 无分组前缀。 |
| ② | 全局 Toast 通知组件 | `zustand` + `framer-motion` + `heroicons` | 底部滑入，支持 4 种状态；`toast.success('已发送')` 一行调用；仅客户端渲染，自动消失。 |
| ③ | 移动端调试 VConsole | `vconsole` | 开发环境动态加载，线上自动移除；局域网 IP 调试无跨域问题。 |
| ④ | 邮箱验证码发送 | `nodemailer` + `zod` + `Prisma` + `dns` | SMTP(QQ/163) 发送 6 位数字；10 分钟过期；DNS MX 检查拦截无效域名；60 秒前端冷却。 |
| ⑤ | 用户注册功能 | `bcryptjs` + `Prisma` + `Redis` | 用户名+密码+邮箱验证码；密码 bcrypt 哈希；Redis 存验证码 TTL；注册成功跳转登录。 |

&gt; **新增**：Redis 接入（本地 Docker / 二进制均可），验证码与占位用户分离存储，减少数据库写入。

---

## 📅 10 月 14 日 — 登录 & 个人中心像素级还原

| 序号 | 工作内容 | 技术栈 / 库 | 实现细节 |
| ---- | -------- | ----------- | -------- |
| ① | 登录功能（用户名+密码） | `bcryptjs` + `jsonwebtoken` + `httpOnly cookie` | 接口 `/api/auth/login`；JWT 7 天过期；cookie 自动携带；前端存展示字段到 localStorage。 |
| ② | 「我的」页面像素级还原 | `Tailwind CSS` + `Heroicons` | 顶部 2233 渐变 + 毛玻璃卡片 + Lv 圆环 + 数据宫格；下方宫格 2 列圆角；退出按钮粉边框。 |
| ③ | 前端数据存储策略 | `localStorage` + `httpOnly cookie` | 敏感凭证走 cookie；展示字段（头像、昵称、Lv）整体 JSON 存 localStorage；退出时清除。 |
| ④ | 个人数据接口 | `JWT 鉴权` + `Prisma` | 接口 `/api/auth/me`；未登录 401；前端先读缓存再拉全量，防止闪白；数据与 UI 字段对齐。 |

&gt; **新增**：DNS MX 检查 + 常用域名白名单，前端表单校验 + 冷却按钮，局域网跨域提示已配置 `allowedDevOrigins`。

---

## 🧱 技术栈总览

| 类别 | 库 / 工具 | 用途 |
| ---- | --------- | ---- |
| 框架 | `Next.js 13+ App Router` | 全栈 React，路由组、API Routes |
| 样式 | `Tailwind CSS` | 像素级还原 B 站移动端 UI |
| 状态 | `Zustand` | Toast 全局队列 |
| 动画 | `Framer Motion` | 滑入滑出动画 |
| 图标 | `Heroicons` | 线性图标统一风格 |
| 数据库 | `Prisma` + `SQLite` | ORM + 文件型持久化 |
| 缓存 | `Redis`（本地/Upstash） | 验证码 TTL、计数器 |
| 邮件 | `Nodemailer` | SMTP 发信（QQ/163） |
| 加密 | `bcryptjs` | 密码哈希 |
| 令牌 | `jsonwebtoken` | JWT 登录态 |
| 调试 | `VConsole` | 移动端调试面板 |
| 校验 | `Zod` | 输入结构校验 |
| 日期 | `date-fns` | 过期时间计算 |
| 网络 | `Node.js dns` | MX 记录解析 |

---

## 🚀 部署 & 扩展

| 场景 | 方案 |
| ---- | ---- |
| **本地开发** | `npm run dev` + Docker Redis（可选） |
| **生产部署** | 一键导入 Vercel，环境变量配置 Redis KV + SMTP |
| **后续扩展** | 帖子、收藏、历史、搜索、PWA、暗黑模式、文件上传、单元测试 |

---

## ✅ 当前完成度

✔ 邮箱注册 + 验证码 + 用户名登录  
✔ 像素级「我的」页面头部  
✔ JWT + Cookie 鉴权  
× Redis 缓存验证码  

