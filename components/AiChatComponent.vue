<template>
    <div class="ai-chat-container h-full flex flex-col">
        <!-- AI聊天头部 -->
        <div class="px-6 py-4 border-b border-gray-700/50 bg-gray-800/30">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <!-- AI头像 -->
                    <div
                        class="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border-2 border-cyan-500/50 shadow-lg">
                        <div
                            class="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                            <i class="bi bi-robot text-white text-xl"></i>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-white flex items-center gap-2">
                            AI装机助手
                            <span
                                class="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full border border-cyan-500/30">
                                AI
                            </span>
                        </h3>
                        <p class="text-sm text-gray-400 flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        在线 - AI智能回复
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <!-- 连接状态 -->
                    <div class="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-700/30">
                        <div class="w-2 h-2 rounded-full animate-pulse bg-green-500"></div>
                        <span class="text-xs text-gray-400 font-medium">AI服务在线</span>
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
                    <i class="bi bi-robot text-4xl text-cyan-400"></i>
                </div>
                <h3 class="text-2xl font-bold text-white mb-3">AI装机助手</h3>
                <p class="text-gray-400 mb-8 text-lg leading-relaxed max-w-md mx-auto">
                    您好！我是AI装机助手，专为您提供装机指导和硬件咨询服务。请告诉我您的需求，我会为您推荐最适合的配置方案。
                </p>
                <div class="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                    <button v-for="(quickMsg, index) in quickMessages" :key="quickMsg"
                        @click="sendQuickMessage(quickMsg)"
                        class="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl text-sm font-medium hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-in-up shadow-lg hover:shadow-cyan-400/20"
                        :style="{ animationDelay: `${index * 100}ms` }">
                        {{ quickMsg }}
                    </button>
                </div>
            </div>

            <!-- 聊天消息列表 -->
            <div class="space-y-4">
                <div v-for="message in messages" :key="message.id" class="flex"
                    :class="message.isUser ? 'justify-end' : 'justify-start'">

                    <!-- AI消息 (左边) -->
                    <div v-if="!message.isUser" class="flex items-start gap-3 max-w-[80%]">
                        <!-- AI头像 -->
                        <div
                            class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-cyan-500/30">
                            <div
                                class="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                                <i class="bi bi-robot text-white text-sm"></i>
                            </div>
                        </div>
                        <div>
                            <div
                                class="bg-gray-700/50 border border-gray-600/30 rounded-2xl rounded-tl-sm p-4 text-white">
                                <!-- AI消息内容渲染 -->
                                <div class="ai-message-content" v-html="renderMarkdown(message.content)"></div>

                                <!-- 流式输入指示器 -->
                                <div v-if="message.isStreaming"
                                    class="flex items-center mt-3 pt-3 border-t border-gray-600/30">
                                    <div class="flex gap-1">
                                        <div class="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
                                        <div class="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
                                            style="animation-delay: 0.2s"></div>
                                        <div class="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
                                            style="animation-delay: 0.4s"></div>
                                    </div>
                                    <span class="text-xs text-cyan-400 ml-2">AI正在思考...</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 mt-1 ml-1">
                                <span class="text-xs text-cyan-400">AI装机助手</span>
                                <span class="text-xs text-gray-500">{{ formatTime(message.timestamp) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 用户消息 (右边) -->
                    <div v-else class="flex items-start gap-3 max-w-[80%] flex-row-reverse">
                        <!-- 用户头像 -->
                        <div
                            class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-cyan-500/30">
                            <img v-if="userStore.hasAvatarImage" :src="userStore.userAvatar"
                                :alt="userStore.userDisplayName" class="w-full h-full object-cover" />
                            <div v-else
                                class="w-full h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {{ userStore.userAvatar }}
                            </div>
                        </div>
                        <div class="text-right">
                            <div
                                class="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl rounded-tr-sm p-4 text-white">
                                {{ message.content }}
                            </div>
                            <div class="flex items-center gap-2 mt-1 justify-end mr-1">
                                <span class="text-xs text-gray-500">{{ formatTime(message.timestamp) }}</span>
                                <span class="text-xs text-cyan-400">我</span>
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
                    <span class="text-xs text-gray-500 flex items-center gap-1">
                        <i class="bi bi-robot"></i>
                        AI装机助手模式
                    </span>
                </div>

                <div class="flex items-center gap-3">
                    <span class="text-xs text-gray-500 flex items-center gap-1">
                        <i class="bi bi-keyboard"></i>
                        Enter 发送，Shift+Enter 换行
                    </span>
                    <div v-if="newMessage.length > 0" class="text-xs text-gray-500">
                        {{ newMessage.length }} 字符
                    </div>
                </div>
            </div>

            <!-- 输入框和发送按钮 -->
            <div class="flex items-start gap-3">
                <!-- 输入框区域 -->
                <div class="flex-1 relative">
                    <textarea v-model="newMessage" @keydown.enter.exact.prevent="sendMessage"
                        @input="adjustTextareaHeight" :disabled="isAiTyping"
                        :placeholder="isAiTyping ? 'AI正在回复中...' : '向AI装机助手提问... (Enter 发送，Shift+Enter 换行)'" rows="1"
                        class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white placeholder-gray-400 transition-all duration-300 resize-none hover:border-cyan-500/50 focus:scale-[1.01] min-h-[48px] max-h-32 overflow-y-auto custom-scrollbar"
                        :class="{ 'opacity-50 cursor-not-allowed': isAiTyping }">
                    </textarea>
                </div>

                <!-- 发送按钮 -->
                <div class="flex-shrink-0">
                    <button @click="sendMessage" :disabled="!newMessage.trim() || isAiTyping"
                        class="px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:shadow-none flex items-center gap-2 hover:scale-105 active:scale-95 min-h-[48px]">
                        <i v-if="!isAiTyping" class="bi bi-send text-lg"></i>
                        <i v-else class="bi bi-hourglass-split text-lg animate-spin"></i>
                        <span class="hidden sm:inline">{{ isAiTyping ? '回复中' : '发送' }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useUserStore } from '~/stores/user'
import { AiChatApi } from '~/utils/api/aiChat'
import { marked } from 'marked'

// Props
const props = defineProps({
    sessionId: {
        type: String,
        default: null
    }
})

// Emits
const emit = defineEmits(['session-created'])

// 配置 marked
marked.setOptions({
    breaks: true,
    gfm: true,
    sanitize: false
})

// 状态管理
const userStore = useUserStore()
const newMessage = ref('')
const messages = ref([])
const messagesContainer = ref()
const isAiTyping = ref(false)
const currentSessionId = ref(props.sessionId)

// 快速消息
const quickMessages = ref([
    '我想装一台游戏电脑',
    '帮我推荐办公电脑配置',
    '预算5000元的配置方案',
    '什么CPU性价比最高？',
    '如何选择显卡？'
])

// AI聊天回调管理
let aiChatCallbacks = null

// Markdown渲染函数
const renderMarkdown = (text) => {
    if (!text) return ''
    try {
        return marked(text)
    } catch (error) {
        console.error('❌ Markdown渲染失败:', error)
        return text
    }
}

// 格式化时间
const formatTime = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMs = now - date
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

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

// 自动调整textarea高度
const adjustTextareaHeight = (event) => {
    const textarea = event.target
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px'
}

// 滚动到底部
const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
    })
}

