<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
    <!-- 背景装饰效果 -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
    </div>

    <!-- 导航栏 -->
    <nav class="relative z-10">
      <div class="container mx-auto px-6 py-6">
        <div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <!-- Logo -->
              <AppLogo size="medium" :show-decorations="false" />
              <div class="h-6 w-px bg-gray-600"></div>
              
              <!-- 帅气的返回按钮 -->
              <button 
                @click="goBack" 
                class="group relative inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
              >
                <!-- 按钮背景渐变和光效 -->
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-xl transition-all duration-300 group-hover:from-cyan-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30"></div>
                <div class="absolute inset-0 border-2 border-cyan-500/30 rounded-xl transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-400/25"></div>
                
                <!-- 动态粒子效果 -->
                <div class="absolute inset-0 rounded-xl overflow-hidden">
                  <div class="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="top: 20%; left: 15%; animation-delay: 0s;"></div>
                  <div class="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="top: 60%; left: 80%; animation-delay: 0.2s;"></div>
                  <div class="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="top: 80%; left: 30%; animation-delay: 0.4s;"></div>
                </div>
                
                <!-- 左侧箭头图标 -->
                <div class="relative flex items-center">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mr-3 transition-all duration-300 group-hover:from-cyan-400/40 group-hover:to-blue-400/40 group-hover:scale-110">
                    <i class="bi bi-arrow-left text-cyan-400 text-lg transition-all duration-300 group-hover:text-white group-hover:-translate-x-1"></i>
                  </div>
                  
                  <!-- 文字和副标题 -->
                  <div class="text-left">
                    <div class="text-white text-sm font-semibold transition-all duration-300 group-hover:text-cyan-100">返回</div>
                    <div class="text-gray-400 text-xs transition-all duration-300 group-hover:text-cyan-300">Back</div>
                  </div>
                </div>
                
                <!-- 右侧装饰线条 -->
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div class="flex flex-col space-y-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full transition-all duration-300 group-hover:w-8"></div>
                    <div class="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full transition-all duration-300 group-hover:w-6 delay-75"></div>
                    <div class="w-2 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full transition-all duration-300 group-hover:w-4 delay-150"></div>
                  </div>
                </div>
              </button>
            </div>
            <nav class="text-sm text-gray-400">
              <NuxtLink to="/" class="hover:text-cyan-400 transition-colors duration-200">首页</NuxtLink>
              <i class="bi bi-chevron-right mx-2 text-cyan-400"></i>
              <span class="text-white font-medium">个人中心</span>
            </nav>
          </div>
        </div>
      </div>
    </nav>

    <div class="relative z-10 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 页面标题 -->
        <div class="mb-8 animate-fade-in-up">
          <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3">
              <i class="bi bi-person-circle text-cyan-400 text-3xl animate-bounce-gentle"></i>
              个人中心
            </h1>
            <p class="text-gray-300 text-lg">管理您的个人信息和账户设置</p>
          </div>
        </div>

        <!-- 用户信息卡片 -->
        <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6 animate-fade-in-up animation-delay-200">
          <div class="flex items-center space-x-6">
            <!-- 头像 -->
            <div class="relative group">
              <div class="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 transform group-hover:scale-105 overflow-hidden">
                <img 
                  v-if="userInfo?.avatar" 
                  :src="userInfo.avatar" 
                  :alt="(userInfo?.nickname || userInfo?.username || 'U') + '的头像'"
                  class="w-full h-full object-cover"
                  @error="handleAvatarError"
                />
                <span v-else>{{ (userInfo?.nickname || userInfo?.username || 'U').charAt(0).toUpperCase() }}</span>
              </div>
              <button 
                @click="showAvatarModal = true"
                class="absolute bottom-0 right-0 bg-cyan-500 text-white rounded-full p-2 hover:bg-cyan-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-cyan-500/20"
              >
                <i class="bi bi-camera text-sm"></i>
              </button>
            </div>
            
            <!-- 用户基本信息 -->
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-white mb-2">{{ userInfo?.nickname || userInfo?.username || '加载中...' }}</h2>
              <p class="text-gray-300 mb-1">{{ userInfo?.email || '' }}</p>
              <p v-if="userInfo?.nickname && userInfo?.username" class="text-sm text-gray-400">用户名: {{ userInfo.username }}</p>
              <div class="flex items-center space-x-4 mt-3">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      :class="roleStyles[userInfo?.role || 'user']">
                  {{ roleLabels[userInfo?.role || 'user'] }}
                </span>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      :class="statusStyles[userInfo?.status || 'active']">
                  {{ statusLabels[userInfo?.status || 'active'] }}
                </span>
              </div>
            </div>
            
            <!-- 快捷操作 -->
            <div class="flex flex-col space-y-3">
              <button @click="activeTab = 'edit'" class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1">
                <i class="bi bi-pencil-square mr-2"></i>
                编辑资料
              </button>
              <button @click="activeTab = 'password'" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1">
                <i class="bi bi-shield-lock mr-2"></i>
                修改密码
              </button>
            </div>
          </div>
        </div>

        <!-- 标签页导航 -->
        <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-up animation-delay-400">
          <div class="border-b border-gray-700/50">
            <nav class="flex space-x-8">
              <button 
                v-for="tab in tabs" 
                :key="tab.key"
                @click="activeTab = tab.key"
                :class="[
                  'py-4 px-6 text-sm font-medium border-b-2 transition-all duration-300 flex items-center gap-2',
                  activeTab === tab.key 
                    ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' 
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                ]"
              >
                <i :class="tab.icon"></i>
                {{ tab.label }}
              </button>
            </nav>
          </div>

          <!-- 标签页内容 -->
          <div class="p-8">
            <!-- 基本信息 -->
            <div v-if="activeTab === 'info'" class="space-y-6 animate-fade-in">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                  <label class="block text-sm font-medium text-cyan-400 mb-2">用户名</label>
                  <p class="text-white text-lg">{{ userInfo?.username || '-' }}</p>
                </div>
                <div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                  <label class="block text-sm font-medium text-cyan-400 mb-2">昵称</label>
                  <p class="text-white text-lg">{{ userInfo?.nickname || '-' }}</p>
                </div>
                <div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                  <label class="block text-sm font-medium text-cyan-400 mb-2">邮箱</label>
                  <p class="text-white text-lg">{{ userInfo?.email || '-' }}</p>
                </div>
                <div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                  <label class="block text-sm font-medium text-cyan-400 mb-2">手机号</label>
                  <p class="text-white text-lg">{{ userInfo?.phone || '-' }}</p>
                </div>
                <div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 md:col-span-2">
                  <label class="block text-sm font-medium text-cyan-400 mb-2">注册时间</label>
                  <p class="text-white text-lg">{{ formatDate(userInfo?.created_at) || '-' }}</p>
                </div>
              </div>
            </div>

            <!-- 编辑资料 -->
            <div v-if="activeTab === 'edit'" class="space-y-6 animate-fade-in">
              <form @submit.prevent="updateProfile">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="username" class="block text-sm font-medium text-cyan-400">用户名</label>
                    <input 
                      id="username"
                      v-model="editForm.username" 
                      type="text" 
                      class="input-dark w-full"
                      placeholder="请输入用户名"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="nickname" class="block text-sm font-medium text-cyan-400">昵称</label>
                    <input 
                      id="nickname"
                      v-model="editForm.nickname" 
                      type="text" 
                      class="input-dark w-full"
                      placeholder="请输入昵称"
                    />
                  </div>
                  <div class="space-y-2 md:col-span-2">
                    <label for="phone" class="block text-sm font-medium text-cyan-400">手机号</label>
                    <input 
                      id="phone"
                      v-model="editForm.phone" 
                      type="tel" 
                      class="input-dark w-full"
                      placeholder="请输入手机号"
                    />
                  </div>
                </div>
                
                <div class="flex justify-end space-x-4 mt-8">
                  <button type="button" @click="resetEditForm" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1">
                    <i class="bi bi-arrow-clockwise mr-2"></i>
                    重置
                  </button>
                  <button type="submit" :disabled="updating" class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="updating" class="loading loading-spinner loading-sm mr-2"></span>
                    <i v-else class="bi bi-check-circle mr-2"></i>
                    {{ updating ? '保存中...' : '保存修改' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- 修改密码 -->
            <div v-if="activeTab === 'password'" class="space-y-6 animate-fade-in">
              <form @submit.prevent="changePassword">
                <div class="max-w-md space-y-6">
                  <div class="space-y-2">
                    <label for="currentPassword" class="block text-sm font-medium text-cyan-400">当前密码</label>
                    <input 
                      id="currentPassword"
                      v-model="passwordForm.currentPassword" 
                      type="password" 
                      class="input-dark w-full"
                      placeholder="请输入当前密码"
                      required
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="newPassword" class="block text-sm font-medium text-cyan-400">新密码</label>
                    <input 
                      id="newPassword"
                      v-model="passwordForm.newPassword" 
                      type="password" 
                      class="input-dark w-full"
                      placeholder="请输入新密码（至少6位）"
                      required
                      minlength="6"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="confirmPassword" class="block text-sm font-medium text-cyan-400">确认新密码</label>
                    <input 
                      id="confirmPassword"
                      v-model="passwordForm.confirmPassword" 
                      type="password" 
                      class="input-dark w-full"
                      placeholder="请再次输入新密码"
                      required
                    />
                  </div>
                </div>
                
                <div class="flex justify-end space-x-4 mt-8">
                  <button type="button" @click="resetPasswordForm" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1">
                    <i class="bi bi-arrow-clockwise mr-2"></i>
                    重置
                  </button>
                  <button type="submit" :disabled="changingPassword" class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="changingPassword" class="loading loading-spinner loading-sm mr-2"></span>
                    <i v-else class="bi bi-shield-check mr-2"></i>
                    {{ changingPassword ? '修改中...' : '修改密码' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 头像上传弹窗 -->
    <div v-if="showAvatarModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div class="glass-card-dark rounded-2xl p-6 max-w-md w-full mx-4 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-scale-in">
        <h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-3">
          <i class="bi bi-camera text-cyan-400"></i>
          上传头像
        </h3>
        
        <div class="space-y-6">
          <!-- 文件选择区域 -->
          <div class="flex justify-center">
            <div class="relative">
              <input 
                id="avatar-input"
                type="file" 
                accept="image/*" 
                @change="onFileChange"
                class="hidden"
              />
              
              <!-- 预览区域 -->
              <div 
                @click="triggerFileInput"
                class="w-32 h-32 border-2 border-dashed border-cyan-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 transition-colors duration-300 cursor-pointer overflow-hidden"
              >
                <img 
                  v-if="avatarPreview" 
                  :src="avatarPreview" 
                  alt="头像预览"
                  class="w-full h-full object-cover"
                />
                <div v-else class="text-center">
                  <i class="bi bi-cloud-upload text-3xl text-cyan-400 mb-2 block"></i>
                  <span class="text-sm text-gray-400">点击选择图片</span>
                </div>
              </div>
              
              <!-- 重新选择按钮 -->
              <button 
                v-if="avatarPreview"
                @click="triggerFileInput"
                class="absolute top-0 right-0 bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-400 transition-colors duration-200"
              >
                <i class="bi bi-pencil text-xs"></i>
              </button>
            </div>
          </div>
          
          <!-- 文件信息 -->
          <div v-if="selectedFile" class="text-center">
            <p class="text-sm text-gray-400">{{ selectedFile.name }}</p>
            <p class="text-xs text-gray-500">{{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB</p>
          </div>
          
          <!-- 提示信息 -->
          <p class="text-center text-gray-400 text-sm">
            支持 JPG、PNG、GIF、WebP 格式<br>
            文件大小不超过 2MB
          </p>
          
          <!-- 操作按钮 -->
          <div class="flex justify-end space-x-4">
            <button 
              @click="closeAvatarModal" 
              class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
            >
              <i class="bi bi-x-circle mr-2"></i>
              取消
            </button>
            <button 
              @click="uploadAvatar"
              :disabled="!selectedFile || uploadingAvatar"
              class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="uploadingAvatar" class="loading loading-spinner loading-sm mr-2"></span>
              <i v-else class="bi bi-check-circle mr-2"></i>
              {{ uploadingAvatar ? '上传中...' : '确定上传' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { api } from '../utils/api'
import type { User, UserUpdateInput, PasswordChangeInput } from '../utils/api'
import { createDiscreteApi } from 'naive-ui'
import { useUserStore } from '../stores/user'

// 使用Pinia store
const userStore = useUserStore()

// 创建临时的消息API
const { message } = createDiscreteApi(['message'])

// 临时消息函数
const success = (content: string) => {
  message.success(content, { duration: 3000 })
}

const error = (content: string) => {
  message.error(content, { duration: 4000 })
}

// 响应式数据
const userInfo = ref<User | null>(null)
const loading = ref(true)
const updating = ref(false)
const changingPassword = ref(false)
const showAvatarModal = ref(false)
const uploadingAvatar = ref(false)
const avatarPreview = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const activeTab = ref('info')

// 标签页配置
const tabs = [
  { key: 'info', label: '基本信息', icon: 'bi bi-person' },
  { key: 'edit', label: '编辑资料', icon: 'bi bi-pencil-square' },
  { key: 'password', label: '修改密码', icon: 'bi bi-shield-lock' }
]

// 编辑表单
const editForm = reactive<UserUpdateInput>({
  username: '',
  nickname: '',
  phone: ''
})

// 密码修改表单
const passwordForm = reactive<PasswordChangeInput & { confirmPassword: string }>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 样式配置
const roleStyles = {
  user: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  merchant: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  admin: 'bg-red-500/20 text-red-300 border border-red-500/30'
}

const roleLabels = {
  user: '普通用户',
  merchant: '商家',
  admin: '管理员'
}

const statusStyles = {
  active: 'bg-green-500/20 text-green-300 border border-green-500/30',
  inactive: 'bg-gray-500/20 text-gray-300 border border-gray-500/30',
  banned: 'bg-red-500/20 text-red-300 border border-red-500/30'
}

const statusLabels = {
  active: '正常',
  inactive: '未激活',
  banned: '已封禁'
}

// 返回功能
const goBack = () => {
  window.history.back()
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    loading.value = true
    const response = await api.auth.getProfile()
    if (response.data) {
      userInfo.value = response.data
      // 初始化编辑表单
      editForm.username = response.data.username
      editForm.nickname = response.data.nickname || ''
      editForm.phone = response.data.phone || ''
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    window.location.href = '/auth/login'
  } finally {
    loading.value = false
  }
}

// 更新个人信息
const updateProfile = async () => {
  try {
    updating.value = true
    const response = await api.auth.updateProfile(editForm)
    if (response.data) {
      // 更新本地用户信息
      userInfo.value = response.data
      
      // 更新Pinia store中的用户信息
      userStore.updateUser(response.data)
      
      // 显示成功提示
      success('个人信息更新成功！')
      activeTab.value = 'info'
    }
  } catch (error: any) {
    console.error('更新个人信息失败:', error)
    error(error.message || '更新失败，请重试')
  } finally {
    updating.value = false
  }
}

// 修改密码
const changePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    error('两次输入的新密码不一致')
    return
  }

  try {
    changingPassword.value = true
    await api.auth.changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    })
    
    success('密码修改成功，请重新登录')
    // 清除本地存储并跳转到登录页
    localStorage.removeItem('authToken')
    localStorage.removeItem('userInfo')
    window.location.href = '/auth/login'
  } catch (error: any) {
    console.error('修改密码失败:', error)
    error(error.message || '修改密码失败，请重试')
  } finally {
    changingPassword.value = false
  }
}

// 重置编辑表单
const resetEditForm = () => {
  if (userInfo.value) {
    editForm.username = userInfo.value.username
    editForm.nickname = userInfo.value.nickname || ''
    editForm.phone = userInfo.value.phone || ''
  }
}

// 重置密码表单
const resetPasswordForm = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

// 格式化日期
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 头像上传相关方法
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return

  // 验证文件
  const validation = api.upload.validateImageFile(file)
  if (!validation.valid) {
    error(validation.message!)
    return
  }

  selectedFile.value = file
  // 创建预览URL
  avatarPreview.value = api.upload.getFilePreviewUrl(file)
}

const uploadAvatar = async () => {
  if (!selectedFile.value) {
    error('请选择要上传的头像')
    return
  }

  try {
    uploadingAvatar.value = true
    const response = await api.upload.uploadAvatar(selectedFile.value)
    
    if (response.success && response.data) {
      // 更新本地用户信息
      userInfo.value = response.data.user
      
      // 更新Pinia store中的用户信息（这会自动同步到localStorage和所有页面）
      userStore.updateUser(response.data.user)
      
      success('头像更新成功！')
      closeAvatarModal()
    }
  } catch (err: any) {
    console.error('头像上传失败:', err)
    error(err.message || '头像上传失败，请重试')
  } finally {
    uploadingAvatar.value = false
  }
}

const closeAvatarModal = () => {
  showAvatarModal.value = false
  selectedFile.value = null
  
  // 释放预览URL
  if (avatarPreview.value) {
    api.upload.releaseFilePreviewUrl(avatarPreview.value)
    avatarPreview.value = null
  }
}

const triggerFileInput = () => {
  const fileInput = document.getElementById('avatar-input') as HTMLInputElement
  fileInput?.click()
}

const handleAvatarError = () => {
  // 处理头像加载失败的情况
  console.error('头像加载失败')
}

// 页面挂载时获取用户信息
onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
/* 深色主题按钮样式 */
.btn-premium-dark {
  background: linear-gradient(135deg, #00f5ff 0%, #0080ff 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 245, 255, 0.4);
}

.btn-premium-dark:hover {
  box-shadow: 0 6px 20px rgba(0, 245, 255, 0.6);
}

.btn-outline-dark {
  border: 2px solid rgba(100, 116, 139, 0.3);
  color: #cbd5e1;
  background: rgba(0, 0, 0, 0.2);
}

.btn-outline-dark:hover {
  border-color: rgba(0, 245, 255, 0.5);
  color: #00f5ff;
  background: rgba(0, 245, 255, 0.1);
}

/* 深色主题输入框样式 */
.input-dark {
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(100, 116, 139, 0.3);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.input-dark:focus {
  outline: none;
  border-color: #00f5ff;
  box-shadow: 0 0 0 3px rgba(0, 245, 255, 0.2);
}

.input-dark::placeholder {
  color: #64748b;
}

/* 加载动画 */
.loading {
  display: inline-block;
  animation: spin 1s linear infinite;
}

.loading-spinner {
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
}

.loading-sm {
  width: 1rem;
  height: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 自定义动画 */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounce-gentle {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

.animate-bounce-gentle {
  animation: bounce-gentle 2s infinite;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

/* 玻璃拟态效果 */
.glass-card-dark {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.glass-morphism-dark {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
</style> 