#!/bin/bash

# 定时自动部署脚本
# 功能：定时检查Git更新并自动部署

# 配置参数
CHECK_INTERVAL=300        # 检查间隔（秒），默认5分钟
GIT_BRANCH="main"         # 默认分支
PROJECT_DIR=""            # 项目目录，空则使用当前目录
LOG_FILE="./schedule-deploy.log"
DAEMON_MODE=false
PID_FILE="./schedule-deploy.pid"

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

log_info() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')] ℹ️ $1${NC}" | tee -a "$LOG_FILE"
}

# 检查依赖
check_dependencies() {
    if ! command -v git &> /dev/null; then
        log_error "Git 未安装"
        exit 1
    fi
    
    if [ ! -f "./auto-deploy.sh" ]; then
        log_error "找不到 auto-deploy.sh 脚本"
        exit 1
    fi
    
    log_success "依赖检查通过"
}

# 切换到项目目录
change_to_project_dir() {
    if [ -n "$PROJECT_DIR" ] && [ "$PROJECT_DIR" != "$(pwd)" ]; then
        if [ -d "$PROJECT_DIR" ]; then
            cd "$PROJECT_DIR" || {
                log_error "无法切换到项目目录: $PROJECT_DIR"
                exit 1
            }
            log_success "切换到项目目录: $PROJECT_DIR"
        else
            log_error "项目目录不存在: $PROJECT_DIR"
            exit 1
        fi
    fi
}

# 检查Git更新
check_git_updates() {
    log_info "检查代码更新..."
    
    # 获取远程更新
    if ! git fetch origin "$GIT_BRANCH" &>/dev/null; then
        log_error "无法获取远程更新"
        return 1
    fi
    
    # 比较本地和远程版本
    local local_commit=$(git rev-parse HEAD 2>/dev/null)
    local remote_commit=$(git rev-parse "origin/$GIT_BRANCH" 2>/dev/null)
    
    if [ "$local_commit" = "$remote_commit" ]; then
        log_info "代码已是最新版本"
        return 1
    else
        log_success "发现新版本可用"
        log_info "本地: $local_commit"
        log_info "远程: $remote_commit"
        return 0
    fi
}

# 执行自动部署
execute_auto_deploy() {
    log_success "开始执行自动部署..."
    
    # 调用自动部署脚本
    ./auto-deploy.sh --branch "$GIT_BRANCH" >> "$LOG_FILE" 2>&1
    
    if [ $? -eq 0 ]; then
        log_success "自动部署成功完成"
        return 0
    else
        log_error "自动部署失败"
        return 1
    fi
}

# 主循环
main_loop() {
    log_success "定时部署服务启动"
    log_info "检查间隔: $CHECK_INTERVAL 秒"
    log_info "Git分支: $GIT_BRANCH"
    log_info "项目目录: $(pwd)"
    
    while true; do
        # 检查是否有更新
        if check_git_updates; then
            # 有更新，执行部署
            execute_auto_deploy
            
            # 部署后等待更长时间，避免频繁部署
            log_info "部署完成，等待 $((CHECK_INTERVAL * 2)) 秒后继续检查..."
            sleep $((CHECK_INTERVAL * 2))
        else
            # 无更新，正常等待
            log_info "无更新，等待 $CHECK_INTERVAL 秒后继续检查..."
            sleep "$CHECK_INTERVAL"
        fi
    done
}

# 启动守护进程
start_daemon() {
    # 检查是否已经运行
    if [ -f "$PID_FILE" ]; then
        local old_pid=$(cat "$PID_FILE")
        if kill -0 "$old_pid" 2>/dev/null; then
            log_error "定时部署服务已在运行，PID: $old_pid"
            exit 1
        else
            log_info "清理无效的PID文件"
            rm -f "$PID_FILE"
        fi
    fi
    
    # 启动守护进程
    nohup "$0" --internal-daemon > "$LOG_FILE" 2>&1 &
    local daemon_pid=$!
    
    # 保存PID
    echo "$daemon_pid" > "$PID_FILE"
    
    log_success "定时部署服务已启动，PID: $daemon_pid"
    log_info "日志文件: $LOG_FILE"
    log_info "PID文件: $PID_FILE"
    
    echo "使用以下命令管理服务:"
    echo "  查看状态: $0 --status"
    echo "  停止服务: $0 --stop"
    echo "  查看日志: tail -f $LOG_FILE"
}

