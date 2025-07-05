import { u as useUserStore, a as __nuxt_component_0 } from "../server.mjs";
import { _ as __nuxt_component_0$1 } from "./AppHeader-Baa9wtq1.js";
import { _ as __nuxt_component_0$2 } from "./nuxt-link-D8iHomBq.js";
import { ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { u as useAddressStore } from "./address-CU5h3OeV.js";
import { c as createDiscreteApi } from "./useLocation-CdbkT8tR.js";
import "D:/code/xlweb/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-CXjDD8hH.js";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/code/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/code/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/code/xlweb/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/code/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/code/xlweb/node_modules/ufo/dist/index.mjs";
import "D:/code/xlweb/node_modules/klona/dist/index.mjs";
import "./AppLogo-DGHjqzot.js";
import "seemly";
import "treemate";
import "vooks";
import "vdirs";
import "lodash-es";
import "css-render";
import "evtd";
import "./addresses-CWcJVVLV.js";
import "@css-render/plugin-bem";
import "D:/code/xlweb/node_modules/@unhead/vue/dist/index.mjs";
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
        name: "银行卡支付",
        description: "银联、Visa、万事达",
        icon: "bi-credit-card"
      },
      {
        id: "alipay",
        name: "支付宝",
        description: "使用支付宝支付",
        icon: "bi-wallet2"
      },
      {
        id: "wechat",
        name: "微信支付",
        description: "微信扫码支付",
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
      title: "购物车结算 - xlCig",
      meta: [
        { name: "description", content: "安全快捷的购物车结算流程，支持多种支付方式和地址管理" }
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
        "current-page-title": "购物车结算"
      }, null, _parent));
      _push(`<div class="container mx-auto px-6 py-8 relative z-10"><div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-8"><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-3xl font-bold text-white flex items-center gap-3"><i class="bi bi-cart text-cyan-400"></i> 购物车 </h2><p class="text-gray-300 mt-2">购物车中有 ${ssrInterpolate(cartItems.value.length)} 件商品</p></div><div class="p-8">`);
      if (isLoadingCart.value) {
        _push(`<div class="text-center py-12"><div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p class="text-gray-300">正在加载购物车...</p></div>`);
      } else if (cartItems.value.length === 0) {
        _push(`<div class="text-center py-12"><div class="text-6xl mb-4 text-gray-500"><i class="bi bi-cart-x"></i></div><h3 class="text-xl font-semibold text-white mb-2">购物车为空</h3><p class="text-gray-400 mb-6">添加一些产品来继续购物</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="bi bi-plus-circle mr-2"${_scopeId}></i> 添加产品 `);
            } else {
              return [
                createVNode("i", { class: "bi bi-plus-circle mr-2" }),
                createTextVNode(" 添加产品 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(cartItems.value, (item) => {
          _push(`<div class="flex items-center gap-6 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 hover:border-cyan-500/50 transition-colors duration-300"><div class="w-24 h-24 bg-gray-700/50 rounded-lg overflow-hidden"><img${ssrRenderAttr("src", item.product_image)}${ssrRenderAttr("alt", item.product_name)} class="w-full h-full object-contain p-2"></div><div class="flex-1"><h3 class="font-semibold text-white text-lg mb-1">${ssrInterpolate(item.product_name)}</h3><p class="text-gray-400 text-sm mb-2">${ssrInterpolate(item.product_brand)}</p><div class="flex items-center gap-4"><span class="text-2xl font-bold text-cyan-400">¥${ssrInterpolate(item.product_price.toLocaleString())}</span>`);
          if (item.product_original_price && item.product_original_price > item.product_price) {
            _push(`<span class="text-sm text-gray-500 line-through"> ¥${ssrInterpolate(item.product_original_price.toLocaleString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex items-center gap-3"><button class="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"><i class="bi bi-dash"></i></button><span class="w-12 text-center text-white font-semibold text-lg">${ssrInterpolate(item.quantity)}</span><button class="w-10 h-10 flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200"><i class="bi bi-plus"></i></button></div><button class="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-200"><i class="bi bi-trash"></i></button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      if (cartItems.value.length > 0) {
        _push(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-3xl font-bold text-white flex items-center gap-3"><i class="bi bi-geo-alt text-cyan-400"></i> 收货地址 </h2></div><div class="p-8">`);
        if (unref(userStore).isLoggedIn) {
          _push(`<div>`);
          if (unref(addressStore).isLoading) {
            _push(`<div class="text-center py-8"><div class="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p class="text-gray-300">正在加载地址信息...</p></div>`);
          } else if (unref(addressStore).hasAddresses) {
            _push(`<div class="space-y-6"><div class="space-y-4"><!--[-->`);
            ssrRenderList(unref(addressStore).addresses, (address) => {
              _push(`<div class="${ssrRenderClass([selectedAddressId.value === address.id ? "border-cyan-500 bg-cyan-500/10" : "border-gray-600/50 hover:border-cyan-500/50", "border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer"])}"><div class="flex items-start justify-between"><div class="flex-1"><div class="flex items-center gap-3 mb-2"><h3 class="font-semibold text-white">${ssrInterpolate(address.name)}</h3><span class="text-gray-300">${ssrInterpolate(address.phone)}</span>`);
              if (address.is_default) {
                _push(`<span class="px-2 py-1 bg-cyan-500 text-white text-xs rounded-full"> 默认 </span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div><p class="text-gray-300">${ssrInterpolate(address.province)} ${ssrInterpolate(address.city)} ${ssrInterpolate(address.district)} ${ssrInterpolate(address.detail)}</p>`);
              if (address.postal_code) {
                _push(`<p class="text-gray-400 text-sm mt-1"> 邮编：${ssrInterpolate(address.postal_code)}</p>`);
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
            _push(`<!--]--></div><button class="w-full py-3 border-2 border-dashed border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"><i class="bi bi-plus-circle"></i> 添加新地址 </button></div>`);
          } else {
            _push(`<div class="text-center py-8"><div class="text-4xl text-gray-400 mb-4"><i class="bi bi-geo-alt"></i></div><h3 class="text-xl font-semibold text-white mb-2">暂无收货地址</h3><p class="text-gray-400 mb-6">添加收货地址以完成订单</p><button class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors duration-300"><i class="bi bi-plus-circle mr-2"></i> 添加收货地址 </button></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="space-y-6"><div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6"><div class="flex items-center gap-2 text-yellow-400"><i class="bi bi-info-circle"></i><span class="font-medium">提示</span></div><p class="text-yellow-300 text-sm mt-1">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/auth/login",
            class: "text-yellow-400 hover:text-yellow-300 underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`登录`);
              } else {
                return [
                  createTextVNode("登录")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` 后可以保存地址，方便下次购物 </p></div><div class="grid md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-white mb-2">收货人姓名</label><input${ssrRenderAttr("value", guestAddressForm.value.name)} type="text" required placeholder="请输入收货人姓名" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">手机号码</label><input${ssrRenderAttr("value", guestAddressForm.value.phone)} type="tel" required placeholder="请输入手机号码" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div class="grid md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-white mb-2">省份</label><input${ssrRenderAttr("value", guestAddressForm.value.province)} type="text" required placeholder="请输入省份" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">城市</label><input${ssrRenderAttr("value", guestAddressForm.value.city)} type="text" required placeholder="请输入城市" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">区县</label><input${ssrRenderAttr("value", guestAddressForm.value.district)} type="text" required placeholder="请输入区县" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div><label class="block text-sm font-medium text-white mb-2">详细地址</label><textarea required rows="3" placeholder="请输入详细地址" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none">${ssrInterpolate(guestAddressForm.value.detail)}</textarea></div><div><label class="block text-sm font-medium text-white mb-2">邮政编码（可选）</label><input${ssrRenderAttr("value", guestAddressForm.value.postal_code)} type="text" placeholder="请输入邮政编码" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (cartItems.value.length > 0) {
        _push(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-3xl font-bold text-white flex items-center gap-3"><i class="bi bi-credit-card text-cyan-400"></i> 支付方式 </h2></div><div class="p-8"><div class="grid md:grid-cols-3 gap-4 mb-6"><!--[-->`);
        ssrRenderList(paymentMethods.value, (method) => {
          _push(`<button class="${ssrRenderClass([
            "p-6 border-2 rounded-xl transition-all duration-300 text-center",
            selectedPaymentMethod.value === method.id ? "border-cyan-500 bg-cyan-500/20 text-cyan-300" : "border-gray-600/50 hover:border-cyan-500/50 text-gray-300 hover:text-white"
          ])}"><i class="${ssrRenderClass([method.icon, "text-3xl mb-3"])}"></i><div class="font-semibold">${ssrInterpolate(method.name)}</div><div class="text-sm opacity-75 mt-1">${ssrInterpolate(method.description)}</div></button>`);
        });
        _push(`<!--]--></div>`);
        if (selectedPaymentMethod.value === "card") {
          _push(`<div class="space-y-6"><div><label class="block text-sm font-medium text-white mb-2">银行卡号</label><input${ssrRenderAttr("value", paymentInfo.value.cardNumber)} type="text" placeholder="6222 0200 0000 0000" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2"><label class="block text-sm font-medium text-white mb-2">有效期</label><input${ssrRenderAttr("value", paymentInfo.value.expiryDate)} type="text" placeholder="MM/YY" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">CVV</label><input${ssrRenderAttr("value", paymentInfo.value.cvv)} type="text" placeholder="123" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div><label class="block text-sm font-medium text-white mb-2">持卡人姓名</label><input${ssrRenderAttr("value", paymentInfo.value.cardholderName)} type="text" placeholder="张三" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (selectedPaymentMethod.value === "alipay") {
          _push(`<div class="text-center py-8"><div class="text-6xl text-blue-500 mb-4"><i class="bi bi-wallet2"></i></div><h3 class="text-xl font-semibold text-white mb-2">支付宝支付</h3><p class="text-gray-400 mb-6">您将跳转到支付宝完成支付</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (selectedPaymentMethod.value === "wechat") {
          _push(`<div class="text-center py-8"><div class="text-6xl text-green-500 mb-4"><i class="bi bi-wechat"></i></div><h3 class="text-xl font-semibold text-white mb-2">微信支付</h3><p class="text-gray-400 mb-6">扫码支付或使用微信App支付</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="lg:col-span-1"><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 sticky top-6"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-2xl font-bold text-white flex items-center gap-3"><i class="bi bi-receipt text-cyan-400"></i> 订单摘要 </h2></div><div class="p-8 space-y-6"><div class="space-y-4"><div class="flex justify-between items-center"><span class="text-gray-300">商品小计</span><span class="text-white font-semibold">¥${ssrInterpolate(subtotal.value.toLocaleString())}</span></div><div class="flex justify-between items-center"><span class="text-gray-300">运费</span><span class="text-white font-semibold">¥${ssrInterpolate(shipping.value.toLocaleString())}</span></div><div class="flex justify-between items-center"><span class="text-gray-300">税费</span><span class="text-white font-semibold">¥${ssrInterpolate(tax.value.toLocaleString())}</span></div><div class="border-t border-gray-700/50 pt-4"><div class="flex justify-between items-center"><span class="text-xl font-semibold text-white">总计</span><span class="text-2xl font-bold text-cyan-400">¥${ssrInterpolate(total.value.toLocaleString())}</span></div></div></div>`);
      if (cartItems.value.length > 0) {
        _push(`<div><label class="block text-sm font-medium text-white mb-2">优惠券代码</label><div class="flex gap-2"><input${ssrRenderAttr("value", couponCode.value)} type="text" placeholder="输入优惠券代码" class="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 text-sm"><button class="px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors duration-300 text-sm"> 使用 </button></div>`);
        if (appliedCoupon.value) {
          _push(`<div class="mt-2 text-green-400 text-sm flex items-center gap-1"><i class="bi bi-check-circle"></i> 优惠券&quot;${ssrInterpolate(appliedCoupon.value)}&quot;已使用 </div>`);
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
        _push(` ${ssrInterpolate(isProcessing.value ? "处理中..." : "确认下单")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (!canSubmitOrder.value && cartItems.value.length > 0) {
        _push(`<div class="text-red-400 text-sm text-center"><i class="bi bi-exclamation-triangle mr-1"></i> 请完善收货地址信息 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center pt-6 border-t border-gray-700/50"><div class="flex items-center justify-center gap-4 text-gray-400 text-sm"><div class="flex items-center gap-1"><i class="bi bi-shield-check text-green-400"></i><span>安全</span></div><div class="flex items-center gap-1"><i class="bi bi-lock text-green-400"></i><span>加密</span></div><div class="flex items-center gap-1"><i class="bi bi-award text-green-400"></i><span>认证</span></div></div></div></div></div></div></div></div>`);
      if (showAddAddressModal.value) {
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto"><div class="p-8"><div class="flex items-center justify-between mb-6"><h3 class="text-2xl font-bold text-white flex items-center gap-3"><i class="bi bi-geo-alt text-cyan-400"></i> 添加收货地址 </h3><button class="text-gray-400 hover:text-white"><i class="bi bi-x-lg text-2xl"></i></button></div><form class="space-y-6"><div class="grid md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-cyan-400 mb-2">收货人姓名 *</label><input${ssrRenderAttr("value", newAddressForm.value.name)} type="text" required placeholder="请输入收货人姓名" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-cyan-400 mb-2">手机号码 *</label><input${ssrRenderAttr("value", newAddressForm.value.phone)} type="tel" required placeholder="请输入手机号码" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div class="grid md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-cyan-400 mb-2">省份 *</label><input${ssrRenderAttr("value", newAddressForm.value.province)} type="text" required placeholder="请输入省份" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-cyan-400 mb-2">城市 *</label><input${ssrRenderAttr("value", newAddressForm.value.city)} type="text" required placeholder="请输入城市" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-cyan-400 mb-2">区县 *</label><input${ssrRenderAttr("value", newAddressForm.value.district)} type="text" required placeholder="请输入区县" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div><label class="block text-sm font-medium text-cyan-400 mb-2">详细地址 *</label><textarea required rows="3" placeholder="请输入详细地址" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none">${ssrInterpolate(newAddressForm.value.detail)}</textarea></div><div class="grid md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-cyan-400 mb-2">邮政编码</label><input${ssrRenderAttr("value", newAddressForm.value.postal_code)} type="text" placeholder="请输入邮政编码（可选）" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div class="flex items-end"><label class="flex items-center space-x-2"><input${ssrIncludeBooleanAttr(Array.isArray(newAddressForm.value.is_default) ? ssrLooseContain(newAddressForm.value.is_default, null) : newAddressForm.value.is_default) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500"><span class="text-sm text-gray-300">设为默认地址</span></label></div></div><div class="flex justify-end space-x-4 pt-6"><button type="button" class="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg font-medium transition-colors duration-300"> 取消 </button><button type="submit"${ssrIncludeBooleanAttr(addingAddress.value) ? " disabled" : ""} class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300 flex items-center gap-2">`);
        if (addingAddress.value) {
          _push(`<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>`);
        } else {
          _push(`<i class="bi bi-check-circle"></i>`);
        }
        _push(` ${ssrInterpolate(addingAddress.value ? "添加中..." : "添加地址")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showSuccessModal.value) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div class="glass-card-dark rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/20 p-8 max-w-md w-full text-center"><div class="text-6xl text-green-400 mb-6"><i class="bi bi-check-circle"></i></div><h3 class="text-2xl font-bold text-white mb-4">订单提交成功！</h3><p class="text-gray-300 mb-2">订单号：#${ssrInterpolate(orderNumber.value)}</p><p class="text-gray-400 mb-8">感谢您的购买，您将很快收到确认邮件。</p><div class="space-y-3"><button class="w-full bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"> 查看订单 </button><button class="w-full border border-gray-600 hover:border-green-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"> 继续购物 </button></div></div></div>`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=checkout-lE9SkT1q.js.map
