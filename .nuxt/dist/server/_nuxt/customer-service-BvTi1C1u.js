import { _ as __nuxt_component_0 } from "./AppHeader-CHr1q5UR.js";
import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc, a as useUserStore } from "../server.mjs";
import "./useLocation-kga13ouX.js";
import "D:/code/xlweb/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-CXjDD8hH.js";
import "./nuxt-link-CtfKDdVG.js";
import "D:/code/xlweb/node_modules/ufo/dist/index.mjs";
import "./AppLogo-Bv4HeTlN.js";
import "vue-router";
import "seemly";
import "treemate";
import "vooks";
import "vdirs";
import "lodash-es";
import "css-render";
import "evtd";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/code/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/code/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/code/xlweb/node_modules/defu/dist/defu.mjs";
import "D:/code/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/code/xlweb/node_modules/klona/dist/index.mjs";
import "@css-render/plugin-bem";
import "D:/code/xlweb/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "customer-service",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const isConnected = ref(false);
    const isTyping = ref(false);
    const typingUsers = ref(/* @__PURE__ */ new Map());
    const unreadCount = ref(0);
    const newMessage = ref("");
    const messages = ref([]);
    const sessions = ref([]);
    ref();
    const selectedSession = ref(null);
    const serviceStatus = ref({
      adminOnline: false,
      adminCount: 0,
      totalUsers: 0,
      normalUserCount: 0
    });
    const quickMessages = [
      "你好，请问有什么可以帮助您的？",
      "我想了解产品信息",
      "订单相关问题",
      "技术支持"
    ];
    computed(() => userStore.isLoggedIn);
    const currentChatUser = computed(() => {
      if (!selectedSession.value) {
        return {
          name: "xlCig 客服团队",
          avatar: null,
          status: serviceStatus.value.adminOnline ? "在线 - 平均响应时间 < 1分钟" : "离线 - 我们会尽快回复您的消息",
          isCustomerService: true
        };
      }
      return {
        name: selectedSession.value.displayName || selectedSession.value.user_nickname || selectedSession.value.user_name || `用户 #${selectedSession.value.user_id}`,
        avatar: selectedSession.value.avatar || selectedSession.value.user_avatar,
        status: selectedSession.value.isOnline ? "在线 - 用户对话" : "离线 - 用户对话",
        isCustomerService: false,
        isOnline: selectedSession.value.isOnline,
        userId: selectedSession.value.user_id,
        sessionId: selectedSession.value.id
      };
    });
    useHead({
      title: "在线客服 - xlCig",
      meta: [
        { name: "description", content: "专业的在线客服服务，为您提供实时帮助和支持" }
      ]
    });
    const isInputFocused = ref(false);
    const isCurrentUserMessage = (message) => {
      var _a, _b, _c, _d, _e, _f;
      const currentUserId = (_a = userStore.user) == null ? void 0 : _a.id;
      if (message.message_type === "customer_service" || message.isAdmin) {
        const senderId = message.senderId || ((_b = message.data) == null ? void 0 : _b.userId) || ((_c = message.data) == null ? void 0 : _c.senderId);
        if (senderId) {
          return senderId === currentUserId;
        }
        const senderName = message.nickname || message.userName || ((_d = message.data) == null ? void 0 : _d.userName);
        const currentUserName = userStore.userDisplayName;
        if (senderName && currentUserName) {
          return senderName === currentUserName;
        }
      }
      const messageUserId = message.user_id || ((_e = message.data) == null ? void 0 : _e.user_id) || ((_f = message.data) == null ? void 0 : _f.userId);
      return messageUserId === currentUserId;
    };
    const isCustomerServiceMessage = (message) => {
      var _a, _b, _c, _d;
      return message.isAdmin === true || message.message_type === "customer_service" || ((_a = message.data) == null ? void 0 : _a.isAdmin) === true || ((_b = message.data) == null ? void 0 : _b.isCustomerService) === true || ((_c = message.data) == null ? void 0 : _c.role) === "admin" || ((_d = message.data) == null ? void 0 : _d.role) === "customer_service";
    };
    const formatTime = (timestamp) => {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      const now = /* @__PURE__ */ new Date();
      const diffInMs = now - date;
      const diffInMinutes = Math.floor(diffInMs / (1e3 * 60));
      const diffInDays = Math.floor(diffInMs / (1e3 * 60 * 60 * 24));
      if (diffInDays === 0) {
        if (diffInMinutes < 1) {
          return "刚刚";
        } else if (diffInMinutes < 60) {
          return `${diffInMinutes}分钟前`;
        } else {
          return date.toLocaleTimeString("zh-CN", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
          });
        }
      } else if (diffInDays === 1) {
        return `昨天 ${date.toLocaleTimeString("zh-CN", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit"
        })}`;
      } else if (diffInDays < 7) {
        const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return `${weekdays[date.getDay()]} ${date.toLocaleTimeString("zh-CN", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit"
        })}`;
      } else {
        return date.toLocaleDateString("zh-CN", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
    };
    const getSessionStatusClass = (status) => {
      switch (status) {
        case "active":
          return "bg-green-500/20 text-green-400 border-green-500/30";
        case "waiting":
          return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        case "closed":
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        default:
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      }
    };
    const getSessionStatusText = (status) => {
      switch (status) {
        case "active":
          return "进行中";
        case "waiting":
          return "等待中";
        case "closed":
          return "已结束";
        default:
          return "未知";
      }
    };
    const getMessageAvatar = (message) => {
      var _a;
      const avatar = message.avatar || ((_a = message.data) == null ? void 0 : _a.avatar);
      if (avatar && avatar.trim() && avatar !== "null" && avatar !== "undefined") {
        return avatar.trim();
      }
      return null;
    };
    const getMessageNickname = (message) => {
      var _a, _b;
      return message.nickname || ((_a = message.data) == null ? void 0 : _a.nickname) || message.userName || ((_b = message.data) == null ? void 0 : _b.userName) || "用户";
    };
    const getUserAvatar = (message) => {
      var _a, _b;
      const avatar = message.avatar || ((_a = message.data) == null ? void 0 : _a.avatar) || ((_b = userStore.user) == null ? void 0 : _b.avatar);
      if (avatar && avatar.trim() && avatar !== "null" && avatar !== "undefined") {
        return avatar.trim();
      }
      return null;
    };
    const getUserNickname = (message) => {
      var _a, _b;
      return message.nickname || ((_a = message.data) == null ? void 0 : _a.nickname) || message.userName || ((_b = message.data) == null ? void 0 : _b.userName) || userStore.userDisplayName;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black" }, _attrs))} data-v-d3b9e81d><div class="fixed inset-0 pointer-events-none" data-v-d3b9e81d><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-d3b9e81d></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-d3b9e81d></div></div>`);
      _push(ssrRenderComponent(_component_AppHeader, {
        "show-back-button": false,
        "show-nav-menu": true,
        "show-breadcrumb": true,
        "show-location": false,
        "show-search-button": false,
        "show-notification-button": true,
        "show-decorations": false,
        "current-page-title": "在线客服",
        "logo-size": "medium"
      }, null, _parent));
      _push(`<section class="relative z-10" data-v-d3b9e81d><div class="container mx-auto px-6 py-8" data-v-d3b9e81d><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-fade-in-up" data-v-d3b9e81d><div class="flex items-center justify-between" data-v-d3b9e81d><div data-v-d3b9e81d><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-d3b9e81d><i class="bi bi-headset text-cyan-400 text-3xl animate-bounce-gentle" data-v-d3b9e81d></i> 在线客服 </h1><p class="text-gray-300 text-lg" data-v-d3b9e81d>专业的客服团队随时为您提供帮助</p></div><div class="flex items-center gap-4" data-v-d3b9e81d><div class="flex items-center gap-6" data-v-d3b9e81d><div class="flex items-center gap-2" data-v-d3b9e81d><div class="${ssrRenderClass([serviceStatus.value.adminOnline ? "bg-green-500" : "bg-red-500", "w-3 h-3 rounded-full animate-pulse"])}" data-v-d3b9e81d></div><span class="text-sm text-gray-300" data-v-d3b9e81d>${ssrInterpolate(serviceStatus.value.adminOnline ? "客服在线" : "暂无客服在线")}</span></div></div><div class="flex items-center gap-2" data-v-d3b9e81d>`);
      if (unreadCount.value > 0) {
        _push(`<button class="px-4 py-2 text-sm font-medium bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95" data-v-d3b9e81d><i class="bi bi-check2-all" data-v-d3b9e81d></i> 标记已读 (${ssrInterpolate(unreadCount.value)}) </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="px-4 py-2 text-sm font-medium border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95" data-v-d3b9e81d><i class="bi bi-arrow-clockwise" data-v-d3b9e81d></i> 刷新 </button></div></div></div></div></div></section><section class="relative z-10" data-v-d3b9e81d><div class="container mx-auto px-6 py-4" data-v-d3b9e81d><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-fade-in-up" data-v-d3b9e81d><div class="flex flex-wrap items-center justify-between gap-4" data-v-d3b9e81d><div class="flex items-center gap-4" data-v-d3b9e81d><div class="flex items-center gap-2" data-v-d3b9e81d><i class="bi bi-chat-dots text-cyan-400" data-v-d3b9e81d></i><span class="text-white font-medium" data-v-d3b9e81d>当前模式：</span><span class="text-cyan-300" data-v-d3b9e81d>${ssrInterpolate(selectedSession.value ? `与 ${selectedSession.value.user_nickname || selectedSession.value.user_name || "用户"} 对话` : "客服团队模式")}</span></div>`);
      if (selectedSession.value) {
        _push(`<div class="flex items-center gap-2" data-v-d3b9e81d><div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" data-v-d3b9e81d></div><span class="text-sm text-gray-400" data-v-d3b9e81d>用户对话中</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-2" data-v-d3b9e81d><div class="flex items-center gap-2 text-sm text-gray-400" data-v-d3b9e81d><i class="bi bi-people" data-v-d3b9e81d></i><span data-v-d3b9e81d>会话: ${ssrInterpolate(sessions.value.length)}</span></div><div class="flex items-center gap-2 text-sm text-gray-400" data-v-d3b9e81d><i class="bi bi-chat-left-dots" data-v-d3b9e81d></i><span data-v-d3b9e81d>消息: ${ssrInterpolate(messages.value.length)}</span></div><div class="flex items-center gap-2" data-v-d3b9e81d><div class="${ssrRenderClass([isConnected.value ? "bg-green-500" : "bg-red-500", "w-2 h-2 rounded-full animate-pulse"])}" data-v-d3b9e81d></div><span class="text-xs text-gray-400" data-v-d3b9e81d>${ssrInterpolate(isConnected.value ? "已连接" : "连接中...")}</span></div></div></div></div></div></section><main class="container mx-auto px-6 py-8 relative z-10" data-v-d3b9e81d><div class="grid grid-cols-1 xl:grid-cols-4 gap-6" data-v-d3b9e81d><div class="xl:col-span-1" data-v-d3b9e81d><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-left h-[750px] flex flex-col" data-v-d3b9e81d><div class="px-6 py-4 border-b border-gray-700/50 bg-gray-800/30" data-v-d3b9e81d><div class="flex items-center justify-between" data-v-d3b9e81d><div data-v-d3b9e81d><h3 class="text-lg font-semibold text-white mb-1 flex items-center gap-2" data-v-d3b9e81d><i class="bi bi-chat-left-text text-cyan-400" data-v-d3b9e81d></i> 对话列表 </h3><p class="text-xs text-gray-400" data-v-d3b9e81d>${ssrInterpolate(sessions.value.length)} 个会话 `);
      if (selectedSession.value) {
        _push(`<span class="text-cyan-400 ml-2" data-v-d3b9e81d> · 已选中 ${ssrInterpolate(selectedSession.value.user_nickname || selectedSession.value.user_name || `用户
                      #${selectedSession.value.user_id}`)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p></div><div class="flex items-center gap-2" data-v-d3b9e81d>`);
      if (selectedSession.value) {
        _push(`<button class="p-2 text-gray-400 hover:text-cyan-300 hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95" title="返回客服模式" data-v-d3b9e81d><i class="bi bi-arrow-left text-lg" data-v-d3b9e81d></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="p-2 text-gray-400 hover:text-cyan-300 hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95" title="刷新列表" data-v-d3b9e81d><i class="bi bi-arrow-clockwise text-lg" data-v-d3b9e81d></i></button></div></div></div><div class="flex-1 overflow-y-auto" data-v-d3b9e81d>`);
      if (sessions.value.length === 0) {
        _push(`<div class="flex flex-col items-center justify-center h-full text-center p-8" data-v-d3b9e81d><div class="w-20 h-20 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-full flex items-center justify-center mb-6" data-v-d3b9e81d><i class="bi bi-chat-dots text-3xl text-gray-500" data-v-d3b9e81d></i></div><h4 class="text-xl font-semibold text-white mb-3" data-v-d3b9e81d>暂无对话</h4><p class="text-gray-400 text-sm leading-relaxed" data-v-d3b9e81d>等待用户开始对话<br data-v-d3b9e81d>或从客服团队模式开始</p></div>`);
      } else {
        _push(`<div class="p-4 space-y-3" data-v-d3b9e81d><!--[-->`);
        ssrRenderList(sessions.value, (session, index) => {
          var _a, _b, _c;
          _push(`<div class="${ssrRenderClass([[
            ((_a = selectedSession.value) == null ? void 0 : _a.id) === session.id ? "session-selected border-cyan-500/50" : "hover:bg-gray-800/30"
          ], "relative p-4 rounded-xl cursor-pointer transition-all duration-300 group hover:scale-[1.01] animate-fade-in-up border border-transparent hover:border-gray-600/50"])}" style="${ssrRenderStyle({ animationDelay: `${index * 50}ms` })}" data-v-d3b9e81d>`);
          if (((_b = selectedSession.value) == null ? void 0 : _b.id) === session.id) {
            _push(`<div class="absolute top-3 left-3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg" data-v-d3b9e81d></div>`);
          } else {
            _push(`<!---->`);
          }
          if (session.unread_count > 0) {
            _push(`<div class="absolute top-3 right-3 min-w-[20px] h-5 bg-red-500 rounded-full flex items-center justify-center px-1" data-v-d3b9e81d><span class="text-xs text-white font-semibold" data-v-d3b9e81d>${ssrInterpolate(session.unread_count > 99 ? "99+" : session.unread_count)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center space-x-4" data-v-d3b9e81d><div class="relative flex-shrink-0" data-v-d3b9e81d><div class="${ssrRenderClass([((_c = selectedSession.value) == null ? void 0 : _c.id) === session.id ? "border-cyan-400/70 shadow-cyan-400/20" : "border-gray-700/50", "w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg"])}" data-v-d3b9e81d>`);
          if (session.user_avatar) {
            _push(`<img${ssrRenderAttr("src", session.user_avatar)}${ssrRenderAttr("alt", session.user_nickname || "用户")} class="w-full h-full object-cover" data-v-d3b9e81d>`);
          } else {
            _push(`<div class="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center" data-v-d3b9e81d><i class="bi bi-person text-white text-xl" data-v-d3b9e81d></i></div>`);
          }
          _push(`</div><div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700" data-v-d3b9e81d><div class="${ssrRenderClass([session.isOnline ? "bg-green-500 animate-pulse" : "bg-gray-500", "w-3 h-3 rounded-full"])}" data-v-d3b9e81d></div></div></div><div class="flex-1 min-w-0" data-v-d3b9e81d><div class="flex items-center justify-between mb-2" data-v-d3b9e81d><h4 class="text-white font-semibold text-base truncate" data-v-d3b9e81d>${ssrInterpolate(session.user_nickname || session.user_name || `用户 #${session.user_id}`)}</h4><span class="text-xs text-gray-500 flex-shrink-0 ml-2" data-v-d3b9e81d>${ssrInterpolate(formatTime(session.last_message_time || session.started_at))}</span></div><div class="mb-2" data-v-d3b9e81d><p class="text-sm text-gray-400 truncate leading-relaxed" data-v-d3b9e81d>${ssrInterpolate(session.last_message || "等待开始对话...")}</p></div><div class="flex items-center justify-between" data-v-d3b9e81d><div class="flex items-center space-x-2" data-v-d3b9e81d><span class="${ssrRenderClass([getSessionStatusClass(session.status), "text-xs px-2 py-1 rounded-lg font-medium"])}" data-v-d3b9e81d>${ssrInterpolate(getSessionStatusText(session.status))}</span>`);
          if (session.rating) {
            _push(`<div class="flex items-center" data-v-d3b9e81d><div class="flex mr-1" data-v-d3b9e81d><!--[-->`);
            ssrRenderList(5, (i) => {
              _push(`<i class="${ssrRenderClass([i <= session.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-xs"])}" data-v-d3b9e81d></i>`);
            });
            _push(`<!--]--></div><span class="text-xs text-gray-500" data-v-d3b9e81d>${ssrInterpolate(session.rating)}.0</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex items-center gap-1" data-v-d3b9e81d><div class="${ssrRenderClass([session.isOnline ? "bg-green-500 animate-pulse" : "bg-gray-500", "w-2 h-2 rounded-full"])}" data-v-d3b9e81d></div><span class="${ssrRenderClass([session.isOnline ? "text-green-400" : "text-gray-400", "text-xs"])}" data-v-d3b9e81d>${ssrInterpolate(session.isOnline ? "在线" : "离线")}</span></div></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div></div><div class="xl:col-span-3" data-v-d3b9e81d><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-right h-[750px] flex flex-col" data-v-d3b9e81d><div class="px-6 py-4 border-b border-gray-700/50 bg-gray-800/30" data-v-d3b9e81d><div class="flex items-center justify-between" data-v-d3b9e81d><div class="flex items-center gap-4" data-v-d3b9e81d><div class="${ssrRenderClass([currentChatUser.value.isCustomerService ? "border-cyan-500/50" : "border-gray-600/50", "w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border-2 shadow-lg transition-all duration-300"])}" data-v-d3b9e81d>`);
      if (currentChatUser.value.avatar) {
        _push(`<img${ssrRenderAttr("src", currentChatUser.value.avatar)}${ssrRenderAttr("alt", currentChatUser.value.name)} class="w-full h-full object-cover" data-v-d3b9e81d>`);
      } else {
        _push(`<div class="${ssrRenderClass([currentChatUser.value.isCustomerService ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-gray-500 to-gray-600", "w-full h-full flex items-center justify-center animate-pulse-gentle"])}" data-v-d3b9e81d><i class="${ssrRenderClass([currentChatUser.value.isCustomerService ? "bi bi-headset" : "bi bi-person", "text-white text-xl"])}" data-v-d3b9e81d></i></div>`);
      }
      _push(`</div><div data-v-d3b9e81d><h3 class="text-xl font-semibold text-white flex items-center gap-2" data-v-d3b9e81d>${ssrInterpolate(currentChatUser.value.name)} `);
      if (currentChatUser.value.isCustomerService) {
        _push(`<i class="bi bi-patch-check-fill text-cyan-400 text-lg" data-v-d3b9e81d></i>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h3><p class="text-sm text-gray-400 flex items-center gap-2" data-v-d3b9e81d><div class="${ssrRenderClass([currentChatUser.value.isCustomerService ? isConnected.value ? "bg-green-500 animate-pulse" : "bg-gray-500" : currentChatUser.value.isOnline ? "bg-green-500 animate-pulse" : "bg-gray-500", "w-2 h-2 rounded-full"])}" data-v-d3b9e81d></div> ${ssrInterpolate(currentChatUser.value.status)}</p></div></div><div class="flex items-center gap-3" data-v-d3b9e81d><div class="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-700/30" data-v-d3b9e81d><div class="${ssrRenderClass([isConnected.value ? "bg-green-500" : "bg-red-500", "w-2 h-2 rounded-full animate-pulse"])}" data-v-d3b9e81d></div><span class="text-xs text-gray-400 font-medium" data-v-d3b9e81d>${ssrInterpolate(isConnected.value ? "已连接" : "连接中...")}</span></div><div class="flex items-center gap-1" data-v-d3b9e81d><button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95" title="语音通话" data-v-d3b9e81d><i class="bi bi-telephone text-lg" data-v-d3b9e81d></i></button><button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95" title="更多选项" data-v-d3b9e81d><i class="bi bi-three-dots text-lg" data-v-d3b9e81d></i></button></div></div></div></div><div class="flex-1 overflow-y-auto p-6" data-v-d3b9e81d>`);
      if (messages.value.length === 0) {
        _push(`<div class="text-center py-16" data-v-d3b9e81d><div class="w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl" data-v-d3b9e81d><i class="bi bi-chat-heart text-4xl text-cyan-400" data-v-d3b9e81d></i></div><h3 class="text-2xl font-bold text-white mb-3" data-v-d3b9e81d>${ssrInterpolate(selectedSession.value ? `与 ${selectedSession.value.user_nickname || selectedSession.value.user_name || `用户
                  #${selectedSession.value.user_id}`} 的对话` : "欢迎使用在线客服")}</h3><p class="text-gray-400 mb-8 text-lg leading-relaxed max-w-md mx-auto" data-v-d3b9e81d>${ssrInterpolate(selectedSession.value ? "您正在与该用户进行私人对话，可以实时交流解决问题" : "有任何问题都可以在这里与我们沟通，您也可以从左侧选择特定用户进行对话")}</p><div class="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto" data-v-d3b9e81d><!--[-->`);
        ssrRenderList(quickMessages, (quickMsg, index) => {
          _push(`<button class="px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded-xl text-sm font-medium hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-in-up shadow-lg hover:shadow-cyan-400/20" style="${ssrRenderStyle({ animationDelay: `${index * 100}ms` })}" data-v-d3b9e81d>${ssrInterpolate(quickMsg)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!serviceStatus.value.adminOnline && messages.value.length > 0) {
        _push(`<div class="mb-6 animate-fade-in-up" data-v-d3b9e81d><div class="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 text-center transition-all duration-300 hover:bg-yellow-500/15 hover:border-yellow-400/50" data-v-d3b9e81d><i class="bi bi-info-circle text-yellow-400 mr-2 animate-pulse" data-v-d3b9e81d></i><span class="text-yellow-300 text-sm" data-v-d3b9e81d>当前暂无客服在线，您可以留言，我们会尽快回复您。</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-4" data-v-d3b9e81d><div${ssrRenderAttrs({
        name: "message",
        class: "space-y-4"
      })} data-v-d3b9e81d>`);
      ssrRenderList(messages.value, (message) => {
        var _a, _b, _c;
        _push(`<div class="${ssrRenderClass([isCurrentUserMessage(message) ? "justify-end" : "justify-start", "flex"])}" data-v-d3b9e81d>`);
        if (!isCurrentUserMessage(message)) {
          _push(`<div class="flex items-start gap-3 max-w-[70%]" data-v-d3b9e81d><div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-600/30" data-v-d3b9e81d>`);
          if (getMessageAvatar(message)) {
            _push(`<img${ssrRenderAttr("src", getMessageAvatar(message))}${ssrRenderAttr("alt", getMessageNickname(message))} class="w-full h-full object-cover" data-v-d3b9e81d>`);
          } else {
            _push(`<div class="${ssrRenderClass([isCustomerServiceMessage(message) ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-gray-500 to-gray-600", "w-full h-full rounded-full flex items-center justify-center"])}" data-v-d3b9e81d><i class="${ssrRenderClass([isCustomerServiceMessage(message) ? "bi bi-person-badge" : "bi bi-person", "text-white text-sm"])}" data-v-d3b9e81d></i></div>`);
          }
          _push(`</div><div data-v-d3b9e81d><div class="bg-gray-700/50 border border-gray-600/30 rounded-2xl rounded-tl-sm p-3 text-white" data-v-d3b9e81d>${ssrInterpolate(message.message || ((_a = message.data) == null ? void 0 : _a.message))}</div><div class="flex items-center gap-2 mt-1 ml-1" data-v-d3b9e81d><span class="${ssrRenderClass([isCustomerServiceMessage(message) ? "text-green-400" : "text-gray-400", "text-xs"])}" data-v-d3b9e81d>${ssrInterpolate(message.nickname || ((_b = message.data) == null ? void 0 : _b.nickname) || (isCustomerServiceMessage(message) ? "客服" : "用户"))}</span><span class="text-xs text-gray-500" data-v-d3b9e81d>${ssrInterpolate(formatTime(message.timestamp || message.created_at))}</span></div></div></div>`);
        } else {
          _push(`<div class="flex items-start gap-3 max-w-[70%] flex-row-reverse" data-v-d3b9e81d><div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-cyan-500/30" data-v-d3b9e81d>`);
          if (getUserAvatar(message)) {
            _push(`<img${ssrRenderAttr("src", getUserAvatar(message))}${ssrRenderAttr("alt", getUserNickname(message))} class="w-full h-full object-cover" data-v-d3b9e81d>`);
          } else {
            _push(`<div class="w-full h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center" data-v-d3b9e81d><i class="bi bi-person text-white text-sm" data-v-d3b9e81d></i></div>`);
          }
          _push(`</div><div class="text-right" data-v-d3b9e81d><div class="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl rounded-tr-sm p-3 text-white" data-v-d3b9e81d>${ssrInterpolate(message.message || ((_c = message.data) == null ? void 0 : _c.message))}</div><div class="flex items-center gap-2 mt-1 justify-end mr-1" data-v-d3b9e81d><span class="text-xs text-gray-500" data-v-d3b9e81d>${ssrInterpolate(formatTime(message.timestamp || message.created_at))}</span><span class="text-xs text-cyan-400" data-v-d3b9e81d>${ssrInterpolate(getUserNickname(message))}</span></div></div></div>`);
        }
        _push(`</div>`);
      });
      _push(`</div>`);
      if (isTyping.value && typingUsers.value.size > 0) {
        _push(`<div class="flex justify-start mt-4" data-v-d3b9e81d><!--[-->`);
        ssrRenderList(typingUsers.value, ([userId, userInfo]) => {
          _push(`<div class="flex items-start gap-3 max-w-[70%] animate-fade-in-up mb-2" data-v-d3b9e81d><div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-600/30" data-v-d3b9e81d>`);
          if (userInfo.avatar) {
            _push(`<img${ssrRenderAttr("src", userInfo.avatar)}${ssrRenderAttr("alt", userInfo.nickname)} class="w-full h-full object-cover" data-v-d3b9e81d>`);
          } else {
            _push(`<div class="w-full h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse-gentle" data-v-d3b9e81d><i class="bi bi-person-badge text-white text-sm" data-v-d3b9e81d></i></div>`);
          }
          _push(`</div><div data-v-d3b9e81d><div class="bg-gray-700/50 border border-gray-600/30 rounded-2xl rounded-tl-sm p-3" data-v-d3b9e81d><div class="flex gap-1" data-v-d3b9e81d><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" data-v-d3b9e81d></div><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="${ssrRenderStyle({ "animation-delay": "0.1s" })}" data-v-d3b9e81d></div><div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}" data-v-d3b9e81d></div></div></div><div class="flex items-center gap-2 mt-1 ml-1" data-v-d3b9e81d><span class="text-xs text-green-400" data-v-d3b9e81d>${ssrInterpolate(userInfo.nickname)}</span><span class="text-xs text-gray-500" data-v-d3b9e81d>正在输入...</span></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="px-6 py-4 border-t border-gray-700/50 bg-gray-800/20" data-v-d3b9e81d><div class="flex items-center justify-between mb-3" data-v-d3b9e81d><div class="flex items-center gap-2" data-v-d3b9e81d><button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95" title="附件" data-v-d3b9e81d><i class="bi bi-paperclip text-lg" data-v-d3b9e81d></i></button><button class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95" title="表情" data-v-d3b9e81d><i class="bi bi-emoji-smile text-lg" data-v-d3b9e81d></i></button></div><div class="flex items-center gap-3" data-v-d3b9e81d><span class="text-xs text-gray-500 flex items-center gap-1" data-v-d3b9e81d><i class="bi bi-keyboard" data-v-d3b9e81d></i> Enter 发送，Shift+Enter 换行 </span>`);
      if (newMessage.value.length > 0) {
        _push(`<div class="text-xs text-gray-500" data-v-d3b9e81d>${ssrInterpolate(newMessage.value.length)} 字符 </div>`);
      } else {
        _push(`<!---->`);
      }
      if (unreadCount.value > 0) {
        _push(`<button class="text-xs text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-105 active:scale-95 px-3 py-1 rounded-lg hover:bg-cyan-500/10 border border-cyan-500/20" data-v-d3b9e81d><i class="bi bi-check2-all mr-1" data-v-d3b9e81d></i> 标记已读 (${ssrInterpolate(unreadCount.value)}) </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-end gap-3" data-v-d3b9e81d><div class="flex-1 relative" data-v-d3b9e81d><textarea${ssrIncludeBooleanAttr(!isConnected.value) ? " disabled" : ""} placeholder="输入您的消息... (Enter 发送，Shift+Enter 换行)" rows="1" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white placeholder-gray-400 transition-all duration-300 resize-none hover:border-cyan-500/50 focus:scale-[1.01] min-h-[48px] max-h-32 hide-scrollbar" data-v-d3b9e81d>${ssrInterpolate(newMessage.value)}</textarea>`);
      if (isInputFocused.value) {
        _push(`<div class="absolute -top-6 left-2 text-xs text-cyan-400 bg-gray-800/80 px-2 py-1 rounded-lg" data-v-d3b9e81d> 正在输入... </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button${ssrIncludeBooleanAttr(!newMessage.value.trim() || !isConnected.value) ? " disabled" : ""} class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:shadow-none flex items-center gap-2 hover:scale-105 active:scale-95 min-h-[48px] flex-shrink-0" data-v-d3b9e81d><i class="bi bi-send text-lg" data-v-d3b9e81d></i><span class="hidden sm:inline" data-v-d3b9e81d>发送</span></button></div></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/customer-service.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customerService = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d3b9e81d"]]);
export {
  customerService as default
};
//# sourceMappingURL=customer-service-BvTi1C1u.js.map
