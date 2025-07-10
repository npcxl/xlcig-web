<template>
  <PageLoader 
    :is-page-loading="isPageLoading"
    :is-data-loading="isDataLoading"
    :has-error="hasError"
    :error-message="errorMessage"
    loading-title="正在加载订单数据..."
    loading-message="请稍候"
    @retry="reloadPage"
  >
    <!-- 页面内容 -->
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      <!-- 背景装饰效果 -->
      <div class="fixed inset-0 pointer-events-none">
        <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow"></div>
      </div>

      <!-- 导航栏 -->
      <AppHeader 
        :show-back-button="false"
        :show-nav-menu="false"
        :show-breadcrumb="true"
        :show-location="false"
        :show-search-button="false"
        :show-notification-button="false"
        :show-decorations="false"
        logo-size="medium"
        current-page-title="我的订单"
      />

      <!-- 页面头部 -->
      <section class="relative z-10">
        <div class="container mx-auto px-6 py-8">
          <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                  <i class="bi bi-bag-check text-cyan-400 text-3xl animate-bounce-gentle"></i>
                  我的订单
                </h1>
                <p class="text-gray-300 text-lg">查看和管理您的订单历史</p>
              </div>
              <div class="flex items-center gap-4">
                <!-- 批量操作按钮组 (只在有待支付订单时显示) -->
                <div v-if="pendingOrders.length > 0" class="flex items-center gap-2">
                  <button @click="toggleAllOrders"
                          :class="[
                            'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 border-2',
                            isAllSelected 
                              ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300' 
                              : 'border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-300'
                          ]">
                    <i :class="isAllSelected ? 'bi-check-square' : 'bi-square'" class="mr-2"></i>
                    {{ isAllSelected ? '取消全选' : '全选待支付' }}
                  </button>
                  
                  <button @click="quickPay"
                          :class="[
                            'px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2',
                            hasSelectedOrders 
                              ? 'bg-cyan-600 hover:bg-cyan-500 text-white' 
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          ]">
                    <i class="bi bi-credit-card"></i>
                    立即支付
                    <span v-if="hasSelectedOrders" class="text-xs bg-cyan-400 text-cyan-900 px-2 py-1 rounded-full">
                      {{ selectedOrders.size }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 订单筛选 -->
      <section class="relative z-10">
        <div class="container mx-auto px-6 py-4">
          <div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div class="flex flex-wrap items-center gap-4">
              <div class="flex items-center gap-2">
                <i class="bi bi-funnel text-cyan-400"></i>
                <span class="text-white font-medium">按状态筛选：</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <button v-for="status in orderStatuses" :key="status.value"
                        @click="selectedStatus = status.value"
                        :class="[
                          'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                          selectedStatus === status.value 
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' 
                            : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                        ]">
                  <i :class="status.icon" class="mr-2"></i>
                  {{ status.label }}
                  <span class="ml-2 text-xs opacity-75">({{ getOrderCountByStatus(status.value) }})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 订单列表 -->
      <main class="container mx-auto px-6 py-8 relative z-10">
        <div v-if="filteredOrders.length === 0" class="text-center py-16">
          <div class="glass-card-dark rounded-2xl border border-cyan-500/30 p-20 shadow-2xl shadow-cyan-500/20 max-w-lg mx-auto">
            <div class="text-8xl mb-8 text-cyan-400 opacity-50">
              <i class="bi bi-bag-x"></i>
            </div>
            <h3 class="text-3xl font-bold text-white mb-4">未找到订单</h3>
            <p class="text-gray-400 mb-8 text-lg">
              {{ selectedStatus === 'all' ? "您还没有下过任何订单" : `没有状态为"${getStatusLabel(selectedStatus)}"的订单` }}
            </p>
            <div class="space-y-4">
              <NuxtLink to="/products" 
                        class="inline-flex items-center justify-center px-8 py-3 bg-cyan-600 text-white font-medium rounded-xl hover:bg-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                <i class="bi bi-plus-circle mr-2"></i>
                开始购物
              </NuxtLink>
              <button v-if="selectedStatus !== 'all'" @click="selectedStatus = 'all'"
                      class="block w-full px-8 py-3 border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300">
                查看所有订单
              </button>
            </div>
          </div>
        </div>

        <div v-else class="space-y-6">
          <div v-for="order in filteredOrders" :key="order.id" 
               class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-colors duration-300">
            <!-- 订单头部 -->
            <div class="px-8 py-6 border-b border-gray-700/50 bg-gray-800/30">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <!-- 待支付订单的自定义多选框 -->
                  <div v-if="order.status === 'pending'" class="flex items-center">
                    <div @click="toggleOrderSelection(order.id)"
                         :class="[
                           'w-6 h-6 rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center',
                           selectedOrders.has(order.id) 
                             ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400' 
                             : 'border-gray-600 hover:border-cyan-500 text-transparent hover:text-cyan-500/50'
                         ]">
                      <i class="bi bi-check text-sm font-bold"></i>
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="text-xl font-bold text-white mb-1">订单 #{{ order.orderNumber || order.order_no || 'N/A' }}</h3>
                    <p class="text-gray-400 text-sm">下单时间：{{ formatDate(order.createdAt || order.created_at) }}</p>
                  </div>
                  <div :class="[
                    'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium',
                    getStatusStyle(order.status)
                  ]">
                    <i :class="getStatusIcon(order.status)" class="mr-2"></i>
                    {{ getStatusLabel(order.status) }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-cyan-400">¥{{ (order.total || 0).toLocaleString() }}</div>
                  <div class="text-gray-400 text-sm">{{ (order.items?.length || 1) }} 件商品</div>
                </div>
              </div>
            </div>

            <!-- 订单商品 -->
            <div class="p-8">
              <div class="space-y-4">
                <div v-for="item in (order.items || [])" :key="item.id" 
                     class="flex items-center gap-6 p-4 bg-gray-800/20 rounded-xl border border-gray-700/30">
                  <!-- 商品图片 -->
                  <div class="w-20 h-20 bg-gray-700/50 rounded-lg overflow-hidden">
                    <!-- 商品图片或placeholder -->
                    <div v-if="item.image" class="order-item-image-container">
                      <img :src="item.image" :alt="item.name" 
                           class="w-full h-full object-contain p-2"
                           @error="$event.target.style.display = 'none'">
                    </div>
                    <div v-else class="order-item-placeholder">
                      <i :class="getOrderItemIcon(item.name)"></i>
                    </div>
                  </div>
                  
                  <!-- 商品信息 -->
                  <div class="flex-1">
                    <h4 class="font-semibold text-white text-lg mb-1">{{ item.name || '未知商品' }}</h4>
                    <p class="text-gray-400 text-sm mb-2">{{ item.brand || '未知品牌' }}</p>
                    <div class="flex items-center gap-4">
                      <span class="text-cyan-400 font-semibold">¥{{ (item.price || 0).toLocaleString() }}</span>
                      <span class="text-gray-400 text-sm">数量：{{ item.quantity || 1 }}</span>
                    </div>
                  </div>

                  <!-- 商品操作 -->
                  <div class="flex flex-col gap-2">
                    <NuxtLink :to="`/products/${item.id}`"
                              class="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors duration-300 text-center">
                      查看商品
                    </NuxtLink>
                    <button v-if="order.status === 'delivered'" 
                            @click="showReviewModal(item)"
                            class="px-4 py-2 text-sm border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300">
                      写评价
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 订单操作 -->
            <div class="px-8 py-6 border-t border-gray-700/50 bg-gray-800/20">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <!-- 订单状态追踪 -->
                <div class="flex items-center gap-6">
                  <div class="flex items-center gap-3">
                    <i class="bi bi-truck text-cyan-400"></i>
                    <span class="text-white font-medium">物流单号：</span>
                    <span class="text-gray-400">{{ order.trackingNumber || '暂无' }}</span>
                  </div>
                  <div v-if="order.estimatedDelivery" class="flex items-center gap-3">
                    <i class="bi bi-calendar-event text-cyan-400"></i>
                    <span class="text-white font-medium">预计送达：</span>
                    <span class="text-gray-400">{{ formatDate(order.estimatedDelivery) }}</span>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex flex-wrap items-center gap-3">
                  <button @click="downloadInvoice(order)" 
                          class="px-4 py-2 text-sm border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <i class="bi bi-download"></i>
                    下载发票
                  </button>
                  <button v-if="order.status === 'pending' || order.status === 'processing'" 
                          @click="cancelOrder(order.id)"
                          class="px-4 py-2 text-sm border border-red-600 hover:border-red-500 text-red-300 hover:text-red-200 font-medium rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <i class="bi bi-x-circle"></i>
                    取消订单
                  </button>
                  <button v-if="order.status === 'delivered'" 
                          @click="reorderItems(order)"
                          class="px-4 py-2 text-sm bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <i class="bi bi-arrow-repeat"></i>
                    再次购买
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- 评价弹窗 -->
      <div v-if="showReviewForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-md w-full">
          <h3 class="text-2xl font-bold text-white mb-6">写商品评价</h3>
          <div v-if="reviewItem" class="mb-6">
            <div class="flex items-center gap-4 mb-4">
              <img :src="reviewItem.image" :alt="reviewItem.name" class="w-16 h-16 object-contain bg-gray-700/50 rounded-lg p-2">
              <div>
                <h4 class="font-semibold text-white">{{ reviewItem.name }}</h4>
                <p class="text-gray-400 text-sm">{{ reviewItem.brand }}</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-white mb-2">评分</label>
                <div class="flex gap-2">
                  <button v-for="star in 5" :key="star"
                          @click="reviewRating = star"
                          :class="star <= reviewRating ? 'text-yellow-400' : 'text-gray-600'"
                          class="text-2xl hover:text-yellow-400 transition-colors duration-200">
                    <i class="bi bi-star-fill"></i>
                  </button>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-white mb-2">评价内容</label>
                <textarea v-model="reviewComment" 
                          rows="4" placeholder="分享您对这个产品的使用体验..."
                          class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none"></textarea>
              </div>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button @click="submitReview" 
                    class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
              提交评价
            </button>
            <button @click="closeReviewModal" 
                    class="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
              取消
            </button>
          </div>
        </div>
      </div>

      <!-- 批量支付弹窗 -->
      <div v-if="showBatchPayment" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar-dark">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-white flex items-center gap-3">
              <i class="bi bi-credit-card text-cyan-400"></i>
              批量支付
            </h3>
            <button @click="showBatchPayment = false" class="text-gray-400 hover:text-white">
              <i class="bi bi-x-lg text-2xl"></i>
            </button>
          </div>

          <!-- 选中订单列表 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-white mb-4">选中的订单</h4>
                          <div class="space-y-3 max-h-60 overflow-y-auto custom-scrollbar-dark">
              <div v-for="order in pendingOrders.filter(o => selectedOrders.has(o.id))" :key="order.id"
                   class="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <div>
                  <h5 class="font-semibold text-white">订单 #{{ order.orderNumber || order.order_no }}</h5>
                  <p class="text-gray-400 text-sm">{{ (order.items?.length || 1) }} 件商品</p>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold text-cyan-400">¥{{ (order.total || 0).toLocaleString() }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 支付摘要 -->
          <div class="border-t border-gray-700/50 pt-6 mb-6">
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-300">订单数量</span>
                <span class="text-white font-semibold">{{ selectedOrders.size }} 个</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">商品总价</span>
                <span class="text-white font-semibold">¥{{ selectedOrdersTotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between items-center border-t border-gray-700/50 pt-3">
                <span class="text-xl font-semibold text-white">支付总额</span>
                <span class="text-2xl font-bold text-cyan-400">¥{{ selectedOrdersTotal.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- 支付方式选择 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-white mb-4">选择支付方式</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button @click="selectedPaymentMethod = 'card'"
                      :class="[
                        'p-4 border-2 rounded-lg transition-all duration-300 text-center',
                        selectedPaymentMethod === 'card' 
                          ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300' 
                          : 'border-gray-600/50 hover:border-cyan-500/50 text-gray-300 hover:text-white'
                      ]">
                <i class="bi bi-credit-card text-2xl mb-2"></i>
                <div class="font-semibold">银行卡支付</div>
                <div class="text-xs opacity-75 mt-1">支持各大银行卡</div>
              </button>
              
              <button @click="selectedPaymentMethod = 'alipay'"
                      :class="[
                        'p-4 border-2 rounded-lg transition-all duration-300 text-center',
                        selectedPaymentMethod === 'alipay' 
                          ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300' 
                          : 'border-gray-600/50 hover:border-cyan-500/50 text-gray-300 hover:text-white'
                      ]">
                <i class="bi bi-wallet2 text-2xl mb-2"></i>
                <div class="font-semibold">支付宝</div>
                <div class="text-xs opacity-75 mt-1">安全便捷支付</div>
              </button>
              
              <button @click="selectedPaymentMethod = 'wechat'"
                      :class="[
                        'p-4 border-2 rounded-lg transition-all duration-300 text-center',
                        selectedPaymentMethod === 'wechat' 
                          ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300' 
                          : 'border-gray-600/50 hover:border-cyan-500/50 text-gray-300 hover:text-white'
                      ]">
                <i class="bi bi-wechat text-2xl mb-2"></i>
                <div class="font-semibold">微信支付</div>
                <div class="text-xs opacity-75 mt-1">微信扫码支付</div>
              </button>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex gap-4">
            <button @click="showBatchPayment = false"
                    :disabled="isProcessingPayment"
                    class="flex-1 px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              取消
            </button>
            <button @click="processBatchPayment"
                    :disabled="isProcessingPayment"
                    class="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2">
              <div v-if="isProcessingPayment" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <i v-else class="bi bi-credit-card"></i>
              {{ isProcessingPayment ? '支付中...' : `确认支付 ¥${selectedOrdersTotal.toLocaleString()}` }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </PageLoader>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePageLoader, pageLoaderPresets } from '../composables/usePageLoader'
import { createDiscreteApi } from 'naive-ui'
import { ordersApi } from '~/utils/api/orders'

// 创建消息API
const { message } = createDiscreteApi(['message'])

// 消息函数
const success = (content) => {
  message.success(content, { duration: 3000 })
}

const error = (content) => {
  message.error(content, { duration: 4000 })
}

const info = (content) => {
  message.info(content, { duration: 3000 })
}

// 响应式数据
const orders = ref([])
const selectedStatus = ref('all')
const showReviewForm = ref(false)
const reviewItem = ref(null)
const reviewRating = ref(5)
const reviewComment = ref('')

// 批量支付相关
const selectedOrders = ref(new Set())
const showBatchPayment = ref(false)
const selectedPaymentMethod = ref('card')
const isProcessingPayment = ref(false)

// 获取订单数据
const fetchOrders = async () => {
  try {
    const response = await ordersApi.getMyOrders()
    if (response.success && response.data) {
      // 处理后端数据，转换为前端期望的格式
      const processedOrders = response.data.map(order => {
        // 解析收货地址（如果是JSON字符串）
        let shippingAddress = order.shipping_address
        if (typeof shippingAddress === 'string') {
          try {
            shippingAddress = JSON.parse(shippingAddress)
          } catch (e) {
            console.warn('解析收货地址失败:', e)
            shippingAddress = {}
          }
        }

        // 构造单个订单的商品信息
        const items = [{
          id: order.config_id || order.product_id || order.id,
          name: order.config_name || '未知商品',
          brand: '品牌',
          price: Number(order.unit_price || 0),
          quantity: Number(order.quantity || 1),
          image: null, // 暂时没有图片
          product_id: order.config_id || order.product_id
        }]

        return {
          ...order,
          // 添加前端兼容字段，确保数字类型
          orderNumber: order.order_no,
          total: Number(order.final_price || order.total_price || 0),
          createdAt: order.created_at,
          items: items,
          shippingAddress: shippingAddress
        }
      })
      
      orders.value = processedOrders
      return processedOrders
    } else {
      orders.value = []
      return []
    }
  } catch (error) {
    console.error('获取订单失败:', error)
    throw new Error('获取订单数据失败')
  }
}

// 使用页面加载器
const {
  isPageLoading,
  isDataLoading,
  isPageReady,
  hasError,
  errorMessage,
  reloadPage,
  setLoading,
  setError,
  clearError
} = usePageLoader({
  ...pageLoaderPresets.standard,
  cacheKey: 'orders',
  loadFunction: fetchOrders,
  onPageReady: (cachedData) => {
    // 如果有缓存数据，恢复到响应式变量中
    if (cachedData) {
      orders.value = cachedData
    }
  }
})

// 订单状态列表
const orderStatuses = ref([
  { value: 'all', label: '全部订单', icon: 'bi-list-ul' },
  { value: 'pending', label: '待支付', icon: 'bi-clock' },
  { value: 'processing', label: '处理中', icon: 'bi-gear' },
  { value: 'shipped', label: '已发货', icon: 'bi-truck' },
  { value: 'delivered', label: '已送达', icon: 'bi-check-circle' },
  { value: 'cancelled', label: '已取消', icon: 'bi-x-circle' }
])

// 计算属性
const filteredOrders = computed(() => {
  if (selectedStatus.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === selectedStatus.value)
})

// 待支付订单
const pendingOrders = computed(() => {
  return orders.value.filter(order => order.status === 'pending')
})

// 选中的待支付订单总价
const selectedOrdersTotal = computed(() => {
  let total = 0
  pendingOrders.value.forEach(order => {
    if (selectedOrders.value.has(order.id)) {
      // 确保转换为数字进行计算
      const orderTotal = Number(order.total || order.final_price || 0)
      total += orderTotal
    }
  })
  return Math.round(total * 100) / 100 // 保留两位小数
})

// 是否有选中的订单
const hasSelectedOrders = computed(() => {
  return selectedOrders.value.size > 0
})

// 是否全选
const isAllSelected = computed(() => {
  return pendingOrders.value.length > 0 && 
         pendingOrders.value.every(order => selectedOrders.value.has(order.id))
})

// 方法
const getOrderCountByStatus = (status) => {
  if (status === 'all') return orders.value.length
  return orders.value.filter(order => order.status === status).length
}

// 批量支付相关方法
const toggleOrderSelection = (orderId) => {
  if (selectedOrders.value.has(orderId)) {
    selectedOrders.value.delete(orderId)
  } else {
    selectedOrders.value.add(orderId)
  }
  // 触发响应式更新
  selectedOrders.value = new Set(selectedOrders.value)
}

const toggleAllOrders = () => {
  if (isAllSelected.value) {
    // 取消全选
    selectedOrders.value.clear()
  } else {
    // 全选待支付订单
    pendingOrders.value.forEach(order => {
      selectedOrders.value.add(order.id)
    })
  }
  selectedOrders.value = new Set(selectedOrders.value)
}

const clearSelection = () => {
  selectedOrders.value.clear()
  selectedOrders.value = new Set(selectedOrders.value)
}

const batchPayment = () => {
  if (!hasSelectedOrders.value) {
    error('请先选择要支付的订单')
    return
  }
  
  const selectedOrderIds = Array.from(selectedOrders.value)
  console.log('批量支付订单ID:', selectedOrderIds)
  console.log('支付总金额:', selectedOrdersTotal.value)
  
  // 这里应该跳转到支付页面或打开支付弹窗
  showBatchPayment.value = true
}

const quickPay = () => {
  if (!hasSelectedOrders.value) {
    error('请先选择要支付的订单！')
    return
  }
  
  console.log('快速支付订单ID:', Array.from(selectedOrders.value))
  console.log('支付总金额:', selectedOrdersTotal.value)
  
  // 打开支付选择弹窗
  showBatchPayment.value = true
}

const processBatchPayment = async () => {
  try {
    isProcessingPayment.value = true
    const selectedOrderIds = Array.from(selectedOrders.value)
    
    // 获取支付方式中文名
    const paymentMethods = {
      'card': '银行卡',
      'alipay': '支付宝',
      'wechat': '微信支付'
    }
    
    // 显示支付处理信息
    console.log('正在处理批量支付...', {
      orderIds: selectedOrderIds,
      totalAmount: selectedOrdersTotal.value,
      orderCount: selectedOrders.value.size,
      paymentMethod: paymentMethods[selectedPaymentMethod.value]
    })
    
    info(`正在使用${paymentMethods[selectedPaymentMethod.value]}支付 ¥${selectedOrdersTotal.value.toLocaleString()}...`)
    
    // 这里应该调用支付API
    // const paymentResult = await paymentApi.batchPay({
    //   orderIds: selectedOrderIds,
    //   amount: selectedOrdersTotal.value,
    //   paymentMethod: selectedPaymentMethod.value
    // })
    
    // 模拟支付处理时间
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 更新订单状态为已支付
    selectedOrderIds.forEach(orderId => {
      const orderIndex = orders.value.findIndex(order => order.id === orderId)
      if (orderIndex > -1) {
        orders.value[orderIndex].status = 'paid'
      }
    })
    
    // 清空选择并关闭弹窗
    clearSelection()
    showBatchPayment.value = false
    
    success(`${paymentMethods[selectedPaymentMethod.value]}支付成功！共支付 ${selectedOrderIds.length} 个订单，总金额 ¥${selectedOrdersTotal.value.toLocaleString()}`)
    
  } catch (error) {
    console.error('批量支付失败:', error)
    error('支付失败，请重试')
  } finally {
    isProcessingPayment.value = false
  }
}

const getStatusLabel = (status) => {
  const statusObj = orderStatuses.value.find(s => s.value === status)
  return statusObj?.label || status
}

const getStatusIcon = (status) => {
  const statusObj = orderStatuses.value.find(s => s.value === status)
  return statusObj?.icon || 'bi-circle'
}

const getStatusStyle = (status) => {
  const styles = {
    pending: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    processing: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    shipped: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    delivered: 'bg-green-500/20 text-green-300 border border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-300 border border-red-500/30'
  }
  return styles[status] || 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const showReviewModal = (item) => {
  reviewItem.value = item
  reviewRating.value = 5
  reviewComment.value = ''
  showReviewForm.value = true
}

const closeReviewModal = () => {
  showReviewForm.value = false
  reviewItem.value = null
  reviewRating.value = 5
  reviewComment.value = ''
}

const submitReview = () => {
  // 提交评价逻辑
  console.log('提交评价:', {
    item: reviewItem.value,
    rating: reviewRating.value,
    comment: reviewComment.value
  })
  
  success('感谢您的评价！')
  closeReviewModal()
}

const downloadInvoice = (order) => {
  // 下载发票逻辑
  console.log('下载订单发票:', order.orderNumber)
  success('发票下载已开始！')
}

const cancelOrder = async (orderId) => {
  if (confirm('您确定要取消这个订单吗？')) {
    try {
      const response = await ordersApi.cancelOrder(orderId)
      if (response.success) {
        // 更新本地订单状态
        const orderIndex = orders.value.findIndex(order => order.id === orderId)
        if (orderIndex > -1) {
          orders.value[orderIndex].status = 'cancelled'
        }
        success('订单取消成功！')
      } else {
        error(response.message || '取消订单失败，请重试。')
      }
    } catch (error) {
      console.error('取消订单失败:', error)
      error('取消订单失败，请重试。')
    }
  }
}

const reorderItems = (order) => {
  // 重新下单逻辑
  try {
    // 检查订单是否有商品
    if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
      error('该订单没有商品信息，无法重新下单。')
      return
    }
    
    // 将商品添加到购物车
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    
    order.items.forEach(item => {
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id)
      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += item.quantity
      } else {
        cartItems.push({ ...item })
      }
    })
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    
    // 跳转到结账页面
    navigateTo('/checkout')
  } catch (error) {
    console.error('重新下单失败:', error)
    error('重新下单失败，请重试。')
  }
}

// 获取订单商品图标
const getOrderItemIcon = (itemName) => {
  if (itemName.includes('RTX') || itemName.includes('RX') || itemName.includes('显卡')) {
    return 'bi bi-gpu-card text-cyan-400 text-xl'
  }
  if (itemName.includes('Intel') || itemName.includes('AMD') || itemName.includes('Ryzen') || itemName.includes('Core')) {
    return 'bi bi-cpu text-orange-400 text-xl'
  }
  if (itemName.includes('主板') || itemName.includes('STRIX') || itemName.includes('MAG')) {
    return 'bi bi-motherboard text-green-400 text-xl'
  }
  if (itemName.includes('电源') || itemName.includes('PSU') || itemName.includes('Power')) {
    return 'bi bi-lightning text-yellow-400 text-xl'
  }
  return 'bi bi-pc-display text-gray-400 text-xl'
}
</script>

<style scoped>
.glass-card-dark {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.order-item-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%);
}

.order-item-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%);
  color: #9CA3AF;
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