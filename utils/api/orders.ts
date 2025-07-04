import { apiClient } from '../apiClient'
import type { 
  Order, 
  OrderCreateInput,
  OrderQueryParams,
  ShippingAddress,
  ApiResponse 
} from '../../types/api'

// 支付方式类型
export interface PaymentData {
  method: 'alipay' | 'wechat' | 'bank_card' | 'credit_card'
  amount: number
  orderId?: string
}

// 订单相关API
export const ordersApi = {
  // 获取用户订单列表
  getMyOrders: (params?: Omit<OrderQueryParams, 'user_id'>): Promise<ApiResponse<Order[]>> => 
    apiClient.getWithParams('/orders/my', params),

  // 获取订单详情
  getOrderById: (id: number): Promise<ApiResponse<Order>> => 
    apiClient.get(`/orders/${id}`),

  // 根据订单号获取订单详情
  getOrderByNo: (orderNo: string): Promise<ApiResponse<Order>> => 
    apiClient.get(`/orders/no/${orderNo}`),

  // 创建订单
  createOrder: (orderData: OrderCreateInput): Promise<ApiResponse<Order>> => 
    apiClient.post('/orders', orderData),

  // 取消订单
  cancelOrder: (id: number, reason?: string): Promise<ApiResponse<Order>> => 
    apiClient.patch(`/orders/${id}/cancel`, { reason }),

  // 确认收货
  confirmOrder: (id: number): Promise<ApiResponse<Order>> => 
    apiClient.patch(`/orders/${id}/confirm`),

  // 申请退款
  requestRefund: (id: number, reason: string): Promise<ApiResponse<Order>> => 
    apiClient.patch(`/orders/${id}/refund`, { reason }),

  // 更新收货地址
  updateShippingAddress: (id: number, address: ShippingAddress): Promise<ApiResponse<Order>> => 
    apiClient.patch(`/orders/${id}/address`, address),

  // 添加订单备注
  addOrderNote: (id: number, note: string): Promise<ApiResponse<Order>> => 
    apiClient.patch(`/orders/${id}/note`, { note }),

  // 获取订单状态历史
  getOrderHistory: (id: number): Promise<ApiResponse<{
    id: number
    orderId: number
    status: string
    note?: string
    createdAt: string
  }[]>> => 
    apiClient.get(`/orders/${id}/history`),

  // 获取订单物流信息
  getOrderTracking: (id: number): Promise<ApiResponse<{
    trackingNo?: string
    carrier?: string
    status: string
    updates: {
      time: string
      location: string
      description: string
    }[]
  }>> => 
    apiClient.get(`/orders/${id}/tracking`),

  // 创建支付订单
  createPayment: (orderId: number, paymentData: PaymentData): Promise<ApiResponse<{
    paymentId: string
    paymentUrl?: string
    qrCode?: string
  }>> => 
    apiClient.post(`/orders/${orderId}/payment`, paymentData),

  // 查询支付状态
  getPaymentStatus: (orderId: number): Promise<ApiResponse<{
    status: 'pending' | 'paid' | 'failed' | 'refunded'
    paidAt?: string
    amount: number
    method: string
  }>> => 
    apiClient.get(`/orders/${orderId}/payment-status`),

  // 重新支付
  retryPayment: (orderId: number, paymentData: PaymentData): Promise<ApiResponse<{
    paymentId: string
    paymentUrl?: string
    qrCode?: string
  }>> => 
    apiClient.post(`/orders/${orderId}/retry-payment`, paymentData),

  // 商家订单管理
  merchant: {
    // 获取商家订单列表
    getOrders: (params?: Omit<OrderQueryParams, 'merchant_id'>): Promise<ApiResponse<Order[]>> => 
      apiClient.getWithParams('/orders/merchant/my', params),

    // 确认订单
    confirmOrder: (orderId: number): Promise<ApiResponse<Order>> => 
      apiClient.patch(`/orders/merchant/${orderId}/confirm`),

    // 发货
    shipOrder: (orderId: number, trackingData: {
      trackingNo: string
      carrier: string
      note?: string
    }): Promise<ApiResponse<Order>> => 
      apiClient.patch(`/orders/merchant/${orderId}/ship`, trackingData),

    // 拒绝订单
    rejectOrder: (orderId: number, reason: string): Promise<ApiResponse<Order>> => 
      apiClient.patch(`/orders/merchant/${orderId}/reject`, { reason }),

    // 处理退款
    processRefund: (orderId: number, action: 'approve' | 'reject', reason?: string): Promise<ApiResponse<Order>> => 
      apiClient.patch(`/orders/merchant/${orderId}/refund`, { action, reason }),

    // 更新订单备注
    updateOrderRemark: (orderId: number, remark: string): Promise<ApiResponse<Order>> => 
      apiClient.patch(`/orders/merchant/${orderId}/remark`, { remark }),

    // 获取商家订单统计
    getStats: (): Promise<ApiResponse<{
      total: number
      pending: number
      confirmed: number
      shipped: number
      delivered: number
      cancelled: number
      refunded: number
      revenue: number
      today_orders: number
      today_revenue: number
    }>> => 
      apiClient.get('/orders/merchant/stats')
  },

  // 管理员订单管理
  admin: {
    // 获取所有订单
    getAllOrders: (params?: OrderQueryParams): Promise<ApiResponse<Order[]>> => 
      apiClient.getWithParams('/orders/admin', params),

    // 强制取消订单
    forceCancelOrder: (orderId: number, reason: string): Promise<ApiResponse<Order>> => 
      apiClient.patch(`/orders/admin/${orderId}/cancel`, { reason }),

    // 强制退款
    forceRefund: (orderId: number, reason: string): Promise<ApiResponse<Order>> => 
      apiClient.patch(`/orders/admin/${orderId}/refund`, { reason }),

    // 获取系统订单统计
    getSystemStats: (): Promise<ApiResponse<{
      total: number
      today: number
      week: number
      month: number
      revenue: {
        total: number
        today: number
        week: number
        month: number
      }
      status_distribution: Record<string, number>
      payment_methods: Record<string, number>
    }>> => 
      apiClient.get('/orders/admin/stats'),

    // 导出订单数据
    exportOrders: (params?: {
      start_date?: string
      end_date?: string
      status?: string
      format?: 'csv' | 'xlsx'
    }): Promise<ApiResponse<{ downloadUrl: string }>> => 
      apiClient.getWithParams('/orders/admin/export', params)
  }
}

export default ordersApi 