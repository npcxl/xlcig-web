<template>
  <NuxtLink to="/" :class="linkClass">
    <div class="flex items-center gap-3">
      <!-- Logo图片 -->
      <img 
        src="../assets/images/logo.png" 
        :alt="altText"
        :width="logoWidth"
        :height="logoHeight"
        :class="logoClass"
        loading="lazy"
      />
      
   
    
    </div>
  </NuxtLink>
</template>

<script setup>
// Props 定义
const props = defineProps({
  size: {
    type: String,
    default: 'medium', // small, medium, large
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  showText: {
    type: Boolean,
    default: true
  },
  showSubtitle: {
    type: Boolean,
    default: true
  },
  linkClass: {
    type: String,
    default: 'flex items-center hover:scale-105 transition-transform duration-300'
  },
  altText: {
    type: String,
    default: 'xlCig Logo'
  }
})

// 计算属性 - 根据尺寸计算各种参数
const sizeConfig = computed(() => {
  const configs = {
    small: {
      logoWidth: 32,
      logoHeight: 32,
      showText: false,
      showSubtitle: false,
      textSize: 'text-sm',
      subtitleSize: 'text-xs'
    },
    medium: {
      logoWidth: 40,
      logoHeight: 40,
      showText: true,
      showSubtitle: false,
      textSize: 'text-lg',
      subtitleSize: 'text-xs'
    },
    large: {
      logoWidth: 48,
      logoHeight: 48,
      showText: true,
      showSubtitle: true,
      textSize: 'text-xl',
      subtitleSize: 'text-sm'
    }
  }
  return configs[props.size]
})

// 计算属性
const logoWidth = computed(() => sizeConfig.value.logoWidth)
const logoHeight = computed(() => sizeConfig.value.logoHeight)
const showText = computed(() => props.showText && sizeConfig.value.showText)
const showSubtitle = computed(() => props.showSubtitle && sizeConfig.value.showSubtitle)

// Logo样式类
const logoClass = computed(() => {
  const baseClass = 'object-contain transition-transform duration-300'
  const hoverClass = 'hover:scale-110'
  return `${baseClass} ${hoverClass}`
})
</script>

<style scoped>
/* 品牌文字样式 */
.text-content {
  @apply flex flex-col;
}

.brand-text {
  @apply font-bold;
}

.brand-name {
  @apply bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent;
  font-family: 'Segoe UI', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
}

.brand-subtitle {
  @apply text-gray-400 text-xs font-medium tracking-wider mt-1;
  font-family: 'Segoe UI', Arial, sans-serif;
}

/* 确保链接样式正确 */
a {
  @apply inline-flex items-center no-underline;
}

/* 响应式调整 */
@media (max-width: 768px) {
  img {
    @apply max-w-full h-auto;
  }
}
</style> 