# 停止守护进程
stop_daemon() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if kill -0 "$pid" 2>/dev/null; then
            log_info "正在停止定时部署服务，PID: $pid"
            kill "$pid"
            
            # 等待进程结束
            for i in {1..10}; do
                if ! kill -0 "$pid" 2>/dev/null; then
                    break
                fi
                sleep 1
            done
            
            # 强制杀死进程
            if kill -0 "$pid" 2>/dev/null; then
                log_info "强制停止进程"
                kill -9 "$pid"
            fi
            
            rm -f "$PID_FILE"
            log_success "定时部署服务已停止"
        else
            log_error "进程不存在，清理PID文件"
            rm -f "$PID_FILE"
        fi
    else
        log_error "PID文件不存在，服务可能未运行"
    fi
}

# 查看服务状态
show_status() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if kill -0 "$pid" 2>/dev/null; then
            log_success "定时部署服务正在运行，PID: $pid"
            
            # 显示最近的日志
            if [ -f "$LOG_FILE" ]; then
                echo ""
                echo "最近的日志记录:"
                tail -n 10 "$LOG_FILE"
            fi
        else
            log_error "进程不存在，PID: $pid"
            rm -f "$PID_FILE"
        fi
    else
        log_info "定时部署服务未运行"
    fi
}

# 生成crontab配置
generate_crontab() {
    local cron_interval="*/5"  # 默认每5分钟
    local script_path=$(realpath "$0")
    local work_dir=$(pwd)
    
    case $CHECK_INTERVAL in
        60)   cron_interval="* *" ;;      # 每分钟
        300)  cron_interval="*/5 *" ;;    # 每5分钟
        600)  cron_interval="*/10 *" ;;   # 每10分钟
        900)  cron_interval="*/15 *" ;;   # 每15分钟
        1800) cron_interval="*/30 *" ;;   # 每30分钟
        3600) cron_interval="0 *" ;;      # 每小时
        *)    cron_interval="*/5 *" ;;    # 默认每5分钟
    esac
    
    cat << EOF
# 定时自动部署任务
# 每${CHECK_INTERVAL}秒检查一次代码更新
$cron_interval * * * cd $work_dir && $script_path --check-once --branch $GIT_BRANCH >> $LOG_FILE 2>&1

# 添加到crontab的命令:
# echo "$cron_interval * * * cd $work_dir && $script_path --check-once --branch $GIT_BRANCH >> $LOG_FILE 2>&1" | crontab -
EOF
}

# 单次检查
check_once() {
    change_to_project_dir
    check_dependencies
    
    if check_git_updates; then
        execute_auto_deploy
    else
        log_info "无需更新"
    fi
}

# 显示使用说明
show_usage() {
    cat << EOF
定时自动部署脚本使用说明：

用法: $0 [选项]

选项:
  --start                启动定时检查服务
  --stop                 停止定时检查服务
  --status               查看服务状态
  --restart              重启服务
  --check-once           单次检查更新
  --interval SECONDS     设置检查间隔（默认: 300秒）
  --branch BRANCH        指定Git分支（默认: main）
  --dir DIR              指定项目目录
  --crontab              生成crontab配置
  --internal-daemon      内部使用（守护进程模式）
  --help                 显示帮助信息

示例:
  $0 --start                          # 启动定时检查服务
  $0 --start --interval 600           # 每10分钟检查一次
  $0 --start --branch develop         # 检查develop分支
  $0 --check-once                     # 单次检查更新
  $0 --crontab                        # 生成crontab配置

常用命令:
  启动服务: $0 --start
  查看状态: $0 --status
  查看日志: tail -f $LOG_FILE
  停止服务: $0 --stop
EOF
}

# 信号处理
cleanup() {
    log_info "收到终止信号，正在关闭定时部署服务..."
    rm -f "$PID_FILE"
    exit 0
}

# 主函数
main() {
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            --start)
                start_daemon
                exit 0
                ;;
            --stop)
                stop_daemon
                exit 0
                ;;
            --status)
                show_status
                exit 0
                ;;
            --restart)
                stop_daemon
                sleep 2
                start_daemon
                exit 0
                ;;
            --check-once)
                check_once
                exit 0
                ;;
            --interval)
                CHECK_INTERVAL="$2"
                shift 2
                ;;
            --branch)
                GIT_BRANCH="$2"
                shift 2
                ;;
            --dir)
                PROJECT_DIR="$2"
                shift 2
                ;;
            --crontab)
                generate_crontab
                exit 0
                ;;
            --internal-daemon)
                DAEMON_MODE=true
                shift
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
    
    # 如果是守护进程模式，直接运行主循环
    if [ "$DAEMON_MODE" = true ]; then
        trap cleanup SIGINT SIGTERM
        change_to_project_dir
        check_dependencies
        main_loop
    else
        show_usage
    fi
}

# 执行主函数
main "$@" 