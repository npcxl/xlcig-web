<template>
  <div class="steam-carousel-container">
    <!-- 粒子背景系统 -->
    <div class="particle-system">
      <div v-for="i in 50" :key="i" class="particle" :style="{ 
        '--delay': `${Math.random() * 5}s`,
        '--duration': `${3 + Math.random() * 4}s`,
        '--x': `${Math.random() * 100}%`,
        '--y': `${Math.random() * 100}%`,
        '--size': `${2 + Math.random() * 3}px`
      }"></div>
    </div>

    <!-- 增强背景装饰 -->
    <div class="carousel-background">
      <div class="bg-pattern"></div>
      <div class="bg-glow-1"></div>
      <div class="bg-glow-2"></div>
      <div class="bg-glow-3"></div>
      <div class="light-sweep"></div>
      <div class="energy-field"></div>
    </div>
    
    <div class="text-center mb-16">
      <h3 class="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
        <i class="bi bi-gpu-card text-cyan-400 shadow-lg shadow-cyan-400/50 text-6xl pulse-icon"></i>
        RTX 50系列显卡
      </h3>
      <p class="text-gray-300 text-xl">下一代AI游戏的革命性体验</p>
      <div class="title-underline"></div>
    </div>
    
    <!-- 增强的3D轮播容器 -->
    <div class="carousel-3d-scene" 
         ref="observerTarget"
         @mouseenter="handleMouseEnter"
         @mouseleave="handleMouseLeave"
         @touchstart="handleTouchStart"
         @touchend="handleTouchEnd"
         @wheel.passive="handleWheel">
      <div class="carousel-environment">
        <div class="env-ring ring-1"></div>
        <div class="env-ring ring-2"></div>
        <div class="env-ring ring-3"></div>
      </div>
      
      <div class="carousel-3d-stage" :style="{ transform: `rotateY(${rotation}deg)` }">
        <div 
          v-for="(gpu, index) in gpus" 
          :key="gpu.id"
          class="carousel-3d-item"
          :class="{ 'active': index === currentIndex }"
          :style="{ 
            transform: `rotateY(${index * (360 / gpus.length)}deg) translateZ(500px)`,
            '--delay': `${index * 0.1}s`,
            '--rotation': `${index * (360 / gpus.length)}deg`
          }"
          @click="selectGpu(index)"
          @keydown.enter="selectGpu(index)"
          tabindex="0"
          :aria-label="`显卡: ${gpu.title}`">
          
          <!-- 增强的游戏封面 -->
          <div class="game-cover glass-morphism-enhanced">
            <div class="hologram-effect"></div>
            
            <!-- 显卡图片或图标placeholder -->
            <div v-if="gpu.image" class="gpu-image-container">
              <img :src="gpu.image" 
                   :alt="gpu.title" 
                   loading="lazy"
                   @error="$event.target.style.display = 'none'" />
            </div>
            <div v-else class="gpu-placeholder">
              <i class="bi bi-gpu-card"></i>
              <span class="gpu-model-name">{{ gpu.title }}</span>
            </div>
            
            <div class="game-glow"></div>
            <div class="glass-overlay-advanced"></div>
            <div class="glass-reflection-advanced"></div>
            
            <!-- 增强的光效扫描 -->
            <div class="light-scan-advanced" :class="{ 'scanning': index === currentIndex }"></div>
            
            <!-- 悬浮信息 - 重新设计 -->
            <div class="game-info-advanced">
              <h4 class="game-title-advanced">{{ gpu.title }}</h4>
              <p class="game-genre-advanced">{{ gpu.model }}</p>
              <div class="game-stats-advanced">
                <div class="game-rating-advanced">
                  <i class="bi bi-star-fill"></i>
                  <span>{{ gpu.rating }}</span>
                </div>
                <div class="game-year-advanced">{{ gpu.releaseYear }}</div>
              </div>
            </div>
            
            <!-- 重新设计的价格显示 -->
            <div class="game-price-advanced">
              <span v-if="gpu.originalPrice > 0" class="original-price-advanced">¥{{ gpu.originalPrice }}</span>
              <span class="sale-price-advanced">{{ gpu.salePrice > 0 ? `¥${gpu.salePrice}` : '免费' }}</span>
            </div>
            
            <!-- 激活状态装饰 -->
            <div class="active-border-advanced" v-show="index === currentIndex"></div>
            
            <!-- 增强的玻璃边框 -->
            <div class="glass-frame-advanced">
              <div class="glass-corner-advanced top-left"></div>
              <div class="glass-corner-advanced top-right"></div>
              <div class="glass-corner-advanced bottom-left"></div>
              <div class="glass-corner-advanced bottom-right"></div>
            </div>

            <!-- 新增：能量场效果 -->
            <div class="energy-orbs">
              <div class="energy-orb" v-for="i in 3" :key="i" :style="{'--index': i}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 增强的轮播控制 -->
    <div class="carousel-controls-advanced" role="navigation" aria-label="显卡轮播控制">
      <button @click="prevGpu" 
              @keydown.enter="prevGpu"
              @keydown.space.prevent="prevGpu"
              class="control-btn-advanced prev glass-button-advanced"
              aria-label="上一个显卡"
              tabindex="0">
        <i class="bi bi-chevron-left" aria-hidden="true"></i>
        <div class="button-glow"></div>
      </button>
      
      <div class="game-indicators-advanced" role="tablist" aria-label="显卡选择指示器">
        <button 
          v-for="(gpu, index) in gpus" 
          :key="index"
          @click="selectGpu(index)"
          @keydown.enter="selectGpu(index)"
          @keydown.space.prevent="selectGpu(index)"
          class="indicator-advanced"
          :class="{ 'active': index === currentIndex }"
          role="tab"
          :aria-selected="index === currentIndex"
          :aria-label="`选择显卡: ${gpu.title}`"
          :tabindex="index === currentIndex ? 0 : -1">
          <div class="indicator-inner"></div>
          <div class="indicator-ripple"></div>
          <span class="indicator-tooltip-advanced">{{ gpu.title }}</span>
        </button>
      </div>
      
      <button @click="nextGpu" 
              @keydown.enter="nextGpu"
              @keydown.space.prevent="nextGpu"
              class="control-btn-advanced next glass-button-advanced"
              aria-label="下一个显卡"
              tabindex="0">
        <i class="bi bi-chevron-right" aria-hidden="true"></i>
        <div class="button-glow"></div>
      </button>
    </div>
    
    <!-- 重新设计的显卡详情区 -->
    <div class="current-game-info-advanced" role="main" aria-label="当前选中显卡详情">
      <div class="glass-card-premium rounded-2xl p-10 max-w-6xl mx-auto border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <div class="grid md:grid-cols-5 gap-10 items-center">
          <div class="md:col-span-2">
            <div class="game-detail-cover-advanced">
              <!-- 详情区图片或placeholder -->
              <div v-if="selectedGpu.image" class="detail-image-container">
                <img :src="selectedGpu.image" 
                     :alt="`${selectedGpu.title} 显卡封面`" 
                     class="w-full rounded-lg shadow-lg"
                     loading="lazy"
                     @error="$event.target.style.display = 'none'" />
              </div>
              <div v-else class="detail-gpu-placeholder">
                <i class="bi bi-gpu-card"></i>
                <span class="detail-gpu-name">{{ selectedGpu.title }}</span>
                <span class="detail-gpu-model">{{ selectedGpu.model }}</span>
              </div>
              
              <div class="cover-overlay-advanced">
                <button class="play-button-advanced"
                        @click="openProductLink"
                        @keydown.enter="openProductLink"
                        @keydown.space.prevent="openProductLink"
                        aria-label="在Steam上查看显卡"
                        tabindex="0">
                  <i class="bi bi-play-fill" aria-hidden="true"></i>
                  <div class="play-ripple"></div>
                </button>
              </div>
              <div class="detail-glass-overlay-advanced"></div>
              <div class="cover-energy-field"></div>
            </div>
          </div>
          <div class="md:col-span-3">
            <header>
              <h2 class="text-4xl font-bold text-white mb-6 neon-text-advanced">{{ selectedGpu.title }}</h2>
            </header>
            <p class="text-gray-300 text-lg mb-8 leading-relaxed">{{ selectedGpu.description }}</p>
            
            <div class="game-badges-advanced mb-8" role="list" aria-label="显卡信息标签">
              <span class="badge-advanced genre-badge" role="listitem">
                <i class="bi bi-tag" aria-hidden="true"></i>
                <span class="sr-only">显卡类型：</span>{{ selectedGpu.model }}
              </span>
              <span class="badge-advanced rating-badge" role="listitem">
                <i class="bi bi-star-fill" aria-hidden="true"></i>
                <span class="sr-only">评分：</span>{{ selectedGpu.rating }}
              </span>
              <span class="badge-advanced year-badge" role="listitem">
                <i class="bi bi-calendar" aria-hidden="true"></i>
                <span class="sr-only">发布年份：</span>{{ selectedGpu.releaseYear }}
              </span>
            </div>

            <!-- 显卡规格展示 -->
            <div class="gpu-specs-grid mb-8">
              <div class="spec-item">
                <i class="bi bi-memory text-cyan-400"></i>
                <span class="spec-label">显存</span>
                <span class="spec-value">{{ selectedGpu.specs.memory }}</span>
              </div>
              <div class="spec-item">
                <i class="bi bi-cpu text-cyan-400"></i>
                <span class="spec-label">CUDA核心</span>
                <span class="spec-value">{{ selectedGpu.specs.cores }}</span>
              </div>
              <div class="spec-item">
                <i class="bi bi-speedometer2 text-cyan-400"></i>
                <span class="spec-label">加速频率</span>
                <span class="spec-value">{{ selectedGpu.specs.boost }}</span>
              </div>
              <div class="spec-item">
                <i class="bi bi-lightning text-cyan-400"></i>
                <span class="spec-label">功耗</span>
                <span class="spec-value">{{ selectedGpu.specs.power }}</span>
              </div>
            </div>

            <!-- 特性列表 -->
            <div class="gpu-features mb-8">
              <h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <i class="bi bi-gear-fill text-cyan-400"></i>
                核心特性
              </h4>
              <div class="feature-tags">
                <span v-for="feature in selectedGpu.features" :key="feature" 
                      class="feature-tag">
                  <i class="bi bi-check-circle-fill text-green-400"></i>
                  {{ feature }}
                </span>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="price-section-advanced" role="region" aria-label="价格信息">
                <span v-if="selectedGpu.originalPrice > 0" 
                      class="text-gray-400 text-xl line-through mr-4"
                      aria-label="原价">¥{{ selectedGpu.originalPrice.toLocaleString() }}</span>
                <span class="text-4xl font-bold text-cyan-400 neon-text-price"
                      aria-label="当前价格">¥{{ selectedGpu.salePrice.toLocaleString() }}</span>
                <span v-if="selectedGpu.originalPrice > 0 && selectedGpu.salePrice > 0" 
                      class="text-green-400 text-lg ml-4 discount-badge"
                      aria-label="折扣">
                  -{{ Math.round((1 - selectedGpu.salePrice / selectedGpu.originalPrice) * 100) }}%
                </span>
              </div>
              
              <button @click="openProductLink" 
                      @keydown.enter="openProductLink"
                      @keydown.space.prevent="openProductLink"
                      class="btn-premium-advanced px-8 py-3 rounded-2xl font-bold text-lg flex items-center gap-3 relative overflow-hidden"
                      aria-label="查看显卡详情"
                      tabindex="0">
                <i class="bi bi-eye mr-3" aria-hidden="true"></i>
                查看详情
                <div class="btn-energy-field"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Nuxt.js 导入
