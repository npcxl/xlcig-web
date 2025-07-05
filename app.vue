<template>
  <div class="app-container">
    <!-- 页面过渡 -->
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

// 初始化用户认证状态
onMounted(async () => {
  try {
    await userStore.initializeAuth()
  } catch (error) {
    console.error('Auth initialization failed:', error)
  }
})
</script>

<style>
/* 全局样式 */
.app-container {
  min-height: 100vh;
  background: #111827;
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
</style> 