<template>
  <div class="p-6 max-w-5xl mx-auto">
    <div class="glass-card p-8">
      <h1 class="page-title mb-8">📁 项目结构详解</h1>

      <!-- 总体结构 -->
      <section class="mb-12">
        <h2 class="section-title mb-6">🏗️ 总体架构</h2>
        <div class="glass-card p-6 mb-6">
          <div class="code-block font-mono text-sm leading-relaxed">
xlweb/<br>
├── 📁 assets/                    # 静态资源文件<br>
│   ├── css/                      # 全局样式文件<br>
│   └── images/                   # 图片资源<br>
├── 📁 components/                # Vue组件<br>
│   ├── AppHeader.vue             # 应用头部组件<br>
│   ├── AppLogo.vue               # Logo组件<br>
│   ├── LoadingScreen.vue         # 加载屏幕<br>
│   └── location/                 # 地理位置相关组件<br>
├── 📁 composables/               # 组合式函数<br>
│   ├── useAppLoader.ts           # 应用加载逻辑<br>
│   ├── useLocation.ts            # 位置服务<br>
│   └── useMessage.ts             # 消息处理<br>
├── 📁 layouts/                   # 布局组件<br>
│   └── default.vue               # 默认布局<br>
├── 📁 middleware/                # 中间件<br>
├── 📁 pages/                     # 页面组件（路由）<br>
│   ├── index.vue                 # 首页<br>
│   ├── auth/                     # 认证相关页面<br>
│   ├── products/                 # 产品相关页面<br>
│   └── ...                       # 其他页面<br>
├── 📁 public/                    # 公共静态文件<br>
├── 📁 stores/                    # Pinia状态管理<br>
│   ├── address.ts                # 地址管理<br>
│   └── user.ts                   # 用户状态<br>
├── 📁 types/                     # TypeScript类型定义<br>
├── 📁 utils/                     # 工具函数<br>
│   └── api/                      # API接口封装<br>
├── 📄 nuxt.config.ts             # Nuxt配置文件<br>
├── 📄 package.json               # 项目依赖配置<br>
└── 📄 tailwind.config.js         # Tailwind配置
          </div>
        </div>
        
        <div class="alert alert-info">
          <i class="bi bi-info-circle mr-2"></i>
          这是一个典型的Nuxt 3项目结构，遵循了<strong>约定优于配置</strong>的原则，每个目录都有特定的作用和约定。
        </div>
      </section>

      <!-- 核心目录详解 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">📂 核心目录详解</h2>
        
        <div class="space-y-8">
          <!-- assets目录 -->
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-image text-primary-500 mr-3"></i>
              assets/ - 静态资源目录
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">目录结构</h4>
                <div class="code-block text-sm">
assets/<br>
├── css/<br>
│   └── main.css                 # 主样式文件<br>
└── images/<br>
    ├── logo.png                 # 品牌Logo<br>
    ├── 1.png, 2.png, ...       # 产品图片<br>
    └── logo.svg                 # 矢量Logo
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">主要功能</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>存储需要Webpack处理的资源</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>支持SCSS、Less等预处理器</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>自动压缩和优化</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>支持模块导入</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- components目录 -->
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-puzzle text-primary-500 mr-3"></i>
              components/ - Vue组件目录
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">组件分类</h4>
                <div class="space-y-3">
                  <div>
                    <h5 class="font-medium text-gray-700">🏢 布局组件</h5>
                    <ul class="text-sm text-gray-600 ml-4">
                      <li>• AppHeader.vue - 应用头部</li>
                      <li>• AppLogo.vue - 品牌Logo</li>
                      <li>• LoadingScreen.vue - 加载页面</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-700">🎨 业务组件</h5>
                    <ul class="text-sm text-gray-600 ml-4">
                      <li>• ReviewForm.vue - 评论表单</li>
                      <li>• SteamCarousel.vue - 轮播组件</li>
                      <li>• LatestReviews.vue - 最新评论</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">组件特性</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>自动导入，无需手动注册</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>支持嵌套目录组织</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>TypeScript类型推断</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>热重载支持</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- composables目录 -->
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-gear text-primary-500 mr-3"></i>
              composables/ - 组合式函数目录
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">核心函数</h4>
                <div class="space-y-3">
                  <div>
                    <h5 class="font-medium text-gray-700">useAppLoader.ts</h5>
                    <p class="text-sm text-gray-600">应用初始化和加载状态管理</p>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-700">useLocation.ts</h5>
                    <p class="text-sm text-gray-600">地理位置服务和地址管理</p>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-700">useMessage.ts</h5>
                    <p class="text-sm text-gray-600">消息提示和通知处理</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">设计理念</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>逻辑复用和封装</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>响应式状态管理</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>TypeScript类型支持</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>自动导入机制</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- pages目录 -->
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-window text-primary-500 mr-3"></i>
              pages/ - 页面路由目录
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">路由结构</h4>
                <div class="code-block text-sm">