const router = useRouter()

// 显卡数据
const gpus = ref([
  {
    id: 1,
    title: "RTX 5090",
    model: "旗舰级显卡",
    rating: "9.8",
    releaseYear: "2025",
    originalPrice: 22999,
    salePrice: 19999,
    image: "",
    description: "革命性Blackwell架构，32GB GDDR7显存，专为8K游戏和AI应用而生。支持最新DLSS 4技术，提供前所未有的游戏性能和AI加速能力。",
    specs: {
      memory: "32GB GDDR7",
      cores: "21504 CUDA",
      boost: "2900 MHz",
      power: "600W"
    },
    features: ["DLSS 4", "8K游戏", "AI超采样", "实时光追"]
  },
  {
    id: 2,
    title: "RTX 5080",
    model: "高端游戏显卡",
    rating: "9.5",
    releaseYear: "2025",
    originalPrice: 14999,
    salePrice: 12999,
    image: "",
    description: "次旗舰级性能，16GB GDDR7显存，完美支持4K高帧率游戏。配备先进的Ada Lovelace升级架构，为高端游戏玩家提供极致体验。",
    specs: {
      memory: "16GB GDDR7",
      cores: "14080 CUDA",
      boost: "2700 MHz",
      power: "400W"
    },
    features: ["DLSS 4", "4K 120FPS", "光追优化", "创作加速"]
  },
  {
    id: 3,
    title: "RTX 5070 Ti",
    model: "性能级显卡",
    rating: "9.2",
    releaseYear: "2025",
    originalPrice: 8999,
    salePrice: 7999,
    image: "",
    description: "主流性能王者，12GB GDDR7显存，1440p游戏最佳选择。采用最新架构优化，提供出色的性价比和游戏表现。",
    specs: {
      memory: "12GB GDDR7",
      cores: "8960 CUDA",
      boost: "2600 MHz",
      power: "285W"
    },
    features: ["DLSS 4", "1440p极致", "效率优化", "温控出色"]
  },
  {
    id: 4,
    title: "RTX 5070",
    model: "主流游戏显卡",
    rating: "8.9",
    releaseYear: "2025",
    originalPrice: 6999,
    salePrice: 5999,
    image: "",
    description: "主流游戏新标杆，12GB GDDR6X显存，提供1440p高设置游戏体验。出色的能效比和先进的AI功能，满足大多数玩家需求。",
    specs: {
      memory: "12GB GDDR6X",
      cores: "5888 CUDA",
      boost: "2500 MHz",
      power: "220W"
    },
    features: ["DLSS 4", "1440p高画质", "低功耗", "静音运行"]
  },
  {
    id: 5,
    title: "RTX 5060 Ti",
    model: "入门级显卡",
    rating: "8.6",
    releaseYear: "2025",
    originalPrice: 4999,
    salePrice: 3999,
    image: "",
    description: "入门级RTX体验，8GB GDDR6X显存，1080p光追游戏首选。为预算有限的玩家提供RTX技术和AI功能体验。",
    specs: {
      memory: "8GB GDDR6X",
      cores: "4352 CUDA",
      boost: "2400 MHz",
      power: "165W"
    },
    features: ["DLSS 4", "1080p光追", "节能设计", "超值选择"]
  }
])

