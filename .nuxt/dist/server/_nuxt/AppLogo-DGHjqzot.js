import { _ as __nuxt_component_0$1 } from "./nuxt-link-D8iHomBq.js";
import { computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = "" + __buildAssetsURL("logo.BW_Hnmw3.png");
const _sfc_main = {
  __name: "AppLogo",
  __ssrInlineRender: true,
  props: {
    size: {
      type: String,
      default: "medium",
      // small, medium, large
      validator: (value) => ["small", "medium", "large"].includes(value)
    },
    showText: {
      type: Boolean,
      default: true
    },
    showSubtitle: {
      type: Boolean,
      default: true
    },
    linkClass: {
      type: String,
      default: "flex items-center hover:scale-105 transition-transform duration-300"
    },
    altText: {
      type: String,
      default: "xlCig Logo"
    }
  },
  setup(__props) {
    const props = __props;
    const sizeConfig = computed(() => {
      const configs = {
        small: {
          logoWidth: 32,
          logoHeight: 32,
          showText: false,
          showSubtitle: false,
          textSize: "text-sm",
          subtitleSize: "text-xs"
        },
        medium: {
          logoWidth: 40,
          logoHeight: 40,
          showText: true,
          showSubtitle: false,
          textSize: "text-lg",
          subtitleSize: "text-xs"
        },
        large: {
          logoWidth: 48,
          logoHeight: 48,
          showText: true,
          showSubtitle: true,
          textSize: "text-xl",
          subtitleSize: "text-sm"
        }
      };
      return configs[props.size];
    });
    const logoWidth = computed(() => sizeConfig.value.logoWidth);
    const logoHeight = computed(() => sizeConfig.value.logoHeight);
    computed(() => props.showText && sizeConfig.value.showText);
    computed(() => props.showSubtitle && sizeConfig.value.showSubtitle);
    const logoClass = computed(() => {
      const baseClass = "object-contain transition-transform duration-300";
      const hoverClass = "hover:scale-110";
      return `${baseClass} ${hoverClass}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: "/",
        class: __props.linkClass
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3" data-v-f6209c31${_scopeId}><img${ssrRenderAttr("src", _imports_0)}${ssrRenderAttr("alt", __props.altText)}${ssrRenderAttr("width", unref(logoWidth))}${ssrRenderAttr("height", unref(logoHeight))} class="${ssrRenderClass(unref(logoClass))}" loading="lazy" data-v-f6209c31${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("img", {
                  src: _imports_0,
                  alt: __props.altText,
                  width: unref(logoWidth),
                  height: unref(logoHeight),
                  class: unref(logoClass),
                  loading: "lazy"
                }, null, 10, ["alt", "width", "height"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f6209c31"]]);
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=AppLogo-DGHjqzot.js.map
