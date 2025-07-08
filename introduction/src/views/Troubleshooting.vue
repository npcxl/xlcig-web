<template>
  <div class="p-6 max-w-5xl mx-auto">
    <div class="glass-card p-8">
      <h1 class="page-title mb-8">🔧 故障排除指南</h1>

      <!-- 快速定位 -->
      <section class="mb-12">
        <h2 class="section-title mb-6">🚨 常见问题快速定位</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(category, index) in problemCategories" :key="index" 
               class="glass-card p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
               @click="scrollToSection(category.id)">
            <div :class="category.iconClass" class="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <i :class="category.icon" class="text-white text-xl"></i>
            </div>
            <h3 class="font-bold text-gray-800 mb-2">{{ category.title }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ category.description }}</p>
            <div class="text-sm text-primary-500 font-medium">
              {{ category.count }} 个问题 →
            </div>
          </div>
        </div>
      </section>

      <!-- 安装相关问题 -->
      <section id="installation" class="mb-12">
        <h2 class="section-title mb-8">📥 安装相关问题</h2>
        <div class="space-y-6">
          
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-exclamation-triangle text-yellow-500 mr-3"></i>
              npm install 失败或速度慢
            </h3>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🔍 可能原因</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-dot text-red-500 mr-2 mt-2"></i>
                    <span>网络连接问题或源服务器缓慢</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-dot text-red-500 mr-2 mt-2"></i>
                    <span>npm缓存损坏或过期</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-dot text-red-500 mr-2 mt-2"></i>
                    <span>Node.js版本不兼容</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-dot text-red-500 mr-2 mt-2"></i>
                    <span>磁盘空间不足</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">✅ 解决方案</h4>
                <div class="space-y-3">
                  <div>
                    <h5 class="font-medium text-gray-700">1. 切换到国内镜像源</h5>
                    <div class="code-block text-sm mt-2">
npm config set registry https://registry.npmmirror.com
                    </div>
                  </div>
                  
                  <div>
                    <h5 class="font-medium text-gray-700">2. 清除npm缓存</h5>
                    <div class="code-block text-sm mt-2">
npm cache clean --force<br>
rm -rf node_modules<br>
npm install
                    </div>
                  </div>
                  
                  <div>
                    <h5 class="font-medium text-gray-700">3. 使用pnpm替代</h5>
                    <div class="code-block text-sm mt-2">
npm install -g pnpm<br>
pnpm install
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-x-circle text-red-500 mr-3"></i>
              Node.js版本不兼容
            </h3>
            
            <div class="alert alert-warning mb-4">
              <i class="bi bi-info-circle mr-2"></i>
              本项目需要 Node.js 18.0+ 版本，推荐使用 18.17.0 或更高版本。
            </div>
            
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">检查当前版本</h4>
                <div class="code-block">
node --version<br>
npm --version
                </div>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">升级Node.js</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-medium text-gray-700 mb-2">使用nvm (推荐)</h5>
                    <div class="code-block text-sm">
# 安装最新LTS版本<br>
nvm install --lts<br>
nvm use --lts<br><br>
# 或安装指定版本<br>
nvm install 18.17.0<br>
nvm use 18.17.0
                    </div>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-700 mb-2">直接下载安装</h5>
                    <div class="text-sm text-gray-600">
                      <p class="mb-2">从官网下载最新版本：</p>
                      <a href="https://nodejs.org" target="_blank" class="link link-external">
                        https://nodejs.org
                      </a>
                      <p class="mt-2 text-xs">选择LTS版本，适用于生产环境</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 开发环境问题 -->
      <section id="development" class="mb-12">
        <h2 class="section-title mb-8">💻 开发环境问题</h2>
        <div class="space-y-6">
          
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-server text-blue-500 mr-3"></i>
              开发服务器启动失败
            </h3>
            
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">🔴 端口被占用</h4>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <p class="text-gray-600 mb-2">错误信息：Port 8888 is already in use</p>
                    <div class="code-block text-sm">
# 查找占用端口的进程<br>
lsof -i :8888  # macOS/Linux<br>
netstat -ano | findstr :8888  # Windows
                    </div>
                  </div>
                  <div>
                    <p class="text-gray-600 mb-2">解决方案：</p>
                    <div class="code-block text-sm">
# 杀死占用进程 (谨慎操作)<br>
kill -9 PID<br><br>
# 或使用其他端口<br>
PORT=3000 npm run dev
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">🔴 权限问题</h4>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <p class="text-gray-600 mb-2">macOS/Linux权限不足：</p>
                    <div class="code-block text-sm">
