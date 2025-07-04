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
              <span class="text-white font-medium">购物车结算</span>
            </nav>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <div class="container mx-auto px-6 py-8 relative z-10">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- 左侧：购物车和表单 -->
        <div class="lg:col-span-2 space-y-8">
          <!-- 购物车商品 -->
          <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div class="px-8 py-6 border-b border-gray-700/50">
              <h2 class="text-3xl font-bold text-white flex items-center gap-3">
                <i class="bi bi-cart text-cyan-400"></i>
                购物车
              </h2>
              <p class="text-gray-300 mt-2">购物车中有 {{ cartItems.length }} 件商品</p>
            </div>
            
            <div class="p-8">
              <div v-if="cartItems.length === 0" class="text-center py-12">
                <div class="text-6xl mb-4 text-gray-500">
                  <i class="bi bi-cart-x"></i>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">购物车为空</h3>
                <p class="text-gray-400 mb-6">添加一些产品来继续购物</p>
                <NuxtLink to="/products" 
                          class="inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all duration-300">
                  <i class="bi bi-plus-circle mr-2"></i>
                  添加产品
                </NuxtLink>
              </div>

              <div v-else class="space-y-6">
                <div v-for="item in cartItems" :key="item.id" 
                     class="flex items-center gap-6 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 hover:border-cyan-500/50 transition-colors duration-300">
                  <!-- 产品图片 -->
                  <div class="w-24 h-24 bg-gray-700/50 rounded-lg overflow-hidden">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-contain p-2">
                  </div>
                  
                  <!-- 产品信息 -->
                  <div class="flex-1">
                    <h3 class="font-semibold text-white text-lg mb-1">{{ item.name }}</h3>
                    <p class="text-gray-400 text-sm mb-2">{{ item.brand }}</p>
                    <div class="flex items-center gap-4">
                      <span class="text-2xl font-bold text-cyan-400">¥{{ (item.price * 7.2).toLocaleString() }}</span>
                      <span v-if="item.originalPrice && item.originalPrice > item.price" 
                            class="text-sm text-gray-500 line-through">
                        ¥{{ (item.originalPrice * 7.2).toLocaleString() }}
                      </span>
                    </div>
                  </div>

                  <!-- 数量控制 -->
                  <div class="flex items-center gap-3">
                    <button @click="decreaseQuantity(item.id)" 
                            class="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200">
                      <i class="bi bi-dash"></i>
                    </button>
                    <span class="w-12 text-center text-white font-semibold text-lg">{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item.id)" 
                            class="w-10 h-10 flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>

                  <!-- 删除按钮 -->
                  <button @click="removeFromCart(item.id)" 
                          class="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-200">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 用户信息表单 -->
          <div v-if="cartItems.length > 0" class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div class="px-8 py-6 border-b border-gray-700/50">
              <h2 class="text-3xl font-bold text-white flex items-center gap-3">
                <i class="bi bi-person text-cyan-400"></i>
                客户信息
              </h2>
            </div>
            
            <div class="p-8">
              <form @submit.prevent="submitOrder" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">姓氏</label>
                    <input v-model="customerInfo.firstName" 
                           type="text" required placeholder="请输入姓氏"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">名字</label>
                    <input v-model="customerInfo.lastName" 
                           type="text" required placeholder="请输入名字"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-white mb-2">电子邮箱</label>
                  <input v-model="customerInfo.email" 
                         type="email" required placeholder="请输入邮箱地址"
                         class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                </div>

                <div>
                  <label class="block text-sm font-medium text-white mb-2">手机号码</label>
                  <input v-model="customerInfo.phone" 
                         type="tel" required placeholder="请输入手机号码"
                         class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                </div>

                <div>
                  <label class="block text-sm font-medium text-white mb-2">收货地址</label>
                  <textarea v-model="customerInfo.address" 
                            required rows="3" placeholder="请输入详细收货地址"
                            class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none"></textarea>
                </div>

                <div class="grid md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">城市</label>
                    <input v-model="customerInfo.city" 
                           type="text" required placeholder="请输入城市"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">省份</label>
                    <input v-model="customerInfo.state" 
                           type="text" required placeholder="请输入省份"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">邮政编码</label>
                    <input v-model="customerInfo.zipCode" 
                           type="text" required placeholder="请输入邮编"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- 支付方式 -->
          <div v-if="cartItems.length > 0" class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div class="px-8 py-6 border-b border-gray-700/50">
              <h2 class="text-3xl font-bold text-white flex items-center gap-3">
                <i class="bi bi-credit-card text-cyan-400"></i>
                支付方式
              </h2>
            </div>
            
            <div class="p-8">
              <div class="grid md:grid-cols-3 gap-4 mb-6">
                <button v-for="method in paymentMethods" :key="method.id"
                        @click="selectedPaymentMethod = method.id"
                        :class="[
                          'p-6 border-2 rounded-xl transition-all duration-300 text-center',
                          selectedPaymentMethod === method.id 
                            ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300' 
                            : 'border-gray-600/50 hover:border-cyan-500/50 text-gray-300 hover:text-white'
                        ]">
                  <i :class="method.icon" class="text-3xl mb-3"></i>
                  <div class="font-semibold">{{ method.name }}</div>
                  <div class="text-sm opacity-75 mt-1">{{ method.description }}</div>
                </button>
              </div>

              <!-- 信用卡信息 -->
              <div v-if="selectedPaymentMethod === 'card'" class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-white mb-2">银行卡号</label>
                  <input v-model="paymentInfo.cardNumber" 
                         type="text" placeholder="6222 0200 0000 0000"
                         class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                </div>
                
                <div class="grid md:grid-cols-3 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-white mb-2">有效期</label>
                    <input v-model="paymentInfo.expiryDate" 
                           type="text" placeholder="MM/YY"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">CVV</label>
                    <input v-model="paymentInfo.cvv" 
                           type="text" placeholder="123"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-white mb-2">持卡人姓名</label>
                  <input v-model="paymentInfo.cardholderName" 
                         type="text" placeholder="张三"
                         class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                </div>
              </div>

              <!-- 支付宝信息 -->
              <div v-if="selectedPaymentMethod === 'alipay'" class="text-center py-8">
                <div class="text-6xl text-blue-500 mb-4">
                  <i class="bi bi-wallet2"></i>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">支付宝支付</h3>
                <p class="text-gray-400 mb-6">您将跳转到支付宝完成支付</p>
              </div>

              <!-- 微信支付信息 -->
              <div v-if="selectedPaymentMethod === 'wechat'" class="text-center py-8">
                <div class="text-6xl text-green-500 mb-4">
                  <i class="bi bi-wechat"></i>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">微信支付</h3>
                <p class="text-gray-400 mb-6">扫码支付或使用微信App支付</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：订单摘要 -->
        <div class="lg:col-span-1">
          <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 sticky top-6">
            <div class="px-8 py-6 border-b border-gray-700/50">
              <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                <i class="bi bi-receipt text-cyan-400"></i>
                订单摘要
              </h2>
            </div>
            
            <div class="p-8 space-y-6">
              <!-- 订单详情 -->
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">商品小计</span>
                  <span class="text-white font-semibold">¥{{ (subtotal * 7.2).toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">运费</span>
                  <span class="text-white font-semibold">¥{{ (shipping * 7.2).toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">税费</span>
                  <span class="text-white font-semibold">¥{{ (tax * 7.2).toLocaleString() }}</span>
                </div>
                <div class="border-t border-gray-700/50 pt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-xl font-semibold text-white">总计</span>
                    <span class="text-2xl font-bold text-cyan-400">¥{{ (total * 7.2).toLocaleString() }}</span>
                  </div>
                </div>
              </div>

              <!-- 优惠码 -->
              <div v-if="cartItems.length > 0">
                <label class="block text-sm font-medium text-white mb-2">优惠券代码</label>
                <div class="flex gap-2">
                  <input v-model="couponCode" 
                         type="text" placeholder="输入优惠券代码"
                         class="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 text-sm">
                  <button @click="applyCoupon" 
                          class="px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-300 text-sm">
                    使用
                  </button>
                </div>
                <div v-if="appliedCoupon" class="mt-2 text-green-400 text-sm flex items-center gap-1">
                  <i class="bi bi-check-circle"></i>
                  优惠券"{{ appliedCoupon }}"已使用
                </div>
              </div>

              <!-- 下单按钮 -->
              <button v-if="cartItems.length > 0" 
                      @click="submitOrder" 
                      :disabled="isProcessing"
                      class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed">
                <i v-if="!isProcessing" class="bi bi-credit-card"></i>
                <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {{ isProcessing ? '处理中...' : '确认下单' }}
              </button>

              <!-- 安全保障 -->
              <div class="text-center pt-6 border-t border-gray-700/50">
                <div class="flex items-center justify-center gap-4 text-gray-400 text-sm">
                  <div class="flex items-center gap-1">
                    <i class="bi bi-shield-check text-green-400"></i>
                    <span>安全</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <i class="bi bi-lock text-green-400"></i>
                    <span>加密</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <i class="bi bi-award text-green-400"></i>
                    <span>认证</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 订单成功弹窗 -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="glass-card-dark rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/20 p-8 max-w-md w-full text-center">
        <div class="text-6xl text-green-400 mb-6">
          <i class="bi bi-check-circle"></i>
        </div>
        <h3 class="text-2xl font-bold text-white mb-4">订单提交成功！</h3>
        <p class="text-gray-300 mb-2">订单号：#{{ orderNumber }}</p>
        <p class="text-gray-400 mb-8">感谢您的购买，您将很快收到确认邮件。</p>
        <div class="space-y-3">
          <button @click="goToOrders" 
                  class="w-full bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
            查看订单
          </button>
          <button @click="continueShopping" 
                  class="w-full border border-gray-600 hover:border-green-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
            继续购物
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { createDiscreteApi } from 'naive-ui'

// 创建消息API
const { message } = createDiscreteApi(['message'])

// 消息函数
const success = (content) => {
  message.success(content, { duration: 3000 })
}

const error = (content) => {
  message.error(content, { duration: 4000 })
}

const warning = (content) => {
  message.warning(content, { duration: 3000 })
}

// 响应式数据
const cartItems = ref([])
const isProcessing = ref(false)
const showSuccessModal = ref(false)
const orderNumber = ref('')

// 客户信息
const customerInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
})

// 支付信息
const selectedPaymentMethod = ref('card')
const paymentInfo = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: ''
})

