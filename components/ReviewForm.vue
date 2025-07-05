<template>
  <div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl">
    <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
      <div class="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg">
        <i class="bi bi-chat-square-text text-white"></i>
      </div>
      <span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">发表评论</span>
    </h3>

    <!-- 未登录提示 -->
    <div v-if="!userStore.isLoggedIn" class="text-center py-8">
      <div class="text-4xl text-gray-400 mb-4">
        <i class="bi bi-person-plus"></i>
      </div>
      <h4 class="text-xl font-semibold text-white mb-2">请先登录</h4>
      <p class="text-gray-400 mb-6">登录后即可发表对此产品的评价</p>
      <NuxtLink to="/auth/login" 
                class="inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all duration-300">
        <i class="bi bi-box-arrow-in-right mr-2"></i>
        立即登录
      </NuxtLink>
    </div>

    <!-- 检查评论状态中 -->
    <div v-else-if="isCheckingReview" class="text-center py-8">
      <div class="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-300">正在检查评论状态...</p>
    </div>

    <!-- 已经评论过的提示 -->
    <div v-else-if="hasReviewed && existingReview" class="text-center py-8">
      <div class="text-4xl text-green-400 mb-4">
        <i class="bi bi-check-circle-fill"></i>
      </div>
      <h4 class="text-xl font-semibold text-white mb-2">您已评论过此产品</h4>
      <p class="text-gray-400 mb-6">每个产品只能发布一次评论</p>
      
      <!-- 显示已有评论 -->
      <div class="bg-gray-800/30 rounded-xl p-6 border border-gray-600/30 backdrop-blur-sm">
        <div class="flex items-center justify-center gap-2 mb-3">
          <div class="flex">
            <i v-for="i in 5" :key="i" 
               :class="i <= existingReview.rating ? 'text-yellow-400' : 'text-gray-600'"
               class="bi bi-star-fill text-lg"></i>
          </div>
          <span class="text-white font-medium ml-2">{{ existingReview.rating }} 分</span>
        </div>
        <p class="text-gray-300 text-center">{{ existingReview.comment }}</p>
        <p class="text-gray-500 text-sm text-center mt-3">
          发布于 {{ new Date(existingReview.created_at).toLocaleDateString('zh-CN') }}
        </p>
      </div>
    </div>

    <!-- 评论表单 -->
    <form v-else @submit.prevent="submitReview" class="space-y-6">
      <!-- 评分选择 -->
      <div>
        <label class="block text-sm font-bold text-white mb-4 flex items-center gap-2">
          <i class="bi bi-star text-yellow-400"></i>
          评分
        </label>
        <div class="flex items-center gap-2">
          <button v-for="i in 5" :key="i" 
                  type="button"
                  @click="reviewData.rating = i"
                  :class="[
                    'text-3xl transition-all duration-200 hover:scale-110',
                    i <= reviewData.rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'
                  ]">
            <i class="bi bi-star-fill drop-shadow-lg"></i>
          </button>
          <span v-if="reviewData.rating > 0" class="ml-4 text-white font-medium">
            {{ getRatingText(reviewData.rating) }}
          </span>
        </div>
      </div>

      <!-- 评论内容 -->
      <div>
        <label class="block text-sm font-bold text-white mb-4 flex items-center gap-2">
          <i class="bi bi-chat-dots text-cyan-400"></i>
          评论内容
        </label>
        <textarea v-model="reviewData.comment" 
                  required
                  rows="5" 
                  placeholder="请分享您对这款产品的使用体验..."
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none"></textarea>
      </div>

      <!-- 匿名选项 -->
      <div>
        <label class="flex items-center space-x-3">
          <input v-model="isAnonymous" 
                 type="checkbox" 
                 class="w-4 h-4 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500">
          <span class="text-gray-300">匿名发表（不显示用户名）</span>
        </label>
      </div>

      <!-- 提交按钮 -->
      <div class="flex justify-end gap-4 pt-6">
        <button type="button" 
                @click="resetForm" 
                class="px-6 py-3 border border-gray-600/50 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg font-medium transition-colors duration-300">
          重置
        </button>
        <button type="submit" 
                :disabled="!canSubmit || isSubmitting"
                :title="!canSubmit ? buttonDisabledReason : ''"
                class="review-submit-btn px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed min-w-[160px]">
          <!-- 图标区域 -->
          <div class="flex items-center justify-center w-4 h-4">
            <transition name="icon-fade" mode="out-in">
              <div v-if="isSubmitting || isCheckingReview" 
                   key="loading"
                   class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <i v-else 
                 key="send"
                 class="bi bi-send"></i>
            </transition>
          </div>
          
          <!-- 文字区域 -->
          <transition name="text-fade" mode="out-in">
            <span :key="buttonDisabledReason" class="button-text">
              {{ buttonDisabledReason }}
            </span>
          </transition>
        </button>
      </div>

      <!-- 禁用原因提示 -->
      <div v-if="!canSubmit && userStore.isLoggedIn" class="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <div class="flex items-center gap-2 text-yellow-400 text-sm">
          <i class="bi bi-info-circle"></i>
          <span>{{ buttonDisabledReason }}</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { createDiscreteApi } from 'naive-ui'
