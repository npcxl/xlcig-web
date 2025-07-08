# xlCig - 现代化PC硬件电商平台

> 🚀 专业的PC硬件电商平台，基于 Nuxt 3 + Vue 3 + TypeScript 构建，提供完整的产品展示、购物车、订单管理、在线客服等功能

📍 **在线体验**: [https://xlCig.cn](https://xlCig.cn)

## 🏷️ 项目标签

`电商平台` `PC硬件` `Nuxt3` `Vue3` `TypeScript` `TailwindCSS` `前端开发` `响应式设计` `深色主题` `开源项目`
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82.svg)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4.svg)](https://tailwindcss.com/)

## 📖 项目简介

**xlCig** 是一个专业的PC硬件电商平台，采用现代化的前端技术栈构建。项目专注于为PC硬件爱好者提供优质的购物体验，包含完整的电商功能和硬件专业化特性。

### 🎯 适用场景
- **PC硬件商城** - 显卡、CPU、主板、内存等硬件产品销售
- **装机配置平台** - 提供配置推荐和兼容性检查
- **硬件评测展示** - 性能数据和用户评价
- **电商学习项目** - 现代前端技术实践案例

### 🔥 核心亮点
- ⚡ **性能优异** - Nuxt 3 SSR/SPA 混合渲染，首屏加载速度快
- 🎨 **UI精美** - 深色玻璃拟态设计，符合现代审美
- 📱 **全端适配** - 完美支持桌面端、平板、手机
- 🛡️ **类型安全** - 全栈 TypeScript，减少运行时错误
- 🔧 **专业化** - 针对PC硬件领域的专业功能设计

## 必看
  在于 oxc-parser 这个包的 Windows 原生绑定文件缺失或损坏。这是一个常见的原生模块安装问题，特别是在 Windows 系统上。
  清除并重新安装依赖 运行命令 rm -rf node_modules package-lock.json 或手动删除掉这两个文件。
  然后在重新下载依赖 npm install
  运行 npm run dev
## 更新日志

- [点击查看](https://gitee.com/leheya/xlweb/blob/master/CHANGELOG.md)

## 🔗 项目链接

- [后端直达](https://gitee.com/leheya/xlcigbackend)

## ✨ 项目特色
- 🎨 **现代化UI设计** - 深色主题，玻璃拟态效果，响应式布局
- ⚡ **高性能架构** - Nuxt 3 + Vue 3 + TypeScript，SSR/SPA混合渲染
- 🛒 **完整电商功能** - 产品展示、购物车、订单管理、用户认证
- 🔧 **硬件专业化** - 针对PC硬件领域优化的产品展示和参数对比
- 📱 **移动端适配** - 完全响应式设计，完美支持各种设备
- 🌐 **国际化支持** - 多语言支持，易于扩展
- 🔐 **安全可靠** - JWT认证，API拦截器，完善的错误处理

## 🏗️ 技术栈

### 前端技术
- **框架**: [Nuxt 3](https://nuxt.com/) - Vue.js 元框架
- **UI库**: [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **样式**: [TailwindCSS](https://tailwindcss.com/) + 自定义CSS
- **图标**: [Bootstrap Icons](https://icons.getbootstrap.com/)
- **状态管理**: Nuxt 3 内置状态管理
- **路由**: Nuxt 3 文件系统路由

### 开发工具
- **包管理器**: npm/yarn/pnpm
- **代码规范**: ESLint + Prettier
- **Git钩子**: Husky + lint-staged
- **部署**: PM2 + Nginx

## 📋 功能特性

### 🏪 核心电商功能
- [x] 产品展示与详情页
- [x] 分类筛选与搜索
- [x] 购物车管理
- [x] 订单管理系统
- [x] 用户认证与授权
- [x] 地址管理
- [x] 支付集成

### 🖥️ PC硬件专业功能
- [x] 硬件规格对比
- [x] 兼容性检查
- [x] 配置推荐
- [x] 性能评测展示
- [x] 价格历史追踪
- [x] 库存实时更新

### 🎨 用户体验
- [x] 深色主题设计
- [x] 流畅动画效果
- [x] 加载状态管理
- [x] 错误处理机制
- [x] 响应式布局
- [x] 无障碍访问支持

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0 或 **yarn**: >= 1.22.0 或 **pnpm**: >= 7.0.0
- **操作系统**: Windows/macOS/Linux

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/your-username/xlcig-web.git
cd xlcig-web
```

2. **安装依赖**
```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

3. **配置环境变量**
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量
nano .env
```

环境变量配置：
```env
# API 配置
NUXT_PUBLIC_API_BASE_URL=http://192.168.11.193:9999/api
NUXT_PUBLIC_APP_NAME=xlCig
NUXT_PUBLIC_APP_VERSION=1.0.0

# 开发环境配置
NODE_ENV=development
NITRO_PORT=3000
NITRO_HOST=0.0.0.0

# 生产环境配置
NUXT_PUBLIC_SITE_URL=https://your-domain.com
```

4. **启动开发服务器**
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建与预览

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 生成静态站点
npm run generate
```

## 🌐 部署指南

### 服务器环境配置

#### 1. 服务器基础环境

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js (使用 NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version

# 安装 PM2
sudo npm install -g pm2

# 安装 Nginx
sudo apt install nginx -y

# 启动并设置开机自启
sudo systemctl start nginx
sudo systemctl enable nginx

# 检查状态
sudo systemctl status nginx
```

#### 2. 项目部署

```bash
# 创建项目目录
sudo mkdir -p /var/www/xlcig-web
sudo chown -R $USER:$USER /var/www/xlcig-web

# 克隆项目
cd /var/www/xlcig-web
git clone https://github.com/your-username/xlcig-web.git .

# 安装依赖
npm ci --only=production

# 创建环境变量文件
cp .env.example .env
nano .env

# 构建项目
npm run build
```

### PM2 配置

创建 PM2 配置文件 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [
    {
      name: 'xlcig-web',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max', // 或者指定数量，如 2
      script: './.output/server/index.mjs',
      args: '',
      cwd: '/var/www/xlcig-web',
      env: {
        NODE_ENV: 'production',
        NITRO_PORT: 3000,
        NITRO_HOST: '127.0.0.1',
        NUXT_PUBLIC_API_BASE_URL: 'http://192.168.11.193:9999/api'
      },
      env_production: {
        NODE_ENV: 'production',
        NITRO_PORT: 3000,
        NITRO_HOST: '127.0.0.1',
        NUXT_PUBLIC_API_BASE_URL: 'http://192.168.11.193:9999/api'
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '/var/log/pm2/xlcig-web-error.log',
      out_file: '/var/log/pm2/xlcig-web-out.log',
      log_file: '/var/log/pm2/xlcig-web-combined.log',
      time: true,
      watch: false,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      restart_delay: 5000,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'https://github.com/your-username/xlcig-web.git',
      path: '/var/www/xlcig-web',
      'pre-deploy-local': '',
      'post-deploy': 'npm ci --only=production && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}
```

### PM2 部署命令

```bash
# 创建日志目录
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# 启动应用
pm2 start ecosystem.config.js --env production

# 保存 PM2 配置
pm2 save

# 设置 PM2 开机自启
pm2 startup
# 执行输出的命令（类似下面这样）
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME

# 监控应用
pm2 status
pm2 logs xlcig-web
pm2 monit

# 重启应用
pm2 restart xlcig-web

# 停止应用
pm2 stop xlcig-web

# 删除应用
pm2 delete xlcig-web

# 查看实时日志
pm2 logs xlcig-web --lines 100
```

### Nginx 配置

创建 Nginx 配置文件 `/etc/nginx/sites-available/xlcig-web`：

```nginx
# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS 配置
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL 配置
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # API 代理（如果需要）
    location /api/ {
        proxy_pass http://192.168.11.193:9999/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # 主应用代理
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
        proxy_connect_timeout 86400;
        proxy_send_timeout 86400;
    }
}

# 开发环境配置（可选）
server {
    listen 80;
    server_name dev.your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用站点配置：

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/xlcig-web /etc/nginx/sites-enabled/

# 删除默认配置（可选）
sudo rm /etc/nginx/sites-enabled/default

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx

# 检查状态
sudo systemctl status nginx
```

### SSL 证书配置

使用 Let's Encrypt 免费证书：

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 申请证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 测试自动续期
sudo certbot renew --dry-run

# 设置自动续期
sudo crontab -e
# 添加以下行
0 12 * * * /usr/bin/certbot renew --quiet

# 查看证书状态
sudo certbot certificates
```

### 防火墙配置

```bash
# 安装 ufw
sudo apt install ufw -y

# 配置防火墙规则
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 80
sudo ufw allow 443

# 启用防火墙
sudo ufw enable

# 查看状态
sudo ufw status
```

## 📁 项目结构

```
xlcig-web/
├── frontend/                 # 前端源码目录
│   ├── components/          # Vue 组件
│   │   ├── AppLogo.vue     # Logo 组件
│   │   ├── SteamCarousel.vue # Steam 轮播组件
│   │   └── ...
│   ├── pages/              # 页面路由
│   │   ├── index.vue       # 首页
│   │   ├── products/       # 产品相关页面
│   │   │   ├── index.vue   # 产品列表
│   │   │   └── [id].vue    # 产品详情
│   │   ├── cart.vue        # 购物车
│   │   ├── checkout.vue    # 结算页面
│   │   └── ...
│   ├── utils/              # 工具函数
│   │   ├── api/            # API 接口
│   │   │   ├── products.ts # 产品 API
│   │   │   ├── cart.ts     # 购物车 API
│   │   │   ├── orders.ts   # 订单 API
│   │   │   └── ...
│   │   ├── apiClient.ts    # API 客户端
│   │   └── interceptors.ts # 请求拦截器
│   ├── types/              # TypeScript 类型定义
│   ├── assets/             # 静态资源
│   ├── public/             # 公共资源
│   ├── plugins/            # Nuxt 插件
│   ├── middleware/         # 中间件
│   ├── layouts/            # 布局组件
│   └── server/             # 服务端代码
├── docs/                   # 项目文档
├── scripts/                # 构建脚本
├── nuxt.config.ts          # Nuxt 配置
├── tailwind.config.js      # Tailwind 配置
├── ecosystem.config.js     # PM2 配置
├── package.json           # 项目依赖
└── README.md              # 项目文档
```

## 🔧 API 接口

### 基础配置

- **API 基础地址**: `http://192.168.11.193:9999/api`
- **请求格式**: JSON
- **响应格式**: JSON
- **认证方式**: JWT Token

### 主要接口

#### 产品相关
```typescript
// 获取产品列表
GET /product?page=1&limit=10&category=1

// 获取产品详情
GET /product/{id}

// 搜索产品
GET /product/search?q=关键词

// 获取热门产品
GET /product/getHot?limit=10

// 获取推荐产品
GET /product/featured?limit=10
```

#### 购物车相关
```typescript
// 获取购物车
GET /cart

// 添加到购物车
POST /cart
{
  "productId": 1,
  "quantity": 2,
  "specs": {}
}

// 更新购物车项目
PUT /cart/{id}
{
  "quantity": 3
}

// 删除购物车项目
DELETE /cart/{id}

// 清空购物车
DELETE /cart/clear
```

#### 订单相关
```typescript
// 创建订单
POST /orders
{
  "items": [...],
  "shippingAddress": {...},
  "paymentMethod": "alipay"
}

// 获取订单列表
GET /orders/my

// 获取订单详情
GET /orders/{id}

// 取消订单
PATCH /orders/{id}/cancel
```

#### 用户认证
```typescript
// 用户登录
POST /auth/login
{
  "email": "user@example.com",
  "password": "password"
}

// 用户注册
POST /auth/register
{
  "name": "用户名",
  "email": "user@example.com",
  "password": "password"
}

// 获取用户信息
GET /auth/me

// 刷新Token
POST /auth/refresh
```

## 🛠️ 开发指南

### 开发规范

1. **代码风格**
   - 使用 ESLint + Prettier 进行代码格式化
   - 遵循 Vue 3 Composition API 规范
   - 使用 TypeScript 严格模式

2. **组件开发**
   - 组件名使用 PascalCase
   - 使用 `<script setup>` 语法
   - 合理使用 Props 和 Emits

3. **API 调用**
   - 统一使用 `utils/api` 下的 API 方法
   - 实现错误处理和加载状态
   - 使用 TypeScript 类型约束

### 添加新功能

1. **添加新页面**
```bash
# 创建页面文件
touch frontend/pages/new-feature.vue

# 页面会自动注册路由 /new-feature
```

2. **添加新API**
```typescript
// frontend/utils/api/new-feature.ts
export const newFeatureApi = {
  getData: () => apiClient.get('/new-feature'),
  createData: (data) => apiClient.post('/new-feature', data)
}
```

3. **添加新组件**
```vue
<!-- frontend/components/NewComponent.vue -->
<template>
  <div class="new-component">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
/* 组件样式 */
</style>
```

### 调试技巧

1. **开发者工具**
   - Vue DevTools
   - Nuxt DevTools
   - Browser DevTools

2. **日志查看**
```bash
# 查看 PM2 日志
pm2 logs xlcig-web --lines 100

# 查看错误日志
pm2 logs xlcig-web --err

# 查看 Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# 查看系统日志
sudo journalctl -u nginx -f
```

3. **性能监控**
```bash
# PM2 性能监控
pm2 monit

# 系统资源监控
htop
df -h
free -m
```

## 🚀 部署自动化

### GitHub Actions CI/CD

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/xlcig-web
          git pull origin main
          npm ci --only=production
          npm run build
          pm2 restart xlcig-web
```

### 自动化部署脚本

创建 `scripts/deploy.sh`：

```bash
#!/bin/bash

echo "开始部署 xlCig..."

# 进入项目目录
cd /var/www/xlcig-web

# 备份当前版本
echo "备份当前版本..."
cp -r .output .output.backup.$(date +%Y%m%d_%H%M%S)

# 拉取最新代码
echo "拉取最新代码..."
git pull origin main

# 安装依赖
echo "安装依赖..."
npm ci --only=production

# 构建项目
echo "构建项目..."
npm run build

# 重启服务
echo "重启服务..."
pm2 restart xlcig-web

# 检查服务状态
echo "检查服务状态..."
pm2 status xlcig-web

echo "部署完成！"
```

使用脚本：

```bash
# 给脚本执行权限
chmod +x scripts/deploy.sh

# 执行部署
./scripts/deploy.sh
```

## 🧪 测试

### 单元测试

```bash
# 运行单元测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 监听模式运行测试
npm run test:watch
```

### E2E 测试

```bash
# 运行 E2E 测试
npm run test:e2e

# 在浏览器中运行测试
npm run test:e2e:dev
```

### 性能测试

```bash
# 使用 Lighthouse 进行性能测试
npm install -g lighthouse
lighthouse http://your-domain.com --output html --output-path ./performance-report.html

# 使用 PageSpeed Insights
# 访问: https://pagespeed.web.dev/
```

## 🔒 安全配置

### 安全头配置

已在 Nginx 配置中包含基本安全头，可以进一步加强：

```nginx
# 在 Nginx 配置中添加更多安全头
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
```

### 环境变量安全

```bash
# 设置环境变量文件权限
chmod 600 .env

# 确保 .env 文件不被版本控制
echo ".env" >> .gitignore
```

### API 安全

1. **JWT Token 管理**
   - 定期刷新 Token
   - 设置合理的过期时间
   - 实现 Token 黑名单机制

2. **请求限制**
   - 实现 API 请求频率限制
   - 添加 CORS 配置
   - 输入验证和清理

## 🤝 贡献指南

### 参与贡献

我们欢迎所有形式的贡献！请遵循以下步骤：

1. **Fork 项目**
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **创建 Pull Request**

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 其他更改
```

示例：
```bash
feat(products): 添加产品对比功能
fix(cart): 修复购物车数量更新问题
docs(readme): 更新部署文档
```

### 问题反馈

如果你发现了 bug 或有功能建议，请：

1. 搜索现有的 [Issues](https://github.com/your-username/xlcig-web/issues)
2. 如果没有相关问题，创建新的 Issue
3. 提供详细的问题描述和复现步骤
4. 包含环境信息（浏览器、操作系统等）

### 开发环境设置

1. **安装依赖**
```bash
npm install
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **运行测试**
```bash
npm run test
```

4. **代码检查**
```bash
npm run lint
npm run lint:fix
```

## 📊 性能优化

### 构建优化

1. **代码分割**
   - 使用 Nuxt 3 自动代码分割
   - 异步组件加载
   - 路由级别代码分割

2. **静态资源优化**
   - 图片压缩和 WebP 格式
   - CSS/JS 压缩
   - Gzip 压缩

3. **缓存策略**
   - HTTP 缓存头
   - CDN 缓存
   - 浏览器缓存

### 运行时优化

1. **数据获取优化**
   - 使用 `useLazyFetch` 进行懒加载
   - 实现数据缓存
   - API 请求去重

2. **渲染优化**
   - 虚拟滚动（长列表）
   - 图片懒加载
   - 组件懒加载

## 📈 监控和日志

### 应用监控

1. **PM2 监控**
```bash
# 实时监控
pm2 monit

# 查看资源使用情况
pm2 show xlcig-web
```

2. **系统监控**
```bash
# 系统资源
htop
iotop
nethogs

# 磁盘使用
df -h
du -sh /var/www/xlcig-web
```

### 日志管理

1. **应用日志**
```bash
# PM2 日志
pm2 logs xlcig-web

# 日志轮转
pm2 install pm2-logrotate
```

2. **Web 服务器日志**
```bash
# Nginx 访问日志
sudo tail -f /var/log/nginx/access.log

# Nginx 错误日志
sudo tail -f /var/log/nginx/error.log
```

### 错误追踪

推荐集成第三方错误追踪服务：

- [Sentry](https://sentry.io/)
- [Bugsnag](https://www.bugsnag.com/)
- [LogRocket](https://logrocket.com/)

## 📄 许可证

本项目使用 [MIT 许可证](LICENSE)。

## 🙏 致谢

感谢以下开源项目：

- [Nuxt.js](https://nuxt.com/) - 强大的 Vue.js 框架
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TailwindCSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [PM2](https://pm2.keymetrics.io/) - Node.js 进程管理器
- [Nginx](https://nginx.org/) - 高性能 Web 服务器

## 📞 联系方式
- **在线演示**: https://xlcig.cb
- **问题反馈**: [GitHub Issues](https://github.com/your-username/xlcig-web/issues)
- **讨论区**: [GitHub Discussions](https://github.com/your-username/xlcig-web/discussions)

## 🌟 支持项目

如果这个项目对你有帮助，请考虑：

- 给项目一个 ⭐ Star
- Fork 项目并贡献代码
- 分享给其他开发者
- 反馈使用体验

---

<div align="center">

**Made with ❤️ by the xlCig Team**

**如果这个项目对你有帮助，请给它一个 ⭐**

</div>
