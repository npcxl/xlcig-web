<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">

    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow"></div>
    </div>

    <!-- 页面加载中 -->
    <LoadingScreen v-if="isLoadingCart && !cartItems.length" />

    <AppHeader 
      :show-back-button="false"
      :show-nav-menu="false"
      :show-breadcrumb="true"
      :show-location="false"
      :show-search-button="false"
      :show-notification-button="false"
      :show-decorations="false"
      logo-size="medium"
      current-page-title="购物车结算"
    />

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
              <!-- 购物车加载中 -->
              <div v-if="isLoadingCart" class="text-center py-12">
                <div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p class="text-gray-300">正在加载购物车...</p>
              </div>

              <!-- 购物车为空 -->
              <div v-else-if="cartItems.length === 0" class="text-center py-12">
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

              <!-- 购物车商品列表 -->
              <div v-else class="space-y-6">
                <div v-for="item in cartItems" :key="item.id" 
                     class="flex items-center gap-6 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 hover:border-cyan-500/50 transition-colors duration-300">
                  <!-- 产品图片 -->
                  <div class="w-24 h-24 bg-gray-700/50 rounded-lg overflow-hidden">
                    <img :src="item.product_image" :alt="item.product_name" class="w-full h-full object-contain p-2">
                  </div>
                  
                  <!-- 产品信息 -->
                  <div class="flex-1">
                    <h3 class="font-semibold text-white text-lg mb-1">{{ item.product_name }}</h3>
                    <p class="text-gray-400 text-sm mb-2">{{ item.product_brand }}</p>
                    <div class="flex items-center gap-4">
                      <span class="text-2xl font-bold text-cyan-400">¥{{ item.product_price.toLocaleString() }}</span>
                      <span v-if="item.product_original_price && item.product_original_price > item.product_price" 
                            class="text-sm text-gray-500 line-through">
                        ¥{{ item.product_original_price.toLocaleString() }}
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

          <!-- 收货地址 -->
          <div v-if="cartItems.length > 0" class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div class="px-8 py-6 border-b border-gray-700/50">
              <h2 class="text-3xl font-bold text-white flex items-center gap-3">
                <i class="bi bi-geo-alt text-cyan-400"></i>
                收货地址
              </h2>
            </div>
            
            <div class="p-8">
              <!-- 登录用户的地址管理 -->
              <div v-if="userStore.isLoggedIn">
                <!-- 地址加载中 -->
                <div v-if="addressStore.isLoading" class="text-center py-8">
                  <div class="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p class="text-gray-300">正在加载地址信息...</p>
                </div>

                <!-- 用户有地址时显示地址选择 -->
                <div v-else-if="addressStore.hasAddresses" class="space-y-6">
                  <!-- 地址列表 -->
                  <div class="space-y-4">
                    <div v-for="address in addressStore.addresses" :key="address.id" 
                         class="border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer"
                         :class="selectedAddressId === address.id 
                           ? 'border-cyan-500 bg-cyan-500/10' 
                           : 'border-gray-600/50 hover:border-cyan-500/50'"
                         @click="selectAddress(address.id)">
                      <div class="flex items-start justify-between">
                        <div class="flex-1">
                          <div class="flex items-center gap-3 mb-2">
                            <h3 class="font-semibold text-white">{{ address.name }}</h3>
                            <span class="text-gray-300">{{ address.phone }}</span>
                            <span v-if="address.is_default" 
                                  class="px-2 py-1 bg-cyan-500 text-white text-xs rounded-full">
                              默认
                            </span>
                          </div>
                          <p class="text-gray-300">
                            {{ address.province }} {{ address.city }} {{ address.district }} {{ address.detail }}
                          </p>
                          <p v-if="address.postal_code" class="text-gray-400 text-sm mt-1">
                            邮编：{{ address.postal_code }}
                          </p>
                        </div>
                        <div class="flex items-center">
                          <i class="bi bi-check-circle text-cyan-400 text-xl" 
                             v-if="selectedAddressId === address.id"></i>
                          <i class="bi bi-circle text-gray-400 text-xl" 
                             v-else></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 添加新地址按钮 -->
                  <button @click="showAddAddressModal = true" 
                          class="w-full py-3 border-2 border-dashed border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2">
                    <i class="bi bi-plus-circle"></i>
                    添加新地址
                  </button>
                </div>

                <!-- 用户没有地址时显示添加地址 -->
                <div v-else class="text-center py-8">
                  <div class="text-4xl text-gray-400 mb-4">
                    <i class="bi bi-geo-alt"></i>
                  </div>
                  <h3 class="text-xl font-semibold text-white mb-2">暂无收货地址</h3>
                  <p class="text-gray-400 mb-6">添加收货地址以完成订单</p>
                  <button @click="showAddAddressModal = true" 
                          class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors duration-300">
                    <i class="bi bi-plus-circle mr-2"></i>
                    添加收货地址
                  </button>
                </div>
              </div>

              <!-- 未登录用户的地址表单 -->
              <div v-else class="space-y-6">
                <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <div class="flex items-center gap-2 text-yellow-400">
                    <i class="bi bi-info-circle"></i>
                    <span class="font-medium">提示</span>
                  </div>
                  <p class="text-yellow-300 text-sm mt-1">
                    <NuxtLink to="/auth/login" class="text-yellow-400 hover:text-yellow-300 underline">登录</NuxtLink> 
                    后可以保存地址，方便下次购物
                  </p>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">收货人姓名</label>
                    <input v-model="guestAddressForm.name" 
                           type="text" required placeholder="请输入收货人姓名"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">手机号码</label>
                    <input v-model="guestAddressForm.phone" 
                           type="tel" required placeholder="请输入手机号码"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                </div>

                <div class="grid md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">省份</label>
                    <input v-model="guestAddressForm.province" 
                           type="text" required placeholder="请输入省份"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">城市</label>
                    <input v-model="guestAddressForm.city" 
                           type="text" required placeholder="请输入城市"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-white mb-2">区县</label>
                    <input v-model="guestAddressForm.district" 
                           type="text" required placeholder="请输入区县"
                           class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-white mb-2">详细地址</label>
                  <textarea v-model="guestAddressForm.detail" 
                            required rows="3" placeholder="请输入详细地址"
                            class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none"></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-white mb-2">邮政编码（可选）</label>
                  <input v-model="guestAddressForm.postal_code" 
                         type="text" placeholder="请输入邮政编码"
                         class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
                </div>
              </div>
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
                  <span class="text-white font-semibold">¥{{ subtotal.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">运费</span>
                  <span class="text-white font-semibold">¥{{ shipping.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">税费</span>
                  <span class="text-white font-semibold">¥{{ tax.toLocaleString() }}</span>
                </div>
                <div class="border-t border-gray-700/50 pt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-xl font-semibold text-white">总计</span>
                    <span class="text-2xl font-bold text-cyan-400">¥{{ total.toLocaleString() }}</span>
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
                      :disabled="isProcessing || !canSubmitOrder"
                      class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed">
                <i v-if="!isProcessing" class="bi bi-credit-card"></i>
                <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {{ isProcessing ? '处理中...' : '确认下单' }}
              </button>

              <!-- 订单验证提示 -->
              <div v-if="!canSubmitOrder && cartItems.length > 0" class="text-red-400 text-sm text-center">
                <i class="bi bi-exclamation-triangle mr-1"></i>
                请完善收货地址信息
              </div>

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

    <!-- 添加地址弹窗 -->
    <div v-if="showAddAddressModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-white flex items-center gap-3">
              <i class="bi bi-geo-alt text-cyan-400"></i>
              添加收货地址
            </h3>
            <button @click="closeAddAddressModal" class="text-gray-400 hover:text-white">
              <i class="bi bi-x-lg text-2xl"></i>
            </button>
          </div>
          
          <form @submit.prevent="addNewAddress" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-cyan-400 mb-2">收货人姓名 *</label>
                <input v-model="newAddressForm.name" 
                       type="text" required placeholder="请输入收货人姓名"
                       class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
              </div>
              <div>
                <label class="block text-sm font-medium text-cyan-400 mb-2">手机号码 *</label>
                <input v-model="newAddressForm.phone" 
                       type="tel" required placeholder="请输入手机号码"
                       class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-cyan-400 mb-2">省份 *</label>
                <input v-model="newAddressForm.province" 
                       type="text" required placeholder="请输入省份"
                       class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
              </div>
              <div>
                <label class="block text-sm font-medium text-cyan-400 mb-2">城市 *</label>
                <input v-model="newAddressForm.city" 
                       type="text" required placeholder="请输入城市"
                       class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
              </div>
              <div>
                <label class="block text-sm font-medium text-cyan-400 mb-2">区县 *</label>
                <input v-model="newAddressForm.district" 
                       type="text" required placeholder="请输入区县"
                       class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-cyan-400 mb-2">详细地址 *</label>
              <textarea v-model="newAddressForm.detail" 
                        required rows="3" placeholder="请输入详细地址"
                        class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none"></textarea>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-cyan-400 mb-2">邮政编码</label>
                <input v-model="newAddressForm.postal_code" 
                       type="text" placeholder="请输入邮政编码（可选）"
                       class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400">
              </div>
              <div class="flex items-end">
                <label class="flex items-center space-x-2">
                  <input v-model="newAddressForm.is_default" 
                         type="checkbox" 
                         class="w-4 h-4 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500">
                  <span class="text-sm text-gray-300">设为默认地址</span>
                </label>
              </div>
            </div>
            
            <div class="flex justify-end space-x-4 pt-6">
              <button type="button" @click="closeAddAddressModal" 
                      class="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg font-medium transition-colors duration-300">
                取消
              </button>
              <button type="submit" :disabled="addingAddress"
                      class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300 flex items-center gap-2">
                <div v-if="addingAddress" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <i v-else class="bi bi-check-circle"></i>
                {{ addingAddress ? '添加中...' : '添加地址' }}
              </button>
            </div>
          </form>
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
        <p class="text-gray-300 mb-2">
          <span v-if="orderNumber.startsWith('BATCH-')">
            批次号：#{{ orderNumber }}
          </span>
          <span v-else>
            订单号：#{{ orderNumber }}
          </span>
        </p>
        <p class="text-gray-400 mb-8">
          <span v-if="orderNumber.startsWith('BATCH-')">
            您的购物车商品已分别创建订单，感谢您的购买！
          </span>
          <span v-else>
            感谢您的购买，您将很快收到确认邮件。
          </span>
        </p>
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
import { createDiscreteApi } from 'naive-ui'
import { useUserStore } from '../stores/user'
import { useAddressStore } from '../stores/address'
import { cartApi } from '../utils/api/cart'
import { ordersApi } from '../utils/api/orders'

// 创建消息API
const { message } = createDiscreteApi(['message'])

// 使用 Pinia stores
const userStore = useUserStore()
const addressStore = useAddressStore()

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
const isLoadingCart = ref(false)
const isProcessing = ref(false)
const showSuccessModal = ref(false)
const orderNumber = ref('')
const selectedAddressId = ref(null)
const showAddAddressModal = ref(false)
const addingAddress = ref(false)

// 游客地址表单
const guestAddressForm = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  postal_code: ''
})

// 新地址表单
const newAddressForm = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  postal_code: '',
  is_default: false
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
  return cartItems.value.reduce((sum, item) => sum + (item.product_price * item.quantity), 0)
})