import { useUserStore } from '~/stores/user'
import { reviewsApi } from '~/utils/api/reviews'

// Props
const props = defineProps({
  productId: {
    type: Number,
    required: true
  }
})

// Emits
const emit = defineEmits(['review-submitted'])

// 使用stores
const userStore = useUserStore()

// 创建消息API
const { message } = createDiscreteApi(['message'])

// 响应式数据
const reviewData = ref({
  rating: 0,
  comment: ''
})

const isAnonymous = ref(false)
const isSubmitting = ref(false)
const isCheckingReview = ref(false)
const hasReviewed = ref(false)
const existingReview = ref(null)

// 计算属性
const canSubmit = computed(() => {
  return reviewData.value.rating > 0 && 
         reviewData.value.comment.trim().length >= 10 &&
         userStore.isLoggedIn &&
         !hasReviewed.value &&
         !isCheckingReview.value
})

const buttonDisabledReason = computed(() => {
  if (!userStore.isLoggedIn) return '请先登录'
  if (hasReviewed.value) return '您已评论过此产品'
  if (isCheckingReview.value) return '检查中...'
  if (reviewData.value.rating === 0) return '请选择评分'
  if (reviewData.value.comment.trim().length < 10) return '评论内容至少10个字符'
  if (isSubmitting.value) return '发布中...'
  return '发布评论'
})

// 方法
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

const resetForm = () => {
  reviewData.value = {
    rating: 0,
    comment: ''
  }
  isAnonymous.value = false
}

// 检查用户是否已经评论过该产品
const checkUserReview = async () => {
  if (!userStore.isLoggedIn || !props.productId) return

  try {
    isCheckingReview.value = true
    const response = await reviewsApi.checkUserReview(props.productId)
    
    if (response.success) {
      hasReviewed.value = response.data.has_reviewed
      if (response.data.review) {
        existingReview.value = response.data.review
      }
    }
  } catch (err) {
    console.error('检查评论状态失败:', err)
    // 检查失败时默认允许发布，避免阻止用户正常使用
    hasReviewed.value = false
  } finally {
    isCheckingReview.value = false
  }
}

const submitReview = async () => {
  if (!canSubmit.value || isSubmitting.value) return

  try {
    isSubmitting.value = true

    const reviewPayload = {
      product_id: props.productId,
      rating: reviewData.value.rating,
      comment: reviewData.value.comment.trim(),
      author: isAnonymous.value ? '匿名用户' : userStore.user?.username || userStore.user?.email?.split('@')[0],
      is_anonymous: isAnonymous.value
    }

    const response = await reviewsApi.createReview(reviewPayload)

    if (response.success) {
      
      // 标记为已评论
      hasReviewed.value = true
      
      // 重置表单
      resetForm()
      
      // 通知父组件刷新评论列表
      emit('review-submitted')
      
      // 显示验证购买状态
      if (response.data.verified_purchase) {
        setTimeout(() => {
          message.info('您的购买已验证，评论将获得更高的可信度')
        }, 1000)
      }

      // 显示作者信息
      if (response.data.author_name) {
        console.log('评论作者:', response.data.author_name)
      }
    } else {
      throw new Error(response.message || '发布评论失败')
    }
  } catch (err) {
    console.error('发布评论失败:', err)
    message.error('发布失败：' + (err.message || '请重试'))
  } finally {
    isSubmitting.value = false
  }
}

// 组件挂载时检查评论状态
onMounted(() => {
  checkUserReview()
})

// 监听用户登录状态变化
watch(() => userStore.isLoggedIn, (newValue) => {
  if (newValue) {
    // 用户登录后重新检查评论状态
    checkUserReview()
  } else {
    // 用户退出登录后重置状态
    hasReviewed.value = false
    existingReview.value = null
  }
})

// 监听产品ID变化
watch(() => props.productId, () => {
  // 产品ID变化时重新检查评论状态
  if (userStore.isLoggedIn) {
    checkUserReview()
  }
})
</script>

<style scoped>
/* 玻璃卡片增强效果 */
.glass-card-enhanced {
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: all 0.4s ease;
}

.glass-card-enhanced:hover {
  background: rgba(17, 24, 39, 0.8);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.5),
    0 0 25px rgba(59, 130, 246, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}

/* 按钮动画优化 */
.review-submit-btn {
  position: relative;
  overflow: hidden;
}

.review-submit-btn .button-text {
  display: inline-block;
  min-height: 1.25rem;
  line-height: 1.25rem;
}

/* 图标淡入淡出动画 */
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.3s ease;
}

.icon-fade-enter-from {
  opacity: 0;
  transform: scale(0.8) rotate(45deg);
}

.icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(-45deg);
}

.icon-fade-enter-to,
.icon-fade-leave-from {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

/* 文字淡入淡出动画 */
.text-fade-enter-active,
.text-fade-leave-active {
  transition: all 0.25s ease;
}

.text-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.text-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.text-fade-enter-to,
.text-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* 按钮加载状态优化 */
.review-submit-btn:disabled {
  position: relative;
}

.review-submit-btn:disabled::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: translateX(-100%);
  animation: loading-shimmer 1.5s infinite;
}

@keyframes loading-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style> 