import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as __nuxt_component_0$2 } from './AppHeader-D4R1WNqE.mjs';

const _sfc_main$1 = {
  __name: "LoadingScreen",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "loading-screen" }, _attrs))} data-v-89a92fd7><div class="loader" data-v-89a92fd7><div class="nucleus" data-v-89a92fd7></div><div class="ring" data-v-89a92fd7></div><div class="ring" data-v-89a92fd7></div><div class="ring" data-v-89a92fd7></div><div class="ring" data-v-89a92fd7></div><div class="ring" data-v-89a92fd7></div><div class="ring" data-v-89a92fd7></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoadingScreen.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-89a92fd7"]]);
const _sfc_main = {
  __name: "PageLoader",
  __ssrInlineRender: true,
  props: {
    isPageLoading: {
      type: Boolean,
      default: true
    },
    isDataLoading: {
      type: Boolean,
      default: true
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: "\u9875\u9762\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
    },
    loadingTitle: {
      type: String,
      default: "\u6B63\u5728\u52A0\u8F7D..."
    },
    loadingMessage: {
      type: String,
      default: "\u8BF7\u7A0D\u5019"
    }
  },
  emits: ["retry"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingScreen = __nuxt_component_0$1;
      const _component_AppHeader = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-loader-container" }, _attrs))} data-v-5e630c98>`);
      _push(ssrRenderComponent(_component_LoadingScreen, {
        show: __props.isPageLoading || __props.isDataLoading
      }, null, _parent));
      if (__props.hasError && !__props.isPageLoading && !__props.isDataLoading) {
        _push(`<div class="error-state" data-v-5e630c98><div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" data-v-5e630c98><div class="fixed inset-0 pointer-events-none" data-v-5e630c98><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full filter blur-3xl animate-pulse" data-v-5e630c98></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-5e630c98></div></div>`);
        _push(ssrRenderComponent(_component_AppHeader, {
          "show-back-button": false,
          "show-nav-menu": true,
          "show-breadcrumb": false,
          "show-location": false,
          "show-search-button": false,
          "show-notification-button": false,
          "show-decorations": false,
          "logo-size": "medium"
        }, null, _parent));
        _push(`<div class="relative z-10 flex items-center justify-center min-h-[80vh]" data-v-5e630c98><div class="glass-card-dark rounded-3xl p-16 border border-red-500/30 shadow-2xl shadow-red-500/30 text-center max-w-lg mx-auto" data-v-5e630c98><div class="text-8xl text-red-400 mb-10" data-v-5e630c98><i class="bi bi-exclamation-triangle" data-v-5e630c98></i></div><h3 class="text-3xl font-bold text-white mb-6" data-v-5e630c98>\u52A0\u8F7D\u5931\u8D25</h3><p class="text-gray-300 text-xl mb-10" data-v-5e630c98>${ssrInterpolate(__props.errorMessage)}</p><button class="px-10 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transform hover:scale-105" data-v-5e630c98><i class="bi bi-arrow-clockwise mr-3 text-xl" data-v-5e630c98></i> \u91CD\u8BD5 </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.hasError && !__props.isPageLoading && !__props.isDataLoading) {
        _push(`<div class="page-ready" data-v-5e630c98>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PageLoader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5e630c98"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=PageLoader-GhT5s0Gy.mjs.map
