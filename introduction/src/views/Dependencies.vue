<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="glass-card p-8">
      <h1 class="page-title mb-8">📦 依赖管理详解</h1>

      <!-- 依赖概览 -->
      <section class="mb-12">
        <h2 class="section-title text-center mb-8">📊 依赖概览</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="glass-card p-6 text-center">
            <div class="text-3xl font-bold text-primary-500 mb-2">{{ coreCount }}</div>
            <div class="text-gray-600">核心依赖</div>
          </div>
          <div class="glass-card p-6 text-center">
            <div class="text-3xl font-bold text-blue-500 mb-2">{{ devCount }}</div>
            <div class="text-gray-600">开发依赖</div>
          </div>
          <div class="glass-card p-6 text-center">
            <div class="text-3xl font-bold text-green-500 mb-2">{{ totalCount }}</div>
            <div class="text-gray-600">总计</div>
          </div>
        </div>
      </section>

      <!-- 核心框架依赖 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">🏗️ 核心框架依赖</h2>
        <div class="space-y-6">
          
          <div class="glass-card p-6">
            <h3 class="subsection-title mb-4">前端核心框架</h3>
            <div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th>依赖名称</th>
                    <th>版本</th>
                    <th>作用描述</th>
                    <th>重要性</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-mono text-blue-600">nuxt</td>
                    <td><span class="badge badge-success">^3.8.0</span></td>
                    <td>Vue.js全栈框架，提供SSR/SPA能力</td>
                    <td><span class="badge badge-warning">核心</span></td>
                  </tr>
                  <tr>
                    <td class="font-mono text-blue-600">@nuxt/devtools</td>
                    <td><span class="badge badge-info">latest</span></td>
                    <td>Nuxt开发者工具，调试和性能分析</td>
                    <td><span class="badge badge-info">开发</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="glass-card p-6">
            <h3 class="subsection-title mb-4">状态管理 & 样式框架</h3>
            <div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th>依赖名称</th>
                    <th>版本</th>
                    <th>作用描述</th>
                    <th>重要性</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-mono text-purple-600">@pinia/nuxt</td>
                    <td><span class="badge badge-success">^0.11.1</span></td>
                    <td>Pinia状态管理的Nuxt集成</td>
                    <td><span class="badge badge-warning">核心</span></td>
                  </tr>
                  <tr>
                    <td class="font-mono text-purple-600">pinia</td>
                    <td><span class="badge badge-success">^3.0.3</span></td>
                    <td>Vue官方推荐的状态管理库</td>
                    <td><span class="badge badge-warning">核心</span></td>
                  </tr>
                  <tr>
                    <td class="font-mono text-cyan-600">@nuxtjs/tailwindcss</td>
                    <td><span class="badge badge-success">^6.8.4</span></td>
                    <td>TailwindCSS的Nuxt集成模块</td>
                    <td><span class="badge badge-warning">核心</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- UI组件库 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">🎨 UI组件与样式</h2>
        <div class="glass-card p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="subsection-title">组件库</h3>
              <div class="space-y-4">
                <div class="border-l-4 border-blue-400 pl-4">
                  <h4 class="font-semibold text-gray-800">NaiveUI</h4>
                  <p class="text-sm text-gray-600 mb-2">Vue 3专用的企业级UI组件库</p>
                  <div class="flex gap-2">
                    <span class="badge badge-primary">naive-ui ^2.34.4</span>
                    <span class="badge badge-primary">vueuc ^0.4.64</span>
                  </div>
                  <ul class="text-xs text-gray-500 mt-2 space-y-1">
                    <li>• 完整的TypeScript支持</li>
                    <li>• 主题定制能力</li>
                    <li>• 按需导入优化</li>
                    <li>• 丰富的组件生态</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="subsection-title">图标库</h3>
              <div class="space-y-4">
                <div class="border-l-4 border-green-400 pl-4">
                  <h4 class="font-semibold text-gray-800">Bootstrap Icons</h4>
                  <p class="text-sm text-gray-600 mb-2">高质量的开源图标库</p>
                  <div class="flex gap-2">
                    <span class="badge badge-success">bootstrap-icons ^1.11.2</span>
                  </div>
                  <ul class="text-xs text-gray-500 mt-2 space-y-1">
                    <li>• 1800+ 精美图标</li>
                    <li>• SVG矢量格式</li>
                    <li>• 一致的设计风格</li>
                    <li>• CDN引入方式</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3D渲染与特效 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">🎮 3D渲染与特效</h2>
        <div class="glass-card p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="subsection-title">Babylon.js生态</h3>
              <div class="space-y-3">
                <div>
                  <h4 class="font-semibold text-gray-800">@babylonjs/core</h4>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="badge badge-info">^8.15.1</span>
                    <span class="text-sm text-gray-600">核心引擎</span>
                  </div>
                  <p class="text-sm text-gray-600">强大的WebGL 3D渲染引擎</p>
                </div>
                
                <div>
                  <h4 class="font-semibold text-gray-800">@babylonjs/loaders</h4>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="badge badge-info">^8.15.1</span>
                    <span class="text-sm text-gray-600">模型加载器</span>
                  </div>
                  <p class="text-sm text-gray-600">支持gltf, obj, stl等格式</p>
                </div>
                
                <div>
                  <h4 class="font-semibold text-gray-800">@babylonjs/materials</h4>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="badge badge-info">^8.15.1</span>
                    <span class="text-sm text-gray-600">材质库</span>
                  </div>
                  <p class="text-sm text-gray-600">扩展材质和着色器集合</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="subsection-title">Three.js补充</h3>
              <div class="space-y-3">
                <div>
                  <h4 class="font-semibold text-gray-800">three</h4>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="badge badge-info">^0.178.0</span>
                    <span class="text-sm text-gray-600">轻量3D库</span>
                  </div>
                  <p class="text-sm text-gray-600">用于简单3D效果和动画</p>
                </div>
                
                <div>
                  <h4 class="font-semibold text-gray-800">@types/three</h4>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="badge badge-info">^0.178.0</span>
                    <span class="text-sm text-gray-600">类型定义</span>
                  </div>
                  <p class="text-sm text-gray-600">Three.js的TypeScript类型</p>
                </div>
              </div>
              
              <div class="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p class="text-sm text-yellow-800">
                  <i class="bi bi-lightbulb mr-2"></i>
                  <strong>使用场景：</strong>产品3D展示、交互式配置器、虚拟展厅等
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 数据与工具库 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">📊 数据与工具库</h2>
        <div class="space-y-6">
          
          <div class="glass-card p-6">
            <h3 class="subsection-title mb-4">HTTP客户端</h3>
            <div class="border-l-4 border-red-400 pl-4">
              <h4 class="font-semibold text-gray-800">Axios</h4>
              <div class="flex items-center gap-2 mb-2">
                <span class="badge badge-success">^1.6.2</span>
                <span class="text-sm text-gray-600">Promise based HTTP client</span>
              </div>
              <p class="text-sm text-gray-600 mb-3">基于Promise的HTTP客户端，支持请求/响应拦截</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 class="font-medium text-gray-700 mb-2">核心特性</h5>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li>• 请求和响应拦截器</li>
                    <li>• 自动请求体序列化</li>
                    <li>• 响应数据自动转换</li>
                    <li>• 请求超时处理</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-medium text-gray-700 mb-2">项目应用</h5>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li>• API接口统一封装</li>
                    <li>• 错误处理中间件</li>
                    <li>• 认证token管理</li>
                    <li>• 请求重试机制</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card p-6">
            <h3 class="subsection-title mb-4">地理位置数据</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="border-l-4 border-blue-400 pl-4">
                <h4 class="font-semibold text-gray-800">china-division</h4>
                <div class="flex items-center gap-2 mb-2">
                  <span class="badge badge-primary">^2.7.0</span>
                  <span class="text-sm text-gray-600">中国行政区划</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">完整的中国省市区县数据</p>
                <ul class="text-xs text-gray-500 space-y-1">
                  <li>• 四级行政区划数据</li>
                  <li>• 标准区划代码</li>
                  <li>• 定期数据更新</li>
                  <li>• 多种数据格式</li>
                </ul>
              </div>
              
              <div class="border-l-4 border-green-400 pl-4">
                <h4 class="font-semibold text-gray-800">province-city-china</h4>
                <div class="flex items-center gap-2 mb-2">
                  <span class="badge badge-success">^8.5.8</span>
                  <span class="text-sm text-gray-600">省市数据库</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">轻量级省市区数据方案</p>
                <ul class="text-xs text-gray-500 space-y-1">
                  <li>• 精简数据结构</li>
                  <li>• 快速查询性能</li>
                  <li>• 级联选择支持</li>
                  <li>• 邮政编码映射</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 依赖分析 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">📈 依赖分析</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div class="glass-card p-6">
            <h3 class="subsection-title">依赖大小分析</h3>
            <div class="space-y-4">
              <div v-for="dep in dependencySizes" :key="dep.name" class="flex items-center justify-between">
                <div class="flex items-center">
                  <div :class="dep.color" class="w-3 h-3 rounded-full mr-3"></div>
                  <span class="text-sm font-medium">{{ dep.name }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div :class="dep.color" class="h-2 rounded-full" :style="`width: ${dep.percentage}%`"></div>
                  </div>
                  <span class="text-sm text-gray-600 w-16 text-right">{{ dep.size }}</span>
                </div>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">优化建议</h4>
              <ul class="text-sm text-blue-700 space-y-1">
                <li>• 启用tree-shaking减少bundle大小</li>
                <li>• 按需导入UI组件库</li>
                <li>• 考虑代码分割优化加载</li>
                <li>• 使用CDN加载大型库</li>
              </ul>
            </div>
          </div>

          <div class="glass-card p-6">
            <h3 class="subsection-title">安全性检查</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-700">漏洞扫描</span>
                <span class="badge badge-success">无已知漏洞</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700">许可证检查</span>
                <span class="badge badge-success">MIT/Apache</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700">依赖更新</span>
                <span class="badge badge-warning">3个可更新</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700">弃用检查</span>
                <span class="badge badge-success">无弃用包</span>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-2">安全命令</h4>
              <div class="code-block text-sm">
# 安全审计<br>
npm audit<br><br>
# 修复漏洞<br>
npm audit fix<br><br>
# 检查过期依赖<br>
npm outdated
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 依赖管理最佳实践 -->
      <section>
        <div class="glass-card p-8">
          <h2 class="section-title mb-6">🎯 依赖管理最佳实践</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="subsection-title">版本管理策略</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-800">语义化版本控制</h4>
                  <ul class="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• <code class="code-inline">^</code> - 兼容版本更新</li>
                    <li>• <code class="code-inline">~</code> - 补丁版本更新</li>
                    <li>• 确切版本 - 锁定重要依赖</li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="font-semibold text-gray-800">依赖锁定</h4>
                  <ul class="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• 使用package-lock.json</li>
                    <li>• 团队共享相同版本</li>
                    <li>• CI/CD环境一致性</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="subsection-title">性能优化</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-800">包体积优化</h4>
                  <ul class="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• 按需导入组件和功能</li>
                    <li>• 移除未使用的依赖</li>
                    <li>• 使用轻量级替代方案</li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="font-semibold text-gray-800">构建优化</h4>
                  <ul class="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• 启用Tree Shaking</li>
                    <li>• 代码分割和懒加载</li>
                    <li>• CDN加速大型库</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 p-6 bg-gray-50 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-3">常用依赖管理命令</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 class="font-medium text-gray-700 mb-2">安装与更新</h5>
                <div class="code-block text-sm">
npm install              # 安装所有依赖<br>
npm install package      # 安装新包<br>
npm update              # 更新依赖<br>
npm ci                  # CI环境安装
                </div>
              </div>
              <div>
                <h5 class="font-medium text-gray-700 mb-2">分析与清理</h5>
                <div class="code-block text-sm">
npm ls                  # 查看依赖树<br>
npm outdated           # 检查过期包<br>
npm prune              # 清理未使用包<br>
npm audit              # 安全审计
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
  name: 'Dependencies',
  data() {
    return {
      coreCount: 15,
      devCount: 2,
      totalCount: 17,
      dependencySizes: [
        { name: 'nuxt', size: '8.2MB', percentage: 90, color: 'bg-blue-500' },
        { name: '@babylonjs/core', size: '2.1MB', percentage: 45, color: 'bg-purple-500' },
        { name: 'naive-ui', size: '1.8MB', percentage: 38, color: 'bg-green-500' },
        { name: 'axios', size: '650KB', percentage: 15, color: 'bg-red-500' },
        { name: 'three', size: '580KB', percentage: 12, color: 'bg-yellow-500' },
        { name: 'pinia', size: '120KB', percentage: 5, color: 'bg-cyan-500' }
      ]
    }
  }
}
</script> 