#!/bin/bash

# 自动更新部署脚本
# 功能：自动拉取git代码并重新部署

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# 配置参数
PROJECT_DIR="/path/to/your/project"  # 修改为您的项目路径
GIT_BRANCH="main"                    # 默认分支
BACKUP_DIR="./backups"               # 备份目录
MAX_BACKUPS=5                        # 保留备份数量

# 日志函数
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✅ $1${NC}"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️ $1${NC}"
}

# 检查依赖
check_dependencies() {
    log "检查系统依赖..."
    
    # 检查 git
    if ! command -v git &> /dev/null; then
        log_error "Git 未安装"
        exit 1
    fi
    
    # 检查 docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安装"
        exit 1
    fi
    
    # 检查 docker-compose
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose 未安装"
        exit 1
    fi
    
    log_success "系统依赖检查通过"
}

# 切换到项目目录
change_to_project_dir() {
    if [ "$PROJECT_DIR" != "/path/to/your/project" ]; then
        cd "$PROJECT_DIR" || {
            log_error "无法切换到项目目录: $PROJECT_DIR"
            exit 1
        }
        log_success "切换到项目目录: $PROJECT_DIR"
    else
        log "使用当前目录作为项目目录"
    fi
}

# 创建备份
create_backup() {
    log "创建部署前备份..."
    
    # 创建备份目录
    mkdir -p "$BACKUP_DIR"
    
    # 备份当前版本信息
    BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
    BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"
    
    # 获取当前 commit hash
    CURRENT_COMMIT=$(git rev-parse HEAD 2>/dev/null || echo "unknown")
    
    # 备份信息
    mkdir -p "$BACKUP_PATH"
    echo "Commit: $CURRENT_COMMIT" > "$BACKUP_PATH/info.txt"
    echo "Date: $(date)" >> "$BACKUP_PATH/info.txt"
    echo "Branch: $(git branch --show-current 2>/dev/null || echo "unknown")" >> "$BACKUP_PATH/info.txt"
    
    log_success "备份创建完成: $BACKUP_PATH"
    
    # 清理旧备份
    cleanup_old_backups
}

# 清理旧备份
cleanup_old_backups() {
    if [ -d "$BACKUP_DIR" ]; then
        BACKUP_COUNT=$(ls -1 "$BACKUP_DIR" | wc -l)
        if [ "$BACKUP_COUNT" -gt "$MAX_BACKUPS" ]; then
            log "清理旧备份，保留最新 $MAX_BACKUPS 个..."
            ls -1t "$BACKUP_DIR" | tail -n +$((MAX_BACKUPS + 1)) | xargs -I {} rm -rf "$BACKUP_DIR/{}"
            log_success "旧备份清理完成"
        fi
    fi
}

# 检查Git更新
check_git_updates() {
    log "检查代码更新..."
    
    # 获取远程更新
    git fetch origin "$GIT_BRANCH" 2>/dev/null || {
        log_error "无法获取远程更新"
        exit 1
    }
    
    # 比较本地和远程版本
    LOCAL_COMMIT=$(git rev-parse HEAD)
    REMOTE_COMMIT=$(git rev-parse "origin/$GIT_BRANCH")
    
    if [ "$LOCAL_COMMIT" = "$REMOTE_COMMIT" ]; then
        log_success "代码已是最新版本，无需更新"
        echo "本地: $LOCAL_COMMIT"
        echo "远程: $REMOTE_COMMIT"
        return 1
    else
        log "发现新版本可用"
        echo "本地: $LOCAL_COMMIT"
        echo "远程: $REMOTE_COMMIT"
        return 0
    fi
}

# 拉取最新代码
pull_latest_code() {
    log "拉取最新代码..."
    
    # 保存当前修改（如果有）
    if ! git diff-index --quiet HEAD --; then
        log_warning "发现未提交的修改，正在暂存..."
        git stash push -m "Auto-stash before deploy $(date)"
    fi
    
    # 拉取最新代码
    git pull origin "$GIT_BRANCH" || {
        log_error "代码拉取失败"
        exit 1
    }
    
    log_success "代码拉取完成"
    
    # 显示最新提交信息
    echo -e "${PURPLE}最新提交信息:${NC}"
    git log -1 --oneline --decorate
}

# 部署应用
deploy_application() {
    log "开始部署应用..."
    
    # 停止现有服务
    log "停止现有服务..."
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    
    # 清理Docker资源
    log "清理Docker资源..."
    docker system prune -f 2>/dev/null || true
    
    # 构建新镜像
    log "构建新镜像..."
    docker-compose -f docker-compose.prod.yml build --no-cache || {
        log_error "镜像构建失败"
        exit 1
    }
    
    # 启动服务
    log "启动新服务..."
    docker-compose -f docker-compose.prod.yml up -d || {
        log_error "服务启动失败"
        exit 1
    }
    
    log_success "应用部署完成"
}