const currentIndex = ref(0)
const rotation = ref(0)
const autoRotate = ref(true)
const isHovered = ref(false)
const preloadedImages = ref(new Set())

// 性能优化：当前选中的显卡
const selectedGpu = computed(() => gpus.value[currentIndex.value])

// 性能优化：预加载图片
const preloadImages = () => {
  gpus.value.forEach(gpu => {
    if (!preloadedImages.value.has(gpu.image)) {
      const img = new Image()
      img.onload = () => {
        preloadedImages.value.add(gpu.image)
      }
      img.src = gpu.image
    }
  })
}

// 选择显卡 - 增强版
const selectGpu = (index) => {
  if (index === currentIndex.value) return
  
  currentIndex.value = index
  rotation.value = -index * (360 / gpus.value.length)
  
  // 触觉反馈（如果支持）
  if (navigator.vibrate) {
    navigator.vibrate(50)
  }
  
  // 暂停自动轮播
  autoRotate.value = false
  setTimeout(() => {
    if (!isHovered.value) {
      autoRotate.value = true
    }
  }, 3000)
}

// 下一个显卡 - 优化版
const nextGpu = () => {
  const nextIndex = (currentIndex.value + 1) % gpus.value.length
  selectGpu(nextIndex)
}

// 上一个显卡 - 优化版
const prevGpu = () => {
  const prevIndex = currentIndex.value === 0 ? gpus.value.length - 1 : currentIndex.value - 1
  selectGpu(prevIndex)
}

