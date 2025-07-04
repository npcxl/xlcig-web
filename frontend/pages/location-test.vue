<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-4">🌍 IP位置定位测试</h1>
        <p class="text-gray-300 text-lg">测试首页IP获取、用户登录检测、高德API调用等完整流程</p>
      </div>

      <!-- 用户登录状态 -->
      <div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6">
        <h2 class="text-2xl font-semibold text-white mb-4 flex items-center">
          <i class="bi bi-person-check mr-3 text-cyan-400"></i>
          用户登录状态检查
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-800/30 rounded-lg">
            <div class="text-sm text-gray-400 mb-1">前端登录检查</div>
            <div class="text-lg font-medium">
              <span v-if="isUserLoggedIn" class="text-green-400">
                <i class="bi bi-check-circle mr-2"></i>已登录 (前端验证)
              </span>
              <span v-else class="text-red-400">
                <i class="bi bi-x-circle mr-2"></i>未登录 (前端验证)
              </span>
            </div>
          </div>
          <div class="p-4 bg-gray-800/30 rounded-lg" v-if="isUserLoggedIn">
            <div class="text-sm text-gray-400 mb-1">用户信息</div>
            <div class="text-lg font-medium text-white">
              {{ userStore.userDisplayName }} (ID: {{ userStore.user?.id }})
            </div>
          </div>
        </div>
        
        <!-- 登录状态说明 -->
        <div class="mt-4 p-4 rounded-lg" :class="isUserLoggedIn ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'">
          <div class="flex items-start gap-3">
            <i class="bi bi-info-circle text-lg mt-0.5" :class="isUserLoggedIn ? 'text-green-400' : 'text-yellow-400'"></i>
            <div>
              <div class="font-medium mb-2" :class="isUserLoggedIn ? 'text-green-300' : 'text-yellow-300'">
                {{ isUserLoggedIn ? '完整功能模式' : '基础功能模式' }}
              </div>
              <div class="text-sm" :class="isUserLoggedIn ? 'text-green-200' : 'text-yellow-200'">
                <div v-if="isUserLoggedIn">
                  ✅ 前端已确认登录状态<br>
                  ✅ API调用时会携带认证token<br>
                  ✅ 后端会更新users表的loginIp和loginIpContent字段<br>
                  ✅ 可以查看个人登录历史记录
                </div>
                <div v-else>
                  ℹ️ 仍可获取IP地址和位置信息<br>
                  ℹ️ 数据会保存到ip_addresses表作为缓存<br>
                  ⚠️ 不会更新个人用户档案<br>
                  💡 请登录以启用完整功能
                </div>
              </div>
              <div v-if="!isUserLoggedIn" class="mt-3">
                <NuxtLink to="/auth/login" class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors">
                  立即登录
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- IP位置信息卡片 -->
      <div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6">
        <h2 class="text-2xl font-semibold text-white mb-4 flex items-center">
          <i class="bi bi-geo-alt mr-3 text-cyan-400"></i>
          IP位置信息
        </h2>
        
        <!-- 加载状态 -->
        <div v-if="loading" class="text-center py-8">
          <div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-white text-lg">正在获取IP位置信息...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="text-center py-8">
          <div class="text-red-400 text-6xl mb-4">
            <i class="bi bi-exclamation-triangle"></i>
          </div>
          <p class="text-red-400 text-lg mb-4">{{ error }}</p>
          <button @click="refreshLocation(true)" 
                  class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            <i class="bi bi-arrow-clockwise mr-2"></i>
            重新获取
          </button>
        </div>

        <!-- 成功状态 -->
        <div v-else-if="data" class="space-y-4">
          <!-- 基本IP信息 -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 bg-gray-800/30 rounded-lg">
              <div class="text-sm text-gray-400 mb-1">IP地址</div>
              <div class="text-lg font-mono text-cyan-400">{{ data.ip }}</div>
            </div>
            <div class="p-4 bg-gray-800/30 rounded-lg">
              <div class="text-sm text-gray-400 mb-1">位置</div>
              <div class="text-lg text-white">{{ getLocationText() }}</div>
            </div>
          </div>

          <!-- 详细位置信息 -->
          <div v-if="data.location && !data.location.error" class="grid md:grid-cols-3 gap-4">
            <div class="p-4 bg-gray-800/30 rounded-lg" v-if="data.location.province">
              <div class="text-sm text-gray-400 mb-1">省份</div>
              <div class="text-lg text-white">{{ data.location.province }}</div>
            </div>
            <div class="p-4 bg-gray-800/30 rounded-lg" v-if="data.location.city">
              <div class="text-sm text-gray-400 mb-1">城市</div>
              <div class="text-lg text-white">{{ data.location.city }}</div>
            </div>
            <div class="p-4 bg-gray-800/30 rounded-lg" v-if="data.location.adcode">
              <div class="text-sm text-gray-400 mb-1">区域编码</div>
              <div class="text-lg font-mono text-white">{{ data.location.adcode }}</div>
            </div>
          </div>

          <!-- 缓存和用户更新状态 -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 bg-gray-800/30 rounded-lg">
              <div class="text-sm text-gray-400 mb-1">数据来源</div>
              <div class="text-lg">
                <span v-if="data.cached" class="text-green-400">
                  <i class="bi bi-database mr-2"></i>数据库缓存
                </span>
                <span v-else class="text-cyan-400">
                  <i class="bi bi-cloud mr-2"></i>高德地图API
                </span>
              </div>
            </div>
            <div class="p-4 bg-gray-800/30 rounded-lg" v-if="userStore.isLoggedIn">
              <div class="text-sm text-gray-400 mb-1">登录信息更新</div>
              <div class="text-lg">
                <span v-if="isUserLocationUpdated" class="text-green-400">
                  <i class="bi bi-check-circle mr-2"></i>已更新到数据库
                </span>
                <span v-else class="text-yellow-400">
                  <i class="bi bi-clock mr-2"></i>未更新
                </span>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex gap-4 pt-4">
            <button @click="refreshLocation(true)"
                    :disabled="loading"
                    class="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white rounded-lg transition-colors">
              <i class="bi bi-arrow-clockwise mr-2" :class="{ 'animate-spin': loading }"></i>
              强制刷新
            </button>
            <button @click="fetchLocation(true)"
                    :disabled="loading"
                    class="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white rounded-lg transition-colors">
              <i class="bi bi-geo-alt mr-2"></i>
              重新定位
            </button>
            <button v-if="!isUserLoggedIn" 
                    @click="testLogin"
                    class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <i class="bi bi-person-plus mr-2"></i>
              测试登录
            </button>
            <button v-else 
                    @click="testLogout"
                    class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
              <i class="bi bi-box-arrow-right mr-2"></i>
              测试登出
            </button>
          </div>
          
          <!-- 测试说明 -->
          <div class="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div class="text-blue-300 text-sm">
              <i class="bi bi-info-circle mr-2"></i>
              <strong>测试说明：</strong>"测试登录"仅用于演示前端登录状态检查，使用模拟token。
              要测试完整的数据库更新功能，请使用真实账号<NuxtLink to="/auth/login" class="text-blue-400 underline ml-1">登录</NuxtLink>。
            </div>
          </div>
        </div>
      </div>

      <!-- 技术说明 -->
      <div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <h2 class="text-2xl font-semibold text-white mb-4 flex items-center">
          <i class="bi bi-info-circle mr-3 text-cyan-400"></i>
          功能说明
        </h2>
        <div class="space-y-4 text-gray-300">
          <div class="p-4 bg-gray-800/30 rounded-lg">
            <h3 class="text-lg font-semibold text-white mb-2">✅ 已实现的功能</h3>
            <ul class="space-y-2 text-sm">
              <li><i class="bi bi-check text-green-400 mr-2"></i><strong>前端登录状态检查</strong>：检查localStorage中的认证信息</li>
              <li><i class="bi bi-check text-green-400 mr-2"></i><strong>真实IP获取</strong>：使用ipinfo.io获取公网IP，避免代理问题</li>
              <li><i class="bi bi-check text-green-400 mr-2"></i><strong>高德地图API调用</strong>：获取IP对应的省市地址信息</li>
              <li><i class="bi bi-check text-green-400 mr-2"></i><strong>后端JWT验证</strong>：确保只有真实登录用户才能更新数据库</li>
              <li><i class="bi bi-check text-green-400 mr-2"></i><strong>用户表更新</strong>：自动更新loginIp和loginIpContent字段</li>
              <li><i class="bi bi-check text-green-400 mr-2"></i><strong>前端实时显示</strong>：显示位置信息和数据库更新状态</li>
              <li><i class="bi bi-check text-green-400 mr-2"></i><strong>智能缓存机制</strong>：24小时内重复IP使用数据库缓存</li>
              <li><i class="bi bi-check text-green-400 mr-2"></i><strong>双重安全保障</strong>：前端UX检查 + 后端安全验证</li>
            </ul>
          </div>
          
          <div class="p-4 bg-gray-800/30 rounded-lg">
            <h3 class="text-lg font-semibold text-white mb-2">🔄 工作流程</h3>
            <ol class="space-y-2 text-sm list-decimal list-inside">
              <li><strong>前端登录检查</strong>：首页加载时检查用户登录状态(localStorage)</li>
              <li><strong>获取真实IP</strong>：HeaderLocation组件调用ipinfo.io获取公网IP</li>
              <li><strong>API调用</strong>：前端调用/api/amap/ip/接口（携带认证token）</li>
              <li><strong>后端验证</strong>：后端验证JWT token确认用户身份</li>
              <li><strong>位置查询</strong>：检查数据库缓存或调用高德地图API获取省市信息</li>
              <li><strong>数据库更新</strong>：如果用户已登录且验证通过，更新用户表</li>
              <li><strong>前端显示</strong>：显示位置信息和更新状态</li>
            </ol>
          </div>
          
          <div class="p-4 bg-gray-800/30 rounded-lg">
            <h3 class="text-lg font-semibold text-white mb-2">🎯 登录状态判断逻辑</h3>
            <div class="space-y-3 text-sm">
              <div class="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <div class="font-medium text-cyan-300 mb-1">📱 前端判断（用户体验）</div>
                <div class="text-cyan-200">
                  • 检查localStorage中的authToken和userInfo<br>
                  • 提供即时的登录状态反馈<br>
                  • 决定是否显示"登录信息已更新"等提示
                </div>
              </div>
              <div class="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div class="font-medium text-purple-300 mb-1">🔒 后端验证（安全保证）</div>
                <div class="text-purple-200">
                  • 验证JWT token的有效性和完整性<br>
                  • 确保只有真正登录的用户才能更新数据库<br>
                  • 防止恶意请求和数据篡改
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocation } from '../composables/useLocation'
import { useUserStore } from '../stores/user'

// 设置页面信息
definePageMeta({
  title: 'IP位置定位测试'
})

// 使用stores和composables
const userStore = useUserStore()
const {
  loading,
  data,
  error,
  fetchLocation,
  refreshLocation,
  getLocationText,
  isUserLocationUpdated,
  isUserLoggedIn
} = useLocation()

// 页面加载时初始化
onMounted(() => {
  // 初始化用户状态
  userStore.initializeAuth()
  
  // 自动获取位置信息
  fetchLocation(false)
})

// 测试登录功能
const testLogin = () => {
  // 模拟一个测试用户登录
  const testUser = {
    id: 999,
    username: 'test_user',
    nickname: '测试用户',
    email: 'test@example.com',
    role: 'user',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  const testToken = 'test_token_for_demo'
  
  // 设置用户登录状态
  userStore.setAuth(testToken, testUser)
  
  // 重新获取位置信息以测试完整流程
  setTimeout(() => {
    fetchLocation(true, true)
  }, 500)
}

// 测试登出功能
const testLogout = () => {
  userStore.logout()
  
  // 重新获取位置信息
  setTimeout(() => {
    fetchLocation(true, true)
  }, 500)
}
</script>

<style scoped>
.glass-card-dark {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(20px);
}
</style> 