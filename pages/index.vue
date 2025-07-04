<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
    <!-- 背景装饰效果 -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow"></div>
      </div>
      
    <!-- 导航栏 -->
    <nav class="relative z-10">
      <div class="container mx-auto px-6 py-6">
        <div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-8">
              <!-- 使用AppLogo组件 -->
              <AppLogo size="large" />
              <div class="hidden md:flex space-x-6">
                <NuxtLink to="/" class="text-white hover:text-cyan-400 transition-colors duration-200 font-medium">首页</NuxtLink>
                <NuxtLink to="/products" class="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">产品中心</NuxtLink>
                <NuxtLink to="/checkout" class="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">购物车</NuxtLink>
                <NuxtLink to="/orders" class="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">订单</NuxtLink>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <!-- IP定位组件 -->
              <HeaderLocation />
              
              <button class="p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200">
                <i class="bi bi-search text-xl"></i>
              </button>
              <button class="p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200">
                <i class="bi bi-bell text-xl"></i>
              </button>
              <!-- 登录状态检测 -->
              <div v-if="!userStore.isLoggedIn" class="flex items-center space-x-3">
                <NuxtLink to="/auth/login" 
                         class="px-4 py-2 text-gray-300 hover:text-cyan-400 font-medium transition-colors duration-200 border border-gray-600/50 hover:border-cyan-400/50 rounded-lg">
                  登录
                </NuxtLink>
                <NuxtLink to="/auth/register" 
                         class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                  注册
                </NuxtLink>
              </div>
              <!-- 用户菜单 -->
              <div v-else class="relative" ref="userMenuRef">
                <n-config-provider :theme="naiveTheme" :theme-overrides="themeOverrides">
                  <n-dropdown 
                    :options="userMenuOptions"
                    @select="handleUserMenuSelect"
                    placement="bottom-end"
                    trigger="click">
                    <button class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
                      <!-- 用户头像 -->
                      <div class="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                        <img 
                          v-if="userStore.hasAvatarImage" 
                          :src="userStore.user?.avatar" 
                          :alt="userStore.userDisplayName + '的头像'"
                          class="w-full h-full object-cover"
                          @error="handleAvatarError"
                        />
                        <span v-else>{{ userStore.userAvatar }}</span>
                      </div>
                      <span class="text-white font-medium hidden md:block">{{ userStore.userDisplayName }}</span>
                      <i class="bi bi-chevron-down text-gray-400 text-sm"></i>
                    </button>
                  </n-dropdown>
                </n-config-provider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主横幅区域 -->
    <section class="relative z-10 py-20">
      <div class="container mx-auto px-6">
        <div class="text-center">
          <div class="glass-card-dark rounded-3xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-4xl mx-auto">
            <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
              专业<span class="text-cyan-400">xlCig</span>
              <br>
              <span class="text-3xl md:text-5xl text-gray-300 font-normal">PC硬件专家</span>
            </h1>
            <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              为您提供专业的PC硬件产品和装机建议，助您打造梦想中的高性能电脑
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NuxtLink to="/products" 
                       class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1">
                <i class="bi bi-shop mr-3 text-xl"></i>
                浏览产品
              </NuxtLink>
              <button class="inline-flex items-center px-8 py-4 border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:bg-cyan-500/10 transform hover:-translate-y-1">
                <i class="bi bi-play-circle mr-3 text-xl"></i>
                观看介绍
              </button>
          </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色服务 -->
    <section class="relative z-10 py-16">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">我们的服务</h2>
          <p class="text-gray-300 text-lg">专业的硬件选择和装机服务</p>
          </div>
          
        <div class="grid md:grid-cols-3 gap-8">
          <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <i class="bi bi-star-fill text-white text-2xl"></i>
            </div>
            <h3 class="text-2xl font-semibold text-white mb-4">精选产品</h3>
            <p class="text-gray-300 leading-relaxed">精心挑选的高品质PC硬件，确保性能与价格的完美平衡</p>
            </div>

          <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <i class="bi bi-currency-dollar text-white text-2xl"></i>
            </div>
            <h3 class="text-2xl font-semibold text-white mb-4">优惠价格</h3>
            <p class="text-gray-300 leading-relaxed">直接与厂商合作，为您提供最具竞争力的价格和促销活动</p>
            </div>

          <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <i class="bi bi-joystick text-white text-2xl"></i>
            </div>
            <h3 class="text-2xl font-semibold text-white mb-4">游戏体验</h3>
            <p class="text-gray-300 leading-relaxed">针对游戏需求优化的配置方案，让您享受极致的游戏体验</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门产品预览 -->
    <section class="relative z-10 py-16">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">热门产品</h2>
          <p class="text-gray-300 text-lg">最受欢迎的PC硬件产品</p>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="text-center py-16">
          <div class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto">
            <div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p class="text-xl font-medium text-white">正在加载热门产品...</p>
            <p class="text-gray-400 mt-2">请稍候</p>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else-if="!loading && featuredProducts.length === 0" class="text-center py-16">
          <div class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto">
            <div class="text-8xl mb-8 text-cyan-400 opacity-50">
              <i class="bi bi-inbox"></i>
            </div>
            <h3 class="text-2xl font-semibold text-white mb-4">暂无热门产品</h3>
            <p class="text-gray-400 mb-8 text-lg">商家还没有上传产品，请稍后再来查看</p>
            <button @click="fetchFeaturedProducts" class="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
              <i class="bi bi-arrow-clockwise mr-2"></i>
              重新加载
            </button>
          </div>
        </div>

        <!-- 产品列表 -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="product in featuredProducts" :key="product.id" 
               class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2 group">
            <div class="relative h-48 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
              <!-- 产品图片或placeholder -->
              <div v-if="product.image" class="home-product-image-container">
                <img :src="product.image" :alt="product.name" 
                     class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                     @error="$event.target.style.display = 'none'">
              </div>
              <div v-else class="home-product-placeholder">
                <i :class="getHomeProductIcon(product.name)"></i>
                <span class="home-product-type">{{ getProductTypeName(product.name) }}</span>
              </div>
              
              <div class="absolute top-3 right-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                  <i class="bi bi-fire mr-1"></i>热门
                </span>
              </div>
            </div>

            <div class="p-6">
              <h3 class="font-semibold text-white text-lg mb-2 line-clamp-2">{{ product.name }}</h3>
              <p class="text-gray-400 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
              
              <div class="flex items-center justify-between">
                <div class="text-2xl font-bold text-cyan-400">¥{{ product.price.toLocaleString() }}</div>
                <div class="flex">
                  <i v-for="i in 5" :key="i" 
                     :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-600'"
                     class="bi bi-star-fill text-sm"></i>
                </div>
              </div>

              <button @click="viewProduct(product.id)" 
                      class="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-all duration-300">
                  查看详情
                </button>
            </div>
          </div>
        </div>

        <!-- 查看全部按钮 -->
        <div v-if="!loading && featuredProducts.length > 0" class="text-center mt-12">
          <NuxtLink to="/products" 
                   class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
            <i class="bi bi-grid-3x3-gap mr-3 text-xl"></i>
            查看全部产品
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 装机配置推荐 -->
    <section class="relative z-10 py-16">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">装机配置推荐</h2>
          <p class="text-gray-300 text-lg">根据不同需求精心搭配的配置方案</p>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="loading" class="text-center py-16">
          <div class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto">
            <div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p class="text-xl font-medium text-white">正在加载配置推荐...</p>
            <p class="text-gray-400 mt-2">请稍候</p>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else-if="!loading && configurations.length === 0" class="text-center py-16">
          <div class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto">
            <div class="text-8xl mb-8 text-cyan-400 opacity-50">
              <i class="bi bi-cpu"></i>
            </div>
            <h3 class="text-2xl font-semibold text-white mb-4">暂无配置推荐</h3>
            <p class="text-gray-400 mb-8 text-lg">商家还没有上传配置方案，请稍后再来查看</p>
            <button @click="fetchConfigurations" class="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
              <i class="bi bi-arrow-clockwise mr-2"></i>
              重新加载
            </button>
          </div>
        </div>

        <!-- 配置列表 -->
        <div v-else class="grid md:grid-cols-3 gap-8">
          <div v-for="config in configurations" :key="config.id"
               class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2">
            <div class="p-6 border-b border-gray-700/50">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-semibold text-white">{{ config.name }}</h3>
                <span :class="config.badgeClass">{{ config.badge }}</span>
              </div>
              <p class="text-gray-300 mb-4">{{ config.description }}</p>
              <div class="text-3xl font-bold text-cyan-400 mb-2">¥{{ config.price.toLocaleString() }}</div>
              <div class="text-sm text-gray-400">预估性能分数：{{ config.score }}</div>
            </div>
            
            <div class="p-6">
              <div class="space-y-3 mb-6">
                <div v-for="component in config.components" :key="component.type"
                     class="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                  <span class="text-gray-300 text-sm">{{ component.type }}</span>
                  <span class="text-white text-sm font-medium">{{ component.name }}</span>
                </div>
              </div>
              
              <button @click="viewProduct(config.id)" class="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300">
                选择此配置
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="relative z-10 mt-20">
      <div class="container mx-auto px-6 py-12">
        <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <div class="text-center">
            <!-- 使用AppLogo组件 -->
            <div class="flex justify-center mb-4">
              <AppLogo size="medium" :show-decorations="false" />
        </div>
            <p class="text-gray-300 mb-6">专业的PC硬件产品和装机服务</p>
            <div class="flex justify-center space-x-6 text-gray-400">
              <a href="#" class="hover:text-cyan-400 transition-colors duration-200">关于我们</a>
              <a href="#" class="hover:text-cyan-400 transition-colors duration-200">联系方式</a>
              <a href="#" class="hover:text-cyan-400 transition-colors duration-200">服务条款</a>
              <a href="#" class="hover:text-cyan-400 transition-colors duration-200">隐私政策</a>
          </div>
            <div class="mt-6 pt-6 border-t border-gray-700/50 text-gray-500 text-sm">
              © 2024 xlCig. 保留所有权利.
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { NDropdown, darkTheme, NConfigProvider } from 'naive-ui'
import { useUserStore } from '../stores/user'
import { productsApi } from '~/utils/api/products'
import { merchantsApi } from '~/utils/api/merchants'
import HeaderLocation from '../components/location/HeaderLocation.vue'

