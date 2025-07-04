import { apiClient } from '../apiClient'
import type { ApiResponse, User } from '../../types/api'

// 上传相关API
export const uploadApi = {
  // 上传头像
  uploadAvatar: async (file: File): Promise<ApiResponse<{ avatar: string; user: User }>> => {
    const formData = new FormData()
    formData.append('avatar', file)

    return apiClient.upload('/upload/avatar', formData)
  },

  // 验证图片文件
  validateImageFile: (file: File): { valid: boolean; message?: string } => {
    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        message: '只支持 JPEG、PNG、GIF、WebP 格式的图片文件'
      }
    }

    // 检查文件大小 (2MB)
    const maxSize = 2 * 1024 * 1024
    if (file.size > maxSize) {
      return {
        valid: false,
        message: '文件大小不能超过2MB'
      }
    }

    return { valid: true }
  },

  // 获取文件预览URL
  getFilePreviewUrl: (file: File): string => {
    return URL.createObjectURL(file)
  },

  // 释放文件预览URL
  releaseFilePreviewUrl: (url: string): void => {
    URL.revokeObjectURL(url)
  }
}

export default uploadApi 