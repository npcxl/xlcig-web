<template>
 
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">

    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 rounded-full filter blur-3xl animate-spin-slow"></div>
      <div class="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full filter blur-2xl animate-pulse delay-500"></div>
      <div class="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
    </div>

 
    <AppHeader 
      :show-back-button="false"
      :show-nav-menu="true"
      :show-breadcrumb="false"
      :show-location="false"
      :show-search-button="true"
      :show-notification-button="true"
      :show-decorations="false"
      logo-size="medium"
    />

  
    <section class="relative z-10">
      <div class="container mx-auto px-6 py-8">
        <div class="glass-card-enhanced rounded-3xl p-8 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/40 mb-6">
              <i class="bi bi-grid-3x3-gap text-white text-3xl"></i>
            </div>
            <h1 class="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
              <span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">产品中心</span>
            </h1>
            <p class="text-gray-300 text-xl max-w-2xl mx-auto">专业的PC硬件产品，为您的项目提供可靠的解决方案</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 粘性过滤栏 - 深色主题 -->
    <div class="sticky top-0 z-40 backdrop-blur-xl border-b border-cyan-400/20">
      <div class="container mx-auto px-6 py-4">
        <div class="glass-card-enhanced rounded-xl p-6 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl">
          <!-- 分类筛选按钮 -->
          <div class="mb-6">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-3">
              <div class="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                <i class="bi bi-funnel text-white"></i>
              </div>
              <span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">产品分类</span>
            </h3>
            <div class="flex flex-wrap gap-3">
              <button 
                v-for="cat in categories" 
                :key="cat.id"
                @click="setCategory(cat.id)"
                :class="[
                  'flex items-center px-5 py-3 rounded-xl font-semibold transition-all duration-300 border backdrop-blur-sm',
                  selectedCategory === cat.id 
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border-cyan-400/50 shadow-lg shadow-cyan-500/30' 
                    : 'bg-gray-800/30 text-gray-300 border-gray-600/30 hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-500/10'
                ]">
                <i :class="cat.icon" class="mr-2 text-lg"></i>
                <span>{{ cat.name }}</span>
                <span v-if="cat.count > 0" class="ml-2 text-sm opacity-75 px-2 py-1 bg-black/20 rounded-full">({{ cat.count }})</span>
              </button>
            </div>
          </div>

          <!-- 快速筛选控件 - 深色主题 -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- 品牌筛选 -->
            <div>
              <label class="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                <i class="bi bi-bookmark text-cyan-400"></i>
                品牌
              </label>
              <select v-model="selectedBrand" @change="fetchProducts" 
                      class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
                <option value="all" class="bg-gray-800">全部品牌</option>
                <option v-for="brand in brands" :key="brand.id" :value="brand.id" class="bg-gray-800">
                  {{ brand.name }} ({{ brand.count }})
                </option>
              </select>
            </div>

            <!-- 价格区间 -->
            <div>
              <label class="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                <i class="bi bi-currency-dollar text-green-400"></i>
                价格区间
              </label>
              <select v-model="priceRange" @change="fetchProducts"
                      class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
                <option value="" class="bg-gray-800">任意价格</option>
                <option value="0-3600" class="bg-gray-800">3600元以下</option>
                <option value="3600-7200" class="bg-gray-800">3600-7200元</option>
                <option value="7200-10800" class="bg-gray-800">7200-10800元</option>
                <option value="10800-14400" class="bg-gray-800">10800-14400元</option>
                <option value="14400-99999" class="bg-gray-800">14400元以上</option>
              </select>
            </div>

            <!-- 排序 -->
            <div>
              <label class="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                <i class="bi bi-sort-down text-purple-400"></i>
                排序
              </label>
              <select v-model="sortBy" @change="fetchProducts"
                      class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
                <option value="" class="bg-gray-800">推荐</option>
                <option value="price_asc" class="bg-gray-800">价格：从低到高</option>
                <option value="price_desc" class="bg-gray-800">价格：从高到低</option>
                <option value="rating" class="bg-gray-800">评分最高</option>
                <option value="newest" class="bg-gray-800">最新发布</option>
                <option value="popular" class="bg-gray-800">最受欢迎</option>
              </select>
            </div>

            <!-- 搜索 -->
            <div>
              <label class="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                <i class="bi bi-search text-yellow-400"></i>
                搜索产品
              </label>
              <input 
                v-model="searchTerm" 
                @input="debounceSearch"
                placeholder="输入产品名称..."
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm placeholder-gray-400 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
            </div>
          </div>

          <!-- 重置按钮 -->
          <div class="mt-6 flex justify-end">
            <button @click="resetFilters" 
                    class="px-6 py-3 text-sm font-semibold text-gray-300 bg-gray-800/30 border border-gray-600/50 rounded-xl hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
              <i class="bi bi-arrow-clockwise"></i>
              重置筛选
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区 - 深色主题 -->
    <main class="container mx-auto px-6 py-8 relative z-10">
      <!-- 工具栏 - 深色主题 -->
      <div class="glass-card-enhanced rounded-xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 mb-6 backdrop-blur-xl">
        <div class="px-6 py-4 flex items-center justify-between border-b border-gray-700/50">
          <div class="flex items-center">
            <h2 class="text-xl font-bold text-white">{{ getCategoryName(selectedCategory) }}</h2>
            <span class="ml-3 text-sm text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30">({{ meta.total }} 个产品)</span>
          </div>
          <div class="text-sm text-gray-400">
            找到 <span class="text-cyan-400 font-semibold">{{ meta.total }}</span> 个符合条件的产品
          </div>
        </div>
      </div>

      <!-- 产品网格 - 深色主题 -->
      <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id" 
             class="glass-card-enhanced rounded-xl border border-cyan-400/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 group overflow-hidden backdrop-blur-xl">
          <!-- 产品图片 - 深色主题 -->
          <div class="relative h-48 bg-gradient-to-br from-gray-800/60 to-gray-900/60">
            <!-- 产品图片或placeholder -->
            <div v-if="product.image" class="product-list-image-container">
              <img :src="product.image" :alt="product.name" 
                   class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 filter drop-shadow-lg"
                   @error="$event.target.style.display = 'none'">
            </div>
            <div v-else class="product-list-placeholder">
              <div class="product-icon-wrapper">
                <i :class="getProductIcon(product.category)" class="product-icon"></i>
                <div class="product-icon-glow"></div>
              </div>
              <span class="product-category-name">{{ getCategoryDisplayName(product.category) }}</span>
            </div>
            
            <!-- 折扣标签 - 增强版 -->
            <div v-if="product.originalPrice && product.originalPrice > product.price" 
                 class="absolute top-3 left-3 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-red-500/40 animate-pulse">
              <i class="bi bi-lightning-fill mr-1"></i>
              -{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%
            </div>

            <!-- 库存状态 - 深色主题 -->
            <div class="absolute top-3 right-3">
              <span v-if="!product.inStock" 
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/30 text-red-200 border border-red-400/50 shadow-lg shadow-red-500/30 backdrop-blur-sm">
                <i class="bi bi-x-circle-fill mr-1"></i>缺货
              </span>
              <span v-else-if="product.stockCount <= 5" 
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/30 text-orange-200 border border-orange-400/50 shadow-lg shadow-orange-500/30 backdrop-blur-sm animate-pulse">
                <i class="bi bi-exclamation-triangle-fill mr-1"></i>剩余{{ product.stockCount }}
              </span>
              <span v-else 
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/30 backdrop-blur-sm">
                <i class="bi bi-check-circle-fill mr-1"></i>现货
              </span>
            </div>
          </div>

          <!-- 产品信息 - 深色主题 -->
          <div class="p-6">
            <!-- 品牌和名称 -->
            <div class="mb-4">
              <div class="flex items-center justify-between mb-3">
                <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border border-cyan-400/40 shadow-lg backdrop-blur-sm">
                  <i class="bi bi-award mr-1"></i>
                  {{ product.brand }}
                </span>
              </div>
              <h3 class="font-bold text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">{{ product.name }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed line-clamp-2">{{ product.description }}</p>
            </div>

            <!-- 评分 - 深色主题 -->
            <div class="flex items-center gap-2 mb-4 p-3 bg-gray-800/40 rounded-lg border border-gray-700/30 backdrop-blur-sm">
              <div class="flex">
                <i v-for="i in 5" :key="i" 
                   :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-600'"
                   class="bi bi-star-fill text-sm drop-shadow-lg"></i>
              </div>
              <span class="text-sm font-bold text-white">{{ product.rating }}</span>
              <span class="text-xs text-gray-400">({{ product.reviewCount }})</span>
            </div>

            <!-- 核心规格 - 深色主题 -->
            <div class="space-y-2 mb-4">
              <div v-for="(value, key) in getMainSpecs(product)" :key="key" 
                   class="flex justify-between items-center p-3 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-lg text-sm border border-gray-600/30 backdrop-blur-sm">
                <span class="text-gray-300 font-medium">{{ translateSpecKey(key) }}</span>
                <span class="font-bold text-white">{{ value }}</span>
              </div>
            </div>

            <!-- 特性标签 - 深色主题 -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="feature in product.features.slice(0, 3)" :key="feature"
                    class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
                {{ translateFeature(feature) }}
              </span>
            </div>

            <!-- 价格和操作 - 深色主题 -->
            <div class="border-t border-gray-700/50 pt-4">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <div class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    ${{ product.price.toLocaleString() }}
                  </div>
                  <div v-if="product.originalPrice && product.originalPrice > product.price" 
                       class="text-sm text-gray-500 line-through">
                    MSRP ${{ product.originalPrice.toLocaleString() }}
                  </div>
                </div>
                <div class="text-right text-xs text-gray-400">
                  <div>发布日期</div>
                  <div class="text-cyan-400">{{ formatDate(product.releaseDate) }}</div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button @click="viewProduct(product.id)" 
                        class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                  查看详情
                </button>
                <button class="px-4 py-2 border border-gray-600/50 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-300 text-sm font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-1 backdrop-blur-sm">
                  <i class="bi bi-heart"></i>
                  收藏
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载状态 - 深色主题 -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-flex flex-col items-center glass-card-enhanced rounded-xl border border-cyan-400/40 p-12 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl">
          <div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p class="text-xl font-bold text-white">正在加载产品...</p>
          <p class="text-gray-400 mt-2">请稍候</p>
        </div>
      </div>

      <!-- 空状态 - 深色主题 -->
      <div v-if="!loading && products.length === 0" class="text-center py-16">
        <div class="glass-card-enhanced rounded-xl border border-cyan-400/40 p-16 shadow-2xl shadow-cyan-500/25 max-w-md mx-auto backdrop-blur-xl">
          <div class="text-8xl mb-8 text-cyan-400/50">
            <i class="bi bi-inbox"></i>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">未找到产品</h3>
          <p class="text-gray-400 mb-8 text-lg">请尝试调整筛选条件或搜索关键词</p>
          <button @click="resetFilters" class="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
            <i class="bi bi-arrow-clockwise mr-2"></i>
            重置筛选
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 导入API
import { productsApi } from '~/utils/api/products'

// 响应式数据
const products = ref([])
const categories = ref([])
const brands = ref([])
const loading = ref(true)
const meta = ref({ total: 0, page: 1, limit: 12, totalPages: 1 })

// 筛选条件
const selectedCategory = ref('all')
const selectedBrand = ref('all')
const priceRange = ref('')
const sortBy = ref('')
const searchTerm = ref('')

// 防抖搜索
let searchTimeout = null
const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchProducts()
  }, 500)
}

