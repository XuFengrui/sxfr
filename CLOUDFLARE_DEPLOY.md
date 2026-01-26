# Cloudflare Pages 部署指南

本项目已配置为可在 Cloudflare Pages 上部署。

## 部署步骤

### 1. 通过 Cloudflare Dashboard 部署

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** 部分
3. 点击 **Create a project**
4. 连接你的 Git 仓库（GitHub/GitLab/Bitbucket）
5. 配置构建设置：
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build` 或 `pnpm build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (项目根目录)
   - **Node version**: 20 (已在 `.nvmrc` 中指定)

### 2. 环境变量（如果需要）

如果项目需要环境变量，在 Cloudflare Pages 设置中添加：
- 进入项目设置
- 选择 **Environment variables**
- 添加所需的变量

### 3. 构建配置

项目已配置为静态导出：
- `next.config.mjs` 中设置了 `output: 'export'`
- 构建输出目录为 `out`
- 图片优化已禁用（静态导出要求）

### 4. 自定义域名（可选）

1. 在项目设置中选择 **Custom domains**
2. 添加你的域名
3. 按照提示配置 DNS 记录

## 项目配置说明

### 已移除的依赖
- `@vercel/analytics` - Vercel 特定服务，已移除以适配 Cloudflare Pages

### 配置文件
- `next.config.mjs` - Next.js 配置，已优化为静态导出
- `public/_headers` - Cloudflare Pages 响应头配置
- `public/_redirects` - Cloudflare Pages 重定向规则
- `.nvmrc` - Node.js 版本指定（20）

### 构建输出
- 构建后的文件位于 `out/` 目录
- 所有静态资源会自动优化和压缩

## 本地测试构建

在部署前，可以在本地测试构建：

```bash
# 安装依赖
npm install
# 或
pnpm install

# 构建项目
npm run build
# 或
pnpm build

# 查看输出目录
ls -la out/
```

## 注意事项

1. **静态导出限制**：
   - 不能使用服务端功能（API Routes、getServerSideProps 等）
   - 所有路由必须在构建时确定
   - 图片优化已禁用

2. **PWA 功能**：
   - Service Worker 文件位于 `public/sw.js`
   - Manifest 文件位于 `public/manifest.webmanifest`
   - 这些文件会自动包含在构建输出中

3. **客户端路由**：
   - `_redirects` 文件确保所有路由都正确重定向到 `index.html`
   - 支持 Next.js 的客户端路由

## 故障排除

如果构建失败：
1. 检查 Node.js 版本是否为 20
2. 确保所有依赖都已正确安装
3. 查看 Cloudflare Pages 构建日志
4. 验证 `next.config.mjs` 配置是否正确
