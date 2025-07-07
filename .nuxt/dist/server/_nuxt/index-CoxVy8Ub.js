import { _ as __nuxt_component_0 } from "./AppHeader-CHr1q5UR.js";
import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
import "./useLocation-kga13ouX.js";
import "D:/code/xlweb/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-CXjDD8hH.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-CtfKDdVG.js";
import "D:/code/xlweb/node_modules/ufo/dist/index.mjs";
import "./AppLogo-Bv4HeTlN.js";
import "vue-router";
import "seemly";
import "treemate";
import "vooks";
import "vdirs";
import "lodash-es";
import "css-render";
import "evtd";
import "@css-render/plugin-bem";
import "D:/code/xlweb/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/code/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/code/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/code/xlweb/node_modules/defu/dist/defu.mjs";
import "D:/code/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/code/xlweb/node_modules/klona/dist/index.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    const categories = ref([]);
    const brands = ref([]);
    const loading = ref(true);
    const meta = ref({ total: 0, page: 1, limit: 12, totalPages: 1 });
    const selectedCategory = ref("all");
    const selectedBrand = ref("all");
    const priceRange = ref("");
    const sortBy = ref("");
    const searchTerm = ref("");
    const getCategoryName = (categoryId) => {
      const category = categories.value.find((cat) => cat.id === categoryId);
      return (category == null ? void 0 : category.name) || "All Products";
    };
    const getMainSpecs = (product2) => {
      const specs = product2.specs || {};
      return Object.entries(specs).slice(0, 2).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    };
    const translateSpecKey = (key) => {
      const translations = {
        memory: "显存",
        power: "功耗",
        cores: "核心",
        threads: "线程",
        socket: "插槽",
        chipset: "芯片组",
        wattage: "功率",
        efficiency: "效率",
        size: "尺寸",
        resolution: "分辨率"
      };
      return translations[key] || key;
    };
    const translateFeature = (feature) => {
      const translations = {
        "光线追踪": "Ray Tracing",
        "DLSS 3.0": "DLSS 3.0",
        "RDNA 3": "RDNA 3",
        "FSR 3.0": "FSR 3.0",
        "超线程": "Hyper-Threading",
        "DDR5支持": "DDR5 Support",
        "PCIe 5.0": "PCIe 5.0",
        "WiFi 6E": "WiFi 6E",
        "80+ 金牌": "80+ Gold",
        "全模组": "Fully Modular",
        "4K UHD": "4K UHD",
        "144Hz": "144Hz",
        "HDR10": "HDR10"
      };
      return translations[feature] || feature;
    };
    const getProductIcon = (category) => {
      const icons = {
        graphics: "bi bi-gpu-card text-cyan-400",
        cpu: "bi bi-cpu text-orange-400",
        motherboard: "bi bi-motherboard text-green-400",
        power: "bi bi-lightning text-yellow-400",
        monitor: "bi bi-display text-purple-400"
      };
      return icons[category] || "bi bi-pc-display text-gray-400";
    };
    const getCategoryDisplayName = (category) => {
      const names = {
        graphics: "显卡",
        cpu: "处理器",
        motherboard: "主板",
        power: "电源",
        monitor: "显示器"
      };
      return names[category] || "硬件";
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
    };
    useHead({
      title: "产品中心 - xlCig",
      meta: [
        { name: "description", content: "浏览我们精选的PC硬件产品，包括显卡、CPU、主板等" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-42aacc70><div class="fixed inset-0 pointer-events-none" data-v-42aacc70><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full filter blur-3xl animate-pulse" data-v-42aacc70></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-42aacc70></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 rounded-full filter blur-3xl animate-spin-slow" data-v-42aacc70></div><div class="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full filter blur-2xl animate-pulse delay-500" data-v-42aacc70></div><div class="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full filter blur-3xl animate-pulse delay-2000" data-v-42aacc70></div></div>`);
      _push(ssrRenderComponent(_component_AppHeader, {
        "show-back-button": false,
        "show-nav-menu": true,
        "show-breadcrumb": false,
        "show-location": false,
        "show-search-button": true,
        "show-notification-button": true,
        "show-decorations": false,
        "logo-size": "medium"
      }, null, _parent));
      _push(`<section class="relative z-10" data-v-42aacc70><div class="container mx-auto px-6 py-8" data-v-42aacc70><div class="glass-card-enhanced rounded-3xl p-8 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-42aacc70><div class="text-center" data-v-42aacc70><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/40 mb-6" data-v-42aacc70><i class="bi bi-grid-3x3-gap text-white text-3xl" data-v-42aacc70></i></div><h1 class="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4" data-v-42aacc70><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-42aacc70>产品中心</span></h1><p class="text-gray-300 text-xl max-w-2xl mx-auto" data-v-42aacc70>专业的PC硬件产品，为您的项目提供可靠的解决方案</p></div></div></div></section><div class="sticky top-0 z-40 backdrop-blur-xl border-b border-cyan-400/20" data-v-42aacc70><div class="container mx-auto px-6 py-4" data-v-42aacc70><div class="glass-card-enhanced rounded-xl p-6 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-42aacc70><div class="mb-6" data-v-42aacc70><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-3" data-v-42aacc70><div class="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg" data-v-42aacc70><i class="bi bi-funnel text-white" data-v-42aacc70></i></div><span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-42aacc70>产品分类</span></h3><div class="flex flex-wrap gap-3" data-v-42aacc70><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<button class="${ssrRenderClass([
          "flex items-center px-5 py-3 rounded-xl font-semibold transition-all duration-300 border backdrop-blur-sm",
          unref(selectedCategory) === cat.id ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border-cyan-400/50 shadow-lg shadow-cyan-500/30" : "bg-gray-800/30 text-gray-300 border-gray-600/30 hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-500/10"
        ])}" data-v-42aacc70><i class="${ssrRenderClass([cat.icon, "mr-2 text-lg"])}" data-v-42aacc70></i><span data-v-42aacc70>${ssrInterpolate(cat.name)}</span>`);
        if (cat.count > 0) {
          _push(`<span class="ml-2 text-sm opacity-75 px-2 py-1 bg-black/20 rounded-full" data-v-42aacc70>(${ssrInterpolate(cat.count)})</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-42aacc70><div data-v-42aacc70><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-42aacc70><i class="bi bi-bookmark text-cyan-400" data-v-42aacc70></i> 品牌 </label><select class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-42aacc70><option value="all" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), "all") : ssrLooseEqual(unref(selectedBrand), "all")) ? " selected" : ""}>全部品牌</option><!--[-->`);
      ssrRenderList(unref(brands), (brand) => {
        _push(`<option${ssrRenderAttr("value", brand.id)} class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), brand.id) : ssrLooseEqual(unref(selectedBrand), brand.id)) ? " selected" : ""}>${ssrInterpolate(brand.name)} (${ssrInterpolate(brand.count)}) </option>`);
      });
      _push(`<!--]--></select></div><div data-v-42aacc70><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-42aacc70><i class="bi bi-currency-dollar text-green-400" data-v-42aacc70></i> 价格区间 </label><select class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-42aacc70><option value="" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "") : ssrLooseEqual(unref(priceRange), "")) ? " selected" : ""}>任意价格</option><option value="0-3600" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "0-3600") : ssrLooseEqual(unref(priceRange), "0-3600")) ? " selected" : ""}>3600元以下</option><option value="3600-7200" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "3600-7200") : ssrLooseEqual(unref(priceRange), "3600-7200")) ? " selected" : ""}>3600-7200元</option><option value="7200-10800" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "7200-10800") : ssrLooseEqual(unref(priceRange), "7200-10800")) ? " selected" : ""}>7200-10800元</option><option value="10800-14400" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "10800-14400") : ssrLooseEqual(unref(priceRange), "10800-14400")) ? " selected" : ""}>10800-14400元</option><option value="14400-99999" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "14400-99999") : ssrLooseEqual(unref(priceRange), "14400-99999")) ? " selected" : ""}>14400元以上</option></select></div><div data-v-42aacc70><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-42aacc70><i class="bi bi-sort-down text-purple-400" data-v-42aacc70></i> 排序 </label><select class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-42aacc70><option value="" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "") : ssrLooseEqual(unref(sortBy), "")) ? " selected" : ""}>推荐</option><option value="price_asc" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price_asc") : ssrLooseEqual(unref(sortBy), "price_asc")) ? " selected" : ""}>价格：从低到高</option><option value="price_desc" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price_desc") : ssrLooseEqual(unref(sortBy), "price_desc")) ? " selected" : ""}>价格：从高到低</option><option value="rating" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "rating") : ssrLooseEqual(unref(sortBy), "rating")) ? " selected" : ""}>评分最高</option><option value="newest" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "newest") : ssrLooseEqual(unref(sortBy), "newest")) ? " selected" : ""}>最新发布</option><option value="popular" class="bg-gray-800" data-v-42aacc70${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "popular") : ssrLooseEqual(unref(sortBy), "popular")) ? " selected" : ""}>最受欢迎</option></select></div><div data-v-42aacc70><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-42aacc70><i class="bi bi-search text-yellow-400" data-v-42aacc70></i> 搜索产品 </label><input${ssrRenderAttr("value", unref(searchTerm))} placeholder="输入产品名称..." class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm placeholder-gray-400 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-42aacc70></div></div><div class="mt-6 flex justify-end" data-v-42aacc70><button class="px-6 py-3 text-sm font-semibold text-gray-300 bg-gray-800/30 border border-gray-600/50 rounded-xl hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm" data-v-42aacc70><i class="bi bi-arrow-clockwise" data-v-42aacc70></i> 重置筛选 </button></div></div></div></div><main class="container mx-auto px-6 py-8 relative z-10" data-v-42aacc70><div class="glass-card-enhanced rounded-xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 mb-6 backdrop-blur-xl" data-v-42aacc70><div class="px-6 py-4 flex items-center justify-between border-b border-gray-700/50" data-v-42aacc70><div class="flex items-center" data-v-42aacc70><h2 class="text-xl font-bold text-white" data-v-42aacc70>${ssrInterpolate(getCategoryName(unref(selectedCategory)))}</h2><span class="ml-3 text-sm text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30" data-v-42aacc70>(${ssrInterpolate(unref(meta).total)} 个产品)</span></div><div class="text-sm text-gray-400" data-v-42aacc70> 找到 <span class="text-cyan-400 font-semibold" data-v-42aacc70>${ssrInterpolate(unref(meta).total)}</span> 个符合条件的产品 </div></div></div>`);
      if (!unref(loading)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-42aacc70><!--[-->`);
        ssrRenderList(unref(products), (product2) => {
          _push(`<div class="glass-card-enhanced rounded-xl border border-cyan-400/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 group overflow-hidden backdrop-blur-xl" data-v-42aacc70><div class="relative h-48 bg-gradient-to-br from-gray-800/60 to-gray-900/60" data-v-42aacc70>`);
          if (product2.image) {
            _push(`<div class="product-list-image-container" data-v-42aacc70><img${ssrRenderAttr("src", product2.image)}${ssrRenderAttr("alt", product2.name)} class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 filter drop-shadow-lg" data-v-42aacc70></div>`);
          } else {
            _push(`<div class="product-list-placeholder" data-v-42aacc70><div class="product-icon-wrapper" data-v-42aacc70><i class="${ssrRenderClass([getProductIcon(product2.category), "product-icon"])}" data-v-42aacc70></i><div class="product-icon-glow" data-v-42aacc70></div></div><span class="product-category-name" data-v-42aacc70>${ssrInterpolate(getCategoryDisplayName(product2.category))}</span></div>`);
          }
          if (product2.originalPrice && product2.originalPrice > product2.price) {
            _push(`<div class="absolute top-3 left-3 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-red-500/40 animate-pulse" data-v-42aacc70><i class="bi bi-lightning-fill mr-1" data-v-42aacc70></i> -${ssrInterpolate(Math.round((1 - product2.price / product2.originalPrice) * 100))}% </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="absolute top-3 right-3" data-v-42aacc70>`);
          if (!product2.inStock) {
            _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/30 text-red-200 border border-red-400/50 shadow-lg shadow-red-500/30 backdrop-blur-sm" data-v-42aacc70><i class="bi bi-x-circle-fill mr-1" data-v-42aacc70></i>缺货 </span>`);
          } else if (product2.stockCount <= 5) {
            _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/30 text-orange-200 border border-orange-400/50 shadow-lg shadow-orange-500/30 backdrop-blur-sm animate-pulse" data-v-42aacc70><i class="bi bi-exclamation-triangle-fill mr-1" data-v-42aacc70></i>剩余${ssrInterpolate(product2.stockCount)}</span>`);
          } else {
            _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/30 backdrop-blur-sm" data-v-42aacc70><i class="bi bi-check-circle-fill mr-1" data-v-42aacc70></i>现货 </span>`);
          }
          _push(`</div></div><div class="p-6" data-v-42aacc70><div class="mb-4" data-v-42aacc70><div class="flex items-center justify-between mb-3" data-v-42aacc70><span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border border-cyan-400/40 shadow-lg backdrop-blur-sm" data-v-42aacc70><i class="bi bi-award mr-1" data-v-42aacc70></i> ${ssrInterpolate(product2.brand)}</span></div><h3 class="font-bold text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300" data-v-42aacc70>${ssrInterpolate(product2.name)}</h3><p class="text-gray-400 text-sm leading-relaxed line-clamp-2" data-v-42aacc70>${ssrInterpolate(product2.description)}</p></div><div class="flex items-center gap-2 mb-4 p-3 bg-gray-800/40 rounded-lg border border-gray-700/30 backdrop-blur-sm" data-v-42aacc70><div class="flex" data-v-42aacc70><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<i class="${ssrRenderClass([i <= product2.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-sm drop-shadow-lg"])}" data-v-42aacc70></i>`);
          });
          _push(`<!--]--></div><span class="text-sm font-bold text-white" data-v-42aacc70>${ssrInterpolate(product2.rating)}</span><span class="text-xs text-gray-400" data-v-42aacc70>(${ssrInterpolate(product2.reviewCount)})</span></div><div class="space-y-2 mb-4" data-v-42aacc70><!--[-->`);
          ssrRenderList(getMainSpecs(product2), (value, key) => {
            _push(`<div class="flex justify-between items-center p-3 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-lg text-sm border border-gray-600/30 backdrop-blur-sm" data-v-42aacc70><span class="text-gray-300 font-medium" data-v-42aacc70>${ssrInterpolate(translateSpecKey(key))}</span><span class="font-bold text-white" data-v-42aacc70>${ssrInterpolate(value)}</span></div>`);
          });
          _push(`<!--]--></div><div class="flex flex-wrap gap-2 mb-4" data-v-42aacc70><!--[-->`);
          ssrRenderList(product2.features.slice(0, 3), (feature) => {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm" data-v-42aacc70>${ssrInterpolate(translateFeature(feature))}</span>`);
          });
          _push(`<!--]--></div><div class="border-t border-gray-700/50 pt-4" data-v-42aacc70><div class="flex items-center justify-between mb-4" data-v-42aacc70><div data-v-42aacc70><div class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-42aacc70> $${ssrInterpolate(product2.price.toLocaleString())}</div>`);
          if (product2.originalPrice && product2.originalPrice > product2.price) {
            _push(`<div class="text-sm text-gray-500 line-through" data-v-42aacc70> MSRP $${ssrInterpolate(product2.originalPrice.toLocaleString())}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-right text-xs text-gray-400" data-v-42aacc70><div data-v-42aacc70>发布日期</div><div class="text-cyan-400" data-v-42aacc70>${ssrInterpolate(formatDate(product2.releaseDate))}</div></div></div><div class="grid grid-cols-2 gap-3" data-v-42aacc70><button class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-42aacc70> 查看详情 </button><button class="px-4 py-2 border border-gray-600/50 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-300 text-sm font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-1 backdrop-blur-sm" data-v-42aacc70><i class="bi bi-heart" data-v-42aacc70></i> 收藏 </button></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="text-center py-16" data-v-42aacc70><div class="inline-flex flex-col items-center glass-card-enhanced rounded-xl border border-cyan-400/40 p-12 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-42aacc70><div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6" data-v-42aacc70></div><p class="text-xl font-bold text-white" data-v-42aacc70>正在加载产品...</p><p class="text-gray-400 mt-2" data-v-42aacc70>请稍候</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && unref(products).length === 0) {
        _push(`<div class="text-center py-16" data-v-42aacc70><div class="glass-card-enhanced rounded-xl border border-cyan-400/40 p-16 shadow-2xl shadow-cyan-500/25 max-w-md mx-auto backdrop-blur-xl" data-v-42aacc70><div class="text-8xl mb-8 text-cyan-400/50" data-v-42aacc70><i class="bi bi-inbox" data-v-42aacc70></i></div><h3 class="text-2xl font-bold text-white mb-4" data-v-42aacc70>未找到产品</h3><p class="text-gray-400 mb-8 text-lg" data-v-42aacc70>请尝试调整筛选条件或搜索关键词</p><button class="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-42aacc70><i class="bi bi-arrow-clockwise mr-2" data-v-42aacc70></i> 重置筛选 </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-42aacc70"]]);
export {
  index as default
};
//# sourceMappingURL=index-CoxVy8Ub.js.map
