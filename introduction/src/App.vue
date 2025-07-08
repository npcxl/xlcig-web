<template>
  <div id="app" class="min-h-screen">
    <!-- 导航栏 -->
    <nav class="nav-glass fixed top-0 left-0 right-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo和标题 -->
          <div class="flex items-center space-x-4">
            <button 
              @click="toggleSidebar"
              class="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <i class="bi bi-list text-xl"></i>
            </button>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <i class="bi bi-code-slash text-white text-sm"></i>
              </div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                xlCig项目文档
              </h1>
            </div>
          </div>

          <!-- 导航链接 -->
          <div class="hidden md:flex items-center space-x-6">
            <router-link 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              class="btn-ghost"
              :class="{ 'text-cyan-400': $route.path === item.path }"
            >
              <i :class="item.icon" class="mr-2"></i>
              {{ item.name }}
            </router-link>
          </div>

          <!-- 操作按钮 -->
          <div class="flex items-center space-x-3">
            <a 
              href="https://gitee.com/leheya/xlweb" 
              target="_blank"
              class="btn-secondary"
            >
              <i class="bi bi-github mr-2"></i>
              源码
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- 侧边栏 -->
    <aside 
      class="sidebar"
      :class="{ 'open': sidebarOpen }"
    >
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-200 mb-4">项目文档</h3>
        <nav class="space-y-2">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="sidebar-item"
            :class="{ 'active': $route.path === item.path }"
            @click="closeSidebar"
          >
            <i :class="item.icon" class="mr-3"></i>
            {{ item.name }}
          </router-link>
        </nav>
      </div>
    </aside>

    <!-- 遮罩层 -->
    <div 
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/50 z-30 md:hidden"
      @click="closeSidebar"
    ></div>

    <!-- 主内容区域 -->
    <main class="pt-16 md:pl-64">
      <div class="min-h-screen">
        <router-view v-slot="{ Component }">
          <transition 
            name="page" 
            mode="out-in"
            enter-active-class="animate-fade-in"
            leave-active-class="animate-fade-out"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- 回到顶部按钮 -->
    <button 
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 p-3 bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-500 transition-all duration-300 hover:scale-110 z-50"
    >
      <i class="bi bi-arrow-up text-lg"></i>
    </button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const sidebarOpen = ref(false)
    const showBackToTop = ref(false)

    const navItems = [
      { path: '/', name: '项目概述', icon: 'bi bi-house' },
      { path: '/installation', name: '安装指南', icon: 'bi bi-download' },
      { path: '/tech-stack', name: '技术栈', icon: 'bi bi-stack' },
      { path: '/structure', name: '项目结构', icon: 'bi bi-folder' },
      { path: '/dependencies', name: '依赖管理', icon: 'bi bi-box' },
      { path: '/features', name: '功能特性', icon: 'bi bi-star' },
      { path: '/troubleshooting', name: '故障排除', icon: 'bi bi-wrench' },
    ]

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    const closeSidebar = () => {
      sidebarOpen.value = false
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    const handleScroll = () => {
      showBackToTop.value = window.scrollY > 300
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      sidebarOpen,
      showBackToTop,
      navItems,
      toggleSidebar,
      closeSidebar,
      scrollToTop
    }
  }
}
</script>

<style scoped>
.animate-fade-out {
  animation: fade-out 0.3s ease-out forwards;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style> 