<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
    <!-- 背景装饰效果 -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
    </div>

    <!-- 导航栏 -->
    <AppHeader 
      :show-back-button="true"
      :show-nav-menu="true"
      :show-breadcrumb="true"
      :show-location="false"
      :show-search-button="false"
      :show-notification-button="true"
      :show-decorations="false"
      logo-size="medium"
      current-page-title="我的评论"
    />

    <!-- 主要内容 -->
    <div class="container mx-auto px-6 py-8 relative z-10">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
          我的评论
        </h1>
        <p class="text-gray-300 text-lg">管理您发表的所有产品评论</p>
      </div>

      <!-- 统计卡片 -->
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-6 text-center">
          <div class="text-3xl font-bold text-cyan-400 mb-2">{{ totalReviews }}</div>
          <div class="text-gray-300">总评论数</div>
        </div>
        <div class="glass-card-dark rounded-2xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/20 p-6 text-center">
          <div class="text-3xl font-bold text-yellow-400 mb-2">{{ averageRating.toFixed(1) }}</div>
          <div class="text-gray-300">平均评分</div>
        </div>
        <div class="glass-card-dark rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/20 p-6 text-center">
          <div class="text-3xl font-bold text-green-400 mb-2">{{ verifiedReviews }}</div>
          <div class="text-gray-300">已验证评论</div>
        </div>
      </div>

      <!-- 评论列表 -->
      <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <div class="px-8 py-6 border-b border-gray-700/50">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <i class="bi bi-chat-dots text-cyan-400"></i>
            评论列表
          </h2>
        </div>

        <div class="p-8">
          <!-- 加载中状态 -->
          <div v-if="isLoading" class="text-center py-12">
            <div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-gray-300">正在加载评论...</p>
          </div>

          <!-- 无评论状态 -->
          <div v-else-if="reviews.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4 text-gray-500">
              <i class="bi bi-chat-x"></i>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">暂无评论</h3>
            <p class="text-gray-400 mb-6">您还没有发表过任何评论</p>
            <NuxtLink to="/products" 
                      class="inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all duration-300">
              <i class="bi bi-plus-circle mr-2"></i>
              去购物并评论
            </NuxtLink>
          </div>

          <!-- 评论列表 -->
          <div v-else class="space-y-6">
            <div v-for="review in reviews" :key="review.id" 
                 class="p-6 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300">
              
              <!-- 产品信息 -->
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 bg-gray-700/50 rounded-lg overflow-hidden">
                  <img v-if="review.product_images && review.product_images.length > 0" 
                       :src="review.product_images[0]" 
                       :alt="review.product_name" 
                       class="w-full h-full object-contain p-1">
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-500">
                    <i class="bi bi-image text-2xl"></i>
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-white text-lg mb-1">{{ review.product_name }}</h3>
                  <div class="flex items-center gap-4 text-sm text-gray-400">
                    <span>发表于: {{ formatDate(review.created_at) }}</span>
                    <span v-if="review.verified_purchase" 
                          class="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-400/30">
                      已验证购买
                    </span>
                    <span class="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-400/30">
                      {{ getStatusText(review.status) }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button @click="editReview(review)" 
                          v-if="canEdit(review)"
                          class="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button @click="deleteReview(review.id)" 
                          class="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>

              <!-- 评分和评论内容 -->
              <div class="mb-4">
                <div class="flex items-center gap-3 mb-3">
                  <div class="flex gap-1">
                    <i v-for="i in 5" :key="i" 
                       :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-600'"
                       class="bi bi-star-fill text-lg"></i>
                  </div>
                  <span class="text-gray-300 text-sm">{{ getRatingText(review.rating) }}</span>
                </div>
                <p class="text-gray-300 leading-relaxed">{{ review.comment }}</p>
              </div>

              <!-- 评论图片 -->
              <div v-if="review.images && review.images.length > 0" class="grid grid-cols-4 gap-2 mb-4">
                <img v-for="(image, index) in review.images" :key="index"
                     :src="image" :alt="`评论图片${index + 1}`"
                     class="w-full h-20 object-cover rounded-lg border border-gray-600/30">
              </div>

              <!-- 统计信息 -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-700/50 text-sm text-gray-400">
                <span>获得 {{ review.helpful_count }} 个赞</span>
                <NuxtLink :to="`/products/${review.product_id}`" 
                          class="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                  查看产品详情 →
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div v-if="pagination && pagination.total_pages > 1" class="mt-8 flex justify-center">
            <div class="flex items-center gap-2">
              <button v-for="page in paginationPages" :key="page"
                      @click="loadReviews(page)"
                      :class="[
                        'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                        page === pagination.current_page
                          ? 'bg-cyan-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      ]">
                {{ page }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑评论弹窗 -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-white flex items-center gap-3">
              <i class="bi bi-pencil text-cyan-400"></i>
              编辑评论
            </h3>
            <button @click="closeEditModal" class="text-gray-400 hover:text-white">
              <i class="bi bi-x-lg text-2xl"></i>
            </button>
          </div>
          
          <form @submit.prevent="updateReview" class="space-y-6">
            <!-- 评分选择 -->
            <div>
              <label class="block text-sm font-bold text-white mb-4">评分</label>
              <div class="flex items-center gap-2">
                <button v-for="i in 5" :key="i" 
                        type="button"
                        @click="editData.rating = i"
                        :class="[
                          'text-3xl transition-all duration-200 hover:scale-110',
                          i <= editData.rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'
                        ]">
                  <i class="bi bi-star-fill"></i>
                </button>
                <span v-if="editData.rating > 0" class="ml-4 text-white font-medium">
                  {{ getRatingText(editData.rating) }}
                </span>
              </div>
            </div>

            <!-- 评论内容 -->
            <div>
              <label class="block text-sm font-bold text-white mb-4">评论内容</label>
              <textarea v-model="editData.comment" 
                        required
                        rows="5" 
                        placeholder="请分享您对这款产品的使用体验..."
                        class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none"></textarea>
            </div>
            
            <div class="flex justify-end space-x-4 pt-6">
              <button type="button" @click="closeEditModal" 
                      class="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg font-medium transition-colors duration-300">
                取消
              </button>
              <button type="submit" :disabled="isUpdating"
                      class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300 flex items-center gap-2">
                <div v-if="isUpdating" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <i v-else class="bi bi-check-circle"></i>
                {{ isUpdating ? '更新中...' : '更新评论' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { createDiscreteApi } from 'naive-ui'
import { useUserStore } from '~/stores/user'
import { reviewsApi } from '~/utils/api/reviews'

// 中间件：需要登录
definePageMeta({
  middleware: 'auth'
})

// 使用stores
const userStore = useUserStore()

// 创建消息API
const { message } = createDiscreteApi(['message'])

// 响应式数据
const reviews = ref([])
const pagination = ref(null)
const isLoading = ref(false)
const currentPage = ref(1)

// 编辑相关
const showEditModal = ref(false)
const editData = ref({
  id: null,
  rating: 0,
  comment: ''
})
const isUpdating = ref(false)

// 计算属性
const totalReviews = computed(() => {
  return reviews.value.length
})

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return sum / reviews.value.length
})

const verifiedReviews = computed(() => {
  return reviews.value.filter(review => review.verified_purchase).length
})

const paginationPages = computed(() => {
  if (!pagination.value) return []
  const pages = []
  for (let i = 1; i <= pagination.value.total_pages; i++) {
    pages.push(i)
  }
  return pages
})

// 方法
const loadReviews = async (page = 1) => {
  try {
    isLoading.value = true
    currentPage.value = page
    
    const response = await reviewsApi.getMyReviews({
      page,
      limit: 10
    })
    
    if (response.success) {
      reviews.value = response.data.reviews
      pagination.value = response.data.pagination
    } else {
      message.error('加载评论失败')
    }
  } catch (err) {
    console.error('加载评论失败:', err)
    message.error('加载评论失败，请重试')
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getRatingText = (rating) => {
  const texts = {
    1: '非常不满意',
    2: '不满意',
    3: '一般',
    4: '满意',
    5: '非常满意'
  }
  return texts[rating] || ''
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': '审核中',
    'approved': '已发布',
    'rejected': '已拒绝'
  }
  return statusMap[status] || status
}

const canEdit = (review) => {
  // 检查是否在可编辑时间内（24小时）
  const createdAt = new Date(review.created_at)
  const now = new Date()
  const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
  return hoursDiff <= 24 && review.status === 'approved'
}

const editReview = (review) => {
  editData.value = {
    id: review.id,
    rating: review.rating,
    comment: review.comment
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editData.value = {
    id: null,
    rating: 0,
    comment: ''
  }
}

const updateReview = async () => {
  if (!editData.value.rating || !editData.value.comment.trim()) return
  
  try {
    isUpdating.value = true
    
    const response = await reviewsApi.updateReview(editData.value.id, {
      rating: editData.value.rating,
      comment: editData.value.comment.trim()
    })
    
    if (response.success) {
      message.success('评论更新成功')
      closeEditModal()
      loadReviews(currentPage.value)
    } else {
      message.error(response.message || '更新失败')
    }
  } catch (err) {
    console.error('更新评论失败:', err)
    message.error('更新失败，请重试')
  } finally {
    isUpdating.value = false
  }
}

const deleteReview = async (reviewId) => {
  if (!confirm('确定要删除这条评论吗？此操作无法撤销。')) return
  
  try {
    const response = await reviewsApi.deleteReview(reviewId)
    
    if (response.success) {
      message.success('评论已删除')
      loadReviews(currentPage.value)
    } else {
      message.error(response.message || '删除失败')
    }
  } catch (err) {
    console.error('删除评论失败:', err)
    message.error('删除失败，请重试')
  }
}

// 页面加载时获取数据
onMounted(() => {
  if (userStore.isLoggedIn) {
    loadReviews()
  }
})

// 页面元数据
useHead({
  title: '我的评论 - xlCig',
  meta: [
    { name: 'description', content: '管理您发表的所有产品评论，编辑和删除评论' }
  ]
})
</script>

<style scoped>
.glass-card-dark {
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: all 0.4s ease;
}

.glass-card-dark:hover {
  background: rgba(17, 24, 39, 0.8);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.5),
    0 0 25px rgba(59, 130, 246, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
</style> 