import { _ as __nuxt_component_0 } from "./AppHeader-CHr1q5UR.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-CtfKDdVG.js";
import { ref, computed, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc, a as useUserStore } from "../server.mjs";
import { c as createDiscreteApi } from "./useLocation-kga13ouX.js";
import "D:/code/xlweb/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-CXjDD8hH.js";
import "./AppLogo-Bv4HeTlN.js";
import "vue-router";
import "seemly";
import "treemate";
import "vooks";
import "vdirs";
import "lodash-es";
import "css-render";
import "evtd";
import "D:/code/xlweb/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/code/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/code/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/code/xlweb/node_modules/defu/dist/defu.mjs";
import "D:/code/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/code/xlweb/node_modules/klona/dist/index.mjs";
import "@css-render/plugin-bem";
import "D:/code/xlweb/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "my-reviews",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    const { message } = createDiscreteApi(["message"]);
    const reviews = ref([]);
    const pagination = ref(null);
    const isLoading = ref(false);
    ref(1);
    const showEditModal = ref(false);
    const editData = ref({
      id: null,
      rating: 0,
      comment: ""
    });
    const isUpdating = ref(false);
    const totalReviews = computed(() => {
      return reviews.value.length;
    });
    const averageRating = computed(() => {
      if (reviews.value.length === 0) return 0;
      const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
      return sum / reviews.value.length;
    });
    const verifiedReviews = computed(() => {
      return reviews.value.filter((review) => review.verified_purchase).length;
    });
    const paginationPages = computed(() => {
      if (!pagination.value) return [];
      const pages = [];
      for (let i = 1; i <= pagination.value.total_pages; i++) {
        pages.push(i);
      }
      return pages;
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
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
    const getStatusText = (status) => {
      const statusMap = {
        "pending": "审核中",
        "approved": "已发布",
        "rejected": "已拒绝"
      };
      return statusMap[status] || status;
    };
    const canEdit = (review) => {
      const createdAt = new Date(review.created_at);
      const now = /* @__PURE__ */ new Date();
      const hoursDiff = (now.getTime() - createdAt.getTime()) / (1e3 * 60 * 60);
      return hoursDiff <= 24 && review.status === "approved";
    };
    useHead({
      title: "我的评论 - xlCig",
      meta: [
        { name: "description", content: "管理您发表的所有产品评论，编辑和删除评论" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-e32176e9><div class="fixed inset-0 pointer-events-none" data-v-e32176e9><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-e32176e9></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-e32176e9></div></div>`);
      _push(ssrRenderComponent(_component_AppHeader, {
        "show-back-button": true,
        "show-nav-menu": true,
        "show-breadcrumb": true,
        "show-location": false,
        "show-search-button": false,
        "show-notification-button": true,
        "show-decorations": false,
        "logo-size": "medium",
        "current-page-title": "我的评论"
      }, null, _parent));
      _push(`<div class="container mx-auto px-6 py-8 relative z-10" data-v-e32176e9><div class="text-center mb-12" data-v-e32176e9><h1 class="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4" data-v-e32176e9> 我的评论 </h1><p class="text-gray-300 text-lg" data-v-e32176e9>管理您发表的所有产品评论</p></div><div class="grid md:grid-cols-3 gap-6 mb-8" data-v-e32176e9><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-6 text-center" data-v-e32176e9><div class="text-3xl font-bold text-cyan-400 mb-2" data-v-e32176e9>${ssrInterpolate(totalReviews.value)}</div><div class="text-gray-300" data-v-e32176e9>总评论数</div></div><div class="glass-card-dark rounded-2xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/20 p-6 text-center" data-v-e32176e9><div class="text-3xl font-bold text-yellow-400 mb-2" data-v-e32176e9>${ssrInterpolate(averageRating.value.toFixed(1))}</div><div class="text-gray-300" data-v-e32176e9>平均评分</div></div><div class="glass-card-dark rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/20 p-6 text-center" data-v-e32176e9><div class="text-3xl font-bold text-green-400 mb-2" data-v-e32176e9>${ssrInterpolate(verifiedReviews.value)}</div><div class="text-gray-300" data-v-e32176e9>已验证评论</div></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-e32176e9><div class="px-8 py-6 border-b border-gray-700/50" data-v-e32176e9><h2 class="text-2xl font-bold text-white flex items-center gap-3" data-v-e32176e9><i class="bi bi-chat-dots text-cyan-400" data-v-e32176e9></i> 评论列表 </h2></div><div class="p-8" data-v-e32176e9>`);
      if (isLoading.value) {
        _push(`<div class="text-center py-12" data-v-e32176e9><div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" data-v-e32176e9></div><p class="text-gray-300" data-v-e32176e9>正在加载评论...</p></div>`);
      } else if (reviews.value.length === 0) {
        _push(`<div class="text-center py-12" data-v-e32176e9><div class="text-6xl mb-4 text-gray-500" data-v-e32176e9><i class="bi bi-chat-x" data-v-e32176e9></i></div><h3 class="text-xl font-semibold text-white mb-2" data-v-e32176e9>暂无评论</h3><p class="text-gray-400 mb-6" data-v-e32176e9>您还没有发表过任何评论</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="bi bi-plus-circle mr-2" data-v-e32176e9${_scopeId}></i> 去购物并评论 `);
            } else {
              return [
                createVNode("i", { class: "bi bi-plus-circle mr-2" }),
                createTextVNode(" 去购物并评论 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-6" data-v-e32176e9><!--[-->`);
        ssrRenderList(reviews.value, (review) => {
          _push(`<div class="p-6 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300" data-v-e32176e9><div class="flex items-center gap-4 mb-4" data-v-e32176e9><div class="w-16 h-16 bg-gray-700/50 rounded-lg overflow-hidden" data-v-e32176e9>`);
          if (review.product_images && review.product_images.length > 0) {
            _push(`<img${ssrRenderAttr("src", review.product_images[0])}${ssrRenderAttr("alt", review.product_name)} class="w-full h-full object-contain p-1" data-v-e32176e9>`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center text-gray-500" data-v-e32176e9><i class="bi bi-image text-2xl" data-v-e32176e9></i></div>`);
          }
          _push(`</div><div class="flex-1" data-v-e32176e9><h3 class="font-semibold text-white text-lg mb-1" data-v-e32176e9>${ssrInterpolate(review.product_name)}</h3><div class="flex items-center gap-4 text-sm text-gray-400" data-v-e32176e9><span data-v-e32176e9>发表于: ${ssrInterpolate(formatDate(review.created_at))}</span>`);
          if (review.verified_purchase) {
            _push(`<span class="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-400/30" data-v-e32176e9> 已验证购买 </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-400/30" data-v-e32176e9>${ssrInterpolate(getStatusText(review.status))}</span></div></div><div class="flex items-center gap-2" data-v-e32176e9>`);
          if (canEdit(review)) {
            _push(`<button class="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200" data-v-e32176e9><i class="bi bi-pencil" data-v-e32176e9></i></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200" data-v-e32176e9><i class="bi bi-trash" data-v-e32176e9></i></button></div></div><div class="mb-4" data-v-e32176e9><div class="flex items-center gap-3 mb-3" data-v-e32176e9><div class="flex gap-1" data-v-e32176e9><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<i class="${ssrRenderClass([i <= review.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-lg"])}" data-v-e32176e9></i>`);
          });
          _push(`<!--]--></div><span class="text-gray-300 text-sm" data-v-e32176e9>${ssrInterpolate(getRatingText(review.rating))}</span></div><p class="text-gray-300 leading-relaxed" data-v-e32176e9>${ssrInterpolate(review.comment)}</p></div>`);
          if (review.images && review.images.length > 0) {
            _push(`<div class="grid grid-cols-4 gap-2 mb-4" data-v-e32176e9><!--[-->`);
            ssrRenderList(review.images, (image, index) => {
              _push(`<img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `评论图片${index + 1}`)} class="w-full h-20 object-cover rounded-lg border border-gray-600/30" data-v-e32176e9>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center justify-between pt-4 border-t border-gray-700/50 text-sm text-gray-400" data-v-e32176e9><span data-v-e32176e9>获得 ${ssrInterpolate(review.helpful_count)} 个赞</span>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products/${review.product_id}`,
            class: "text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` 查看产品详情 → `);
              } else {
                return [
                  createTextVNode(" 查看产品详情 → ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (pagination.value && pagination.value.total_pages > 1) {
        _push(`<div class="mt-8 flex justify-center" data-v-e32176e9><div class="flex items-center gap-2" data-v-e32176e9><!--[-->`);
        ssrRenderList(paginationPages.value, (page) => {
          _push(`<button class="${ssrRenderClass([
            "px-4 py-2 rounded-lg font-medium transition-all duration-200",
            page === pagination.value.current_page ? "bg-cyan-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          ])}" data-v-e32176e9>${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (showEditModal.value) {
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-e32176e9><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto" data-v-e32176e9><div class="p-8" data-v-e32176e9><div class="flex items-center justify-between mb-6" data-v-e32176e9><h3 class="text-2xl font-bold text-white flex items-center gap-3" data-v-e32176e9><i class="bi bi-pencil text-cyan-400" data-v-e32176e9></i> 编辑评论 </h3><button class="text-gray-400 hover:text-white" data-v-e32176e9><i class="bi bi-x-lg text-2xl" data-v-e32176e9></i></button></div><form class="space-y-6" data-v-e32176e9><div data-v-e32176e9><label class="block text-sm font-bold text-white mb-4" data-v-e32176e9>评分</label><div class="flex items-center gap-2" data-v-e32176e9><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "text-3xl transition-all duration-200 hover:scale-110",
            i <= editData.value.rating ? "text-yellow-400" : "text-gray-600 hover:text-yellow-300"
          ])}" data-v-e32176e9><i class="bi bi-star-fill" data-v-e32176e9></i></button>`);
        });
        _push(`<!--]-->`);
        if (editData.value.rating > 0) {
          _push(`<span class="ml-4 text-white font-medium" data-v-e32176e9>${ssrInterpolate(getRatingText(editData.value.rating))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div data-v-e32176e9><label class="block text-sm font-bold text-white mb-4" data-v-e32176e9>评论内容</label><textarea required rows="5" placeholder="请分享您对这款产品的使用体验..." class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none" data-v-e32176e9>${ssrInterpolate(editData.value.comment)}</textarea></div><div class="flex justify-end space-x-4 pt-6" data-v-e32176e9><button type="button" class="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg font-medium transition-colors duration-300" data-v-e32176e9> 取消 </button><button type="submit"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""} class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300 flex items-center gap-2" data-v-e32176e9>`);
        if (isUpdating.value) {
          _push(`<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" data-v-e32176e9></div>`);
        } else {
          _push(`<i class="bi bi-check-circle" data-v-e32176e9></i>`);
        }
        _push(` ${ssrInterpolate(isUpdating.value ? "更新中..." : "更新评论")}</button></div></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-reviews.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const myReviews = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e32176e9"]]);
export {
  myReviews as default
};
//# sourceMappingURL=my-reviews-DjbDLTTk.js.map
