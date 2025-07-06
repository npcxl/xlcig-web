<template>
  <PageLoader :is-page-loading="isPageLoading" :is-data-loading="isDataLoading" :has-error="hasError"
    :error-message="errorMessage" loading-title="正在加载热门产品..." loading-message="请稍候" @retry="reloadPage">

    <!-- 页面内容 -->
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      <!-- 流星特效背景 -->
      <div class="fixed inset-0 pointer-events-none">
        <!-- 流星层 -->
        <div class="meteors-container">
          <div class="meteor meteor-1"></div>
          <div class="meteor meteor-2"></div>
          <div class="meteor meteor-3"></div>
          <div class="meteor meteor-4"></div>
          <div class="meteor meteor-5"></div>
          <div class="meteor meteor-6"></div>
          <div class="meteor meteor-7"></div>
          <div class="meteor meteor-8"></div>
        </div>

        <!-- 星空背景 -->
        <div class="stars-container">
          <div class="stars stars-1"></div>
          <div class="stars stars-2"></div>
          <div class="stars stars-3"></div>
        </div>

        <!-- 原有的背景装饰效果 -->
        <div
          class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse">
        </div>
        <div
          class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000">
        </div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow">
        </div>
      </div>

      <!-- 导航栏 -->
      <AppHeader :show-back-button="false" :show-nav-menu="true" :show-breadcrumb="false" :show-location="true"
        :show-search-button="true" :show-notification-button="true" :show-decorations="true" logo-size="large" />

      <!-- 装饰性图片布局区域 - 暂时注释掉 -->
      <!--
      <section class="relative z-10 py-8 mt-4">
        <div class="container mx-auto px-6">
          <div class="decorative-images-container">
            <div class="decorative-image-wrapper style-1">
              <img src="/assets/images/1.png" alt="装饰图片" class="decorative-image">
            </div>
            
            <div class="decorative-image-wrapper style-2">
              <img src="/assets/images/2.png" alt="装饰图片" class="decorative-image">
            </div>
            
            <div class="decorative-image-wrapper style-3">
              <img src="/assets/images/3.png" alt="装饰图片" class="decorative-image">
            </div>
            
            <div class="decorative-image-wrapper style-4">
              <img src="/assets/images/5.png" alt="装饰图片" class="decorative-image">
            </div>
            
            <div class="decorative-image-wrapper style-5">
              <img src="/assets/images/6.png" alt="装饰图片" class="decorative-image">
            </div>
          </div>
        </div>
      </section>
      -->

      <!-- 主横幅区域 -->
      <section class="relative z-10 py-20">
        <div class="container mx-auto px-6">
          <div class="text-center">
            <div
              class="glass-card-dark rounded-3xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-4xl mx-auto">
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
                  class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 group">
                  <i class="bi bi-lightning-fill mr-2 group-hover:animate-bounce"></i>
                  立即开始
                </NuxtLink>
                <button
                  class="inline-flex items-center px-8 py-3 border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:bg-cyan-500/10 transform hover:-translate-y-1">
                  <i class="bi bi-play-circle mr-2"></i>
                  观看演示
                </button>
              </div>
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

          <!-- 空状态 -->
          <div v-if="featuredProducts.length === 0" class="text-center py-16">
            <div
              class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto">
              <div class="text-8xl mb-8 text-cyan-400 opacity-50">
                <i class="bi bi-inbox"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4">暂无热门产品</h3>
              <p class="text-gray-400 mb-8 text-lg">商家还没有上传产品，请稍后再来查看</p>
              <button @click="reloadPage"
                class="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
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
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
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
                    <i v-for="i in 5" :key="i" :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-600'"
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
          <div v-if="featuredProducts.length > 0" class="text-center mt-12">
            <NuxtLink to="/products"
              class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1 group">
              <i class="bi bi-collection mr-2 group-hover:animate-bounce"></i>
              浏览产品
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

          <!-- 空状态 -->
          <div v-if="configurations.length === 0" class="text-center py-16">
            <div
              class="glass-card-dark rounded-2xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-w-md mx-auto">
              <div class="text-8xl mb-8 text-cyan-400 opacity-50">
                <i class="bi bi-cpu"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4">暂无配置推荐</h3>
              <p class="text-gray-400 mb-8 text-lg">商家还没有上传配置方案，请稍后再来查看</p>
              <button @click="reloadPage"
                class="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
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

                <button @click="viewProduct(config.id)"
                  class="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300">
                  选择此配置
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
            <div
              class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2">
              <div
                class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <i class="bi bi-star-fill text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4">精选产品</h3>
              <p class="text-gray-300 leading-relaxed">精心挑选的高品质PC硬件，确保性能与价格的完美平衡</p>
            </div>

            <div
              class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2">
              <div
                class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <i class="bi bi-currency-dollar text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4">优惠价格</h3>
              <p class="text-gray-300 leading-relaxed">直接与厂商合作，为您提供最具竞争力的价格和促销活动</p>
            </div>

            <div
              class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2">
              <div
                class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <i class="bi bi-joystick text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4">游戏体验</h3>
              <p class="text-gray-300 leading-relaxed">针对游戏需求优化的配置方案，让您享受极致的游戏体验</p>
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
  </PageLoader>
