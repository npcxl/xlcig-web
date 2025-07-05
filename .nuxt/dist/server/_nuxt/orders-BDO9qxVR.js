import { ref, watch, readonly } from "vue";
import { useRoute } from "vue-router";
import { a as apiClient } from "./useLocation-CdbkT8tR.js";
const pageCache = /* @__PURE__ */ new Map();
const usePageLoader = (options = {}) => {
  const {
    // 最小加载时间（毫秒）
    minLoadTime = 500,
    // 自定义加载函数
    loadFunction = null,
    // 页面准备好的回调
    onPageReady = null,
    // 缓存键名
    cacheKey = null,
    // 是否启用缓存
    enableCache = true
  } = options;
  const route = useRoute();
  const isPageLoading = ref(true);
  const isDataLoading = ref(true);
  const isPageReady = ref(false);
  const hasError = ref(false);
  const errorMessage = ref("");
  const getCacheKey = () => {
    return cacheKey || route.path;
  };
  const checkCache = () => {
    if (!enableCache) return null;
    const key = getCacheKey();
    return pageCache.get(key);
  };
  const setCache = (data) => {
    if (!enableCache) return;
    const key = getCacheKey();
    pageCache.set(key, {
      data,
      timestamp: Date.now()
    });
  };
  const startLoading = async () => {
    try {
      const cached = checkCache();
      if (cached) {
        isPageLoading.value = false;
        isDataLoading.value = false;
        isPageReady.value = true;
        hasError.value = false;
        errorMessage.value = "";
        if (onPageReady && typeof onPageReady === "function") {
          onPageReady(cached.data);
        }
        return cached.data;
      }
      isPageLoading.value = true;
      isDataLoading.value = true;
      hasError.value = false;
      errorMessage.value = "";
      let loadPromise = Promise.resolve();
      let result = null;
      if (loadFunction && typeof loadFunction === "function") {
        loadPromise = loadFunction();
      }
      const [loadResult] = await Promise.all([
        loadPromise,
        new Promise((resolve) => setTimeout(resolve, minLoadTime))
      ]);
      result = loadResult;
      if (result) {
        setCache(result);
      }
      isPageLoading.value = false;
      isDataLoading.value = false;
      isPageReady.value = true;
      if (onPageReady && typeof onPageReady === "function") {
        onPageReady(result);
      }
      return result;
    } catch (error) {
      console.error("页面加载失败:", error);
      hasError.value = true;
      errorMessage.value = error.message || "页面加载失败";
      isPageLoading.value = false;
      isDataLoading.value = false;
      throw error;
    }
  };
  const reloadPage = async () => {
    const key = getCacheKey();
    pageCache.delete(key);
    await startLoading();
  };
  const setLoading = (loading) => {
    isDataLoading.value = loading;
    isPageLoading.value = loading;
  };
  const setError = (error) => {
    hasError.value = true;
    errorMessage.value = error;
    isPageLoading.value = false;
    isDataLoading.value = false;
  };
  const clearError = () => {
    hasError.value = false;
    errorMessage.value = "";
  };
  const clearCache = () => {
    const key = getCacheKey();
    pageCache.delete(key);
  };
  watch(() => route.path, (newPath, oldPath) => {
    console.log("路由变化:", oldPath, "->", newPath);
  });
  return {
    // 状态
    isPageLoading: readonly(isPageLoading),
    isDataLoading: readonly(isDataLoading),
    isPageReady: readonly(isPageReady),
    hasError: readonly(hasError),
    errorMessage: readonly(errorMessage),
    // 方法
    startLoading,
    reloadPage,
    setLoading,
    setError,
    clearError,
    clearCache
  };
};
const pageLoaderPresets = {
  // 快速加载（适用于静态页面）
  fast: {
    minLoadTime: 300,
    enableCache: true
  },
  // 标准加载（适用于大多数页面）
  standard: {
    minLoadTime: 500,
    enableCache: true
  }
};
const ordersApi = {
  // 获取用户订单列表
  getMyOrders: (params) => apiClient.getWithParams("/orders/my", params),
  // 获取订单详情
  getOrderById: (id) => apiClient.get(`/orders/${id}`),
  // 根据订单号获取订单详情
  getOrderByNo: (orderNo) => apiClient.get(`/orders/no/${orderNo}`),
  // 创建订单
  createOrder: (orderData) => apiClient.post("/orders", orderData),
  // 取消订单
  cancelOrder: (id, reason) => apiClient.patch(`/orders/${id}/cancel`, { reason }),
  // 确认收货
  confirmOrder: (id) => apiClient.patch(`/orders/${id}/confirm`),
  // 申请退款
  requestRefund: (id, reason) => apiClient.patch(`/orders/${id}/refund`, { reason }),
  // 更新收货地址
  updateShippingAddress: (id, address) => apiClient.patch(`/orders/${id}/address`, address),
  // 添加订单备注
  addOrderNote: (id, note) => apiClient.patch(`/orders/${id}/note`, { note }),
  // 获取订单状态历史
  getOrderHistory: (id) => apiClient.get(`/orders/${id}/history`),
  // 获取订单物流信息
  getOrderTracking: (id) => apiClient.get(`/orders/${id}/tracking`),
  // 创建支付订单
  createPayment: (orderId, paymentData) => apiClient.post(`/orders/${orderId}/payment`, paymentData),
  // 查询支付状态
  getPaymentStatus: (orderId) => apiClient.get(`/orders/${orderId}/payment-status`),
  // 重新支付
  retryPayment: (orderId, paymentData) => apiClient.post(`/orders/${orderId}/retry-payment`, paymentData),
  // 商家订单管理
  merchant: {
    // 获取商家订单列表
    getOrders: (params) => apiClient.getWithParams("/orders/merchant/my", params),
    // 确认订单
    confirmOrder: (orderId) => apiClient.patch(`/orders/merchant/${orderId}/confirm`),
    // 发货
    shipOrder: (orderId, trackingData) => apiClient.patch(`/orders/merchant/${orderId}/ship`, trackingData),
    // 拒绝订单
    rejectOrder: (orderId, reason) => apiClient.patch(`/orders/merchant/${orderId}/reject`, { reason }),
    // 处理退款
    processRefund: (orderId, action, reason) => apiClient.patch(`/orders/merchant/${orderId}/refund`, { action, reason }),
    // 更新订单备注
    updateOrderRemark: (orderId, remark) => apiClient.patch(`/orders/merchant/${orderId}/remark`, { remark }),
    // 获取商家订单统计
    getStats: () => apiClient.get("/orders/merchant/stats")
  },
  // 管理员订单管理
  admin: {
    // 获取所有订单
    getAllOrders: (params) => apiClient.getWithParams("/orders/admin", params),
    // 强制取消订单
    forceCancelOrder: (orderId, reason) => apiClient.patch(`/orders/admin/${orderId}/cancel`, { reason }),
    // 强制退款
    forceRefund: (orderId, reason) => apiClient.patch(`/orders/admin/${orderId}/refund`, { reason }),
    // 获取系统订单统计
    getSystemStats: () => apiClient.get("/orders/admin/stats"),
    // 导出订单数据
    exportOrders: (params) => apiClient.getWithParams("/orders/admin/export", params)
  }
};
export {
  ordersApi as o,
  pageLoaderPresets as p,
  usePageLoader as u
};
//# sourceMappingURL=orders-BDO9qxVR.js.map
