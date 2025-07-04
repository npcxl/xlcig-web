import { _ as __nuxt_component_0 } from './AppLogo-C8xp92Ad.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-Dq0IxfZC.mjs';
import { ref, watch, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute } from './server.mjs';
import { u as useHead } from './v3-B75LsvLO.mjs';
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
        description: "\u65D7\u8230\u7EA7\u663E\u5361\uFF0C\u4E13\u4E3A4K\u6E38\u620F\u548C\u5185\u5BB9\u521B\u4F5C\u800C\u8BBE\u8BA1\u3002\u4E3A\u6700\u82DB\u523B\u7684\u6E38\u620F\u548C\u5E94\u7528\u7A0B\u5E8F\u63D0\u4F9B\u524D\u6240\u672A\u6709\u7684\u6027\u80FD\u3002",
        specs: {
          "GPU\u663E\u5B58": "24GB GDDR6X",
          "\u663E\u5B58\u4F4D\u5BBD": "384-bit",
          "\u57FA\u7840\u9891\u7387": "2230 MHz",
          "\u52A0\u901F\u9891\u7387": "2520 MHz",
          "CUDA\u6838\u5FC3": "16384",
          "RT\u6838\u5FC3": "128 (\u7B2C3\u4EE3)",
          "Tensor\u6838\u5FC3": "512 (\u7B2C4\u4EE3)",
          "\u529F\u8017": "450W",
          "\u5EFA\u8BAE\u7535\u6E90": "850W",
          "\u663E\u793A\u8F93\u51FA": "3x DisplayPort 1.4a, 1x HDMI 2.1"
        },
        features: [
          "\u5149\u7EBF\u8FFD\u8E2A\u6280\u672F",
          "DLSS 3.0 \u5E27\u751F\u6210",
          "4K\u6E38\u620F\u6027\u80FD",
          "\u5185\u5BB9\u521B\u4F5C\u52A0\u901F",
          "AV1\u7F16\u89E3\u7801",
          "8K HDR\u6E38\u620F\u5C31\u7EEA"
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
        description: "AMD\u65D7\u8230\u663E\u5361\uFF0C\u914D\u590724GB\u663E\u5B58\u548C\u5148\u8FDB\u7684RDNA 3\u67B6\u6784\uFF0C\u63D0\u4F9B\u5353\u8D8A\u76844K\u6E38\u620F\u6027\u80FD\u3002",
        specs: {
          "GPU\u663E\u5B58": "24GB GDDR6",
          "\u663E\u5B58\u4F4D\u5BBD": "384-bit",
          "\u57FA\u7840\u9891\u7387": "1855 MHz",
          "\u52A0\u901F\u9891\u7387": "2500 MHz",
          "\u6D41\u5904\u7406\u5668": "6144",
          "RT\u52A0\u901F\u5668": "96",
          "\u65E0\u9650\u7F13\u5B58": "96MB",
          "\u529F\u8017": "355W"
        },
        features: [
          "RDNA 3\u67B6\u6784",
          "FSR 3.0\u6280\u672F",
          "\u786C\u4EF6\u5149\u7EBF\u8FFD\u8E2A",
          "\u65E0\u9650\u7F13\u5B58",
          "AV1\u7F16\u89E3\u7801",
          "DisplayPort 2.1\u652F\u6301"
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
        description: "\u9AD8\u6027\u80FD\u663E\u5361\uFF0C\u5B8C\u7F8E\u9002\u914D1440p\u6E38\u620F\uFF0C\u652F\u6301\u5149\u7EBF\u8FFD\u8E2A\u548CDLSS 3.0\u6280\u672F\u3002",
        specs: {
          "GPU\u663E\u5B58": "12GB GDDR6X",
          "\u663E\u5B58\u4F4D\u5BBD": "192-bit",
          "\u57FA\u7840\u9891\u7387": "2310 MHz",
          "\u52A0\u901F\u9891\u7387": "2610 MHz",
          "CUDA\u6838\u5FC3": "7680",
          "RT\u6838\u5FC3": "60 (\u7B2C3\u4EE3)",
          "Tensor\u6838\u5FC3": "240 (\u7B2C4\u4EE3)",
          "\u529F\u8017": "285W"
        },
        features: [
          "\u5149\u7EBF\u8FFD\u8E2A\u6280\u672F",
          "DLSS 3.0\u652F\u6301",
          "\u51FA\u8272\u76841440p\u6027\u80FD",
          "AV1\u7F16\u89E3\u7801",
          "NVIDIA\u5E7F\u64AD",
          "NVIDIA\u53CD\u5C04"
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
        description: "\u9AD8\u7AEFZ790\u4E3B\u677F\uFF0C\u4E13\u4E3A\u82F1\u7279\u5C14\u7B2C13\u4EE3\u5904\u7406\u5668\u8BBE\u8BA1\uFF0C\u5177\u5907\u9876\u7EA7\u529F\u80FD\u548C\u8FDE\u63A5\u6027\u3002",
        specs: {
          "\u63D2\u69FD": "LGA 1700",
          "\u82AF\u7247\u7EC4": "Intel Z790",
          "\u5185\u5B58\u652F\u6301": "DDR5-5600+ (\u8D85\u9891)",
          "\u5185\u5B58\u63D2\u69FD": "4 x DIMM, \u6700\u5927128GB",
          "\u5B58\u50A8": "4x M.2\u63D2\u69FD (PCIe 4.0), 6x SATA III",
          "\u7F51\u7EDC": "Intel 2.5Gb\u4EE5\u592A\u7F51",
          "\u65E0\u7EBF": "WiFi 6E, \u84DD\u72595.3",
          "\u677F\u578B": "ATX"
        },
        features: [
          "WiFi 6E\u8FDE\u63A5",
          "DDR5\u5185\u5B58\u652F\u6301",
          "PCIe 5.0\u5C31\u7EEA",
          "AI\u8D85\u9891",
          "Aura Sync RGB",
          "\u9876\u7EA7\u97F3\u9891\u89E3\u51B3\u65B9\u6848"
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
        author: "\u738B\u5148\u751F",
        rating: 5,
        date: "2024-01-15",
        comment: "\u6027\u80FD\u7EDD\u5BF9\u4EE4\u4EBA\u96BE\u4EE5\u7F6E\u4FE1\uFF01\u8FD9\u5F20\u5361\u57284K\u4E0B\u8F7B\u677E\u5904\u7406\u6211\u6254\u7ED9\u5B83\u7684\u4E00\u5207\u3002\u5149\u7EBF\u8FFD\u8E2A\u6027\u80FD\u975E\u5E38\u51FA\u8272\uFF0CDLSS 3.0\u50CF\u9B54\u6CD5\u4E00\u6837\u5DE5\u4F5C\u3002"
      },
      {
        id: 2,
        author: "\u674E\u5973\u58EB",
        rating: 5,
        date: "2024-01-10",
        comment: "\u975E\u5E38\u9002\u5408\u5185\u5BB9\u521B\u4F5C\u548C\u6E38\u620F\u300224GB\u7684\u663E\u5B58\u5BF9\u6211\u7684\u89C6\u9891\u7F16\u8F91\u5DE5\u4F5C\u6765\u8BF4\u592A\u68D2\u4E86\uFF0C4K\u6E38\u620F\u4E5F\u975E\u5E38\u6D41\u7545\u3002"
      },
      {
        id: 3,
        author: "\u5F20\u5148\u751F",
        rating: 4,
        date: "2024-01-05",
        comment: "\u5F88\u68D2\u7684\u663E\u5361\uFF0C\u4F46\u8FD0\u884C\u65F6\u53D1\u70ED\u91CF\u5F88\u5927\u3002\u786E\u4FDD\u4F60\u6709\u826F\u597D\u7684\u673A\u7BB1\u901A\u98CE\u3002\u4E0D\u8FC7\u6027\u80FD\u7EDD\u5BF9\u4E00\u6D41\uFF01"
      }
    ]);
    const loadProductDetail = () => {
      product.value = productDatabase[productId];
      if (!product.value) {
        console.error("\u672A\u627E\u5230\u4EA7\u54C1:", productId);
      }
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      isFavorite.value = favorites.includes(productId);
    };
    const translateSpecKey = (key) => {
      const translations = {
        "GPU\u663E\u5B58": "\u663E\u5B58",
        "\u663E\u5B58\u4F4D\u5BBD": "\u4F4D\u5BBD",
        "\u57FA\u7840\u9891\u7387": "\u57FA\u7840\u9891\u7387",
        "\u52A0\u901F\u9891\u7387": "\u52A0\u901F\u9891\u7387",
        "CUDA\u6838\u5FC3": "CUDA\u6838\u5FC3",
        "RT\u6838\u5FC3": "RT\u6838\u5FC3",
        "Tensor\u6838\u5FC3": "Tensor\u6838\u5FC3",
        "\u529F\u8017": "\u529F\u8017",
        "\u5EFA\u8BAE\u7535\u6E90": "\u5EFA\u8BAE\u7535\u6E90",
        "\u663E\u793A\u8F93\u51FA": "\u663E\u793A\u8F93\u51FA",
        "\u63D2\u69FD": "\u63D2\u69FD",
        "\u82AF\u7247\u7EC4": "\u82AF\u7247\u7EC4",
        "\u5185\u5B58\u652F\u6301": "\u5185\u5B58\u652F\u6301",
        "\u5185\u5B58\u63D2\u69FD": "\u5185\u5B58\u63D2\u69FD",
        "\u5B58\u50A8": "\u5B58\u50A8",
        "\u7F51\u7EDC": "\u7F51\u7EDC",
        "\u65E0\u7EBF": "\u65E0\u7EBF",
        "\u677F\u578B": "\u677F\u578B"
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
      title: computed(() => product.value ? `${product.value.name} - xlCig` : "\u4EA7\u54C1\u8BE6\u60C5 - xlCig"),
      meta: [
        { name: "description", content: computed(() => {
          var _a;
          return ((_a = product.value) == null ? void 0 : _a.description) || "\u67E5\u770B\u4EA7\u54C1\u8BE6\u7EC6\u4FE1\u606F\u548C\u6280\u672F\u89C4\u683C";
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
      _push(`<div class="h-6 w-px bg-gray-600" data-v-2a1bde88></div><button class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200" data-v-2a1bde88><i class="bi bi-arrow-left mr-2 text-lg" data-v-2a1bde88></i><span class="text-sm font-medium" data-v-2a1bde88>\u8FD4\u56DE</span></button></div><nav class="text-sm text-gray-400" data-v-2a1bde88>`);
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
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-2a1bde88></i>`);
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
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-2a1bde88></i><span class="text-white font-medium" data-v-2a1bde88>${ssrInterpolate(((_a = unref(product)) == null ? void 0 : _a.name) || "\u4EA7\u54C1\u8BE6\u60C5")}</span></nav></div></div></div></nav>`);
      if (unref(product)) {
        _push(`<div class="container mx-auto px-6 py-8 relative z-10" data-v-2a1bde88><div class="grid lg:grid-cols-2 gap-12 mb-12" data-v-2a1bde88><div class="space-y-6" data-v-2a1bde88><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden" data-v-2a1bde88><div class="relative h-96 bg-gradient-to-br from-gray-800/50 to-gray-900/50" data-v-2a1bde88>`);
        if (unref(product).image) {
          _push(`<div class="product-image-container" data-v-2a1bde88><img${ssrRenderAttr("src", unref(product).image)}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-contain p-8 transition-transform duration-300 hover:scale-105" data-v-2a1bde88></div>`);
        } else {
          _push(`<div class="product-placeholder" data-v-2a1bde88><i class="bi bi-motherboard" data-v-2a1bde88></i><span class="product-placeholder-text" data-v-2a1bde88>${ssrInterpolate(unref(product).name)}</span></div>`);
        }
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<div class="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold" data-v-2a1bde88> \u7701 \xA5${ssrInterpolate((unref(product).originalPrice - unref(product).price).toLocaleString())}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute top-4 right-4" data-v-2a1bde88>`);
        if (!unref(product).inStock) {
          _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30" data-v-2a1bde88><i class="bi bi-x-circle mr-1" data-v-2a1bde88></i>\u7F3A\u8D27 </span>`);
        } else if (unref(product).stockCount <= 5) {
          _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30" data-v-2a1bde88><i class="bi bi-exclamation-triangle mr-1" data-v-2a1bde88></i>\u4EC5\u5269 ${ssrInterpolate(unref(product).stockCount)} \u4EF6 </span>`);
        } else {
          _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30" data-v-2a1bde88><i class="bi bi-check-circle mr-1" data-v-2a1bde88></i>\u73B0\u8D27 </span>`);
        }
        _push(`</div></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-6" data-v-2a1bde88><h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2" data-v-2a1bde88><i class="bi bi-star text-cyan-400" data-v-2a1bde88></i> \u6838\u5FC3\u7279\u6027 </h3><div class="grid grid-cols-1 gap-3" data-v-2a1bde88><!--[-->`);
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
        _push(`<!--]--></div><span class="text-lg font-semibold text-white" data-v-2a1bde88>${ssrInterpolate(unref(product).rating)}</span></div><span class="text-gray-400" data-v-2a1bde88>(${ssrInterpolate(unref(product).reviewCount)} \u6761\u8BC4\u4EF7)</span></div><div class="mb-8" data-v-2a1bde88><div class="flex items-center gap-4 mb-2" data-v-2a1bde88><span class="text-4xl font-bold text-cyan-400" data-v-2a1bde88>\xA5${ssrInterpolate((unref(product).price * 7.2).toLocaleString())}</span>`);
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<span class="text-xl text-gray-500 line-through" data-v-2a1bde88> \xA5${ssrInterpolate((unref(product).originalPrice * 7.2).toLocaleString())}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-gray-300" data-v-2a1bde88>${ssrInterpolate(unref(product).description)}</p></div><div class="mb-6" data-v-2a1bde88><label class="block text-sm font-semibold text-white mb-3" data-v-2a1bde88>\u8D2D\u4E70\u6570\u91CF</label><div class="flex items-center gap-4" data-v-2a1bde88><div class="flex items-center border border-gray-600/50 rounded-lg" data-v-2a1bde88><button class="px-4 py-3 text-white hover:bg-gray-700/50 rounded-l-lg transition-colors duration-200" data-v-2a1bde88><i class="bi bi-dash" data-v-2a1bde88></i></button><span class="px-6 py-3 text-white font-semibold min-w-[60px] text-center" data-v-2a1bde88>${ssrInterpolate(unref(quantity))}</span><button class="px-4 py-3 text-white hover:bg-gray-700/50 rounded-r-lg transition-colors duration-200" data-v-2a1bde88><i class="bi bi-plus" data-v-2a1bde88></i></button></div><span class="text-gray-400" data-v-2a1bde88>\u5E93\u5B58\uFF1A${ssrInterpolate(unref(product).stockCount)} \u4EF6</span></div></div><div class="space-y-4" data-v-2a1bde88><button${ssrIncludeBooleanAttr(!unref(product).inStock) ? " disabled" : ""} class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed" data-v-2a1bde88><i class="bi bi-cart-plus" data-v-2a1bde88></i> ${ssrInterpolate(unref(product).inStock ? "\u52A0\u5165\u8D2D\u7269\u8F66" : "\u6682\u65F6\u7F3A\u8D27")}</button><button${ssrIncludeBooleanAttr(!unref(product).inStock) ? " disabled" : ""} class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 disabled:cursor-not-allowed" data-v-2a1bde88><i class="bi bi-lightning" data-v-2a1bde88></i> \u7ACB\u5373\u8D2D\u4E70 </button></div><div class="mt-8 pt-6 border-t border-gray-700/50" data-v-2a1bde88><div class="grid grid-cols-3 gap-4 text-center" data-v-2a1bde88><div class="flex flex-col items-center gap-2" data-v-2a1bde88><i class="bi bi-truck text-2xl text-green-400" data-v-2a1bde88></i><span class="text-sm text-gray-300" data-v-2a1bde88>\u514D\u8D39\u914D\u9001</span></div><div class="flex flex-col items-center gap-2" data-v-2a1bde88><i class="bi bi-shield-check text-2xl text-blue-400" data-v-2a1bde88></i><span class="text-sm text-gray-300" data-v-2a1bde88>\u4E24\u5E74\u4FDD\u4FEE</span></div><div class="flex flex-col items-center gap-2" data-v-2a1bde88><i class="bi bi-arrow-repeat text-2xl text-purple-400" data-v-2a1bde88></i><span class="text-sm text-gray-300" data-v-2a1bde88>30\u5929\u9000\u6362</span></div></div></div></div></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8 mb-12" data-v-2a1bde88><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-2a1bde88><i class="bi bi-gear text-cyan-400" data-v-2a1bde88></i> \u6280\u672F\u89C4\u683C </h2><div class="grid md:grid-cols-2 gap-6" data-v-2a1bde88><!--[-->`);
        ssrRenderList(unref(product).specs, (value, key) => {
          _push(`<div class="flex justify-between items-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/30" data-v-2a1bde88><span class="text-gray-300 font-medium" data-v-2a1bde88>${ssrInterpolate(translateSpecKey(key))}</span><span class="font-semibold text-white" data-v-2a1bde88>${ssrInterpolate(value)}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8" data-v-2a1bde88><h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-2a1bde88><i class="bi bi-chat-dots text-cyan-400" data-v-2a1bde88></i> \u7528\u6237\u8BC4\u4EF7 </h2><div class="grid md:grid-cols-2 gap-8 mb-8" data-v-2a1bde88><div class="text-center" data-v-2a1bde88><div class="text-5xl font-bold text-cyan-400 mb-2" data-v-2a1bde88>${ssrInterpolate(unref(product).rating)}</div><div class="flex justify-center mb-2" data-v-2a1bde88><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<i class="${ssrRenderClass([i <= unref(product).rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-xl"])}" data-v-2a1bde88></i>`);
        });
        _push(`<!--]--></div><div class="text-gray-300" data-v-2a1bde88>\u57FA\u4E8E ${ssrInterpolate(unref(product).reviewCount)} \u6761\u8BC4\u4EF7</div></div><div class="space-y-3" data-v-2a1bde88><!--[-->`);
        ssrRenderList(unref(ratingDistribution), (count, rating) => {
          _push(`<div class="flex items-center gap-4" data-v-2a1bde88><span class="text-white w-8 flex-shrink-0" data-v-2a1bde88>${ssrInterpolate(rating)}\u661F</span><div class="flex-1 bg-gray-700/50 rounded-full h-2 overflow-hidden max-w-full" data-v-2a1bde88><div class="bg-cyan-400 h-2 rounded-full transition-all duration-300 max-w-full" style="${ssrRenderStyle({ width: `${Math.min(count / unref(product).reviewCount * 100, 100)}%` })}" data-v-2a1bde88></div></div><span class="text-gray-400 w-12 text-sm flex-shrink-0" data-v-2a1bde88>${ssrInterpolate(count)}</span></div>`);
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
        _push(`<div class="container mx-auto px-6 py-20 relative z-10" data-v-2a1bde88><div class="text-center" data-v-2a1bde88><div class="inline-flex flex-col items-center glass-card-dark rounded-2xl border border-cyan-500/30 p-12 shadow-2xl shadow-cyan-500/20" data-v-2a1bde88><div class="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6" data-v-2a1bde88></div><p class="text-2xl font-medium text-white" data-v-2a1bde88>\u6B63\u5728\u52A0\u8F7D\u4EA7\u54C1\u8BE6\u60C5...</p><p class="text-gray-400 mt-2" data-v-2a1bde88>\u8BF7\u7A0D\u5019</p></div></div></div>`);
      }
      if (unref(showSuccessMessage)) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-2a1bde88><div class="glass-card-dark rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/20 p-8 max-w-md w-full text-center" data-v-2a1bde88><div class="text-6xl text-green-400 mb-6" data-v-2a1bde88><i class="bi bi-check-circle" data-v-2a1bde88></i></div><h3 class="text-2xl font-bold text-white mb-4" data-v-2a1bde88>\u5DF2\u52A0\u5165\u8D2D\u7269\u8F66\uFF01</h3><p class="text-gray-300 mb-8" data-v-2a1bde88>${ssrInterpolate((_b = unref(product)) == null ? void 0 : _b.name)} \u5DF2\u6210\u529F\u6DFB\u52A0\u5230\u8D2D\u7269\u8F66\u3002</p><div class="space-y-3" data-v-2a1bde88><button class="w-full bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-2a1bde88> \u53BB\u7ED3\u7B97 </button><button class="w-full border border-gray-600 hover:border-green-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300" data-v-2a1bde88> \u7EE7\u7EED\u8D2D\u7269 </button></div></div></div>`);
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

export { _id_ as default };
//# sourceMappingURL=_id_-Ch6a2Mg1.mjs.map
