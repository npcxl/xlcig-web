#!/bin/bash

# 计算机装机指南 - 带API子域名的完整部署脚本
# 域名配置: 
# - 主站: https://xlcig.cn
# - API: https://api.xlcig.cn

echo "🚀 开始部署计算机装机指南 (带API子域名支持)..."

# 设置错误时退出
set -e

# 创建临时部署目录
DEPLOY_DIR="/tmp/deploy-xlcig"
mkdir -p $DEPLOY_DIR

# 项目配置
PROJECT_NAME="computer-installation-guide"
FRONTEND_IMAGE="computer-guide-frontend"
BACKEND_IMAGE="computer-guide-backend"
MYSQL_IMAGE="computer-guide-mysql"

echo "📦 项目配置完成"

# 1. 前端构建和部署
echo "🌐 构建前端项目..."
cd frontend
export NODE_ENV=production
npm install
npm run generate

echo "🌐 部署前端到Nginx..."
# 停止nginx容器
docker stop nginx-frontend 2>/dev/null || true
docker rm nginx-frontend 2>/dev/null || true

# 复制前端文件到临时目录
cp -r .output/public/* $DEPLOY_DIR/

# 创建nginx配置目录
mkdir -p $DEPLOY_DIR/nginx
cp ../nginx-xlcig-full.conf $DEPLOY_DIR/nginx/nginx.conf

# 启动带SSL的nginx容器 (需要SSL证书)
echo "⚠️  注意：如需HTTPS，请确保SSL证书已配置"
echo "📁 将使用以下nginx配置启动前端容器..."

# 启动nginx容器 (HTTP版本，生产环境需要配置SSL)
docker run -d \
  --name nginx-frontend \
  --restart unless-stopped \
  -p 80:80 \
  -p 443:443 \
  -v $DEPLOY_DIR:/usr/share/nginx/html \
  -v $DEPLOY_DIR/nginx/nginx.conf:/etc/nginx/nginx.conf \
  nginx:alpine

echo "✅ 前端部署完成"
cd ..

# 2. 后端构建和部署
echo "🔧 构建后端项目..."
cd backend

# 构建后端Docker镜像
docker build -t $BACKEND_IMAGE .

# 停止旧的后端容器
docker stop $BACKEND_IMAGE 2>/dev/null || true
docker rm $BACKEND_IMAGE 2>/dev/null || true

# 启动后端容器
docker run -d \
  --name $BACKEND_IMAGE \
  --restart unless-stopped \
  -p 9999:9999 \
  -e NODE_ENV=production \
  -e JWT_SECRET=your-super-secret-key-change-in-production \
  -e MYSQL_HOST=mysql-db \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=123456 \
  -e MYSQL_DATABASE=computer_guide \
  --link mysql-db:mysql-db \
  $BACKEND_IMAGE

echo "✅ 后端部署完成"
cd ..

# 3. 数据库检查
echo "🗄️  检查数据库状态..."
if ! docker ps | grep -q mysql-db; then
    echo "❌ MySQL容器未运行，请先启动数据库！"
    echo "运行: docker run -d --name mysql-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0"
    exit 1
fi

# 4. 健康检查
echo "🔍 执行健康检查..."
sleep 5

# 检查前端
if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ 前端服务正常"
else
    echo "❌ 前端服务异常"
fi

# 检查后端
if curl -f http://localhost:9999/api/health > /dev/null 2>&1; then
    echo "✅ 后端服务正常"
else
    echo "❌ 后端服务异常"
fi

# 5. 部署总结
echo ""
echo "🎉 部署完成!"
echo "=================================="
echo "📋 访问信息:"
echo "  主站: https://xlcig.cn"
echo "  API: https://api.xlcig.cn"
echo ""
echo "🔧 服务状态:"
echo "  前端: docker ps | grep nginx-frontend"
echo "  后端: docker ps | grep $BACKEND_IMAGE"
echo "  数据库: docker ps | grep mysql-db"
echo ""
echo "📝 下一步操作:"
echo "1. 配置域名DNS解析指向服务器IP"
echo "2. 申请SSL证书并配置到 /etc/nginx/ssl/"
echo "3. 重启nginx容器以应用SSL配置"
echo ""
echo "💡 SSL证书配置命令："
echo "  # 使用certbot申请免费SSL证书"
echo "  sudo certbot certonly --nginx -d xlcig.cn -d www.xlcig.cn -d api.xlcig.cn"
echo ""
echo "🔄 重启服务命令："
echo "  docker restart nginx-frontend"
echo "  docker restart $BACKEND_IMAGE"
echo ""
echo "=================================="

# 清理临时文件
rm -rf $DEPLOY_DIR

echo "🧹 清理完成，部署脚本执行结束" 