// 获取产品分类
const fetchCategories = async () => {
  try {
    // 使用真实的配置分类数据
    categories.value = [
      { id: 'all', name: '全部产品', icon: 'bi-grid-3x3-gap', count: 0 },
      { id: 'office', name: '办公配置', icon: 'bi-briefcase', count: 0 },
      { id: 'gaming', name: '游戏配置', icon: 'bi-joystick', count: 0 },
      { id: 'workstation', name: '工作站', icon: 'bi-cpu', count: 0 }
    ]
    
    // 只获取全部产品的数量
    const response = await productsApi.getProducts({ limit: 1 })
    const totalCount = response.meta?.total || 0
    
    // 只给"全部产品"设置总数量，其他分类不显示数量
    categories.value.forEach(category => {
      if (category.id === 'all') {
        category.count = totalCount
      } else {
        category.count = 0 // 设置为0，模板中会判断不显示
      }
    })
  } catch (error) {
    console.error('获取分类失败:', error)
    categories.value = [
      { id: 'all', name: '全部产品', icon: 'bi-grid-3x3-gap', count: 0 }
    ]
  }
}

// 获取品牌列表
const fetchBrands = async () => {
  try {
    // 从配置中获取品牌数据
    const response = await productsApi.getProducts({ limit: 100 })
    if (response.success && response.data) {
      const brandMap = new Map()
      
      response.data.forEach(config => {
        if (config.brands) {
          try {
            const configBrands = typeof config.brands === 'string' ? JSON.parse(config.brands) : config.brands
            if (Array.isArray(configBrands)) {
              configBrands.forEach(brand => {
                brandMap.set(brand, (brandMap.get(brand) || 0) + 1)
              })
            }
          } catch (e) {
            console.error('解析品牌数据失败:', e)
          }
        }
      })
      
      brands.value = Array.from(brandMap.entries()).map(([name, count]) => ({
        id: name,
        name,
        count
      }))
    } else {
      brands.value = []
    }
  } catch (error) {
    console.error('获取品牌失败:', error)
    brands.value = []
  }
}