</template>

<script setup>
import { productsApi } from '~/utils/api/products'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 响应式数据
const featuredProducts = ref([])
const configurations = ref([])

// 简化的加载状态管理
const isPageLoading = ref(true)
const isDataLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')

// 简化的加载函数
const loadPageData = async () => {
  try {
    console.log('首页开始加载数据...')
    isPageLoading.value = true
    isDataLoading.value = true
    hasError.value = false

    // 加载数据
    const [products, configs] = await Promise.all([
      fetchFeaturedProducts(),
      fetchConfigurations()
    ])

    console.log('首页数据加载完成:', {
      productsCount: products.length,
      configsCount: configs.length
    })

    // 使用 nextTick 确保状态更新在下一个渲染周期生效
    await nextTick()

    // 更新状态
    isPageLoading.value = false
    isDataLoading.value = false

    console.log('首页状态更新完成:', {
      isPageLoading: isPageLoading.value,
      isDataLoading: isDataLoading.value,
      productsCount: featuredProducts.value.length,
      configsCount: configurations.value.length
    })

  } catch (error) {
    console.error('首页数据加载失败:', error)
    hasError.value = true
    errorMessage.value = error.message || '页面加载失败'
    isPageLoading.value = false
    isDataLoading.value = false
  }
}

// 重新加载页面
const reloadPage = () => {
  loadPageData()
}

// 页面挂载时加载数据
onMounted(() => {
  console.log('首页组件 onMounted 触发')
  loadPageData()
})

// 监听路由变化
watch(() => route.path, (newPath, oldPath) => {
  console.log('首页路由变化:', oldPath, '->', newPath)
  if (newPath === '/') {
    console.log('返回首页，重新加载数据')
    loadPageData()
  }
})

// 获取热门产品
const fetchFeaturedProducts = async () => {
  try {
    const response = await productsApi.getHotProducts(4)
    if (response.success && response.data) {
      const products = response.data.map(config => ({
        id: config.id,
        name: config.name,
        price: config.price,
        rating: 4.5, // 默认评分
        image: config.images && config.images.length > 0 ? config.images[0] : '',
        description: config.description || '专业电脑配置'
      }))

      featuredProducts.value = products
      return products
    } else {
      featuredProducts.value = []
      return []
    }
  } catch (error) {
    console.error('获取热门产品失败:', error)
    featuredProducts.value = []
    return []
  }
}