# 修复权限<br>
sudo chown -R $(whoami) ~/.npm<br>
sudo chown -R $(whoami) node_modules
                    </div>
                  </div>
                  <div>
                    <p class="text-gray-600 mb-2">Windows权限问题：</p>
                    <div class="code-block text-sm">
# 以管理员身份运行终端<br>
# 或使用PowerShell<br>
npm run dev --force
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-code-slash text-purple-500 mr-3"></i>
              TypeScript类型错误
            </h3>
            
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">常见类型错误处理</h4>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 class="font-medium text-gray-700 mb-2">模块找不到类型</h5>
                    <div class="code-block text-sm mb-2">
Could not find a declaration file for module 'xxx'
                    </div>
                    <p class="text-sm text-gray-600 mb-2">解决方案：</p>
                    <div class="code-block text-sm">
# 安装类型定义<br>
npm install @types/模块名<br><br>
# 或创建声明文件<br>
echo "declare module '模块名'" > types/modules.d.ts
                    </div>
                  </div>
                  
                  <div>
                    <h5 class="font-medium text-gray-700 mb-2">Nuxt自动导入问题</h5>
                    <div class="code-block text-sm mb-2">
Cannot find name 'ref' or similar error
                    </div>
                    <p class="text-sm text-gray-600 mb-2">解决方案：</p>
                    <div class="code-block text-sm">
# 重新生成类型<br>
npm run postinstall<br><br>
# 清除.nuxt目录<br>
rm -rf .nuxt<br>
npm run dev
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">VSCode TypeScript问题</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                    <span>重启TypeScript服务：Ctrl+Shift+P → "TypeScript: Restart TS Server"</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                    <span>确保安装了Volar插件（禁用Vetur）</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                    <span>检查工作区TypeScript版本设置</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 构建和部署问题 -->
      <section id="build" class="mb-12">
        <h2 class="section-title mb-8">🏗️ 构建和部署问题</h2>
        <div class="space-y-6">
          
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-hammer text-orange-500 mr-3"></i>
              构建失败问题
            </h3>
            
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">内存不足错误</h4>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <p class="text-gray-600 mb-2">错误信息：JavaScript heap out of memory</p>
                    <div class="code-block text-sm">
FATAL ERROR: CALL_AND_RETRY_LAST<br>
Allocation failed - JavaScript heap out of memory
                    </div>
                  </div>
                  <div>
                    <p class="text-gray-600 mb-2">解决方案：</p>
                    <div class="code-block text-sm">
# 增加Node.js内存限制<br>
export NODE_OPTIONS="--max-old-space-size=4096"<br>
npm run build<br><br>
# 或在package.json中配置<br>
"build": "NODE_OPTIONS='--max-old-space-size=4096' nuxt build"
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">依赖版本冲突</h4>
                <div class="space-y-3">
                  <div>
                    <h5 class="font-medium text-gray-700">检查依赖冲突</h5>
                    <div class="code-block text-sm">
npm ls --depth=0<br>
npm audit
                    </div>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-700">解决冲突</h5>
                    <div class="code-block text-sm">
# 删除并重新安装<br>
rm -rf node_modules package-lock.json<br>
npm install<br><br>
# 或使用yarn的resolutions<br>
# 在package.json中添加resolutions字段
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-cloud-upload text-green-500 mr-3"></i>
              部署相关问题
            </h3>
            
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">静态资源路径问题</h4>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <p class="text-gray-600 mb-2">部署到子目录时资源404：</p>
                    <div class="code-block text-sm">
// nuxt.config.ts<br>
export default defineNuxtConfig({<br>
&nbsp;&nbsp;app: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;baseURL: '/your-app/'<br>
&nbsp;&nbsp;}<br>
})
                    </div>
                  </div>
                  <div>
                    <p class="text-gray-600 mb-2">CDN部署配置：</p>
                    <div class="code-block text-sm">
// nuxt.config.ts<br>
export default defineNuxtConfig({<br>
&nbsp;&nbsp;app: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;cdnURL: 'https://cdn.example.com'<br>
&nbsp;&nbsp;}<br>
})
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">环境变量配置</h4>
                <div class="alert alert-info mb-3">
                  <i class="bi bi-info-circle mr-2"></i>
                  确保生产环境的环境变量正确配置，特别是API地址和密钥。
                </div>
                <div class="code-block text-sm">
