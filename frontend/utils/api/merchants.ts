import { apiClient } from '../apiClient'
import type { 
  Merchant, 
  MerchantCreateInput,
  MerchantQueryParams,
  ApiResponse 
} from '../../types/api'

// 商家相关API
export const merchantsApi = {
  // 获取商家列表
  getMerchants: (params?: MerchantQueryParams): Promise<ApiResponse<Merchant[]>> => 
    apiClient.getWithParams('/merchants', params, { requireAuth: false }),

  // 获取推荐商家
  getFeaturedMerchants: (limit: number = 10): Promise<ApiResponse<Merchant[]>> => 
    apiClient.get(`/merchants/featured?limit=${limit}`, { requireAuth: false }),

  // 获取顶级商家
  getTopMerchants: (limit: number = 10): Promise<ApiResponse<Merchant[]>> => 
    apiClient.get(`/merchants/top?limit=${limit}`, { requireAuth: false }),

  // 根据ID获取商家详情
  getMerchantById: (id: number): Promise<ApiResponse<Merchant>> => 
    apiClient.get(`/merchants/${id}`, { requireAuth: false }),

  // 根据类型获取商家
  getMerchantsByType: (type: 'verified' | 'premium' | 'basic', params?: Omit<MerchantQueryParams, 'type'>): Promise<ApiResponse<Merchant[]>> => 
    apiClient.getWithParams(`/merchants/type/${type}`, params, { requireAuth: false }),

  // 根据地区获取商家
  getMerchantsByLocation: (location: string, params?: Omit<MerchantQueryParams, 'location'>): Promise<ApiResponse<Merchant[]>> => 
    apiClient.getWithParams(`/merchants/location/${encodeURIComponent(location)}`, params, { requireAuth: false }),

  // 根据专业领域获取商家
  getMerchantsBySpecialty: (specialty: string): Promise<ApiResponse<Merchant[]>> => 
    apiClient.get(`/merchants/specialty/${encodeURIComponent(specialty)}`, { requireAuth: false }),

  // 搜索商家
  searchMerchants: (query: string, params?: Omit<MerchantQueryParams, 'search'>): Promise<ApiResponse<Merchant[]>> => 
    apiClient.getWithParams('/merchants/search', { search: query, ...params }, { requireAuth: false }),

  // 获取商家产品
  getMerchantProducts: (merchantId: number, params?: { page?: number; limit?: number }): Promise<ApiResponse<any[]>> => 
    apiClient.getWithParams(`/merchants/${merchantId}/products`, params, { requireAuth: false }),

  // 获取商家配置
  getMerchantConfigs: (merchantId: number, params?: { page?: number; limit?: number }): Promise<ApiResponse<any[]>> => 
    apiClient.getWithParams(`/merchants/${merchantId}/configs`, params, { requireAuth: false }),

  // 获取商家评价
  getMerchantReviews: (merchantId: number, params?: { page?: number; limit?: number }): Promise<ApiResponse<any[]>> => 
    apiClient.getWithParams(`/merchants/${merchantId}/reviews`, params, { requireAuth: false }),

  // 获取商家订单（商家自己查看）
  getMerchantOrders: (params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<any[]>> => 
    apiClient.getWithParams('/merchants/my/orders', params),

  // 获取商家统计（商家自己查看）
  getMerchantStats: (): Promise<ApiResponse<{
    products: number
    configs: number
    orders: number
    revenue: number
    rating: number
    reviews: number
  }>> => 
    apiClient.get('/merchants/my/stats'),

  // 创建商家（用户申请成为商家）
  createMerchant: (merchantData: MerchantCreateInput): Promise<ApiResponse<Merchant>> => 
    apiClient.post('/merchants', merchantData),

  // 更新商家信息（商家自己更新）
  updateMerchant: (merchantData: Partial<MerchantCreateInput>): Promise<ApiResponse<Merchant>> => 
    apiClient.put('/merchants/my', merchantData),

  // 获取当前商家信息（商家自己查看）
  getMyMerchant: (): Promise<ApiResponse<Merchant>> => 
    apiClient.get('/merchants/my'),

  // 上传商家Logo
  uploadMerchantLogo: (file: File): Promise<ApiResponse<{ logoUrl: string }>> => {
    const formData = new FormData()
    formData.append('logo', file)
    return apiClient.upload('/merchants/my/logo', formData)
  },

  // 删除商家（管理员功能）
  deleteMerchant: (id: number): Promise<ApiResponse<void>> => 
    apiClient.delete(`/merchants/${id}`),

  // 更新商家状态（管理员功能）
  updateMerchantStatus: (id: number, status: 'active' | 'inactive'): Promise<ApiResponse<Merchant>> => 
    apiClient.patch(`/merchants/${id}/status`, { status }),

  // 审核商家（管理员功能）
  approveMerchant: (id: number): Promise<ApiResponse<Merchant>> => 
    apiClient.patch(`/merchants/${id}/approve`),

  // 拒绝商家申请（管理员功能）
  rejectMerchant: (id: number, reason: string): Promise<ApiResponse<void>> => 
    apiClient.patch(`/merchants/${id}/reject`, { reason }),

  // 获取待审核商家列表（管理员功能）
  getPendingMerchants: (): Promise<ApiResponse<Merchant[]>> => 
    apiClient.get('/merchants/pending'),

  // 获取所有商家统计（管理员功能）
  getAllMerchantsStats: (): Promise<ApiResponse<{
    total: number
    verified: number
    premium: number
    basic: number
    active: number
    inactive: number
    pending: number
  }>> => 
    apiClient.get('/merchants/admin/stats'),

  // 获取商家地区列表
  getMerchantLocations: (): Promise<ApiResponse<string[]>> => 
    apiClient.get('/merchants/locations', { requireAuth: false }),

  // 获取商家专业领域列表
  getMerchantSpecialties: (): Promise<ApiResponse<string[]>> => 
    apiClient.get('/merchants/specialties', { requireAuth: false }),

  // 商家认证申请
  applyVerification: (documents: File[]): Promise<ApiResponse<void>> => {
    const formData = new FormData()
    documents.forEach((file, index) => {
      formData.append(`document_${index}`, file)
    })
    return apiClient.upload('/merchants/my/verify', formData)
  },

  // 获取商家认证状态
  getVerificationStatus: (): Promise<ApiResponse<{
    status: 'pending' | 'approved' | 'rejected' | 'none'
    submittedAt?: string
    processedAt?: string
    reason?: string
  }>> => 
    apiClient.get('/merchants/my/verification')
}

export default merchantsApi 