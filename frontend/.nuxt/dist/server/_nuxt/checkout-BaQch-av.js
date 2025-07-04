import { _ as __nuxt_component_0 } from "./AppLogo-C8xp92Ad.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-Dq0IxfZC.js";
import { ref, computed, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "D:/codeGitee/xlcig-web/frontend/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-B75LsvLO.js";
import { M as createDiscreteApi } from "./discrete-DcZNj1Jm.js";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlcig-web/frontend/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlcig-web/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/codeGitee/xlcig-web/frontend/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/ufo/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/klona/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/@unhead/vue/dist/index.mjs";
import "seemly";
import "vooks";
import "vdirs";
import "css-render";
import "@css-render/plugin-bem";
import "lodash-es";
import "evtd";
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
      title: "购物车结算 - xlCig",
      meta: [
        { name: "description", content: "安全快捷的购物车结算流程，支持多种支付方式" }
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
      _push(`<div class="h-6 w-px bg-gray-600"></div><button class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"><i class="bi bi-arrow-left mr-2 text-lg"></i><span class="text-sm font-medium">返回</span></button></div><nav class="text-sm text-gray-400">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-cyan-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
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
            _push2(`产品中心`);
          } else {
            return [
              createTextVNode("产品中心")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400"></i><span class="text-white font-medium">购物车结算</span></nav></div></div></div></nav><div class="container mx-auto px-6 py-8 relative z-10"><div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-8"><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-3xl font-bold text-white flex items-center gap-3"><i class="bi bi-cart text-cyan-400"></i> 购物车 </h2><p class="text-gray-300 mt-2">购物车中有 ${ssrInterpolate(cartItems.value.length)} 件商品</p></div><div class="p-8">`);
      if (cartItems.value.length === 0) {
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
          _push(`<div class="flex items-center gap-6 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 hover:border-cyan-500/50 transition-colors duration-300"><div class="w-24 h-24 bg-gray-700/50 rounded-lg overflow-hidden"><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-contain p-2"></div><div class="flex-1"><h3 class="font-semibold text-white text-lg mb-1">${ssrInterpolate(item.name)}</h3><p class="text-gray-400 text-sm mb-2">${ssrInterpolate(item.brand)}</p><div class="flex items-center gap-4"><span class="text-2xl font-bold text-cyan-400">¥${ssrInterpolate((item.price * 7.2).toLocaleString())}</span>`);
          if (item.originalPrice && item.originalPrice > item.price) {
            _push(`<span class="text-sm text-gray-500 line-through"> ¥${ssrInterpolate((item.originalPrice * 7.2).toLocaleString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex items-center gap-3"><button class="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"><i class="bi bi-dash"></i></button><span class="w-12 text-center text-white font-semibold text-lg">${ssrInterpolate(item.quantity)}</span><button class="w-10 h-10 flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200"><i class="bi bi-plus"></i></button></div><button class="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-200"><i class="bi bi-trash"></i></button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      if (cartItems.value.length > 0) {
        _push(`<div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-3xl font-bold text-white flex items-center gap-3"><i class="bi bi-person text-cyan-400"></i> 客户信息 </h2></div><div class="p-8"><form class="space-y-6"><div class="grid md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-white mb-2">姓氏</label><input${ssrRenderAttr("value", customerInfo.value.firstName)} type="text" required placeholder="请输入姓氏" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">名字</label><input${ssrRenderAttr("value", customerInfo.value.lastName)} type="text" required placeholder="请输入名字" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div><div><label class="block text-sm font-medium text-white mb-2">电子邮箱</label><input${ssrRenderAttr("value", customerInfo.value.email)} type="email" required placeholder="请输入邮箱地址" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">手机号码</label><input${ssrRenderAttr("value", customerInfo.value.phone)} type="tel" required placeholder="请输入手机号码" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">收货地址</label><textarea required rows="3" placeholder="请输入详细收货地址" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none">${ssrInterpolate(customerInfo.value.address)}</textarea></div><div class="grid md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-white mb-2">城市</label><input${ssrRenderAttr("value", customerInfo.value.city)} type="text" required placeholder="请输入城市" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">省份</label><input${ssrRenderAttr("value", customerInfo.value.state)} type="text" required placeholder="请输入省份" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div><div><label class="block text-sm font-medium text-white mb-2">邮政编码</label><input${ssrRenderAttr("value", customerInfo.value.zipCode)} type="text" required placeholder="请输入邮编" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400"></div></div></form></div></div>`);
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
      _push(`</div><div class="lg:col-span-1"><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 sticky top-6"><div class="px-8 py-6 border-b border-gray-700/50"><h2 class="text-2xl font-bold text-white flex items-center gap-3"><i class="bi bi-receipt text-cyan-400"></i> 订单摘要 </h2></div><div class="p-8 space-y-6"><div class="space-y-4"><div class="flex justify-between items-center"><span class="text-gray-300">商品小计</span><span class="text-white font-semibold">¥${ssrInterpolate((subtotal.value * 7.2).toLocaleString())}</span></div><div class="flex justify-between items-center"><span class="text-gray-300">运费</span><span class="text-white font-semibold">¥${ssrInterpolate((shipping.value * 7.2).toLocaleString())}</span></div><div class="flex justify-between items-center"><span class="text-gray-300">税费</span><span class="text-white font-semibold">¥${ssrInterpolate((tax.value * 7.2).toLocaleString())}</span></div><div class="border-t border-gray-700/50 pt-4"><div class="flex justify-between items-center"><span class="text-xl font-semibold text-white">总计</span><span class="text-2xl font-bold text-cyan-400">¥${ssrInterpolate((total.value * 7.2).toLocaleString())}</span></div></div></div>`);
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
        _push(`<button${ssrIncludeBooleanAttr(isProcessing.value) ? " disabled" : ""} class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed">`);
        if (!isProcessing.value) {
          _push(`<i class="bi bi-credit-card"></i>`);
        } else {
          _push(`<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>`);
        }
        _push(` ${ssrInterpolate(isProcessing.value ? "处理中..." : "确认下单")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center pt-6 border-t border-gray-700/50"><div class="flex items-center justify-center gap-4 text-gray-400 text-sm"><div class="flex items-center gap-1"><i class="bi bi-shield-check text-green-400"></i><span>安全</span></div><div class="flex items-center gap-1"><i class="bi bi-lock text-green-400"></i><span>加密</span></div><div class="flex items-center gap-1"><i class="bi bi-award text-green-400"></i><span>认证</span></div></div></div></div></div></div></div></div>`);
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
//# sourceMappingURL=checkout-BaQch-av.js.map
