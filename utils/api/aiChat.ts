import { apiClient } from "../apiClient";
import type { ApiResponse } from "../../types/api";

// AI聊天消息类型
export interface AiChatMessage {
  id: number;
  user_id: number;
  session_id: string;
  message_type: "user" | "assistant";
  content: string;
  created_at: string;
}

// AI聊天会话类型
export interface AiChatSession {
  session_id: string;
  first_message_time: string;
  last_message_time: string;
  message_count: number;
  first_user_message: string;
}

// 流式响应事件类型
export interface StreamEvent {
  type:
    | "start"
    | "chunk"
    | "done"
    | "error"
    | "progress"
    | "saved"
    | "end"
    | "connected"
    | "cancelled"
    | "retry";
  content?: string;
  fullResponse?: string;
  chunkIndex?: number;
  sessionId?: string;
  userMessage?: string;
  message?: string;
  error?: any;
  timestamp?: string;
  retryCount?: number;
  maxRetries?: number;
  chunkCount?: number;
}

// 流式回调函数类型
export interface StreamCallbacks {
  onStart?: (data: StreamEvent) => void;
  onChunk?: (data: StreamEvent) => void;
  onProgress?: (data: StreamEvent) => void;
  onDone?: (data: StreamEvent) => void;
  onError?: (data: StreamEvent) => void;
  onSaved?: (data: StreamEvent) => void;
  onConnected?: (data: StreamEvent) => void;
  onRetry?: (data: StreamEvent) => void;
  onEnd?: () => void;
}

export class AiChatApi {
  /**
   * 发送AI聊天消息 - 使用POST请求 + WebSocket接收回复
   */
  static async sendStreamMessage(
    message: string,
    sessionId: string | null,
    callbacks: StreamCallbacks = {},
    authToken?: string
  ): Promise<ApiResponse<{
    sessionId: string;
    message: string;
    timestamp: string;
  }>> {
    try {
      // 使用apiClient发送POST请求
      const response = await apiClient.post("/aiChat/stream", {
        message: message.trim(),
        sessionId: sessionId
      });

      console.log('AI聊天请求已发送:', response);
      
      // 调用开始回调
      callbacks.onStart?.({
        type: 'start',
        sessionId: response.data?.sessionId || sessionId,
        userMessage: message.trim(),
        timestamp: new Date().toISOString()
      });

      return response;
    } catch (error) {
      console.error('发送AI聊天请求失败:', error);
      
      // 调用错误回调
      callbacks.onError?.({
        type: 'error',
        message: error.message || '发送请求失败',
        error: error,
        timestamp: new Date().toISOString()
      });
      
      throw error;
    }
  }

  /**
   * 创建流式聊天连接（返回流式URL和处理方法）
   */
  static createStreamConnection(token: string) {
    return {
      url: "/api/aiChat/stream",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "text/event-stream",
        "Cache-Control": "no-cache",
      },
    };
  }

  /**
   * 发送AI聊天消息 - 传统版本
   */
  static async sendMessage(
    message: string,
    sessionId?: string
  ): Promise<
    ApiResponse<{
      sessionId: string;
      userMessage: string;
      aiReply: string;
      timestamp: string;
    }>
  > {
    try {
      const response = await apiClient.post("/aiChat", {
        message,
        sessionId,
      });
      return response;
    } catch (error) {
      console.error("发送AI聊天消息失败:", error);
      throw error;
    }
  }

  /**
   * 获取AI聊天历史
   */
  static async getChatHistory(
    params: {
      sessionId?: string;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<
    ApiResponse<{
      records: AiChatMessage[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  > {
    try {
      const response = await apiClient.getWithParams("/aiChat/history", params);
      return response;
    } catch (error) {
      console.error("获取AI聊天历史失败:", error);
      throw error;
    }
  }

  /**
   * 获取AI聊天会话列表
   */
  static async getSessions(): Promise<ApiResponse<AiChatSession[]>> {
    try {
      const response = await apiClient.get("/aiChat/sessions");
      return response;
    } catch (error) {
      console.error("获取AI聊天会话列表失败:", error);
      throw error;
    }
  }

  /**
   * 删除AI聊天会话
   */
  static async deleteSession(sessionId: string): Promise<
    ApiResponse<{
      deletedCount: number;
    }>
  > {
    try {
      const response = await apiClient.delete(`/aiChat/session/${sessionId}`);
      return response;
    } catch (error) {
      console.error("删除AI聊天会话失败:", error);
      throw error;
    }
  }
}
