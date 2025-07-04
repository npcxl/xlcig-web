# Windows PowerShell 自动更新部署脚本
# 功能：自动拉取git代码并重新部署

param(
    [switch]$Force,           # 强制部署
    [string]$Branch = "main", # Git分支
    [string]$ProjectDir = "", # 项目目录
    [switch]$Help             # 显示帮助
)

# 配置参数
$script:MaxBackups = 5
$script:BackupDir = ".\backups"

# 日志函数
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $color = switch ($Level) {
        "SUCCESS" { "Green" }
        "ERROR" { "Red" }
        "WARNING" { "Yellow" }
        "INFO" { "Blue" }
        default { "White" }
    }
    
    $icon = switch ($Level) {
        "SUCCESS" { "✅" }
        "ERROR" { "❌" }
        "WARNING" { "⚠️" }
        default { "ℹ️" }
    }
    
    Write-Host "[$timestamp] $icon $Message" -ForegroundColor $color
}

function Write-Success { param([string]$Message) Write-Log $Message "SUCCESS" }
function Write-Error { param([string]$Message) Write-Log $Message "ERROR" }
function Write-Warning { param([string]$Message) Write-Log $Message "WARNING" }

# 检查系统依赖
function Test-Dependencies {
    Write-Log "检查系统依赖..."
    
    # 检查 Git
    try {
        git --version | Out-Null
        Write-Success "Git 已安装"
    }
    catch {
        Write-Error "Git 未安装，请先安装 Git"
        exit 1
    }
    
    # 检查 Docker
    try {
        docker --version | Out-Null
        Write-Success "Docker 已安装"
    }
    catch {
        Write-Error "Docker 未安装，请先安装 Docker Desktop"
        exit 1
    }
    
    # 检查 Docker Compose
    try {
        docker-compose --version | Out-Null
        Write-Success "Docker Compose 已安装"
    }
    catch {
        Write-Error "Docker Compose 未安装"
        exit 1
    }
    
    # 检查 Docker 是否运行
    try {
        docker ps | Out-Null
        Write-Success "Docker 服务运行正常"
    }
    catch {
        Write-Error "Docker 服务未运行，请启动 Docker Desktop"
        exit 1
    }
    
    Write-Success "系统依赖检查通过"
}

# 切换到项目目录
function Set-ProjectDirectory {
    param([string]$Dir)
    
    if ($Dir -and $Dir -ne "") {
        if (Test-Path $Dir) {
            Set-Location $Dir
            Write-Success "切换到项目目录: $Dir"
        }
        else {
            Write-Error "项目目录不存在: $Dir"
            exit 1
        }
    }
    else {
        Write-Log "使用当前目录作为项目目录: $(Get-Location)"
    }
}

# 创建备份
function New-Backup {
    Write-Log "创建部署前备份..."
    
    # 创建备份目录
    if (!(Test-Path $script:BackupDir)) {
        New-Item -ItemType Directory -Path $script:BackupDir | Out-Null
    }
    
    # 备份当前版本信息
    $backupName = "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    $backupPath = Join-Path $script:BackupDir $backupName
    
    New-Item -ItemType Directory -Path $backupPath | Out-Null
    
    # 获取当前 commit hash
    try {
        $currentCommit = git rev-parse HEAD 2>$null
    }
    catch {
        $currentCommit = "unknown"
    }
    
    # 获取当前分支
    try {
        $currentBranch = git branch --show-current 2>$null
    }
    catch {
        $currentBranch = "unknown"
    }
    
    # 创建备份信息文件
    $backupInfo = @"
Commit: $currentCommit
Date: $(Get-Date)
Branch: $currentBranch
"@
    
    $backupInfo | Out-File -FilePath (Join-Path $backupPath "info.txt") -Encoding UTF8
    
    Write-Success "备份创建完成: $backupPath"
    
    # 清理旧备份
    Remove-OldBackups
}

