#!/bin/bash

# Webhook 自动部署脚本
# 功能：通过HTTP请求触发自动部署

# 配置参数
WEBHOOK_PORT=9000
SECRET_TOKEN="your-webhook-secret-token"  # 建议修改为复杂的密钥
LOG_FILE="./webhook-deploy.log"
PROJECT_DIR=$(pwd)

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✅ $1${NC}" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ❌ $1${NC}" | tee -a "$LOG_FILE"
}

# 检查依赖
check_dependencies() {
    if ! command -v nc &> /dev/null; then
        log_error "netcat (nc) 未安装，请先安装"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        log_error "jq 未安装，请先安装"
        exit 1
    fi
    
    log_success "依赖检查通过"
}

# 处理部署请求
handle_deploy_request() {
    local request_data="$1"
    local client_token=""
    local branch="main"
    
    # 解析请求数据
    if echo "$request_data" | grep -q "token="; then
        client_token=$(echo "$request_data" | grep -o "token=[^&]*" | cut -d'=' -f2)
    fi
    
    if echo "$request_data" | grep -q "branch="; then
        branch=$(echo "$request_data" | grep -o "branch=[^&]*" | cut -d'=' -f2)
    fi
    
    # 验证token
    if [ "$client_token" != "$SECRET_TOKEN" ]; then
        log_error "无效的访问令牌"
        return 1
    fi
    
    log "收到部署请求，分支: $branch"
    
    # 执行部署
    cd "$PROJECT_DIR" || {
        log_error "无法切换到项目目录"
        return 1
    }
    
    # 调用自动部署脚本
    if [ -f "./auto-deploy.sh" ]; then
        log "开始执行自动部署..."
        ./auto-deploy.sh --branch "$branch" >> "$LOG_FILE" 2>&1
        
        if [ $? -eq 0 ]; then
            log_success "部署成功完成"
            return 0
        else
            log_error "部署失败"
            return 1
        fi
    else
        log_error "自动部署脚本不存在"
        return 1
    fi
}

# HTTP响应函数
send_response() {
    local status_code="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case $status_code in
        200)
            echo "HTTP/1.1 200 OK"
            echo "Content-Type: application/json"
            echo "Access-Control-Allow-Origin: *"
            echo ""
            echo "{\"status\":\"success\",\"message\":\"$message\",\"timestamp\":\"$timestamp\"}"
            ;;
        400)
            echo "HTTP/1.1 400 Bad Request"
            echo "Content-Type: application/json"
            echo ""
            echo "{\"status\":\"error\",\"message\":\"$message\",\"timestamp\":\"$timestamp\"}"
            ;;
        401)
            echo "HTTP/1.1 401 Unauthorized"
            echo "Content-Type: application/json"
            echo ""
            echo "{\"status\":\"error\",\"message\":\"$message\",\"timestamp\":\"$timestamp\"}"
            ;;
        500)
            echo "HTTP/1.1 500 Internal Server Error"
            echo "Content-Type: application/json"
            echo ""
            echo "{\"status\":\"error\",\"message\":\"$message\",\"timestamp\":\"$timestamp\"}"
            ;;
    esac
}

# 处理HTTP请求
handle_request() {
    local request_line
    local headers=""
    local body=""
    local content_length=0
    
    # 读取请求行
    read -r request_line
    log "收到请求: $request_line"
    
    # 解析请求方法和路径
    local method=$(echo "$request_line" | cut -d' ' -f1)
    local path=$(echo "$request_line" | cut -d' ' -f2)
    
    # 读取头部
    while IFS= read -r line && [ "$line" != $'\r' ]; do
        headers="$headers$line\n"
        if [[ $line =~ ^Content-Length:\ ([0-9]+) ]]; then
            content_length=${BASH_REMATCH[1]}
        fi
    done
    
    # 读取请求体
    if [ "$content_length" -gt 0 ]; then
        body=$(head -c "$content_length")
    fi
    
    # 处理不同的请求路径
    case "$path" in
        "/deploy"*)
            if [ "$method" = "POST" ]; then
                # 处理POST请求的部署
                if handle_deploy_request "$body"; then
                    send_response 200 "部署成功启动"
                else
                    send_response 500 "部署执行失败"
                fi
            elif [ "$method" = "GET" ]; then
                # 处理GET请求的部署（通过查询参数）
                local query_string=$(echo "$path" | cut -d'?' -f2 2>/dev/null)
                if handle_deploy_request "$query_string"; then
                    send_response 200 "部署成功启动"
                else
                    send_response 500 "部署执行失败"
                fi
            else
                send_response 400 "不支持的请求方法"
            fi
            ;;
        "/status")
            # 返回状态信息
            local last_deploy=$(tail -n 10 "$LOG_FILE" | grep "部署完成" | tail -n 1)
            send_response 200 "Webhook服务运行正常。最后部署: ${last_deploy:-'无记录'}"
            ;;
        "/health")
            # 健康检查
            send_response 200 "OK"
            ;;
        *)
            # 未知路径
            send_response 400 "未知的请求路径"
            ;;
    esac
}

