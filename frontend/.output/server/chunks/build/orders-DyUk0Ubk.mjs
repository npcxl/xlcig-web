import { _ as __nuxt_component_0 } from './AppLogo-C8xp92Ad.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dq0IxfZC.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { u as useHead } from './v3-B75LsvLO.mjs';
import { _ as _export_sfc } from './server.mjs';
import { K as createDiscreteApi } from './discrete-DcZNj1Jm.mjs';
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
import 'pinia';
import 'vue-router';
import 'seemly';
import 'vooks';
import 'vdirs';
import 'css-render';
import '@css-render/plugin-bem';
import 'lodash-es';
import 'evtd';

const _sfc_main = {
  __name: "orders",
  __ssrInlineRender: true,
  setup(__props) {
    const { message } = createDiscreteApi(["message"]);
    const orders2 = ref([]);
    const loading = ref(true);
    const selectedStatus = ref("all");
    const showReviewForm = ref(false);
    const reviewItem = ref(null);
    const reviewRating = ref(5);
    const reviewComment = ref("");
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
    useHead({
      title: "\u6211\u7684\u8BA2\u5355 - xlCig",
      meta: [
        { name: "description", content: "\u67E5\u770B\u60A8\u7684\u8BA2\u5355\u72B6\u6001\u548C\u5386\u53F2\u8BB0\u5F55" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-38fd0510><div class="fixed inset-0 pointer-events-none" data-v-38fd0510><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-38fd0510></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-38fd0510></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-38fd0510></div></div><nav class="relative z-10" data-v-38fd0510><div class="container mx-auto px-6 py-6" data-v-38fd0510><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-38fd0510><div class="flex items-center justify-between" data-v-38fd0510><div class="flex items-center space-x-6" data-v-38fd0510>`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "medium",
        "show-decorations": false
      }, null, _parent));
      _push(`<div class="h-6 w-px bg-gray-600" data-v-38fd0510></div><button class="group relative inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden" data-v-38fd0510><div class="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-xl transition-all duration-300 group-hover:from-cyan-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30" data-v-38fd0510></div><div class="absolute inset-0 border-2 border-cyan-500/30 rounded-xl transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-400/25" data-v-38fd0510></div><div class="absolute inset-0 rounded-xl overflow-hidden" data-v-38fd0510><div class="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "20%", "left": "15%", "animation-delay": "0s" })}" data-v-38fd0510></div><div class="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "60%", "left": "80%", "animation-delay": "0.2s" })}" data-v-38fd0510></div><div class="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "80%", "left": "30%", "animation-delay": "0.4s" })}" data-v-38fd0510></div></div><div class="relative flex items-center" data-v-38fd0510><div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mr-3 transition-all duration-300 group-hover:from-cyan-400/40 group-hover:to-blue-400/40 group-hover:scale-110" data-v-38fd0510><i class="bi bi-arrow-left text-cyan-400 text-lg transition-all duration-300 group-hover:text-white group-hover:-translate-x-1" data-v-38fd0510></i></div><div class="text-left" data-v-38fd0510><div class="text-white text-sm font-semibold transition-all duration-300 group-hover:text-cyan-100" data-v-38fd0510>\u8FD4\u56DE</div><div class="text-gray-400 text-xs transition-all duration-300 group-hover:text-cyan-300" data-v-38fd0510>Back</div></div></div><div class="absolute right-3 top-1/2 transform -translate-y-1/2" data-v-38fd0510><div class="flex flex-col space-y-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300" data-v-38fd0510><div class="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full transition-all duration-300 group-hover:w-8" data-v-38fd0510></div><div class="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full transition-all duration-300 group-hover:w-6 delay-75" data-v-38fd0510></div><div class="w-2 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full transition-all duration-300 group-hover:w-4 delay-150" data-v-38fd0510></div></div></div></button></div><nav class="text-sm text-gray-400" data-v-38fd0510>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-cyan-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u9996\u9875`);
          } else {
            return [
              createTextVNode("\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-38fd0510></i><span class="text-white font-medium" data-v-38fd0510>\u6211\u7684\u8BA2\u5355</span></nav></div></div></div></nav><section class="relative z-10" data-v-38fd0510><div class="container mx-auto px-6 py-8" data-v-38fd0510><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-38fd0510><div class="flex items-center justify-between" data-v-38fd0510><div data-v-38fd0510><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-38fd0510><i class="bi bi-bag-check text-cyan-400 text-3xl" data-v-38fd0510></i> \u6211\u7684\u8BA2\u5355 </h1><p class="text-gray-300 text-lg" data-v-38fd0510>\u67E5\u770B\u548C\u7BA1\u7406\u60A8\u7684\u8BA2\u5355\u5386\u53F2</p></div><div class="text-right" data-v-38fd0510><div class="text-3xl font-bold text-cyan-400" data-v-38fd0510>${ssrInterpolate(orders2.value.length)}</div><div class="text-gray-400 text-sm" data-v-38fd0510>\u8BA2\u5355\u603B\u6570</div></div></div></div></div></section><section class="relative z-10" data-v-38fd0510><div class="container mx-auto px-6 py-4" data-v-38fd0510><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-38fd0510><div class="flex flex-wrap items-center gap-4" data-v-38fd0510><div class="flex items-center gap-2" data-v-38fd0510><i class="bi bi-funnel text-cyan-400" data-v-38fd0510></i><span class="text-white font-medium" data-v-38fd0510>\u6309\u72B6\u6001\u7B5B\u9009\uFF1A</span></div><div class="flex flex-wrap gap-2" data-v-38fd0510><!--[-->`);
      ssrRenderList(orderStatuses.value, (status) => {
        _push(`<button class="${ssrRenderClass([
          "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
          selectedStatus.value === status.value ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40" : "text-gray-300 hover:bg-white/5 hover:text-white border border-transparent"
        ])}" data-v-38fd0510><i class="${ssrRenderClass([status.icon, "mr-2"])}" data-v-38fd0510></i> ${ssrInterpolate(status.label)} <span class="ml-2 text-xs opacity-75" data-v-38fd0510>(${ssrInterpolate(getOrderCountByStatus(status.value))})</span></button>`);
      });
      _push(`<!--]--></div></div></div></div></section><main class="container mx-auto px-6 py-8 relative z-10" data-v-38fd0510>`);
      if (loading.value) {
        _push(`<div class="text-center py-16" data-v-38fd0510><div class="inline-flex flex-col items-center glass-card-dark rounded-2xl border border-cyan-500/30 p-16 shadow-2xl shadow-cyan-500/20" data-v-38fd0510><div class="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-8" data-v-38fd0510></div><p class="text-2xl font-medium text-white" data-v-38fd0510>\u6B63\u5728\u52A0\u8F7D\u60A8\u7684\u8BA2\u5355...</p><p class="text-gray-400 mt-2" data-v-38fd0510>\u8BF7\u7A0D\u5019</p></div></div>`);
      } else if (unref(filteredOrders).length === 0) {
        _push(`<div class="text-center py-16" data-v-38fd0510><div class="glass-card-dark rounded-2xl border border-cyan-500/30 p-20 shadow-2xl shadow-cyan-500/20 max-w-lg mx-auto" data-v-38fd0510><div class="text-8xl mb-8 text-cyan-400 opacity-50" data-v-38fd0510><i class="bi bi-bag-x" data-v-38fd0510></i></div><h3 class="text-3xl font-bold text-white mb-4" data-v-38fd0510>\u672A\u627E\u5230\u8BA2\u5355</h3><p class="text-gray-400 mb-8 text-lg" data-v-38fd0510>${ssrInterpolate(selectedStatus.value === "all" ? "\u60A8\u8FD8\u6CA1\u6709\u4E0B\u8FC7\u4EFB\u4F55\u8BA2\u5355" : `\u6CA1\u6709\u72B6\u6001\u4E3A"${getStatusLabel(selectedStatus.value)}"\u7684\u8BA2\u5355`)}</p><div class="space-y-4" data-v-38fd0510>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "inline-flex items-center justify-center px-8 py-4 bg-cyan-600 text-white font-medium rounded-xl hover:bg-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="bi bi-plus-circle mr-2" data-v-38fd0510${_scopeId}></i> \u5F00\u59CB\u8D2D\u7269 `);
            } else {
              return [
                createVNode("i", { class: "bi bi-plus-circle mr-2" }),
                createTextVNode(" \u5F00\u59CB\u8D2D\u7269 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (selectedStatus.value !== "all") {
          _push(`<button class="block w-full px-8 py-3 border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300" data-v-38fd0510> \u67E5\u770B\u6240\u6709\u8BA2\u5355 </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<div class="space-y-6" data-v-38fd0510><!--[-->`);
        ssrRenderList(unref(filteredOrders), (order) => {
          _push(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-colors duration-300" data-v-38fd0510><div class="px-8 py-6 border-b border-gray-700/50 bg-gray-800/30" data-v-38fd0510><div class="flex flex-wrap items-center justify-between gap-4" data-v-38fd0510><div class="flex items-center gap-4" data-v-38fd0510><div data-v-38fd0510><h3 class="text-xl font-bold text-white mb-1" data-v-38fd0510>\u8BA2\u5355 #${ssrInterpolate(order.orderNumber)}</h3><p class="text-gray-400 text-sm" data-v-38fd0510>\u4E0B\u5355\u65F6\u95F4\uFF1A${ssrInterpolate(formatDate(order.createdAt))}</p></div><div class="${ssrRenderClass([
            "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium",
            getStatusStyle(order.status)
          ])}" data-v-38fd0510><i class="${ssrRenderClass([getStatusIcon(order.status), "mr-2"])}" data-v-38fd0510></i> ${ssrInterpolate(getStatusLabel(order.status))}</div></div><div class="text-right" data-v-38fd0510><div class="text-2xl font-bold text-cyan-400" data-v-38fd0510>\xA5${ssrInterpolate((order.total * 7.2).toLocaleString())}</div><div class="text-gray-400 text-sm" data-v-38fd0510>${ssrInterpolate(order.items.length)} \u4EF6\u5546\u54C1</div></div></div></div><div class="p-8" data-v-38fd0510><div class="space-y-4" data-v-38fd0510><!--[-->`);
          ssrRenderList(order.items, (item) => {
            _push(`<div class="flex items-center gap-6 p-4 bg-gray-800/20 rounded-xl border border-gray-700/30" data-v-38fd0510><div class="w-20 h-20 bg-gray-700/50 rounded-lg overflow-hidden" data-v-38fd0510>`);
            if (item.image) {
              _push(`<div class="order-item-image-container" data-v-38fd0510><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-contain p-2" data-v-38fd0510></div>`);
            } else {
              _push(`<div class="order-item-placeholder" data-v-38fd0510><i class="${ssrRenderClass(getOrderItemIcon(item.name))}" data-v-38fd0510></i></div>`);
            }
            _push(`</div><div class="flex-1" data-v-38fd0510><h4 class="font-semibold text-white text-lg mb-1" data-v-38fd0510>${ssrInterpolate(item.name)}</h4><p class="text-gray-400 text-sm mb-2" data-v-38fd0510>${ssrInterpolate(item.brand)}</p><div class="flex items-center gap-4" data-v-38fd0510><span class="text-cyan-400 font-semibold" data-v-38fd0510>\xA5${ssrInterpolate((item.price * 7.2).toLocaleString())}</span><span class="text-gray-400 text-sm" data-v-38fd0510>\u6570\u91CF\uFF1A${ssrInterpolate(item.quantity)}</span></div></div><div class="flex flex-col gap-2" data-v-38fd0510>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/products/${item.id}`,
              class: "px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors duration-300 text-center"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` \u67E5\u770B\u5546\u54C1 `);
                } else {
                  return [
                    createTextVNode(" \u67E5\u770B\u5546\u54C1 ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (order.status === "delivered") {
              _push(`<button class="px-4 py-2 text-sm border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300" data-v-38fd0510> \u5199\u8BC4\u4EF7 </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div></div><div class="px-8 py-6 border-t border-gray-700/50 bg-gray-800/20" data-v-38fd0510><div class="flex flex-wrap items-center justify-between gap-4" data-v-38fd0510><div class="flex items-center gap-6" data-v-38fd0510><div class="flex items-center gap-3" data-v-38fd0510><i class="bi bi-truck text-cyan-400" data-v-38fd0510></i><span class="text-white font-medium" data-v-38fd0510>\u7269\u6D41\u5355\u53F7\uFF1A</span><span class="text-gray-400" data-v-38fd0510>${ssrInterpolate(order.trackingNumber || "\u6682\u65E0")}</span></div>`);
          if (order.estimatedDelivery) {
            _push(`<div class="flex items-center gap-3" data-v-38fd0510><i class="bi bi-calendar-event text-cyan-400" data-v-38fd0510></i><span class="text-white font-medium" data-v-38fd0510>\u9884\u8BA1\u9001\u8FBE\uFF1A</span><span class="text-gray-400" data-v-38fd0510>${ssrInterpolate(formatDate(order.estimatedDelivery))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex flex-wrap items-center gap-3" data-v-38fd0510><button class="px-4 py-2 text-sm border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2" data-v-38fd0510><i class="bi bi-download" data-v-38fd0510></i> \u4E0B\u8F7D\u53D1\u7968 </button>`);
          if (order.status === "pending" || order.status === "processing") {
            _push(`<button class="px-4 py-2 text-sm border border-red-600 hover:border-red-500 text-red-300 hover:text-red-200 font-medium rounded-lg transition-colors duration-300 flex items-center gap-2" data-v-38fd0510><i class="bi bi-x-circle" data-v-38fd0510></i> \u53D6\u6D88\u8BA2\u5355 </button>`);
          } else {
            _push(`<!---->`);
          }
          if (order.status === "delivered") {
            _push(`<button class="px-4 py-2 text-sm bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2" data-v-38fd0510><i class="bi bi-arrow-repeat" data-v-38fd0510></i> \u518D\u6B21\u8D2D\u4E70 </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</main>`);
      if (showReviewForm.value) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-38fd0510><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 max-w-md w-full" data-v-38fd0510><h3 class="text-2xl font-bold text-white mb-6" data-v-38fd0510>\u5199\u5546\u54C1\u8BC4\u4EF7</h3>`);
        if (reviewItem.value) {
          _push(`<div class="mb-6" data-v-38fd0510><div class="flex items-center gap-4 mb-4" data-v-38fd0510><img${ssrRenderAttr("src", reviewItem.value.image)}${ssrRenderAttr("alt", reviewItem.value.name)} class="w-16 h-16 object-contain bg-gray-700/50 rounded-lg p-2" data-v-38fd0510><div data-v-38fd0510><h4 class="font-semibold text-white" data-v-38fd0510>${ssrInterpolate(reviewItem.value.name)}</h4><p class="text-gray-400 text-sm" data-v-38fd0510>${ssrInterpolate(reviewItem.value.brand)}</p></div></div><div class="space-y-4" data-v-38fd0510><div data-v-38fd0510><label class="block text-sm font-medium text-white mb-2" data-v-38fd0510>\u8BC4\u5206</label><div class="flex gap-2" data-v-38fd0510><!--[-->`);
          ssrRenderList(5, (star) => {
            _push(`<button class="${ssrRenderClass([star <= reviewRating.value ? "text-yellow-400" : "text-gray-600", "text-2xl hover:text-yellow-400 transition-colors duration-200"])}" data-v-38fd0510><i class="bi bi-star-fill" data-v-38fd0510></i></button>`);
          });
          _push(`<!--]--></div></div><div data-v-38fd0510><label class="block text-sm font-medium text-white mb-2" data-v-38fd0510>\u8BC4\u4EF7\u5185\u5BB9</label><textarea rows="4" placeholder="\u5206\u4EAB\u60A8\u5BF9\u8FD9\u4E2A\u4EA7\u54C1\u7684\u4F7F\u7528\u4F53\u9A8C..." class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none" data-v-38fd0510>${ssrInterpolate(reviewComment.value)}</textarea></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-3" data-v-38fd0510><button class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-38fd0510> \u63D0\u4EA4\u8BC4\u4EF7 </button><button class="flex-1 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-38fd0510> \u53D6\u6D88 </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const orders = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38fd0510"]]);

export { orders as default };
//# sourceMappingURL=orders-DyUk0Ubk.mjs.map
