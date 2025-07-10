<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden flex items-center justify-center py-12">
    <!-- 背景装饰效果 -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow"></div>
    </div>

    <!-- 返回链接 -->
    <div class="absolute top-6 left-6 z-20">
      <div class="flex items-center space-x-4">
        <AppLogo size="small" />
        <NuxtLink to="/" class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
          <i class="bi bi-arrow-left mr-2 text-lg"></i>
          <span class="text-sm font-medium">返回首页</span>
        </NuxtLink>
      </div>
    </div>

    <!-- 注册表单容器 -->
    <div class="relative z-10 w-full max-w-lg px-6">
      <div class="glass-card-dark rounded-3xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <!-- 头部 -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <AppLogo size="medium" :show-decorations="false" />
          </div>
          <h1 class="text-2xl font-bold text-white mb-2">创建新账户</h1>
          <p class="text-gray-300">加入xlCig，开始您的专业装机之旅</p>
        </div>

        <!-- 注册表单 -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- 用户名输入 -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              <i class="bi bi-person mr-2 text-cyan-400"></i>
              用户名 <span class="text-gray-400 text-xs">(登录账号)</span>
            </label>
            <input 
              v-model="form.username"
              type="text" 
              required
              placeholder="设置您的登录用户名"
              :class="[
                'w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90',
                errors.username 
                  ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
              ]"
              style="color: #ffffff !important; background-color: rgba(31, 41, 55, 0.8) !important;">
            <p v-if="errors.username" class="mt-2 text-sm text-red-400">{{ errors.username }}</p>
            <p v-if="form.username && !errors.username" class="mt-2 text-sm text-green-400">
              <i class="bi bi-check-circle mr-1"></i>用户名可用
            </p>
          </div>

          <!-- 昵称输入 -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              <i class="bi bi-emoji-smile mr-2 text-cyan-400"></i>
              昵称 <span class="text-gray-400 text-xs">(显示名称，可选)</span>
            </label>
            <input 
              v-model="form.nickname"
              type="text" 
              placeholder="设置您的显示昵称"
              :class="[
                'w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90',
                errors.nickname 
                  ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
              ]"
              style="color: #ffffff !important; background-color: rgba(31, 41, 55, 0.8) !important;">
            <p v-if="errors.nickname" class="mt-2 text-sm text-red-400">{{ errors.nickname }}</p>
            <p v-if="!form.nickname" class="mt-2 text-sm text-gray-400">
              <i class="bi bi-info-circle mr-1"></i>未设置昵称时将显示用户名
            </p>
          </div>

          <!-- 邮箱输入 -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              <i class="bi bi-envelope mr-2 text-cyan-400"></i>
              邮箱地址
            </label>
            <input 
              v-model="form.email"
              type="email" 
              required
              placeholder="输入您的邮箱地址"
              :class="[
                'w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90',
                errors.email 
                  ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
              ]"
              style="color: #ffffff !important; background-color: rgba(31, 41, 55, 0.8) !important;">
            <p v-if="errors.email" class="mt-2 text-sm text-red-400">{{ errors.email }}</p>
          </div>

          <!-- 邮箱验证码输入 -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              <i class="bi bi-shield-check mr-2 text-cyan-400"></i>
              邮箱验证码
            </label>
            <div class="flex gap-3">
              <input 
                v-model="form.emailCode"
                type="text" 
                required
                placeholder="输入6位验证码"
                maxlength="6"
                :class="[
                  'flex-1 px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90',
                  errors.emailCode 
                    ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                ]"
                style="color: #ffffff !important; background-color: rgba(31, 41, 55, 0.8) !important;">
              
              <button 
                type="button"
                @click="sendEmailCode"
                :disabled="!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || sendingCode || countdown > 0"
                :class="[
                  'px-6 py-3 font-medium text-sm rounded-lg transition-all duration-300 whitespace-nowrap',
                  (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || sendingCode || countdown > 0)
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40'
                ]">
                <div v-if="sendingCode" class="flex items-center gap-2">
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>发送中</span>
                </div>
                <span v-else-if="countdown > 0">{{ countdown }}s</span>
                <span v-else>发送验证码</span>
              </button>
            </div>
            <p v-if="errors.emailCode" class="mt-2 text-sm text-red-400">{{ errors.emailCode }}</p>
            <p v-if="emailCodeSent && !errors.emailCode" class="mt-2 text-sm text-green-400">
              <i class="bi bi-check-circle mr-1"></i>验证码已发送到您的邮箱，请查收
            </p>
          </div>

          <!-- 密码输入 -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              <i class="bi bi-lock mr-2 text-cyan-400"></i>
              密码
            </label>
            <div class="relative">
              <input 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="设置您的密码"
                :class="[
                  'w-full px-4 py-3 pr-12 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90',
                  errors.password 
                    ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                ]"
                style="color: #ffffff !important; background-color: rgba(31, 41, 55, 0.8) !important;">
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'" class="text-lg"></i>
              </button>
            </div>
            <p v-if="errors.password" class="mt-2 text-sm text-red-400">{{ errors.password }}</p>
            
            <!-- 密码强度指示器 -->
            <div v-if="form.password" class="mt-3">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-sm text-gray-300">密码强度:</span>
                <span :class="passwordStrengthClass" class="text-sm font-medium">{{ passwordStrengthText }}</span>
              </div>
              <div class="w-full bg-gray-700/50 rounded-full h-2">
                <div 
                  :class="passwordStrengthClass"
                  :style="{ width: `${passwordStrength * 25}%` }"
                  class="h-2 rounded-full transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <!-- 确认密码输入 -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              <i class="bi bi-shield-check mr-2 text-cyan-400"></i>
              确认密码
            </label>
            <div class="relative">
              <input 
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                placeholder="再次输入您的密码"
                :class="[
                  'w-full px-4 py-3 pr-12 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90',
                  errors.confirmPassword 
                    ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                ]"
                style="color: #ffffff !important; background-color: rgba(31, 41, 55, 0.8) !important;">
              <button 
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'" class="text-lg"></i>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-400">{{ errors.confirmPassword }}</p>
            <p v-if="form.confirmPassword && form.password === form.confirmPassword && form.password.length >= 6" 
               class="mt-2 text-sm text-green-400">
              <i class="bi bi-check-circle mr-1"></i>密码匹配
            </p>
          </div>

          <!-- 手机号输入 -->
          <div>
            <label class="block text-sm font-semibold text-white mb-2">
              <i class="bi bi-phone mr-2 text-cyan-400"></i>
              手机号码 <span class="text-gray-400 text-xs">(可选)</span>
            </label>
            <input 
              v-model="form.phone"
              type="tel" 
              placeholder="输入您的手机号码"
              :class="[
                'w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-800/90',
                errors.phone 
                  ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-gray-600/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
              ]"
              style="color: #ffffff !important; background-color: rgba(31, 41, 55, 0.8) !important;">
            <p v-if="errors.phone" class="mt-2 text-sm text-red-400">{{ errors.phone }}</p>
          </div>

          <!-- 用户协议 -->
          <div class="space-y-4">
            <label class="flex items-start gap-3">
              <input 
                v-model="form.agreeToTerms"
                type="checkbox" 
                required
                class="w-4 h-4 text-cyan-500 bg-gray-800/50 border-gray-600/50 rounded focus:ring-cyan-500 focus:ring-2 mt-1">
              <span class="text-sm text-gray-300 leading-relaxed">
                我已阅读并同意
                <button type="button" @click="showTerms = true" class="text-cyan-400 hover:text-cyan-300 underline">用户服务协议</button>
                和
                <button type="button" @click="showPrivacy = true" class="text-cyan-400 hover:text-cyan-300 underline">隐私政策</button>
              </span>
            </label>
            
            <label class="flex items-start gap-3">
              <input 
                v-model="form.subscribeNewsletter"
                type="checkbox" 
                class="w-4 h-4 text-cyan-500 bg-gray-800/50 border-gray-600/50 rounded focus:ring-cyan-500 focus:ring-2 mt-1">
              <span class="text-sm text-gray-300 leading-relaxed">
                订阅我们的产品动态和优惠信息
              </span>
            </label>
          </div>

          <!-- 注册按钮 -->
          <button 
            type="submit"
            :disabled="loading || !form.agreeToTerms || !emailCodeSent || !form.emailCode"
            class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed flex items-center justify-center gap-3">
            <div v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <i v-else class="bi bi-person-plus"></i>
            {{ loading ? '注册中...' : '创建账户' }}
          </button>
        </form>

        <!-- 分割线 -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-600/50"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-gray-900 text-gray-400">或者使用</span>
          </div>
        </div>

        <!-- 社交注册 -->
        <div class="space-y-3">
          <button 
            @click="handleSocialRegister('google')"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg">
            <i class="bi bi-google text-lg"></i>
            使用 Google 注册
          </button>
          
          <button 
            @click="handleSocialRegister('github')"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg">
            <i class="bi bi-github text-lg"></i>
            使用 GitHub 注册
          </button>
        </div>

        <!-- 登录链接 -->
        <div class="mt-8 text-center">
          <p class="text-gray-300">
            已有账户？
            <NuxtLink to="/auth/login" class="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
              立即登录
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <!-- 用户协议弹窗 -->
    <div v-if="showTerms" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar-dark">
        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <i class="bi bi-file-text text-cyan-400"></i>
          用户服务协议
        </h3>
        
        <div class="text-gray-300 space-y-4 text-sm leading-relaxed">
          <h4 class="text-lg font-semibold text-white">1. 服务条款</h4>
          <p>欢迎使用xlCig服务。通过访问或使用我们的服务，您同意遵守本协议的所有条款和条件。</p>
          
          <h4 class="text-lg font-semibold text-white">2. 用户账户</h4>
          <p>您有责任维护账户信息的安全性和准确性。您不得与他人共享您的账户凭据。</p>
          
          <h4 class="text-lg font-semibold text-white">3. 使用规范</h4>
          <p>您同意不会使用我们的服务进行任何非法、有害或不当的活动。</p>
          
          <h4 class="text-lg font-semibold text-white">4. 隐私保护</h4>
          <p>我们重视您的隐私。请参阅我们的隐私政策了解我们如何收集和使用您的信息。</p>
        </div>
        
        <div class="flex gap-3 mt-8">
          <button 
            @click="acceptTerms"
            class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
            同意并继续
          </button>
          <button 
            @click="showTerms = false" 
            class="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
            关闭
          </button>
        </div>
      </div>
    </div>

    <!-- 隐私政策弹窗 -->
    <div v-if="showPrivacy" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar-dark">
        <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <i class="bi bi-shield-check text-cyan-400"></i>
          隐私政策
        </h3>
        
        <div class="text-gray-300 space-y-4 text-sm leading-relaxed">
          <h4 class="text-lg font-semibold text-white">信息收集</h4>
          <p>我们收集您提供的信息以及您使用我们服务时自动收集的信息。</p>
          
          <h4 class="text-lg font-semibold text-white">信息使用</h4>
          <p>我们使用收集的信息来提供、维护和改善我们的服务。</p>
          
          <h4 class="text-lg font-semibold text-white">信息分享</h4>
          <p>我们不会向第三方出售、交易或以其他方式转移您的个人信息。</p>
          
          <h4 class="text-lg font-semibold text-white">数据安全</h4>
          <p>我们采用适当的安全措施来保护您的个人信息。</p>
        </div>
        
        <div class="flex gap-3 mt-8">
          <button 
            @click="acceptPrivacy"
            class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
            同意并继续
          </button>
          <button 
            @click="showPrivacy = false" 
            class="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
            关闭
          </button>
        </div>
      </div>
    </div>

    <!-- 成功/错误提示 -->
    <div v-if="message.show" 
         :class="[
           'fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300',
           message.type === 'success' 
             ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
             : 'bg-red-500/20 border border-red-500/30 text-red-300'
         ]">
      <div class="flex items-center gap-3">
        <i :class="message.type === 'success' ? 'bi bi-check-circle' : 'bi bi-exclamation-circle'" class="text-lg"></i>
        <span>{{ message.text }}</span>
        <button @click="message.show = false" class="ml-2 hover:opacity-75">
          <i class="bi bi-x text-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 响应式数据
