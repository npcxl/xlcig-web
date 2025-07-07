import { apiClient } from '../apiClient'
import type { ApiResponse } from '../../types/api'

// 聊天消息类型
export interface ChatMessage {
  id: number
  user_id: number
  message: string
  message_type: 'user' | 'customer_service'
  is_read: boolean
  created_at: string
  updated_at: string
  username?: string
  avatar_url?: string
  nickname?: string
  avatar?: string
  role?: string
}

// 聊天会话类型
export interface ChatSession {
  id: number
  user_id: number
  customer_service_id?: number
  status: 'active' | 'waiting' | 'closed'
  started_at: string
  ended_at?: string
  rating?: number
  feedback?: string
  user_name?: string
  customer_service_name?: string
  user_nickname?: string
  user_avatar?: string
  customer_service_nickname?: string
  customer_service_avatar?: string
  unread_count?: number
  last_message?: string
  last_message_time?: string
}

// 用户会话类型（管理员视图）
export interface UserSession {
  user_id: number
  nickname: string
  avatar: string
  role: string
  unread_count: number
  last_message: string
  last_message_time: string
  last_message_type: string
}

// WebSocket消息类型
export interface WebSocketMessage {
  type: 'message' | 'join' | 'leave' | 'typing' | 'stop_typing' | 'user_info' | 'chat_history' | 'error' | 'read_message' | 'message_read'
  data: any
  timestamp?: number
  userId?: number
  userName?: string
  isCustomerService?: boolean
}

// 聊天状态
export interface ChatServiceStatus {
  adminOnline: boolean
  adminCount: number
  totalUsers: number
  normalUserCount: number
}

// 聊天统计数据
export interface ChatStats {
  todayMessages: number
  sessions: Array<{
    total: number
    status: string
    today: number
  }>
  avgRating: number
  ratedSessions: number
  realTime: {
    totalUsers: number
    adminCount: number
    normalUserCount: number
    adminOnline: boolean
  }
}

// 聊天API类
export class ChatApi {
  /**
   * 获取聊天历史
   */
  static async getChatHistory(params: {
    page?: number
    limit?: number
    user_id?: number
    sessionId?: number
  } = {}): Promise<ApiResponse<ChatMessage[]>> {
    try {
      const response = await apiClient.getWithParams<ChatMessage[]>('/chat/history', params)
      return response
    } catch (error) {
      console.error('获取聊天历史失败:', error)
      throw error
    }
  }

  /**
   * 获取聊天会话列表
   */
  static async getChatSessions(params: {
    page?: number
    limit?: number
    status?: string
  } = {}): Promise<ApiResponse<ChatSession[]>> {
    try {
      const response = await apiClient.getWithParams<ChatSession[]>('/chat/sessions', params)
      return response
    } catch (error) {
      console.error('获取聊天会话失败:', error)
      throw error
    }
  }

