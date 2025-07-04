<template>
  <div v-if="show" class="loading-screen">
   
    <div class="loading-bg">
      <div class="loading-bg-1"></div>
      <div class="loading-bg-2"></div>
    </div>
    
    <div class="loading-content">
     
      <div class="loading-logo">
        <div class="logo-icon">
          <span class="logo-text">xl</span>
        </div>
        <div class="logo-info">
          <div class="brand-name">xlCig</div>
          <div class="brand-subtitle">PC BUILDING GUIDE</div>
        </div>
      </div>
      
     
      <div class="loading-spinner-wrapper">
        <div class="loading-spinner-container">
          <div class="loading-spinner-bg"></div>
          <div class="loading-spinner"></div>
        </div>
      </div>
      
     
      <div class="loading-text">
        <p class="loading-title">Initializing Application</p>
        <p class="loading-subtitle">Please wait, preparing your experience...</p>
      </div>
      
      <!-- 加载进度点 -->
      <div class="loading-dots">
        <div class="loading-dot"></div>
        <div class="loading-dot loading-dot-delay-1"></div>
        <div class="loading-dot loading-dot-delay-2"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
/* 主容器 */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #111827 0%, #1e293b 50%, #000000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.3s ease-in-out;
}

/* 背景装饰 */
.loading-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.loading-bg-1 {
  position: absolute;
  top: 5rem;
  left: 5rem;
  width: 24rem;
  height: 24rem;
  background: linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2));
  border-radius: 50%;
  filter: blur(48px);
  animation: pulse 2s ease-in-out infinite;
}

.loading-bg-2 {
  position: absolute;
  bottom: 5rem;
  right: 5rem;
  width: 20rem;
  height: 20rem;
  background: linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2));
  border-radius: 50%;
  filter: blur(48px);
  animation: pulse 2s ease-in-out infinite;
  animation-delay: 1s;
}

/* 加载内容 */
.loading-content {
  text-align: center;
  position: relative;
  z-index: 10;
}

/* Logo */
.loading-logo {
  margin-bottom: 2rem;
}

.loading-logo .logo-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(to right, #06b6d4, #3b82f6);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.logo-text {
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
}

.logo-info {
  color: white;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.brand-subtitle {
  font-size: 0.875rem;
  color: #9ca3af;
}

/* 加载器 */
.loading-spinner-wrapper {
  margin-bottom: 1.5rem;
}

.loading-spinner-container {
  position: relative;
  width: 4rem;
  height: 4rem;
  margin: 0 auto;
}

.loading-spinner-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 4rem;
  height: 4rem;
  border: 4px solid rgba(6, 182, 212, 0.3);
  border-radius: 50%;
}

.loading-spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 4rem;
  height: 4rem;
  border: 4px solid transparent;
  border-top: 4px solid #06b6d4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 加载文字 */
.loading-text {
  margin-bottom: 2rem;
}

.loading-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
  margin-bottom: 0.5rem;
}

.loading-subtitle {
  color: #9ca3af;
  font-size: 0.875rem;
}

/* 加载进度点 */
.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.loading-dot {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #06b6d4;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
}

.loading-dot-delay-1 {
  animation-delay: 0.16s;
}

.loading-dot-delay-2 {
  animation-delay: 0.32s;
}

/* 动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 响应式设计 */
@media (max-width: 640px) {
  .loading-bg-1 {
    width: 12rem;
    height: 12rem;
  }
  
  .loading-bg-2 {
    width: 10rem;
    height: 10rem;
  }
  
  .loading-logo .logo-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .brand-name {
    font-size: 1.25rem;
  }
}
</style> 