const form = ref({
  username: '',
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  agreeToTerms: false,
  subscribeNewsletter: false,
  emailCode: ''
})

const errors = ref({
  username: '',
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  emailCode: ''
})

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showTerms = ref(false)
const showPrivacy = ref(false)
const sendingCode = ref(false)
const countdown = ref(0)
const emailCodeSent = ref(false)

const message = ref({
  show: false,
  type: 'success',
  text: ''
})

// 计算属性
const passwordStrength = computed(() => {
  const password = form.value.password
  let strength = 0
  
  if (password.length >= 6) strength++
  if (password.length >= 10) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
  
  return Math.min(strength, 4)
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  const texts = ['很弱', '较弱', '一般', '较强', '很强']
  return texts[strength] || '很弱'
})

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value
  const classes = [
    'bg-red-500 text-red-400',
    'bg-orange-500 text-orange-400',
    'bg-yellow-500 text-yellow-400',
    'bg-blue-500 text-blue-400',
    'bg-green-500 text-green-400'
  ]
  return classes[strength] || classes[0]
})

// 方法
const validateForm = () => {
  errors.value = {
    username: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    emailCode: ''
  }
  let isValid = true

  // 用户名验证
  if (!form.value.username) {
    errors.value.username = '请输入用户名'
    isValid = false
  } else if (form.value.username.length < 3) {
    errors.value.username = '用户名至少需要3个字符'
    isValid = false
  } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(form.value.username)) {
    errors.value.username = '用户名只能包含字母、数字、下划线和中文'
    isValid = false
  }

  // 昵称验证（可选）
  if (form.value.nickname) {
    if (form.value.nickname.length > 50) {
      errors.value.nickname = '昵称不能超过50个字符'
      isValid = false
    } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5\s]+$/.test(form.value.nickname)) {
      errors.value.nickname = '昵称只能包含字母、数字、下划线、中文和空格'
      isValid = false
    }
  }

  // 邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email) {
    errors.value.email = '请输入邮箱地址'
    isValid = false
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = '请输入有效的邮箱地址'
    isValid = false
  }

  // 邮箱验证码验证
  if (!form.value.emailCode) {
    errors.value.emailCode = '请输入邮箱验证码'
    isValid = false
  } else if (!/^\d{6}$/.test(form.value.emailCode)) {
    errors.value.emailCode = '验证码应为6位数字'
    isValid = false
  }

  // 密码验证
  if (!form.value.password) {
    errors.value.password = '请输入密码'
    isValid = false
  } else if (form.value.password.length < 6) {
    errors.value.password = '密码至少需要6个字符'
    isValid = false
  }

  // 确认密码验证
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = '请确认密码'
    isValid = false
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = '两次输入的密码不一致'
    isValid = false
  }

  // 手机号验证（可选）
  if (form.value.phone) {
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(form.value.phone)) {
      errors.value.phone = '请输入有效的手机号码'
      isValid = false
    }
  }

  return isValid
}

