#!/bin/bash

# Docker 构建和部署脚本
echo "🐳 开始Docker构建和部署..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 检查Docker是否安装
check_docker() {
    echo -e "${BLUE}📋 检查Docker环境...${NC}"
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker未安装，请先安装Docker${NC}"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose未安装，请先安装Docker Compose${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Docker环境检查通过${NC}"
}

# 创建必要目录
create_directories() {
    echo -e "${BLUE}📁 创建项目目录...${NC}"
    mkdir -p logs
    mkdir -p error-pages
    
    # 如果错误页面不存在，复制默认的
    if [ ! -f "error-pages/404.html" ]; then
        echo -e "${YELLOW}⚠️ 复制默认错误页面...${NC}"
        for code in 400 403 404 500 501 502 503 504; do
            cp error-pages/404.html error-pages/$code.html 2>/dev/null || true
        done
    fi
    
    echo -e "${GREEN}✅ 目录创建完成${NC}"
}

# 停止现有容器
stop_existing() {
    echo -e "${BLUE}🛑 停止现有容器...${NC}"
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    
    # 清理悬空镜像
    docker image prune -f 2>/dev/null || true
    
    echo -e "${GREEN}✅ 现有容器已停止${NC}"
}

# 构建新镜像
build_image() {
    echo -e "${BLUE}🔨 构建前端镜像...${NC}"
    
    # 构建镜像
    docker-compose -f docker-compose.prod.yml build --no-cache
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 镜像构建失败${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 镜像构建完成${NC}"
}

# 启动服务
start_services() {
    echo -e "${BLUE}🚀 启动服务...${NC}"
    
    docker-compose -f docker-compose.prod.yml up -d
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 服务启动失败${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 服务启动成功${NC}"
}

# 检查服务状态
check_health() {
    echo -e "${BLUE}📊 检查服务状态...${NC}"
    sleep 10
    
    # 检查容器状态
    if docker ps | grep -q "pc-guide-web"; then
        echo -e "${GREEN}✅ 容器运行正常${NC}"
    else
        echo -e "${RED}❌ 容器未运行${NC}"
        docker-compose -f docker-compose.prod.yml logs
        exit 1
    fi
    
    # 检查HTTP响应
    max_retries=30
    retry_count=0
    
    while [ $retry_count -lt $max_retries ]; do
        if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200\|30[0-9]"; then
            echo -e "${GREEN}✅ 网站响应正常${NC}"
            break
        else
            echo -e "${YELLOW}⏳ 等待服务启动... ($((retry_count + 1))/$max_retries)${NC}"
            sleep 2
            retry_count=$((retry_count + 1))
        fi
    done
    
    if [ $retry_count -eq $max_retries ]; then
        echo -e "${RED}❌ 服务健康检查失败${NC}"
        docker-compose -f docker-compose.prod.yml logs
        exit 1
    fi
}

# 显示部署信息
show_info() {
    echo -e "${GREEN}🎉 部署完成！${NC}"
    echo -e "${BLUE}📝 部署信息:${NC}"
    echo -e "  本地访问: ${GREEN}http://localhost${NC}"
    echo -e "  域名访问: ${GREEN}http://www.xlcig.cn${NC} (需配置DNS)"
    echo -e "  容器名称: ${YELLOW}pc-guide-web${NC}"
    echo -e ""
    echo -e "${BLUE}🔧 常用命令:${NC}"
    echo -e "  查看容器状态: ${YELLOW}docker-compose -f docker-compose.prod.yml ps${NC}"
    echo -e "  查看日志: ${YELLOW}docker-compose -f docker-compose.prod.yml logs -f${NC}"
    echo -e "  重启服务: ${YELLOW}docker-compose -f docker-compose.prod.yml restart${NC}"
    echo -e "  停止服务: ${YELLOW}docker-compose -f docker-compose.prod.yml down${NC}"
    echo -e "  更新部署: ${YELLOW}./docker-build.sh${NC}"
}

# 主函数
main() {
    echo -e "${GREEN}🚀 电脑装机指南 - Docker部署脚本${NC}"
    echo -e "${BLUE}================================================${NC}"
    check_docker
    create_directories
    stop_existing
    build_image
    start_services
    check_health
    show_info
    echo -e "${BLUE}================================================${NC}"
    echo -e "${GREEN}✨ 部署成功完成！${NC}"
}

# 执行主函数
main 