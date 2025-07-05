import { apiClient } from '../apiClient'
import type { ApiResponse } from '../../types/api'

// 评论类型定义
export interface Review {
  id: number
  product_id: number
  user_id?: number
  author: string
  rating: number
  comment: string
  images?: string[]
  helpful_count: number
  verified_purchase: boolean
  is_anonymous?: boolean
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
  // 扩展字段（用于用户评论列表）
  product_name?: string
  product_images?: string[]
  user_info?: {
    nickname: string
    avatar?: string
    email?: string
    is_registered: boolean
  }
}

// 评论统计类型
export interface ReviewStats {
  product_id: number
  total_reviews: number
  average_rating: number
  five_star_count: number
  four_star_count: number
  three_star_count: number
  two_star_count: number
  one_star_count: number
  rating_distribution: {
    rating: number
    count: number
    percentage: number
  }[]
}

// 分页信息
export interface ReviewPagination {
  current_page: number
  per_page: number
  total_items: number
  total_pages: number
}

// 获取评论列表的响应类型
export interface ReviewListResponse {
  reviews: Review[]
  pagination: ReviewPagination
}

// 发布评论的数据类型
export interface CreateReviewData {
  product_id: number
  rating: number
  comment: string
  images?: string[]
  author?: string
  is_anonymous?: boolean
}

// 更新评论的数据类型
export interface UpdateReviewData {
  rating?: number
  comment?: string
  images?: string[]
}

// 评论相关API
export const reviewsApi = {
  // 获取产品评论列表
  getProductReviews: (
    productId: number, 
    params?: {
      page?: number
      limit?: number
      rating?: number | 'all'
      sort?: 'newest' | 'oldest' | 'rating_high' | 'rating_low' | 'helpful'
    }
  ): Promise<ApiResponse<ReviewListResponse>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.rating) searchParams.append('rating', params.rating.toString())
    if (params?.sort) searchParams.append('sort', params.sort)
    
    const queryString = searchParams.toString()
    return apiClient.get(`/reviews/product/${productId}${queryString ? '?' + queryString : ''}`)
  },

  // 获取产品评论统计
  getProductReviewStats: (productId: number): Promise<ApiResponse<ReviewStats>> => 
    apiClient.get(`/reviews/stats/${productId}`),

  // 发布评论
  createReview: (data: CreateReviewData): Promise<ApiResponse<{ 
    review_id: number; 
    verified_purchase: boolean;
    author_name: string;
    is_anonymous: boolean;
  }>> => 
    apiClient.post('/reviews', data),

  // 获取用户的评论列表
  getMyReviews: (params?: {
    page?: number
    limit?: number
  }): Promise<ApiResponse<ReviewListResponse>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiClient.get(`/reviews/my-reviews${queryString ? '?' + queryString : ''}`)
  },

  // 编辑评论
  updateReview: (id: number, data: UpdateReviewData): Promise<ApiResponse<void>> => 
    apiClient.put(`/reviews/${id}`, data),

  // 删除评论
  deleteReview: (id: number): Promise<ApiResponse<void>> => 
    apiClient.delete(`/reviews/${id}`),

  // 评论点赞/取消点赞
  toggleReviewHelpful: (id: number, helpful: boolean): Promise<ApiResponse<void>> => 
    apiClient.post(`/reviews/${id}/helpful`, { helpful }),

  // 获取最新评论（首页显示用）
  getLatestReviews: (limit?: number): Promise<ApiResponse<Review[]>> => {
    const searchParams = new URLSearchParams()
    if (limit) searchParams.append('limit', limit.toString())
    
    const queryString = searchParams.toString()
    return apiClient.get(`/reviews/latest${queryString ? '?' + queryString : ''}`)
  },

  // 检查用户是否已经评论过该产品
  checkUserReview: (productId: number): Promise<ApiResponse<{ 
    has_reviewed: boolean; 
    review_id?: number;
    review?: Review;
  }>> => 
    apiClient.get(`/reviews/check/${productId}`)
}

export default reviewsApi 