const shipping = computed(() => {
  return subtotal.value > 1000 ? 0 : 50 // 满¥1000免费配送
})

const tax = computed(() => {
  return Math.round(subtotal.value * 0.08) // 8%税率
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value
})

// 检查是否可以提交订单
const canSubmitOrder = computed(() => {
  if (userStore.isLoggedIn) {
    // 登录用户需要选择地址
    return selectedAddressId.value !== null
  } else {
    // 游客需要填写地址信息
    return guestAddressForm.value.name && 
           guestAddressForm.value.phone && 
           guestAddressForm.value.province && 
           guestAddressForm.value.city && 
           guestAddressForm.value.district && 
           guestAddressForm.value.detail
  }
})

// 购物车相关方法
const loadCartItems = async () => {
  if (!userStore.isLoggedIn) return
  
  try {
    isLoadingCart.value = true
    const response = await cartApi.getCartItems()
    if (response.success) {
      cartItems.value = response.data
    } else {
      error(response.message || '获取购物车失败')
    }
  } catch (err) {
    console.error('加载购物车失败:', err)
    error('加载购物车失败，请重试')
  } finally {
    isLoadingCart.value = false
  }
}

const removeFromCart = async (cartItemId) => {
  if (!userStore.isLoggedIn) return
  
  try {
    const response = await cartApi.removeCartItem(cartItemId)
    if (response.success) {
      cartItems.value = cartItems.value.filter(item => item.id !== cartItemId)
      success('商品已从购物车移除')
    } else {
      error(response.message || '删除失败')
    }
  } catch (err) {
    console.error('删除购物车项目失败:', err)
    error('删除失败，请重试')
  }
}