pages/<br>
├── index.vue                    # / (首页)<br>
├── auth/<br>
│   ├── login.vue               # /auth/login<br>
│   └── register.vue            # /auth/register<br>
├── products/<br>
│   ├── index.vue               # /products<br>
│   └── [id].vue                # /products/:id<br>
├── profile.vue                 # /profile<br>
├── orders.vue                  # /orders<br>
└── checkout.vue                # /checkout
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">路由特性</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>文件系统路由，零配置</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>动态路由支持 [id].vue</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>嵌套路由和布局</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>中间件保护</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- stores目录 -->
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-database text-primary-500 mr-3"></i>
              stores/ - 状态管理目录
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">Store模块</h4>
                <div class="space-y-3">
                  <div>
                    <h5 class="font-medium text-gray-700">user.ts</h5>
                    <p class="text-sm text-gray-600">用户信息、认证状态、权限管理</p>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-700">address.ts</h5>
                    <p class="text-sm text-gray-600">收货地址管理、地理位置服务</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">Pinia特性</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>组合式API风格</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>TypeScript完全支持</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>DevTools调试</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>服务端渲染支持</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- utils目录 -->
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-tools text-primary-500 mr-3"></i>
              utils/ - 工具函数目录
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">API模块化</h4>
                <div class="code-block text-sm">
utils/api/<br>
├── index.ts                     # API统一导出<br>
├── auth.ts                      # 认证接口<br>
├── products.ts                  # 产品接口<br>
├── orders.ts                    # 订单接口<br>
├── cart.ts                      # 购物车接口<br>
├── categories.ts                # 分类接口<br>
├── merchants.ts                 # 商家接口<br>
├── reviews.ts                   # 评论接口<br>
├── location.ts                  # 位置接口<br>
├── chat.ts                      # 聊天接口<br>
├── upload.ts                    # 上传接口<br>
├── configs.ts                   # 配置接口<br>
└── system.ts                    # 系统接口
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">API设计特点</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>模块化API组织</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>统一错误处理</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>请求/响应拦截器</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>TypeScript类型定义</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置文件详解 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">⚙️ 配置文件详解</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- nuxt.config.ts -->
          <div class="glass-card p-6">
            <h3 class="subsection-title">📄 nuxt.config.ts</h3>
            <p class="text-gray-600 mb-4">Nuxt应用的核心配置文件</p>
            <div class="space-y-3">
              <div>
                <h4 class="font-semibold text-gray-800 text-sm">主要配置项</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• 开发服务器配置 (端口8888)</li>
                  <li>• SSR/SPA模式设置</li>
                  <li>• 模块和插件配置</li>
                  <li>• 环境变量管理</li>
                  <li>• 构建优化设置</li>
                  <li>• SEO和Meta标签</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- package.json -->
          <div class="glass-card p-6">
            <h3 class="subsection-title">📦 package.json</h3>
            <p class="text-gray-600 mb-4">项目依赖和脚本配置</p>
            <div class="space-y-3">
              <div>
                <h4 class="font-semibold text-gray-800 text-sm">核心脚本</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• <code class="code-inline">dev</code> - 开发模式</li>
                  <li>• <code class="code-inline">build</code> - 生产构建</li>
                  <li>• <code class="code-inline">preview</code> - 预览构建</li>
                  <li>• <code class="code-inline">postinstall</code> - Nuxt准备</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- tailwind.config.js -->
          <div class="glass-card p-6">
            <h3 class="subsection-title">🎨 tailwind.config.js</h3>
            <p class="text-gray-600 mb-4">TailwindCSS样式配置</p>
            <div class="space-y-3">
              <div>
                <h4 class="font-semibold text-gray-800 text-sm">配置特点</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• 扫描路径配置</li>
                  <li>• 自定义字体设置</li>
                  <li>• 主题色彩扩展</li>
                  <li>• 响应式断点</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- types目录 -->
          <div class="glass-card p-6">
            <h3 class="subsection-title">🔷 types/</h3>
            <p class="text-gray-600 mb-4">TypeScript类型定义</p>
            <div class="space-y-3">
              <div>
                <h4 class="font-semibold text-gray-800 text-sm">类型文件</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• <code class="code-inline">api.ts</code> - API接口类型</li>
                  <li>• 自动生成的Nuxt类型</li>
                  <li>• 全局类型声明</li>
                  <li>• 组件Props类型</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 开发规范 -->
      <section>
        <div class="glass-card p-8">
          <h2 class="section-title mb-6">📋 开发规范</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="subsection-title">📝 命名规范</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                  <span><strong>组件:</strong> PascalCase (AppHeader.vue)</span>
                </li>
                <li class="flex items-start">
                  <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                  <span><strong>页面:</strong> kebab-case (user-profile.vue)</span>
                </li>
                <li class="flex items-start">
                  <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                  <span><strong>Composables:</strong> useXxx格式</span>
                </li>
                <li class="flex items-start">
                  <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                  <span><strong>Store:</strong> 小写单数形式</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 class="subsection-title">🏗️ 组织原则</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                  <span>按功能模块组织目录</span>
                </li>
                <li class="flex items-start">
                  <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                  <span>共享组件放在components根目录</span>
                </li>
                <li class="flex items-start">
                  <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                  <span>业务逻辑封装到composables</span>
                </li>
                <li class="flex items-start">
                  <i class="bi bi-arrow-right text-primary-500 mr-3 mt-1"></i>
                  <span>API按业务模块分离</span>
                </li>
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
  name: 'ProjectStructure'
}
</script> 