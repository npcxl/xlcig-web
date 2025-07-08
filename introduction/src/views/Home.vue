<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- 英雄区域 -->
    <section class="mb-12">
      <div class="glass-card p-8 text-center animate-fade-in">
        <div class="mb-8">
          <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-cyan-400 rounded-2xl flex items-center justify-center animate-float">
            <i class="bi bi-pc-display text-white text-4xl"></i>
          </div>
          <h1 class="page-title mb-4">xlCig 电商平台</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            基于 <strong>Nuxt 3</strong> 构建的现代化PC硬件电商平台，采用企业级架构设计，提供完整的电商解决方案
          </p>
        </div>
        
        <div class="flex flex-wrap justify-center gap-4">
          <span class="badge badge-primary">Vue 3</span>
          <span class="badge badge-primary">Nuxt 3</span>
          <span class="badge badge-primary">TypeScript</span>
          <span class="badge badge-primary">TailwindCSS</span>
          <span class="badge badge-primary">Pinia</span>
          <span class="badge badge-primary">NaiveUI</span>
        </div>
      </div>
    </section>

    <!-- 核心特性 -->
    <section class="mb-12">
      <h2 class="section-title text-center mb-8">🚀 核心特性</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(feature, index) in features" :key="index" 
             class="glass-card p-6 animate-slide-up"
             :class="`delay-${(index + 1) * 100}`">
          <div :class="feature.iconClass" class="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <i :class="feature.icon" class="text-white text-xl"></i>
          </div>
          <h3 class="subsection-title">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- 技术亮点 -->
    <section class="mb-12">
      <div class="glass-card p-8">
        <h2 class="section-title text-center mb-8">💡 技术亮点</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 class="subsection-title">🏗️ 架构设计</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start">
                <i class="bi bi-check-circle-fill text-green-500 mt-1 mr-3"></i>
                <span><strong>SSR/SSG</strong> - 服务端渲染，SEO友好</span>
              </li>
              <li class="flex items-start">
                <i class="bi bi-check-circle-fill text-green-500 mt-1 mr-3"></i>
                <span><strong>模块化设计</strong> - 组件化开发，易于维护</span>
              </li>
              <li class="flex items-start">
                <i class="bi bi-check-circle-fill text-green-500 mt-1 mr-3"></i>
                <span><strong>响应式布局</strong> - 移动端适配完善</span>
              </li>
              <li class="flex items-start">
                <i class="bi bi-check-circle-fill text-green-500 mt-1 mr-3"></i>
                <span><strong>状态管理</strong> - Pinia状态管理方案</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="subsection-title">⚡ 性能优化</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start">
                <i class="bi bi-check-circle-fill text-green-500 mt-1 mr-3"></i>
                <span><strong>代码分割</strong> - 按需加载，首屏性能优化</span>
              </li>
              <li class="flex items-start">
                <i class="bi bi-check-circle-fill text-green-500 mt-1 mr-3"></i>
                <span><strong>图片优化</strong> - 自动压缩和格式转换</span>
              </li>
              <li class="flex items-start">
                <i class="bi bi-check-circle-fill text-green-500 mt-1 mr-3"></i>
                <span><strong>缓存策略</strong> - 多层缓存机制</span>
              </li>
              <li class="flex items-start">
                <i class="bi bi-check-circle-fill text-green-500 mt-1 mr-3"></i>
                <span><strong>PWA支持</strong> - 渐进式Web应用</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目信息卡片 -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div class="glass-card p-6 text-center">
        <div class="text-3xl font-bold text-primary-500 mb-2">v1.0.0</div>
        <div class="text-gray-600">当前版本</div>
      </div>
      <div class="glass-card p-6 text-center">
        <div class="text-3xl font-bold text-primary-500 mb-2">15+</div>
        <div class="text-gray-600">核心依赖</div>
      </div>
      <div class="glass-card p-6 text-center">
        <div class="text-3xl font-bold text-primary-500 mb-2">30+</div>
        <div class="text-gray-600">组件数量</div>
      </div>
      <div class="glass-card p-6 text-center">
        <div class="text-3xl font-bold text-primary-500 mb-2">99%</div>
        <div class="text-gray-600">类型覆盖</div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="mb-12">
      <div class="glass-card p-8">
        <h2 class="section-title mb-6">🚀 快速开始</h2>
        <div class="space-y-4">
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">1. 克隆项目</h4>
            <div class="code-block">
              git clone https://gitee.com/leheya/xlweb.git<br>
              cd xlweb
            </div>
          </div>
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">2. 安装依赖</h4>
            <div class="code-block">
              npm install
            </div>
          </div>
          <div>
            <h4 class="font-semibold text-gray-800 mb-2">3. 启动开发服务器</h4>
            <div class="code-block">
              npm run dev
            </div>
          </div>
        </div>
        <div class="mt-6">
          <router-link to="/installation" class="btn-primary">
            <i class="bi bi-download mr-2"></i>
            查看详细安装指南
          </router-link>
        </div>
      </div>
    </section>

    <!-- 项目结构预览 -->
    <section class="mb-12">
      <div class="glass-card p-8">
        <h2 class="section-title mb-6">📁 项目结构</h2>
        <div class="code-block text-sm">
