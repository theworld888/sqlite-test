## 注意

拉取项目后需要初始化数据库

```bash
npx prisma migrate dev
```





开启深色模式需要，不然无法识别 dark: 前缀

参考文档 https://tailwindcss.com/docs/dark-mode
```css
@custom-variant dark (&:where(.dark, .dark *));
```




# 🧪 项目开发日志（2024-10-13 ~ 2024-10-14 + 头像上传扩展）

&gt; 基于 **Next.js 13 App Router + Prisma + Redis + Tailwind CSS** 的 **B 站风格移动端 Web**  
&gt; 邮箱注册、登录、个人中心、像素级 UI 还原、**七牛云头像上传**、全栈可部署

---

## 📅 10 月 13 日 — 基础架构 & 注册链路

| 序号 | 工作内容 | 技术栈 / 库 | 实现细节 |
| ---- | -------- | ----------- | -------- |
| ① | 创建注册页 Layout & 主站 Layout | Next.js App Router `(auth)` / `(main)` | 使用路由组语法分离样式：登录注册无 TabBar，主站有底部导航；同 URL 无分组前缀。 |
| ② | 全局 Toast 通知组件 | `zustand` + `framer-motion` + `heroicons` | 底部滑入，支持 4 种状态；一行调用 `toast.success()`；仅客户端渲染，自动消失。 |
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

## 🆕 头像上传扩展（新增）

| 序号 | 工作内容 | 技术栈 / 库 | 实现细节 |
| ---- | -------- | ----------- | -------- |
| ⑤ | 七牛云直传 token 接口 | `qiniu` SDK + `JWT` 鉴权 | 后端 `/api/upload/token`：生成直传凭证 + 最终访问 URL；10 分钟有效期；支持自定义域名。 |
| ⑥ | 前端直传七牛（无后端内存） | `qiniu-js` + `XMLHttpRequest` | 选择文件 → 确认对话框 → 直传华南机房 → 实时进度条 → 返回 HTTPS 访问地址。 |
| ⑦ | 七牛云自定义域名绑定 | 七牛控制台 + DNS CNAME | 完整 5 步流程：备案 → 控制台加域名 → DNS CNAME → HTTPS 证书 → 绿色锁验证。 |

&gt; **新增**：**像素级确认对话框**（毛玻璃 + 圆角 + 粉白按钮），**一行调用** `confirm('确定上传？')`。

---

### 🌓 新增：全局主题切换（夜间模式）

| 序号 | 工作内容 | 技术栈 / 库 | 实现细节 |
| ---- | -------- | ----------- | -------- |
| ⑧ | 全局主题切换（夜间模式） | `next-themes` + `Tailwind` + 自定义 CSS 变量 | 一键切换 + 系统偏好同步，B 站味粉白/深夜紫黑渐变，**像素级还原**。 |

---
### 💬 新增：全局确认对话框（像素级 B 站味）

| 序号 | 工作内容 | 技术栈 / 库 | 实现细节 |
| ---- | -------- | ----------- | -------- |
| ⑨ | 全局确认对话框 | `Zustand` + `Framer Motion` + `Tailwind` | 一行调用 `confirm('确定退出？')`，**毛玻璃 + 圆角 + 粉白按钮**，**ESC 关闭**。**像素级 B 站味**。 |

---

#### 实现细节

1. **安装依赖**
   ```bash
   npm i next-themes

## 🧱 技术栈总览（含新增）

| 类别 | 库 / 工具 | 用途 |
| ---- | --------- | ---- |
| 框架 | `Next.js 13+ App Router` | 全栈 React，路由组、API Routes |
| 样式 | `Tailwind CSS` | 像素级还原 B 站移动端 UI |
| 状态 | `Zustand` | Toast、确认对话框全局状态 |
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
| 上传 | `qiniu-js` + `XMLHttpRequest` | 前端直传七牛云 |
| 存储 | `七牛云` + 自定义域名 | 头像 CDN，HTTPS 访问 |

---

## 🚀 部署 & 扩展

| 场景 | 方案 |
| ---- | ---- |
| **本地开发** | `npm run dev` + Docker Redis（可选） |
| **生产部署** | 一键导入 Vercel，环境变量配置 Redis KV + SMTP + 七牛 AK/SK |
| **后续扩展** | 帖子、收藏、历史、搜索、PWA、暗黑模式、单元测试、文件上传（已完成头像） |

---

## ✅ 当前完成度（含上传）

✔ 邮箱注册 + 验证码 + 用户名登录  
✔ 像素级「我的」页面头部 + 设置页（宫格 + 下边框）  
✔ JWT + Cookie 鉴权 + 全局确认对话框  
✔ **七牛云头像上传**（直传 + 自定义域名 + HTTPS）  
✔ Redis 缓存验证码、DNS MX 检查、局域网调试、像素级 UI  
✔ **可直接部署到 Vercel**，也可作为社区产品基础继续迭代

---

&gt; 日志持续更新，后续功能（帖子、收藏、历史、搜索）接入后继续补充。  
&gt; 项目已具备「**注册-登录-上传-个人中心**」完整闭环，**B 站味像素级还原**，**全栈可部署**。