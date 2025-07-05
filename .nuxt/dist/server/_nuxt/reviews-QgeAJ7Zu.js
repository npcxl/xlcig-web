import { a as apiClient } from "./useLocation-CdbkT8tR.js";
const reviewsApi = {
  // 获取产品评论列表
  getProductReviews: (productId, params) => {
    const searchParams = new URLSearchParams();
    if (params == null ? void 0 : params.page) searchParams.append("page", params.page.toString());
    if (params == null ? void 0 : params.limit) searchParams.append("limit", params.limit.toString());
    if (params == null ? void 0 : params.rating) searchParams.append("rating", params.rating.toString());
    if (params == null ? void 0 : params.sort) searchParams.append("sort", params.sort);
    const queryString = searchParams.toString();
    return apiClient.get(`/reviews/product/${productId}${queryString ? "?" + queryString : ""}`);
  },
  // 获取产品评论统计
  getProductReviewStats: (productId) => apiClient.get(`/reviews/stats/${productId}`),
  // 发布评论
  createReview: (data) => apiClient.post("/reviews", data),
  // 获取用户的评论列表
  getMyReviews: (params) => {
    const searchParams = new URLSearchParams();
    if (params == null ? void 0 : params.page) searchParams.append("page", params.page.toString());
    if (params == null ? void 0 : params.limit) searchParams.append("limit", params.limit.toString());
    const queryString = searchParams.toString();
    return apiClient.get(`/reviews/my-reviews${queryString ? "?" + queryString : ""}`);
  },
  // 编辑评论
  updateReview: (id, data) => apiClient.put(`/reviews/${id}`, data),
  // 删除评论
  deleteReview: (id) => apiClient.delete(`/reviews/${id}`),
  // 评论点赞/取消点赞
  toggleReviewHelpful: (id, helpful) => apiClient.post(`/reviews/${id}/helpful`, { helpful }),
  // 获取最新评论（首页显示用）
  getLatestReviews: (limit) => {
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append("limit", limit.toString());
    const queryString = searchParams.toString();
    return apiClient.get(`/reviews/latest${queryString ? "?" + queryString : ""}`);
  },
  // 检查用户是否已经评论过该产品
  checkUserReview: (productId) => apiClient.get(`/reviews/check/${productId}`)
};
export {
  reviewsApi as r
};
//# sourceMappingURL=reviews-QgeAJ7Zu.js.map
