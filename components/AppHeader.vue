<template>
  <nav class="relative z-10">
    <div class="container mx-auto px-6 py-6">
      <div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <!-- Logo -->
            <NuxtLink to="/" class="cursor-pointer">
              <AppLogo :size="logoSize" :show-decorations="showDecorations" />
            </NuxtLink>
            
            <!-- 分割线 -->
            <div v-if="showBackButton" class="h-6 w-px bg-gray-600"></div>
            
            <!-- 返回按钮 -->
            <button 
              v-if="showBackButton"
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

            <!-- 导航菜单 -->
            <div v-if="showNavMenu" class="hidden md:flex space-x-6">
              <NuxtLink 
                v-for="item in navItems" 
                :key="item.path"
                :to="item.path" 
                :class="[
                  'transition-colors duration-200 font-medium',
                  isCurrentPage(item.path) ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                ]"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>

          <!-- 右侧内容 -->
          <div class="flex items-center space-x-4">
            <!-- 面包屑 -->
            <nav v-if="showBreadcrumb" class="text-sm text-gray-400">
              <NuxtLink to="/" class="hover:text-cyan-400 transition-colors duration-200">首页</NuxtLink>
              <i class="bi bi-chevron-right mx-2 text-cyan-400"></i>
              <span class="text-white font-medium">{{ currentPageTitle }}</span>
            </nav>

            <!-- 位置信息 -->
            <HeaderLocation v-if="showLocation" />
            
            <!-- 搜索按钮 -->
            <button v-if="showSearchButton" class="p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200">
              <i class="bi bi-search text-xl"></i>
            </button>
            
            <!-- 通知按钮 -->
            <button v-if="showNotificationButton" class="p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200">
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
            <div v-else class="relative">
              <n-config-provider :theme="naiveTheme" :theme-overrides="themeOverrides">
                <n-dropdown 
                  :options="userMenuOptions"
                  @select="handleUserMenuSelect"
                  placement="bottom-end"
                  trigger="click"
                  :show-arrow="false"
                >
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
</template>

<script setup>
import { NDropdown, darkTheme, NConfigProvider } from 'naive-ui'
import { useUserStore } from '~/stores/user'
import { useRouter, useRoute } from 'vue-router'
import HeaderLocation from './location/HeaderLocation.vue'

// Props
const props = defineProps({
  showBackButton: {
    type: Boolean,
    default: false
  },
  showNavMenu: {
    type: Boolean,
    default: true
  },
  showBreadcrumb: {
    type: Boolean,
    default: false
  },
  showLocation: {
    type: Boolean,
    default: true
  },
  showSearchButton: {
    type: Boolean,
    default: true
  },
  showNotificationButton: {
    type: Boolean,
    default: true
  },
  showDecorations: {
    type: Boolean,
    default: true
  },
  logoSize: {
    type: String,
    default: 'large'
  },
  currentPageTitle: {
    type: String,
    default: ''
  },
  customUserMenuOptions: {
    type: Array,
    default: () => []
  }
})

// 使用Pinia store
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// 导航菜单项
const navItems = [
  { path: '/', label: '首页' },
  { path: '/products', label: '产品中心' },
  { path: '/checkout', label: '购物车' },
  { path: '/orders', label: '订单' }
]

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

// 用户菜单选项
const userMenuOptions = computed(() => {
  if (props.customUserMenuOptions.length > 0) {
    return props.customUserMenuOptions
  }
  
  return [
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
  ]
})

// 方法
const goBack = () => {
  if (process.client && window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const isCurrentPage = (path) => {
  if (!route || !route.path) return false
  return route.path === path
}

const handleUserMenuSelect = (key) => {
  switch (key) {
    case 'profile':
      router.push('/profile')
      break
    case 'orders':
      router.push('/orders')
      break
    case 'addresses':
      router.push('/addresses')
      break
    case 'logout':
      userStore.logout()
      router.push('/auth/login')
      break
  }
}

const handleAvatarError = (event) => {
  console.log('头像加载失败，使用默认头像')
  if (event.target) {
    event.target.style.display = 'none'
  }
}
</script>

<style scoped>
.glass-card-dark {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style> 