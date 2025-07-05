<template>
  <div class="page-loader-container">
    <!-- 使用LoadingScreen组件 -->
    <LoadingScreen :show="isPageLoading || isDataLoading" />
    
    <!-- 错误状态 - 显示导航栏 -->
    <div v-if="hasError && !isPageLoading && !isDataLoading" class="error-state">
      <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        <!-- 背景装饰效果 -->
        <div class="fixed inset-0 pointer-events-none">
          <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <!-- 导航栏 -->
        <AppHeader 
          :show-back-button="false"
          :show-nav-menu="true"
          :show-breadcrumb="false"
          :show-location="false"
          :show-search-button="false"
          :show-notification-button="false"
          :show-decorations="false"
          logo-size="medium"
        />
        
        <!-- 错误信息 -->
        <div class="relative z-10 flex items-center justify-center min-h-[80vh]">
          <div class="glass-card-dark rounded-3xl p-16 border border-red-500/30 shadow-2xl shadow-red-500/30 text-center max-w-lg mx-auto">
            <div class="text-8xl text-red-400 mb-10">
              <i class="bi bi-exclamation-triangle"></i>
            </div>
            <h3 class="text-3xl font-bold text-white mb-6">加载失败</h3>
            <p class="text-gray-300 text-xl mb-10">{{ errorMessage }}</p>
            <button 
              @click="$emit('retry')" 
              class="px-10 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transform hover:scale-105"
            >
              <i class="bi bi-arrow-clockwise mr-3 text-xl"></i>
              重试
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页面已准备好 - 简化条件判断 -->
    <div v-if="!hasError && !isPageLoading && !isDataLoading" class="page-ready">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  isPageLoading: {
    type: Boolean,
    default: true
  },
  isDataLoading: {
    type: Boolean,
    default: true
  },
  hasError: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: '页面加载失败，请重试'
  },
  loadingTitle: {
    type: String,
    default: '正在加载...'
  },
  loadingMessage: {
    type: String,
    default: '请稍候'
  }
})

defineEmits(['retry'])
</script>

<style scoped>
.glass-card-dark {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.page-loader-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.error-state {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
}

.page-ready {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 