// 获取配置推荐
const fetchConfigurations = async () => {
  try {
    const response = await productsApi.getFeaturedProducts({ limit: 3 })
    if (response.success && response.data && response.data.length > 0) {
      const configs = response.data.map((config, index) => {
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

      configurations.value = configs
      return configs
    } else {
      configurations.value = []
      return []
    }
  } catch (error) {
    console.error('获取配置推荐失败:', error)
    configurations.value = []
    return []
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

// 产品相关方法
const viewProduct = (productId) => {
  router.push(`/products/${productId}`)
}

const getHomeProductIcon = (productName) => {
  if (productName.includes('RTX') || productName.includes('RX') || productName.includes('显卡')) {
    return 'bi bi-gpu-card text-cyan-400 text-4xl'
  }
  if (productName.includes('Intel') || productName.includes('AMD') || productName.includes('Ryzen') || productName.includes('Core')) {
    return 'bi bi-cpu text-orange-400 text-4xl'
  }
  if (productName.includes('主板') || productName.includes('STRIX') || productName.includes('MAG')) {
    return 'bi bi-motherboard text-green-400 text-4xl'
  }
  if (productName.includes('电源') || productName.includes('PSU') || productName.includes('Power')) {
    return 'bi bi-lightning text-yellow-400 text-4xl'
  }
  return 'bi bi-pc-display text-gray-400 text-4xl'
}

const getProductTypeName = (productName) => {
  if (productName.includes('RTX') || productName.includes('RX') || productName.includes('显卡')) {
    return '显卡'
  }
  if (productName.includes('Intel') || productName.includes('AMD') || productName.includes('Ryzen') || productName.includes('Core')) {
    return 'CPU'
  }
  if (productName.includes('主板') || productName.includes('STRIX') || productName.includes('MAG')) {
    return '主板'
  }
  if (productName.includes('电源') || productName.includes('PSU') || productName.includes('Power')) {
    return '电源'
  }
  return 'PC配件'
}

// 添加 console.log 来调试渲染
console.log('首页组件渲染, 状态:', {
  isPageLoading: isPageLoading.value,
  isDataLoading: isDataLoading.value,
  hasError: hasError.value,
  productsCount: featuredProducts.value.length,
  configsCount: configurations.value.length
})
</script>

<style scoped>
/* 简化优美的流星特效 */
.meteors-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.meteor {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  animation: meteor-fall 6s linear infinite;
}

.meteor::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 255, 255, 0.7) 30%,
    rgba(255, 255, 255, 0.4) 60%,
    rgba(255, 255, 255, 0.1) 90%,
    transparent 100%
  );
  border-radius: 2px;
  transform: translateX(-80px);
}

.meteor-1 {
  top: 5%;
  left: 5%;
  animation-delay: 0s;
}

.meteor-2 {
  top: 15%;
  left: 25%;
  animation-delay: 1s;
}

.meteor-3 {
  top: 8%;
  left: 45%;
  animation-delay: 2s;
}

.meteor-4 {
  top: 18%;
  left: 65%;
  animation-delay: 3s;
}

.meteor-5 {
  top: 12%;
  left: 85%;
  animation-delay: 4s;
}

.meteor-6 {
  top: 22%;
  left: 15%;
  animation-delay: 5s;
}

.meteor-7 {
  top: 3%;
  left: 75%;
  animation-delay: 1.5s;
}

.meteor-8 {
  top: 28%;
  left: 35%;
  animation-delay: 2.5s;
}

@keyframes meteor-fall {
  0% {
    transform: translateY(-50px) translateX(-50px) rotate(45deg);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) translateX(100vh) rotate(45deg);
    opacity: 0;
  }
}

/* 增强的星空背景 */
.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.stars {
  position: absolute;
  width: 1px;
  height: 1px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: twinkle 4s infinite;
}

.stars-1 {
  box-shadow: 
    100px 200px rgba(255, 255, 255, 0.9),
    300px 100px rgba(255, 255, 255, 0.7),
    500px 300px rgba(255, 255, 255, 0.8),
    700px 150px rgba(255, 255, 255, 0.6),
    900px 250px rgba(255, 255, 255, 0.9),
    1100px 100px rgba(255, 255, 255, 0.7),
    1300px 200px rgba(255, 255, 255, 0.8),
    200px 400px rgba(255, 255, 255, 0.6),
    400px 350px rgba(255, 255, 255, 0.9),
    600px 450px rgba(255, 255, 255, 0.7),
    800px 400px rgba(255, 255, 255, 0.8),
    1000px 500px rgba(255, 255, 255, 0.6),
    1200px 450px rgba(255, 255, 255, 0.9),
    1400px 350px rgba(255, 255, 255, 0.7);
  animation-delay: 0s;
}