// 鼠标悬停控制
const handleMouseEnter = () => {
  isHovered.value = true
  autoRotate.value = false
}

const handleMouseLeave = () => {
  isHovered.value = false
  setTimeout(() => {
    if (!isHovered.value) {
      autoRotate.value = true
    }
  }, 1000)
}

// 键盘控制
const handleKeyPress = (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      prevGpu()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextGpu()
      break
    case ' ':
      event.preventDefault()
      autoRotate.value = !autoRotate.value
      break
    case 'Enter':
      event.preventDefault()
      // 可以在这里添加打开Steam链接的逻辑
      break
  }
}

// 触摸控制
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (event) => {
  touchStartX.value = event.touches[0].clientX
}

const handleTouchEnd = (event) => {
  touchEndX.value = event.changedTouches[0].clientX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50
  const diff = touchStartX.value - touchEndX.value
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextGpu()
    } else {
      prevGpu()
    }
  }
}

// 滚轮控制
const handleWheel = (event) => {
  event.preventDefault()
  const delta = event.deltaY
  
  if (delta > 0) {
    nextGpu()
  } else {
    prevGpu()
  }
}

// 自动轮播定时器
let autoRotateInterval = null

const startAutoRotate = () => {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval)
  }
  
  autoRotateInterval = setInterval(() => {
    if (autoRotate.value && !isHovered.value) {
      nextGpu()
    }
  }, 4500) // 增加轮播间隔，给用户更多时间欣赏
}

const stopAutoRotate = () => {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval)
    autoRotateInterval = null
  }
}

// Intersection Observer 用于性能优化
const observerTarget = ref(null)
const isVisible = ref(false)

const setupIntersectionObserver = () => {
  if (!observerTarget.value) return
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting
        if (entry.isIntersecting) {
          startAutoRotate()
          preloadImages()
        } else {
          stopAutoRotate()
        }
      })
    },
    { threshold: 0.3 }
  )
  
  observer.observe(observerTarget.value)
  
  return observer
}

// 打开产品链接
const openProductLink = () => {
  const productUrl = `/products/${selectedGpu.value.id}`
  router.push(productUrl)
}

// 生命周期管理
onMounted(() => {
  // 预加载图片
  preloadImages()
  
  // 设置Intersection Observer
  nextTick(() => {
    setupIntersectionObserver()
  })
  
  // 添加事件监听器
  window.addEventListener('keydown', handleKeyPress)
  
  // 开始自动轮播
  startAutoRotate()
  
  // 添加页面可见性变化监听
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      autoRotate.value = false
      stopAutoRotate()
    } else if (isVisible.value) {
      setTimeout(() => {
        if (!isHovered.value) {
          autoRotate.value = true
          startAutoRotate()
        }
      }, 1000)
    }
  })
})

onUnmounted(() => {
  // 清理定时器
  stopAutoRotate()
  
  // 移除事件监听器
  window.removeEventListener('keydown', handleKeyPress)
  
  // 清理其他资源
  preloadedImages.value.clear()
})

// 提供给父组件的方法
defineExpose({
  nextGpu,
  prevGpu,
  selectGpu,
  currentIndex: readonly(currentIndex),
  selectedGpu: readonly(selectedGpu)
})
</script>

<style scoped>
.steam-carousel-container {
  min-height: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

/* 粒子系统 */
.particle-system {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle, rgba(0, 245, 255, 0.8) 0%, transparent 70%);
  border-radius: 50%;
  left: var(--x);
  top: var(--y);
  animation: particleFloat var(--duration) ease-in-out infinite var(--delay);
  filter: blur(1px);
}

/* 增强背景装饰 */
.carousel-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(0, 245, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(0, 128, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 0, 128, 0.08) 0%, transparent 60%);
  animation: patternMove 25s ease-in-out infinite;
}

.bg-glow-1, .bg-glow-2, .bg-glow-3 {
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
}

.bg-glow-1 {
  top: 10%;
  left: 5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 245, 255, 0.2) 0%, transparent 70%);
  animation: float1 20s ease-in-out infinite;
}

.bg-glow-2 {
  top: 60%;
  right: 5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 128, 255, 0.2) 0%, transparent 70%);
  animation: float2 25s ease-in-out infinite;
}

.bg-glow-3 {
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%);
  animation: float3 18s ease-in-out infinite;
}

.energy-field {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(45deg, transparent 48%, rgba(0, 245, 255, 0.02) 49%, rgba(0, 245, 255, 0.02) 51%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(0, 128, 255, 0.02) 49%, rgba(0, 128, 255, 0.02) 51%, transparent 52%);
  background-size: 100px 100px;
  animation: energyField 10s linear infinite;
}

