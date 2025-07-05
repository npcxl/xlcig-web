import { _ as __nuxt_component_0 } from './AppHeader-Baa9wtq1.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-D8iHomBq.mjs';
import { ref, computed, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc, u as useUserStore } from './server.mjs';
import { c as createDiscreteApi } from './useLocation-CdbkT8tR.mjs';
import { u as useHead } from './v3-CXjDD8hH.mjs';
import './AppLogo-DGHjqzot.mjs';
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
import 'vue-router';
import 'seemly';
import 'treemate';
import 'vooks';
import 'vdirs';
import 'lodash-es';
import 'css-render';
import 'evtd';
import 'pinia';
import '@css-render/plugin-bem';

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
        1: "\u975E\u5E38\u4E0D\u6EE1\u610F",
        2: "\u4E0D\u6EE1\u610F",
        3: "\u4E00\u822C",
        4: "\u6EE1\u610F",
        5: "\u975E\u5E38\u6EE1\u610F"
      };
      return texts[rating] || "";
    };
    const getStatusText = (status) => {
      const statusMap = {
        "pending": "\u5BA1\u6838\u4E2D",
        "approved": "\u5DF2\u53D1\u5E03",
        "rejected": "\u5DF2\u62D2\u7EDD"
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
      title: "\u6211\u7684\u8BC4\u8BBA - xlCig",
      meta: [
        { name: "description", content: "\u7BA1\u7406\u60A8\u53D1\u8868\u7684\u6240\u6709\u4EA7\u54C1\u8BC4\u8BBA\uFF0C\u7F16\u8F91\u548C\u5220\u9664\u8BC4\u8BBA" }
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
        "current-page-title": "\u6211\u7684\u8BC4\u8BBA"
      }, null, _parent));
      _push(`<div class="container mx-auto px-6 py-8 relative z-10" data-v-e32176e9><div class="text-center mb-12" data-v-e32176e9><h1 class="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4" data-v-e32176e9> \u6211\u7684\u8BC4\u8BBA </h1><p class="text-gray-300 text-lg" data-v-e32176e9>\u7BA1\u7406\u60A8\u53D1\u8868\u7684\u6240\u6709\u4EA7\u54C1\u8BC4\u8BBA</p></div><div class="grid md:grid-cols-3 gap-6 mb-8" data-v-e32176e9><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-6 text-center" data-v-e32176e9><div class="text-3xl font-bold text-cyan-400 mb-2" data-v-e32176e9>${ssrInterpolate(totalReviews.value)}</div><div class="text-gray-300" data-v-e32176e9>\u603B\u8BC4\u8BBA\u6570</div></div><div class="glass-card-dark rounded-2xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/20 p-6 text-center" data-v-e32176e9><div class="text-3xl font-bold text-yellow-400 mb-2" data-v-e32176e9>${ssrInterpolate(averageRating.value.toFixed(1))}</div><div class="text-gray-300" data-v-e32176e9>\u5E73\u5747\u8BC4\u5206</div></div><div class="glass-card-dark rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/20 p-6 text-center" data-v-e32176e9><div class="text-3xl font-bold text-green-400 mb-2" data-v-e32176e9>${ssrInterpolate(verifiedReviews.value)}</div><div class="text-gray-300" data-v-e32176e9>\u5DF2\u9A8C\u8BC1\u8BC4\u8BBA</div></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-e32176e9><div class="px-8 py-6 border-b border-gray-700/50" data-v-e32176e9><h2 class="text-2xl font-bold text-white flex items-center gap-3" data-v-e32176e9><i class="bi bi-chat-dots text-cyan-400" data-v-e32176e9></i> \u8BC4\u8BBA\u5217\u8868 </h2></div><div class="p-8" data-v-e32176e9>`);
      if (isLoading.value) {
        _push(`<div class="text-center py-12" data-v-e32176e9><div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" data-v-e32176e9></div><p class="text-gray-300" data-v-e32176e9>\u6B63\u5728\u52A0\u8F7D\u8BC4\u8BBA...</p></div>`);
      } else if (reviews.value.length === 0) {
        _push(`<div class="text-center py-12" data-v-e32176e9><div class="text-6xl mb-4 text-gray-500" data-v-e32176e9><i class="bi bi-chat-x" data-v-e32176e9></i></div><h3 class="text-xl font-semibold text-white mb-2" data-v-e32176e9>\u6682\u65E0\u8BC4\u8BBA</h3><p class="text-gray-400 mb-6" data-v-e32176e9>\u60A8\u8FD8\u6CA1\u6709\u53D1\u8868\u8FC7\u4EFB\u4F55\u8BC4\u8BBA</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="bi bi-plus-circle mr-2" data-v-e32176e9${_scopeId}></i> \u53BB\u8D2D\u7269\u5E76\u8BC4\u8BBA `);
            } else {
              return [
                createVNode("i", { class: "bi bi-plus-circle mr-2" }),
                createTextVNode(" \u53BB\u8D2D\u7269\u5E76\u8BC4\u8BBA ")
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
          _push(`</div><div class="flex-1" data-v-e32176e9><h3 class="font-semibold text-white text-lg mb-1" data-v-e32176e9>${ssrInterpolate(review.product_name)}</h3><div class="flex items-center gap-4 text-sm text-gray-400" data-v-e32176e9><span data-v-e32176e9>\u53D1\u8868\u4E8E: ${ssrInterpolate(formatDate(review.created_at))}</span>`);
          if (review.verified_purchase) {
            _push(`<span class="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-400/30" data-v-e32176e9> \u5DF2\u9A8C\u8BC1\u8D2D\u4E70 </span>`);
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
              _push(`<img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `\u8BC4\u8BBA\u56FE\u7247${index + 1}`)} class="w-full h-20 object-cover rounded-lg border border-gray-600/30" data-v-e32176e9>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center justify-between pt-4 border-t border-gray-700/50 text-sm text-gray-400" data-v-e32176e9><span data-v-e32176e9>\u83B7\u5F97 ${ssrInterpolate(review.helpful_count)} \u4E2A\u8D5E</span>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products/${review.product_id}`,
            class: "text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` \u67E5\u770B\u4EA7\u54C1\u8BE6\u60C5 \u2192 `);
              } else {
                return [
                  createTextVNode(" \u67E5\u770B\u4EA7\u54C1\u8BE6\u60C5 \u2192 ")
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
        _push(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-e32176e9><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto" data-v-e32176e9><div class="p-8" data-v-e32176e9><div class="flex items-center justify-between mb-6" data-v-e32176e9><h3 class="text-2xl font-bold text-white flex items-center gap-3" data-v-e32176e9><i class="bi bi-pencil text-cyan-400" data-v-e32176e9></i> \u7F16\u8F91\u8BC4\u8BBA </h3><button class="text-gray-400 hover:text-white" data-v-e32176e9><i class="bi bi-x-lg text-2xl" data-v-e32176e9></i></button></div><form class="space-y-6" data-v-e32176e9><div data-v-e32176e9><label class="block text-sm font-bold text-white mb-4" data-v-e32176e9>\u8BC4\u5206</label><div class="flex items-center gap-2" data-v-e32176e9><!--[-->`);
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
        _push(`</div></div><div data-v-e32176e9><label class="block text-sm font-bold text-white mb-4" data-v-e32176e9>\u8BC4\u8BBA\u5185\u5BB9</label><textarea required rows="5" placeholder="\u8BF7\u5206\u4EAB\u60A8\u5BF9\u8FD9\u6B3E\u4EA7\u54C1\u7684\u4F7F\u7528\u4F53\u9A8C..." class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 resize-none" data-v-e32176e9>${ssrInterpolate(editData.value.comment)}</textarea></div><div class="flex justify-end space-x-4 pt-6" data-v-e32176e9><button type="button" class="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg font-medium transition-colors duration-300" data-v-e32176e9> \u53D6\u6D88 </button><button type="submit"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""} class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300 flex items-center gap-2" data-v-e32176e9>`);
        if (isUpdating.value) {
          _push(`<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" data-v-e32176e9></div>`);
        } else {
          _push(`<i class="bi bi-check-circle" data-v-e32176e9></i>`);
        }
        _push(` ${ssrInterpolate(isUpdating.value ? "\u66F4\u65B0\u4E2D..." : "\u66F4\u65B0\u8BC4\u8BBA")}</button></div></form></div></div></div>`);
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

export { myReviews as default };
//# sourceMappingURL=my-reviews-Cq8qQOb0.mjs.map
