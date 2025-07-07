import { _ as __nuxt_component_0$1 } from "./nuxt-link-CtfKDdVG.js";
import { _ as __nuxt_component_0$2 } from "./AppLogo-Bv4HeTlN.js";
import { inject, ref, watch, defineComponent, provide, getCurrentInstance, withDirectives, h, nextTick, toRef, Transition, watchEffect, computed, vShow, mergeProps, Fragment, cloneVNode, Text, unref, useSSRContext, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc, a as useUserStore } from "../server.mjs";
import { useRouter, useRoute } from "vue-router";
import { b as createInjectionKey, m as modalBodyInjectionKey, d as drawerBodyInjectionKey, p as popoverBodyInjectionKey, g as getSlot, e as getFirstVNode, f as LazyTeleport, h as useSsrAdapter, i as commonVariables$k, s as self$J, j as derived$1, k as c$1, l as cB, n as cNotM, o as cE, q as cM, r as cCB, t as useConfig, v as useTheme, w as useThemeClass, x as isSlotEmpty, F as FocusTrap, y as resolveWrappedSlot, X as XScrollbar, z as getFirstSlotVNode, A as keep, B as warnOnce, C as call, D as self$K, E as self$L, G as createTheme, H as render, I as warn, J as fadeInScaleUpTransition, K as createKey, M as self$M, N as self$N, O as self$O, P as self$P, u as useLocation, Q as NConfigProvider } from "./useLocation-kga13ouX.js";
import { beforeNextFrameOnce, scaleColor, rgba, composite, getPreciseEventTarget, changeColor, happensIn } from "seemly";
import { createTreeMate } from "treemate";
import { useMemo, onFontsReady, useIsMounted, useMergedState, useCompitable, useKeyboard } from "vooks";
import { zindexable, clickoutside, mousemoveoutside } from "vdirs";
import { map } from "lodash-es";
import { CssRender } from "css-render";
import { off, on } from "evtd";
const internalSelectionMenuBodyInjectionKey = createInjectionKey("n-internal-select-menu-body");
const teleportDisabled = "__disabled__";
function useAdjustedTo(props) {
  const modal = inject(modalBodyInjectionKey, null);
  const drawer = inject(drawerBodyInjectionKey, null);
  const popover = inject(popoverBodyInjectionKey, null);
  const selectMenu = inject(internalSelectionMenuBodyInjectionKey, null);
  const fullscreenElementRef = ref();
  return useMemo(() => {
    var _a;
    const {
      to
    } = props;
    if (to !== void 0) {
      if (to === false) return teleportDisabled;
      if (to === true) return fullscreenElementRef.value || "body";
      return to;
    }
    if (modal === null || modal === void 0 ? void 0 : modal.value) {
      return (_a = modal.value.$el) !== null && _a !== void 0 ? _a : modal.value;
    }
    if (drawer === null || drawer === void 0 ? void 0 : drawer.value) return drawer.value;
    if (popover === null || popover === void 0 ? void 0 : popover.value) return popover.value;
    if (selectMenu === null || selectMenu === void 0 ? void 0 : selectMenu.value) return selectMenu.value;
    return to !== null && to !== void 0 ? to : fullscreenElementRef.value || "body";
  });
}
useAdjustedTo.tdkey = teleportDisabled;
useAdjustedTo.propTo = {
  type: [String, Object, Boolean],
  default: void 0
};
function useDeferredTrue(valueRef, delay, shouldDelayRef) {
  const delayedRef = ref(valueRef.value);
  let timerId = null;
  watch(valueRef, (value) => {
    if (timerId !== null) (void 0).clearTimeout(timerId);
    if (value === true) {
      if (shouldDelayRef && !shouldDelayRef.value) {
        delayedRef.value = true;
      } else {
        timerId = (void 0).setTimeout(() => {
          delayedRef.value = true;
        }, delay);
      }
    } else {
      delayedRef.value = false;
    }
  });
  return delayedRef;
}
let viewMeasurer = null;
function ensureViewBoundingRect() {
  if (viewMeasurer === null) {
    viewMeasurer = (void 0).getElementById("v-binder-view-measurer");
    if (viewMeasurer === null) {
      viewMeasurer = (void 0).createElement("div");
      viewMeasurer.id = "v-binder-view-measurer";
      const { style: style2 } = viewMeasurer;
      style2.position = "fixed";
      style2.left = "0";
      style2.right = "0";
      style2.top = "0";
      style2.bottom = "0";
      style2.pointerEvents = "none";
      style2.visibility = "hidden";
      (void 0).body.appendChild(viewMeasurer);
    }
  }
  return viewMeasurer.getBoundingClientRect();
}
function getPointRect(x, y) {
  const viewRect = ensureViewBoundingRect();
  return {
    top: y,
    left: x,
    height: 0,
    width: 0,
    right: viewRect.width - x,
    bottom: viewRect.height - y
  };
}
function getRect(el) {
  const elRect = el.getBoundingClientRect();
  const viewRect = ensureViewBoundingRect();
  return {
    left: elRect.left - viewRect.left,
    top: elRect.top - viewRect.top,
    bottom: viewRect.height + viewRect.top - elRect.bottom,
    right: viewRect.width + viewRect.left - elRect.right,
    width: elRect.width,
    height: elRect.height
  };
}
function getParentNode(node) {
  if (node.nodeType === 9) {
    return null;
  }
  return node.parentNode;
}
function getScrollParent(node) {
  if (node === null)
    return null;
  const parentNode = getParentNode(node);
  if (parentNode === null) {
    return null;
  }
  if (parentNode.nodeType === 9) {
    return void 0;
  }
  if (parentNode.nodeType === 1) {
    const { overflow, overflowX, overflowY } = getComputedStyle(parentNode);
    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return parentNode;
    }
  }
  return getScrollParent(parentNode);
}
const Binder = defineComponent({
  name: "Binder",
  props: {
    syncTargetWithParent: Boolean,
    syncTarget: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    var _a;
    provide("VBinder", (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy);
    const VBinder = inject("VBinder", null);
    const targetRef = ref(null);
    const setTargetRef = (el) => {
      targetRef.value = el;
      if (VBinder && props.syncTargetWithParent) {
        VBinder.setTargetRef(el);
      }
    };
    let scrollableNodes = [];
    const ensureScrollListener = () => {
      let cursor = targetRef.value;
      while (true) {
        cursor = getScrollParent(cursor);
        if (cursor === null)
          break;
        scrollableNodes.push(cursor);
      }
      for (const el of scrollableNodes) {
        on("scroll", el, onScroll, true);
      }
    };
    const removeScrollListeners = () => {
      for (const el of scrollableNodes) {
        off("scroll", el, onScroll, true);
      }
      scrollableNodes = [];
    };
    const followerScrollListeners = /* @__PURE__ */ new Set();
    const addScrollListener = (listener) => {
      if (followerScrollListeners.size === 0) {
        ensureScrollListener();
      }
      if (!followerScrollListeners.has(listener)) {
        followerScrollListeners.add(listener);
      }
    };
    const removeScrollListener = (listener) => {
      if (followerScrollListeners.has(listener)) {
        followerScrollListeners.delete(listener);
      }
      if (followerScrollListeners.size === 0) {
        removeScrollListeners();
      }
    };
    const onScroll = () => {
      beforeNextFrameOnce(onScrollRaf);
    };
    const onScrollRaf = () => {
      followerScrollListeners.forEach((listener) => listener());
    };
    const followerResizeListeners = /* @__PURE__ */ new Set();
    const addResizeListener = (listener) => {
      if (followerResizeListeners.size === 0) {
        on("resize", void 0, onResize);
      }
      if (!followerResizeListeners.has(listener)) {
        followerResizeListeners.add(listener);
      }
    };
    const removeResizeListener = (listener) => {
      if (followerResizeListeners.has(listener)) {
        followerResizeListeners.delete(listener);
      }
      if (followerResizeListeners.size === 0) {
        off("resize", void 0, onResize);
      }
    };
    const onResize = () => {
      followerResizeListeners.forEach((listener) => listener());
    };
    return {
      targetRef,
      setTargetRef,
      addScrollListener,
      removeScrollListener,
      addResizeListener,
      removeResizeListener
    };
  },
  render() {
    return getSlot("binder", this.$slots);
  }
});
const VTarget = defineComponent({
  name: "Target",
  setup() {
    const { setTargetRef, syncTarget } = inject("VBinder");
    const setTargetDirective = {
      mounted: setTargetRef,
      updated: setTargetRef
    };
    return {
      syncTarget,
      setTargetDirective
    };
  },
  render() {
    const { syncTarget, setTargetDirective } = this;
    if (syncTarget) {
      return withDirectives(getFirstVNode("follower", this.$slots), [
        [setTargetDirective]
      ]);
    }
    return getFirstVNode("follower", this.$slots);
  }
});
const { c } = CssRender();
const cssrAnchorMetaName = "vueuc-style";
const oppositionPositions = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
const oppositeAligns = {
  start: "end",
  center: "center",
  end: "start"
};
const propToCompare = {
  top: "height",
  bottom: "height",
  left: "width",
  right: "width"
};
const transformOrigins = {
  "bottom-start": "top left",
  bottom: "top center",
  "bottom-end": "top right",
  "top-start": "bottom left",
  top: "bottom center",
  "top-end": "bottom right",
  "right-start": "top left",
  right: "center left",
  "right-end": "bottom left",
  "left-start": "top right",
  left: "center right",
  "left-end": "bottom right"
};
const overlapTransformOrigin = {
  "bottom-start": "bottom left",
  bottom: "bottom center",
  "bottom-end": "bottom right",
  "top-start": "top left",
  top: "top center",
  "top-end": "top right",
  "right-start": "top right",
  right: "center right",
  "right-end": "bottom right",
  "left-start": "top left",
  left: "center left",
  "left-end": "bottom left"
};
const oppositeAlignCssPositionProps = {
  "bottom-start": "right",
  "bottom-end": "left",
  "top-start": "right",
  "top-end": "left",
  "right-start": "bottom",
  "right-end": "top",
  "left-start": "bottom",
  "left-end": "top"
};
const keepOffsetDirection = {
  top: true,
  bottom: false,
  left: true,
  right: false
  // left--
};
const cssPositionToOppositeAlign = {
  top: "end",
  bottom: "start",
  left: "end",
  right: "start"
};
function getPlacementAndOffsetOfFollower(placement, targetRect, followerRect, shift, flip, overlap) {
  if (!flip || overlap) {
    return { placement, top: 0, left: 0 };
  }
  const [position, align] = placement.split("-");
  let properAlign = align !== null && align !== void 0 ? align : "center";
  let properOffset = {
    top: 0,
    left: 0
  };
  const deriveOffset = (oppositeAlignCssSizeProp, alignCssPositionProp, offsetVertically2) => {
    let left = 0;
    let top = 0;
    const diff = followerRect[oppositeAlignCssSizeProp] - targetRect[alignCssPositionProp] - targetRect[oppositeAlignCssSizeProp];
    if (diff > 0 && shift) {
      if (offsetVertically2) {
        top = keepOffsetDirection[alignCssPositionProp] ? diff : -diff;
      } else {
        left = keepOffsetDirection[alignCssPositionProp] ? diff : -diff;
      }
    }
    return {
      left,
      top
    };
  };
  const offsetVertically = position === "left" || position === "right";
  if (properAlign !== "center") {
    const oppositeAlignCssPositionProp = oppositeAlignCssPositionProps[placement];
    const currentAlignCssPositionProp = oppositionPositions[oppositeAlignCssPositionProp];
    const oppositeAlignCssSizeProp = propToCompare[oppositeAlignCssPositionProp];
    if (followerRect[oppositeAlignCssSizeProp] > targetRect[oppositeAlignCssSizeProp]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        targetRect[oppositeAlignCssPositionProp] + targetRect[oppositeAlignCssSizeProp] < followerRect[oppositeAlignCssSizeProp]
      ) {
        const followerOverTargetSize = (followerRect[oppositeAlignCssSizeProp] - targetRect[oppositeAlignCssSizeProp]) / 2;
        if (targetRect[oppositeAlignCssPositionProp] < followerOverTargetSize || targetRect[currentAlignCssPositionProp] < followerOverTargetSize) {
          if (targetRect[oppositeAlignCssPositionProp] < targetRect[currentAlignCssPositionProp]) {
            properAlign = oppositeAligns[align];
            properOffset = deriveOffset(oppositeAlignCssSizeProp, currentAlignCssPositionProp, offsetVertically);
          } else {
            properOffset = deriveOffset(oppositeAlignCssSizeProp, oppositeAlignCssPositionProp, offsetVertically);
          }
        } else {
          properAlign = "center";
        }
      }
    } else if (followerRect[oppositeAlignCssSizeProp] < targetRect[oppositeAlignCssSizeProp]) {
      if (targetRect[currentAlignCssPositionProp] < 0 && // opposite align has larger space
      // ------------[   target   ]
      // ----------------[follower]
      targetRect[oppositeAlignCssPositionProp] > targetRect[currentAlignCssPositionProp]) {
        properAlign = oppositeAligns[align];
      }
    }
  } else {
    const possibleAlternativeAlignCssPositionProp1 = position === "bottom" || position === "top" ? "left" : "top";
    const possibleAlternativeAlignCssPositionProp2 = oppositionPositions[possibleAlternativeAlignCssPositionProp1];
    const alternativeAlignCssSizeProp = propToCompare[possibleAlternativeAlignCssPositionProp1];
    const followerOverTargetSize = (followerRect[alternativeAlignCssSizeProp] - targetRect[alternativeAlignCssSizeProp]) / 2;
    if (
      // center is not enough
      // ----------- [ target ]--|
      // -------[     follower     ]
      targetRect[possibleAlternativeAlignCssPositionProp1] < followerOverTargetSize || targetRect[possibleAlternativeAlignCssPositionProp2] < followerOverTargetSize
    ) {
      if (targetRect[possibleAlternativeAlignCssPositionProp1] > targetRect[possibleAlternativeAlignCssPositionProp2]) {
        properAlign = cssPositionToOppositeAlign[possibleAlternativeAlignCssPositionProp1];
        properOffset = deriveOffset(alternativeAlignCssSizeProp, possibleAlternativeAlignCssPositionProp1, offsetVertically);
      } else {
        properAlign = cssPositionToOppositeAlign[possibleAlternativeAlignCssPositionProp2];
        properOffset = deriveOffset(alternativeAlignCssSizeProp, possibleAlternativeAlignCssPositionProp2, offsetVertically);
      }
    }
  }
  let properPosition = position;
  if (
    // space is not enough
    targetRect[position] < followerRect[propToCompare[position]] && // opposite position's space is larger
    targetRect[position] < targetRect[oppositionPositions[position]]
  ) {
    properPosition = oppositionPositions[position];
  }
  return {
    placement: properAlign !== "center" ? `${properPosition}-${properAlign}` : properPosition,
    left: properOffset.left,
    top: properOffset.top
  };
}
function getProperTransformOrigin(placement, overlap) {
  if (overlap)
    return overlapTransformOrigin[placement];
  return transformOrigins[placement];
}
function getOffset(placement, offsetRect, targetRect, offsetTopToStandardPlacement, offsetLeftToStandardPlacement, overlap) {
  if (overlap) {
    switch (placement) {
      case "bottom-start":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left)}px`,
          transform: "translateY(-100%)"
        };
      case "bottom-end":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
          transform: "translateX(-100%) translateY(-100%)"
        };
      case "top-start":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left)}px`,
          transform: ""
        };
      case "top-end":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
          transform: "translateX(-100%)"
        };
      case "right-start":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
          transform: "translateX(-100%)"
        };
      case "right-end":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
          transform: "translateX(-100%) translateY(-100%)"
        };
      case "left-start":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left)}px`,
          transform: ""
        };
      case "left-end":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left)}px`,
          transform: "translateY(-100%)"
        };
      case "top":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
          transform: "translateX(-50%)"
        };
      case "right":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
          transform: "translateX(-100%) translateY(-50%)"
        };
      case "left":
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left)}px`,
          transform: "translateY(-50%)"
        };
      case "bottom":
      default:
        return {
          top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
          left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
          transform: "translateX(-50%) translateY(-100%)"
        };
    }
  }
  switch (placement) {
    case "bottom-start":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        transform: ""
      };
    case "bottom-end":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        transform: "translateX(-100%)"
      };
    case "top-start":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        transform: "translateY(-100%)"
      };
    case "top-end":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        transform: "translateX(-100%) translateY(-100%)"
      };
    case "right-start":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        transform: ""
      };
    case "right-end":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        transform: "translateY(-100%)"
      };
    case "left-start":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        transform: "translateX(-100%)"
      };
    case "left-end":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        transform: "translateX(-100%) translateY(-100%)"
      };
    case "top":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2 + offsetLeftToStandardPlacement)}px`,
        transform: "translateY(-100%) translateX(-50%)"
      };
    case "right":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2 + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width + offsetLeftToStandardPlacement)}px`,
        transform: "translateY(-50%)"
      };
    case "left":
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2 + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
        transform: "translateY(-50%) translateX(-100%)"
      };
    case "bottom":
    default:
      return {
        top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height + offsetTopToStandardPlacement)}px`,
        left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2 + offsetLeftToStandardPlacement)}px`,
        transform: "translateX(-50%)"
      };
  }
}
const style$3 = c([
  c(".v-binder-follower-container", {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0",
    pointerEvents: "none",
    zIndex: "auto"
  }),
  c(".v-binder-follower-content", {
    position: "absolute",
    zIndex: "auto"
  }, [
    c("> *", {
      pointerEvents: "all"
    })
  ])
]);
const VFollower = defineComponent({
  name: "Follower",
  inheritAttrs: false,
  props: {
    show: Boolean,
    enabled: {
      type: Boolean,
      default: void 0
    },
    placement: {
      type: String,
      default: "bottom"
    },
    syncTrigger: {
      type: Array,
      default: ["resize", "scroll"]
    },
    to: [String, Object],
    flip: {
      type: Boolean,
      default: true
    },
    internalShift: Boolean,
    x: Number,
    y: Number,
    width: String,
    minWidth: String,
    containerClass: String,
    teleportDisabled: Boolean,
    zindexable: {
      type: Boolean,
      default: true
    },
    zIndex: Number,
    overlap: Boolean
  },
  setup(props) {
    const VBinder = inject("VBinder");
    const mergedEnabledRef = useMemo(() => {
      return props.enabled !== void 0 ? props.enabled : props.show;
    });
    const followerRef = ref(null);
    const offsetContainerRef = ref(null);
    const ensureListeners = () => {
      const { syncTrigger } = props;
      if (syncTrigger.includes("scroll")) {
        VBinder.addScrollListener(syncPosition);
      }
      if (syncTrigger.includes("resize")) {
        VBinder.addResizeListener(syncPosition);
      }
    };
    const removeListeners = () => {
      VBinder.removeScrollListener(syncPosition);
      VBinder.removeResizeListener(syncPosition);
    };
    const ssrAdapter = useSsrAdapter();
    style$3.mount({
      id: "vueuc/binder",
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      ssr: ssrAdapter
    });
    onFontsReady(() => {
      if (mergedEnabledRef.value) {
        syncPosition();
      }
    });
    const syncPosition = () => {
      if (!mergedEnabledRef.value) {
        return;
      }
      const follower = followerRef.value;
      if (follower === null)
        return;
      const target = VBinder.targetRef;
      const { x, y, overlap } = props;
      const targetRect = x !== void 0 && y !== void 0 ? getPointRect(x, y) : getRect(target);
      follower.style.setProperty("--v-target-width", `${Math.round(targetRect.width)}px`);
      follower.style.setProperty("--v-target-height", `${Math.round(targetRect.height)}px`);
      const { width, minWidth, placement, internalShift, flip } = props;
      follower.setAttribute("v-placement", placement);
      if (overlap) {
        follower.setAttribute("v-overlap", "");
      } else {
        follower.removeAttribute("v-overlap");
      }
      const { style: style2 } = follower;
      if (width === "target") {
        style2.width = `${targetRect.width}px`;
      } else if (width !== void 0) {
        style2.width = width;
      } else {
        style2.width = "";
      }
      if (minWidth === "target") {
        style2.minWidth = `${targetRect.width}px`;
      } else if (minWidth !== void 0) {
        style2.minWidth = minWidth;
      } else {
        style2.minWidth = "";
      }
      const followerRect = getRect(follower);
      const offsetContainerRect = getRect(offsetContainerRef.value);
      const { left: offsetLeftToStandardPlacement, top: offsetTopToStandardPlacement, placement: properPlacement } = getPlacementAndOffsetOfFollower(placement, targetRect, followerRect, internalShift, flip, overlap);
      const properTransformOrigin = getProperTransformOrigin(properPlacement, overlap);
      const { left, top, transform } = getOffset(properPlacement, offsetContainerRect, targetRect, offsetTopToStandardPlacement, offsetLeftToStandardPlacement, overlap);
      follower.setAttribute("v-placement", properPlacement);
      follower.style.setProperty("--v-offset-left", `${Math.round(offsetLeftToStandardPlacement)}px`);
      follower.style.setProperty("--v-offset-top", `${Math.round(offsetTopToStandardPlacement)}px`);
      follower.style.transform = `translateX(${left}) translateY(${top}) ${transform}`;
      follower.style.setProperty("--v-transform-origin", properTransformOrigin);
      follower.style.transformOrigin = properTransformOrigin;
    };
    watch(mergedEnabledRef, (value) => {
      if (value) {
        ensureListeners();
        syncOnNextTick();
      } else {
        removeListeners();
      }
    });
    const syncOnNextTick = () => {
      nextTick().then(syncPosition).catch((e) => console.error(e));
    };
    [
      "placement",
      "x",
      "y",
      "internalShift",
      "flip",
      "width",
      "overlap",
      "minWidth"
    ].forEach((prop) => {
      watch(toRef(props, prop), syncPosition);
    });
    ["teleportDisabled"].forEach((prop) => {
      watch(toRef(props, prop), syncOnNextTick);
    });
    watch(toRef(props, "syncTrigger"), (value) => {
      if (!value.includes("resize")) {
        VBinder.removeResizeListener(syncPosition);
      } else {
        VBinder.addResizeListener(syncPosition);
      }
      if (!value.includes("scroll")) {
        VBinder.removeScrollListener(syncPosition);
      } else {
        VBinder.addScrollListener(syncPosition);
      }
    });
    const isMountedRef = useIsMounted();
    const mergedToRef = useMemo(() => {
      const { to } = props;
      if (to !== void 0)
        return to;
      if (isMountedRef.value) {
        return void 0;
      }
      return void 0;
    });
    return {
      VBinder,
      mergedEnabled: mergedEnabledRef,
      offsetContainerRef,
      followerRef,
      mergedTo: mergedToRef,
      syncPosition
    };
  },
  render() {
    return h(LazyTeleport, {
      show: this.show,
      to: this.mergedTo,
      disabled: this.teleportDisabled
    }, {
      default: () => {
        var _a, _b;
        const vNode = h("div", {
          class: ["v-binder-follower-container", this.containerClass],
          ref: "offsetContainerRef"
        }, [
          h("div", {
            class: "v-binder-follower-content",
            ref: "followerRef"
          }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a))
        ]);
        if (this.zindexable) {
          return withDirectives(vNode, [
            [
              zindexable,
              {
                enabled: this.mergedEnabled,
                zIndex: this.zIndex
              }
            ]
          ]);
        }
        return vNode;
      }
    });
  }
});
const pureNumberRegex = /^(\d|\.)+$/;
const numberRegex = /(\d|\.)+/;
function formatLength(length, {
  c: c2 = 1,
  offset = 0,
  attachPx = true
} = {}) {
  if (typeof length === "number") {
    const result = (length + offset) * c2;
    if (result === 0) return "0";
    return `${result}px`;
  } else if (typeof length === "string") {
    if (pureNumberRegex.test(length)) {
      const result = (Number(length) + offset) * c2;
      if (attachPx) {
        if (result === 0) return "0";
        return `${result}px`;
      } else {
        return `${result}`;
      }
    } else {
      const result = numberRegex.exec(length);
      if (!result) return length;
      return length.replace(numberRegex, String((Number(result[0]) + offset) * c2));
    }
  }
  return length;
}
let _isJsdom;
function isJsdom() {
  if (_isJsdom === void 0) {
    _isJsdom = (void 0).userAgent.includes("Node.js") || (void 0).userAgent.includes("jsdom");
  }
  return _isJsdom;
}
function createRefSetter(ref2) {
  return (inst) => {
    if (inst) {
      ref2.value = inst.$el;
    } else {
      ref2.value = null;
    }
  };
}
const ChevronRightIcon = defineComponent({
  name: "ChevronRight",
  render() {
    return h("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, h("path", {
      d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",
      fill: "currentColor"
    }));
  }
});
const base = {
  neutralBase: "#000",
  neutralInvertBase: "#fff",
  neutralTextBase: "#fff",
  neutralPopover: "rgb(72, 72, 78)",
  neutralCard: "rgb(24, 24, 28)",
  neutralModal: "rgb(44, 44, 50)",
  neutralBody: "rgb(16, 16, 20)",
  alpha1: "0.9",
  alpha2: "0.82",
  alpha3: "0.52",
  alpha4: "0.38",
  alpha5: "0.28",
  alphaClose: "0.52",
  alphaDisabled: "0.38",
  alphaDisabledInput: "0.06",
  alphaPending: "0.09",
  alphaTablePending: "0.06",
  alphaTableStriped: "0.05",
  alphaPressed: "0.05",
  alphaAvatar: "0.18",
  alphaRail: "0.2",
  alphaProgressRail: "0.12",
  alphaBorder: "0.24",
  alphaDivider: "0.09",
  alphaInput: "0.1",
  alphaAction: "0.06",
  alphaTab: "0.04",
  alphaScrollbar: "0.2",
  alphaScrollbarHover: "0.3",
  alphaCode: "0.12",
  alphaTag: "0.2",
  // primary
  primaryHover: "#7fe7c4",
  primaryDefault: "#63e2b7",
  primaryActive: "#5acea7",
  primarySuppl: "rgb(42, 148, 125)",
  // info
  infoHover: "#8acbec",
  infoDefault: "#70c0e8",
  infoActive: "#66afd3",
  infoSuppl: "rgb(56, 137, 197)",
  // error
  errorHover: "#e98b8b",
  errorDefault: "#e88080",
  errorActive: "#e57272",
  errorSuppl: "rgb(208, 58, 82)",
  // warning
  warningHover: "#f5d599",
  warningDefault: "#f2c97d",
  warningActive: "#e6c260",
  warningSuppl: "rgb(240, 138, 0)",
  // success
  successHover: "#7fe7c4",
  successDefault: "#63e2b7",
  successActive: "#5acea7",
  successSuppl: "rgb(42, 148, 125)"
};
const baseBackgroundRgb = rgba(base.neutralBase);
const baseInvertBackgroundRgb = rgba(base.neutralInvertBase);
const overlayPrefix = `rgba(${baseInvertBackgroundRgb.slice(0, 3).join(", ")}, `;
function overlay(alpha) {
  return `${overlayPrefix + String(alpha)})`;
}
function neutral(alpha) {
  const overlayRgba = Array.from(baseInvertBackgroundRgb);
  overlayRgba[3] = Number(alpha);
  return composite(baseBackgroundRgb, overlayRgba);
}
const derived = Object.assign(Object.assign({
  name: "common"
}, commonVariables$k), {
  baseColor: base.neutralBase,
  // primary color
  primaryColor: base.primaryDefault,
  primaryColorHover: base.primaryHover,
  primaryColorPressed: base.primaryActive,
  primaryColorSuppl: base.primarySuppl,
  // info color
  infoColor: base.infoDefault,
  infoColorHover: base.infoHover,
  infoColorPressed: base.infoActive,
  infoColorSuppl: base.infoSuppl,
  // success color
  successColor: base.successDefault,
  successColorHover: base.successHover,
  successColorPressed: base.successActive,
  successColorSuppl: base.successSuppl,
  // warning color
  warningColor: base.warningDefault,
  warningColorHover: base.warningHover,
  warningColorPressed: base.warningActive,
  warningColorSuppl: base.warningSuppl,
  // error color
  errorColor: base.errorDefault,
  errorColorHover: base.errorHover,
  errorColorPressed: base.errorActive,
  errorColorSuppl: base.errorSuppl,
  // text color
  textColorBase: base.neutralTextBase,
  textColor1: overlay(base.alpha1),
  textColor2: overlay(base.alpha2),
  textColor3: overlay(base.alpha3),
  // textColor4: overlay(base.alpha4), // disabled, placeholder, icon
  // textColor5: overlay(base.alpha5),
  textColorDisabled: overlay(base.alpha4),
  placeholderColor: overlay(base.alpha4),
  placeholderColorDisabled: overlay(base.alpha5),
  iconColor: overlay(base.alpha4),
  iconColorDisabled: overlay(base.alpha5),
  iconColorHover: overlay(Number(base.alpha4) * 1.25),
  iconColorPressed: overlay(Number(base.alpha4) * 0.8),
  opacity1: base.alpha1,
  opacity2: base.alpha2,
  opacity3: base.alpha3,
  opacity4: base.alpha4,
  opacity5: base.alpha5,
  dividerColor: overlay(base.alphaDivider),
  borderColor: overlay(base.alphaBorder),
  // close
  closeIconColorHover: overlay(Number(base.alphaClose)),
  closeIconColor: overlay(Number(base.alphaClose)),
  closeIconColorPressed: overlay(Number(base.alphaClose)),
  closeColorHover: "rgba(255, 255, 255, .12)",
  closeColorPressed: "rgba(255, 255, 255, .08)",
  // clear
  clearColor: overlay(base.alpha4),
  clearColorHover: scaleColor(overlay(base.alpha4), {
    alpha: 1.25
  }),
  clearColorPressed: scaleColor(overlay(base.alpha4), {
    alpha: 0.8
  }),
  scrollbarColor: overlay(base.alphaScrollbar),
  scrollbarColorHover: overlay(base.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: overlay(base.alphaProgressRail),
  railColor: overlay(base.alphaRail),
  popoverColor: base.neutralPopover,
  tableColor: base.neutralCard,
  cardColor: base.neutralCard,
  modalColor: base.neutralModal,
  bodyColor: base.neutralBody,
  tagColor: neutral(base.alphaTag),
  avatarColor: overlay(base.alphaAvatar),
  invertedColor: base.neutralBase,
  inputColor: overlay(base.alphaInput),
  codeColor: overlay(base.alphaCode),
  tabColor: overlay(base.alphaTab),
  actionColor: overlay(base.alphaAction),
  tableHeaderColor: overlay(base.alphaAction),
  hoverColor: overlay(base.alphaPending),
  tableColorHover: overlay(base.alphaTablePending),
  tableColorStriped: overlay(base.alphaTableStriped),
  pressedColor: overlay(base.alphaPressed),
  opacityDisabled: base.alphaDisabled,
  inputColorDisabled: overlay(base.alphaDisabledInput),
  buttonColor2: "rgba(255, 255, 255, .08)",
  buttonColor2Hover: "rgba(255, 255, 255, .12)",
  buttonColor2Pressed: "rgba(255, 255, 255, .08)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
});
const scrollbarDark = {
  name: "Scrollbar",
  common: derived,
  self: self$J
};
const commonVars$a = {
  iconSizeTiny: "28px",
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
};
function self$I(vars) {
  const {
    textColorDisabled,
    iconColor,
    textColor2,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge
  } = vars;
  return Object.assign(Object.assign({}, commonVars$a), {
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    textColor: textColorDisabled,
    iconColor,
    extraTextColor: textColor2
  });
}
const emptyLight = {
  name: "Empty",
  common: derived$1,
  self: self$I
};
const emptyDark = {
  name: "Empty",
  common: derived,
  self: self$I
};
const commonVariables$j = {
  height: "calc(var(--n-option-height) * 7.6)",
  paddingTiny: "4px 0",
  paddingSmall: "4px 0",
  paddingMedium: "4px 0",
  paddingLarge: "4px 0",
  paddingHuge: "4px 0",
  optionPaddingTiny: "0 12px",
  optionPaddingSmall: "0 12px",
  optionPaddingMedium: "0 12px",
  optionPaddingLarge: "0 12px",
  optionPaddingHuge: "0 12px",
  loadingSize: "18px"
};
function self$H(vars) {
  const {
    borderRadius,
    popoverColor,
    textColor3,
    dividerColor,
    textColor2,
    primaryColorPressed,
    textColorDisabled,
    primaryColor,
    opacityDisabled,
    hoverColor,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$j), {
    optionFontSizeTiny: fontSizeTiny,
    optionFontSizeSmall: fontSizeSmall,
    optionFontSizeMedium: fontSizeMedium,
    optionFontSizeLarge: fontSizeLarge,
    optionFontSizeHuge: fontSizeHuge,
    optionHeightTiny: heightTiny,
    optionHeightSmall: heightSmall,
    optionHeightMedium: heightMedium,
    optionHeightLarge: heightLarge,
    optionHeightHuge: heightHuge,
    borderRadius,
    color: popoverColor,
    groupHeaderTextColor: textColor3,
    actionDividerColor: dividerColor,
    optionTextColor: textColor2,
    optionTextColorPressed: primaryColorPressed,
    optionTextColorDisabled: textColorDisabled,
    optionTextColorActive: primaryColor,
    optionOpacityDisabled: opacityDisabled,
    optionCheckColor: primaryColor,
    optionColorPending: hoverColor,
    optionColorActive: "rgba(0, 0, 0, 0)",
    optionColorActivePending: hoverColor,
    actionTextColor: textColor2,
    loadingColor: primaryColor
  });
}
const internalSelectMenuDark = {
  name: "InternalSelectMenu",
  common: derived,
  peers: {
    Scrollbar: scrollbarDark,
    Empty: emptyDark
  },
  self: self$H
};
const commonVariables$i = {
  space: "6px",
  spaceArrow: "10px",
  arrowOffset: "10px",
  arrowOffsetVertical: "10px",
  arrowHeight: "6px",
  padding: "8px 14px"
};
function self$G(vars) {
  const {
    boxShadow2,
    popoverColor,
    textColor2,
    borderRadius,
    fontSize,
    dividerColor
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$i), {
    fontSize,
    borderRadius,
    color: popoverColor,
    dividerColor,
    textColor: textColor2,
    boxShadow: boxShadow2
  });
}
const popoverLight = {
  name: "Popover",
  common: derived$1,
  self: self$G
};
const popoverDark = {
  name: "Popover",
  common: derived,
  self: self$G
};
const oppositePlacement = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
const arrowSize = "var(--n-arrow-height) * 1.414";
const style$2 = c$1([cB("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [c$1(">", [cB("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), cNotM("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [cNotM("scrollable", [cNotM("show-header-or-footer", "padding: var(--n-padding);")])]), cE("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), cE("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), cM("scrollable, show-header-or-footer", [cE("content", `
 padding: var(--n-padding);
 `)])]), cB("popover-shared", `
 transform-origin: inherit;
 `, [
  cB("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [cB("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${arrowSize});
 height: calc(${arrowSize});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),
  // body transition
  c$1("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
  c$1("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
  c$1("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
  c$1("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)
]), placementStyle("top-start", `
 top: calc(${arrowSize} / -2);
 left: calc(${getArrowOffset("top-start")} - var(--v-offset-left));
 `), placementStyle("top", `
 top: calc(${arrowSize} / -2);
 transform: translateX(calc(${arrowSize} / -2)) rotate(45deg);
 left: 50%;
 `), placementStyle("top-end", `
 top: calc(${arrowSize} / -2);
 right: calc(${getArrowOffset("top-end")} + var(--v-offset-left));
 `), placementStyle("bottom-start", `
 bottom: calc(${arrowSize} / -2);
 left: calc(${getArrowOffset("bottom-start")} - var(--v-offset-left));
 `), placementStyle("bottom", `
 bottom: calc(${arrowSize} / -2);
 transform: translateX(calc(${arrowSize} / -2)) rotate(45deg);
 left: 50%;
 `), placementStyle("bottom-end", `
 bottom: calc(${arrowSize} / -2);
 right: calc(${getArrowOffset("bottom-end")} + var(--v-offset-left));
 `), placementStyle("left-start", `
 left: calc(${arrowSize} / -2);
 top: calc(${getArrowOffset("left-start")} - var(--v-offset-top));
 `), placementStyle("left", `
 left: calc(${arrowSize} / -2);
 transform: translateY(calc(${arrowSize} / -2)) rotate(45deg);
 top: 50%;
 `), placementStyle("left-end", `
 left: calc(${arrowSize} / -2);
 bottom: calc(${getArrowOffset("left-end")} + var(--v-offset-top));
 `), placementStyle("right-start", `
 right: calc(${arrowSize} / -2);
 top: calc(${getArrowOffset("right-start")} - var(--v-offset-top));
 `), placementStyle("right", `
 right: calc(${arrowSize} / -2);
 transform: translateY(calc(${arrowSize} / -2)) rotate(45deg);
 top: 50%;
 `), placementStyle("right-end", `
 right: calc(${arrowSize} / -2);
 bottom: calc(${getArrowOffset("right-end")} + var(--v-offset-top));
 `), ...map({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (placements, direction) => {
  const isVertical = ["right", "left"].includes(direction);
  const sizeType = isVertical ? "width" : "height";
  return placements.map((placement) => {
    const isReverse = placement.split("-")[1] === "end";
    const targetSize = `var(--v-target-${sizeType}, 0px)`;
    const centerOffset = `calc((${targetSize} - ${arrowSize}) / 2)`;
    const offset = getArrowOffset(placement);
    return c$1(`[v-placement="${placement}"] >`, [cB("popover-shared", [cM("center-arrow", [cB("popover-arrow", `${direction}: calc(max(${centerOffset}, ${offset}) ${isReverse ? "+" : "-"} var(--v-offset-${isVertical ? "left" : "top"}));`)])])]);
  });
})]);
function getArrowOffset(placement) {
  return ["top", "bottom"].includes(placement.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function placementStyle(placement, arrowStyleLiteral) {
  const position = placement.split("-")[0];
  const sizeStyle = ["top", "bottom"].includes(position) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return c$1(`[v-placement="${placement}"] >`, [cB("popover-shared", `
 margin-${oppositePlacement[position]}: var(--n-space);
 `, [cM("show-arrow", `
 margin-${oppositePlacement[position]}: var(--n-space-arrow);
 `), cM("overlap", `
 margin: 0;
 `), cCB("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${position}: 100%;
 ${oppositePlacement[position]}: auto;
 ${sizeStyle}
 `, [cB("popover-arrow", arrowStyleLiteral)])])]);
}
const popoverBodyProps = Object.assign(Object.assign({}, useTheme.props), {
  to: useAdjustedTo.propTo,
  show: Boolean,
  trigger: String,
  showArrow: Boolean,
  delay: Number,
  duration: Number,
  raw: Boolean,
  arrowPointToCenter: Boolean,
  arrowClass: String,
  arrowStyle: [String, Object],
  arrowWrapperClass: String,
  arrowWrapperStyle: [String, Object],
  displayDirective: String,
  x: Number,
  y: Number,
  flip: Boolean,
  overlap: Boolean,
  placement: String,
  width: [Number, String],
  keepAliveOnHover: Boolean,
  scrollable: Boolean,
  contentClass: String,
  contentStyle: [Object, String],
  headerClass: String,
  headerStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  // private
  internalDeactivateImmediately: Boolean,
  animated: Boolean,
  onClickoutside: Function,
  internalTrapFocus: Boolean,
  internalOnAfterLeave: Function,
  // deprecated
  minWidth: Number,
  maxWidth: Number
});
function renderArrow({
  arrowClass,
  arrowStyle,
  arrowWrapperClass,
  arrowWrapperStyle,
  clsPrefix
}) {
  return h("div", {
    key: "__popover-arrow__",
    style: arrowWrapperStyle,
    class: [`${clsPrefix}-popover-arrow-wrapper`, arrowWrapperClass]
  }, h("div", {
    class: [`${clsPrefix}-popover-arrow`, arrowClass],
    style: arrowStyle
  }));
}
const NPopoverBody = defineComponent({
  name: "PopoverBody",
  inheritAttrs: false,
  props: popoverBodyProps,
  setup(props, {
    slots,
    attrs
  }) {
    const {
      namespaceRef,
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme("Popover", "-popover", style$2, popoverLight, props, mergedClsPrefixRef);
    const followerRef = ref(null);
    const NPopover2 = inject("NPopover");
    const bodyRef = ref(null);
    const followerEnabledRef = ref(props.show);
    const displayedRef = ref(false);
    watchEffect(() => {
      const {
        show
      } = props;
      if (show && !isJsdom() && !props.internalDeactivateImmediately) {
        displayedRef.value = true;
      }
    });
    const directivesRef = computed(() => {
      const {
        trigger,
        onClickoutside
      } = props;
      const directives = [];
      const {
        positionManuallyRef: {
          value: positionManually
        }
      } = NPopover2;
      if (!positionManually) {
        if (trigger === "click" && !onClickoutside) {
          directives.push([clickoutside, handleClickOutside, void 0, {
            capture: true
          }]);
        }
        if (trigger === "hover") {
          directives.push([mousemoveoutside, handleMouseMoveOutside]);
        }
      }
      if (onClickoutside) {
        directives.push([clickoutside, handleClickOutside, void 0, {
          capture: true
        }]);
      }
      if (props.displayDirective === "show" || props.animated && displayedRef.value) {
        directives.push([vShow, props.show]);
      }
      return directives;
    });
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut,
          cubicBezierEaseIn,
          cubicBezierEaseOut
        },
        self: {
          space,
          spaceArrow,
          padding,
          fontSize,
          textColor,
          dividerColor,
          color,
          boxShadow,
          borderRadius,
          arrowHeight,
          arrowOffset,
          arrowOffsetVertical
        }
      } = themeRef.value;
      return {
        "--n-box-shadow": boxShadow,
        "--n-bezier": cubicBezierEaseInOut,
        "--n-bezier-ease-in": cubicBezierEaseIn,
        "--n-bezier-ease-out": cubicBezierEaseOut,
        "--n-font-size": fontSize,
        "--n-text-color": textColor,
        "--n-color": color,
        "--n-divider-color": dividerColor,
        "--n-border-radius": borderRadius,
        "--n-arrow-height": arrowHeight,
        "--n-arrow-offset": arrowOffset,
        "--n-arrow-offset-vertical": arrowOffsetVertical,
        "--n-padding": padding,
        "--n-space": space,
        "--n-space-arrow": spaceArrow
      };
    });
    const styleRef = computed(() => {
      const width = props.width === "trigger" ? void 0 : formatLength(props.width);
      const style2 = [];
      if (width) {
        style2.push({
          width
        });
      }
      const {
        maxWidth,
        minWidth
      } = props;
      if (maxWidth) {
        style2.push({
          maxWidth: formatLength(maxWidth)
        });
      }
      if (minWidth) {
        style2.push({
          maxWidth: formatLength(minWidth)
        });
      }
      if (!inlineThemeDisabled) {
        style2.push(cssVarsRef.value);
      }
      return style2;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("popover", void 0, cssVarsRef, props) : void 0;
    NPopover2.setBodyInstance({
      syncPosition
    });
    watch(toRef(props, "show"), (value) => {
      if (props.animated) return;
      if (value) {
        followerEnabledRef.value = true;
      } else {
        followerEnabledRef.value = false;
      }
    });
    function syncPosition() {
      var _a;
      (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    }
    function handleMouseEnter(e) {
      if (props.trigger === "hover" && props.keepAliveOnHover && props.show) {
        NPopover2.handleMouseEnter(e);
      }
    }
    function handleMouseLeave(e) {
      if (props.trigger === "hover" && props.keepAliveOnHover) {
        NPopover2.handleMouseLeave(e);
      }
    }
    function handleMouseMoveOutside(e) {
      if (props.trigger === "hover" && !getTriggerElement().contains(getPreciseEventTarget(e))) {
        NPopover2.handleMouseMoveOutside(e);
      }
    }
    function handleClickOutside(e) {
      if (props.trigger === "click" && !getTriggerElement().contains(getPreciseEventTarget(e)) || props.onClickoutside) {
        NPopover2.handleClickOutside(e);
      }
    }
    function getTriggerElement() {
      return NPopover2.getTriggerElement();
    }
    provide(popoverBodyInjectionKey, bodyRef);
    provide(drawerBodyInjectionKey, null);
    provide(modalBodyInjectionKey, null);
    function renderContentNode() {
      themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender();
      const shouldRenderDom = props.displayDirective === "show" || props.show || props.animated && displayedRef.value;
      if (!shouldRenderDom) {
        return null;
      }
      let contentNode;
      const renderBody = NPopover2.internalRenderBodyRef.value;
      const {
        value: mergedClsPrefix
      } = mergedClsPrefixRef;
      if (!renderBody) {
        const {
          value: extraClass
        } = NPopover2.extraClassRef;
        const {
          internalTrapFocus
        } = props;
        const hasHeaderOrFooter = !isSlotEmpty(slots.header) || !isSlotEmpty(slots.footer);
        const renderContentInnerNode = () => {
          var _a, _b;
          const body = hasHeaderOrFooter ? h(Fragment, null, resolveWrappedSlot(slots.header, (children) => {
            return children ? h("div", {
              class: [`${mergedClsPrefix}-popover__header`, props.headerClass],
              style: props.headerStyle
            }, children) : null;
          }), resolveWrappedSlot(slots.default, (children) => {
            return children ? h("div", {
              class: [`${mergedClsPrefix}-popover__content`, props.contentClass],
              style: props.contentStyle
            }, slots) : null;
          }), resolveWrappedSlot(slots.footer, (children) => {
            return children ? h("div", {
              class: [`${mergedClsPrefix}-popover__footer`, props.footerClass],
              style: props.footerStyle
            }, children) : null;
          })) : props.scrollable ? (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots) : h("div", {
            class: [`${mergedClsPrefix}-popover__content`, props.contentClass],
            style: props.contentStyle
          }, slots);
          const maybeScrollableBody = props.scrollable ? h(XScrollbar, {
            contentClass: hasHeaderOrFooter ? void 0 : `${mergedClsPrefix}-popover__content ${(_b = props.contentClass) !== null && _b !== void 0 ? _b : ""}`,
            contentStyle: hasHeaderOrFooter ? void 0 : props.contentStyle
          }, {
            default: () => body
          }) : body;
          const arrow = props.showArrow ? renderArrow({
            arrowClass: props.arrowClass,
            arrowStyle: props.arrowStyle,
            arrowWrapperClass: props.arrowWrapperClass,
            arrowWrapperStyle: props.arrowWrapperStyle,
            clsPrefix: mergedClsPrefix
          }) : null;
          return [maybeScrollableBody, arrow];
        };
        contentNode = h("div", mergeProps({
          class: [`${mergedClsPrefix}-popover`, `${mergedClsPrefix}-popover-shared`, themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value, extraClass.map((v) => `${mergedClsPrefix}-${v}`), {
            [`${mergedClsPrefix}-popover--scrollable`]: props.scrollable,
            [`${mergedClsPrefix}-popover--show-header-or-footer`]: hasHeaderOrFooter,
            [`${mergedClsPrefix}-popover--raw`]: props.raw,
            [`${mergedClsPrefix}-popover-shared--overlap`]: props.overlap,
            [`${mergedClsPrefix}-popover-shared--show-arrow`]: props.showArrow,
            [`${mergedClsPrefix}-popover-shared--center-arrow`]: props.arrowPointToCenter
          }],
          ref: bodyRef,
          style: styleRef.value,
          onKeydown: NPopover2.handleKeydown,
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave
        }, attrs), internalTrapFocus ? h(FocusTrap, {
          active: props.show,
          autoFocus: true
        }, {
          default: renderContentInnerNode
        }) : renderContentInnerNode());
      } else {
        contentNode = renderBody(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [`${mergedClsPrefix}-popover-shared`, themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value, props.overlap && `${mergedClsPrefix}-popover-shared--overlap`, props.showArrow && `${mergedClsPrefix}-popover-shared--show-arrow`, props.arrowPointToCenter && `${mergedClsPrefix}-popover-shared--center-arrow`],
          bodyRef,
          styleRef.value,
          handleMouseEnter,
          handleMouseLeave
        );
      }
      return withDirectives(contentNode, directivesRef.value);
    }
    return {
      displayed: displayedRef,
      namespace: namespaceRef,
      isMounted: NPopover2.isMountedRef,
      zIndex: NPopover2.zIndexRef,
      followerRef,
      adjustedTo: useAdjustedTo(props),
      followerEnabled: followerEnabledRef,
      renderContentNode
    };
  },
  render() {
    return h(VFollower, {
      ref: "followerRef",
      zIndex: this.zIndex,
      show: this.show,
      enabled: this.followerEnabled,
      to: this.adjustedTo,
      x: this.x,
      y: this.y,
      flip: this.flip,
      placement: this.placement,
      containerClass: this.namespace,
      overlap: this.overlap,
      width: this.width === "trigger" ? "target" : void 0,
      teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey
    }, {
      default: () => {
        return this.animated ? h(Transition, {
          name: "popover-transition",
          appear: this.isMounted,
          // Don't use watch to enable follower, since the transition may
          // make position sync timing very subtle and buggy.
          onEnter: () => {
            this.followerEnabled = true;
          },
          onAfterLeave: () => {
            var _a;
            (_a = this.internalOnAfterLeave) === null || _a === void 0 ? void 0 : _a.call(this);
            this.followerEnabled = false;
            this.displayed = false;
          }
        }, {
          default: this.renderContentNode
        }) : this.renderContentNode();
      }
    });
  }
});
const bodyPropKeys = Object.keys(popoverBodyProps);
const triggerEventMap = {
  focus: ["onFocus", "onBlur"],
  click: ["onClick"],
  hover: ["onMouseenter", "onMouseleave"],
  manual: [],
  nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
};
function appendEvents(vNode, trigger, events) {
  triggerEventMap[trigger].forEach((eventName) => {
    if (!vNode.props) {
      vNode.props = {};
    } else {
      vNode.props = Object.assign({}, vNode.props);
    }
    const originalHandler = vNode.props[eventName];
    const handler = events[eventName];
    if (!originalHandler) {
      vNode.props[eventName] = handler;
    } else {
      vNode.props[eventName] = (...args) => {
        originalHandler(...args);
        handler(...args);
      };
    }
  });
}
const popoverBaseProps = {
  show: {
    type: Boolean,
    default: void 0
  },
  defaultShow: Boolean,
  showArrow: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String,
    default: "hover"
  },
  delay: {
    type: Number,
    default: 100
  },
  duration: {
    type: Number,
    default: 100
  },
  raw: Boolean,
  placement: {
    type: String,
    default: "top"
  },
  x: Number,
  y: Number,
  arrowPointToCenter: Boolean,
  disabled: Boolean,
  getDisabled: Function,
  displayDirective: {
    type: String,
    default: "if"
  },
  arrowClass: String,
  arrowStyle: [String, Object],
  arrowWrapperClass: String,
  arrowWrapperStyle: [String, Object],
  flip: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  },
  width: {
    type: [Number, String],
    default: void 0
  },
  overlap: Boolean,
  keepAliveOnHover: {
    type: Boolean,
    default: true
  },
  zIndex: Number,
  to: useAdjustedTo.propTo,
  scrollable: Boolean,
  contentClass: String,
  contentStyle: [Object, String],
  headerClass: String,
  headerStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  // events
  onClickoutside: Function,
  "onUpdate:show": [Function, Array],
  onUpdateShow: [Function, Array],
  // internal
  internalDeactivateImmediately: Boolean,
  internalSyncTargetWithParent: Boolean,
  internalInheritedEventHandlers: {
    type: Array,
    default: () => []
  },
  internalTrapFocus: Boolean,
  internalExtraClass: {
    type: Array,
    default: () => []
  },
  // deprecated
  onShow: [Function, Array],
  onHide: [Function, Array],
  arrow: {
    type: Boolean,
    default: void 0
  },
  minWidth: Number,
  maxWidth: Number
};
const popoverProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), popoverBaseProps), {
  internalOnAfterLeave: Function,
  internalRenderBody: Function
});
const NPopover = defineComponent({
  name: "Popover",
  inheritAttrs: false,
  props: popoverProps,
  slots: Object,
  __popover__: true,
  setup(props) {
    if (process.env.NODE_ENV !== "production") {
      watchEffect(() => {
        if (props.maxWidth !== void 0) {
          warnOnce("popover", "`max-width` is deprecated, please use `style` instead.");
        }
        if (props.minWidth !== void 0) {
          warnOnce("popover", "`min-width` is deprecated, please use `style` instead.");
        }
        if (props.arrow !== void 0) {
          warnOnce("popover", "`arrow` is deprecated, please use `showArrow` instead.");
        }
        if (props.onHide !== void 0) {
          warnOnce("popover", "`on-hide` is deprecated, please use `on-update:show` instead.");
        }
        if (props.onShow !== void 0) {
          warnOnce("popover", "`on-show` is deprecated, please use `on-update:show` instead.");
        }
      });
    }
    const isMountedRef = useIsMounted();
    const binderInstRef = ref(null);
    const controlledShowRef = computed(() => props.show);
    const uncontrolledShowRef = ref(props.defaultShow);
    const mergedShowWithoutDisabledRef = useMergedState(controlledShowRef, uncontrolledShowRef);
    const mergedShowConsideringDisabledPropRef = useMemo(() => {
      if (props.disabled) return false;
      return mergedShowWithoutDisabledRef.value;
    });
    const getMergedDisabled = () => {
      if (props.disabled) return true;
      const {
        getDisabled
      } = props;
      if (getDisabled === null || getDisabled === void 0 ? void 0 : getDisabled()) return true;
      return false;
    };
    const getMergedShow = () => {
      if (getMergedDisabled()) return false;
      return mergedShowWithoutDisabledRef.value;
    };
    const compatibleShowArrowRef = useCompitable(props, ["arrow", "showArrow"]);
    const mergedShowArrowRef = computed(() => {
      if (props.overlap) return false;
      return compatibleShowArrowRef.value;
    });
    let bodyInstance = null;
    const showTimerIdRef = ref(null);
    const hideTimerIdRef = ref(null);
    const positionManuallyRef = useMemo(() => {
      return props.x !== void 0 && props.y !== void 0;
    });
    function doUpdateShow(value) {
      const {
        "onUpdate:show": _onUpdateShow,
        onUpdateShow,
        onShow,
        onHide
      } = props;
      uncontrolledShowRef.value = value;
      if (_onUpdateShow) {
        call(_onUpdateShow, value);
      }
      if (onUpdateShow) {
        call(onUpdateShow, value);
      }
      if (value && onShow) {
        call(onShow, true);
      }
      if (value && onHide) {
        call(onHide, false);
      }
    }
    function syncPosition() {
      if (bodyInstance) {
        bodyInstance.syncPosition();
      }
    }
    function clearShowTimer() {
      const {
        value: showTimerId
      } = showTimerIdRef;
      if (showTimerId) {
        (void 0).clearTimeout(showTimerId);
        showTimerIdRef.value = null;
      }
    }
    function clearHideTimer() {
      const {
        value: hideTimerId
      } = hideTimerIdRef;
      if (hideTimerId) {
        (void 0).clearTimeout(hideTimerId);
        hideTimerIdRef.value = null;
      }
    }
    function handleFocus() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === "focus" && !mergedDisabled) {
        if (getMergedShow()) return;
        doUpdateShow(true);
      }
    }
    function handleBlur() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === "focus" && !mergedDisabled) {
        if (!getMergedShow()) return;
        doUpdateShow(false);
      }
    }
    function handleMouseEnter() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === "hover" && !mergedDisabled) {
        clearHideTimer();
        if (showTimerIdRef.value !== null) return;
        if (getMergedShow()) return;
        const delayCallback = () => {
          doUpdateShow(true);
          showTimerIdRef.value = null;
        };
        const {
          delay
        } = props;
        if (delay === 0) {
          delayCallback();
        } else {
          showTimerIdRef.value = (void 0).setTimeout(delayCallback, delay);
        }
      }
    }
    function handleMouseLeave() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === "hover" && !mergedDisabled) {
        clearShowTimer();
        if (hideTimerIdRef.value !== null) return;
        if (!getMergedShow()) return;
        const delayedCallback = () => {
          doUpdateShow(false);
          hideTimerIdRef.value = null;
        };
        const {
          duration
        } = props;
        if (duration === 0) {
          delayedCallback();
        } else {
          hideTimerIdRef.value = (void 0).setTimeout(delayedCallback, duration);
        }
      }
    }
    function handleMouseMoveOutside() {
      handleMouseLeave();
    }
    function handleClickOutside(e) {
      var _a;
      if (!getMergedShow()) return;
      if (props.trigger === "click") {
        clearShowTimer();
        clearHideTimer();
        doUpdateShow(false);
      }
      (_a = props.onClickoutside) === null || _a === void 0 ? void 0 : _a.call(props, e);
    }
    function handleClick() {
      if (props.trigger === "click" && !getMergedDisabled()) {
        clearShowTimer();
        clearHideTimer();
        const nextShow = !getMergedShow();
        doUpdateShow(nextShow);
      }
    }
    function handleKeydown(e) {
      if (!props.internalTrapFocus) return;
      if (e.key === "Escape") {
        clearShowTimer();
        clearHideTimer();
        doUpdateShow(false);
      }
    }
    function setShow(value) {
      uncontrolledShowRef.value = value;
    }
    function getTriggerElement() {
      var _a;
      return (_a = binderInstRef.value) === null || _a === void 0 ? void 0 : _a.targetRef;
    }
    function setBodyInstance(value) {
      bodyInstance = value;
    }
    provide("NPopover", {
      getTriggerElement,
      handleKeydown,
      handleMouseEnter,
      handleMouseLeave,
      handleClickOutside,
      handleMouseMoveOutside,
      setBodyInstance,
      positionManuallyRef,
      isMountedRef,
      zIndexRef: toRef(props, "zIndex"),
      extraClassRef: toRef(props, "internalExtraClass"),
      internalRenderBodyRef: toRef(props, "internalRenderBody")
    });
    watchEffect(() => {
      if (mergedShowWithoutDisabledRef.value && getMergedDisabled()) {
        doUpdateShow(false);
      }
    });
    const returned = {
      binderInstRef,
      positionManually: positionManuallyRef,
      mergedShowConsideringDisabledProp: mergedShowConsideringDisabledPropRef,
      // if to show popover body
      uncontrolledShow: uncontrolledShowRef,
      mergedShowArrow: mergedShowArrowRef,
      getMergedShow,
      setShow,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      syncPosition
    };
    return returned;
  },
  render() {
    var _a;
    const {
      positionManually,
      $slots: slots
    } = this;
    let triggerVNode;
    let popoverInside = false;
    if (!positionManually) {
      triggerVNode = getFirstSlotVNode(slots, "trigger");
      if (triggerVNode) {
        triggerVNode = cloneVNode(triggerVNode);
        triggerVNode = triggerVNode.type === Text ? h("span", [triggerVNode]) : triggerVNode;
        const handlers = {
          onClick: this.handleClick,
          onMouseenter: this.handleMouseEnter,
          onMouseleave: this.handleMouseLeave,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        };
        if ((_a = triggerVNode.type) === null || _a === void 0 ? void 0 : _a.__popover__) {
          popoverInside = true;
          if (!triggerVNode.props) {
            triggerVNode.props = {
              internalSyncTargetWithParent: true,
              internalInheritedEventHandlers: []
            };
          }
          triggerVNode.props.internalSyncTargetWithParent = true;
          if (!triggerVNode.props.internalInheritedEventHandlers) {
            triggerVNode.props.internalInheritedEventHandlers = [handlers];
          } else {
            triggerVNode.props.internalInheritedEventHandlers = [handlers, ...triggerVNode.props.internalInheritedEventHandlers];
          }
        } else {
          const {
            internalInheritedEventHandlers
          } = this;
          const ascendantAndCurrentHandlers = [handlers, ...internalInheritedEventHandlers];
          const mergedHandlers = {
            onBlur: (e) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onBlur(e);
              });
            },
            onFocus: (e) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onFocus(e);
              });
            },
            onClick: (e) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onClick(e);
              });
            },
            onMouseenter: (e) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onMouseenter(e);
              });
            },
            onMouseleave: (e) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onMouseleave(e);
              });
            }
          };
          appendEvents(triggerVNode, internalInheritedEventHandlers ? "nested" : positionManually ? "manual" : this.trigger, mergedHandlers);
        }
      }
    }
    return h(Binder, {
      ref: "binderInstRef",
      syncTarget: !popoverInside,
      syncTargetWithParent: this.internalSyncTargetWithParent
    }, {
      default: () => {
        void this.mergedShowConsideringDisabledProp;
        const mergedShow = this.getMergedShow();
        return [this.internalTrapFocus && mergedShow ? withDirectives(h("div", {
          style: {
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }), [[zindexable, {
          enabled: mergedShow,
          zIndex: this.zIndex
        }]]) : null, positionManually ? null : h(VTarget, null, {
          default: () => triggerVNode
        }), h(NPopoverBody, keep(this.$props, bodyPropKeys, Object.assign(Object.assign({}, this.$attrs), {
          showArrow: this.mergedShowArrow,
          show: mergedShow
        })), {
          default: () => {
            var _a2, _b;
            return (_b = (_a2 = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a2);
          },
          header: () => {
            var _a2, _b;
            return (_b = (_a2 = this.$slots).header) === null || _b === void 0 ? void 0 : _b.call(_a2);
          },
          footer: () => {
            var _a2, _b;
            return (_b = (_a2 = this.$slots).footer) === null || _b === void 0 ? void 0 : _b.call(_a2);
          }
        })];
      }
    });
  }
});
const commonVariables$h = {
  closeIconSizeTiny: "12px",
  closeIconSizeSmall: "12px",
  closeIconSizeMedium: "14px",
  closeIconSizeLarge: "14px",
  closeSizeTiny: "16px",
  closeSizeSmall: "16px",
  closeSizeMedium: "18px",
  closeSizeLarge: "18px",
  padding: "0 7px",
  closeMargin: "0 0 0 4px"
};
const tagDark = {
  name: "Tag",
  common: derived,
  self(vars) {
    const {
      textColor2,
      primaryColorHover,
      primaryColorPressed,
      primaryColor,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      baseColor,
      borderColor,
      tagColor,
      opacityDisabled,
      closeIconColor,
      closeIconColorHover,
      closeIconColorPressed,
      closeColorHover,
      closeColorPressed,
      borderRadiusSmall: borderRadius,
      fontSizeMini,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      heightMini,
      heightTiny,
      heightSmall,
      heightMedium,
      buttonColor2Hover,
      buttonColor2Pressed,
      fontWeightStrong
    } = vars;
    return Object.assign(Object.assign({}, commonVariables$h), {
      closeBorderRadius: borderRadius,
      heightTiny: heightMini,
      heightSmall: heightTiny,
      heightMedium: heightSmall,
      heightLarge: heightMedium,
      borderRadius,
      opacityDisabled,
      fontSizeTiny: fontSizeMini,
      fontSizeSmall: fontSizeTiny,
      fontSizeMedium: fontSizeSmall,
      fontSizeLarge: fontSizeMedium,
      fontWeightStrong,
      // checked
      textColorCheckable: textColor2,
      textColorHoverCheckable: textColor2,
      textColorPressedCheckable: textColor2,
      textColorChecked: baseColor,
      colorCheckable: "#0000",
      colorHoverCheckable: buttonColor2Hover,
      colorPressedCheckable: buttonColor2Pressed,
      colorChecked: primaryColor,
      colorCheckedHover: primaryColorHover,
      colorCheckedPressed: primaryColorPressed,
      // default
      border: `1px solid ${borderColor}`,
      textColor: textColor2,
      color: tagColor,
      colorBordered: "#0000",
      closeIconColor,
      closeIconColorHover,
      closeIconColorPressed,
      closeColorHover,
      closeColorPressed,
      borderPrimary: `1px solid ${changeColor(primaryColor, {
        alpha: 0.3
      })}`,
      textColorPrimary: primaryColor,
      colorPrimary: changeColor(primaryColor, {
        alpha: 0.16
      }),
      colorBorderedPrimary: "#0000",
      closeIconColorPrimary: scaleColor(primaryColor, {
        lightness: 0.7
      }),
      closeIconColorHoverPrimary: scaleColor(primaryColor, {
        lightness: 0.7
      }),
      closeIconColorPressedPrimary: scaleColor(primaryColor, {
        lightness: 0.7
      }),
      closeColorHoverPrimary: changeColor(primaryColor, {
        alpha: 0.16
      }),
      closeColorPressedPrimary: changeColor(primaryColor, {
        alpha: 0.12
      }),
      borderInfo: `1px solid ${changeColor(infoColor, {
        alpha: 0.3
      })}`,
      textColorInfo: infoColor,
      colorInfo: changeColor(infoColor, {
        alpha: 0.16
      }),
      colorBorderedInfo: "#0000",
      closeIconColorInfo: scaleColor(infoColor, {
        alpha: 0.7
      }),
      closeIconColorHoverInfo: scaleColor(infoColor, {
        alpha: 0.7
      }),
      closeIconColorPressedInfo: scaleColor(infoColor, {
        alpha: 0.7
      }),
      closeColorHoverInfo: changeColor(infoColor, {
        alpha: 0.16
      }),
      closeColorPressedInfo: changeColor(infoColor, {
        alpha: 0.12
      }),
      borderSuccess: `1px solid ${changeColor(successColor, {
        alpha: 0.3
      })}`,
      textColorSuccess: successColor,
      colorSuccess: changeColor(successColor, {
        alpha: 0.16
      }),
      colorBorderedSuccess: "#0000",
      closeIconColorSuccess: scaleColor(successColor, {
        alpha: 0.7
      }),
      closeIconColorHoverSuccess: scaleColor(successColor, {
        alpha: 0.7
      }),
      closeIconColorPressedSuccess: scaleColor(successColor, {
        alpha: 0.7
      }),
      closeColorHoverSuccess: changeColor(successColor, {
        alpha: 0.16
      }),
      closeColorPressedSuccess: changeColor(successColor, {
        alpha: 0.12
      }),
      borderWarning: `1px solid ${changeColor(warningColor, {
        alpha: 0.3
      })}`,
      textColorWarning: warningColor,
      colorWarning: changeColor(warningColor, {
        alpha: 0.16
      }),
      colorBorderedWarning: "#0000",
      closeIconColorWarning: scaleColor(warningColor, {
        alpha: 0.7
      }),
      closeIconColorHoverWarning: scaleColor(warningColor, {
        alpha: 0.7
      }),
      closeIconColorPressedWarning: scaleColor(warningColor, {
        alpha: 0.7
      }),
      closeColorHoverWarning: changeColor(warningColor, {
        alpha: 0.16
      }),
      closeColorPressedWarning: changeColor(warningColor, {
        alpha: 0.11
      }),
      borderError: `1px solid ${changeColor(errorColor, {
        alpha: 0.3
      })}`,
      textColorError: errorColor,
      colorError: changeColor(errorColor, {
        alpha: 0.16
      }),
      colorBorderedError: "#0000",
      closeIconColorError: scaleColor(errorColor, {
        alpha: 0.7
      }),
      closeIconColorHoverError: scaleColor(errorColor, {
        alpha: 0.7
      }),
      closeIconColorPressedError: scaleColor(errorColor, {
        alpha: 0.7
      }),
      closeColorHoverError: changeColor(errorColor, {
        alpha: 0.16
      }),
      closeColorPressedError: changeColor(errorColor, {
        alpha: 0.12
      })
    });
  }
};
const commonVariables$g = {
  paddingSingle: "0 26px 0 12px",
  paddingMultiple: "3px 26px 0 12px",
  clearSize: "16px",
  arrowSize: "16px"
};
const internalSelectionDark = {
  name: "InternalSelection",
  common: derived,
  peers: {
    Popover: popoverDark
  },
  self(vars) {
    const {
      borderRadius,
      textColor2,
      textColorDisabled,
      inputColor,
      inputColorDisabled,
      primaryColor,
      primaryColorHover,
      warningColor,
      warningColorHover,
      errorColor,
      errorColorHover,
      iconColor,
      iconColorDisabled,
      clearColor,
      clearColorHover,
      clearColorPressed,
      placeholderColor,
      placeholderColorDisabled,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      fontWeight
    } = vars;
    return Object.assign(Object.assign({}, commonVariables$g), {
      fontWeight,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      borderRadius,
      // default
      textColor: textColor2,
      textColorDisabled,
      placeholderColor,
      placeholderColorDisabled,
      color: inputColor,
      colorDisabled: inputColorDisabled,
      colorActive: changeColor(primaryColor, {
        alpha: 0.1
      }),
      border: "1px solid #0000",
      borderHover: `1px solid ${primaryColorHover}`,
      borderActive: `1px solid ${primaryColor}`,
      borderFocus: `1px solid ${primaryColorHover}`,
      boxShadowHover: "none",
      boxShadowActive: `0 0 8px 0 ${changeColor(primaryColor, {
        alpha: 0.4
      })}`,
      boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, {
        alpha: 0.4
      })}`,
      caretColor: primaryColor,
      arrowColor: iconColor,
      arrowColorDisabled: iconColorDisabled,
      loadingColor: primaryColor,
      // warning
      borderWarning: `1px solid ${warningColor}`,
      borderHoverWarning: `1px solid ${warningColorHover}`,
      borderActiveWarning: `1px solid ${warningColor}`,
      borderFocusWarning: `1px solid ${warningColorHover}`,
      boxShadowHoverWarning: "none",
      boxShadowActiveWarning: `0 0 8px 0 ${changeColor(warningColor, {
        alpha: 0.4
      })}`,
      boxShadowFocusWarning: `0 0 8px 0 ${changeColor(warningColor, {
        alpha: 0.4
      })}`,
      colorActiveWarning: changeColor(warningColor, {
        alpha: 0.1
      }),
      caretColorWarning: warningColor,
      // error
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      borderActiveError: `1px solid ${errorColor}`,
      borderFocusError: `1px solid ${errorColorHover}`,
      boxShadowHoverError: "none",
      boxShadowActiveError: `0 0 8px 0 ${changeColor(errorColor, {
        alpha: 0.4
      })}`,
      boxShadowFocusError: `0 0 8px 0 ${changeColor(errorColor, {
        alpha: 0.4
      })}`,
      colorActiveError: changeColor(errorColor, {
        alpha: 0.1
      }),
      caretColorError: errorColor,
      clearColor,
      clearColorHover,
      clearColorPressed
    });
  }
};
const commonVars$9 = {
  iconMargin: "11px 8px 0 12px",
  iconMarginRtl: "11px 12px 0 8px",
  iconSize: "24px",
  closeIconSize: "16px",
  closeSize: "20px",
  closeMargin: "13px 14px 0 0",
  closeMarginRtl: "13px 0 0 14px",
  padding: "13px"
};
const alertDark = {
  name: "Alert",
  common: derived,
  self(vars) {
    const {
      lineHeight,
      borderRadius,
      fontWeightStrong,
      dividerColor,
      inputColor,
      textColor1,
      textColor2,
      closeColorHover,
      closeColorPressed,
      closeIconColor,
      closeIconColorHover,
      closeIconColorPressed,
      infoColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      errorColorSuppl,
      fontSize
    } = vars;
    return Object.assign(Object.assign({}, commonVars$9), {
      fontSize,
      lineHeight,
      titleFontWeight: fontWeightStrong,
      borderRadius,
      border: `1px solid ${dividerColor}`,
      color: inputColor,
      titleTextColor: textColor1,
      iconColor: textColor2,
      contentTextColor: textColor2,
      closeBorderRadius: borderRadius,
      closeColorHover,
      closeColorPressed,
      closeIconColor,
      closeIconColorHover,
      closeIconColorPressed,
      borderInfo: `1px solid ${changeColor(infoColorSuppl, {
        alpha: 0.35
      })}`,
      colorInfo: changeColor(infoColorSuppl, {
        alpha: 0.25
      }),
      titleTextColorInfo: textColor1,
      iconColorInfo: infoColorSuppl,
      contentTextColorInfo: textColor2,
      closeColorHoverInfo: closeColorHover,
      closeColorPressedInfo: closeColorPressed,
      closeIconColorInfo: closeIconColor,
      closeIconColorHoverInfo: closeIconColorHover,
      closeIconColorPressedInfo: closeIconColorPressed,
      borderSuccess: `1px solid ${changeColor(successColorSuppl, {
        alpha: 0.35
      })}`,
      colorSuccess: changeColor(successColorSuppl, {
        alpha: 0.25
      }),
      titleTextColorSuccess: textColor1,
      iconColorSuccess: successColorSuppl,
      contentTextColorSuccess: textColor2,
      closeColorHoverSuccess: closeColorHover,
      closeColorPressedSuccess: closeColorPressed,
      closeIconColorSuccess: closeIconColor,
      closeIconColorHoverSuccess: closeIconColorHover,
      closeIconColorPressedSuccess: closeIconColorPressed,
      borderWarning: `1px solid ${changeColor(warningColorSuppl, {
        alpha: 0.35
      })}`,
      colorWarning: changeColor(warningColorSuppl, {
        alpha: 0.25
      }),
      titleTextColorWarning: textColor1,
      iconColorWarning: warningColorSuppl,
      contentTextColorWarning: textColor2,
      closeColorHoverWarning: closeColorHover,
      closeColorPressedWarning: closeColorPressed,
      closeIconColorWarning: closeIconColor,
      closeIconColorHoverWarning: closeIconColorHover,
      closeIconColorPressedWarning: closeIconColorPressed,
      borderError: `1px solid ${changeColor(errorColorSuppl, {
        alpha: 0.35
      })}`,
      colorError: changeColor(errorColorSuppl, {
        alpha: 0.25
      }),
      titleTextColorError: textColor1,
      iconColorError: errorColorSuppl,
      contentTextColorError: textColor2,
      closeColorHoverError: closeColorHover,
      closeColorPressedError: closeColorPressed,
      closeIconColorError: closeIconColor,
      closeIconColorHoverError: closeIconColorHover,
      closeIconColorPressedError: closeIconColorPressed
    });
  }
};
const commonVars$8 = {
  linkFontSize: "13px",
  linkPadding: "0 0 0 16px",
  railWidth: "4px"
};
function self$F(vars) {
  const {
    borderRadius,
    railColor,
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    textColor2
  } = vars;
  return Object.assign(Object.assign({}, commonVars$8), {
    borderRadius,
    railColor,
    railColorActive: primaryColor,
    linkColor: changeColor(primaryColor, {
      alpha: 0.15
    }),
    linkTextColor: textColor2,
    linkTextColorHover: primaryColorHover,
    linkTextColorPressed: primaryColorPressed,
    linkTextColorActive: primaryColor
  });
}
const anchorDark = {
  name: "Anchor",
  common: derived,
  self: self$F
};
const commonVariables$f = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
};
const inputDark = {
  name: "Input",
  common: derived,
  self(vars) {
    const {
      textColor2,
      textColor3,
      textColorDisabled,
      primaryColor,
      primaryColorHover,
      inputColor,
      inputColorDisabled,
      warningColor,
      warningColorHover,
      errorColor,
      errorColorHover,
      borderRadius,
      lineHeight,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      clearColor,
      clearColorHover,
      clearColorPressed,
      placeholderColor,
      placeholderColorDisabled,
      iconColor,
      iconColorDisabled,
      iconColorHover,
      iconColorPressed,
      fontWeight
    } = vars;
    return Object.assign(Object.assign({}, commonVariables$f), {
      fontWeight,
      countTextColorDisabled: textColorDisabled,
      countTextColor: textColor3,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      lineHeight,
      lineHeightTextarea: lineHeight,
      borderRadius,
      iconSize: "16px",
      groupLabelColor: inputColor,
      textColor: textColor2,
      textColorDisabled,
      textDecorationColor: textColor2,
      groupLabelTextColor: textColor2,
      caretColor: primaryColor,
      placeholderColor,
      placeholderColorDisabled,
      color: inputColor,
      colorDisabled: inputColorDisabled,
      colorFocus: changeColor(primaryColor, {
        alpha: 0.1
      }),
      groupLabelBorder: "1px solid #0000",
      border: "1px solid #0000",
      borderHover: `1px solid ${primaryColorHover}`,
      borderDisabled: "1px solid #0000",
      borderFocus: `1px solid ${primaryColorHover}`,
      boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, {
        alpha: 0.3
      })}`,
      loadingColor: primaryColor,
      // warning
      loadingColorWarning: warningColor,
      borderWarning: `1px solid ${warningColor}`,
      borderHoverWarning: `1px solid ${warningColorHover}`,
      colorFocusWarning: changeColor(warningColor, {
        alpha: 0.1
      }),
      borderFocusWarning: `1px solid ${warningColorHover}`,
      boxShadowFocusWarning: `0 0 8px 0 ${changeColor(warningColor, {
        alpha: 0.3
      })}`,
      caretColorWarning: warningColor,
      // error
      loadingColorError: errorColor,
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      colorFocusError: changeColor(errorColor, {
        alpha: 0.1
      }),
      borderFocusError: `1px solid ${errorColorHover}`,
      boxShadowFocusError: `0 0 8px 0 ${changeColor(errorColor, {
        alpha: 0.3
      })}`,
      caretColorError: errorColor,
      clearColor,
      clearColorHover,
      clearColorPressed,
      iconColor,
      iconColorDisabled,
      iconColorHover,
      iconColorPressed,
      suffixTextColor: textColor2
    });
  }
};
function self$E(vars) {
  const {
    boxShadow2
  } = vars;
  return {
    menuBoxShadow: boxShadow2
  };
}
const autoCompleteDark = {
  name: "AutoComplete",
  common: derived,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    Input: inputDark
  },
  self: self$E
};
function self$D(vars) {
  const {
    borderRadius,
    avatarColor,
    cardColor,
    fontSize,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    modalColor,
    popoverColor
  } = vars;
  return {
    borderRadius,
    fontSize,
    border: `2px solid ${cardColor}`,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    color: composite(cardColor, avatarColor),
    colorModal: composite(modalColor, avatarColor),
    colorPopover: composite(popoverColor, avatarColor)
  };
}
const avatarDark = {
  name: "Avatar",
  common: derived,
  self: self$D
};
function self$C() {
  return {
    gap: "-12px"
  };
}
const avatarGroupDark = {
  name: "AvatarGroup",
  common: derived,
  peers: {
    Avatar: avatarDark
  },
  self: self$C
};
const commonVariables$e = {
  width: "44px",
  height: "44px",
  borderRadius: "22px",
  iconSize: "26px"
};
const backTopDark = {
  name: "BackTop",
  common: derived,
  self(vars) {
    const {
      popoverColor,
      textColor2,
      primaryColorHover,
      primaryColorPressed
    } = vars;
    return Object.assign(Object.assign({}, commonVariables$e), {
      color: popoverColor,
      textColor: textColor2,
      iconColor: textColor2,
      iconColorHover: primaryColorHover,
      iconColorPressed: primaryColorPressed,
      boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)",
      boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)",
      boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)"
    });
  }
};
const badgeDark = {
  name: "Badge",
  common: derived,
  self(vars) {
    const {
      errorColorSuppl,
      infoColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      fontFamily
    } = vars;
    return {
      color: errorColorSuppl,
      colorInfo: infoColorSuppl,
      colorSuccess: successColorSuppl,
      colorError: errorColorSuppl,
      colorWarning: warningColorSuppl,
      fontSize: "12px",
      fontFamily
    };
  }
};
const commonVariables$d = {
  fontWeightActive: "400"
};
function self$B(vars) {
  const {
    fontSize,
    textColor3,
    textColor2,
    borderRadius,
    buttonColor2Hover,
    buttonColor2Pressed
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$d), {
    fontSize,
    itemLineHeight: "1.25",
    itemTextColor: textColor3,
    itemTextColorHover: textColor2,
    itemTextColorPressed: textColor2,
    itemTextColorActive: textColor2,
    itemBorderRadius: borderRadius,
    itemColorHover: buttonColor2Hover,
    itemColorPressed: buttonColor2Pressed,
    separatorColor: textColor3
  });
}
const breadcrumbDark = {
  name: "Breadcrumb",
  common: derived,
  self: self$B
};
const buttonDark = {
  name: "Button",
  common: derived,
  self(vars) {
    const commonSelf = self$K(vars);
    commonSelf.waveOpacity = "0.8";
    commonSelf.colorOpacitySecondary = "0.16";
    commonSelf.colorOpacitySecondaryHover = "0.2";
    commonSelf.colorOpacitySecondaryPressed = "0.12";
    return commonSelf;
  }
};
const commonVariables$c = {
  titleFontSize: "22px"
};
function self$A(vars) {
  const {
    borderRadius,
    fontSize,
    lineHeight,
    textColor2,
    textColor1,
    textColorDisabled,
    dividerColor,
    fontWeightStrong,
    primaryColor,
    baseColor,
    hoverColor,
    cardColor,
    modalColor,
    popoverColor
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$c), {
    borderRadius,
    borderColor: composite(cardColor, dividerColor),
    borderColorModal: composite(modalColor, dividerColor),
    borderColorPopover: composite(popoverColor, dividerColor),
    textColor: textColor2,
    titleFontWeight: fontWeightStrong,
    titleTextColor: textColor1,
    dayTextColor: textColorDisabled,
    fontSize,
    lineHeight,
    dateColorCurrent: primaryColor,
    dateTextColorCurrent: baseColor,
    cellColorHover: composite(cardColor, hoverColor),
    cellColorHoverModal: composite(modalColor, hoverColor),
    cellColorHoverPopover: composite(popoverColor, hoverColor),
    cellColor: cardColor,
    cellColorModal: modalColor,
    cellColorPopover: popoverColor,
    barColor: primaryColor
  });
}
const calendarDark = {
  name: "Calendar",
  common: derived,
  peers: {
    Button: buttonDark
  },
  self: self$A
};
const cardDark = {
  name: "Card",
  common: derived,
  self(vars) {
    const commonSelf = self$L(vars);
    const {
      cardColor,
      modalColor,
      popoverColor
    } = vars;
    commonSelf.colorEmbedded = cardColor;
    commonSelf.colorEmbeddedModal = modalColor;
    commonSelf.colorEmbeddedPopover = popoverColor;
    return commonSelf;
  }
};
function self$z() {
  return {
    dotSize: "8px",
    dotColor: "rgba(255, 255, 255, .3)",
    dotColorActive: "rgba(255, 255, 255, 1)",
    dotColorFocus: "rgba(255, 255, 255, .5)",
    dotLineWidth: "16px",
    dotLineWidthActive: "24px",
    arrowColor: "#eee"
  };
}
const carouselDark = {
  name: "Carousel",
  common: derived,
  self: self$z
};
const commonVariables$b = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function self$y(vars) {
  const {
    baseColor,
    inputColorDisabled,
    cardColor,
    modalColor,
    popoverColor,
    textColorDisabled,
    borderColor,
    primaryColor,
    textColor2,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadiusSmall,
    lineHeight
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$b), {
    labelLineHeight: lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadius: borderRadiusSmall,
    color: baseColor,
    colorChecked: primaryColor,
    colorDisabled: inputColorDisabled,
    colorDisabledChecked: inputColorDisabled,
    colorTableHeader: cardColor,
    colorTableHeaderModal: modalColor,
    colorTableHeaderPopover: popoverColor,
    checkMarkColor: baseColor,
    checkMarkColorDisabled: textColorDisabled,
    checkMarkColorDisabledChecked: textColorDisabled,
    border: `1px solid ${borderColor}`,
    borderDisabled: `1px solid ${borderColor}`,
    borderDisabledChecked: `1px solid ${borderColor}`,
    borderChecked: `1px solid ${primaryColor}`,
    borderFocus: `1px solid ${primaryColor}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, {
      alpha: 0.3
    })}`,
    textColor: textColor2,
    textColorDisabled
  });
}
const checkboxDark = {
  name: "Checkbox",
  common: derived,
  self(vars) {
    const {
      cardColor
    } = vars;
    const commonSelf = self$y(vars);
    commonSelf.color = "#0000";
    commonSelf.checkMarkColor = cardColor;
    return commonSelf;
  }
};
function self$x(vars) {
  const {
    borderRadius,
    boxShadow2,
    popoverColor,
    textColor2,
    textColor3,
    primaryColor,
    textColorDisabled,
    dividerColor,
    hoverColor,
    fontSizeMedium,
    heightMedium
  } = vars;
  return {
    menuBorderRadius: borderRadius,
    menuColor: popoverColor,
    menuBoxShadow: boxShadow2,
    menuDividerColor: dividerColor,
    menuHeight: "calc(var(--n-option-height) * 6.6)",
    optionArrowColor: textColor3,
    optionHeight: heightMedium,
    optionFontSize: fontSizeMedium,
    optionColorHover: hoverColor,
    optionTextColor: textColor2,
    optionTextColorActive: primaryColor,
    optionTextColorDisabled: textColorDisabled,
    optionCheckMarkColor: primaryColor,
    loadingColor: primaryColor,
    columnWidth: "180px"
  };
}
const cascaderDark = {
  name: "Cascader",
  common: derived,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    InternalSelection: internalSelectionDark,
    Scrollbar: scrollbarDark,
    Checkbox: checkboxDark,
    Empty: emptyLight
  },
  self: self$x
};
const codeDark = {
  name: "Code",
  common: derived,
  self(vars) {
    const {
      textColor2,
      fontSize,
      fontWeightStrong,
      textColor3
    } = vars;
    return {
      textColor: textColor2,
      fontSize,
      fontWeightStrong,
      // extracted from hljs atom-one-dark.scss
      "mono-3": "#5c6370",
      "hue-1": "#56b6c2",
      "hue-2": "#61aeee",
      "hue-3": "#c678dd",
      "hue-4": "#98c379",
      "hue-5": "#e06c75",
      "hue-5-2": "#be5046",
      "hue-6": "#d19a66",
      "hue-6-2": "#e6c07b",
      // line-number styles
      lineNumberTextColor: textColor3
    };
  }
};
function self$w(vars) {
  const {
    fontWeight,
    textColor1,
    textColor2,
    textColorDisabled,
    dividerColor,
    fontSize
  } = vars;
  return {
    titleFontSize: fontSize,
    titleFontWeight: fontWeight,
    dividerColor,
    titleTextColor: textColor1,
    titleTextColorDisabled: textColorDisabled,
    fontSize,
    textColor: textColor2,
    arrowColor: textColor2,
    arrowColorDisabled: textColorDisabled,
    itemMargin: "16px 0 0 0",
    titlePadding: "16px 0 0 0"
  };
}
const collapseDark = {
  name: "Collapse",
  common: derived,
  self: self$w
};
function self$v(vars) {
  const {
    cubicBezierEaseInOut
  } = vars;
  return {
    bezier: cubicBezierEaseInOut
  };
}
const collapseTransitionDark = {
  name: "CollapseTransition",
  common: derived,
  self: self$v
};
function self$u(vars) {
  const {
    fontSize,
    boxShadow2,
    popoverColor,
    textColor2,
    borderRadius,
    borderColor,
    heightSmall,
    heightMedium,
    heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    dividerColor
  } = vars;
  return {
    panelFontSize: fontSize,
    boxShadow: boxShadow2,
    color: popoverColor,
    textColor: textColor2,
    borderRadius,
    border: `1px solid ${borderColor}`,
    heightSmall,
    heightMedium,
    heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    dividerColor
  };
}
const colorPickerDark = {
  name: "ColorPicker",
  common: derived,
  peers: {
    Input: inputDark,
    Button: buttonDark
  },
  self: self$u
};
const popselect = {
  name: "Popselect",
  common: derived,
  peers: {
    Popover: popoverDark,
    InternalSelectMenu: internalSelectMenuDark
  }
};
function self$t(vars) {
  const {
    boxShadow2
  } = vars;
  return {
    menuBoxShadow: boxShadow2
  };
}
const selectDark = {
  name: "Select",
  common: derived,
  peers: {
    InternalSelection: internalSelectionDark,
    InternalSelectMenu: internalSelectMenuDark
  },
  self: self$t
};
const commonVariables$a = {
  itemPaddingSmall: "0 4px",
  itemMarginSmall: "0 0 0 8px",
  itemMarginSmallRtl: "0 8px 0 0",
  itemPaddingMedium: "0 4px",
  itemMarginMedium: "0 0 0 8px",
  itemMarginMediumRtl: "0 8px 0 0",
  itemPaddingLarge: "0 4px",
  itemMarginLarge: "0 0 0 8px",
  itemMarginLargeRtl: "0 8px 0 0",
  buttonIconSizeSmall: "14px",
  buttonIconSizeMedium: "16px",
  buttonIconSizeLarge: "18px",
  inputWidthSmall: "60px",
  selectWidthSmall: "unset",
  inputMarginSmall: "0 0 0 8px",
  inputMarginSmallRtl: "0 8px 0 0",
  selectMarginSmall: "0 0 0 8px",
  prefixMarginSmall: "0 8px 0 0",
  suffixMarginSmall: "0 0 0 8px",
  inputWidthMedium: "60px",
  selectWidthMedium: "unset",
  inputMarginMedium: "0 0 0 8px",
  inputMarginMediumRtl: "0 8px 0 0",
  selectMarginMedium: "0 0 0 8px",
  prefixMarginMedium: "0 8px 0 0",
  suffixMarginMedium: "0 0 0 8px",
  inputWidthLarge: "60px",
  selectWidthLarge: "unset",
  inputMarginLarge: "0 0 0 8px",
  inputMarginLargeRtl: "0 8px 0 0",
  selectMarginLarge: "0 0 0 8px",
  prefixMarginLarge: "0 8px 0 0",
  suffixMarginLarge: "0 0 0 8px"
};
function self$s(vars) {
  const {
    textColor2,
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    inputColorDisabled,
    textColorDisabled,
    borderColor,
    borderRadius,
    // item font size
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    // item size
    heightTiny,
    heightSmall,
    heightMedium
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$a), {
    buttonColor: "#0000",
    buttonColorHover: "#0000",
    buttonColorPressed: "#0000",
    buttonBorder: `1px solid ${borderColor}`,
    buttonBorderHover: `1px solid ${borderColor}`,
    buttonBorderPressed: `1px solid ${borderColor}`,
    buttonIconColor: textColor2,
    buttonIconColorHover: textColor2,
    buttonIconColorPressed: textColor2,
    itemTextColor: textColor2,
    itemTextColorHover: primaryColorHover,
    itemTextColorPressed: primaryColorPressed,
    itemTextColorActive: primaryColor,
    itemTextColorDisabled: textColorDisabled,
    itemColor: "#0000",
    itemColorHover: "#0000",
    itemColorPressed: "#0000",
    itemColorActive: "#0000",
    itemColorActiveHover: "#0000",
    itemColorDisabled: inputColorDisabled,
    itemBorder: "1px solid #0000",
    itemBorderHover: "1px solid #0000",
    itemBorderPressed: "1px solid #0000",
    itemBorderActive: `1px solid ${primaryColor}`,
    itemBorderDisabled: `1px solid ${borderColor}`,
    itemBorderRadius: borderRadius,
    itemSizeSmall: heightTiny,
    itemSizeMedium: heightSmall,
    itemSizeLarge: heightMedium,
    itemFontSizeSmall: fontSizeTiny,
    itemFontSizeMedium: fontSizeSmall,
    itemFontSizeLarge: fontSizeMedium,
    jumperFontSizeSmall: fontSizeTiny,
    jumperFontSizeMedium: fontSizeSmall,
    jumperFontSizeLarge: fontSizeMedium,
    jumperTextColor: textColor2,
    jumperTextColorDisabled: textColorDisabled
  });
}
const paginationDark = {
  name: "Pagination",
  common: derived,
  peers: {
    Select: selectDark,
    Input: inputDark,
    Popselect: popselect
  },
  self(vars) {
    const {
      primaryColor,
      opacity3
    } = vars;
    const borderColorActive = changeColor(primaryColor, {
      alpha: Number(opacity3)
    });
    const commonSelf = self$s(vars);
    commonSelf.itemBorderActive = `1px solid ${borderColorActive}`;
    commonSelf.itemBorderDisabled = "1px solid #0000";
    return commonSelf;
  }
};
const commonVariables$9 = {
  padding: "4px 0",
  optionIconSizeSmall: "14px",
  optionIconSizeMedium: "16px",
  optionIconSizeLarge: "16px",
  optionIconSizeHuge: "18px",
  optionSuffixWidthSmall: "14px",
  optionSuffixWidthMedium: "14px",
  optionSuffixWidthLarge: "16px",
  optionSuffixWidthHuge: "16px",
  optionIconSuffixWidthSmall: "32px",
  optionIconSuffixWidthMedium: "32px",
  optionIconSuffixWidthLarge: "36px",
  optionIconSuffixWidthHuge: "36px",
  optionPrefixWidthSmall: "14px",
  optionPrefixWidthMedium: "14px",
  optionPrefixWidthLarge: "16px",
  optionPrefixWidthHuge: "16px",
  optionIconPrefixWidthSmall: "36px",
  optionIconPrefixWidthMedium: "36px",
  optionIconPrefixWidthLarge: "40px",
  optionIconPrefixWidthHuge: "40px"
};
function self$r(vars) {
  const {
    primaryColor,
    textColor2,
    dividerColor,
    hoverColor,
    popoverColor,
    invertedColor,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    textColor3,
    opacityDisabled
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$9), {
    optionHeightSmall: heightSmall,
    optionHeightMedium: heightMedium,
    optionHeightLarge: heightLarge,
    optionHeightHuge: heightHuge,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    // non-inverted
    optionTextColor: textColor2,
    optionTextColorHover: textColor2,
    optionTextColorActive: primaryColor,
    optionTextColorChildActive: primaryColor,
    color: popoverColor,
    dividerColor,
    suffixColor: textColor2,
    prefixColor: textColor2,
    optionColorHover: hoverColor,
    optionColorActive: changeColor(primaryColor, {
      alpha: 0.1
    }),
    groupHeaderTextColor: textColor3,
    // inverted
    optionTextColorInverted: "#BBB",
    optionTextColorHoverInverted: "#FFF",
    optionTextColorActiveInverted: "#FFF",
    optionTextColorChildActiveInverted: "#FFF",
    colorInverted: invertedColor,
    dividerColorInverted: "#BBB",
    suffixColorInverted: "#BBB",
    prefixColorInverted: "#BBB",
    optionColorHoverInverted: primaryColor,
    optionColorActiveInverted: primaryColor,
    groupHeaderTextColorInverted: "#AAA",
    optionOpacityDisabled: opacityDisabled
  });
}
const dropdownLight = createTheme({
  name: "Dropdown",
  common: derived$1,
  peers: {
    Popover: popoverLight
  },
  self: self$r
});
const dropdownDark = {
  name: "Dropdown",
  common: derived,
  peers: {
    Popover: popoverDark
  },
  self(vars) {
    const {
      primaryColorSuppl,
      primaryColor,
      popoverColor
    } = vars;
    const commonSelf = self$r(vars);
    commonSelf.colorInverted = popoverColor;
    commonSelf.optionColorActive = changeColor(primaryColor, {
      alpha: 0.15
    });
    commonSelf.optionColorActiveInverted = primaryColorSuppl;
    commonSelf.optionColorHoverInverted = primaryColorSuppl;
    return commonSelf;
  }
};
const commonVars$7 = {
  padding: "8px 14px"
};
const tooltipDark = {
  name: "Tooltip",
  common: derived,
  peers: {
    Popover: popoverDark
  },
  self(vars) {
    const {
      borderRadius,
      boxShadow2,
      popoverColor,
      textColor2
    } = vars;
    return Object.assign(Object.assign({}, commonVars$7), {
      borderRadius,
      boxShadow: boxShadow2,
      color: popoverColor,
      textColor: textColor2
    });
  }
};
const ellipsisDark = {
  name: "Ellipsis",
  common: derived,
  peers: {
    Tooltip: tooltipDark
  }
};
const commonVariables$8 = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
const radioDark = {
  name: "Radio",
  common: derived,
  self(vars) {
    const {
      borderColor,
      primaryColor,
      baseColor,
      textColorDisabled,
      inputColorDisabled,
      textColor2,
      opacityDisabled,
      borderRadius,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      heightSmall,
      heightMedium,
      heightLarge,
      lineHeight
    } = vars;
    return Object.assign(Object.assign({}, commonVariables$8), {
      labelLineHeight: lineHeight,
      buttonHeightSmall: heightSmall,
      buttonHeightMedium: heightMedium,
      buttonHeightLarge: heightLarge,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      boxShadow: `inset 0 0 0 1px ${borderColor}`,
      boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, {
        alpha: 0.3
      })}`,
      boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
      color: "#0000",
      colorDisabled: inputColorDisabled,
      colorActive: "#0000",
      textColor: textColor2,
      textColorDisabled,
      dotColorActive: primaryColor,
      dotColorDisabled: borderColor,
      buttonBorderColor: borderColor,
      buttonBorderColorActive: primaryColor,
      buttonBorderColorHover: primaryColor,
      buttonColor: "#0000",
      buttonColorActive: primaryColor,
      buttonTextColor: textColor2,
      buttonTextColorActive: baseColor,
      buttonTextColorHover: primaryColor,
      opacityDisabled,
      buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, {
        alpha: 0.3
      })}`,
      buttonBoxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      buttonBoxShadow: "inset 0 0 0 1px #0000",
      buttonBorderRadius: borderRadius
    });
  }
};
const commonVariables$7 = {
  thPaddingSmall: "8px",
  thPaddingMedium: "12px",
  thPaddingLarge: "12px",
  tdPaddingSmall: "8px",
  tdPaddingMedium: "12px",
  tdPaddingLarge: "12px",
  sorterSize: "15px",
  resizableContainerSize: "8px",
  resizableSize: "2px",
  filterSize: "15px",
  paginationMargin: "12px 0 0 0",
  emptyPadding: "48px 0",
  actionPadding: "8px 12px",
  actionButtonMargin: "0 8px 0 0"
};
function self$q(vars) {
  const {
    cardColor,
    modalColor,
    popoverColor,
    textColor2,
    textColor1,
    tableHeaderColor,
    tableColorHover,
    iconColor,
    primaryColor,
    fontWeightStrong,
    borderRadius,
    lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    dividerColor,
    heightSmall,
    opacityDisabled,
    tableColorStriped
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$7), {
    actionDividerColor: dividerColor,
    lineHeight,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderColor: composite(cardColor, dividerColor),
    tdColorHover: composite(cardColor, tableColorHover),
    tdColorSorting: composite(cardColor, tableColorHover),
    tdColorStriped: composite(cardColor, tableColorStriped),
    thColor: composite(cardColor, tableHeaderColor),
    thColorHover: composite(composite(cardColor, tableHeaderColor), tableColorHover),
    thColorSorting: composite(composite(cardColor, tableHeaderColor), tableColorHover),
    tdColor: cardColor,
    tdTextColor: textColor2,
    thTextColor: textColor1,
    thFontWeight: fontWeightStrong,
    thButtonColorHover: tableColorHover,
    thIconColor: iconColor,
    thIconColorActive: primaryColor,
    // modal
    borderColorModal: composite(modalColor, dividerColor),
    tdColorHoverModal: composite(modalColor, tableColorHover),
    tdColorSortingModal: composite(modalColor, tableColorHover),
    tdColorStripedModal: composite(modalColor, tableColorStriped),
    thColorModal: composite(modalColor, tableHeaderColor),
    thColorHoverModal: composite(composite(modalColor, tableHeaderColor), tableColorHover),
    thColorSortingModal: composite(composite(modalColor, tableHeaderColor), tableColorHover),
    tdColorModal: modalColor,
    // popover
    borderColorPopover: composite(popoverColor, dividerColor),
    tdColorHoverPopover: composite(popoverColor, tableColorHover),
    tdColorSortingPopover: composite(popoverColor, tableColorHover),
    tdColorStripedPopover: composite(popoverColor, tableColorStriped),
    thColorPopover: composite(popoverColor, tableHeaderColor),
    thColorHoverPopover: composite(composite(popoverColor, tableHeaderColor), tableColorHover),
    thColorSortingPopover: composite(composite(popoverColor, tableHeaderColor), tableColorHover),
    tdColorPopover: popoverColor,
    boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
    boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
    // loading
    loadingColor: primaryColor,
    loadingSize: heightSmall,
    opacityLoading: opacityDisabled
  });
}
const dataTableDark = {
  name: "DataTable",
  common: derived,
  peers: {
    Button: buttonDark,
    Checkbox: checkboxDark,
    Radio: radioDark,
    Pagination: paginationDark,
    Scrollbar: scrollbarDark,
    Empty: emptyDark,
    Popover: popoverDark,
    Ellipsis: ellipsisDark,
    Dropdown: dropdownDark
  },
  self(vars) {
    const commonSelf = self$q(vars);
    commonSelf.boxShadowAfter = "inset 12px 0 8px -12px rgba(0, 0, 0, .36)";
    commonSelf.boxShadowBefore = "inset -12px 0 8px -12px rgba(0, 0, 0, .36)";
    return commonSelf;
  }
};
const dropdownMenuInjectionKey = createInjectionKey("n-dropdown-menu");
const dropdownInjectionKey = createInjectionKey("n-dropdown");
const dropdownOptionInjectionKey = createInjectionKey("n-dropdown-option");
const NDropdownDivider = defineComponent({
  name: "DropdownDivider",
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  render() {
    return h("div", {
      class: `${this.clsPrefix}-dropdown-divider`
    });
  }
});
const NDropdownGroupHeader = defineComponent({
  name: "DropdownGroupHeader",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup() {
    const {
      showIconRef,
      hasSubmenuRef
    } = inject(dropdownMenuInjectionKey);
    const {
      renderLabelRef,
      labelFieldRef,
      nodePropsRef,
      renderOptionRef
    } = inject(dropdownInjectionKey);
    return {
      labelField: labelFieldRef,
      showIcon: showIconRef,
      hasSubmenu: hasSubmenuRef,
      renderLabel: renderLabelRef,
      nodeProps: nodePropsRef,
      renderOption: renderOptionRef
    };
  },
  render() {
    var _a;
    const {
      clsPrefix,
      hasSubmenu,
      showIcon,
      nodeProps,
      renderLabel,
      renderOption
    } = this;
    const {
      rawNode
    } = this.tmNode;
    const node = h("div", Object.assign({
      class: `${clsPrefix}-dropdown-option`
    }, nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode)), h("div", {
      class: `${clsPrefix}-dropdown-option-body ${clsPrefix}-dropdown-option-body--group`
    }, h("div", {
      "data-dropdown-option": true,
      class: [`${clsPrefix}-dropdown-option-body__prefix`, showIcon && `${clsPrefix}-dropdown-option-body__prefix--show-icon`]
    }, render(rawNode.icon)), h("div", {
      class: `${clsPrefix}-dropdown-option-body__label`,
      "data-dropdown-option": true
    }, renderLabel ? renderLabel(rawNode) : render((_a = rawNode.title) !== null && _a !== void 0 ? _a : rawNode[this.labelField])), h("div", {
      class: [`${clsPrefix}-dropdown-option-body__suffix`, hasSubmenu && `${clsPrefix}-dropdown-option-body__suffix--has-submenu`],
      "data-dropdown-option": true
    })));
    if (renderOption) {
      return renderOption({
        node,
        option: rawNode
      });
    }
    return node;
  }
});
function self$p(vars) {
  const {
    textColorBase,
    opacity1,
    opacity2,
    opacity3,
    opacity4,
    opacity5
  } = vars;
  return {
    color: textColorBase,
    opacity1Depth: opacity1,
    opacity2Depth: opacity2,
    opacity3Depth: opacity3,
    opacity4Depth: opacity4,
    opacity5Depth: opacity5
  };
}
const iconLight = {
  common: derived$1,
  self: self$p
};
const iconDark$1 = {
  name: "Icon",
  common: derived,
  self: self$p
};
const style$1 = cB("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [cM("color-transition", {
  transition: "color .3s var(--n-bezier)"
}), cM("depth", {
  color: "var(--n-color)"
}, [c$1("svg", {
  opacity: "var(--n-opacity)",
  transition: "opacity .3s var(--n-bezier)"
})]), c$1("svg", {
  height: "1em",
  width: "1em"
})]);
const iconProps = Object.assign(Object.assign({}, useTheme.props), {
  depth: [String, Number],
  size: [Number, String],
  color: String,
  component: [Object, Function]
});
const NIcon = defineComponent({
  _n_icon__: true,
  name: "Icon",
  inheritAttrs: false,
  props: iconProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme("Icon", "-icon", style$1, iconLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        depth
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: self2
      } = themeRef.value;
      if (depth !== void 0) {
        const {
          color,
          [`opacity${depth}Depth`]: opacity
        } = self2;
        return {
          "--n-bezier": cubicBezierEaseInOut,
          "--n-color": color,
          "--n-opacity": opacity
        };
      }
      return {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-color": "",
        "--n-opacity": ""
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("icon", computed(() => `${props.depth || "d"}`), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedStyle: computed(() => {
        const {
          size,
          color
        } = props;
        return {
          fontSize: formatLength(size),
          color
        };
      }),
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      $parent,
      depth,
      mergedClsPrefix,
      component,
      onRender,
      themeClass
    } = this;
    if ((_a = $parent === null || $parent === void 0 ? void 0 : $parent.$options) === null || _a === void 0 ? void 0 : _a._n_icon__) {
      warn("icon", "don't wrap `n-icon` inside `n-icon`");
    }
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("i", mergeProps(this.$attrs, {
      role: "img",
      class: [`${mergedClsPrefix}-icon`, themeClass, {
        [`${mergedClsPrefix}-icon--depth`]: depth,
        [`${mergedClsPrefix}-icon--color-transition`]: depth !== void 0
      }],
      style: [this.cssVars, this.mergedStyle]
    }), component ? h(component) : this.$slots);
  }
});
function isSubmenuNode(rawNode, childrenField) {
  return rawNode.type === "submenu" || rawNode.type === void 0 && rawNode[childrenField] !== void 0;
}
function isGroupNode(rawNode) {
  return rawNode.type === "group";
}
function isDividerNode(rawNode) {
  return rawNode.type === "divider";
}
function isRenderNode(rawNode) {
  return rawNode.type === "render";
}
const NDropdownOption = defineComponent({
  name: "DropdownOption",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    },
    parentKey: {
      type: [String, Number],
      default: null
    },
    placement: {
      type: String,
      default: "right-start"
    },
    props: Object,
    scrollable: Boolean
  },
  setup(props) {
    const NDropdown2 = inject(dropdownInjectionKey);
    const {
      hoverKeyRef,
      keyboardKeyRef,
      lastToggledSubmenuKeyRef,
      pendingKeyPathRef,
      activeKeyPathRef,
      animatedRef,
      mergedShowRef,
      renderLabelRef,
      renderIconRef,
      labelFieldRef,
      childrenFieldRef,
      renderOptionRef,
      nodePropsRef,
      menuPropsRef
    } = NDropdown2;
    const NDropdownOption2 = inject(dropdownOptionInjectionKey, null);
    const NDropdownMenu2 = inject(dropdownMenuInjectionKey);
    const NPopoverBody2 = inject(popoverBodyInjectionKey);
    const rawNodeRef = computed(() => props.tmNode.rawNode);
    const hasSubmenuRef = computed(() => {
      const {
        value: childrenField
      } = childrenFieldRef;
      return isSubmenuNode(props.tmNode.rawNode, childrenField);
    });
    const mergedDisabledRef = computed(() => {
      const {
        disabled
      } = props.tmNode;
      return disabled;
    });
    const showSubmenuRef = computed(() => {
      if (!hasSubmenuRef.value) return false;
      const {
        key,
        disabled
      } = props.tmNode;
      if (disabled) return false;
      const {
        value: hoverKey
      } = hoverKeyRef;
      const {
        value: keyboardKey
      } = keyboardKeyRef;
      const {
        value: lastToggledSubmenuKey
      } = lastToggledSubmenuKeyRef;
      const {
        value: pendingKeyPath
      } = pendingKeyPathRef;
      if (hoverKey !== null) return pendingKeyPath.includes(key);
      if (keyboardKey !== null) {
        return pendingKeyPath.includes(key) && pendingKeyPath[pendingKeyPath.length - 1] !== key;
      }
      if (lastToggledSubmenuKey !== null) return pendingKeyPath.includes(key);
      return false;
    });
    const shouldDelayRef = computed(() => {
      return keyboardKeyRef.value === null && !animatedRef.value;
    });
    const deferredShowSubmenuRef = useDeferredTrue(showSubmenuRef, 300, shouldDelayRef);
    const parentEnteringSubmenuRef = computed(() => {
      return !!(NDropdownOption2 === null || NDropdownOption2 === void 0 ? void 0 : NDropdownOption2.enteringSubmenuRef.value);
    });
    const enteringSubmenuRef = ref(false);
    provide(dropdownOptionInjectionKey, {
      enteringSubmenuRef
    });
    function handleSubmenuBeforeEnter() {
      enteringSubmenuRef.value = true;
    }
    function handleSubmenuAfterEnter() {
      enteringSubmenuRef.value = false;
    }
    function handleMouseEnter() {
      const {
        parentKey,
        tmNode
      } = props;
      if (tmNode.disabled) return;
      if (!mergedShowRef.value) return;
      lastToggledSubmenuKeyRef.value = parentKey;
      keyboardKeyRef.value = null;
      hoverKeyRef.value = tmNode.key;
    }
    function handleMouseMove() {
      const {
        tmNode
      } = props;
      if (tmNode.disabled) return;
      if (!mergedShowRef.value) return;
      if (hoverKeyRef.value === tmNode.key) return;
      handleMouseEnter();
    }
    function handleMouseLeave(e) {
      if (props.tmNode.disabled) return;
      if (!mergedShowRef.value) return;
      const {
        relatedTarget
      } = e;
      if (relatedTarget && !happensIn({
        target: relatedTarget
      }, "dropdownOption") && !happensIn({
        target: relatedTarget
      }, "scrollbarRail")) {
        hoverKeyRef.value = null;
      }
    }
    function handleClick() {
      const {
        value: hasSubmenu
      } = hasSubmenuRef;
      const {
        tmNode
      } = props;
      if (!mergedShowRef.value) return;
      if (!hasSubmenu && !tmNode.disabled) {
        NDropdown2.doSelect(tmNode.key, tmNode.rawNode);
        NDropdown2.doUpdateShow(false);
      }
    }
    return {
      labelField: labelFieldRef,
      renderLabel: renderLabelRef,
      renderIcon: renderIconRef,
      siblingHasIcon: NDropdownMenu2.showIconRef,
      siblingHasSubmenu: NDropdownMenu2.hasSubmenuRef,
      menuProps: menuPropsRef,
      popoverBody: NPopoverBody2,
      animated: animatedRef,
      mergedShowSubmenu: computed(() => {
        return deferredShowSubmenuRef.value && !parentEnteringSubmenuRef.value;
      }),
      rawNode: rawNodeRef,
      hasSubmenu: hasSubmenuRef,
      pending: useMemo(() => {
        const {
          value: pendingKeyPath
        } = pendingKeyPathRef;
        const {
          key
        } = props.tmNode;
        return pendingKeyPath.includes(key);
      }),
      childActive: useMemo(() => {
        const {
          value: activeKeyPath
        } = activeKeyPathRef;
        const {
          key
        } = props.tmNode;
        const index = activeKeyPath.findIndex((k) => key === k);
        if (index === -1) return false;
        return index < activeKeyPath.length - 1;
      }),
      active: useMemo(() => {
        const {
          value: activeKeyPath
        } = activeKeyPathRef;
        const {
          key
        } = props.tmNode;
        const index = activeKeyPath.findIndex((k) => key === k);
        if (index === -1) return false;
        return index === activeKeyPath.length - 1;
      }),
      mergedDisabled: mergedDisabledRef,
      renderOption: renderOptionRef,
      nodeProps: nodePropsRef,
      handleClick,
      handleMouseMove,
      handleMouseEnter,
      handleMouseLeave,
      handleSubmenuBeforeEnter,
      handleSubmenuAfterEnter
    };
  },
  render() {
    var _a, _b;
    const {
      animated,
      rawNode,
      mergedShowSubmenu,
      clsPrefix,
      siblingHasIcon,
      siblingHasSubmenu,
      renderLabel,
      renderIcon,
      renderOption,
      nodeProps,
      props,
      scrollable
    } = this;
    let submenuVNode = null;
    if (mergedShowSubmenu) {
      const submenuNodeProps = (_a = this.menuProps) === null || _a === void 0 ? void 0 : _a.call(this, rawNode, rawNode.children);
      submenuVNode = h(NDropdownMenu, Object.assign({}, submenuNodeProps, {
        clsPrefix,
        scrollable: this.scrollable,
        tmNodes: this.tmNode.children,
        parentKey: this.tmNode.key
      }));
    }
    const builtinProps = {
      class: [`${clsPrefix}-dropdown-option-body`, this.pending && `${clsPrefix}-dropdown-option-body--pending`, this.active && `${clsPrefix}-dropdown-option-body--active`, this.childActive && `${clsPrefix}-dropdown-option-body--child-active`, this.mergedDisabled && `${clsPrefix}-dropdown-option-body--disabled`],
      onMousemove: this.handleMouseMove,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onClick: this.handleClick
    };
    const optionNodeProps = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode);
    const node = h("div", Object.assign({
      class: [`${clsPrefix}-dropdown-option`, optionNodeProps === null || optionNodeProps === void 0 ? void 0 : optionNodeProps.class],
      "data-dropdown-option": true
    }, optionNodeProps), h("div", mergeProps(builtinProps, props), [h("div", {
      class: [`${clsPrefix}-dropdown-option-body__prefix`, siblingHasIcon && `${clsPrefix}-dropdown-option-body__prefix--show-icon`]
    }, [renderIcon ? renderIcon(rawNode) : render(rawNode.icon)]), h("div", {
      "data-dropdown-option": true,
      class: `${clsPrefix}-dropdown-option-body__label`
    }, renderLabel ? renderLabel(rawNode) : render((_b = rawNode[this.labelField]) !== null && _b !== void 0 ? _b : rawNode.title)), h("div", {
      "data-dropdown-option": true,
      class: [`${clsPrefix}-dropdown-option-body__suffix`, siblingHasSubmenu && `${clsPrefix}-dropdown-option-body__suffix--has-submenu`]
    }, this.hasSubmenu ? h(NIcon, null, {
      default: () => h(ChevronRightIcon, null)
    }) : null)]), this.hasSubmenu ? h(Binder, null, {
      default: () => [h(VTarget, null, {
        default: () => h("div", {
          class: `${clsPrefix}-dropdown-offset-container`
        }, h(VFollower, {
          show: this.mergedShowSubmenu,
          placement: this.placement,
          to: scrollable ? this.popoverBody || void 0 : void 0,
          teleportDisabled: !scrollable
        }, {
          default: () => {
            return h("div", {
              class: `${clsPrefix}-dropdown-menu-wrapper`
            }, animated ? h(Transition, {
              onBeforeEnter: this.handleSubmenuBeforeEnter,
              onAfterEnter: this.handleSubmenuAfterEnter,
              name: "fade-in-scale-up-transition",
              appear: true
            }, {
              default: () => submenuVNode
            }) : submenuVNode);
          }
        }))
      })]
    }) : null);
    if (renderOption) {
      return renderOption({
        node,
        option: rawNode
      });
    }
    return node;
  }
});
const NDropdownGroup = defineComponent({
  name: "NDropdownGroup",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  render() {
    const {
      tmNode,
      parentKey,
      clsPrefix
    } = this;
    const {
      children
    } = tmNode;
    return h(Fragment, null, h(NDropdownGroupHeader, {
      clsPrefix,
      tmNode,
      key: tmNode.key
    }), children === null || children === void 0 ? void 0 : children.map((child) => {
      const {
        rawNode
      } = child;
      if (rawNode.show === false) return null;
      if (isDividerNode(rawNode)) {
        return h(NDropdownDivider, {
          clsPrefix,
          key: child.key
        });
      }
      if (child.isGroup) {
        warn("dropdown", "`group` node is not allowed to be put in `group` node.");
        return null;
      }
      return h(NDropdownOption, {
        clsPrefix,
        tmNode: child,
        parentKey,
        key: child.key
      });
    }));
  }
});
const NDropdownRenderOption = defineComponent({
  name: "DropdownRenderOption",
  props: {
    tmNode: {
      type: Object,
      required: true
    }
  },
  render() {
    const {
      rawNode: {
        render: render2,
        props
      }
    } = this.tmNode;
    return h("div", props, [render2 === null || render2 === void 0 ? void 0 : render2()]);
  }
});
const NDropdownMenu = defineComponent({
  name: "DropdownMenu",
  props: {
    scrollable: Boolean,
    showArrow: Boolean,
    arrowStyle: [String, Object],
    clsPrefix: {
      type: String,
      required: true
    },
    tmNodes: {
      type: Array,
      default: () => []
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  setup(props) {
    const {
      renderIconRef,
      childrenFieldRef
    } = inject(dropdownInjectionKey);
    provide(dropdownMenuInjectionKey, {
      showIconRef: computed(() => {
        const renderIcon = renderIconRef.value;
        return props.tmNodes.some((tmNode) => {
          var _a;
          if (tmNode.isGroup) {
            return (_a = tmNode.children) === null || _a === void 0 ? void 0 : _a.some(({
              rawNode: rawChild
            }) => renderIcon ? renderIcon(rawChild) : rawChild.icon);
          }
          const {
            rawNode
          } = tmNode;
          return renderIcon ? renderIcon(rawNode) : rawNode.icon;
        });
      }),
      hasSubmenuRef: computed(() => {
        const {
          value: childrenField
        } = childrenFieldRef;
        return props.tmNodes.some((tmNode) => {
          var _a;
          if (tmNode.isGroup) {
            return (_a = tmNode.children) === null || _a === void 0 ? void 0 : _a.some(({
              rawNode: rawChild
            }) => isSubmenuNode(rawChild, childrenField));
          }
          const {
            rawNode
          } = tmNode;
          return isSubmenuNode(rawNode, childrenField);
        });
      })
    });
    const bodyRef = ref(null);
    provide(modalBodyInjectionKey, null);
    provide(drawerBodyInjectionKey, null);
    provide(popoverBodyInjectionKey, bodyRef);
    return {
      bodyRef
    };
  },
  render() {
    const {
      parentKey,
      clsPrefix,
      scrollable
    } = this;
    const menuOptionsNode = this.tmNodes.map((tmNode) => {
      const {
        rawNode
      } = tmNode;
      if (rawNode.show === false) return null;
      if (isRenderNode(rawNode)) {
        return h(NDropdownRenderOption, {
          tmNode,
          key: tmNode.key
        });
      }
      if (isDividerNode(rawNode)) {
        return h(NDropdownDivider, {
          clsPrefix,
          key: tmNode.key
        });
      }
      if (isGroupNode(rawNode)) {
        return h(NDropdownGroup, {
          clsPrefix,
          tmNode,
          parentKey,
          key: tmNode.key
        });
      }
      return h(NDropdownOption, {
        clsPrefix,
        tmNode,
        parentKey,
        key: tmNode.key,
        props: rawNode.props,
        scrollable
      });
    });
    return h("div", {
      class: [`${clsPrefix}-dropdown-menu`, scrollable && `${clsPrefix}-dropdown-menu--scrollable`],
      ref: "bodyRef"
    }, scrollable ? h(XScrollbar, {
      contentClass: `${clsPrefix}-dropdown-menu__content`
    }, {
      default: () => menuOptionsNode
    }) : menuOptionsNode, this.showArrow ? renderArrow({
      clsPrefix,
      arrowStyle: this.arrowStyle,
      arrowClass: void 0,
      arrowWrapperClass: void 0,
      arrowWrapperStyle: void 0
    }) : null);
  }
});
const style = cB("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [fadeInScaleUpTransition(), cB("dropdown-option", `
 position: relative;
 `, [c$1("a", `
 text-decoration: none;
 color: inherit;
 outline: none;
 `, [c$1("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), cB("dropdown-option-body", `
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `, [c$1("&::before", `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `), cNotM("disabled", [cM("pending", `
 color: var(--n-option-text-color-hover);
 `, [cE("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), c$1("&::before", "background-color: var(--n-option-color-hover);")]), cM("active", `
 color: var(--n-option-text-color-active);
 `, [cE("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), c$1("&::before", "background-color: var(--n-option-color-active);")]), cM("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [cE("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), cM("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), cM("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [cE("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [cM("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), cE("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [cM("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), cB("icon", `
 font-size: var(--n-option-icon-size);
 `)]), cE("label", `
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `), cE("suffix", `
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `, [cM("has-submenu", `
 width: var(--n-option-icon-suffix-width);
 `), cB("icon", `
 font-size: var(--n-option-icon-size);
 `)]), cB("dropdown-menu", "pointer-events: all;")]), cB("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), cB("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), cB("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), c$1(">", [cB("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), cNotM("scrollable", `
 padding: var(--n-padding);
 `), cM("scrollable", [cE("content", `
 padding: var(--n-padding);
 `)])]);
const dropdownBaseProps = {
  animated: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "medium"
  },
  inverted: Boolean,
  placement: {
    type: String,
    default: "bottom"
  },
  onSelect: [Function, Array],
  options: {
    type: Array,
    default: () => []
  },
  menuProps: Function,
  showArrow: Boolean,
  renderLabel: Function,
  renderIcon: Function,
  renderOption: Function,
  nodeProps: Function,
  labelField: {
    type: String,
    default: "label"
  },
  keyField: {
    type: String,
    default: "key"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  // for menu, not documented
  value: [String, Number]
};
const popoverPropKeys = Object.keys(popoverBaseProps);
const dropdownProps = Object.assign(Object.assign(Object.assign({}, popoverBaseProps), dropdownBaseProps), useTheme.props);
const NDropdown = defineComponent({
  name: "Dropdown",
  inheritAttrs: false,
  props: dropdownProps,
  setup(props) {
    const uncontrolledShowRef = ref(false);
    const mergedShowRef = useMergedState(toRef(props, "show"), uncontrolledShowRef);
    const treemateRef = computed(() => {
      const {
        keyField,
        childrenField
      } = props;
      return createTreeMate(props.options, {
        getKey(node) {
          return node[keyField];
        },
        getDisabled(node) {
          return node.disabled === true;
        },
        getIgnored(node) {
          return node.type === "divider" || node.type === "render";
        },
        getChildren(node) {
          return node[childrenField];
        }
      });
    });
    const tmNodesRef = computed(() => {
      return treemateRef.value.treeNodes;
    });
    const hoverKeyRef = ref(null);
    const keyboardKeyRef = ref(null);
    const lastToggledSubmenuKeyRef = ref(null);
    const pendingKeyRef = computed(() => {
      var _a, _b, _c;
      return (_c = (_b = (_a = hoverKeyRef.value) !== null && _a !== void 0 ? _a : keyboardKeyRef.value) !== null && _b !== void 0 ? _b : lastToggledSubmenuKeyRef.value) !== null && _c !== void 0 ? _c : null;
    });
    const pendingKeyPathRef = computed(() => treemateRef.value.getPath(pendingKeyRef.value).keyPath);
    const activeKeyPathRef = computed(() => treemateRef.value.getPath(props.value).keyPath);
    const keyboardEnabledRef = useMemo(() => {
      return props.keyboard && mergedShowRef.value;
    });
    useKeyboard({
      keydown: {
        ArrowUp: {
          prevent: true,
          handler: handleKeydownUp
        },
        ArrowRight: {
          prevent: true,
          handler: handleKeydownRight
        },
        ArrowDown: {
          prevent: true,
          handler: handleKeydownDown
        },
        ArrowLeft: {
          prevent: true,
          handler: handleKeydownLeft
        },
        Enter: {
          prevent: true,
          handler: handleKeydownEnter
        },
        Escape: handleKeydownEsc
      }
    }, keyboardEnabledRef);
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme("Dropdown", "-dropdown", style, dropdownLight, props, mergedClsPrefixRef);
    provide(dropdownInjectionKey, {
      labelFieldRef: toRef(props, "labelField"),
      childrenFieldRef: toRef(props, "childrenField"),
      renderLabelRef: toRef(props, "renderLabel"),
      renderIconRef: toRef(props, "renderIcon"),
      hoverKeyRef,
      keyboardKeyRef,
      lastToggledSubmenuKeyRef,
      pendingKeyPathRef,
      activeKeyPathRef,
      animatedRef: toRef(props, "animated"),
      mergedShowRef,
      nodePropsRef: toRef(props, "nodeProps"),
      renderOptionRef: toRef(props, "renderOption"),
      menuPropsRef: toRef(props, "menuProps"),
      doSelect,
      doUpdateShow
    });
    watch(mergedShowRef, (value) => {
      if (!props.animated && !value) {
        clearPendingState();
      }
    });
    function doSelect(key, node) {
      const {
        onSelect
      } = props;
      if (onSelect) call(onSelect, key, node);
    }
    function doUpdateShow(value) {
      const {
        "onUpdate:show": _onUpdateShow,
        onUpdateShow
      } = props;
      if (_onUpdateShow) call(_onUpdateShow, value);
      if (onUpdateShow) call(onUpdateShow, value);
      uncontrolledShowRef.value = value;
    }
    function clearPendingState() {
      hoverKeyRef.value = null;
      keyboardKeyRef.value = null;
      lastToggledSubmenuKeyRef.value = null;
    }
    function handleKeydownEsc() {
      doUpdateShow(false);
    }
    function handleKeydownLeft() {
      handleKeydown("left");
    }
    function handleKeydownRight() {
      handleKeydown("right");
    }
    function handleKeydownUp() {
      handleKeydown("up");
    }
    function handleKeydownDown() {
      handleKeydown("down");
    }
    function handleKeydownEnter() {
      const pendingNode = getPendingNode();
      if ((pendingNode === null || pendingNode === void 0 ? void 0 : pendingNode.isLeaf) && mergedShowRef.value) {
        doSelect(pendingNode.key, pendingNode.rawNode);
        doUpdateShow(false);
      }
    }
    function getPendingNode() {
      var _a;
      const {
        value: treeMate
      } = treemateRef;
      const {
        value: pendingKey
      } = pendingKeyRef;
      if (!treeMate || pendingKey === null) return null;
      return (_a = treeMate.getNode(pendingKey)) !== null && _a !== void 0 ? _a : null;
    }
    function handleKeydown(direction) {
      const {
        value: pendingKey
      } = pendingKeyRef;
      const {
        value: {
          getFirstAvailableNode
        }
      } = treemateRef;
      let nextKeyboardKey = null;
      if (pendingKey === null) {
        const firstNode = getFirstAvailableNode();
        if (firstNode !== null) {
          nextKeyboardKey = firstNode.key;
        }
      } else {
        const currentNode = getPendingNode();
        if (currentNode) {
          let nextNode;
          switch (direction) {
            case "down":
              nextNode = currentNode.getNext();
              break;
            case "up":
              nextNode = currentNode.getPrev();
              break;
            case "right":
              nextNode = currentNode.getChild();
              break;
            case "left":
              nextNode = currentNode.getParent();
              break;
          }
          if (nextNode) nextKeyboardKey = nextNode.key;
        }
      }
      if (nextKeyboardKey !== null) {
        hoverKeyRef.value = null;
        keyboardKeyRef.value = nextKeyboardKey;
      }
    }
    const cssVarsRef = computed(() => {
      const {
        size,
        inverted
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: self2
      } = themeRef.value;
      const {
        padding,
        dividerColor,
        borderRadius,
        optionOpacityDisabled,
        [createKey("optionIconSuffixWidth", size)]: optionIconSuffixWidth,
        [createKey("optionSuffixWidth", size)]: optionSuffixWidth,
        [createKey("optionIconPrefixWidth", size)]: optionIconPrefixWidth,
        [createKey("optionPrefixWidth", size)]: optionPrefixWidth,
        [createKey("fontSize", size)]: fontSize,
        [createKey("optionHeight", size)]: optionHeight,
        [createKey("optionIconSize", size)]: optionIconSize
      } = self2;
      const vars = {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-font-size": fontSize,
        "--n-padding": padding,
        "--n-border-radius": borderRadius,
        "--n-option-height": optionHeight,
        "--n-option-prefix-width": optionPrefixWidth,
        "--n-option-icon-prefix-width": optionIconPrefixWidth,
        "--n-option-suffix-width": optionSuffixWidth,
        "--n-option-icon-suffix-width": optionIconSuffixWidth,
        "--n-option-icon-size": optionIconSize,
        "--n-divider-color": dividerColor,
        "--n-option-opacity-disabled": optionOpacityDisabled
      };
      if (inverted) {
        vars["--n-color"] = self2.colorInverted;
        vars["--n-option-color-hover"] = self2.optionColorHoverInverted;
        vars["--n-option-color-active"] = self2.optionColorActiveInverted;
        vars["--n-option-text-color"] = self2.optionTextColorInverted;
        vars["--n-option-text-color-hover"] = self2.optionTextColorHoverInverted;
        vars["--n-option-text-color-active"] = self2.optionTextColorActiveInverted;
        vars["--n-option-text-color-child-active"] = self2.optionTextColorChildActiveInverted;
        vars["--n-prefix-color"] = self2.prefixColorInverted;
        vars["--n-suffix-color"] = self2.suffixColorInverted;
        vars["--n-group-header-text-color"] = self2.groupHeaderTextColorInverted;
      } else {
        vars["--n-color"] = self2.color;
        vars["--n-option-color-hover"] = self2.optionColorHover;
        vars["--n-option-color-active"] = self2.optionColorActive;
        vars["--n-option-text-color"] = self2.optionTextColor;
        vars["--n-option-text-color-hover"] = self2.optionTextColorHover;
        vars["--n-option-text-color-active"] = self2.optionTextColorActive;
        vars["--n-option-text-color-child-active"] = self2.optionTextColorChildActive;
        vars["--n-prefix-color"] = self2.prefixColor;
        vars["--n-suffix-color"] = self2.suffixColor;
        vars["--n-group-header-text-color"] = self2.groupHeaderTextColor;
      }
      return vars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("dropdown", computed(() => `${props.size[0]}${props.inverted ? "i" : ""}`), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      // data
      tmNodes: tmNodesRef,
      // show
      mergedShow: mergedShowRef,
      // methods
      handleAfterLeave: () => {
        if (!props.animated) return;
        clearPendingState();
      },
      doUpdateShow,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const renderPopoverBody = (className, ref2, style2, onMouseenter, onMouseleave) => {
      var _a;
      const {
        mergedClsPrefix,
        menuProps
      } = this;
      (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
      const menuNodeProps = (menuProps === null || menuProps === void 0 ? void 0 : menuProps(void 0, this.tmNodes.map((v) => v.rawNode))) || {};
      const dropdownProps2 = {
        ref: createRefSetter(ref2),
        class: [className, `${mergedClsPrefix}-dropdown`, this.themeClass],
        clsPrefix: mergedClsPrefix,
        tmNodes: this.tmNodes,
        style: [...style2, this.cssVars],
        showArrow: this.showArrow,
        arrowStyle: this.arrowStyle,
        scrollable: this.scrollable,
        onMouseenter,
        onMouseleave
      };
      return h(NDropdownMenu, mergeProps(this.$attrs, dropdownProps2, menuNodeProps));
    };
    const {
      mergedTheme
    } = this;
    const popoverProps2 = {
      show: this.mergedShow,
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      internalOnAfterLeave: this.handleAfterLeave,
      internalRenderBody: renderPopoverBody,
      onUpdateShow: this.doUpdateShow,
      "onUpdate:show": void 0
    };
    return h(NPopover, Object.assign({}, keep(this.$props, popoverPropKeys), popoverProps2), {
      trigger: () => {
        var _a, _b;
        return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    });
  }
});
const commonVars$6 = {
  itemFontSize: "12px",
  itemHeight: "36px",
  itemWidth: "52px",
  panelActionPadding: "8px 0"
};
function self$o(vars) {
  const {
    popoverColor,
    textColor2,
    primaryColor,
    hoverColor,
    dividerColor,
    opacityDisabled,
    boxShadow2,
    borderRadius,
    iconColor,
    iconColorDisabled
  } = vars;
  return Object.assign(Object.assign({}, commonVars$6), {
    panelColor: popoverColor,
    panelBoxShadow: boxShadow2,
    panelDividerColor: dividerColor,
    itemTextColor: textColor2,
    itemTextColorActive: primaryColor,
    itemColorHover: hoverColor,
    itemOpacityDisabled: opacityDisabled,
    itemBorderRadius: borderRadius,
    borderRadius,
    iconColor,
    iconColorDisabled
  });
}
const timePickerDark = {
  name: "TimePicker",
  common: derived,
  peers: {
    Scrollbar: scrollbarDark,
    Button: buttonDark,
    Input: inputDark
  },
  self: self$o
};
const commonVars$5 = {
  itemSize: "24px",
  itemCellWidth: "38px",
  itemCellHeight: "32px",
  scrollItemWidth: "80px",
  scrollItemHeight: "40px",
  panelExtraFooterPadding: "8px 12px",
  panelActionPadding: "8px 12px",
  calendarTitlePadding: "0",
  calendarTitleHeight: "28px",
  arrowSize: "14px",
  panelHeaderPadding: "8px 12px",
  calendarDaysHeight: "32px",
  calendarTitleGridTempateColumns: "28px 28px 1fr 28px 28px",
  // type
  calendarLeftPaddingDate: "6px 12px 4px 12px",
  calendarLeftPaddingDatetime: "4px 12px",
  calendarLeftPaddingDaterange: "6px 12px 4px 12px",
  calendarLeftPaddingDatetimerange: "4px 12px",
  calendarLeftPaddingMonth: "0",
  // TODO: make it actually effective
  calendarLeftPaddingYear: "0",
  calendarLeftPaddingQuarter: "0",
  calendarLeftPaddingMonthrange: "0",
  calendarLeftPaddingQuarterrange: "0",
  calendarLeftPaddingYearrange: "0",
  calendarLeftPaddingWeek: "6px 12px 4px 12px",
  calendarRightPaddingDate: "6px 12px 4px 12px",
  calendarRightPaddingDatetime: "4px 12px",
  calendarRightPaddingDaterange: "6px 12px 4px 12px",
  calendarRightPaddingDatetimerange: "4px 12px",
  calendarRightPaddingMonth: "0",
  calendarRightPaddingYear: "0",
  calendarRightPaddingQuarter: "0",
  calendarRightPaddingMonthrange: "0",
  calendarRightPaddingQuarterrange: "0",
  calendarRightPaddingYearrange: "0",
  calendarRightPaddingWeek: "0"
};
function self$n(vars) {
  const {
    hoverColor,
    fontSize,
    textColor2,
    textColorDisabled,
    popoverColor,
    primaryColor,
    borderRadiusSmall,
    iconColor,
    iconColorDisabled,
    textColor1,
    dividerColor,
    boxShadow2,
    borderRadius,
    fontWeightStrong
  } = vars;
  return Object.assign(Object.assign({}, commonVars$5), {
    itemFontSize: fontSize,
    calendarDaysFontSize: fontSize,
    calendarTitleFontSize: fontSize,
    itemTextColor: textColor2,
    itemTextColorDisabled: textColorDisabled,
    itemTextColorActive: popoverColor,
    itemTextColorCurrent: primaryColor,
    itemColorIncluded: changeColor(primaryColor, {
      alpha: 0.1
    }),
    itemColorHover: hoverColor,
    itemColorDisabled: hoverColor,
    itemColorActive: primaryColor,
    itemBorderRadius: borderRadiusSmall,
    panelColor: popoverColor,
    panelTextColor: textColor2,
    arrowColor: iconColor,
    calendarTitleTextColor: textColor1,
    calendarTitleColorHover: hoverColor,
    calendarDaysTextColor: textColor2,
    panelHeaderDividerColor: dividerColor,
    calendarDaysDividerColor: dividerColor,
    calendarDividerColor: dividerColor,
    panelActionDividerColor: dividerColor,
    panelBoxShadow: boxShadow2,
    panelBorderRadius: borderRadius,
    calendarTitleFontWeight: fontWeightStrong,
    scrollItemBorderRadius: borderRadius,
    iconColor,
    iconColorDisabled
  });
}
const datePickerDark = {
  name: "DatePicker",
  common: derived,
  peers: {
    Input: inputDark,
    Button: buttonDark,
    TimePicker: timePickerDark,
    Scrollbar: scrollbarDark
  },
  self(vars) {
    const {
      popoverColor,
      hoverColor,
      primaryColor
    } = vars;
    const commonSelf = self$n(vars);
    commonSelf.itemColorDisabled = composite(popoverColor, hoverColor);
    commonSelf.itemColorIncluded = changeColor(primaryColor, {
      alpha: 0.15
    });
    commonSelf.itemColorHover = composite(popoverColor, hoverColor);
    return commonSelf;
  }
};
const commonVariables$6 = {
  thPaddingBorderedSmall: "8px 12px",
  thPaddingBorderedMedium: "12px 16px",
  thPaddingBorderedLarge: "16px 24px",
  thPaddingSmall: "0",
  thPaddingMedium: "0",
  thPaddingLarge: "0",
  tdPaddingBorderedSmall: "8px 12px",
  tdPaddingBorderedMedium: "12px 16px",
  tdPaddingBorderedLarge: "16px 24px",
  tdPaddingSmall: "0 0 8px 0",
  tdPaddingMedium: "0 0 12px 0",
  tdPaddingLarge: "0 0 16px 0"
};
function self$m(vars) {
  const {
    tableHeaderColor,
    textColor2,
    textColor1,
    cardColor,
    modalColor,
    popoverColor,
    dividerColor,
    borderRadius,
    fontWeightStrong,
    lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$6), {
    lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    titleTextColor: textColor1,
    thColor: composite(cardColor, tableHeaderColor),
    thColorModal: composite(modalColor, tableHeaderColor),
    thColorPopover: composite(popoverColor, tableHeaderColor),
    thTextColor: textColor1,
    thFontWeight: fontWeightStrong,
    tdTextColor: textColor2,
    tdColor: cardColor,
    tdColorModal: modalColor,
    tdColorPopover: popoverColor,
    borderColor: composite(cardColor, dividerColor),
    borderColorModal: composite(modalColor, dividerColor),
    borderColorPopover: composite(popoverColor, dividerColor),
    borderRadius
  });
}
const descriptionsDark = {
  name: "Descriptions",
  common: derived,
  self: self$m
};
const dialogDark = {
  name: "Dialog",
  common: derived,
  peers: {
    Button: buttonDark
  },
  self: self$M
};
const modalDark = {
  name: "Modal",
  common: derived,
  peers: {
    Scrollbar: scrollbarDark,
    Dialog: dialogDark,
    Card: cardDark
  },
  self: self$N
};
const loadingBarDark = {
  name: "LoadingBar",
  common: derived,
  self(vars) {
    const {
      primaryColor
    } = vars;
    return {
      colorError: "red",
      colorLoading: primaryColor,
      height: "2px"
    };
  }
};
const messageDark = {
  name: "Message",
  common: derived,
  self: self$O
};
const notificationDark = {
  name: "Notification",
  common: derived,
  peers: {
    Scrollbar: scrollbarDark
  },
  self: self$P
};
function self$l(vars) {
  const {
    textColor1,
    dividerColor,
    fontWeightStrong
  } = vars;
  return {
    textColor: textColor1,
    color: dividerColor,
    fontWeight: fontWeightStrong
  };
}
const dividerDark = {
  name: "Divider",
  common: derived,
  self: self$l
};
function self$k(vars) {
  const {
    modalColor,
    textColor1,
    textColor2,
    boxShadow3,
    lineHeight,
    fontWeightStrong,
    dividerColor,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    borderRadius,
    primaryColorHover
  } = vars;
  return {
    bodyPadding: "16px 24px",
    borderRadius,
    headerPadding: "16px 24px",
    footerPadding: "16px 24px",
    color: modalColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    titleFontSize: "18px",
    titleFontWeight: fontWeightStrong,
    boxShadow: boxShadow3,
    lineHeight,
    headerBorderBottom: `1px solid ${dividerColor}`,
    footerBorderTop: `1px solid ${dividerColor}`,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeSize: "22px",
    closeIconSize: "18px",
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadius,
    resizableTriggerColorHover: primaryColorHover
  };
}
const drawerDark = {
  name: "Drawer",
  common: derived,
  peers: {
    Scrollbar: scrollbarDark
  },
  self: self$k
};
const commonVariables$5 = {
  actionMargin: "0 0 0 20px",
  actionMarginRtl: "0 20px 0 0"
};
const dynamicInputDark = {
  name: "DynamicInput",
  common: derived,
  peers: {
    Input: inputDark,
    Button: buttonDark
  },
  self() {
    return commonVariables$5;
  }
};
const commonVars$4 = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
};
const spaceDark = {
  name: "Space",
  self() {
    return commonVars$4;
  }
};
const dynamicTagsDark = {
  name: "DynamicTags",
  common: derived,
  peers: {
    Input: inputDark,
    Button: buttonDark,
    Tag: tagDark,
    Space: spaceDark
  },
  self() {
    return {
      inputWidth: "64px"
    };
  }
};
const elementDark = {
  name: "Element",
  common: derived
};
const commonVars$3 = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
};
const flexDark = {
  name: "Flex",
  self() {
    return commonVars$3;
  }
};
const buttonGroupDark = {
  name: "ButtonGroup",
  common: derived
};
const commonVariables$4 = {
  feedbackPadding: "4px 0 0 2px",
  feedbackHeightSmall: "24px",
  feedbackHeightMedium: "24px",
  feedbackHeightLarge: "26px",
  feedbackFontSizeSmall: "13px",
  feedbackFontSizeMedium: "14px",
  feedbackFontSizeLarge: "14px",
  labelFontSizeLeftSmall: "14px",
  labelFontSizeLeftMedium: "14px",
  labelFontSizeLeftLarge: "15px",
  labelFontSizeTopSmall: "13px",
  labelFontSizeTopMedium: "14px",
  labelFontSizeTopLarge: "14px",
  labelHeightSmall: "24px",
  labelHeightMedium: "26px",
  labelHeightLarge: "28px",
  labelPaddingVertical: "0 0 6px 2px",
  labelPaddingHorizontal: "0 12px 0 0",
  labelTextAlignVertical: "left",
  labelTextAlignHorizontal: "right",
  labelFontWeight: "400"
};
function self$j(vars) {
  const {
    heightSmall,
    heightMedium,
    heightLarge,
    textColor1,
    errorColor,
    warningColor,
    lineHeight,
    textColor3
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$4), {
    blankHeightSmall: heightSmall,
    blankHeightMedium: heightMedium,
    blankHeightLarge: heightLarge,
    lineHeight,
    labelTextColor: textColor1,
    asteriskColor: errorColor,
    feedbackTextColorError: errorColor,
    feedbackTextColorWarning: warningColor,
    feedbackTextColor: textColor3
  });
}
const formItemDark = {
  name: "Form",
  common: derived,
  self: self$j
};
const gradientTextDark = {
  name: "GradientText",
  common: derived,
  self(vars) {
    const {
      primaryColor,
      successColor,
      warningColor,
      errorColor,
      infoColor,
      primaryColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      errorColorSuppl,
      infoColorSuppl,
      fontWeightStrong
    } = vars;
    return {
      fontWeight: fontWeightStrong,
      rotate: "252deg",
      colorStartPrimary: primaryColor,
      colorEndPrimary: primaryColorSuppl,
      colorStartInfo: infoColor,
      colorEndInfo: infoColorSuppl,
      colorStartWarning: warningColor,
      colorEndWarning: warningColorSuppl,
      colorStartError: errorColor,
      colorEndError: errorColorSuppl,
      colorStartSuccess: successColor,
      colorEndSuccess: successColorSuppl
    };
  }
};
const inputNumberDark = {
  name: "InputNumber",
  common: derived,
  peers: {
    Button: buttonDark,
    Input: inputDark
  },
  self(vars) {
    const {
      textColorDisabled
    } = vars;
    return {
      iconColorDisabled: textColorDisabled
    };
  }
};
function self$i() {
  return {
    inputWidthSmall: "24px",
    inputWidthMedium: "30px",
    inputWidthLarge: "36px",
    gapSmall: "8px",
    gapMedium: "8px",
    gapLarge: "8px"
  };
}
const inputOtpDark = {
  name: "InputOtp",
  common: derived,
  peers: {
    Input: inputDark
  },
  self: self$i
};
const layoutDark = {
  name: "Layout",
  common: derived,
  peers: {
    Scrollbar: scrollbarDark
  },
  self(vars) {
    const {
      textColor2,
      bodyColor,
      popoverColor,
      cardColor,
      dividerColor,
      scrollbarColor,
      scrollbarColorHover
    } = vars;
    return {
      textColor: textColor2,
      textColorInverted: textColor2,
      color: bodyColor,
      colorEmbedded: bodyColor,
      headerColor: cardColor,
      headerColorInverted: cardColor,
      footerColor: cardColor,
      footerColorInverted: cardColor,
      headerBorderColor: dividerColor,
      headerBorderColorInverted: dividerColor,
      footerBorderColor: dividerColor,
      footerBorderColorInverted: dividerColor,
      siderBorderColor: dividerColor,
      siderBorderColorInverted: dividerColor,
      siderColor: cardColor,
      siderColorInverted: cardColor,
      siderToggleButtonBorder: "1px solid transparent",
      siderToggleButtonColor: popoverColor,
      siderToggleButtonIconColor: textColor2,
      siderToggleButtonIconColorInverted: textColor2,
      siderToggleBarColor: composite(bodyColor, scrollbarColor),
      siderToggleBarColorHover: composite(bodyColor, scrollbarColorHover),
      __invertScrollbar: "false"
    };
  }
};
const rowDark = {
  name: "Row",
  common: derived
};
function self$h(vars) {
  const {
    textColor2,
    cardColor,
    modalColor,
    popoverColor,
    dividerColor,
    borderRadius,
    fontSize,
    hoverColor
  } = vars;
  return {
    textColor: textColor2,
    color: cardColor,
    colorHover: hoverColor,
    colorModal: modalColor,
    colorHoverModal: composite(modalColor, hoverColor),
    colorPopover: popoverColor,
    colorHoverPopover: composite(popoverColor, hoverColor),
    borderColor: dividerColor,
    borderColorModal: composite(modalColor, dividerColor),
    borderColorPopover: composite(popoverColor, dividerColor),
    borderRadius,
    fontSize
  };
}
const listDark$1 = {
  name: "List",
  common: derived,
  self: self$h
};
const logDark = {
  name: "Log",
  common: derived,
  peers: {
    Scrollbar: scrollbarDark,
    Code: codeDark
  },
  self(vars) {
    const {
      textColor2,
      inputColor,
      fontSize,
      primaryColor
    } = vars;
    return {
      loaderFontSize: fontSize,
      loaderTextColor: textColor2,
      loaderColor: inputColor,
      loaderBorder: "1px solid #0000",
      loadingColor: primaryColor
    };
  }
};
const listDark = {
  name: "Mention",
  common: derived,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    Input: inputDark
  },
  self(vars) {
    const {
      boxShadow2
    } = vars;
    return {
      menuBoxShadow: boxShadow2
    };
  }
};
function createPartialInvertedVars(color, activeItemColor, activeTextColor, groupTextColor) {
  return {
    itemColorHoverInverted: "#0000",
    itemColorActiveInverted: activeItemColor,
    itemColorActiveHoverInverted: activeItemColor,
    itemColorActiveCollapsedInverted: activeItemColor,
    itemTextColorInverted: color,
    itemTextColorHoverInverted: activeTextColor,
    itemTextColorChildActiveInverted: activeTextColor,
    itemTextColorChildActiveHoverInverted: activeTextColor,
    itemTextColorActiveInverted: activeTextColor,
    itemTextColorActiveHoverInverted: activeTextColor,
    itemTextColorHorizontalInverted: color,
    itemTextColorHoverHorizontalInverted: activeTextColor,
    itemTextColorChildActiveHorizontalInverted: activeTextColor,
    itemTextColorChildActiveHoverHorizontalInverted: activeTextColor,
    itemTextColorActiveHorizontalInverted: activeTextColor,
    itemTextColorActiveHoverHorizontalInverted: activeTextColor,
    itemIconColorInverted: color,
    itemIconColorHoverInverted: activeTextColor,
    itemIconColorActiveInverted: activeTextColor,
    itemIconColorActiveHoverInverted: activeTextColor,
    itemIconColorChildActiveInverted: activeTextColor,
    itemIconColorChildActiveHoverInverted: activeTextColor,
    itemIconColorCollapsedInverted: color,
    itemIconColorHorizontalInverted: color,
    itemIconColorHoverHorizontalInverted: activeTextColor,
    itemIconColorActiveHorizontalInverted: activeTextColor,
    itemIconColorActiveHoverHorizontalInverted: activeTextColor,
    itemIconColorChildActiveHorizontalInverted: activeTextColor,
    itemIconColorChildActiveHoverHorizontalInverted: activeTextColor,
    arrowColorInverted: color,
    arrowColorHoverInverted: activeTextColor,
    arrowColorActiveInverted: activeTextColor,
    arrowColorActiveHoverInverted: activeTextColor,
    arrowColorChildActiveInverted: activeTextColor,
    arrowColorChildActiveHoverInverted: activeTextColor,
    groupTextColorInverted: groupTextColor
  };
}
function self$g(vars) {
  const {
    borderRadius,
    textColor3,
    primaryColor,
    textColor2,
    textColor1,
    fontSize,
    dividerColor,
    hoverColor,
    primaryColorHover
  } = vars;
  return Object.assign({
    borderRadius,
    color: "#0000",
    groupTextColor: textColor3,
    itemColorHover: hoverColor,
    itemColorActive: changeColor(primaryColor, {
      alpha: 0.1
    }),
    itemColorActiveHover: changeColor(primaryColor, {
      alpha: 0.1
    }),
    itemColorActiveCollapsed: changeColor(primaryColor, {
      alpha: 0.1
    }),
    itemTextColor: textColor2,
    itemTextColorHover: textColor2,
    itemTextColorActive: primaryColor,
    itemTextColorActiveHover: primaryColor,
    itemTextColorChildActive: primaryColor,
    itemTextColorChildActiveHover: primaryColor,
    itemTextColorHorizontal: textColor2,
    itemTextColorHoverHorizontal: primaryColorHover,
    itemTextColorActiveHorizontal: primaryColor,
    itemTextColorActiveHoverHorizontal: primaryColor,
    itemTextColorChildActiveHorizontal: primaryColor,
    itemTextColorChildActiveHoverHorizontal: primaryColor,
    itemIconColor: textColor1,
    itemIconColorHover: textColor1,
    itemIconColorActive: primaryColor,
    itemIconColorActiveHover: primaryColor,
    itemIconColorChildActive: primaryColor,
    itemIconColorChildActiveHover: primaryColor,
    itemIconColorCollapsed: textColor1,
    itemIconColorHorizontal: textColor1,
    itemIconColorHoverHorizontal: primaryColorHover,
    itemIconColorActiveHorizontal: primaryColor,
    itemIconColorActiveHoverHorizontal: primaryColor,
    itemIconColorChildActiveHorizontal: primaryColor,
    itemIconColorChildActiveHoverHorizontal: primaryColor,
    itemHeight: "42px",
    arrowColor: textColor2,
    arrowColorHover: textColor2,
    arrowColorActive: primaryColor,
    arrowColorActiveHover: primaryColor,
    arrowColorChildActive: primaryColor,
    arrowColorChildActiveHover: primaryColor,
    colorInverted: "#0000",
    borderColorHorizontal: "#0000",
    fontSize,
    dividerColor
  }, createPartialInvertedVars("#BBB", primaryColor, "#FFF", "#AAA"));
}
const menuDark = {
  name: "Menu",
  common: derived,
  peers: {
    Tooltip: tooltipDark,
    Dropdown: dropdownDark
  },
  self(vars) {
    const {
      primaryColor,
      primaryColorSuppl
    } = vars;
    const commonSelf = self$g(vars);
    commonSelf.itemColorActive = changeColor(primaryColor, {
      alpha: 0.15
    });
    commonSelf.itemColorActiveHover = changeColor(primaryColor, {
      alpha: 0.15
    });
    commonSelf.itemColorActiveCollapsed = changeColor(primaryColor, {
      alpha: 0.15
    });
    commonSelf.itemColorActiveInverted = primaryColorSuppl;
    commonSelf.itemColorActiveHoverInverted = primaryColorSuppl;
    commonSelf.itemColorActiveCollapsedInverted = primaryColorSuppl;
    return commonSelf;
  }
};
const common = {
  titleFontSize: "18px",
  backSize: "22px"
};
function self$f(vars) {
  const {
    textColor1,
    textColor2,
    textColor3,
    fontSize,
    fontWeightStrong,
    primaryColorHover,
    primaryColorPressed
  } = vars;
  return Object.assign(Object.assign({}, common), {
    titleFontWeight: fontWeightStrong,
    fontSize,
    titleTextColor: textColor1,
    backColor: textColor2,
    backColorHover: primaryColorHover,
    backColorPressed: primaryColorPressed,
    subtitleTextColor: textColor3
  });
}
const pageHeaderDark = {
  name: "PageHeader",
  common: derived,
  self: self$f
};
const commonVars$2 = {
  iconSize: "22px"
};
function self$e(vars) {
  const {
    fontSize,
    warningColor
  } = vars;
  return Object.assign(Object.assign({}, commonVars$2), {
    fontSize,
    iconColor: warningColor
  });
}
const popconfirmDark = {
  name: "Popconfirm",
  common: derived,
  peers: {
    Button: buttonDark,
    Popover: popoverDark
  },
  self: self$e
};
function self$d(vars) {
  const {
    infoColor,
    successColor,
    warningColor,
    errorColor,
    textColor2,
    progressRailColor,
    fontSize,
    fontWeight
  } = vars;
  return {
    fontSize,
    fontSizeCircle: "28px",
    fontWeightCircle: fontWeight,
    railColor: progressRailColor,
    railHeight: "8px",
    iconSizeCircle: "36px",
    iconSizeLine: "18px",
    iconColor: infoColor,
    iconColorInfo: infoColor,
    iconColorSuccess: successColor,
    iconColorWarning: warningColor,
    iconColorError: errorColor,
    textColorCircle: textColor2,
    textColorLineInner: "rgb(255, 255, 255)",
    textColorLineOuter: textColor2,
    fillColor: infoColor,
    fillColorInfo: infoColor,
    fillColorSuccess: successColor,
    fillColorWarning: warningColor,
    fillColorError: errorColor,
    lineBgProcessing: "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)"
  };
}
const progressDark = {
  name: "Progress",
  common: derived,
  self(vars) {
    const commonSelf = self$d(vars);
    commonSelf.textColorLineInner = "rgb(0, 0, 0)";
    commonSelf.lineBgProcessing = "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)";
    return commonSelf;
  }
};
const rateDark = {
  name: "Rate",
  common: derived,
  self(vars) {
    const {
      railColor
    } = vars;
    return {
      itemColor: railColor,
      itemColorActive: "#CCAA33",
      itemSize: "20px",
      sizeSmall: "16px",
      sizeMedium: "20px",
      sizeLarge: "24px"
    };
  }
};
const commonVariables$3 = {
  titleFontSizeSmall: "26px",
  titleFontSizeMedium: "32px",
  titleFontSizeLarge: "40px",
  titleFontSizeHuge: "48px",
  fontSizeSmall: "14px",
  fontSizeMedium: "14px",
  fontSizeLarge: "15px",
  fontSizeHuge: "16px",
  iconSizeSmall: "64px",
  iconSizeMedium: "80px",
  iconSizeLarge: "100px",
  iconSizeHuge: "125px",
  iconColor418: void 0,
  iconColor404: void 0,
  iconColor403: void 0,
  iconColor500: void 0
};
function self$c(vars) {
  const {
    textColor2,
    textColor1,
    errorColor,
    successColor,
    infoColor,
    warningColor,
    lineHeight,
    fontWeightStrong
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$3), {
    lineHeight,
    titleFontWeight: fontWeightStrong,
    titleTextColor: textColor1,
    textColor: textColor2,
    iconColorError: errorColor,
    iconColorSuccess: successColor,
    iconColorInfo: infoColor,
    iconColorWarning: warningColor
  });
}
const resultDark = {
  name: "Result",
  common: derived,
  self: self$c
};
const sizeVariables$3 = {
  railHeight: "4px",
  railWidthVertical: "4px",
  handleSize: "18px",
  dotHeight: "8px",
  dotWidth: "8px",
  dotBorderRadius: "4px"
};
const sliderDark = {
  name: "Slider",
  common: derived,
  self(vars) {
    const boxShadow = "0 2px 8px 0 rgba(0, 0, 0, 0.12)";
    const {
      railColor,
      modalColor,
      primaryColorSuppl,
      popoverColor,
      textColor2,
      cardColor,
      borderRadius,
      fontSize,
      opacityDisabled
    } = vars;
    return Object.assign(Object.assign({}, sizeVariables$3), {
      fontSize,
      markFontSize: fontSize,
      railColor,
      railColorHover: railColor,
      fillColor: primaryColorSuppl,
      fillColorHover: primaryColorSuppl,
      opacityDisabled,
      handleColor: "#FFF",
      dotColor: cardColor,
      dotColorModal: modalColor,
      dotColorPopover: popoverColor,
      handleBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
      handleBoxShadowHover: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
      handleBoxShadowActive: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
      handleBoxShadowFocus: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
      indicatorColor: popoverColor,
      indicatorBoxShadow: boxShadow,
      indicatorTextColor: textColor2,
      indicatorBorderRadius: borderRadius,
      dotBorder: `2px solid ${railColor}`,
      dotBorderActive: `2px solid ${primaryColorSuppl}`,
      dotBoxShadow: ""
    });
  }
};
function self$b(vars) {
  const {
    opacityDisabled,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    primaryColor,
    fontSize
  } = vars;
  return {
    fontSize,
    textColor: primaryColor,
    sizeTiny: heightTiny,
    sizeSmall: heightSmall,
    sizeMedium: heightMedium,
    sizeLarge: heightLarge,
    sizeHuge: heightHuge,
    color: primaryColor,
    opacitySpinning: opacityDisabled
  };
}
const spinDark = {
  name: "Spin",
  common: derived,
  self: self$b
};
function self$a(vars) {
  const {
    textColor2,
    textColor3,
    fontSize,
    fontWeight
  } = vars;
  return {
    labelFontSize: fontSize,
    labelFontWeight: fontWeight,
    valueFontWeight: fontWeight,
    valueFontSize: "24px",
    labelTextColor: textColor3,
    valuePrefixTextColor: textColor2,
    valueSuffixTextColor: textColor2,
    valueTextColor: textColor2
  };
}
const statisticDark = {
  name: "Statistic",
  common: derived,
  self: self$a
};
const commonVariables$2 = {
  stepHeaderFontSizeSmall: "14px",
  stepHeaderFontSizeMedium: "16px",
  indicatorIndexFontSizeSmall: "14px",
  indicatorIndexFontSizeMedium: "16px",
  indicatorSizeSmall: "22px",
  indicatorSizeMedium: "28px",
  indicatorIconSizeSmall: "14px",
  indicatorIconSizeMedium: "18px"
};
function self$9(vars) {
  const {
    fontWeightStrong,
    baseColor,
    textColorDisabled,
    primaryColor,
    errorColor,
    textColor1,
    textColor2
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$2), {
    stepHeaderFontWeight: fontWeightStrong,
    indicatorTextColorProcess: baseColor,
    indicatorTextColorWait: textColorDisabled,
    indicatorTextColorFinish: primaryColor,
    indicatorTextColorError: errorColor,
    indicatorBorderColorProcess: primaryColor,
    indicatorBorderColorWait: textColorDisabled,
    indicatorBorderColorFinish: primaryColor,
    indicatorBorderColorError: errorColor,
    indicatorColorProcess: primaryColor,
    indicatorColorWait: "#0000",
    indicatorColorFinish: "#0000",
    indicatorColorError: "#0000",
    splitorColorProcess: textColorDisabled,
    splitorColorWait: textColorDisabled,
    splitorColorFinish: primaryColor,
    splitorColorError: textColorDisabled,
    headerTextColorProcess: textColor1,
    headerTextColorWait: textColorDisabled,
    headerTextColorFinish: textColorDisabled,
    headerTextColorError: errorColor,
    descriptionTextColorProcess: textColor2,
    descriptionTextColorWait: textColorDisabled,
    descriptionTextColorFinish: textColorDisabled,
    descriptionTextColorError: errorColor
  });
}
const stepsDark = {
  name: "Steps",
  common: derived,
  self: self$9
};
const commonVars$1 = {
  buttonHeightSmall: "14px",
  buttonHeightMedium: "18px",
  buttonHeightLarge: "22px",
  buttonWidthSmall: "14px",
  buttonWidthMedium: "18px",
  buttonWidthLarge: "22px",
  buttonWidthPressedSmall: "20px",
  buttonWidthPressedMedium: "24px",
  buttonWidthPressedLarge: "28px",
  railHeightSmall: "18px",
  railHeightMedium: "22px",
  railHeightLarge: "26px",
  railWidthSmall: "32px",
  railWidthMedium: "40px",
  railWidthLarge: "48px"
};
const switchDark = {
  name: "Switch",
  common: derived,
  self(vars) {
    const {
      primaryColorSuppl,
      opacityDisabled,
      borderRadius,
      primaryColor,
      textColor2,
      baseColor
    } = vars;
    const railOverlayColor = "rgba(255, 255, 255, .20)";
    return Object.assign(Object.assign({}, commonVars$1), {
      iconColor: baseColor,
      textColor: textColor2,
      loadingColor: primaryColorSuppl,
      opacityDisabled,
      railColor: railOverlayColor,
      railColorActive: primaryColorSuppl,
      buttonBoxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0.4)",
      buttonColor: "#FFF",
      railBorderRadiusSmall: borderRadius,
      railBorderRadiusMedium: borderRadius,
      railBorderRadiusLarge: borderRadius,
      buttonBorderRadiusSmall: borderRadius,
      buttonBorderRadiusMedium: borderRadius,
      buttonBorderRadiusLarge: borderRadius,
      boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, {
        alpha: 0.3
      })}`
    });
  }
};
const sizeVariables$2 = {
  thPaddingSmall: "6px",
  thPaddingMedium: "12px",
  thPaddingLarge: "12px",
  tdPaddingSmall: "6px",
  tdPaddingMedium: "12px",
  tdPaddingLarge: "12px"
};
function self$8(vars) {
  const {
    dividerColor,
    cardColor,
    modalColor,
    popoverColor,
    tableHeaderColor,
    tableColorStriped,
    textColor1,
    textColor2,
    borderRadius,
    fontWeightStrong,
    lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge
  } = vars;
  return Object.assign(Object.assign({}, sizeVariables$2), {
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    lineHeight,
    borderRadius,
    borderColor: composite(cardColor, dividerColor),
    borderColorModal: composite(modalColor, dividerColor),
    borderColorPopover: composite(popoverColor, dividerColor),
    tdColor: cardColor,
    tdColorModal: modalColor,
    tdColorPopover: popoverColor,
    tdColorStriped: composite(cardColor, tableColorStriped),
    tdColorStripedModal: composite(modalColor, tableColorStriped),
    tdColorStripedPopover: composite(popoverColor, tableColorStriped),
    thColor: composite(cardColor, tableHeaderColor),
    thColorModal: composite(modalColor, tableHeaderColor),
    thColorPopover: composite(popoverColor, tableHeaderColor),
    thTextColor: textColor1,
    tdTextColor: textColor2,
    thFontWeight: fontWeightStrong
  });
}
const tableDark = {
  name: "Table",
  common: derived,
  self: self$8
};
const sizeVariables$1 = {
  tabFontSizeSmall: "14px",
  tabFontSizeMedium: "14px",
  tabFontSizeLarge: "16px",
  tabGapSmallLine: "36px",
  tabGapMediumLine: "36px",
  tabGapLargeLine: "36px",
  tabGapSmallLineVertical: "8px",
  tabGapMediumLineVertical: "8px",
  tabGapLargeLineVertical: "8px",
  tabPaddingSmallLine: "6px 0",
  tabPaddingMediumLine: "10px 0",
  tabPaddingLargeLine: "14px 0",
  tabPaddingVerticalSmallLine: "6px 12px",
  tabPaddingVerticalMediumLine: "8px 16px",
  tabPaddingVerticalLargeLine: "10px 20px",
  tabGapSmallBar: "36px",
  tabGapMediumBar: "36px",
  tabGapLargeBar: "36px",
  tabGapSmallBarVertical: "8px",
  tabGapMediumBarVertical: "8px",
  tabGapLargeBarVertical: "8px",
  tabPaddingSmallBar: "4px 0",
  tabPaddingMediumBar: "6px 0",
  tabPaddingLargeBar: "10px 0",
  tabPaddingVerticalSmallBar: "6px 12px",
  tabPaddingVerticalMediumBar: "8px 16px",
  tabPaddingVerticalLargeBar: "10px 20px",
  tabGapSmallCard: "4px",
  tabGapMediumCard: "4px",
  tabGapLargeCard: "4px",
  tabGapSmallCardVertical: "4px",
  tabGapMediumCardVertical: "4px",
  tabGapLargeCardVertical: "4px",
  tabPaddingSmallCard: "8px 16px",
  tabPaddingMediumCard: "10px 20px",
  tabPaddingLargeCard: "12px 24px",
  tabPaddingSmallSegment: "4px 0",
  tabPaddingMediumSegment: "6px 0",
  tabPaddingLargeSegment: "8px 0",
  tabPaddingVerticalLargeSegment: "0 8px",
  tabPaddingVerticalSmallCard: "8px 12px",
  tabPaddingVerticalMediumCard: "10px 16px",
  tabPaddingVerticalLargeCard: "12px 20px",
  tabPaddingVerticalSmallSegment: "0 4px",
  tabPaddingVerticalMediumSegment: "0 6px",
  tabGapSmallSegment: "0",
  tabGapMediumSegment: "0",
  tabGapLargeSegment: "0",
  tabGapSmallSegmentVertical: "0",
  tabGapMediumSegmentVertical: "0",
  tabGapLargeSegmentVertical: "0",
  panePaddingSmall: "8px 0 0 0",
  panePaddingMedium: "12px 0 0 0",
  panePaddingLarge: "16px 0 0 0",
  closeSize: "18px",
  closeIconSize: "14px"
};
function self$7(vars) {
  const {
    textColor2,
    primaryColor,
    textColorDisabled,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    tabColor,
    baseColor,
    dividerColor,
    fontWeight,
    textColor1,
    borderRadius,
    fontSize,
    fontWeightStrong
  } = vars;
  return Object.assign(Object.assign({}, sizeVariables$1), {
    colorSegment: tabColor,
    tabFontSizeCard: fontSize,
    tabTextColorLine: textColor1,
    tabTextColorActiveLine: primaryColor,
    tabTextColorHoverLine: primaryColor,
    tabTextColorDisabledLine: textColorDisabled,
    tabTextColorSegment: textColor1,
    tabTextColorActiveSegment: textColor2,
    tabTextColorHoverSegment: textColor2,
    tabTextColorDisabledSegment: textColorDisabled,
    tabTextColorBar: textColor1,
    tabTextColorActiveBar: primaryColor,
    tabTextColorHoverBar: primaryColor,
    tabTextColorDisabledBar: textColorDisabled,
    tabTextColorCard: textColor1,
    tabTextColorHoverCard: textColor1,
    tabTextColorActiveCard: primaryColor,
    tabTextColorDisabledCard: textColorDisabled,
    barColor: primaryColor,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadius,
    tabColor,
    tabColorSegment: baseColor,
    tabBorderColor: dividerColor,
    tabFontWeightActive: fontWeight,
    tabFontWeight: fontWeight,
    tabBorderRadius: borderRadius,
    paneTextColor: textColor2,
    fontWeightStrong
  });
}
const tabsDark = {
  name: "Tabs",
  common: derived,
  self(vars) {
    const commonSelf = self$7(vars);
    const {
      inputColor
    } = vars;
    commonSelf.colorSegment = inputColor;
    commonSelf.tabColorSegment = inputColor;
    return commonSelf;
  }
};
function self$6(vars) {
  const {
    textColor1,
    textColor2,
    fontWeightStrong,
    fontSize
  } = vars;
  return {
    fontSize,
    titleTextColor: textColor1,
    textColor: textColor2,
    titleFontWeight: fontWeightStrong
  };
}
const thingDark = {
  name: "Thing",
  common: derived,
  self: self$6
};
const sizeVariables = {
  titleMarginMedium: "0 0 6px 0",
  titleMarginLarge: "-2px 0 6px 0",
  titleFontSizeMedium: "14px",
  titleFontSizeLarge: "16px",
  iconSizeMedium: "14px",
  iconSizeLarge: "14px"
};
const timelineDark = {
  name: "Timeline",
  common: derived,
  self(vars) {
    const {
      textColor3,
      infoColorSuppl,
      errorColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      textColor1,
      textColor2,
      railColor,
      fontWeightStrong,
      fontSize
    } = vars;
    return Object.assign(Object.assign({}, sizeVariables), {
      contentFontSize: fontSize,
      titleFontWeight: fontWeightStrong,
      circleBorder: `2px solid ${textColor3}`,
      circleBorderInfo: `2px solid ${infoColorSuppl}`,
      circleBorderError: `2px solid ${errorColorSuppl}`,
      circleBorderSuccess: `2px solid ${successColorSuppl}`,
      circleBorderWarning: `2px solid ${warningColorSuppl}`,
      iconColor: textColor3,
      iconColorInfo: infoColorSuppl,
      iconColorError: errorColorSuppl,
      iconColorSuccess: successColorSuppl,
      iconColorWarning: warningColorSuppl,
      titleTextColor: textColor1,
      contentTextColor: textColor2,
      metaTextColor: textColor3,
      lineColor: railColor
    });
  }
};
const commonVariables$1 = {
  extraFontSizeSmall: "12px",
  extraFontSizeMedium: "12px",
  extraFontSizeLarge: "14px",
  titleFontSizeSmall: "14px",
  titleFontSizeMedium: "16px",
  titleFontSizeLarge: "16px",
  closeSize: "20px",
  closeIconSize: "16px",
  headerHeightSmall: "44px",
  headerHeightMedium: "44px",
  headerHeightLarge: "50px"
};
const transferDark$1 = {
  name: "Transfer",
  common: derived,
  peers: {
    Checkbox: checkboxDark,
    Scrollbar: scrollbarDark,
    Input: inputDark,
    Empty: emptyDark,
    Button: buttonDark
  },
  self(vars) {
    const {
      fontWeight,
      fontSizeLarge,
      fontSizeMedium,
      fontSizeSmall,
      heightLarge,
      heightMedium,
      borderRadius,
      inputColor,
      tableHeaderColor,
      textColor1,
      textColorDisabled,
      textColor2,
      textColor3,
      hoverColor,
      closeColorHover,
      closeColorPressed,
      closeIconColor,
      closeIconColorHover,
      closeIconColorPressed,
      dividerColor
    } = vars;
    return Object.assign(Object.assign({}, commonVariables$1), {
      itemHeightSmall: heightMedium,
      itemHeightMedium: heightMedium,
      itemHeightLarge: heightLarge,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      borderRadius,
      dividerColor,
      borderColor: "#0000",
      listColor: inputColor,
      headerColor: tableHeaderColor,
      titleTextColor: textColor1,
      titleTextColorDisabled: textColorDisabled,
      extraTextColor: textColor3,
      extraTextColorDisabled: textColorDisabled,
      itemTextColor: textColor2,
      itemTextColorDisabled: textColorDisabled,
      itemColorPending: hoverColor,
      titleFontWeight: fontWeight,
      closeColorHover,
      closeColorPressed,
      closeIconColor,
      closeIconColorHover,
      closeIconColorPressed
    });
  }
};
function self$5(vars) {
  const {
    borderRadiusSmall,
    dividerColor,
    hoverColor,
    pressedColor,
    primaryColor,
    textColor3,
    textColor2,
    textColorDisabled,
    fontSize
  } = vars;
  return {
    fontSize,
    lineHeight: "1.5",
    nodeHeight: "30px",
    nodeWrapperPadding: "3px 0",
    nodeBorderRadius: borderRadiusSmall,
    nodeColorHover: hoverColor,
    nodeColorPressed: pressedColor,
    nodeColorActive: changeColor(primaryColor, {
      alpha: 0.1
    }),
    arrowColor: textColor3,
    nodeTextColor: textColor2,
    nodeTextColorDisabled: textColorDisabled,
    loadingColor: primaryColor,
    dropMarkColor: primaryColor,
    lineColor: dividerColor
  };
}
const treeDark = {
  name: "Tree",
  common: derived,
  peers: {
    Checkbox: checkboxDark,
    Scrollbar: scrollbarDark,
    Empty: emptyDark
  },
  self(vars) {
    const {
      primaryColor
    } = vars;
    const commonSelf = self$5(vars);
    commonSelf.nodeColorActive = changeColor(primaryColor, {
      alpha: 0.15
    });
    return commonSelf;
  }
};
const treeSelectDark = {
  name: "TreeSelect",
  common: derived,
  peers: {
    Tree: treeDark,
    Empty: emptyDark,
    InternalSelection: internalSelectionDark
  }
};
const commonVars = {
  headerFontSize1: "30px",
  headerFontSize2: "22px",
  headerFontSize3: "18px",
  headerFontSize4: "16px",
  headerFontSize5: "16px",
  headerFontSize6: "16px",
  headerMargin1: "28px 0 20px 0",
  headerMargin2: "28px 0 20px 0",
  headerMargin3: "28px 0 20px 0",
  headerMargin4: "28px 0 18px 0",
  headerMargin5: "28px 0 18px 0",
  headerMargin6: "28px 0 18px 0",
  headerPrefixWidth1: "16px",
  headerPrefixWidth2: "16px",
  headerPrefixWidth3: "12px",
  headerPrefixWidth4: "12px",
  headerPrefixWidth5: "12px",
  headerPrefixWidth6: "12px",
  headerBarWidth1: "4px",
  headerBarWidth2: "4px",
  headerBarWidth3: "3px",
  headerBarWidth4: "3px",
  headerBarWidth5: "3px",
  headerBarWidth6: "3px",
  pMargin: "16px 0 16px 0",
  liMargin: ".25em 0 0 0",
  olPadding: "0 0 0 2em",
  ulPadding: "0 0 0 2em"
};
function self$4(vars) {
  const {
    primaryColor,
    textColor2,
    borderColor,
    lineHeight,
    fontSize,
    borderRadiusSmall,
    dividerColor,
    fontWeightStrong,
    textColor1,
    textColor3,
    infoColor,
    warningColor,
    errorColor,
    successColor,
    codeColor
  } = vars;
  return Object.assign(Object.assign({}, commonVars), {
    aTextColor: primaryColor,
    blockquoteTextColor: textColor2,
    blockquotePrefixColor: borderColor,
    blockquoteLineHeight: lineHeight,
    blockquoteFontSize: fontSize,
    codeBorderRadius: borderRadiusSmall,
    liTextColor: textColor2,
    liLineHeight: lineHeight,
    liFontSize: fontSize,
    hrColor: dividerColor,
    headerFontWeight: fontWeightStrong,
    headerTextColor: textColor1,
    pTextColor: textColor2,
    pTextColor1Depth: textColor1,
    pTextColor2Depth: textColor2,
    pTextColor3Depth: textColor3,
    pLineHeight: lineHeight,
    pFontSize: fontSize,
    headerBarColor: primaryColor,
    headerBarColorPrimary: primaryColor,
    headerBarColorInfo: infoColor,
    headerBarColorError: errorColor,
    headerBarColorWarning: warningColor,
    headerBarColorSuccess: successColor,
    textColor: textColor2,
    textColor1Depth: textColor1,
    textColor2Depth: textColor2,
    textColor3Depth: textColor3,
    textColorPrimary: primaryColor,
    textColorInfo: infoColor,
    textColorSuccess: successColor,
    textColorWarning: warningColor,
    textColorError: errorColor,
    codeTextColor: textColor2,
    codeColor,
    codeBorder: "1px solid #0000"
  });
}
const typographyDark = {
  name: "Typography",
  common: derived,
  self: self$4
};
function self$3(vars) {
  const {
    iconColor,
    primaryColor,
    errorColor,
    textColor2,
    successColor,
    opacityDisabled,
    actionColor,
    borderColor,
    hoverColor,
    lineHeight,
    borderRadius,
    fontSize
  } = vars;
  return {
    fontSize,
    lineHeight,
    borderRadius,
    draggerColor: actionColor,
    draggerBorder: `1px dashed ${borderColor}`,
    draggerBorderHover: `1px dashed ${primaryColor}`,
    itemColorHover: hoverColor,
    itemColorHoverError: changeColor(errorColor, {
      alpha: 0.06
    }),
    itemTextColor: textColor2,
    itemTextColorError: errorColor,
    itemTextColorSuccess: successColor,
    itemIconColor: iconColor,
    itemDisabledOpacity: opacityDisabled,
    itemBorderImageCardError: `1px solid ${errorColor}`,
    itemBorderImageCard: `1px solid ${borderColor}`
  };
}
const uploadDark = {
  name: "Upload",
  common: derived,
  peers: {
    Button: buttonDark,
    Progress: progressDark
  },
  self(vars) {
    const {
      errorColor
    } = vars;
    const commonSelf = self$3(vars);
    commonSelf.itemColorHoverError = changeColor(errorColor, {
      alpha: 0.09
    });
    return commonSelf;
  }
};
const watermarkDark = {
  name: "Watermark",
  common: derived,
  self(vars) {
    const {
      fontFamily
    } = vars;
    return {
      fontFamily
    };
  }
};
const floatButtonDark = {
  name: "FloatButton",
  common: derived,
  self(vars) {
    const {
      popoverColor,
      textColor2,
      buttonColor2Hover,
      buttonColor2Pressed,
      primaryColor,
      primaryColorHover,
      primaryColorPressed,
      baseColor,
      borderRadius
    } = vars;
    return {
      color: popoverColor,
      textColor: textColor2,
      boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)",
      boxShadowHover: "0 2px 12px 0px rgba(0, 0, 0, .18)",
      boxShadowPressed: "0 2px 12px 0px rgba(0, 0, 0, .18)",
      colorHover: buttonColor2Hover,
      colorPressed: buttonColor2Pressed,
      colorPrimary: primaryColor,
      colorPrimaryHover: primaryColorHover,
      colorPrimaryPressed: primaryColorPressed,
      textColorPrimary: baseColor,
      borderRadiusSquare: borderRadius
    };
  }
};
function self$2(vars) {
  const {
    primaryColor,
    baseColor
  } = vars;
  return {
    color: primaryColor,
    iconColor: baseColor
  };
}
const iconDark = {
  name: "IconWrapper",
  common: derived,
  self: self$2
};
const imageDark = {
  name: "Image",
  common: derived,
  peers: {
    Tooltip: tooltipDark
  },
  self: (vars) => {
    const {
      textColor2
    } = vars;
    return {
      toolbarIconColor: textColor2,
      toolbarColor: "rgba(0, 0, 0, .35)",
      toolbarBoxShadow: "none",
      toolbarBorderRadius: "24px"
    };
  }
};
const commonVariables = {
  extraFontSize: "12px",
  width: "440px"
};
const transferDark = {
  name: "Transfer",
  common: derived,
  peers: {
    Checkbox: checkboxDark,
    Scrollbar: scrollbarDark,
    Input: inputDark,
    Empty: emptyDark,
    Button: buttonDark
  },
  self(vars) {
    const {
      iconColorDisabled,
      iconColor,
      fontWeight,
      fontSizeLarge,
      fontSizeMedium,
      fontSizeSmall,
      heightLarge,
      heightMedium,
      heightSmall,
      borderRadius,
      inputColor,
      tableHeaderColor,
      textColor1,
      textColorDisabled,
      textColor2,
      hoverColor
    } = vars;
    return Object.assign(Object.assign({}, commonVariables), {
      itemHeightSmall: heightSmall,
      itemHeightMedium: heightMedium,
      itemHeightLarge: heightLarge,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      borderRadius,
      borderColor: "#0000",
      listColor: inputColor,
      headerColor: tableHeaderColor,
      titleTextColor: textColor1,
      titleTextColorDisabled: textColorDisabled,
      extraTextColor: textColor2,
      filterDividerColor: "#0000",
      itemTextColor: textColor2,
      itemTextColorDisabled: textColorDisabled,
      itemColorPending: hoverColor,
      titleFontWeight: fontWeight,
      iconColor,
      iconColorDisabled
    });
  }
};
function self$1() {
  return {};
}
const marqueeDark = {
  name: "Marquee",
  common: derived,
  self: self$1
};
const qrcodeDark = {
  name: "QrCode",
  common: derived,
  self: (vars) => {
    return {
      borderRadius: vars.borderRadius
    };
  }
};
const skeletonDark = {
  name: "Skeleton",
  common: derived,
  self(vars) {
    const {
      heightSmall,
      heightMedium,
      heightLarge,
      borderRadius
    } = vars;
    return {
      color: "rgba(255, 255, 255, 0.12)",
      colorEnd: "rgba(255, 255, 255, 0.18)",
      borderRadius,
      heightSmall,
      heightMedium,
      heightLarge
    };
  }
};
const splitDark = {
  name: "Split",
  common: derived
};
const self = () => ({});
const equationDark = {
  name: "Equation",
  common: derived,
  self
};
const floatButtonGroupDark = {
  name: "FloatButtonGroup",
  common: derived,
  self(vars) {
    const {
      popoverColor,
      dividerColor,
      borderRadius
    } = vars;
    return {
      color: popoverColor,
      buttonBorderColor: dividerColor,
      borderRadiusSquare: borderRadius,
      boxShadow: "0 2px 8px 0px rgba(0, 0, 0, .12)"
    };
  }
};
const darkTheme = {
  name: "dark",
  common: derived,
  Alert: alertDark,
  Anchor: anchorDark,
  AutoComplete: autoCompleteDark,
  Avatar: avatarDark,
  AvatarGroup: avatarGroupDark,
  BackTop: backTopDark,
  Badge: badgeDark,
  Breadcrumb: breadcrumbDark,
  Button: buttonDark,
  ButtonGroup: buttonGroupDark,
  Calendar: calendarDark,
  Card: cardDark,
  Carousel: carouselDark,
  Cascader: cascaderDark,
  Checkbox: checkboxDark,
  Code: codeDark,
  Collapse: collapseDark,
  CollapseTransition: collapseTransitionDark,
  ColorPicker: colorPickerDark,
  DataTable: dataTableDark,
  DatePicker: datePickerDark,
  Descriptions: descriptionsDark,
  Dialog: dialogDark,
  Divider: dividerDark,
  Drawer: drawerDark,
  Dropdown: dropdownDark,
  DynamicInput: dynamicInputDark,
  DynamicTags: dynamicTagsDark,
  Element: elementDark,
  Empty: emptyDark,
  Ellipsis: ellipsisDark,
  Equation: equationDark,
  Flex: flexDark,
  Form: formItemDark,
  GradientText: gradientTextDark,
  Icon: iconDark$1,
  IconWrapper: iconDark,
  Image: imageDark,
  Input: inputDark,
  InputNumber: inputNumberDark,
  InputOtp: inputOtpDark,
  LegacyTransfer: transferDark,
  Layout: layoutDark,
  List: listDark$1,
  LoadingBar: loadingBarDark,
  Log: logDark,
  Menu: menuDark,
  Mention: listDark,
  Message: messageDark,
  Modal: modalDark,
  Notification: notificationDark,
  PageHeader: pageHeaderDark,
  Pagination: paginationDark,
  Popconfirm: popconfirmDark,
  Popover: popoverDark,
  Popselect: popselect,
  Progress: progressDark,
  QrCode: qrcodeDark,
  Radio: radioDark,
  Rate: rateDark,
  Result: resultDark,
  Row: rowDark,
  Scrollbar: scrollbarDark,
  Select: selectDark,
  Skeleton: skeletonDark,
  Slider: sliderDark,
  Space: spaceDark,
  Spin: spinDark,
  Statistic: statisticDark,
  Steps: stepsDark,
  Switch: switchDark,
  Table: tableDark,
  Tabs: tabsDark,
  Tag: tagDark,
  Thing: thingDark,
  TimePicker: timePickerDark,
  Timeline: timelineDark,
  Tooltip: tooltipDark,
  Transfer: transferDark$1,
  Tree: treeDark,
  TreeSelect: treeSelectDark,
  Typography: typographyDark,
  Upload: uploadDark,
  Watermark: watermarkDark,
  Split: splitDark,
  FloatButton: floatButtonDark,
  FloatButtonGroup: floatButtonGroupDark,
  Marquee: marqueeDark
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HeaderLocation",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      loading,
      error,
      hasLocation,
      getLocationText
    } = useLocation();
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "header-location" }, _attrs))} data-v-07461ff2>`);
      if (unref(hasLocation)) {
        _push(`<div class="location-display" data-v-07461ff2><button class="location-button"${ssrRenderAttr("title", `当前位置: ${unref(getLocationText)()}`)} data-v-07461ff2><i class="bi bi-geo-alt location-icon" data-v-07461ff2></i><span class="location-text" data-v-07461ff2>${ssrInterpolate(unref(getLocationText)())}</span></button></div>`);
      } else if (unref(loading)) {
        _push(`<div class="loading-display" data-v-07461ff2><i class="bi bi-geo-alt location-icon opacity-50" data-v-07461ff2></i><span class="location-text" data-v-07461ff2>定位中...</span><div class="loading-spinner" data-v-07461ff2></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="error-display" data-v-07461ff2><button class="location-button error" title="点击重新获取定位" data-v-07461ff2><i class="bi bi-geo-alt-fill location-icon" data-v-07461ff2></i><span class="location-text" data-v-07461ff2>定位失败</span><i class="bi bi-arrow-clockwise detail-icon" data-v-07461ff2></i></button></div>`);
      } else {
        _push(`<div class="initial-display" data-v-07461ff2><button class="location-button" title="点击获取定位" data-v-07461ff2><i class="bi bi-geo location-icon" data-v-07461ff2></i><span class="location-text" data-v-07461ff2>获取定位</span></button></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/location/HeaderLocation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const HeaderLocation = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-07461ff2"]]);
