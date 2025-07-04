import { apiClient } from '../apiClient'
import type { SystemStats, ApiResponse } from '../../types/api'

// 系统设置类型
export interface SystemSettings {
  siteName: string
  siteDescription: string
  siteKeywords: string
  logo: string
  favicon: string
  contactEmail: string
  contactPhone: string
  address: string
  icp?: string
  enableRegistration: boolean
  enableMerchantRegistration: boolean
  defaultShippingFee: number
  freeShippingThreshold: number
  orderTimeout: number // 分钟
  refundTimeout: number // 天
  maintenanceMode: boolean
  maintenanceMessage?: string
}

// 轮播图类型
export interface Banner {
  id: number
  title: string
  image: string
  link?: string
  description?: string
  sort_order: number
  status: 'active' | 'inactive'
  start_time?: string
  end_time?: string
  created_at: string
  updated_at: string
}

// 公告类型
export interface Notice {
  id: number
  title: string
  content: string
  type: 'info' | 'warning' | 'success' | 'error'
  status: 'active' | 'inactive'
  is_popup: boolean
  sort_order: number
  start_time?: string
  end_time?: string
  created_at: string
  updated_at: string
}

// 系统相关API
export const systemApi = {
  // 获取系统统计信息
  getStats: (): Promise<ApiResponse<SystemStats>> => 
    apiClient.get('/system/stats', { requireAuth: false }),

  // 获取首页数据
  getHomeData: (): Promise<ApiResponse<{
    banners: Banner[]
    notices: Notice[]
    featuredProducts: any[]
    featuredConfigs: any[]
    topMerchants: any[]
    categories: any[]
  }>> => 
    apiClient.get('/system/home', { requireAuth: false }),

  // 获取系统设置
  getSettings: (): Promise<ApiResponse<SystemSettings>> => 
    apiClient.get('/system/settings', { requireAuth: false }),

  // 轮播图管理
  banners: {
    // 获取轮播图列表
    getBanners: (status?: 'active' | 'inactive'): Promise<ApiResponse<Banner[]>> => 
      apiClient.getWithParams('/system/banners', status ? { status } : undefined, { requireAuth: false }),

    // 获取轮播图详情
    getBannerById: (id: number): Promise<ApiResponse<Banner>> => 
      apiClient.get(`/system/banners/${id}`),

    // 创建轮播图（管理员功能）
    createBanner: (bannerData: Omit<Banner, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Banner>> => 
      apiClient.post('/system/banners', bannerData),

    // 更新轮播图（管理员功能）
    updateBanner: (id: number, bannerData: Partial<Omit<Banner, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiResponse<Banner>> => 
      apiClient.put(`/system/banners/${id}`, bannerData),

    // 删除轮播图（管理员功能）
    deleteBanner: (id: number): Promise<ApiResponse<void>> => 
      apiClient.delete(`/system/banners/${id}`),

    // 上传轮播图片（管理员功能）
    uploadBannerImage: (file: File): Promise<ApiResponse<{ imageUrl: string }>> => {
      const formData = new FormData()
      formData.append('image', file)
      return apiClient.upload('/system/banners/upload', formData)
    },

    // 批量更新排序（管理员功能）
    updateOrder: (orders: { id: number; sort_order: number }[]): Promise<ApiResponse<void>> => 
      apiClient.post('/system/banners/update-order', { orders })
  },

  // 公告管理
  notices: {
    // 获取公告列表
    getNotices: (status?: 'active' | 'inactive'): Promise<ApiResponse<Notice[]>> => 
      apiClient.getWithParams('/system/notices', status ? { status } : undefined, { requireAuth: false }),

    // 获取弹窗公告
    getPopupNotices: (): Promise<ApiResponse<Notice[]>> => 
      apiClient.get('/system/notices/popup', { requireAuth: false }),

    // 获取公告详情
    getNoticeById: (id: number): Promise<ApiResponse<Notice>> => 
      apiClient.get(`/system/notices/${id}`, { requireAuth: false }),

    // 创建公告（管理员功能）
    createNotice: (noticeData: Omit<Notice, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Notice>> => 
      apiClient.post('/system/notices', noticeData),

    // 更新公告（管理员功能）
    updateNotice: (id: number, noticeData: Partial<Omit<Notice, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiResponse<Notice>> => 
      apiClient.put(`/system/notices/${id}`, noticeData),

    // 删除公告（管理员功能）
    deleteNotice: (id: number): Promise<ApiResponse<void>> => 
      apiClient.delete(`/system/notices/${id}`),

    // 批量更新排序（管理员功能）
    updateOrder: (orders: { id: number; sort_order: number }[]): Promise<ApiResponse<void>> => 
      apiClient.post('/system/notices/update-order', { orders })
  },

  // 系统设置管理（管理员功能）
  settings: {
    // 更新系统设置
    updateSettings: (settings: Partial<SystemSettings>): Promise<ApiResponse<SystemSettings>> => 
      apiClient.put('/system/settings', settings),

    // 上传系统文件（logo、favicon等）
    uploadFile: (file: File, type: 'logo' | 'favicon' | 'other'): Promise<ApiResponse<{ fileUrl: string }>> => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)
      return apiClient.upload('/system/upload', formData)
    },

    // 清除缓存
    clearCache: (): Promise<ApiResponse<void>> => 
      apiClient.post('/system/clear-cache'),

    // 重建搜索索引
    rebuildIndex: (): Promise<ApiResponse<void>> => 
      apiClient.post('/system/rebuild-index'),

    // 导出系统数据
    exportData: (type: 'all' | 'users' | 'products' | 'orders'): Promise<ApiResponse<{ downloadUrl: string }>> => 
      apiClient.post('/system/export', { type }),

    // 导入系统数据
    importData: (file: File, type: 'users' | 'products' | 'categories'): Promise<ApiResponse<{
      success: number
      failed: number
      errors?: string[]
    }>> => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)
      return apiClient.upload('/system/import', formData)
    }
  },

  // 日志管理（管理员功能）
  logs: {
    // 获取系统日志
    getSystemLogs: (params?: {
      level?: 'error' | 'warn' | 'info' | 'debug'
      start_date?: string
      end_date?: string
      page?: number
      limit?: number
    }): Promise<ApiResponse<{
      id: number
      level: string
      message: string
      context?: any
      timestamp: string
    }[]>> => 
      apiClient.getWithParams('/system/logs', params),

    // 获取用户操作日志
    getUserLogs: (params?: {
      user_id?: number
      action?: string
      start_date?: string
      end_date?: string
      page?: number
      limit?: number
    }): Promise<ApiResponse<{
      id: number
      userId: number
      action: string
      details?: any
      ip?: string
      userAgent?: string
      timestamp: string
    }[]>> => 
      apiClient.getWithParams('/system/user-logs', params),

    // 清理日志
    cleanLogs: (days: number): Promise<ApiResponse<{ deleted: number }>> => 
      apiClient.post('/system/logs/clean', { days })
  },

  // 健康检查
  health: {
    // 检查系统健康状态
    check: (): Promise<ApiResponse<{
      status: 'healthy' | 'warning' | 'error'
      database: boolean
      redis?: boolean
      storage: boolean
      memory: {
        used: number
        total: number
        percentage: number
      }
      disk: {
        used: number
        total: number
        percentage: number
      }
      uptime: number
    }>> => 
      apiClient.get('/system/health', { requireAuth: false }),

    // 获取性能指标
    getMetrics: (): Promise<ApiResponse<{
      requests: {
        total: number
        per_second: number
        avg_response_time: number
      }
      database: {
        connections: number
        queries_per_second: number
        avg_query_time: number
      }
      cache: {
        hit_rate: number
        memory_usage: number
      }
      errors: {
        total: number
        rate: number
      }
    }>> => 
      apiClient.get('/system/metrics')
  }
}

export default systemApi 