xlweb/<br>
├── 📁 assets/          # 静态资源<br>
├── 📁 components/      # Vue组件<br>
├── 📁 composables/     # 组合式函数<br>
├── 📁 layouts/         # 布局组件<br>
├── 📁 middleware/      # 中间件<br>
├── 📁 pages/           # 页面组件<br>
├── 📁 stores/          # Pinia状态管理<br>
├── 📁 utils/           # 工具函数<br>
├── 📄 nuxt.config.ts   # Nuxt配置<br>
└── 📄 package.json     # 项目配置
        </div>
        <div class="mt-6">
          <router-link to="/structure" class="btn-secondary">
            <i class="bi bi-folder mr-2"></i>
            查看详细结构
          </router-link>
        </div>
      </div>
    </section>

    <!-- 联系信息 -->
    <section>
      <div class="glass-card p-8 text-center">
        <h2 class="section-title mb-6">📞 联系我们</h2>
        <p class="text-gray-600 mb-6">有问题？欢迎联系我们或查看文档</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="https://gitee.com/leheya/xlweb" target="_blank" class="btn-secondary">
            <i class="bi bi-github mr-2"></i>
            Gitee 仓库
          </a>
          <a href="mailto:support@xlcig.cn" class="btn-secondary">
            <i class="bi bi-envelope mr-2"></i>
            邮件支持
          </a>
          <router-link to="/troubleshooting" class="btn-secondary">
            <i class="bi bi-question-circle mr-2"></i>
            常见问题
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      features: [
        {
          icon: 'bi bi-rocket-takeoff',
          iconClass: 'bg-gradient-to-r from-blue-500 to-blue-600',
          title: '高性能架构',
          description: 'Nuxt 3 + Vue 3 组合式API，现代化前端架构，提供卓越的用户体验'
        },
        {
          icon: 'bi bi-palette',
          iconClass: 'bg-gradient-to-r from-purple-500 to-purple-600',
          title: '精美UI设计',
          description: 'TailwindCSS + NaiveUI，玻璃拟态设计风格，响应式布局适配所有设备'
        },
        {
          icon: 'bi bi-shield-check',
          iconClass: 'bg-gradient-to-r from-green-500 to-green-600',
          title: 'TypeScript',
          description: '完整的类型安全支持，提高代码质量和开发效率，降低运行时错误'
        },
        {
          icon: 'bi bi-lightning-charge',
          iconClass: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
          title: '开发体验',
          description: '热重载、自动导入、代码分割等现代化开发工具，提升开发效率'
        },
        {
          icon: 'bi bi-globe',
          iconClass: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
          title: 'SEO优化',
          description: '服务端渲染(SSR)支持，自动sitemap生成，搜索引擎优化完善'
        },
        {
          icon: 'bi bi-gear',
          iconClass: 'bg-gradient-to-r from-red-500 to-red-600',
          title: '易于维护',
          description: '模块化架构设计，清晰的项目结构，完善的文档和类型定义'
        }
      ]
    }
  }
}
</script> 