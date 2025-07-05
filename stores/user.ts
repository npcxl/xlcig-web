import { defineStore } from 'pinia'
import type { User } from '../utils/api'

export interface UserState {
  isLoggedIn: boolean
  user: User | null
  token: string | null
  isInitialized: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    user: null,
    token: null,
    isInitialized: false
  }),

  getters: {
    // 获取用户头像，优先返回头像URL，否则返回首字母
    userAvatar: (state): string => {
      if (state.user?.avatar) {
        return state.user.avatar
      }
      const displayName = state.user?.nickname || state.user?.username || 'U'
      return displayName.charAt(0).toUpperCase()
    },

    // 获取用户显示名称
    userDisplayName: (state): string => {
      return state.user?.nickname || state.user?.username || '用户'
    },

    // 检查是否有真实头像图片
    hasAvatarImage: (state): boolean => {
      return !!state.user?.avatar
    }
  },

  actions: {
    // 初始化用户状态（从localStorage加载）
    async initializeAuth() {
      return new Promise<void>((resolve) => {
      if (typeof window !== 'undefined') {
        try {
          const token = localStorage.getItem('authToken')
          const userInfo = localStorage.getItem('userInfo')
          
          if (token && userInfo) {
            this.token = token
            this.user = JSON.parse(userInfo)
            this.isLoggedIn = true
          } else {
            this.clearAuth()
          }
        } catch (error) {
          console.error('初始化用户状态失败:', error)
          this.clearAuth()
        }
      }
        this.isInitialized = true
        resolve()
      })
    },

    // 设置用户登录状态
    setAuth(token: string, user: User) {
      this.token = token
      this.user = user
      this.isLoggedIn = true
      
      // 同步到localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token)
        localStorage.setItem('userInfo', JSON.stringify(user))
      }
    },

    // 更新用户信息
    updateUser(user: User) {
      this.user = user
      
      // 同步到localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userInfo', JSON.stringify(user))
      }
    },

    // 清除用户状态
    clearAuth() {
      this.token = null
      this.user = null
      this.isLoggedIn = false
      // 保持 isInitialized 状态，因为初始化过程已完成
      
      // 清除localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userInfo')
      }
    },

    // 登出
    logout() {
      this.clearAuth()
      
      // 可以在这里添加登出后的跳转逻辑
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
    }
  }
}) 