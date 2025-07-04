import { apiClient } from '../apiClient'
import type {
  User,
  UserCreateInput,
  UserLoginInput,
  UserLoginResponse,
  UserUpdateInput,
  PasswordChangeInput,
  ApiResponse
} from '../../types/api'

// 认证相关API
export const authApi = {
  // 用户注册
  register: (userData: UserCreateInput): Promise<ApiResponse<User>> =>
    apiClient.post('/auth/register', userData, { requireAuth: false }),

  // 用户登录
  login: (credentials: UserLoginInput): Promise<ApiResponse<UserLoginResponse>> =>
    apiClient.post('/auth/login', credentials, { requireAuth: false }),

  // 获取当前用户信息
  getProfile: (): Promise<ApiResponse<User>> =>
    apiClient.get('/auth/me'),

  // 更新用户信息
  updateProfile: (userData: UserUpdateInput): Promise<ApiResponse<User>> =>
    apiClient.put('/auth/profile', userData),

  // 修改密码
  changePassword: (passwordData: PasswordChangeInput): Promise<ApiResponse<void>> =>
    apiClient.put('/auth/password', passwordData),

  // 获取用户列表（管理员功能）
  getUsers: (): Promise<ApiResponse<User[]>> =>
    apiClient.get('/users'),

  // 刷新Token
  refreshToken: (refreshToken: string): Promise<ApiResponse<{ token: string }>> =>
    apiClient.post('/auth/refresh', { refreshToken }, { requireAuth: false }),

  // 登出
  logout: (): Promise<ApiResponse<void>> =>
    apiClient.post('/auth/logout'),

  // 忘记密码
  forgotPassword: (email: string): Promise<ApiResponse<void>> =>
    apiClient.post('/auth/forgot-password', { email }, { requireAuth: false }),

  // 重置密码
  resetPassword: (token: string, newPassword: string): Promise<ApiResponse<void>> =>
    apiClient.post('/auth/reset-password', { token, newPassword }, { requireAuth: false }),

  // 验证邮箱
  verifyEmail: (token: string): Promise<ApiResponse<void>> =>
    apiClient.post('/auth/verify-email', { token }, { requireAuth: false }),

  // 重新发送验证邮件
  resendVerification: (email: string): Promise<ApiResponse<void>> =>
    apiClient.post('/auth/resend-verification', { email }, { requireAuth: false }),

  // 发送邮箱验证码
  sendEmailCode: async (data: { email: string }): Promise<ApiResponse<{ message: string }>> => {
    // 检查发送频率限制（60秒内只能发送一次）
    const lastSendKey = `lastSend_${data.email}`
    const lastSendTime = localStorage.getItem(lastSendKey)
    if (lastSendTime && Date.now() - parseInt(lastSendTime) < 60000) {
      return {
        success: false,
        message: '发送过于频繁，请60秒后再试'
      }
    }

    // 生成6位数字验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const messageHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>xlCig - 邮箱验证</title>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #0a0a0a; font-family: Arial, sans-serif;">
        <div style="max-width: 480px; margin: 0 auto; background: #1a1a1a; border-radius: 8px; border: 1px solid #333; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: #000000; padding: 24px 20px; text-align: center; border-bottom: 1px solid #333;">
            <div style="margin-bottom: 12px;">
              <!-- Logo -->
              <img src="https://xlcig.oss-cn-beijing.aliyuncs.com/avatars/logo.png?Expires=1751639237&OSSAccessKeyId=TMP.3KmZD6t8o3n1rKuSyCorjaftjmjgbsmLYDq74CzmdgC4XQGqBuLsum69r8snmQ2jFs2XMgB46rvT87S3VB9otvmzTpL3fB&Signature=Oax6b3GJVc%2BpH9f69iGgtpTbQdg%3D" alt="xlCig" style="height: 40px; max-width: 160px; display: inline-block;">
            </div>
            <p style="color: #888888; margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
              邮箱验证
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 24px 20px; background: #1a1a1a;">
            
            <!-- Verification Code -->
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #ffffff; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
                验证码
              </h2>
              <p style="color: #888888; font-size: 13px; margin: 0 0 16px 0;">
                请输入以下验证码完成注册
              </p>
              
              <div style="background: #000000; border: 1px solid #333; border-radius: 6px; padding: 20px; margin: 16px 0;">
                <div style="font-size: 28px; font-weight: bold; color: #00f5ff; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                  ${code}
                </div>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #333;">
                  <span style="color: #888888; font-size: 11px;">
                    有效期：10分钟
                  </span>
                </div>
              </div>
            </div>

            <!-- Security Notice -->
            <div style="background: #111111; border: 1px solid #333; border-radius: 4px; padding: 16px; margin: 16px 0;">
              <p style="color: #ffffff; font-size: 12px; font-weight: bold; margin: 0 0 6px 0;">
                🛡️ 安全提醒
              </p>
              <p style="color: #cccccc; font-size: 11px; margin: 0; line-height: 1.4;">
                • 请勿向任何人透露此验证码<br>
                • 如非本人操作，请忽略此邮件
              </p>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: #000000; border-top: 1px solid #333; padding: 16px 20px; text-align: center;">
            <p style="color: #666666; font-size: 10px; margin: 0; line-height: 1.3;">
              此邮件由 xlCig 系统发送<br>
              <span style="color: #888888;">© 2025 xlCig</span>
            </p>
          </div>
        </div>
      </body>
      </html>`
    //网易授权码
    const wyKey = 'QUedTyAvtaBLqjjm'
    //qq授权码
    const qqKey = 'odmyaacplscmdfgi'
    //apiKey
    const apiKey = 'kQkGSVy2vEnsoX1751441583687rSR1yklfuc'

    // 根据用户邮箱后缀选择对应的授权码和邮箱类型
    const emailDomain = data.email.split('@')[1]?.toLowerCase()
    let smtpCode = ''
    let smtpEmail = ''
    let smtpCodeType = ''

    if (emailDomain === '163.com' || emailDomain === '126.com') {
      smtpCode = wyKey
      smtpEmail = '18569795073@163.com' // 替换为实际的163邮箱
      smtpCodeType = emailDomain === '163.com' ? '163' : '126'
    } else if (emailDomain === 'qq.com') {
      smtpCode = qqKey
      smtpEmail = '2966898893@qq.com' // 替换为实际的QQ邮箱
      smtpCodeType = 'qq'
    } else {
      // 默认使用163
      smtpCode = wyKey
      smtpEmail = '18569795073@163.com'
      smtpCodeType = '163'
    }

    // 邮件请求的共同参数配置
    const mailRequestData = {
      ColaKey: apiKey,           // API密钥
      tomail: data.email,        // 目标邮箱地址
      fromTitle:"xlCig",      // 邮件标题（发件人名称）
      subject: 'register is to xlCig',  // 邮件主题
      content: messageHtml.trim(), // 邮件内容(html)
      isTextContent: false,      // 邮件内容是HTML格式
      smtpCode: smtpCode,        // 邮件系统授权码
      smtpEmail: smtpEmail,      // 开启授权码对应的授权邮箱
      smtpCodeType: smtpCodeType // 授权邮箱的类型
    }

    try {
      // 调用外部邮件服务API
      const mailResponse = await fetch('https://luckycola.com.cn/tools/customMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailRequestData)
      })

      if (!mailResponse.ok) {
        const errorData = await mailResponse.text()
        console.error('邮件服务响应错误:', errorData)
        throw new Error('邮件发送失败')
      }

      // 记录发送时间
      localStorage.setItem(lastSendKey, Date.now().toString())

      // 将验证码临时存储到 localStorage，实际项目中应该存储到后端
      const codeData = {
        email: data.email,
        code: code,
        timestamp: Date.now(),
        expires: Date.now() + 10 * 60 * 1000 // 10分钟过期
      }
      localStorage.setItem(`emailCode_${data.email}`, JSON.stringify(codeData))

      return {
        success: true,
        message: '验证码发送成功，请查看您的邮箱',
        data: { message: '验证码已发送' }
      }
    } catch (error) {
      console.error('发送邮箱验证码失败:', error)
      // 如果HTTPS失败，尝试HTTP
      try {
        const httpResponse = await fetch('http://luckycola.com.cn/tools/customMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mailRequestData)
        })

        if (httpResponse.ok) {
          // 记录发送时间
          localStorage.setItem(lastSendKey, Date.now().toString())
          
          return {
            success: true,
            message: '验证码发送成功，请查看您的邮箱',
            data: { message: '验证码已发送' }
          }
        }
      } catch (httpError) {
        console.error('HTTP邮件发送也失败:', httpError)
      }

      return {
        success: false,
        message: error instanceof Error ? error.message : '发送验证码失败，请稍后重试'
      }
    }
  },

  // 验证邮箱验证码
  verifyEmailCode: (data: { email: string; code: string }): Promise<ApiResponse<boolean>> => {
    try {
      const storedData = localStorage.getItem(`emailCode_${data.email}`)
      if (!storedData) {
        return Promise.resolve({
          success: false,
          message: '验证码不存在或已过期'
        })
      }

      const codeInfo = JSON.parse(storedData)
      const now = Date.now()

      if (now > codeInfo.expires) {
        localStorage.removeItem(`emailCode_${data.email}`)
        return Promise.resolve({
          success: false,
          message: '验证码已过期，请重新获取'
        })
      }

      if (codeInfo.code !== data.code) {
        return Promise.resolve({
          success: false,
          message: '验证码错误'
        })
      }

      // 验证成功后删除验证码
      localStorage.removeItem(`emailCode_${data.email}`)

      return Promise.resolve({
        success: true,
        message: '验证码验证成功',
        data: true
      })
    } catch (error) {
      return Promise.resolve({
        success: false,
        message: '验证码验证失败'
      })
    }
  }
}

export default authApi 