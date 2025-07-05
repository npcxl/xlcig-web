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
            <div class="flex items-center space-x-6">
              <!-- Logo -->
              <AppLogo size="medium" :show-decorations="false" />
              <div class="h-6 w-px bg-gray-600"></div>
              <button @click="$router.go(-1)" 
                      class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                <i class="bi bi-arrow-left mr-2 text-lg"></i>
                <span class="text-sm font-medium">返回</span>
              </button>
            </div>
            <nav class="text-sm text-gray-400">
              <NuxtLink to="/" class="hover:text-cyan-400">首页</NuxtLink>
              <i class="bi bi-chevron-right mx-2 text-cyan-400"></i>
              <NuxtLink to="/products" class="hover:text-cyan-400">产品中心</NuxtLink>
              <i class="bi bi-chevron-right mx-2 text-cyan-400"></i>
              <span class="text-white font-medium">{{ product?.name || '产品详情' }}</span>
            </nav>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <div class="container mx-auto px-6 py-8 relative z-10" v-if="product && !loading && !error">
      <div class="grid lg:grid-cols-2 gap-12 mb-12">
        <!-- 左侧：产品图片和特性 -->
        <div class="space-y-6">
          <!-- 增强主图片展示 -->
          <div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 overflow-hidden backdrop-blur-xl">
            <div class="relative h-96 bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6">
              <!-- 产品图片或placeholder -->
              <div v-if="product.image" class="product-image-container">
                <img :src="product.image" :alt="product.name" 
                     class="w-full h-full object-contain transition-all duration-500 hover:scale-105 filter drop-shadow-2xl"
                     @error="$event.target.style.display = 'none'">
              </div>
              <div v-else class="product-placeholder">
                <div class="product-icon-wrapper">
                  <i class="bi bi-cpu product-icon"></i>
                  <div class="product-icon-glow"></div>
                </div>
                <span class="product-placeholder-text">{{ product.name }}</span>
                <div class="product-tech-pattern"></div>
              </div>
              
              <!-- 增强折扣标签 -->
              <div v-if="product.originalPrice && product.originalPrice > product.price" 
                   class="absolute top-4 left-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-red-500/40 animate-pulse">
                <i class="bi bi-lightning-fill mr-1"></i>
                省 ¥{{ (product.originalPrice - product.price).toLocaleString() }}
              </div>

              <!-- 增强库存状态 -->
              <div class="absolute top-4 right-4">
                <span v-if="!product.inStock" 
                      class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-red-500/30 text-red-200 border border-red-400/50 shadow-lg shadow-red-500/30 backdrop-blur-sm">
                  <i class="bi bi-x-circle-fill mr-2 text-red-300"></i>缺货
                </span>
                <span v-else-if="product.stockCount <= 5" 
                      class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-orange-500/30 text-orange-200 border border-orange-400/50 shadow-lg shadow-orange-500/30 backdrop-blur-sm animate-pulse">
                  <i class="bi bi-exclamation-triangle-fill mr-2 text-orange-300"></i>仅剩 {{ product.stockCount }} 件
                </span>
                <span v-else 
                      class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/30 backdrop-blur-sm">
                  <i class="bi bi-check-circle-fill mr-2 text-emerald-300"></i>现货充足
                </span>
              </div>

              <!-- 产品类型标识 -->
              <div class="absolute bottom-4 left-4">
                <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-sm">
                  <i class="bi bi-bookmark-fill mr-1"></i>
                  {{ getProductCategory(product.category) }}
                </span>
              </div>
            </div>
          </div>

          <!-- 增强产品特性 -->
          <div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl">
            <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div class="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg">
                <i class="bi bi-stars text-white"></i>
              </div>
              <span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">核心特性</span>
            </h3>
            <div class="grid grid-cols-1 gap-4" v-if="product.features && product.features.length > 0">
              <div v-for="(feature, index) in product.features" :key="feature"
                   class="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm"
                   :style="{ 'animation-delay': `${index * 100}ms` }">
                <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i class="bi bi-check text-white text-sm font-bold"></i>
                </div>
                <span class="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300">{{ feature }}</span>
              </div>
            </div>
            <div v-else class="text-gray-400 text-center py-8">
              <i class="bi bi-info-circle text-3xl mb-2"></i>
              <p>暂无特性信息</p>
            </div>
          </div>
        </div>

        <!-- 右侧：产品信息和购买 -->
        <div class="space-y-6">
          <!-- 增强基本信息 -->
          <div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl">
            <!-- 品牌和收藏 -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-4">
                <span class="inline-flex items-center px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border border-cyan-400/40 shadow-lg backdrop-blur-sm">
                  <i class="bi bi-award mr-2"></i>
                  {{ product.brand }}
                </span>
                <div class="flex items-center gap-2 text-sm text-gray-400">
                  <i class="bi bi-eye text-cyan-400"></i>
                  <span>{{ product.viewCount || 1234 }} 次浏览</span>
                </div>
              </div>
              <button @click="toggleFavorite" 
                      :class="[
                        'p-3 rounded-xl border transition-all duration-300 group relative overflow-hidden',
                        isFavorite 
                          ? 'bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400/50 text-red-300 shadow-lg shadow-red-500/30' 
                          : 'border-gray-600/50 text-gray-400 hover:border-red-400/50 hover:text-red-300 hover:bg-red-500/10'
                      ]">
                <i :class="isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'" 
                   class="text-xl relative z-10 group-hover:scale-110 transition-transform duration-300"></i>
                <div class="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <!-- 产品名称 -->
            <h1 class="text-4xl font-bold text-white mb-4 leading-tight">
              <span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
                {{ product.name }}
              </span>
            </h1>

            <!-- 产品型号和SKU -->
            <div class="flex items-center gap-4 mb-6 text-gray-400">
              <span v-if="product.model" class="text-sm">
                <i class="bi bi-tag mr-1"></i>
                型号: {{ product.model }}
              </span>
              <span v-if="product.sku" class="text-sm">
                <i class="bi bi-upc mr-1"></i>
                SKU: {{ product.sku }}
              </span>
            </div>

            <!-- 增强评分展示 -->
            <div class="flex items-center gap-6 mb-8 p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 backdrop-blur-sm">
              <div class="flex items-center gap-3">
                <div class="flex">
                  <i v-for="i in 5" :key="i" 
                     :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-600'"
                     class="bi bi-star-fill text-xl drop-shadow-lg"></i>
                </div>
                <span class="text-2xl font-bold text-white">{{ product.rating }}</span>
              </div>
              <div class="h-8 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
              <div class="flex items-center gap-2 text-gray-300">
                <i class="bi bi-chat-dots text-cyan-400"></i>
                <span>{{ product.reviewCount }} 条评价</span>
              </div>
              <div class="flex items-center gap-2 text-gray-300">
                <i class="bi bi-truck text-green-400"></i>
                <span>免费配送</span>
              </div>
              <div class="flex items-center gap-2 text-gray-300">
                <i class="bi bi-graph-up text-purple-400"></i>
                <span>销量 {{ product.sales }}</span>
              </div>
            </div>

            <!-- 增强价格展示 -->
            <div class="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
              <div class="flex items-end gap-4 mb-3">
                <span class="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  ¥{{ product.price.toLocaleString() }}
                </span>
                <span v-if="product.originalPrice && product.originalPrice > product.price" 
                      class="text-2xl text-gray-500 line-through mb-2">
                  ¥{{ product.originalPrice.toLocaleString() }}
                </span>
                <span v-if="product.originalPrice && product.originalPrice > product.price"
                      class="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium border border-red-400/30 mb-2">
                  省{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
                </span>
              </div>
              <p class="text-gray-300 leading-relaxed">{{ product.description }}</p>
            </div>

            <!-- 数量选择 - 深色主题 -->
            <div class="mb-8">
              <label class="block text-sm font-bold text-white mb-4 flex items-center gap-2">
                <i class="bi bi-123 text-cyan-400"></i>
                购买数量
              </label>
              <div class="flex items-center gap-6">
                <div class="flex items-center border border-gray-600/50 rounded-xl bg-gray-800/30 backdrop-blur-sm">
                  <button @click="decreaseQuantity" 
                          class="px-5 py-3 text-white hover:bg-cyan-500/20 hover:text-cyan-300 rounded-l-xl transition-all duration-300 border-r border-gray-600/50">
                    <i class="bi bi-dash-lg text-lg font-bold"></i>
                  </button>
                  <span class="px-8 py-3 text-white font-bold text-lg min-w-[80px] text-center bg-gray-700/30">{{ quantity }}</span>
                  <button @click="increaseQuantity" 
                          class="px-5 py-3 text-white hover:bg-cyan-500/20 hover:text-cyan-300 rounded-r-xl transition-all duration-300 border-l border-gray-600/50">
                    <i class="bi bi-plus-lg text-lg font-bold"></i>
                  </button>
                </div>
                <div class="flex items-center gap-2 text-gray-300 bg-gray-800/30 px-4 py-2 rounded-lg border border-gray-600/30 backdrop-blur-sm">
                  <i class="bi bi-box text-green-400"></i>
                  <span>库存：<span class="text-green-400 font-bold">{{ product.stockCount }}</span> 件</span>
                </div>
              </div>
            </div>

            <!-- 购买按钮 - 增强版 -->
            <div class="space-y-4 mb-8">
              <button @click="addToCart" 
                      :disabled="!product.inStock || showSuccessMessage"
                      data-add-to-cart
                      class="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <i class="bi bi-cart-plus text-xl"></i>
                <span>{{ product.inStock ? '加入购物车' : '暂时缺货' }}</span>
              </button>

              <button @click="buyNow" 
                      :disabled="!product.inStock"
                      class="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-500 hover:via-emerald-500 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <i class="bi bi-lightning-fill text-xl"></i>
                <span>立即购买</span>
              </button>
            </div>

            <!-- 保障信息 - 增强版 -->
            <div class="pt-6 border-t border-gray-700/50">
              <div class="grid grid-cols-3 gap-4 text-center">
                <div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group">
                  <div class="p-3 bg-green-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <i class="bi bi-truck text-2xl text-green-400"></i>
                  </div>
                  <span class="text-sm text-gray-300 font-medium">免费配送</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group">
                  <div class="p-3 bg-blue-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <i class="bi bi-shield-check text-2xl text-blue-400"></i>
                  </div>
                  <span class="text-sm text-gray-300 font-medium">两年保修</span>
                </div>
                <div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group">
                  <div class="p-3 bg-purple-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <i class="bi bi-arrow-repeat text-2xl text-purple-400"></i>
                  </div>
                  <span class="text-sm text-gray-300 font-medium">30天退换</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 详细规格 - 增强版 -->
      <div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 mb-12 backdrop-blur-xl">
        <h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-4">
          <div class="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg">
            <i class="bi bi-gear-fill text-white text-2xl"></i>
          </div>
          <span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">技术规格</span>
        </h2>
        <div v-if="product.specs && Object.keys(product.specs).length > 0" class="grid md:grid-cols-2 gap-6">
          <div v-for="(value, key) in product.specs" :key="key" 
               class="group flex justify-between items-center p-5 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm">
            <span class="text-gray-300 font-semibold text-lg">{{ translateSpecKey(key) }}</span>
            <span class="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors duration-300">{{ value }}</span>
          </div>
        </div>
        <div v-else class="text-gray-400 text-center py-8">
          <i class="bi bi-info-circle text-3xl mb-2"></i>
          <p>暂无规格信息</p>
        </div>
      </div>

      <!-- 用户评价 - 增强版 -->
      <div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl">
        <h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-4">
          <div class="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg">
            <i class="bi bi-chat-dots-fill text-white text-2xl"></i>
          </div>
          <span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">用户评价</span>
        </h2>
        
        <!-- 评价统计 - 增强版 -->
        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-400/30">
            <div class="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">{{ product.rating }}</div>
            <div class="flex justify-center mb-4">
              <i v-for="i in 5" :key="i" 
                 :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-600'"
                 class="bi bi-star-fill text-2xl drop-shadow-lg"></i>
            </div>
            <div class="text-gray-300 text-lg">基于 <span class="text-yellow-400 font-bold">{{ product.reviewCount }}</span> 条评价</div>
          </div>
          
          <div class="space-y-4">
            <div v-for="(count, rating) in ratingDistribution" :key="rating" 
                 class="flex items-center gap-4">
              <span class="text-white w-12 flex-shrink-0 font-bold">{{ rating }}星</span>
              <div class="flex-1 bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-gray-600/30">
                <div class="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-yellow-500/30" 
                     :style="{ width: `${Math.min((count / product.reviewCount) * 100, 100)}%` }"></div>
              </div>
              <span class="text-gray-400 w-16 text-sm flex-shrink-0 font-medium">{{ count }} 条</span>
            </div>
          </div>
        </div>

        <!-- 评价列表 - 增强版 -->
        <div class="space-y-6">
          <div v-for="review in reviews" :key="review.id" 
               class="p-6 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full flex items-center justify-center border border-cyan-400/40 shadow-lg">
                  <i class="bi bi-person-fill text-cyan-400 text-xl"></i>
                </div>
                <div>
                  <div class="font-bold text-white text-lg">{{ review.author }}</div>
                  <div class="text-sm text-gray-400">{{ formatDate(review.date) }}</div>
                </div>
              </div>
              <div class="flex gap-1">
                <i v-for="i in 5" :key="i" 
                   :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-600'"
                   class="bi bi-star-fill text-lg drop-shadow-lg"></i>
              </div>
            </div>
            <p class="text-gray-300 leading-relaxed text-lg">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误状态 - 深色主题 -->
    <div v-else-if="error && !loading" class="container mx-auto px-6 py-20 relative z-10">
      <div class="text-center">
        <div class="inline-flex flex-col items-center glass-card-enhanced rounded-2xl border border-red-400/40 p-16 shadow-2xl shadow-red-500/25 backdrop-blur-xl max-w-md mx-auto">
          <div class="text-8xl text-red-400 mb-8">
            <i class="bi bi-exclamation-triangle-fill"></i>
          </div>
          <h3 class="text-3xl font-bold text-white mb-4">加载失败</h3>
          <p class="text-gray-400 text-lg mb-8">{{ error }}</p>
          <div class="space-y-3 w-full">
            <button @click="loadProductDetail" 
                    class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
              <i class="bi bi-arrow-clockwise mr-2"></i>
              重新加载
            </button>
            <button @click="$router.go(-1)" 
                    class="w-full border border-gray-600/50 hover:border-cyan-400/50 text-gray-300 hover:text-white hover:bg-cyan-500/10 py-3 px-6 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm">
              返回上页
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 - 增强版 -->
    <div v-else-if="loading" class="container mx-auto px-6 py-20 relative z-10">
      <div class="text-center">
        <div class="inline-flex flex-col items-center glass-card-enhanced rounded-2xl border border-cyan-400/40 p-16 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl">
          <div class="relative mb-8">
            <div class="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-20 h-20 border-4 border-blue-500/30 rounded-full animate-pulse"></div>
          </div>
          <p class="text-3xl font-bold text-white mb-4">正在加载产品详情...</p>
          <p class="text-gray-400 text-lg">请稍候，正在为您获取最新信息</p>
        </div>
      </div>
    </div>

    <!-- 购买成功提示 - 增强版 -->
    <div v-if="showSuccessMessage" class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <!-- 撒花动画背景 -->
      <div class="confetti-container">
        <!-- 持续生成撒花 -->
        <div v-for="batch in confettiBatches" :key="batch.id">
          <div v-for="i in 30" :key="`${batch.id}-${i}`" 
               class="confetti-piece"
               :class="getConfettiShape(i)"
               :style="{
                 left: Math.random() * 100 + '%',
                 animationDelay: (Math.random() * 2 + batch.delay) + 's',
                 animationDuration: '3s',
                 backgroundColor: getConfettiColor(i + batch.id * 30),
                 width: (8 + Math.random() * 6) + 'px',
                 height: (8 + Math.random() * 6) + 'px'
               }"></div>
        </div>
      </div>
      
      <div class="glass-card-enhanced rounded-2xl border border-green-400/50 shadow-2xl shadow-green-500/30 p-10 max-w-md w-full text-center backdrop-blur-xl transform animate-bounce-in">
        <div class="text-8xl text-green-400 mb-8 relative">
          <i class="bi bi-check-circle-fill drop-shadow-2xl animate-check-bounce"></i>
          <div class="absolute inset-0 text-green-400/30 animate-ping-once">
            <i class="bi bi-check-circle-fill"></i>
          </div>
        </div>
        <h3 class="text-3xl font-bold text-white mb-6">已加入购物车！</h3>
        <p class="text-gray-300 mb-8 text-lg leading-relaxed">{{ product?.name }} 已成功添加到购物车。</p>
        <div class="space-y-4">
          <button @click="goToCheckout" 
                  class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform hover:scale-105">
            立即去结算
          </button>
          <button @click="hideSuccessMessage" 
                  class="w-full border border-gray-600/50 hover:border-green-400/50 text-gray-300 hover:text-white hover:bg-green-500/10 py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm">
            继续购物
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入路由参数
const route = useRoute()
const productId = parseInt(route.params.id)