// 获取产品列表
const fetchProducts = async () => {
  loading.value = true
  try {
    const params = {
      page: meta.value.page,
      limit: meta.value.limit
    }
    
    // 添加筛选条件
    if (selectedCategory.value && selectedCategory.value !== 'all') {
      params.category = selectedCategory.value
    }
    
    if (priceRange.value) {
      const [min, max] = priceRange.value.split('-').map(Number)
      params.min_price = min
      params.max_price = max
    }
    
    if (sortBy.value) {
      params.sort = sortBy.value
    }
    
    if (searchTerm.value.trim()) {
      params.search = searchTerm.value.trim()
    }
    
    const response = await productsApi.getProducts(params)
    
    if (response.success) {
      products.value = response.data.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        brand: getBrandFromConfig(product),
        price: product.price,
        originalPrice: product.original_price,
        rating: 4.5, // 默认评分
        reviewCount: 50, // 默认评论数
        image: product.images && product.images.length > 0 ? product.images[0] : '',
        releaseDate: product.created_at,
        inStock: product.stock > 0,
        stockCount: product.stock,
        specs: product.specs ? (typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs) : {},
        features: product.features ? (typeof product.features === 'string' ? JSON.parse(product.features) : product.features) : [],
        description: product.description || '专业电脑配置'
      }))
      
      meta.value = response.meta || { total: 0, page: 1, limit: 12, totalPages: 1 }
    } else {
      products.value = []
      meta.value = { total: 0, page: 1, limit: 12, totalPages: 1 }
    }
  } catch (error) {
    console.error('获取产品列表失败:', error)
    products.value = []
    meta.value = { total: 0, page: 1, limit: 12, totalPages: 1 }
  } finally {
    loading.value = false
  }
}