// 优惠码
const couponCode = ref('')
const appliedCoupon = ref('')

// 支付方式
const paymentMethods = ref([
  {
    id: 'card',
    name: '银行卡支付',
    description: '银联、Visa、万事达',
    icon: 'bi-credit-card'
  },
  {
    id: 'alipay',
    name: '支付宝',
    description: '使用支付宝支付',
    icon: 'bi-wallet2'
  },
  {
    id: 'wechat',
    name: '微信支付',
    description: '微信扫码支付',
    icon: 'bi-wechat'
  }
])

// 计算属性
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const shipping = computed(() => {
  return subtotal.value > 1000 ? 0 : 50 // 满$1000免费配送
})

const tax = computed(() => {
  return Math.round(subtotal.value * 0.08) // 8%税率
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value
})

// 方法
const addToCart = (product, quantity = 1) => {
  const existingItem = cartItems.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cartItems.value.push({ ...product, quantity })
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
}

const removeFromCart = (productId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== productId)
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
}

const increaseQuantity = (productId) => {
  const item = cartItems.value.find(item => item.id === productId)
  if (item) {
    item.quantity++
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }
}

const decreaseQuantity = (productId) => {
  const item = cartItems.value.find(item => item.id === productId)
  if (item && item.quantity > 1) {
    item.quantity--
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }
}