// 导入API
import { productsApi, cartApi } from '~/utils/api'

// 响应式数据
const product = ref(null)
const quantity = ref(1)
const isFavorite = ref(false)
const showSuccessMessage = ref(false)
const loading = ref(true)
const error = ref(null)

// 撒花批次管理
const confettiBatches = ref([])
let confettiInterval = null

// 获取产品类别
const getProductCategory = (category) => {
  const categories = {
    graphics: '显卡',
    cpu: '处理器',
    motherboard: '主板',
    power: '电源',
    memory: '内存',
    storage: '存储',
    monitor: '显示器',
    case: '机箱',
    cooler: '散热器'
  }
  return categories[category] || '硬件'
}

// 评价分布数据
const ratingDistribution = ref({
  5: 856,
  4: 234,
  3: 98,
  2: 45,
  1: 23
})

// 用户评价数据
const reviews = ref([
  {
    id: 1,
    author: '王先生',
    rating: 5,
    date: '2024-01-15',
    comment: '性能绝对令人难以置信！这个硬件在各种应用下都表现出色。运行稳定，性价比很高。'
  },
  {
    id: 2,
    author: '李女士',
    rating: 5,
    date: '2024-01-10',
    comment: '非常适合专业工作和娱乐使用。质量很好，安装简单，效果显著。'
  },
  {
    id: 3,
    author: '张先生',
    rating: 4,
    date: '2024-01-05',
    comment: '很棒的产品，性能强劲。运行时有一些发热，需要注意散热，但总体性能非常满意！'
  }
])

