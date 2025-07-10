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
        <div class="flex-1 overflow-y-auto p-6 chat-scrollbar" ref="messagesContainer">
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
                <div v-for="message in messages" :key="`${message.id}-${message.timestamp}`" class="flex"
                    :class="message.isUser ? 'justify-end' : 'justify-start'"
                    :data-message-id="message.id">

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
                                <!-- AI消息内容渲染 - 前端实时Markdown渲染 -->
                                <div class="ai-message-content">
                                    <!-- 流式消息：优先显示HTML，回退到原始文本 -->
                                    <template v-if="message.isStreaming">
                                        <!-- ✅ 前端实时渲染的HTML（完整Markdown） -->
                                        <div v-if="message.htmlContent" 
                                             class="ai-rendered-content markdown-content"
                                             v-html="message.htmlContent"
                                             :key="`streaming-html-${message.id}-${message.timestamp}`"></div>
                                        <!-- 回退：原始文本（Markdown渲染前） -->
                                        <div v-else 
                                             class="ai-streaming-message streaming-text"
                                             v-text="message.content"></div>
                                    </template>
                                    <!-- 完成的消息：优先使用渲染后的HTML -->
                                    <template v-else>
                                        <div v-if="message.htmlContent"
                                             class="ai-rendered-content markdown-content"
                                             v-html="message.htmlContent"
                                             :key="`final-html-${message.id}-${message.timestamp}`"></div>
                                        <!-- 回退：纯文本 -->
                                        <div v-else
                                             class="ai-rendered-content"
                                             v-text="message.content"></div>
                                    </template>
                                </div>

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
                        class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white placeholder-gray-400 transition-all duration-300 resize-none hover:border-cyan-500/50 focus:scale-[1.01] min-h-[48px] max-h-32 overflow-y-auto input-scrollbar"
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
import MarkdownIt from 'markdown-it'

// 创建 markdown-it 实例（与后端保持一致的配置）
const md = new MarkdownIt({
  html: true,        // 允许 HTML 标签
  xhtmlOut: false,   // 使用 XHTML 输出
  breaks: true,      // 转换段落里的 '\n' 到 <br>
  linkify: true,     // 将类似URL的文本自动转换为链接
  typographer: true  // 启用一些语言中性的替换和引号美化
})

// Props
const props = defineProps({
    sessionId: {
        type: String,
        default: null
    }
})

// Emits
const emit = defineEmits(['session-created'])

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

// ✅ 处理增量Markdown内容并实时渲染HTML
const processIncrementalChunk = (newChunk, messageIndex) => {
    if (messageIndex >= 0 && messages.value[messageIndex]) {
        const message = messages.value[messageIndex]
        
        // 累积原始Markdown文本
        message.content += newChunk
        
        // ✅ 核心：实时渲染完整Markdown为HTML
        try {
            message.htmlContent = md.render(message.content)
            
            // 为了保持v-for逻辑的兼容性，将完整HTML作为单个块
            message.htmlChunks = [message.htmlContent]
            
            console.log('🎨 前端Markdown实时渲染:', {
                新增文本: newChunk.substring(0, 20) + '...',
                当前Markdown长度: message.content.length,
                渲染HTML长度: message.htmlContent.length,
                消息ID: message.id
            })
        } catch (renderError) {
            console.error('❌ Markdown渲染失败:', renderError)
            // 渲染失败时使用纯文本
            message.htmlContent = message.content
            message.htmlChunks = [message.content]
        }
        
        // 强制触发Vue响应性更新
        message.timestamp = Date.now()
        
        // 立即滚动到底部
        nextTick(() => {
            scrollToBottom()
            
            // 调试：验证渲染结果
            const messageElement = document.querySelector(`[data-message-id="${message.id}"]`)
            if (messageElement) {
                const htmlElement = messageElement.querySelector('.ai-rendered-content')
                if (htmlElement) {
                    console.log('✅ 前端Markdown实时渲染成功')
                } else {
                    console.warn('⚠️ HTML渲染元素未找到')
                }
            }
        })
    }
}

// 🗑️ 弃用：后端htmlChunk处理（后端单chunk渲染不完整）
const processHtmlChunk = (htmlChunk, messageIndex) => {
    console.warn('⚠️ 收到后端htmlChunk，但已弃用（单chunk渲染不完整）:', {
        块长度: htmlChunk?.length || 0,
        块内容: htmlChunk?.substring(0, 50) + '...',
        消息索引: messageIndex
    })
    // 不处理后端的htmlChunk，因为单个chunk的markdown渲染是不完整的
}

// 更新消息的HTML内容（来自后端渲染） - 保留兼容性
const updateMessageHtml = (htmlContent, messageIndex) => {
    if (messageIndex >= 0 && messages.value[messageIndex]) {
        const message = messages.value[messageIndex]
        
        // 确保Vue能检测到变化
        message.htmlContent = htmlContent
        
        console.log('🎨 HTML内容更新 (兼容模式):', {
            消息索引: messageIndex,
            HTML长度: htmlContent?.length || 0,
            内容预览: htmlContent?.substring(0, 100) + '...',
            消息ID: message.id
        })
        
        // 强制Vue更新DOM
        nextTick(() => {
            scrollToBottom()
            
            // 调试：检查DOM是否正确更新
            const messageElement = document.querySelector(`[data-message-id="${message.id}"]`)
            if (messageElement) {
                console.log('✅ DOM元素已找到，HTML已更新')
            } else {
                console.warn('⚠️ 未找到对应的DOM元素')
            }
        })
    }
}