const increaseQuantity = async (cartItemId) => {
  if (!userStore.isLoggedIn) return
  
  const item = cartItems.value.find(item => item.id === cartItemId)
  if (!item) return
  
  try {
    const response = await cartApi.updateCartItem(cartItemId, {
      quantity: item.quantity + 1
    })
    if (response.success) {
      item.quantity = response.data.quantity
    } else {
      error(response.message || '更新数量失败')
    }
  } catch (err) {
    console.error('更新购物车数量失败:', err)
    error('更新失败，请重试')
  }
}

const decreaseQuantity = async (cartItemId) => {
  if (!userStore.isLoggedIn) return
  
  const item = cartItems.value.find(item => item.id === cartItemId)
  if (!item || item.quantity <= 1) return
  
  try {
    const response = await cartApi.updateCartItem(cartItemId, {
      quantity: item.quantity - 1
    })
    if (response.success) {
      item.quantity = response.data.quantity
    } else {
      error(response.message || '更新数量失败')
    }
  } catch (err) {
    console.error('更新购物车数量失败:', err)
    error('更新失败，请重试')
  }
}

const applyCoupon = async () => {
  if (!userStore.isLoggedIn) return
  
  try {
    const response = await cartApi.applyCoupon(couponCode.value)
    if (response.success) {
      appliedCoupon.value = couponCode.value
      success('优惠券使用成功！')
    } else {
      error(response.message || '优惠券代码无效')
    }
  } catch (err) {
    console.error('应用优惠券失败:', err)
    error('优惠券代码无效')
  }
}