// 使用Pinia store
const userStore = useUserStore()

// 响应式数据
const userMenuRef = ref(null)

// NaiveUI主题配置
const naiveTheme = darkTheme

const themeOverrides = {
  common: {
    primaryColor: '#00f5ff',
    primaryColorHover: '#00d4ff',
    primaryColorPressed: '#00b8ff',
    primaryColorSuppl: '#0080ff'
  },
  Dropdown: {
    color: 'rgba(31, 41, 55, 0.95)',
    borderColor: 'rgba(148, 163, 184, 0.3)',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    optionTextColor: '#d1d5db',
    optionTextColorHover: '#ffffff',
    optionTextColorPressed: '#00f5ff',
    optionColorHover: 'rgba(75, 85, 99, 0.5)',
    optionColorPressed: 'rgba(0, 245, 255, 0.1)',
    dividerColor: 'rgba(75, 85, 99, 0.5)'
  }
}

const featuredProducts = ref([])
const configurations = ref([])
const loading = ref(true)
const error = ref('')

// 获取热门产品
const fetchFeaturedProducts = async () => {
  try {
    const response = await productsApi.getHotProducts(4)
    if (response.success && response.data) {
      featuredProducts.value = response.data.map(config => ({
        id: config.id,
        name: config.name,
        price: config.price,
        rating: 4.5, // 默认评分
        image: config.images && config.images.length > 0 ? config.images[0] : '',
        description: config.description || '专业电脑配置'
      }))
    } else {
      featuredProducts.value = []
    }
  } catch (error) {
    console.error('获取热门产品失败:', error)
    featuredProducts.value = []
  }
}