// 强制重新渲染消息（解决Vue响应性问题）
const forceUpdateMessage = (messageIndex) => {
    if (messageIndex >= 0 && messages.value[messageIndex]) {
        const message = messages.value[messageIndex]
        // 触发Vue响应性更新
        message.timestamp = Date.now()
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
            htmlContent: '', // 后端渲染的HTML内容
            htmlChunks: [], // 新增：HTML块数组
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
                console.log('📥 收到chunk数据:', {
                    原始内容: data.content?.substring(0, 50) + '...',
                    原始内容长度: data.content?.length || 0,
                    HTML块: data.htmlChunk?.substring(0, 50) + '...',
                    HTML块长度: data.htmlChunk?.length || 0,
                    有原始内容: !!data.content,
                    有HTML块: !!data.htmlChunk,
                    块索引: data.chunkIndex
                })
                
                if (data.content || data.htmlChunk) {
                    const aiMessageIndex = messages.value.length - 1
                    
                    // 处理原始内容（用于打字机效果）
                    if (data.content) {
                        processIncrementalChunk(data.content, aiMessageIndex)
                        console.log('✅ 原始内容已处理')
                    }
                    
                    // 处理HTML块（用于渲染显示）
                    if (data.htmlChunk) {
                        processHtmlChunk(data.htmlChunk, aiMessageIndex)
                        console.log('✅ HTML块已处理')
                    } else {
                        console.warn('⚠️ 未收到HTML块，可能后端未发送')
                    }
                } else {
                    console.warn('❌ chunk数据无效，既没有content也没有htmlChunk')
                }
            },

            onHtmlUpdate: (data) => {
                if (data.htmlContent) {
                    const aiMessageIndex = messages.value.length - 1
                    
                    // 更新HTML内容（后端渲染）
                    updateMessageHtml(data.htmlContent, aiMessageIndex)
                    
                    // 强制重新渲染
                    forceUpdateMessage(aiMessageIndex)
                    
                    console.log('🎨 收到HTML更新:', {
                        是否部分更新: data.isPartial,
                        HTML长度: data.htmlContent.length,
                        消息索引: aiMessageIndex
                    })
                }
            },

            onDone: (data) => {
                console.log('✅ AI响应完成:', data)
                isAiTyping.value = false

                const aiMessageIndex = messages.value.length - 1
                if (aiMessageIndex >= 0) {
                    const finalMessage = messages.value[aiMessageIndex]
                    finalMessage.isStreaming = false
                    
                    // 使用完整回复内容
                    if (data.fullResponse) {
                        finalMessage.content = data.fullResponse
                    }
                    
                    // 使用后端渲染的HTML（如果htmlChunks为空则使用完整HTML）
                    if (data.htmlResponse) {
                        // 如果没有htmlChunks，使用完整HTML
                        if (!finalMessage.htmlChunks || finalMessage.htmlChunks.length === 0) {
                            finalMessage.htmlContent = data.htmlResponse
                            finalMessage.htmlChunks = [data.htmlResponse]
                        }
                        // 如果已有htmlChunks，验证完整性
                        else if (finalMessage.htmlContent !== data.htmlResponse) {
                            console.log('🔄 完成时HTML内容不一致，使用完整版本')
                            finalMessage.htmlContent = data.htmlResponse
                            finalMessage.htmlChunks = [data.htmlResponse]
                        }
                        
                        // 强制重新渲染
                        forceUpdateMessage(aiMessageIndex)
                    }
                    
                    console.log('🎯 AI响应最终完成:', {
                        Markdown长度: finalMessage.content.length,
                        HTML长度: finalMessage.htmlContent?.length || 0,
                        HTML块数: finalMessage.htmlChunks?.length || 0,
                        消息ID: finalMessage.id
                    })
                }
            },

            onSaved: (data) => {
                console.log('💾 对话已保存:', data.message)
                // 可能需要更新HTML内容
                if (data.htmlContent) {
                    const aiMessageIndex = messages.value.length - 1
                    if (aiMessageIndex >= 0) {
                        const message = messages.value[aiMessageIndex]
                        
                        // 如果没有htmlChunks，使用保存的HTML
                        if (!message.htmlChunks || message.htmlChunks.length === 0) {
                            message.htmlContent = data.htmlContent
                            message.htmlChunks = [data.htmlContent]
                        }
                        
                        // 强制重新渲染
                        forceUpdateMessage(aiMessageIndex)
                        
                        console.log('💾 保存回调HTML内容已更新:', {
                            消息ID: message.id,
                            HTML长度: data.htmlContent.length,
                            HTML块数: message.htmlChunks?.length || 0
                        })
                    }
                }
            },

            onError: (data) => {
                console.error('❌ AI响应错误:', data)
                isAiTyping.value = false

                const aiMessageIndex = messages.value.length - 1
                if (aiMessageIndex >= 0) {
                    messages.value[aiMessageIndex].isStreaming = false
                    messages.value[aiMessageIndex].content = data.message || '抱歉，处理您的请求时出现了错误'
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
            messages.value = response.data.records.map(msg => {
                const mappedMessage = {
                    id: msg.id,
                    content: msg.content,
                    htmlContent: msg.contentHtml, // 优先使用后端渲染的HTML
                    htmlChunks: [],
                    isUser: msg.message_type === 'user' || msg.messageType === 'user',
                    messageType: msg.message_type || msg.messageType,
                    timestamp: new Date(msg.created_at).getTime(),
                    isStreaming: false
                }
                
                // ✅ 确保AI消息有HTML内容：优先后端，回退前端渲染
                if (!mappedMessage.isUser) {
                    if (msg.contentHtml) {
                        // 使用后端HTML
                        mappedMessage.htmlContent = msg.contentHtml
                        mappedMessage.htmlChunks = [msg.contentHtml]
                        console.log('📋 历史消息使用后端HTML')
                    } else if (mappedMessage.content) {
                        // 回退：前端渲染Markdown
                        try {
                            mappedMessage.htmlContent = md.render(mappedMessage.content)
                            mappedMessage.htmlChunks = [mappedMessage.htmlContent]
                            console.log('📋 历史消息使用前端渲染HTML')
                        } catch (renderError) {
                            console.warn('❌ 历史消息Markdown渲染失败:', renderError)
                            mappedMessage.htmlContent = mappedMessage.content
                            mappedMessage.htmlChunks = [mappedMessage.content]
                        }
                    }
                }
                
                console.log('📋 历史消息处理完成:', {
                    ID: mappedMessage.id,
                    类型: mappedMessage.messageType,
                    内容长度: mappedMessage.content.length,
                    HTML长度: mappedMessage.htmlContent?.length || 0,
                    HTML块数: mappedMessage.htmlChunks.length,
                    有HTML: !!mappedMessage.htmlContent,
                    HTML来源: msg.contentHtml ? '后端' : '前端'
                })
                
                return mappedMessage
            })

            console.log('🔄 AI聊天历史加载完成:', {
                消息数量: messages.value.length,
                AI消息数: messages.value.filter(m => !m.isUser).length,
                用户消息数: messages.value.filter(m => m.isUser).length,
                有HTML的AI消息数: messages.value.filter(m => !m.isUser && m.htmlContent).length
            })

            // 强制所有消息重新渲染
            nextTick(() => {
                messages.value.forEach((msg, index) => {
                    if (!msg.isUser && msg.htmlContent) {
                        forceUpdateMessage(index)
                    }
                })
                scrollToBottom()
            })
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
            // 详细调试WebSocket消息结构
            console.log('📝 AI聊天内容块 (WebSocket) - 完整消息:', JSON.stringify(message, null, 2))
            
            // 尝试从不同位置获取content和htmlChunk
            let content = null
            let htmlChunk = null
            
            // 可能的消息结构1: 直接在message中
            if (message.content) {
                content = message.content
            }
            if (message.htmlChunk) {
                htmlChunk = message.htmlChunk
            }
            
            // 可能的消息结构2: 在message.data中
            if (message.data) {
                if (message.data.content) {
                    content = message.data.content
                }
                if (message.data.htmlChunk) {
                    htmlChunk = message.data.htmlChunk
                }
            }
            
            console.log('🔍 解析后的数据:', {
                消息类型: message.type,
                原始内容: content?.substring(0, 50) + '...',
                原始内容长度: content?.length || 0,
                HTML块: htmlChunk?.substring(0, 50) + '...',
                HTML块长度: htmlChunk?.length || 0,
                有原始内容: !!content,
                有HTML块: !!htmlChunk,
                消息结构: {
                    有message_content: !!message.content,
                    有message_htmlChunk: !!message.htmlChunk,
                    有message_data: !!message.data,
                    有data_content: !!(message.data?.content),
                    有data_htmlChunk: !!(message.data?.htmlChunk)
                }
            })
            
            // ✅ 核心：只处理原始内容，前端负责Markdown渲染
            if (content) {
                // 找到最后一条AI消息（非用户消息）
                const lastAiMessage = messages.value.slice().reverse().find(msg => !msg.isUser)

                if (lastAiMessage && lastAiMessage.isStreaming) {
                    const aiMessageIndex = messages.value.indexOf(lastAiMessage)
                    
                    // ✅ 处理原始内容并实时渲染Markdown
                    processIncrementalChunk(content, aiMessageIndex)
                    console.log('✅ 原始内容已处理，前端Markdown已实时渲染')
                    
                    // 忽略htmlChunk（记录但不处理）
                    if (htmlChunk) {
                        processHtmlChunk(htmlChunk, aiMessageIndex)
                        console.log('ℹ️ 后端htmlChunk已收到但被忽略（前端渲染优先）')
                    }
                } else {
                    console.log('🆕 创建新的AI消息')
                    // 如果没有找到流式消息，创建一个新的AI消息
                    const newAiMessage = {
                        id: Date.now(),
                        content: '',
                        htmlContent: '',
                        htmlChunks: [],
                        isUser: false,
                        messageType: 'assistant',
                        timestamp: message.timestamp || Date.now(),
                        isStreaming: true
                    }
                    messages.value.push(newAiMessage)
                    
                    const aiMessageIndex = messages.value.length - 1
                    
                    // ✅ 处理初始内容并实时渲染
                    processIncrementalChunk(content, aiMessageIndex)
                    console.log('✅ 新消息内容已处理，前端Markdown已渲染')
                    
                    // 忽略htmlChunk
                    if (htmlChunk) {
                        processHtmlChunk(htmlChunk, aiMessageIndex)
                        console.log('ℹ️ 新消息htmlChunk已收到但被忽略')
                    }
                    
                    scrollToBottom()
                }
            } else {
                console.error('❌ WebSocket chunk数据无效 - 缺少content')
                console.error('📋 完整消息结构:', message)
            }
            break

        case 'ai_chat_html_update':
            console.log('🎨 AI HTML更新事件:', message)
            console.log('📋 HTML更新数据:', {
                有data: !!message.data,
                有htmlContent: !!(message.data?.htmlContent),
                HTML长度: message.data?.htmlContent?.length || 0,
                HTML预览: message.data?.htmlContent?.substring(0, 100) + '...',
                是否部分更新: message.data?.isPartial,
                块索引: message.data?.chunkIndex
            })
            
            // 处理HTML内容更新
            if (message.data && message.data.htmlContent) {
                const lastAiMessage = messages.value.slice().reverse().find(msg => !msg.isUser)
                if (lastAiMessage) {
                    const aiMessageIndex = messages.value.indexOf(lastAiMessage)
                    
                    console.log('🔍 当前最后AI消息状态:', {
                        消息ID: lastAiMessage.id,
                        流式状态: lastAiMessage.isStreaming,
                        当前HTML长度: lastAiMessage.htmlContent?.length || 0,
                        当前文本长度: lastAiMessage.content?.length || 0
                    })
                    
                    // 直接更新完整HTML内容（不管是否流式）
                    lastAiMessage.htmlContent = message.data.htmlContent
                    
                    // 同步更新htmlChunks（保持一致性）
                    lastAiMessage.htmlChunks = [message.data.htmlContent]
                    
                    // 强制触发Vue响应性更新
                    lastAiMessage.timestamp = Date.now()
                    
                    console.log('🎨 HTML内容已更新:', {
                        消息索引: aiMessageIndex,
                        消息ID: lastAiMessage.id,
                        新HTML长度: lastAiMessage.htmlContent.length,
                        流式状态: lastAiMessage.isStreaming,
                        时间戳: lastAiMessage.timestamp
                    })
                    
                    // 强制Vue更新DOM
                    nextTick(() => {
                        scrollToBottom()
                        
                        // 验证DOM更新
                        const messageElement = document.querySelector(`[data-message-id="${lastAiMessage.id}"]`)
                        if (messageElement) {
                            const htmlElement = messageElement.querySelector('.ai-rendered-content')
                            if (htmlElement) {
                                console.log('✅ HTML元素已找到并更新，实际内容:', htmlElement.innerHTML.substring(0, 100) + '...')
                            } else {
                                console.warn('⚠️ HTML元素未找到，查找到的元素:', messageElement.outerHTML.substring(0, 200) + '...')
                            }
                        } else {
                            console.error('❌ 未找到消息DOM元素，消息ID:', lastAiMessage.id)
                        }
                    })
                } else {
                    console.warn('⚠️ 未找到AI消息进行HTML更新')
                }
            } else {
                console.error('❌ HTML更新事件无效 - 缺少htmlContent')
            }
            break

        case 'ai_chat_done':
            console.log('✅ AI聊天完成:', message)
            isAiTyping.value = false
            
            // 标记最后一条AI消息为完成状态
            const lastAiMessage = messages.value.slice().reverse().find(msg => !msg.isUser)
            if (lastAiMessage) {
                lastAiMessage.isStreaming = false
                
                // 使用完整回复内容
                if (message.data && message.data.fullResponse) {
                    lastAiMessage.content = message.data.fullResponse
                }
                
                // 使用后端渲染的HTML（如果htmlChunks为空则使用完整HTML）
                if (message.data && message.data.htmlResponse) {
                    // 如果没有htmlChunks，使用完整HTML
                    if (!lastAiMessage.htmlChunks || lastAiMessage.htmlChunks.length === 0) {
                        lastAiMessage.htmlContent = message.data.htmlResponse
                        lastAiMessage.htmlChunks = [message.data.htmlResponse]
                    }
                    // 如果已有htmlChunks，验证完整性
                    else if (lastAiMessage.htmlContent !== message.data.htmlResponse) {
                        console.log('🔄 HTML内容不一致，使用完整版本')
                        lastAiMessage.htmlContent = message.data.htmlResponse
                        lastAiMessage.htmlChunks = [message.data.htmlResponse]
                    }
                    
                    // 强制重新渲染
                    const aiMessageIndex = messages.value.indexOf(lastAiMessage)
                    forceUpdateMessage(aiMessageIndex)
                }
                
                console.log('🎯 AI响应最终完成 (WebSocket):', {
                    Markdown长度: lastAiMessage.content.length,
                    HTML长度: lastAiMessage.htmlContent?.length || 0,
                    HTML块数: lastAiMessage.htmlChunks?.length || 0,
                    消息ID: lastAiMessage.id
                })
            }
            break

        case 'ai_chat_saved':
            console.log('💾 AI聊天已保存事件:', message)
            console.log('📋 保存数据详情:', {
                有data: !!message.data,
                有htmlContent: !!(message.data?.htmlContent),
                HTML长度: message.data?.htmlContent?.length || 0,
                有markdownContent: !!(message.data?.markdownContent),
                Markdown长度: message.data?.markdownContent?.length || 0,
                消息内容: message.data?.message
            })
            
            // 强制更新HTML内容（最终完整版本）
            if (message.data && message.data.htmlContent) {
                const lastAiMessage = messages.value.slice().reverse().find(msg => !msg.isUser)
                if (lastAiMessage) {
                    console.log('🔍 当前最后AI消息状态（保存前）:', {
                        消息ID: lastAiMessage.id,
                        流式状态: lastAiMessage.isStreaming,
                        当前HTML长度: lastAiMessage.htmlContent?.length || 0,
                        当前文本长度: lastAiMessage.content?.length || 0,
                        当前HTML块数: lastAiMessage.htmlChunks?.length || 0
                    })
                    
                    // ✅ 使用后端提供的完整HTML（备份前端渲染）
                    lastAiMessage.htmlContent = message.data.htmlContent
                    
                    // 更新Markdown内容
                    if (message.data.markdownContent) {
                        lastAiMessage.content = message.data.markdownContent
                    }
                    
                    // 保持兼容性：设置htmlChunks
                    lastAiMessage.htmlChunks = [message.data.htmlContent]
                    
                    console.log('💾 保存时HTML内容验证:', {
                        后端HTML长度: message.data.htmlContent.length,
                        前端HTML长度: lastAiMessage.htmlContent.length,
                        Markdown长度: lastAiMessage.content.length,
                        内容一致性: message.data.htmlContent === lastAiMessage.htmlContent
                    })
                    
                    // 确保流式状态已结束
                    lastAiMessage.isStreaming = false
                    
                    // 更新Markdown内容（如果有的话）
                    if (message.data.markdownContent) {
                        lastAiMessage.content = message.data.markdownContent
                    }
                    
                    // 强制触发Vue响应性更新
                    lastAiMessage.timestamp = Date.now()
                    
                    console.log('💾 保存时HTML内容已强制更新:', {
                        消息ID: lastAiMessage.id,
                        新HTML长度: lastAiMessage.htmlContent.length,
                        新文本长度: lastAiMessage.content.length,
                        HTML块数: lastAiMessage.htmlChunks.length,
                        流式状态: lastAiMessage.isStreaming,
                        时间戳: lastAiMessage.timestamp
                    })
                    
                    // 强制Vue更新DOM
                    nextTick(() => {
                        scrollToBottom()
                        
                        // 验证DOM更新
                        const messageElement = document.querySelector(`[data-message-id="${lastAiMessage.id}"]`)
                        if (messageElement) {
                            const htmlElement = messageElement.querySelector('.ai-rendered-content')
                            if (htmlElement) {
                                console.log('✅ 保存后HTML元素已更新，实际内容:', htmlElement.innerHTML.substring(0, 100) + '...')
                                console.log('🎨 HTML元素类名:', htmlElement.className)
                                console.log('🧪 HTML元素标签:', htmlElement.tagName)
                            } else {
                                console.warn('⚠️ 保存后HTML元素未找到，消息元素:', messageElement.outerHTML.substring(0, 200) + '...')
                            }
                        } else {
                            console.error('❌ 保存后未找到消息DOM元素，消息ID:', lastAiMessage.id)
                        }
                    })
                } else {
                    console.warn('⚠️ 保存事件中未找到AI消息')
                }
            } else {
                console.error('❌ 保存事件无效 - 缺少htmlContent')
                console.error('📋 完整消息结构:', JSON.stringify(message, null, 2))
            }
            break

        case 'ai_chat_error':
            console.error('❌ AI聊天错误:', message)
            isAiTyping.value = false
            // 显示错误消息
            const errorMessage = {
                id: Date.now(),
                content: message.data?.message || '抱歉，AI服务暂时不可用',
                htmlContent: '',
                htmlChunks: [], // 错误消息不需要HTML块
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

// 调试方法：测试HTML渲染
const testHtmlRendering = () => {
    const testContent = '# 测试标题\n\n这是一个**粗体**文本和*斜体*文本。\n\n```javascript\nconsole.log("测试代码");\n```\n\n- 列表项1\n- 列表项2'
    const testHtml = '<h1>测试标题</h1><p>这是一个<strong>粗体</strong>文本和<em>斜体</em>文本。</p><pre><code class="language-javascript">console.log("测试代码");</code></pre><ul><li>列表项1</li><li>列表项2</li></ul>'
    
    const testMessage = {
        id: Date.now(),
        content: testContent,
        htmlContent: testHtml,
        htmlChunks: [testHtml], // 测试单个HTML块
        isUser: false,
        messageType: 'assistant',
        timestamp: Date.now(),
        isStreaming: false
    }
    
    messages.value.push(testMessage)
    
    console.log('🧪 测试消息已添加:', testMessage)
    
    nextTick(() => {
        scrollToBottom()
        
        // 检查DOM元素
        const messageElement = document.querySelector(`[data-message-id="${testMessage.id}"]`)
        console.log('🔍 测试消息DOM元素:', messageElement)
        
        if (messageElement) {
            const htmlElement = messageElement.querySelector('.ai-rendered-content')
            console.log('🎨 HTML渲染元素:', htmlElement)
            console.log('📝 实际HTML内容:', htmlElement?.innerHTML)
        }
    })
}

// 调试方法：模拟分块HTML渲染
const testChunkedHtmlRendering = () => {
    const chunks = [
        '<h1>分块测试标题</h1>',
        '<p>这是第一段文本，',
        '<strong>包含粗体</strong>',
        '和<em>斜体</em>内容。</p>',
        '<pre><code>',
        'console.log("分块代码");',
        '</code></pre>',
        '<ul><li>项目1</li>',
        '<li>项目2</li></ul>'
    ]
    
    const testMessage = {
        id: Date.now(),
        content: '',
        htmlContent: '',
        htmlChunks: [],
        isUser: false,
        messageType: 'assistant',
        timestamp: Date.now(),
        isStreaming: true
    }
    
    messages.value.push(testMessage)
    const messageIndex = messages.value.length - 1
    
    console.log('🧪 开始分块HTML渲染测试')
    
    // 模拟流式接收HTML块
    chunks.forEach((chunk, index) => {
        setTimeout(() => {
            processHtmlChunk(chunk, messageIndex)
            
            // 最后一个块时结束流式状态
            if (index === chunks.length - 1) {
                setTimeout(() => {
                    testMessage.isStreaming = false
                    console.log('🏁 分块HTML渲染测试完成')
                }, 200)
            }
        }, index * 300) // 每300ms一个块
    })
}

// 调试方法：检查所有消息状态
const debugMessageStates = () => {
    console.log('🔍 当前所有消息状态:')
    messages.value.forEach((msg, index) => {
        console.log(`消息 ${index}:`, {
            ID: msg.id,
            类型: msg.isUser ? '用户' : 'AI',
            内容长度: msg.content.length,
            HTML长度: msg.htmlContent?.length || 0,
            HTML块数: msg.htmlChunks?.length || 0,
            有HTML: !!msg.htmlContent,
            流式状态: msg.isStreaming,
            时间戳: new Date(msg.timestamp).toLocaleTimeString()
        })
    })
}

// 调试方法：强制更新所有AI消息
const forceUpdateAllAiMessages = () => {
    console.log('🔄 强制更新所有AI消息')
    messages.value.forEach((msg, index) => {
        if (!msg.isUser) {
            forceUpdateMessage(index)
            console.log(`🔄 强制更新消息 ${index} (ID: ${msg.id})`)
        }
    })
}

// 调试方法：测试后端htmlChunk接收
const testBackendHtmlChunk = () => {
    console.log('🧪 测试后端htmlChunk接收机制')
    
    // 模拟后端发送的htmlChunk数据
    const mockChunks = [
        { content: '## ', htmlChunk: '<h2>' },
        { content: '**', htmlChunk: '' },
        { content: '5000', htmlChunk: '5000' },
        { content: '元', htmlChunk: '元' },
        { content: '配置', htmlChunk: '配置' },
        { content: '清单', htmlChunk: '清单' },
        { content: '**', htmlChunk: '</strong>' },
        { content: '\n\n', htmlChunk: '</h2><p>' },
        { content: '这是一个', htmlChunk: '这是一个' },
        { content: '**测试**', htmlChunk: '<strong>测试</strong>' },
        { content: '配置。', htmlChunk: '配置。</p>' }
    ]
    
    // 创建测试消息
    const testMessage = {
        id: Date.now(),
        content: '',
        htmlContent: '',
        htmlChunks: [],
        isUser: false,
        messageType: 'assistant',
        timestamp: Date.now(),
        isStreaming: true
    }
    
    messages.value.push(testMessage)
    const messageIndex = messages.value.length - 1
    
    console.log('🚀 开始模拟htmlChunk接收')
    
    // 模拟逐步接收chunks
    mockChunks.forEach((chunk, index) => {
        setTimeout(() => {
            console.log(`📥 模拟接收chunk ${index + 1}/${mockChunks.length}:`, {
                原始: chunk.content,
                HTML: chunk.htmlChunk
            })
            
            // 模拟onChunk回调
            if (chunk.content) {
                processIncrementalChunk(chunk.content, messageIndex)
            }
            
            if (chunk.htmlChunk) {
                processHtmlChunk(chunk.htmlChunk, messageIndex)
            }
            
            // 最后一个chunk时结束流式状态
            if (index === mockChunks.length - 1) {
                setTimeout(() => {
                    testMessage.isStreaming = false
                    console.log('🏁 htmlChunk测试完成，最终HTML:', testMessage.htmlContent)
                }, 200)
            }
        }, index * 200) // 每200ms一个chunk
    })
}

// 调试方法：检查当前是否接收到htmlChunk
const checkHtmlChunkReceiving = () => {
    console.log('🔍 检查htmlChunk接收状态:')
    
    const aiMessages = messages.value.filter(msg => !msg.isUser)
    
    aiMessages.forEach((msg, index) => {
        console.log(`AI消息 ${index + 1}:`, {
            ID: msg.id,
            流式状态: msg.isStreaming,
            原始内容长度: msg.content.length,
            HTML内容长度: msg.htmlContent?.length || 0,
            HTML块数量: msg.htmlChunks?.length || 0,
            有HTML块: msg.htmlChunks && msg.htmlChunks.length > 0,
            最新HTML块预览: msg.htmlChunks?.[msg.htmlChunks.length - 1]?.substring(0, 50) + '...'
        })
    })
    
    if (aiMessages.length === 0) {
        console.log('📝 暂无AI消息')
    }
}

// 调试方法：测试HTML更新事件
const testHtmlUpdate = () => {
    console.log('🧪 测试HTML更新事件')
    
    // 模拟后端发送的 ai_chat_html_update 事件
    const mockHtmlUpdate = {
        type: 'ai_chat_html_update',
        data: {
            htmlContent: '<h2>测试HTML更新</h2><p>这是一个<strong>测试HTML更新</strong>的示例，包含<em>格式化</em>内容。</p><ul><li>项目1</li><li>项目2</li></ul>',
            markdownContent: '## 测试HTML更新\n\n这是一个**测试HTML更新**的示例，包含*格式化*内容。\n\n- 项目1\n- 项目2',
            chunkIndex: 100,
            isPartial: false
        },
        timestamp: Date.now()
    }
    
    console.log('🚀 发送模拟HTML更新事件:', mockHtmlUpdate)
    handleWebSocketMessage(mockHtmlUpdate)
}

// 调试方法：添加测试消息并立即更新HTML
const addTestMessageWithHtml = () => {
    console.log('🧪 添加测试消息并更新HTML')
    
    // 创建流式AI消息
    const testMessage = {
        id: Date.now(),
        content: '测试原始内容...',
        htmlContent: '',
        htmlChunks: [],
        isUser: false,
        messageType: 'assistant',
        timestamp: Date.now(),
        isStreaming: true
    }
    
    messages.value.push(testMessage)
    console.log('✅ 测试消息已添加')
    
    // 立即发送HTML更新
    setTimeout(() => {
        const htmlContent = '<h2>实时HTML测试</h2><p>这是一个<strong>实时HTML更新</strong>测试，内容包含：</p><ul><li><code>代码块</code>测试</li><li><em>斜体</em>文本</li><li><strong>加粗</strong>文本</li></ul><blockquote>这是引用内容</blockquote>'
        
        testMessage.htmlContent = htmlContent
        testMessage.htmlChunks = [htmlContent]
        testMessage.timestamp = Date.now()
        
        console.log('🎨 HTML内容已更新，长度:', htmlContent.length)
        
        nextTick(() => {
            scrollToBottom()
            
            // 检查DOM
            const messageElement = document.querySelector(`[data-message-id="${testMessage.id}"]`)
            if (messageElement) {
                const htmlElement = messageElement.querySelector('.ai-rendered-content')
                console.log('🔍 DOM检查结果:', {
                    找到消息元素: !!messageElement,
                    找到HTML元素: !!htmlElement,
                    HTML元素类名: htmlElement?.className,
                    实际渲染内容: htmlElement?.innerHTML?.substring(0, 100) + '...'
                })
            }
        })
    }, 1000)
}

// 调试方法：测试ai_chat_saved事件
const testSavedEvent = () => {
    console.log('🧪 测试ai_chat_saved事件处理')
    
    // 首先添加一个流式AI消息（模拟正在进行的对话）
    const testMessage = {
        id: Date.now(),
        content: '这是一个测试消息，模拟AI正在回复...',
        htmlContent: '',
        htmlChunks: [],
        isUser: false,
        messageType: 'assistant',
        timestamp: Date.now(),
        isStreaming: true
    }
    
    messages.value.push(testMessage)
    console.log('✅ 流式测试消息已添加')
    
    // 1秒后模拟接收ai_chat_saved事件
    setTimeout(() => {
        const mockSavedEvent = {
            type: 'ai_chat_saved',
            data: {
                message: '对话已保存',
                htmlContent: '<h2><strong>4000元装机配置清单</strong></h2><table><thead><tr><th>配件</th><th>型号</th><th>价格</th></tr></thead><tbody><tr><td><strong>CPU</strong></td><td>AMD R5 5600</td><td>¥680</td></tr><tr><td><strong>显卡</strong></td><td>RX 6500XT 4G</td><td>¥999</td></tr><tr><td><strong>内存</strong></td><td>16GB DDR4 3200</td><td>¥229</td></tr></tbody></table><h3><strong>配置亮点</strong></h3><ol><li><strong>性价比高</strong>：适合1080P游戏</li><li><strong>升级空间</strong>：支持未来硬件升级</li></ol><blockquote>提示：建议在京东或天猫购买以保证售后</blockquote>',
                markdownContent: '## **4000元装机配置清单**\n\n| 配件 | 型号 | 价格 |\n|------|------|------|\n| **CPU** | AMD R5 5600 | ¥680 |\n| **显卡** | RX 6500XT 4G | ¥999 |\n| **内存** | 16GB DDR4 3200 | ¥229 |\n\n### **配置亮点**\n1. **性价比高**：适合1080P游戏\n2. **升级空间**：支持未来硬件升级\n\n> 提示：建议在京东或天猫购买以保证售后',
                timestamp: new Date().toISOString(),
                sessionId: 'test-session-id'
            },
            timestamp: Date.now()
        }
        
        console.log('🚀 发送模拟ai_chat_saved事件:', mockSavedEvent)
        handleWebSocketMessage(mockSavedEvent)
    }, 2000)
}

// 调试方法：测试前端Markdown实时渲染
const testFrontendMarkdownRendering = () => {
    console.log('🧪 测试前端Markdown实时渲染')
    
    const markdownChunks = [
        '## ',
        '**装机',
        '配置',
        '清单**',
        '\n\n',
        '| 配件 | 型号 | 价格 |\n',
        '|-----|-----|-----|\n',
        '| **CPU** | AMD R5 5600 | ¥680 |\n',
        '| **显卡** | RX 6500XT | ¥999 |\n\n',
        '### 配置亮点\n',
        '1. **性价比高**\n',
        '2. *升级空间大*\n\n',
        '> 提示：建议京东购买'
    ]
    
    // 创建测试消息
    const testMessage = {
        id: Date.now(),
        content: '',
        htmlContent: '',
        htmlChunks: [],
        isUser: false,
        messageType: 'assistant',
        timestamp: Date.now(),
        isStreaming: true
    }
    
    messages.value.push(testMessage)
    const messageIndex = messages.value.length - 1
    
    console.log('🚀 开始模拟前端Markdown实时渲染')
    
    // 逐步添加markdown chunks
    markdownChunks.forEach((chunk, index) => {
        setTimeout(() => {
            console.log(`📝 处理chunk ${index + 1}/${markdownChunks.length}: "${chunk}"`)
            processIncrementalChunk(chunk, messageIndex)
            
            // 最后一个chunk时结束流式状态
            if (index === markdownChunks.length - 1) {
                setTimeout(() => {
                    testMessage.isStreaming = false
                    console.log('🏁 前端Markdown实时渲染测试完成')
                    console.log('📋 最终结果:', {
                        Markdown长度: testMessage.content.length,
                        HTML长度: testMessage.htmlContent.length,
                        渲染内容预览: testMessage.htmlContent.substring(0, 100) + '...'
                    })
                }, 200)
            }
        }, index * 300) // 每300ms一个chunk
    })
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
    handleWebSocketMessage,
    // 调试方法
    testHtmlRendering,
    testChunkedHtmlRendering,
    debugMessageStates,
    forceUpdateAllAiMessages,
    testBackendHtmlChunk,
    checkHtmlChunkReceiving,
    testHtmlUpdate,
    addTestMessageWithHtml,
    testSavedEvent, // 测试ai_chat_saved事件
    testFrontendMarkdownRendering // 测试前端Markdown实时渲染
})
</script>

<style scoped>
/* AI消息内容样式 */
.ai-message-content {
    color: #e5e7eb;
    line-height: 1.6;
}

/* AI消息块样式 */
.ai-message-chunk {
    opacity: 1;
    transition: all 0.3s ease-out;
}

/* AI渲染内容样式 */
.ai-rendered-content {
    color: #e5e7eb;
    line-height: 1.6;
    word-break: break-word;
    transition: all 0.3s ease-out;
}

/* Markdown内容样式 - 适用于后端渲染的HTML */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
    color: #60a5fa !important; /* 蓝色标题 */
    border-bottom-color: rgba(96, 165, 250, 0.3) !important;
    margin-top: 1rem !important;
    margin-bottom: 0.5rem !important;
    font-weight: 600 !important;
}

.markdown-content :deep(p) {
    margin-bottom: 0.5rem !important;
    color: #e5e7eb !important;
}

.markdown-content :deep(code) {
    background-color: rgba(107, 114, 126, 0.3) !important;
    color: #fbbf24 !important; /* 黄色代码 */
    padding: 0.2em 0.4em !important;
    border-radius: 4px !important;
    font-size: 0.9em !important;
}

.markdown-content :deep(pre) {
    background-color: rgba(17, 24, 39, 0.8) !important;
    border: 1px solid rgba(107, 114, 126, 0.3) !important;
    border-radius: 8px !important;
    padding: 1rem !important;
    overflow-x: auto !important;
    margin: 0.5rem 0 !important;
}

.markdown-content :deep(pre code) {
    background-color: transparent !important;
    color: #e5e7eb !important;
    padding: 0 !important;
}

.markdown-content :deep(blockquote) {
    border-left: 4px solid #06b6d4 !important; /* 青色引用边框 */
    background-color: rgba(6, 182, 212, 0.1) !important;
    color: #e5e7eb !important;
    padding: 0.5rem 1rem !important;
    margin: 0.5rem 0 !important;
    border-radius: 0 4px 4px 0 !important;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
    margin: 0.5rem 0 !important;
    padding-left: 1.5rem !important;
    color: #e5e7eb !important;
}

.markdown-content :deep(li) {
    margin-bottom: 0.2rem !important;
    color: #e5e7eb !important;
}

.markdown-content :deep(a) {
    color: #60a5fa !important; /* 蓝色链接 */
    text-decoration: underline !important;
}

.markdown-content :deep(a:hover) {
    color: #93c5fd !important;
}

.markdown-content :deep(strong) {
    color: #fbbf24 !important; /* 黄色加粗 */
    font-weight: 600 !important;
}

.markdown-content :deep(em) {
    color: #a78bfa !important; /* 紫色斜体 */
}

.markdown-content :deep(table) {
    border-collapse: collapse !important;
    margin: 0.5rem 0 !important;
    width: 100% !important;
    border: 1px solid rgba(107, 114, 126, 0.3) !important;
    border-radius: 6px !important;
    overflow: hidden !important;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
    border: 1px solid rgba(107, 114, 126, 0.3) !important;
    padding: 0.5rem !important;
    text-align: left !important;
    color: #e5e7eb !important;
}

.markdown-content :deep(th) {
    background-color: rgba(107, 114, 126, 0.2) !important;
    font-weight: 600 !important;
}

/* 移除旧的Markdown样式 */
.ai-message-content :deep(h1),
.ai-message-content :deep(h2),
.ai-message-content :deep(h3),
.ai-message-content :deep(h4),
.ai-message-content :deep(h5),
.ai-message-content :deep(h6) {
    color: #60a5fa !important; /* 蓝色标题 */
    border-bottom-color: rgba(96, 165, 250, 0.3) !important;
    margin-top: 1rem !important;
    margin-bottom: 0.5rem !important;
    font-weight: 600 !important;
}

.ai-message-content :deep(p) {
    margin-bottom: 0.5rem !important;
    color: #e5e7eb !important;
}

.ai-message-content :deep(code) {
    background-color: rgba(107, 114, 126, 0.3) !important;
    color: #fbbf24 !important; /* 黄色代码 */
    padding: 0.2em 0.4em !important;
    border-radius: 4px !important;
    font-size: 0.9em !important;
}

.ai-message-content :deep(pre) {
    background-color: rgba(17, 24, 39, 0.8) !important;
    border: 1px solid rgba(107, 114, 126, 0.3) !important;
    border-radius: 8px !important;
    padding: 1rem !important;
    overflow-x: auto !important;
    margin: 0.5rem 0 !important;
}

.ai-message-content :deep(pre code) {
    background-color: transparent !important;
    color: #e5e7eb !important;
    padding: 0 !important;
}

.ai-message-content :deep(blockquote) {
    border-left: 4px solid #06b6d4 !important; /* 青色引用边框 */
    background-color: rgba(6, 182, 212, 0.1) !important;
    color: #e5e7eb !important;
    padding: 0.5rem 1rem !important;
    margin: 0.5rem 0 !important;
    border-radius: 0 4px 4px 0 !important;
}

.ai-message-content :deep(ul),
.ai-message-content :deep(ol) {
    margin: 0.5rem 0 !important;
    padding-left: 1.5rem !important;
    color: #e5e7eb !important;
}

.ai-message-content :deep(li) {
    margin-bottom: 0.2rem !important;
    color: #e5e7eb !important;
}

.ai-message-content :deep(a) {
    color: #60a5fa !important; /* 蓝色链接 */
    text-decoration: underline !important;
}

.ai-message-content :deep(a:hover) {
    color: #93c5fd !important;
}

.ai-message-content :deep(strong) {
    color: #fbbf24 !important; /* 黄色加粗 */
    font-weight: 600 !important;
}

.ai-message-content :deep(em) {
    color: #a78bfa !important; /* 紫色斜体 */
}

.ai-message-content :deep(table) {
    border-collapse: collapse !important;
    margin: 0.5rem 0 !important;
    width: 100% !important;
    border: 1px solid rgba(107, 114, 126, 0.3) !important;
    border-radius: 6px !important;
    overflow: hidden !important;
}

.ai-message-content :deep(th),
.ai-message-content :deep(td) {
    border: 1px solid rgba(107, 114, 126, 0.3) !important;
    padding: 0.5rem !important;
    text-align: left !important;
    color: #e5e7eb !important;
}

.ai-message-content :deep(th) {
    background-color: rgba(107, 114, 126, 0.2) !important;
    font-weight: 600 !important;
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

/* 流式渲染优化样式 */
.ai-streaming-message {
    opacity: 1;
    transition: all 0.2s ease-out;
}

.streaming-text {
    /* 流式文本显示样式 - 轻量化 */
    color: #e5e7eb;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
    font-family: inherit;
}

/* ✅ AI渲染内容样式 - 前端Markdown渲染 */
.ai-rendered-content {
    /* 确保内容正常显示 */
    line-height: 1.6;
    word-break: break-word;
    /* 添加平滑的内容更新动画 */
    transition: all 0.2s ease-out;
}

/* 流式渲染时的淡入效果 */
.ai-rendered-content {
    animation: contentFadeIn 0.3s ease-out;
}

@keyframes contentFadeIn {
    from {
        opacity: 0.8;
    }
    to {
        opacity: 1;
    }
}

/* 只有正在流式输入的消息才显示光标 */
.ai-message-content .ai-streaming-message::after {
    content: '';
    display: inline-block;
    width: 2px;
    height: 1.2em;
    background: rgba(6, 182, 212, 0.8);
    margin-left: 2px;
    animation: blink 1s infinite;
    vertical-align: text-bottom;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

/* 滚动条样式已移至全局 main.css 中统一管理 */
</style>