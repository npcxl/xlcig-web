<template>
  <div class="app-container">
    <!-- 全局加载屏幕 -->
    <LoadingScreen :show="appLoader.isLoading.value" />
    
    <!-- 主要内容 - 只有在加载完成后才显示 -->
    <div v-if="!appLoader.isLoading.value" class="app-content">
      <!-- 页面过渡 -->
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useUserStore } from '~/stores/user'
import { useAppLoader } from '~/composables/useAppLoader'

const userStore = useUserStore()
const appLoader = useAppLoader()

// 初始化应用
onMounted(async () => {
  try {
    console.log('开始初始化应用...')
    
    // 等待下一个tick，确保组件已挂载
    await nextTick()
    
    // 执行应用初始化
    await appLoader.initializeApp()
    
    console.log('应用初始化完成')
    
  } catch (error) {
    console.error('应用初始化失败:', error)
    // 错误处理已在 appLoader.initializeApp() 内部完成
  }
})
</script>

<style>
/* 全局样式 */
.app-container {
  min-height: 100vh;
  background: #111827;
  position: relative;
}

.app-content {
  min-height: 100vh;
  animation: fadeIn 0.5s ease-in-out;
}

/* 页面过渡效果 */
.page-enter-active {
  transition: all 0.4s ease-out;
}

.page-leave-active {
  transition: all 0.3s ease-in;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 路由过渡 */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* 内容淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 避免页面闪烁 */
* {
  -webkit-tap-highlight-color: transparent;
}

body {
  overflow-x: hidden;
}

/* 优化字体渲染 */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 隐藏滚动条，但保持滚动功能 */
.app-container::-webkit-scrollbar {
  display: none;
}

.app-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style> 