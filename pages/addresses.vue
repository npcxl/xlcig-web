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
              <span class="text-white font-medium">收货地址</span>
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
                  <option v-for="province in provinces" :key="province" :value="province">
                    {{ province }}
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
                  <option v-for="city in cities" :key="city" :value="city">
                    {{ city }}
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
                  <option v-for="district in districts" :key="district" :value="district">
                    {{ district }}
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

// 地区数据（示例数据，实际应该从API获取）
const provinces = ref([
  '北京市', '上海市', '天津市', '重庆市',
  '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省',
  '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省',
  '河南省', '湖北省', '湖南省', '广东省', '海南省',
  '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省',
  '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区'
])

const cities = ref<string[]>([])
const districts = ref<string[]>([])

// 计算属性
const isEditing = computed(() => editingAddress.value !== null)

// 返回功能
const goBack = () => {
  window.history.back()
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
  resetForm()
}

// 重置表单
const resetForm = () => {
  form.name = ''
  form.phone = ''
  form.province = ''
  form.city = ''
  form.district = ''
  form.detail = ''
  form.postal_code = ''
  form.is_default = false
  cities.value = []
  districts.value = []
}

// 省份变化处理
const onProvinceChange = () => {
  form.city = ''
  form.district = ''
  districts.value = []
  
  // 根据省份设置城市（示例数据）
  const cityMap: Record<string, string[]> = {
    '北京市': ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'],
    '上海市': ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'],
    '广东省': ['广州市', '深圳市', '珠海市', '汕头市', '佛山市', '韶关市', '湛江市', '肇庆市', '江门市', '茂名市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'],
    '江苏省': ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'],
    '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市']
  }
  
  cities.value = cityMap[form.province] || []
}

// 城市变化处理
const onCityChange = () => {
  form.district = ''
  
  // 根据城市设置区县（示例数据）
  const districtMap: Record<string, string[]> = {
    '广州市': ['荔湾区', '越秀区', '海珠区', '天河区', '白云区', '黄埔区', '番禺区', '花都区', '南沙区', '从化区', '增城区'],
    '深圳市': ['罗湖区', '福田区', '南山区', '宝安区', '龙岗区', '盐田区', '龙华区', '坪山区', '光明区', '大鹏新区'],
    '南京市': ['玄武区', '秦淮区', '建邺区', '鼓楼区', '浦口区', '栖霞区', '雨花台区', '江宁区', '六合区', '溧水区', '高淳区'],
    '杭州市': ['上城区', '下城区', '江干区', '拱墅区', '西湖区', '滨江区', '萧山区', '余杭区', '富阳区', '临安区', '桐庐县', '淳安县', '建德市']
  }
  
  districts.value = districtMap[form.city] || []
}

// 页面挂载时获取地址列表
onMounted(() => {
  fetchAddresses()
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