<template>
  <div class="header-location">
    <!-- 位置显示 -->
    <div v-if="hasLocation" class="location-display">
      <button 
        @click="toggleDetails" 
        class="location-button"
        :title="`当前位置: ${getLocationText()}`"
      >
        <i class="bi bi-geo-alt location-icon"></i>
        <span class="location-text">{{ getLocationText() }}</span>
       
      </button>
      
   
    </div>
    
    <!-- 获取中状态 -->
    <div v-else-if="loading" class="loading-display">
      <i class="bi bi-geo-alt location-icon opacity-50"></i>
      <span class="location-text">定位中...</span>
      <div class="loading-spinner"></div>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="error" class="error-display">
      <button 
        @click="fetchLocation(true)" 
        class="location-button error"
        title="点击重新获取定位"
      >
        <i class="bi bi-geo-alt-fill location-icon"></i>
        <span class="location-text">定位失败</span>
        <i class="bi bi-arrow-clockwise detail-icon"></i>
      </button>
    </div>
    
    <!-- 初始状态 -->
    <div v-else class="initial-display">
      <button 
        @click="fetchLocation(true)" 
        class="location-button"
        title="点击获取定位"
      >
        <i class="bi bi-geo location-icon"></i>
        <span class="location-text">获取定位</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocation } from '../../composables/useLocation'

// 使用IP定位功能
const {
  loading,
  data,
  error,
  hasLocation,
  currentIp,
  fetchLocation,
  autoFetchLocation,
  refreshLocation,
  getLocationText
} = useLocation()

// 显示详细信息
const showDetails = ref(false)

// 切换详细信息显示
const toggleDetails = () => {
  showDetails.value = !showDetails.value
}

// 点击外部关闭详情
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.header-location')) {
    showDetails.value = false
  }
}

// 组件挂载时自动获取定位
onMounted(() => {
  autoFetchLocation()
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时清理事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.header-location {
  position: relative;
  z-index: 1000;
}

.location-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(75, 85, 99, 0.3);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  color: #d1d5db;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.location-button:hover {
  background: rgba(75, 85, 99, 0.5);
  border-color: rgba(0, 245, 255, 0.3);
  color: #00f5ff;
  transform: translateY(-1px);
}

.location-button.error {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.location-button.error:hover {
  background: rgba(239, 68, 68, 0.3);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ef4444;
}

.location-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.location-text {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail-icon {
  font-size: 12px;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.detail-icon.rotate-180 {
  transform: rotate(180deg);
}

.loading-display {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, 
    rgba(0, 245, 255, 0.15) 0%, 
    rgba(0, 212, 255, 0.1) 25%, 
    rgba(0, 184, 255, 0.15) 50%, 
    rgba(0, 128, 255, 0.1) 75%, 
    rgba(0, 245, 255, 0.15) 100%
  );
  border: 1px solid rgba(0, 245, 255, 0.3);
  border-radius: 8px;
  color: #00f5ff;
  font-size: 14px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 20px rgba(0, 245, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: loadingPulse 2s ease-in-out infinite alternate;
}

.loading-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #00f5ff 0deg,
    #00d4ff 60deg,
    #00b8ff 120deg,
    #0080ff 180deg,
    #00b8ff 240deg,
    #00d4ff 300deg,
    #00f5ff 360deg
  );
  animation: spin 1s linear infinite, colorShift 3s ease-in-out infinite;
  position: relative;
  flex-shrink: 0;
}

.loading-spinner::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 8px;
  height: 8px;
  background: rgba(31, 41, 55, 0.95);
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.error-display,
.initial-display {
  display: flex;
  align-items: center;
}

.location-details {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 200px;
  background: rgba(31, 41, 55, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  overflow: hidden;
  animation: slideDown 0.2s ease;
  z-index: 999999;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(75, 85, 99, 0.3);
  font-size: 13px;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  color: #9ca3af;
  font-weight: 500;
}

.detail-value {
  color: #d1d5db;
  font-weight: 400;
}

.cache-tag {
  display: inline-block;
  padding: 2px 6px;
  background: rgba(34, 197, 94, 0.2);
  color: #10b981;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.live-tag {
  display: inline-block;
  padding: 2px 6px;
  background: rgba(0, 245, 255, 0.2);
  color: #00f5ff;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.detail-actions {
  padding-top: 12px;
  border-top: 1px solid #e0e0e6;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 4px 8px;
  background: rgba(0, 245, 255, 0.1);
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 6px;
  color: #00f5ff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: rgba(0, 245, 255, 0.2);
  border-color: rgba(0, 245, 255, 0.4);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.detail-info {
  padding: 8px;
  margin-top: 8px;
  background: #fef3cd;
  border: 1px solid #ffd23f;
  border-radius: 4px;
  font-size: 12px;
}

.info-text {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #856404;
  font-weight: 500;
}

.info-detail {
  color: #856404;
  margin-top: 2px;
  font-size: 11px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loadingPulse {
  0% {
    box-shadow: 
      0 0 20px rgba(0, 245, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    border-color: rgba(0, 245, 255, 0.3);
  }
  100% {
    box-shadow: 
      0 0 30px rgba(0, 245, 255, 0.2),
      0 0 40px rgba(0, 212, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: rgba(0, 245, 255, 0.5);
  }
}

@keyframes colorShift {
  0%, 100% {
    filter: hue-rotate(0deg) saturate(1);
  }
  25% {
    filter: hue-rotate(15deg) saturate(1.2);
  }
  50% {
    filter: hue-rotate(30deg) saturate(1.4);
  }
  75% {
    filter: hue-rotate(15deg) saturate(1.2);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .location-text {
    max-width: 80px;
  }
  
  .location-details {
    min-width: 180px;
  }
}
</style> 