const showMessage = (type, text) => {
  message.value = { show: true, type, text }
  setTimeout(() => {
    message.value.show = false
  }, 5000)
}

const handleRegister = async () => {
  if (!validateForm()) return

  loading.value = true
  
  try {
    const { authApi } = await import('~/utils/api')
    
    // 先验证邮箱验证码
    const codeVerifyResult = await authApi.verifyEmailCode({
      email: form.value.email,
      code: form.value.emailCode
    })

    if (!codeVerifyResult.success) {
      errors.value.emailCode = codeVerifyResult.message || '验证码验证失败'
      showMessage('error', codeVerifyResult.message || '验证码验证失败')
      return
    }

    // 验证码通过后进行注册
    const result = await authApi.register({
      username: form.value.username,
      nickname: form.value.nickname || undefined,
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone || undefined,
      emailCode: form.value.emailCode
    })

    if (result.success) {
      showMessage('success', '注册成功！邮箱验证通过，请登录您的账户')
      
      setTimeout(() => {
        navigateTo('/auth/login')
      }, 1500)
    } else {
      showMessage('error', result.message || '注册失败')
    }
    
  } catch (error) {
    console.error('注册失败:', error)
    const errorMessage = error instanceof Error ? error.message : '注册失败，请检查网络连接'
    showMessage('error', errorMessage)
  } finally {
    loading.value = false
  }
}

