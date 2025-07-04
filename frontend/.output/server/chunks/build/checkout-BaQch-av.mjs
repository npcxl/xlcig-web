import { _ as __nuxt_component_0 } from './AppLogo-C8xp92Ad.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dq0IxfZC.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useHead } from './v3-B75LsvLO.mjs';
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
import './server.mjs';
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
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { message } = createDiscreteApi(["message"]);
    const cartItems = ref([]);
    const isProcessing = ref(false);
    const showSuccessModal = ref(false);
    const orderNumber = ref("");
    const customerInfo = ref({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    });
    const selectedPaymentMethod = ref("card");
    const paymentInfo = ref({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: ""
    });
    const couponCode = ref("");
    const appliedCoupon = ref("");
    const paymentMethods = ref([
      {
        id: "card",
        name: "\u94F6\u884C\u5361\u652F\u4ED8",
        description: "\u94F6\u8054\u3001Visa\u3001\u4E07\u4E8B\u8FBE",
        icon: "bi-credit-card"
      },
      {
        id: "alipay",
        name: "\u652F\u4ED8\u5B9D",
        description: "\u4F7F\u7528\u652F\u4ED8\u5B9D\u652F\u4ED8",
        icon: "bi-wallet2"
      },
      {
        id: "wechat",
        name: "\u5FAE\u4FE1\u652F\u4ED8",
        description: "\u5FAE\u4FE1\u626B\u7801\u652F\u4ED8",
        icon: "bi-wechat"
      }
    ]);
    const subtotal = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
    const shipping = computed(() => {
      return subtotal.value > 1e3 ? 0 : 50;
    });
    const tax = computed(() => {
      return Math.round(subtotal.value * 0.08);
    });
    const total = computed(() => {
      return subtotal.value + shipping.value + tax.value;
    });
    useHead({
      title: "\u8D2D\u7269\u8F66\u7ED3\u7B97 - xlCig",
      meta: [
        { name: "description", content: "\u5B89\u5168\u5FEB\u6377\u7684\u8D2D\u7269\u8F66\u7ED3\u7B97\u6D41\u7A0B\uFF0C\u652F\u6301\u591A\u79CD\u652F\u4ED8\u65B9\u5F0F" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))}><div class="fixed inset-0 pointer-events-none"><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow"></div></div><nav class="relative z-10"><div class="container mx-auto px-6 py-6"><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="flex items-center justify-between"><div class="flex items-center space-x-6">`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "medium",
        "show-decorations": false
      }, null, _parent));
      _push(`<div class="h-6 w-px bg-gray-600"></div><button class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"><i class="bi bi-arrow-left mr-2 text-lg"></i><span class="text-sm font-medium">\u8FD4\u56DE</span></button></div><nav class="text-sm text-gray-400">`);
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
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400"></i>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "hover:text-cyan-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u4EA7\u54C1\u4E2D\u5FC3`);
          } else {
            return [
              createTextVNode("\u4EA7\u54C1\u4E2D\u5FC3")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400"></i><span class="text-white font-medium">\u8D2D\u7269\u8F66\u7ED3\u7B97</span></nav></div></div></div></nav><div class="container mx-auto px-6 py-8 relative z-10"><div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-8"><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-3xl font-bold text-white flex items-center gap-3"><i class="bi bi-cart text-cyan-400"></i> \u8D2D\u7269\u8F66 </h2><p class="text-gray-300 mt-2">\u8D2D\u7269\u8F66\u4E2D\u6709 ${ssrInterpolate(cartItems.value.length)} \u4EF6\u5546\u54C1</p></div><div class="p-8">`);
      if (cartItems.value.length === 0) {
        _push(`<div class="text-center py-12"><div class="text-6xl mb-4 text-gray-500"><i class="bi bi-cart-x"></i></div><h3 class="text-xl font-semibold text-white mb-2">\u8D2D\u7269\u8F66\u4E3A\u7A7A</h3><p class="text-gray-400 mb-6">\u6DFB\u52A0\u4E00\u4E9B\u4EA7\u54C1\u6765\u7EE7\u7EED\u8D2D\u7269</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="bi bi-plus-circle mr-2"${_scopeId}></i> \u6DFB\u52A0\u4EA7\u54C1 `);
            } else {
              return [
                createVNode("i", { class: "bi bi-plus-circle mr-2" }),
                createTextVNode(" \u6DFB\u52A0\u4EA7\u54C1 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(cartItems.value, (item) => {
          _push(`<div class="flex items-center gap-6 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 hover:border-cyan-500/50 transition-colors duration-300"><div class="w-24 h-24 bg-gray-700/50 rounded-lg overflow-hidden"><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-contain p-2"></div><div class="flex-1"><h3 class="font-semibold text-white text-lg mb-1">${ssrInterpolate(item.name)}</h3><p class="text-gray-400 text-sm mb-2">${ssrInterpolate(item.brand)}</p><div class="flex items-center gap-4"><span class="text-2xl font-bold text-cyan-400">\xA5${ssrInterpolate((item.price * 7.2).toLocaleString())}</span>`);
          if (item.originalPrice && item.originalPrice > item.price) {
            _push(`<span class="text-sm text-gray-500 line-through"> \xA5${ssrInterpolate((item.originalPrice * 7.2).toLocaleString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex items-center gap-3"><button class="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"><i class="bi bi-dash"></i></button><span class="w-12 text-center text-white font-semibold text-lg">${ssrInterpolate(item.quantity)}</span><button class="w-10 h-10 flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200"><i class="bi bi-plus"></i></button></div><button class="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-200"><i class="bi bi-trash"></i></button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      if (cartItems.value.length > 0) {
        _push(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-3xl font-bold text-white flex items-center gap-3"><i class="bi bi-person text-cyan-400"></i> \u5BA2\u6237\u4FE1\u606F </h2></div><div class="p-8"><form class="space-y-6"><div class="grid md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-white mb-2">\u59D3\u6C0F</label><input${ssrRenderAttr("value", customerInfo.value.firstName)} type="text" required placeholder="\u8BF7\u8F93\u5165\u59D3\u6C0F" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">\u540D\u5B57</label><input${ssrRenderAttr("value", customerInfo.value.lastName)} type="text" required placeholder="\u8BF7\u8F93\u5165\u540D\u5B57" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div><label class="block text-sm font-medium text-white mb-2">\u7535\u5B50\u90AE\u7BB1</label><input${ssrRenderAttr("value", customerInfo.value.email)} type="email" required placeholder="\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">\u624B\u673A\u53F7\u7801</label><input${ssrRenderAttr("value", customerInfo.value.phone)} type="tel" required placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">\u6536\u8D27\u5730\u5740</label><textarea required rows="3" placeholder="\u8BF7\u8F93\u5165\u8BE6\u7EC6\u6536\u8D27\u5730\u5740" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none">${ssrInterpolate(customerInfo.value.address)}</textarea></div><div class="grid md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-white mb-2">\u57CE\u5E02</label><input${ssrRenderAttr("value", customerInfo.value.city)} type="text" required placeholder="\u8BF7\u8F93\u5165\u57CE\u5E02" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">\u7701\u4EFD</label><input${ssrRenderAttr("value", customerInfo.value.state)} type="text" required placeholder="\u8BF7\u8F93\u5165\u7701\u4EFD" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">\u90AE\u653F\u7F16\u7801</label><input${ssrRenderAttr("value", customerInfo.value.zipCode)} type="text" required placeholder="\u8BF7\u8F93\u5165\u90AE\u7F16" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (cartItems.value.length > 0) {
        _push(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-3xl font-bold text-white flex items-center gap-3"><i class="bi bi-credit-card text-cyan-400"></i> \u652F\u4ED8\u65B9\u5F0F </h2></div><div class="p-8"><div class="grid md:grid-cols-3 gap-4 mb-6"><!--[-->`);
        ssrRenderList(paymentMethods.value, (method) => {
          _push(`<button class="${ssrRenderClass([
            "p-6 border-2 rounded-xl transition-all duration-300 text-center",
            selectedPaymentMethod.value === method.id ? "border-cyan-500 bg-cyan-500/20 text-cyan-300" : "border-gray-600/50 hover:border-cyan-500/50 text-gray-300 hover:text-white"
          ])}"><i class="${ssrRenderClass([method.icon, "text-3xl mb-3"])}"></i><div class="font-semibold">${ssrInterpolate(method.name)}</div><div class="text-sm opacity-75 mt-1">${ssrInterpolate(method.description)}</div></button>`);
        });
        _push(`<!--]--></div>`);
        if (selectedPaymentMethod.value === "card") {
          _push(`<div class="space-y-6"><div><label class="block text-sm font-medium text-white mb-2">\u94F6\u884C\u5361\u53F7</label><input${ssrRenderAttr("value", paymentInfo.value.cardNumber)} type="text" placeholder="6222 0200 0000 0000" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2"><label class="block text-sm font-medium text-white mb-2">\u6709\u6548\u671F</label><input${ssrRenderAttr("value", paymentInfo.value.expiryDate)} type="text" placeholder="MM/YY" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">CVV</label><input${ssrRenderAttr("value", paymentInfo.value.cvv)} type="text" placeholder="123" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div><label class="block text-sm font-medium text-white mb-2">\u6301\u5361\u4EBA\u59D3\u540D</label><input${ssrRenderAttr("value", paymentInfo.value.cardholderName)} type="text" placeholder="\u5F20\u4E09" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (selectedPaymentMethod.value === "alipay") {
          _push(`<div class="text-center py-8"><div class="text-6xl text-blue-500 mb-4"><i class="bi bi-wallet2"></i></div><h3 class="text-xl font-semibold text-white mb-2">\u652F\u4ED8\u5B9D\u652F\u4ED8</h3><p class="text-gray-400 mb-6">\u60A8\u5C06\u8DF3\u8F6C\u5230\u652F\u4ED8\u5B9D\u5B8C\u6210\u652F\u4ED8</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (selectedPaymentMethod.value === "wechat") {
          _push(`<div class="text-center py-8"><div class="text-6xl text-green-500 mb-4"><i class="bi bi-wechat"></i></div><h3 class="text-xl font-semibold text-white mb-2">\u5FAE\u4FE1\u652F\u4ED8</h3><p class="text-gray-400 mb-6">\u626B\u7801\u652F\u4ED8\u6216\u4F7F\u7528\u5FAE\u4FE1App\u652F\u4ED8</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="lg:col-span-1"><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 sticky top-6"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-2xl font-bold text-white flex items-center gap-3"><i class="bi bi-receipt text-cyan-400"></i> \u8BA2\u5355\u6458\u8981 </h2></div><div class="p-8 space-y-6"><div class="space-y-4"><div class="flex justify-between items-center"><span class="text-gray-300">\u5546\u54C1\u5C0F\u8BA1</span><span class="text-white font-semibold">\xA5${ssrInterpolate((subtotal.value * 7.2).toLocaleString())}</span></div><div class="flex justify-between items-center"><span class="text-gray-300">\u8FD0\u8D39</span><span class="text-white font-semibold">\xA5${ssrInterpolate((shipping.value * 7.2).toLocaleString())}</span></div><div class="flex justify-between items-center"><span class="text-gray-300">\u7A0E\u8D39</span><span class="text-white font-semibold">\xA5${ssrInterpolate((tax.value * 7.2).toLocaleString())}</span></div><div class="border-t border-gray-700/50 pt-4"><div class="flex justify-between items-center"><span class="text-xl font-semibold text-white">\u603B\u8BA1</span><span class="text-2xl font-bold text-cyan-400">\xA5${ssrInterpolate((total.value * 7.2).toLocaleString())}</span></div></div></div>`);
      if (cartItems.value.length > 0) {
        _push(`<div><label class="block text-sm font-medium text-white mb-2">\u4F18\u60E0\u5238\u4EE3\u7801</label><div class="flex gap-2"><input${ssrRenderAttr("value", couponCode.value)} type="text" placeholder="\u8F93\u5165\u4F18\u60E0\u5238\u4EE3\u7801" class="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 text-sm"><button class="px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-300 text-sm"> \u4F7F\u7528 </button></div>`);
        if (appliedCoupon.value) {
          _push(`<div class="mt-2 text-green-400 text-sm flex items-center gap-1"><i class="bi bi-check-circle"></i> \u4F18\u60E0\u5238&quot;${ssrInterpolate(appliedCoupon.value)}&quot;\u5DF2\u4F7F\u7528 </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (cartItems.value.length > 0) {
        _push(`<button${ssrIncludeBooleanAttr(isProcessing.value) ? " disabled" : ""} class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed">`);
        if (!isProcessing.value) {
          _push(`<i class="bi bi-credit-card"></i>`);
        } else {
          _push(`<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>`);
        }
        _push(` ${ssrInterpolate(isProcessing.value ? "\u5904\u7406\u4E2D..." : "\u786E\u8BA4\u4E0B\u5355")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center pt-6 border-t border-gray-700/50"><div class="flex items-center justify-center gap-4 text-gray-400 text-sm"><div class="flex items-center gap-1"><i class="bi bi-shield-check text-green-400"></i><span>\u5B89\u5168</span></div><div class="flex items-center gap-1"><i class="bi bi-lock text-green-400"></i><span>\u52A0\u5BC6</span></div><div class="flex items-center gap-1"><i class="bi bi-award text-green-400"></i><span>\u8BA4\u8BC1</span></div></div></div></div></div></div></div></div>`);
      if (showSuccessModal.value) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div class="glass-card-dark rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/20 p-8 max-w-md w-full text-center"><div class="text-6xl text-green-400 mb-6"><i class="bi bi-check-circle"></i></div><h3 class="text-2xl font-bold text-white mb-4">\u8BA2\u5355\u63D0\u4EA4\u6210\u529F\uFF01</h3><p class="text-gray-300 mb-2">\u8BA2\u5355\u53F7\uFF1A#${ssrInterpolate(orderNumber.value)}</p><p class="text-gray-400 mb-8">\u611F\u8C22\u60A8\u7684\u8D2D\u4E70\uFF0C\u60A8\u5C06\u5F88\u5FEB\u6536\u5230\u786E\u8BA4\u90AE\u4EF6\u3002</p><div class="space-y-3"><button class="w-full bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"> \u67E5\u770B\u8BA2\u5355 </button><button class="w-full border border-gray-600 hover:border-green-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"> \u7EE7\u7EED\u8D2D\u7269 </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-BaQch-av.mjs.map
