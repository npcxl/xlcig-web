<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
    <!-- 背景装饰效果 -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow"></div>
    </div>

    <!-- 导航栏 -->
    <nav class="relative z-10 w-full px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <AppLogo size="small" />
          <NuxtLink to="/" class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
            <i class="bi bi-arrow-left mr-2 text-lg"></i>
            <span class="text-sm font-medium">返回首页</span>
          </NuxtLink>
        </div>
        <NuxtLink to="/auth/register" class="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
          <span class="text-sm font-medium">没有账号？立即注册</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- 主要内容 -->
    <div class="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
      <div class="w-full max-w-md">
        <!-- Logo和标题 -->
        <div class="text-center mb-8">
          <AppLogo size="medium" />
          <h1 class="text-3xl font-bold text-white mt-6 mb-2">欢迎回来</h1>
          <p class="text-gray-400">登录您的账户，继续您的装机之旅</p>
        </div>

        <!-- 登录表单 -->
        <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- 账号 -->
            <div>
              <label for="email" class="block text-sm font-medium text-white mb-2">账号</label>
              <div class="relative">
                <input 
                  id="email"
                  v-model="loginForm.email" 
                  type="text" 
                  required
                  placeholder="请输入邮箱/用户名/手机号"
                  class="w-full px-4 py-3 pl-12 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 focus:bg-gray-800/90"
                  style="color: #ffffff !important; background-color: rgba(31, 41, 55, 0.8) !important;"
                >
                <i class="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              </div>
              <p class="mt-2 text-xs text-gray-500">支持邮箱、用户名或手机号登录</p>
            </div>

            <!-- 密码 -->
            <div>
              <label for="password" class="block text-sm font-medium text-white mb-2">密码</label>
              <div class="relative">
                <input 
                  id="password"
                  v-model="loginForm.password" 
                  :type="showPassword ? 'text' : 'password'"
                  required
                  minlength="6"
                  placeholder="请输入您的密码"
                  class="w-full px-4 py-3 pl-12 pr-12 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 focus:bg-gray-800/90"
                  style="color: #ffffff !important; background-color: rgba(31, 41, 55, 0.8) !important;"
                >
                <i class="bi bi-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'" class="text-lg"></i>
                </button>
              </div>
            </div>

            <!-- 记住我和忘记密码 -->
            <div class="flex items-center justify-between">
              <label class="flex items-center cursor-pointer group">
                <input type="checkbox" v-model="rememberMe" class="sr-only">
                <div class="relative">
                  <div :class="[
                    'w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center',
                    rememberMe 
                      ? 'bg-cyan-500 border-cyan-500 shadow-md shadow-cyan-500/30' 
                      : 'border-gray-500 group-hover:border-cyan-400 bg-transparent'
                  ]">
                    <i v-if="rememberMe" class="bi bi-check text-white text-xs leading-none"></i>
                  </div>
                </div>
                <span class="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200 select-none">记住我</span>
              </label>
              <a href="#" class="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200">忘记密码？</a>
            </div>

            <!-- 登录按钮 -->
            <button 
              type="submit"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <div v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <i v-else class="bi bi-box-arrow-in-right text-lg"></i>
              {{ loading ? '登录中...' : '立即登录' }}
            </button>
          </form>

          <!-- 分割线 -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-800 text-gray-400">或者</span>
            </div>
          </div>

          <!-- 注册链接 -->
          <div class="text-center">
            <p class="text-gray-400 text-sm">
              还没有账号？
              <NuxtLink to="/auth/register" class="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
                立即注册
              </NuxtLink>
            </p>
          </div>
        </div>

        <!-- 额外信息 -->
        <div class="text-center mt-8">
          <p class="text-gray-500 text-xs">
            登录即表示您同意我们的
            <a href="#" class="text-cyan-400 hover:text-cyan-300">服务条款</a>
            和
            <a href="#" class="text-cyan-400 hover:text-cyan-300">隐私政策</a>
          </p>
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

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { api } from '../../utils/api'
import type { UserLoginInput } from '../../utils/api'
import { useUserStore } from '../../stores/user'
import { useAddressStore } from '../../stores/address'

// 使用Pinia stores
const userStore = useUserStore()
const addressStore = useAddressStore()

// 响应式数据
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)

// 登录表单
const loginForm = reactive<UserLoginInput>({
  email: '',
  password: ''
})

// 消息提示
const message = ref({
  show: false,
  type: 'success' as 'success' | 'error',
  text: ''
})

// 显示消息提示
const showMessage = (type: 'success' | 'error', text: string) => {
  message.value = { show: true, type, text }
  setTimeout(() => {
    message.value.show = false
  }, 5000)
}

// 处理登录
const handleLogin = async () => {
  try {
    loading.value = true
    const response = await api.auth.login(loginForm)
    
    if (response.data) {
      // 使用Pinia store保存用户信息和token（自动同步到localStorage）
      userStore.setAuth(response.data.token, response.data.user)
      
      // 登录成功后，后台初始化地址数据
      try {
        await addressStore.initializeAddresses()
      } catch (error) {
        console.error('初始化地址数据失败:', error)
        // 地址初始化失败不影响登录流程，用户可以在需要时手动添加地址
      }
      
      showMessage('success', '登录成功！正在跳转...')
      
      // 延迟跳转，让用户看到成功提示
      setTimeout(() => {
        // 使用window.location.href进行跳转
        window.location.href = '/'
      }, 1000)
    }
  } catch (error: any) {
    console.error('登录失败:', error)
    showMessage('error', error.message || '登录失败，请检查账号和密码')
  } finally {
    loading.value = false
  }
}
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

/* 复选框动画 */
input[type="checkbox"] + div {
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .glass-card-dark {
    margin: 1rem;
    padding: 2rem;
  }
}
</style> 