# 健康检查
health_check() {
    log "执行健康检查..."
    
    # 等待服务启动
    sleep 15
    
    # 检查容器状态
    if ! docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
        log_error "容器状态异常"
        docker-compose -f docker-compose.prod.yml logs
        return 1
    fi
    
    # HTTP健康检查
    MAX_RETRIES=30
    RETRY_COUNT=0
    
    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        if curl -sf http://localhost > /dev/null 2>&1; then
            log_success "应用健康检查通过"
            return 0
        fi
        
        log "等待应用启动... ($((RETRY_COUNT + 1))/$MAX_RETRIES)"
        sleep 2
        RETRY_COUNT=$((RETRY_COUNT + 1))
    done
    
    log_error "应用健康检查失败"
    return 1
}

# 发送通知（可选）
send_notification() {
    local status=$1
    local message=$2
    
    # 您可以在这里添加通知逻辑，比如：
    # - 发送邮件
    # - 发送钉钉/企业微信消息
    # - 发送Slack消息
    
    if [ "$status" = "success" ]; then
        log_success "部署成功通知: $message"
    else
        log_error "部署失败通知: $message"
    fi
}

# 回滚函数
rollback() {
    log_error "部署失败，开始回滚..."
    
    # 找到最新的备份
    if [ -d "$BACKUP_DIR" ]; then
        LATEST_BACKUP=$(ls -1t "$BACKUP_DIR" | head -n 1)
        if [ -n "$LATEST_BACKUP" ]; then
            log "回滚到备份: $LATEST_BACKUP"
            
            # 读取备份信息
            if [ -f "$BACKUP_DIR/$LATEST_BACKUP/info.txt" ]; then
                BACKUP_COMMIT=$(grep "Commit:" "$BACKUP_DIR/$LATEST_BACKUP/info.txt" | cut -d' ' -f2)
                if [ "$BACKUP_COMMIT" != "unknown" ] && [ -n "$BACKUP_COMMIT" ]; then
                    git reset --hard "$BACKUP_COMMIT"
                    deploy_application
                    log_success "回滚完成"
                    return 0
                fi
            fi
        fi
    fi
    
    log_error "回滚失败，请手动处理"
    return 1
}

# 显示使用说明
show_usage() {
    echo "自动部署脚本使用说明："
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -f, --force    强制部署（跳过更新检查）"
    echo "  -b, --branch   指定分支（默认: main）"
    echo "  -d, --dir      指定项目目录"
    echo "  -h, --help     显示帮助信息"
    echo ""
    echo "示例:"
    echo "  $0                          # 检查更新并部署"
    echo "  $0 --force                  # 强制重新部署"
    echo "  $0 --branch develop         # 部署develop分支"
    echo "  $0 --dir /opt/myproject     # 指定项目目录"
}

# 主函数
main() {
    echo -e "${GREEN}🚀 自动部署脚本启动${NC}"
    echo -e "${BLUE}================================================${NC}"
    
    # 解析命令行参数
    FORCE_DEPLOY=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -f|--force)
                FORCE_DEPLOY=true
                shift
                ;;
            -b|--branch)
                GIT_BRANCH="$2"
                shift 2
                ;;
            -d|--dir)
                PROJECT_DIR="$2"
                shift 2
                ;;
            -h|--help)
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
    
    # 执行部署流程
    check_dependencies
    change_to_project_dir
    
    # 检查是否需要更新
    if [ "$FORCE_DEPLOY" = false ]; then
        if ! check_git_updates; then
            log_success "无需部署，退出"
            exit 0
        fi
    else
        log "强制部署模式，跳过更新检查"
    fi
    
    # 创建备份
    create_backup
    
    # 拉取代码
    if [ "$FORCE_DEPLOY" = false ]; then
        pull_latest_code
    fi
    
    # 部署应用
    if deploy_application; then
        if health_check; then
            NEW_COMMIT=$(git rev-parse HEAD)
            send_notification "success" "部署成功，版本: $NEW_COMMIT"
            log_success "🎉 自动部署完成！"
            
            echo -e "${BLUE}📊 部署信息:${NC}"
            echo -e "  访问地址: ${GREEN}http://www.xl-tool.online${NC}"
            echo -e "  本地地址: ${GREEN}http://localhost${NC}"
            echo -e "  当前版本: ${YELLOW}$NEW_COMMIT${NC}"
            echo -e "  部署时间: ${YELLOW}$(date)${NC}"
        else
            send_notification "error" "健康检查失败"
            rollback
        fi
    else
        send_notification "error" "部署失败"
        rollback
    fi
    
    echo -e "${BLUE}================================================${NC}"
    log_success "✨ 自动部署脚本执行完成"
}

# 错误处理
set -e
trap 'log_error "脚本执行出错，退出码: $?"' ERR

# 执行主函数
main "$@" 