# 启动Webhook服务器
start_webhook_server() {
    log "启动Webhook服务器，端口: $WEBHOOK_PORT"
    
    # 检查端口是否被占用
    if netstat -tlnp 2>/dev/null | grep -q ":$WEBHOOK_PORT "; then
        log_error "端口 $WEBHOOK_PORT 已被占用"
        exit 1
    fi
    
    log_success "Webhook服务器启动成功"
    log "访问地址: http://localhost:$WEBHOOK_PORT/deploy?token=$SECRET_TOKEN"
    log "状态查询: http://localhost:$WEBHOOK_PORT/status"
    log "健康检查: http://localhost:$WEBHOOK_PORT/health"
    
    # 启动服务器循环
    while true; do
        # 使用netcat监听端口并处理请求
        handle_request | nc -l -p "$WEBHOOK_PORT" -q 1
    done
}

# 生成systemd服务文件
generate_systemd_service() {
    local service_file="/etc/systemd/system/webhook-deploy.service"
    local user=$(whoami)
    local working_dir=$(pwd)
    
    cat > "$service_file" << EOF
[Unit]
Description=Webhook Deploy Service
After=network.target

[Service]
Type=simple
User=$user
WorkingDirectory=$working_dir
ExecStart=$working_dir/webhook-deploy.sh --daemon
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

    log_success "Systemd服务文件已创建: $service_file"
    echo "运行以下命令启用服务:"
    echo "  sudo systemctl enable webhook-deploy"
    echo "  sudo systemctl start webhook-deploy"
    echo "  sudo systemctl status webhook-deploy"
}

# 显示使用说明
show_usage() {
    echo "Webhook 自动部署脚本使用说明："
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  --daemon       后台运行服务"
    echo "  --port PORT    指定端口（默认: 9000）"
    echo "  --token TOKEN  指定访问令牌"
    echo "  --systemd      生成systemd服务文件"
    echo "  --help         显示帮助信息"
    echo ""
    echo "API端点:"
    echo "  POST /deploy?token=TOKEN&branch=BRANCH  # 触发部署"
    echo "  GET  /status                            # 查看状态"
    echo "  GET  /health                            # 健康检查"
    echo ""
    echo "示例:"
    echo "  $0                                     # 启动webhook服务"
    echo "  $0 --port 8080                         # 使用8080端口"
    echo "  $0 --daemon                            # 后台运行"
    echo "  curl -X POST 'http://localhost:9000/deploy?token=your-token'"
}

# 主函数
main() {
    echo -e "${GREEN}🚀 Webhook 自动部署服务${NC}"
    echo -e "${BLUE}================================================${NC}"
    
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            --daemon)
                nohup "$0" > /dev/null 2>&1 &
                echo "Webhook服务已在后台启动，PID: $!"
                exit 0
                ;;
            --port)
                WEBHOOK_PORT="$2"
                shift 2
                ;;
            --token)
                SECRET_TOKEN="$2"
                shift 2
                ;;
            --systemd)
                generate_systemd_service
                exit 0
                ;;
            --help)
                show_usage
                exit 0
                ;;
            *)
                log_error "未知参数: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    # 检查依赖并启动服务
    check_dependencies
    start_webhook_server
}

# 信号处理
cleanup() {
    log "收到终止信号，正在关闭Webhook服务..."
    exit 0
}

trap cleanup SIGINT SIGTERM

# 执行主函数
main "$@" 