# 生产环境变量示例<br>
NUXT_PUBLIC_API_BASE=https://api.yourdomain.com<br>
NUXT_PUBLIC_WS_URL=wss://api.yourdomain.com/websocket<br>
NODE_ENV=production
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能问题 -->
      <section id="performance" class="mb-12">
        <h2 class="section-title mb-8">⚡ 性能问题诊断</h2>
        <div class="space-y-6">
          
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-speedometer2 text-red-500 mr-3"></i>
              页面加载缓慢
            </h3>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🔍 性能分析工具</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                    <span>Chrome DevTools Performance面板</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                    <span>Lighthouse性能评估</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                    <span>Vue DevTools性能监控</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                    <span>Network面板网络分析</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">⚡ 优化建议</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-green-500 mr-3 mt-1"></i>
                    <span>启用图片懒加载和压缩</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-green-500 mr-3 mt-1"></i>
                    <span>使用代码分割减少bundle大小</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-green-500 mr-3 mt-1"></i>
                    <span>配置适当的缓存策略</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-arrow-right text-green-500 mr-3 mt-1"></i>
                    <span>优化第三方库的使用</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-memory text-purple-500 mr-3"></i>
              内存泄漏问题
            </h3>
            
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">常见内存泄漏场景</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-medium text-gray-700 mb-2">事件监听器未清理</h5>
                    <div class="code-block text-sm">
// ❌ 错误示例<br>
onMounted(() => {<br>
&nbsp;&nbsp;window.addEventListener('scroll', handler)<br>
})<br><br>
// ✅ 正确示例<br>
onMounted(() => {<br>
&nbsp;&nbsp;window.addEventListener('scroll', handler)<br>
})<br>
onUnmounted(() => {<br>
&nbsp;&nbsp;window.removeEventListener('scroll', handler)<br>
})
                    </div>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-700 mb-2">定时器未清理</h5>
                    <div class="code-block text-sm">
// ❌ 错误示例<br>
setInterval(callback, 1000)<br><br>
// ✅ 正确示例<br>
const timer = setInterval(callback, 1000)<br>
onUnmounted(() => {<br>
&nbsp;&nbsp;clearInterval(timer)<br>
})
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">内存监控</h4>
                <div class="code-block text-sm">
# 启用内存监控<br>
node --inspect --max-old-space-size=4096 .output/server/index.mjs<br><br>
# Chrome中访问<br>
chrome://inspect
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 获取帮助 -->
      <section>
        <div class="glass-card p-8 text-center">
          <h2 class="section-title mb-6">🆘 获取更多帮助</h2>
          <p class="text-gray-600 mb-8">如果以上解决方案无法解决您的问题，可以通过以下方式获取帮助：</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="https://gitee.com/leheya/xlweb/issues" target="_blank" class="btn-secondary">
              <i class="bi bi-bug mr-2"></i>
              提交Issue
            </a>
            <a href="mailto:support@xlcig.cn" class="btn-secondary">
              <i class="bi bi-envelope mr-2"></i>
              邮件支持
            </a>
            <a href="https://nuxt.com/docs" target="_blank" class="btn-secondary">
              <i class="bi bi-book mr-2"></i>
              Nuxt文档
            </a>
            <a href="https://cn.vuejs.org" target="_blank" class="btn-secondary">
              <i class="bi bi-file-text mr-2"></i>
              Vue文档
            </a>
          </div>
          
          <div class="mt-8 p-6 bg-blue-50 rounded-lg">
            <h4 class="font-semibold text-blue-800 mb-3">💡 提交问题时请包含以下信息</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <ul class="space-y-1">
                <li>• 操作系统版本</li>
                <li>• Node.js和npm版本</li>
                <li>• 错误的完整日志</li>
                <li>• 复现步骤</li>
              </ul>
              <ul class="space-y-1">
                <li>• 浏览器版本</li>
                <li>• 项目依赖版本</li>
                <li>• 修改过的配置文件</li>
                <li>• 预期行为描述</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Troubleshooting',
  data() {
    return {
      problemCategories: [
        {
          id: 'installation',
          icon: 'bi bi-download',
          iconClass: 'bg-gradient-to-r from-blue-500 to-blue-600',
          title: '安装问题',
          description: 'npm install、依赖安装相关问题',
          count: 3
        },
        {
          id: 'development',
          icon: 'bi bi-code-slash',
          iconClass: 'bg-gradient-to-r from-green-500 to-green-600',
          title: '开发环境',
          description: '开发服务器、TypeScript、热重载问题',
          count: 4
        },
        {
          id: 'build',
          icon: 'bi bi-gear',
          iconClass: 'bg-gradient-to-r from-orange-500 to-orange-600',
          title: '构建部署',
          description: '构建失败、部署配置相关问题',
          count: 3
        },
        {
          id: 'performance',
          icon: 'bi bi-speedometer2',
          iconClass: 'bg-gradient-to-r from-purple-500 to-purple-600',
          title: '性能问题',
          description: '页面加载慢、内存泄漏等性能问题',
          count: 2
        }
      ]
    }
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
}
</script> 