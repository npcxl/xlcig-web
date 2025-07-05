import { u as useUserStore, a as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './AppHeader-Baa9wtq1.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-D8iHomBq.mjs';
import { ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { u as useAddressStore } from './address-CU5h3OeV.mjs';
import { c as createDiscreteApi } from './useLocation-CdbkT8tR.mjs';
import { u as useHead } from './v3-CXjDD8hH.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import './AppLogo-DGHjqzot.mjs';
import 'seemly';
import 'treemate';
import 'vooks';
import 'vdirs';
import 'lodash-es';
import 'css-render';
import 'evtd';
import './addresses-CWcJVVLV.mjs';
import '@css-render/plugin-bem';

const _sfc_main = {
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { message } = createDiscreteApi(["message"]);
    const userStore = useUserStore();
    const addressStore = useAddressStore();
    const cartItems = ref([]);
    const isLoadingCart = ref(false);
    const isProcessing = ref(false);
    const showSuccessModal = ref(false);
    const orderNumber = ref("");
    const selectedAddressId = ref(null);
    const showAddAddressModal = ref(false);
    const addingAddress = ref(false);
    const guestAddressForm = ref({
      name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      detail: "",
      postal_code: ""
    });
    const newAddressForm = ref({
      name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      detail: "",
      postal_code: "",
      is_default: false
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
      return cartItems.value.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
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
    const canSubmitOrder = computed(() => {
      if (userStore.isLoggedIn) {
        return selectedAddressId.value !== null;
      } else {
        return guestAddressForm.value.name && guestAddressForm.value.phone && guestAddressForm.value.province && guestAddressForm.value.city && guestAddressForm.value.district && guestAddressForm.value.detail;
      }
    });
    useHead({
      title: "\u8D2D\u7269\u8F66\u7ED3\u7B97 - xlCig",
      meta: [
        { name: "description", content: "\u5B89\u5168\u5FEB\u6377\u7684\u8D2D\u7269\u8F66\u7ED3\u7B97\u6D41\u7A0B\uFF0C\u652F\u6301\u591A\u79CD\u652F\u4ED8\u65B9\u5F0F\u548C\u5730\u5740\u7BA1\u7406" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingScreen = __nuxt_component_0;
      const _component_AppHeader = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))}><div class="fixed inset-0 pointer-events-none"><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow"></div></div>`);
      if (isLoadingCart.value && !cartItems.value.length) {
        _push(ssrRenderComponent(_component_LoadingScreen, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_AppHeader, {
        "show-back-button": false,
        "show-nav-menu": false,
        "show-breadcrumb": true,
        "show-location": false,
        "show-search-button": false,
        "show-notification-button": false,
        "show-decorations": false,
        "logo-size": "medium",
        "current-page-title": "\u8D2D\u7269\u8F66\u7ED3\u7B97"
      }, null, _parent));
      _push(`<div class="container mx-auto px-6 py-8 relative z-10"><div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-8"><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-3xl font-bold text-white flex items-center gap-3"><i class="bi bi-cart text-cyan-400"></i> \u8D2D\u7269\u8F66 </h2><p class="text-gray-300 mt-2">\u8D2D\u7269\u8F66\u4E2D\u6709 ${ssrInterpolate(cartItems.value.length)} \u4EF6\u5546\u54C1</p></div><div class="p-8">`);
      if (isLoadingCart.value) {
        _push(`<div class="text-center py-12"><div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p class="text-gray-300">\u6B63\u5728\u52A0\u8F7D\u8D2D\u7269\u8F66...</p></div>`);
      } else if (cartItems.value.length === 0) {
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
          _push(`<div class="flex items-center gap-6 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 hover:border-cyan-500/50 transition-colors duration-300"><div class="w-24 h-24 bg-gray-700/50 rounded-lg overflow-hidden"><img${ssrRenderAttr("src", item.product_image)}${ssrRenderAttr("alt", item.product_name)} class="w-full h-full object-contain p-2"></div><div class="flex-1"><h3 class="font-semibold text-white text-lg mb-1">${ssrInterpolate(item.product_name)}</h3><p class="text-gray-400 text-sm mb-2">${ssrInterpolate(item.product_brand)}</p><div class="flex items-center gap-4"><span class="text-2xl font-bold text-cyan-400">\xA5${ssrInterpolate(item.product_price.toLocaleString())}</span>`);
          if (item.product_original_price && item.product_original_price > item.product_price) {
            _push(`<span class="text-sm text-gray-500 line-through"> \xA5${ssrInterpolate(item.product_original_price.toLocaleString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex items-center gap-3"><button class="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"><i class="bi bi-dash"></i></button><span class="w-12 text-center text-white font-semibold text-lg">${ssrInterpolate(item.quantity)}</span><button class="w-10 h-10 flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200"><i class="bi bi-plus"></i></button></div><button class="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-200"><i class="bi bi-trash"></i></button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      if (cartItems.value.length > 0) {
        _push(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-3xl font-bold text-white flex items-center gap-3"><i class="bi bi-geo-alt text-cyan-400"></i> \u6536\u8D27\u5730\u5740 </h2></div><div class="p-8">`);
        if (unref(userStore).isLoggedIn) {
          _push(`<div>`);
          if (unref(addressStore).isLoading) {
            _push(`<div class="text-center py-8"><div class="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p class="text-gray-300">\u6B63\u5728\u52A0\u8F7D\u5730\u5740\u4FE1\u606F...</p></div>`);
          } else if (unref(addressStore).hasAddresses) {
            _push(`<div class="space-y-6"><div class="space-y-4"><!--[-->`);
            ssrRenderList(unref(addressStore).addresses, (address) => {
              _push(`<div class="${ssrRenderClass([selectedAddressId.value === address.id ? "border-cyan-500 bg-cyan-500/10" : "border-gray-600/50 hover:border-cyan-500/50", "border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer"])}"><div class="flex items-start justify-between"><div class="flex-1"><div class="flex items-center gap-3 mb-2"><h3 class="font-semibold text-white">${ssrInterpolate(address.name)}</h3><span class="text-gray-300">${ssrInterpolate(address.phone)}</span>`);
              if (address.is_default) {
                _push(`<span class="px-2 py-1 bg-cyan-500 text-white text-xs rounded-full"> \u9ED8\u8BA4 </span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div><p class="text-gray-300">${ssrInterpolate(address.province)} ${ssrInterpolate(address.city)} ${ssrInterpolate(address.district)} ${ssrInterpolate(address.detail)}</p>`);
              if (address.postal_code) {
                _push(`<p class="text-gray-400 text-sm mt-1"> \u90AE\u7F16\uFF1A${ssrInterpolate(address.postal_code)}</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div><div class="flex items-center">`);
              if (selectedAddressId.value === address.id) {
                _push(`<i class="bi bi-check-circle text-cyan-400 text-xl"></i>`);
              } else {
                _push(`<i class="bi bi-circle text-gray-400 text-xl"></i>`);
              }
              _push(`</div></div></div>`);
            });
            _push(`<!--]--></div><button class="w-full py-3 border-2 border-dashed border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"><i class="bi bi-plus-circle"></i> \u6DFB\u52A0\u65B0\u5730\u5740 </button></div>`);
          } else {
            _push(`<div class="text-center py-8"><div class="text-4xl text-gray-400 mb-4"><i class="bi bi-geo-alt"></i></div><h3 class="text-xl font-semibold text-white mb-2">\u6682\u65E0\u6536\u8D27\u5730\u5740</h3><p class="text-gray-400 mb-6">\u6DFB\u52A0\u6536\u8D27\u5730\u5740\u4EE5\u5B8C\u6210\u8BA2\u5355</p><button class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors duration-300"><i class="bi bi-plus-circle mr-2"></i> \u6DFB\u52A0\u6536\u8D27\u5730\u5740 </button></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="space-y-6"><div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6"><div class="flex items-center gap-2 text-yellow-400"><i class="bi bi-info-circle"></i><span class="font-medium">\u63D0\u793A</span></div><p class="text-yellow-300 text-sm mt-1">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/auth/login",
            class: "text-yellow-400 hover:text-yellow-300 underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u767B\u5F55`);
              } else {
                return [
                  createTextVNode("\u767B\u5F55")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` \u540E\u53EF\u4EE5\u4FDD\u5B58\u5730\u5740\uFF0C\u65B9\u4FBF\u4E0B\u6B21\u8D2D\u7269 </p></div><div class="grid md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-white mb-2">\u6536\u8D27\u4EBA\u59D3\u540D</label><input${ssrRenderAttr("value", guestAddressForm.value.name)} type="text" required placeholder="\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA\u59D3\u540D" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">\u624B\u673A\u53F7\u7801</label><input${ssrRenderAttr("value", guestAddressForm.value.phone)} type="tel" required placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div class="grid md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-white mb-2">\u7701\u4EFD</label><input${ssrRenderAttr("value", guestAddressForm.value.province)} type="text" required placeholder="\u8BF7\u8F93\u5165\u7701\u4EFD" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">\u57CE\u5E02</label><input${ssrRenderAttr("value", guestAddressForm.value.city)} type="text" required placeholder="\u8BF7\u8F93\u5165\u57CE\u5E02" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">\u533A\u53BF</label><input${ssrRenderAttr("value", guestAddressForm.value.district)} type="text" required placeholder="\u8BF7\u8F93\u5165\u533A\u53BF" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div><label class="block text-sm font-medium text-white mb-2">\u8BE6\u7EC6\u5730\u5740</label><textarea required rows="3" placeholder="\u8BF7\u8F93\u5165\u8BE6\u7EC6\u5730\u5740" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none">${ssrInterpolate(guestAddressForm.value.detail)}</textarea></div><div><label class="block text-sm font-medium text-white mb-2">\u90AE\u653F\u7F16\u7801\uFF08\u53EF\u9009\uFF09</label><input${ssrRenderAttr("value", guestAddressForm.value.postal_code)} type="text" placeholder="\u8BF7\u8F93\u5165\u90AE\u653F\u7F16\u7801" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div>`);
        }
        _push(`</div></div>`);
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
      _push(`</div><div class="lg:col-span-1"><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 sticky top-6"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-2xl font-bold text-white flex items-center gap-3"><i class="bi bi-receipt text-cyan-400"></i> \u8BA2\u5355\u6458\u8981 </h2></div><div class="p-8 space-y-6"><div class="space-y-4"><div class="flex justify-between items-center"><span class="text-gray-300">\u5546\u54C1\u5C0F\u8BA1</span><span class="text-white font-semibold">\xA5${ssrInterpolate(subtotal.value.toLocaleString())}</span></div><div class="flex justify-between items-center"><span class="text-gray-300">\u8FD0\u8D39</span><span class="text-white font-semibold">\xA5${ssrInterpolate(shipping.value.toLocaleString())}</span></div><div class="flex justify-between items-center"><span class="text-gray-300">\u7A0E\u8D39</span><span class="text-white font-semibold">\xA5${ssrInterpolate(tax.value.toLocaleString())}</span></div><div class="border-t border-gray-700/50 pt-4"><div class="flex justify-between items-center"><span class="text-xl font-semibold text-white">\u603B\u8BA1</span><span class="text-2xl font-bold text-cyan-400">\xA5${ssrInterpolate(total.value.toLocaleString())}</span></div></div></div>`);
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
        _push(`<button${ssrIncludeBooleanAttr(isProcessing.value || !canSubmitOrder.value) ? " disabled" : ""} class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed">`);
        if (!isProcessing.value) {
          _push(`<i class="bi bi-credit-card"></i>`);
        } else {
          _push(`<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>`);
        }
        _push(` ${ssrInterpolate(isProcessing.value ? "\u5904\u7406\u4E2D..." : "\u786E\u8BA4\u4E0B\u5355")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (!canSubmitOrder.value && cartItems.value.length > 0) {
        _push(`<div class="text-red-400 text-sm text-center"><i class="bi bi-exclamation-triangle mr-1"></i> \u8BF7\u5B8C\u5584\u6536\u8D27\u5730\u5740\u4FE1\u606F </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center pt-6 border-t border-gray-700/50"><div class="flex items-center justify-center gap-4 text-gray-400 text-sm"><div class="flex items-center gap-1"><i class="bi bi-shield-check text-green-400"></i><span>\u5B89\u5168</span></div><div class="flex items-center gap-1"><i class="bi bi-lock text-green-400"></i><span>\u52A0\u5BC6</span></div><div class="flex items-center gap-1"><i class="bi bi-award text-green-400"></i><span>\u8BA4\u8BC1</span></div></div></div></div></div></div></div></div>`);
      if (showAddAddressModal.value) {
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto"><div class="p-8"><div class="flex items-center justify-between mb-6"><h3 class="text-2xl font-bold text-white flex items-center gap-3"><i class="bi bi-geo-alt text-cyan-400"></i> \u6DFB\u52A0\u6536\u8D27\u5730\u5740 </h3><button class="text-gray-400 hover:text-white"><i class="bi bi-x-lg text-2xl"></i></button></div><form class="space-y-6"><div class="grid md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-cyan-400 mb-2">\u6536\u8D27\u4EBA\u59D3\u540D *</label><input${ssrRenderAttr("value", newAddressForm.value.name)} type="text" required placeholder="\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA\u59D3\u540D" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-cyan-400 mb-2">\u624B\u673A\u53F7\u7801 *</label><input${ssrRenderAttr("value", newAddressForm.value.phone)} type="tel" required placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div class="grid md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-cyan-400 mb-2">\u7701\u4EFD *</label><input${ssrRenderAttr("value", newAddressForm.value.province)} type="text" required placeholder="\u8BF7\u8F93\u5165\u7701\u4EFD" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-cyan-400 mb-2">\u57CE\u5E02 *</label><input${ssrRenderAttr("value", newAddressForm.value.city)} type="text" required placeholder="\u8BF7\u8F93\u5165\u57CE\u5E02" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-cyan-400 mb-2">\u533A\u53BF *</label><input${ssrRenderAttr("value", newAddressForm.value.district)} type="text" required placeholder="\u8BF7\u8F93\u5165\u533A\u53BF" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div><label class="block text-sm font-medium text-cyan-400 mb-2">\u8BE6\u7EC6\u5730\u5740 *</label><textarea required rows="3" placeholder="\u8BF7\u8F93\u5165\u8BE6\u7EC6\u5730\u5740" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none">${ssrInterpolate(newAddressForm.value.detail)}</textarea></div><div class="grid md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-cyan-400 mb-2">\u90AE\u653F\u7F16\u7801</label><input${ssrRenderAttr("value", newAddressForm.value.postal_code)} type="text" placeholder="\u8BF7\u8F93\u5165\u90AE\u653F\u7F16\u7801\uFF08\u53EF\u9009\uFF09" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div class="flex items-end"><label class="flex items-center space-x-2"><input${ssrIncludeBooleanAttr(Array.isArray(newAddressForm.value.is_default) ? ssrLooseContain(newAddressForm.value.is_default, null) : newAddressForm.value.is_default) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500"><span class="text-sm text-gray-300">\u8BBE\u4E3A\u9ED8\u8BA4\u5730\u5740</span></label></div></div><div class="flex justify-end space-x-4 pt-6"><button type="button" class="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg font-medium transition-colors duration-300"> \u53D6\u6D88 </button><button type="submit"${ssrIncludeBooleanAttr(addingAddress.value) ? " disabled" : ""} class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300 flex items-center gap-2">`);
        if (addingAddress.value) {
          _push(`<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>`);
        } else {
          _push(`<i class="bi bi-check-circle"></i>`);
        }
        _push(` ${ssrInterpolate(addingAddress.value ? "\u6DFB\u52A0\u4E2D..." : "\u6DFB\u52A0\u5730\u5740")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
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
//# sourceMappingURL=checkout-lE9SkT1q.mjs.map