const applyCoupon = () => {
  // 模拟优惠码验证
  const validCoupons = ['SAVE10', 'WELCOME20', 'TECH15']
  if (validCoupons.includes(couponCode.value.toUpperCase())) {
    appliedCoupon.value = couponCode.value.toUpperCase()
    // 这里可以添加折扣逻辑
  } else {
    error('优惠券代码无效')
  }
}

const submitOrder = async () => {
  if (cartItems.value.length === 0) return
  
  isProcessing.value = true
  
  try {
    // 模拟订单处理
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 生成订单号
    orderNumber.value = 'ORD' + Date.now().toString().slice(-8)
    
    // 清空购物车
    cartItems.value = []
    localStorage.removeItem('cartItems')
    
    // 显示成功弹窗
    showSuccessModal.value = true
  } catch (error) {
    console.error('订单提交失败:', error)
    error('订单提交失败，请重试。')
  } finally {
    isProcessing.value = false
  }
}

const goToOrders = () => {
  showSuccessModal.value = false
  navigateTo('/orders')
}

const continueShopping = () => {
  showSuccessModal.value = false
  navigateTo('/products')
}

// 加载购物车数据
onMounted(() => {
  const savedCartItems = localStorage.getItem('cartItems')
  if (savedCartItems) {
    cartItems.value = JSON.parse(savedCartItems)
  }
})

// 页面元数据
useHead({
  title: '购物车结算 - xlCig',
  meta: [
    { name: 'description', content: '安全快捷的购物车结算流程，支持多种支付方式' }
  ]
})
</script> 