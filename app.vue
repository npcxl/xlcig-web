<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 全屏加载组件 -->
    <LoadingScreen3D :show="isInitializing && showLoader" />
    
    <!-- 主要内容 -->
    <div v-show="!isInitializing || !showLoader" class="transition-opacity duration-300">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const isInitializing = ref(true)
const showLoader = ref(true)

onMounted(async () => {
  try {
    showLoader.value = true
    await userStore.initializeAuth()
    await new Promise(resolve => setTimeout(resolve, 500))
  } catch (error) {
    console.error('Auth initialization failed:', error)
  } finally {
    await new Promise(resolve => {
      setTimeout(() => {
        isInitializing.value = false
        showLoader.value = false
        resolve()
      }, 100)
    })
  }
})

if (process.server) {
  isInitializing.value = false
  showLoader.value = false
}
</script>

<style scoped>
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
</style> 