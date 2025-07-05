import { createApp, h, defineComponent, unref, reactive, ref, computed, readonly, toRefs, inject, markRaw, provide, shallowRef, watchEffect, createTextVNode, Fragment, Comment, Teleport, toRef, mergeProps, Transition, renderSlot, getCurrentInstance, isVNode, TransitionGroup, nextTick, cloneVNode, withDirectives, vShow, watch, normalizeClass } from 'vue';
import { a as apiClient } from './apiClient-C7W98XI_.mjs';
import { scaleColor, rgba, composite, depx, getPadding, createId, getPreciseEventTarget, changeColor, getMargin } from 'seemly';
import { useMemo, useIsIos, useFalseUntilTruthy, useIsMounted, useClicked, useClickPosition } from 'vooks';
import { clickoutside, zindexable } from 'vdirs';
import { hash, CssRender, exists } from 'css-render';
import { plugin as plugin$1 } from '@css-render/plugin-bem';
import { merge, upperFirst } from 'lodash-es';
import { on, off } from 'evtd';
import { u as useUserStore } from './server.mjs';

const namespace = "n";
const prefix = `.${namespace}-`;
const elementPrefix = "__";
const modifierPrefix = "--";
const cssr = CssRender();
const plugin = plugin$1({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix
});
cssr.use(plugin);
const {
  c,
  find
} = cssr;
const {
  cB,
  cE,
  cM,
  cNotM
} = plugin;
function insideModal(style2) {
  return c(({
    props: {
      bPrefix
    }
  }) => `${bPrefix || prefix}modal, ${bPrefix || prefix}drawer`, [style2]);
}
function insidePopover(style2) {
  return c(({
    props: {
      bPrefix
    }
  }) => `${bPrefix || prefix}popover`, [style2]);
}
function asModal(style2) {
  return c(({
    props: {
      bPrefix
    }
  }) => `&${bPrefix || prefix}modal`, style2);
}
const cCB = (...args) => {
  return c(">", [cB(...args)]);
};
function createKey(prefix2, suffix) {
  return prefix2 + (suffix === "default" ? "" : suffix.replace(/^[a-z]/, (startChar) => startChar.toUpperCase()));
}
function createInjectionKey(key) {
  return key;
}
const drawerBodyInjectionKey = createInjectionKey("n-drawer-body");
const modalBodyInjectionKey = createInjectionKey("n-modal-body");
const modalProviderInjectionKey$1 = createInjectionKey("n-modal-provider");
const modalInjectionKey = createInjectionKey("n-modal");
const popoverBodyInjectionKey = createInjectionKey("n-popover-body");
const isComposingRef = ref(false);
function useIsComposing() {
  return isComposingRef;
}
ref("0px");
function useLockHtmlScroll(lockRef) {
  return;
}
function getSlot(scope, slots, slotName = "default") {
  const slot = slots[slotName];
  if (slot === void 0) {
    throw new Error(`[vueuc/${scope}]: slot[${slotName}] is empty.`);
  }
  return slot();
}
function flatten$1(vNodes, filterCommentNode = true, result = []) {
  vNodes.forEach((vNode) => {
    if (vNode === null)
      return;
    if (typeof vNode !== "object") {
      if (typeof vNode === "string" || typeof vNode === "number") {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flatten$1(vNode, filterCommentNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null)
        return;
      if (Array.isArray(vNode.children)) {
        flatten$1(vNode.children, filterCommentNode, result);
      }
    } else if (vNode.type !== Comment) {
      result.push(vNode);
    }
  });
  return result;
}
function getFirstVNode(scope, slots, slotName = "default") {
  const slot = slots[slotName];
  if (slot === void 0) {
    throw new Error(`[vueuc/${scope}]: slot[${slotName}] is empty.`);
  }
  const content = flatten$1(slot());
  if (content.length === 1) {
    return content[0];
  } else {
    throw new Error(`[vueuc/${scope}]: slot[${slotName}] should have exactly one child.`);
  }
}
const ssrContextKey = "@css-render/vue3-ssr";
function createStyleString(id, style2) {
  return `<style cssr-id="${id}">
${style2}
</style>`;
}
function ssrAdapter(id, style2, ssrContext) {
  const { styles, ids } = ssrContext;
  if (ids.has(id))
    return;
  if (styles !== null) {
    ids.add(id);
    styles.push(createStyleString(id, style2));
  }
}
function useSsrAdapter() {
  const context = inject(ssrContextKey, null);
  if (context === null)
    return void 0;
  return {
    adapter: (id, style2) => ssrAdapter(id, style2, context),
    context
  };
}
const LazyTeleport = defineComponent({
  name: "LazyTeleport",
  props: {
    to: {
      type: [String, Object],
      default: void 0
    },
    disabled: Boolean,
    show: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    return {
      showTeleport: useFalseUntilTruthy(toRef(props, "show")),
      mergedTo: computed(() => {
        const { to } = props;
        return to !== null && to !== void 0 ? to : "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? getSlot("lazy-teleport", this.$slots) : h(Teleport, {
      disabled: this.disabled,
      to: this.mergedTo
    }, getSlot("lazy-teleport", this.$slots)) : null;
  }
});
const VResizeObserver = defineComponent({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(props) {
    getCurrentInstance().proxy;
  },
  render() {
    return renderSlot(this.$slots, "default");
  }
});
function isHTMLElement(node) {
  return node instanceof HTMLElement;
}
function focusFirstDescendant(node) {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i];
    if (isHTMLElement(child)) {
      if (attemptFocus(child) || focusFirstDescendant(child)) {
        return true;
      }
    }
  }
  return false;
}
function focusLastDescendant(element) {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i];
    if (isHTMLElement(child)) {
      if (attemptFocus(child) || focusLastDescendant(child)) {
        return true;
      }
    }
  }
  return false;
}
function attemptFocus(element) {
  if (!isFocusable(element)) {
    return false;
  }
  try {
    element.focus({ preventScroll: true });
  } catch (e) {
  }
  return (void 0).activeElement === element;
}
function isFocusable(element) {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) {
    return true;
  }
  if (element.getAttribute("disabled")) {
    return false;
  }
  switch (element.nodeName) {
    case "A":
      return !!element.href && element.rel !== "ignore";
    case "INPUT":
      return element.type !== "hidden" && element.type !== "file";
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return true;
    default:
      return false;
  }
}
let stack = [];
const FocusTrap = defineComponent({
  name: "FocusTrap",
  props: {
    disabled: Boolean,
    active: Boolean,
    autoFocus: {
      type: Boolean,
      default: true
    },
    onEsc: Function,
    initialFocusTo: String,
    finalFocusTo: String,
    returnFocusOnDeactivated: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const id = createId();
    const focusableStartRef = ref(null);
    const focusableEndRef = ref(null);
    let ignoreInternalFocusChange = false;
    function isCurrentActive() {
      const currentActiveId = stack[stack.length - 1];
      return currentActiveId === id;
    }
    function getMainEl() {
      const focusableStartEl = focusableStartRef.value;
      if (focusableStartEl === null)
        return null;
      let mainEl = focusableStartEl;
      while (true) {
        mainEl = mainEl.nextSibling;
        if (mainEl === null)
          break;
        if (mainEl instanceof Element && mainEl.tagName === "DIV") {
          break;
        }
      }
      return mainEl;
    }
    function resetFocusTo(target) {
      if (!isCurrentActive())
        return;
      if (props.active) {
        const focusableStartEl = focusableStartRef.value;
        const focusableEndEl = focusableEndRef.value;
        if (focusableStartEl !== null && focusableEndEl !== null) {
          const mainEl = getMainEl();
          if (mainEl == null || mainEl === focusableEndEl) {
            ignoreInternalFocusChange = true;
            focusableStartEl.focus({ preventScroll: true });
            ignoreInternalFocusChange = false;
            return;
          }
          ignoreInternalFocusChange = true;
          const focused = target === "first" ? focusFirstDescendant(mainEl) : focusLastDescendant(mainEl);
          ignoreInternalFocusChange = false;
          if (!focused) {
            ignoreInternalFocusChange = true;
            focusableStartEl.focus({ preventScroll: true });
            ignoreInternalFocusChange = false;
          }
        }
      }
    }
    function handleStartFocus(e) {
      if (ignoreInternalFocusChange)
        return;
      const mainEl = getMainEl();
      if (mainEl === null)
        return;
      if (e.relatedTarget !== null && mainEl.contains(e.relatedTarget)) {
        resetFocusTo("last");
      } else {
        resetFocusTo("first");
      }
    }
    function handleEndFocus(e) {
      if (ignoreInternalFocusChange)
        return;
      if (e.relatedTarget !== null && e.relatedTarget === focusableStartRef.value) {
        resetFocusTo("last");
      } else {
        resetFocusTo("first");
      }
    }
    return {
      focusableStartRef,
      focusableEndRef,
      focusableStyle: "position: absolute; height: 0; width: 0;",
      handleStartFocus,
      handleEndFocus
    };
  },
  render() {
    const { default: defaultSlot } = this.$slots;
    if (defaultSlot === void 0)
      return null;
    if (this.disabled)
      return defaultSlot();
    const { active, focusableStyle } = this;
    return h(Fragment, null, [
      h("div", {
        "aria-hidden": "true",
        tabindex: active ? "0" : "-1",
        ref: "focusableStartRef",
        style: focusableStyle,
        onFocus: this.handleStartFocus
      }),
      defaultSlot(),
      h("div", {
        "aria-hidden": "true",
        style: focusableStyle,
        ref: "focusableEndRef",
        tabindex: active ? "0" : "-1",
        onFocus: this.handleEndFocus
      })
    ]);
  }
});
function color2Class(color) {
  return color.replace(/#|\(|\)|,|\s|\./g, "_");
}
function rtlInset(inset) {
  const {
    left,
    right,
    top,
    bottom
  } = getPadding(inset);
  return `${top} ${left} ${bottom} ${right}`;
}
const eventSet = /* @__PURE__ */ new WeakSet();
function eventEffectNotPerformed(event) {
  return !eventSet.has(event);
}
function warn(location, message2) {
  console.error(`[naive/${location}]: ${message2}`);
}
function throwError(location, message2) {
  throw new Error(`[naive/${location}]: ${message2}`);
}
function call(funcs, ...args) {
  if (Array.isArray(funcs)) {
    funcs.forEach((func) => call(func, ...args));
  } else {
    return funcs(...args);
  }
}
function flatten(vNodes, filterCommentNode = true, result = []) {
  vNodes.forEach((vNode) => {
    if (vNode === null) return;
    if (typeof vNode !== "object") {
      if (typeof vNode === "string" || typeof vNode === "number") {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flatten(vNode, filterCommentNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null) return;
      if (Array.isArray(vNode.children)) {
        flatten(vNode.children, filterCommentNode, result);
      }
    } else {
      if (vNode.type === Comment && filterCommentNode) return;
      result.push(vNode);
    }
  });
  return result;
}
function getFirstSlotVNode(slots, slotName = "default", props = void 0) {
  const slot = slots[slotName];
  if (!slot) {
    warn("getFirstSlotVNode", `slot[${slotName}] is empty`);
    return null;
  }
  const slotContent = flatten(slot(props));
  if (slotContent.length === 1) {
    return slotContent[0];
  } else {
    warn("getFirstSlotVNode", `slot[${slotName}] should have exactly one child`);
    return null;
  }
}
function getFirstSlotVNodeWithTypedProps(slotName, slot, props) {
  if (!slot) {
    return null;
  }
  const slotContent = flatten(slot(props));
  if (slotContent.length === 1) {
    return slotContent[0];
  } else {
    warn("getFirstSlotVNode", `slot[${slotName}] should have exactly one child`);
    return null;
  }
}
function keep(object, keys = [], rest) {
  const keepedObject = {};
  keys.forEach((key) => {
    keepedObject[key] = object[key];
  });
  return Object.assign(keepedObject, rest);
}
function keysOf(obj) {
  return Object.keys(obj);
}
function omit(object, keys = [], rest) {
  const omitedObject = {};
  const originalKeys = Object.getOwnPropertyNames(object);
  originalKeys.forEach((originalKey) => {
    if (!keys.includes(originalKey)) {
      omitedObject[originalKey] = object[originalKey];
    }
  });
  return Object.assign(omitedObject, rest);
}
function render(r, ...args) {
  if (typeof r === "function") {
    return r(...args);
  } else if (typeof r === "string") {
    return createTextVNode(r);
  } else if (typeof r === "number") {
    return createTextVNode(String(r));
  } else {
    return null;
  }
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) {
      return true;
    }
    if (child.type === Comment) {
      return false;
    }
    if (child.type === Fragment && !ensureValidVNode(child.children)) {
      return false;
    }
    return true;
  }) ? vnodes : null;
}
function resolveSlot(slot, fallback) {
  return slot && ensureValidVNode(slot()) || fallback();
}
function resolveWrappedSlot(slot, wrapper) {
  const children = slot && ensureValidVNode(slot());
  return wrapper(children || null);
}
function isSlotEmpty(slot) {
  return !(slot && ensureValidVNode(slot()));
}
const Wrapper = defineComponent({
  render() {
    var _a, _b;
    return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
  }
});
const configProviderInjectionKey = createInjectionKey("n-config-provider");
const defaultClsPrefix = "n";
function useConfig(props = {}, options = {
  defaultBordered: true
}) {
  const NConfigProvider2 = inject(configProviderInjectionKey, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.inlineThemeDisabled,
    mergedRtlRef: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedRtlRef,
    mergedComponentPropsRef: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedComponentPropsRef,
    mergedBreakpointsRef: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedBreakpointsRef,
    mergedBorderedRef: computed(() => {
      var _a, _b;
      const {
        bordered
      } = props;
      if (bordered !== void 0) return bordered;
      return (_b = (_a = NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedBorderedRef.value) !== null && _a !== void 0 ? _a : options.defaultBordered) !== null && _b !== void 0 ? _b : true;
    }),
    mergedClsPrefixRef: NConfigProvider2 ? NConfigProvider2.mergedClsPrefixRef : shallowRef(defaultClsPrefix),
    namespaceRef: computed(() => NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedNamespaceRef.value)
  };
}
function useThemeClass(componentName, hashRef, cssVarsRef, props) {
  if (!cssVarsRef) throwError("useThemeClass", "cssVarsRef is not passed");
  const NConfigProvider2 = inject(configProviderInjectionKey, null);
  const mergedThemeHashRef = NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeHashRef;
  const styleMountTarget = NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.styleMountTarget;
  const themeClassRef = ref("");
  const ssrAdapter2 = useSsrAdapter();
  let renderCallback;
  const hashClassPrefix = `__${componentName}`;
  const mountStyle = () => {
    let finalThemeHash = hashClassPrefix;
    const hashValue = hashRef ? hashRef.value : void 0;
    const themeHash = mergedThemeHashRef === null || mergedThemeHashRef === void 0 ? void 0 : mergedThemeHashRef.value;
    if (themeHash) finalThemeHash += `-${themeHash}`;
    if (hashValue) finalThemeHash += `-${hashValue}`;
    const {
      themeOverrides,
      builtinThemeOverrides
    } = props;
    if (themeOverrides) {
      finalThemeHash += `-${hash(JSON.stringify(themeOverrides))}`;
    }
    if (builtinThemeOverrides) {
      finalThemeHash += `-${hash(JSON.stringify(builtinThemeOverrides))}`;
    }
    themeClassRef.value = finalThemeHash;
    renderCallback = () => {
      const cssVars = cssVarsRef.value;
      let style2 = "";
      for (const key in cssVars) {
        style2 += `${key}: ${cssVars[key]};`;
      }
      c(`.${finalThemeHash}`, style2).mount({
        id: finalThemeHash,
        ssr: ssrAdapter2,
        parent: styleMountTarget
      });
      renderCallback = void 0;
    };
  };
  watchEffect(() => {
    mountStyle();
  });
  return {
    themeClass: themeClassRef,
    onRender: () => {
      renderCallback === null || renderCallback === void 0 ? void 0 : renderCallback();
    }
  };
}
const formItemInjectionKey = createInjectionKey("n-form-item");
function useFormItem(props, {
  defaultSize = "medium",
  mergedSize,
  mergedDisabled
} = {}) {
  const NFormItem = inject(formItemInjectionKey, null);
  provide(formItemInjectionKey, null);
  const mergedSizeRef = computed(mergedSize ? () => mergedSize(NFormItem) : () => {
    const {
      size
    } = props;
    if (size) return size;
    if (NFormItem) {
      const {
        mergedSize: mergedSize2
      } = NFormItem;
      if (mergedSize2.value !== void 0) {
        return mergedSize2.value;
      }
    }
    return defaultSize;
  });
  const mergedDisabledRef = computed(mergedDisabled ? () => mergedDisabled(NFormItem) : () => {
    const {
      disabled
    } = props;
    if (disabled !== void 0) {
      return disabled;
    }
    if (NFormItem) {
      return NFormItem.disabled.value;
    }
    return false;
  });
  const mergedStatusRef = computed(() => {
    const {
      status
    } = props;
    if (status) return status;
    return NFormItem === null || NFormItem === void 0 ? void 0 : NFormItem.mergedValidationStatus.value;
  });
  return {
    mergedSizeRef,
    mergedDisabledRef,
    mergedStatusRef,
    nTriggerFormBlur() {
      if (NFormItem) {
        NFormItem.handleContentBlur();
      }
    },
    nTriggerFormChange() {
      if (NFormItem) {
        NFormItem.handleContentChange();
      }
    },
    nTriggerFormFocus() {
      if (NFormItem) {
        NFormItem.handleContentFocus();
      }
    },
    nTriggerFormInput() {
      if (NFormItem) {
        NFormItem.handleContentInput();
      }
    }
  };
}
const cssrAnchorMetaName = "naive-ui-style";
function useRtl(mountId, rtlStateRef, clsPrefixRef) {
  if (!rtlStateRef) return void 0;
  const ssrAdapter2 = useSsrAdapter();
  const componentRtlStateRef = computed(() => {
    const {
      value: rtlState
    } = rtlStateRef;
    if (!rtlState) {
      return void 0;
    }
    const componentRtlState = rtlState[mountId];
    if (!componentRtlState) {
      return void 0;
    }
    return componentRtlState;
  });
  const NConfigProvider2 = inject(configProviderInjectionKey, null);
  const mountStyle = () => {
    watchEffect(() => {
      const {
        value: clsPrefix
      } = clsPrefixRef;
      const id = `${clsPrefix}${mountId}Rtl`;
      if (exists(id, ssrAdapter2)) return;
      const {
        value: componentRtlState
      } = componentRtlStateRef;
      if (!componentRtlState) return;
      componentRtlState.style.mount({
        id,
        head: true,
        anchorMetaName: cssrAnchorMetaName,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
        },
        ssr: ssrAdapter2,
        parent: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.styleMountTarget
      });
    });
  };
  if (ssrAdapter2) {
    mountStyle();
  }
  return componentRtlStateRef;
}
const commonVariables$3 = {
  fontFamily: 'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontFamilyMono: "v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",
  fontWeight: "400",
  fontWeightStrong: "500",
  cubicBezierEaseInOut: "cubic-bezier(.4, 0, .2, 1)",
  cubicBezierEaseOut: "cubic-bezier(0, 0, .2, 1)",
  cubicBezierEaseIn: "cubic-bezier(.4, 0, 1, 1)",
  borderRadius: "3px",
  borderRadiusSmall: "2px",
  fontSize: "14px",
  fontSizeMini: "12px",
  fontSizeTiny: "12px",
  fontSizeSmall: "14px",
  fontSizeMedium: "14px",
  fontSizeLarge: "15px",
  fontSizeHuge: "16px",
  lineHeight: "1.6",
  heightMini: "16px",
  // private now, it's too small
  heightTiny: "22px",
  heightSmall: "28px",
  heightMedium: "34px",
  heightLarge: "40px",
  heightHuge: "46px"
};
const {
  fontSize,
  fontFamily,
  lineHeight
} = commonVariables$3;
const globalStyle = c("body", `
 margin: 0;
 font-size: ${fontSize};
 font-family: ${fontFamily};
 line-height: ${lineHeight};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [c("input", `
 font-family: inherit;
 font-size: inherit;
 `)]);
function useStyle(mountId, style2, clsPrefixRef) {
  if (!style2) {
    return;
  }
  const ssrAdapter2 = useSsrAdapter();
  const NConfigProvider2 = inject(configProviderInjectionKey, null);
  const mountStyle = () => {
    const clsPrefix = clsPrefixRef.value;
    style2.mount({
      id: clsPrefix === void 0 ? mountId : clsPrefix + mountId,
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      props: {
        bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
      },
      ssr: ssrAdapter2,
      parent: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.styleMountTarget
    });
    if (!(NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.preflightStyleDisabled)) {
      globalStyle.mount({
        id: "n-global",
        head: true,
        anchorMetaName: cssrAnchorMetaName,
        ssr: ssrAdapter2,
        parent: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.styleMountTarget
      });
    }
  };
  if (ssrAdapter2) {
    mountStyle();
  }
}
function createTheme(theme) {
  return theme;
}
function useTheme(resolveId, mountId, style2, defaultTheme, props, clsPrefixRef) {
  const ssrAdapter2 = useSsrAdapter();
  const NConfigProvider2 = inject(configProviderInjectionKey, null);
  if (style2) {
    const mountStyle = () => {
      const clsPrefix = clsPrefixRef === null || clsPrefixRef === void 0 ? void 0 : clsPrefixRef.value;
      style2.mount({
        id: clsPrefix === void 0 ? mountId : clsPrefix + mountId,
        head: true,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
        },
        anchorMetaName: cssrAnchorMetaName,
        ssr: ssrAdapter2,
        parent: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.styleMountTarget
      });
      if (!(NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.preflightStyleDisabled)) {
        globalStyle.mount({
          id: "n-global",
          head: true,
          anchorMetaName: cssrAnchorMetaName,
          ssr: ssrAdapter2,
          parent: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.styleMountTarget
        });
      }
    };
    if (ssrAdapter2) {
      mountStyle();
    }
  }
  const mergedThemeRef = computed(() => {
    var _a;
    const {
      theme: {
        common: selfCommon,
        self: self2,
        peers = {}
      } = {},
      themeOverrides: selfOverrides = {},
      builtinThemeOverrides: builtinOverrides = {}
    } = props;
    const {
      common: selfCommonOverrides,
      peers: peersOverrides
    } = selfOverrides;
    const {
      common: globalCommon = void 0,
      [resolveId]: {
        common: globalSelfCommon = void 0,
        self: globalSelf = void 0,
        peers: globalPeers = {}
      } = {}
    } = (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeRef.value) || {};
    const {
      common: globalCommonOverrides = void 0,
      [resolveId]: globalSelfOverrides = {}
    } = (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeOverridesRef.value) || {};
    const {
      common: globalSelfCommonOverrides,
      peers: globalPeersOverrides = {}
    } = globalSelfOverrides;
    const mergedCommon = merge({}, selfCommon || globalSelfCommon || globalCommon || defaultTheme.common, globalCommonOverrides, globalSelfCommonOverrides, selfCommonOverrides);
    const mergedSelf = merge(
      // {}, executed every time, no need for empty obj
      (_a = self2 || globalSelf || defaultTheme.self) === null || _a === void 0 ? void 0 : _a(mergedCommon),
      builtinOverrides,
      globalSelfOverrides,
      selfOverrides
    );
    return {
      common: mergedCommon,
      self: mergedSelf,
      peers: merge({}, defaultTheme.peers, globalPeers, peers),
      peerOverrides: merge({}, builtinOverrides.peers, globalPeersOverrides, peersOverrides)
    };
  });
  return mergedThemeRef;
}
useTheme.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const style$b = cB("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [c("svg", `
 height: 1em;
 width: 1em;
 `)]);
const NBaseIcon = defineComponent({
  name: "BaseIcon",
  props: {
    role: String,
    ariaLabel: String,
    ariaDisabled: {
      type: Boolean,
      default: void 0
    },
    ariaHidden: {
      type: Boolean,
      default: void 0
    },
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function,
    onMousedown: Function,
    onMouseup: Function
  },
  setup(props) {
    useStyle("-base-icon", style$b, toRef(props, "clsPrefix"));
  },
  render() {
    return h("i", {
      class: `${this.clsPrefix}-base-icon`,
      onClick: this.onClick,
      onMousedown: this.onMousedown,
      onMouseup: this.onMouseup,
      role: this.role,
      "aria-label": this.ariaLabel,
      "aria-hidden": this.ariaHidden,
      "aria-disabled": this.ariaDisabled
    }, this.$slots);
  }
});
const NIconSwitchTransition = defineComponent({
  name: "BaseIconSwitchTransition",
  setup(_, {
    slots
  }) {
    const isMountedRef = useIsMounted();
    return () => h(Transition, {
      name: "icon-switch-transition",
      appear: isMountedRef.value
    }, slots);
  }
});
function replaceable(name, icon) {
  const IconComponent = defineComponent({
    render() {
      return icon();
    }
  });
  return defineComponent({
    name: upperFirst(name),
    setup() {
      var _a;
      const mergedIconsRef = (_a = inject(configProviderInjectionKey, null)) === null || _a === void 0 ? void 0 : _a.mergedIconsRef;
      return () => {
        var _a2;
        const iconOverride = (_a2 = mergedIconsRef === null || mergedIconsRef === void 0 ? void 0 : mergedIconsRef.value) === null || _a2 === void 0 ? void 0 : _a2[name];
        return iconOverride ? iconOverride() : h(IconComponent, null);
      };
    }
  });
}
const ErrorIcon$1 = replaceable("close", () => h("svg", {
  viewBox: "0 0 12 12",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, h("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, h("path", {
  d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
})))));
const ErrorIcon = replaceable("error", () => h("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, h("g", {
  "fill-rule": "nonzero"
}, h("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"
})))));
const InfoIcon = replaceable("info", () => h("svg", {
  viewBox: "0 0 28 28",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, h("g", {
  "fill-rule": "nonzero"
}, h("path", {
  d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"
})))));
const SuccessIcon = replaceable("success", () => h("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, h("g", {
  "fill-rule": "nonzero"
}, h("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"
})))));
const WarningIcon = replaceable("warning", () => h("svg", {
  viewBox: "0 0 24 24",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, h("g", {
  "fill-rule": "nonzero"
}, h("path", {
  d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"
})))));
const {
  cubicBezierEaseInOut: cubicBezierEaseInOut$3
} = commonVariables$3;
function iconSwitchTransition({
  originalTransform = "",
  left = 0,
  top = 0,
  transition = `all .3s ${cubicBezierEaseInOut$3} !important`
} = {}) {
  return [c("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
    transform: `${originalTransform} scale(0.75)`,
    left,
    top,
    opacity: 0
  }), c("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
    transform: `scale(1) ${originalTransform}`,
    left,
    top,
    opacity: 1
  }), c("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
    transformOrigin: "center",
    position: "absolute",
    left,
    top,
    transition
  })];
}
const style$a = cB("base-close", `
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`, [cM("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), c("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), cNotM("disabled", [c("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), c("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), c("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), c("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), c("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), cM("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), cM("round", [c("&::before", `
 border-radius: 50%;
 `)])]);
const NBaseClose = defineComponent({
  name: "BaseClose",
  props: {
    isButtonTag: {
      type: Boolean,
      default: true
    },
    clsPrefix: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    focusable: {
      type: Boolean,
      default: true
    },
    round: Boolean,
    onClick: Function,
    absolute: Boolean
  },
  setup(props) {
    useStyle("-base-close", style$a, toRef(props, "clsPrefix"));
    return () => {
      const {
        clsPrefix,
        disabled,
        absolute,
        round,
        isButtonTag
      } = props;
      const Tag = isButtonTag ? "button" : "div";
      return h(Tag, {
        type: isButtonTag ? "button" : void 0,
        tabindex: disabled || !props.focusable ? -1 : 0,
        "aria-disabled": disabled,
        "aria-label": "close",
        role: isButtonTag ? void 0 : "button",
        disabled,
        class: [`${clsPrefix}-base-close`, absolute && `${clsPrefix}-base-close--absolute`, disabled && `${clsPrefix}-base-close--disabled`, round && `${clsPrefix}-base-close--round`],
        onMousedown: (e) => {
          if (!props.focusable) {
            e.preventDefault();
          }
        },
        onClick: props.onClick
      }, h(NBaseIcon, {
        clsPrefix
      }, {
        default: () => h(ErrorIcon$1, null)
      }));
    };
  }
});
const NFadeInExpandTransition = defineComponent({
  name: "FadeInExpandTransition",
  props: {
    appear: Boolean,
    group: Boolean,
    mode: String,
    onLeave: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
    width: Boolean,
    // reverse mode is only used in tree
    // it make it from expanded to collapsed after mounted
    reverse: Boolean
  },
  setup(props, {
    slots
  }) {
    function handleBeforeLeave(el) {
      if (props.width) {
        el.style.maxWidth = `${el.offsetWidth}px`;
      } else {
        el.style.maxHeight = `${el.offsetHeight}px`;
      }
      void el.offsetWidth;
    }
    function handleLeave(el) {
      if (props.width) {
        el.style.maxWidth = "0";
      } else {
        el.style.maxHeight = "0";
      }
      void el.offsetWidth;
      const {
        onLeave
      } = props;
      if (onLeave) onLeave();
    }
    function handleAfterLeave(el) {
      if (props.width) {
        el.style.maxWidth = "";
      } else {
        el.style.maxHeight = "";
      }
      const {
        onAfterLeave
      } = props;
      if (onAfterLeave) onAfterLeave();
    }
    function handleEnter(el) {
      el.style.transition = "none";
      if (props.width) {
        const memorizedWidth = el.offsetWidth;
        el.style.maxWidth = "0";
        void el.offsetWidth;
        el.style.transition = "";
        el.style.maxWidth = `${memorizedWidth}px`;
      } else {
        if (props.reverse) {
          el.style.maxHeight = `${el.offsetHeight}px`;
          void el.offsetHeight;
          el.style.transition = "";
          el.style.maxHeight = "0";
        } else {
          const memorizedHeight = el.offsetHeight;
          el.style.maxHeight = "0";
          void el.offsetWidth;
          el.style.transition = "";
          el.style.maxHeight = `${memorizedHeight}px`;
        }
      }
      void el.offsetWidth;
    }
    function handleAfterEnter(el) {
      var _a;
      if (props.width) {
        el.style.maxWidth = "";
      } else {
        if (!props.reverse) {
          el.style.maxHeight = "";
        }
      }
      (_a = props.onAfterEnter) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    return () => {
      const {
        group,
        width,
        appear,
        mode
      } = props;
      const type = group ? TransitionGroup : Transition;
      const resolvedProps = {
        name: width ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
        appear,
        onEnter: handleEnter,
        onAfterEnter: handleAfterEnter,
        onBeforeLeave: handleBeforeLeave,
        onLeave: handleLeave,
        onAfterLeave: handleAfterLeave
      };
      if (!group) {
        resolvedProps.mode = mode;
      }
      return h(type, resolvedProps, slots);
    };
  }
});
const style$9 = c([c("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`), cB("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [cE("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [iconSwitchTransition()]), cE("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [iconSwitchTransition({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), cE("container", `
 animation: rotator 3s linear infinite both;
 `, [cE("icon", `
 height: 1em;
 width: 1em;
 `)])])]);
const duration = "1.6s";
const exposedLoadingProps = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
};
const NBaseLoading = defineComponent({
  name: "BaseLoading",
  props: Object.assign({
    clsPrefix: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    },
    radius: {
      type: Number,
      default: 100
    }
  }, exposedLoadingProps),
  setup(props) {
    useStyle("-base-loading", style$9, toRef(props, "clsPrefix"));
  },
  render() {
    const {
      clsPrefix,
      radius,
      strokeWidth,
      stroke,
      scale
    } = this;
    const scaledRadius = radius / scale;
    return h("div", {
      class: `${clsPrefix}-base-loading`,
      role: "img",
      "aria-label": "loading"
    }, h(NIconSwitchTransition, null, {
      default: () => this.show ? h("div", {
        key: "icon",
        class: `${clsPrefix}-base-loading__transition-wrapper`
      }, h("div", {
        class: `${clsPrefix}-base-loading__container`
      }, h("svg", {
        class: `${clsPrefix}-base-loading__icon`,
        viewBox: `0 0 ${2 * scaledRadius} ${2 * scaledRadius}`,
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          color: stroke
        }
      }, h("g", null, h("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${scaledRadius} ${scaledRadius};270 ${scaledRadius} ${scaledRadius}`,
        begin: "0s",
        dur: duration,
        fill: "freeze",
        repeatCount: "indefinite"
      }), h("circle", {
        class: `${clsPrefix}-base-loading__icon`,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": strokeWidth,
        "stroke-linecap": "round",
        cx: scaledRadius,
        cy: scaledRadius,
        r: radius - strokeWidth / 2,
        "stroke-dasharray": 5.67 * radius,
        "stroke-dashoffset": 18.48 * radius
      }, h("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${scaledRadius} ${scaledRadius};135 ${scaledRadius} ${scaledRadius};450 ${scaledRadius} ${scaledRadius}`,
        begin: "0s",
        dur: duration,
        fill: "freeze",
        repeatCount: "indefinite"
      }), h("animate", {
        attributeName: "stroke-dashoffset",
        values: `${5.67 * radius};${1.42 * radius};${5.67 * radius}`,
        begin: "0s",
        dur: duration,
        fill: "freeze",
        repeatCount: "indefinite"
      })))))) : h("div", {
        key: "placeholder",
        class: `${clsPrefix}-base-loading__placeholder`
      }, this.$slots)
    }));
  }
});
const {
  cubicBezierEaseInOut: cubicBezierEaseInOut$2
} = commonVariables$3;
function fadeInTransition({
  name = "fade-in",
  enterDuration = "0.2s",
  leaveDuration = "0.2s",
  enterCubicBezier = cubicBezierEaseInOut$2,
  leaveCubicBezier = cubicBezierEaseInOut$2
} = {}) {
  return [c(`&.${name}-transition-enter-active`, {
    transition: `all ${enterDuration} ${enterCubicBezier}!important`
  }), c(`&.${name}-transition-leave-active`, {
    transition: `all ${leaveDuration} ${leaveCubicBezier}!important`
  }), c(`&.${name}-transition-enter-from, &.${name}-transition-leave-to`, {
    opacity: 0
  }), c(`&.${name}-transition-leave-from, &.${name}-transition-enter-to`, {
    opacity: 1
  })];
}
const base = {
  neutralBase: "#FFF",
  neutralInvertBase: "#000",
  neutralTextBase: "#000",
  neutralPopover: "#fff",
  neutralCard: "#fff",
  neutralModal: "#fff",
  neutralBody: "#fff",
  alpha1: "0.82",
  alpha2: "0.72",
  alpha3: "0.38",
  alpha4: "0.24",
  // disabled text, placeholder, icon
  alpha5: "0.18",
  // disabled placeholder
  alphaClose: "0.6",
  alphaDisabled: "0.5",
  alphaAvatar: "0.2",
  alphaProgressRail: ".08",
  alphaInput: "0",
  alphaScrollbar: "0.25",
  alphaScrollbarHover: "0.4",
  // primary
  primaryHover: "#36ad6a",
  primaryDefault: "#18a058",
  primaryActive: "#0c7a43",
  primarySuppl: "#36ad6a",
  // info
  infoHover: "#4098fc",
  infoDefault: "#2080f0",
  infoActive: "#1060c9",
  infoSuppl: "#4098fc",
  // error
  errorHover: "#de576d",
  errorDefault: "#d03050",
  errorActive: "#ab1f3f",
  errorSuppl: "#de576d",
  // warning
  warningHover: "#fcb040",
  warningDefault: "#f0a020",
  warningActive: "#c97c10",
  warningSuppl: "#fcb040",
  // success
  successHover: "#36ad6a",
  successDefault: "#18a058",
  successActive: "#0c7a43",
  successSuppl: "#36ad6a"
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
}, commonVariables$3), {
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
  textColor1: "rgb(31, 34, 37)",
  textColor2: "rgb(51, 54, 57)",
  textColor3: "rgb(118, 124, 130)",
  // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  // textColor5: neutral(base.alpha5),
  textColorDisabled: neutral(base.alpha4),
  placeholderColor: neutral(base.alpha4),
  placeholderColorDisabled: neutral(base.alpha5),
  iconColor: neutral(base.alpha4),
  iconColorHover: scaleColor(neutral(base.alpha4), {
    lightness: 0.75
  }),
  iconColorPressed: scaleColor(neutral(base.alpha4), {
    lightness: 0.9
  }),
  iconColorDisabled: neutral(base.alpha5),
  opacity1: base.alpha1,
  opacity2: base.alpha2,
  opacity3: base.alpha3,
  opacity4: base.alpha4,
  opacity5: base.alpha5,
  dividerColor: "rgb(239, 239, 245)",
  borderColor: "rgb(224, 224, 230)",
  // close
  closeIconColor: neutral(Number(base.alphaClose)),
  closeIconColorHover: neutral(Number(base.alphaClose)),
  closeIconColorPressed: neutral(Number(base.alphaClose)),
  closeColorHover: "rgba(0, 0, 0, .09)",
  closeColorPressed: "rgba(0, 0, 0, .13)",
  // clear
  clearColor: neutral(base.alpha4),
  clearColorHover: scaleColor(neutral(base.alpha4), {
    lightness: 0.75
  }),
  clearColorPressed: scaleColor(neutral(base.alpha4), {
    lightness: 0.9
  }),
  scrollbarColor: overlay(base.alphaScrollbar),
  scrollbarColorHover: overlay(base.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: neutral(base.alphaProgressRail),
  railColor: "rgb(219, 219, 223)",
  popoverColor: base.neutralPopover,
  tableColor: base.neutralCard,
  cardColor: base.neutralCard,
  modalColor: base.neutralModal,
  bodyColor: base.neutralBody,
  tagColor: "#eee",
  avatarColor: neutral(base.alphaAvatar),
  invertedColor: "rgb(0, 20, 40)",
  inputColor: neutral(base.alphaInput),
  codeColor: "rgb(244, 244, 248)",
  tabColor: "rgb(247, 247, 250)",
  actionColor: "rgb(250, 250, 252)",
  tableHeaderColor: "rgb(250, 250, 252)",
  hoverColor: "rgb(243, 243, 245)",
  // use color with alpha since it can be nested with header filter & sorter effect
  tableColorHover: "rgba(0, 0, 100, 0.03)",
  tableColorStriped: "rgba(0, 0, 100, 0.02)",
  pressedColor: "rgb(237, 237, 239)",
  opacityDisabled: base.alphaDisabled,
  inputColorDisabled: "rgb(250, 250, 252)",
  // secondary button color
  // can also be used in tertiary button & quaternary button
  buttonColor2: "rgba(46, 51, 56, .05)",
  buttonColor2Hover: "rgba(46, 51, 56, .09)",
  buttonColor2Pressed: "rgba(46, 51, 56, .13)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
});
const commonVars$2 = {
  railInsetHorizontalBottom: "auto 2px 4px 2px",
  railInsetHorizontalTop: "4px 2px auto 2px",
  railInsetVerticalRight: "2px 4px 2px auto",
  railInsetVerticalLeft: "2px auto 2px 4px",
  railColor: "transparent"
};
function self$7(vars) {
  const {
    scrollbarColor,
    scrollbarColorHover,
    scrollbarHeight,
    scrollbarWidth,
    scrollbarBorderRadius
  } = vars;
  return Object.assign(Object.assign({}, commonVars$2), {
    height: scrollbarHeight,
    width: scrollbarWidth,
    borderRadius: scrollbarBorderRadius,
    color: scrollbarColor,
    colorHover: scrollbarColorHover
  });
}
const scrollbarLight = {
  name: "Scrollbar",
  common: derived,
  self: self$7
};
const style$8 = cB("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [c(">", [cB("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `, [c("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), c(">", [
  // We can't set overflow hidden since it affects positioning.
  cB("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
])])]), c(">, +", [cB("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [cM("horizontal", `
 height: var(--n-scrollbar-height);
 `, [c(">", [cE("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), cM("horizontal--top", `
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `), cM("horizontal--bottom", `
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `), cM("vertical", `
 width: var(--n-scrollbar-width);
 `, [c(">", [cE("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), cM("vertical--left", `
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `), cM("vertical--right", `
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `), cM("disabled", [c(">", [cE("scrollbar", "pointer-events: none;")])]), c(">", [cE("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [fadeInTransition(), c("&:hover", "background-color: var(--n-scrollbar-color-hover);")])])])])]);
const scrollbarProps = Object.assign(Object.assign({}, useTheme.props), {
  duration: {
    type: Number,
    default: 0
  },
  scrollable: {
    type: Boolean,
    default: true
  },
  xScrollable: Boolean,
  trigger: {
    type: String,
    default: "hover"
  },
  useUnifiedContainer: Boolean,
  triggerDisplayManually: Boolean,
  // If container is set, resize observer won't not attached
  container: Function,
  content: Function,
  containerClass: String,
  containerStyle: [String, Object],
  contentClass: [String, Array],
  contentStyle: [String, Object],
  horizontalRailStyle: [String, Object],
  verticalRailStyle: [String, Object],
  onScroll: Function,
  onWheel: Function,
  onResize: Function,
  internalOnUpdateScrollLeft: Function,
  internalHoistYRail: Boolean,
  yPlacement: {
    type: String,
    default: "right"
  },
  xPlacement: {
    type: String,
    default: "bottom"
  }
});
const Scrollbar = defineComponent({
  name: "Scrollbar",
  props: scrollbarProps,
  inheritAttrs: false,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl("Scrollbar", mergedRtlRef, mergedClsPrefixRef);
    const wrapperRef = ref(null);
    const containerRef = ref(null);
    const contentRef = ref(null);
    const yRailRef = ref(null);
    const xRailRef = ref(null);
    const contentHeightRef = ref(null);
    const contentWidthRef = ref(null);
    const containerHeightRef = ref(null);
    const containerWidthRef = ref(null);
    const yRailSizeRef = ref(null);
    const xRailSizeRef = ref(null);
    const containerScrollTopRef = ref(0);
    const containerScrollLeftRef = ref(0);
    const isShowXBarRef = ref(false);
    const isShowYBarRef = ref(false);
    let yBarPressed = false;
    let xBarPressed = false;
    let xBarVanishTimerId;
    let yBarVanishTimerId;
    let memoYTop = 0;
    let memoXLeft = 0;
    let memoMouseX = 0;
    let memoMouseY = 0;
    const isIos = useIsIos();
    const themeRef = useTheme("Scrollbar", "-scrollbar", style$8, scrollbarLight, props, mergedClsPrefixRef);
    const yBarSizeRef = computed(() => {
      const {
        value: containerHeight
      } = containerHeightRef;
      const {
        value: contentHeight
      } = contentHeightRef;
      const {
        value: yRailSize
      } = yRailSizeRef;
      if (containerHeight === null || contentHeight === null || yRailSize === null) {
        return 0;
      } else {
        return Math.min(containerHeight, yRailSize * containerHeight / contentHeight + depx(themeRef.value.self.width) * 1.5);
      }
    });
    const yBarSizePxRef = computed(() => {
      return `${yBarSizeRef.value}px`;
    });
    const xBarSizeRef = computed(() => {
      const {
        value: containerWidth
      } = containerWidthRef;
      const {
        value: contentWidth
      } = contentWidthRef;
      const {
        value: xRailSize
      } = xRailSizeRef;
      if (containerWidth === null || contentWidth === null || xRailSize === null) {
        return 0;
      } else {
        return xRailSize * containerWidth / contentWidth + depx(themeRef.value.self.height) * 1.5;
      }
    });
    const xBarSizePxRef = computed(() => {
      return `${xBarSizeRef.value}px`;
    });
    const yBarTopRef = computed(() => {
      const {
        value: containerHeight
      } = containerHeightRef;
      const {
        value: containerScrollTop
      } = containerScrollTopRef;
      const {
        value: contentHeight
      } = contentHeightRef;
      const {
        value: yRailSize
      } = yRailSizeRef;
      if (containerHeight === null || contentHeight === null || yRailSize === null) {
        return 0;
      } else {
        const heightDiff = contentHeight - containerHeight;
        if (!heightDiff) return 0;
        return containerScrollTop / heightDiff * (yRailSize - yBarSizeRef.value);
      }
    });
    const yBarTopPxRef = computed(() => {
      return `${yBarTopRef.value}px`;
    });
    const xBarLeftRef = computed(() => {
      const {
        value: containerWidth
      } = containerWidthRef;
      const {
        value: containerScrollLeft
      } = containerScrollLeftRef;
      const {
        value: contentWidth
      } = contentWidthRef;
      const {
        value: xRailSize
      } = xRailSizeRef;
      if (containerWidth === null || contentWidth === null || xRailSize === null) {
        return 0;
      } else {
        const widthDiff = contentWidth - containerWidth;
        if (!widthDiff) return 0;
        return containerScrollLeft / widthDiff * (xRailSize - xBarSizeRef.value);
      }
    });
    const xBarLeftPxRef = computed(() => {
      return `${xBarLeftRef.value}px`;
    });
    const needYBarRef = computed(() => {
      const {
        value: containerHeight
      } = containerHeightRef;
      const {
        value: contentHeight
      } = contentHeightRef;
      return containerHeight !== null && contentHeight !== null && contentHeight > containerHeight;
    });
    const needXBarRef = computed(() => {
      const {
        value: containerWidth
      } = containerWidthRef;
      const {
        value: contentWidth
      } = contentWidthRef;
      return containerWidth !== null && contentWidth !== null && contentWidth > containerWidth;
    });
    const mergedShowXBarRef = computed(() => {
      const {
        trigger
      } = props;
      return trigger === "none" || isShowXBarRef.value;
    });
    const mergedShowYBarRef = computed(() => {
      const {
        trigger
      } = props;
      return trigger === "none" || isShowYBarRef.value;
    });
    const mergedContainerRef = computed(() => {
      const {
        container
      } = props;
      if (container) return container();
      return containerRef.value;
    });
    const mergedContentRef = computed(() => {
      const {
        content
      } = props;
      if (content) return content();
      return contentRef.value;
    });
    const scrollTo = (options, y) => {
      if (!props.scrollable) return;
      if (typeof options === "number") {
        scrollToPosition(options, y !== null && y !== void 0 ? y : 0, 0, false, "auto");
        return;
      }
      const {
        left,
        top,
        index,
        elSize,
        position,
        behavior,
        el,
        debounce = true
      } = options;
      if (left !== void 0 || top !== void 0) {
        scrollToPosition(left !== null && left !== void 0 ? left : 0, top !== null && top !== void 0 ? top : 0, 0, false, behavior);
      }
      if (el !== void 0) {
        scrollToPosition(0, el.offsetTop, el.offsetHeight, debounce, behavior);
      } else if (index !== void 0 && elSize !== void 0) {
        scrollToPosition(0, index * elSize, elSize, debounce, behavior);
      } else if (position === "bottom") {
        scrollToPosition(0, Number.MAX_SAFE_INTEGER, 0, false, behavior);
      } else if (position === "top") {
        scrollToPosition(0, 0, 0, false, behavior);
      }
    };
    const handleContentResize = () => {
      sync();
    };
    const handleContainerResize = (e) => {
      const {
        onResize
      } = props;
      if (onResize) onResize(e);
      sync();
    };
    const scrollBy = (options, y) => {
      if (!props.scrollable) return;
      const {
        value: container
      } = mergedContainerRef;
      if (!container) return;
      if (typeof options === "object") {
        container.scrollBy(options);
      } else {
        container.scrollBy(options, y || 0);
      }
    };
    function scrollToPosition(left, top, elSize, debounce, behavior) {
      const {
        value: container
      } = mergedContainerRef;
      if (!container) return;
      if (debounce) {
        const {
          scrollTop,
          offsetHeight
        } = container;
        if (top > scrollTop) {
          if (top + elSize <= scrollTop + offsetHeight) ;
          else {
            container.scrollTo({
              left,
              top: top + elSize - offsetHeight,
              behavior
            });
          }
          return;
        }
      }
      container.scrollTo({
        left,
        top,
        behavior
      });
    }
    function handleMouseEnterWrapper() {
      showXBar();
      showYBar();
      sync();
    }
    function handleMouseLeaveWrapper() {
      hideBar();
    }
    function hideBar() {
      hideYBar();
      hideXBar();
    }
    function hideYBar() {
      if (yBarVanishTimerId !== void 0) {
        (void 0).clearTimeout(yBarVanishTimerId);
      }
      yBarVanishTimerId = (void 0).setTimeout(() => {
        isShowYBarRef.value = false;
      }, props.duration);
    }
    function hideXBar() {
      if (xBarVanishTimerId !== void 0) {
        (void 0).clearTimeout(xBarVanishTimerId);
      }
      xBarVanishTimerId = (void 0).setTimeout(() => {
        isShowXBarRef.value = false;
      }, props.duration);
    }
    function showXBar() {
      if (xBarVanishTimerId !== void 0) {
        (void 0).clearTimeout(xBarVanishTimerId);
      }
      isShowXBarRef.value = true;
    }
    function showYBar() {
      if (yBarVanishTimerId !== void 0) {
        (void 0).clearTimeout(yBarVanishTimerId);
      }
      isShowYBarRef.value = true;
    }
    function handleScroll(e) {
      const {
        onScroll
      } = props;
      if (onScroll) onScroll(e);
      syncScrollState();
    }
    function syncScrollState() {
      const {
        value: container
      } = mergedContainerRef;
      if (container) {
        containerScrollTopRef.value = container.scrollTop;
        containerScrollLeftRef.value = container.scrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
      }
    }
    function syncPositionState() {
      const {
        value: content
      } = mergedContentRef;
      if (content) {
        contentHeightRef.value = content.offsetHeight;
        contentWidthRef.value = content.offsetWidth;
      }
      const {
        value: container
      } = mergedContainerRef;
      if (container) {
        containerHeightRef.value = container.offsetHeight;
        containerWidthRef.value = container.offsetWidth;
      }
      const {
        value: xRailEl
      } = xRailRef;
      const {
        value: yRailEl
      } = yRailRef;
      if (xRailEl) {
        xRailSizeRef.value = xRailEl.offsetWidth;
      }
      if (yRailEl) {
        yRailSizeRef.value = yRailEl.offsetHeight;
      }
    }
    function syncUnifiedContainer() {
      const {
        value: container
      } = mergedContainerRef;
      if (container) {
        containerScrollTopRef.value = container.scrollTop;
        containerScrollLeftRef.value = container.scrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
        containerHeightRef.value = container.offsetHeight;
        containerWidthRef.value = container.offsetWidth;
        contentHeightRef.value = container.scrollHeight;
        contentWidthRef.value = container.scrollWidth;
      }
      const {
        value: xRailEl
      } = xRailRef;
      const {
        value: yRailEl
      } = yRailRef;
      if (xRailEl) {
        xRailSizeRef.value = xRailEl.offsetWidth;
      }
      if (yRailEl) {
        yRailSizeRef.value = yRailEl.offsetHeight;
      }
    }
    function sync() {
      if (!props.scrollable) return;
      if (props.useUnifiedContainer) {
        syncUnifiedContainer();
      } else {
        syncPositionState();
        syncScrollState();
      }
    }
    function isMouseUpAway(e) {
      var _a;
      return !((_a = wrapperRef.value) === null || _a === void 0 ? void 0 : _a.contains(getPreciseEventTarget(e)));
    }
    function handleXScrollMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
      xBarPressed = true;
      on("mousemove", void 0, handleXScrollMouseMove, true);
      on("mouseup", void 0, handleXScrollMouseUp, true);
      memoXLeft = containerScrollLeftRef.value;
      memoMouseX = (rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? (void 0).innerWidth - e.clientX : e.clientX;
    }
    function handleXScrollMouseMove(e) {
      if (!xBarPressed) return;
      if (xBarVanishTimerId !== void 0) {
        (void 0).clearTimeout(xBarVanishTimerId);
      }
      if (yBarVanishTimerId !== void 0) {
        (void 0).clearTimeout(yBarVanishTimerId);
      }
      const {
        value: containerWidth
      } = containerWidthRef;
      const {
        value: contentWidth
      } = contentWidthRef;
      const {
        value: xBarSize
      } = xBarSizeRef;
      if (containerWidth === null || contentWidth === null) return;
      const dX = (rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? (void 0).innerWidth - e.clientX - memoMouseX : e.clientX - memoMouseX;
      const dScrollLeft = dX * (contentWidth - containerWidth) / (containerWidth - xBarSize);
      const toScrollLeftUpperBound = contentWidth - containerWidth;
      let toScrollLeft = memoXLeft + dScrollLeft;
      toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft);
      toScrollLeft = Math.max(toScrollLeft, 0);
      const {
        value: container
      } = mergedContainerRef;
      if (container) {
        container.scrollLeft = toScrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
        const {
          internalOnUpdateScrollLeft
        } = props;
        if (internalOnUpdateScrollLeft) internalOnUpdateScrollLeft(toScrollLeft);
      }
    }
    function handleXScrollMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();
      off("mousemove", void 0, handleXScrollMouseMove, true);
      off("mouseup", void 0, handleXScrollMouseUp, true);
      xBarPressed = false;
      sync();
      if (isMouseUpAway(e)) {
        hideBar();
      }
    }
    function handleYScrollMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();
      yBarPressed = true;
      on("mousemove", void 0, handleYScrollMouseMove, true);
      on("mouseup", void 0, handleYScrollMouseUp, true);
      memoYTop = containerScrollTopRef.value;
      memoMouseY = e.clientY;
    }
    function handleYScrollMouseMove(e) {
      if (!yBarPressed) return;
      if (xBarVanishTimerId !== void 0) {
        (void 0).clearTimeout(xBarVanishTimerId);
      }
      if (yBarVanishTimerId !== void 0) {
        (void 0).clearTimeout(yBarVanishTimerId);
      }
      const {
        value: containerHeight
      } = containerHeightRef;
      const {
        value: contentHeight
      } = contentHeightRef;
      const {
        value: yBarSize
      } = yBarSizeRef;
      if (containerHeight === null || contentHeight === null) return;
      const dY = e.clientY - memoMouseY;
      const dScrollTop = dY * (contentHeight - containerHeight) / (containerHeight - yBarSize);
      const toScrollTopUpperBound = contentHeight - containerHeight;
      let toScrollTop = memoYTop + dScrollTop;
      toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop);
      toScrollTop = Math.max(toScrollTop, 0);
      const {
        value: container
      } = mergedContainerRef;
      if (container) {
        container.scrollTop = toScrollTop;
      }
    }
    function handleYScrollMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();
      off("mousemove", void 0, handleYScrollMouseMove, true);
      off("mouseup", void 0, handleYScrollMouseUp, true);
      yBarPressed = false;
      sync();
      if (isMouseUpAway(e)) {
        hideBar();
      }
    }
    watchEffect(() => {
      const {
        value: needXBar
      } = needXBarRef;
      const {
        value: needYBar
      } = needYBarRef;
      const {
        value: mergedClsPrefix
      } = mergedClsPrefixRef;
      const {
        value: xRailEl
      } = xRailRef;
      const {
        value: yRailEl
      } = yRailRef;
      if (xRailEl) {
        if (!needXBar) {
          xRailEl.classList.add(`${mergedClsPrefix}-scrollbar-rail--disabled`);
        } else {
          xRailEl.classList.remove(`${mergedClsPrefix}-scrollbar-rail--disabled`);
        }
      }
      if (yRailEl) {
        if (!needYBar) {
          yRailEl.classList.add(`${mergedClsPrefix}-scrollbar-rail--disabled`);
        } else {
          yRailEl.classList.remove(`${mergedClsPrefix}-scrollbar-rail--disabled`);
        }
      }
    });
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          color,
          colorHover,
          height,
          width,
          borderRadius,
          railInsetHorizontalTop,
          railInsetHorizontalBottom,
          railInsetVerticalRight,
          railInsetVerticalLeft,
          railColor
        }
      } = themeRef.value;
      const {
        top: railTopHorizontalTop,
        right: railRightHorizontalTop,
        bottom: railBottomHorizontalTop,
        left: railLeftHorizontalTop
      } = getPadding(railInsetHorizontalTop);
      const {
        top: railTopHorizontalBottom,
        right: railRightHorizontalBottom,
        bottom: railBottomHorizontalBottom,
        left: railLeftHorizontalBottom
      } = getPadding(railInsetHorizontalBottom);
      const {
        top: railTopVerticalRight,
        right: railRightVerticalRight,
        bottom: railBottomVerticalRight,
        left: railLeftVerticalRight
      } = getPadding((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? rtlInset(railInsetVerticalRight) : railInsetVerticalRight);
      const {
        top: railTopVerticalLeft,
        right: railRightVerticalLeft,
        bottom: railBottomVerticalLeft,
        left: railLeftVerticalLeft
      } = getPadding((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? rtlInset(railInsetVerticalLeft) : railInsetVerticalLeft);
      return {
        "--n-scrollbar-bezier": cubicBezierEaseInOut2,
        "--n-scrollbar-color": color,
        "--n-scrollbar-color-hover": colorHover,
        "--n-scrollbar-border-radius": borderRadius,
        "--n-scrollbar-width": width,
        "--n-scrollbar-height": height,
        "--n-scrollbar-rail-top-horizontal-top": railTopHorizontalTop,
        "--n-scrollbar-rail-right-horizontal-top": railRightHorizontalTop,
        "--n-scrollbar-rail-bottom-horizontal-top": railBottomHorizontalTop,
        "--n-scrollbar-rail-left-horizontal-top": railLeftHorizontalTop,
        "--n-scrollbar-rail-top-horizontal-bottom": railTopHorizontalBottom,
        "--n-scrollbar-rail-right-horizontal-bottom": railRightHorizontalBottom,
        "--n-scrollbar-rail-bottom-horizontal-bottom": railBottomHorizontalBottom,
        "--n-scrollbar-rail-left-horizontal-bottom": railLeftHorizontalBottom,
        "--n-scrollbar-rail-top-vertical-right": railTopVerticalRight,
        "--n-scrollbar-rail-right-vertical-right": railRightVerticalRight,
        "--n-scrollbar-rail-bottom-vertical-right": railBottomVerticalRight,
        "--n-scrollbar-rail-left-vertical-right": railLeftVerticalRight,
        "--n-scrollbar-rail-top-vertical-left": railTopVerticalLeft,
        "--n-scrollbar-rail-right-vertical-left": railRightVerticalLeft,
        "--n-scrollbar-rail-bottom-vertical-left": railBottomVerticalLeft,
        "--n-scrollbar-rail-left-vertical-left": railLeftVerticalLeft,
        "--n-scrollbar-rail-color": railColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("scrollbar", void 0, cssVarsRef, props) : void 0;
    const exposedMethods = {
      scrollTo,
      scrollBy,
      sync,
      syncUnifiedContainer,
      handleMouseEnterWrapper,
      handleMouseLeaveWrapper
    };
    return Object.assign(Object.assign({}, exposedMethods), {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      containerScrollTop: containerScrollTopRef,
      wrapperRef,
      containerRef,
      contentRef,
      yRailRef,
      xRailRef,
      needYBar: needYBarRef,
      needXBar: needXBarRef,
      yBarSizePx: yBarSizePxRef,
      xBarSizePx: xBarSizePxRef,
      yBarTopPx: yBarTopPxRef,
      xBarLeftPx: xBarLeftPxRef,
      isShowXBar: mergedShowXBarRef,
      isShowYBar: mergedShowYBarRef,
      isIos,
      handleScroll,
      handleContentResize,
      handleContainerResize,
      handleYScrollMouseDown,
      handleXScrollMouseDown,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a;
    const {
      $slots,
      mergedClsPrefix,
      triggerDisplayManually,
      rtlEnabled,
      internalHoistYRail,
      yPlacement,
      xPlacement,
      xScrollable
    } = this;
    if (!this.scrollable) return (_a = $slots.default) === null || _a === void 0 ? void 0 : _a.call($slots);
    const triggerIsNone = this.trigger === "none";
    const createYRail = (className, style2) => {
      return h("div", {
        ref: "yRailRef",
        class: [`${mergedClsPrefix}-scrollbar-rail`, `${mergedClsPrefix}-scrollbar-rail--vertical`, `${mergedClsPrefix}-scrollbar-rail--vertical--${yPlacement}`, className],
        "data-scrollbar-rail": true,
        style: [style2 || "", this.verticalRailStyle],
        "aria-hidden": true
      }, h(triggerIsNone ? Wrapper : Transition, triggerIsNone ? null : {
        name: "fade-in-transition"
      }, {
        default: () => this.needYBar && this.isShowYBar && !this.isIos ? h("div", {
          class: `${mergedClsPrefix}-scrollbar-rail__scrollbar`,
          style: {
            height: this.yBarSizePx,
            top: this.yBarTopPx
          },
          onMousedown: this.handleYScrollMouseDown
        }) : null
      }));
    };
    const createChildren = () => {
      var _a2, _b;
      (_a2 = this.onRender) === null || _a2 === void 0 ? void 0 : _a2.call(this);
      return h("div", mergeProps(this.$attrs, {
        role: "none",
        ref: "wrapperRef",
        class: [`${mergedClsPrefix}-scrollbar`, this.themeClass, rtlEnabled && `${mergedClsPrefix}-scrollbar--rtl`],
        style: this.cssVars,
        onMouseenter: triggerDisplayManually ? void 0 : this.handleMouseEnterWrapper,
        onMouseleave: triggerDisplayManually ? void 0 : this.handleMouseLeaveWrapper
      }), [this.container ? (_b = $slots.default) === null || _b === void 0 ? void 0 : _b.call($slots) : h("div", {
        role: "none",
        ref: "containerRef",
        class: [`${mergedClsPrefix}-scrollbar-container`, this.containerClass],
        style: this.containerStyle,
        onScroll: this.handleScroll,
        onWheel: this.onWheel
      }, h(VResizeObserver, {
        onResize: this.handleContentResize
      }, {
        default: () => h("div", {
          ref: "contentRef",
          role: "none",
          style: [{
            width: this.xScrollable ? "fit-content" : null
          }, this.contentStyle],
          class: [`${mergedClsPrefix}-scrollbar-content`, this.contentClass]
        }, $slots)
      })), internalHoistYRail ? null : createYRail(void 0, void 0), xScrollable && h("div", {
        ref: "xRailRef",
        class: [`${mergedClsPrefix}-scrollbar-rail`, `${mergedClsPrefix}-scrollbar-rail--horizontal`, `${mergedClsPrefix}-scrollbar-rail--horizontal--${xPlacement}`],
        style: this.horizontalRailStyle,
        "data-scrollbar-rail": true,
        "aria-hidden": true
      }, h(triggerIsNone ? Wrapper : Transition, triggerIsNone ? null : {
        name: "fade-in-transition"
      }, {
        default: () => this.needXBar && this.isShowXBar && !this.isIos ? h("div", {
          class: `${mergedClsPrefix}-scrollbar-rail__scrollbar`,
          style: {
            width: this.xBarSizePx,
            right: rtlEnabled ? this.xBarLeftPx : void 0,
            left: rtlEnabled ? void 0 : this.xBarLeftPx
          },
          onMousedown: this.handleXScrollMouseDown
        }) : null
      }))]);
    };
    const scrollbarNode = this.container ? createChildren() : h(VResizeObserver, {
      onResize: this.handleContainerResize
    }, {
      default: createChildren
    });
    if (internalHoistYRail) {
      return h(Fragment, null, scrollbarNode, createYRail(this.themeClass, this.cssVars));
    } else {
      return scrollbarNode;
    }
  }
});
const XScrollbar = Scrollbar;
const {
  cubicBezierEaseIn: cubicBezierEaseIn$1,
  cubicBezierEaseOut: cubicBezierEaseOut$1
} = commonVariables$3;
function fadeInScaleUpTransition({
  transformOrigin = "inherit",
  duration: duration2 = ".2s",
  enterScale = ".9",
  originalTransform = "",
  originalTransition = ""
} = {}) {
  return [c("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin,
    transition: `opacity ${duration2} ${cubicBezierEaseIn$1}, transform ${duration2} ${cubicBezierEaseIn$1} ${originalTransition && `,${originalTransition}`}`
  }), c("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin,
    transition: `opacity ${duration2} ${cubicBezierEaseOut$1}, transform ${duration2} ${cubicBezierEaseOut$1} ${originalTransition && `,${originalTransition}`}`
  }), c("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${originalTransform} scale(${enterScale})`
  }), c("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${originalTransform} scale(1)`
  })];
}
const {
  cubicBezierEaseInOut: cubicBezierEaseInOut$1
} = commonVariables$3;
function fadeInWidthExpandTransition({
  duration: duration2 = ".2s",
  delay = ".1s"
} = {}) {
  return [c("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
    opacity: 1
  }), c("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), c("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${duration2} ${cubicBezierEaseInOut$1},
 max-width ${duration2} ${cubicBezierEaseInOut$1} ${delay},
 margin-left ${duration2} ${cubicBezierEaseInOut$1} ${delay},
 margin-right ${duration2} ${cubicBezierEaseInOut$1} ${delay};
 `), c("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${duration2} ${cubicBezierEaseInOut$1} ${delay},
 max-width ${duration2} ${cubicBezierEaseInOut$1},
 margin-left ${duration2} ${cubicBezierEaseInOut$1},
 margin-right ${duration2} ${cubicBezierEaseInOut$1};
 `)];
}
const style$7 = cB("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`);
const NBaseWave = defineComponent({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup(props) {
    useStyle("-base-wave", style$7, toRef(props, "clsPrefix"));
    const selfRef = ref(null);
    const activeRef = ref(false);
    let animationTimerId = null;
    return {
      active: activeRef,
      selfRef,
      play() {
        if (animationTimerId !== null) {
          (void 0).clearTimeout(animationTimerId);
          activeRef.value = false;
          animationTimerId = null;
        }
        void nextTick(() => {
          var _a;
          void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight);
          activeRef.value = true;
          animationTimerId = (void 0).setTimeout(() => {
            activeRef.value = false;
            animationTimerId = null;
          }, 1e3);
        });
      }
    };
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h("div", {
      ref: "selfRef",
      "aria-hidden": true,
      class: [`${clsPrefix}-base-wave`, this.active && `${clsPrefix}-base-wave--active`]
    });
  }
});
const {
  cubicBezierEaseInOut,
  cubicBezierEaseOut,
  cubicBezierEaseIn
} = commonVariables$3;
function fadeInHeightExpandTransition({
  overflow = "hidden",
  duration: duration2 = ".3s",
  originalTransition = "",
  leavingDelay = "0s",
  foldPadding = false,
  enterToProps = void 0,
  leaveToProps = void 0,
  reverse = false
} = {}) {
  const enterClass = reverse ? "leave" : "enter";
  const leaveClass = reverse ? "enter" : "leave";
  return [c(`&.fade-in-height-expand-transition-${leaveClass}-from,
 &.fade-in-height-expand-transition-${enterClass}-to`, Object.assign(Object.assign({}, enterToProps), {
    opacity: 1
  })), c(`&.fade-in-height-expand-transition-${leaveClass}-to,
 &.fade-in-height-expand-transition-${enterClass}-from`, Object.assign(Object.assign({}, leaveToProps), {
    opacity: 0,
    marginTop: "0 !important",
    marginBottom: "0 !important",
    paddingTop: foldPadding ? "0 !important" : void 0,
    paddingBottom: foldPadding ? "0 !important" : void 0
  })), c(`&.fade-in-height-expand-transition-${leaveClass}-active`, `
 overflow: ${overflow};
 transition:
 max-height ${duration2} ${cubicBezierEaseInOut} ${leavingDelay},
 opacity ${duration2} ${cubicBezierEaseOut} ${leavingDelay},
 margin-top ${duration2} ${cubicBezierEaseInOut} ${leavingDelay},
 margin-bottom ${duration2} ${cubicBezierEaseInOut} ${leavingDelay},
 padding-top ${duration2} ${cubicBezierEaseInOut} ${leavingDelay},
 padding-bottom ${duration2} ${cubicBezierEaseInOut} ${leavingDelay}
 ${originalTransition ? `,${originalTransition}` : ""}
 `), c(`&.fade-in-height-expand-transition-${enterClass}-active`, `
 overflow: ${overflow};
 transition:
 max-height ${duration2} ${cubicBezierEaseInOut},
 opacity ${duration2} ${cubicBezierEaseIn},
 margin-top ${duration2} ${cubicBezierEaseInOut},
 margin-bottom ${duration2} ${cubicBezierEaseInOut},
 padding-top ${duration2} ${cubicBezierEaseInOut},
 padding-bottom ${duration2} ${cubicBezierEaseInOut}
 ${originalTransition ? `,${originalTransition}` : ""}
 `)];
}
function createHoverColor(rgb) {
  return composite(rgb, [255, 255, 255, 0.16]);
}
function createPressedColor(rgb) {
  return composite(rgb, [0, 0, 0, 0.12]);
}
const buttonGroupInjectionKey = createInjectionKey("n-button-group");
const commonVariables$2 = {
  paddingTiny: "0 6px",
  paddingSmall: "0 10px",
  paddingMedium: "0 14px",
  paddingLarge: "0 18px",
  paddingRoundTiny: "0 10px",
  paddingRoundSmall: "0 14px",
  paddingRoundMedium: "0 18px",
  paddingRoundLarge: "0 22px",
  iconMarginTiny: "6px",
  iconMarginSmall: "6px",
  iconMarginMedium: "6px",
  iconMarginLarge: "6px",
  iconSizeTiny: "14px",
  iconSizeSmall: "18px",
  iconSizeMedium: "18px",
  iconSizeLarge: "20px",
  rippleDuration: ".6s"
};
function self$6(vars) {
  const {
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    borderRadius,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    opacityDisabled,
    textColor2,
    textColor3,
    primaryColorHover,
    primaryColorPressed,
    borderColor,
    primaryColor,
    baseColor,
    infoColor,
    infoColorHover,
    infoColorPressed,
    successColor,
    successColorHover,
    successColorPressed,
    warningColor,
    warningColorHover,
    warningColorPressed,
    errorColor,
    errorColorHover,
    errorColorPressed,
    fontWeight,
    buttonColor2,
    buttonColor2Hover,
    buttonColor2Pressed,
    fontWeightStrong
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$2), {
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    borderRadiusTiny: borderRadius,
    borderRadiusSmall: borderRadius,
    borderRadiusMedium: borderRadius,
    borderRadiusLarge: borderRadius,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    opacityDisabled,
    // secondary
    colorOpacitySecondary: "0.16",
    colorOpacitySecondaryHover: "0.22",
    colorOpacitySecondaryPressed: "0.28",
    colorSecondary: buttonColor2,
    colorSecondaryHover: buttonColor2Hover,
    colorSecondaryPressed: buttonColor2Pressed,
    // tertiary
    colorTertiary: buttonColor2,
    colorTertiaryHover: buttonColor2Hover,
    colorTertiaryPressed: buttonColor2Pressed,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: buttonColor2Hover,
    colorQuaternaryPressed: buttonColor2Pressed,
    // default type
    color: "#0000",
    colorHover: "#0000",
    colorPressed: "#0000",
    colorFocus: "#0000",
    colorDisabled: "#0000",
    textColor: textColor2,
    textColorTertiary: textColor3,
    textColorHover: primaryColorHover,
    textColorPressed: primaryColorPressed,
    textColorFocus: primaryColorHover,
    textColorDisabled: textColor2,
    textColorText: textColor2,
    textColorTextHover: primaryColorHover,
    textColorTextPressed: primaryColorPressed,
    textColorTextFocus: primaryColorHover,
    textColorTextDisabled: textColor2,
    textColorGhost: textColor2,
    textColorGhostHover: primaryColorHover,
    textColorGhostPressed: primaryColorPressed,
    textColorGhostFocus: primaryColorHover,
    textColorGhostDisabled: textColor2,
    border: `1px solid ${borderColor}`,
    borderHover: `1px solid ${primaryColorHover}`,
    borderPressed: `1px solid ${primaryColorPressed}`,
    borderFocus: `1px solid ${primaryColorHover}`,
    borderDisabled: `1px solid ${borderColor}`,
    rippleColor: primaryColor,
    // primary
    colorPrimary: primaryColor,
    colorHoverPrimary: primaryColorHover,
    colorPressedPrimary: primaryColorPressed,
    colorFocusPrimary: primaryColorHover,
    colorDisabledPrimary: primaryColor,
    textColorPrimary: baseColor,
    textColorHoverPrimary: baseColor,
    textColorPressedPrimary: baseColor,
    textColorFocusPrimary: baseColor,
    textColorDisabledPrimary: baseColor,
    textColorTextPrimary: primaryColor,
    textColorTextHoverPrimary: primaryColorHover,
    textColorTextPressedPrimary: primaryColorPressed,
    textColorTextFocusPrimary: primaryColorHover,
    textColorTextDisabledPrimary: textColor2,
    textColorGhostPrimary: primaryColor,
    textColorGhostHoverPrimary: primaryColorHover,
    textColorGhostPressedPrimary: primaryColorPressed,
    textColorGhostFocusPrimary: primaryColorHover,
    textColorGhostDisabledPrimary: primaryColor,
    borderPrimary: `1px solid ${primaryColor}`,
    borderHoverPrimary: `1px solid ${primaryColorHover}`,
    borderPressedPrimary: `1px solid ${primaryColorPressed}`,
    borderFocusPrimary: `1px solid ${primaryColorHover}`,
    borderDisabledPrimary: `1px solid ${primaryColor}`,
    rippleColorPrimary: primaryColor,
    // info
    colorInfo: infoColor,
    colorHoverInfo: infoColorHover,
    colorPressedInfo: infoColorPressed,
    colorFocusInfo: infoColorHover,
    colorDisabledInfo: infoColor,
    textColorInfo: baseColor,
    textColorHoverInfo: baseColor,
    textColorPressedInfo: baseColor,
    textColorFocusInfo: baseColor,
    textColorDisabledInfo: baseColor,
    textColorTextInfo: infoColor,
    textColorTextHoverInfo: infoColorHover,
    textColorTextPressedInfo: infoColorPressed,
    textColorTextFocusInfo: infoColorHover,
    textColorTextDisabledInfo: textColor2,
    textColorGhostInfo: infoColor,
    textColorGhostHoverInfo: infoColorHover,
    textColorGhostPressedInfo: infoColorPressed,
    textColorGhostFocusInfo: infoColorHover,
    textColorGhostDisabledInfo: infoColor,
    borderInfo: `1px solid ${infoColor}`,
    borderHoverInfo: `1px solid ${infoColorHover}`,
    borderPressedInfo: `1px solid ${infoColorPressed}`,
    borderFocusInfo: `1px solid ${infoColorHover}`,
    borderDisabledInfo: `1px solid ${infoColor}`,
    rippleColorInfo: infoColor,
    // success
    colorSuccess: successColor,
    colorHoverSuccess: successColorHover,
    colorPressedSuccess: successColorPressed,
    colorFocusSuccess: successColorHover,
    colorDisabledSuccess: successColor,
    textColorSuccess: baseColor,
    textColorHoverSuccess: baseColor,
    textColorPressedSuccess: baseColor,
    textColorFocusSuccess: baseColor,
    textColorDisabledSuccess: baseColor,
    textColorTextSuccess: successColor,
    textColorTextHoverSuccess: successColorHover,
    textColorTextPressedSuccess: successColorPressed,
    textColorTextFocusSuccess: successColorHover,
    textColorTextDisabledSuccess: textColor2,
    textColorGhostSuccess: successColor,
    textColorGhostHoverSuccess: successColorHover,
    textColorGhostPressedSuccess: successColorPressed,
    textColorGhostFocusSuccess: successColorHover,
    textColorGhostDisabledSuccess: successColor,
    borderSuccess: `1px solid ${successColor}`,
    borderHoverSuccess: `1px solid ${successColorHover}`,
    borderPressedSuccess: `1px solid ${successColorPressed}`,
    borderFocusSuccess: `1px solid ${successColorHover}`,
    borderDisabledSuccess: `1px solid ${successColor}`,
    rippleColorSuccess: successColor,
    // warning
    colorWarning: warningColor,
    colorHoverWarning: warningColorHover,
    colorPressedWarning: warningColorPressed,
    colorFocusWarning: warningColorHover,
    colorDisabledWarning: warningColor,
    textColorWarning: baseColor,
    textColorHoverWarning: baseColor,
    textColorPressedWarning: baseColor,
    textColorFocusWarning: baseColor,
    textColorDisabledWarning: baseColor,
    textColorTextWarning: warningColor,
    textColorTextHoverWarning: warningColorHover,
    textColorTextPressedWarning: warningColorPressed,
    textColorTextFocusWarning: warningColorHover,
    textColorTextDisabledWarning: textColor2,
    textColorGhostWarning: warningColor,
    textColorGhostHoverWarning: warningColorHover,
    textColorGhostPressedWarning: warningColorPressed,
    textColorGhostFocusWarning: warningColorHover,
    textColorGhostDisabledWarning: warningColor,
    borderWarning: `1px solid ${warningColor}`,
    borderHoverWarning: `1px solid ${warningColorHover}`,
    borderPressedWarning: `1px solid ${warningColorPressed}`,
    borderFocusWarning: `1px solid ${warningColorHover}`,
    borderDisabledWarning: `1px solid ${warningColor}`,
    rippleColorWarning: warningColor,
    // error
    colorError: errorColor,
    colorHoverError: errorColorHover,
    colorPressedError: errorColorPressed,
    colorFocusError: errorColorHover,
    colorDisabledError: errorColor,
    textColorError: baseColor,
    textColorHoverError: baseColor,
    textColorPressedError: baseColor,
    textColorFocusError: baseColor,
    textColorDisabledError: baseColor,
    textColorTextError: errorColor,
    textColorTextHoverError: errorColorHover,
    textColorTextPressedError: errorColorPressed,
    textColorTextFocusError: errorColorHover,
    textColorTextDisabledError: textColor2,
    textColorGhostError: errorColor,
    textColorGhostHoverError: errorColorHover,
    textColorGhostPressedError: errorColorPressed,
    textColorGhostFocusError: errorColorHover,
    textColorGhostDisabledError: errorColor,
    borderError: `1px solid ${errorColor}`,
    borderHoverError: `1px solid ${errorColorHover}`,
    borderPressedError: `1px solid ${errorColorPressed}`,
    borderFocusError: `1px solid ${errorColorHover}`,
    borderDisabledError: `1px solid ${errorColor}`,
    rippleColorError: errorColor,
    waveOpacity: "0.6",
    fontWeight,
    fontWeightStrong
  });
}
const buttonLight = {
  name: "Button",
  common: derived,
  self: self$6
};
const style$6 = c([cB("button", `
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [cM("color", [cE("border", {
  borderColor: "var(--n-border-color)"
}), cM("disabled", [cE("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), cNotM("disabled", [c("&:focus", [cE("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), c("&:hover", [cE("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), c("&:active", [cE("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), cM("pressed", [cE("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), cM("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [cE("border", {
  border: "var(--n-border-disabled)"
})]), cNotM("disabled", [c("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [cE("state-border", {
  border: "var(--n-border-focus)"
})]), c("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [cE("state-border", {
  border: "var(--n-border-hover)"
})]), c("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [cE("state-border", {
  border: "var(--n-border-pressed)"
})]), cM("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [cE("state-border", {
  border: "var(--n-border-pressed)"
})])]), cM("loading", "cursor: wait;"), cB("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [cM("active", {
  zIndex: 1,
  animationName: "button-wave-spread, button-wave-opacity"
})]), null, cE("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), cE("border", {
  border: "var(--n-border)"
}), cE("state-border", {
  border: "var(--n-border)",
  borderColor: "#0000",
  zIndex: 1
}), cE("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [cB("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [iconSwitchTransition({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), fadeInWidthExpandTransition()]), cE("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [c("~", [cE("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), cM("block", `
 display: flex;
 width: 100%;
 `), cM("dashed", [cE("border, state-border", {
  borderStyle: "dashed !important"
})]), cM("disabled", {
  cursor: "not-allowed",
  opacity: "var(--n-opacity-disabled)"
})]), c("@keyframes button-wave-spread", {
  from: {
    boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
  }
}), c("@keyframes button-wave-opacity", {
  from: {
    opacity: "var(--n-wave-opacity)"
  },
  to: {
    opacity: 0
  }
})]);
const buttonProps = Object.assign(Object.assign({}, useTheme.props), {
  color: String,
  textColor: String,
  text: Boolean,
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
  circle: Boolean,
  size: String,
  ghost: Boolean,
  round: Boolean,
  secondary: Boolean,
  tertiary: Boolean,
  quaternary: Boolean,
  strong: Boolean,
  focusable: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  tag: {
    type: String,
    default: "button"
  },
  type: {
    type: String,
    default: "default"
  },
  dashed: Boolean,
  renderIcon: Function,
  iconPlacement: {
    type: String,
    default: "left"
  },
  attrType: {
    type: String,
    default: "button"
  },
  bordered: {
    type: Boolean,
    default: true
  },
  onClick: [Function, Array],
  nativeFocusBehavior: {
    type: Boolean,
    default: true
  }
});
const Button = defineComponent({
  name: "Button",
  props: buttonProps,
  slots: Object,
  setup(props) {
    const selfElRef = ref(null);
    const waveElRef = ref(null);
    const enterPressedRef = ref(false);
    const showBorderRef = useMemo(() => {
      return !props.quaternary && !props.tertiary && !props.secondary && !props.text && (!props.color || props.ghost || props.dashed) && props.bordered;
    });
    const NButtonGroup = inject(buttonGroupInjectionKey, {});
    const {
      mergedSizeRef
    } = useFormItem({}, {
      defaultSize: "medium",
      mergedSize: (NFormItem) => {
        const {
          size
        } = props;
        if (size) return size;
        const {
          size: buttonGroupSize
        } = NButtonGroup;
        if (buttonGroupSize) return buttonGroupSize;
        const {
          mergedSize: formItemSize
        } = NFormItem || {};
        if (formItemSize) {
          return formItemSize.value;
        }
        return "medium";
      }
    });
    const mergedFocusableRef = computed(() => {
      return props.focusable && !props.disabled;
    });
    const handleMousedown = (e) => {
      var _a;
      if (!mergedFocusableRef.value) {
        e.preventDefault();
      }
      if (props.nativeFocusBehavior) {
        return;
      }
      e.preventDefault();
      if (props.disabled) {
        return;
      }
      if (mergedFocusableRef.value) {
        (_a = selfElRef.value) === null || _a === void 0 ? void 0 : _a.focus({
          preventScroll: true
        });
      }
    };
    const handleClick = (e) => {
      var _a;
      if (!props.disabled && !props.loading) {
        const {
          onClick
        } = props;
        if (onClick) call(onClick, e);
        if (!props.text) {
          (_a = waveElRef.value) === null || _a === void 0 ? void 0 : _a.play();
        }
      }
    };
    const handleKeyup = (e) => {
      switch (e.key) {
        case "Enter":
          if (!props.keyboard) {
            return;
          }
          enterPressedRef.value = false;
      }
    };
    const handleKeydown = (e) => {
      switch (e.key) {
        case "Enter":
          if (!props.keyboard || props.loading) {
            e.preventDefault();
            return;
          }
          enterPressedRef.value = true;
      }
    };
    const handleBlur = () => {
      enterPressedRef.value = false;
    };
    const {
      inlineThemeDisabled,
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme("Button", "-button", style$6, buttonLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("Button", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const theme = themeRef.value;
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2,
          cubicBezierEaseOut: cubicBezierEaseOut2
        },
        self: self2
      } = theme;
      const {
        rippleDuration,
        opacityDisabled,
        fontWeight,
        fontWeightStrong
      } = self2;
      const size = mergedSizeRef.value;
      const {
        dashed,
        type,
        ghost,
        text,
        color,
        round,
        circle,
        textColor,
        secondary,
        tertiary,
        quaternary,
        strong
      } = props;
      const fontProps = {
        "--n-font-weight": strong ? fontWeightStrong : fontWeight
      };
      let colorProps = {
        "--n-color": "initial",
        "--n-color-hover": "initial",
        "--n-color-pressed": "initial",
        "--n-color-focus": "initial",
        "--n-color-disabled": "initial",
        "--n-ripple-color": "initial",
        "--n-text-color": "initial",
        "--n-text-color-hover": "initial",
        "--n-text-color-pressed": "initial",
        "--n-text-color-focus": "initial",
        "--n-text-color-disabled": "initial"
      };
      const typeIsTertiary = type === "tertiary";
      const typeIsDefault = type === "default";
      const mergedType = typeIsTertiary ? "default" : type;
      if (text) {
        const propTextColor = textColor || color;
        const mergedTextColor = propTextColor || self2[createKey("textColorText", mergedType)];
        colorProps = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": mergedTextColor,
          "--n-text-color-hover": propTextColor ? createHoverColor(propTextColor) : self2[createKey("textColorTextHover", mergedType)],
          "--n-text-color-pressed": propTextColor ? createPressedColor(propTextColor) : self2[createKey("textColorTextPressed", mergedType)],
          "--n-text-color-focus": propTextColor ? createHoverColor(propTextColor) : self2[createKey("textColorTextHover", mergedType)],
          "--n-text-color-disabled": propTextColor || self2[createKey("textColorTextDisabled", mergedType)]
        };
      } else if (ghost || dashed) {
        const mergedTextColor = textColor || color;
        colorProps = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": color || self2[createKey("rippleColor", mergedType)],
          "--n-text-color": mergedTextColor || self2[createKey("textColorGhost", mergedType)],
          "--n-text-color-hover": mergedTextColor ? createHoverColor(mergedTextColor) : self2[createKey("textColorGhostHover", mergedType)],
          "--n-text-color-pressed": mergedTextColor ? createPressedColor(mergedTextColor) : self2[createKey("textColorGhostPressed", mergedType)],
          "--n-text-color-focus": mergedTextColor ? createHoverColor(mergedTextColor) : self2[createKey("textColorGhostHover", mergedType)],
          "--n-text-color-disabled": mergedTextColor || self2[createKey("textColorGhostDisabled", mergedType)]
        };
      } else if (secondary) {
        const typeTextColor = typeIsDefault ? self2.textColor : typeIsTertiary ? self2.textColorTertiary : self2[createKey("color", mergedType)];
        const mergedTextColor = color || typeTextColor;
        const isColoredType = type !== "default" && type !== "tertiary";
        colorProps = {
          "--n-color": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondary)
          }) : self2.colorSecondary,
          "--n-color-hover": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondaryHover)
          }) : self2.colorSecondaryHover,
          "--n-color-pressed": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondaryPressed)
          }) : self2.colorSecondaryPressed,
          "--n-color-focus": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondaryHover)
          }) : self2.colorSecondaryHover,
          "--n-color-disabled": self2.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": mergedTextColor,
          "--n-text-color-hover": mergedTextColor,
          "--n-text-color-pressed": mergedTextColor,
          "--n-text-color-focus": mergedTextColor,
          "--n-text-color-disabled": mergedTextColor
        };
      } else if (tertiary || quaternary) {
        const typeColor = typeIsDefault ? self2.textColor : typeIsTertiary ? self2.textColorTertiary : self2[createKey("color", mergedType)];
        const mergedColor = color || typeColor;
        if (tertiary) {
          colorProps["--n-color"] = self2.colorTertiary;
          colorProps["--n-color-hover"] = self2.colorTertiaryHover;
          colorProps["--n-color-pressed"] = self2.colorTertiaryPressed;
          colorProps["--n-color-focus"] = self2.colorSecondaryHover;
          colorProps["--n-color-disabled"] = self2.colorTertiary;
        } else {
          colorProps["--n-color"] = self2.colorQuaternary;
          colorProps["--n-color-hover"] = self2.colorQuaternaryHover;
          colorProps["--n-color-pressed"] = self2.colorQuaternaryPressed;
          colorProps["--n-color-focus"] = self2.colorQuaternaryHover;
          colorProps["--n-color-disabled"] = self2.colorQuaternary;
        }
        colorProps["--n-ripple-color"] = "#0000";
        colorProps["--n-text-color"] = mergedColor;
        colorProps["--n-text-color-hover"] = mergedColor;
        colorProps["--n-text-color-pressed"] = mergedColor;
        colorProps["--n-text-color-focus"] = mergedColor;
        colorProps["--n-text-color-disabled"] = mergedColor;
      } else {
        colorProps = {
          "--n-color": color || self2[createKey("color", mergedType)],
          "--n-color-hover": color ? createHoverColor(color) : self2[createKey("colorHover", mergedType)],
          "--n-color-pressed": color ? createPressedColor(color) : self2[createKey("colorPressed", mergedType)],
          "--n-color-focus": color ? createHoverColor(color) : self2[createKey("colorFocus", mergedType)],
          "--n-color-disabled": color || self2[createKey("colorDisabled", mergedType)],
          "--n-ripple-color": color || self2[createKey("rippleColor", mergedType)],
          "--n-text-color": textColor || (color ? self2.textColorPrimary : typeIsTertiary ? self2.textColorTertiary : self2[createKey("textColor", mergedType)]),
          "--n-text-color-hover": textColor || (color ? self2.textColorHoverPrimary : self2[createKey("textColorHover", mergedType)]),
          "--n-text-color-pressed": textColor || (color ? self2.textColorPressedPrimary : self2[createKey("textColorPressed", mergedType)]),
          "--n-text-color-focus": textColor || (color ? self2.textColorFocusPrimary : self2[createKey("textColorFocus", mergedType)]),
          "--n-text-color-disabled": textColor || (color ? self2.textColorDisabledPrimary : self2[createKey("textColorDisabled", mergedType)])
        };
      }
      let borderProps = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      if (text) {
        borderProps = {
          "--n-border": "none",
          "--n-border-hover": "none",
          "--n-border-pressed": "none",
          "--n-border-focus": "none",
          "--n-border-disabled": "none"
        };
      } else {
        borderProps = {
          "--n-border": self2[createKey("border", mergedType)],
          "--n-border-hover": self2[createKey("borderHover", mergedType)],
          "--n-border-pressed": self2[createKey("borderPressed", mergedType)],
          "--n-border-focus": self2[createKey("borderFocus", mergedType)],
          "--n-border-disabled": self2[createKey("borderDisabled", mergedType)]
        };
      }
      const {
        [createKey("height", size)]: height,
        [createKey("fontSize", size)]: fontSize2,
        [createKey("padding", size)]: padding,
        [createKey("paddingRound", size)]: paddingRound,
        [createKey("iconSize", size)]: iconSize,
        [createKey("borderRadius", size)]: borderRadius,
        [createKey("iconMargin", size)]: iconMargin,
        waveOpacity
      } = self2;
      const sizeProps = {
        "--n-width": circle && !text ? height : "initial",
        "--n-height": text ? "initial" : height,
        "--n-font-size": fontSize2,
        "--n-padding": circle ? "initial" : text ? "initial" : round ? paddingRound : padding,
        "--n-icon-size": iconSize,
        "--n-icon-margin": iconMargin,
        "--n-border-radius": text ? "initial" : circle || round ? height : borderRadius
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-bezier-ease-out": cubicBezierEaseOut2,
        "--n-ripple-duration": rippleDuration,
        "--n-opacity-disabled": opacityDisabled,
        "--n-wave-opacity": waveOpacity
      }, fontProps), colorProps), borderProps), sizeProps);
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("button", computed(() => {
      let hash2 = "";
      const {
        dashed,
        type,
        ghost,
        text,
        color,
        round,
        circle,
        textColor,
        secondary,
        tertiary,
        quaternary,
        strong
      } = props;
      if (dashed) hash2 += "a";
      if (ghost) hash2 += "b";
      if (text) hash2 += "c";
      if (round) hash2 += "d";
      if (circle) hash2 += "e";
      if (secondary) hash2 += "f";
      if (tertiary) hash2 += "g";
      if (quaternary) hash2 += "h";
      if (strong) hash2 += "i";
      if (color) hash2 += `j${color2Class(color)}`;
      if (textColor) hash2 += `k${color2Class(textColor)}`;
      const {
        value: size
      } = mergedSizeRef;
      hash2 += `l${size[0]}`;
      hash2 += `m${type[0]}`;
      return hash2;
    }), cssVarsRef, props) : void 0;
    return {
      selfElRef,
      waveElRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedFocusable: mergedFocusableRef,
      mergedSize: mergedSizeRef,
      showBorder: showBorderRef,
      enterPressed: enterPressedRef,
      rtlEnabled: rtlEnabledRef,
      handleMousedown,
      handleKeydown,
      handleBlur,
      handleKeyup,
      handleClick,
      customColorCssVars: computed(() => {
        const {
          color
        } = props;
        if (!color) return null;
        const hoverColor = createHoverColor(color);
        return {
          "--n-border-color": color,
          "--n-border-color-hover": hoverColor,
          "--n-border-color-pressed": createPressedColor(color),
          "--n-border-color-focus": hoverColor,
          "--n-border-color-disabled": color
        };
      }),
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix,
      tag: Component,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const children = resolveWrappedSlot(this.$slots.default, (children2) => children2 && h("span", {
      class: `${mergedClsPrefix}-button__content`
    }, children2));
    return h(Component, {
      ref: "selfElRef",
      class: [
        this.themeClass,
        `${mergedClsPrefix}-button`,
        `${mergedClsPrefix}-button--${this.type}-type`,
        `${mergedClsPrefix}-button--${this.mergedSize}-type`,
        this.rtlEnabled && `${mergedClsPrefix}-button--rtl`,
        this.disabled && `${mergedClsPrefix}-button--disabled`,
        this.block && `${mergedClsPrefix}-button--block`,
        this.enterPressed && `${mergedClsPrefix}-button--pressed`,
        !this.text && this.dashed && `${mergedClsPrefix}-button--dashed`,
        this.color && `${mergedClsPrefix}-button--color`,
        this.secondary && `${mergedClsPrefix}-button--secondary`,
        this.loading && `${mergedClsPrefix}-button--loading`,
        this.ghost && `${mergedClsPrefix}-button--ghost`
        // required for button group border collapse
      ],
      tabindex: this.mergedFocusable ? 0 : -1,
      type: this.attrType,
      style: this.cssVars,
      disabled: this.disabled,
      onClick: this.handleClick,
      onBlur: this.handleBlur,
      onMousedown: this.handleMousedown,
      onKeyup: this.handleKeyup,
      onKeydown: this.handleKeydown
    }, this.iconPlacement === "right" && children, h(NFadeInExpandTransition, {
      width: true
    }, {
      default: () => resolveWrappedSlot(this.$slots.icon, (children2) => (this.loading || this.renderIcon || children2) && h("span", {
        class: `${mergedClsPrefix}-button__icon`,
        style: {
          margin: isSlotEmpty(this.$slots.default) ? "0" : ""
        }
      }, h(NIconSwitchTransition, null, {
        default: () => this.loading ? h(NBaseLoading, {
          clsPrefix: mergedClsPrefix,
          key: "loading",
          class: `${mergedClsPrefix}-icon-slot`,
          strokeWidth: 20
        }) : h("div", {
          key: "icon",
          class: `${mergedClsPrefix}-icon-slot`,
          role: "none"
        }, this.renderIcon ? this.renderIcon() : children2)
      })))
    }), this.iconPlacement === "left" && children, !this.text ? h(NBaseWave, {
      ref: "waveElRef",
      clsPrefix: mergedClsPrefix
    }) : null, this.showBorder ? h("div", {
      "aria-hidden": true,
      class: `${mergedClsPrefix}-button__border`,
      style: this.customColorCssVars
    }) : null, this.showBorder ? h("div", {
      "aria-hidden": true,
      class: `${mergedClsPrefix}-button__state-border`,
      style: this.customColorCssVars
    }) : null);
  }
});
const commonVariables$1 = {
  paddingSmall: "12px 16px 12px",
  paddingMedium: "19px 24px 20px",
  paddingLarge: "23px 32px 24px",
  paddingHuge: "27px 40px 28px",
  titleFontSizeSmall: "16px",
  titleFontSizeMedium: "18px",
  titleFontSizeLarge: "18px",
  titleFontSizeHuge: "18px",
  closeIconSize: "18px",
  closeSize: "22px"
};
function self$5(vars) {
  const {
    primaryColor,
    borderRadius,
    lineHeight: lineHeight2,
    fontSize: fontSize2,
    cardColor,
    textColor2,
    textColor1,
    dividerColor,
    fontWeightStrong,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    modalColor,
    boxShadow1,
    popoverColor,
    actionColor
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$1), {
    lineHeight: lineHeight2,
    color: cardColor,
    colorModal: modalColor,
    colorPopover: popoverColor,
    colorTarget: primaryColor,
    colorEmbedded: actionColor,
    colorEmbeddedModal: actionColor,
    colorEmbeddedPopover: actionColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    borderColor: dividerColor,
    actionColor,
    titleFontWeight: fontWeightStrong,
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadius,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    fontSizeSmall: fontSize2,
    fontSizeMedium: fontSize2,
    fontSizeLarge: fontSize2,
    fontSizeHuge: fontSize2,
    boxShadow: boxShadow1,
    borderRadius
  });
}
const cardLight = {
  name: "Card",
  common: derived,
  self: self$5
};
const style$5 = c([cB("card", `
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [asModal({
  background: "var(--n-color-modal)"
}), cM("hoverable", [c("&:hover", "box-shadow: var(--n-box-shadow);")]), cM("content-segmented", [c(">", [cE("content", {
  paddingTop: "var(--n-padding-bottom)"
})])]), cM("content-soft-segmented", [c(">", [cE("content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]), cM("footer-segmented", [c(">", [cE("footer", {
  paddingTop: "var(--n-padding-bottom)"
})])]), cM("footer-soft-segmented", [c(">", [cE("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), c(">", [cB("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [cE("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `), cE("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), cE("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), cE("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `), cE("content", "flex: 1; min-width: 0;"), cE("content, footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [c("&:first-child", {
  paddingTop: "var(--n-padding-bottom)"
})]), cE("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]), cB("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [c("img", `
 display: block;
 width: 100%;
 `)]), cM("bordered", `
 border: 1px solid var(--n-border-color);
 `, [c("&:target", "border-color: var(--n-color-target);")]), cM("action-segmented", [c(">", [cE("action", [c("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), cM("content-segmented, content-soft-segmented", [c(">", [cE("content", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [c("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), cM("footer-segmented, footer-soft-segmented", [c(">", [cE("footer", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [c("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), cM("embedded", `
 background-color: var(--n-color-embedded);
 `)]), insideModal(cB("card", `
 background: var(--n-color-modal);
 `, [cM("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), insidePopover(cB("card", `
 background: var(--n-color-popover);
 `, [cM("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]);
const cardBaseProps = {
  title: [String, Function],
  contentClass: String,
  contentStyle: [Object, String],
  headerClass: String,
  headerStyle: [Object, String],
  headerExtraClass: String,
  headerExtraStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  embedded: Boolean,
  segmented: {
    type: [Boolean, Object],
    default: false
  },
  size: {
    type: String,
    default: "medium"
  },
  bordered: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  hoverable: Boolean,
  role: String,
  onClose: [Function, Array],
  tag: {
    type: String,
    default: "div"
  },
  cover: Function,
  content: [String, Function],
  footer: Function,
  action: Function,
  headerExtra: Function
};
const cardBasePropKeys = keysOf(cardBaseProps);
const cardProps = Object.assign(Object.assign({}, useTheme.props), cardBaseProps);
const NCard = defineComponent({
  name: "Card",
  props: cardProps,
  slots: Object,
  setup(props) {
    const handleCloseClick = () => {
      const {
        onClose
      } = props;
      if (onClose) call(onClose);
    };
    const {
      inlineThemeDisabled,
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme("Card", "-card", style$5, cardLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("Card", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        size
      } = props;
      const {
        self: {
          color,
          colorModal,
          colorTarget,
          textColor,
          titleTextColor,
          titleFontWeight,
          borderColor,
          actionColor,
          borderRadius,
          lineHeight: lineHeight2,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          closeBorderRadius,
          closeIconSize,
          closeSize,
          boxShadow,
          colorPopover,
          colorEmbedded,
          colorEmbeddedModal,
          colorEmbeddedPopover,
          [createKey("padding", size)]: padding,
          [createKey("fontSize", size)]: fontSize2,
          [createKey("titleFontSize", size)]: titleFontSize
        },
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        }
      } = themeRef.value;
      const {
        top: paddingTop,
        left: paddingLeft,
        bottom: paddingBottom
      } = getPadding(padding);
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-border-radius": borderRadius,
        "--n-color": color,
        "--n-color-modal": colorModal,
        "--n-color-popover": colorPopover,
        "--n-color-embedded": colorEmbedded,
        "--n-color-embedded-modal": colorEmbeddedModal,
        "--n-color-embedded-popover": colorEmbeddedPopover,
        "--n-color-target": colorTarget,
        "--n-text-color": textColor,
        "--n-line-height": lineHeight2,
        "--n-action-color": actionColor,
        "--n-title-text-color": titleTextColor,
        "--n-title-font-weight": titleFontWeight,
        "--n-close-icon-color": closeIconColor,
        "--n-close-icon-color-hover": closeIconColorHover,
        "--n-close-icon-color-pressed": closeIconColorPressed,
        "--n-close-color-hover": closeColorHover,
        "--n-close-color-pressed": closeColorPressed,
        "--n-border-color": borderColor,
        "--n-box-shadow": boxShadow,
        // size
        "--n-padding-top": paddingTop,
        "--n-padding-bottom": paddingBottom,
        "--n-padding-left": paddingLeft,
        "--n-font-size": fontSize2,
        "--n-title-font-size": titleFontSize,
        "--n-close-size": closeSize,
        "--n-close-icon-size": closeIconSize,
        "--n-close-border-radius": closeBorderRadius
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("card", computed(() => {
      return props.size[0];
    }), cssVarsRef, props) : void 0;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      segmented,
      bordered,
      hoverable,
      mergedClsPrefix,
      rtlEnabled,
      onRender,
      embedded,
      tag: Component,
      $slots
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(Component, {
      class: [`${mergedClsPrefix}-card`, this.themeClass, embedded && `${mergedClsPrefix}-card--embedded`, {
        [`${mergedClsPrefix}-card--rtl`]: rtlEnabled,
        [`${mergedClsPrefix}-card--content${typeof segmented !== "boolean" && segmented.content === "soft" ? "-soft" : ""}-segmented`]: segmented === true || segmented !== false && segmented.content,
        [`${mergedClsPrefix}-card--footer${typeof segmented !== "boolean" && segmented.footer === "soft" ? "-soft" : ""}-segmented`]: segmented === true || segmented !== false && segmented.footer,
        [`${mergedClsPrefix}-card--action-segmented`]: segmented === true || segmented !== false && segmented.action,
        [`${mergedClsPrefix}-card--bordered`]: bordered,
        [`${mergedClsPrefix}-card--hoverable`]: hoverable
      }],
      style: this.cssVars,
      role: this.role
    }, resolveWrappedSlot($slots.cover, (children) => {
      const mergedChildren = this.cover ? ensureValidVNode([this.cover()]) : children;
      return mergedChildren && h("div", {
        class: `${mergedClsPrefix}-card-cover`,
        role: "none"
      }, mergedChildren);
    }), resolveWrappedSlot($slots.header, (children) => {
      const {
        title
      } = this;
      const mergedChildren = title ? ensureValidVNode(typeof title === "function" ? [title()] : [title]) : children;
      return mergedChildren || this.closable ? h("div", {
        class: [`${mergedClsPrefix}-card-header`, this.headerClass],
        style: this.headerStyle,
        role: "heading"
      }, h("div", {
        class: `${mergedClsPrefix}-card-header__main`,
        role: "heading"
      }, mergedChildren), resolveWrappedSlot($slots["header-extra"], (children2) => {
        const mergedChildren2 = this.headerExtra ? ensureValidVNode([this.headerExtra()]) : children2;
        return mergedChildren2 && h("div", {
          class: [`${mergedClsPrefix}-card-header__extra`, this.headerExtraClass],
          style: this.headerExtraStyle
        }, mergedChildren2);
      }), this.closable && h(NBaseClose, {
        clsPrefix: mergedClsPrefix,
        class: `${mergedClsPrefix}-card-header__close`,
        onClick: this.handleCloseClick,
        absolute: true
      })) : null;
    }), resolveWrappedSlot($slots.default, (children) => {
      const {
        content
      } = this;
      const mergedChildren = content ? ensureValidVNode(typeof content === "function" ? [content()] : [content]) : children;
      return mergedChildren && h("div", {
        class: [`${mergedClsPrefix}-card__content`, this.contentClass],
        style: this.contentStyle,
        role: "none"
      }, mergedChildren);
    }), resolveWrappedSlot($slots.footer, (children) => {
      const mergedChildren = this.footer ? ensureValidVNode([this.footer()]) : children;
      return mergedChildren && h("div", {
        class: [`${mergedClsPrefix}-card__footer`, this.footerClass],
        style: this.footerStyle,
        role: "none"
      }, mergedChildren);
    }), resolveWrappedSlot($slots.action, (children) => {
      const mergedChildren = this.action ? ensureValidVNode([this.action()]) : children;
      return mergedChildren && h("div", {
        class: `${mergedClsPrefix}-card__action`,
        role: "none"
      }, mergedChildren);
    }));
  }
});
const configProviderProps = {
  abstract: Boolean,
  bordered: {
    type: Boolean,
    default: void 0
  },
  clsPrefix: String,
  locale: Object,
  dateLocale: Object,
  namespace: String,
  rtl: Array,
  tag: {
    type: String,
    default: "div"
  },
  hljs: Object,
  katex: Object,
  theme: Object,
  themeOverrides: Object,
  componentOptions: Object,
  icons: Object,
  breakpoints: Object,
  preflightStyleDisabled: Boolean,
  styleMountTarget: Object,
  inlineThemeDisabled: {
    type: Boolean,
    default: void 0
  },
  // deprecated
  as: {
    type: String,
    validator: () => {
      warn("config-provider", "`as` is deprecated, please use `tag` instead.");
      return true;
    },
    default: void 0
  }
};
const NConfigProvider = defineComponent({
  name: "ConfigProvider",
  alias: ["App"],
  props: configProviderProps,
  setup(props) {
    const NConfigProvider2 = inject(configProviderInjectionKey, null);
    const mergedThemeRef = computed(() => {
      const {
        theme
      } = props;
      if (theme === null) return void 0;
      const inheritedTheme = NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeRef.value;
      return theme === void 0 ? inheritedTheme : inheritedTheme === void 0 ? theme : Object.assign({}, inheritedTheme, theme);
    });
    const mergedThemeOverridesRef = computed(() => {
      const {
        themeOverrides
      } = props;
      if (themeOverrides === null) return void 0;
      if (themeOverrides === void 0) {
        return NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeOverridesRef.value;
      } else {
        const inheritedThemeOverrides = NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedThemeOverridesRef.value;
        if (inheritedThemeOverrides === void 0) {
          return themeOverrides;
        } else {
          return merge({}, inheritedThemeOverrides, themeOverrides);
        }
      }
    });
    const mergedNamespaceRef = useMemo(() => {
      const {
        namespace: namespace2
      } = props;
      return namespace2 === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedNamespaceRef.value : namespace2;
    });
    const mergedBorderedRef = useMemo(() => {
      const {
        bordered
      } = props;
      return bordered === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedBorderedRef.value : bordered;
    });
    const mergedIconsRef = computed(() => {
      const {
        icons
      } = props;
      return icons === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedIconsRef.value : icons;
    });
    const mergedComponentPropsRef = computed(() => {
      const {
        componentOptions
      } = props;
      if (componentOptions !== void 0) return componentOptions;
      return NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedComponentPropsRef.value;
    });
    const mergedClsPrefixRef = computed(() => {
      const {
        clsPrefix
      } = props;
      if (clsPrefix !== void 0) return clsPrefix;
      if (NConfigProvider2) return NConfigProvider2.mergedClsPrefixRef.value;
      return defaultClsPrefix;
    });
    const mergedRtlRef = computed(() => {
      var _a;
      const {
        rtl
      } = props;
      if (rtl === void 0) {
        return NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedRtlRef.value;
      }
      const rtlEnabledState = {};
      for (const rtlInfo of rtl) {
        rtlEnabledState[rtlInfo.name] = markRaw(rtlInfo);
        (_a = rtlInfo.peers) === null || _a === void 0 ? void 0 : _a.forEach((peerRtlInfo) => {
          if (!(peerRtlInfo.name in rtlEnabledState)) {
            rtlEnabledState[peerRtlInfo.name] = markRaw(peerRtlInfo);
          }
        });
      }
      return rtlEnabledState;
    });
    const mergedBreakpointsRef = computed(() => {
      return props.breakpoints || (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedBreakpointsRef.value);
    });
    const inlineThemeDisabled = props.inlineThemeDisabled || (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.inlineThemeDisabled);
    const preflightStyleDisabled = props.preflightStyleDisabled || (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.preflightStyleDisabled);
    const styleMountTarget = props.styleMountTarget || (NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.styleMountTarget);
    const mergedThemeHashRef = computed(() => {
      const {
        value: theme
      } = mergedThemeRef;
      const {
        value: mergedThemeOverrides
      } = mergedThemeOverridesRef;
      const hasThemeOverrides = mergedThemeOverrides && Object.keys(mergedThemeOverrides).length !== 0;
      const themeName = theme === null || theme === void 0 ? void 0 : theme.name;
      if (themeName) {
        if (hasThemeOverrides) {
          return `${themeName}-${hash(JSON.stringify(mergedThemeOverridesRef.value))}`;
        }
        return themeName;
      } else {
        if (hasThemeOverrides) {
          return hash(JSON.stringify(mergedThemeOverridesRef.value));
        }
        return "";
      }
    });
    provide(configProviderInjectionKey, {
      mergedThemeHashRef,
      mergedBreakpointsRef,
      mergedRtlRef,
      mergedIconsRef,
      mergedComponentPropsRef,
      mergedBorderedRef,
      mergedNamespaceRef,
      mergedClsPrefixRef,
      mergedLocaleRef: computed(() => {
        const {
          locale
        } = props;
        if (locale === null) return void 0;
        return locale === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedLocaleRef.value : locale;
      }),
      mergedDateLocaleRef: computed(() => {
        const {
          dateLocale
        } = props;
        if (dateLocale === null) return void 0;
        return dateLocale === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedDateLocaleRef.value : dateLocale;
      }),
      mergedHljsRef: computed(() => {
        const {
          hljs
        } = props;
        return hljs === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedHljsRef.value : hljs;
      }),
      mergedKatexRef: computed(() => {
        const {
          katex
        } = props;
        return katex === void 0 ? NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.mergedKatexRef.value : katex;
      }),
      mergedThemeRef,
      mergedThemeOverridesRef,
      inlineThemeDisabled: inlineThemeDisabled || false,
      preflightStyleDisabled: preflightStyleDisabled || false,
      styleMountTarget
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedNamespace: mergedNamespaceRef,
      mergedTheme: mergedThemeRef,
      mergedThemeOverrides: mergedThemeOverridesRef
    };
  },
  render() {
    var _a, _b, _c, _d;
    return !this.abstract ? h(this.as || this.tag, {
      class: `${this.mergedClsPrefix || defaultClsPrefix}-config-provider`
    }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)) : (_d = (_c = this.$slots).default) === null || _d === void 0 ? void 0 : _d.call(_c);
  }
});
const dialogProviderInjectionKey = createInjectionKey("n-dialog-provider");
const dialogApiInjectionKey = createInjectionKey("n-dialog-api");
const dialogReactiveListInjectionKey = createInjectionKey("n-dialog-reactive-list");
function useDialog() {
  const dialog2 = inject(dialogApiInjectionKey, null);
  if (dialog2 === null) {
    throwError("use-dialog", "No outer <n-dialog-provider /> founded.");
  }
  return dialog2;
}
const commonVars$1 = {
  titleFontSize: "18px",
  padding: "16px 28px 20px 28px",
  iconSize: "28px",
  actionSpace: "12px",
  contentMargin: "8px 0 16px 0",
  iconMargin: "0 4px 0 0",
  iconMarginIconTop: "4px 0 8px 0",
  closeSize: "22px",
  closeIconSize: "18px",
  closeMargin: "20px 26px 0 0",
  closeMarginIconTop: "10px 16px 0 0"
};
function self$4(vars) {
  const {
    textColor1,
    textColor2,
    modalColor,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    infoColor,
    successColor,
    warningColor,
    errorColor,
    primaryColor,
    dividerColor,
    borderRadius,
    fontWeightStrong,
    lineHeight: lineHeight2,
    fontSize: fontSize2
  } = vars;
  return Object.assign(Object.assign({}, commonVars$1), {
    fontSize: fontSize2,
    lineHeight: lineHeight2,
    border: `1px solid ${dividerColor}`,
    titleTextColor: textColor1,
    textColor: textColor2,
    color: modalColor,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeBorderRadius: borderRadius,
    iconColor: primaryColor,
    iconColorInfo: infoColor,
    iconColorSuccess: successColor,
    iconColorWarning: warningColor,
    iconColorError: errorColor,
    borderRadius,
    titleFontWeight: fontWeightStrong
  });
}
const dialogLight = createTheme({
  name: "Dialog",
  common: derived,
  peers: {
    Button: buttonLight
  },
  self: self$4
});
const dialogProps = {
  icon: Function,
  type: {
    type: String,
    default: "default"
  },
  title: [String, Function],
  closable: {
    type: Boolean,
    default: true
  },
  negativeText: String,
  positiveText: String,
  positiveButtonProps: Object,
  negativeButtonProps: Object,
  content: [String, Function],
  action: Function,
  showIcon: {
    type: Boolean,
    default: true
  },
  loading: Boolean,
  bordered: Boolean,
  iconPlacement: String,
  titleClass: [String, Array],
  titleStyle: [String, Object],
  contentClass: [String, Array],
  contentStyle: [String, Object],
  actionClass: [String, Array],
  actionStyle: [String, Object],
  onPositiveClick: Function,
  onNegativeClick: Function,
  onClose: Function
};
const dialogPropKeys = keysOf(dialogProps);
const style$4 = c([cB("dialog", `
 --n-icon-margin: var(--n-icon-margin-top) var(--n-icon-margin-right) var(--n-icon-margin-bottom) var(--n-icon-margin-left);
 word-break: break-word;
 line-height: var(--n-line-height);
 position: relative;
 background: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 margin: auto;
 border-radius: var(--n-border-radius);
 padding: var(--n-padding);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `, [cE("icon", {
  color: "var(--n-icon-color)"
}), cM("bordered", {
  border: "var(--n-border)"
}), cM("icon-top", [cE("close", {
  margin: "var(--n-close-margin)"
}), cE("icon", {
  margin: "var(--n-icon-margin)"
}), cE("content", {
  textAlign: "center"
}), cE("title", {
  justifyContent: "center"
}), cE("action", {
  justifyContent: "center"
})]), cM("icon-left", [cE("icon", {
  margin: "var(--n-icon-margin)"
}), cM("closable", [cE("title", `
 padding-right: calc(var(--n-close-size) + 6px);
 `)])]), cE("close", `
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `), cE("content", `
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `, [cM("last", "margin-bottom: 0;")]), cE("action", `
 display: flex;
 justify-content: flex-end;
 `, [c("> *:not(:last-child)", `
 margin-right: var(--n-action-space);
 `)]), cE("icon", `
 font-size: var(--n-icon-size);
 transition: color .3s var(--n-bezier);
 `), cE("title", `
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `), cB("dialog-icon-container", `
 display: flex;
 justify-content: center;
 `)]), insideModal(cB("dialog", `
 width: 446px;
 max-width: calc(100vw - 32px);
 `)), cB("dialog", [asModal(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]);
const iconRenderMap$2 = {
  default: () => h(InfoIcon, null),
  info: () => h(InfoIcon, null),
  success: () => h(SuccessIcon, null),
  warning: () => h(WarningIcon, null),
  error: () => h(ErrorIcon, null)
};
const NDialog = defineComponent({
  name: "Dialog",
  alias: [
    "NimbusConfirmCard",
    // deprecated
    "Confirm"
    // deprecated
  ],
  props: Object.assign(Object.assign({}, useTheme.props), dialogProps),
  slots: Object,
  setup(props) {
    const {
      mergedComponentPropsRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl("Dialog", mergedRtlRef, mergedClsPrefixRef);
    const mergedIconPlacementRef = computed(() => {
      var _a, _b;
      const {
        iconPlacement
      } = props;
      return iconPlacement || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Dialog) === null || _b === void 0 ? void 0 : _b.iconPlacement) || "left";
    });
    function handlePositiveClick(e) {
      const {
        onPositiveClick
      } = props;
      if (onPositiveClick) onPositiveClick(e);
    }
    function handleNegativeClick(e) {
      const {
        onNegativeClick
      } = props;
      if (onNegativeClick) onNegativeClick(e);
    }
    function handleCloseClick() {
      const {
        onClose
      } = props;
      if (onClose) onClose();
    }
    const themeRef = useTheme("Dialog", "-dialog", style$4, dialogLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        type
      } = props;
      const iconPlacement = mergedIconPlacementRef.value;
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          fontSize: fontSize2,
          lineHeight: lineHeight2,
          border,
          titleTextColor,
          textColor,
          color,
          closeBorderRadius,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeIconSize,
          borderRadius,
          titleFontWeight,
          titleFontSize,
          padding,
          iconSize,
          actionSpace,
          contentMargin,
          closeSize,
          [iconPlacement === "top" ? "iconMarginIconTop" : "iconMargin"]: iconMargin,
          [iconPlacement === "top" ? "closeMarginIconTop" : "closeMargin"]: closeMargin,
          [createKey("iconColor", type)]: iconColor
        }
      } = themeRef.value;
      const iconMarginDiscrete = getMargin(iconMargin);
      return {
        "--n-font-size": fontSize2,
        "--n-icon-color": iconColor,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-close-margin": closeMargin,
        "--n-icon-margin-top": iconMarginDiscrete.top,
        "--n-icon-margin-right": iconMarginDiscrete.right,
        "--n-icon-margin-bottom": iconMarginDiscrete.bottom,
        "--n-icon-margin-left": iconMarginDiscrete.left,
        "--n-icon-size": iconSize,
        "--n-close-size": closeSize,
        "--n-close-icon-size": closeIconSize,
        "--n-close-border-radius": closeBorderRadius,
        "--n-close-color-hover": closeColorHover,
        "--n-close-color-pressed": closeColorPressed,
        "--n-close-icon-color": closeIconColor,
        "--n-close-icon-color-hover": closeIconColorHover,
        "--n-close-icon-color-pressed": closeIconColorPressed,
        "--n-color": color,
        "--n-text-color": textColor,
        "--n-border-radius": borderRadius,
        "--n-padding": padding,
        "--n-line-height": lineHeight2,
        "--n-border": border,
        "--n-content-margin": contentMargin,
        "--n-title-font-size": titleFontSize,
        "--n-title-font-weight": titleFontWeight,
        "--n-title-text-color": titleTextColor,
        "--n-action-space": actionSpace
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("dialog", computed(() => `${props.type[0]}${mergedIconPlacementRef.value[0]}`), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      mergedIconPlacement: mergedIconPlacementRef,
      mergedTheme: themeRef,
      handlePositiveClick,
      handleNegativeClick,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      bordered,
      mergedIconPlacement,
      cssVars,
      closable,
      showIcon,
      title,
      content,
      action,
      negativeText,
      positiveText,
      positiveButtonProps,
      negativeButtonProps,
      handlePositiveClick,
      handleNegativeClick,
      mergedTheme,
      loading,
      type,
      mergedClsPrefix
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    const icon = showIcon ? h(NBaseIcon, {
      clsPrefix: mergedClsPrefix,
      class: `${mergedClsPrefix}-dialog__icon`
    }, {
      default: () => resolveWrappedSlot(this.$slots.icon, (children) => children || (this.icon ? render(this.icon) : iconRenderMap$2[this.type]()))
    }) : null;
    const actionNode = resolveWrappedSlot(this.$slots.action, (children) => children || positiveText || negativeText || action ? h("div", {
      class: [`${mergedClsPrefix}-dialog__action`, this.actionClass],
      style: this.actionStyle
    }, children || (action ? [render(action)] : [this.negativeText && h(Button, Object.assign({
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      ghost: true,
      size: "small",
      onClick: handleNegativeClick
    }, negativeButtonProps), {
      default: () => render(this.negativeText)
    }), this.positiveText && h(Button, Object.assign({
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      size: "small",
      type: type === "default" ? "primary" : type,
      disabled: loading,
      loading,
      onClick: handlePositiveClick
    }, positiveButtonProps), {
      default: () => render(this.positiveText)
    })])) : null);
    return h("div", {
      class: [`${mergedClsPrefix}-dialog`, this.themeClass, this.closable && `${mergedClsPrefix}-dialog--closable`, `${mergedClsPrefix}-dialog--icon-${mergedIconPlacement}`, bordered && `${mergedClsPrefix}-dialog--bordered`, this.rtlEnabled && `${mergedClsPrefix}-dialog--rtl`],
      style: cssVars,
      role: "dialog"
    }, closable ? resolveWrappedSlot(this.$slots.close, (node) => {
      const classNames = [`${mergedClsPrefix}-dialog__close`, this.rtlEnabled && `${mergedClsPrefix}-dialog--rtl`];
      return node ? h("div", {
        class: classNames
      }, node) : h(NBaseClose, {
        clsPrefix: mergedClsPrefix,
        class: classNames,
        onClick: this.handleCloseClick
      });
    }) : null, showIcon && mergedIconPlacement === "top" ? h("div", {
      class: `${mergedClsPrefix}-dialog-icon-container`
    }, icon) : null, h("div", {
      class: [`${mergedClsPrefix}-dialog__title`, this.titleClass],
      style: this.titleStyle
    }, showIcon && mergedIconPlacement === "left" ? icon : null, resolveSlot(this.$slots.header, () => [render(title)])), h("div", {
      class: [`${mergedClsPrefix}-dialog__content`, actionNode ? "" : `${mergedClsPrefix}-dialog__content--last`, this.contentClass],
      style: this.contentStyle
    }, resolveSlot(this.$slots.default, () => [render(content)])), actionNode);
  }
});
function self$3(vars) {
  const {
    modalColor,
    textColor2,
    boxShadow3
  } = vars;
  return {
    color: modalColor,
    textColor: textColor2,
    boxShadow: boxShadow3
  };
}
const modalLight = createTheme({
  name: "Modal",
  common: derived,
  peers: {
    Scrollbar: scrollbarLight,
    Dialog: dialogLight,
    Card: cardLight
  },
  self: self$3
});
const modalProviderInjectionKey = createInjectionKey("n-modal-provider");
const modalApiInjectionKey = createInjectionKey("n-modal-api");
const modalReactiveListInjectionKey = createInjectionKey("n-modal-reactive-list");
function useModal() {
  const modal = inject(modalApiInjectionKey, null);
  if (modal === null) {
    throwError("use-modal", "No outer <n-modal-provider /> founded.");
  }
  return modal;
}
const DRAGGABLE_CLASS = "n-draggable";
function useDragModal(draggablePropsRef, options) {
  let cleanup;
  const draggableRef = computed(() => {
    return draggablePropsRef.value !== false;
  });
  const draggableClassRef = computed(() => {
    return draggableRef.value ? DRAGGABLE_CLASS : "";
  });
  const boundsToWindowRef = computed(() => {
    const draggableProps = draggablePropsRef.value;
    if (draggableProps === true || draggableProps === false) {
      return true;
    } else if (draggableProps) {
      return draggableProps.bounds !== "none";
    } else {
      return true;
    }
  });
  function startDrag(modal) {
    const header = modal.querySelector(`.${DRAGGABLE_CLASS}`);
    if (!header || !draggableClassRef.value) {
      return;
    }
    let maxMoveX = 0;
    let minMoveX = 0;
    let maxMoveY = 0;
    let minMoveY = 0;
    let prevMoveY = 0;
    let prevMoveX = 0;
    let mousedownEvent;
    function handleMouseDown(event) {
      event.preventDefault();
      mousedownEvent = event;
      const {
        x,
        y,
        right,
        bottom
      } = modal.getBoundingClientRect();
      minMoveX = x;
      minMoveY = y;
      maxMoveX = (void 0).innerWidth - right;
      maxMoveY = (void 0).innerHeight - bottom;
      const {
        left,
        top
      } = modal.style;
      prevMoveY = +top.slice(0, -2);
      prevMoveX = +left.slice(0, -2);
    }
    function handleMouseMove(event) {
      if (!mousedownEvent) return;
      const {
        clientX: downX,
        clientY: downY
      } = mousedownEvent;
      let moveX = event.clientX - downX;
      let moveY = event.clientY - downY;
      if (boundsToWindowRef.value) {
        if (moveX > maxMoveX) {
          moveX = maxMoveX;
        } else if (-moveX > minMoveX) {
          moveX = -minMoveX;
        }
        if (moveY > maxMoveY) {
          moveY = maxMoveY;
        } else if (-moveY > minMoveY) {
          moveY = -minMoveY;
        }
      }
      const x = moveX + prevMoveX;
      const y = moveY + prevMoveY;
      modal.style.top = `${y}px`;
      modal.style.left = `${x}px`;
    }
    function handleMouseUp() {
      mousedownEvent = void 0;
      options.onEnd(modal);
    }
    on("mousedown", header, handleMouseDown);
    on("mousemove", void 0, handleMouseMove);
    on("mouseup", void 0, handleMouseUp);
    cleanup = () => {
      off("mousedown", header, handleMouseDown);
      on("mousemove", void 0, handleMouseMove);
      on("mouseup", void 0, handleMouseUp);
    };
  }
  function stopDrag() {
    if (cleanup) {
      cleanup();
      cleanup = void 0;
    }
  }
  return {
    stopDrag,
    startDrag,
    draggableRef,
    draggableClassRef
  };
}
const presetProps = Object.assign(Object.assign({}, cardBaseProps), dialogProps);
const presetPropsKeys = keysOf(presetProps);
const NModalBodyWrapper = defineComponent({
  name: "ModalBody",
  inheritAttrs: false,
  slots: Object,
  props: Object.assign(Object.assign({
    show: {
      type: Boolean,
      required: true
    },
    preset: String,
    displayDirective: {
      type: String,
      required: true
    },
    trapFocus: {
      type: Boolean,
      default: true
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    blockScroll: Boolean,
    draggable: {
      type: [Boolean, Object],
      default: false
    }
  }, presetProps), {
    renderMask: Function,
    // events
    onClickoutside: Function,
    onBeforeLeave: {
      type: Function,
      required: true
    },
    onAfterLeave: {
      type: Function,
      required: true
    },
    onPositiveClick: {
      type: Function,
      required: true
    },
    onNegativeClick: {
      type: Function,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    onAfterEnter: Function,
    onEsc: Function
  }),
  setup(props) {
    const bodyRef = ref(null);
    const scrollbarRef = ref(null);
    const displayedRef = ref(props.show);
    const transformOriginXRef = ref(null);
    const transformOriginYRef = ref(null);
    const NModal2 = inject(modalInjectionKey);
    let mousePosition = null;
    watch(toRef(props, "show"), (value) => {
      if (value) {
        mousePosition = NModal2.getMousePosition();
      }
    }, {
      immediate: true
    });
    const {
      stopDrag,
      startDrag,
      draggableRef,
      draggableClassRef
    } = useDragModal(toRef(props, "draggable"), {
      onEnd: (el) => {
        syncTransformOrigin(el);
      }
    });
    const dialogTitleClassRef = computed(() => {
      return normalizeClass([props.titleClass, draggableClassRef.value]);
    });
    const cardHeaderClassRef = computed(() => {
      return normalizeClass([props.headerClass, draggableClassRef.value]);
    });
    watch(toRef(props, "show"), (value) => {
      if (value) displayedRef.value = true;
    });
    useLockHtmlScroll(computed(() => props.blockScroll && displayedRef.value));
    function styleTransformOrigin() {
      if (NModal2.transformOriginRef.value === "center") {
        return "";
      }
      const {
        value: transformOriginX
      } = transformOriginXRef;
      const {
        value: transformOriginY
      } = transformOriginYRef;
      if (transformOriginX === null || transformOriginY === null) {
        return "";
      } else if (scrollbarRef.value) {
        const scrollTop = scrollbarRef.value.containerScrollTop;
        return `${transformOriginX}px ${transformOriginY + scrollTop}px`;
      }
      return "";
    }
    function syncTransformOrigin(el) {
      if (NModal2.transformOriginRef.value === "center") {
        return;
      }
      if (!mousePosition) {
        return;
      }
      if (!scrollbarRef.value) return;
      const scrollTop = scrollbarRef.value.containerScrollTop;
      const {
        offsetLeft,
        offsetTop
      } = el;
      const top = mousePosition.y;
      const left = mousePosition.x;
      transformOriginXRef.value = -(offsetLeft - left);
      transformOriginYRef.value = -(offsetTop - top - scrollTop);
      el.style.transformOrigin = styleTransformOrigin();
    }
    function handleEnter(el) {
      void nextTick(() => {
        syncTransformOrigin(el);
      });
    }
    function handleBeforeLeave(el) {
      el.style.transformOrigin = styleTransformOrigin();
      props.onBeforeLeave();
    }
    function handleAfterEnter(el) {
      const element = el;
      draggableRef.value && startDrag(element);
      props.onAfterEnter && props.onAfterEnter(element);
    }
    function handleAfterLeave() {
      displayedRef.value = false;
      transformOriginXRef.value = null;
      transformOriginYRef.value = null;
      stopDrag();
      props.onAfterLeave();
    }
    function handleCloseClick() {
      const {
        onClose
      } = props;
      if (onClose) {
        onClose();
      }
    }
    function handleNegativeClick() {
      props.onNegativeClick();
    }
    function handlePositiveClick() {
      props.onPositiveClick();
    }
    const childNodeRef = ref(null);
    watch(childNodeRef, (node) => {
      if (node) {
        void nextTick(() => {
          const el = node.el;
          if (el && bodyRef.value !== el) {
            bodyRef.value = el;
          }
        });
      }
    });
    provide(modalBodyInjectionKey, bodyRef);
    provide(drawerBodyInjectionKey, null);
    provide(popoverBodyInjectionKey, null);
    return {
      mergedTheme: NModal2.mergedThemeRef,
      appear: NModal2.appearRef,
      isMounted: NModal2.isMountedRef,
      mergedClsPrefix: NModal2.mergedClsPrefixRef,
      bodyRef,
      scrollbarRef,
      draggableClass: draggableClassRef,
      displayed: displayedRef,
      childNodeRef,
      cardHeaderClass: cardHeaderClassRef,
      dialogTitleClass: dialogTitleClassRef,
      handlePositiveClick,
      handleNegativeClick,
      handleCloseClick,
      handleAfterEnter,
      handleAfterLeave,
      handleBeforeLeave,
      handleEnter
    };
  },
  render() {
    const {
      $slots,
      $attrs,
      handleEnter,
      handleAfterEnter,
      handleAfterLeave,
      handleBeforeLeave,
      preset,
      mergedClsPrefix
    } = this;
    let childNode = null;
    if (!preset) {
      childNode = getFirstSlotVNodeWithTypedProps("default", $slots.default, {
        draggableClass: this.draggableClass
      });
      if (!childNode) {
        warn("modal", "default slot is empty");
        return;
      }
      childNode = cloneVNode(childNode);
      childNode.props = mergeProps({
        class: `${mergedClsPrefix}-modal`
      }, $attrs, childNode.props || {});
    }
    return this.displayDirective === "show" || this.displayed || this.show ? withDirectives(h("div", {
      role: "none",
      class: `${mergedClsPrefix}-modal-body-wrapper`
    }, h(Scrollbar, {
      ref: "scrollbarRef",
      theme: this.mergedTheme.peers.Scrollbar,
      themeOverrides: this.mergedTheme.peerOverrides.Scrollbar,
      contentClass: `${mergedClsPrefix}-modal-scroll-content`
    }, {
      default: () => {
        var _a;
        return [(_a = this.renderMask) === null || _a === void 0 ? void 0 : _a.call(this), h(FocusTrap, {
          disabled: !this.trapFocus,
          active: this.show,
          onEsc: this.onEsc,
          autoFocus: this.autoFocus
        }, {
          default: () => {
            var _a2;
            return h(Transition, {
              name: "fade-in-scale-up-transition",
              appear: (_a2 = this.appear) !== null && _a2 !== void 0 ? _a2 : this.isMounted,
              onEnter: handleEnter,
              onAfterEnter: handleAfterEnter,
              onAfterLeave: handleAfterLeave,
              onBeforeLeave: handleBeforeLeave
            }, {
              default: () => {
                const dirs = [[vShow, this.show]];
                const {
                  onClickoutside
                } = this;
                if (onClickoutside) {
                  dirs.push([clickoutside, this.onClickoutside, void 0, {
                    capture: true
                  }]);
                }
                return withDirectives(this.preset === "confirm" || this.preset === "dialog" ? h(NDialog, Object.assign({}, this.$attrs, {
                  class: [`${mergedClsPrefix}-modal`, this.$attrs.class],
                  ref: "bodyRef",
                  theme: this.mergedTheme.peers.Dialog,
                  themeOverrides: this.mergedTheme.peerOverrides.Dialog
                }, keep(this.$props, dialogPropKeys), {
                  titleClass: this.dialogTitleClass,
                  "aria-modal": "true"
                }), $slots) : this.preset === "card" ? h(NCard, Object.assign({}, this.$attrs, {
                  ref: "bodyRef",
                  class: [`${mergedClsPrefix}-modal`, this.$attrs.class],
                  theme: this.mergedTheme.peers.Card,
                  themeOverrides: this.mergedTheme.peerOverrides.Card
                }, keep(this.$props, cardBasePropKeys), {
                  headerClass: this.cardHeaderClass,
                  "aria-modal": "true",
                  role: "dialog"
                }), $slots) : this.childNodeRef = childNode, dirs);
              }
            });
          }
        })];
      }
    })), [[vShow, this.displayDirective === "if" || this.displayed || this.show]]) : null;
  }
});
const style$3 = c([cB("modal-container", `
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `), cB("modal-mask", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `, [fadeInTransition({
  enterDuration: ".25s",
  leaveDuration: ".25s",
  enterCubicBezier: "var(--n-bezier-ease-out)",
  leaveCubicBezier: "var(--n-bezier-ease-out)"
})]), cB("modal-body-wrapper", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `, [cB("modal-scroll-content", `
 min-height: 100%;
 display: flex;
 position: relative;
 `)]), cB("modal", `
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `, [fadeInScaleUpTransition({
  duration: ".25s",
  enterScale: ".5"
}), c(`.${DRAGGABLE_CLASS}`, `
 cursor: move;
 user-select: none;
 `)])]);
const modalProps = Object.assign(Object.assign(Object.assign(Object.assign({}, useTheme.props), {
  show: Boolean,
  unstableShowMask: {
    type: Boolean,
    default: true
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  preset: String,
  to: [String, Object],
  displayDirective: {
    type: String,
    default: "if"
  },
  transformOrigin: {
    type: String,
    default: "mouse"
  },
  zIndex: Number,
  autoFocus: {
    type: Boolean,
    default: true
  },
  trapFocus: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  blockScroll: {
    type: Boolean,
    default: true
  }
}), presetProps), {
  draggable: [Boolean, Object],
  // events
  onEsc: Function,
  "onUpdate:show": [Function, Array],
  onUpdateShow: [Function, Array],
  onAfterEnter: Function,
  onBeforeLeave: Function,
  onAfterLeave: Function,
  onClose: Function,
  onPositiveClick: Function,
  onNegativeClick: Function,
  onMaskClick: Function,
  // private
  internalDialog: Boolean,
  internalModal: Boolean,
  internalAppear: {
    type: Boolean,
    default: void 0
  },
  // deprecated
  overlayStyle: [String, Object],
  onBeforeHide: Function,
  onAfterHide: Function,
  onHide: Function
});
const NModal = defineComponent({
  name: "Modal",
  inheritAttrs: false,
  props: modalProps,
  slots: Object,
  setup(props) {
    const containerRef = ref(null);
    const {
      mergedClsPrefixRef,
      namespaceRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme("Modal", "-modal", style$3, modalLight, props, mergedClsPrefixRef);
    const clickedRef = useClicked(64);
    const clickedPositionRef = useClickPosition();
    const isMountedRef = useIsMounted();
    const NDialogProvider2 = props.internalDialog ? inject(dialogProviderInjectionKey, null) : null;
    const NModalProvider2 = props.internalModal ? inject(modalProviderInjectionKey$1, null) : null;
    const isComposingRef2 = useIsComposing();
    function doUpdateShow(show) {
      const {
        onUpdateShow,
        "onUpdate:show": _onUpdateShow,
        onHide
      } = props;
      if (onUpdateShow) call(onUpdateShow, show);
      if (_onUpdateShow) call(_onUpdateShow, show);
      if (onHide && !show) onHide(show);
    }
    function handleCloseClick() {
      const {
        onClose
      } = props;
      if (onClose) {
        void Promise.resolve(onClose()).then((value) => {
          if (value === false) return;
          doUpdateShow(false);
        });
      } else {
        doUpdateShow(false);
      }
    }
    function handlePositiveClick() {
      const {
        onPositiveClick
      } = props;
      if (onPositiveClick) {
        void Promise.resolve(onPositiveClick()).then((value) => {
          if (value === false) return;
          doUpdateShow(false);
        });
      } else {
        doUpdateShow(false);
      }
    }
    function handleNegativeClick() {
      const {
        onNegativeClick
      } = props;
      if (onNegativeClick) {
        void Promise.resolve(onNegativeClick()).then((value) => {
          if (value === false) return;
          doUpdateShow(false);
        });
      } else {
        doUpdateShow(false);
      }
    }
    function handleBeforeLeave() {
      const {
        onBeforeLeave,
        onBeforeHide
      } = props;
      if (onBeforeLeave) call(onBeforeLeave);
      if (onBeforeHide) onBeforeHide();
    }
    function handleAfterLeave() {
      const {
        onAfterLeave,
        onAfterHide
      } = props;
      if (onAfterLeave) call(onAfterLeave);
      if (onAfterHide) onAfterHide();
    }
    function handleClickoutside(e) {
      var _a;
      const {
        onMaskClick
      } = props;
      if (onMaskClick) {
        onMaskClick(e);
      }
      if (props.maskClosable) {
        if ((_a = containerRef.value) === null || _a === void 0 ? void 0 : _a.contains(getPreciseEventTarget(e))) {
          doUpdateShow(false);
        }
      }
    }
    function handleEsc(e) {
      var _a;
      (_a = props.onEsc) === null || _a === void 0 ? void 0 : _a.call(props);
      if (props.show && props.closeOnEsc && eventEffectNotPerformed(e)) {
        if (!isComposingRef2.value) {
          doUpdateShow(false);
        }
      }
    }
    provide(modalInjectionKey, {
      getMousePosition: () => {
        const mergedProvider = NDialogProvider2 || NModalProvider2;
        if (mergedProvider) {
          const {
            clickedRef: clickedRef2,
            clickedPositionRef: clickedPositionRef2
          } = mergedProvider;
          if (clickedRef2.value && clickedPositionRef2.value) {
            return clickedPositionRef2.value;
          }
        }
        if (clickedRef.value) {
          return clickedPositionRef.value;
        }
        return null;
      },
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      isMountedRef,
      appearRef: toRef(props, "internalAppear"),
      transformOriginRef: toRef(props, "transformOrigin")
    });
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseOut: cubicBezierEaseOut2
        },
        self: {
          boxShadow,
          color,
          textColor
        }
      } = themeRef.value;
      return {
        "--n-bezier-ease-out": cubicBezierEaseOut2,
        "--n-box-shadow": boxShadow,
        "--n-color": color,
        "--n-text-color": textColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("theme-class", void 0, cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      isMounted: isMountedRef,
      containerRef,
      presetProps: computed(() => {
        const pickedProps = keep(props, presetPropsKeys);
        return pickedProps;
      }),
      handleEsc,
      handleAfterLeave,
      handleClickoutside,
      handleBeforeLeave,
      doUpdateShow,
      handleNegativeClick,
      handlePositiveClick,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h(LazyTeleport, {
      to: this.to,
      show: this.show
    }, {
      default: () => {
        var _a;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        const {
          unstableShowMask
        } = this;
        return withDirectives(h("div", {
          role: "none",
          ref: "containerRef",
          class: [`${mergedClsPrefix}-modal-container`, this.themeClass, this.namespace],
          style: this.cssVars
        }, h(NModalBodyWrapper, Object.assign({
          style: this.overlayStyle
        }, this.$attrs, {
          ref: "bodyWrapper",
          displayDirective: this.displayDirective,
          show: this.show,
          preset: this.preset,
          autoFocus: this.autoFocus,
          trapFocus: this.trapFocus,
          draggable: this.draggable,
          blockScroll: this.blockScroll
        }, this.presetProps, {
          onEsc: this.handleEsc,
          onClose: this.handleCloseClick,
          onNegativeClick: this.handleNegativeClick,
          onPositiveClick: this.handlePositiveClick,
          onBeforeLeave: this.handleBeforeLeave,
          onAfterEnter: this.onAfterEnter,
          onAfterLeave: this.handleAfterLeave,
          onClickoutside: unstableShowMask ? void 0 : this.handleClickoutside,
          renderMask: unstableShowMask ? () => {
            var _a2;
            return h(Transition, {
              name: "fade-in-transition",
              key: "mask",
              appear: (_a2 = this.internalAppear) !== null && _a2 !== void 0 ? _a2 : this.isMounted
            }, {
              default: () => {
                return this.show ? h("div", {
                  "aria-hidden": true,
                  ref: "containerRef",
                  class: `${mergedClsPrefix}-modal-mask`,
                  onClick: this.handleClickoutside
                }) : null;
              }
            });
          } : void 0
        }), this.$slots)), [[zindexable, {
          zIndex: this.zIndex,
          enabled: this.show
        }]]);
      }
    });
  }
});
const exposedDialogEnvProps = Object.assign(Object.assign({}, dialogProps), {
  onAfterEnter: Function,
  onAfterLeave: Function,
  transformOrigin: String,
  blockScroll: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  onEsc: Function,
  autoFocus: {
    type: Boolean,
    default: true
  },
  internalStyle: [String, Object],
  maskClosable: {
    type: Boolean,
    default: true
  },
  onPositiveClick: Function,
  onNegativeClick: Function,
  onClose: Function,
  onMaskClick: Function,
  draggable: [Boolean, Object]
});
const NDialogEnvironment = defineComponent({
  name: "DialogEnvironment",
  props: Object.assign(Object.assign({}, exposedDialogEnvProps), {
    internalKey: {
      type: String,
      required: true
    },
    to: [String, Object],
    // private
    onInternalAfterLeave: {
      type: Function,
      required: true
    }
  }),
  setup(props) {
    const showRef = ref(true);
    function handleAfterLeave() {
      const {
        onInternalAfterLeave,
        internalKey,
        onAfterLeave
      } = props;
      if (onInternalAfterLeave) onInternalAfterLeave(internalKey);
      if (onAfterLeave) onAfterLeave();
    }
    function handlePositiveClick(e) {
      const {
        onPositiveClick
      } = props;
      if (onPositiveClick) {
        void Promise.resolve(onPositiveClick(e)).then((result) => {
          if (result === false) return;
          hide();
        });
      } else {
        hide();
      }
    }
    function handleNegativeClick(e) {
      const {
        onNegativeClick
      } = props;
      if (onNegativeClick) {
        void Promise.resolve(onNegativeClick(e)).then((result) => {
          if (result === false) return;
          hide();
        });
      } else {
        hide();
      }
    }
    function handleCloseClick() {
      const {
        onClose
      } = props;
      if (onClose) {
        void Promise.resolve(onClose()).then((result) => {
          if (result === false) return;
          hide();
        });
      } else {
        hide();
      }
    }
    function handleMaskClick(e) {
      const {
        onMaskClick,
        maskClosable
      } = props;
      if (onMaskClick) {
        onMaskClick(e);
        if (maskClosable) {
          hide();
        }
      }
    }
    function handleEsc() {
      const {
        onEsc
      } = props;
      if (onEsc) {
        onEsc();
      }
    }
    function hide() {
      showRef.value = false;
    }
    function handleUpdateShow(value) {
      showRef.value = value;
    }
    return {
      show: showRef,
      hide,
      handleUpdateShow,
      handleAfterLeave,
      handleCloseClick,
      handleNegativeClick,
      handlePositiveClick,
      handleMaskClick,
      handleEsc
    };
  },
  render() {
    const {
      handlePositiveClick,
      handleUpdateShow,
      handleNegativeClick,
      handleCloseClick,
      handleAfterLeave,
      handleMaskClick,
      handleEsc,
      to,
      maskClosable,
      show
    } = this;
    return h(NModal, {
      show,
      onUpdateShow: handleUpdateShow,
      onMaskClick: handleMaskClick,
      onEsc: handleEsc,
      to,
      maskClosable,
      onAfterEnter: this.onAfterEnter,
      onAfterLeave: handleAfterLeave,
      closeOnEsc: this.closeOnEsc,
      blockScroll: this.blockScroll,
      autoFocus: this.autoFocus,
      transformOrigin: this.transformOrigin,
      draggable: this.draggable,
      internalAppear: true,
      internalDialog: true
    }, {
      default: ({
        draggableClass
      }) => h(NDialog, Object.assign({}, keep(this.$props, dialogPropKeys), {
        titleClass: normalizeClass([this.titleClass, draggableClass]),
        style: this.internalStyle,
        onClose: handleCloseClick,
        onNegativeClick: handleNegativeClick,
        onPositiveClick: handlePositiveClick
      }))
    });
  }
});
const dialogProviderProps = {
  injectionKey: String,
  to: [String, Object]
};
const NDialogProvider = defineComponent({
  name: "DialogProvider",
  props: dialogProviderProps,
  setup() {
    const dialogListRef = ref([]);
    const dialogInstRefs = {};
    function create(options = {}) {
      const key = createId();
      const dialogReactive = reactive(Object.assign(Object.assign({}, options), {
        key,
        destroy: () => {
          var _a;
          (_a = dialogInstRefs[`n-dialog-${key}`]) === null || _a === void 0 ? void 0 : _a.hide();
        }
      }));
      dialogListRef.value.push(dialogReactive);
      return dialogReactive;
    }
    const typedApi = ["info", "success", "warning", "error"].map((type) => (options) => {
      return create(Object.assign(Object.assign({}, options), {
        type
      }));
    });
    function handleAfterLeave(key) {
      const {
        value: dialogList
      } = dialogListRef;
      dialogList.splice(dialogList.findIndex((dialog2) => dialog2.key === key), 1);
    }
    function destroyAll() {
      Object.values(dialogInstRefs).forEach((dialogInstRef) => {
        dialogInstRef === null || dialogInstRef === void 0 ? void 0 : dialogInstRef.hide();
      });
    }
    const api = {
      create,
      destroyAll,
      info: typedApi[0],
      success: typedApi[1],
      warning: typedApi[2],
      error: typedApi[3]
    };
    provide(dialogApiInjectionKey, api);
    provide(dialogProviderInjectionKey, {
      clickedRef: useClicked(64),
      clickedPositionRef: useClickPosition()
    });
    provide(dialogReactiveListInjectionKey, dialogListRef);
    return Object.assign(Object.assign({}, api), {
      dialogList: dialogListRef,
      dialogInstRefs,
      handleAfterLeave
    });
  },
  render() {
    var _a, _b;
    return h(Fragment, null, [this.dialogList.map((dialog2) => h(NDialogEnvironment, omit(dialog2, ["destroy", "style"], {
      internalStyle: dialog2.style,
      to: this.to,
      ref: (inst) => {
        if (inst === null) {
          delete this.dialogInstRefs[`n-dialog-${dialog2.key}`];
        } else {
          this.dialogInstRefs[`n-dialog-${dialog2.key}`] = inst;
        }
      },
      internalKey: dialog2.key,
      onInternalAfterLeave: this.handleAfterLeave
    }))), (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]);
  }
});
const loadingBarProviderInjectionKey = createInjectionKey("n-loading-bar");
const loadingBarApiInjectionKey = createInjectionKey("n-loading-bar-api");
function self$2(vars) {
  const {
    primaryColor,
    errorColor
  } = vars;
  return {
    colorError: errorColor,
    colorLoading: primaryColor,
    height: "2px"
  };
}
const loadingBarLight = {
  common: derived,
  self: self$2
};
const style$2 = cB("loading-bar-container", `
 z-index: 5999;
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 height: 2px;
`, [fadeInTransition({
  enterDuration: "0.3s",
  leaveDuration: "0.8s"
}), cB("loading-bar", `
 width: 100%;
 transition:
 max-width 4s linear,
 background .2s linear;
 height: var(--n-height);
 `, [cM("starting", `
 background: var(--n-color-loading);
 `), cM("finishing", `
 background: var(--n-color-loading);
 transition:
 max-width .2s linear,
 background .2s linear;
 `), cM("error", `
 background: var(--n-color-error);
 transition:
 max-width .2s linear,
 background .2s linear;
 `)])]);
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function createClassName(status, clsPrefix) {
  return `${clsPrefix}-loading-bar ${clsPrefix}-loading-bar--${status}`;
}
const NLoadingBar = defineComponent({
  name: "LoadingBar",
  props: {
    containerClass: String,
    containerStyle: [String, Object]
  },
  setup() {
    const {
      inlineThemeDisabled
    } = useConfig();
    const {
      props: providerProps,
      mergedClsPrefixRef
    } = inject(loadingBarProviderInjectionKey);
    const loadingBarRef = ref(null);
    const enteringRef = ref(false);
    const startedRef = ref(false);
    const loadingRef = ref(false);
    const transitionDisabledRef = ref(false);
    let finishing = false;
    const erroringRef = ref(false);
    const mergedLoadingBarStyle = computed(() => {
      const {
        loadingBarStyle
      } = providerProps;
      if (!loadingBarStyle) return "";
      return loadingBarStyle[erroringRef.value ? "error" : "loading"];
    });
    function init() {
      return __awaiter(this, void 0, void 0, function* () {
        enteringRef.value = false;
        loadingRef.value = false;
        finishing = false;
        erroringRef.value = false;
        transitionDisabledRef.value = true;
        yield nextTick();
        transitionDisabledRef.value = false;
      });
    }
    function start() {
      return __awaiter(this, arguments, void 0, function* (fromProgress = 0, toProgress = 80, status = "starting") {
        startedRef.value = true;
        yield init();
        if (finishing) return;
        loadingRef.value = true;
        yield nextTick();
        const el = loadingBarRef.value;
        if (!el) return;
        el.style.maxWidth = `${fromProgress}%`;
        el.style.transition = "none";
        void el.offsetWidth;
        el.className = createClassName(status, mergedClsPrefixRef.value);
        el.style.transition = "";
        el.style.maxWidth = `${toProgress}%`;
      });
    }
    function finish() {
      return __awaiter(this, void 0, void 0, function* () {
        if (finishing || erroringRef.value) return;
        if (startedRef.value) {
          yield nextTick();
        }
        finishing = true;
        const el = loadingBarRef.value;
        if (!el) return;
        el.className = createClassName("finishing", mergedClsPrefixRef.value);
        el.style.maxWidth = "100%";
        void el.offsetWidth;
        loadingRef.value = false;
      });
    }
    function error() {
      if (finishing || erroringRef.value) return;
      if (!loadingRef.value) {
        void start(100, 100, "error").then(() => {
          erroringRef.value = true;
          const el = loadingBarRef.value;
          if (!el) return;
          el.className = createClassName("error", mergedClsPrefixRef.value);
          void el.offsetWidth;
          loadingRef.value = false;
        });
      } else {
        erroringRef.value = true;
        const el = loadingBarRef.value;
        if (!el) return;
        el.className = createClassName("error", mergedClsPrefixRef.value);
        el.style.maxWidth = "100%";
        void el.offsetWidth;
        loadingRef.value = false;
      }
    }
    function handleEnter() {
      enteringRef.value = true;
    }
    function handleAfterEnter() {
      enteringRef.value = false;
    }
    function handleAfterLeave() {
      return __awaiter(this, void 0, void 0, function* () {
        yield init();
      });
    }
    const themeRef = useTheme("LoadingBar", "-loading-bar", style$2, loadingBarLight, providerProps, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        self: {
          height,
          colorError,
          colorLoading
        }
      } = themeRef.value;
      return {
        "--n-height": height,
        "--n-color-loading": colorLoading,
        "--n-color-error": colorError
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("loading-bar", void 0, cssVarsRef, providerProps) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      loadingBarRef,
      started: startedRef,
      loading: loadingRef,
      entering: enteringRef,
      transitionDisabled: transitionDisabledRef,
      start,
      error,
      finish,
      handleEnter,
      handleAfterEnter,
      handleAfterLeave,
      mergedLoadingBarStyle,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    if (!this.started) return null;
    const {
      mergedClsPrefix
    } = this;
    return h(Transition, {
      name: "fade-in-transition",
      appear: true,
      onEnter: this.handleEnter,
      onAfterEnter: this.handleAfterEnter,
      onAfterLeave: this.handleAfterLeave,
      css: !this.transitionDisabled
    }, {
      default: () => {
        var _a;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return withDirectives(h("div", {
          class: [`${mergedClsPrefix}-loading-bar-container`, this.themeClass, this.containerClass],
          style: this.containerStyle
        }, h("div", {
          ref: "loadingBarRef",
          class: [`${mergedClsPrefix}-loading-bar`],
          style: [this.cssVars, this.mergedLoadingBarStyle]
        })), [[vShow, this.loading || !this.loading && this.entering]]);
      }
    });
  }
});
const loadingBarProviderProps = Object.assign(Object.assign({}, useTheme.props), {
  to: {
    type: [String, Object, Boolean],
    default: void 0
  },
  containerClass: String,
  containerStyle: [String, Object],
  loadingBarStyle: {
    type: Object
  }
});
const NLoadingBarProvider = defineComponent({
  name: "LoadingBarProvider",
  props: loadingBarProviderProps,
  setup(props) {
    const isMountedRef = useIsMounted();
    const loadingBarRef = ref(null);
    const methods = {
      start() {
        var _a;
        if (isMountedRef.value) {
          (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.start();
        } else {
          void nextTick(() => {
            var _a2;
            (_a2 = loadingBarRef.value) === null || _a2 === void 0 ? void 0 : _a2.start();
          });
        }
      },
      error() {
        var _a;
        if (isMountedRef.value) {
          (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.error();
        } else {
          void nextTick(() => {
            var _a2;
            (_a2 = loadingBarRef.value) === null || _a2 === void 0 ? void 0 : _a2.error();
          });
        }
      },
      finish() {
        var _a;
        if (isMountedRef.value) {
          (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.finish();
        } else {
          void nextTick(() => {
            var _a2;
            (_a2 = loadingBarRef.value) === null || _a2 === void 0 ? void 0 : _a2.finish();
          });
        }
      }
    };
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    provide(loadingBarApiInjectionKey, methods);
    provide(loadingBarProviderInjectionKey, {
      props,
      mergedClsPrefixRef
    });
    return Object.assign(methods, {
      loadingBarRef
    });
  },
  render() {
    var _a, _b;
    return h(Fragment, null, h(Teleport, {
      disabled: this.to === false,
      to: this.to || "body"
    }, h(NLoadingBar, {
      ref: "loadingBarRef",
      containerStyle: this.containerStyle,
      containerClass: this.containerClass
    })), (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a));
  }
});
function useLoadingBar() {
  const loadingBar2 = inject(loadingBarApiInjectionKey, null);
  if (loadingBar2 === null) {
    throwError("use-loading-bar", "No outer <n-loading-bar-provider /> founded.");
  }
  return loadingBar2;
}
const messageApiInjectionKey = createInjectionKey("n-message-api");
const messageProviderInjectionKey = createInjectionKey("n-message-provider");
const commonVariables = {
  margin: "0 0 8px 0",
  padding: "10px 20px",
  maxWidth: "720px",
  minWidth: "420px",
  iconMargin: "0 10px 0 0",
  closeMargin: "0 0 0 10px",
  closeSize: "20px",
  closeIconSize: "16px",
  iconSize: "20px",
  fontSize: "14px"
};
function self$1(vars) {
  const {
    textColor2,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    infoColor,
    successColor,
    errorColor,
    warningColor,
    popoverColor,
    boxShadow2,
    primaryColor,
    lineHeight: lineHeight2,
    borderRadius,
    closeColorHover,
    closeColorPressed
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    closeBorderRadius: borderRadius,
    textColor: textColor2,
    textColorInfo: textColor2,
    textColorSuccess: textColor2,
    textColorError: textColor2,
    textColorWarning: textColor2,
    textColorLoading: textColor2,
    color: popoverColor,
    colorInfo: popoverColor,
    colorSuccess: popoverColor,
    colorError: popoverColor,
    colorWarning: popoverColor,
    colorLoading: popoverColor,
    boxShadow: boxShadow2,
    boxShadowInfo: boxShadow2,
    boxShadowSuccess: boxShadow2,
    boxShadowError: boxShadow2,
    boxShadowWarning: boxShadow2,
    boxShadowLoading: boxShadow2,
    iconColor: textColor2,
    iconColorInfo: infoColor,
    iconColorSuccess: successColor,
    iconColorWarning: warningColor,
    iconColorError: errorColor,
    iconColorLoading: primaryColor,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHoverInfo: closeColorHover,
    closeColorPressedInfo: closeColorPressed,
    closeIconColorInfo: closeIconColor,
    closeIconColorHoverInfo: closeIconColorHover,
    closeIconColorPressedInfo: closeIconColorPressed,
    closeColorHoverSuccess: closeColorHover,
    closeColorPressedSuccess: closeColorPressed,
    closeIconColorSuccess: closeIconColor,
    closeIconColorHoverSuccess: closeIconColorHover,
    closeIconColorPressedSuccess: closeIconColorPressed,
    closeColorHoverError: closeColorHover,
    closeColorPressedError: closeColorPressed,
    closeIconColorError: closeIconColor,
    closeIconColorHoverError: closeIconColorHover,
    closeIconColorPressedError: closeIconColorPressed,
    closeColorHoverWarning: closeColorHover,
    closeColorPressedWarning: closeColorPressed,
    closeIconColorWarning: closeIconColor,
    closeIconColorHoverWarning: closeIconColorHover,
    closeIconColorPressedWarning: closeIconColorPressed,
    closeColorHoverLoading: closeColorHover,
    closeColorPressedLoading: closeColorPressed,
    closeIconColorLoading: closeIconColor,
    closeIconColorHoverLoading: closeIconColorHover,
    closeIconColorPressedLoading: closeIconColorPressed,
    loadingColor: primaryColor,
    lineHeight: lineHeight2,
    borderRadius
  });
}
const messageLight = {
  common: derived,
  self: self$1
};
const messageProps = {
  icon: Function,
  type: {
    type: String,
    default: "info"
  },
  content: [String, Number, Function],
  showIcon: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  keepAliveOnHover: Boolean,
  onClose: Function,
  onMouseenter: Function,
  onMouseleave: Function
};
const style$1 = c([cB("message-wrapper", `
 margin: var(--n-margin);
 z-index: 0;
 transform-origin: top center;
 display: flex;
 `, [fadeInHeightExpandTransition({
  overflow: "visible",
  originalTransition: "transform .3s var(--n-bezier)",
  enterToProps: {
    transform: "scale(1)"
  },
  leaveToProps: {
    transform: "scale(0.85)"
  }
})]), cB("message", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 margin-bottom .3s var(--n-bezier);
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 flex-wrap: nowrap;
 overflow: hidden;
 max-width: var(--n-max-width);
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-shadow: var(--n-box-shadow);
 `, [cE("content", `
 display: inline-block;
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 `), cE("icon", `
 position: relative;
 margin: var(--n-icon-margin);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 flex-shrink: 0;
 `, [["default", "info", "success", "warning", "error", "loading"].map((type) => cM(`${type}-type`, [c("> *", `
 color: var(--n-icon-color-${type});
 transition: color .3s var(--n-bezier);
 `)])), c("> *", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 `, [iconSwitchTransition()])]), cE("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 flex-shrink: 0;
 `, [c("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), c("&:active", `
 color: var(--n-close-icon-color-pressed);
 `)])]), cB("message-container", `
 z-index: 6000;
 position: fixed;
 height: 0;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: center;
 `, [cM("top", `
 top: 12px;
 left: 0;
 right: 0;
 `), cM("top-left", `
 top: 12px;
 left: 12px;
 right: 0;
 align-items: flex-start;
 `), cM("top-right", `
 top: 12px;
 left: 0;
 right: 12px;
 align-items: flex-end;
 `), cM("bottom", `
 bottom: 4px;
 left: 0;
 right: 0;
 justify-content: flex-end;
 `), cM("bottom-left", `
 bottom: 4px;
 left: 12px;
 right: 0;
 justify-content: flex-end;
 align-items: flex-start;
 `), cM("bottom-right", `
 bottom: 4px;
 left: 0;
 right: 12px;
 justify-content: flex-end;
 align-items: flex-end;
 `)])]);
const iconRenderMap$1 = {
  info: () => h(InfoIcon, null),
  success: () => h(SuccessIcon, null),
  warning: () => h(WarningIcon, null),
  error: () => h(ErrorIcon, null),
  default: () => null
};
const NMessage = defineComponent({
  name: "Message",
  props: Object.assign(Object.assign({}, messageProps), {
    render: Function
  }),
  setup(props) {
    const {
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const {
      props: messageProviderProps2,
      mergedClsPrefixRef
    } = inject(messageProviderInjectionKey);
    const rtlEnabledRef = useRtl("Message", mergedRtlRef, mergedClsPrefixRef);
    const themeRef = useTheme("Message", "-message", style$1, messageLight, messageProviderProps2, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        type
      } = props;
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          padding,
          margin,
          maxWidth,
          iconMargin,
          closeMargin,
          closeSize,
          iconSize,
          fontSize: fontSize2,
          lineHeight: lineHeight2,
          borderRadius,
          iconColorInfo,
          iconColorSuccess,
          iconColorWarning,
          iconColorError,
          iconColorLoading,
          closeIconSize,
          closeBorderRadius,
          [createKey("textColor", type)]: textColor,
          [createKey("boxShadow", type)]: boxShadow,
          [createKey("color", type)]: color,
          [createKey("closeColorHover", type)]: closeColorHover,
          [createKey("closeColorPressed", type)]: closeColorPressed,
          [createKey("closeIconColor", type)]: closeIconColor,
          [createKey("closeIconColorPressed", type)]: closeIconColorPressed,
          [createKey("closeIconColorHover", type)]: closeIconColorHover
        }
      } = themeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-margin": margin,
        "--n-padding": padding,
        "--n-max-width": maxWidth,
        "--n-font-size": fontSize2,
        "--n-icon-margin": iconMargin,
        "--n-icon-size": iconSize,
        "--n-close-icon-size": closeIconSize,
        "--n-close-border-radius": closeBorderRadius,
        "--n-close-size": closeSize,
        "--n-close-margin": closeMargin,
        "--n-text-color": textColor,
        "--n-color": color,
        "--n-box-shadow": boxShadow,
        "--n-icon-color-info": iconColorInfo,
        "--n-icon-color-success": iconColorSuccess,
        "--n-icon-color-warning": iconColorWarning,
        "--n-icon-color-error": iconColorError,
        "--n-icon-color-loading": iconColorLoading,
        "--n-close-color-hover": closeColorHover,
        "--n-close-color-pressed": closeColorPressed,
        "--n-close-icon-color": closeIconColor,
        "--n-close-icon-color-pressed": closeIconColorPressed,
        "--n-close-icon-color-hover": closeIconColorHover,
        "--n-line-height": lineHeight2,
        "--n-border-radius": borderRadius
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("message", computed(() => props.type[0]), cssVarsRef, {}) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      messageProviderProps: messageProviderProps2,
      handleClose() {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      },
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      placement: messageProviderProps2.placement
    };
  },
  render() {
    const {
      render: renderMessage,
      type,
      closable,
      content,
      mergedClsPrefix,
      cssVars,
      themeClass,
      onRender,
      icon,
      handleClose,
      showIcon
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    let iconNode;
    return h("div", {
      class: [`${mergedClsPrefix}-message-wrapper`, themeClass],
      onMouseenter: this.onMouseenter,
      onMouseleave: this.onMouseleave,
      style: [{
        alignItems: this.placement.startsWith("top") ? "flex-start" : "flex-end"
      }, cssVars]
    }, renderMessage ? renderMessage(this.$props) : h("div", {
      class: [`${mergedClsPrefix}-message ${mergedClsPrefix}-message--${type}-type`, this.rtlEnabled && `${mergedClsPrefix}-message--rtl`]
    }, (iconNode = createIconVNode(icon, type, mergedClsPrefix)) && showIcon ? h("div", {
      class: `${mergedClsPrefix}-message__icon ${mergedClsPrefix}-message__icon--${type}-type`
    }, h(NIconSwitchTransition, null, {
      default: () => iconNode
    })) : null, h("div", {
      class: `${mergedClsPrefix}-message__content`
    }, render(content)), closable ? h(NBaseClose, {
      clsPrefix: mergedClsPrefix,
      class: `${mergedClsPrefix}-message__close`,
      onClick: handleClose,
      absolute: true
    }) : null));
  }
});
function createIconVNode(icon, type, clsPrefix) {
  if (typeof icon === "function") {
    return icon();
  } else {
    const innerIcon = type === "loading" ? h(NBaseLoading, {
      clsPrefix,
      strokeWidth: 24,
      scale: 0.85
    }) : iconRenderMap$1[type]();
    if (!innerIcon) return null;
    return h(NBaseIcon, {
      clsPrefix,
      key: type
    }, {
      default: () => innerIcon
    });
  }
}
const MessageEnvironment = defineComponent({
  name: "MessageEnvironment",
  props: Object.assign(Object.assign({}, messageProps), {
    duration: {
      type: Number,
      default: 3e3
    },
    onAfterLeave: Function,
    onLeave: Function,
    internalKey: {
      type: String,
      required: true
    },
    // private
    onInternalAfterLeave: Function,
    // deprecated
    onHide: Function,
    onAfterHide: Function
  }),
  setup(props) {
    let timerId = null;
    const showRef = ref(true);
    function setHideTimeout() {
      const {
        duration: duration2
      } = props;
      if (duration2) {
        timerId = (void 0).setTimeout(hide, duration2);
      }
    }
    function handleMouseenter(e) {
      if (e.currentTarget !== e.target) return;
      if (timerId !== null) {
        (void 0).clearTimeout(timerId);
        timerId = null;
      }
    }
    function handleMouseleave(e) {
      if (e.currentTarget !== e.target) return;
      setHideTimeout();
    }
    function hide() {
      const {
        onHide
      } = props;
      showRef.value = false;
      if (timerId) {
        (void 0).clearTimeout(timerId);
        timerId = null;
      }
      if (onHide) onHide();
    }
    function handleClose() {
      const {
        onClose
      } = props;
      if (onClose) onClose();
      hide();
    }
    function handleAfterLeave() {
      const {
        onAfterLeave,
        onInternalAfterLeave,
        onAfterHide,
        internalKey
      } = props;
      if (onAfterLeave) onAfterLeave();
      if (onInternalAfterLeave) onInternalAfterLeave(internalKey);
      if (onAfterHide) onAfterHide();
    }
    function deactivate() {
      hide();
    }
    return {
      show: showRef,
      hide,
      handleClose,
      handleAfterLeave,
      handleMouseleave,
      handleMouseenter,
      deactivate
    };
  },
  render() {
    return h(NFadeInExpandTransition, {
      appear: true,
      onAfterLeave: this.handleAfterLeave,
      onLeave: this.onLeave
    }, {
      default: () => [this.show ? h(NMessage, {
        content: this.content,
        type: this.type,
        icon: this.icon,
        showIcon: this.showIcon,
        closable: this.closable,
        onClose: this.handleClose,
        onMouseenter: this.keepAliveOnHover ? this.handleMouseenter : void 0,
        onMouseleave: this.keepAliveOnHover ? this.handleMouseleave : void 0
      }) : null]
    });
  }
});
const messageProviderProps = Object.assign(Object.assign({}, useTheme.props), {
  to: [String, Object],
  duration: {
    type: Number,
    default: 3e3
  },
  keepAliveOnHover: Boolean,
  max: Number,
  placement: {
    type: String,
    default: "top"
  },
  closable: Boolean,
  containerClass: String,
  containerStyle: [String, Object]
});
const NMessageProvider = defineComponent({
  name: "MessageProvider",
  props: messageProviderProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const messageListRef = ref([]);
    const messageRefs = ref({});
    const api = {
      create(content, options) {
        return create(content, Object.assign({
          type: "default"
        }, options));
      },
      info(content, options) {
        return create(content, Object.assign(Object.assign({}, options), {
          type: "info"
        }));
      },
      success(content, options) {
        return create(content, Object.assign(Object.assign({}, options), {
          type: "success"
        }));
      },
      warning(content, options) {
        return create(content, Object.assign(Object.assign({}, options), {
          type: "warning"
        }));
      },
      error(content, options) {
        return create(content, Object.assign(Object.assign({}, options), {
          type: "error"
        }));
      },
      loading(content, options) {
        return create(content, Object.assign(Object.assign({}, options), {
          type: "loading"
        }));
      },
      destroyAll
    };
    provide(messageProviderInjectionKey, {
      props,
      mergedClsPrefixRef
    });
    provide(messageApiInjectionKey, api);
    function create(content, options) {
      const key = createId();
      const messageReactive = reactive(Object.assign(Object.assign({}, options), {
        content,
        key,
        destroy: () => {
          var _a;
          (_a = messageRefs.value[key]) === null || _a === void 0 ? void 0 : _a.hide();
        }
      }));
      const {
        max
      } = props;
      if (max && messageListRef.value.length >= max) {
        messageListRef.value.shift();
      }
      messageListRef.value.push(messageReactive);
      return messageReactive;
    }
    function handleAfterLeave(key) {
      messageListRef.value.splice(messageListRef.value.findIndex((message2) => message2.key === key), 1);
      delete messageRefs.value[key];
    }
    function destroyAll() {
      Object.values(messageRefs.value).forEach((messageInstRef) => {
        messageInstRef.hide();
      });
    }
    return Object.assign({
      mergedClsPrefix: mergedClsPrefixRef,
      messageRefs,
      messageList: messageListRef,
      handleAfterLeave
    }, api);
  },
  render() {
    var _a, _b, _c;
    return h(Fragment, null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a), this.messageList.length ? h(Teleport, {
      to: (_c = this.to) !== null && _c !== void 0 ? _c : "body"
    }, h("div", {
      class: [`${this.mergedClsPrefix}-message-container`, `${this.mergedClsPrefix}-message-container--${this.placement}`, this.containerClass],
      key: "message-container",
      style: this.containerStyle
    }, this.messageList.map((message2) => {
      return h(MessageEnvironment, Object.assign({
        ref: (inst) => {
          if (inst) {
            this.messageRefs[message2.key] = inst;
          }
        },
        internalKey: message2.key,
        onInternalAfterLeave: this.handleAfterLeave
      }, omit(message2, ["destroy"], void 0), {
        duration: message2.duration === void 0 ? this.duration : message2.duration,
        keepAliveOnHover: message2.keepAliveOnHover === void 0 ? this.keepAliveOnHover : message2.keepAliveOnHover,
        closable: message2.closable === void 0 ? this.closable : message2.closable
      }));
    }))) : null);
  }
});
function useMessage$1() {
  const api = inject(messageApiInjectionKey, null);
  if (api === null) {
    throwError("use-message", "No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A.");
  }
  return api;
}
const NModalEnvironment = defineComponent({
  name: "ModalEnvironment",
  props: Object.assign(Object.assign({}, modalProps), {
    internalKey: {
      type: String,
      required: true
    },
    // private
    onInternalAfterLeave: {
      type: Function,
      required: true
    }
  }),
  setup(props) {
    const showRef = ref(true);
    function handleAfterLeave() {
      const {
        onInternalAfterLeave,
        internalKey,
        onAfterLeave
      } = props;
      if (onInternalAfterLeave) onInternalAfterLeave(internalKey);
      if (onAfterLeave) onAfterLeave();
    }
    function handlePositiveClick() {
      const {
        onPositiveClick
      } = props;
      if (onPositiveClick) {
        void Promise.resolve(onPositiveClick()).then((result) => {
          if (result === false) return;
          hide();
        });
      } else {
        hide();
      }
    }
    function handleNegativeClick() {
      const {
        onNegativeClick
      } = props;
      if (onNegativeClick) {
        void Promise.resolve(onNegativeClick()).then((result) => {
          if (result === false) return;
          hide();
        });
      } else {
        hide();
      }
    }
    function handleCloseClick() {
      const {
        onClose
      } = props;
      if (onClose) {
        void Promise.resolve(onClose()).then((result) => {
          if (result === false) return;
          hide();
        });
      } else {
        hide();
      }
    }
    function handleMaskClick(e) {
      const {
        onMaskClick,
        maskClosable
      } = props;
      if (onMaskClick) {
        onMaskClick(e);
        if (maskClosable) {
          hide();
        }
      }
    }
    function handleEsc() {
      const {
        onEsc
      } = props;
      if (onEsc) {
        onEsc();
      }
    }
    function hide() {
      showRef.value = false;
    }
    function handleUpdateShow(value) {
      showRef.value = value;
    }
    return {
      show: showRef,
      hide,
      handleUpdateShow,
      handleAfterLeave,
      handleCloseClick,
      handleNegativeClick,
      handlePositiveClick,
      handleMaskClick,
      handleEsc
    };
  },
  render() {
    const {
      handleUpdateShow,
      handleAfterLeave,
      handleMaskClick,
      handleEsc,
      show
    } = this;
    return h(NModal, Object.assign({}, this.$props, {
      show,
      onUpdateShow: handleUpdateShow,
      onMaskClick: handleMaskClick,
      onEsc: handleEsc,
      onAfterLeave: handleAfterLeave,
      internalAppear: true,
      internalModal: true
    }));
  }
});
const modalProviderProps = {
  to: [String, Object]
};
const NModalProvider = defineComponent({
  name: "ModalProvider",
  props: modalProviderProps,
  setup() {
    const modalListRef = ref([]);
    const modalInstRefs = {};
    function create(options = {}) {
      const key = createId();
      const modalReactive = reactive(Object.assign(Object.assign({}, options), {
        key,
        destroy: () => {
          var _a;
          (_a = modalInstRefs[`n-modal-${key}`]) === null || _a === void 0 ? void 0 : _a.hide();
        }
      }));
      modalListRef.value.push(modalReactive);
      return modalReactive;
    }
    function handleAfterLeave(key) {
      const {
        value: modalList
      } = modalListRef;
      modalList.splice(modalList.findIndex((modal) => modal.key === key), 1);
    }
    function destroyAll() {
      Object.values(modalInstRefs).forEach((modalInstRef) => {
        modalInstRef === null || modalInstRef === void 0 ? void 0 : modalInstRef.hide();
      });
    }
    const api = {
      create,
      destroyAll
    };
    provide(modalApiInjectionKey, api);
    provide(modalProviderInjectionKey, {
      clickedRef: useClicked(64),
      clickedPositionRef: useClickPosition()
    });
    provide(modalReactiveListInjectionKey, modalListRef);
    return Object.assign(Object.assign({}, api), {
      modalList: modalListRef,
      modalInstRefs,
      handleAfterLeave
    });
  },
  render() {
    var _a, _b;
    return h(Fragment, null, [this.modalList.map((modal) => {
      var _a2;
      return h(NModalEnvironment, omit(modal, ["destroy"], {
        to: (_a2 = modal.to) !== null && _a2 !== void 0 ? _a2 : this.to,
        ref: (inst) => {
          if (inst === null) {
            delete this.modalInstRefs[`n-modal-${modal.key}`];
          } else {
            this.modalInstRefs[`n-modal-${modal.key}`] = inst;
          }
        },
        internalKey: modal.key,
        onInternalAfterLeave: this.handleAfterLeave
      }));
    }), (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]);
  }
});
const commonVars = {
  closeMargin: "16px 12px",
  closeSize: "20px",
  closeIconSize: "16px",
  width: "365px",
  padding: "16px",
  titleFontSize: "16px",
  metaFontSize: "12px",
  descriptionFontSize: "12px"
};
function self(vars) {
  const {
    textColor2,
    successColor,
    infoColor,
    warningColor,
    errorColor,
    popoverColor,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    textColor1,
    textColor3,
    borderRadius,
    fontWeightStrong,
    boxShadow2,
    lineHeight: lineHeight2,
    fontSize: fontSize2
  } = vars;
  return Object.assign(Object.assign({}, commonVars), {
    borderRadius,
    lineHeight: lineHeight2,
    fontSize: fontSize2,
    headerFontWeight: fontWeightStrong,
    iconColor: textColor2,
    iconColorSuccess: successColor,
    iconColorInfo: infoColor,
    iconColorWarning: warningColor,
    iconColorError: errorColor,
    color: popoverColor,
    textColor: textColor2,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeBorderRadius: borderRadius,
    closeColorHover,
    closeColorPressed,
    headerTextColor: textColor1,
    descriptionTextColor: textColor3,
    actionTextColor: textColor2,
    boxShadow: boxShadow2
  });
}
const notificationLight = createTheme({
  name: "Notification",
  common: derived,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
});
const notificationProviderInjectionKey = createInjectionKey("n-notification-provider");
const NotificationContainer = defineComponent({
  name: "NotificationContainer",
  props: {
    scrollable: {
      type: Boolean,
      required: true
    },
    placement: {
      type: String,
      required: true
    }
  },
  setup() {
    const {
      mergedThemeRef,
      mergedClsPrefixRef,
      wipTransitionCountRef
    } = inject(notificationProviderInjectionKey);
    const selfRef = ref(null);
    watchEffect(() => {
      var _a, _b;
      if (wipTransitionCountRef.value > 0) {
        (_a = selfRef === null || selfRef === void 0 ? void 0 : selfRef.value) === null || _a === void 0 ? void 0 : _a.classList.add("transitioning");
      } else {
        (_b = selfRef === null || selfRef === void 0 ? void 0 : selfRef.value) === null || _b === void 0 ? void 0 : _b.classList.remove("transitioning");
      }
    });
    return {
      selfRef,
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      transitioning: wipTransitionCountRef
    };
  },
  render() {
    const {
      $slots,
      scrollable,
      mergedClsPrefix,
      mergedTheme,
      placement
    } = this;
    return h("div", {
      ref: "selfRef",
      class: [`${mergedClsPrefix}-notification-container`, scrollable && `${mergedClsPrefix}-notification-container--scrollable`, `${mergedClsPrefix}-notification-container--${placement}`]
    }, scrollable ? h(Scrollbar, {
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar,
      contentStyle: {
        overflow: "hidden"
      }
    }, $slots) : $slots);
  }
});
const iconRenderMap = {
  info: () => h(InfoIcon, null),
  success: () => h(SuccessIcon, null),
  warning: () => h(WarningIcon, null),
  error: () => h(ErrorIcon, null),
  default: () => null
};
const notificationProps = {
  closable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: "default"
  },
  avatar: Function,
  title: [String, Function],
  description: [String, Function],
  content: [String, Function],
  meta: [String, Function],
  action: [String, Function],
  onClose: {
    type: Function,
    required: true
  },
  keepAliveOnHover: Boolean,
  onMouseenter: Function,
  onMouseleave: Function
};
const notificationPropKeys = keysOf(notificationProps);
const Notification = defineComponent({
  name: "Notification",
  props: notificationProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      props: providerProps
    } = inject(notificationProviderInjectionKey);
    const {
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig();
    const rtlEnabledRef = useRtl("Notification", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        type
      } = props;
      const {
        self: {
          color,
          textColor,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          headerTextColor,
          descriptionTextColor,
          actionTextColor,
          borderRadius,
          headerFontWeight,
          boxShadow,
          lineHeight: lineHeight2,
          fontSize: fontSize2,
          closeMargin,
          closeSize,
          width,
          padding,
          closeIconSize,
          closeBorderRadius,
          closeColorHover,
          closeColorPressed,
          titleFontSize,
          metaFontSize,
          descriptionFontSize,
          [createKey("iconColor", type)]: iconColor
        },
        common: {
          cubicBezierEaseOut: cubicBezierEaseOut2,
          cubicBezierEaseIn: cubicBezierEaseIn2,
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        }
      } = mergedThemeRef.value;
      const {
        left,
        right,
        top,
        bottom
      } = getPadding(padding);
      return {
        "--n-color": color,
        "--n-font-size": fontSize2,
        "--n-text-color": textColor,
        "--n-description-text-color": descriptionTextColor,
        "--n-action-text-color": actionTextColor,
        "--n-title-text-color": headerTextColor,
        "--n-title-font-weight": headerFontWeight,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-bezier-ease-out": cubicBezierEaseOut2,
        "--n-bezier-ease-in": cubicBezierEaseIn2,
        "--n-border-radius": borderRadius,
        "--n-box-shadow": boxShadow,
        "--n-close-border-radius": closeBorderRadius,
        "--n-close-color-hover": closeColorHover,
        "--n-close-color-pressed": closeColorPressed,
        "--n-close-icon-color": closeIconColor,
        "--n-close-icon-color-hover": closeIconColorHover,
        "--n-close-icon-color-pressed": closeIconColorPressed,
        "--n-line-height": lineHeight2,
        "--n-icon-color": iconColor,
        "--n-close-margin": closeMargin,
        "--n-close-size": closeSize,
        "--n-close-icon-size": closeIconSize,
        "--n-width": width,
        "--n-padding-left": left,
        "--n-padding-right": right,
        "--n-padding-top": top,
        "--n-padding-bottom": bottom,
        "--n-title-font-size": titleFontSize,
        "--n-meta-font-size": metaFontSize,
        "--n-description-font-size": descriptionFontSize
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("notification", computed(() => props.type[0]), cssVarsRef, providerProps) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      showAvatar: computed(() => {
        return props.avatar || props.type !== "default";
      }),
      handleCloseClick() {
        props.onClose();
      },
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      mergedClsPrefix
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", {
      class: [`${mergedClsPrefix}-notification-wrapper`, this.themeClass],
      onMouseenter: this.onMouseenter,
      onMouseleave: this.onMouseleave,
      style: this.cssVars
    }, h("div", {
      class: [`${mergedClsPrefix}-notification`, this.rtlEnabled && `${mergedClsPrefix}-notification--rtl`, this.themeClass, {
        [`${mergedClsPrefix}-notification--closable`]: this.closable,
        [`${mergedClsPrefix}-notification--show-avatar`]: this.showAvatar
      }],
      style: this.cssVars
    }, this.showAvatar ? h("div", {
      class: `${mergedClsPrefix}-notification__avatar`
    }, this.avatar ? render(this.avatar) : this.type !== "default" ? h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => iconRenderMap[this.type]()
    }) : null) : null, this.closable ? h(NBaseClose, {
      clsPrefix: mergedClsPrefix,
      class: `${mergedClsPrefix}-notification__close`,
      onClick: this.handleCloseClick
    }) : null, h("div", {
      ref: "bodyRef",
      class: `${mergedClsPrefix}-notification-main`
    }, this.title ? h("div", {
      class: `${mergedClsPrefix}-notification-main__header`
    }, render(this.title)) : null, this.description ? h("div", {
      class: `${mergedClsPrefix}-notification-main__description`
    }, render(this.description)) : null, this.content ? h("pre", {
      class: `${mergedClsPrefix}-notification-main__content`
    }, render(this.content)) : null, this.meta || this.action ? h("div", {
      class: `${mergedClsPrefix}-notification-main-footer`
    }, this.meta ? h("div", {
      class: `${mergedClsPrefix}-notification-main-footer__meta`
    }, render(this.meta)) : null, this.action ? h("div", {
      class: `${mergedClsPrefix}-notification-main-footer__action`
    }, render(this.action)) : null) : null)));
  }
});
const notificationEnvOptions = Object.assign(Object.assign({}, notificationProps), {
  duration: Number,
  onClose: Function,
  onLeave: Function,
  onAfterEnter: Function,
  onAfterLeave: Function,
  /** @deprecated */
  onHide: Function,
  /** @deprecated */
  onAfterShow: Function,
  /** @deprecated */
  onAfterHide: Function
});
const NotificationEnvironment = defineComponent({
  name: "NotificationEnvironment",
  props: Object.assign(Object.assign({}, notificationEnvOptions), {
    // private
    internalKey: {
      type: String,
      required: true
    },
    onInternalAfterLeave: {
      type: Function,
      required: true
    }
  }),
  setup(props) {
    const {
      wipTransitionCountRef
    } = inject(notificationProviderInjectionKey);
    const showRef = ref(true);
    let timerId = null;
    function hide() {
      showRef.value = false;
      if (timerId) {
        (void 0).clearTimeout(timerId);
      }
    }
    function handleBeforeEnter(el) {
      wipTransitionCountRef.value++;
      void nextTick(() => {
        el.style.height = `${el.offsetHeight}px`;
        el.style.maxHeight = "0";
        el.style.transition = "none";
        void el.offsetHeight;
        el.style.transition = "";
        el.style.maxHeight = el.style.height;
      });
    }
    function handleAfterEnter(el) {
      wipTransitionCountRef.value--;
      el.style.height = "";
      el.style.maxHeight = "";
      const {
        onAfterEnter,
        onAfterShow
      } = props;
      if (onAfterEnter) onAfterEnter();
      if (onAfterShow) onAfterShow();
    }
    function handleBeforeLeave(el) {
      wipTransitionCountRef.value++;
      el.style.maxHeight = `${el.offsetHeight}px`;
      el.style.height = `${el.offsetHeight}px`;
      void el.offsetHeight;
    }
    function handleLeave(el) {
      const {
        onHide
      } = props;
      if (onHide) onHide();
      el.style.maxHeight = "0";
      void el.offsetHeight;
    }
    function handleAfterLeave() {
      wipTransitionCountRef.value--;
      const {
        onAfterLeave,
        onInternalAfterLeave,
        onAfterHide,
        internalKey
      } = props;
      if (onAfterLeave) onAfterLeave();
      onInternalAfterLeave(internalKey);
      if (onAfterHide) onAfterHide();
    }
    function setHideTimeout() {
      const {
        duration: duration2
      } = props;
      if (duration2) {
        timerId = (void 0).setTimeout(hide, duration2);
      }
    }
    function handleMouseenter(e) {
      if (e.currentTarget !== e.target) return;
      if (timerId !== null) {
        (void 0).clearTimeout(timerId);
        timerId = null;
      }
    }
    function handleMouseleave(e) {
      if (e.currentTarget !== e.target) return;
      setHideTimeout();
    }
    function handleClose() {
      const {
        onClose
      } = props;
      if (onClose) {
        void Promise.resolve(onClose()).then((feedback) => {
          if (feedback === false) return;
          hide();
        });
      } else {
        hide();
      }
    }
    return {
      show: showRef,
      hide,
      handleClose,
      handleAfterLeave,
      handleLeave,
      handleBeforeLeave,
      handleAfterEnter,
      handleBeforeEnter,
      handleMouseenter,
      handleMouseleave
    };
  },
  render() {
    return h(Transition, {
      name: "notification-transition",
      appear: true,
      // convert to any since Element is not compatible with HTMLElement
      onBeforeEnter: this.handleBeforeEnter,
      onAfterEnter: this.handleAfterEnter,
      onBeforeLeave: this.handleBeforeLeave,
      onLeave: this.handleLeave,
      onAfterLeave: this.handleAfterLeave
    }, {
      default: () => {
        return this.show ? h(Notification, Object.assign({}, keep(this.$props, notificationPropKeys), {
          onClose: this.handleClose,
          onMouseenter: this.duration && this.keepAliveOnHover ? this.handleMouseenter : void 0,
          onMouseleave: this.duration && this.keepAliveOnHover ? this.handleMouseleave : void 0
        })) : null;
      }
    });
  }
});
const style = c([cB("notification-container", `
 z-index: 4000;
 position: fixed;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 `, [c(">", [cB("scrollbar", `
 width: initial;
 overflow: visible;
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `, [c(">", [cB("scrollbar-container", `
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `, [cB("scrollbar-content", `
 padding-top: 12px;
 padding-bottom: 33px;
 `)])])])]), cM("top, top-right, top-left", `
 top: 12px;
 `, [c("&.transitioning >", [cB("scrollbar", [c(">", [cB("scrollbar-container", `
 min-height: 100vh !important;
 `)])])])]), cM("bottom, bottom-right, bottom-left", `
 bottom: 12px;
 `, [c(">", [cB("scrollbar", [c(">", [cB("scrollbar-container", [cB("scrollbar-content", `
 padding-bottom: 12px;
 `)])])])]), cB("notification-wrapper", `
 display: flex;
 align-items: flex-end;
 margin-bottom: 0;
 margin-top: 12px;
 `)]), cM("top, bottom", `
 left: 50%;
 transform: translateX(-50%);
 `, [cB("notification-wrapper", [c("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 transform: scale(0.85);
 `), c("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 transform: scale(1);
 `)])]), cM("top", [cB("notification-wrapper", `
 transform-origin: top center;
 `)]), cM("bottom", [cB("notification-wrapper", `
 transform-origin: bottom center;
 `)]), cM("top-right, bottom-right", [cB("notification", `
 margin-left: 28px;
 margin-right: 16px;
 `)]), cM("top-left, bottom-left", [cB("notification", `
 margin-left: 16px;
 margin-right: 28px;
 `)]), cM("top-right", `
 right: 0;
 `, [placementTransformStyle("top-right")]), cM("top-left", `
 left: 0;
 `, [placementTransformStyle("top-left")]), cM("bottom-right", `
 right: 0;
 `, [placementTransformStyle("bottom-right")]), cM("bottom-left", `
 left: 0;
 `, [placementTransformStyle("bottom-left")]), cM("scrollable", [cM("top-right", `
 top: 0;
 `), cM("top-left", `
 top: 0;
 `), cM("bottom-right", `
 bottom: 0;
 `), cM("bottom-left", `
 bottom: 0;
 `)]), cB("notification-wrapper", `
 margin-bottom: 12px;
 `, [c("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 opacity: 0;
 margin-top: 0 !important;
 margin-bottom: 0 !important;
 `), c("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 opacity: 1;
 `), c("&.notification-transition-leave-active", `
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-in),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `), c("&.notification-transition-enter-active", `
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-out),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `)]), cB("notification", `
 background-color: var(--n-color);
 color: var(--n-text-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 font-family: inherit;
 font-size: var(--n-font-size);
 font-weight: 400;
 position: relative;
 display: flex;
 overflow: hidden;
 flex-shrink: 0;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 width: var(--n-width);
 max-width: calc(100vw - 16px - 16px);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 box-sizing: border-box;
 opacity: 1;
 `, [cE("avatar", [cB("icon", `
 color: var(--n-icon-color);
 `), cB("base-icon", `
 color: var(--n-icon-color);
 `)]), cM("show-avatar", [cB("notification-main", `
 margin-left: 40px;
 width: calc(100% - 40px); 
 `)]), cM("closable", [cB("notification-main", [c("> *:first-child", `
 padding-right: 20px;
 `)]), cE("close", `
 position: absolute;
 top: 0;
 right: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), cE("avatar", `
 position: absolute;
 top: var(--n-padding-top);
 left: var(--n-padding-left);
 width: 28px;
 height: 28px;
 font-size: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 `, [cB("icon", "transition: color .3s var(--n-bezier);")]), cB("notification-main", `
 padding-top: var(--n-padding-top);
 padding-bottom: var(--n-padding-bottom);
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 margin-left: 8px;
 width: calc(100% - 8px);
 `, [cB("notification-main-footer", `
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-top: 12px;
 `, [cE("meta", `
 font-size: var(--n-meta-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `), cE("action", `
 cursor: pointer;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-action-text-color);
 `)]), cE("header", `
 font-weight: var(--n-title-font-weight);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-title-text-color);
 `), cE("description", `
 margin-top: 8px;
 font-size: var(--n-description-font-size);
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `), cE("content", `
 line-height: var(--n-line-height);
 margin: 12px 0 0 0;
 font-family: inherit;
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-text-color);
 `, [c("&:first-child", "margin: 0;")])])])])]);
function placementTransformStyle(placement) {
  const direction = placement.split("-")[1];
  const transformXEnter = direction === "left" ? "calc(-100%)" : "calc(100%)";
  const transformXLeave = "0";
  return cB("notification-wrapper", [c("&.notification-transition-enter-from, &.notification-transition-leave-to", `
 transform: translate(${transformXEnter}, 0);
 `), c("&.notification-transition-leave-from, &.notification-transition-enter-to", `
 transform: translate(${transformXLeave}, 0);
 `)]);
}
const notificationApiInjectionKey = createInjectionKey("n-notification-api");
const notificationProviderProps = Object.assign(Object.assign({}, useTheme.props), {
  containerClass: String,
  containerStyle: [String, Object],
  to: [String, Object],
  scrollable: {
    type: Boolean,
    default: true
  },
  max: Number,
  placement: {
    type: String,
    default: "top-right"
  },
  keepAliveOnHover: Boolean
});
const NNotificationProvider = defineComponent({
  name: "NotificationProvider",
  props: notificationProviderProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const notificationListRef = ref([]);
    const notificationRefs = {};
    const leavingKeySet = /* @__PURE__ */ new Set();
    function create(options) {
      const key = createId();
      const destroy = () => {
        leavingKeySet.add(key);
        if (notificationRefs[key]) {
          notificationRefs[key].hide();
        }
      };
      const notificationReactive = reactive(Object.assign(Object.assign({}, options), {
        key,
        destroy,
        hide: destroy,
        deactivate: destroy
      }));
      const {
        max
      } = props;
      if (max && notificationListRef.value.length - leavingKeySet.size >= max) {
        let someoneMountedRemoved = false;
        let index = 0;
        for (const notification2 of notificationListRef.value) {
          if (!leavingKeySet.has(notification2.key)) {
            if (notificationRefs[notification2.key]) {
              notification2.destroy();
              someoneMountedRemoved = true;
            }
            break;
          }
          index++;
        }
        if (!someoneMountedRemoved) {
          notificationListRef.value.splice(index, 1);
        }
      }
      notificationListRef.value.push(notificationReactive);
      return notificationReactive;
    }
    const apis = ["info", "success", "warning", "error"].map((type) => {
      return (options) => create(Object.assign(Object.assign({}, options), {
        type
      }));
    });
    function handleAfterLeave(key) {
      leavingKeySet.delete(key);
      notificationListRef.value.splice(notificationListRef.value.findIndex((notification2) => notification2.key === key), 1);
    }
    const themeRef = useTheme("Notification", "-notification", style, notificationLight, props, mergedClsPrefixRef);
    const api = {
      create,
      info: apis[0],
      success: apis[1],
      warning: apis[2],
      error: apis[3],
      open,
      destroyAll
    };
    const wipTransitionCountRef = ref(0);
    provide(notificationApiInjectionKey, api);
    provide(notificationProviderInjectionKey, {
      props,
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      wipTransitionCountRef
    });
    function open(options) {
      return create(options);
    }
    function destroyAll() {
      Object.values(notificationListRef.value).forEach((notification2) => {
        notification2.hide();
      });
    }
    return Object.assign({
      mergedClsPrefix: mergedClsPrefixRef,
      notificationList: notificationListRef,
      notificationRefs,
      handleAfterLeave
    }, api);
  },
  render() {
    var _a, _b, _c;
    const {
      placement
    } = this;
    return h(Fragment, null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a), this.notificationList.length ? h(Teleport, {
      to: (_c = this.to) !== null && _c !== void 0 ? _c : "body"
    }, h(NotificationContainer, {
      class: this.containerClass,
      style: this.containerStyle,
      scrollable: this.scrollable && placement !== "top" && placement !== "bottom",
      placement
    }, {
      default: () => {
        return this.notificationList.map((notification2) => {
          return h(NotificationEnvironment, Object.assign({
            ref: (inst) => {
              const refKey = notification2.key;
              if (inst === null) {
                delete this.notificationRefs[refKey];
              } else {
                this.notificationRefs[refKey] = inst;
              }
            }
          }, omit(notification2, ["destroy", "hide", "deactivate"]), {
            internalKey: notification2.key,
            onInternalAfterLeave: this.handleAfterLeave,
            keepAliveOnHover: notification2.keepAliveOnHover === void 0 ? this.keepAliveOnHover : notification2.keepAliveOnHover
          }));
        });
      }
    })) : null);
  }
});
function useNotification() {
  const api = inject(notificationApiInjectionKey, null);
  if (api === null) {
    throwError("use-notification", "No outer `n-notification-provider` found.");
  }
  return api;
}
const NInjectionExtractor = defineComponent({
  name: "InjectionExtractor",
  props: {
    onSetup: Function
  },
  setup(props, {
    slots
  }) {
    var _a;
    (_a = props.onSetup) === null || _a === void 0 ? void 0 : _a.call(props);
    return () => {
      var _a2;
      return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
    };
  }
});
const injectionFactoryMap = {
  message: useMessage$1,
  notification: useNotification,
  loadingBar: useLoadingBar,
  dialog: useDialog,
  modal: useModal
};
function createDiscreteApp({
  providersAndProps,
  configProviderProps: configProviderProps2
}) {
  let app = createApp(App);
  const extractedApi = {
    app
  };
  function App() {
    return h(NConfigProvider, unref(configProviderProps2), {
      default: () => providersAndProps.map(({
        type,
        Provider,
        props
      }) => {
        return h(Provider, unref(props), {
          default: () => h(NInjectionExtractor, {
            onSetup: () => extractedApi[type] = injectionFactoryMap[type]()
          })
        });
      })
    });
  }
  let hostEl;
  const unmount = () => {
    var _a;
    if (app === null || hostEl === null) {
      warn("discrete", "unmount call no need because discrete app has been unmounted");
      return;
    }
    app.unmount();
    (_a = hostEl.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(hostEl);
    hostEl = null;
    app = null;
  };
  return Object.assign({
    unmount
  }, extractedApi);
}
function createDiscreteApi(includes, {
  configProviderProps: configProviderProps2,
  messageProviderProps: messageProviderProps2,
  dialogProviderProps: dialogProviderProps2,
  notificationProviderProps: notificationProviderProps2,
  loadingBarProviderProps: loadingBarProviderProps2,
  modalProviderProps: modalProviderProps2
} = {}) {
  const providersAndProps = [];
  includes.forEach((type) => {
    switch (type) {
      case "message":
        providersAndProps.push({
          type,
          Provider: NMessageProvider,
          props: messageProviderProps2
        });
        break;
      case "notification":
        providersAndProps.push({
          type,
          Provider: NNotificationProvider,
          props: notificationProviderProps2
        });
        break;
      case "dialog":
        providersAndProps.push({
          type,
          Provider: NDialogProvider,
          props: dialogProviderProps2
        });
        break;
      case "loadingBar":
        providersAndProps.push({
          type,
          Provider: NLoadingBarProvider,
          props: loadingBarProviderProps2
        });
        break;
      case "modal":
        providersAndProps.push({
          type,
          Provider: NModalProvider,
          props: modalProviderProps2
        });
    }
  });
  const discreteApp = createDiscreteApp({
    providersAndProps,
    configProviderProps: configProviderProps2
  });
  return discreteApp;
}
class LocationApi {
  /**
   * 获取当前用户的IP定位信息
   * 如果用户已登录，会自动更新用户的loginIp字段
   */
  static async getIpLocation() {
    var _a;
    try {
      const response = await apiClient.get("/amap/ip/");
      if (response.success && response.data) {
        const data = response.data;
        console.log("\u{1F30D} IP\u5B9A\u4F4D\u4FE1\u606F:", {
          ip: data.ip,
          ipSource: data.ipSource,
          location: data.error ? "\u5B9A\u4F4D\u5931\u8D25" : data.location ? `${data.location.province || "\u672A\u77E5"} ${data.location.city || ""}` : "\u4F4D\u7F6E\u4FE1\u606F\u4E0D\u53EF\u7528",
          cached: data.cached,
          userUpdated: ((_a = data.user) == null ? void 0 : _a.locationUpdated) || false
        });
      }
      return response;
    } catch (error) {
      console.error("\u83B7\u53D6IP\u5B9A\u4F4D\u5931\u8D25:", error);
      throw error;
    }
  }
  /**
   * 强制刷新IP定位信息（忽略缓存）
   * 注意：这会直接调用高德地图API，请谨慎使用
   */
  static async refreshIpLocation() {
    try {
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      const response = await apiClient.get(`/amap/ip/?t=${timestamp}`);
      console.log("\u{1F504} \u5F3A\u5236\u5237\u65B0IP\u5B9A\u4F4D\u4FE1\u606F");
      return response;
    } catch (error) {
      console.error("\u5237\u65B0IP\u5B9A\u4F4D\u5931\u8D25:", error);
      throw error;
    }
  }
}
const getIpLocation = LocationApi.getIpLocation;
const refreshIpLocation = LocationApi.refreshIpLocation;
const { message, notification, dialog, loadingBar } = createDiscreteApi([
  "message",
  "notification",
  "dialog",
  "loadingBar"
]);
const useMessage = () => {
  const success = (content, duration2 = 3e3) => {
    message.success(content, { duration: duration2 });
  };
  const error = (content, duration2 = 4e3) => {
    message.error(content, { duration: duration2 });
  };
  const warning = (content, duration2 = 3e3) => {
    message.warning(content, { duration: duration2 });
  };
  const info = (content, duration2 = 3e3) => {
    message.info(content, { duration: duration2 });
  };
  const loading = (content) => {
    return message.loading(content, { duration: 0 });
  };
  const confirm = (content, title = "\u786E\u8BA4") => {
    return new Promise((resolve) => {
      dialog.warning({
        title,
        content,
        positiveText: "\u786E\u5B9A",
        negativeText: "\u53D6\u6D88",
        onPositiveClick: () => {
          resolve(true);
        },
        onNegativeClick: () => {
          resolve(false);
        },
        onClose: () => {
          resolve(false);
        }
      });
    });
  };
  const notify = {
    success: (title, content, duration2 = 4e3) => {
      notification.success({
        title,
        content,
        duration: duration2
      });
    },
    error: (title, content, duration2 = 4e3) => {
      notification.error({
        title,
        content,
        duration: duration2
      });
    },
    warning: (title, content, duration2 = 4e3) => {
      notification.warning({
        title,
        content,
        duration: duration2
      });
    },
    info: (title, content, duration2 = 4e3) => {
      notification.info({
        title,
        content,
        duration: duration2
      });
    }
  };
  return {
    success,
    error,
    warning,
    info,
    loading,
    confirm,
    notify,
    loadingBar
  };
};
const useLocation = () => {
  const { success, error, warning } = useMessage();
  const userStore = useUserStore();
  const state = reactive({
    loading: false,
    data: null,
    error: null,
    lastUpdated: null
  });
  const hasAutoFetched = ref(false);
  const fetchLocation = async (showNotification = false, forceRefresh = false) => {
    if (state.loading) return state.data;
    state.loading = true;
    state.error = null;
    try {
      const isLoggedIn = userStore.isLoggedIn;
      const response = forceRefresh ? await refreshIpLocation() : await getIpLocation();
      if (response.success && response.data) {
        state.data = response.data;
        state.lastUpdated = /* @__PURE__ */ new Date();
        if (showNotification) {
          const { location, user } = response.data;
          if (location.error) {
            warning("IP\u5B9A\u4F4D\u5931\u8D25: " + location.error);
          } else {
            const province = location.province;
            const city = location.city;
            const cacheText = response.data.cached ? "(\u7F13\u5B58)" : "";
            let locationText = "";
            let messageType = "success";
            if (province && city) {
              locationText = `${province} ${city}`;
            } else if (province || city) {
              locationText = `${province || city} (\u90E8\u5206\u4F4D\u7F6E\u4FE1\u606F)`;
              messageType = "warning";
            } else {
              locationText = "\u4F4D\u7F6E\u4FE1\u606F\u4E0D\u7CBE\u786E";
              messageType = "warning";
            }
            const baseMessage = `\u5B9A\u4F4D\u7ED3\u679C: ${locationText}${cacheText}`;
            if (isLoggedIn && (user == null ? void 0 : user.locationUpdated)) {
              if (messageType === "success") {
                success(`${baseMessage}\uFF0C\u767B\u5F55\u4FE1\u606F\u5DF2\u66F4\u65B0`);
              } else {
                warning(`${baseMessage}\uFF0C\u767B\u5F55\u4FE1\u606F\u5DF2\u66F4\u65B0`);
              }
            } else if (isLoggedIn && !(user == null ? void 0 : user.locationUpdated)) {
              warning(`${baseMessage}\uFF0C\u4F46\u767B\u5F55\u4FE1\u606F\u672A\u66F4\u65B0`);
            } else {
              if (messageType === "success") {
                success(`${baseMessage}\uFF08\u672A\u767B\u5F55\u72B6\u6001\uFF09`);
              } else {
                warning(`${baseMessage}\uFF08\u672A\u767B\u5F55\u72B6\u6001\uFF09`);
              }
            }
          }
        }
      } else {
        state.error = response.message || "\u83B7\u53D6\u5B9A\u4F4D\u4FE1\u606F\u5931\u8D25";
        if (showNotification) {
          error(state.error);
        }
      }
      return state.data;
    } catch (err) {
      state.error = err.message || "\u7F51\u7EDC\u9519\u8BEF";
      if (showNotification) {
        error("\u83B7\u53D6\u5B9A\u4F4D\u4FE1\u606F\u5931\u8D25");
      }
      console.error("IP\u5B9A\u4F4D\u9519\u8BEF:", err);
      return null;
    } finally {
      state.loading = false;
    }
  };
  const autoFetchLocation = async () => {
    if (hasAutoFetched.value) return state.data;
    hasAutoFetched.value = true;
    userStore.initializeAuth();
    return await fetchLocation(false, false);
  };
  const refreshLocation = async (showNotification = true) => {
    return await fetchLocation(showNotification, true);
  };
  const getLocationText = () => {
    var _a;
    if (!((_a = state.data) == null ? void 0 : _a.location)) return "\u672A\u77E5\u4F4D\u7F6E";
    const { location } = state.data;
    if (location.error) return "\u5B9A\u4F4D\u5931\u8D25";
    const province = location.province;
    const city = location.city;
    if (province && city) {
      return `${province} ${city}`;
    } else if (province) {
      return `${province} (\u57CE\u5E02\u672A\u77E5)`;
    } else if (city) {
      return `${city} (\u7701\u4EFD\u672A\u77E5)`;
    } else {
      return "\u4F4D\u7F6E\u4FE1\u606F\u4E0D\u7CBE\u786E";
    }
  };
  const hasLocation = computed(() => {
    var _a;
    return !!(((_a = state.data) == null ? void 0 : _a.location) && !state.data.location.error);
  });
  const isUserLocationUpdated = computed(() => {
    var _a, _b;
    return !!((_b = (_a = state.data) == null ? void 0 : _a.user) == null ? void 0 : _b.locationUpdated);
  });
  const currentIp = computed(() => {
    var _a;
    return ((_a = state.data) == null ? void 0 : _a.ip) || "\u672A\u77E5";
  });
  const isUserLoggedIn = computed(() => {
    return userStore.isLoggedIn;
  });
  return {
    // 状态
    ...toRefs(state),
    hasAutoFetched: readonly(hasAutoFetched),
    // 方法
    fetchLocation,
    autoFetchLocation,
    refreshLocation,
    getLocationText,
    // 计算属性
    hasLocation,
    isUserLocationUpdated,
    currentIp,
    isUserLoggedIn,
    // 原始状态（用于需要完整状态的场景）
    locationState: readonly(state)
  };
};

export { fadeInScaleUpTransition as A, c as B, cNotM as C, cM as D, cE as E, LazyTeleport as F, useSsrAdapter as G, isSlotEmpty as H, FocusTrap as I, warn as J, render as K, LocationApi as L, cCB as M, NConfigProvider as N, resolveWrappedSlot as O, XScrollbar as X, self as a, self$3 as b, createDiscreteApi as c, self$4 as d, self$1 as e, derived as f, commonVariables$3 as g, self$6 as h, self$5 as i, useConfig as j, keep as k, useTheme as l, createInjectionKey as m, call as n, createKey as o, useThemeClass as p, getFirstSlotVNode as q, createTheme as r, self$7 as s, modalBodyInjectionKey as t, useLocation as u, drawerBodyInjectionKey as v, popoverBodyInjectionKey as w, getSlot as x, getFirstVNode as y, cB as z };
//# sourceMappingURL=useLocation-DU515pZE.mjs.map