// 获取配置推荐
const fetchConfigurations = async () => {
  try {
    const response = await productsApi.getFeaturedProducts({ limit: 3 })
    if (response.success && response.data && response.data.length > 0) {
      configurations.value = response.data.map((config, index) => {
        const badges = ['超值', '推荐', '顶级']
        const badgeClasses = [
          'px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium',
          'px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium',
          'px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium'
        ]
        
        // 解析配置规格
        let components = []
        if (config.specs) {
          try {
            const specs = typeof config.specs === 'string' ? JSON.parse(config.specs) : config.specs
            components = Object.entries(specs).slice(0, 4).map(([key, value]) => ({
              type: getSpecDisplayName(key),
              name: value
            }))
          } catch (e) {
            console.error('解析配置规格失败:', e)
            components = []
          }
        }
        
        return {
          id: config.id,
          name: config.name,
          price: config.price,
          score: 85 + index * 5, // 模拟性能分数
          badge: badges[index] || '推荐',
          badgeClass: badgeClasses[index] || badgeClasses[1],
          description: config.description || getCategoryDescription(config.category),
          components: components
        }
      })
    } else {
      configurations.value = []
    }
  } catch (error) {
    console.error('获取配置推荐失败:', error)
    configurations.value = []
  }
}

// 辅助函数
const getSpecDisplayName = (key) => {
  const specNames = {
    cpu: 'CPU',
    gpu: '显卡', 
    motherboard: '主板',
    memory: '内存',
    storage: '存储',
    power: '电源',
    case: '机箱',
    cooler: '散热器',
    display: '显示器'
  }
  return specNames[key] || key.toUpperCase()
}