// 获取产品详情
const loadProductDetail = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await productsApi.getProductById(productId)
    
    if (response.success && response.data) {
      const apiProduct = response.data
      
      // 转换API数据格式为页面所需格式
      product.value = {
        id: apiProduct.id,
        name: apiProduct.name,
        brand: apiProduct.brand,
        category: getCategoryFromId(apiProduct.category_id),
        price: parseFloat(apiProduct.price),
        originalPrice: apiProduct.original_price ? parseFloat(apiProduct.original_price) : null,
        rating: parseFloat(apiProduct.rating),
        reviewCount: parseInt(apiProduct.review_count),
        viewCount: apiProduct.sales * 12 + Math.floor(Math.random() * 1000), // 模拟浏览量
        image: apiProduct.images && apiProduct.images.length > 0 ? apiProduct.images[0] : '',
        images: apiProduct.images || [],
        inStock: apiProduct.stock > 0,
        stockCount: apiProduct.stock,
        description: apiProduct.description || apiProduct.short_description,
        specs: apiProduct.specifications || {},
        features: apiProduct.features || [],
        tags: apiProduct.tags || [],
        sales: apiProduct.sales,
        slug: apiProduct.slug,
        sku: apiProduct.sku,
        model: apiProduct.model
      }
      
      // 根据真实评价数量更新评价分布
      updateRatingDistribution(apiProduct.review_count, parseFloat(apiProduct.rating))
      
      // 检查收藏状态
      checkFavoriteStatus()
    } else {
      error.value = '产品不存在或已下架'
    }
  } catch (err) {
    console.error('获取产品详情失败:', err)
    error.value = '加载产品详情时出错，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 根据分类ID获取分类名称
const getCategoryFromId = (categoryId) => {
  const categoryMap = {
    1: 'cpu',
    2: 'motherboard',
    3: 'memory',
    4: 'graphics',
    5: 'storage',
    6: 'power',
    7: 'case',
    8: 'cooler',
    9: 'monitor'
  }
  return categoryMap[categoryId] || 'hardware'
}

// 根据评价数量和平均评分更新评价分布
const updateRatingDistribution = (totalReviews, avgRating) => {
  // 根据平均评分生成合理的评价分布
  const total = totalReviews
  const distribution = {
    5: Math.round(total * 0.6),
    4: Math.round(total * 0.25),
    3: Math.round(total * 0.1),
    2: Math.round(total * 0.03),
    1: Math.round(total * 0.02)
  }
  
  // 确保总数正确
  const sum = Object.values(distribution).reduce((a, b) => a + b, 0)
  if (sum !== total) {
    distribution[5] += total - sum
  }
  
  ratingDistribution.value = distribution
}

// 检查收藏状态
const checkFavoriteStatus = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  isFavorite.value = favorites.includes(productId)
}