/* 图标脉冲效果 */
.pulse-icon {
  animation: iconPulse 3s ease-in-out infinite;
}

/* 增强的标题装饰 */
.title-underline {
  width: 250px;
  height: 6px;
  background: linear-gradient(90deg, transparent, #00f5ff, #ff0080, #00f5ff, transparent);
  margin: 2rem auto;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(0, 245, 255, 0.8);
  animation: titleGlow 4s ease-in-out infinite alternate;
}

/* 3D场景环境 */
.carousel-3d-scene {
  perspective: 2500px;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0;
  position: relative;
}

.carousel-environment {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.env-ring {
  position: absolute;
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotateX(75deg);
}

.ring-1 {
  width: 800px;
  height: 800px;
  animation: ringRotate1 20s linear infinite;
}

.ring-2 {
  width: 1000px;
  height: 1000px;
  animation: ringRotate2 30s linear infinite reverse;
}

.ring-3 {
  width: 1200px;
  height: 1200px;
  animation: ringRotate3 40s linear infinite;
}

.carousel-3d-stage {
  position: relative;
  width: 520px;
  height: 520px;
  transform-style: preserve-3d;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 增强的3D轮播项 */
.carousel-3d-item {
  position: absolute;
  width: 520px;
  height: 520px;
  cursor: pointer;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInItem 1s ease-out;
  animation-delay: var(--delay);
  animation-fill-mode: both;
  transform-origin: center center;
}

.carousel-3d-item:hover {
  transform: rotateY(var(--rotation)) translateZ(600px) scale(1.02) !important;
}

.carousel-3d-item.active {
  z-index: 10;
  transform: rotateY(var(--rotation)) translateZ(580px) scale(1.05) !important;
}

/* 增强的玻璃形态设计 */
.glass-morphism-enhanced {
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  background: rgba(255, 255, 255, 0.08);
  border: 3px solid rgba(255, 255, 255, 0.15);
}

.hologram-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 245, 255, 0.1) 0%,
    transparent 3%,
    transparent 97%,
    rgba(0, 245, 255, 0.1) 100%
  );
  background-size: 100% 4px;
  animation: hologramScan 3s ease-in-out infinite;
  pointer-events: none;
  border-radius: inherit;
}

.glass-overlay-advanced {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.08) 25%,
    rgba(255, 255, 255, 0.03) 50%,
    rgba(0, 0, 0, 0.15) 100%
  );
  pointer-events: none;
  border-radius: inherit;
}

.glass-reflection-advanced {
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
  pointer-events: none;
  border-radius: inherit;
  opacity: 0.8;
}

/* 增强的游戏封面 */
.game-cover {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 2.5rem;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(0, 128, 255, 0.2));
  border: 4px solid rgba(0, 245, 255, 0.5);
  box-shadow: 
    0 0 80px rgba(0, 245, 255, 0.6),
    0 40px 100px rgba(0, 0, 0, 0.5),
    inset 0 0 120px rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center center;
}

.game-cover:hover {
  border-color: rgba(0, 245, 255, 0.9);
  box-shadow: 
    0 0 120px rgba(0, 245, 255, 1),
    0 50px 120px rgba(0, 0, 0, 0.6),
    inset 0 0 180px rgba(255, 255, 255, 0.15);
}

.game-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(1.2) contrast(1.3) saturate(1.1);
  transform-origin: center center;
}

.game-cover:hover img {
  transform: scale(1.03);
}

/* 增强的光效扫描 */
.light-scan-advanced {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 245, 255, 0.2) 10%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(0, 245, 255, 0.2) 90%,
    transparent 100%
  );
  transform: skewX(-25deg);
  opacity: 0;
  pointer-events: none;
}

.light-scan-advanced.scanning {
  animation: scanAcross 2.5s ease-in-out infinite;
  opacity: 1;
}

/* 能量球效果 */
.energy-orbs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.energy-orb {
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, rgba(0, 245, 255, 1) 0%, transparent 70%);
  border-radius: 50%;
  animation: energyOrbFloat 4s ease-in-out infinite;
  animation-delay: calc(var(--index) * 1.3s);
  filter: blur(1px);
}

.energy-orb:nth-child(1) { top: 20%; left: 10%; }
.energy-orb:nth-child(2) { top: 70%; right: 15%; }
.energy-orb:nth-child(3) { bottom: 25%; left: 80%; }

/* 增强的激活边框 */
.active-border-advanced {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 4px solid #00f5ff;
  border-radius: 2.5rem;
  box-shadow: 
    0 0 60px rgba(0, 245, 255, 1),
    inset 0 0 60px rgba(0, 245, 255, 0.4);
  animation: activePulse 2s ease-in-out infinite;
}

/* 增强的玻璃边框 */
.glass-frame-advanced {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.glass-corner-advanced {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 245, 255, 0.8);
  transition: all 0.3s ease;
}

.glass-corner-advanced.top-left {
  top: 15px;
  left: 15px;
  border-right: none;
  border-bottom: none;
  border-radius: 12px 0 0 0;
}

.glass-corner-advanced.top-right {
  top: 15px;
  right: 15px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 12px 0 0;
}

.glass-corner-advanced.bottom-left {
  bottom: 15px;
  left: 15px;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 12px;
}

.glass-corner-advanced.bottom-right {
  bottom: 15px;
  right: 15px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 12px 0;
}