// 地址相关方法
const selectAddress = (addressId) => {
  selectedAddressId.value = addressId
}

const addNewAddress = async () => {
  if (!userStore.isLoggedIn) return

  try {
    addingAddress.value = true
    await addressStore.addAddress(newAddressForm.value)
    
    success('地址添加成功！')
    closeAddAddressModal()
    
    // 如果是用户的第一个地址，或者设为默认地址，自动选择
    if (addressStore.addresses.length === 1 || newAddressForm.value.is_default) {
      selectedAddressId.value = addressStore.addresses[addressStore.addresses.length - 1].id
    }
  } catch (error) {
    console.error('添加地址失败:', error)
    error(error.message || '添加地址失败，请重试')
  } finally {
    addingAddress.value = false
  }
}

const closeAddAddressModal = () => {
  showAddAddressModal.value = false
  // 重置表单
  newAddressForm.value = {
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    postal_code: '',
    is_default: false
  }
}

const submitOrder = async () => {
  if (cartItems.value.length === 0 || !canSubmitOrder.value) return
  
  isProcessing.value = true
  
  try {
    // 获取收货地址
    const shippingAddress = userStore.isLoggedIn ? 
      addressStore.addresses.find(addr => addr.id === selectedAddressId.value) : 
      guestAddressForm.value

    // 收集要下单的购物车项目 ID
    const cartItemIds = cartItems.value.map(item => item.id)
    console.log('准备下单的购物车项目ID:', cartItemIds)

    // 为每个购物车商品创建单独的订单
    const orderPromises = cartItems.value.map(item => {
      const orderData = {
        config_id: item.product_id,  // 使用 config_id 字段
        quantity: item.quantity,
        shipping_address: shippingAddress,
        notes: `通过购物车下单，支付方式：${selectedPaymentMethod.value}`
      }
      return ordersApi.createOrder(orderData)
    })

    // 并行创建所有订单
    const orderResponses = await Promise.all(orderPromises)
    
    // 检查是否所有订单都创建成功
    const failedOrders = orderResponses.filter(response => !response.success)
    if (failedOrders.length > 0) {
      console.error('订单创建失败:', failedOrders)
      throw new Error(`${failedOrders.length}个订单创建失败`)
    }

    // 获取成功创建的订单
    const successOrders = orderResponses.map(response => response.data)
    console.log('订单创建成功:', successOrders.length, '个订单')
    
    // 生成主订单号（用于显示）
    orderNumber.value = successOrders.length > 1 ? 
      `BATCH-${Date.now().toString().slice(-8)}` : 
      (successOrders[0].order_no || successOrders[0].order_number)
    
    // 只有在所有订单都创建成功后，才删除已下单的购物车商品
    if (userStore.isLoggedIn) {
      try {
        if (cartItemIds.length === 1) {
          // 单个商品删除
          console.log('删除单个购物车商品:', cartItemIds[0])
          await cartApi.removeCartItem(cartItemIds[0])
        } else {
          // 批量删除多个商品
          console.log('批量删除购物车商品:', cartItemIds)
          await cartApi.batchRemoveCartItems(cartItemIds)
        }
        console.log('购物车商品删除成功')
      } catch (deleteError) {
        console.error('删除购物车商品失败:', deleteError)
        // 即使删除失败，订单已经创建成功，所以还是要更新本地数据
        warning('订单创建成功，但清理购物车时出现问题，请刷新页面')
      }
    }
    
    // 从本地购物车数据中移除已下单的商品
    const originalLength = cartItems.value.length
    cartItems.value = cartItems.value.filter(item => !cartItemIds.includes(item.id))
    console.log(`本地购物车数据更新: ${originalLength} -> ${cartItems.value.length}`)
    
    // 显示成功弹窗
    showSuccessModal.value = true
    
    const message = successOrders.length > 1 ? 
      `成功创建${successOrders.length}个订单！` : 
      '订单创建成功！'
    success(message)
    
  } catch (error) {
    console.error('订单创建失败:', error)
    error('订单创建失败：' + (error.message || '请重试'))
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

// 初始化数据
const initializeData = async () => {
  // 如果用户已登录，从接口加载购物车数据
  if (userStore.isLoggedIn) {
    await loadCartItems()
    
    // 初始化地址数据
    try {
      await addressStore.initializeAddresses()
      
      // 自动选择默认地址
      if (addressStore.getDefaultAddress) {
        selectedAddressId.value = addressStore.getDefaultAddress.id
      } else if (addressStore.addresses.length > 0) {
        selectedAddressId.value = addressStore.addresses[0].id
      }
    } catch (error) {
      console.error('初始化地址失败:', error)
    }
  } else {
    // 未登录用户提示登录
    warning('请登录后查看购物车')
  }
}

// 页面挂载时初始化
onMounted(() => {
  initializeData()
})

// 页面元数据
useHead({
  title: '购物车结算 - xlCig',
  meta: [
    { name: 'description', content: '安全快捷的购物车结算流程，支持多种支付方式和地址管理' }
  ]
})
</script> 