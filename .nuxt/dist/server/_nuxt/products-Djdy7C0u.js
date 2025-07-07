import { a as apiClient } from "./useLocation-kga13ouX.js";
const productsApi = {
  // 获取产品列表
  getProducts: (params) => apiClient.getWithParams("/product", params, { requireAuth: false }),
  // 获取热门产品
  getHotProducts: (limit = 10) => apiClient.get(`/product/getHot?limit=${limit}`, { requireAuth: false }),
  // 获取推荐产品
  getFeaturedProducts: (limit = 10) => apiClient.get(`/product/featured?limit=${limit}`, { requireAuth: false }),
  // 获取最新产品
  getLatestProducts: (limit = 10) => apiClient.get(`/product/latest?limit=${limit}`, { requireAuth: false }),
  // 根据分类获取产品
  getProductsByCategory: (categoryId, params) => apiClient.getWithParams(`/product/category/${categoryId}`, params, { requireAuth: false }),
  // 根据品牌获取产品
  getProductsByBrand: (brand, params) => apiClient.getWithParams(`/product/brand/${encodeURIComponent(brand)}`, params, { requireAuth: false }),
  // 根据ID获取产品详情
  getProductById: (id) => apiClient.get(`/product/${id}`, { requireAuth: false }),
  // 根据slug获取产品详情
  getProductBySlug: (slug) => apiClient.get(`/product/slug/${slug}`, { requireAuth: false }),
  // 搜索产品
  searchProducts: (query, params) => apiClient.getWithParams("/product/search", { search: query, ...params }, { requireAuth: false }),
  // 获取产品规格对比
  compareProducts: (productIds) => apiClient.post("/product/compare", { productIds }, { requireAuth: false }),
  // 获取相关产品
  getRelatedProducts: (productId, limit = 8) => apiClient.get(`/product/${productId}/related?limit=${limit}`, { requireAuth: false }),
  // 获取产品价格历史
  getPriceHistory: (productId, days = 30) => apiClient.get(`/product/${productId}/price-history?days=${days}`, { requireAuth: false }),
  // 获取所有品牌
  getBrands: () => apiClient.get("/product/brands", { requireAuth: false }),
  // 获取价格区间
  getPriceRange: (categoryId) => apiClient.getWithParams("/product/price-range", categoryId ? { category_id: categoryId } : void 0, { requireAuth: false }),
  // 创建产品（商家功能）
  createProduct: (productData) => apiClient.post("/product", productData),
  // 更新产品（商家功能）
  updateProduct: (id, productData) => apiClient.put(`/product/${id}`, productData),
  // 删除产品（商家功能）
  deleteProduct: (id) => apiClient.delete(`/product/${id}`),
  // 批量删除产品（商家功能）
  batchDeleteProducts: (ids) => apiClient.post("/product/batch-delete", { ids }),
  // 更新产品状态（商家功能）
  updateProductStatus: (id, status) => apiClient.patch(`/product/${id}/status`, { status }),
  // 更新产品库存（商家功能）
  updateProductStock: (id, stock) => apiClient.patch(`/product/${id}/stock`, { stock }),
  // 上传产品图片（商家功能）
  uploadProductImages: (productId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    return apiClient.upload(`/product/${productId}/images`, formData);
  },
  // 删除产品图片（商家功能）
  deleteProductImage: (productId, imageUrl) => apiClient.delete(`/product/${productId}/images?imageUrl=${encodeURIComponent(imageUrl)}`),
  // 获取产品统计信息（管理员功能）
  getProductStats: () => apiClient.get("/product/stats")
};
export {
  productsApi as p
};
//# sourceMappingURL=products-Djdy7C0u.js.map
