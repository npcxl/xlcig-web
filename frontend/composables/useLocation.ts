import { ref, reactive, computed, toRefs, readonly } from 'vue'
import { getIpLocation, refreshIpLocation, type IpLocationResponse } from '../utils/api/location'
import { useMessage } from './useMessage'
import { useUserStore } from '../stores/user'

// IP定位状态类型
interface LocationState {
  loading: boolean
  data: IpLocationResponse | null
  error: string | null
  lastUpdated: Date | null
}

export const useLocation = () => {
  const { success, error, warning } = useMessage()
  const userStore = useUserStore()
  
  // 响应式状态
  const state = reactive<LocationState>({
    loading: false,
    data: null,
    error: null,
    lastUpdated: null
  })
  
  // 是否自动获取过定位
  const hasAutoFetched = ref(false)
  
  /**
   * 获取IP定位信息
   * @param showNotification 是否显示通知消息
   * @param forceRefresh 是否强制刷新（忽略缓存）
   */
  const fetchLocation = async (showNotification = false, forceRefresh = false) => {
    if (state.loading) return state.data
    
    state.loading = true
    state.error = null
    
    try {
      // 前端检查：只有登录用户才调用API进console.log('fetchLocation')行数据库更新
      const isLoggedIn = userStore.isLoggedIn
      
      const response = forceRefresh 
        ? await refreshIpLocation() 
        : await getIpLocation()
      
      if (response.success && response.data) {
        state.data = response.data
        state.lastUpdated = new Date()
        
        if (showNotification) {
          const { location, user } = response.data
          if (location.error) {
            warning('IP定位失败: ' + location.error)
          } else {
            // 改进的通知消息处理
            const province = location.province
            const city = location.city
            const cacheText = response.data.cached ? '(缓存)' : ''
            
            let locationText = ''
            let messageType: 'success' | 'warning' = 'success'
            
            if (province && city) {
              locationText = `${province} ${city}`
            } else if (province || city) {
              locationText = `${province || city} (部分位置信息)`
              messageType = 'warning'
            } else {
              locationText = '位置信息不精确'
              messageType = 'warning'
            }
            
            const baseMessage = `定位结果: ${locationText}${cacheText}`
            
            if (isLoggedIn && user?.locationUpdated) {
              if (messageType === 'success') {
                success(`${baseMessage}，登录信息已更新`)
              } else {
                warning(`${baseMessage}，登录信息已更新`)
              }
            } else if (isLoggedIn && !user?.locationUpdated) {
              warning(`${baseMessage}，但登录信息未更新`)
            } else {
              if (messageType === 'success') {
                success(`${baseMessage}（未登录状态）`)
              } else {
                warning(`${baseMessage}（未登录状态）`)
              }
            }
          }
        }
      } else {
        state.error = response.message || '获取定位信息失败'
        if (showNotification) {
          error(state.error)
        }
      }
      
      return state.data
    } catch (err: any) {
      state.error = err.message || '网络错误'
      if (showNotification) {
        error('获取定位信息失败')
      }
      console.error('IP定位错误:', err)
      return null
    } finally {
      state.loading = false
    }
  }
  
  /**
   * 自动获取定位信息（仅在首次调用时执行）
   * 适用于在应用启动时自动获取定位
   */
  const autoFetchLocation = async () => {
    if (hasAutoFetched.value) return state.data
    
    hasAutoFetched.value = true
    
    // 确保用户store已初始化
    userStore.initializeAuth()
    
    return await fetchLocation(false, false)
  }
  
  /**
   * 强制刷新定位信息
   */
  const refreshLocation = async (showNotification = true) => {
    return await fetchLocation(showNotification, true)
  }
  
  /**
   * 获取当前定位的文本描述
   */
  const getLocationText = () => {
    if (!state.data?.location) return '未知位置'
    
    const { location } = state.data
    if (location.error) return '定位失败'
    
    // 改进的位置文本处理
    const province = location.province
    const city = location.city
    
    if (province && city) {
      return `${province} ${city}`
    } else if (province) {
      return `${province} (城市未知)`
    } else if (city) {
      return `${city} (省份未知)`
    } else {
      // 当省市都为null时，提供更友好的提示
      return '位置信息不精确'
    }
  }
  
  /**
   * 检查是否有定位数据
   */
  const hasLocation = computed(() => {
    return !!(state.data?.location && !state.data.location.error)
  })
  
  /**
   * 检查用户是否已登录且登录IP已更新
   */
  const isUserLocationUpdated = computed(() => {
    return !!(state.data?.user?.locationUpdated)
  })
  
  /**
   * 获取IP地址
   */
  const currentIp = computed(() => {
    return state.data?.ip || '未知'
  })
  
  /**
   * 检查用户登录状态（前端判断）
   */
  const isUserLoggedIn = computed(() => {
    return userStore.isLoggedIn
  })
  
  return {
    // 状态
    ...toRefs(state),
    hasAutoFetched: readonly(hasAutoFetched),
    
    // 方法
    fetchLocation,
    autoFetchLocation,
    refreshLocation,
    getLocationText,
    
    // 计算属性
    hasLocation,
    isUserLocationUpdated,
    currentIp,
    isUserLoggedIn,
    
    // 原始状态（用于需要完整状态的场景）
    locationState: readonly(state)
  }
} 