<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">

    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
    </div>

    <!-- 导航栏 -->
    <AppHeader 
      :show-back-button="false"
      :show-nav-menu="false"
      :show-breadcrumb="true"
      :show-location="false"
      :show-search-button="false"
      :show-notification-button="false"
      :show-decorations="false"
      logo-size="medium"
      current-page-title="收货地址"
    />

    <div class="relative z-10 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 页面标题 -->
        <div class="mb-8 animate-fade-in-up">
          <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                  <i class="bi bi-geo-alt-fill text-cyan-400 text-3xl animate-bounce-gentle"></i>
                  收货地址管理
                </h1>
                <p class="text-gray-300 text-lg">管理您的收货地址，支持多个地址并设置默认地址</p>
              </div>
              <button 
                @click="showAddModal = true"
                class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
              >
                <i class="bi bi-plus-circle text-lg"></i>
                添加新地址
              </button>
            </div>
          </div>
        </div>

        <!-- 地址列表 -->
        <div v-if="loading" class="animate-fade-in-up animation-delay-200">
          <div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center">
            <div class="loading-spinner mx-auto mb-4"></div>
            <p class="text-gray-300">正在加载地址列表...</p>
          </div>
        </div>

        <div v-else-if="addresses.length === 0" class="animate-fade-in-up animation-delay-200">
          <div class="glass-card-dark rounded-2xl p-16 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center">
            <i class="bi bi-geo-alt text-6xl text-gray-400 mb-6"></i>
            <h3 class="text-xl font-semibold text-white mb-4">暂无收货地址</h3>
            <p class="text-gray-400 mb-8">添加您的第一个收货地址，让购物更加便捷</p>
            <button 
              @click="showAddModal = true"
              class="btn-premium-dark px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
            >
              <i class="bi bi-plus-circle mr-2"></i>
              添加收货地址
            </button>
          </div>
        </div>

        <div v-else class="space-y-6 animate-fade-in-up animation-delay-200">
          <div 
            v-for="address in addresses" 
            :key="address.id"
            class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <!-- 地址标题和默认标签 -->
                <div class="flex items-center gap-3 mb-4">
                  <h3 class="text-xl font-semibold text-white">{{ address.name }}</h3>
                  <span class="text-gray-300">{{ address.phone }}</span>
                  <span 
                    v-if="address.is_default" 
                    class="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-full"
                  >
                    <i class="bi bi-star-fill mr-1"></i>
                    默认地址
                  </span>
                </div>
                
                <!-- 详细地址 -->
                <div class="text-gray-300 leading-relaxed">
                  <p class="text-lg">{{ address.province }} {{ address.city }} {{ address.district }}</p>
                  <p class="text-gray-400 mt-1">{{ address.detail }}</p>
                  <p v-if="address.postal_code" class="text-gray-400 text-sm mt-1">邮政编码：{{ address.postal_code }}</p>
                </div>
              </div>
              
              <!-- 操作按钮 -->
              <div class="flex flex-col space-y-2 ml-6">
                <button 
                  v-if="!address.is_default"
                  @click="setDefault(address.id)"
                  :disabled="settingDefault"
                  class="btn-outline-dark px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
                >
                  <i class="bi bi-star mr-1"></i>
                  设为默认
                </button>
                <button 
                  @click="editAddress(address)"
                  class="btn-outline-dark px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1"
                >
                  <i class="bi bi-pencil mr-1"></i>
                  编辑
                </button>
                <button 
                  @click="deleteAddress(address.id)"
                  :disabled="deleting"
                  class="btn-danger px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
                >
                  <i class="bi bi-trash mr-1"></i>
                  删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加/编辑地址弹窗 -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-scale-in w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-8">
          <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i class="bi bi-geo-alt text-cyan-400"></i>
            {{ isEditing ? '编辑地址' : '添加新地址' }}
          </h3>
          
          <form @submit.prevent="isEditing ? updateAddress() : addAddress()" class="space-y-6">
            <!-- 收货人信息 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label for="name" class="block text-sm font-medium text-cyan-400">收货人姓名 *</label>
                <input 
                  id="name"
                  v-model="form.name" 
                  type="text" 
                  class="input-dark w-full"
                  placeholder="请输入收货人姓名"
                  required
                />
              </div>
              <div class="space-y-2">
                <label for="phone" class="block text-sm font-medium text-cyan-400">手机号码 *</label>
                <input 
                  id="phone"
                  v-model="form.phone" 
                  type="tel" 
                  class="input-dark w-full"
                  placeholder="请输入手机号码"
                  required
                />
              </div>
            </div>

            <!-- 地区选择 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="space-y-2">
                <label for="province" class="block text-sm font-medium text-cyan-400">省份 *</label>
                <select 
                  id="province"
                  v-model="form.province" 
                  class="input-dark w-full"
                  required
                  @change="onProvinceChange"
                >
                  <option value="">请选择省份</option>
                  <option v-for="province in provinces" :key="province.name" :value="province.name">
                    {{ province.name }}
                  </option>
                </select>
              </div>
              <div class="space-y-2">
                <label for="city" class="block text-sm font-medium text-cyan-400">城市 *</label>
                <select 
                  id="city"
                  v-model="form.city" 
                  class="input-dark w-full"
                  required
                  @change="onCityChange"
                >
                  <option value="">请选择城市</option>
                  <option v-for="city in cities" :key="city.name" :value="city.name">
                    {{ city.name }}
                  </option>
                </select>
              </div>
              <div class="space-y-2">
                <label for="district" class="block text-sm font-medium text-cyan-400">区县 *</label>
                <select 
                  id="district"
                  v-model="form.district" 
                  class="input-dark w-full"
                  required
                >
                  <option value="">请选择区县</option>
                  <option v-for="district in districts" :key="district.name" :value="district.name">
                    {{ district.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- 详细地址 -->
            <div class="space-y-2">
              <label for="detail" class="block text-sm font-medium text-cyan-400">详细地址 *</label>
              <textarea 
                id="detail"
                v-model="form.detail" 
                class="input-dark w-full h-24 resize-none"
                placeholder="请输入详细地址，如街道、门牌号、楼层等"
                required
              ></textarea>
            </div>

            <!-- 邮政编码 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label for="postal_code" class="block text-sm font-medium text-cyan-400">邮政编码</label>
                <input 
                  id="postal_code"
                  v-model="form.postal_code" 
                  type="text" 
                  class="input-dark w-full"
                  placeholder="请输入邮政编码（可选）"
                />
              </div>
              <div class="space-y-2 flex items-end">
                <label class="flex items-center space-x-2">
                  <input 
                    v-model="form.is_default" 
                    type="checkbox" 
                    class="w-4 h-4 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500"
                  />
                  <span class="text-sm text-gray-300">设为默认地址</span>
                </label>
              </div>
            </div>
            
            <div class="flex justify-end space-x-4 pt-6">
              <button 
                type="button" 
                @click="closeModal" 
                class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
              >
                <i class="bi bi-x-circle mr-2"></i>
                取消
              </button>
              <button 
                type="submit" 
                :disabled="submitting"
                class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="submitting" class="loading loading-spinner loading-sm mr-2"></span>
                <i v-else class="bi bi-check-circle mr-2"></i>
                {{ submitting ? '保存中...' : (isEditing ? '保存修改' : '添加地址') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { addressApi } from '../utils/api/addresses'
import type { Address, AddressCreateInput, AddressUpdateInput } from '../types/api'
import { createDiscreteApi } from 'naive-ui'
import { 
  getProvinces, 
  getCitiesByProvinceName, 
  getAreasByCityName,
  validateRegion,
  type Province,
  type City,
  type Area
} from '../utils/regions'
import AppHeader from '../components/AppHeader.vue'

// 创建消息API
const { message } = createDiscreteApi(['message'])

// 消息函数
const success = (content) => {
  message.success(content, { duration: 3000 })
}

const error = (content) => {
  message.error(content, { duration: 4000 })
}

// 页面状态
const loading = ref(true)
const submitting = ref(false)
const settingDefault = ref(false)
const deleting = ref(false)
const addresses = ref<Address[]>([])

// 弹窗状态
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingAddress = ref<Address | null>(null)

// 表单数据
const form = reactive<AddressCreateInput>({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  postal_code: '',
  is_default: false
})

// 地区数据
const provinces = ref<Province[]>([])
const cities = ref<City[]>([])
const districts = ref<Area[]>([])

// 计算属性
const isEditing = computed(() => editingAddress.value !== null)

// 初始化省份数据
const initProvinces = () => {
  try {
    provinces.value = getProvinces()
  } catch (error) {
    console.error('获取省份数据失败:', error)
    error('获取省份数据失败')
  }
}

// 获取地址列表
const fetchAddresses = async () => {
  try {
    loading.value = true
    const response = await addressApi.getAddresses()
    addresses.value = response.data || []
  } catch (error) {
    console.error('获取地址列表失败:', error)
    error('获取地址列表失败，请刷新重试')
  } finally {
    loading.value = false
  }
}

// 添加地址
const addAddress = async () => {
  try {
    // 验证省市区组合
    if (!validateRegion(form.province, form.city, form.district)) {
      error('请选择正确的省市区组合')
      return
    }
    
    submitting.value = true
    const response = await addressApi.createAddress(form)
    if (response.success && response.data) {
      addresses.value.push(response.data)
      closeModal()
      success('地址添加成功')
    }
  } catch (error: any) {
    console.error('添加地址失败:', error)
    error(error.message || '添加地址失败，请重试')
  } finally {
    submitting.value = false
  }
}

// 编辑地址
const editAddress = (address: Address) => {
  editingAddress.value = address
  form.name = address.name
  form.phone = address.phone
  form.province = address.province
  form.city = address.city
  form.district = address.district
  form.detail = address.detail
  form.postal_code = address.postal_code || ''
  form.is_default = address.is_default
  
  // 触发级联选择
  onProvinceChange()
  onCityChange()
  
  showEditModal.value = true
}

// 更新地址
const updateAddress = async () => {
  if (!editingAddress.value) return
  
  try {
    // 验证省市区组合
    if (!validateRegion(form.province, form.city, form.district)) {
      error('请选择正确的省市区组合')
      return
    }
    
    submitting.value = true
    const response = await addressApi.updateAddress(editingAddress.value.id, form)
    if (response.success && response.data) {
      const index = addresses.value.findIndex(addr => addr.id === editingAddress.value!.id)
      if (index !== -1) {
        addresses.value[index] = response.data
      }
      closeModal()
      success('地址更新成功')
    }
  } catch (error: any) {
    console.error('更新地址失败:', error)
    error(error.message || '更新地址失败，请重试')
  } finally {
    submitting.value = false
  }
}

// 设置默认地址
const setDefault = async (id: number) => {
  try {
    settingDefault.value = true
    const response = await addressApi.setDefaultAddress(id)
    if (response.success) {
      // 更新本地状态
      addresses.value.forEach(addr => {
        addr.is_default = addr.id === id
      })
      success('默认地址设置成功')
    }
  } catch (error: any) {
    console.error('设置默认地址失败:', error)
    error(error.message || '设置默认地址失败，请重试')
  } finally {
    settingDefault.value = false
  }
}

// 删除地址
const deleteAddress = async (id: number) => {
  if (!confirm('确定要删除这个地址吗？')) return
  
  try {
    deleting.value = true
    const response = await addressApi.deleteAddress(id)
    if (response.success) {
      addresses.value = addresses.value.filter(addr => addr.id !== id)
      success('地址删除成功')
    }
  } catch (error: any) {
    console.error('删除地址失败:', error)
    error(error.message || '删除地址失败，请重试')
  } finally {
    deleting.value = false
  }
}

// 关闭弹窗
const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingAddress.value = null
  
  // 重置表单
  form.name = ''
  form.phone = ''
  form.province = ''
  form.city = ''
  form.district = ''
  form.detail = ''
  form.postal_code = ''
  form.is_default = false
  
  // 重置地区数据
  cities.value = []
  districts.value = []
}

// 省份变化时获取城市
const onProvinceChange = () => {
  form.city = ''
  form.district = ''
  cities.value = []
  districts.value = []
  
  if (form.province) {
    try {
      cities.value = getCitiesByProvinceName(form.province)
    } catch (error) {
      console.error('获取城市数据失败:', error)
      error('获取城市数据失败')
    }
  }
}

// 城市变化时获取区县
const onCityChange = () => {
  form.district = ''
  districts.value = []
  
  if (form.province && form.city) {
    try {
      districts.value = getAreasByCityName(form.province, form.city)
    } catch (error) {
      console.error('获取区县数据失败:', error)
      error('获取区县数据失败')
    }
  }
}

// 页面挂载时获取数据
onMounted(() => {
  fetchAddresses()
  initProvinces()
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

.btn-danger {
  border: 2px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.1);
}

.btn-danger:hover {
  border-color: rgba(239, 68, 68, 0.5);
  color: #f87171;
  background: rgba(239, 68, 68, 0.2);
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

.input-dark option {
  background: #1f2937;
  color: white;
}

/* 加载动画 */
.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(0, 245, 255, 0.3);
  border-top: 3px solid #00f5ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading {
  display: inline-block;
  animation: spin 1s linear infinite;
}

.loading-spinner.loading-sm {
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
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

/* 复选框样式 */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
}

input[type="checkbox"]:checked {
  background-color: #00f5ff;
  border-color: #00f5ff;
}

input[type="checkbox"]:checked::before {
  content: "✓";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}
</style> 