// 辅助函数：从配置中提取品牌
const getBrandFromConfig = (config) => {
  if (config.brands) {
    try {
      const brands = typeof product.brands === 'string' ? JSON.parse(product.brands) : product.brands
      return Array.isArray(brands) && brands.length > 0 ? brands[0] : '未知品牌'
    } catch (e) {
      return '未知品牌'
    }
  }
  return '未知品牌'
}

// 页面初始化
onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      fetchCategories(),
      fetchBrands(),
      fetchProducts()
    ])
  } catch (error) {
    console.error('页面初始化失败:', error)
  } finally {
    loading.value = false
  }
})

// 设置分类
const setCategory = (categoryId) => {
  selectedCategory.value = categoryId
  selectedBrand.value = 'all'
  fetchProducts()
}

// 获取分类名称
const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category?.name || 'All Products'
}

// 获取主要规格
const getMainSpecs = (product) => {
  const specs = product.specs || {}
  return Object.entries(specs).slice(0, 2).reduce((obj, [key, value]) => {
    obj[key] = value
    return obj
  }, {})
}

// 翻译规格键名
const translateSpecKey = (key) => {
  const translations = {
    memory: '显存',
    power: '功耗',
    cores: '核心',
    threads: '线程',
    socket: '插槽',
    chipset: '芯片组',
    wattage: '功率',
    efficiency: '效率',
    size: '尺寸',
    resolution: '分辨率'
  }
  return translations[key] || key
}