const _sfc_main = {
  __name: "AppHeader",
  __ssrInlineRender: true,
  props: {
    showBackButton: {
      type: Boolean,
      default: false
    },
    showNavMenu: {
      type: Boolean,
      default: true
    },
    showBreadcrumb: {
      type: Boolean,
      default: false
    },
    showLocation: {
      type: Boolean,
      default: true
    },
    showSearchButton: {
      type: Boolean,
      default: true
    },
    showNotificationButton: {
      type: Boolean,
      default: true
    },
    showDecorations: {
      type: Boolean,
      default: true
    },
    logoSize: {
      type: String,
      default: "large"
    },
    currentPageTitle: {
      type: String,
      default: ""
    },
    customUserMenuOptions: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const navItems = [
      { path: "/", label: "首页" },
      { path: "/products", label: "产品中心" },
      { path: "/customer-service", label: "在线客服" },
      { path: "/checkout", label: "购物车" },
      { path: "/orders", label: "订单" }
    ];
    const naiveTheme = darkTheme;
    const themeOverrides = {
      common: {
        primaryColor: "#00f5ff",
        primaryColorHover: "#00d4ff",
        primaryColorPressed: "#00b8ff",
        primaryColorSuppl: "#0080ff"
      },
      Dropdown: {
        color: "rgba(31, 41, 55, 0.95)",
        borderColor: "rgba(148, 163, 184, 0.3)",
        borderRadius: "12px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        optionTextColor: "#d1d5db",
        optionTextColorHover: "#ffffff",
        optionTextColorPressed: "#00f5ff",
        optionColorHover: "rgba(75, 85, 99, 0.5)",
        optionColorPressed: "rgba(0, 245, 255, 0.1)",
        dividerColor: "rgba(75, 85, 99, 0.5)"
      }
    };
    const userMenuOptions = computed(() => {
      if (props.customUserMenuOptions.length > 0) {
        return props.customUserMenuOptions;
      }
      return [
        {
          label: "个人中心",
          key: "profile",
          icon: () => h("i", { class: "bi bi-person" })
        },
        {
          label: "我的订单",
          key: "orders",
          icon: () => h("i", { class: "bi bi-box" })
        },
        {
          label: "收货地址",
          key: "addresses",
          icon: () => h("i", { class: "bi bi-geo-alt" })
        },
        {
          label: "客服",
          key: "customerService",
          icon: () => h("i", { class: "bi bi-headset" })
        },
        {
          type: "divider"
        },
        {
          label: "退出登录",
          key: "logout",
          icon: () => h("i", { class: "bi bi-box-arrow-right" })
        }
      ];
    });
    const isCurrentPage = (path) => {
      if (!route || !route.path) return false;
      return route.path === path;
    };
    const handleUserMenuSelect = (key) => {
      switch (key) {
        case "profile":
          router.push("/profile");
          break;
        case "orders":
          router.push("/orders");
          break;
        case "addresses":
          router.push("/addresses");
          break;
        case "customerService":
          router.push("/customer-service");
          break;
        case "logout":
          userStore.logout();
          router.push("/auth/login");
          break;
      }
    };
    const handleAvatarError = (event) => {
      console.log("头像加载失败，使用默认头像");
      if (event.target) {
        event.target.style.display = "none";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppLogo = __nuxt_component_0$2;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "relative z-10" }, _attrs))} data-v-159c5e38><div class="container mx-auto px-6 py-6" data-v-159c5e38><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-159c5e38><div class="flex items-center justify-between" data-v-159c5e38><div class="flex items-center space-x-6" data-v-159c5e38>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "cursor-pointer"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AppLogo, {
              size: __props.logoSize,
              "show-decorations": __props.showDecorations
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AppLogo, {
                size: __props.logoSize,
                "show-decorations": __props.showDecorations
              }, null, 8, ["size", "show-decorations"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.showBackButton) {
        _push(`<div class="h-6 w-px bg-gray-600" data-v-159c5e38></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showBackButton) {
        _push(`<button class="group relative inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden" data-v-159c5e38><div class="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-xl transition-all duration-300 group-hover:from-cyan-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30" data-v-159c5e38></div><div class="absolute inset-0 border-2 border-cyan-500/30 rounded-xl transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-400/25" data-v-159c5e38></div><div class="absolute inset-0 rounded-xl overflow-hidden" data-v-159c5e38><div class="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "20%", "left": "15%", "animation-delay": "0s" })}" data-v-159c5e38></div><div class="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "60%", "left": "80%", "animation-delay": "0.2s" })}" data-v-159c5e38></div><div class="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" style="${ssrRenderStyle({ "top": "80%", "left": "30%", "animation-delay": "0.4s" })}" data-v-159c5e38></div></div><div class="relative flex items-center" data-v-159c5e38><div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mr-3 transition-all duration-300 group-hover:from-cyan-400/40 group-hover:to-blue-400/40 group-hover:scale-110" data-v-159c5e38><i class="bi bi-arrow-left text-cyan-400 text-lg transition-all duration-300 group-hover:text-white group-hover:-translate-x-1" data-v-159c5e38></i></div><div class="text-left" data-v-159c5e38><div class="text-white text-sm font-semibold transition-all duration-300 group-hover:text-cyan-100" data-v-159c5e38>返回</div><div class="text-gray-400 text-xs transition-all duration-300 group-hover:text-cyan-300" data-v-159c5e38>Back</div></div></div><div class="absolute right-3 top-1/2 transform -translate-y-1/2" data-v-159c5e38><div class="flex flex-col space-y-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300" data-v-159c5e38><div class="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full transition-all duration-300 group-hover:w-8" data-v-159c5e38></div><div class="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full transition-all duration-300 group-hover:w-6 delay-75" data-v-159c5e38></div><div class="w-2 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full transition-all duration-300 group-hover:w-4 delay-150" data-v-159c5e38></div></div></div></button>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showNavMenu) {
        _push(`<div class="hidden md:flex space-x-6" data-v-159c5e38><!--[-->`);
        ssrRenderList(navItems, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.path,
            to: item.path,
            class: [
              "transition-colors duration-200 font-medium",
              isCurrentPage(item.path) ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
            ]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center space-x-4" data-v-159c5e38>`);
      if (__props.showBreadcrumb) {
        _push(`<nav class="text-sm text-gray-400" data-v-159c5e38>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "hover:text-cyan-400 transition-colors duration-200"
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
        _push(`<i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-159c5e38></i><span class="text-white font-medium" data-v-159c5e38>${ssrInterpolate(__props.currentPageTitle)}</span></nav>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showLocation) {
        _push(ssrRenderComponent(HeaderLocation, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.showSearchButton) {
        _push(`<button class="p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200" data-v-159c5e38><i class="bi bi-search text-xl" data-v-159c5e38></i></button>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showNotificationButton) {
        _push(`<button class="p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200" data-v-159c5e38><i class="bi bi-bell text-xl" data-v-159c5e38></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200" title="在线客服" data-v-159c5e38><i class="bi bi-headset text-xl" data-v-159c5e38></i></button>`);
      if (!unref(userStore).isLoggedIn) {
        _push(`<div class="flex items-center space-x-3" data-v-159c5e38>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "px-4 py-2 text-gray-300 hover:text-cyan-400 font-medium transition-colors duration-200 border border-gray-600/50 hover:border-cyan-400/50 rounded-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 登录 `);
            } else {
              return [
                createTextVNode(" 登录 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/register",
          class: "px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 注册 `);
            } else {
              return [
                createTextVNode(" 注册 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="relative" data-v-159c5e38>`);
        _push(ssrRenderComponent(unref(NConfigProvider), {
          theme: unref(naiveTheme),
          "theme-overrides": themeOverrides
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(NDropdown), {
                options: unref(userMenuOptions),
                onSelect: handleUserMenuSelect,
                placement: "bottom-end",
                trigger: "click",
                "show-arrow": false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    _push3(`<button class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200" data-v-159c5e38${_scopeId2}><div class="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm overflow-hidden" data-v-159c5e38${_scopeId2}>`);
                    if (unref(userStore).hasAvatarImage) {
                      _push3(`<img${ssrRenderAttr("src", (_a = unref(userStore).user) == null ? void 0 : _a.avatar)}${ssrRenderAttr("alt", unref(userStore).userDisplayName + "的头像")} class="w-full h-full object-cover" data-v-159c5e38${_scopeId2}>`);
                    } else {
                      _push3(`<span data-v-159c5e38${_scopeId2}>${ssrInterpolate(unref(userStore).userAvatar)}</span>`);
                    }
                    _push3(`</div><span class="text-white font-medium hidden md:block" data-v-159c5e38${_scopeId2}>${ssrInterpolate(unref(userStore).userDisplayName)}</span><i class="bi bi-chevron-down text-gray-400 text-sm" data-v-159c5e38${_scopeId2}></i></button>`);
                  } else {
                    return [
                      createVNode("button", { class: "flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200" }, [
                        createVNode("div", { class: "w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm overflow-hidden" }, [
                          unref(userStore).hasAvatarImage ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: (_b = unref(userStore).user) == null ? void 0 : _b.avatar,
                            alt: unref(userStore).userDisplayName + "的头像",
                            class: "w-full h-full object-cover",
                            onError: handleAvatarError
                          }, null, 40, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(userStore).userAvatar), 1))
                        ]),
                        createVNode("span", { class: "text-white font-medium hidden md:block" }, toDisplayString(unref(userStore).userDisplayName), 1),
                        createVNode("i", { class: "bi bi-chevron-down text-gray-400 text-sm" })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(NDropdown), {
                  options: unref(userMenuOptions),
                  onSelect: handleUserMenuSelect,
                  placement: "bottom-end",
                  trigger: "click",
                  "show-arrow": false
                }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createVNode("button", { class: "flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200" }, [
                        createVNode("div", { class: "w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm overflow-hidden" }, [
                          unref(userStore).hasAvatarImage ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: (_a = unref(userStore).user) == null ? void 0 : _a.avatar,
                            alt: unref(userStore).userDisplayName + "的头像",
                            class: "w-full h-full object-cover",
                            onError: handleAvatarError
                          }, null, 40, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(userStore).userAvatar), 1))
                        ]),
                        createVNode("span", { class: "text-white font-medium hidden md:block" }, toDisplayString(unref(userStore).userDisplayName), 1),
                        createVNode("i", { class: "bi bi-chevron-down text-gray-400 text-sm" })
                      ])
                    ];
                  }),
                  _: 1
                }, 8, ["options"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></div></div></nav>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-159c5e38"]]);
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=AppHeader-CHr1q5UR.js.map
