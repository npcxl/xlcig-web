import { _ as __nuxt_component_0 } from './PageLoader-DP__rW4X.mjs';
import { _ as __nuxt_component_0$1 } from './AppHeader-Baa9wtq1.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-D8iHomBq.mjs';
import { ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, withDirectives, vModelText, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { u as usePageLoader, p as pageLoaderPresets, o as ordersApi } from './orders-BDO9qxVR.mjs';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import { c as createDiscreteApi } from './useLocation-CdbkT8tR.mjs';
import './AppLogo-DGHjqzot.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'seemly';
import 'treemate';
import 'vooks';
import 'vdirs';
import 'lodash-es';
import 'css-render';
import 'evtd';
import 'pinia';
import '@css-render/plugin-bem';

const _sfc_main = {
  __name: "orders",
  __ssrInlineRender: true,
  setup(__props) {
    const { message } = createDiscreteApi(["message"]);
    const success = (content) => {
      message.success(content, { duration: 3e3 });
    };
    const error = (content) => {
      message.error(content, { duration: 4e3 });
    };
    const orders2 = ref([]);
    const selectedStatus = ref("all");
    const showReviewForm = ref(false);
    const reviewItem = ref(null);
    const reviewRating = ref(5);
    const reviewComment = ref("");
    const fetchOrders = async () => {
      try {
        const response = await ordersApi.getMyOrders();
        if (response.success && response.data) {
          orders2.value = response.data;
          return response.data;
        } else {
          orders2.value = [];
          return [];
        }
      } catch (error2) {
        console.error("\u83B7\u53D6\u8BA2\u5355\u5931\u8D25:", error2);
        throw new Error("\u83B7\u53D6\u8BA2\u5355\u6570\u636E\u5931\u8D25");
      }
    };
    const {
      isPageLoading,
      isDataLoading,
      hasError,
      errorMessage,
      reloadPage
    } = usePageLoader({
      ...pageLoaderPresets.standard,
      cacheKey: "orders",
      loadFunction: fetchOrders,
      onPageReady: (cachedData) => {
        if (cachedData) {
          orders2.value = cachedData;
        }
      }
    });
    const orderStatuses = ref([
      { value: "all", label: "\u5168\u90E8\u8BA2\u5355", icon: "bi-list-ul" },
      { value: "pending", label: "\u5F85\u652F\u4ED8", icon: "bi-clock" },
      { value: "processing", label: "\u5904\u7406\u4E2D", icon: "bi-gear" },
      { value: "shipped", label: "\u5DF2\u53D1\u8D27", icon: "bi-truck" },
      { value: "delivered", label: "\u5DF2\u9001\u8FBE", icon: "bi-check-circle" },
      { value: "cancelled", label: "\u5DF2\u53D6\u6D88", icon: "bi-x-circle" }
    ]);
    const filteredOrders = computed(() => {
      if (selectedStatus.value === "all") {
        return orders2.value;
      }
      return orders2.value.filter((order) => order.status === selectedStatus.value);
    });
    const getOrderCountByStatus = (status) => {
      if (status === "all") return orders2.value.length;
      return orders2.value.filter((order) => order.status === status).length;
    };
    const getStatusLabel = (status) => {
      const statusObj = orderStatuses.value.find((s) => s.value === status);
      return (statusObj == null ? void 0 : statusObj.label) || status;
    };
    const getStatusIcon = (status) => {
      const statusObj = orderStatuses.value.find((s) => s.value === status);
      return (statusObj == null ? void 0 : statusObj.icon) || "bi-circle";
    };
    const getStatusStyle = (status) => {
      const styles = {
        pending: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
        processing: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
        shipped: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
        delivered: "bg-green-500/20 text-green-300 border border-green-500/30",
        cancelled: "bg-red-500/20 text-red-300 border border-red-500/30"
      };
      return styles[status] || "bg-gray-500/20 text-gray-300 border border-gray-500/30";
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const showReviewModal = (item) => {
      reviewItem.value = item;
      reviewRating.value = 5;
      reviewComment.value = "";
      showReviewForm.value = true;
    };
    const closeReviewModal = () => {
      showReviewForm.value = false;
      reviewItem.value = null;
      reviewRating.value = 5;
      reviewComment.value = "";
    };
    const submitReview = () => {
      console.log("\u63D0\u4EA4\u8BC4\u4EF7:", {
        item: reviewItem.value,
        rating: reviewRating.value,
        comment: reviewComment.value
      });
      success("\u611F\u8C22\u60A8\u7684\u8BC4\u4EF7\uFF01");
      closeReviewModal();
    };
    const downloadInvoice = (order) => {
      console.log("\u4E0B\u8F7D\u8BA2\u5355\u53D1\u7968:", order.orderNumber);
      success("\u53D1\u7968\u4E0B\u8F7D\u5DF2\u5F00\u59CB\uFF01");
    };
    const cancelOrder = async (orderId) => {
      if (confirm("\u60A8\u786E\u5B9A\u8981\u53D6\u6D88\u8FD9\u4E2A\u8BA2\u5355\u5417\uFF1F")) {
        try {
          const response = await ordersApi.cancelOrder(orderId);
          if (response.success) {
            const orderIndex = orders2.value.findIndex((order) => order.id === orderId);
            if (orderIndex > -1) {
              orders2.value[orderIndex].status = "cancelled";
            }
            success("\u8BA2\u5355\u53D6\u6D88\u6210\u529F\uFF01");
          } else {
            error(response.message || "\u53D6\u6D88\u8BA2\u5355\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002");
          }
        } catch (error2) {
          console.error("\u53D6\u6D88\u8BA2\u5355\u5931\u8D25:", error2);
          error2("\u53D6\u6D88\u8BA2\u5355\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002");
        }
      }
    };
    const reorderItems = (order) => {
      try {
        if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
          error("\u8BE5\u8BA2\u5355\u6CA1\u6709\u5546\u54C1\u4FE1\u606F\uFF0C\u65E0\u6CD5\u91CD\u65B0\u4E0B\u5355\u3002");
          return;
        }
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        order.items.forEach((item) => {
          const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
          if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += item.quantity;
          } else {
            cartItems.push({ ...item });
          }
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        navigateTo("/checkout");
      } catch (error2) {
        console.error("\u91CD\u65B0\u4E0B\u5355\u5931\u8D25:", error2);
        error2("\u91CD\u65B0\u4E0B\u5355\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002");
      }
    };
    const getOrderItemIcon = (itemName) => {
      if (itemName.includes("RTX") || itemName.includes("RX") || itemName.includes("\u663E\u5361")) {
        return "bi bi-gpu-card text-cyan-400 text-xl";
      }
      if (itemName.includes("Intel") || itemName.includes("AMD") || itemName.includes("Ryzen") || itemName.includes("Core")) {
        return "bi bi-cpu text-orange-400 text-xl";
      }
      if (itemName.includes("\u4E3B\u677F") || itemName.includes("STRIX") || itemName.includes("MAG")) {
        return "bi bi-motherboard text-green-400 text-xl";
      }
      if (itemName.includes("\u7535\u6E90") || itemName.includes("PSU") || itemName.includes("Power")) {
        return "bi bi-lightning text-yellow-400 text-xl";
      }
      return "bi bi-pc-display text-gray-400 text-xl";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageLoader = __nuxt_component_0;
      const _component_AppHeader = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_PageLoader, mergeProps({
        "is-page-loading": unref(isPageLoading),
        "is-data-loading": unref(isDataLoading),
        "has-error": unref(hasError),
        "error-message": unref(errorMessage),
        "loading-title": "\u6B63\u5728\u52A0\u8F7D\u8BA2\u5355\u6570\u636E...",
        "loading-message": "\u8BF7\u7A0D\u5019",
        onRetry: unref(reloadPage)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" data-v-39d2c6a8${_scopeId}><div class="fixed inset-0 pointer-events-none" data-v-39d2c6a8${_scopeId}><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-39d2c6a8${_scopeId}></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-39d2c6a8${_scopeId}></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-39d2c6a8${_scopeId}></div></div>`);
            _push2(ssrRenderComponent(_component_AppHeader, {
              "show-back-button": false,
              "show-nav-menu": false,
              "show-breadcrumb": true,
              "show-location": false,
              "show-search-button": false,
              "show-notification-button": false,
              "show-decorations": false,
              "logo-size": "medium",
              "current-page-title": "\u6211\u7684\u8BA2\u5355"
            }, null, _parent2, _scopeId));
            _push2(`<section class="relative z-10" data-v-39d2c6a8${_scopeId}><div class="container mx-auto px-6 py-8" data-v-39d2c6a8${_scopeId}><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-39d2c6a8${_scopeId}><div class="flex items-center justify-between" data-v-39d2c6a8${_scopeId}><div data-v-39d2c6a8${_scopeId}><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-39d2c6a8${_scopeId}><i class="bi bi-bag-check text-cyan-400 text-3xl animate-bounce-gentle" data-v-39d2c6a8${_scopeId}></i> \u6211\u7684\u8BA2\u5355 </h1><p class="text-gray-300 text-lg" data-v-39d2c6a8${_scopeId}>\u67E5\u770B\u548C\u7BA1\u7406\u60A8\u7684\u8BA2\u5355\u5386\u53F2</p></div><div class="text-right" data-v-39d2c6a8${_scopeId}><div class="text-3xl font-bold text-cyan-400" data-v-39d2c6a8${_scopeId}>${ssrInterpolate(orders2.value.length)}</div><div class="text-gray-400 text-sm" data-v-39d2c6a8${_scopeId}>\u8BA2\u5355\u603B\u6570</div></div></div></div></div></section><section class="relative z-10" data-v-39d2c6a8${_scopeId}><div class="container mx-auto px-6 py-4" data-v-39d2c6a8${_scopeId}><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-39d2c6a8${_scopeId}><div class="flex flex-wrap items-center gap-4" data-v-39d2c6a8${_scopeId}><div class="flex items-center gap-2" data-v-39d2c6a8${_scopeId}><i class="bi bi-funnel text-cyan-400" data-v-39d2c6a8${_scopeId}></i><span class="text-white font-medium" data-v-39d2c6a8${_scopeId}>\u6309\u72B6\u6001\u7B5B\u9009\uFF1A</span></div><div class="flex flex-wrap gap-2" data-v-39d2c6a8${_scopeId}><!--[-->`);
            ssrRenderList(orderStatuses.value, (status) => {
              _push2(`<button class="${ssrRenderClass([
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                selectedStatus.value === status.value ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40" : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent"
              ])}" data-v-39d2c6a8${_scopeId}><i class="${ssrRenderClass([status.icon, "mr-2"])}" data-v-39d2c6a8${_scopeId}></i> ${ssrInterpolate(status.label)} <span class="ml-2 text-xs opacity-75" data-v-39d2c6a8${_scopeId}>(${ssrInterpolate(getOrderCountByStatus(status.value))})</span></button>`);
            });
            _push2(`<!--]--></div></div></div></div></section><main class="container mx-auto px-6 py-8 relative z-10" data-v-39d2c6a8${_scopeId}>`);
            if (filteredOrders.value.length === 0) {
              _push2(`<div class="text-center py-16" data-v-39d2c6a8${_scopeId}><div class="glass-card-dark rounded-2xl border border-cyan-500/30 p-20 shadow-2xl shadow-cyan-500/20 max-w-lg mx-auto" data-v-39d2c6a8${_scopeId}><div class="text-8xl mb-8 text-cyan-400 opacity-50" data-v-39d2c6a8${_scopeId}><i class="bi bi-bag-x" data-v-39d2c6a8${_scopeId}></i></div><h3 class="text-3xl font-bold text-white mb-4" data-v-39d2c6a8${_scopeId}>\u672A\u627E\u5230\u8BA2\u5355</h3><p class="text-gray-400 mb-8 text-lg" data-v-39d2c6a8${_scopeId}>${ssrInterpolate(selectedStatus.value === "all" ? "\u60A8\u8FD8\u6CA1\u6709\u4E0B\u8FC7\u4EFB\u4F55\u8BA2\u5355" : `\u6CA1\u6709\u72B6\u6001\u4E3A"${getStatusLabel(selectedStatus.value)}"\u7684\u8BA2\u5355`)}</p><div class="space-y-4" data-v-39d2c6a8${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/products",
                class: "inline-flex items-center justify-center px-8 py-3 bg-cyan-600 text-white font-medium rounded-xl hover:bg-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="bi bi-plus-circle mr-2" data-v-39d2c6a8${_scopeId2}></i> \u5F00\u59CB\u8D2D\u7269 `);
                  } else {
                    return [
                      createVNode("i", { class: "bi bi-plus-circle mr-2" }),
                      createTextVNode(" \u5F00\u59CB\u8D2D\u7269 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (selectedStatus.value !== "all") {
                _push2(`<button class="block w-full px-8 py-3 border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300" data-v-39d2c6a8${_scopeId}> \u67E5\u770B\u6240\u6709\u8BA2\u5355 </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<div class="space-y-6" data-v-39d2c6a8${_scopeId}><!--[-->`);
              ssrRenderList(filteredOrders.value, (order) => {
                var _a;
                _push2(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-colors duration-300" data-v-39d2c6a8${_scopeId}><div class="px-8 py-6 border-b border-gray-700/50 bg-gray-800/30" data-v-39d2c6a8${_scopeId}><div class="flex flex-wrap items-center justify-between gap-4" data-v-39d2c6a8${_scopeId}><div class="flex items-center gap-4" data-v-39d2c6a8${_scopeId}><div data-v-39d2c6a8${_scopeId}><h3 class="text-xl font-bold text-white mb-1" data-v-39d2c6a8${_scopeId}>\u8BA2\u5355 #${ssrInterpolate(order.orderNumber)}</h3><p class="text-gray-400 text-sm" data-v-39d2c6a8${_scopeId}>\u4E0B\u5355\u65F6\u95F4\uFF1A${ssrInterpolate(formatDate(order.createdAt))}</p></div><div class="${ssrRenderClass([
                  "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium",
                  getStatusStyle(order.status)
                ])}" data-v-39d2c6a8${_scopeId}><i class="${ssrRenderClass([getStatusIcon(order.status), "mr-2"])}" data-v-39d2c6a8${_scopeId}></i> ${ssrInterpolate(getStatusLabel(order.status))}</div></div><div class="text-right" data-v-39d2c6a8${_scopeId}><div class="text-2xl font-bold text-cyan-400" data-v-39d2c6a8${_scopeId}>\xA5${ssrInterpolate(order.total.toLocaleString())}</div><div class="text-gray-400 text-sm" data-v-39d2c6a8${_scopeId}>${ssrInterpolate(((_a = order.items) == null ? void 0 : _a.length) || 0)} \u4EF6\u5546\u54C1</div></div></div></div><div class="p-8" data-v-39d2c6a8${_scopeId}><div class="space-y-4" data-v-39d2c6a8${_scopeId}><!--[-->`);
                ssrRenderList(order.items || [], (item) => {
                  _push2(`<div class="flex items-center gap-6 p-4 bg-gray-800/20 rounded-xl border border-gray-700/30" data-v-39d2c6a8${_scopeId}><div class="w-20 h-20 bg-gray-700/50 rounded-lg overflow-hidden" data-v-39d2c6a8${_scopeId}>`);
                  if (item.image) {
                    _push2(`<div class="order-item-image-container" data-v-39d2c6a8${_scopeId}><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-contain p-2" data-v-39d2c6a8${_scopeId}></div>`);
                  } else {
                    _push2(`<div class="order-item-placeholder" data-v-39d2c6a8${_scopeId}><i class="${ssrRenderClass(getOrderItemIcon(item.name))}" data-v-39d2c6a8${_scopeId}></i></div>`);
                  }
                  _push2(`</div><div class="flex-1" data-v-39d2c6a8${_scopeId}><h4 class="font-semibold text-white text-lg mb-1" data-v-39d2c6a8${_scopeId}>${ssrInterpolate(item.name)}</h4><p class="text-gray-400 text-sm mb-2" data-v-39d2c6a8${_scopeId}>${ssrInterpolate(item.brand)}</p><div class="flex items-center gap-4" data-v-39d2c6a8${_scopeId}><span class="text-cyan-400 font-semibold" data-v-39d2c6a8${_scopeId}>\xA5${ssrInterpolate(item.price.toLocaleString())}</span><span class="text-gray-400 text-sm" data-v-39d2c6a8${_scopeId}>\u6570\u91CF\uFF1A${ssrInterpolate(item.quantity)}</span></div></div><div class="flex flex-col gap-2" data-v-39d2c6a8${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    to: `/products/${item.id}`,
                    class: "px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors duration-300 text-center"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` \u67E5\u770B\u5546\u54C1 `);
                      } else {
                        return [
                          createTextVNode(" \u67E5\u770B\u5546\u54C1 ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  if (order.status === "delivered") {
                    _push2(`<button class="px-4 py-2 text-sm border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300" data-v-39d2c6a8${_scopeId}> \u5199\u8BC4\u4EF7 </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div></div><div class="px-8 py-6 border-t border-gray-700/50 bg-gray-800/20" data-v-39d2c6a8${_scopeId}><div class="flex flex-wrap items-center justify-between gap-4" data-v-39d2c6a8${_scopeId}><div class="flex items-center gap-6" data-v-39d2c6a8${_scopeId}><div class="flex items-center gap-3" data-v-39d2c6a8${_scopeId}><i class="bi bi-truck text-cyan-400" data-v-39d2c6a8${_scopeId}></i><span class="text-white font-medium" data-v-39d2c6a8${_scopeId}>\u7269\u6D41\u5355\u53F7\uFF1A</span><span class="text-gray-400" data-v-39d2c6a8${_scopeId}>${ssrInterpolate(order.trackingNumber || "\u6682\u65E0")}</span></div>`);
                if (order.estimatedDelivery) {
                  _push2(`<div class="flex items-center gap-3" data-v-39d2c6a8${_scopeId}><i class="bi bi-calendar-event text-cyan-400" data-v-39d2c6a8${_scopeId}></i><span class="text-white font-medium" data-v-39d2c6a8${_scopeId}>\u9884\u8BA1\u9001\u8FBE\uFF1A</span><span class="text-gray-400" data-v-39d2c6a8${_scopeId}>${ssrInterpolate(formatDate(order.estimatedDelivery))}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex flex-wrap items-center gap-3" data-v-39d2c6a8${_scopeId}><button class="px-4 py-2 text-sm border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2" data-v-39d2c6a8${_scopeId}><i class="bi bi-download" data-v-39d2c6a8${_scopeId}></i> \u4E0B\u8F7D\u53D1\u7968 </button>`);
                if (order.status === "pending" || order.status === "processing") {
                  _push2(`<button class="px-4 py-2 text-sm border border-red-600 hover:border-red-500 text-red-300 hover:text-red-200 font-medium rounded-lg transition-colors duration-300 flex items-center gap-2" data-v-39d2c6a8${_scopeId}><i class="bi bi-x-circle" data-v-39d2c6a8${_scopeId}></i> \u53D6\u6D88\u8BA2\u5355 </button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (order.status === "delivered") {
                  _push2(`<button class="px-4 py-2 text-sm bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2" data-v-39d2c6a8${_scopeId}><i class="bi bi-arrow-repeat" data-v-39d2c6a8${_scopeId}></i> \u518D\u6B21\u8D2D\u4E70 </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</main>`);
            if (showReviewForm.value) {
              _push2(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-39d2c6a8${_scopeId}><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-md w-full" data-v-39d2c6a8${_scopeId}><h3 class="text-2xl font-bold text-white mb-6" data-v-39d2c6a8${_scopeId}>\u5199\u5546\u54C1\u8BC4\u4EF7</h3>`);
              if (reviewItem.value) {
                _push2(`<div class="mb-6" data-v-39d2c6a8${_scopeId}><div class="flex items-center gap-4 mb-4" data-v-39d2c6a8${_scopeId}><img${ssrRenderAttr("src", reviewItem.value.image)}${ssrRenderAttr("alt", reviewItem.value.name)} class="w-16 h-16 object-contain bg-gray-700/50 rounded-lg p-2" data-v-39d2c6a8${_scopeId}><div data-v-39d2c6a8${_scopeId}><h4 class="font-semibold text-white" data-v-39d2c6a8${_scopeId}>${ssrInterpolate(reviewItem.value.name)}</h4><p class="text-gray-400 text-sm" data-v-39d2c6a8${_scopeId}>${ssrInterpolate(reviewItem.value.brand)}</p></div></div><div class="space-y-4" data-v-39d2c6a8${_scopeId}><div data-v-39d2c6a8${_scopeId}><label class="block text-sm font-medium text-white mb-2" data-v-39d2c6a8${_scopeId}>\u8BC4\u5206</label><div class="flex gap-2" data-v-39d2c6a8${_scopeId}><!--[-->`);
                ssrRenderList(5, (star) => {
                  _push2(`<button class="${ssrRenderClass([star <= reviewRating.value ? "text-yellow-400" : "text-gray-600", "text-2xl hover:text-yellow-400 transition-colors duration-200"])}" data-v-39d2c6a8${_scopeId}><i class="bi bi-star-fill" data-v-39d2c6a8${_scopeId}></i></button>`);
                });
                _push2(`<!--]--></div></div><div data-v-39d2c6a8${_scopeId}><label class="block text-sm font-medium text-white mb-2" data-v-39d2c6a8${_scopeId}>\u8BC4\u4EF7\u5185\u5BB9</label><textarea rows="4" placeholder="\u5206\u4EAB\u60A8\u5BF9\u8FD9\u4E2A\u4EA7\u54C1\u7684\u4F7F\u7528\u4F53\u9A8C..." class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none" data-v-39d2c6a8${_scopeId}>${ssrInterpolate(reviewComment.value)}</textarea></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex gap-3" data-v-39d2c6a8${_scopeId}><button class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-39d2c6a8${_scopeId}> \u63D0\u4EA4\u8BC4\u4EF7 </button><button class="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-39d2c6a8${_scopeId}> \u53D6\u6D88 </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, [
                createVNode("div", { class: "fixed inset-0 pointer-events-none" }, [
                  createVNode("div", { class: "absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" }),
                  createVNode("div", { class: "absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" }),
                  createVNode("div", { class: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" })
                ]),
                createVNode(_component_AppHeader, {
                  "show-back-button": false,
                  "show-nav-menu": false,
                  "show-breadcrumb": true,
                  "show-location": false,
                  "show-search-button": false,
                  "show-notification-button": false,
                  "show-decorations": false,
                  "logo-size": "medium",
                  "current-page-title": "\u6211\u7684\u8BA2\u5355"
                }),
                createVNode("section", { class: "relative z-10" }, [
                  createVNode("div", { class: "container mx-auto px-6 py-8" }, [
                    createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-4xl font-bold text-white mb-3 flex items-center gap-3" }, [
                            createVNode("i", { class: "bi bi-bag-check text-cyan-400 text-3xl animate-bounce-gentle" }),
                            createTextVNode(" \u6211\u7684\u8BA2\u5355 ")
                          ]),
                          createVNode("p", { class: "text-gray-300 text-lg" }, "\u67E5\u770B\u548C\u7BA1\u7406\u60A8\u7684\u8BA2\u5355\u5386\u53F2")
                        ]),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("div", { class: "text-3xl font-bold text-cyan-400" }, toDisplayString(orders2.value.length), 1),
                          createVNode("div", { class: "text-gray-400 text-sm" }, "\u8BA2\u5355\u603B\u6570")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("section", { class: "relative z-10" }, [
                  createVNode("div", { class: "container mx-auto px-6 py-4" }, [
                    createVNode("div", { class: "glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" }, [
                      createVNode("div", { class: "flex flex-wrap items-center gap-4" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("i", { class: "bi bi-funnel text-cyan-400" }),
                          createVNode("span", { class: "text-white font-medium" }, "\u6309\u72B6\u6001\u7B5B\u9009\uFF1A")
                        ]),
                        createVNode("div", { class: "flex flex-wrap gap-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(orderStatuses.value, (status) => {
                            return openBlock(), createBlock("button", {
                              key: status.value,
                              onClick: ($event) => selectedStatus.value = status.value,
                              class: [
                                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                                selectedStatus.value === status.value ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40" : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent"
                              ]
                            }, [
                              createVNode("i", {
                                class: [status.icon, "mr-2"]
                              }, null, 2),
                              createTextVNode(" " + toDisplayString(status.label) + " ", 1),
                              createVNode("span", { class: "ml-2 text-xs opacity-75" }, "(" + toDisplayString(getOrderCountByStatus(status.value)) + ")", 1)
                            ], 10, ["onClick"]);
                          }), 128))
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("main", { class: "container mx-auto px-6 py-8 relative z-10" }, [
                  filteredOrders.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-16"
                  }, [
                    createVNode("div", { class: "glass-card-dark rounded-2xl border border-cyan-500/30 p-20 shadow-2xl shadow-cyan-500/20 max-w-lg mx-auto" }, [
                      createVNode("div", { class: "text-8xl mb-8 text-cyan-400 opacity-50" }, [
                        createVNode("i", { class: "bi bi-bag-x" })
                      ]),
                      createVNode("h3", { class: "text-3xl font-bold text-white mb-4" }, "\u672A\u627E\u5230\u8BA2\u5355"),
                      createVNode("p", { class: "text-gray-400 mb-8 text-lg" }, toDisplayString(selectedStatus.value === "all" ? "\u60A8\u8FD8\u6CA1\u6709\u4E0B\u8FC7\u4EFB\u4F55\u8BA2\u5355" : `\u6CA1\u6709\u72B6\u6001\u4E3A"${getStatusLabel(selectedStatus.value)}"\u7684\u8BA2\u5355`), 1),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode(_component_NuxtLink, {
                          to: "/products",
                          class: "inline-flex items-center justify-center px-8 py-3 bg-cyan-600 text-white font-medium rounded-xl hover:bg-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                        }, {
                          default: withCtx(() => [
                            createVNode("i", { class: "bi bi-plus-circle mr-2" }),
                            createTextVNode(" \u5F00\u59CB\u8D2D\u7269 ")
                          ]),
                          _: 1
                        }),
                        selectedStatus.value !== "all" ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => selectedStatus.value = "all",
                          class: "block w-full px-8 py-3 border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300"
                        }, " \u67E5\u770B\u6240\u6709\u8BA2\u5355 ", 8, ["onClick"])) : createCommentVNode("", true)
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-6"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredOrders.value, (order) => {
                      var _a;
                      return openBlock(), createBlock("div", {
                        key: order.id,
                        class: "glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-colors duration-300"
                      }, [
                        createVNode("div", { class: "px-8 py-6 border-b border-gray-700/50 bg-gray-800/30" }, [
                          createVNode("div", { class: "flex flex-wrap items-center justify-between gap-4" }, [
                            createVNode("div", { class: "flex items-center gap-4" }, [
                              createVNode("div", null, [
                                createVNode("h3", { class: "text-xl font-bold text-white mb-1" }, "\u8BA2\u5355 #" + toDisplayString(order.orderNumber), 1),
                                createVNode("p", { class: "text-gray-400 text-sm" }, "\u4E0B\u5355\u65F6\u95F4\uFF1A" + toDisplayString(formatDate(order.createdAt)), 1)
                              ]),
                              createVNode("div", {
                                class: [
                                  "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium",
                                  getStatusStyle(order.status)
                                ]
                              }, [
                                createVNode("i", {
                                  class: [getStatusIcon(order.status), "mr-2"]
                                }, null, 2),
                                createTextVNode(" " + toDisplayString(getStatusLabel(order.status)), 1)
                              ], 2)
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("div", { class: "text-2xl font-bold text-cyan-400" }, "\xA5" + toDisplayString(order.total.toLocaleString()), 1),
                              createVNode("div", { class: "text-gray-400 text-sm" }, toDisplayString(((_a = order.items) == null ? void 0 : _a.length) || 0) + " \u4EF6\u5546\u54C1", 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "p-8" }, [
                          createVNode("div", { class: "space-y-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(order.items || [], (item) => {
                              return openBlock(), createBlock("div", {
                                key: item.id,
                                class: "flex items-center gap-6 p-4 bg-gray-800/20 rounded-xl border border-gray-700/30"
                              }, [
                                createVNode("div", { class: "w-20 h-20 bg-gray-700/50 rounded-lg overflow-hidden" }, [
                                  item.image ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "order-item-image-container"
                                  }, [
                                    createVNode("img", {
                                      src: item.image,
                                      alt: item.name,
                                      class: "w-full h-full object-contain p-2",
                                      onError: ($event) => $event.target.style.display = "none"
                                    }, null, 40, ["src", "alt", "onError"])
                                  ])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "order-item-placeholder"
                                  }, [
                                    createVNode("i", {
                                      class: getOrderItemIcon(item.name)
                                    }, null, 2)
                                  ]))
                                ]),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("h4", { class: "font-semibold text-white text-lg mb-1" }, toDisplayString(item.name), 1),
                                  createVNode("p", { class: "text-gray-400 text-sm mb-2" }, toDisplayString(item.brand), 1),
                                  createVNode("div", { class: "flex items-center gap-4" }, [
                                    createVNode("span", { class: "text-cyan-400 font-semibold" }, "\xA5" + toDisplayString(item.price.toLocaleString()), 1),
                                    createVNode("span", { class: "text-gray-400 text-sm" }, "\u6570\u91CF\uFF1A" + toDisplayString(item.quantity), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "flex flex-col gap-2" }, [
                                  createVNode(_component_NuxtLink, {
                                    to: `/products/${item.id}`,
                                    class: "px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors duration-300 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" \u67E5\u770B\u5546\u54C1 ")
                                    ]),
                                    _: 2
                                  }, 1032, ["to"]),
                                  order.status === "delivered" ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    onClick: ($event) => showReviewModal(item),
                                    class: "px-4 py-2 text-sm border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300"
                                  }, " \u5199\u8BC4\u4EF7 ", 8, ["onClick"])) : createCommentVNode("", true)
                                ])
                              ]);
                            }), 128))
                          ])
                        ]),
                        createVNode("div", { class: "px-8 py-6 border-t border-gray-700/50 bg-gray-800/20" }, [
                          createVNode("div", { class: "flex flex-wrap items-center justify-between gap-4" }, [
                            createVNode("div", { class: "flex items-center gap-6" }, [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode("i", { class: "bi bi-truck text-cyan-400" }),
                                createVNode("span", { class: "text-white font-medium" }, "\u7269\u6D41\u5355\u53F7\uFF1A"),
                                createVNode("span", { class: "text-gray-400" }, toDisplayString(order.trackingNumber || "\u6682\u65E0"), 1)
                              ]),
                              order.estimatedDelivery ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center gap-3"
                              }, [
                                createVNode("i", { class: "bi bi-calendar-event text-cyan-400" }),
                                createVNode("span", { class: "text-white font-medium" }, "\u9884\u8BA1\u9001\u8FBE\uFF1A"),
                                createVNode("span", { class: "text-gray-400" }, toDisplayString(formatDate(order.estimatedDelivery)), 1)
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                              createVNode("button", {
                                onClick: ($event) => downloadInvoice(order),
                                class: "px-4 py-2 text-sm border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
                              }, [
                                createVNode("i", { class: "bi bi-download" }),
                                createTextVNode(" \u4E0B\u8F7D\u53D1\u7968 ")
                              ], 8, ["onClick"]),
                              order.status === "pending" || order.status === "processing" ? (openBlock(), createBlock("button", {
                                key: 0,
                                onClick: ($event) => cancelOrder(order.id),
                                class: "px-4 py-2 text-sm border border-red-600 hover:border-red-500 text-red-300 hover:text-red-200 font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
                              }, [
                                createVNode("i", { class: "bi bi-x-circle" }),
                                createTextVNode(" \u53D6\u6D88\u8BA2\u5355 ")
                              ], 8, ["onClick"])) : createCommentVNode("", true),
                              order.status === "delivered" ? (openBlock(), createBlock("button", {
                                key: 1,
                                onClick: ($event) => reorderItems(order),
                                class: "px-4 py-2 text-sm bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
                              }, [
                                createVNode("i", { class: "bi bi-arrow-repeat" }),
                                createTextVNode(" \u518D\u6B21\u8D2D\u4E70 ")
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ]);
                    }), 128))
                  ]))
                ]),
                showReviewForm.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                }, [
                  createVNode("div", { class: "glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-md w-full" }, [
                    createVNode("h3", { class: "text-2xl font-bold text-white mb-6" }, "\u5199\u5546\u54C1\u8BC4\u4EF7"),
                    reviewItem.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-6"
                    }, [
                      createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                        createVNode("img", {
                          src: reviewItem.value.image,
                          alt: reviewItem.value.name,
                          class: "w-16 h-16 object-contain bg-gray-700/50 rounded-lg p-2"
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-semibold text-white" }, toDisplayString(reviewItem.value.name), 1),
                          createVNode("p", { class: "text-gray-400 text-sm" }, toDisplayString(reviewItem.value.brand), 1)
                        ])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-white mb-2" }, "\u8BC4\u5206"),
                          createVNode("div", { class: "flex gap-2" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (star) => {
                              return createVNode("button", {
                                key: star,
                                onClick: ($event) => reviewRating.value = star,
                                class: [star <= reviewRating.value ? "text-yellow-400" : "text-gray-600", "text-2xl hover:text-yellow-400 transition-colors duration-200"]
                              }, [
                                createVNode("i", { class: "bi bi-star-fill" })
                              ], 10, ["onClick"]);
                            }), 64))
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-white mb-2" }, "\u8BC4\u4EF7\u5185\u5BB9"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => reviewComment.value = $event,
                            rows: "4",
                            placeholder: "\u5206\u4EAB\u60A8\u5BF9\u8FD9\u4E2A\u4EA7\u54C1\u7684\u4F7F\u7528\u4F53\u9A8C...",
                            class: "w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, reviewComment.value]
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex gap-3" }, [
                      createVNode("button", {
                        onClick: submitReview,
                        class: "flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                      }, " \u63D0\u4EA4\u8BC4\u4EF7 "),
                      createVNode("button", {
                        onClick: closeReviewModal,
                        class: "flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                      }, " \u53D6\u6D88 ")
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const orders = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-39d2c6a8"]]);

export { orders as default };
//# sourceMappingURL=orders-CwrdKYbl.mjs.map
