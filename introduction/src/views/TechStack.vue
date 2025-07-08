<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="glass-card p-8">
      <h1 class="page-title mb-8">🔧 技术栈详解</h1>
      
      <!-- 技术栈概览 -->
      <section class="mb-12">
        <h2 class="section-title text-center mb-8">🏗️ 架构概览</h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="glass-card p-6 text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <i class="bi bi-display text-white text-2xl"></i>
            </div>
            <h3 class="subsection-title">前端层</h3>
            <p class="text-gray-600 text-sm">Vue 3 + Nuxt 3 + TypeScript</p>
          </div>
          <div class="glass-card p-6 text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <i class="bi bi-palette text-white text-2xl"></i>
            </div>
            <h3 class="subsection-title">样式层</h3>
            <p class="text-gray-600 text-sm">TailwindCSS + NaiveUI</p>
          </div>
          <div class="glass-card p-6 text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <i class="bi bi-database text-white text-2xl"></i>
            </div>
            <h3 class="subsection-title">状态层</h3>
            <p class="text-gray-600 text-sm">Pinia + Composables</p>
          </div>
        </div>
      </section>

      <!-- 核心技术详解 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">⚡ 核心技术</h2>
        <div class="space-y-8">
          
          <!-- Vue 3 & Nuxt 3 -->
          <div class="glass-card p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mr-4">
                <i class="bi bi-triangle text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">Vue 3 + Nuxt 3</h3>
                <p class="text-gray-600">现代化前端框架</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🚀 Vue 3 特性</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>Composition API</strong> - 更好的逻辑复用和TypeScript支持</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>性能提升</strong> - 更小的包体积，更快的渲染</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>多根节点</strong> - Fragment 支持</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>Suspense</strong> - 异步组件处理</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">⚡ Nuxt 3 特性</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>服务端渲染</strong> - SEO友好，首屏加载快</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>自动导入</strong> - 无需手动import常用API</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>文件系统路由</strong> - 基于目录结构的路由</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>Nitro引擎</strong> - 零配置部署</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div class="mt-6">
              <h4 class="font-semibold text-gray-800 mb-3">📊 版本信息</h4>
              <div class="flex flex-wrap gap-3">
                <span class="badge badge-success">Vue ^3.3.8</span>
                <span class="badge badge-success">Nuxt ^3.8.0</span>
                <span class="badge badge-info">Composition API</span>
                <span class="badge badge-info">TypeScript支持</span>
              </div>
            </div>
          </div>

          <!-- TypeScript -->
          <div class="glass-card p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                <i class="bi bi-code-square text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">TypeScript</h3>
                <p class="text-gray-600">类型安全的JavaScript超集</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🛡️ 类型安全</h4>
                <ul class="space-y-2 text-gray-600 text-sm">
                  <li>• 编译时错误检查</li>
                  <li>• 自动类型推断</li>
                  <li>• 接口定义和验证</li>
                  <li>• 泛型支持</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🔧 开发体验</h4>
                <ul class="space-y-2 text-gray-600 text-sm">
                  <li>• 智能代码补全</li>
                  <li>• 重构工具支持</li>
                  <li>• 导航和查找引用</li>
                  <li>• 实时错误提示</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">📚 项目配置</h4>
                <ul class="space-y-2 text-gray-600 text-sm">
                  <li>• 严格模式启用</li>
                  <li>• 路径别名配置</li>
                  <li>• 自动类型生成</li>
                  <li>• ESLint集成</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- TailwindCSS & NaiveUI -->
          <div class="glass-card p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mr-4">
                <i class="bi bi-palette text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">样式解决方案</h3>
                <p class="text-gray-600">TailwindCSS + NaiveUI</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🎨 TailwindCSS</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>原子化CSS</strong> - utility-first的设计理念</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>响应式设计</strong> - 移动优先的设计体验</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>定制主题</strong> - 灵活的颜色和spacing配置</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>性能优化</strong> - PurgeCSS自动移除未使用样式</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🧩 NaiveUI</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>Vue 3 原生</strong> - 专为Vue 3设计的组件库</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>TypeScript</strong> - 完整的类型定义支持</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>主题定制</strong> - 灵活的主题配置系统</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span><strong>按需导入</strong> - 支持tree-shaking，减少包体积</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Pinia状态管理 -->
          <div class="glass-card p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mr-4">
                <i class="bi bi-database text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">Pinia 状态管理</h3>
                <p class="text-gray-600">Vue官方推荐的状态管理库</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🏪 Store设计</h4>
                <ul class="space-y-2 text-gray-600 text-sm">
                  <li>• 模块化Store管理</li>
                  <li>• Composition API风格</li>
                  <li>• 自动类型推断</li>
                  <li>• DevTools支持</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">⚡ 性能优化</h4>
                <ul class="space-y-2 text-gray-600 text-sm">
                  <li>• 按需响应式更新</li>
                  <li>• 轻量级实现</li>
                  <li>• 无mutations概念</li>
                  <li>• 服务端渲染友好</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🔧 项目应用</h4>
                <ul class="space-y-2 text-gray-600 text-sm">
                  <li>• 用户状态管理</li>
                  <li>• 购物车状态</li>
                  <li>• 地址信息管理</li>
                  <li>• 全局配置存储</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 开发工具链 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">🛠️ 开发工具链</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div class="glass-card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                <i class="bi bi-lightning text-white"></i>
              </div>
              <h3 class="font-bold text-gray-800">Vite</h3>
            </div>
            <p class="text-gray-600 text-sm mb-3">下一代前端构建工具</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• 极快的冷启动</li>
              <li>• 即时热更新</li>
              <li>• 原生ES模块</li>
              <li>• 优化的构建</li>
            </ul>
          </div>

          <div class="glass-card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <i class="bi bi-code-slash text-white"></i>
              </div>
              <h3 class="font-bold text-gray-800">ESLint</h3>
            </div>
            <p class="text-gray-600 text-sm mb-3">代码质量检查工具</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• 语法错误检查</li>
              <li>• 代码风格统一</li>
              <li>• 最佳实践提醒</li>
              <li>• 自动修复功能</li>
            </ul>
          </div>

          <div class="glass-card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <i class="bi bi-brush text-white"></i>
              </div>
              <h3 class="font-bold text-gray-800">Prettier</h3>
            </div>
            <p class="text-gray-600 text-sm mb-3">代码格式化工具</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• 统一代码格式</li>
              <li>• 支持多种语言</li>
              <li>• 编辑器集成</li>
              <li>• 保存时自动格式化</li>
            </ul>
          </div>

          <div class="glass-card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <i class="bi bi-git text-white"></i>
              </div>
              <h3 class="font-bold text-gray-800">Git</h3>
            </div>
            <p class="text-gray-600 text-sm mb-3">版本控制系统</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• 分支管理</li>
              <li>• 提交历史</li>
              <li>• 合并冲突处理</li>
              <li>• 团队协作</li>
            </ul>
          </div>

          <div class="glass-card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                <i class="bi bi-bug text-white"></i>
              </div>
              <h3 class="font-bold text-gray-800">Vue DevTools</h3>
            </div>
            <p class="text-gray-600 text-sm mb-3">Vue开发调试工具</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• 组件树查看</li>
              <li>• 状态管理调试</li>
              <li>• 事件监听</li>
              <li>• 性能分析</li>
            </ul>
          </div>

          <div class="glass-card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <i class="bi bi-file-earmark-code text-white"></i>
              </div>
              <h3 class="font-bold text-gray-800">VSCode</h3>
            </div>
            <p class="text-gray-600 text-sm mb-3">推荐开发编辑器</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• Volar插件</li>
              <li>• TypeScript支持</li>
              <li>• 自动补全</li>
              <li>• 调试功能</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 特殊依赖 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">🎯 特殊功能依赖</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-box-seam text-primary-500 mr-3"></i>
              3D渲染引擎
            </h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-800">Babylon.js</h4>
                <p class="text-gray-600 text-sm">强大的3D渲染引擎，用于产品3D展示</p>
                <div class="flex gap-2 mt-2">
                  <span class="badge badge-info">@babylonjs/core</span>
                  <span class="badge badge-info">@babylonjs/loaders</span>
                  <span class="badge badge-info">@babylonjs/materials</span>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Three.js</h4>
                <p class="text-gray-600 text-sm">轻量级3D库，用于简单的3D效果</p>
                <div class="flex gap-2 mt-2">
                  <span class="badge badge-info">three</span>
                  <span class="badge badge-info">@types/three</span>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-geo-alt text-primary-500 mr-3"></i>
              地理位置服务
            </h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-800">中国省市区数据</h4>
                <p class="text-gray-600 text-sm">完整的中国行政区划数据</p>
                <div class="flex gap-2 mt-2">
                  <span class="badge badge-success">china-division</span>
                  <span class="badge badge-success">province-city-china</span>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">功能特性</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• 三级联动选择</li>
                  <li>• 邮政编码查询</li>
                  <li>• 区域代码映射</li>
                  <li>• 数据实时更新</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技术选择理由 -->
      <section>
        <h2 class="section-title mb-8">💭 技术选择理由</h2>
        <div class="glass-card p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div>
              <h3 class="subsection-title">🎯 为什么选择这些技术？</h3>
              <div class="space-y-4 text-gray-600">
                <div>
                  <h4 class="font-semibold text-gray-800">Vue 3 + Nuxt 3</h4>
                  <p class="text-sm">Vue生态成熟，学习曲线平缓，SSR支持优秀，适合电商项目的SEO需求</p>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">TypeScript</h4>
                  <p class="text-sm">提供类型安全，减少运行时错误，提高代码质量和维护性</p>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">TailwindCSS</h4>
                  <p class="text-sm">原子化CSS，开发效率高，样式一致性好，维护成本低</p>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">Pinia</h4>
                  <p class="text-sm">Vue官方推荐，API简洁，TypeScript支持好，性能优秀</p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="subsection-title">📊 性能表现</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">首次内容绘制 (FCP)</span>
                  <span class="badge badge-success">优秀</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">最大内容绘制 (LCP)</span>
                  <span class="badge badge-success">优秀</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">首次输入延迟 (FID)</span>
                  <span class="badge badge-success">优秀</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">累积布局偏移 (CLS)</span>
                  <span class="badge badge-success">优秀</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">SEO评分</span>
                  <span class="badge badge-success">95+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechStack'
}
</script> 