// 方法
const increaseQuantity = () => {
  if (quantity.value < product.value?.stockCount) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const toggleFavorite = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  if (isFavorite.value) {
    const index = favorites.indexOf(productId)
    if (index > -1) favorites.splice(index, 1)
  } else {
    favorites.push(productId)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites))
  isFavorite.value = !isFavorite.value
}

// 动态添加到购物车
const addToCart = async () => {
  if (!product.value || !product.value.inStock || showSuccessMessage.value) return
  
  try {
    // 添加视觉反馈：按钮禁用状态
    const button = document.querySelector('[data-add-to-cart]')
    if (button) {
      button.disabled = true
      button.classList.add('opacity-50', 'cursor-not-allowed')
    }
    
    const cartData = {
      productId: product.value.id,
      quantity: quantity.value,
      specs: {
        name: product.value.name,
        model: product.value.model,
        sku: product.value.sku
      }
    }
    
    const response = await cartApi.addToCart(cartData)
    
    if (response.success) {
      showSuccessMessage.value = true
      playSuccessSound()
      
      // 同时更新本地存储作为备份
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
      const existingItem = cartItems.find(item => item.id === productId)
      
      if (existingItem) {
        existingItem.quantity += quantity.value
      } else {
        cartItems.push({
          ...product.value,
          quantity: quantity.value
        })
      }
      
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    } else {
      throw new Error(response.message || '添加到购物车失败')
    }
  } catch (err) {
    console.error('添加到购物车失败:', err)
    
    // 如果API失败，回退到本地存储
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    const existingItem = cartItems.find(item => item.id === productId)
    
    if (existingItem) {
      existingItem.quantity += quantity.value
    } else {
      cartItems.push({
        ...product.value,
        quantity: quantity.value
      })
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    showSuccessMessage.value = true
    playSuccessSound()
  } finally {
    // 恢复按钮状态
    setTimeout(() => {
      const button = document.querySelector('[data-add-to-cart]')
      if (button) {
        button.disabled = false
        button.classList.remove('opacity-50', 'cursor-not-allowed')
      }
    }, 1000)
  }
}

const buyNow = async () => {
  await addToCart()
  if (showSuccessMessage.value) {
    navigateTo('/checkout')
  }
}

const goToCheckout = () => {
  navigateTo('/checkout')
}

// 隐藏成功消息
const hideSuccessMessage = () => {
  showSuccessMessage.value = false
}

// 播放成功音效（可选）
const playSuccessSound = () => {
  try {
    // 创建Web Audio API音效
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2)
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  } catch (error) {
    // 音效播放失败时静默处理
    console.log('音效播放不支持或被禁用')
  }
}