.stars-2 {
  box-shadow: 
    150px 250px rgba(255, 255, 255, 0.8),
    350px 150px rgba(255, 255, 255, 0.6),
    550px 350px rgba(255, 255, 255, 0.9),
    750px 200px rgba(255, 255, 255, 0.7),
    950px 300px rgba(255, 255, 255, 0.8),
    1150px 150px rgba(255, 255, 255, 0.6),
    1350px 250px rgba(255, 255, 255, 0.9),
    250px 450px rgba(255, 255, 255, 0.7),
    450px 400px rgba(255, 255, 255, 0.8),
    650px 500px rgba(255, 255, 255, 0.6),
    850px 450px rgba(255, 255, 255, 0.9),
    1050px 550px rgba(255, 255, 255, 0.7),
    1250px 500px rgba(255, 255, 255, 0.8),
    1450px 400px rgba(255, 255, 255, 0.6);
  animation-delay: 1.3s;
}

.stars-3 {
  box-shadow: 
    75px 175px rgba(255, 255, 255, 0.7),
    275px 75px rgba(255, 255, 255, 0.9),
    475px 275px rgba(255, 255, 255, 0.6),
    675px 125px rgba(255, 255, 255, 0.8),
    875px 225px rgba(255, 255, 255, 0.7),
    1075px 75px rgba(255, 255, 255, 0.9),
    1275px 175px rgba(255, 255, 255, 0.6),
    175px 375px rgba(255, 255, 255, 0.8),
    375px 325px rgba(255, 255, 255, 0.7),
    575px 425px rgba(255, 255, 255, 0.9),
    775px 375px rgba(255, 255, 255, 0.6),
    975px 475px rgba(255, 255, 255, 0.8),
    1175px 425px rgba(255, 255, 255, 0.7),
    1375px 325px rgba(255, 255, 255, 0.9);
  animation-delay: 2.6s;
}

@keyframes twinkle {
  0%, 100% { 
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% { 
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 简单的图片分布样式 */
.decorative-images-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
}

.decorative-image-wrapper {
  position: absolute;
  pointer-events: auto;
}

.decorative-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

/* 各个图片的位置 */
.decorative-image-wrapper.style-1 {
  top: 8%;
  left: 3%;
  width: 200px;
  height: 200px;
}

.decorative-image-wrapper.style-2 {
  top: 70%;
  left: 15%;
  width: 180px;
  height: 180px;
}

.decorative-image-wrapper.style-3 {
  top: 5%;
  left: 60%;
  width: 220px;
  height: 220px;
}

.decorative-image-wrapper.style-4 {
  top: 60%;
  left: 75%;
  width: 160px;
  height: 160px;
}

.decorative-image-wrapper.style-5 {
  top: 35%;
  left: 85%;
  width: 140px;
  height: 140px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .decorative-image-wrapper.style-1 {
    width: 120px;
    height: 120px;
    top: 10%;
    left: 5%;
  }
  
  .decorative-image-wrapper.style-2 {
    width: 100px;
    height: 100px;
    top: 75%;
    left: 10%;
  }
  
  .decorative-image-wrapper.style-3 {
    width: 140px;
    height: 140px;
    top: 8%;
    left: 55%;
  }
  
  .decorative-image-wrapper.style-4 {
    width: 110px;
    height: 110px;
    top: 65%;
    left: 70%;
  }
  
  .decorative-image-wrapper.style-5 {
    width: 90px;
    height: 90px;
    top: 40%;
    left: 80%;
  }
}

@media (max-width: 480px) {
  .decorative-image-wrapper.style-1 {
    width: 80px;
    height: 80px;
    top: 15%;
    left: 5%;
  }
  
  .decorative-image-wrapper.style-2 {
    width: 70px;
    height: 70px;
    top: 80%;
    left: 10%;
  }
  
  .decorative-image-wrapper.style-3 {
    width: 90px;
    height: 90px;
    top: 10%;
    left: 50%;
  }
  
  .decorative-image-wrapper.style-4 {
    width: 75px;
    height: 75px;
    top: 70%;
    left: 65%;
  }
  
  .decorative-image-wrapper.style-5 {
    width: 65px;
    height: 65px;
    top: 45%;
    left: 75%;
  }
}

/* 原有样式保持不变 */
.glass-card-dark {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.home-product-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%);
}

.home-product-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%);
  color: #9CA3AF;
}

.home-product-type {
  margin-top: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6B7280;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>