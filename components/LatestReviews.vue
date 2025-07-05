<template>
  <div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
    <div class="px-8 py-6 border-b border-gray-700/50">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <div class="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg">
          <i class="bi bi-chat-quote text-white"></i>
        </div>
        <span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
          最新评价
        </span>
      </h2>
    </div>

    <div class="p-8">
      <!-- 加载中状态 -->
      <div v-if="isLoading" class="text-center py-8">
        <div class="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-300">正在加载评论...</p>
      </div>

      <!-- 无评论状态 -->
      <div v-else-if="reviews.length === 0" class="text-center py-8">
        <div class="text-4xl text-gray-400 mb-4">
          <i class="bi bi-chat-dots"></i>
        </div>
        <p class="text-gray-400">暂无评论</p>
      </div>

      <!-- 评论列表 -->
      <div v-else class="space-y-6">
        <div v-for="review in reviews" :key="review.id" 
             class="p-6 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
          
          <!-- 产品信息 -->
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-gray-700/50 rounded-lg overflow-hidden">
              <img v-if="review.product_images && review.product_images.length > 0" 
                   :src="review.product_images[0]" 
                   :alt="review.product_name" 
                   class="w-full h-full object-contain p-1">
              <div v-else class="w-full h-full flex items-center justify-center text-gray-500">
                <i class="bi bi-image text-lg"></i>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-white text-sm mb-1">{{ review.product_name }}</h3>
              <div class="flex items-center gap-2 text-xs text-gray-400">
                <span>{{ review.author }}</span>
                <span v-if="review.verified_purchase" 
                      class="px-1.5 py-0.5 bg-green-500/20 text-green-300 text-xs rounded border border-green-400/30">
                  已验证
                </span>
              </div>
            </div>
            <div class="text-xs text-gray-400">
              {{ formatDate(review.created_at) }}
            </div>
          </div>

          <!-- 评分 -->
          <div class="flex items-center gap-2 mb-3">
            <div class="flex gap-1">
              <i v-for="i in 5" :key="i" 
                 :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-600'"
                 class="bi bi-star-fill text-sm"></i>
            </div>
            <span class="text-gray-300 text-xs">{{ getRatingText(review.rating) }}</span>
          </div>

          <!-- 评论内容 -->
          <p class="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {{ review.comment }}
          </p>

          <!-- 评论图片 -->
          <div v-if="review.images && review.images.length > 0" class="grid grid-cols-3 gap-2 mb-4">
            <img v-for="(image, index) in review.images.slice(0, 3)" :key="index"
                 :src="image" :alt="`评论图片${index + 1}`"
                 class="w-full h-16 object-cover rounded-lg border border-gray-600/30">
          </div>

          <!-- 底部信息 -->
          <div class="flex items-center justify-between pt-3 border-t border-gray-700/50 text-xs text-gray-400">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <i class="bi bi-hand-thumbs-up"></i>
                {{ review.helpful_count }}
              </span>
            </div>
            <NuxtLink :to="`/products/${review.product_id}`" 
                      class="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1">
              查看产品
              <i class="bi bi-arrow-right"></i>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- 查看更多按钮 -->
      <div v-if="reviews.length > 0" class="text-center mt-8">
        <NuxtLink to="/my-reviews" 
                  class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
          <i class="bi bi-arrow-right mr-2"></i>
          查看所有评论
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { reviewsApi } from '~/utils/api/reviews'

// Props
const props = defineProps({
  limit: {
    type: Number,
    default: 6
  }
})

// 响应式数据
const reviews = ref([])
const isLoading = ref(false)

// 方法
const loadLatestReviews = async () => {
  try {
    isLoading.value = true
    
    const response = await reviewsApi.getLatestReviews(props.limit)
    
    if (response.success) {
      reviews.value = response.data
    }
  } catch (err) {
    console.error('加载最新评论失败:', err)
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffTime / (1000 * 60))

  if (diffDays > 0) {
    return `${diffDays}天前`
  } else if (diffHours > 0) {
    return `${diffHours}小时前`
  } else if (diffMinutes > 0) {
    return `${diffMinutes}分钟前`
  } else {
    return '刚刚'
  }
}

const getRatingText = (rating) => {
  const texts = {
    1: '差评',
    2: '不满意',
    3: '一般',
    4: '满意',
    5: '好评'
  }
  return texts[rating] || ''
}

// 页面加载时获取数据
onMounted(() => {
  loadLatestReviews()
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

/* 文本行数限制 */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 