import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'

// 全局加载状态管理
const isAppInitializing = ref(true)

export const useAppLoader = () => {
  const userStore = useUserStore()

  // 是否正在加载
  const isLoading = computed(() => {
    return isAppInitializing.value || !userStore.isInitialized
  })

  // 完成初始化
  const finishInitialization = () => {
    isAppInitializing.value = false
  }

  // 重置初始化状态
  const resetInitialization = () => {
    isAppInitializing.value = true
  }

  // 应用初始化
  const initializeApp = async () => {
    try {
      resetInitialization()
      
      // 初始化用户状态
      await userStore.initializeAuth()
      
      // 模拟其他系统初始化
      await new Promise(resolve => setTimeout(resolve, 800))
      
      finishInitialization()

    } catch (error) {
      console.error('应用初始化失败:', error)
      finishInitialization() // 即使失败也要完成初始化，避免无限加载
    }
  }

  // 页面级初始化
  const initializePage = async (pageName: string, initFunction: () => Promise<void>) => {
    try {
      isAppInitializing.value = true
      await initFunction()
      finishInitialization()
    } catch (error) {
      console.error(`${pageName}页面初始化失败:`, error)
      finishInitialization()
    }
  }

  return {
    // 状态
    isLoading,
    
    // 方法
    initializeApp,
    initializePage,
    finishInitialization,
    resetInitialization
  }
} 