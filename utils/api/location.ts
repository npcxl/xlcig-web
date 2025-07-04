import { apiClient } from '../apiClient'
import type { ApiResponse } from '../../types/api'

// IP定位相关类型
export interface IpLocationResponse {
  cached: boolean
  ip: string
  ipSource: string  // IP数据源，如 "ipinfo.io"
  location?: {
    id: number
    ip: string
    province?: string | null
    city?: string | null
    adcode?: string | null
    rectangle?: string | null
    response_time: string
    created_at: string
    updated_at: string
  }
  user?: {
    id: number
    locationUpdated: boolean  // 用户的登录IP和定位信息是否已更新
  } | null
  error?: string
  error_code?: string
  error_details?: string
}

// IP定位API类
export class LocationApi {
  /**
   * 获取当前用户的IP定位信息
   * 如果用户已登录，会自动更新用户的loginIp字段
   */
  static async getIpLocation(): Promise<ApiResponse<IpLocationResponse>> {
    try {
      const response = await apiClient.get<IpLocationResponse>('/amap/ip/')
      
      // 如果成功获取定位信息，可以在这里做一些处理
      if (response.success && response.data) {
        const data = response.data
        
        // 输出定位信息到控制台
        console.log('🌍 IP定位信息:', {
          ip: data.ip,
          ipSource: data.ipSource,
          location: data.error ? '定位失败' : 
            data.location ? `${data.location.province || '未知'} ${data.location.city || ''}` : '位置信息不可用',
          cached: data.cached,
          userUpdated: data.user?.locationUpdated || false
        })
      }
      
      return response
    } catch (error) {
      console.error('获取IP定位失败:', error)
      throw error
    }
  }
  
  /**
   * 强制刷新IP定位信息（忽略缓存）
   * 注意：这会直接调用高德地图API，请谨慎使用
   */
  static async refreshIpLocation(): Promise<ApiResponse<IpLocationResponse>> {
    try {
      // 可以添加时间戳参数来避免缓存
      const timestamp = new Date().getTime()
      const response = await apiClient.get<IpLocationResponse>(`/amap/ip/?t=${timestamp}`)
      
      console.log('🔄 强制刷新IP定位信息')
      
      return response
    } catch (error) {
      console.error('刷新IP定位失败:', error)
      throw error
    }
  }
}

// 导出方便使用的函数
export const getIpLocation = LocationApi.getIpLocation
export const refreshIpLocation = LocationApi.refreshIpLocation

export default LocationApi 