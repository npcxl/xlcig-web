import { apiClient } from '../apiClient'
import type { 
  ComputerConfig, 
  ConfigCreateInput,
  ConfigQueryParams,
  ApiResponse 
} from '../../types/api'

// 电脑配置相关API
export const configsApi = {
  // 获取配置列表
  getConfigs: (params?: ConfigQueryParams): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.getWithParams('/configs', params, { requireAuth: false }),

  // 获取推荐配置
  getFeaturedConfigs: (limit: number = 10): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.get(`/configs/featured?limit=${limit}`, { requireAuth: false }),

  // 获取热门配置
  getHotConfigs: (limit: number = 10): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.get(`/configs/hot?limit=${limit}`, { requireAuth: false }),

  // 获取最新配置
  getLatestConfigs: (limit: number = 10): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.get(`/configs/latest?limit=${limit}`, { requireAuth: false }),

  // 根据分类获取配置
  getConfigsByCategory: (category: string, params?: Omit<ConfigQueryParams, 'category'>): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.getWithParams(`/configs/category/${category}`, params, { requireAuth: false }),

  // 根据商家获取配置
  getConfigsByMerchant: (merchantId: number, params?: Omit<ConfigQueryParams, 'merchant_id'>): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.getWithParams(`/configs/merchant/${merchantId}`, params, { requireAuth: false }),

  // 根据价格区间获取配置
  getConfigsByPrice: (minPrice: number, maxPrice: number, params?: Omit<ConfigQueryParams, 'min_price' | 'max_price'>): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.getWithParams('/configs/price-range', { min_price: minPrice, max_price: maxPrice, ...params }, { requireAuth: false }),

  // 根据ID获取配置详情
  getConfigById: (id: number): Promise<ApiResponse<ComputerConfig>> => 
    apiClient.get(`/configs/${id}`, { requireAuth: false }),

  // 根据slug获取配置详情
  getConfigBySlug: (slug: string): Promise<ApiResponse<ComputerConfig>> => 
    apiClient.get(`/configs/slug/${slug}`, { requireAuth: false }),

  // 搜索配置
  searchConfigs: (query: string, params?: Omit<ConfigQueryParams, 'search'>): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.getWithParams('/configs/search', { search: query, ...params }, { requireAuth: false }),

  // 配置对比
  compareConfigs: (configIds: number[]): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.post('/configs/compare', { configIds }, { requireAuth: false }),

  // 获取相似配置
  getSimilarConfigs: (configId: number, limit: number = 6): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.get(`/configs/${configId}/similar?limit=${limit}`, { requireAuth: false }),

  // 获取配置推荐（基于预算）
  getRecommendedConfigs: (budget: number, category?: string): Promise<ApiResponse<ComputerConfig[]>> => 
    apiClient.getWithParams('/configs/recommend', { budget, category }, { requireAuth: false }),

  // 获取配置性能评分详情
  getConfigPerformance: (configId: number): Promise<ApiResponse<{
    cpu_score: number
    gpu_score: number
    memory_score: number
    storage_score: number
    overall_score: number
    gaming_performance: number
    work_performance: number
  }>> => 
    apiClient.get(`/configs/${configId}/performance`, { requireAuth: false }),

  // 获取配置价格历史
  getConfigPriceHistory: (configId: number, days: number = 30): Promise<ApiResponse<{ date: string; price: number }[]>> => 
    apiClient.get(`/configs/${configId}/price-history?days=${days}`, { requireAuth: false }),

  // 创建配置（商家功能）
  createConfig: (configData: ConfigCreateInput): Promise<ApiResponse<ComputerConfig>> => 
    apiClient.post('/configs', configData),

  // 更新配置（商家功能）
  updateConfig: (id: number, configData: Partial<ConfigCreateInput>): Promise<ApiResponse<ComputerConfig>> => 
    apiClient.put(`/configs/${id}`, configData),

  // 删除配置（商家功能）
  deleteConfig: (id: number): Promise<ApiResponse<void>> => 
    apiClient.delete(`/configs/${id}`),

  // 批量删除配置（商家功能）
  batchDeleteConfigs: (ids: number[]): Promise<ApiResponse<void>> => 
    apiClient.post('/configs/batch-delete', { ids }),

  // 更新配置状态（商家功能）
  updateConfigStatus: (id: number, status: 'active' | 'inactive' | 'out_of_stock'): Promise<ApiResponse<ComputerConfig>> => 
    apiClient.patch(`/configs/${id}/status`, { status }),

  // 更新配置库存（商家功能）
  updateConfigStock: (id: number, stock: number): Promise<ApiResponse<ComputerConfig>> => 
    apiClient.patch(`/configs/${id}/stock`, { stock }),

  // 上传配置图片（商家功能）
  uploadConfigImages: (configId: number, files: File[]): Promise<ApiResponse<string[]>> => {
    const formData = new FormData()
    files.forEach(file => formData.append('images', file))
    return apiClient.upload(`/configs/${configId}/images`, formData)
  },

  // 删除配置图片（商家功能）
  deleteConfigImage: (configId: number, imageUrl: string): Promise<ApiResponse<void>> => 
    apiClient.delete(`/configs/${configId}/images?imageUrl=${encodeURIComponent(imageUrl)}`),

  // 复制配置（商家功能）
  cloneConfig: (id: number, newName?: string): Promise<ApiResponse<ComputerConfig>> => 
    apiClient.post(`/configs/${id}/clone`, { newName }),

  // 获取配置统计信息（管理员功能）
  getConfigStats: (): Promise<ApiResponse<{ 
    total: number; 
    by_category: Record<string, number>;
    active: number; 
    inactive: number;
    out_of_stock: number;
    featured: number;
    avg_price: number;
  }>> => 
    apiClient.get('/configs/stats'),

  // 获取配置分类统计
  getCategoryStats: (): Promise<ApiResponse<{
    office: number
    gaming: number
    workstation: number
    budget: number
    high_end: number
  }>> => 
    apiClient.get('/configs/category-stats', { requireAuth: false })
}

export default configsApi 