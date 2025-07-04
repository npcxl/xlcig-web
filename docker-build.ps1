# Windows PowerShell Docker构建脚本
Write-Host "🐳 开始Docker构建和部署..." -ForegroundColor Green

# 检查Docker环境
function Test-DockerEnvironment {
    Write-Host "📋 检查Docker环境..." -ForegroundColor Blue
    
    try {
        docker --version | Out-Null
        docker-compose --version | Out-Null
        Write-Host "✅ Docker环境检查通过" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Docker或Docker Compose未安装，请先安装Docker Desktop" -ForegroundColor Red
        exit 1
    }
    
    # 检查Docker是否运行
    try {
        docker ps | Out-Null
        Write-Host "✅ Docker服务运行正常" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Docker服务未运行，请启动Docker Desktop" -ForegroundColor Red
        exit 1
    }
}

# 创建必要目录
function New-ProjectDirectories {
    Write-Host "📁 创建项目目录..." -ForegroundColor Blue
    
    New-Item -ItemType Directory -Path "logs" -Force | Out-Null
    New-Item -ItemType Directory -Path "error-pages" -Force | Out-Null
    
    # 如果错误页面不存在，复制默认的
    if (!(Test-Path "error-pages\404.html")) {
        Write-Host "⚠️ 复制默认错误页面..." -ForegroundColor Yellow
        $errorCodes = @(400, 403, 404, 500, 501, 502, 503, 504)
        foreach ($code in $errorCodes) {
            try {
                Copy-Item "error-pages\404.html" -Destination "error-pages\$code.html" -ErrorAction SilentlyContinue
            }
            catch { }
        }
    }
    
    Write-Host "✅ 目录创建完成" -ForegroundColor Green
}

# 停止现有容器
function Stop-ExistingContainers {
    Write-Host "🛑 停止现有容器..." -ForegroundColor Blue
    
    try {
        docker-compose -f docker-compose.prod.yml down 2>$null
        docker image prune -f 2>$null
        Write-Host "✅ 现有容器已停止" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️ 没有找到运行中的容器" -ForegroundColor Yellow
    }
}

# 构建新镜像
function Build-DockerImage {
    Write-Host "🔨 构建前端镜像..." -ForegroundColor Blue
    
    # 清理旧的构建缓存
    Write-Host "清理构建缓存..." -ForegroundColor Yellow
    docker system prune -f 2>$null
    
    # 构建镜像
    $buildResult = docker-compose -f docker-compose.prod.yml build --no-cache
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 镜像构建失败" -ForegroundColor Red
        Write-Host "构建日志:" -ForegroundColor Yellow
        Write-Host $buildResult -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ 镜像构建完成" -ForegroundColor Green
}

# 启动服务
function Start-Services {
    Write-Host "🚀 启动服务..." -ForegroundColor Blue
    
    docker-compose -f docker-compose.prod.yml up -d
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 服务启动失败" -ForegroundColor Red
        docker-compose -f docker-compose.prod.yml logs
        exit 1
    }
    
    Write-Host "✅ 服务启动成功" -ForegroundColor Green
}

# 检查服务状态
function Test-ServiceHealth {
    Write-Host "📊 检查服务状态..." -ForegroundColor Blue
    Start-Sleep -Seconds 10
    
    # 检查容器状态
    $containerStatus = docker ps --filter "name=pc-guide-web" --format "table {{.Names}}\t{{.Status}}"
    if ($containerStatus -match "pc-guide-web") {
        Write-Host "✅ 容器运行正常" -ForegroundColor Green
    }
    else {
        Write-Host "❌ 容器未运行" -ForegroundColor Red
        docker-compose -f docker-compose.prod.yml logs
        exit 1
    }
    
    # 检查HTTP响应
    $maxRetries = 30
    $retryCount = 0
    $healthCheckPassed = $false
    
    while ($retryCount -lt $maxRetries -and -not $healthCheckPassed) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ 网站响应正常" -ForegroundColor Green
                $healthCheckPassed = $true
                break
            }
        }
        catch {
            Write-Host "⏳ 等待服务启动... ($($retryCount + 1)/$maxRetries)" -ForegroundColor Yellow
            Start-Sleep -Seconds 2
            $retryCount++
        }
    }
    
    if (-not $healthCheckPassed) {
        Write-Host "❌ 服务健康检查失败" -ForegroundColor Red
        docker-compose -f docker-compose.prod.yml logs
        exit 1
    }
}

# 显示部署信息
function Show-DeploymentInfo {
    Write-Host "🎉 部署完成！" -ForegroundColor Green
    Write-Host "📝 部署信息:" -ForegroundColor Blue
    Write-Host "  本地访问: http://localhost" -ForegroundColor Green
    Write-Host "  域名访问: http://www.xlcig.cn (需配置DNS)" -ForegroundColor Green
    Write-Host "  容器名称: pc-guide-web" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🔧 常用命令:" -ForegroundColor Blue
    Write-Host "  查看容器状态: docker-compose -f docker-compose.prod.yml ps" -ForegroundColor Yellow
    Write-Host "  查看日志: docker-compose -f docker-compose.prod.yml logs -f" -ForegroundColor Yellow
    Write-Host "  重启服务: docker-compose -f docker-compose.prod.yml restart" -ForegroundColor Yellow
    Write-Host "  停止服务: docker-compose -f docker-compose.prod.yml down" -ForegroundColor Yellow
    Write-Host "  更新部署: PowerShell -ExecutionPolicy Bypass -File docker-build.ps1" -ForegroundColor Yellow
    
    # 显示容器状态
    Write-Host ""
    Write-Host "📊 当前容器状态:" -ForegroundColor Blue
    docker-compose -f docker-compose.prod.yml ps
}

# 主函数
function Main {
    Write-Host "🚀 电脑装机指南 - Docker部署脚本" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Blue
    Test-DockerEnvironment
    New-ProjectDirectories
    Stop-ExistingContainers
    Build-DockerImage
    Start-Services
    Test-ServiceHealth
    Show-DeploymentInfo
    Write-Host "================================================" -ForegroundColor Blue
    Write-Host "✨ 部署成功完成！" -ForegroundColor Green
}

# 错误处理
$ErrorActionPreference = "Stop"
try {
    Main
}
catch {
    Write-Host "❌ 部署过程中发生错误: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "请检查错误信息并重试" -ForegroundColor Yellow
    exit 1
} 