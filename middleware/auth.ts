// 认证中间件
export default defineNuxtRouteMiddleware((to, from) => {
  // 在客户端检查认证状态
  if (process.client) {
    const token = localStorage.getItem('authToken')
    
    if (!token) {
      // 未登录，重定向到登录页
      return navigateTo('/auth/login')
    }
  }
}) 