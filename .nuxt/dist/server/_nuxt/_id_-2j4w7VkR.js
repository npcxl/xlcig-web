import { _ as __nuxt_component_0 } from "./AppLogo-B7Z3yKfV.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-qhU_stN5.js";
import { ref, watch, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "./apiClient-C7W98XI_.js";
import { p as productsApi } from "./products-suYGsOwB.js";
import { a as useRoute } from "../server.mjs";
import "D:/codeGitee/xlweb/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-CcqVKkZz.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "D:/codeGitee/xlweb/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlweb/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/codeGitee/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/klona/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/@unhead/vue/dist/index.mjs";
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
        graphics: "显卡",
        cpu: "处理器",
        motherboard: "主板",
        power: "电源",
        memory: "内存",
        storage: "存储",
        monitor: "显示器",
        case: "机箱",
        cooler: "散热器"
      };
      return categories[category] || "硬件";
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
        comment: "性能绝对令人难以置信！这个硬件在各种应用下都表现出色。运行稳定，性价比很高。"
      },
      {
        id: 2,
        author: "李女士",
        rating: 5,
        date: "2024-01-10",
        comment: "非常适合专业工作和娱乐使用。质量很好，安装简单，效果显著。"
      },
      {
        id: 3,
        author: "张先生",
        rating: 4,
        date: "2024-01-05",
        comment: "很棒的产品，性能强劲。运行时有一些发热，需要注意散热，但总体性能非常满意！"
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
          error.value = "产品不存在或已下架";
        }
      } catch (err) {
        console.error("获取产品详情失败:", err);
        error.value = "加载产品详情时出错，请稍后重试";
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
        "TDP": "TDP功耗",
        "制程": "制程工艺",
        "插槽": "接口插槽",
        "缓存": "缓存",
        "L2缓存": "L2缓存",
        "L3缓存": "L3缓存",
        "核心数": "核心数",
        "线程数": "线程数",
        "内存支持": "支持内存",
        "基础频率": "基础频率",
        "最大睿频": "最大睿频",
        "最大加速频率": "最大加速",
        "功耗": "功耗",
        "接口": "显示接口",
        "显存": "显存容量",
        "架构": "架构",
        "CUDA核心": "CUDA核心",
        "加速频率": "加速频率",
        "显存位宽": "显存位宽",
        "流处理器": "流处理器",
        "游戏频率": "游戏频率",
        "容量": "容量",
        "散热": "散热方案",
        "时序": "时序",
        "电压": "工作电压",
        "质保": "质保期",
        "频率": "工作频率",
        "兼容性": "平台兼容"
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-0fc13075><div class="fixed inset-0 pointer-events-none" data-v-0fc13075><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-0fc13075></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-0fc13075></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-0fc13075></div></div><nav class="relative z-10" data-v-0fc13075><div class="container mx-auto px-6 py-6" data-v-0fc13075><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-0fc13075><div class="flex items-center justify-between" data-v-0fc13075><div class="flex items-center space-x-6" data-v-0fc13075>`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "medium",
        "show-decorations": false
      }, null, _parent));
      _push(`<div class="h-6 w-px bg-gray-600" data-v-0fc13075></div><button class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200" data-v-0fc13075><i class="bi bi-arrow-left mr-2 text-lg" data-v-0fc13075></i><span class="text-sm font-medium" data-v-0fc13075>返回</span></button></div><nav class="text-sm text-gray-400" data-v-0fc13075>`);
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
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-0fc13075></i>`);
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
      _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-0fc13075></i><span class="text-white font-medium" data-v-0fc13075>${ssrInterpolate(((_a = unref(product)) == null ? void 0 : _a.name) || "产品详情")}</span></nav></div></div></div></nav>`);
      if (unref(product) && !unref(loading) && !unref(error)) {
        _push(`<div class="container mx-auto px-6 py-8 relative z-10" data-v-0fc13075><div class="grid lg:grid-cols-2 gap-12 mb-12" data-v-0fc13075><div class="space-y-6" data-v-0fc13075><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 overflow-hidden backdrop-blur-xl" data-v-0fc13075><div class="relative h-96 bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6" data-v-0fc13075>`);
        if (unref(product).image) {
          _push(`<div class="product-image-container" data-v-0fc13075><img${ssrRenderAttr("src", unref(product).image)}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-contain transition-all duration-500 hover:scale-105 filter drop-shadow-2xl" data-v-0fc13075></div>`);
        } else {
          _push(`<div class="product-placeholder" data-v-0fc13075><div class="product-icon-wrapper" data-v-0fc13075><i class="bi bi-cpu product-icon" data-v-0fc13075></i><div class="product-icon-glow" data-v-0fc13075></div></div><span class="product-placeholder-text" data-v-0fc13075>${ssrInterpolate(unref(product).name)}</span><div class="product-tech-pattern" data-v-0fc13075></div></div>`);
        }
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<div class="absolute top-4 left-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-red-500/40 animate-pulse" data-v-0fc13075><i class="bi bi-lightning-fill mr-1" data-v-0fc13075></i> 省 ¥${ssrInterpolate((unref(product).originalPrice - unref(product).price).toLocaleString())}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute top-4 right-4" data-v-0fc13075>`);
        if (!unref(product).inStock) {
          _push(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-red-500/30 text-red-200 border border-red-400/50 shadow-lg shadow-red-500/30 backdrop-blur-sm" data-v-0fc13075><i class="bi bi-x-circle-fill mr-2 text-red-300" data-v-0fc13075></i>缺货 </span>`);
        } else if (unref(product).stockCount <= 5) {
          _push(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-orange-500/30 text-orange-200 border border-orange-400/50 shadow-lg shadow-orange-500/30 backdrop-blur-sm animate-pulse" data-v-0fc13075><i class="bi bi-exclamation-triangle-fill mr-2 text-orange-300" data-v-0fc13075></i>仅剩 ${ssrInterpolate(unref(product).stockCount)} 件 </span>`);
        } else {
          _push(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/30 backdrop-blur-sm" data-v-0fc13075><i class="bi bi-check-circle-fill mr-2 text-emerald-300" data-v-0fc13075></i>现货充足 </span>`);
        }
        _push(`</div><div class="absolute bottom-4 left-4" data-v-0fc13075><span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-sm" data-v-0fc13075><i class="bi bi-bookmark-fill mr-1" data-v-0fc13075></i> ${ssrInterpolate(getProductCategory(unref(product).category))}</span></div></div></div><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl" data-v-0fc13075><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-0fc13075><div class="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg" data-v-0fc13075><i class="bi bi-stars text-white" data-v-0fc13075></i></div><span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-0fc13075>核心特性</span></h3>`);
        if (unref(product).features && unref(product).features.length > 0) {
          _push(`<div class="grid grid-cols-1 gap-4" data-v-0fc13075><!--[-->`);
          ssrRenderList(unref(product).features, (feature, index) => {
            _push(`<div class="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm" style="${ssrRenderStyle({ "animation-delay": `${index * 100}ms` })}" data-v-0fc13075><div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" data-v-0fc13075><i class="bi bi-check text-white text-sm font-bold" data-v-0fc13075></i></div><span class="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300" data-v-0fc13075>${ssrInterpolate(feature)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-gray-400 text-center py-8" data-v-0fc13075><i class="bi bi-info-circle text-3xl mb-2" data-v-0fc13075></i><p data-v-0fc13075>暂无特性信息</p></div>`);
        }
        _push(`</div></div><div class="space-y-6" data-v-0fc13075><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl" data-v-0fc13075><div class="flex items-center justify-between mb-6" data-v-0fc13075><div class="flex items-center gap-4" data-v-0fc13075><span class="inline-flex items-center px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border border-cyan-400/40 shadow-lg backdrop-blur-sm" data-v-0fc13075><i class="bi bi-award mr-2" data-v-0fc13075></i> ${ssrInterpolate(unref(product).brand)}</span><div class="flex items-center gap-2 text-sm text-gray-400" data-v-0fc13075><i class="bi bi-eye text-cyan-400" data-v-0fc13075></i><span data-v-0fc13075>${ssrInterpolate(unref(product).viewCount || 1234)} 次浏览</span></div></div><button class="${ssrRenderClass([
          "p-3 rounded-xl border transition-all duration-300 group relative overflow-hidden",
          unref(isFavorite) ? "bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400/50 text-red-300 shadow-lg shadow-red-500/30" : "border-gray-600/50 text-gray-400 hover:border-red-400/50 hover:text-red-300 hover:bg-red-500/10"
        ])}" data-v-0fc13075><i class="${ssrRenderClass([unref(isFavorite) ? "bi bi-heart-fill" : "bi bi-heart", "text-xl relative z-10 group-hover:scale-110 transition-transform duration-300"])}" data-v-0fc13075></i><div class="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-0fc13075></div></button></div><h1 class="text-4xl font-bold text-white mb-4 leading-tight" data-v-0fc13075><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-0fc13075>${ssrInterpolate(unref(product).name)}</span></h1><div class="flex items-center gap-4 mb-6 text-gray-400" data-v-0fc13075>`);
        if (unref(product).model) {
          _push(`<span class="text-sm" data-v-0fc13075><i class="bi bi-tag mr-1" data-v-0fc13075></i> 型号: ${ssrInterpolate(unref(product).model)}</span>`);
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
        _push(`<!--]--></div><span class="text-2xl font-bold text-white" data-v-0fc13075>${ssrInterpolate(unref(product).rating)}</span></div><div class="h-8 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent" data-v-0fc13075></div><div class="flex items-center gap-2 text-gray-300" data-v-0fc13075><i class="bi bi-chat-dots text-cyan-400" data-v-0fc13075></i><span data-v-0fc13075>${ssrInterpolate(unref(product).reviewCount)} 条评价</span></div><div class="flex items-center gap-2 text-gray-300" data-v-0fc13075><i class="bi bi-truck text-green-400" data-v-0fc13075></i><span data-v-0fc13075>免费配送</span></div><div class="flex items-center gap-2 text-gray-300" data-v-0fc13075><i class="bi bi-graph-up text-purple-400" data-v-0fc13075></i><span data-v-0fc13075>销量 ${ssrInterpolate(unref(product).sales)}</span></div></div><div class="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-400/30 backdrop-blur-sm" data-v-0fc13075><div class="flex items-end gap-4 mb-3" data-v-0fc13075><span class="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-0fc13075> ¥${ssrInterpolate(unref(product).price.toLocaleString())}</span>`);
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<span class="text-2xl text-gray-500 line-through mb-2" data-v-0fc13075> ¥${ssrInterpolate(unref(product).originalPrice.toLocaleString())}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<span class="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium border border-red-400/30 mb-2" data-v-0fc13075> 省${ssrInterpolate(Math.round((unref(product).originalPrice - unref(product).price) / unref(product).originalPrice * 100))}% </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-gray-300 leading-relaxed" data-v-0fc13075>${ssrInterpolate(unref(product).description)}</p></div><div class="mb-8" data-v-0fc13075><label class="block text-sm font-bold text-white mb-4 flex items-center gap-2" data-v-0fc13075><i class="bi bi-123 text-cyan-400" data-v-0fc13075></i> 购买数量 </label><div class="flex items-center gap-6" data-v-0fc13075><div class="flex items-center border border-gray-600/50 rounded-xl bg-gray-800/30 backdrop-blur-sm" data-v-0fc13075><button class="px-5 py-3 text-white hover:bg-cyan-500/20 hover:text-cyan-300 rounded-l-xl transition-all duration-300 border-r border-gray-600/50" data-v-0fc13075><i class="bi bi-dash-lg text-lg font-bold" data-v-0fc13075></i></button><span class="px-8 py-3 text-white font-bold text-lg min-w-[80px] text-center bg-gray-700/30" data-v-0fc13075>${ssrInterpolate(unref(quantity))}</span><button class="px-5 py-3 text-white hover:bg-cyan-500/20 hover:text-cyan-300 rounded-r-xl transition-all duration-300 border-l border-gray-600/50" data-v-0fc13075><i class="bi bi-plus-lg text-lg font-bold" data-v-0fc13075></i></button></div><div class="flex items-center gap-2 text-gray-300 bg-gray-800/30 px-4 py-2 rounded-lg border border-gray-600/30 backdrop-blur-sm" data-v-0fc13075><i class="bi bi-box text-green-400" data-v-0fc13075></i><span data-v-0fc13075>库存：<span class="text-green-400 font-bold" data-v-0fc13075>${ssrInterpolate(unref(product).stockCount)}</span> 件</span></div></div></div><div class="space-y-4 mb-8" data-v-0fc13075><button${ssrIncludeBooleanAttr(!unref(product).inStock || unref(showSuccessMessage)) ? " disabled" : ""} data-add-to-cart class="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 relative overflow-hidden group" data-v-0fc13075><div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" data-v-0fc13075></div><i class="bi bi-cart-plus text-xl" data-v-0fc13075></i><span data-v-0fc13075>${ssrInterpolate(unref(product).inStock ? "加入购物车" : "暂时缺货")}</span></button><button${ssrIncludeBooleanAttr(!unref(product).inStock) ? " disabled" : ""} class="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-500 hover:via-emerald-500 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 relative overflow-hidden group" data-v-0fc13075><div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" data-v-0fc13075></div><i class="bi bi-lightning-fill text-xl" data-v-0fc13075></i><span data-v-0fc13075>立即购买</span></button></div><div class="pt-6 border-t border-gray-700/50" data-v-0fc13075><div class="grid grid-cols-3 gap-4 text-center" data-v-0fc13075><div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group" data-v-0fc13075><div class="p-3 bg-green-500/20 rounded-full group-hover:scale-110 transition-transform duration-300" data-v-0fc13075><i class="bi bi-truck text-2xl text-green-400" data-v-0fc13075></i></div><span class="text-sm text-gray-300 font-medium" data-v-0fc13075>免费配送</span></div><div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group" data-v-0fc13075><div class="p-3 bg-blue-500/20 rounded-full group-hover:scale-110 transition-transform duration-300" data-v-0fc13075><i class="bi bi-shield-check text-2xl text-blue-400" data-v-0fc13075></i></div><span class="text-sm text-gray-300 font-medium" data-v-0fc13075>两年保修</span></div><div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group" data-v-0fc13075><div class="p-3 bg-purple-500/20 rounded-full group-hover:scale-110 transition-transform duration-300" data-v-0fc13075><i class="bi bi-arrow-repeat text-2xl text-purple-400" data-v-0fc13075></i></div><span class="text-sm text-gray-300 font-medium" data-v-0fc13075>30天退换</span></div></div></div></div></div></div><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 mb-12 backdrop-blur-xl" data-v-0fc13075><h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-4" data-v-0fc13075><div class="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg" data-v-0fc13075><i class="bi bi-gear-fill text-white text-2xl" data-v-0fc13075></i></div><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-0fc13075>技术规格</span></h2>`);
        if (unref(product).specs && Object.keys(unref(product).specs).length > 0) {
          _push(`<div class="grid md:grid-cols-2 gap-6" data-v-0fc13075><!--[-->`);
          ssrRenderList(unref(product).specs, (value, key) => {
            _push(`<div class="group flex justify-between items-center p-5 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm" data-v-0fc13075><span class="text-gray-300 font-semibold text-lg" data-v-0fc13075>${ssrInterpolate(translateSpecKey(key))}</span><span class="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors duration-300" data-v-0fc13075>${ssrInterpolate(value)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-gray-400 text-center py-8" data-v-0fc13075><i class="bi bi-info-circle text-3xl mb-2" data-v-0fc13075></i><p data-v-0fc13075>暂无规格信息</p></div>`);
        }
        _push(`</div><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl" data-v-0fc13075><h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-4" data-v-0fc13075><div class="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg" data-v-0fc13075><i class="bi bi-chat-dots-fill text-white text-2xl" data-v-0fc13075></i></div><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-0fc13075>用户评价</span></h2><div class="grid md:grid-cols-2 gap-8 mb-8" data-v-0fc13075><div class="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-400/30" data-v-0fc13075><div class="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4" data-v-0fc13075>${ssrInterpolate(unref(product).rating)}</div><div class="flex justify-center mb-4" data-v-0fc13075><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<i class="${ssrRenderClass([i <= unref(product).rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-2xl drop-shadow-lg"])}" data-v-0fc13075></i>`);
        });
        _push(`<!--]--></div><div class="text-gray-300 text-lg" data-v-0fc13075>基于 <span class="text-yellow-400 font-bold" data-v-0fc13075>${ssrInterpolate(unref(product).reviewCount)}</span> 条评价</div></div><div class="space-y-4" data-v-0fc13075><!--[-->`);
        ssrRenderList(unref(ratingDistribution), (count, rating) => {
          _push(`<div class="flex items-center gap-4" data-v-0fc13075><span class="text-white w-12 flex-shrink-0 font-bold" data-v-0fc13075>${ssrInterpolate(rating)}星</span><div class="flex-1 bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-gray-600/30" data-v-0fc13075><div class="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-yellow-500/30" style="${ssrRenderStyle({ width: `${Math.min(count / unref(product).reviewCount * 100, 100)}%` })}" data-v-0fc13075></div></div><span class="text-gray-400 w-16 text-sm flex-shrink-0 font-medium" data-v-0fc13075>${ssrInterpolate(count)} 条</span></div>`);
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
        _push(`<div class="container mx-auto px-6 py-20 relative z-10" data-v-0fc13075><div class="text-center" data-v-0fc13075><div class="inline-flex flex-col items-center glass-card-enhanced rounded-2xl border border-red-400/40 p-16 shadow-2xl shadow-red-500/25 backdrop-blur-xl max-w-md mx-auto" data-v-0fc13075><div class="text-8xl text-red-400 mb-8" data-v-0fc13075><i class="bi bi-exclamation-triangle-fill" data-v-0fc13075></i></div><h3 class="text-3xl font-bold text-white mb-4" data-v-0fc13075>加载失败</h3><p class="text-gray-400 text-lg mb-8" data-v-0fc13075>${ssrInterpolate(unref(error))}</p><div class="space-y-3 w-full" data-v-0fc13075><button class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-0fc13075><i class="bi bi-arrow-clockwise mr-2" data-v-0fc13075></i> 重新加载 </button><button class="w-full border border-gray-600/50 hover:border-cyan-400/50 text-gray-300 hover:text-white hover:bg-cyan-500/10 py-3 px-6 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm" data-v-0fc13075> 返回上页 </button></div></div></div></div>`);
      } else if (unref(loading)) {
        _push(`<div class="container mx-auto px-6 py-20 relative z-10" data-v-0fc13075><div class="text-center" data-v-0fc13075><div class="inline-flex flex-col items-center glass-card-enhanced rounded-2xl border border-cyan-400/40 p-16 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-0fc13075><div class="relative mb-8" data-v-0fc13075><div class="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" data-v-0fc13075></div><div class="absolute inset-0 w-20 h-20 border-4 border-blue-500/30 rounded-full animate-pulse" data-v-0fc13075></div></div><p class="text-3xl font-bold text-white mb-4" data-v-0fc13075>正在加载产品详情...</p><p class="text-gray-400 text-lg" data-v-0fc13075>请稍候，正在为您获取最新信息</p></div></div></div>`);
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
        _push(`<!--]--></div><div class="glass-card-enhanced rounded-2xl border border-green-400/50 shadow-2xl shadow-green-500/30 p-10 max-w-md w-full text-center backdrop-blur-xl transform animate-bounce-in" data-v-0fc13075><div class="text-8xl text-green-400 mb-8 relative" data-v-0fc13075><i class="bi bi-check-circle-fill drop-shadow-2xl animate-check-bounce" data-v-0fc13075></i><div class="absolute inset-0 text-green-400/30 animate-ping-once" data-v-0fc13075><i class="bi bi-check-circle-fill" data-v-0fc13075></i></div></div><h3 class="text-3xl font-bold text-white mb-6" data-v-0fc13075>已加入购物车！</h3><p class="text-gray-300 mb-8 text-lg leading-relaxed" data-v-0fc13075>${ssrInterpolate((_b = unref(product)) == null ? void 0 : _b.name)} 已成功添加到购物车。</p><div class="space-y-4" data-v-0fc13075><button class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform hover:scale-105" data-v-0fc13075> 立即去结算 </button><button class="w-full border border-gray-600/50 hover:border-green-400/50 text-gray-300 hover:text-white hover:bg-green-500/10 py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm" data-v-0fc13075> 继续购物 </button></div></div></div>`);
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-2j4w7VkR.js.map
