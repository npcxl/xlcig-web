import { reactive, ref, computed, readonly, toRefs } from 'vue';
import { K as createDiscreteApi } from './discrete-DcZNj1Jm.mjs';
import { u as useUserStore } from './user-C81snHaJ.mjs';

const requestInterceptor = async (url, config) => {
  const headers = {
    ...config.headers
  };
  if (!(config.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (config.requireAuth !== false) ;
  const requestConfig = {
    ...config,
    headers,
    signal: AbortSignal.timeout(config.timeout || 1e4)
  };
  if (config.body && config.method !== "GET") {
    if (typeof config.body === "object" && !(config.body instanceof FormData)) {
      requestConfig.body = JSON.stringify(config.body);
    }
  }
  return requestConfig;
};
const responseInterceptor = async (response) => {
  let data;
  try {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  } catch (error) {
    throw new Error("\u54CD\u5E94\u89E3\u6790\u5931\u8D25");
  }
  if (!response.ok) {
    if (response.status === 401) ;
    const errorMessage = (data == null ? void 0 : data.message) || (data == null ? void 0 : data.error) || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return data;
};
const errorInterceptor = (error, method, endpoint) => {
  console.error(`API\u8BF7\u6C42\u5931\u8D25 [${method} ${endpoint}]:`, error);
  if (error instanceof Error) {
    if (error.name === "TimeoutError") {
      throw new Error("\u8BF7\u6C42\u8D85\u65F6\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5");
    }
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("\u7F51\u7EDC\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u72B6\u6001");
    }
    throw error;
  }
  throw new Error("\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
};
const API_CONFIG = {
  BASE_URL: "https://api.xlcig.cn/api" ,
  TIMEOUT: 1e4
};
class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }
  // 统一请求方法
  async request(endpoint, config = {}) {
    const url = `${this.baseURL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;
    const method = config.method || "GET";
    try {
      const requestConfig = await requestInterceptor(url, {
        timeout: this.timeout,
        ...config
      });
      const response = await fetch(url, requestConfig);
      return await responseInterceptor(response);
    } catch (error) {
      return errorInterceptor(error, method, endpoint);
    }
  }
  // GET请求
  async get(endpoint, config) {
    return this.request(endpoint, { ...config, method: "GET" });
  }
  // POST请求
  async post(endpoint, body, config) {
    return this.request(endpoint, { ...config, method: "POST", body });
  }
  // PUT请求
  async put(endpoint, body, config) {
    return this.request(endpoint, { ...config, method: "PUT", body });
  }
  // DELETE请求
  async delete(endpoint, config) {
    return this.request(endpoint, { ...config, method: "DELETE" });
  }
  // PATCH请求
  async patch(endpoint, body, config) {
    return this.request(endpoint, { ...config, method: "PATCH", body });
  }
  // 带查询参数的GET请求
  async getWithParams(endpoint, params, config) {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== void 0 && value !== null && value !== "") {
          if (Array.isArray(value)) {
            value.forEach((item) => searchParams.append(key, String(item)));
          } else {
            searchParams.append(key, String(value));
          }
        }
      });
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }
    return this.get(url, config);
  }
  // 上传文件
  async upload(endpoint, formData, config) {
    return this.request(endpoint, {
      ...config,
      method: "POST",
      body: formData,
      headers: {
        // 不设置Content-Type，让浏览器自动设置multipart/form-data
        ...(config == null ? void 0 : config.headers) || {}
      }
    });
  }
}
const apiClient = new ApiClient();

class LocationApi {
  /**
   * 获取当前用户的IP定位信息
   * 如果用户已登录，会自动更新用户的loginIp字段
   */
  static async getIpLocation() {
    try {
      const response = await apiClient.get("/amap/ip/");
      if (response.success && response.data) {
        const { location, user } = response.data;
        if (false) ;
      }
      return response;
    } catch (error) {
      console.error("\u83B7\u53D6IP\u5B9A\u4F4D\u5931\u8D25:", error);
      throw error;
    }
  }
  /**
   * 强制刷新IP定位信息（忽略缓存）
   * 注意：这会直接调用高德地图API，请谨慎使用
   */
  static async refreshIpLocation() {
    try {
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      const response = await apiClient.get(`/amap/ip/?t=${timestamp}`);
      if (false) ;
      return response;
    } catch (error) {
      console.error("\u5237\u65B0IP\u5B9A\u4F4D\u5931\u8D25:", error);
      throw error;
    }
  }
}
const getIpLocation = LocationApi.getIpLocation;
const refreshIpLocation = LocationApi.refreshIpLocation;
const { message, notification, dialog, loadingBar } = createDiscreteApi([
  "message",
  "notification",
  "dialog",
  "loadingBar"
]);
const useMessage = () => {
  const success = (content, duration = 3e3) => {
    message.success(content, { duration });
  };
  const error = (content, duration = 4e3) => {
    message.error(content, { duration });
  };
  const warning = (content, duration = 3e3) => {
    message.warning(content, { duration });
  };
  const info = (content, duration = 3e3) => {
    message.info(content, { duration });
  };
  const loading = (content) => {
    return message.loading(content, { duration: 0 });
  };
  const confirm = (content, title = "\u786E\u8BA4") => {
    return new Promise((resolve) => {
      dialog.warning({
        title,
        content,
        positiveText: "\u786E\u5B9A",
        negativeText: "\u53D6\u6D88",
        onPositiveClick: () => {
          resolve(true);
        },
        onNegativeClick: () => {
          resolve(false);
        },
        onClose: () => {
          resolve(false);
        }
      });
    });
  };
  const notify = {
    success: (title, content, duration = 4e3) => {
      notification.success({
        title,
        content,
        duration
      });
    },
    error: (title, content, duration = 4e3) => {
      notification.error({
        title,
        content,
        duration
      });
    },
    warning: (title, content, duration = 4e3) => {
      notification.warning({
        title,
        content,
        duration
      });
    },
    info: (title, content, duration = 4e3) => {
      notification.info({
        title,
        content,
        duration
      });
    }
  };
  return {
    success,
    error,
    warning,
    info,
    loading,
    confirm,
    notify,
    loadingBar
  };
};
const useLocation = () => {
  const { success, error, warning } = useMessage();
  const userStore = useUserStore();
  const state = reactive({
    loading: false,
    data: null,
    error: null,
    lastUpdated: null
  });
  const hasAutoFetched = ref(false);
  const fetchLocation = async (showNotification = false, forceRefresh = false) => {
    if (state.loading) return state.data;
    state.loading = true;
    state.error = null;
    try {
      const isLoggedIn = userStore.isLoggedIn;
      if (showNotification && !isLoggedIn) {
        warning("\u8BF7\u5148\u767B\u5F55\u4EE5\u542F\u7528\u5B8C\u6574\u7684IP\u5B9A\u4F4D\u529F\u80FD");
      }
      const response = forceRefresh ? await refreshIpLocation() : await getIpLocation();
      if (response.success && response.data) {
        state.data = response.data;
        state.lastUpdated = /* @__PURE__ */ new Date();
        if (showNotification) {
          const { location, user } = response.data;
          if (location.error) {
            warning("IP\u5B9A\u4F4D\u5931\u8D25: " + location.error);
          } else {
            const locationText = `${location.province || "\u672A\u77E5\u5730\u533A"} ${location.city || ""}`;
            const cacheText = response.data.cached ? "(\u7F13\u5B58)" : "";
            if (isLoggedIn && (user == null ? void 0 : user.locationUpdated)) {
              success(`\u5B9A\u4F4D\u6210\u529F: ${locationText}${cacheText}\uFF0C\u767B\u5F55\u4FE1\u606F\u5DF2\u66F4\u65B0`);
            } else if (isLoggedIn && !(user == null ? void 0 : user.locationUpdated)) {
              warning(`\u5B9A\u4F4D\u6210\u529F: ${locationText}${cacheText}\uFF0C\u4F46\u767B\u5F55\u4FE1\u606F\u672A\u66F4\u65B0`);
            } else {
              success(`\u5B9A\u4F4D\u6210\u529F: ${locationText}${cacheText}\uFF08\u672A\u767B\u5F55\u72B6\u6001\uFF09`);
            }
          }
        }
      } else {
        state.error = response.message || "\u83B7\u53D6\u5B9A\u4F4D\u4FE1\u606F\u5931\u8D25";
        if (showNotification) {
          error(state.error);
        }
      }
      return state.data;
    } catch (err) {
      state.error = err.message || "\u7F51\u7EDC\u9519\u8BEF";
      if (showNotification) {
        error("\u83B7\u53D6\u5B9A\u4F4D\u4FE1\u606F\u5931\u8D25");
      }
      console.error("IP\u5B9A\u4F4D\u9519\u8BEF:", err);
      return null;
    } finally {
      state.loading = false;
    }
  };
  const autoFetchLocation = async () => {
    if (hasAutoFetched.value) return state.data;
    hasAutoFetched.value = true;
    userStore.initializeAuth();
    return await fetchLocation(false, false);
  };
  const refreshLocation = async (showNotification = true) => {
    return await fetchLocation(showNotification, true);
  };
  const getLocationText = () => {
    var _a;
    if (!((_a = state.data) == null ? void 0 : _a.location)) return "\u672A\u77E5\u4F4D\u7F6E";
    const { location } = state.data;
    if (location.error) return "\u5B9A\u4F4D\u5931\u8D25";
    return `${location.province || "\u672A\u77E5"} ${location.city || ""}`;
  };
  const hasLocation = computed(() => {
    var _a;
    return !!(((_a = state.data) == null ? void 0 : _a.location) && !state.data.location.error);
  });
  const isUserLocationUpdated = computed(() => {
    var _a, _b;
    return !!((_b = (_a = state.data) == null ? void 0 : _a.user) == null ? void 0 : _b.locationUpdated);
  });
  const currentIp = computed(() => {
    var _a;
    return ((_a = state.data) == null ? void 0 : _a.ip) || "\u672A\u77E5";
  });
  const isUserLoggedIn = computed(() => {
    return userStore.isLoggedIn;
  });
  return {
    // 状态
    ...toRefs(state),
    hasAutoFetched: readonly(hasAutoFetched),
    // 方法
    fetchLocation,
    autoFetchLocation,
    refreshLocation,
    getLocationText,
    // 计算属性
    hasLocation,
    isUserLocationUpdated,
    currentIp,
    isUserLoggedIn,
    // 原始状态（用于需要完整状态的场景）
    locationState: readonly(state)
  };
};

export { useLocation as u };
//# sourceMappingURL=useLocation-DfI38ycp.mjs.map
