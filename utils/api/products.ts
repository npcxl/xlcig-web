import { apiClient } from '../apiClient'
import type { 
  Product, 
  ProductCreateInput,
  ProductQueryParams,
  ApiResponse 
} from '../../types/api'

// 产品相关API
export const productsApi = {
  // 获取产品列表
  getProducts: (params?: ProductQueryParams): Promise<ApiResponse<Product[]>> => 
    apiClient.getWithParams('/product', params, { requireAuth: false }),

  // 获取热门产品
  getHotProducts: (limit: number = 10): Promise<ApiResponse<Product[]>> => 
    apiClient.get(`/product/getHot?limit=${limit}`, { requireAuth: false }),

  // 获取推荐产品
  getFeaturedProducts: (limit: number = 10): Promise<ApiResponse<Product[]>> => 
    apiClient.get(`/product/featured?limit=${limit}`, { requireAuth: false }),

  // 获取最新产品
  getLatestProducts: (limit: number = 10): Promise<ApiResponse<Product[]>> => 
    apiClient.get(`/product/latest?limit=${limit}`, { requireAuth: false }),

  // 根据分类获取产品
  getProductsByCategory: (categoryId: number, params?: Omit<ProductQueryParams, 'category_id'>): Promise<ApiResponse<Product[]>> => 
    apiClient.getWithParams(`/product/category/${categoryId}`, params, { requireAuth: false }),

  // 根据品牌获取产品
  getProductsByBrand: (brand: string, params?: Omit<ProductQueryParams, 'brand'>): Promise<ApiResponse<Product[]>> => 
    apiClient.getWithParams(`/product/brand/${encodeURIComponent(brand)}`, params, { requireAuth: false }),

  // 根据ID获取产品详情
  getProductById: (id: number): Promise<ApiResponse<Product>> => 
    apiClient.get(`/product/${id}`, { requireAuth: false }),

  // 根据slug获取产品详情
  getProductBySlug: (slug: string): Promise<ApiResponse<Product>> => 
    apiClient.get(`/product/slug/${slug}`, { requireAuth: false }),

  // 搜索产品
  searchProducts: (query: string, params?: Omit<ProductQueryParams, 'search'>): Promise<ApiResponse<Product[]>> => 
    apiClient.getWithParams('/product/search', { search: query, ...params }, { requireAuth: false }),

  // 获取产品规格对比
  compareProducts: (productIds: number[]): Promise<ApiResponse<Product[]>> => 
    apiClient.post('/product/compare', { productIds }, { requireAuth: false }),

  // 获取相关产品
  getRelatedProducts: (productId: number, limit: number = 8): Promise<ApiResponse<Product[]>> => 
    apiClient.get(`/product/${productId}/related?limit=${limit}`, { requireAuth: false }),

  // 获取产品价格历史
  getPriceHistory: (productId: number, days: number = 30): Promise<ApiResponse<{ date: string; price: number }[]>> => 
    apiClient.get(`/product/${productId}/price-history?days=${days}`, { requireAuth: false }),

  // 获取所有品牌
  getBrands: (): Promise<ApiResponse<string[]>> => 
    apiClient.get('/product/brands', { requireAuth: false }),

  // 获取价格区间
  getPriceRange: (categoryId?: number): Promise<ApiResponse<{ min: number; max: number }>> => 
    apiClient.getWithParams('/product/price-range', categoryId ? { category_id: categoryId } : undefined, { requireAuth: false }),

  // 创建产品（商家功能）
  createProduct: (productData: ProductCreateInput): Promise<ApiResponse<Product>> => 
    apiClient.post('/product', productData),

  // 更新产品（商家功能）
  updateProduct: (id: number, productData: Partial<ProductCreateInput>): Promise<ApiResponse<Product>> => 
    apiClient.put(`/product/${id}`, productData),

  // 删除产品（商家功能）
  deleteProduct: (id: number): Promise<ApiResponse<void>> => 
    apiClient.delete(`/product/${id}`),

  // 批量删除产品（商家功能）
  batchDeleteProducts: (ids: number[]): Promise<ApiResponse<void>> => 
    apiClient.post('/product/batch-delete', { ids }),

  // 更新产品状态（商家功能）
  updateProductStatus: (id: number, status: 'active' | 'inactive' | 'out_of_stock'): Promise<ApiResponse<Product>> => 
    apiClient.patch(`/product/${id}/status`, { status }),

  // 更新产品库存（商家功能）
  updateProductStock: (id: number, stock: number): Promise<ApiResponse<Product>> => 
    apiClient.patch(`/product/${id}/stock`, { stock }),

  // 上传产品图片（商家功能）
  uploadProductImages: (productId: number, files: File[]): Promise<ApiResponse<string[]>> => {
    const formData = new FormData()
    files.forEach(file => formData.append('images', file))
    return apiClient.upload(`/product/${productId}/images`, formData)
  },

  // 删除产品图片（商家功能）
  deleteProductImage: (productId: number, imageUrl: string): Promise<ApiResponse<void>> => 
    apiClient.delete(`/product/${productId}/images?imageUrl=${encodeURIComponent(imageUrl)}`),

  // 获取产品统计信息（管理员功能）
  getProductStats: (): Promise<ApiResponse<{ 
    total: number; 
    active: number; 
    inactive: number;
    out_of_stock: number;
    featured: number;
    hot: number;
  }>> => 
    apiClient.get('/product/stats')
}

export default productsApi 