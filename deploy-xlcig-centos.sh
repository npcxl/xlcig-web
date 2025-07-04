#!/bin/bash

# xlCig 域名配置和部署脚本 (CentOS/RHEL版本)
# 使用方法: bash deploy-xlcig-centos.sh

set -e

echo "🚀 开始配置 xlcig.cn 域名部署... (CentOS/RHEL)"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否为root用户
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}请使用 root 用户运行此脚本${NC}"
    exit 1
fi

# 检测系统版本
if command -v dnf &> /dev/null; then
    PKG_MANAGER="dnf"
    echo -e "${GREEN}检测到 RHEL/CentOS 8+ 系统，使用 dnf${NC}"
elif command -v yum &> /dev/null; then
    PKG_MANAGER="yum"
    echo -e "${GREEN}检测到 RHEL/CentOS 7 系统，使用 yum${NC}"
else
    echo -e "${RED}未检测到支持的包管理器${NC}"
    exit 1
fi

# 1. 更新系统和安装依赖
echo -e "${YELLOW}1. 更新系统和安装依赖...${NC}"
$PKG_MANAGER update -y

# 安装EPEL仓库
if [ "$PKG_MANAGER" = "yum" ]; then
    yum install -y epel-release
else
    dnf install -y epel-release
fi

# 安装基础依赖
$PKG_MANAGER install -y nginx git curl wget unzip

# 2. 安装Node.js和npm
echo -e "${YELLOW}2. 安装Node.js和npm...${NC}"
if ! command -v node &> /dev/null; then
    # 安装Node.js 18.x
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
    $PKG_MANAGER install -y nodejs
fi

# 验证Node.js版本
node_version=$(node -v)
echo -e "${GREEN}Node.js版本: $node_version${NC}"

# 3. 安装PM2进程管理器
echo -e "${YELLOW}3. 安装PM2进程管理器...${NC}"
npm install -g pm2

# 4. 安装Certbot (Let's Encrypt)
echo -e "${YELLOW}4. 安装SSL证书工具...${NC}"
if [ "$PKG_MANAGER" = "dnf" ]; then
    dnf install -y certbot python3-certbot-nginx
else
    yum install -y certbot python2-certbot-nginx || yum install -y certbot python3-certbot-nginx
fi

# 5. 创建项目目录
echo -e "${YELLOW}5. 创建项目目录...${NC}"
mkdir -p /var/www/xlcig.cn
cd /var/www/xlcig.cn

# 6. 检查项目代码
echo -e "${YELLOW}6. 检查项目代码...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${RED}未找到项目代码，请确保在正确目录执行脚本${NC}"
    echo "当前目录: $(pwd)"
    echo "请将项目代码上传到此目录或使用git克隆"
    exit 1
fi

# 7. 配置SSL证书
echo -e "${YELLOW}7. 配置SSL证书...${NC}"
mkdir -p /etc/nginx/ssl
if [ ! -f "/etc/nginx/ssl/xlcig.cn.crt" ]; then
    echo -e "${YELLOW}使用Let's Encrypt获取免费SSL证书...${NC}"
    # 临时停止nginx
    systemctl stop nginx || true
    
    # 获取证书
    certbot certonly --standalone -d xlcig.cn -d www.xlcig.cn --agree-tos --no-eff-email --email admin@xlcig.cn
    
    # 创建软链接到nginx ssl目录
    ln -sf /etc/letsencrypt/live/xlcig.cn/fullchain.pem /etc/nginx/ssl/xlcig.cn.crt
    ln -sf /etc/letsencrypt/live/xlcig.cn/privkey.pem /etc/nginx/ssl/xlcig.cn.key
else
    echo -e "${GREEN}SSL证书已存在${NC}"
fi

# 8. 配置Nginx
echo -e "${YELLOW}8. 配置Nginx...${NC}"
# 备份原配置
cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || true

# 复制新配置
if [ -f "nginx-xlcig.conf" ]; then
    cp nginx-xlcig.conf /etc/nginx/nginx.conf
else
    echo -e "${RED}未找到nginx-xlcig.conf配置文件${NC}"
    exit 1
fi

# 测试nginx配置
nginx -t
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Nginx配置测试通过${NC}"
    systemctl restart nginx
    systemctl enable nginx
