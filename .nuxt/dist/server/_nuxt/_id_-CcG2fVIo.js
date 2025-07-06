import { _ as __nuxt_component_0$1 } from "./AppHeader-Baa9wtq1.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-D8iHomBq.js";
import { ref, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderStyle, ssrLooseEqual } from "vue/server-renderer";
import { c as createDiscreteApi } from "./useLocation-CdbkT8tR.js";
import { p as productsApi } from "./products-1Ta3Ka5C.js";
import { r as reviewsApi } from "./reviews-QgeAJ7Zu.js";
import { _ as _export_sfc, u as useUserStore, f as useRoute } from "../server.mjs";
import "D:/code/xlweb/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-CXjDD8hH.js";
import "./AppLogo-DGHjqzot.js";
import "vue-router";
import "seemly";
import "treemate";
import "vooks";
import "vdirs";
import "lodash-es";
import "css-render";
import "evtd";
import "D:/code/xlweb/node_modules/ufo/dist/index.mjs";
import "@css-render/plugin-bem";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/code/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/code/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/code/xlweb/node_modules/defu/dist/defu.mjs";
import "D:/code/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/code/xlweb/node_modules/klona/dist/index.mjs";
import "D:/code/xlweb/node_modules/@unhead/vue/dist/index.mjs";
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main$1 = {
  __name: "ReviewForm",
  __ssrInlineRender: true,
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  emits: ["review-submitted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const userStore = useUserStore();
    const { message } = createDiscreteApi(["message"]);
    const reviewData = ref({
      rating: 0,
      comment: ""
    });
    const isAnonymous = ref(false);
    const isSubmitting = ref(false);
    const isCheckingReview = ref(false);
    const hasReviewed = ref(false);
    const existingReview = ref(null);
    const canSubmit = computed(() => {
      return reviewData.value.rating > 0 && reviewData.value.comment.trim().length >= 10 && userStore.isLoggedIn && !hasReviewed.value && !isCheckingReview.value;
    });
    const buttonDisabledReason = computed(() => {
      if (!userStore.isLoggedIn) return "请先登录";
      if (hasReviewed.value) return "您已评论过此产品";
      if (isCheckingReview.value) return "检查中...";
      if (reviewData.value.rating === 0) return "请选择评分";
      if (reviewData.value.comment.trim().length < 10) return "评论内容至少10个字符";
      if (isSubmitting.value) return "发布中...";
      return "发布评论";
    });
    const getRatingText = (rating) => {
      const texts = {
        1: "非常不满意",
        2: "不满意",
        3: "一般",
        4: "满意",
        5: "非常满意"
      };
      return texts[rating] || "";
    };
    watch(() => userStore.isLoggedIn, (newValue) => {
    });
    watch(() => props.productId, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl" }, _attrs))} data-v-fabe825f><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-fabe825f><div class="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg" data-v-fabe825f><i class="bi bi-chat-square-text text-white" data-v-fabe825f></i></div><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-fabe825f>发表评论</span></h3>`);
      if (!unref(userStore).isLoggedIn) {
        _push(`<div class="text-center py-8" data-v-fabe825f><div class="text-4xl text-gray-400 mb-4" data-v-fabe825f><i class="bi bi-person-plus" data-v-fabe825f></i></div><h4 class="text-xl font-semibold text-white mb-2" data-v-fabe825f>请先登录</h4><p class="text-gray-400 mb-6" data-v-fabe825f>登录后即可发表对此产品的评价</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="bi bi-box-arrow-in-right mr-2" data-v-fabe825f${_scopeId}></i> 立即登录 `);
            } else {
              return [
                createVNode("i", { class: "bi bi-box-arrow-in-right mr-2" }),
                createTextVNode(" 立即登录 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (isCheckingReview.value) {
        _push(`<div class="text-center py-8" data-v-fabe825f><div class="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" data-v-fabe825f></div><p class="text-gray-300" data-v-fabe825f>正在检查评论状态...</p></div>`);
      } else if (hasReviewed.value && existingReview.value) {
        _push(`<div class="text-center py-8" data-v-fabe825f><div class="text-4xl text-green-400 mb-4" data-v-fabe825f><i class="bi bi-check-circle-fill" data-v-fabe825f></i></div><h4 class="text-xl font-semibold text-white mb-2" data-v-fabe825f>您已评论过此产品</h4><p class="text-gray-400 mb-6" data-v-fabe825f>每个产品只能发布一次评论</p><div class="bg-gray-800/30 rounded-xl p-6 border border-gray-600/30 backdrop-blur-sm" data-v-fabe825f><div class="flex items-center justify-center gap-2 mb-3" data-v-fabe825f><div class="flex" data-v-fabe825f><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<i class="${ssrRenderClass([i <= existingReview.value.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-lg"])}" data-v-fabe825f></i>`);
        });
        _push(`<!--]--></div><span class="text-white font-medium ml-2" data-v-fabe825f>${ssrInterpolate(existingReview.value.rating)} 分</span></div><p class="text-gray-300 text-center" data-v-fabe825f>${ssrInterpolate(existingReview.value.comment)}</p><p class="text-gray-500 text-sm text-center mt-3" data-v-fabe825f> 发布于 ${ssrInterpolate(new Date(existingReview.value.created_at).toLocaleDateString("zh-CN"))}</p></div></div>`);
      } else {
        _push(`<form class="space-y-6" data-v-fabe825f><div data-v-fabe825f><label class="block text-sm font-bold text-white mb-4 flex items-center gap-2" data-v-fabe825f><i class="bi bi-star text-yellow-400" data-v-fabe825f></i> 评分 </label><div class="flex items-center gap-2" data-v-fabe825f><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "text-3xl transition-all duration-200 hover:scale-110",
            i <= reviewData.value.rating ? "text-yellow-400" : "text-gray-600 hover:text-yellow-300"
          ])}" data-v-fabe825f><i class="bi bi-star-fill drop-shadow-lg" data-v-fabe825f></i></button>`);
        });
        _push(`<!--]-->`);
        if (reviewData.value.rating > 0) {
          _push(`<span class="ml-4 text-white font-medium" data-v-fabe825f>${ssrInterpolate(getRatingText(reviewData.value.rating))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div data-v-fabe825f><label class="block text-sm font-bold text-white mb-4 flex items-center gap-2" data-v-fabe825f><i class="bi bi-chat-dots text-cyan-400" data-v-fabe825f></i> 评论内容 </label><textarea required rows="5" placeholder="请分享您对这款产品的使用体验..." class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none" data-v-fabe825f>${ssrInterpolate(reviewData.value.comment)}</textarea></div><div data-v-fabe825f><label class="flex items-center space-x-3" data-v-fabe825f><input${ssrIncludeBooleanAttr(Array.isArray(isAnonymous.value) ? ssrLooseContain(isAnonymous.value, null) : isAnonymous.value) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500" data-v-fabe825f><span class="text-gray-300" data-v-fabe825f>匿名发表（不显示用户名）</span></label></div><div class="flex justify-end gap-4 pt-6" data-v-fabe825f><button type="button" class="px-6 py-3 border border-gray-600/50 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg font-medium transition-colors duration-300" data-v-fabe825f> 重置 </button><button type="submit"${ssrIncludeBooleanAttr(!canSubmit.value || isSubmitting.value) ? " disabled" : ""}${ssrRenderAttr("title", !canSubmit.value ? buttonDisabledReason.value : "")} class="review-submit-btn px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:cursor-not-allowed min-w-[160px]" data-v-fabe825f><div class="flex items-center justify-center w-4 h-4" data-v-fabe825f>`);
        if (isSubmitting.value || isCheckingReview.value) {
          _push(`<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" data-v-fabe825f></div>`);
        } else {
          _push(`<i class="bi bi-send" data-v-fabe825f></i>`);
        }
        _push(`</div><span class="button-text" data-v-fabe825f>${ssrInterpolate(buttonDisabledReason.value)}</span></button></div>`);
        if (!canSubmit.value && unref(userStore).isLoggedIn) {
          _push(`<div class="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg" data-v-fabe825f><div class="flex items-center gap-2 text-yellow-400 text-sm" data-v-fabe825f><i class="bi bi-info-circle" data-v-fabe825f></i><span data-v-fabe825f>${ssrInterpolate(buttonDisabledReason.value)}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ReviewForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ReviewForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-fabe825f"]]);
const pageSize = 5;
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const productId = parseInt(route.params.id);
    const userStore = useUserStore();
    const { message } = createDiscreteApi(["message"]);
    const product = ref(null);
    const quantity = ref(1);
    const isFavorite = ref(false);
    const showSuccessMessage = ref(false);
    const loading = ref(true);
    const error = ref(null);
    const isAddingToCart = ref(false);
    const reviews = ref([]);
    const reviewStats = ref(null);
    const isLoadingReviews = ref(false);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const reviewFilters = ref({
      rating: "all",
      sort: "newest"
    });
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
    const loadReviews = async () => {
      if (!product.value) return;
      try {
        isLoadingReviews.value = true;
        const reviewsResponse = await reviewsApi.getProductReviews(product.value.id, {
          page: currentPage.value,
          limit: pageSize,
          rating: reviewFilters.value.rating === "all" ? void 0 : parseInt(reviewFilters.value.rating),
          sort: reviewFilters.value.sort
        });
        if (reviewsResponse.success) {
          reviews.value = reviewsResponse.data.reviews;
          totalPages.value = reviewsResponse.data.pagination.total_pages;
        }
        const statsResponse = await reviewsApi.getProductReviewStats(product.value.id);
        if (statsResponse.success) {
          reviewStats.value = statsResponse.data;
        }
      } catch (err) {
        console.error("加载评论失败:", err);
      } finally {
        isLoadingReviews.value = false;
      }
    };
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
          checkFavoriteStatus();
          await loadReviews();
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
    const handleReviewSubmitted = () => {
      currentPage.value = 1;
      loadReviews();
      message.success("感谢您的评价！评论已发布");
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
      var _a, _b, _c;
      const _component_AppHeader = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-31bb8004><div class="fixed inset-0 pointer-events-none" data-v-31bb8004><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-31bb8004></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-31bb8004></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-31bb8004></div></div>`);
      _push(ssrRenderComponent(_component_AppHeader, {
        "show-back-button": false,
        "show-nav-menu": false,
        "show-breadcrumb": true,
        "show-location": false,
        "show-search-button": false,
        "show-notification-button": false,
        "show-decorations": false,
        "logo-size": "medium",
        "current-page-title": ((_a = unref(product)) == null ? void 0 : _a.name) || "产品详情",
        "breadcrumb-items": [
          { label: "首页", path: "/" },
          { label: "产品中心", path: "/products" },
          { label: ((_b = unref(product)) == null ? void 0 : _b.name) || "产品详情" }
        ]
      }, null, _parent));
      if (unref(product) && !unref(loading) && !unref(error)) {
        _push(`<div class="container mx-auto px-6 py-8 relative z-10" data-v-31bb8004><div class="grid lg:grid-cols-2 gap-12 mb-12" data-v-31bb8004><div class="space-y-6" data-v-31bb8004><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 overflow-hidden backdrop-blur-xl" data-v-31bb8004><div class="relative h-96 bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6" data-v-31bb8004>`);
        if (unref(product).image) {
          _push(`<div class="product-image-container" data-v-31bb8004><img${ssrRenderAttr("src", unref(product).image)}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-contain transition-all duration-500 hover:scale-105 filter drop-shadow-2xl" data-v-31bb8004></div>`);
        } else {
          _push(`<div class="product-placeholder" data-v-31bb8004><div class="product-icon-wrapper" data-v-31bb8004><i class="bi bi-cpu product-icon" data-v-31bb8004></i><div class="product-icon-glow" data-v-31bb8004></div></div><span class="product-placeholder-text" data-v-31bb8004>${ssrInterpolate(unref(product).name)}</span><div class="product-tech-pattern" data-v-31bb8004></div></div>`);
        }
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<div class="absolute top-4 left-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-red-500/40 animate-pulse" data-v-31bb8004><i class="bi bi-lightning-fill mr-1" data-v-31bb8004></i> 省 ¥${ssrInterpolate((unref(product).originalPrice - unref(product).price).toLocaleString())}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute top-4 right-4" data-v-31bb8004>`);
        if (!unref(product).inStock) {
          _push(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-red-500/30 text-red-200 border border-red-400/50 shadow-lg shadow-red-500/30 backdrop-blur-sm" data-v-31bb8004><i class="bi bi-x-circle-fill mr-2 text-red-300" data-v-31bb8004></i>缺货 </span>`);
        } else if (unref(product).stockCount <= 5) {
          _push(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-orange-500/30 text-orange-200 border border-orange-400/50 shadow-lg shadow-orange-500/30 backdrop-blur-sm animate-pulse" data-v-31bb8004><i class="bi bi-exclamation-triangle-fill mr-2 text-orange-300" data-v-31bb8004></i>仅剩 ${ssrInterpolate(unref(product).stockCount)} 件 </span>`);
        } else {
          _push(`<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/30 backdrop-blur-sm" data-v-31bb8004><i class="bi bi-check-circle-fill mr-2 text-emerald-300" data-v-31bb8004></i>现货充足 </span>`);
        }
        _push(`</div><div class="absolute bottom-4 left-4" data-v-31bb8004><span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-sm" data-v-31bb8004><i class="bi bi-bookmark-fill mr-1" data-v-31bb8004></i> ${ssrInterpolate(getProductCategory(unref(product).category))}</span></div></div></div><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl" data-v-31bb8004><h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-v-31bb8004><div class="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg" data-v-31bb8004><i class="bi bi-stars text-white" data-v-31bb8004></i></div><span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-31bb8004>核心特性</span></h3>`);
        if (unref(product).features && unref(product).features.length > 0) {
          _push(`<div class="grid grid-cols-1 gap-4" data-v-31bb8004><!--[-->`);
          ssrRenderList(unref(product).features, (feature, index) => {
            _push(`<div class="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm" style="${ssrRenderStyle({ "animation-delay": `${index * 100}ms` })}" data-v-31bb8004><div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" data-v-31bb8004><i class="bi bi-check text-white text-sm font-bold" data-v-31bb8004></i></div><span class="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300" data-v-31bb8004>${ssrInterpolate(feature)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-gray-400 text-center py-8" data-v-31bb8004><i class="bi bi-info-circle text-3xl mb-2" data-v-31bb8004></i><p data-v-31bb8004>暂无特性信息</p></div>`);
        }
        _push(`</div></div><div class="space-y-6" data-v-31bb8004><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl" data-v-31bb8004><div class="flex items-center justify-between mb-6" data-v-31bb8004><div class="flex items-center gap-4" data-v-31bb8004><span class="inline-flex items-center px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border border-cyan-400/40 shadow-lg backdrop-blur-sm" data-v-31bb8004><i class="bi bi-award mr-2" data-v-31bb8004></i> ${ssrInterpolate(unref(product).brand)}</span><div class="flex items-center gap-2 text-sm text-gray-400" data-v-31bb8004><i class="bi bi-eye text-cyan-400" data-v-31bb8004></i><span data-v-31bb8004>${ssrInterpolate(unref(product).viewCount || 1234)} 次浏览</span></div></div><button class="${ssrRenderClass([
          "p-3 rounded-xl border transition-all duration-300 group relative overflow-hidden",
          unref(isFavorite) ? "bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400/50 text-red-300 shadow-lg shadow-red-500/30" : "border-gray-600/50 text-gray-400 hover:border-red-400/50 hover:text-red-300 hover:bg-red-500/10"
        ])}" data-v-31bb8004><i class="${ssrRenderClass([unref(isFavorite) ? "bi bi-heart-fill" : "bi bi-heart", "text-xl relative z-10 group-hover:scale-110 transition-transform duration-300"])}" data-v-31bb8004></i><div class="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-31bb8004></div></button></div><h1 class="text-4xl font-bold text-white mb-4 leading-tight" data-v-31bb8004><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-31bb8004>${ssrInterpolate(unref(product).name)}</span></h1><div class="flex items-center gap-4 mb-6 text-gray-400" data-v-31bb8004>`);
        if (unref(product).model) {
          _push(`<span class="text-sm" data-v-31bb8004><i class="bi bi-tag mr-1" data-v-31bb8004></i> 型号: ${ssrInterpolate(unref(product).model)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).sku) {
          _push(`<span class="text-sm" data-v-31bb8004><i class="bi bi-upc mr-1" data-v-31bb8004></i> SKU: ${ssrInterpolate(unref(product).sku)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center gap-6 mb-8 p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 backdrop-blur-sm" data-v-31bb8004><div class="flex items-center gap-3" data-v-31bb8004><div class="flex" data-v-31bb8004><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<i class="${ssrRenderClass([i <= unref(product).rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-xl drop-shadow-lg"])}" data-v-31bb8004></i>`);
        });
        _push(`<!--]--></div><span class="text-2xl font-bold text-white" data-v-31bb8004>${ssrInterpolate(unref(product).rating)}</span></div><div class="h-8 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent" data-v-31bb8004></div><div class="flex items-center gap-2 text-gray-300" data-v-31bb8004><i class="bi bi-chat-dots text-cyan-400" data-v-31bb8004></i><span data-v-31bb8004>${ssrInterpolate(unref(product).reviewCount)} 条评价</span></div><div class="flex items-center gap-2 text-gray-300" data-v-31bb8004><i class="bi bi-truck text-green-400" data-v-31bb8004></i><span data-v-31bb8004>免费配送</span></div><div class="flex items-center gap-2 text-gray-300" data-v-31bb8004><i class="bi bi-graph-up text-purple-400" data-v-31bb8004></i><span data-v-31bb8004>销量 ${ssrInterpolate(unref(product).sales)}</span></div></div><div class="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-400/30 backdrop-blur-sm" data-v-31bb8004><div class="flex items-end gap-4 mb-3" data-v-31bb8004><span class="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-31bb8004> ¥${ssrInterpolate(unref(product).price.toLocaleString())}</span>`);
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<span class="text-2xl text-gray-500 line-through mb-2" data-v-31bb8004> ¥${ssrInterpolate(unref(product).originalPrice.toLocaleString())}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).originalPrice && unref(product).originalPrice > unref(product).price) {
          _push(`<span class="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium border border-red-400/30 mb-2" data-v-31bb8004> 省${ssrInterpolate(Math.round((unref(product).originalPrice - unref(product).price) / unref(product).originalPrice * 100))}% </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-gray-300 leading-relaxed" data-v-31bb8004>${ssrInterpolate(unref(product).description)}</p></div><div class="mb-8" data-v-31bb8004><label class="block text-sm font-bold text-white mb-4 flex items-center gap-2" data-v-31bb8004><i class="bi bi-123 text-cyan-400" data-v-31bb8004></i> 购买数量 </label><div class="flex items-center gap-6" data-v-31bb8004><div class="flex items-center border border-gray-600/50 rounded-xl bg-gray-800/30 backdrop-blur-sm" data-v-31bb8004><button class="px-5 py-3 text-white hover:bg-cyan-500/20 hover:text-cyan-300 rounded-l-xl transition-all duration-300 border-r border-gray-600/50" data-v-31bb8004><i class="bi bi-dash-lg text-lg font-bold" data-v-31bb8004></i></button><span class="px-8 py-3 text-white font-bold text-lg min-w-[80px] text-center bg-gray-700/30" data-v-31bb8004>${ssrInterpolate(unref(quantity))}</span><button class="px-5 py-3 text-white hover:bg-cyan-500/20 hover:text-cyan-300 rounded-r-xl transition-all duration-300 border-l border-gray-600/50" data-v-31bb8004><i class="bi bi-plus-lg text-lg font-bold" data-v-31bb8004></i></button></div><div class="flex items-center gap-2 text-gray-300 bg-gray-800/30 px-4 py-2 rounded-lg border border-gray-600/30 backdrop-blur-sm" data-v-31bb8004><i class="bi bi-box text-green-400" data-v-31bb8004></i><span data-v-31bb8004>库存：<span class="text-green-400 font-bold" data-v-31bb8004>${ssrInterpolate(unref(product).stockCount)}</span> 件</span></div></div></div>`);
        if (!unref(userStore).isLoggedIn) {
          _push(`<div class="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl backdrop-blur-sm" data-v-31bb8004><div class="flex items-center gap-2 text-yellow-400 mb-2" data-v-31bb8004><i class="bi bi-info-circle" data-v-31bb8004></i><span class="font-medium" data-v-31bb8004>购买提示</span></div><p class="text-yellow-300 text-sm" data-v-31bb8004>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/auth/login",
            class: "text-yellow-400 hover:text-yellow-300 underline font-medium"
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
          _push(` 后即可将商品添加到购物车，享受更便捷的购物体验。 </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-4 mb-8" data-v-31bb8004><button${ssrIncludeBooleanAttr(!unref(product).inStock || unref(showSuccessMessage) || unref(isAddingToCart) || !unref(userStore).isLoggedIn) ? " disabled" : ""} data-add-to-cart class="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 relative overflow-hidden group" data-v-31bb8004><div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" data-v-31bb8004></div>`);
        if (unref(isAddingToCart)) {
          _push(`<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" data-v-31bb8004></div>`);
        } else {
          _push(`<i class="bi bi-cart-plus text-xl" data-v-31bb8004></i>`);
        }
        if (!unref(userStore).isLoggedIn) {
          _push(`<span data-v-31bb8004>请先登录</span>`);
        } else if (!unref(product).inStock) {
          _push(`<span data-v-31bb8004>暂时缺货</span>`);
        } else if (unref(isAddingToCart)) {
          _push(`<span data-v-31bb8004>添加中...</span>`);
        } else {
          _push(`<span data-v-31bb8004>加入购物车</span>`);
        }
        _push(`</button><button${ssrIncludeBooleanAttr(!unref(product).inStock || !unref(userStore).isLoggedIn) ? " disabled" : ""} class="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-500 hover:via-emerald-500 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 relative overflow-hidden group" data-v-31bb8004><div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" data-v-31bb8004></div><i class="bi bi-lightning-fill text-xl" data-v-31bb8004></i>`);
        if (!unref(userStore).isLoggedIn) {
          _push(`<span data-v-31bb8004>请先登录</span>`);
        } else {
          _push(`<span data-v-31bb8004>立即购买</span>`);
        }
        _push(`</button></div><div class="pt-6 border-t border-gray-700/50" data-v-31bb8004><div class="grid grid-cols-3 gap-4 text-center" data-v-31bb8004><div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group" data-v-31bb8004><div class="p-3 bg-green-500/20 rounded-full group-hover:scale-110 transition-transform duration-300" data-v-31bb8004><i class="bi bi-truck text-2xl text-green-400" data-v-31bb8004></i></div><span class="text-sm text-gray-300 font-medium" data-v-31bb8004>免费配送</span></div><div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group" data-v-31bb8004><div class="p-3 bg-blue-500/20 rounded-full group-hover:scale-110 transition-transform duration-300" data-v-31bb8004><i class="bi bi-shield-check text-2xl text-blue-400" data-v-31bb8004></i></div><span class="text-sm text-gray-300 font-medium" data-v-31bb8004>两年保修</span></div><div class="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group" data-v-31bb8004><div class="p-3 bg-purple-500/20 rounded-full group-hover:scale-110 transition-transform duration-300" data-v-31bb8004><i class="bi bi-arrow-repeat text-2xl text-purple-400" data-v-31bb8004></i></div><span class="text-sm text-gray-300 font-medium" data-v-31bb8004>30天退换</span></div></div></div></div></div></div><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 mb-12 backdrop-blur-xl" data-v-31bb8004><h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-4" data-v-31bb8004><div class="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg" data-v-31bb8004><i class="bi bi-gear-fill text-white text-2xl" data-v-31bb8004></i></div><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-31bb8004>技术规格</span></h2>`);
        if (unref(product).specs && Object.keys(unref(product).specs).length > 0) {
          _push(`<div class="grid md:grid-cols-2 gap-6" data-v-31bb8004><!--[-->`);
          ssrRenderList(unref(product).specs, (value, key) => {
            _push(`<div class="group flex justify-between items-center p-5 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm" data-v-31bb8004><span class="text-gray-300 font-semibold text-lg" data-v-31bb8004>${ssrInterpolate(translateSpecKey(key))}</span><span class="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors duration-300" data-v-31bb8004>${ssrInterpolate(value)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-gray-400 text-center py-8" data-v-31bb8004><i class="bi bi-info-circle text-3xl mb-2" data-v-31bb8004></i><p data-v-31bb8004>暂无规格信息</p></div>`);
        }
        _push(`</div><div class="glass-card-enhanced rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 p-8 backdrop-blur-xl" data-v-31bb8004><h2 class="text-3xl font-bold text-white mb-8 flex items-center gap-4" data-v-31bb8004><div class="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg" data-v-31bb8004><i class="bi bi-chat-dots-fill text-white text-2xl" data-v-31bb8004></i></div><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-31bb8004>用户评价</span></h2>`);
        if (unref(reviewStats)) {
          _push(`<div class="grid md:grid-cols-2 gap-8 mb-8" data-v-31bb8004><div class="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-400/30" data-v-31bb8004><div class="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4" data-v-31bb8004>${ssrInterpolate(unref(reviewStats).average_rating)}</div><div class="flex justify-center mb-4" data-v-31bb8004><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<i class="${ssrRenderClass([i <= Math.round(unref(reviewStats).average_rating) ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-2xl drop-shadow-lg"])}" data-v-31bb8004></i>`);
          });
          _push(`<!--]--></div><div class="text-gray-300 text-lg" data-v-31bb8004>基于 <span class="text-yellow-400 font-bold" data-v-31bb8004>${ssrInterpolate(unref(reviewStats).total_reviews)}</span> 条评价</div></div><div class="space-y-4" data-v-31bb8004><!--[-->`);
          ssrRenderList(unref(reviewStats).rating_distribution, (item) => {
            _push(`<div class="flex items-center gap-4" data-v-31bb8004><span class="text-white w-12 flex-shrink-0 font-bold" data-v-31bb8004>${ssrInterpolate(item.rating)}星</span><div class="flex-1 bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-gray-600/30" data-v-31bb8004><div class="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-yellow-500/30" style="${ssrRenderStyle({ width: `${item.percentage}%` })}" data-v-31bb8004></div></div><span class="text-gray-400 w-16 text-sm flex-shrink-0 font-medium" data-v-31bb8004>${ssrInterpolate(item.count)} 条</span></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else if (unref(isLoadingReviews)) {
          _push(`<div class="text-center py-8" data-v-31bb8004><div class="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" data-v-31bb8004></div><p class="text-gray-300" data-v-31bb8004>正在加载评论统计...</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mb-8" data-v-31bb8004>`);
        if (unref(product)) {
          _push(ssrRenderComponent(ReviewForm, {
            "product-id": unref(product).id,
            onReviewSubmitted: handleReviewSubmitted
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex flex-wrap gap-4 mb-6" data-v-31bb8004><select class="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500" data-v-31bb8004><option value="all" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).rating) ? ssrLooseContain(unref(reviewFilters).rating, "all") : ssrLooseEqual(unref(reviewFilters).rating, "all")) ? " selected" : ""}>所有评分</option><option value="5" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).rating) ? ssrLooseContain(unref(reviewFilters).rating, "5") : ssrLooseEqual(unref(reviewFilters).rating, "5")) ? " selected" : ""}>5星</option><option value="4" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).rating) ? ssrLooseContain(unref(reviewFilters).rating, "4") : ssrLooseEqual(unref(reviewFilters).rating, "4")) ? " selected" : ""}>4星</option><option value="3" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).rating) ? ssrLooseContain(unref(reviewFilters).rating, "3") : ssrLooseEqual(unref(reviewFilters).rating, "3")) ? " selected" : ""}>3星</option><option value="2" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).rating) ? ssrLooseContain(unref(reviewFilters).rating, "2") : ssrLooseEqual(unref(reviewFilters).rating, "2")) ? " selected" : ""}>2星</option><option value="1" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).rating) ? ssrLooseContain(unref(reviewFilters).rating, "1") : ssrLooseEqual(unref(reviewFilters).rating, "1")) ? " selected" : ""}>1星</option></select><select class="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500" data-v-31bb8004><option value="newest" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).sort) ? ssrLooseContain(unref(reviewFilters).sort, "newest") : ssrLooseEqual(unref(reviewFilters).sort, "newest")) ? " selected" : ""}>最新发布</option><option value="oldest" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).sort) ? ssrLooseContain(unref(reviewFilters).sort, "oldest") : ssrLooseEqual(unref(reviewFilters).sort, "oldest")) ? " selected" : ""}>最早发布</option><option value="rating_high" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).sort) ? ssrLooseContain(unref(reviewFilters).sort, "rating_high") : ssrLooseEqual(unref(reviewFilters).sort, "rating_high")) ? " selected" : ""}>评分从高到低</option><option value="rating_low" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).sort) ? ssrLooseContain(unref(reviewFilters).sort, "rating_low") : ssrLooseEqual(unref(reviewFilters).sort, "rating_low")) ? " selected" : ""}>评分从低到高</option><option value="helpful" data-v-31bb8004${ssrIncludeBooleanAttr(Array.isArray(unref(reviewFilters).sort) ? ssrLooseContain(unref(reviewFilters).sort, "helpful") : ssrLooseEqual(unref(reviewFilters).sort, "helpful")) ? " selected" : ""}>最有帮助</option></select></div>`);
        if (!unref(isLoadingReviews) && unref(reviews).length > 0) {
          _push(`<div class="space-y-6" data-v-31bb8004><!--[-->`);
          ssrRenderList(unref(reviews), (review) => {
            var _a2, _b2;
            _push(`<div class="p-6 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm" data-v-31bb8004><div class="flex items-center justify-between mb-4" data-v-31bb8004><div class="flex items-center gap-4" data-v-31bb8004><div class="w-14 h-14 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full flex items-center justify-center border border-cyan-400/40 shadow-lg overflow-hidden" data-v-31bb8004>`);
            if (((_a2 = review.user_info) == null ? void 0 : _a2.avatar) && !review.is_anonymous) {
              _push(`<img${ssrRenderAttr("src", review.user_info.avatar)}${ssrRenderAttr("alt", review.author)} class="w-full h-full object-cover" data-v-31bb8004>`);
            } else {
              _push(`<i class="bi bi-person-fill text-cyan-400 text-xl" data-v-31bb8004></i>`);
            }
            _push(`</div><div data-v-31bb8004><div class="flex items-center gap-2" data-v-31bb8004><div class="font-bold text-white text-lg" data-v-31bb8004>${ssrInterpolate(review.is_anonymous ? "匿名用户" : ((_b2 = review.user_info) == null ? void 0 : _b2.nickname) || review.author)}</div>`);
            if (review.is_anonymous) {
              _push(`<span class="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full border border-gray-400/30" data-v-31bb8004><i class="bi bi-incognito mr-1" data-v-31bb8004></i> 匿名 </span>`);
            } else {
              _push(`<!---->`);
            }
            if (review.verified_purchase) {
              _push(`<span class="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-400/30" data-v-31bb8004><i class="bi bi-check-circle mr-1" data-v-31bb8004></i> 已购买 </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="text-sm text-gray-400" data-v-31bb8004>${ssrInterpolate(formatDate(review.created_at))}</div></div></div><div class="flex gap-1" data-v-31bb8004><!--[-->`);
            ssrRenderList(5, (i) => {
              _push(`<i class="${ssrRenderClass([i <= review.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-lg drop-shadow-lg"])}" data-v-31bb8004></i>`);
            });
            _push(`<!--]--></div></div><p class="text-gray-300 leading-relaxed text-lg mb-4" data-v-31bb8004>${ssrInterpolate(review.comment)}</p>`);
            if (review.images && review.images.length > 0) {
              _push(`<div class="grid grid-cols-3 gap-2 mb-4" data-v-31bb8004><!--[-->`);
              ssrRenderList(review.images, (image, index) => {
                _push(`<img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `评论图片${index + 1}`)} class="w-full h-20 object-cover rounded-lg border border-gray-600/30" data-v-31bb8004>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="flex items-center justify-between pt-4 border-t border-gray-700/50" data-v-31bb8004><span class="text-gray-400 text-sm" data-v-31bb8004>这条评论有帮助吗？</span><div class="flex items-center gap-4" data-v-31bb8004><button class="flex items-center gap-2 px-3 py-1 text-gray-400 hover:text-green-400 transition-colors duration-200" data-v-31bb8004><i class="bi bi-hand-thumbs-up" data-v-31bb8004></i><span data-v-31bb8004>有帮助 (${ssrInterpolate(review.helpful_count || 0)})</span></button></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else if (!unref(isLoadingReviews) && unref(reviews).length === 0) {
          _push(`<div class="text-center py-12" data-v-31bb8004><div class="text-4xl text-gray-400 mb-4" data-v-31bb8004><i class="bi bi-chat-dots" data-v-31bb8004></i></div><h3 class="text-xl font-semibold text-white mb-2" data-v-31bb8004>暂无评论</h3><p class="text-gray-400 mb-6" data-v-31bb8004>成为第一个评价此产品的用户</p></div>`);
        } else if (unref(isLoadingReviews)) {
          _push(`<div class="text-center py-8" data-v-31bb8004><div class="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" data-v-31bb8004></div><p class="text-gray-300" data-v-31bb8004>正在加载评论...</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(isLoadingReviews) && unref(reviews).length > 0) {
          _push(`<div class="mt-8 flex justify-center" data-v-31bb8004><div class="flex items-center gap-2" data-v-31bb8004><button${ssrIncludeBooleanAttr(unref(currentPage) <= 1) ? " disabled" : ""} class="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200" data-v-31bb8004><i class="bi bi-chevron-left" data-v-31bb8004></i> 上一页 </button><span class="px-4 py-2 text-gray-300" data-v-31bb8004> 第 ${ssrInterpolate(unref(currentPage))} 页 / 共 ${ssrInterpolate(unref(totalPages))} 页 </span><button${ssrIncludeBooleanAttr(unref(currentPage) >= unref(totalPages)) ? " disabled" : ""} class="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200" data-v-31bb8004> 下一页 <i class="bi bi-chevron-right" data-v-31bb8004></i></button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else if (unref(error) && !unref(loading)) {
        _push(`<div class="container mx-auto px-6 py-20 relative z-10" data-v-31bb8004><div class="text-center" data-v-31bb8004><div class="inline-flex flex-col items-center glass-card-enhanced rounded-2xl border border-red-400/40 p-16 shadow-2xl shadow-red-500/25 backdrop-blur-xl max-w-md mx-auto" data-v-31bb8004><div class="text-8xl text-red-400 mb-8" data-v-31bb8004><i class="bi bi-exclamation-triangle-fill" data-v-31bb8004></i></div><h3 class="text-3xl font-bold text-white mb-4" data-v-31bb8004>加载失败</h3><p class="text-gray-400 text-lg mb-8" data-v-31bb8004>${ssrInterpolate(unref(error))}</p><div class="space-y-3 w-full" data-v-31bb8004><button class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-31bb8004><i class="bi bi-arrow-clockwise mr-2" data-v-31bb8004></i> 重新加载 </button><button class="w-full border border-gray-600/50 hover:border-cyan-400/50 text-gray-300 hover:text-white hover:bg-cyan-500/10 py-3 px-6 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm" data-v-31bb8004> 返回上页 </button></div></div></div></div>`);
      } else if (unref(loading)) {
        _push(`<div class="container mx-auto px-6 py-20 relative z-10" data-v-31bb8004><div class="text-center" data-v-31bb8004><div class="inline-flex flex-col items-center glass-card-enhanced rounded-2xl border border-cyan-400/40 p-16 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-31bb8004><div class="relative mb-8" data-v-31bb8004><div class="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" data-v-31bb8004></div><div class="absolute inset-0 w-20 h-20 border-4 border-blue-500/30 rounded-full animate-pulse" data-v-31bb8004></div></div><p class="text-3xl font-bold text-white mb-4" data-v-31bb8004>正在加载产品详情...</p><p class="text-gray-400 text-lg" data-v-31bb8004>请稍候，正在为您获取最新信息</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showSuccessMessage)) {
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4" data-v-31bb8004><div class="confetti-container" data-v-31bb8004><!--[-->`);
        ssrRenderList(unref(confettiBatches), (batch) => {
          _push(`<div data-v-31bb8004><!--[-->`);
          ssrRenderList(30, (i) => {
            _push(`<div class="${ssrRenderClass([getConfettiShape(i), "confetti-piece"])}" style="${ssrRenderStyle({
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 2 + batch.delay + "s",
              animationDuration: "3s",
              backgroundColor: getConfettiColor(i + batch.id * 30),
              width: 8 + Math.random() * 6 + "px",
              height: 8 + Math.random() * 6 + "px"
            })}" data-v-31bb8004></div>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div><div class="glass-card-enhanced rounded-2xl border border-green-400/50 shadow-2xl shadow-green-500/30 p-10 max-w-md w-full text-center backdrop-blur-xl transform animate-bounce-in" data-v-31bb8004><div class="text-8xl text-green-400 mb-8 relative" data-v-31bb8004><i class="bi bi-check-circle-fill drop-shadow-2xl animate-check-bounce" data-v-31bb8004></i><div class="absolute inset-0 text-green-400/30 animate-ping-once" data-v-31bb8004><i class="bi bi-check-circle-fill" data-v-31bb8004></i></div></div><h3 class="text-3xl font-bold text-white mb-6" data-v-31bb8004>已加入购物车！</h3><p class="text-gray-300 mb-8 text-lg leading-relaxed" data-v-31bb8004>${ssrInterpolate((_c = unref(product)) == null ? void 0 : _c.name)} 已成功添加到购物车。</p><div class="space-y-4" data-v-31bb8004><button class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform hover:scale-105" data-v-31bb8004> 立即去结算 </button><button class="w-full border border-gray-600/50 hover:border-green-400/50 text-gray-300 hover:text-white hover:bg-green-500/10 py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm" data-v-31bb8004> 继续购物 </button></div></div></div>`);
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-31bb8004"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CcG2fVIo.js.map
