import { requestInterceptor, responseInterceptor, errorInterceptor, RequestInterceptorConfig } from './interceptors'
import type { ApiResponse } from '../types/api'

// API配置 - 根据环境确定API地址
const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://api.xlcig.cn/api' 
    : 'http://' + (process.client ? window.location.hostname : 'localhost') + ':9999/api',
  TIMEOUT: 10000
}

// HTTP请求方法类型
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// API客户端类
class ApiClient {
  private baseURL: string
  private timeout: number

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
  }

  // 统一请求方法
  async request<T = any>(
    endpoint: string, 
    config: RequestInit & RequestInterceptorConfig = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`
    const method = (config.method || 'GET') as HttpMethod
    
    try {
      // 应用请求拦截器
      const requestConfig = await requestInterceptor(url, {
        timeout: this.timeout,
        ...config
      })
      // 发送请求
      const response = await fetch(url, requestConfig)
      // 应用响应拦截器
      return await responseInterceptor<ApiResponse<T>>(response)
    } catch (error) {
      // 应用错误拦截器
      return errorInterceptor(error, method, endpoint)
    }
  }

  // GET请求
  async get<T = any>(
    endpoint: string, 
    config?: Omit<RequestInterceptorConfig, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  // POST请求
  async post<T = any>(
    endpoint: string, 
    body?: any, 
    config?: Omit<RequestInterceptorConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body })
  }

  // PUT请求
  async put<T = any>(
    endpoint: string, 
    body?: any, 
    config?: Omit<RequestInterceptorConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body })
  }

  // DELETE请求
  async delete<T = any>(
    endpoint: string, 
    config?: Omit<RequestInterceptorConfig, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }

  // PATCH请求
  async patch<T = any>(
    endpoint: string, 
    body?: any, 
    config?: Omit<RequestInterceptorConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body })
  }

  // 带查询参数的GET请求
  async getWithParams<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    config?: Omit<RequestInterceptorConfig, 'method'>
  ): Promise<ApiResponse<T>> {
    let url = endpoint
    
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(key, String(item)))
          } else {
            searchParams.append(key, String(value))
          }
        }
      })
      
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`
      }
    }
    
    return this.get<T>(url, config)
  }

  // 上传文件
  async upload<T = any>(
    endpoint: string,
    formData: FormData,
    config?: Omit<RequestInterceptorConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: formData,
      headers: {
        // 不设置Content-Type，让浏览器自动设置multipart/form-data
        ...(config?.headers || {})
      }
    })
  }
}

// 创建并导出API客户端实例
export const apiClient = new ApiClient()
export default apiClient 