const handleSocialRegister = async (provider) => {
  try {
    showMessage('success', `正在使用 ${provider} 注册...`)
    
    // 模拟社交注册
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    localStorage.setItem('authToken', 'mock-social-register-jwt-token')
    localStorage.setItem('userInfo', JSON.stringify({
      id: 1,
      name: `${provider}用户`,
      email: `user@${provider}.com`,
      avatar: ''
    }))
    
    showMessage('success', '注册成功！正在跳转...')
    
    setTimeout(() => {
      navigateTo('/')
    }, 1500)
    
  } catch (error) {
    showMessage('error', `${provider} 注册失败，请重试`)
  }
}

const acceptTerms = () => {
  form.value.agreeToTerms = true
  showTerms.value = false
  showMessage('success', '已同意用户服务协议')
}

const acceptPrivacy = () => {
  showPrivacy.value = false
  showMessage('success', '已同意隐私政策')
}

const sendEmailCode = async () => {
  if (!form.value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.emailCode = '请先输入有效的邮箱地址'
    return
  }

  sendingCode.value = true
  
  try {
    const { authApi } = await import('~/utils/api')
    const result = await authApi.sendEmailCode({ email: form.value.email })

    if (result.success) {
      showMessage('success', '验证码已发送，请查收邮箱')
      emailCodeSent.value = true
      countdown.value = 60

      const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    } else {
      showMessage('error', result.message || '发送验证码失败')
    }
  } catch (error) {
    console.error('发送验证码失败:', error)
    const errorMessage = error instanceof Error ? error.message : '发送验证码失败，请检查网络连接'
    showMessage('error', errorMessage)
  } finally {
    sendingCode.value = false
  }
}

// 页面元数据
useHead({
  title: '注册 - xlCig',
  meta: [
    { name: 'description', content: '注册xlCig账户，享受专业的PC硬件产品和服务' }
  ]
})
</script>

<style scoped>
/* 玻璃卡片效果 */
.glass-card-dark {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.1);
}

/* 自定义动画 */
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

/* 输入框聚焦效果 */
input:focus {
  outline: none;
}

/* 复选框样式 */
input[type="checkbox"]:checked {
  background-color: rgb(6 182 212);
  border-color: rgb(6 182 212);
}

/* 滚动条样式已移至全局 main.css 中统一管理 */

/* 响应式设计 */
@media (max-width: 640px) {
  .glass-card-dark {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style> 