else
    echo -e "${RED}Nginx配置测试失败，请检查配置文件${NC}"
    exit 1
fi

# 9. 构建和启动后端
echo -e "${YELLOW}9. 配置后端服务...${NC}"
if [ -d "backend" ]; then
    cd backend
    
    # 安装依赖
    echo "安装后端依赖..."
    npm install
    
    # 构建TypeScript
    echo "构建后端代码..."
    npm run build
    
    # 停止旧的PM2进程
    pm2 delete all 2>/dev/null || true
    
    # 启动新进程
    if [ -f "ecosystem.config.js" ]; then
        pm2 start ecosystem.config.js --env production
    else
        # 如果没有ecosystem配置，直接启动
        pm2 start dist/app.js --name "xlcig-backend"
    fi
    
    pm2 save
    pm2 startup systemd
    
    cd ..
else
    echo -e "${RED}未找到backend目录${NC}"
    exit 1
fi

# 10. 构建前端并部署
echo -e "${YELLOW}10. 构建前端并部署...${NC}"
if [ -d "frontend" ]; then
    cd frontend
    
    # 安装依赖
    echo "安装前端依赖..."
    npm install
    
    # 构建前端
    echo "构建前端代码..."
    npm run build
    
    # 部署到nginx目录
    echo "部署前端文件..."
    rm -rf /usr/share/nginx/html/*
    
    # 检查构建输出目录
    if [ -d ".output/public" ]; then
        cp -r .output/public/* /usr/share/nginx/html/
    elif [ -d "dist" ]; then
        cp -r dist/* /usr/share/nginx/html/
    elif [ -d ".nuxt/dist" ]; then
        cp -r .nuxt/dist/* /usr/share/nginx/html/
    else
        echo -e "${RED}未找到前端构建输出目录${NC}"
        ls -la
        exit 1
    fi
    
    cd ..
else
    echo -e "${RED}未找到frontend目录${NC}"
    exit 1
fi

# 11. 配置防火墙
echo -e "${YELLOW}11. 配置防火墙...${NC}"
if command -v firewall-cmd &> /dev/null; then
    # CentOS 7+ 使用firewalld
    systemctl start firewalld
    systemctl enable firewalld
    firewall-cmd --permanent --add-port=80/tcp
    firewall-cmd --permanent --add-port=443/tcp
    firewall-cmd --permanent --add-port=9999/tcp
    firewall-cmd --reload
    echo -e "${GREEN}Firewalld防火墙配置完成${NC}"
elif command -v iptables &> /dev/null; then
    # 备用：使用iptables
    iptables -A INPUT -p tcp --dport 80 -j ACCEPT
    iptables -A INPUT -p tcp --dport 443 -j ACCEPT
    iptables -A INPUT -p tcp --dport 9999 -j ACCEPT
    service iptables save 2>/dev/null || true
    echo -e "${GREEN}iptables防火墙配置完成${NC}"
fi

# 12. 配置SSL证书自动续期
echo -e "${YELLOW}12. 配置SSL证书自动续期...${NC}"
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -

# 13. 启动并设置开机自启
echo -e "${YELLOW}13. 设置服务开机自启...${NC}"
systemctl enable nginx
systemctl enable firewalld 2>/dev/null || true

# 完成
echo -e "${GREEN}🎉 xlcig.cn 域名配置完成！${NC}"
echo ""
echo -e "${GREEN}访问地址:${NC}"
echo -e "  主站: https://xlcig.cn"
echo -e "  API:  https://xlcig.cn:9999"
echo ""
echo -e "${GREEN}服务状态:${NC}"
echo -e "  Nginx: $(systemctl is-active nginx)"
echo -e "  防火墙: $(systemctl is-active firewalld 2>/dev/null || echo 'iptables')"
pm2 list
echo ""
echo -e "${YELLOW}重要提醒:${NC}"
echo -e "1. 请确保DNS解析已正确配置指向此服务器"
echo -e "2. 防火墙已开放 80, 443, 9999 端口"
echo -e "3. SSL证书将自动续期"
echo -e "4. 可使用 'pm2 logs' 查看后端日志"
echo -e "5. 可使用 'nginx -t && systemctl reload nginx' 重载nginx配置"
echo -e "6. 可使用 'systemctl status nginx' 检查nginx状态" 