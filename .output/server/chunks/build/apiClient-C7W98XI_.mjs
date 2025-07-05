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

export { apiClient as a };
//# sourceMappingURL=apiClient-C7W98XI_.mjs.map
