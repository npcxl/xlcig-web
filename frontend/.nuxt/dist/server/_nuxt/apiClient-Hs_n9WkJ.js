const getAuthToken = () => {
  return null;
};
const requestInterceptor = async (url, config) => {
  const headers = {
    ...config.headers
  };
  if (!(config.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (config.requireAuth !== false) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
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
    throw new Error("响应解析失败");
  }
  if (!response.ok) {
    if (response.status === 401) ;
    const errorMessage = (data == null ? void 0 : data.message) || (data == null ? void 0 : data.error) || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return data;
};
const errorInterceptor = (error, method, endpoint) => {
  console.error(`API请求失败 [${method} ${endpoint}]:`, error);
  if (error instanceof Error) {
    if (error.name === "TimeoutError") {
      throw new Error("请求超时，请检查网络连接");
    }
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("网络连接失败，请检查网络状态");
    }
    throw error;
  }
  throw new Error("请求失败，请重试");
};
const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === "production" ? "https://api.xlcig.cn/api" : "http://192.168.11.193:9999/api",
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
export {
  apiClient as a
};
//# sourceMappingURL=apiClient-Hs_n9WkJ.js.map
