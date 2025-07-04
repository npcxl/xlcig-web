// API拦截器

// 获取认证token
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken')
  }
  return null
}

// 请求拦截器接口
export interface RequestInterceptorConfig {
  headers?: Record<string, string>
  requireAuth?: boolean
  timeout?: number
}

// 请求拦截器
export const requestInterceptor = async (
  url: string, 
  config: RequestInit & RequestInterceptorConfig
): Promise<RequestInit> => {
  const headers: Record<string, string> = { 
    ...config.headers 
  }
  
  // 只有当不是FormData时才设置Content-Type
  if (!(config.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  
  // 如果需要认证，添加token
  if (config.requireAuth !== false) {
    const token = getAuthToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const requestConfig: RequestInit = {
    ...config,
    headers,
    signal: AbortSignal.timeout(config.timeout || 10000)
  }

  // 处理请求体
  if (config.body && config.method !== 'GET') {
    if (typeof config.body === 'object' && !(config.body instanceof FormData)) {
      requestConfig.body = JSON.stringify(config.body)
    }
  }

  return requestConfig
}

// 响应拦截器
export const responseInterceptor = async <T>(response: Response): Promise<T> => {
  let data: any

  try {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }
  } catch (error) {
    throw new Error('响应解析失败')
  }

  // 处理HTTP错误状态
  if (!response.ok) {
    // 401 未授权 - 清除token并跳转登录
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userInfo')
        // 如果不在登录页面，跳转到登录页面
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login'
        }
      }
    }

    // 抛出错误信息
    const errorMessage = data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`
    throw new Error(errorMessage)
  }

  return data
}

// 错误处理拦截器
export const errorInterceptor = (error: any, method: string, endpoint: string): never => {
  console.error(`API请求失败 [${method} ${endpoint}]:`, error)
  
  if (error instanceof Error) {
    if (error.name === 'TimeoutError') {
      throw new Error('请求超时，请检查网络连接')
    }
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('网络连接失败，请检查网络状态')
    }
    throw error
  }
  
  throw new Error('请求失败，请重试')
} 