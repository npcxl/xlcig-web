import { createDiscreteApi } from 'naive-ui'

// 创建独立的消息API实例
const { message, notification, dialog, loadingBar } = createDiscreteApi([
  'message',
  'notification', 
  'dialog',
  'loadingBar'
])

export const useMessage = () => {
  // 成功消息
  const success = (content: string, duration = 3000) => {
    message.success(content, { duration })
  }

  // 错误消息  
  const error = (content: string, duration = 4000) => {
    message.error(content, { duration })
  }

  // 警告消息
  const warning = (content: string, duration = 3000) => {
    message.warning(content, { duration })
  }

  // 普通消息
  const info = (content: string, duration = 3000) => {
    message.info(content, { duration })
  }

  // 加载中消息
  const loading = (content: string) => {
    return message.loading(content, { duration: 0 })
  }

  // 确认对话框
  const confirm = (content: string, title = '确认'): Promise<boolean> => {
    return new Promise((resolve) => {
      dialog.warning({
        title,
        content,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          resolve(true)
        },
        onNegativeClick: () => {
          resolve(false)
        },
        onClose: () => {
          resolve(false)
        }
      })
    })
  }

  // 通知
  const notify = {
    success: (title: string, content?: string, duration = 4000) => {
      notification.success({
        title,
        content,
        duration
      })
    },
    error: (title: string, content?: string, duration = 4000) => {
      notification.error({
        title,
        content,
        duration
      })
    },
    warning: (title: string, content?: string, duration = 4000) => {
      notification.warning({
        title,
        content,
        duration
      })
    },
    info: (title: string, content?: string, duration = 4000) => {
      notification.info({
        title,
        content,
        duration
      })
    }
  }

  return {
    success,
    error,
    warning,
    info,
    loading,
    confirm,
    notify,
    loadingBar
  }
} 