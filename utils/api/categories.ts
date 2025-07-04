import { apiClient } from '../apiClient'
import type { 
  ProductCategory, 
  CategoryCreateInput,
  PaginationParams,
  ApiResponse 
} from '../../types/api'

// 分类查询参数
export interface CategoryQueryParams extends PaginationParams {
  status?: 'active' | 'inactive'
  search?: string
}

// 产品分类相关API
export const categoriesApi = {
  // 获取分类列表
  getCategories: (params?: CategoryQueryParams): Promise<ApiResponse<ProductCategory[]>> => 
    apiClient.getWithParams('/categories', params, { requireAuth: false }),

  // 获取所有激活的分类（不分页）
  getActiveCategories: (): Promise<ApiResponse<ProductCategory[]>> => 
    apiClient.get('/categories/active', { requireAuth: false }),

  // 根据ID获取分类详情
  getCategoryById: (id: number): Promise<ApiResponse<ProductCategory>> => 
    apiClient.get(`/categories/${id}`, { requireAuth: false }),

  // 根据slug获取分类详情
  getCategoryBySlug: (slug: string): Promise<ApiResponse<ProductCategory>> => 
    apiClient.get(`/categories/slug/${slug}`, { requireAuth: false }),

  // 创建分类（管理员功能）
  createCategory: (categoryData: CategoryCreateInput): Promise<ApiResponse<ProductCategory>> => 
    apiClient.post('/categories', categoryData),

  // 更新分类（管理员功能）
  updateCategory: (id: number, categoryData: Partial<CategoryCreateInput>): Promise<ApiResponse<ProductCategory>> => 
    apiClient.put(`/categories/${id}`, categoryData),

  // 删除分类（管理员功能）
  deleteCategory: (id: number): Promise<ApiResponse<void>> => 
    apiClient.delete(`/categories/${id}`),

  // 批量删除分类（管理员功能）
  batchDeleteCategories: (ids: number[]): Promise<ApiResponse<void>> => 
    apiClient.post('/categories/batch-delete', { ids }),

  // 更新分类状态（管理员功能）
  updateCategoryStatus: (id: number, status: 'active' | 'inactive'): Promise<ApiResponse<ProductCategory>> => 
    apiClient.patch(`/categories/${id}/status`, { status }),

  // 更新分类排序（管理员功能）
  updateCategoryOrder: (orders: { id: number; sort_order: number }[]): Promise<ApiResponse<void>> => 
    apiClient.post('/categories/update-order', { orders }),

  // 获取分类统计信息（管理员功能）
  getCategoryStats: (): Promise<ApiResponse<{ 
    total: number; 
    active: number; 
    inactive: number 
  }>> => 
    apiClient.get('/categories/stats')
}

export default categoriesApi 