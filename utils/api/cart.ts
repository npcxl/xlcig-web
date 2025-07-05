import { apiClient } from '../apiClient'
import type { ApiResponse } from '../../types/api'

// 购物车项目类型 - 匹配后端数据结构
export interface CartItem {
  id: number
  user_id: number
  product_id: number
  quantity: number
  selected: boolean
  
  // 产品快照信息
  product_snapshot: any
  
  // 常用字段
  product_name: string
  product_brand?: string
  product_category?: string
  product_price: number
  product_original_price?: number
  product_image?: string
  product_sku?: string
  product_model?: string
  product_slug?: string
  
  // 库存状态
  in_stock: boolean
  stock_count?: number
  
  // 评价信息
  rating?: number
  review_count?: number
  view_count?: number
  sales?: number
  
  // 产品规格等
  specs?: any
  features?: any
  tags?: any
  images?: any
  
  // 时间戳
  created_at: string
  updated_at: string
  product_updated_at?: string
}

// 购物车统计信息
export interface CartSummary {
  totalItems: number
  selectedItems: number
  totalPrice: number
  originalTotalPrice: number
  savings: number
  shippingFee: number
  finalPrice: number
  selectedItemsCount: number
  outOfStockCount: number
  availableCount: number
}

// 添加到购物车的数据
export interface AddToCartData {
  productId: number
  quantity?: number
}

// 更新购物车项目数据
export interface UpdateCartItemData {
  quantity?: number
  selected?: boolean
}

// 库存检查结果
export interface StockCheckResult {
  available: CartItem[]
  outOfStock: CartItem[]
  insufficient: CartItem[]
  updated: CartItem[]
  summary: {
    total: number
    availableCount: number
    outOfStockCount: number
    insufficientCount: number
    updatedCount: number
  }
}

// 运费估算结果
export interface ShippingEstimate {
  standard: { fee: number; days: string }
  express: { fee: number; days: string }
  overnight: { fee: number; days: string }
}

// 购物车相关API
export const cartApi = {
  // 获取购物车列表
  getCartItems: (): Promise<ApiResponse<CartItem[]>> => 
    apiClient.get('/cart'),

  // 获取购物车统计信息
  getCartSummary: (): Promise<ApiResponse<CartSummary>> => 
    apiClient.get('/cart/summary'),

  // 添加商品到购物车
  addToCart: (data: AddToCartData): Promise<ApiResponse<any>> => 
    apiClient.post('/cart', data),

  // 更新购物车项目
  updateCartItem: (id: number, data: UpdateCartItemData): Promise<ApiResponse<any>> => 
    apiClient.put(`/cart/${id}`, data),

  // 删除购物车项目
  removeCartItem: (id: number): Promise<ApiResponse<void>> => 
    apiClient.delete(`/cart/${id}`),

  // 批量删除购物车项目
  batchRemoveCartItems: (ids: number[]): Promise<ApiResponse<void>> => 
    apiClient.post('/cart/batch-delete', { ids }),

  // 清空购物车
  clearCart: (): Promise<ApiResponse<void>> => 
    apiClient.delete('/cart/clear'),

  // 选择/取消选择购物车项目
  toggleCartItemSelection: (id: number, selected: boolean): Promise<ApiResponse<any>> => 
    apiClient.patch(`/cart/${id}/select`, { selected }),

  // 全选/取消全选购物车项目
  toggleAllCartItems: (selected: boolean): Promise<ApiResponse<any>> => 
    apiClient.patch('/cart/select-all', { selected }),

  // 检查库存状态
  checkStock: (): Promise<ApiResponse<StockCheckResult>> => 
    apiClient.get('/cart/check-stock'),

  // 刷新购物车产品信息
  refreshCartItems: (productIds?: number[]): Promise<ApiResponse<{ updated: number }>> => 
    apiClient.post('/cart/refresh', { productIds }),

  // 获取推荐商品
  getRecommendations: (limit: number = 8): Promise<ApiResponse<any[]>> => 
    apiClient.get(`/cart/recommendations?limit=${limit}`),

  // 预估运费
  estimateShipping: (data?: any): Promise<ApiResponse<ShippingEstimate>> => 
    apiClient.post('/cart/estimate-shipping', data),

  // 应用优惠券
  applyCoupon: (couponCode: string): Promise<ApiResponse<{
    discount: number
    couponId: number
    finalPrice: number
  }>> => 
    apiClient.post('/cart/apply-coupon', { couponCode }),

  // 移除优惠券
  removeCoupon: (): Promise<ApiResponse<CartSummary>> => 
    apiClient.delete('/cart/coupon')
}

export default cartApi 