  /**
   * 结束聊天会话
   */
  static async closeChatSession(sessionId: number, feedback?: {
    rating?: number
    feedback?: string
  }): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post<any>(`/chat/sessions/${sessionId}/close`, feedback)
      return response
    } catch (error) {
      console.error('结束聊天会话失败:', error)
      throw error
    }
  }

  /**
   * 获取客服在线状态
   */
  static async getServiceStatus(): Promise<ApiResponse<ChatServiceStatus>> {
    try {
      const response = await apiClient.get<ChatServiceStatus>('/chat/service/status')
      return response
    } catch (error) {
      console.error('获取客服状态失败:', error)
      throw error
    }
  }

  /**
   * 获取未读消息数量
   */
  static async getUnreadCount(): Promise<ApiResponse<{ unreadCount: number }>> {
    try {
      const response = await apiClient.get<{ unreadCount: number }>('/chat/unread-count')
      return response
    } catch (error) {
      console.error('获取未读消息数量失败:', error)
      throw error
    }
  }

  /**
   * 标记消息为已读
   */
  static async markMessagesAsRead(messageIds?: number[]): Promise<ApiResponse<{ unreadCount: number }>> {
    try {
      const response = await apiClient.post<{ unreadCount: number }>('/chat/mark-read', {
        messageIds
      })
      return response
    } catch (error) {
      console.error('标记消息已读失败:', error)
      throw error
    }
  }

  /**
   * 发送系统消息（仅管理员）
   */
  static async sendSystemMessage(message: string, targetUserId?: number): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post<any>('/chat/system/message', {
        message,
        target_user_id: targetUserId
      })
      return response
    } catch (error) {
      console.error('发送系统消息失败:', error)
      throw error
    }
  }

  /**
   * 获取聊天统计数据（仅管理员）
   */
  static async getChatStats(): Promise<ApiResponse<ChatStats>> {
    try {
      const response = await apiClient.get<ChatStats>('/chat/admin/stats')
      return response
    } catch (error) {
      console.error('获取聊天统计失败:', error)
      throw error
    }
  }

  /**
   * 获取用户的简化聊天会话列表（管理员专用）
   */
  static async getUserSessions(params: {
    page?: number
    limit?: number
  } = {}): Promise<ApiResponse<UserSession[]>> {
    try {
      const response = await apiClient.getWithParams<UserSession[]>('/chat/user-sessions', params)
      return response
    } catch (error) {
      console.error('获取用户会话列表失败:', error)
      throw error
    }
  }

  /**
   * 获取与特定用户的聊天记录（管理员专用）
   */
  static async getUserMessages(userId: number, params: {
    page?: number
    limit?: number
  } = {}): Promise<ApiResponse<ChatMessage[]>> {
    try {
      const response = await apiClient.getWithParams<ChatMessage[]>(`/chat/user-messages/${userId}`, params)
      return response
    } catch (error) {
      console.error('获取用户聊天记录失败:', error)
      throw error
    }
  }

  /**
   * 管理员向特定用户发送消息
   */
  static async sendMessage(message: string, targetUserId: number): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.post<any>('/chat/send-message', {
        message,
        target_user_id: targetUserId
      })
      return response
    } catch (error) {
      console.error('发送消息失败:', error)
      throw error
    }
  }

  /**
   * 标记特定会话为已读
   */
  static async markSessionAsRead(sessionId: number): Promise<ApiResponse<{ unreadCount: number }>> {
    try {
      // 由于后端没有专门的会话已读接口，这里使用通用的已读接口
      const response = await apiClient.post<{ unreadCount: number }>('/chat/mark-read', {})
      return response
    } catch (error) {
      console.error('标记会话已读失败:', error)
      throw error
    }
  }

  /**
   * 获取用户在线状态（管理员专用）
   */
  static async getUserOnlineStatus(userIds?: number[]): Promise<ApiResponse<{
    onlineStatus: Array<{ userId: number; isOnline: boolean }>
    stats: ChatServiceStatus
  }>> {
    try {
      const params = userIds ? { userIds } : {}
      const response = await apiClient.getWithParams<{
        onlineStatus: Array<{ userId: number; isOnline: boolean }>
        stats: ChatServiceStatus
      }>('/chat/users/online-status', params)
      return response
    } catch (error) {
      console.error('获取用户在线状态失败:', error)
      throw error
    }
  }

  /**
   * 获取连接详情（管理员调试用）
   */
  static async getConnectionDetails(): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.get<any>('/chat/admin/connections')
      return response
    } catch (error) {
      console.error('获取连接详情失败:', error)
      throw error
    }
  }
}

// 导出便捷函数
export const getChatHistory = ChatApi.getChatHistory
export const getChatSessions = ChatApi.getChatSessions
export const closeChatSession = ChatApi.closeChatSession
export const getServiceStatus = ChatApi.getServiceStatus
export const getUnreadCount = ChatApi.getUnreadCount
export const markMessagesAsRead = ChatApi.markMessagesAsRead
export const sendSystemMessage = ChatApi.sendSystemMessage
export const getChatStats = ChatApi.getChatStats
export const getUserSessions = ChatApi.getUserSessions
export const getUserMessages = ChatApi.getUserMessages

export default ChatApi 