// 翻译特性
const translateFeature = (feature) => {
  const translations = {
    '光线追踪': 'Ray Tracing',
    'DLSS 3.0': 'DLSS 3.0',
    'RDNA 3': 'RDNA 3',
    'FSR 3.0': 'FSR 3.0',
    '超线程': 'Hyper-Threading',
    'DDR5支持': 'DDR5 Support',
    'PCIe 5.0': 'PCIe 5.0',
    'WiFi 6E': 'WiFi 6E',
    '80+ 金牌': '80+ Gold',
    '全模组': 'Fully Modular',
    '4K UHD': '4K UHD',
    '144Hz': '144Hz',
    'HDR10': 'HDR10'
  }
  return translations[feature] || feature
}

// 获取产品图标
const getProductIcon = (category) => {
  const icons = {
    graphics: 'bi bi-gpu-card text-cyan-400',
    cpu: 'bi bi-cpu text-orange-400', 
    motherboard: 'bi bi-motherboard text-green-400',
    power: 'bi bi-lightning text-yellow-400',
    monitor: 'bi bi-display text-purple-400'
  }
  return icons[category] || 'bi bi-pc-display text-gray-400'
}

// 获取类别显示名称
const getCategoryDisplayName = (category) => {
  const names = {
    graphics: '显卡',
    cpu: '处理器',
    motherboard: '主板', 
    power: '电源',
    monitor: '显示器'
  }
  return names[category] || '硬件'
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

// 处理图片错误
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300?text=暂无图片'
}

// 查看产品详情
const viewProduct = async (id) => {
  console.log('Attempting to navigate to product:', id)
  try {
    // 使用 Nuxt 3 的 navigateTo 函数，明确指定为客户端导航
    await navigateTo(`/products/${id}`, { external: false })
    console.log('Navigation successful to:', `/products/${id}`)
  } catch (error) {
    console.error('NavigateTo failed, trying router.push:', error)
    try {
      // 备用方案：使用 Vue Router
      const router = useRouter()
      await router.push(`/products/${id}`)
      console.log('Router.push successful to:', `/products/${id}`)
    } catch (routerError) {
      console.error('Router.push also failed:', routerError)
      // 最后备用方案：直接使用 window.location
      window.location.href = `/products/${id}`
    }
  }
}

// 重置筛选
const resetFilters = () => {
  selectedCategory.value = 'all'
  selectedBrand.value = 'all'
  priceRange.value = ''
  sortBy.value = ''
  searchTerm.value = ''
  fetchProducts()
}

// 页面元数据
useHead({
  title: '产品中心 - xlCig',
  meta: [
    { name: 'description', content: '浏览我们精选的PC硬件产品，包括显卡、CPU、主板等' }
  ]
})
</script>

