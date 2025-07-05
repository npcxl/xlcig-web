import { ref, onMounted, watch, nextTick, readonly } from 'vue'
import { useRoute } from 'vue-router'

// 全局缓存对象
const pageCache = new Map()

export const usePageLoader = (options = {}) => {
  const {
    // 最小加载时间（毫秒）
    minLoadTime = 500,
    // 自定义加载函数
    loadFunction = null,
    // 页面准备好的回调
    onPageReady = null,
    // 缓存键名
    cacheKey = null,
    // 是否启用缓存
    enableCache = true
  } = options

  const route = useRoute()
  
  // 响应式状态
  const isPageLoading = ref(true)
  const isDataLoading = ref(true)
  const isPageReady = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  // 生成缓存键
  const getCacheKey = () => {
    return cacheKey || route.path
  }

  // 检查缓存
  const checkCache = () => {
    if (!enableCache) return null
    
    const key = getCacheKey()
    return pageCache.get(key)
  }

  // 设置缓存
  const setCache = (data) => {
    if (!enableCache) return
    
    const key = getCacheKey()
    pageCache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  // 开始加载
  const startLoading = async () => {
    try {
      // 检查缓存
      const cached = checkCache()
      if (cached) {
        // 使用缓存数据，快速显示
        isPageLoading.value = false
        isDataLoading.value = false
        isPageReady.value = true
        hasError.value = false
        errorMessage.value = ''
        
        if (onPageReady && typeof onPageReady === 'function') {
          onPageReady(cached.data)
        }
        return cached.data
      }

      isPageLoading.value = true
      isDataLoading.value = true
      hasError.value = false
      errorMessage.value = ''

      let loadPromise = Promise.resolve()
      let result = null
      
      // 如果有自定义加载函数，执行它
      if (loadFunction && typeof loadFunction === 'function') {
        loadPromise = loadFunction()
      }
      
      // 确保最小加载时间和数据加载都完成
      const [loadResult] = await Promise.all([
        loadPromise,
        new Promise(resolve => setTimeout(resolve, minLoadTime))
      ])
      
      result = loadResult
      
      // 缓存结果
      if (result) {
        setCache(result)
      }
      
      // 加载完成
      isPageLoading.value = false
      isDataLoading.value = false
      isPageReady.value = true
      
      // 调用页面准备回调
      if (onPageReady && typeof onPageReady === 'function') {
        onPageReady(result)
      }
      
      return result
      
    } catch (error) {
      console.error('页面加载失败:', error)
      hasError.value = true
      errorMessage.value = error.message || '页面加载失败'
      isPageLoading.value = false
      isDataLoading.value = false
      throw error
    }
  }

  // 重新加载页面
  const reloadPage = async () => {
    // 清除缓存
    const key = getCacheKey()
    pageCache.delete(key)
    
    await startLoading()
  }

  // 设置加载状态
  const setLoading = (loading) => {
    isDataLoading.value = loading
    isPageLoading.value = loading
  }

  // 设置错误状态
  const setError = (error) => {
    hasError.value = true
    errorMessage.value = error
    isPageLoading.value = false
    isDataLoading.value = false
  }

  // 清除错误状态
  const clearError = () => {
    hasError.value = false
    errorMessage.value = ''
  }

  // 清除缓存
  const clearCache = () => {
    const key = getCacheKey()
    pageCache.delete(key)
  }

  // 监听路由变化，重置状态
  watch(() => route.path, (newPath, oldPath) => {
    // 路由变化时不自动重新加载，让组件的 onMounted 处理
    // 这样可以避免重复加载和状态冲突
    console.log('路由变化:', oldPath, '->', newPath)
  })

  // 生命周期钩子
  onMounted(() => {
    startLoading()
  })

  return {
    // 状态
    isPageLoading: readonly(isPageLoading),
    isDataLoading: readonly(isDataLoading),
    isPageReady: readonly(isPageReady),
    hasError: readonly(hasError),
    errorMessage: readonly(errorMessage),
    
    // 方法
    startLoading,
    reloadPage,
    setLoading,
    setError,
    clearError,
    clearCache
  }
}

// 预定义的加载选项
export const pageLoaderPresets = {
  // 快速加载（适用于静态页面）
  fast: {
    minLoadTime: 300,
    enableCache: true
  },
  
  // 标准加载（适用于大多数页面）
  standard: {
    minLoadTime: 500,
    enableCache: true
  },
  
  // 慢速加载（适用于数据密集型页面）
  slow: {
    minLoadTime: 800,
    enableCache: true
  },
  
  // 无缓存加载
  noCache: {
    minLoadTime: 500,
    enableCache: false
  }
} 