# 多阶段构建 Dockerfile
# 阶段1: 前端构建
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# 复制前端package文件
COPY frontend/package*.json ./

# 安装前端依赖
RUN npm ci --only=production

# 复制前端源码
COPY frontend/ ./

# 构建前端
RUN npm run build

# 阶段2: 后端运行时
FROM node:18-alpine AS backend

WORKDIR /app

# 安装PM2
RUN npm install -g pm2

# 复制后端package文件
COPY backend/package*.json ./backend/

# 安装后端依赖
WORKDIR /app/backend
RUN npm ci --only=production

# 复制后端源码
COPY backend/ ./

# 复制构建好的前端文件
COPY --from=frontend-builder /app/frontend/.output ./frontend-dist

# 复制PM2配置
COPY ecosystem.config.js ../

# 创建日志目录
RUN mkdir -p ../logs

# 暴露端口
EXPOSE 3001

# 切换到应用目录
WORKDIR /app

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# 启动命令
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"] 