<style scoped>
/* 产品列表图片容器 */
.product-list-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 深色主题产品列表Placeholder样式 */
.product-list-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: linear-gradient(135deg, 
    rgba(0, 245, 255, 0.1) 0%, 
    rgba(0, 128, 255, 0.1) 50%, 
    rgba(168, 85, 247, 0.1) 100%);
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 产品图标包装器 */
.product-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 产品图标 */
.product-icon {
  font-size: 4rem;
  text-shadow: 0 0 25px currentColor;
  animation: hardwareIconPulse 3s ease-in-out infinite;
  position: relative;
  z-index: 2;
}

/* 产品图标光晕效果 */
.product-icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, currentColor 0%, transparent 70%);
  opacity: 0.3;
  border-radius: 50%;
  animation: iconGlowPulse 3s ease-in-out infinite;
  z-index: 1;
}

/* 科技图案背景 */
.product-tech-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(0, 245, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
    linear-gradient(45deg, transparent 40%, rgba(0, 245, 255, 0.05) 50%, transparent 60%);
  animation: techPatternMove 8s linear infinite;
}

.product-category-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 15px rgba(0, 245, 255, 0.8);
  letter-spacing: 0.05em;
  opacity: 0.95;
  position: relative;
  z-index: 3;
}

/* 硬件图标动画 */
@keyframes hardwareIconPulse {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    filter: drop-shadow(0 0 20px currentColor);
  }
  25% {
    transform: scale(1.05) rotate(1deg);
    filter: drop-shadow(0 0 30px currentColor);
  }
  50% {
    transform: scale(1.1) rotate(0deg);
    filter: drop-shadow(0 0 25px currentColor);
  }
  75% {
    transform: scale(1.05) rotate(-1deg);
    filter: drop-shadow(0 0 30px currentColor);
  }
}

/* 图标光晕动画 */
@keyframes iconGlowPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.4;
  }
}

/* 科技图案移动动画 */
@keyframes techPatternMove {
  0% {
    background-position: 0% 0%, 0% 0%, 0% 0%;
  }
  100% {
    background-position: 100% 100%, -100% -100%, 100% 100%;
  }
}

/* 玻璃卡片增强效果 */
.glass-card-enhanced {
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.glass-card-enhanced:hover {
  background: rgba(17, 24, 39, 0.7);
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* 渐变文字效果 */
.gradient-text {
  background: linear-gradient(135deg, #00f5ff 0%, #0080ff 50%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(17, 24, 39, 0.8);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #00f5ff, #0080ff);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #0080ff, #a855f7);
}

/* 行高限制 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-icon {
    font-size: 3rem;
  }
  
  .product-icon-glow {
    width: 80px;
    height: 80px;
  }
  
  .product-category-name {
    font-size: 0.9rem;
  }
  
  .glass-card-enhanced {
    backdrop-filter: blur(15px);
  }
}

@media (max-width: 640px) {
  .product-icon {
    font-size: 2.5rem;
  }
  
  .product-icon-glow {
    width: 60px;
    height: 60px;
  }
  
  .product-category-name {
    font-size: 0.8rem;
  }
}

/* 慢速旋转动画 */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 15s linear infinite;
}

/* 特殊效果增强 */
.hover-glow {
  transition: all 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.4),
    0 0 40px rgba(59, 130, 246, 0.2),
    0 0 60px rgba(59, 130, 246, 0.1);
}

/* 按钮悬停效果 */
.btn-glow {
  position: relative;
  overflow: hidden;
}

.btn-glow::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-glow:hover::before {
  left: 100%;
}

/* 粘性定位优化 */
.sticky {
  position: -webkit-sticky;
  position: sticky;
}

/* 文字选择样式 */
::selection {
  background: rgba(59, 130, 246, 0.3);
  color: white;
}

::-moz-selection {
  background: rgba(59, 130, 246, 0.3);
  color: white;
}
</style> 