// 监听成功消息状态，管理撒花动画
watch(showSuccessMessage, (newValue) => {
  if (newValue) {
    // 开始撒花动画
    startConfettiAnimation()
    
    // 撒花动画3秒后自动停止，但弹窗保持显示
    setTimeout(() => {
      stopConfettiAnimation()
    }, 3000)
  } else {
    // 停止撒花动画
    stopConfettiAnimation()
  }
})

// 开始撒花动画
const startConfettiAnimation = () => {
  confettiBatches.value = []
  let batchId = 0
  
  // 立即生成第一批撒花
  confettiBatches.value.push({
    id: batchId++,
    delay: 0
  })
  
  // 每0.5秒生成新的撒花批次，让动画更连续
  confettiInterval = setInterval(() => {
    confettiBatches.value.push({
      id: batchId++,
      delay: 0
    })
    
    // 保持最多6个批次，移除旧的批次
    if (confettiBatches.value.length > 6) {
      confettiBatches.value.shift()
    }
  }, 500)
}

// 停止撒花动画
const stopConfettiAnimation = () => {
  if (confettiInterval) {
    clearInterval(confettiInterval)
    confettiInterval = null
  }
  confettiBatches.value = []
}

// 获取撒花颜色
const getConfettiColor = (index) => {
  const colors = ['#00f5ff', '#0080ff', '#a855f7', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6']
  return colors[index % colors.length]
}

// 获取撒花形状
const getConfettiShape = (index) => {
  const shapes = ['confetti-circle', 'confetti-square', 'confetti-triangle']
  return shapes[index % shapes.length]
}

const translateSpecKey = (key) => {
  const translations = {
    'TDP': 'TDP功耗',
    '制程': '制程工艺', 
    '插槽': '接口插槽',
    '缓存': '缓存',
    'L2缓存': 'L2缓存',
    'L3缓存': 'L3缓存',
    '核心数': '核心数',
    '线程数': '线程数',
    '内存支持': '支持内存',
    '基础频率': '基础频率',
    '最大睿频': '最大睿频',
    '最大加速频率': '最大加速',
    '功耗': '功耗',
    '接口': '显示接口',
    '显存': '显存容量',
    '架构': '架构',
    'CUDA核心': 'CUDA核心',
    '加速频率': '加速频率',
    '显存位宽': '显存位宽',
    '流处理器': '流处理器',
    '游戏频率': '游戏频率',
    '容量': '容量',
    '散热': '散热方案',
    '时序': '时序',
    '电压': '工作电压',
    '质保': '质保期',
    '频率': '工作频率',
    '兼容性': '平台兼容'
  }
  return translations[key] || key
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// 页面加载时获取产品详情
onMounted(() => {
  loadProductDetail()
})

// 页面卸载时清理定时器
onUnmounted(() => {
  stopConfettiAnimation()
})

// 监听路由变化
watch(() => route.params.id, () => {
  const newProductId = parseInt(route.params.id)
  if (newProductId !== productId) {
    loadProductDetail()
  }
})

// 页面元数据
useHead({
  title: computed(() => product.value ? `${product.value.name} - xlCig` : '产品详情 - xlCig'),
  meta: [
    { name: 'description', content: computed(() => product.value?.description || '查看产品详细信息和技术规格') }
  ]
})
</script>

<style scoped>
/* 产品图片容器 */
.product-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 深色主题产品Placeholder样式 */
.product-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background: linear-gradient(135deg, 
    rgba(0, 245, 255, 0.15) 0%, 
    rgba(0, 128, 255, 0.15) 50%, 
    rgba(168, 85, 247, 0.15) 100%);
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
  font-size: 5rem;
  text-shadow: 0 0 30px currentColor;
  animation: hardwareIconPulse 4s ease-in-out infinite;
  position: relative;
  z-index: 3;
}

/* 产品图标光晕效果 */
.product-icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, currentColor 0%, transparent 70%);
  opacity: 0.4;
  border-radius: 50%;
  animation: iconGlowPulse 4s ease-in-out infinite;
  z-index: 1;
}

