<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
    <!-- 背景装饰 -->
    <div class="fixed inset-0 pointer-events-none">
      <div
        class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse">
      </div>
      <div
        class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000">
      </div>
    </div>

    <!-- 导航栏 -->
    <AppHeader :show-back-button="false" :show-nav-menu="true" :show-breadcrumb="true" :show-location="false"
      :show-search-button="false" :show-notification-button="true" :show-decorations="false" current-page-title="在线客服"
      logo-size="medium" />

    <!-- 页面头部 -->
    <section class="relative z-10">
      <div class="container mx-auto px-6 py-8">
        <div
          class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-fade-in-up">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                <i class="bi bi-headset text-cyan-400 text-3xl animate-bounce-gentle"></i>
                在线客服
              </h1>
              <p class="text-gray-300 text-lg">专业的客服团队随时为您提供帮助</p>
            </div>
            <!-- 服务状态和工具 -->
            <div class="flex items-center gap-4">
              <!-- 服务状态 -->
              <div class="flex items-center gap-6">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full animate-pulse"
                    :class="serviceStatus.adminOnline ? 'bg-green-500' : 'bg-red-500'"></div>
                  <span class="text-sm text-gray-300">
                    {{ serviceStatus.adminOnline ? '客服在线' : '暂无客服在线' }}
                  </span>
                </div>
              </div>
              <!-- 工具按钮 -->
              <div class="flex items-center gap-2">
                <button v-if="unreadCount > 0" @click="markAllMessagesAsRead"
                  class="px-4 py-2 text-sm font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95">
                  <i class="bi bi-check2-all"></i>
                  标记已读 ({{ unreadCount }})
                </button>
                <button @click="loadChatSessions"
                  class="px-4 py-2 text-sm font-medium border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95">
                  <i class="bi bi-arrow-clockwise"></i>
                  刷新
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 聊天工具栏 -->
    <section class="relative z-10">
      <div class="container mx-auto px-6 py-4">
        <div
          class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-fade-in-up">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <i class="bi bi-chat-dots text-cyan-400"></i>
                <span class="text-white font-medium">当前模式：</span>
                <span class="text-cyan-300">
                  {{ isAiChatMode ? 'AI智能助手模式' :
                    selectedSession ? `与 ${selectedSession.user_nickname || selectedSession.user_name || '用户'} 对话` :
                      '客服团队模式' }}
                </span>
              </div>
              <div v-if="selectedSession" class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span class="text-sm text-gray-400">用户对话中</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <i class="bi bi-people"></i>
                <span>会话: {{ sessions.length }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <i class="bi bi-chat-left-dots"></i>
                <span>消息: {{ messages.length }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full animate-pulse" :class="isConnected ? 'bg-green-500' : 'bg-red-500'">
                </div>
                <span class="text-xs text-gray-400">{{ isConnected ? '已连接' : '连接中...' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要内容区 -->
    <main class="container mx-auto px-6 py-8 relative z-10">
      <!-- 聊天主体 -->
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <!-- 会话列表 -->
        <div class="xl:col-span-1">
          <div
            class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-left h-[750px] flex flex-col">
            <!-- 会话列表头部 -->
            <div class="px-6 py-4 border-b border-gray-700/50 bg-gray-800/30">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                    <i class="bi bi-chat-left-text text-cyan-400"></i>
                    对话列表
                  </h3>
                  <p class="text-xs text-gray-400">
                    {{ sessions.length }} 个会话
                    <span v-if="isAiChatMode" class="text-cyan-400 ml-2">
                      · 已选中 AI装机助手
                    </span>
                    <span v-else-if="selectedSession" class="text-cyan-400 ml-2">
                      · 已选中 {{ selectedSession.user_nickname || selectedSession.user_name || `用户
                      #${selectedSession.user_id}` }}
                    </span>
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <!-- 返回客服模式按钮 -->
                  <button v-if="selectedSession || isAiChatMode" @click="backToCustomerService"
                    class="p-2 text-gray-400 hover:text-cyan-300 hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                    title="返回客服模式">
                    <i class="bi bi-arrow-left text-lg"></i>
                  </button>
                  <!-- 刷新按钮 -->
                  <button @click="loadChatSessions"
                    class="p-2 text-gray-400 hover:text-cyan-300 hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                    title="刷新列表">
                    <i class="bi bi-arrow-clockwise text-lg"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- 会话列表内容 -->
            <div class="flex-1 overflow-y-auto">
              <div v-if="sessions.length === 0"
                class="flex flex-col items-center justify-center h-full text-center p-8">
                <div
                  class="w-20 h-20 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-full flex items-center justify-center mb-6">
                  <i class="bi bi-chat-dots text-3xl text-gray-500"></i>
                </div>
                <h4 class="text-xl font-semibold text-white mb-3">暂无对话</h4>
                <p class="text-gray-400 text-sm leading-relaxed">等待用户开始对话<br>或从客服团队模式开始</p>
              </div>

              <div v-else class="p-4 space-y-3">
                <!-- AI聊天选项 - 固定在第一位 -->
                <div @click="selectAiChat"
                  class="relative p-4 rounded-xl cursor-pointer transition-all duration-300 group hover:scale-[1.01] animate-fade-in-up border border-transparent hover:border-gray-600/50"
                  :class="[
                    isAiChatMode
                      ? 'session-selected border-cyan-500/50'
                      : 'hover:bg-gray-800/30'
                  ]">
                  <!-- 选中状态指示器 -->
                  <div v-if="isAiChatMode"
                    class="absolute top-3 left-3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>

                  <!-- AI聊天信息 -->
                  <div class="flex items-center space-x-4">
                    <!-- AI头像 -->
                    <div class="relative flex-shrink-0">
                      <div class="w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg"
                        :class="isAiChatMode ? 'border-cyan-400/70 shadow-cyan-400/20' : 'border-gray-700/50'">
                        <div
                          class="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                          <i class="bi bi-robot text-white text-xl"></i>
                        </div>
                      </div>
                      <!-- 在线状态指示器 -->
                      <div
                        class="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                        <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                    </div>

                    <!-- AI聊天信息 -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between mb-2">
                        <h4 class="text-white font-semibold text-base truncate flex items-center gap-2">
                          AI装机助手
                          <span
                            class="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full border border-cyan-500/30">
                            AI
                          </span>
                        </h4>
                      </div>

                      <!-- 描述 -->
                      <div class="mb-2">
                        <p class="text-sm text-gray-400 truncate leading-relaxed">
                          专业的装机指导和硬件咨询服务
                        </p>
                      </div>

                      <!-- 状态信息 -->
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                          <span
                            class="text-xs px-2 py-1 rounded-lg font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                            智能助手
                          </span>
                        </div>

                        <!-- 在线状态 -->
                        <div class="flex items-center gap-1">
                          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span class="text-xs text-green-400">在线</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-for="(session, index) in sessions" :key="session.id" @click="selectSession(session)"
                  class="relative p-4 rounded-xl cursor-pointer transition-all duration-300 group hover:scale-[1.01] animate-fade-in-up border border-transparent hover:border-gray-600/50"
                  :class="[
                    selectedSession?.id === session.id
                      ? 'session-selected border-cyan-500/50'
                      : 'hover:bg-gray-800/30'
                  ]" :style="{ animationDelay: `${index * 50}ms` }">
                  <!-- 选中状态指示器 -->
                  <div v-if="selectedSession?.id === session.id"
                    class="absolute top-3 left-3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                  <!-- 未读消息指示器 -->
                  <div v-if="session.unread_count > 0"
                    class="absolute top-3 right-3 min-w-[20px] h-5 bg-red-500 rounded-full flex items-center justify-center px-1">
                    <span class="text-xs text-white font-semibold">{{ session.unread_count > 99 ? '99+' :
                      session.unread_count }}</span>
                  </div>

                  <!-- 用户信息 -->
                  <div class="flex items-center space-x-4">
                    <!-- 用户头像 -->
                    <div class="relative flex-shrink-0">
                      <div class="w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg"
                        :class="selectedSession?.id === session.id ? 'border-cyan-400/70 shadow-cyan-400/20' : 'border-gray-700/50'">
                        <img v-if="session.user_avatar" :src="session.user_avatar" :alt="session.user_nickname || '用户'"
                          class="w-full h-full object-cover" @error="$event.target.style.display = 'none'" />
                        <div v-else
                          class="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                          <i class="bi bi-person text-white text-xl"></i>
                        </div>
                      </div>
                      <!-- 在线状态指示器 -->
                      <div
                        class="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                        <div class="w-3 h-3 rounded-full"
                          :class="session.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-500'"></div>
                      </div>
                    </div>

                    <!-- 会话信息 -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between mb-2">
                        <h4 class="text-white font-semibold text-base truncate">
                          {{ session.user_nickname || session.user_name || `用户 #${session.user_id}` }}
                        </h4>
                        <span class="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {{ formatTime(session.last_message_time || session.started_at) }}
                        </span>
                      </div>

                      <!-- 最后消息 -->
                      <div class="mb-2">
                        <p class="text-sm text-gray-400 truncate leading-relaxed">
                          {{ session.last_message || '等待开始对话...' }}
                        </p>
                      </div>

                      <!-- 状态信息 -->
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                          <span class="text-xs px-2 py-1 rounded-lg font-medium"
                            :class="getSessionStatusClass(session.status)">
                            {{ getSessionStatusText(session.status) }}
                          </span>
                          <!-- 评分 -->
                          <div v-if="session.rating" class="flex items-center">
                            <div class="flex mr-1">
                              <i v-for="i in 5" :key="i"
                                :class="i <= session.rating ? 'text-yellow-400' : 'text-gray-600'"
                                class="bi bi-star-fill text-xs"></i>
                            </div>
                            <span class="text-xs text-gray-500">{{ session.rating }}.0</span>
                          </div>
                        </div>

                        <!-- 在线状态 -->
                        <div class="flex items-center gap-1">
                          <div class="w-2 h-2 rounded-full"
                            :class="session.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-500'"></div>
                          <span class="text-xs" :class="session.isOnline ? 'text-green-400' : 'text-gray-400'">
                            {{ session.isOnline ? '在线' : '离线' }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 主聊天区域 -->
        <div class="xl:col-span-3">
          <div
            class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-right h-[750px] flex flex-col">
            <!-- 聊天头部 -->
            <div class="px-6 py-4 border-b border-gray-700/50 bg-gray-800/30">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <!-- 聊天对象头像 -->
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border-2 shadow-lg transition-all duration-300"
                    :class="currentChatUser.isCustomerService ? 'border-cyan-500/50' : 'border-gray-600/50'">
                    <img v-if="currentChatUser.avatar" :src="currentChatUser.avatar" :alt="currentChatUser.name"
                      class="w-full h-full object-cover" @error="handleAvatarError" />
                    <div v-else class="w-full h-full flex items-center justify-center animate-pulse-gentle" :class="currentChatUser.isCustomerService
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      : currentChatUser.isAiChat
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600'">
                      <i class="text-white text-xl"
                        :class="currentChatUser.isCustomerService ? 'bi bi-headset' : currentChatUser.isAiChat ? 'bi bi-robot' : 'bi bi-person'"></i>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold text-white flex items-center gap-2">
                      {{ currentChatUser.name }}
                      <i v-if="currentChatUser.isCustomerService"
                        class="bi bi-patch-check-fill text-cyan-400 text-lg"></i>
                    </h3>
                    <p class="text-sm text-gray-400 flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full" :class="currentChatUser.isCustomerService
                      ? (isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-500')
                      : (currentChatUser.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-500')">
                    </div>
                    {{ currentChatUser.status }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <!-- 连接状态 -->
                  <div class="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-700/30">
                    <div class="w-2 h-2 rounded-full animate-pulse"
                      :class="isConnected ? 'bg-green-500' : 'bg-red-500'"></div>
                    <span class="text-xs text-gray-400 font-medium">{{ isConnected ? '已连接' : '连接中...' }}</span>
                  </div>
                  <!-- 功能按钮 -->
                  <div class="flex items-center gap-1">
                    <button
                      class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                      title="语音通话">
                      <i class="bi bi-telephone text-lg"></i>
                    </button>
                    <button
                      class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                      title="更多选项">
                      <i class="bi bi-three-dots text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 聊天消息区域 -->
            <div class="flex-1 overflow-y-auto p-6" ref="messagesContainer">
              <!-- 欢迎消息 -->
              <div v-if="messages.length === 0" class="text-center py-16">
                <div
                  class="w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <i class="bi bi-chat-heart text-4xl text-cyan-400"></i>
                </div>
                <h3 class="text-2xl font-bold text-white mb-3">
                  {{ isAiChatMode ? 'AI装机助手' :
                    selectedSession ? `与 ${selectedSession.user_nickname || selectedSession.user_name || `用户
                  #${selectedSession.user_id}`} 的对话` : '欢迎使用在线客服' }}
                </h3>
                <p class="text-gray-400 mb-8 text-lg leading-relaxed max-w-md mx-auto">
                  {{ isAiChatMode ? '您好！我是AI装机助手，专为您提供装机指导和硬件咨询服务。请告诉我您的需求，我会为您推荐最适合的配置方案。' :
                    selectedSession ? '您正在与该用户进行私人对话，可以实时交流解决问题' : '有任何问题都可以在这里与我们沟通，您也可以从左侧选择特定用户进行对话' }}
                </p>
                <div class="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                  <button v-for="(quickMsg, index) in quickMessages" :key="quickMsg" @click="sendQuickMessage(quickMsg)"
                    class="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl text-sm font-medium hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-in-up shadow-lg hover:shadow-cyan-400/20"
                    :style="{ animationDelay: `${index * 100}ms` }">
                    {{ quickMsg }}
                  </button>
                </div>
              </div>

              <!-- 系统提示 -->
              <div v-if="!serviceStatus.adminOnline && messages.length > 0" class="mb-6 animate-fade-in-up">
                <div
                  class="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 text-center transition-all duration-300 hover:bg-yellow-500/15 hover:border-yellow-400/50">
                  <i class="bi bi-info-circle text-yellow-400 mr-2 animate-pulse"></i>
                  <span class="text-yellow-300 text-sm">当前暂无客服在线，您可以留言，我们会尽快回复您。</span>
                </div>
              </div>

              <!-- 聊天消息列表 -->
              <div class="space-y-4">
                <TransitionGroup name="message" tag="div" class="space-y-4">
                  <div v-for="message in messages" :key="message.id || message.timestamp" class="flex"
                    :class="isCurrentUserMessage(message) ? 'justify-end' : 'justify-start'">

                    <!-- 其他人的消息 (左边) - 包括客服 -->
                    <div v-if="!isCurrentUserMessage(message)" class="flex items-start gap-3 max-w-[70%]">
                      <!-- 发送者头像 -->
                      <div
                        class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-600/30">
                        <img v-if="getMessageAvatar(message)" :src="getMessageAvatar(message)"
                          :alt="getMessageNickname(message)" class="w-full h-full object-cover"
                          @error="handleAvatarError" @load="handleAvatarLoad" />
                        <div v-else class="w-full h-full rounded-full flex items-center justify-center" :class="isCustomerServiceMessage(message)
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : message.isAiMessage
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                            : 'bg-gradient-to-r from-gray-500 to-gray-600'">
                          <i class="text-white text-sm" :class="isCustomerServiceMessage(message)
                            ? 'bi bi-person-badge'
                            : message.isAiMessage
                              ? 'bi bi-robot'
                              : 'bi bi-person'"></i>
                        </div>
                      </div>
                      <div>
                        <div class="bg-gray-700/50 border border-gray-600/30 rounded-2xl rounded-tl-sm p-3 text-white">

                          <!-- AI消息 - 使用分块Markdown渲染 -->
                          <div v-if="message.isAiMessage" class="ai-message-container">
                            <!-- 分块渲染模式（实时流式消息） -->
                            <template v-if="message.isChunked && message.chunks && message.chunks.length > 0">
                              <div v-for="chunk in message.chunks" 
                                   :key="chunk.id"
                                   class="markdown-body ai-message-content ai-chunk"
                                   :class="{ 'ai-chunk-animate': chunk.timestamp > Date.now() - 1000 }"
                                   v-html="chunk.rendered"></div>
                              <!-- 如果还在流式传输中，显示最新内容的预览 -->
                              <div v-if="message.isStreaming && aiMessageBuffer && message.chunks.length > 0"
                                   class="markdown-body ai-message-content ai-chunk ai-chunk-preview"
                                   v-html="renderMarkdown(getUnrenderedContent(message))"></div>
                            </template>
                            <!-- 历史消息渲染模式（使用预渲染内容） -->
                            <template v-else-if="message.renderedContent">
                              <div class="markdown-body ai-message-content ai-history-message"
                                   v-html="message.renderedContent" 
                                   ref="markdownContainer"></div>

                            </template>
                            <!-- 常规渲染模式（用于短内容或非流式） -->
                            <div v-else
                                 class="markdown-body ai-message-content"
                                 v-html="getAiMessageContent(message)"></div>
                          </div>
                          <!-- 普通消息 - 使用文本显示 -->
                          <template v-else>
                            {{ message.message || message.data?.message }}
                          </template>
                          <!-- 流式输入指示器 -->
                          <span v-if="message.isStreaming" class="inline-flex items-center ml-2">
                            <div class="flex gap-1">
                              <div class="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
                              <div class="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                              <div class="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                            </div>
                          </span>
                        </div>
                        <div class="flex items-center gap-2 mt-1 ml-1">
                          <span class="text-xs" :class="isCustomerServiceMessage(message)
                            ? 'text-green-400'
                            : message.isAiMessage
                              ? 'text-cyan-400'
                              : 'text-gray-400'">
                            {{ message.nickname || message.data?.nickname ||
                              (isCustomerServiceMessage(message) ? '客服' :
                                message.isAiMessage ? 'AI装机助手' : '用户') }}
                          </span>
                          <span class="text-xs text-gray-500">{{ formatTime(message.timestamp || message.created_at)
                          }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- 当前用户消息 (右边) -->
                    <div v-else class="flex items-start gap-3 max-w-[70%] flex-row-reverse">
                      <!-- 用户头像 -->
                      <div
                        class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-cyan-500/30">
                        <img v-if="getUserAvatar(message)" :src="getUserAvatar(message)" :alt="getUserNickname(message)"
                          class="w-full h-full object-cover" @error="handleAvatarError" @load="handleAvatarLoad" />
                        <div v-else
                          class="w-full h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
                          <i class="bi bi-person text-white text-sm"></i>
                        </div>
                      </div>
                      <div class="text-right">
                        <div
                          class="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl rounded-tr-sm p-3 text-white">
                          <!-- 当前用户消息永远不是AI消息，只显示普通文本 -->
                          {{ message.message || message.data?.message }}
                        </div>
                        <div class="flex items-center gap-2 mt-1 justify-end mr-1">
                          <span class="text-xs text-gray-500">{{ formatTime(message.timestamp || message.created_at)
                          }}</span>
                          <span class="text-xs text-cyan-400">
                            {{ getUserNickname(message) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </TransitionGroup>

                <!-- 正在输入提示 -->
                <div v-if="isTyping && typingUsers.size > 0" class="flex justify-start mt-4">
                  <div v-for="[userId, userInfo] in typingUsers" :key="userId"
                    class="flex items-start gap-3 max-w-[70%] animate-fade-in-up mb-2">
                    <!-- 用户头像 -->
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-600/30">
                      <img v-if="userInfo.avatar" :src="userInfo.avatar" :alt="userInfo.nickname"
                        class="w-full h-full object-cover" @error="$event.target.style.display = 'none'" />
                      <div v-else
                        class="w-full h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse-gentle">
                        <i class="bi bi-person-badge text-white text-sm"></i>
                      </div>
                    </div>

                    <div>
                      <div class="bg-gray-700/50 border border-gray-600/30 rounded-2xl rounded-tl-sm p-3">
                        <div class="flex gap-1">
                          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s">
                          </div>
                          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s">
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center gap-2 mt-1 ml-1">
                        <span class="text-xs text-green-400">{{ userInfo.nickname }}</span>
                        <span class="text-xs text-gray-500">正在输入...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 聊天输入区域 -->
            <div class="px-6 py-4 border-t border-gray-700/50 bg-gray-800/20">
              <!-- 工具按钮组 -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <button
                    class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                    title="附件">
                    <i class="bi bi-paperclip text-lg"></i>
                  </button>
                  <button
                    class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                    title="表情">
                    <i class="bi bi-emoji-smile text-lg"></i>
                  </button>
                </div>

                <!-- 输入提示工具栏 -->
                <div class="flex items-center gap-3">
                  <span class="text-xs text-gray-500 flex items-center gap-1">
                    <i class="bi bi-keyboard"></i>
                    Enter 发送，Shift+Enter 换行
                  </span>
                  <div v-if="newMessage.length > 0" class="text-xs text-gray-500">
                    {{ newMessage.length }} 字符
                  </div>
                  <button v-if="unreadCount > 0" @click="markAllMessagesAsRead"
                    class="text-xs text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-105 active:scale-95 px-3 py-1 rounded-lg hover:bg-cyan-500/10 border border-cyan-500/20">
                    <i class="bi bi-check2-all mr-1"></i>
                    标记已读 ({{ unreadCount }})
                  </button>
                </div>
              </div>

                              <!-- 输入框和发送按钮 -->
                <div class="flex items-end gap-3">
                  <!-- 输入框区域 -->
                  <div class="flex-1 relative">
                    <textarea v-model="newMessage" @keydown.enter.exact.prevent="sendMessage"
                      @input="adjustTextareaHeight" @focus="handleInputFocus" @blur="handleInputBlur"
                      :disabled="!isConnected || isAiTyping" 
                      :placeholder="isAiTyping ? 'AI正在回复中...' : (isAiChatMode ? '向AI装机助手提问... (Enter 发送，Shift+Enter 换行)' : '输入您的消息... (Enter 发送，Shift+Enter 换行)')" 
                      rows="1"
                      class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white placeholder-gray-400 transition-all duration-300 resize-none hover:border-cyan-500/50 focus:scale-[1.01] min-h-[48px] max-h-32 hide-scrollbar"
                      :class="{ 'opacity-50 cursor-not-allowed': isAiTyping }"></textarea>
                  <!-- 输入状态指示 -->
                  <div v-if="isInputFocused"
                    class="absolute -top-6 left-2 text-xs text-cyan-400 bg-gray-800/80 px-2 py-1 rounded-lg">
                    正在输入...
                  </div>
                </div>

                                  <!-- 发送按钮 -->
                  <button @click="sendMessage" :disabled="!newMessage.trim() || !isConnected || isAiTyping"
                    class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:shadow-none flex items-center gap-2 hover:scale-105 active:scale-95 min-h-[48px] flex-shrink-0">
                    <i v-if="!isAiTyping" class="bi bi-send text-lg"></i>
                    <i v-else class="bi bi-hourglass-split text-lg animate-spin"></i>
                    <span class="hidden sm:inline">{{ isAiTyping ? '回复中' : '发送' }}</span>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useUserStore } from '~/stores/user'
import { ChatApi } from '~/utils/api/chat'
import { AiChatApi } from '~/utils/api/aiChat'
import { marked } from 'marked'
// import 'github-markdown-css/github-markdown-light.css' // 暂时注释掉，可能冲突

// 获取运行时配置
const config = useRuntimeConfig()

// 配置 marked
marked.setOptions({
  breaks: true, // 支持换行符转换为 <br>
  gfm: true, // 启用 GitHub Flavored Markdown
  sanitize: false // 允许HTML（谨慎使用）
})

// 基础Markdown渲染函数
const renderMarkdown = (text) => {
  if (!text) return ''
  try {
    const result = marked(text)
    return result
  } catch (error) {
    console.error('❌ Markdown渲染失败:', error)
    return text // 出错时返回原文本
  }
}

// 增量处理AI消息chunk
const processIncrementalChunk = (newChunk, messageIndex) => {
  // 将新chunk添加到缓冲区
  aiMessageBuffer.value += newChunk
  
  // 节流更新渲染
  if (renderThrottleTimer) {
    clearTimeout(renderThrottleTimer)
  }
  
  renderThrottleTimer = setTimeout(() => {
    throttledRenderAiMessage(messageIndex)
  }, RENDER_THROTTLE_DELAY)
}

// 节流渲染AI消息
const throttledRenderAiMessage = (messageIndex) => {
  const fullText = aiMessageBuffer.value
  
  // 将内容分块处理
  const newChunks = splitIntoRenderChunks(fullText)
  
  // 检查是否有新内容需要渲染
  if (newChunks.length > aiMessageChunks.value.length) {
    // 只渲染新增的块
    const chunksToAdd = newChunks.slice(aiMessageChunks.value.length)
    const maxNewChunks = Math.min(chunksToAdd.length, MAX_CHUNKS_PER_UPDATE)
    
    for (let i = 0; i < maxNewChunks; i++) {
      const chunk = chunksToAdd[i]
      const renderedChunk = renderMarkdown(chunk)
      aiMessageChunks.value.push({
        id: aiMessageChunks.value.length,
        content: chunk,
        rendered: renderedChunk,
        timestamp: Date.now()
      })
    }
    
    // 更新消息对象
    if (messageIndex >= 0 && messages.value[messageIndex]) {
      messages.value[messageIndex].message = fullText
      messages.value[messageIndex].chunks = aiMessageChunks.value
      messages.value[messageIndex].isChunked = true
    }
    
    console.log('🚀 增量渲染:', {
      新增块数: maxNewChunks,
      总块数: aiMessageChunks.value.length,
      总内容长度: fullText.length
    })
  }
}

// 将文本分割成渲染块
const splitIntoRenderChunks = (text) => {
  if (!text) return []
  
  const chunks = []
  let currentChunk = ''
  let inCodeBlock = false
  let inListItem = false
  
  const lines = text.split('\n')
  
  for (const line of lines) {
    // 检测代码块
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
    }
    
    // 检测列表项
    if (line.trim().match(/^[\-\*\+]\s/) || line.trim().match(/^\d+\.\s/)) {
      inListItem = true
    } else if (line.trim() === '' && inListItem) {
      inListItem = false
    }
    
    currentChunk += line + '\n'
    
    // 决定是否应该分块
    const shouldSplit = 
      currentChunk.length >= CHUNK_SIZE && 
      !inCodeBlock && 
      !inListItem &&
      (line.trim() === '' || line.trim().endsWith('.') || line.trim().endsWith('！') || line.trim().endsWith('？'))
    
    if (shouldSplit) {
      chunks.push(currentChunk.trim())
      currentChunk = ''
    }
  }
  
  // 添加剩余内容
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }
  
  return chunks
}

// 重置AI消息状态
const resetAiMessageState = () => {
  aiMessageChunks.value = []
  aiMessageBuffer.value = ''
  if (renderThrottleTimer) {
    clearTimeout(renderThrottleTimer)
    renderThrottleTimer = null
  }
}

// 获取AI消息的完整渲染内容
const getAiMessageContent = (message) => {
  if (message.isChunked && message.chunks) {
    return message.chunks.map(chunk => chunk.rendered).join('')
  }
  return renderMarkdown(message.message || message.data?.message)
}

// 获取未渲染的内容（用于流式传输预览）
const getUnrenderedContent = (message) => {
  if (!message.chunks || message.chunks.length === 0) {
    return aiMessageBuffer.value
  }
  
  const renderedLength = message.chunks.reduce((total, chunk) => total + chunk.content.length, 0)
  const remainingContent = aiMessageBuffer.value.substring(renderedLength)
  
  // 只显示最后几十个字符的预览，避免重复渲染
  return remainingContent.substring(Math.max(0, remainingContent.length - 100))
}

// 状态管理
const userStore = useUserStore()
const isConnected = ref(false)
const isTyping = ref(false)
const typingUsers = ref(new Map()) // 存储正在输入的用户，格式：userId -> { nickname, avatar, timestamp }
const unreadCount = ref(0)
const newMessage = ref('')
const messages = ref([])
const sessions = ref([])
const messagesContainer = ref()
const selectedSession = ref(null) // 当前选中的会话
const isAiChatMode = ref(false) // 是否为AI聊天模式
const currentAiSessionId = ref(null) // 当前AI聊天会话ID
const isAiTyping = ref(false) // AI是否正在输入
const currentStreamingMessage = ref('') // 当前流式消息内容
const aiChatCallbacks = ref(null) // AI聊天WebSocket回调引用

// AI消息渲染优化相关
const aiMessageChunks = ref([]) // AI消息分块存储
const aiMessageBuffer = ref('') // AI消息缓冲区
let renderThrottleTimer = null // 渲染节流定时器
const RENDER_THROTTLE_DELAY = 100 // 渲染节流延迟(ms)
const CHUNK_SIZE = 500 // 每个渲染块的字符大小
const MAX_CHUNKS_PER_UPDATE = 3 // 每次更新最大块数

// 服务状态
const serviceStatus = ref({
  adminOnline: false,
  adminCount: 0,
  totalUsers: 0,
  normalUserCount: 0
})

// WebSocket连接
let websocket = null
let heartbeatTimer = null

// 快速消息
const quickMessages = computed(() => {
  if (isAiChatMode.value) {
    return [
      '我想装一台游戏电脑',
      '帮我推荐办公电脑配置',
      '预算5000元的配置方案',
      '什么CPU性价比最高？',
      '如何选择显卡？'
    ]
  }
  return [
    '你好，请问有什么可以帮助您的？',
    '我想了解产品信息',
    '订单相关问题',
    '技术支持'
  ]
})

// 计算属性
const isLoggedIn = computed(() => userStore.isLoggedIn)

// 当前聊天对象信息
const currentChatUser = computed(() => {
  if (isAiChatMode.value) {
    return {
      name: 'AI装机助手',
      avatar: null,
      status: '在线 - AI智能回复',
      isCustomerService: false,
      isAiChat: true,
      userId: 'ai_assistant',
      sessionId: currentAiSessionId.value
    }
  }

  if (!selectedSession.value) {
    return {
      name: 'xlCig 客服团队',
      avatar: null,
      status: serviceStatus.value.adminOnline ? '在线 - 平均响应时间 < 1分钟' : '离线 - 我们会尽快回复您的消息',
      isCustomerService: true
    }
  }

  return {
    name: selectedSession.value.displayName || selectedSession.value.user_nickname || selectedSession.value.user_name || `用户 #${selectedSession.value.user_id}`,
    avatar: selectedSession.value.avatar || selectedSession.value.user_avatar,
    status: selectedSession.value.isOnline ? '在线 - 用户对话' : '离线 - 用户对话',
    isCustomerService: false,
    isOnline: selectedSession.value.isOnline,
    userId: selectedSession.value.user_id,
    sessionId: selectedSession.value.id
  }
})

// 页面元数据
useHead({
  title: '在线客服 - xlCig',
  meta: [
    { name: 'description', content: '专业的在线客服服务，为您提供实时帮助和支持' }
  ]
})

// WebSocket连接
const connectWebSocket = () => {
  if (!isLoggedIn.value || !userStore.token) {
    console.error('用户未登录，无法连接WebSocket')
    return
  }

  try {
    //const wsUrl = `wss://api.xlcig.cn/websocket?token=${userStore.token}`
    const wsUrl = `ws://192.168.11.194:9999/websocket?token=${userStore.token}`
    console.log('正在连接WebSocket:', wsUrl)
    websocket = new WebSocket(wsUrl)
    websocket.onopen = () => {
      console.log('WebSocket连接成功')
      isConnected.value = true
      startHeartbeat()
      // 连接成功后，请求获取当前所有用户的在线状态
      setTimeout(() => {
        if (websocket && websocket.readyState === WebSocket.OPEN) {
          websocket.send(JSON.stringify({
            type: 'get_users_status',
            data: {}
          }))
          console.log('已请求获取用户在线状态')
        }
      }, 1000)
    }

    websocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        handleWebSocketMessage(message)
      } catch (error) {
        console.error('解析WebSocket消息失败:', error)
      }
    }

    websocket.onclose = () => {
      console.log('WebSocket连接关闭')
      isConnected.value = false
      stopHeartbeat()

      // 自动重连
      setTimeout(() => {
        console.log('尝试重新连接WebSocket...')
        connectWebSocket()
      }, 3000)
    }

    websocket.onerror = (error) => {
      console.error('WebSocket连接错误:', error)
      isConnected.value = false
    }

  } catch (error) {
    console.error('创建WebSocket连接失败:', error)
  }
}

const disconnectWebSocket = () => {
  if (websocket) {
    websocket.close()
    websocket = null
  }
  stopHeartbeat()
  isConnected.value = false
}

// 心跳机制
const startHeartbeat = () => {
  heartbeatTimer = setInterval(() => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify({ type: 'ping' }))
    }
  }, 30000)
}

const stopHeartbeat = () => {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer)
    heartbeatTimer = null
  }
}

// 处理WebSocket消息
const handleWebSocketMessage = (message) => {
  console.log('收到WebSocket消息:', message)

  switch (message.type) {
    case 'user_info':
      console.log('用户信息:', message.data)
      unreadCount.value = message.data.unreadCount || 0
      if (message.data.stats) {
        serviceStatus.value = message.data.stats
      }
      break

    case 'message':
      // 确保包含头像和昵称信息，并正确识别消息类型
      const isCustomerServiceMsg = message.isAdmin || message.data?.isAdmin || message.data?.isCustomerService || message.data?.role === 'admin' || message.data?.role === 'customer_service'

      const messageWithUserInfo = {
        ...message,
        user_id: message.user_id || message.data?.user_id || message.data?.userId,
        avatar: message.avatar || message.data?.avatar,
        nickname: message.nickname || message.data?.nickname || message.data?.userName,
        userName: message.userName || message.data?.userName,
        // 检查是否为客服消息
        isAdmin: isCustomerServiceMsg,
        message_type: message.message_type || (isCustomerServiceMsg ? 'customer_service' : 'user'),
        // 对于客服消息，添加发送者ID信息
        ...(isCustomerServiceMsg && {
          senderId: message.data?.userId || message.userId || message.data?.senderId,
          data: {
            ...message.data,
            userId: message.data?.userId || message.userId,
            senderId: message.data?.senderId || message.data?.userId
          }
        })
      }

      console.log('处理后的消息:', messageWithUserInfo)

      // 如果选中了特定用户，只显示该用户相关的消息
      if (selectedSession.value) {
        const messageUserId = messageWithUserInfo.user_id || messageWithUserInfo.data?.targetUserId
        if (messageUserId === selectedSession.value.user_id) {
          messages.value.push(messageWithUserInfo)
          scrollToBottom()
        } else {
          console.log('消息不属于当前选中用户，不显示:', messageUserId, '当前用户:', selectedSession.value.user_id)
        }
      } else {
        // 未选中特定用户，显示所有消息（默认客服模式）
        messages.value.push(messageWithUserInfo)
        scrollToBottom()
      }

      // 当收到新消息时自动标记为已读
      nextTick(() => {
        autoMarkAsRead()
      })

      // 更新会话列表中的未读数量和最后消息
      if (messageWithUserInfo.user_id) {
        updateSessionList(messageWithUserInfo)
      }
      break

    case 'typing':
      console.log('收到输入状态消息:', message.data)
      handleTypingMessage(message.data, true)
      break

    case 'stop_typing':
      console.log('收到停止输入消息:', message.data)
      handleTypingMessage(message.data, false)
      break

    case 'message_read':
      unreadCount.value = message.data.unreadCount || 0
      break

    case 'user_online':
      console.log('用户上线:', message.data)
      updateUserOnlineStatus(message.data.userId || message.data.user_id, true, message.data)
      break

    case 'user_offline':
      console.log('用户下线:', message.data)
      updateUserOnlineStatus(message.data.userId || message.data.user_id, false, message.data)
      break

    case 'user_status_update':
      console.log('用户状态更新:', message.data)
      if (message.data && (message.data.userId || message.data.user_id)) {
        const isOnline = message.data.isOnline !== undefined ? message.data.isOnline : true
        updateUserOnlineStatus(message.data.userId || message.data.user_id, isOnline, message.data)
      }
      break

    case 'users_status_response':
      console.log('收到用户状态列表:', message.data)
      if (message.data && Array.isArray(message.data.users)) {
        message.data.users.forEach(user => {
          updateUserOnlineStatus(user.userId || user.user_id, user.isOnline, user)
        })
      }
      break

    case 'error':
      console.error('WebSocket错误:', message.data)
      break

    // AI聊天相关消息
    case 'ai_chat_start':
      console.log('AI聊天开始:', message.data)
      if (aiChatCallbacks.value && aiChatCallbacks.value.onStart) {
        aiChatCallbacks.value.onStart({
          type: 'start',
          sessionId: message.sessionId,
          userMessage: message.data.userMessage,
          timestamp: message.data.timestamp
        })
      }
      break

    case 'ai_chat_progress':
      console.log('AI聊天进度:', message.data)
      if (aiChatCallbacks.value && aiChatCallbacks.value.onProgress) {
        aiChatCallbacks.value.onProgress({
          type: 'progress',
          message: message.data.message,
          timestamp: message.data.timestamp
        })
      }
      break

    case 'ai_chat_chunk':
      console.log('AI聊天内容块:', message.data)
      if (aiChatCallbacks.value && aiChatCallbacks.value.onChunk) {
        aiChatCallbacks.value.onChunk({
          type: 'chunk',
          content: message.data.content,
          fullResponse: message.data.fullResponse,
          chunkIndex: message.data.chunkIndex,
          timestamp: message.data.timestamp
        })
      }
      break

    case 'ai_chat_done':
      console.log('AI聊天完成:', message.data)
      if (aiChatCallbacks.value && aiChatCallbacks.value.onDone) {
        aiChatCallbacks.value.onDone({
          type: 'done',
          fullResponse: message.data.fullResponse,
          chunkCount: message.data.chunkCount,
          timestamp: message.data.timestamp
        })
      }
      break

    case 'ai_chat_saved':
      console.log('AI聊天已保存:', message.data)
      if (aiChatCallbacks.value && aiChatCallbacks.value.onSaved) {
        aiChatCallbacks.value.onSaved({
          type: 'saved',
          message: message.data.message,
          timestamp: message.data.timestamp
        })
      }
      break

    case 'ai_chat_error':
      console.error('AI聊天错误:', message.data)
      if (aiChatCallbacks.value && aiChatCallbacks.value.onError) {
        aiChatCallbacks.value.onError({
          type: 'error',
          message: message.data.message,
          error: message.data.error,
          timestamp: message.data.timestamp
        })
      }
      break

    case 'ai_chat_end':
      console.log('AI聊天结束:', message.data)
      if (aiChatCallbacks.value && aiChatCallbacks.value.onEnd) {
        aiChatCallbacks.value.onEnd()
      }
      // 清除回调引用
      aiChatCallbacks.value = null
      break
  }
}

// 清除所有typing状态
const clearTypingStates = () => {
  typingUsers.value.clear()
  isTyping.value = false
  console.log('已清除所有typing状态')
}

// 处理输入状态消息
const handleTypingMessage = (data, isTyping) => {
  const userId = data.userId || data.user_id || data.senderId
  const targetUserId = data.targetUserId || data.target_user_id

  console.log('处理输入状态:', { userId, targetUserId, isTyping, currentSession: selectedSession.value?.user_id })

  // 如果是在特定用户对话模式下
  if (selectedSession.value) {
    // 只有当前选中用户或者目标用户是当前选中用户时，才显示typing状态
    const isCurrentSessionUser = userId === selectedSession.value.user_id || targetUserId === selectedSession.value.user_id

    if (isCurrentSessionUser) {
      if (isTyping) {
        // 添加/更新正在输入的用户
        typingUsers.value.set(userId, {
          nickname: data.nickname || data.userName || '用户',
          avatar: data.avatar,
          timestamp: Date.now()
        })
        isTyping.value = true
        console.log(`用户 ${userId} 开始输入`)
      } else {
        // 移除正在输入的用户
        typingUsers.value.delete(userId)
        isTyping.value = typingUsers.value.size > 0
        console.log(`用户 ${userId} 停止输入`)
      }
    }
  } else {
    // 客服团队模式下，显示所有输入状态
    if (isTyping) {
      typingUsers.value.set(userId, {
        nickname: data.nickname || data.userName || '用户',
        avatar: data.avatar,
        timestamp: Date.now()
      })
      isTyping.value = true
      console.log(`用户 ${userId} 开始输入（团队模式）`)
    } else {
      typingUsers.value.delete(userId)
      isTyping.value = typingUsers.value.size > 0
      console.log(`用户 ${userId} 停止输入（团队模式）`)
    }
  }
}

// 更新用户在线状态
const updateUserOnlineStatus = (userId, isOnline, userData = {}) => {
  if (!userId) return

  console.log(`更新用户 ${userId} 在线状态:`, isOnline, userData)

  // 更新会话列表中的用户状态
  const sessionIndex = sessions.value.findIndex(session => session.user_id === userId)
  if (sessionIndex >= 0) {
    const session = sessions.value[sessionIndex]
    const previousStatus = session.isOnline

    // 更新在线状态
    session.isOnline = isOnline

    // 如果有新的用户数据，更新相关信息
    if (userData.userName && userData.userName !== session.user_name) {
      session.user_name = userData.userName
      session.displayName = userData.userName
    }
    if (userData.nickname && userData.nickname !== session.user_nickname) {
      session.user_nickname = userData.nickname
      session.displayName = userData.nickname
    }
    if (userData.avatar && userData.avatar !== session.avatar) {
      session.avatar = userData.avatar
      session.user_avatar = userData.avatar
    }

    // 状态变化提示
    if (previousStatus !== isOnline) {
      const userName = session.displayName || session.user_nickname || session.user_name || `用户 #${userId}`
      console.log(`📱 ${userName} ${isOnline ? '🟢 上线了' : '🔴 下线了'}`)

      // 可以在这里添加Toast提示或其他视觉反馈
      // 例如：showToast(`${userName} ${isOnline ? '上线了' : '下线了'}`)
    }

    console.log(`会话列表中用户 ${userId} 状态已更新:`, session)
  } else {
    // 如果会话列表中没有这个用户，且用户上线了，可以考虑重新加载会话列表
    if (isOnline) {
      console.log(`新用户 ${userId} 上线，重新加载会话列表`)
      loadChatSessions()
    }
  }

  // 如果当前选中的用户状态发生变化，触发计算属性更新
  if (selectedSession.value && selectedSession.value.user_id === userId) {
    selectedSession.value.isOnline = isOnline

    // 更新选中用户的其他信息
    if (userData.userName) selectedSession.value.user_name = userData.userName
    if (userData.nickname) selectedSession.value.user_nickname = userData.nickname
    if (userData.avatar) {
      selectedSession.value.avatar = userData.avatar
      selectedSession.value.user_avatar = userData.avatar
    }

    console.log(`当前选中用户 ${userId} 状态已更新`, selectedSession.value)
  }
}

// 自动调整textarea高度
const adjustTextareaHeight = (event) => {
  const textarea = event.target
  textarea.style.height = 'auto'
  textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px' // 最大高度128px
}

// 发送流式AI消息
const sendStreamMessage = async (messageText) => {
  try {
    // 立即添加用户消息到界面
    const userMessage = {
      id: Date.now(),
      user_id: userStore.user?.id,
      message: messageText,
      message_type: 'user',
      created_at: new Date().toISOString(),
      nickname: userStore.user?.nickname || userStore.userDisplayName,
      avatar: userStore.user?.avatar,
      isAdmin: false
    }
    messages.value.push(userMessage)
    
    // 重置AI消息状态
    resetAiMessageState()
    
    // 创建一个临时的AI消息用于显示流式内容
    const tempAiMessage = {
      id: Date.now() + 1,
      user_id: 'ai_assistant',
      message: '',
      message_type: 'assistant',
      created_at: new Date().toISOString(),
      nickname: 'AI装机助手',
      avatar: null,
      isAdmin: false,
      isAiMessage: true,
      isStreaming: true,
      isChunked: false,
      chunks: []
    }
    messages.value.push(tempAiMessage)
    
    // 滚动到底部
    scrollToBottom()
    
    // 设置AI正在输入状态
    isAiTyping.value = true
    currentStreamingMessage.value = ''
    
    let fullResponse = ''
    
    // 检查token状态
    console.log('当前用户token:', userStore.token ? `${userStore.token.substring(0, 10)}...` : 'null')
    console.log('localStorage token:', localStorage.getItem('authToken') ? `${localStorage.getItem('authToken').substring(0, 10)}...` : 'null')
    
    // 定义回调函数
    const callbacks = {
      onStart: (data) => {
        console.log('🚀 AI开始响应:', data)
        if (!currentAiSessionId.value && data.sessionId) {
          currentAiSessionId.value = data.sessionId
        }
      },
      
      onConnected: (data) => {
        console.log('✅ AI服务连接成功:', data.message)
      },
      
      onProgress: (data) => {
        console.log('⏳ 进度:', data.message)
      },
      
      onRetry: (data) => {
        console.log('🔄 重试中:', data.message)
      },
      
      onChunk: (data) => {
        if (data.content) {
          const tempMessageIndex = messages.value.length - 1
          
          // 使用增量处理而不是累积全部内容
          processIncrementalChunk(data.content, tempMessageIndex)
          
          // 更新流式消息状态
          currentStreamingMessage.value = aiMessageBuffer.value
          
          // 节流滚动到底部
          nextTick(() => {
            scrollToBottom()
          })
        }
      },
      
      onDone: (data) => {
        console.log('✅ AI响应完成:', data)
        isAiTyping.value = false
        
        // 确保处理完所有剩余内容
        const finalMessageIndex = messages.value.length - 1
        if (finalMessageIndex >= 0) {
          // 强制处理所有剩余的缓冲区内容
          if (renderThrottleTimer) {
            clearTimeout(renderThrottleTimer)
            throttledRenderAiMessage(finalMessageIndex)
          }
          
          // 更新最终消息状态
          const finalMessage = messages.value[finalMessageIndex]
          finalMessage.isStreaming = false
          finalMessage.message = aiMessageBuffer.value || data.fullResponse || finalMessage.message
          
          console.log('🎯 AI响应最终完成:', {
            总块数: aiMessageChunks.value.length,
            总长度: aiMessageBuffer.value.length,
            是否分块: finalMessage.isChunked
          })
        }
      },
      
      onSaved: (data) => {
        console.log('💾 对话已保存:', data.message)
      },
      
      onError: (data) => {
        console.error('❌ AI响应错误:', data)
        isAiTyping.value = false
        
        // 更新错误消息
        const errorMessageIndex = messages.value.length - 1
        if (errorMessageIndex >= 0) {
          messages.value[errorMessageIndex].message = data.message || '抱歉，处理您的请求时出现了错误'
          messages.value[errorMessageIndex].isStreaming = false
        }
      },
      
      onEnd: () => {
        console.log('🏁 流式连接结束')
        isAiTyping.value = false
      }
    }
    
    // 存储回调引用，供WebSocket消息处理使用
    aiChatCallbacks.value = callbacks
    
    // 使用新的API方法发送流式消息
    await AiChatApi.sendStreamMessage(
      messageText,
      currentAiSessionId.value,
      callbacks,
      userStore.token // 显式传递token
    )
    
  } catch (error) {
    console.error('流式AI聊天错误:', error)
    isAiTyping.value = false
    
    // 根据错误类型显示不同的错误信息
    let errorMessage = '抱歉，AI服务暂时不可用，请稍后重试';
    if (error.message) {
      if (error.message.includes('无效的授权令牌')) {
        errorMessage = '登录已过期，请重新登录';
        // 可以在这里添加跳转到登录页的逻辑
      } else if (error.message.includes('未登录')) {
        errorMessage = '请先登录后再使用AI聊天功能';
      } else {
        errorMessage = error.message;
      }
    }
    
    // 更新错误消息
    const errorMessageIndex = messages.value.length - 1
    if (errorMessageIndex >= 0) {
      messages.value[errorMessageIndex].message = errorMessage
      messages.value[errorMessageIndex].isStreaming = false
    }
  }
}

// 发送消息
const sendMessage = async () => {
  if (!newMessage.value.trim()) {
    return
  }

  const messageText = newMessage.value.trim()

  try {
    if (isAiChatMode.value) {
      // AI聊天模式 - 使用流式响应
      console.log('向AI发送流式消息:', messageText)
      newMessage.value = '' // 立即清空输入框
      await sendStreamMessage(messageText)
      return
    } else if (selectedSession.value) {
      // 用户对话模式 - 使用传统API
             const response = await ChatApi.sendMessage(messageText, selectedSession.value.user_id)

      if (response.success) {
        // 添加消息到本地显示（客服发送的消息）
        const adminMessage = {
          id: Date.now(),
          user_id: selectedSession.value.user_id, // 消息归属于目标用户（数据库存储）
          senderId: userStore.user?.id, // 发送者ID（用于UI判断）
          message: messageText,
          message_type: 'customer_service',
          isAdmin: true,
          avatar: userStore.user?.avatar,
          nickname: userStore.userDisplayName,
          userName: userStore.userDisplayName,
          timestamp: Date.now(),
          created_at: new Date().toISOString(),
          data: {
            userId: userStore.user?.id, // 确保data中也有发送者ID
            userName: userStore.userDisplayName,
            isAdmin: true
          }
        }

        messages.value.push(adminMessage)
        console.log('消息发送成功，已添加到本地显示')
      }
    } else {
      // 默认客服模式，通过WebSocket发送
      if (!isConnected.value || !websocket) {
        console.error('WebSocket未连接')
        return
      }

      const message = {
        type: 'message',
        data: {
          message: messageText,
          user_id: userStore.user?.id,
          userId: userStore.user?.id
        }
      }

      websocket.send(JSON.stringify(message))

      // 添加到本地消息列表
      const userAvatar = userStore.user?.avatar
      messages.value.push({
        ...message,
        data: {
          ...message.data,
          userId: userStore.user?.id,
          userName: userStore.userDisplayName,
          isAdmin: false,
          avatar: userAvatar
        },
        user_id: userStore.user?.id,
        timestamp: Date.now(),
        isAdmin: false,
        message_type: 'user',
        avatar: userAvatar,
        nickname: userStore.user?.nickname || userStore.userDisplayName,
        userName: userStore.userDisplayName
      })
    }

    newMessage.value = ''

    // 重置textarea高度
    nextTick(() => {
      const textarea = document.querySelector('textarea')
      if (textarea) {
        textarea.style.height = '48px'
      }
    })

    scrollToBottom()

    // 发送消息后停止输入状态
    sendStopTyping()

  } catch (error) {
    console.error('发送消息失败:', error)
  }
}

// 发送快速消息
const sendQuickMessage = (message) => {
  newMessage.value = message
  sendMessage()
}

// 输入框焦点状态管理
const isInputFocused = ref(false)

// 处理输入框获得焦点
const handleInputFocus = () => {
  console.log('输入框获得焦点')
  isInputFocused.value = true

  // 发送正在输入状态（节流发送）
  if (!isConnected.value || !websocket) return

  try {
    websocket.send(JSON.stringify({
      type: 'typing',
      data: {
        userId: userStore.user?.id,
        userName: userStore.userDisplayName,
        nickname: userStore.user?.nickname || userStore.userDisplayName,
        avatar: userStore.user?.avatar,
        targetUserId: selectedSession.value?.user_id,
        chatMode: selectedSession.value ? 'user_conversation' : 'customer_service',
        isAdmin: userStore.user?.role === 'admin',
        isCustomerService: userStore.user?.role === 'admin' || userStore.user?.role === 'customer_service'
      }
    }))
  } catch (error) {
    console.error('发送输入状态失败:', error)
  }
}

// 处理输入框失去焦点
const handleInputBlur = () => {
  console.log('输入框失去焦点')
  isInputFocused.value = false

  // 延迟发送停止输入状态，避免快速焦点切换导致的闪烁
  setTimeout(() => {
    if (!isInputFocused.value) {
      sendStopTyping()
    }
  }, 500)
}

const sendStopTyping = () => {
  if (!isConnected.value || !websocket) return

  try {
    websocket.send(JSON.stringify({
      type: 'stop_typing',
      data: {
        userId: userStore.user?.id,
        userName: userStore.userDisplayName,
        nickname: userStore.user?.nickname || userStore.userDisplayName,
        avatar: userStore.user?.avatar,
        targetUserId: selectedSession.value?.user_id,
        chatMode: selectedSession.value ? 'user_conversation' : 'customer_service',
        isAdmin: userStore.user?.role === 'admin',
        isCustomerService: userStore.user?.role === 'admin' || userStore.user?.role === 'customer_service'
      }
    }))
  } catch (error) {
    console.error('发送停止输入状态失败:', error)
  }
}

// 加载数据
const loadChatHistory = async () => {
  try {
    const response = await ChatApi.getChatHistory({ limit: 50 })
    if (response.success && response.data) {
      messages.value = response.data.map(msg => {
        console.log('历史消息:', msg)

        // 判断是否为客服消息的逻辑
        const isCustomerService = msg.message_type === 'customer_service' ||
          msg.role === 'admin' ||
          msg.role === 'customer_service'

        const processedMsg = {
          ...msg,
          user_id: msg.user_id || msg.id, // 确保有user_id
          isAdmin: isCustomerService,
          avatar: msg.avatar || msg.user_avatar, // 优先使用消息头像，再使用用户头像
          nickname: msg.nickname || msg.user_nickname || msg.username,
          userName: msg.nickname || msg.user_nickname || msg.username,
          message_type: isCustomerService ? 'customer_service' : 'user'
        }

        console.log('处理后的历史消息:', processedMsg, {
          isCustomerService,
          userId: msg.user_id,
          currentUserId: userStore.user?.id,
          isCurrentUser: msg.user_id === userStore.user?.id
        })

        return processedMsg
      })
      console.log('所有处理后的历史消息:', messages.value)
      scrollToBottom()
    }
  } catch (error) {
    console.error('加载聊天历史失败:', error)
  }
}

const loadChatSessions = async () => {
  try {
    const response = await ChatApi.getUserSessions({ limit: 20 })
    if (response.success && response.data) {
      sessions.value = response.data.map(session => {
        console.log('原始用户会话数据:', session)
        const processedSession = {
          ...session,
          id: session.user_id, // 使用user_id作为会话ID
          user_avatar: session.avatar,
          user_nickname: session.nickname,
          user_name: session.nickname || session.username,
          unread_count: session.unread_count || 0,
          last_message: session.last_message,
          last_message_time: session.last_message_time,
          last_message_type: session.last_message_type,
          isOnline: session.isOnline || false, // 在线状态
          displayName: session.displayName || session.nickname || session.username, // 显示名称
          status: 'active' // 默认状态
        }
        console.log('处理后的用户会话数据:', processedSession)
        return processedSession
      })
    }
  } catch (error) {
    console.error('加载用户会话列表失败:', error)
  }
}

const loadServiceStatus = async () => {
  try {
    const response = await ChatApi.getServiceStatus()
    if (response.success) {
      serviceStatus.value = response.data
    }
  } catch (error) {
    console.error('获取服务状态失败:', error)
  }
}

const loadUnreadCount = async () => {
  try {
    const response = await ChatApi.getUnreadCount()
    if (response.success) {
      unreadCount.value = response.data.unreadCount
    }
  } catch (error) {
    console.error('获取未读消息数量失败:', error)
  }
}

// 标记所有消息为已读
const markAllMessagesAsRead = async () => {
  try {
    const response = await ChatApi.markMessagesAsRead()
    if (response.success) {
      unreadCount.value = response.data.unreadCount
    }
  } catch (error) {
    console.error('标记消息已读失败:', error)
  }
}

// 工具函数
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// 判断是否为当前用户的消息
const isCurrentUserMessage = (message) => {
  // AI消息永远显示在左边（非当前用户）
  if (message.isAiMessage || message.user_id === 'ai_assistant' || message.message_type === 'assistant') {
    return false
  }

  // 在AI聊天模式下，根据message_type判断
  if (isAiChatMode.value) {
    const result = message.message_type === 'user'
    // 临时调试信息
    console.log('🔍 AI模式消息判断:', {
      message_type: message.message_type,
      isCurrentUser: result,
      messageContent: message.message?.substring(0, 30)
    })
    return result
  }

  // 在普通聊天模式下，使用原有逻辑
  const currentUserId = userStore.user?.id

  // 如果是客服消息类型，检查是否是当前管理员发送的
  if (message.message_type === 'customer_service' || message.isAdmin) {
    // 检查发送者信息，优先使用 senderId 或 data.userId
    const senderId = message.senderId || message.data?.userId || message.data?.senderId
    if (senderId) {
      return senderId === currentUserId
    }

    // 如果没有明确的发送者ID，检查昵称/用户名是否匹配
    const senderName = message.nickname || message.userName || message.data?.userName
    const currentUserName = userStore.userDisplayName
    if (senderName && currentUserName) {
      return senderName === currentUserName
    }
  }

  // 对于普通用户消息，使用 user_id 判断
  const messageUserId = message.user_id || message.data?.user_id || message.data?.userId
  return messageUserId === currentUserId
}

// 判断是否为客服消息（仅用于显示客服标识，不影响位置）
const isCustomerServiceMessage = (message) => {
  // 多重检查确保正确识别客服消息
  return message.isAdmin === true ||
    message.message_type === 'customer_service' ||
    message.data?.isAdmin === true ||
    message.data?.isCustomerService === true ||
    message.data?.role === 'admin' ||
    message.data?.role === 'customer_service'
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  const now = new Date()
  const diffInMs = now - date
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  // 如果是今天
  if (diffInDays === 0) {
    if (diffInMinutes < 1) {
      return '刚刚'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}分钟前`
    } else {
      return date.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
  // 如果是昨天
  else if (diffInDays === 1) {
    return `昨天 ${date.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })}`
  }
  // 如果是更早
  else if (diffInDays < 7) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return `${weekdays[date.getDay()]} ${date.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })}`
  }
  // 超过一周
  else {
    return date.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now - date
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return date.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
  } else if (diffInDays === 1) {
    return '昨天'
  } else if (diffInDays < 7) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return weekdays[date.getDay()]
  } else {
    return date.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit'
    })
  }
}

const getSessionStatusClass = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'waiting':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'closed':
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

const getSessionStatusText = (status) => {
  switch (status) {
    case 'active':
      return '进行中'
    case 'waiting':
      return '等待中'
    case 'closed':
      return '已结束'
    default:
      return '未知'
  }
}

const getMessageAvatar = (message) => {
  // 获取发送者头像，优先级：message.avatar > message.data.avatar
  const avatar = message.avatar || message.data?.avatar
  // 过滤掉空字符串和无效URL
  if (avatar && avatar.trim() && avatar !== 'null' && avatar !== 'undefined') {
    return avatar.trim()
  }
  return null
}

const getMessageNickname = (message) => {
  return message.nickname || message.data?.nickname || message.userName || message.data?.userName || '用户'
}

const getUserAvatar = (message) => {
  // 获取当前用户头像
  const avatar = message.avatar || message.data?.avatar || userStore.user?.avatar
  // 过滤掉空字符串和无效URL
  if (avatar && avatar.trim() && avatar !== 'null' && avatar !== 'undefined') {
    return avatar.trim()
  }
  return null
}

const getUserNickname = (message) => {
  return message.nickname || message.data?.nickname || message.userName || message.data?.userName || userStore.userDisplayName
}

// 头像错误处理
const handleAvatarError = (event) => {
  console.log('头像加载失败:', event.target.src)
  event.target.style.display = 'none'
}

// 头像加载成功处理
const handleAvatarLoad = (event) => {
  console.log('头像加载成功:', event.target.src)
}

// 自动标记消息为已读
const autoMarkAsRead = async () => {
  if (unreadCount.value > 0) {
    try {
      const response = await ChatApi.markMessagesAsRead()
      if (response.success) {
        unreadCount.value = 0
        console.log('消息已自动标记为已读')
      }
    } catch (error) {
      console.error('自动标记消息已读失败:', error)
    }
  }
}

// 选择会话
const selectSession = async (session) => {
  console.log('选中用户会话:', session)
  
  // 清除之前的typing状态
  clearTypingStates()
  
  // 清除AI聊天状态
  if (isAiChatMode.value) {
    isAiTyping.value = false
    currentStreamingMessage.value = ''
  }
  
  // 退出AI聊天模式
  isAiChatMode.value = false
  selectedSession.value = session

  // 加载该用户的聊天记录
  await loadChatHistoryForSession(session.user_id)

  // 标记该用户的消息为已读
  if (session.unread_count > 0) {
    await markSessionAsRead(session.user_id)
    // 更新会话列表中的未读数量
    session.unread_count = 0
  }
}

// 选择AI聊天
const selectAiChat = async () => {
  console.log('选中AI聊天')
  
  // 清除之前的typing状态
  clearTypingStates()
  
  // 清除流式状态
  isAiTyping.value = false
  currentStreamingMessage.value = ''
  
  // 退出用户会话模式
  selectedSession.value = null
  isAiChatMode.value = true

  // 等待DOM更新
  await nextTick()
  console.log('🔧 设置AI模式完成, isAiChatMode.value:', isAiChatMode.value)

  // 加载AI聊天历史
  await loadAiChatHistory()
  
  // 再次等待DOM更新
  await nextTick()
  console.log('✅ AI聊天设置完成')
}

// 加载AI聊天历史
const loadAiChatHistory = async () => {
  try {
    console.log('🤖 开始加载AI聊天历史, isAiChatMode.value:', isAiChatMode.value)
    const response = await AiChatApi.getChatHistory({
      sessionId: currentAiSessionId.value,
      limit: 50
    })

    if (response.success && response.data && response.data.records) {
      messages.value = response.data.records.map(msg => {
        // 更robust的AI消息判断逻辑
        const isAiMessage = msg.message_type === 'assistant' || 
                           msg.user_id === 'ai_assistant' ||
                           (msg.user_id && msg.user_id.toString().includes('ai'))
        
        // 临时调试信息
        console.log('📝 消息处理:', {
          originalType: msg.message_type,
          user_id: msg.user_id,
          isAiMessage: isAiMessage,
          content: msg.content?.substring(0, 30)
        })
        
        const renderedContent = isAiMessage ? renderMarkdown(msg.content) : null
        
        return {
          ...msg,
          id: msg.id,
          user_id: isAiMessage ? 'ai_assistant' : msg.user_id,
          message: msg.content,
          message_type: msg.message_type || (isAiMessage ? 'assistant' : 'user'),
          created_at: msg.created_at,
          nickname: isAiMessage ? 'AI装机助手' : (userStore.user?.nickname || userStore.userDisplayName),
          avatar: isAiMessage ? null : userStore.user?.avatar,
          isAdmin: false,
          isAiMessage: isAiMessage,
          isStreaming: false,
          isChunked: false,
          chunks: [],
          // 为历史AI消息预渲染Markdown
          renderedContent: renderedContent
        }
      })
      console.log('🔄 AI聊天历史加载完成:', {
        消息数量: messages.value.length,
        AI消息数: messages.value.filter(m => m.isAiMessage).length,
        用户消息数: messages.value.filter(m => !m.isAiMessage).length
      })
      scrollToBottom()
    } else {
      // 如果没有历史记录，清空消息列表
      messages.value = []
    }
  } catch (error) {
    console.error('加载AI聊天历史失败:', error)
    messages.value = []
  }
}

// 加载特定会话的聊天记录
const loadChatHistoryForSession = async (sessionId) => {
  try {
    console.log('加载用户聊天记录:', sessionId)
    // 使用新的 getUserMessages 接口
    const response = await ChatApi.getUserMessages(sessionId, {
      limit: 50
    })

    if (response.success && response.data) {
      messages.value = response.data.map(msg => {
        console.log('用户消息:', msg)

        // 判断是否为客服消息的逻辑
        const isCustomerService = msg.message_type === 'customer_service' ||
          msg.role === 'admin' ||
          msg.role === 'customer_service' ||
          msg.is_admin_message === 1

        const processedMsg = {
          ...msg,
          user_id: msg.user_id || msg.id,
          isAdmin: isCustomerService,
          avatar: msg.avatar,
          nickname: msg.nickname || msg.username,
          userName: msg.nickname || msg.username,
          message_type: isCustomerService ? 'customer_service' : 'user'
        }

        return processedMsg
      })

      console.log('用户聊天记录加载完成:', messages.value)
      scrollToBottom()
    }
  } catch (error) {
    console.error('加载用户聊天记录失败:', error)
    // 如果API不支持按用户加载，回退到加载全部记录
    await loadChatHistory()
  }
}

// 标记特定会话为已读
const markSessionAsRead = async (sessionId) => {
  try {
    const response = await ChatApi.markSessionAsRead(sessionId)
    if (response.success) {
      console.log('会话已标记为已读:', sessionId)
      // 更新总的未读数量
      await loadUnreadCount()
    }
  } catch (error) {
    console.error('标记会话已读失败:', error)
    // 如果API不支持，使用通用的标记已读
    await autoMarkAsRead()
  }
}

// 返回客服模式
const backToCustomerService = () => {
  console.log('返回客服模式')
  
  // 清除typing状态
  clearTypingStates()
  
  // 清除AI聊天状态
  if (isAiChatMode.value) {
    isAiTyping.value = false
    currentStreamingMessage.value = ''
  }
  
  // 退出AI聊天模式和用户会话模式
  selectedSession.value = null
  isAiChatMode.value = false
  currentAiSessionId.value = null
  
  // 重新加载默认的聊天记录
  loadChatHistory()
}

// 更新会话列表
const updateSessionList = (message) => {
  const messageUserId = message.user_id
  const sessionIndex = sessions.value.findIndex(s => s.user_id === messageUserId)

  if (sessionIndex >= 0) {
    // 更新现有会话
    const session = sessions.value[sessionIndex]
    session.last_message = message.message || message.data?.message
    session.last_message_time = new Date().toISOString()

    // 如果不是当前选中的会话且消息类型是用户消息，增加未读数量
    if ((!selectedSession.value || selectedSession.value.user_id !== messageUserId) &&
      message.message_type === 'user') {
      session.unread_count = (session.unread_count || 0) + 1
    }

    // 将会话移到列表顶部
    sessions.value.splice(sessionIndex, 1)
    sessions.value.unshift(session)
  } else if (message.message_type === 'user') {
    // 新用户发送消息，重新加载会话列表
    loadChatSessions()
  }
}

// 检查登录状态和初始化
onMounted(async () => {
  if (!userStore.isLoggedIn) {
    // 如果未登录，跳转到登录页面
    navigateTo('/auth/login')
    return
  }



  // 加载页面数据
  await Promise.all([
    loadServiceStatus(),
    loadUnreadCount(),
    loadChatHistory(),
    loadChatSessions()
  ])
  connectWebSocket()
})

onUnmounted(() => {
  disconnectWebSocket()
  // 清理AI消息渲染相关的定时器和状态
  resetAiMessageState()
})
</script>

<style scoped>
.glass-card-dark {
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* 滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(55, 65, 81, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}

/* AI消息样式 */
.ai-message-container {
  max-width: 100%;
}

.ai-message-content {
  color: #e5e7eb;
  line-height: 1.6;
}

.ai-history-message {
  opacity: 0.95;
}

.ai-chunk {
  animation: fadeInUp 0.3s ease-out;
}

.ai-chunk-animate {
  animation: fadeInUp 0.3s ease-out, glow 0.5s ease-out;
}

.ai-chunk-preview {
  opacity: 0.8;
  border-left: 2px solid #06b6d4;
  padding-left: 12px;
  margin-top: 8px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(6, 182, 212, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(6, 182, 212, 0.3);
  }
}

/* Markdown内容样式 */
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
  color: #60a5fa;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.markdown-body p {
  margin-bottom: 0.8em;
}

.markdown-body code {
  background-color: rgba(55, 65, 81, 0.8);
  padding: 2px 6px;
  border-radius: 4px;
  color: #fbbf24;
  font-size: 0.9em;
}

.markdown-body pre {
  background-color: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 8px;
  padding: 12px;
  overflow-x: auto;
  margin: 8px 0;
}

.markdown-body pre code {
  background: none;
  padding: 0;
  color: #e5e7eb;
}

.markdown-body ul, .markdown-body ol {
  margin-left: 1.2em;
  margin-bottom: 0.8em;
}

.markdown-body li {
  margin-bottom: 0.3em;
}

.markdown-body blockquote {
  border-left: 4px solid #06b6d4;
  padding-left: 12px;
  margin: 8px 0;
  color: #9ca3af;
  font-style: italic;
}

.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin: 8px 0;
}

.markdown-body th, .markdown-body td {
  border: 1px solid rgba(75, 85, 99, 0.3);
  padding: 8px 12px;
  text-align: left;
}

.markdown-body th {
  background-color: rgba(55, 65, 81, 0.5);
  color: #60a5fa;
  font-weight: 600;
}

.markdown-body strong {
  color: #fbbf24;
  font-weight: 600;
}

.markdown-body em {
  color: #a78bfa;
  font-style: italic;
}

/* 隐藏输入框滚动条 */
.hide-scrollbar {
  /* 隐藏 Webkit 浏览器滚动条 */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 和 Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

/* 自定义动画 */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounceGentle {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-3px);
  }

  60% {
    transform: translateY(-2px);
  }
}

@keyframes pulseGentle {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes bounce {

  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    transform: translate3d(0, -8px, 0);
  }

  70% {
    transform: translate3d(0, -4px, 0);
  }

  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* 动画类 */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

.animate-bounce-gentle {
  animation: bounceGentle 2s ease-in-out infinite;
}

.animate-pulse-gentle {
  animation: pulseGentle 2s ease-in-out infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* 消息动画 */
.message-enter-active {
  transition: all 0.5s ease-out;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.message-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 会话选中状态优化 */
.session-selected {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
  border: 1px solid rgba(6, 182, 212, 0.4);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
}

.session-selected::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  pointer-events: none;
  z-index: -1;
}

/* 响应式设计优化 */
@media (max-width: 1280px) {

  :deep(.xl\:col-span-1),
  :deep(.xl\:col-span-3) {
    grid-column: span 1;
  }

  :deep(.grid.xl\:grid-cols-4) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 768px) {

  .animate-fade-in-left,
  .animate-fade-in-right {
    animation-delay: 0.1s;
  }

  :deep(.h-\[750px\]) {
    height: 500px;
  }

  :deep(.px-6) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  :deep(.py-8) {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  :deep(.text-4xl) {
    font-size: 2rem;
  }

  :deep(.text-2xl) {
    font-size: 1.5rem;
  }
}

/* AI消息 Markdown 样式 */
.ai-message-content.markdown-body {
  /* 覆盖 github-markdown-css 的默认样式以适配暗色主题 */
  background-color: transparent !important;
  color: white !important;
  font-family: inherit !important;
  font-size: inherit !important;
  line-height: 1.6 !important;
}

.ai-message-content.markdown-body h1,
.ai-message-content.markdown-body h2,
.ai-message-content.markdown-body h3,
.ai-message-content.markdown-body h4,
.ai-message-content.markdown-body h5,
.ai-message-content.markdown-body h6 {
  color: #60a5fa !important; /* 蓝色标题 */
  border-bottom-color: rgba(96, 165, 250, 0.3) !important;
  margin-top: 1rem !important;
  margin-bottom: 0.5rem !important;
}

.ai-message-content.markdown-body p {
  margin-bottom: 0.5rem !important;
  color: white !important;
}

.ai-message-content.markdown-body code {
  background-color: rgba(107, 114, 126, 0.3) !important;
  color: #fbbf24 !important; /* 黄色代码 */
  padding: 0.2em 0.4em !important;
  border-radius: 4px !important;
  font-size: 0.9em !important;
}

.ai-message-content.markdown-body pre {
  background-color: rgba(17, 24, 39, 0.8) !important;
  border: 1px solid rgba(107, 114, 126, 0.3) !important;
  border-radius: 8px !important;
  padding: 1rem !important;
  overflow-x: auto !important;
  margin: 0.5rem 0 !important;
}

.ai-message-content.markdown-body pre code {
  background-color: transparent !important;
  color: #e5e7eb !important;
  padding: 0 !important;
}

.ai-message-content.markdown-body blockquote {
  border-left: 4px solid #06b6d4 !important; /* 青色引用边框 */
  background-color: rgba(6, 182, 212, 0.1) !important;
  color: #e5e7eb !important;
  padding: 0.5rem 1rem !important;
  margin: 0.5rem 0 !important;
  border-radius: 0 4px 4px 0 !important;
}

.ai-message-content.markdown-body ul,
.ai-message-content.markdown-body ol {
  margin: 0.5rem 0 !important;
  padding-left: 1.5rem !important;
  color: white !important;
}

.ai-message-content.markdown-body li {
  margin-bottom: 0.2rem !important;
  color: white !important;
}

.ai-message-content.markdown-body a {
  color: #60a5fa !important; /* 蓝色链接 */
  text-decoration: underline !important;
}

.ai-message-content.markdown-body a:hover {
  color: #93c5fd !important;
}

.ai-message-content.markdown-body strong {
  color: #fbbf24 !important; /* 黄色加粗 */
  font-weight: 600 !important;
}

.ai-message-content.markdown-body em {
  color: #a78bfa !important; /* 紫色斜体 */
}

.ai-message-content.markdown-body table {
  border-collapse: collapse !important;
  margin: 0.5rem 0 !important;
  width: 100% !important;
  border: 1px solid rgba(107, 114, 126, 0.3) !important;
  border-radius: 6px !important;
  overflow: hidden !important;
}

.ai-message-content.markdown-body th,
.ai-message-content.markdown-body td {
  border: 1px solid rgba(107, 114, 126, 0.3) !important;
  padding: 0.5rem !important;
  text-align: left !important;
  color: white !important;
}

.ai-message-content.markdown-body th {
  background-color: rgba(107, 114, 126, 0.2) !important;
  font-weight: 600 !important;
}

.ai-message-content.markdown-body hr {
  border: none !important;
  border-top: 2px solid rgba(107, 114, 126, 0.3) !important;
  margin: 1rem 0 !important;
}

/* 确保所有文本都是白色 */
.ai-message-content.markdown-body * {
  color: inherit !important;
}

/* AI消息分块渲染优化样式 */
.ai-message-container {
  position: relative;
}

.ai-chunk {
  margin-bottom: 0.25rem !important;
  transition: opacity 0.3s ease-in-out;
}

.ai-chunk:last-child {
  margin-bottom: 0 !important;
}

.ai-chunk-animate {
  animation: fadeInUp 0.4s ease-out;
}

.ai-chunk-preview {
  opacity: 0.7;
  border-left: 2px solid #06b6d4;
  padding-left: 0.5rem;
  background-color: rgba(6, 182, 212, 0.05) !important;
}

/* 分块渲染时的流畅过渡 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 长内容优化 */
.ai-message-container {
  max-height: 80vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(6, 182, 212, 0.3) transparent;
}

.ai-message-container::-webkit-scrollbar {
  width: 4px;
}

.ai-message-container::-webkit-scrollbar-track {
  background: transparent;
}

.ai-message-container::-webkit-scrollbar-thumb {
  background-color: rgba(6, 182, 212, 0.3);
  border-radius: 2px;
}

.ai-message-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(6, 182, 212, 0.5);
}

/* 针对长AI回复的分页指示器 */
.ai-chunk-indicator {
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: linear-gradient(to bottom, #06b6d4, #0891b2);
  border-radius: 2px;
  opacity: 0.6;
}

/* 性能优化：减少重绘 */
.ai-chunk {
  will-change: opacity;
  transform: translateZ(0);
}
</style>