/* 增强的控制按钮 */
.carousel-controls-advanced {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  margin: 3rem 0;
}

.control-btn-advanced {
  position: relative;
  width: 4rem;
  height: 4rem;
  background: rgba(0, 245, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(0, 245, 255, 0.5);
  border-radius: 50%;
  color: #00f5ff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.4),
    inset 0 0 30px rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.control-btn-advanced:hover {
  background: rgba(0, 245, 255, 0.3);
  border-color: rgba(0, 245, 255, 1);
  transform: scale(1.1);
  box-shadow: 
    0 0 50px rgba(0, 245, 255, 0.8),
    inset 0 0 50px rgba(255, 255, 255, 0.2);
}

.button-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.control-btn-advanced:hover .button-glow {
  opacity: 1;
}

/* 增强的指示器 */
.game-indicators-advanced {
  display: flex;
  gap: 1rem;
}

.indicator-advanced {
  position: relative;
  width: 15px;
  height: 15px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.indicator-advanced:hover {
  transform: scale(1.2);
  background: rgba(0, 245, 255, 0.3);
  border-color: rgba(0, 245, 255, 0.8);
}

.indicator-advanced.active {
  background: rgba(0, 245, 255, 0.6);
  border-color: rgba(0, 245, 255, 1);
  box-shadow: 0 0 20px rgba(0, 245, 255, 1);
}

.indicator-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  background: #00f5ff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.indicator-advanced.active .indicator-inner {
  opacity: 1;
}

.indicator-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(0, 245, 255, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: rippleEffect 2s ease-out infinite;
}

.indicator-advanced.active .indicator-ripple {
  opacity: 1;
}

/* 增强动画 */
@keyframes particleFloat {
  0%, 100% { 
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% { 
    transform: translateY(-100px) rotate(180deg);
    opacity: 1;
  }
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 10px rgba(0, 245, 255, 0.5));
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 20px rgba(0, 245, 255, 1));
  }
}

@keyframes hologramScan {
  0%, 100% { 
    background-position: 0 0;
    opacity: 0.3;
  }
  50% { 
    background-position: 0 100%;
    opacity: 0.8;
  }
}

@keyframes energyField {
  0% { background-position: 0 0; }
  100% { background-position: 100px 100px; }
}

@keyframes energyOrbFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 1;
  }
}

@keyframes ringRotate1 {
  from { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0deg); }
  to { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg); }
}

@keyframes ringRotate2 {
  from { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0deg); }
  to { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg); }
}

@keyframes ringRotate3 {
  from { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0deg); }
  to { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg); }
}

@keyframes rippleEffect {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

@keyframes float3 {
  0%, 100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
  50% { transform: translateX(-50%) translateY(-40px) rotate(180deg); }
}

/* 响应式设计增强 */
@media (max-width: 768px) {
  .steam-carousel-container {
    min-height: 1000px;
    padding: 2rem 0;
  }
  
  .carousel-3d-scene {
    height: 450px;
  }
  
  .carousel-3d-stage,
  .carousel-3d-item,
  .game-cover {
    width: 350px;
    height: 350px;
  }
  
  .carousel-3d-item {
    transform: rotateY(var(--rotation)) translateZ(350px) !important;
  }
  
  .carousel-3d-item.active {
    transform: rotateY(var(--rotation)) translateZ(400px) scale(1.05) !important;
  }
  
  .control-btn-advanced {
    width: 3rem;
    height: 3rem;
    font-size: 1.2rem;
  }
  
  .carousel-controls-advanced {
    gap: 2rem;
  }
}

/* 添加缺失的样式类 */

/* 发光效果增强 */
.game-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 245, 255, 0.25) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  filter: blur(25px);
}

.carousel-3d-item.active .game-glow,
.game-cover:hover .game-glow {
  opacity: 1;
}

/* 增强的游戏信息 */
.game-info-advanced {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6), transparent);
  backdrop-filter: blur(15px);
  padding: 2rem 1.5rem 1.5rem;
  border-radius: 0 0 2.5rem 2.5rem;
  transform: translateY(100%);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
}

.carousel-3d-item:hover .game-info-advanced,
.carousel-3d-item.active .game-info-advanced {
  transform: translateY(0);
  opacity: 1;
}

.game-title-advanced {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  line-height: 1.2;
}

.game-genre-advanced {
  font-size: 0.9rem;
  color: #00f5ff;
  margin-bottom: 1rem;
  font-weight: 500;
}

.game-stats-advanced {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-rating-advanced {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffd700;
  font-weight: 600;
}

.game-year-advanced {
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 500;
}

/* 增强的价格显示 */
.game-price-advanced {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(0, 245, 255, 0.5);
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 
    0 8px 30px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba(0, 245, 255, 0.1);
  transition: all 0.3s ease;
}

.game-price-advanced:hover {
  transform: scale(1.05);
  border-color: rgba(0, 245, 255, 0.8);
  box-shadow: 
    0 0 25px rgba(0, 245, 255, 0.6),
    inset 0 0 30px rgba(0, 245, 255, 0.2);
}

.original-price-advanced {
  font-size: 0.75rem;
  color: #94a3b8;
  text-decoration: line-through;
  opacity: 0.8;
}

.sale-price-advanced {
  font-size: 1.1rem;
  font-weight: 700;
  color: #00f5ff;
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.6);
}

