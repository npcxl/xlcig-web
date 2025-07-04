<template>
  <div class="ip-location-card">
    <div class="card-header">
      <h3 class="card-title">🌍 IP定位信息</h3>
      <div class="card-actions">
        <n-button 
          size="small" 
          @click="refreshLocation(true)"
          :loading="loading"
        >
          刷新定位
        </n-button>
      </div>
    </div>
    
    <div class="card-content">
      <!-- 基本信息 -->
      <div class="info-section">
        <div class="info-item">
          <span class="label">IP地址:</span>
          <span class="value">{{ currentIp }}</span>
        </div>
        
        <div class="info-item">
          <span class="label">位置:</span>
          <span class="value" :class="{ 'error': !hasLocation }">
            {{ getLocationText() }}
          </span>
        </div>
        
        <div class="info-item" v-if="lastUpdated">
          <span class="label">更新时间:</span>
          <span class="value">{{ formatTime(lastUpdated) }}</span>
        </div>
        
        <div class="info-item" v-if="data">
          <span class="label">数据来源:</span>
          <span class="value">
            <n-tag :type="data.cached ? 'default' : 'success'" size="small">
              {{ data.cached ? '缓存数据' : '实时数据' }}
            </n-tag>
          </span>
        </div>
      </div>
      
      <!-- 用户状态 -->
      <div class="user-section" v-if="data?.user">
        <div class="info-item">
          <span class="label">登录状态:</span>
          <span class="value">
            <n-tag type="success" size="small">
              已登录 (ID: {{ data.user.id }})
            </n-tag>
          </span>
        </div>
        
        <div class="info-item">
          <span class="label">登录IP更新:</span>
          <span class="value">
            <n-tag 
              :type="isUserLocationUpdated ? 'success' : 'warning'" 
              size="small"
            >
              {{ isUserLocationUpdated ? '已更新' : '未更新' }}
            </n-tag>
          </span>
        </div>
      </div>
      
      <!-- 错误信息 -->
      <div class="error-section" v-if="error">
        <n-alert type="error" :show-icon="false">
          {{ error }}
        </n-alert>
      </div>
      
      <!-- 位置信息不精确提示 -->
      <div class="info-section" v-if="data?.location && !data.location.error && (!data.location.province || !data.location.city)">
        <n-alert type="warning" :show-icon="true" closable>
          <template #header>
            位置信息不够精确
          </template>
          <div class="space-y-2 text-sm">
            <p>当前IP地址无法精确定位到省市级别，这可能是由于：</p>
            <ul class="list-disc list-inside ml-2 space-y-1">
              <li>使用了移动网络或企业网络</li>
              <li>通过代理服务器或VPN访问</li>
              <li>IP地址的地理信息数据库不完整</li>
            </ul>
            <p class="mt-2">
              <strong>建议：</strong>尝试点击"刷新定位"获取更精确的位置信息
            </p>
          </div>
        </n-alert>
      </div>
      
      <!-- 详细信息 -->
      <div class="details-section" v-if="data?.location && !data.location.error">
        <n-collapse>
          <n-collapse-item title="详细信息" name="details">
            <div class="details-content">
              <div class="detail-item" v-if="data.location.province">
                <span class="label">省份:</span>
                <span class="value">{{ data.location.province }}</span>
              </div>
              <div class="detail-item" v-if="data.location.city">
                <span class="label">城市:</span>
                <span class="value">{{ data.location.city }}</span>
              </div>
              <div class="detail-item" v-if="data.location.adcode">
                <span class="label">区域代码:</span>
                <span class="value">{{ data.location.adcode }}</span>
              </div>
              <div class="detail-item" v-if="data.location.rectangle">
                <span class="label">矩形区域:</span>
                <span class="value">{{ data.location.rectangle }}</span>
              </div>
            </div>
          </n-collapse-item>
        </n-collapse>
      </div>
    </div>
    
    <!-- 操作按钮 -->
    <div class="card-footer">
      <n-space>
        <n-button 
          type="primary" 
          size="small"
          @click="fetchLocation(true)"
          :loading="loading"
        >
          获取定位
        </n-button>
        
        <n-button 
          size="small"
          @click="autoFetchLocation"
          :loading="loading"
        >
          自动获取
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { NButton, NTag, NAlert, NCollapse, NCollapseItem, NSpace } from 'naive-ui'
import { useLocation } from '../../composables/useLocation'

// 使用IP定位功能
const {
  loading,
  data,
  error,
  lastUpdated,
  hasLocation,
  isUserLocationUpdated,
  currentIp,
  fetchLocation,
  autoFetchLocation,
  refreshLocation,
  getLocationText
} = useLocation()

// 格式化时间
const formatTime = (date: Date) => {
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// 组件挂载时自动获取定位
onMounted(() => {
  autoFetchLocation()
})
</script>

<style scoped>
.ip-location-card {
  border: 1px solid #e0e0e6;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e6;
  background: #fafafa;
}

.card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.card-content {
  padding: 20px;
}

.info-section,
.user-section,
.details-section {
  margin-bottom: 16px;
}

.info-item,
.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child,
.detail-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #666;
  min-width: 80px;
}

.value {
  color: #333;
  font-weight: 400;
}

.value.error {
  color: #d03050;
}

.error-section {
  margin: 16px 0;
}

.details-content {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
}

.card-footer {
  padding: 16px 20px;
  border-top: 1px solid #e0e0e6;
  background: #fafafa;
}
</style> 