const getCategoryDescription = (category) => {
  const descriptions = {
    office: '适合日常办公和学习使用的高性价比配置',
    gaming: '专为游戏优化的高性能配置',
    workstation: '专业工作站配置，适合内容创作和专业应用'
  }
  return descriptions[category] || '专业电脑配置方案'
}

// 用户菜单选项
const userMenuOptions = ref([
  {
    label: '个人中心',
    key: 'profile',
    icon: () => h('i', { class: 'bi bi-person' })
  },
  {
    label: '我的订单',
    key: 'orders',
    icon: () => h('i', { class: 'bi bi-box' })
  },
  {
    label: '收货地址',
    key: 'addresses',
    icon: () => h('i', { class: 'bi bi-geo-alt' })
  },
  {
    type: 'divider'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h('i', { class: 'bi bi-box-arrow-right' })
  }
])

// 生命周期
onMounted(async () => {
  // 获取数据
  loading.value = true
  try {
    await Promise.all([
      fetchFeaturedProducts(),
      fetchConfigurations()
    ])
  } catch (err) {
    error.value = '加载数据失败'
    console.error('加载页面数据失败:', err)
  } finally {
    loading.value = false
  }
})

// 方法
const handleUserMenuSelect = (key) => {
  console.log('选择了菜单项:', key)
  
  switch (key) {
    case 'profile':
      window.location.href = '/profile'
      break
    case 'orders':
      window.location.href = '/orders'
      break
    case 'addresses':
      window.location.href = '/addresses'
      break
    case 'logout':
      userStore.logout()
      break
  }
}

const handleAvatarError = (event) => {
  // 头像加载失败时的处理
  console.log('头像加载失败，切换到文字头像')
  event.target.style.display = 'none'
}

const viewProduct = async (id) => {
  try {
    await navigateTo(`/products/${id}`)
  } catch (error) {
    console.error('导航错误:', error)
  }
}

// 获取首页产品图标
const getHomeProductIcon = (productName) => {
  if (productName.includes('RTX') || productName.includes('RX')) {
    return 'bi bi-gpu-card text-cyan-400'
  }
  if (productName.includes('Intel') || productName.includes('AMD') || productName.includes('Ryzen')) {
    return 'bi bi-cpu text-orange-400'
  }
  return 'bi bi-motherboard text-green-400'
}

// 获取产品类型
const getProductTypeName = (productName) => {
  if (productName.includes('RTX') || productName.includes('RX')) {
    return '显卡'
  }
  if (productName.includes('Intel') || productName.includes('AMD') || productName.includes('Ryzen')) {
    return '处理器'
  }
  return '主板'
}

// 页面元数据
useHead({
  title: 'xlCig - 专业PC硬件产品和装机服务',
  meta: [
    { name: 'description', content: '专业的PC硬件产品和装机建议，助您打造梦想中的高性能电脑' }
  ]
})
</script>

<style scoped>
/* 首页产品图片容器 */
.home-product-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 首页产品Placeholder样式 */
.home-product-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(135deg, 
    rgba(0, 245, 255, 0.08) 0%, 
    rgba(0, 128, 255, 0.08) 50%, 
    rgba(168, 85, 247, 0.08) 100%);
  padding: 1.5rem;
  text-align: center;
}

.home-product-placeholder i {
  font-size: 3.5rem;
  text-shadow: 0 0 20px currentColor;
  animation: homeProductFloat 4s ease-in-out infinite;
}

.home-product-type {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  letter-spacing: 0.1em;
  opacity: 0.95;
}

/* 首页产品图标动画 */
@keyframes homeProductFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
    filter: drop-shadow(0 0 20px currentColor);
  }
  50% {
    transform: translateY(-8px) scale(1.05);
    filter: drop-shadow(0 0 25px currentColor);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-product-placeholder i {
    font-size: 3rem;
  }
  
  .home-product-type {
    font-size: 0.9rem;
  }
}
</style> 