// 发送快速消息
const sendQuickMessage = (message) => {
    newMessage.value = message
    sendMessage()
}

// 发送消息
const sendMessage = async () => {
    if (!newMessage.value.trim() || isAiTyping.value) return

    const messageText = newMessage.value.trim()

    try {
        // 立即添加用户消息到界面
        const userMessage = {
            id: Date.now(),
            content: messageText,
            isUser: true,
            messageType: 'user',
            timestamp: Date.now(),
            isStreaming: false
        }
        messages.value.push(userMessage)

        // 创建AI消息占位符
        const aiMessage = {
            id: Date.now() + 1,
            content: '',
            isUser: false,
            messageType: 'assistant',
            timestamp: Date.now(),
            isStreaming: true
        }
        messages.value.push(aiMessage)

        // 清空输入框并滚动到底部
        newMessage.value = ''
        nextTick(() => {
            const textarea = document.querySelector('textarea')
            if (textarea) {
                textarea.style.height = '48px'
            }
        })
        scrollToBottom()

        // 设置AI正在输入状态
        isAiTyping.value = true

        // 定义回调函数
        const callbacks = {
            onStart: (data) => {
                console.log('🚀 AI开始响应:', data)
                if (!currentSessionId.value && data.sessionId) {
                    currentSessionId.value = data.sessionId
                    emit('session-created', data.sessionId)
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
                if (data.content && aiMessage) {
                    // 直接累积内容，避免复杂的分块处理
                    aiMessage.content += data.content

                    // 滚动到底部
                    nextTick(() => {
                        scrollToBottom()
                    })
                }
            },

            onDone: (data) => {
                console.log('✅ AI响应完成:', data)
                isAiTyping.value = false

                if (aiMessage) {
                    aiMessage.isStreaming = false
                    aiMessage.content = data.fullResponse || aiMessage.content

                    console.log('🎯 AI响应最终完成:', {
                        内容长度: aiMessage.content.length,
                        内容预览: aiMessage.content.substring(0, 50) + '...'
                    })
                }
            },

            onSaved: (data) => {
                console.log('💾 对话已保存:', data.message)
            },

            onError: (data) => {
                console.error('❌ AI响应错误:', data)
                isAiTyping.value = false

                if (aiMessage) {
                    aiMessage.isStreaming = false
                    aiMessage.content = data.message || '抱歉，处理您的请求时出现了错误'
                }
            },

            onEnd: () => {
                console.log('🏁 流式连接结束')
                isAiTyping.value = false
            }
        }

        // 存储回调引用
        aiChatCallbacks = callbacks

        // 发送流式消息
        await AiChatApi.sendStreamMessage(
            messageText,
            currentSessionId.value,
            callbacks,
            userStore.token
        )

    } catch (error) {
        console.error('发送AI消息失败:', error)
        isAiTyping.value = false

        // 显示错误消息
        if (messages.value.length > 0 && !messages.value[messages.value.length - 1].isUser) {
            const errorMessage = messages.value[messages.value.length - 1]
            errorMessage.isStreaming = false
            errorMessage.content = '抱歉，AI服务暂时不可用，请稍后重试'
        }
    }
}

// 加载AI聊天历史
const loadChatHistory = async () => {
    try {
        console.log('🤖 加载AI聊天历史, sessionId:', currentSessionId.value)

        const response = await AiChatApi.getChatHistory({
            sessionId: currentSessionId.value,
            limit: 50
        })

        if (response.success && response.data && response.data.records) {
            messages.value = response.data.records.map(msg => ({
                id: msg.id,
                content: msg.content,
                isUser: msg.message_type === 'user' || msg.messageType === 'user',
                messageType: msg.message_type || msg.messageType,
                timestamp: new Date(msg.created_at).getTime(),
                isStreaming: false
            }))

            console.log('🔄 AI聊天历史加载完成:', {
                消息数量: messages.value.length,
                AI消息数: messages.value.filter(m => !m.isUser).length,
                用户消息数: messages.value.filter(m => m.isUser).length
            })

            scrollToBottom()
        } else {
            console.log('📝 没有AI聊天历史记录')
            messages.value = []
        }
    } catch (error) {
        console.error('加载AI聊天历史失败:', error)
        messages.value = []
    }
}

// 处理WebSocket消息
const handleWebSocketMessage = (message) => {
    console.log('🔗 AI组件收到WebSocket消息:', message)

    switch (message.type) {
        case 'ai_chat_start':
            console.log('🚀 AI聊天开始:', message)
            if (!currentSessionId.value && message.sessionId) {
                currentSessionId.value = message.sessionId
                emit('session-created', message.sessionId)
            }
            break

        case 'ai_chat_progress':
            console.log('⏳ AI聊天进度:', message)
            break

        case 'ai_chat_chunk':
            console.log('📝 AI聊天内容块:', message)
            // 处理流式内容
            if (message.content) {
                // 找到最后一条AI消息（非用户消息）
                const lastAiMessage = messages.value.slice().reverse().find(msg => !msg.isUser)

                if (lastAiMessage && lastAiMessage.isStreaming) {
                    // 累积内容
                    lastAiMessage.content += message.content

                    // 滚动到底部
                    nextTick(() => {
                        scrollToBottom()
                    })
                } else {
                    // 如果没有找到流式消息，创建一个新的AI消息
                    const newAiMessage = {
                        id: Date.now(),
                        content: message.content,
                        isUser: false,
                        messageType: 'assistant',
                        timestamp: message.timestamp || Date.now(),
                        isStreaming: true
                    }
                    messages.value.push(newAiMessage)
                    scrollToBottom()
                }
            }
            break

        case 'ai_chat_done':
            console.log('✅ AI聊天完成:', message)
            isAiTyping.value = false
            // 标记最后一条AI消息为完成状态
            const lastAiMessage = messages.value.slice().reverse().find(msg => !msg.isUser)
            if (lastAiMessage) {
                lastAiMessage.isStreaming = false
                if (message.data && message.data.fullResponse) {
                    lastAiMessage.content = message.data.fullResponse
                }
            }
            break

        case 'ai_chat_saved':
            console.log('💾 AI聊天已保存:', message)
            break

        case 'ai_chat_error':
            console.error('❌ AI聊天错误:', message)
            isAiTyping.value = false
            // 显示错误消息
            const errorMessage = {
                id: Date.now(),
                content: message.data?.message || '抱歉，AI服务暂时不可用',
                isUser: false,
                messageType: 'assistant',
                timestamp: message.timestamp || Date.now(),
                isStreaming: false
            }
            messages.value.push(errorMessage)
            scrollToBottom()
            break

        case 'ai_chat_end':
            console.log('🏁 AI聊天结束:', message)
            isAiTyping.value = false
            break

        default:
            console.log('🤷 未知的AI消息类型:', message.type)
    }
}

// 组件挂载
onMounted(() => {
    loadChatHistory()
})

// 组件卸载
onUnmounted(() => {
    aiChatCallbacks = null
    isAiTyping.value = false
})

// 暴露方法给父组件
defineExpose({
    loadChatHistory,
    clearMessages: () => {
        messages.value = []
    },
    handleWebSocketMessage
})
</script>

<style scoped>
/* AI消息内容样式 */
.ai-message-content {
    color: #e5e7eb;
    line-height: 1.6;
}



/* Markdown内容样式 */
.ai-message-content :deep(h1),
.ai-message-content :deep(h2),
.ai-message-content :deep(h3),
.ai-message-content :deep(h4),
.ai-message-content :deep(h5),
.ai-message-content :deep(h6) {
    color: #60a5fa;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.ai-message-content :deep(p) {
    margin-bottom: 0.5rem;
    color: #e5e7eb;
}

.ai-message-content :deep(code) {
    background-color: rgba(107, 114, 126, 0.3);
    color: #fbbf24;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
}

.ai-message-content :deep(pre) {
    background-color: rgba(17, 24, 39, 0.8);
    border: 1px solid rgba(107, 114, 126, 0.3);
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    margin: 0.5rem 0;
}

.ai-message-content :deep(pre code) {
    background-color: transparent;
    color: #e5e7eb;
    padding: 0;
}

.ai-message-content :deep(blockquote) {
    border-left: 4px solid #06b6d4;
    background-color: rgba(6, 182, 212, 0.1);
    color: #e5e7eb;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    border-radius: 0 4px 4px 0;
}

.ai-message-content :deep(ul),
.ai-message-content :deep(ol) {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    color: #e5e7eb;
}

.ai-message-content :deep(li) {
    margin-bottom: 0.2rem;
    color: #e5e7eb;
}

.ai-message-content :deep(a) {
    color: #60a5fa;
    text-decoration: underline;
}

.ai-message-content :deep(a:hover) {
    color: #93c5fd;
}

.ai-message-content :deep(strong) {
    color: #fbbf24;
    font-weight: 600;
}

.ai-message-content :deep(em) {
    color: #a78bfa;
}

.ai-message-content :deep(table) {
    border-collapse: collapse;
    margin: 0.5rem 0;
    width: 100%;
    border: 1px solid rgba(107, 114, 126, 0.3);
    border-radius: 6px;
    overflow: hidden;
}

.ai-message-content :deep(th),
.ai-message-content :deep(td) {
    border: 1px solid rgba(107, 114, 126, 0.3);
    padding: 0.5rem;
    text-align: left;
    color: #e5e7eb;
}

.ai-message-content :deep(th) {
    background-color: rgba(107, 114, 126, 0.2);
    font-weight: 600;
}

/* 动画 */
.animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
}

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
</style>