<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="glass-card p-8">
      <h1 class="page-title mb-8">📥 安装指南</h1>
      
      <!-- 环境要求 -->
      <section class="mb-10">
        <h2 class="section-title">📋 环境要求</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="glass-card p-6">
            <h3 class="subsection-title">💻 系统要求</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-center">
                <i class="bi bi-check-circle-fill text-green-500 mr-3"></i>
                Windows 10+ / macOS 10.15+ / Linux
              </li>
              <li class="flex items-center">
                <i class="bi bi-check-circle-fill text-green-500 mr-3"></i>
                Git 2.20+
              </li>
              <li class="flex items-center">
                <i class="bi bi-check-circle-fill text-green-500 mr-3"></i>
                至少4GB内存
              </li>
            </ul>
          </div>
          <div class="glass-card p-6">
            <h3 class="subsection-title">⚙️ 开发环境</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-center">
                <i class="bi bi-check-circle-fill text-green-500 mr-3"></i>
                Node.js 18.0+ (推荐18.17.0+)
              </li>
              <li class="flex items-center">
                <i class="bi bi-check-circle-fill text-green-500 mr-3"></i>
                npm 9.0+ 或 pnpm 8.0+
              </li>
              <li class="flex items-center">
                <i class="bi bi-check-circle-fill text-green-500 mr-3"></i>
                VSCode + Volar插件
              </li>
            </ul>
          </div>
        </div>
        
        <div class="alert alert-info">
          <i class="bi bi-info-circle mr-2"></i>
          <strong>建议：</strong>使用 <code class="code-inline">nvm</code> 或 <code class="code-inline">fnm</code> 管理Node.js版本，以便在不同项目间切换。
        </div>
      </section>

      <!-- 检查环境 -->
      <section class="mb-10">
        <h2 class="section-title">🔍 检查环境</h2>
        <p class="text-gray-600 mb-4">在开始之前，请确认您的环境满足要求：</p>
        
        <div class="code-block mb-4">
          # 检查 Node.js 版本<br>
          node --version<br>
          # 应该显示 v18.17.0 或更高版本<br><br>
          
          # 检查 npm 版本<br>
          npm --version<br>
          # 应该显示 9.0.0 或更高版本<br><br>
          
          # 检查 Git 版本<br>
          git --version<br>
          # 应该显示 2.20.0 或更高版本
        </div>
        
        <div class="alert alert-warning">
          <i class="bi bi-exclamation-triangle mr-2"></i>
          如果版本不符合要求，请先升级相应的工具。Node.js可以从 <a href="https://nodejs.org" target="_blank" class="link link-external">官网</a> 下载。
        </div>
      </section>

      <!-- 克隆项目 -->
      <section class="mb-10">
        <h2 class="section-title">📂 克隆项目</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 class="subsection-title">从 Gitee 克隆（推荐）</h3>
            <div class="code-block mb-4">
              git clone https://gitee.com/leheya/xlweb.git<br>
              cd xlweb
            </div>
            <p class="text-sm text-gray-600">国内用户推荐使用Gitee，下载速度更快。</p>
          </div>
          
          <div>
            <h3 class="subsection-title">SSH克隆（需配置密钥）</h3>
            <div class="code-block mb-4">
              git clone git@gitee.com:leheya/xlweb.git<br>
              cd xlweb
            </div>
            <p class="text-sm text-gray-600">使用SSH克隆需要先配置SSH密钥。</p>
          </div>
        </div>
      </section>

      <!-- 安装依赖 -->
      <section class="mb-10">
        <h2 class="section-title">📦 安装依赖</h2>
        
        <div class="mb-6">
          <div class="flex flex-wrap gap-4 mb-4">
            <button 
              v-for="manager in packageManagers" 
              :key="manager.name"
              @click="selectedManager = manager"
              class="btn-ghost"
              :class="{ 'bg-primary-100 text-primary-700': selectedManager.name === manager.name }"
            >
              {{ manager.name }}
            </button>
          </div>
          
          <div class="code-block">
            {{ selectedManager.install }}
          </div>
          
          <div class="mt-4 text-sm text-gray-600">
            <strong>{{ selectedManager.name }}特点：</strong>{{ selectedManager.description }}
          </div>
        </div>
        
        <div class="alert alert-success">
          <i class="bi bi-lightbulb mr-2"></i>
          <strong>性能提示：</strong>如果您是首次安装，建议使用 <code class="code-inline">pnpm</code>，它通过符号链接共享依赖，可以节省磁盘空间并提高安装速度。
        </div>
      </section>

      <!-- 启动开发服务器 -->
      <section class="mb-10">
        <h2 class="section-title">🚀 启动开发服务器</h2>
        
        <div class="space-y-4">
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">启动开发模式</h4>
            <div class="code-block">
              {{ selectedManager.dev }}
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="glass-card p-4">
              <h5 class="font-medium text-gray-800 mb-2">🌐 访问地址</h5>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>本地: <code class="code-inline">http://localhost:8888</code></li>
                <li>网络: <code class="code-inline">http://你的IP:8888</code></li>
              </ul>
            </div>
            <div class="glass-card p-4">
              <h5 class="font-medium text-gray-800 mb-2">⚡ 开发特性</h5>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• 热重载 (HMR)</li>
                <li>• 自动导入</li>
                <li>• TypeScript支持</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 生产构建 -->
      <section class="mb-10">
        <h2 class="section-title">🏗️ 生产构建</h2>
        
        <div class="space-y-6">
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">构建生产版本</h4>
            <div class="code-block">
              {{ selectedManager.build }}
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">预览生产构建</h4>
            <div class="code-block">
              {{ selectedManager.preview }}
            </div>
          </div>
          
          <div class="alert alert-info">
            <i class="bi bi-info-circle mr-2"></i>
            生产构建会生成优化后的静态文件，包括代码分割、压缩等优化处理。
          </div>
        </div>
      </section>

      <!-- 配置环境变量 -->
      <section class="mb-10">
        <h2 class="section-title">⚙️ 配置环境变量</h2>
        
        <div class="space-y-6">
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">创建环境变量文件</h4>
            <div class="code-block">
              # 在项目根目录创建 .env 文件<br>
              touch .env
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">配置示例</h4>
            <div class="code-block">
              # .env<br>
              NUXT_PUBLIC_API_BASE=http://localhost:9999<br>
              NUXT_PUBLIC_WS_URL=ws://localhost:9999/websocket<br>
              NUXT_PUBLIC_APP_NAME=xlCig<br>
              NUXT_PUBLIC_DEBUG=true
            </div>
          </div>
          
          <div class="alert alert-warning">
            <i class="bi bi-exclamation-triangle mr-2"></i>
            <strong>注意：</strong>不要将包含敏感信息的 <code class="code-inline">.env</code> 文件提交到版本控制系统。
          </div>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="mb-10">
        <h2 class="section-title">❓ 安装常见问题</h2>
        
        <div class="space-y-6">
          <div class="glass-card p-6">
            <h4 class="font-semibold text-gray-800 mb-3">Q: npm install 速度慢或失败？</h4>
            <div class="text-gray-600 space-y-2">
              <p><strong>解决方案：</strong></p>
              <ul class="list-disc pl-6 space-y-1">
                <li>使用国内镜像：<code class="code-inline">npm config set registry https://registry.npmmirror.com</code></li>
                <li>清除缓存：<code class="code-inline">npm cache clean --force</code></li>
                <li>删除 node_modules 重新安装：<code class="code-inline">rm -rf node_modules && npm install</code></li>
              </ul>
            </div>
          </div>
          
          <div class="glass-card p-6">
            <h4 class="font-semibold text-gray-800 mb-3">Q: 端口8888已被占用？</h4>
            <div class="text-gray-600 space-y-2">
              <p><strong>解决方案：</strong></p>
              <ul class="list-disc pl-6 space-y-1">
                <li>修改 <code class="code-inline">nuxt.config.ts</code> 中的端口配置</li>
                <li>或使用环境变量：<code class="code-inline">PORT=3000 npm run dev</code></li>
                <li>查找占用端口的进程：<code class="code-inline">lsof -i :8888</code> (macOS/Linux)</li>
              </ul>
            </div>
          </div>
          
          <div class="glass-card p-6">
            <h4 class="font-semibold text-gray-800 mb-3">Q: TypeScript类型错误？</h4>
            <div class="text-gray-600 space-y-2">
              <p><strong>解决方案：</strong></p>
              <ul class="list-disc pl-6 space-y-1">
                <li>重新生成类型：<code class="code-inline">npm run postinstall</code></li>
                <li>清除 .nuxt 目录：<code class="code-inline">rm -rf .nuxt</code></li>
                <li>重启TypeScript服务（VSCode中按 Ctrl+Shift+P，搜索"TypeScript: Restart TS Server"）</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 下一步 -->
      <section>
        <div class="glass-card p-6 text-center">
          <h3 class="subsection-title mb-4">🎉 安装完成！</h3>
          <p class="text-gray-600 mb-6">恭喜！您已成功安装xlCig项目。接下来可以：</p>
          <div class="flex flex-wrap justify-center gap-4">
            <router-link to="/tech-stack" class="btn-primary">
              <i class="bi bi-stack mr-2"></i>
              了解技术栈
            </router-link>
            <router-link to="/structure" class="btn-secondary">
              <i class="bi bi-folder mr-2"></i>
              查看项目结构
            </router-link>
            <router-link to="/features" class="btn-secondary">
              <i class="bi bi-star mr-2"></i>
              探索功能特性
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Installation',
  data() {
    return {
      selectedManager: {
        name: 'npm',
        install: 'npm install',
        dev: 'npm run dev',
        build: 'npm run build',
        preview: 'npm run preview',
        description: 'Node.js默认包管理器，兼容性最好，适合新手使用。'
      },
      packageManagers: [
        {
          name: 'npm',
          install: 'npm install',
          dev: 'npm run dev',
          build: 'npm run build',
          preview: 'npm run preview',
          description: 'Node.js默认包管理器，兼容性最好，适合新手使用。'
        },
        {
          name: 'pnpm',
          install: 'pnpm install',
          dev: 'pnpm dev',
          build: 'pnpm build',
          preview: 'pnpm preview',
          description: '快速、节省磁盘空间的包管理器，通过符号链接共享依赖。'
        },
        {
          name: 'yarn',
          install: 'yarn install',
          dev: 'yarn dev',
          build: 'yarn build',
          preview: 'yarn preview',
          description: '由Facebook开发的包管理器，提供确定性安装和更好的性能。'
        }
      ]
    }
  }
}
</script> 