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
              
              <!-- 帅气的返回按钮 -->
              <button 
                @click="goBack" 
                class="group relative inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
              >
                <!-- 按钮背景渐变和光效 -->
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-xl transition-all duration-300 group-hover:from-cyan-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30"></div>
                <div class="absolute inset-0 border-2 border-cyan-500/30 rounded-xl transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-400/25"></div>
                
                <!-- 动态粒子效果 -->
                <div class="absolute inset-0 rounded-xl overflow-hidden">
                  <div class="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="top: 20%; left: 15%; animation-delay: 0s;"></div>
                  <div class="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="top: 60%; left: 80%; animation-delay: 0.2s;"></div>
                  <div class="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="top: 80%; left: 30%; animation-delay: 0.4s;"></div>
                </div>
                
                <!-- 左侧箭头图标 -->
                <div class="relative flex items-center">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mr-3 transition-all duration-300 group-hover:from-cyan-400/40 group-hover:to-blue-400/40 group-hover:scale-110">
                    <i class="bi bi-arrow-left text-cyan-400 text-lg transition-all duration-300 group-hover:text-white group-hover:-translate-x-1"></i>
                  </div>
                  
                  <!-- 文字和副标题 -->
                  <div class="text-left">
                    <div class="text-white text-sm font-semibold transition-all duration-300 group-hover:text-cyan-100">返回</div>
                    <div class="text-gray-400 text-xs transition-all duration-300 group-hover:text-cyan-300">Back</div>
                  </div>
                </div>
                
                <!-- 右侧装饰线条 -->
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div class="flex flex-col space-y-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full transition-all duration-300 group-hover:w-8"></div>
                    <div class="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full transition-all duration-300 group-hover:w-6 delay-75"></div>
                    <div class="w-2 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full transition-all duration-300 group-hover:w-4 delay-150"></div>
                  </div>
                </div>
              </button>
            </div>
            <nav class="text-sm text-gray-400">
              <NuxtLink to="/" class="hover:text-cyan-400">首页</NuxtLink>
              <i class="bi bi-chevron-right mx-2 text-cyan-400"></i>
              <span class="text-white font-medium">我的订单</span>
            </nav>
          </div>
        </div>
      </div>
    </nav>

    <!-- 页面头部 -->
    <section class="relative z-10">
      <div class="container mx-auto px-6 py-8">
        <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                <i class="bi bi-bag-check text-cyan-400 text-3xl"></i>
                我的订单
              </h1>
              <p class="text-gray-300 text-lg">查看和管理您的订单历史</p>
            </div>
            <div class="text-right">
              <div class="text-3xl font-bold text-cyan-400">{{ orders.length }}</div>
              <div class="text-gray-400 text-sm">订单总数</div>
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
      <div v-if="loading" class="text-center py-16">
        <div class="inline-flex flex-col items-center glass-card-dark rounded-2xl border border-cyan-500/30 p-16 shadow-2xl shadow-cyan-500/20">
          <div class="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-8"></div>
          <p class="text-2xl font-medium text-white">正在加载您的订单...</p>
          <p class="text-gray-400 mt-2">请稍候</p>
        </div>
      </div>

      <div v-else-if="filteredOrders.length === 0" class="text-center py-16">
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
                      class="inline-flex items-center justify-center px-8 py-4 bg-cyan-600 text-white font-medium rounded-xl hover:bg-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
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
                <div>
                  <h3 class="text-xl font-bold text-white mb-1">订单 #{{ order.orderNumber }}</h3>
                  <p class="text-gray-400 text-sm">下单时间：{{ formatDate(order.createdAt) }}</p>
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
                <div class="text-2xl font-bold text-cyan-400">¥{{ (order.total * 7.2).toLocaleString() }}</div>
                <div class="text-gray-400 text-sm">{{ order.items.length }} 件商品</div>
              </div>
            </div>
          </div>

          <!-- 订单商品 -->
          <div class="p-8">
            <div class="space-y-4">
              <div v-for="item in order.items" :key="item.id" 
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
                  <h4 class="font-semibold text-white text-lg mb-1">{{ item.name }}</h4>
                  <p class="text-gray-400 text-sm mb-2">{{ item.brand }}</p>
                  <div class="flex items-center gap-4">
                    <span class="text-cyan-400 font-semibold">¥{{ (item.price * 7.2).toLocaleString() }}</span>
                    <span class="text-gray-400 text-sm">数量：{{ item.quantity }}</span>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
const loading = ref(true)
const selectedStatus = ref('all')
const showReviewForm = ref(false)
const reviewItem = ref(null)
const reviewRating = ref(5)
const reviewComment = ref('')

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

// 返回功能
const goBack = () => {
  window.history.back()
}

// 方法
const getOrderCountByStatus = (status) => {
  if (status === 'all') return orders.value.length
  return orders.value.filter(order => order.status === status).length
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

// 页面加载时获取订单数据
onMounted(async () => {
  loading.value = true
  try {
    const response = await ordersApi.getMyOrders()
    if (response.success && response.data) {
      orders.value = response.data.map(order => ({
        id: order.id,
        orderNumber: `ORD-${order.id.toString().padStart(8, '0')}`,
        createdAt: order.created_at,
        status: order.status,
        total: order.total_price,
        trackingNumber: null, // 数据库暂无此字段
        estimatedDelivery: null, // 数据库暂无此字段
        items: [
          {
            id: order.config?.id || order.id,
            name: order.config_name || '配置商品',
            brand: order.merchant_name || '未知商家',
            price: order.config_price || order.total_price / order.quantity,
            quantity: order.quantity,
            image: order.config_images && order.config_images.length > 0 ? order.config_images[0] : ''
          }
        ]
      }))
    } else {
      orders.value = []
    }
  } catch (error) {
    console.error('获取订单失败:', error)
    orders.value = []
  } finally {
    loading.value = false
  }
})

// 页面元数据
useHead({
  title: '我的订单 - xlCig',
  meta: [
    { name: 'description', content: '查看您的订单状态和历史记录' }
  ]
})
</script>

<style scoped>
/* 订单商品图片容器 */
.order-item-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 订单商品Placeholder样式 */
.order-item-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    rgba(0, 245, 255, 0.05) 0%, 
    rgba(0, 128, 255, 0.05) 50%, 
    rgba(168, 85, 247, 0.05) 100%);
}

.order-item-placeholder i {
  font-size: 1.25rem;
  text-shadow: 0 0 8px currentColor;
  animation: orderItemFloat 3s ease-in-out infinite;
}

/* 订单商品图标动画 */
@keyframes orderItemFloat {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 8px currentColor);
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 12px currentColor);
  }
}
</style> 