/* 详情区域增强 */
.current-game-info-advanced {
  margin-top: 4rem;
}

.glass-card-premium {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(30px);
  border: 3px solid rgba(0, 245, 255, 0.4);
  box-shadow: 
    0 30px 100px rgba(0, 0, 0, 0.6),
    inset 0 0 80px rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
}

.glass-card-premium::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%,
    rgba(0, 245, 255, 0.05) 100%
  );
  pointer-events: none;
}

.game-detail-cover-advanced {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 3px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    inset 0 0 40px rgba(255, 255, 255, 0.05);
  transition: all 0.4s ease;
}

.game-detail-cover-advanced:hover {
  transform: scale(1.02);
  border-color: rgba(0, 245, 255, 0.5);
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(0, 245, 255, 0.3),
    inset 0 0 60px rgba(255, 255, 255, 0.08);
}

.cover-overlay-advanced {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.3) 0%,
    transparent 50%,
    rgba(0, 245, 255, 0.1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
}

.game-detail-cover-advanced:hover .cover-overlay-advanced {
  opacity: 1;
}

.play-button-advanced {
  position: relative;
  width: 80px;
  height: 80px;
  background: rgba(0, 245, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 
    0 0 40px rgba(0, 245, 255, 0.8),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
}

.play-button-advanced:hover {
  transform: scale(1.1);
  background: rgba(0, 245, 255, 1);
  box-shadow: 
    0 0 60px rgba(0, 245, 255, 1),
    inset 0 0 50px rgba(255, 255, 255, 0.3);
}

.play-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: playRipple 2s ease-out infinite;
}

.detail-glass-overlay-advanced {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 30%,
    transparent 70%,
    rgba(0, 245, 255, 0.05) 100%
  );
  pointer-events: none;
}

.cover-energy-field {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 245, 255, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 0, 128, 0.03) 0%, transparent 50%);
  animation: energyPulse 4s ease-in-out infinite;
  pointer-events: none;
}

/* 霓虹灯文字效果增强 */
.neon-text-advanced {
  text-shadow: 
    0 0 5px currentColor,
    0 0 10px currentColor,
    0 0 20px currentColor,
    0 0 40px currentColor;
  animation: neonPulse 3s ease-in-out infinite alternate;
}

.neon-text-price {
  text-shadow: 
    0 0 8px currentColor,
    0 0 16px currentColor,
    0 0 32px currentColor,
    0 0 64px currentColor;
  animation: priceGlow 2.5s ease-in-out infinite alternate;
}

/* 标签增强 */
.game-badges-advanced {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.badge-advanced {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.badge-advanced:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 245, 255, 0.6);
  box-shadow: 
    0 8px 30px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(0, 245, 255, 0.4),
    inset 0 0 30px rgba(255, 255, 255, 0.1);
}

.badge-advanced.genre-badge { border-color: rgba(0, 245, 255, 0.4); }
.badge-advanced.rating-badge { border-color: rgba(255, 215, 0, 0.4); }
.badge-advanced.year-badge { border-color: rgba(168, 85, 247, 0.4); }

/* 价格区域增强 */
.price-section-advanced {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
}

.discount-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 1rem;
  font-weight: 700;
  box-shadow: 
    0 4px 15px rgba(16, 185, 129, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
  animation: discountPulse 2s ease-in-out infinite;
}

/* 按钮增强 */
.btn-premium-advanced {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(0, 128, 255, 0.2));
  backdrop-filter: blur(20px);
  border: 3px solid rgba(0, 245, 255, 0.5);
  color: #ffffff;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.4),
    inset 0 0 40px rgba(255, 255, 255, 0.1);
}

.btn-premium-advanced:hover {
  background: linear-gradient(135deg, rgba(0, 245, 255, 0.4), rgba(0, 128, 255, 0.4));
  border-color: rgba(0, 245, 255, 1);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 20px 70px rgba(0, 0, 0, 0.5),
    0 0 50px rgba(0, 245, 255, 0.6),
    inset 0 0 60px rgba(255, 255, 255, 0.15);
}

.btn-energy-field {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  transition: left 0.6s ease;
}

.btn-premium-advanced:hover .btn-energy-field {
  left: 100%;
}

/* 提示框增强 */
.indicator-tooltip-advanced {
  position: absolute;
  bottom: 150%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(0, 245, 255, 0.5);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(0, 245, 255, 0.3);
  z-index: 100;
}

.indicator-tooltip-advanced::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(0, 245, 255, 0.5);
}

.indicator-advanced:hover .indicator-tooltip-advanced {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(-5px);
}

/* 新增动画 */
@keyframes playRipple {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

@keyframes energyPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes neonPulse {
  0% { 
    text-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 20px currentColor,
      0 0 40px currentColor;
  }
  100% { 
    text-shadow: 
      0 0 10px currentColor,
      0 0 20px currentColor,
      0 0 40px currentColor,
      0 0 80px currentColor;
  }
}

@keyframes priceGlow {
  0% { 
    text-shadow: 
      0 0 8px currentColor,
      0 0 16px currentColor,
      0 0 32px currentColor,
      0 0 64px currentColor;
  }
  100% { 
    text-shadow: 
      0 0 12px currentColor,
      0 0 24px currentColor,
      0 0 48px currentColor,
      0 0 96px currentColor;
  }
}

@keyframes discountPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 
      0 4px 15px rgba(16, 185, 129, 0.4),
      inset 0 0 20px rgba(255, 255, 255, 0.2);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 
      0 6px 25px rgba(16, 185, 129, 0.6),
      inset 0 0 30px rgba(255, 255, 255, 0.3);
  }
}