/* 科技图案背景 */
.product-tech-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(0, 245, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
    linear-gradient(45deg, transparent 40%, rgba(0, 245, 255, 0.08) 50%, transparent 60%),
    linear-gradient(-45deg, transparent 40%, rgba(168, 85, 247, 0.08) 50%, transparent 60%);
  animation: techPatternMove 12s linear infinite;
  z-index: 0;
}

.product-placeholder-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(0, 245, 255, 0.8);
  letter-spacing: 0.05em;
  opacity: 0.95;
  position: relative;
  z-index: 3;
  text-align: center;
  line-height: 1.4;
  max-width: 85%;
}

/* 硬件图标动画 */
@keyframes hardwareIconPulse {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    filter: drop-shadow(0 0 25px currentColor);
  }
  25% {
    transform: scale(1.08) rotate(2deg);
    filter: drop-shadow(0 0 35px currentColor);
  }
  50% {
    transform: scale(1.15) rotate(0deg);
    filter: drop-shadow(0 0 30px currentColor);
  }
  75% {
    transform: scale(1.08) rotate(-2deg);
    filter: drop-shadow(0 0 35px currentColor);
  }
}

/* 图标光晕动画 */
@keyframes iconGlowPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0.5;
  }
}

/* 科技图案移动动画 */
@keyframes techPatternMove {
  0% {
    background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
  25% {
    background-position: 25% 25%, -25% -25%, 25% 25%, -25% -25%;
  }
  50% {
    background-position: 50% 50%, -50% -50%, 50% 50%, -50% -50%;
  }
  75% {
    background-position: 75% 75%, -75% -75%, 75% 75%, -75% -75%;
  }
  100% {
    background-position: 100% 100%, -100% -100%, 100% 100%, -100% -100%;
  }
}

/* 玻璃卡片增强效果 */
.glass-card-enhanced {
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: all 0.4s ease;
}

.glass-card-enhanced:hover {
  background: rgba(17, 24, 39, 0.8);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.5),
    0 0 25px rgba(59, 130, 246, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}

/* 渐变文字效果 */
.gradient-text {
  background: linear-gradient(135deg, #00f5ff 0%, #0080ff 50%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* 按钮悬停光效 */
.btn-shine {
  position: relative;
  overflow: hidden;
}

.btn-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
  transition: left 0.6s;
  z-index: 1;
}

.btn-shine:hover::before {
  left: 100%;
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
  animation: spin-slow 20s linear infinite;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(17, 24, 39, 0.9);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #00f5ff, #0080ff);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #0080ff, #a855f7);
}

/* 特殊光效 */
.hover-glow {
  transition: all 0.4s ease;
}

.hover-glow:hover {
  box-shadow: 
    0 0 25px rgba(59, 130, 246, 0.5),
    0 0 50px rgba(59, 130, 246, 0.3),
    0 0 75px rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.6);
}

/* 脉冲动画 */
@keyframes pulse-soft {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

.animate-pulse-soft {
  animation: pulse-soft 2s ease-in-out infinite;
}

/* 文字选择样式 */
::selection {
  background: rgba(59, 130, 246, 0.4);
  color: white;
}

::-moz-selection {
  background: rgba(59, 130, 246, 0.4);
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-icon {
    font-size: 4rem;
  }
  
  .product-icon-glow {
    width: 120px;
    height: 120px;
  }
  
  .product-placeholder-text {
    font-size: 1.2rem;
    max-width: 90%;
  }
  
  .glass-card-enhanced {
    backdrop-filter: blur(20px);
  }
}

@media (max-width: 640px) {
  .product-icon {
    font-size: 3.5rem;
  }
  
  .product-icon-glow {
    width: 100px;
    height: 100px;
  }
  
  .product-placeholder-text {
    font-size: 1rem;
    max-width: 95%;
  }
  
  .glass-card-enhanced {
    backdrop-filter: blur(15px);
  }
}

/* 加载动画增强 */
.loading-spinner {
  position: relative;
}

.loading-spinner::after {
  content: '';
  position: absolute;
  inset: -4px;
  border: 2px solid transparent;
  border-top-color: rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: spin 2s linear infinite reverse;
}

/* 成功提示动画 */
@keyframes bounce-in {
  0% {
    transform: scale(0.3) rotate(-10deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) rotate(5deg);
  }
  70% {
    transform: scale(0.9) rotate(-2deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out;
}

/* 评星动画 */
.star-rating {
  display: inline-flex;
  gap: 2px;
}

.star-rating i {
  transition: all 0.3s ease;
}

.star-rating:hover i {
  transform: scale(1.1);
}

/* 进度条动画 */
.progress-bar {
  position: relative;
  overflow: hidden;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: progress-shine 2s ease-in-out infinite;
}

@keyframes progress-shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 撒花动画容器 */
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1000;
}

/* 撒花片段 */
.confetti-piece {
  position: absolute;
  width: 10px; /* 默认大小，会被内联样式覆盖 */
  height: 10px; /* 默认大小，会被内联样式覆盖 */
  top: -10px;
  animation: confettiFall 3s linear infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  will-change: transform, opacity;
}

/* 撒花形状 */
.confetti-circle {
  border-radius: 50%;
}

.confetti-square {
  border-radius: 2px;
}

.confetti-triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 12px solid;
  border-bottom-color: inherit;
  background: transparent !important;
}

/* 撒花掉落动画 */
@keyframes confettiFall {
  0% {
    transform: translateY(-100vh) rotate(0deg) translateX(0) scale(1);
    opacity: 1;
  }
  10% {
    transform: translateY(-80vh) rotate(90deg) translateX(30px) scale(1.1);
    opacity: 1;
  }
  25% {
    transform: translateY(-50vh) rotate(180deg) translateX(-20px) scale(0.9);
    opacity: 1;
  }
  40% {
    transform: translateY(-20vh) rotate(270deg) translateX(40px) scale(1.05);
    opacity: 0.9;
  }
  60% {
    transform: translateY(20vh) rotate(450deg) translateX(-30px) scale(0.95);
    opacity: 0.8;
  }
  80% {
    transform: translateY(60vh) rotate(630deg) translateX(25px) scale(1);
    opacity: 0.5;
  }
  100% {
    transform: translateY(110vh) rotate(720deg) translateX(0) scale(0.8);
    opacity: 0;
  }
}

/* 一次性弹跳动画 */
@keyframes bounce-in {
  0% {
    transform: scale(0.3) rotate(-5deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) rotate(2deg);
  }
  70% {
    transform: scale(0.95) rotate(-1deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out forwards;
}

/* 检查图标弹跳动画 */
@keyframes check-bounce {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-check-bounce {
  animation: check-bounce 0.6s ease-out;
}

/* 一次性ping动画 */
@keyframes ping-once {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping-once {
  animation: ping-once 1s cubic-bezier(0, 0, 0.2, 1) once;
}
</style> 