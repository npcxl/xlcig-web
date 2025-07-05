import { _ as __nuxt_component_0 } from './AppLogo-B7Z3yKfV.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-qhU_stN5.mjs';
import { ref, watch, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { p as productsApi } from './products-suYGsOwB.mjs';
import { a as useRoute } from './server.mjs';
import { u as useHead } from './v3-CcqVKkZz.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import './apiClient-C7W98XI_.mjs';
import 'pinia';
import 'vue-router';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
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
    const loading = ref(true);
    const error = ref(null);
    const confettiBatches = ref([]);
    let confettiInterval = null;
    const getProductCategory = (category) => {
      const categories = {
        graphics: "\u663E\u5361",
        cpu: "\u5904\u7406\u5668",
        motherboard: "\u4E3B\u677F",
        power: "\u7535\u6E90",
        memory: "\u5185\u5B58",
        storage: "\u5B58\u50A8",
        monitor: "\u663E\u793A\u5668",
        case: "\u673A\u7BB1",
        cooler: "\u6563\u70ED\u5668"
      };
      return categories[category] || "\u786C\u4EF6";
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
        comment: "\u6027\u80FD\u7EDD\u5BF9\u4EE4\u4EBA\u96BE\u4EE5\u7F6E\u4FE1\uFF01\u8FD9\u4E2A\u786C\u4EF6\u5728\u5404\u79CD\u5E94\u7528\u4E0B\u90FD\u8868\u73B0\u51FA\u8272\u3002\u8FD0\u884C\u7A33\u5B9A\uFF0C\u6027\u4EF7\u6BD4\u5F88\u9AD8\u3002"
      },
      {
        id: 2,
        author: "\u674E\u5973\u58EB",
        rating: 5,
        date: "2024-01-10",
        comment: "\u975E\u5E38\u9002\u5408\u4E13\u4E1A\u5DE5\u4F5C\u548C\u5A31\u4E50\u4F7F\u7528\u3002\u8D28\u91CF\u5F88\u597D\uFF0C\u5B89\u88C5\u7B80\u5355\uFF0C\u6548\u679C\u663E\u8457\u3002"
      },
      {
        id: 3,
        author: "\u5F20\u5148\u751F",
        rating: 4,
        date: "2024-01-05",
        comment: "\u5F88\u68D2\u7684\u4EA7\u54C1\uFF0C\u6027\u80FD\u5F3A\u52B2\u3002\u8FD0\u884C\u65F6\u6709\u4E00\u4E9B\u53D1\u70ED\uFF0C\u9700\u8981\u6CE8\u610F\u6563\u70ED\uFF0C\u4F46\u603B\u4F53\u6027\u80FD\u975E\u5E38\u6EE1\u610F\uFF01"
      }
    ]);
    const loadProductDetail = async () => {
      try {
        loading.value = true;
        error.value = null;
        const response = await productsApi.getProductById(productId);
        if (response.success && response.data) {
          const apiProduct = response.data;
          product.value = {
            id: apiProduct.id,
            name: apiProduct.name,
            brand: apiProduct.brand,
            category: getCategoryFromId(apiProduct.category_id),
            price: parseFloat(apiProduct.price),
            originalPrice: apiProduct.original_price ? parseFloat(apiProduct.original_price) : null,
            rating: parseFloat(apiProduct.rating),
            reviewCount: parseInt(apiProduct.review_count),
            viewCount: apiProduct.sales * 12 + Math.floor(Math.random() * 1e3),
            // 模拟浏览量
            image: apiProduct.images && apiProduct.images.length > 0 ? apiProduct.images[0] : "",
            images: apiProduct.images || [],
            inStock: apiProduct.stock > 0,
            stockCount: apiProduct.stock,
            description: apiProduct.description || apiProduct.short_description,
            specs: apiProduct.specifications || {},
            features: apiProduct.features || [],
            tags: apiProduct.tags || [],
            sales: apiProduct.sales,
            slug: apiProduct.slug,
            sku: apiProduct.sku,
            model: apiProduct.model
          };
          updateRatingDistribution(apiProduct.review_count, parseFloat(apiProduct.rating));
          checkFavoriteStatus();
        } else {
          error.value = "\u4EA7\u54C1\u4E0D\u5B58\u5728\u6216\u5DF2\u4E0B\u67B6";
        }
      } catch (err) {
        console.error("\u83B7\u53D6\u4EA7\u54C1\u8BE6\u60C5\u5931\u8D25:", err);
        error.value = "\u52A0\u8F7D\u4EA7\u54C1\u8BE6\u60C5\u65F6\u51FA\u9519\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";
      } finally {
        loading.value = false;
      }
    };
    const getCategoryFromId = (categoryId) => {
      const categoryMap = {
        1: "cpu",
        2: "motherboard",
        3: "memory",
        4: "graphics",
        5: "storage",
        6: "power",
        7: "case",
        8: "cooler",
        9: "monitor"
      };
      return categoryMap[categoryId] || "hardware";
    };
    const updateRatingDistribution = (totalReviews, avgRating) => {
      const total = totalReviews;
      const distribution = {
        5: Math.round(total * 0.6),
        4: Math.round(total * 0.25),
        3: Math.round(total * 0.1),
        2: Math.round(total * 0.03),
        1: Math.round(total * 0.02)
      };
      const sum = Object.values(distribution).reduce((a, b) => a + b, 0);
      if (sum !== total) {
        distribution[5] += total - sum;
      }
      ratingDistribution.value = distribution;
    };
    const checkFavoriteStatus = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      isFavorite.value = favorites.includes(productId);
    };
    watch(showSuccessMessage, (newValue) => {
      if (newValue) {
        startConfettiAnimation();
        setTimeout(() => {
          stopConfettiAnimation();
        }, 3e3);
      } else {
        stopConfettiAnimation();
      }
    });
    const startConfettiAnimation = () => {
      confettiBatches.value = [];
      let batchId = 0;
      confettiBatches.value.push({
        id: batchId++,
        delay: 0
      });
      confettiInterval = setInterval();
    };
    const stopConfettiAnimation = () => {
      if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
      }
      confettiBatches.value = [];
    };
    const getConfettiColor = (index) => {
      const colors = ["#00f5ff", "#0080ff", "#a855f7", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#8b5cf6"];
      return colors[index % colors.length];
    };
    const getConfettiShape = (index) => {
      const shapes = ["confetti-circle", "confetti-square", "confetti-triangle"];
      return shapes[index % shapes.length];
    };
    const translateSpecKey = (key) => {
      const translations = {
        "TDP": "TDP\u529F\u8017",
        "\u5236\u7A0B": "\u5236\u7A0B\u5DE5\u827A",
        "\u63D2\u69FD": "\u63A5\u53E3\u63D2\u69FD",
        "\u7F13\u5B58": "\u7F13\u5B58",
        "L2\u7F13\u5B58": "L2\u7F13\u5B58",
        "L3\u7F13\u5B58": "L3\u7F13\u5B58",
        "\u6838\u5FC3\u6570": "\u6838\u5FC3\u6570",
        "\u7EBF\u7A0B\u6570": "\u7EBF\u7A0B\u6570",
        "\u5185\u5B58\u652F\u6301": "\u652F\u6301\u5185\u5B58",
        "\u57FA\u7840\u9891\u7387": "\u57FA\u7840\u9891\u7387",
        "\u6700\u5927\u777F\u9891": "\u6700\u5927\u777F\u9891",
        "\u6700\u5927\u52A0\u901F\u9891\u7387": "\u6700\u5927\u52A0\u901F",
        "\u529F\u8017": "\u529F\u8017",
        "\u63A5\u53E3": "\u663E\u793A\u63A5\u53E3",
        "\u663E\u5B58": "\u663E\u5B58\u5BB9\u91CF",
        "\u67B6\u6784": "\u67B6\u6784",
        "CUDA\u6838\u5FC3": "CUDA\u6838\u5FC3",
        "\u52A0\u901F\u9891\u7387": "\u52A0\u901F\u9891\u7387",
        "\u663E\u5B58\u4F4D\u5BBD": "\u663E\u5B58\u4F4D\u5BBD",
        "\u6D41\u5904\u7406\u5668": "\u6D41\u5904\u7406\u5668",
        "\u6E38\u620F\u9891\u7387": "\u6E38\u620F\u9891\u7387",
        "\u5BB9\u91CF": "\u5BB9\u91CF",
        "\u6563\u70ED": "\u6563\u70ED\u65B9\u6848",
        "\u65F6\u5E8F": "\u65F6\u5E8F",
        "\u7535\u538B": "\u5DE5\u4F5C\u7535\u538B",
        "\u8D28\u4FDD": "\u8D28\u4FDD\u671F",
        "\u9891\u7387": "\u5DE5\u4F5C\u9891\u7387",
        "\u517C\u5BB9\u6027": "\u5E73\u53F0\u517C\u5BB9"
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-0fc13075><div class="fixed inset-0 pointer-events-none" data-v-0fc13075><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-0fc13075></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-0fc13075></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-0fc13075></div></div><nav class="relative z-10" data-v-0fc13075><div class="container mx-auto px-6 py-6" data-v-0fc13075><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-0fc13075><div class="flex items-center justify-between" data-v-0fc13075><div class="flex items-center space-x-6" data-v-0fc13075>`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "medium",
        "show-decorations": false
      }, null, _parent));
      _push(`<div class="h-6 w-px bg-gray-600" data-v-0fc13075></div><button class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200" data-v-0fc13075><i class="bi bi-arrow-left mr-2 text-lg" data-v-0fc13075></i><span class="text-sm font-medium" data-v-0fc13075>\u8FD4\u56DE</span></button></div><nav class="text-sm text-gray-400" data-v-0fc13075>`);
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
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-0fc13075></i>`);
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
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-0fc13075></i><span class="text-white font-medium" data-v-0fc13075>${ssrInterpolate(((_a = unref(product)) == null ? void 0 : _a.name) || "\u4EA7\u54C1\u8BE6\u60C5")}</span></nav></div></div></div></nav>`);
      if (unref(product) && !unref(loading) && !unref(error)) {
        _push(`<div class="container mx-auto px-6 py-8 relative z-10" data-v-0fc13075><div class="grid lg:grid-cols-2 gap-12 mb-12" data-v-0fc13075><div class="space-y-6" data-v-0fc13075><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 overflow-hidden backdrop-blur-xl" data-v-0fc13075><div class="relative h-96 bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6" data-v-0fc13075>`);
        if (unref(product).image) {
          _push(`<div class="product-image-container" data-v-0fc13075><img${ssrRenderAttr("src", unref(product).image)}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-contain transition-all duration-500 hover:scale-105 filter drop-shadow-2xl" data-v-0fc13075></div>`);
        } else {
          _push(`<div class="product-placeholder" data-v-0fc13075><div class="product-icon-wrapper" data-v-0fc13075><i class="bi bi-cpu product-icon" data-v-0fc13075></i><div class="product-icon-glow" data-v-0fc13075></div></div><span class="product-placeholder-text" data-v-0fc13075>${ssrInterpolate(unref(product).name)}</span><div class="product-tech-pattern" data-v-0fc13075></div></div>`);
        }
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<div class="absolute top-4 left-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-red-500/40 animate-pulse" data-v-0fc13075><i class="bi bi-lightning-fill mr-1" data-v-0fc13075></i> \u7701 \xA5${ssrInterpolate((unref(product).originalPrice - unref(product).price).toLocaleString())}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute top-4 right-4" data-v-0fc13075>`);
        if (!unref(product).inStock) {
          _push(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-red-500/30 text-red-200 border border-red-400/50 shadow-lg shadow-red-500/30 backdrop-blur-sm" data-v-0fc13075><i class="bi bi-x-circle-fill mr-2 text-red-300" data-v-0fc13075></i>\u7F3A\u8D27 </span>`);
        } else if (unref(product).stockCount <= 5) {
          _push(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-orange-500/30 text-orange-200 border border-orange-400/50 shadow-lg shadow-orange-500/30 backdrop-blur-sm animate-pulse" data-v-0fc13075><i class="bi bi-exclamation-triangle-fill mr-2 text-orange-300" data-v-0fc13075></i>\u4EC5\u5269 ${ssrInterpolate(unref(product).stockCount)} \u4EF6 </span>`);
        } else {
          _push(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/30 backdrop-blur-sm" data-v-0fc13075><i class="bi bi-check-circle-fill mr-2 text-emerald-300" data-v-0fc13075></i>\u73B0\u8D27\u5145\u8DB3 </span>`);
        }
        _push(`</div><div class="absolute bottom-4 left-4" data-v-0fc13075><span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-sm" data-v-0fc13075><i class="bi bi-bookmark-fill mr-1" data-v-0fc13075></i> ${ssrInterpolate(getProductCategory(unref(product).category))}</span></div></div></div><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl" data-v-0fc13075><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-0fc13075><div class="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg" data-v-0fc13075><i class="bi bi-stars text-white" data-v-0fc13075></i></div><span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-0fc13075>\u6838\u5FC3\u7279\u6027</span></h3>`);
        if (unref(product).features && unref(product).features.length > 0) {
          _push(`<div class="grid grid-cols-1 gap-4" data-v-0fc13075><!--[-->`);
          ssrRenderList(unref(product).features, (feature, index) => {
            _push(`<div class="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm" style="${ssrRenderStyle({ "animation-delay": `${index * 100}ms` })}" data-v-0fc13075><div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" data-v-0fc13075><i class="bi bi-check text-white text-sm font-bold" data-v-0fc13075></i></div><span class="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300" data-v-0fc13075>${ssrInterpolate(feature)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-gray-400 text-center py-8" data-v-0fc13075><i class="bi bi-info-circle text-3xl mb-2" data-v-0fc13075></i><p data-v-0fc13075>\u6682\u65E0\u7279\u6027\u4FE1\u606F</p></div>`);
        }
        _push(`</div></div><div class="space-y-6" data-v-0fc13075><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl" data-v-0fc13075><div class="flex items-center justify-between mb-6" data-v-0fc13075><div class="flex items-center gap-4" data-v-0fc13075><span class="inline-flex items-center px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border border-cyan-400/40 shadow-lg backdrop-blur-sm" data-v-0fc13075><i class="bi bi-award mr-2" data-v-0fc13075></i> ${ssrInterpolate(unref(product).brand)}</span><div class="flex items-center gap-2 text-sm text-gray-400" data-v-0fc13075><i class="bi bi-eye text-cyan-400" data-v-0fc13075></i><span data-v-0fc13075>${ssrInterpolate(unref(product).viewCount || 1234)} \u6B21\u6D4F\u89C8</span></div></div><button class="${ssrRenderClass([
          "p-3 rounded-xl border transition-all duration-300 group relative overflow-hidden",
          unref(isFavorite) ? "bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400/50 text-red-300 shadow-lg shadow-red-500/30" : "border-gray-600/50 text-gray-400 hover:border-red-400/50 hover:text-red-300 hover:bg-red-500/10"
        ])}" data-v-0fc13075><i class="${ssrRenderClass([unref(isFavorite) ? "bi bi-heart-fill" : "bi bi-heart", "text-xl relative z-10 group-hover:scale-110 transition-transform duration-300"])}" data-v-0fc13075></i><div class="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-0fc13075></div></button></div><h1 class="text-4xl font-bold text-white mb-4 leading-tight" data-v-0fc13075><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-0fc13075>${ssrInterpolate(unref(product).name)}</span></h1><div class="flex items-center gap-4 mb-6 text-gray-400" data-v-0fc13075>`);
        if (unref(product).model) {
          _push(`<span class="text-sm" data-v-0fc13075><i class="bi bi-tag mr-1" data-v-0fc13075></i> \u578B\u53F7: ${ssrInterpolate(unref(product).model)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).sku) {
          _push(`<span class="text-sm" data-v-0fc13075><i class="bi bi-upc mr-1" data-v-0fc13075></i> SKU: ${ssrInterpolate(unref(product).sku)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center gap-6 mb-8 p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 backdrop-blur-sm" data-v-0fc13075><div class="flex items-center gap-3" data-v-0fc13075><div class="flex" data-v-0fc13075><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<i class="${ssrRenderClass([i <= unref(product).rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-xl drop-shadow-lg"])}" data-v-0fc13075></i>`);
        });
        _push(`<!--]--></div><span class="text-2xl font-bold text-white" data-v-0fc13075>${ssrInterpolate(unref(product).rating)}</span></div><div class="h-8 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent" data-v-0fc13075></div><div class="flex items-center gap-2 text-gray-300" data-v-0fc13075><i class="bi bi-chat-dots text-cyan-400" data-v-0fc13075></i><span data-v-0fc13075>${ssrInterpolate(unref(product).reviewCount)} \u6761\u8BC4\u4EF7</span></div><div class="flex items-center gap-2 text-gray-300" data-v-0fc13075><i class="bi bi-truck text-green-400" data-v-0fc13075></i><span data-v-0fc13075>\u514D\u8D39\u914D\u9001</span></div><div class="flex items-center gap-2 text-gray-300" data-v-0fc13075><i class="bi bi-graph-up text-purple-400" data-v-0fc13075></i><span data-v-0fc13075>\u9500\u91CF ${ssrInterpolate(unref(product).sales)}</span></div></div><div class="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-400/30 backdrop-blur-sm" data-v-0fc13075><div class="flex items-end gap-4 mb-3" data-v-0fc13075><span class="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-0fc13075> \xA5${ssrInterpolate(unref(product).price.toLocaleString())}</span>`);
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<span class="text-2xl text-gray-500 line-through mb-2" data-v-0fc13075> \xA5${ssrInterpolate(unref(product).originalPrice.toLocaleString())}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<span class="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium border border-red-400/30 mb-2" data-v-0fc13075> \u7701${ssrInterpolate(Math.round((unref(product).originalPrice - unref(product).price) / unref(product).originalPrice * 100))}% </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-gray-300 leading-relaxed" data-v-0fc13075>${ssrInterpolate(unref(product).description)}</p></div><div class="mb-8" data-v-0fc13075><label class="block text-sm font-bold text-white mb-4 flex items-center gap-2" data-v-0fc13075><i class="bi bi-123 text-cyan-400" data-v-0fc13075></i> \u8D2D\u4E70\u6570\u91CF </label><div class="flex items-center gap-6" data-v-0fc13075><div class="flex items-center border border-gray-600/50 rounded-xl bg-gray-800/30 backdrop-blur-sm" data-v-0fc13075><button class="px-5 py-3 text-white hover:bg-cyan-500/20 hover:text-cyan-300 rounded-l-xl transition-all duration-300 border-r border-gray-600/50" data-v-0fc13075><i class="bi bi-dash-lg text-lg font-bold" data-v-0fc13075></i></button><span class="px-8 py-3 text-white font-bold text-lg min-w-[80px] text-center bg-gray-700/30" data-v-0fc13075>${ssrInterpolate(unref(quantity))}</span><button class="px-5 py-3 text-white hover:bg-cyan-500/20 hover:text-cyan-300 rounded-r-xl transition-all duration-300 border-l border-gray-600/50" data-v-0fc13075><i class="bi bi-plus-lg text-lg font-bold" data-v-0fc13075></i></button></div><div class="flex items-center gap-2 text-gray-300 bg-gray-800/30 px-4 py-2 rounded-lg border border-gray-600/30 backdrop-blur-sm" data-v-0fc13075><i class="bi bi-box text-green-400" data-v-0fc13075></i><span data-v-0fc13075>\u5E93\u5B58\uFF1A<span class="text-green-400 font-bold" data-v-0fc13075>${ssrInterpolate(unref(product).stockCount)}</span> \u4EF6</span></div></div></div><div class="space-y-4 mb-8" data-v-0fc13075><button${ssrIncludeBooleanAttr(!unref(product).inStock || unref(showSuccessMessage)) ? " disabled" : ""} data-add-to-cart class="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 relative overflow-hidden group" data-v-0fc13075><div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" data-v-0fc13075></div><i class="bi bi-cart-plus text-xl" data-v-0fc13075></i><span data-v-0fc13075>${ssrInterpolate(unref(product).inStock ? "\u52A0\u5165\u8D2D\u7269\u8F66" : "\u6682\u65F6\u7F3A\u8D27")}</span></button><button${ssrIncludeBooleanAttr(!unref(product).inStock) ? " disabled" : ""} class="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-500 hover:via-emerald-500 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 relative overflow-hidden group" data-v-0fc13075><div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" data-v-0fc13075></div><i class="bi bi-lightning-fill text-xl" data-v-0fc13075></i><span data-v-0fc13075>\u7ACB\u5373\u8D2D\u4E70</span></button></div><div class="pt-6 border-t border-gray-700/50" data-v-0fc13075><div class="grid grid-cols-3 gap-4 text-center" data-v-0fc13075><div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group" data-v-0fc13075><div class="p-3 bg-green-500/20 rounded-full group-hover:scale-110 transition-transform duration-300" data-v-0fc13075><i class="bi bi-truck text-2xl text-green-400" data-v-0fc13075></i></div><span class="text-sm text-gray-300 font-medium" data-v-0fc13075>\u514D\u8D39\u914D\u9001</span></div><div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group" data-v-0fc13075><div class="p-3 bg-blue-500/20 rounded-full group-hover:scale-110 transition-transform duration-300" data-v-0fc13075><i class="bi bi-shield-check text-2xl text-blue-400" data-v-0fc13075></i></div><span class="text-sm text-gray-300 font-medium" data-v-0fc13075>\u4E24\u5E74\u4FDD\u4FEE</span></div><div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group" data-v-0fc13075><div class="p-3 bg-purple-500/20 rounded-full group-hover:scale-110 transition-transform duration-300" data-v-0fc13075><i class="bi bi-arrow-repeat text-2xl text-purple-400" data-v-0fc13075></i></div><span class="text-sm text-gray-300 font-medium" data-v-0fc13075>30\u5929\u9000\u6362</span></div></div></div></div></div></div><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 mb-12 backdrop-blur-xl" data-v-0fc13075><h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-4" data-v-0fc13075><div class="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg" data-v-0fc13075><i class="bi bi-gear-fill text-white text-2xl" data-v-0fc13075></i></div><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-0fc13075>\u6280\u672F\u89C4\u683C</span></h2>`);
        if (unref(product).specs && Object.keys(unref(product).specs).length > 0) {
          _push(`<div class="grid md:grid-cols-2 gap-6" data-v-0fc13075><!--[-->`);
          ssrRenderList(unref(product).specs, (value, key) => {
            _push(`<div class="group flex justify-between items-center p-5 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm" data-v-0fc13075><span class="text-gray-300 font-semibold text-lg" data-v-0fc13075>${ssrInterpolate(translateSpecKey(key))}</span><span class="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors duration-300" data-v-0fc13075>${ssrInterpolate(value)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-gray-400 text-center py-8" data-v-0fc13075><i class="bi bi-info-circle text-3xl mb-2" data-v-0fc13075></i><p data-v-0fc13075>\u6682\u65E0\u89C4\u683C\u4FE1\u606F</p></div>`);
        }
        _push(`</div><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl" data-v-0fc13075><h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-4" data-v-0fc13075><div class="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg" data-v-0fc13075><i class="bi bi-chat-dots-fill text-white text-2xl" data-v-0fc13075></i></div><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-0fc13075>\u7528\u6237\u8BC4\u4EF7</span></h2><div class="grid md:grid-cols-2 gap-8 mb-8" data-v-0fc13075><div class="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-400/30" data-v-0fc13075><div class="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4" data-v-0fc13075>${ssrInterpolate(unref(product).rating)}</div><div class="flex justify-center mb-4" data-v-0fc13075><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<i class="${ssrRenderClass([i <= unref(product).rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-2xl drop-shadow-lg"])}" data-v-0fc13075></i>`);
        });
        _push(`<!--]--></div><div class="text-gray-300 text-lg" data-v-0fc13075>\u57FA\u4E8E <span class="text-yellow-400 font-bold" data-v-0fc13075>${ssrInterpolate(unref(product).reviewCount)}</span> \u6761\u8BC4\u4EF7</div></div><div class="space-y-4" data-v-0fc13075><!--[-->`);
        ssrRenderList(unref(ratingDistribution), (count, rating) => {
          _push(`<div class="flex items-center gap-4" data-v-0fc13075><span class="text-white w-12 flex-shrink-0 font-bold" data-v-0fc13075>${ssrInterpolate(rating)}\u661F</span><div class="flex-1 bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-gray-600/30" data-v-0fc13075><div class="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-yellow-500/30" style="${ssrRenderStyle({ width: `${Math.min(count / unref(product).reviewCount * 100, 100)}%` })}" data-v-0fc13075></div></div><span class="text-gray-400 w-16 text-sm flex-shrink-0 font-medium" data-v-0fc13075>${ssrInterpolate(count)} \u6761</span></div>`);
        });
        _push(`<!--]--></div></div><div class="space-y-6" data-v-0fc13075><!--[-->`);
        ssrRenderList(unref(reviews), (review) => {
          _push(`<div class="p-6 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm" data-v-0fc13075><div class="flex items-center justify-between mb-4" data-v-0fc13075><div class="flex items-center gap-4" data-v-0fc13075><div class="w-14 h-14 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full flex items-center justify-center border border-cyan-400/40 shadow-lg" data-v-0fc13075><i class="bi bi-person-fill text-cyan-400 text-xl" data-v-0fc13075></i></div><div data-v-0fc13075><div class="font-bold text-white text-lg" data-v-0fc13075>${ssrInterpolate(review.author)}</div><div class="text-sm text-gray-400" data-v-0fc13075>${ssrInterpolate(formatDate(review.date))}</div></div></div><div class="flex gap-1" data-v-0fc13075><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<i class="${ssrRenderClass([i <= review.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-lg drop-shadow-lg"])}" data-v-0fc13075></i>`);
          });
          _push(`<!--]--></div></div><p class="text-gray-300 leading-relaxed text-lg" data-v-0fc13075>${ssrInterpolate(review.comment)}</p></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else if (unref(error) && !unref(loading)) {
        _push(`<div class="container mx-auto px-6 py-20 relative z-10" data-v-0fc13075><div class="text-center" data-v-0fc13075><div class="inline-flex flex-col items-center glass-card-enhanced rounded-2xl border border-red-400/40 p-16 shadow-2xl shadow-red-500/25 backdrop-blur-xl max-w-md mx-auto" data-v-0fc13075><div class="text-8xl text-red-400 mb-8" data-v-0fc13075><i class="bi bi-exclamation-triangle-fill" data-v-0fc13075></i></div><h3 class="text-3xl font-bold text-white mb-4" data-v-0fc13075>\u52A0\u8F7D\u5931\u8D25</h3><p class="text-gray-400 text-lg mb-8" data-v-0fc13075>${ssrInterpolate(unref(error))}</p><div class="space-y-3 w-full" data-v-0fc13075><button class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-0fc13075><i class="bi bi-arrow-clockwise mr-2" data-v-0fc13075></i> \u91CD\u65B0\u52A0\u8F7D </button><button class="w-full border border-gray-600/50 hover:border-cyan-400/50 text-gray-300 hover:text-white hover:bg-cyan-500/10 py-3 px-6 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm" data-v-0fc13075> \u8FD4\u56DE\u4E0A\u9875 </button></div></div></div></div>`);
      } else if (unref(loading)) {
        _push(`<div class="container mx-auto px-6 py-20 relative z-10" data-v-0fc13075><div class="text-center" data-v-0fc13075><div class="inline-flex flex-col items-center glass-card-enhanced rounded-2xl border border-cyan-400/40 p-16 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-0fc13075><div class="relative mb-8" data-v-0fc13075><div class="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" data-v-0fc13075></div><div class="absolute inset-0 w-20 h-20 border-4 border-blue-500/30 rounded-full animate-pulse" data-v-0fc13075></div></div><p class="text-3xl font-bold text-white mb-4" data-v-0fc13075>\u6B63\u5728\u52A0\u8F7D\u4EA7\u54C1\u8BE6\u60C5...</p><p class="text-gray-400 text-lg" data-v-0fc13075>\u8BF7\u7A0D\u5019\uFF0C\u6B63\u5728\u4E3A\u60A8\u83B7\u53D6\u6700\u65B0\u4FE1\u606F</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showSuccessMessage)) {
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4" data-v-0fc13075><div class="confetti-container" data-v-0fc13075><!--[-->`);
        ssrRenderList(unref(confettiBatches), (batch) => {
          _push(`<div data-v-0fc13075><!--[-->`);
          ssrRenderList(30, (i) => {
            _push(`<div class="${ssrRenderClass([getConfettiShape(i), "confetti-piece"])}" style="${ssrRenderStyle({
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 2 + batch.delay + "s",
              animationDuration: "3s",
              backgroundColor: getConfettiColor(i + batch.id * 30),
              width: 8 + Math.random() * 6 + "px",
              height: 8 + Math.random() * 6 + "px"
            })}" data-v-0fc13075></div>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div><div class="glass-card-enhanced rounded-2xl border border-green-400/50 shadow-2xl shadow-green-500/30 p-10 max-w-md w-full text-center backdrop-blur-xl transform animate-bounce-in" data-v-0fc13075><div class="text-8xl text-green-400 mb-8 relative" data-v-0fc13075><i class="bi bi-check-circle-fill drop-shadow-2xl animate-check-bounce" data-v-0fc13075></i><div class="absolute inset-0 text-green-400/30 animate-ping-once" data-v-0fc13075><i class="bi bi-check-circle-fill" data-v-0fc13075></i></div></div><h3 class="text-3xl font-bold text-white mb-6" data-v-0fc13075>\u5DF2\u52A0\u5165\u8D2D\u7269\u8F66\uFF01</h3><p class="text-gray-300 mb-8 text-lg leading-relaxed" data-v-0fc13075>${ssrInterpolate((_b = unref(product)) == null ? void 0 : _b.name)} \u5DF2\u6210\u529F\u6DFB\u52A0\u5230\u8D2D\u7269\u8F66\u3002</p><div class="space-y-4" data-v-0fc13075><button class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform hover:scale-105" data-v-0fc13075> \u7ACB\u5373\u53BB\u7ED3\u7B97 </button><button class="w-full border border-gray-600/50 hover:border-green-400/50 text-gray-300 hover:text-white hover:bg-green-500/10 py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm" data-v-0fc13075> \u7EE7\u7EED\u8D2D\u7269 </button></div></div></div>`);
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0fc13075"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-2j4w7VkR.mjs.map