@keyframes scanAcross {
  0% { left: -100%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

@keyframes titleGlow {
  0% { box-shadow: 0 0 30px rgba(0, 245, 255, 0.8); }
  100% { box-shadow: 0 0 50px rgba(0, 245, 255, 1), 0 0 80px rgba(255, 0, 128, 0.6); }
}

@keyframes activePulse {
  0%, 100% {
    box-shadow: 
      0 0 60px rgba(0, 245, 255, 1),
      inset 0 0 60px rgba(0, 245, 255, 0.4);
  }
  50% {
    box-shadow: 
      0 0 100px rgba(0, 245, 255, 1),
      inset 0 0 100px rgba(0, 245, 255, 0.6);
  }
}

@keyframes fadeInItem {
  from {
    opacity: 0;
    transform: rotateY(var(--rotation)) translateZ(400px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: rotateY(var(--rotation)) translateZ(500px) scale(1);
  }
}

@keyframes patternMove {
  0%, 100% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(30px) translateY(-30px); }
  50% { transform: translateX(-20px) translateY(20px); }
  75% { transform: translateX(-30px) translateY(-20px); }
}

@keyframes float1 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-40px) rotate(180deg); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(30px) rotate(-180deg); }
}

/* 无障碍访问工具类 */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* 焦点样式增强 */
.carousel-3d-item:focus,
.control-btn-advanced:focus,
.indicator-advanced:focus,
.play-button-advanced:focus,
.btn-premium-advanced:focus {
  outline: 3px solid #00f5ff;
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(0, 245, 255, 0.3);
}

/* 减少动画（用户偏好设置） */
@media (prefers-reduced-motion: reduce) {
  .steam-carousel-container * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .carousel-3d-stage {
    transition: none !important;
  }
  
  .particle {
    animation: none !important;
  }
}

/* 显卡规格网格 */
.gpu-specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(0, 245, 255, 0.2);
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.spec-item:hover {
  border-color: rgba(0, 245, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 245, 255, 0.3);
}

.spec-label {
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
  flex-shrink: 0;
}

.spec-value {
  font-size: 1rem;
  color: #ffffff;
  font-weight: 700;
  text-align: right;
  margin-left: auto;
}

/* 显卡特性 */
.gpu-features {
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(0, 245, 255, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(16, 185, 129, 0.1);
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 2rem;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.feature-tag:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.5);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .gpu-specs-grid {
    grid-template-columns: 1fr;
  }
  
  .spec-item {
    padding: 0.75rem 1rem;
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .spec-value {
    margin-left: 0;
    text-align: center;
  }
  
  .feature-tags {
    justify-content: center;
  }
}

/* GPU图片容器 */
.gpu-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gpu-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(1.2) contrast(1.3) saturate(1.1);
  transform-origin: center center;
}

/* GPU Placeholder样式 */
.gpu-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: linear-gradient(135deg, 
    rgba(0, 245, 255, 0.1) 0%, 
    rgba(0, 128, 255, 0.1) 50%, 
    rgba(168, 85, 247, 0.1) 100%);
  padding: 2rem;
  text-align: center;
}

.gpu-placeholder i {
  font-size: 4rem;
  color: #00f5ff;
  text-shadow: 0 0 20px rgba(0, 245, 255, 0.8);
  animation: gpuIconPulse 3s ease-in-out infinite;
}

.gpu-model-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  letter-spacing: 0.05em;
}

/* 详情区GPU Placeholder */
.detail-image-container {
  width: 100%;
  height: 100%;
}

.detail-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.detail-gpu-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(135deg, 
    rgba(0, 245, 255, 0.15) 0%, 
    rgba(0, 128, 255, 0.15) 50%, 
    rgba(168, 85, 247, 0.15) 100%);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  min-height: 300px;
}

.detail-gpu-placeholder i {
  font-size: 5rem;
  color: #00f5ff;
  text-shadow: 0 0 25px rgba(0, 245, 255, 1);
  margin-bottom: 0.5rem;
  animation: gpuIconPulse 3s ease-in-out infinite;
}

.detail-gpu-name {
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 15px rgba(0, 245, 255, 0.6);
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.detail-gpu-model {
  font-size: 1rem;
  font-weight: 500;
  color: #94a3b8;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  opacity: 0.9;
}

/* GPU图标动画 */
@keyframes gpuIconPulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 20px rgba(0, 245, 255, 0.6));
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 0 30px rgba(0, 245, 255, 1));
  }
}

/* 响应式GPU Placeholder */
@media (max-width: 768px) {
  .gpu-placeholder i {
    font-size: 3rem;
  }
  
  .gpu-model-name {
    font-size: 1rem;
  }
  
  .detail-gpu-placeholder {
    min-height: 250px;
    padding: 1.5rem;
  }
  
  .detail-gpu-placeholder i {
    font-size: 4rem;
  }
  
  .detail-gpu-name {
    font-size: 1.5rem;
  }
  
  .detail-gpu-model {
    font-size: 0.9rem;
  }
}
</style> 