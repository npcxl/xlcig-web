<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="glass-card p-8">
      <h1 class="page-title mb-8">⭐ 功能特性详解</h1>

      <!-- 功能概览 -->
      <section class="mb-12">
        <h2 class="section-title text-center mb-8">🚀 核心功能模块</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(module, index) in coreModules" :key="index" 
               class="glass-card p-6 text-center animate-slide-up"
               :class="`delay-${(index + 1) * 100}`">
            <div :class="module.iconClass" class="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center">
              <i :class="module.icon" class="text-white text-2xl"></i>
            </div>
            <h3 class="font-bold text-gray-800 mb-2">{{ module.title }}</h3>
            <p class="text-sm text-gray-600">{{ module.description }}</p>
          </div>
        </div>
      </section>

      <!-- 电商核心功能 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">🛒 电商核心功能</h2>
        <div class="space-y-8">
          
          <!-- 产品管理 -->
          <div class="glass-card p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                <i class="bi bi-box-seam text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">产品管理系统</h3>
                <p class="text-gray-600">PC硬件产品的全生命周期管理</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">📦 产品展示</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>3D产品模型展示</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>360度产品预览</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>详细规格参数</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>多媒体产品介绍</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🔍 智能搜索</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>多维度筛选条件</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>智能推荐算法</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>价格区间筛选</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>品牌分类浏览</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">💰 价格管理</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>实时价格监控</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>促销活动支持</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>会员专享价格</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>批量采购优惠</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 购物车系统 -->
          <div class="glass-card p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                <i class="bi bi-cart3 text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">智能购物车</h3>
                <p class="text-gray-600">便捷的购物体验和兼容性检查</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">🛒 购物功能</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>一键加入购物车</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>批量商品管理</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>收藏夹同步</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>购物清单分享</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">⚡ 智能特性</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>硬件兼容性检查</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>配置推荐建议</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>性能评分预测</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-check-circle-fill text-green-500 mr-3 mt-1"></i>
                    <span>价格变动提醒</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 用户体验功能 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">🎨 用户体验功能</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div class="glass-card p-6">
            <h3 class="subsection-title flex items-center mb-4">
              <i class="bi bi-person-circle text-primary-500 mr-3"></i>
              用户认证系统
            </h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-800">安全认证</h4>
                <ul class="text-sm text-gray-600 space-y-1 mt-2">
                  <li>• 邮箱/手机号注册登录</li>
                  <li>• 社交账号快速登录</li>
                  <li>• 双重身份验证(2FA)</li>
                  <li>• JWT令牌安全管理</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">个人中心</h4>
                <ul class="text-sm text-gray-600 space-y-1 mt-2">
                  <li>• 个人信息管理</li>
                  <li>• 订单历史查询</li>
                  <li>• 收货地址管理</li>
                  <li>• 偏好设置同步</li>
                </ul>
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
                <h4 class="font-semibold text-gray-800">智能定位</h4>
                <ul class="text-sm text-gray-600 space-y-1 mt-2">
                  <li>• 自动获取用户位置</li>
                  <li>• 三级省市区联动</li>
                  <li>• 精确到街道地址</li>
                  <li>• 配送范围查询</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">物流服务</h4>
                <ul class="text-sm text-gray-600 space-y-1 mt-2">
                  <li>• 配送时间预估</li>
                  <li>• 门店自提服务</li>
                  <li>• 物流轨迹追踪</li>
                  <li>• 配送费用计算</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级特性 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">🔥 高级特性</h2>
        <div class="space-y-6">
          
          <div class="glass-card p-8">
            <h3 class="subsection-title mb-6">🎮 3D展示技术</h3>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <i class="bi bi-cpu text-white text-2xl"></i>
                </div>
                <h4 class="font-semibold text-gray-800 mb-2">虚拟装机</h4>
                <p class="text-sm text-gray-600">3D可视化装机模拟，实时查看组装效果</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <i class="bi bi-webcam text-white text-2xl"></i>
                </div>
                <h4 class="font-semibold text-gray-800 mb-2">AR试用</h4>
                <p class="text-sm text-gray-600">增强现实技术，在现实环境中预览产品</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <i class="bi bi-eye text-white text-2xl"></i>
                </div>
                <h4 class="font-semibold text-gray-800 mb-2">沉浸体验</h4>
                <p class="text-sm text-gray-600">VR虚拟展厅，身临其境的购物体验</p>
              </div>
            </div>
          </div>

          <div class="glass-card p-8">
            <h3 class="subsection-title mb-6">🤖 AI智能助手</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">智能推荐</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-robot text-primary-500 mr-3 mt-1"></i>
                    <span>基于用户行为的个性化推荐</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-robot text-primary-500 mr-3 mt-1"></i>
                    <span>智能配置方案生成</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-robot text-primary-500 mr-3 mt-1"></i>
                    <span>预算优化建议</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-robot text-primary-500 mr-3 mt-1"></i>
                    <span>性能需求匹配</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-3">客服助手</h4>
                <ul class="space-y-2 text-gray-600">
                  <li class="flex items-start">
                    <i class="bi bi-chat-dots text-primary-500 mr-3 mt-1"></i>
                    <span>24/7智能客服支持</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-chat-dots text-primary-500 mr-3 mt-1"></i>
                    <span>技术问题自动解答</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-chat-dots text-primary-500 mr-3 mt-1"></i>
                    <span>实时聊天转人工</span>
                  </li>
                  <li class="flex items-start">
                    <i class="bi bi-chat-dots text-primary-500 mr-3 mt-1"></i>
                    <span>多语言交流支持</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能优化特性 -->
      <section class="mb-12">
        <h2 class="section-title mb-8">⚡ 性能优化特性</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div v-for="(feature, index) in performanceFeatures" :key="index" class="glass-card p-6">
            <div class="flex items-center mb-4">
              <div :class="feature.iconClass" class="w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <i :class="feature.icon" class="text-white"></i>
              </div>
              <h3 class="font-bold text-gray-800">{{ feature.title }}</h3>
            </div>
            <p class="text-gray-600 text-sm mb-3">{{ feature.description }}</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li v-for="point in feature.points" :key="point">• {{ point }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 开发者特性 -->
      <section>
        <div class="glass-card p-8">
          <h2 class="section-title mb-6">👨‍💻 开发者友好特性</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="subsection-title">🛠️ 开发工具</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-800">TypeScript支持</h4>
                  <ul class="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• 完整的类型定义</li>
                    <li>• 自动类型推断</li>
                    <li>• 编译时错误检查</li>
                    <li>• IDE智能提示</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">热重载开发</h4>
                  <ul class="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• 实时代码更新</li>
                    <li>• 状态保持功能</li>
                    <li>• 快速错误定位</li>
                    <li>• 开发体验优化</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="subsection-title">📊 调试与分析</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-800">DevTools集成</h4>
                  <ul class="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• Vue DevTools支持</li>
                    <li>• Pinia状态调试</li>
                    <li>• 路由导航分析</li>
                    <li>• 性能监控面板</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">代码质量</h4>
                  <ul class="text-sm text-gray-600 space-y-1 mt-2">
                    <li>• ESLint代码规范</li>
                    <li>• Prettier格式化</li>
                    <li>• 自动化测试支持</li>
                    <li>• 代码覆盖率报告</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 p-6 bg-gradient-to-r from-primary-50 to-cyan-50 rounded-lg">
            <h4 class="font-semibold text-gray-800 mb-3">🚀 扩展性设计</h4>
            <p class="text-gray-600 mb-4">
              项目采用模块化架构设计，支持插件系统和自定义扩展，便于功能的快速迭代和第三方集成。
            </p>
            <div class="flex flex-wrap gap-3">
              <span class="badge badge-primary">插件化架构</span>
              <span class="badge badge-primary">API优先设计</span>
              <span class="badge badge-primary">微服务支持</span>
              <span class="badge badge-primary">云原生部署</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Features',
  data() {
    return {
      coreModules: [
        {
          icon: 'bi bi-shop',
          iconClass: 'bg-gradient-to-r from-blue-500 to-blue-600',
          title: '商品管理',
          description: 'PC硬件产品的完整管理系统'
        },
        {
          icon: 'bi bi-cart3',
          iconClass: 'bg-gradient-to-r from-green-500 to-green-600',
          title: '购物车',
          description: '智能购物车与兼容性检查'
        },
        {
          icon: 'bi bi-person-circle',
          iconClass: 'bg-gradient-to-r from-purple-500 to-purple-600',
          title: '用户系统',
          description: '完整的用户认证与管理'
        },
        {
          icon: 'bi bi-geo-alt',
          iconClass: 'bg-gradient-to-r from-red-500 to-red-600',
          title: '位置服务',
          description: '精确的地理位置与物流'
        }
      ],
      performanceFeatures: [
        {
          icon: 'bi bi-lightning-charge',
          iconClass: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
          title: '快速加载',
          description: '优化的资源加载和缓存策略',
          points: [
            '代码分割与懒加载',
            '图片压缩与WebP格式',
            'CDN加速分发',
            '智能预加载机制'
          ]
        },
        {
          icon: 'bi bi-layers',
          iconClass: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
          title: 'SSR渲染',
          description: '服务端渲染提升首屏性能',
          points: [
            'SEO友好的HTML结构',
            '更快的首次内容绘制',
            '搜索引擎优化',
            '社交媒体分享优化'
          ]
        },
        {
          icon: 'bi bi-phone',
          iconClass: 'bg-gradient-to-r from-pink-500 to-pink-600',
          title: '响应式设计',
          description: '完美适配各种设备屏幕',
          points: [
            '移动优先设计理念',
            '触摸友好的交互',
            '自适应布局系统',
            '跨浏览器兼容性'
          ]
        }
      ]
    }
  }
}
</script> 