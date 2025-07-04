import { _ as __nuxt_component_0 } from "./AppLogo-C8xp92Ad.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-Dq0IxfZC.js";
import { ref, watch, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, u as useRoute } from "../server.mjs";
import { u as useHead } from "./v3-B75LsvLO.js";
import "D:/codeGitee/xlcig-web/frontend/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlcig-web/frontend/node_modules/hookable/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlcig-web/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/codeGitee/xlcig-web/frontend/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/klona/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const productId = parseInt(route.params.id);
    const product = ref(null);
    const quantity = ref(1);
    const isFavorite = ref(false);
    const showSuccessMessage = ref(false);
    const productDatabase = {
      1: {
        id: 1,
        name: "NVIDIA GeForce RTX 4090",
        brand: "NVIDIA",
        price: 1599,
        originalPrice: 1699,
        rating: 4.8,
        reviewCount: 1256,
        image: "",
        inStock: true,
        stockCount: 5,
        description: "旗舰级显卡，专为4K游戏和内容创作而设计。为最苛刻的游戏和应用程序提供前所未有的性能。",
        specs: {
          "GPU显存": "24GB GDDR6X",
          "显存位宽": "384-bit",
          "基础频率": "2230 MHz",
          "加速频率": "2520 MHz",
          "CUDA核心": "16384",
          "RT核心": "128 (第3代)",
          "Tensor核心": "512 (第4代)",
          "功耗": "450W",
          "建议电源": "850W",
          "显示输出": "3x DisplayPort 1.4a, 1x HDMI 2.1"
        },
        features: [
          "光线追踪技术",
          "DLSS 3.0 帧生成",
          "4K游戏性能",
          "内容创作加速",
          "AV1编解码",
          "8K HDR游戏就绪"
        ]
      },
      2: {
        id: 2,
        name: "AMD Radeon RX 7900 XTX",
        brand: "AMD",
        price: 999,
        originalPrice: 1099,
        rating: 4.6,
        reviewCount: 567,
        image: "",
        inStock: true,
        stockCount: 8,
        description: "AMD旗舰显卡，配备24GB显存和先进的RDNA 3架构，提供卓越的4K游戏性能。",
        specs: {
          "GPU显存": "24GB GDDR6",
          "显存位宽": "384-bit",
          "基础频率": "1855 MHz",
          "加速频率": "2500 MHz",
          "流处理器": "6144",
          "RT加速器": "96",
          "无限缓存": "96MB",
          "功耗": "355W"
        },
        features: [
          "RDNA 3架构",
          "FSR 3.0技术",
          "硬件光线追踪",
          "无限缓存",
          "AV1编解码",
          "DisplayPort 2.1支持"
        ]
      },
      3: {
        id: 3,
        name: "NVIDIA GeForce RTX 4070 Ti",
        brand: "NVIDIA",
        price: 799,
        originalPrice: 899,
        rating: 4.7,
        reviewCount: 892,
        image: "",
        inStock: true,
        stockCount: 12,
        description: "高性能显卡，完美适配1440p游戏，支持光线追踪和DLSS 3.0技术。",
        specs: {
          "GPU显存": "12GB GDDR6X",
          "显存位宽": "192-bit",
          "基础频率": "2310 MHz",
          "加速频率": "2610 MHz",
          "CUDA核心": "7680",
          "RT核心": "60 (第3代)",
          "Tensor核心": "240 (第4代)",
          "功耗": "285W"
        },
        features: [
          "光线追踪技术",
          "DLSS 3.0支持",
          "出色的1440p性能",
          "AV1编解码",
          "NVIDIA广播",
          "NVIDIA反射"
        ]
      },
      7: {
        id: 7,
        name: "ASUS ROG STRIX Z790-E",
        brand: "ASUS",
        price: 459,
        originalPrice: 499,
        rating: 4.6,
        reviewCount: 734,
        image: "",
        inStock: true,
        stockCount: 8,
        description: "高端Z790主板，专为英特尔第13代处理器设计，具备顶级功能和连接性。",
        specs: {
          "插槽": "LGA 1700",
          "芯片组": "Intel Z790",
          "内存支持": "DDR5-5600+ (超频)",
          "内存插槽": "4 x DIMM, 最大128GB",
          "存储": "4x M.2插槽 (PCIe 4.0), 6x SATA III",
          "网络": "Intel 2.5Gb以太网",
          "无线": "WiFi 6E, 蓝牙5.3",
          "板型": "ATX"
        },
        features: [
          "WiFi 6E连接",
          "DDR5内存支持",
          "PCIe 5.0就绪",
          "AI超频",
          "Aura Sync RGB",
          "顶级音频解决方案"
        ]
      }
    };
    const ratingDistribution = ref({
      5: 856,
      4: 234,
      3: 98,
      2: 45,
      1: 23
    });
    const reviews = ref([
      {
        id: 1,
        author: "王先生",
        rating: 5,
        date: "2024-01-15",
        comment: "性能绝对令人难以置信！这张卡在4K下轻松处理我扔给它的一切。光线追踪性能非常出色，DLSS 3.0像魔法一样工作。"
      },
      {
        id: 2,
        author: "李女士",
        rating: 5,
        date: "2024-01-10",
        comment: "非常适合内容创作和游戏。24GB的显存对我的视频编辑工作来说太棒了，4K游戏也非常流畅。"
      },
      {
        id: 3,
        author: "张先生",
        rating: 4,
        date: "2024-01-05",
        comment: "很棒的显卡，但运行时发热量很大。确保你有良好的机箱通风。不过性能绝对一流！"
      }
    ]);
    const loadProductDetail = () => {
      product.value = productDatabase[productId];
      if (!product.value) {
        console.error("未找到产品:", productId);
      }
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      isFavorite.value = favorites.includes(productId);
    };
    const translateSpecKey = (key) => {
      const translations = {
        "GPU显存": "显存",
        "显存位宽": "位宽",
        "基础频率": "基础频率",
        "加速频率": "加速频率",
        "CUDA核心": "CUDA核心",
        "RT核心": "RT核心",
        "Tensor核心": "Tensor核心",
        "功耗": "功耗",
        "建议电源": "建议电源",
        "显示输出": "显示输出",
        "插槽": "插槽",
        "芯片组": "芯片组",
        "内存支持": "内存支持",
        "内存插槽": "内存插槽",
        "存储": "存储",
        "网络": "网络",
        "无线": "无线",
        "板型": "板型"
      };
      return translations[key] || key;
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    watch(() => route.params.id, () => {
      const newProductId = parseInt(route.params.id);
      if (newProductId !== productId) {
        loadProductDetail();
      }
    });
    useHead({
      title: computed(() => product.value ? `${product.value.name} - xlCig` : "产品详情 - xlCig"),
      meta: [
        { name: "description", content: computed(() => {
          var _a;
          return ((_a = product.value) == null ? void 0 : _a.description) || "查看产品详细信息和技术规格";
        }) }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_AppLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-2a1bde88><div class="fixed inset-0 pointer-events-none" data-v-2a1bde88><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-2a1bde88></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-2a1bde88></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-2a1bde88></div></div><nav class="relative z-10" data-v-2a1bde88><div class="container mx-auto px-6 py-6" data-v-2a1bde88><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-2a1bde88><div class="flex items-center justify-between" data-v-2a1bde88><div class="flex items-center space-x-6" data-v-2a1bde88>`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "medium",
        "show-decorations": false
      }, null, _parent));
      _push(`<div class="h-6 w-px bg-gray-600" data-v-2a1bde88></div><button class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200" data-v-2a1bde88><i class="bi bi-arrow-left mr-2 text-lg" data-v-2a1bde88></i><span class="text-sm font-medium" data-v-2a1bde88>返回</span></button></div><nav class="text-sm text-gray-400" data-v-2a1bde88>`);
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
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-2a1bde88></i>`);
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
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-2a1bde88></i><span class="text-white font-medium" data-v-2a1bde88>${ssrInterpolate(((_a = unref(product)) == null ? void 0 : _a.name) || "产品详情")}</span></nav></div></div></div></nav>`);
      if (unref(product)) {
        _push(`<div class="container mx-auto px-6 py-8 relative z-10" data-v-2a1bde88><div class="grid lg:grid-cols-2 gap-12 mb-12" data-v-2a1bde88><div class="space-y-6" data-v-2a1bde88><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden" data-v-2a1bde88><div class="relative h-96 bg-gradient-to-br from-gray-800/50 to-gray-900/50" data-v-2a1bde88>`);
        if (unref(product).image) {
          _push(`<div class="product-image-container" data-v-2a1bde88><img${ssrRenderAttr("src", unref(product).image)}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-contain p-8 transition-transform duration-300 hover:scale-105" data-v-2a1bde88></div>`);
        } else {
          _push(`<div class="product-placeholder" data-v-2a1bde88><i class="bi bi-motherboard" data-v-2a1bde88></i><span class="product-placeholder-text" data-v-2a1bde88>${ssrInterpolate(unref(product).name)}</span></div>`);
        }
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<div class="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold" data-v-2a1bde88> 省 ¥${ssrInterpolate((unref(product).originalPrice - unref(product).price).toLocaleString())}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute top-4 right-4" data-v-2a1bde88>`);
        if (!unref(product).inStock) {
          _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30" data-v-2a1bde88><i class="bi bi-x-circle mr-1" data-v-2a1bde88></i>缺货 </span>`);
        } else if (unref(product).stockCount <= 5) {
          _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30" data-v-2a1bde88><i class="bi bi-exclamation-triangle mr-1" data-v-2a1bde88></i>仅剩 ${ssrInterpolate(unref(product).stockCount)} 件 </span>`);
        } else {
          _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30" data-v-2a1bde88><i class="bi bi-check-circle mr-1" data-v-2a1bde88></i>现货 </span>`);
        }
        _push(`</div></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-6" data-v-2a1bde88><h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2" data-v-2a1bde88><i class="bi bi-star text-cyan-400" data-v-2a1bde88></i> 核心特性 </h3><div class="grid grid-cols-1 gap-3" data-v-2a1bde88><!--[-->`);
        ssrRenderList(unref(product).features, (feature) => {
          _push(`<div class="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30" data-v-2a1bde88><i class="bi bi-check-circle text-green-400" data-v-2a1bde88></i><span class="text-white" data-v-2a1bde88>${ssrInterpolate(feature)}</span></div>`);
        });
        _push(`<!--]--></div></div></div><div class="space-y-6" data-v-2a1bde88><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8" data-v-2a1bde88><div class="flex items-center justify-between mb-4" data-v-2a1bde88><span class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" data-v-2a1bde88>${ssrInterpolate(unref(product).brand)}</span><button class="${ssrRenderClass([
          "p-3 rounded-lg border transition-all duration-300",
          unref(isFavorite) ? "bg-red-500/20 border-red-500/30 text-red-300" : "border-gray-600/50 text-gray-400 hover:border-red-500/50 hover:text-red-300"
        ])}" data-v-2a1bde88><i class="${ssrRenderClass([unref(isFavorite) ? "bi bi-heart-fill" : "bi bi-heart", "text-xl"])}" data-v-2a1bde88></i></button></div><h1 class="text-3xl font-bold text-white mb-4" data-v-2a1bde88>${ssrInterpolate(unref(product).name)}</h1><div class="flex items-center gap-4 mb-6" data-v-2a1bde88><div class="flex items-center gap-2" data-v-2a1bde88><div class="flex" data-v-2a1bde88><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<i class="${ssrRenderClass([i <= unref(product).rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-lg"])}" data-v-2a1bde88></i>`);
        });
        _push(`<!--]--></div><span class="text-lg font-semibold text-white" data-v-2a1bde88>${ssrInterpolate(unref(product).rating)}</span></div><span class="text-gray-400" data-v-2a1bde88>(${ssrInterpolate(unref(product).reviewCount)} 条评价)</span></div><div class="mb-8" data-v-2a1bde88><div class="flex items-center gap-4 mb-2" data-v-2a1bde88><span class="text-4xl font-bold text-cyan-400" data-v-2a1bde88>¥${ssrInterpolate((unref(product).price * 7.2).toLocaleString())}</span>`);
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<span class="text-xl text-gray-500 line-through" data-v-2a1bde88> ¥${ssrInterpolate((unref(product).originalPrice * 7.2).toLocaleString())}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-gray-300" data-v-2a1bde88>${ssrInterpolate(unref(product).description)}</p></div><div class="mb-6" data-v-2a1bde88><label class="block text-sm font-semibold text-white mb-3" data-v-2a1bde88>购买数量</label><div class="flex items-center gap-4" data-v-2a1bde88><div class="flex items-center border border-gray-600/50 rounded-lg" data-v-2a1bde88><button class="px-4 py-3 text-white hover:bg-gray-700/50 rounded-l-lg transition-colors duration-200" data-v-2a1bde88><i class="bi bi-dash" data-v-2a1bde88></i></button><span class="px-6 py-3 text-white font-semibold min-w-[60px] text-center" data-v-2a1bde88>${ssrInterpolate(unref(quantity))}</span><button class="px-4 py-3 text-white hover:bg-gray-700/50 rounded-r-lg transition-colors duration-200" data-v-2a1bde88><i class="bi bi-plus" data-v-2a1bde88></i></button></div><span class="text-gray-400" data-v-2a1bde88>库存：${ssrInterpolate(unref(product).stockCount)} 件</span></div></div><div class="space-y-4" data-v-2a1bde88><button${ssrIncludeBooleanAttr(!unref(product).inStock) ? " disabled" : ""} class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed" data-v-2a1bde88><i class="bi bi-cart-plus" data-v-2a1bde88></i> ${ssrInterpolate(unref(product).inStock ? "加入购物车" : "暂时缺货")}</button><button${ssrIncludeBooleanAttr(!unref(product).inStock) ? " disabled" : ""} class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 disabled:cursor-not-allowed" data-v-2a1bde88><i class="bi bi-lightning" data-v-2a1bde88></i> 立即购买 </button></div><div class="mt-8 pt-6 border-t border-gray-700/50" data-v-2a1bde88><div class="grid grid-cols-3 gap-4 text-center" data-v-2a1bde88><div class="flex flex-col items-center gap-2" data-v-2a1bde88><i class="bi bi-truck text-2xl text-green-400" data-v-2a1bde88></i><span class="text-sm text-gray-300" data-v-2a1bde88>免费配送</span></div><div class="flex flex-col items-center gap-2" data-v-2a1bde88><i class="bi bi-shield-check text-2xl text-blue-400" data-v-2a1bde88></i><span class="text-sm text-gray-300" data-v-2a1bde88>两年保修</span></div><div class="flex flex-col items-center gap-2" data-v-2a1bde88><i class="bi bi-arrow-repeat text-2xl text-purple-400" data-v-2a1bde88></i><span class="text-sm text-gray-300" data-v-2a1bde88>30天退换</span></div></div></div></div></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 mb-12" data-v-2a1bde88><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-2a1bde88><i class="bi bi-gear text-cyan-400" data-v-2a1bde88></i> 技术规格 </h2><div class="grid md:grid-cols-2 gap-6" data-v-2a1bde88><!--[-->`);
        ssrRenderList(unref(product).specs, (value, key) => {
          _push(`<div class="flex justify-between items-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/30" data-v-2a1bde88><span class="text-gray-300 font-medium" data-v-2a1bde88>${ssrInterpolate(translateSpecKey(key))}</span><span class="font-semibold text-white" data-v-2a1bde88>${ssrInterpolate(value)}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8" data-v-2a1bde88><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-2a1bde88><i class="bi bi-chat-dots text-cyan-400" data-v-2a1bde88></i> 用户评价 </h2><div class="grid md:grid-cols-2 gap-8 mb-8" data-v-2a1bde88><div class="text-center" data-v-2a1bde88><div class="text-5xl font-bold text-cyan-400 mb-2" data-v-2a1bde88>${ssrInterpolate(unref(product).rating)}</div><div class="flex justify-center mb-2" data-v-2a1bde88><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<i class="${ssrRenderClass([i <= unref(product).rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-xl"])}" data-v-2a1bde88></i>`);
        });
        _push(`<!--]--></div><div class="text-gray-300" data-v-2a1bde88>基于 ${ssrInterpolate(unref(product).reviewCount)} 条评价</div></div><div class="space-y-3" data-v-2a1bde88><!--[-->`);
        ssrRenderList(unref(ratingDistribution), (count, rating) => {
          _push(`<div class="flex items-center gap-4" data-v-2a1bde88><span class="text-white w-8 flex-shrink-0" data-v-2a1bde88>${ssrInterpolate(rating)}星</span><div class="flex-1 bg-gray-700/50 rounded-full h-2 overflow-hidden max-w-full" data-v-2a1bde88><div class="bg-cyan-400 h-2 rounded-full transition-all duration-300 max-w-full" style="${ssrRenderStyle({ width: `${Math.min(count / unref(product).reviewCount * 100, 100)}%` })}" data-v-2a1bde88></div></div><span class="text-gray-400 w-12 text-sm flex-shrink-0" data-v-2a1bde88>${ssrInterpolate(count)}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="space-y-6" data-v-2a1bde88><!--[-->`);
        ssrRenderList(unref(reviews), (review) => {
          _push(`<div class="p-6 bg-gray-800/30 rounded-lg border border-gray-700/30" data-v-2a1bde88><div class="flex items-center justify-between mb-4" data-v-2a1bde88><div class="flex items-center gap-4" data-v-2a1bde88><div class="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center" data-v-2a1bde88><i class="bi bi-person text-cyan-400 text-xl" data-v-2a1bde88></i></div><div data-v-2a1bde88><div class="font-semibold text-white" data-v-2a1bde88>${ssrInterpolate(review.author)}</div><div class="text-sm text-gray-400" data-v-2a1bde88>${ssrInterpolate(formatDate(review.date))}</div></div></div><div class="flex" data-v-2a1bde88><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<i class="${ssrRenderClass([i <= review.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill"])}" data-v-2a1bde88></i>`);
          });
          _push(`<!--]--></div></div><p class="text-gray-300 leading-relaxed" data-v-2a1bde88>${ssrInterpolate(review.comment)}</p></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<div class="container mx-auto px-6 py-20 relative z-10" data-v-2a1bde88><div class="text-center" data-v-2a1bde88><div class="inline-flex flex-col items-center glass-card-dark rounded-2xl border border-cyan-500/30 p-12 shadow-2xl shadow-cyan-500/20" data-v-2a1bde88><div class="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6" data-v-2a1bde88></div><p class="text-2xl font-medium text-white" data-v-2a1bde88>正在加载产品详情...</p><p class="text-gray-400 mt-2" data-v-2a1bde88>请稍候</p></div></div></div>`);
      }
      if (unref(showSuccessMessage)) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-2a1bde88><div class="glass-card-dark rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/20 p-8 max-w-md w-full text-center" data-v-2a1bde88><div class="text-6xl text-green-400 mb-6" data-v-2a1bde88><i class="bi bi-check-circle" data-v-2a1bde88></i></div><h3 class="text-2xl font-bold text-white mb-4" data-v-2a1bde88>已加入购物车！</h3><p class="text-gray-300 mb-8" data-v-2a1bde88>${ssrInterpolate((_b = unref(product)) == null ? void 0 : _b.name)} 已成功添加到购物车。</p><div class="space-y-3" data-v-2a1bde88><button class="w-full bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-2a1bde88> 去结算 </button><button class="w-full border border-gray-600 hover:border-green-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-2a1bde88> 继续购物 </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2a1bde88"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-Ch6a2Mg1.js.map