# 清理旧备份
function Remove-OldBackups {
    if (Test-Path $script:BackupDir) {
        $backups = Get-ChildItem $script:BackupDir | Sort-Object CreationTime -Descending
        if ($backups.Count -gt $script:MaxBackups) {
            $oldBackups = $backups | Select-Object -Skip $script:MaxBackups
            Write-Log "清理旧备份，保留最新 $($script:MaxBackups) 个..."
            foreach ($backup in $oldBackups) {
                Remove-Item $backup.FullName -Recurse -Force
            }
            Write-Success "旧备份清理完成"
        }
    }
}

# 检查Git更新
function Test-GitUpdates {
    param([string]$Branch)
    
    Write-Log "检查代码更新..."
    
    # 获取远程更新
    try {
        git fetch origin $Branch 2>$null
    }
    catch {
        Write-Error "无法获取远程更新"
        exit 1
    }
    
    # 比较本地和远程版本
    $localCommit = git rev-parse HEAD
    $remoteCommit = git rev-parse "origin/$Branch"
    
    if ($localCommit -eq $remoteCommit) {
        Write-Success "代码已是最新版本，无需更新"
        Write-Host "本地: $localCommit" -ForegroundColor Yellow
        Write-Host "远程: $remoteCommit" -ForegroundColor Yellow
        return $false
    }
    else {
        Write-Log "发现新版本可用"
        Write-Host "本地: $localCommit" -ForegroundColor Yellow
        Write-Host "远程: $remoteCommit" -ForegroundColor Yellow
        return $true
    }
}

# 拉取最新代码
function Get-LatestCode {
    param([string]$Branch)
    
    Write-Log "拉取最新代码..."
    
    # 检查是否有未提交的修改
    $hasChanges = git diff-index --quiet HEAD 2>$null; $?
    if (-not $hasChanges) {
        Write-Warning "发现未提交的修改，正在暂存..."
        git stash push -m "Auto-stash before deploy $(Get-Date)"
    }
    
    # 拉取最新代码
    try {
        git pull origin $Branch
        Write-Success "代码拉取完成"
    }
    catch {
        Write-Error "代码拉取失败"
        exit 1
    }
    
    # 显示最新提交信息
    Write-Host "最新提交信息:" -ForegroundColor Magenta
    git log -1 --oneline --decorate
}

# 部署应用
function Deploy-Application {
    Write-Log "开始部署应用..."
    
    # 停止现有服务
    Write-Log "停止现有服务..."
    docker-compose -f docker-compose.prod.yml down 2>$null
    
    # 清理Docker资源
    Write-Log "清理Docker资源..."
    docker system prune -f 2>$null
    
    # 构建新镜像
    Write-Log "构建新镜像..."
    $buildResult = docker-compose -f docker-compose.prod.yml build --no-cache
    if ($LASTEXITCODE -ne 0) {
        Write-Error "镜像构建失败"
        return $false
    }
    
    # 启动服务
    Write-Log "启动新服务..."
    docker-compose -f docker-compose.prod.yml up -d
    if ($LASTEXITCODE -ne 0) {
        Write-Error "服务启动失败"
        return $false
    }
    
    Write-Success "应用部署完成"
    return $true
}

# 健康检查
function Test-ApplicationHealth {
    Write-Log "执行健康检查..."
    
    # 等待服务启动
    Start-Sleep -Seconds 15
    
    # 检查容器状态
    $containerStatus = docker-compose -f docker-compose.prod.yml ps
    if ($containerStatus -notmatch "Up") {
        Write-Error "容器状态异常"
        docker-compose -f docker-compose.prod.yml logs
        return $false
    }
    
    # HTTP健康检查
    $maxRetries = 30
    $retryCount = 0
    
    while ($retryCount -lt $maxRetries) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Success "应用健康检查通过"
                return $true
            }
        }
        catch {
            Write-Log "等待应用启动... ($($retryCount + 1)/$maxRetries)"
            Start-Sleep -Seconds 2
            $retryCount++
        }
    }
    
    Write-Error "应用健康检查失败"
    return $false
}

