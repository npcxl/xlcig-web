import { apiClient } from '../apiClient'
import type { ApiResponse } from '../../types/api'

// 购物车项目类型
export interface CartItem {
  id: number
  productId: number
  configId?: number
  name: string
  image: string
  price: number
  originalPrice?: number
  quantity: number
  stock: number
  selected: boolean
  specs?: Record<string, any>
  features?: string[]
  description?: string
  createdAt: string
  updatedAt: string
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
}

// 添加到购物车的数据
export interface AddToCartData {
  productId?: number
  configId?: number
  quantity: number
  specs?: Record<string, any>
}

// 更新购物车项目数据
export interface UpdateCartItemData {
  quantity?: number
  selected?: boolean
  specs?: Record<string, any>
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
  addToCart: (data: AddToCartData): Promise<ApiResponse<CartItem>> => 
    apiClient.post('/cart', data),

  // 批量添加商品到购物车
  batchAddToCart: (items: AddToCartData[]): Promise<ApiResponse<CartItem[]>> => 
    apiClient.post('/cart/batch', { items }),

  // 更新购物车项目
  updateCartItem: (id: number, data: UpdateCartItemData): Promise<ApiResponse<CartItem>> => 
    apiClient.put(`/cart/${id}`, data),

  // 批量更新购物车项目
  batchUpdateCartItems: (updates: { id: number, data: UpdateCartItemData }[]): Promise<ApiResponse<CartItem[]>> => 
    apiClient.put('/cart/batch', { updates }),

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
  toggleCartItemSelection: (id: number, selected: boolean): Promise<ApiResponse<CartItem>> => 
    apiClient.patch(`/cart/${id}/select`, { selected }),

  // 全选/取消全选购物车项目
  toggleAllCartItems: (selected: boolean): Promise<ApiResponse<CartItem[]>> => 
    apiClient.patch('/cart/select-all', { selected }),

  // 移动到收藏夹
  moveToWishlist: (id: number): Promise<ApiResponse<void>> => 
    apiClient.post(`/cart/${id}/move-to-wishlist`),

  // 从收藏夹移动到购物车
  moveFromWishlist: (productId: number, quantity: number = 1): Promise<ApiResponse<CartItem>> => 
    apiClient.post('/cart/from-wishlist', { productId, quantity }),

  // 检查库存状态
  checkStock: (): Promise<ApiResponse<{
    available: CartItem[]
    outOfStock: CartItem[]
    insufficient: CartItem[]
  }>> => 
    apiClient.get('/cart/check-stock'),

  // 获取推荐商品（基于购物车内容）
  getRecommendations: (limit: number = 8): Promise<ApiResponse<any[]>> => 
    apiClient.get(`/cart/recommendations?limit=${limit}`),

  // 同步本地购物车到服务器
  syncLocalCart: (localCartItems: Omit<AddToCartData, 'id'>[]): Promise<ApiResponse<CartItem[]>> => 
    apiClient.post('/cart/sync', { items: localCartItems }),

  // 获取购物车商品的优惠券
  getAvailableCoupons: (): Promise<ApiResponse<{
    id: number
    code: string
    name: string
    type: 'percentage' | 'fixed' | 'shipping'
    value: number
    minAmount: number
    maxDiscount?: number
    expiresAt: string
  }[]>> => 
    apiClient.get('/cart/coupons'),

  // 应用优惠券
  applyCoupon: (couponCode: string): Promise<ApiResponse<{
    discount: number
    couponId: number
    finalPrice: number
  }>> => 
    apiClient.post('/cart/apply-coupon', { couponCode }),

  // 移除优惠券
  removeCoupon: (): Promise<ApiResponse<CartSummary>> => 
    apiClient.delete('/cart/coupon'),

  // 预估运费
  estimateShipping: (addressId?: number, address?: {
    province: string
    city: string
    district: string
  }): Promise<ApiResponse<{
    standard: { fee: number, days: string }
    express: { fee: number, days: string }
    overnight: { fee: number, days: string }
  }>> => {
    const params = addressId ? { addressId } : address
    return apiClient.post('/cart/estimate-shipping', params)
  }
}

export default cartApi 