# 发送通知
function Send-Notification {
    param([string]$Status, [string]$Message)
    
    # 您可以在这里添加通知逻辑，比如：
    # - 发送邮件
    # - 发送钉钉/企业微信消息
    # - 发送Slack消息
    
    if ($Status -eq "success") {
        Write-Success "部署成功通知: $Message"
    }
    else {
        Write-Error "部署失败通知: $Message"
    }
}

# 回滚功能
function Invoke-Rollback {
    Write-Error "部署失败，开始回滚..."
    
    if (Test-Path $script:BackupDir) {
        $latestBackup = Get-ChildItem $script:BackupDir | Sort-Object CreationTime -Descending | Select-Object -First 1
        
        if ($latestBackup) {
            Write-Log "回滚到备份: $($latestBackup.Name)"
            
            $infoFile = Join-Path $latestBackup.FullName "info.txt"
            if (Test-Path $infoFile) {
                $backupInfo = Get-Content $infoFile
                $backupCommit = ($backupInfo | Where-Object { $_ -match "^Commit:" }) -replace "Commit:\s*", ""
                
                if ($backupCommit -and $backupCommit -ne "unknown") {
                    git reset --hard $backupCommit
                    if (Deploy-Application) {
                        Write-Success "回滚完成"
                        return
                    }
                }
            }
        }
    }
    
    Write-Error "回滚失败，请手动处理"
}

# 显示使用说明
function Show-Usage {
    Write-Host @"
自动部署脚本使用说明：

用法: .\auto-deploy.ps1 [参数]

参数:
  -Force          强制部署（跳过更新检查）
  -Branch <name>  指定分支（默认: main）
  -ProjectDir <path>  指定项目目录
  -Help           显示帮助信息

示例:
  .\auto-deploy.ps1                          # 检查更新并部署
  .\auto-deploy.ps1 -Force                   # 强制重新部署
  .\auto-deploy.ps1 -Branch develop          # 部署develop分支
  .\auto-deploy.ps1 -ProjectDir C:\myproject # 指定项目目录
"@
}

# 主函数
function Main {
    Write-Host "🚀 自动部署脚本启动" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Blue
    
    # 显示帮助
    if ($Help) {
        Show-Usage
        return
    }
    
    try {
        # 执行部署流程
        Test-Dependencies
        Set-ProjectDirectory -Dir $ProjectDir
        
        # 检查是否需要更新
        $needsUpdate = $true
        if (-not $Force) {
            $needsUpdate = Test-GitUpdates -Branch $Branch
            if (-not $needsUpdate) {
                Write-Success "无需部署，退出"
                return
            }
        }
        else {
            Write-Log "强制部署模式，跳过更新检查"
        }
        
        # 创建备份
        New-Backup
        
        # 拉取代码
        if (-not $Force -and $needsUpdate) {
            Get-LatestCode -Branch $Branch
        }
        
        # 部署应用
        if (Deploy-Application) {
            if (Test-ApplicationHealth) {
                $newCommit = git rev-parse HEAD
                Send-Notification -Status "success" -Message "部署成功，版本: $newCommit"
                Write-Success "🎉 自动部署完成！"
                
                Write-Host "📊 部署信息:" -ForegroundColor Blue
                Write-Host "  访问地址: http://www.xl-tool.online" -ForegroundColor Green
                Write-Host "  本地地址: http://localhost" -ForegroundColor Green
                Write-Host "  当前版本: $newCommit" -ForegroundColor Yellow
                Write-Host "  部署时间: $(Get-Date)" -ForegroundColor Yellow
            }
            else {
                Send-Notification -Status "error" -Message "健康检查失败"
                Invoke-Rollback
            }
        }
        else {
            Send-Notification -Status "error" -Message "部署失败"
            Invoke-Rollback
        }
    }
    catch {
        Write-Error "脚本执行出错: $($_.Exception.Message)"
        Invoke-Rollback
    }
    finally {
        Write-Host "================================================" -ForegroundColor Blue
        Write-Success "✨ 自动部署脚本执行完成"
    }
}

# 执行主函数
Main 