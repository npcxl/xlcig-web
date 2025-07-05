import { _ as __nuxt_component_0 } from "./AppHeader-D4R1WNqE.js";
import { ref, computed, readonly, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { b as useRouter } from "../server.mjs";
import "D:/codeGitee/xlweb/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./apiClient-C7W98XI_.js";
import { u as useHead } from "./v3-CcqVKkZz.js";
import "./nuxt-link-qhU_stN5.js";
import "D:/codeGitee/xlweb/node_modules/ufo/dist/index.mjs";
import "./AppLogo-B7Z3yKfV.js";
import "vue-router";
import "./useLocation-DU515pZE.js";
import "seemly";
import "vooks";
import "vdirs";
import "css-render";
import "@css-render/plugin-bem";
import "lodash-es";
import "evtd";
import "treemate";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlweb/node_modules/defu/dist/defu.mjs";
import "D:/codeGitee/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/klona/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$1 = {
  __name: "SteamCarousel",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    useRouter();
    const gpus = ref([
      {
        id: 1,
        title: "RTX 5090",
        model: "旗舰级显卡",
        rating: "9.8",
        releaseYear: "2025",
        originalPrice: 22999,
        salePrice: 19999,
        image: "",
        description: "革命性Blackwell架构，32GB GDDR7显存，专为8K游戏和AI应用而生。支持最新DLSS 4技术，提供前所未有的游戏性能和AI加速能力。",
        specs: {
          memory: "32GB GDDR7",
          cores: "21504 CUDA",
          boost: "2900 MHz",
          power: "600W"
        },
        features: ["DLSS 4", "8K游戏", "AI超采样", "实时光追"]
      },
      {
        id: 2,
        title: "RTX 5080",
        model: "高端游戏显卡",
        rating: "9.5",
        releaseYear: "2025",
        originalPrice: 14999,
        salePrice: 12999,
        image: "",
        description: "次旗舰级性能，16GB GDDR7显存，完美支持4K高帧率游戏。配备先进的Ada Lovelace升级架构，为高端游戏玩家提供极致体验。",
        specs: {
          memory: "16GB GDDR7",
          cores: "14080 CUDA",
          boost: "2700 MHz",
          power: "400W"
        },
        features: ["DLSS 4", "4K 120FPS", "光追优化", "创作加速"]
      },
      {
        id: 3,
        title: "RTX 5070 Ti",
        model: "性能级显卡",
        rating: "9.2",
        releaseYear: "2025",
        originalPrice: 8999,
        salePrice: 7999,
        image: "",
        description: "主流性能王者，12GB GDDR7显存，1440p游戏最佳选择。采用最新架构优化，提供出色的性价比和游戏表现。",
        specs: {
          memory: "12GB GDDR7",
          cores: "8960 CUDA",
          boost: "2600 MHz",
          power: "285W"
        },
        features: ["DLSS 4", "1440p极致", "效率优化", "温控出色"]
      },
      {
        id: 4,
        title: "RTX 5070",
        model: "主流游戏显卡",
        rating: "8.9",
        releaseYear: "2025",
        originalPrice: 6999,
        salePrice: 5999,
        image: "",
        description: "主流游戏新标杆，12GB GDDR6X显存，提供1440p高设置游戏体验。出色的能效比和先进的AI功能，满足大多数玩家需求。",
        specs: {
          memory: "12GB GDDR6X",
          cores: "5888 CUDA",
          boost: "2500 MHz",
          power: "220W"
        },
        features: ["DLSS 4", "1440p高画质", "低功耗", "静音运行"]
      },
      {
        id: 5,
        title: "RTX 5060 Ti",
        model: "入门级显卡",
        rating: "8.6",
        releaseYear: "2025",
        originalPrice: 4999,
        salePrice: 3999,
        image: "",
        description: "入门级RTX体验，8GB GDDR6X显存，1080p光追游戏首选。为预算有限的玩家提供RTX技术和AI功能体验。",
        specs: {
          memory: "8GB GDDR6X",
          cores: "4352 CUDA",
          boost: "2400 MHz",
          power: "165W"
        },
        features: ["DLSS 4", "1080p光追", "节能设计", "超值选择"]
      }
    ]);
    const currentIndex = ref(0);
    const rotation = ref(0);
    const autoRotate = ref(true);
    const isHovered = ref(false);
    ref(/* @__PURE__ */ new Set());
    const selectedGpu = computed(() => gpus.value[currentIndex.value]);
    const selectGpu = (index2) => {
      if (index2 === currentIndex.value) return;
      currentIndex.value = index2;
      rotation.value = -index2 * (360 / gpus.value.length);
      if ((void 0).vibrate) {
        (void 0).vibrate(50);
      }
      autoRotate.value = false;
      setTimeout(() => {
        if (!isHovered.value) {
          autoRotate.value = true;
        }
      }, 3e3);
    };
    const nextGpu = () => {
      const nextIndex = (currentIndex.value + 1) % gpus.value.length;
      selectGpu(nextIndex);
    };
    const prevGpu = () => {
      const prevIndex = currentIndex.value === 0 ? gpus.value.length - 1 : currentIndex.value - 1;
      selectGpu(prevIndex);
    };
    ref(0);
    ref(0);
    ref(null);
    ref(false);
    __expose({
      nextGpu,
      prevGpu,
      selectGpu,
      currentIndex: readonly(currentIndex),
      selectedGpu: readonly(selectedGpu)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "steam-carousel-container" }, _attrs))} data-v-29472115><div class="particle-system" data-v-29472115><!--[-->`);
      ssrRenderList(50, (i) => {
        _push(`<div class="particle" style="${ssrRenderStyle({
          "--delay": `${Math.random() * 5}s`,
          "--duration": `${3 + Math.random() * 4}s`,
          "--x": `${Math.random() * 100}%`,
          "--y": `${Math.random() * 100}%`,
          "--size": `${2 + Math.random() * 3}px`
        })}" data-v-29472115></div>`);
      });
      _push(`<!--]--></div><div class="carousel-background" data-v-29472115><div class="bg-pattern" data-v-29472115></div><div class="bg-glow-1" data-v-29472115></div><div class="bg-glow-2" data-v-29472115></div><div class="bg-glow-3" data-v-29472115></div><div class="light-sweep" data-v-29472115></div><div class="energy-field" data-v-29472115></div></div><div class="text-center mb-16" data-v-29472115><h3 class="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4" data-v-29472115><i class="bi bi-gpu-card text-cyan-400 shadow-lg shadow-cyan-400/50 text-6xl pulse-icon" data-v-29472115></i> RTX 50系列显卡 </h3><p class="text-gray-300 text-xl" data-v-29472115>下一代AI游戏的革命性体验</p><div class="title-underline" data-v-29472115></div></div><div class="carousel-3d-scene" data-v-29472115><div class="carousel-environment" data-v-29472115><div class="env-ring ring-1" data-v-29472115></div><div class="env-ring ring-2" data-v-29472115></div><div class="env-ring ring-3" data-v-29472115></div></div><div class="carousel-3d-stage" style="${ssrRenderStyle({ transform: `rotateY(${unref(rotation)}deg)` })}" data-v-29472115><!--[-->`);
      ssrRenderList(unref(gpus), (gpu, index2) => {
        _push(`<div class="${ssrRenderClass([{ "active": index2 === unref(currentIndex) }, "carousel-3d-item"])}" style="${ssrRenderStyle({
          transform: `rotateY(${index2 * (360 / unref(gpus).length)}deg) translateZ(500px)`,
          "--delay": `${index2 * 0.1}s`,
          "--rotation": `${index2 * (360 / unref(gpus).length)}deg`
        })}" tabindex="0"${ssrRenderAttr("aria-label", `显卡: ${gpu.title}`)} data-v-29472115><div class="game-cover glass-morphism-enhanced" data-v-29472115><div class="hologram-effect" data-v-29472115></div>`);
        if (gpu.image) {
          _push(`<div class="gpu-image-container" data-v-29472115><img${ssrRenderAttr("src", gpu.image)}${ssrRenderAttr("alt", gpu.title)} loading="lazy" data-v-29472115></div>`);
        } else {
          _push(`<div class="gpu-placeholder" data-v-29472115><i class="bi bi-gpu-card" data-v-29472115></i><span class="gpu-model-name" data-v-29472115>${ssrInterpolate(gpu.title)}</span></div>`);
        }
        _push(`<div class="game-glow" data-v-29472115></div><div class="glass-overlay-advanced" data-v-29472115></div><div class="glass-reflection-advanced" data-v-29472115></div><div class="${ssrRenderClass([{ "scanning": index2 === unref(currentIndex) }, "light-scan-advanced"])}" data-v-29472115></div><div class="game-info-advanced" data-v-29472115><h4 class="game-title-advanced" data-v-29472115>${ssrInterpolate(gpu.title)}</h4><p class="game-genre-advanced" data-v-29472115>${ssrInterpolate(gpu.model)}</p><div class="game-stats-advanced" data-v-29472115><div class="game-rating-advanced" data-v-29472115><i class="bi bi-star-fill" data-v-29472115></i><span data-v-29472115>${ssrInterpolate(gpu.rating)}</span></div><div class="game-year-advanced" data-v-29472115>${ssrInterpolate(gpu.releaseYear)}</div></div></div><div class="game-price-advanced" data-v-29472115>`);
        if (gpu.originalPrice > 0) {
          _push(`<span class="original-price-advanced" data-v-29472115>¥${ssrInterpolate(gpu.originalPrice)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="sale-price-advanced" data-v-29472115>${ssrInterpolate(gpu.salePrice > 0 ? `¥${gpu.salePrice}` : "免费")}</span></div><div class="active-border-advanced" style="${ssrRenderStyle(index2 === unref(currentIndex) ? null : { display: "none" })}" data-v-29472115></div><div class="glass-frame-advanced" data-v-29472115><div class="glass-corner-advanced top-left" data-v-29472115></div><div class="glass-corner-advanced top-right" data-v-29472115></div><div class="glass-corner-advanced bottom-left" data-v-29472115></div><div class="glass-corner-advanced bottom-right" data-v-29472115></div></div><div class="energy-orbs" data-v-29472115><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="energy-orb" style="${ssrRenderStyle({ "--index": i })}" data-v-29472115></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="carousel-controls-advanced" role="navigation" aria-label="显卡轮播控制" data-v-29472115><button class="control-btn-advanced prev glass-button-advanced" aria-label="上一个显卡" tabindex="0" data-v-29472115><i class="bi bi-chevron-left" aria-hidden="true" data-v-29472115></i><div class="button-glow" data-v-29472115></div></button><div class="game-indicators-advanced" role="tablist" aria-label="显卡选择指示器" data-v-29472115><!--[-->`);
      ssrRenderList(unref(gpus), (gpu, index2) => {
        _push(`<button class="${ssrRenderClass([{ "active": index2 === unref(currentIndex) }, "indicator-advanced"])}" role="tab"${ssrRenderAttr("aria-selected", index2 === unref(currentIndex))}${ssrRenderAttr("aria-label", `选择显卡: ${gpu.title}`)}${ssrRenderAttr("tabindex", index2 === unref(currentIndex) ? 0 : -1)} data-v-29472115><div class="indicator-inner" data-v-29472115></div><div class="indicator-ripple" data-v-29472115></div><span class="indicator-tooltip-advanced" data-v-29472115>${ssrInterpolate(gpu.title)}</span></button>`);
      });
      _push(`<!--]--></div><button class="control-btn-advanced next glass-button-advanced" aria-label="下一个显卡" tabindex="0" data-v-29472115><i class="bi bi-chevron-right" aria-hidden="true" data-v-29472115></i><div class="button-glow" data-v-29472115></div></button></div><div class="current-game-info-advanced" role="main" aria-label="当前选中显卡详情" data-v-29472115><div class="glass-card-premium rounded-2xl p-10 max-w-6xl mx-auto border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-29472115><div class="grid md:grid-cols-5 gap-10 items-center" data-v-29472115><div class="md:col-span-2" data-v-29472115><div class="game-detail-cover-advanced" data-v-29472115>`);
      if (unref(selectedGpu).image) {
        _push(`<div class="detail-image-container" data-v-29472115><img${ssrRenderAttr("src", unref(selectedGpu).image)}${ssrRenderAttr("alt", `${unref(selectedGpu).title} 显卡封面`)} class="w-full rounded-lg shadow-lg" loading="lazy" data-v-29472115></div>`);
      } else {
        _push(`<div class="detail-gpu-placeholder" data-v-29472115><i class="bi bi-gpu-card" data-v-29472115></i><span class="detail-gpu-name" data-v-29472115>${ssrInterpolate(unref(selectedGpu).title)}</span><span class="detail-gpu-model" data-v-29472115>${ssrInterpolate(unref(selectedGpu).model)}</span></div>`);
      }
      _push(`<div class="cover-overlay-advanced" data-v-29472115><button class="play-button-advanced" aria-label="在Steam上查看显卡" tabindex="0" data-v-29472115><i class="bi bi-play-fill" aria-hidden="true" data-v-29472115></i><div class="play-ripple" data-v-29472115></div></button></div><div class="detail-glass-overlay-advanced" data-v-29472115></div><div class="cover-energy-field" data-v-29472115></div></div></div><div class="md:col-span-3" data-v-29472115><header data-v-29472115><h2 class="text-4xl font-bold text-white mb-6 neon-text-advanced" data-v-29472115>${ssrInterpolate(unref(selectedGpu).title)}</h2></header><p class="text-gray-300 text-lg mb-8 leading-relaxed" data-v-29472115>${ssrInterpolate(unref(selectedGpu).description)}</p><div class="game-badges-advanced mb-8" role="list" aria-label="显卡信息标签" data-v-29472115><span class="badge-advanced genre-badge" role="listitem" data-v-29472115><i class="bi bi-tag" aria-hidden="true" data-v-29472115></i><span class="sr-only" data-v-29472115>显卡类型：</span>${ssrInterpolate(unref(selectedGpu).model)}</span><span class="badge-advanced rating-badge" role="listitem" data-v-29472115><i class="bi bi-star-fill" aria-hidden="true" data-v-29472115></i><span class="sr-only" data-v-29472115>评分：</span>${ssrInterpolate(unref(selectedGpu).rating)}</span><span class="badge-advanced year-badge" role="listitem" data-v-29472115><i class="bi bi-calendar" aria-hidden="true" data-v-29472115></i><span class="sr-only" data-v-29472115>发布年份：</span>${ssrInterpolate(unref(selectedGpu).releaseYear)}</span></div><div class="gpu-specs-grid mb-8" data-v-29472115><div class="spec-item" data-v-29472115><i class="bi bi-memory text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>显存</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.memory)}</span></div><div class="spec-item" data-v-29472115><i class="bi bi-cpu text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>CUDA核心</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.cores)}</span></div><div class="spec-item" data-v-29472115><i class="bi bi-speedometer2 text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>加速频率</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.boost)}</span></div><div class="spec-item" data-v-29472115><i class="bi bi-lightning text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>功耗</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.power)}</span></div></div><div class="gpu-features mb-8" data-v-29472115><h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2" data-v-29472115><i class="bi bi-gear-fill text-cyan-400" data-v-29472115></i> 核心特性 </h4><div class="feature-tags" data-v-29472115><!--[-->`);
      ssrRenderList(unref(selectedGpu).features, (feature) => {
        _push(`<span class="feature-tag" data-v-29472115><i class="bi bi-check-circle-fill text-green-400" data-v-29472115></i> ${ssrInterpolate(feature)}</span>`);
      });
      _push(`<!--]--></div></div><div class="flex items-center justify-between" data-v-29472115><div class="price-section-advanced" role="region" aria-label="价格信息" data-v-29472115>`);
      if (unref(selectedGpu).originalPrice > 0) {
        _push(`<span class="text-gray-400 text-xl line-through mr-4" aria-label="原价" data-v-29472115>¥${ssrInterpolate(unref(selectedGpu).originalPrice.toLocaleString())}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-4xl font-bold text-cyan-400 neon-text-price" aria-label="当前价格" data-v-29472115>¥${ssrInterpolate(unref(selectedGpu).salePrice.toLocaleString())}</span>`);
      if (unref(selectedGpu).originalPrice > 0 && unref(selectedGpu).salePrice > 0) {
        _push(`<span class="text-green-400 text-lg ml-4 discount-badge" aria-label="折扣" data-v-29472115> -${ssrInterpolate(Math.round((1 - unref(selectedGpu).salePrice / unref(selectedGpu).originalPrice) * 100))}% </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="btn-premium-advanced px-8 py-3 rounded-2xl font-bold text-lg flex items-center gap-3 relative overflow-hidden" aria-label="查看显卡详情" tabindex="0" data-v-29472115><i class="bi bi-eye mr-3" aria-hidden="true" data-v-29472115></i> 查看详情 <div class="btn-energy-field" data-v-29472115></div></button></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SteamCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-29472115"]]);
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
      const _component_SteamCarousel = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, _attrs))} data-v-e5274d03><div class="fixed inset-0 pointer-events-none" data-v-e5274d03><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full filter blur-3xl animate-pulse" data-v-e5274d03></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-e5274d03></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 rounded-full filter blur-3xl animate-spin-slow" data-v-e5274d03></div><div class="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full filter blur-2xl animate-pulse delay-500" data-v-e5274d03></div><div class="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full filter blur-3xl animate-pulse delay-2000" data-v-e5274d03></div></div>`);
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
      _push(`<section class="relative z-10" data-v-e5274d03><div class="container mx-auto px-6 py-8" data-v-e5274d03><div class="glass-card-enhanced rounded-3xl p-8 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-e5274d03><div class="text-center" data-v-e5274d03><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/40 mb-6" data-v-e5274d03><i class="bi bi-grid-3x3-gap text-white text-3xl" data-v-e5274d03></i></div><h1 class="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4" data-v-e5274d03><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-e5274d03>产品中心</span></h1><p class="text-gray-300 text-xl max-w-2xl mx-auto" data-v-e5274d03>专业的PC硬件产品，为您的项目提供可靠的解决方案</p></div></div></div></section><section class="relative z-10" data-v-e5274d03><div class="container mx-auto px-6 py-6" data-v-e5274d03><div class="glass-card-enhanced rounded-2xl p-8 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-e5274d03>`);
      _push(ssrRenderComponent(_component_SteamCarousel, null, null, _parent));
      _push(`</div></div></section><div class="sticky top-0 z-40 backdrop-blur-xl border-b border-cyan-400/20" data-v-e5274d03><div class="container mx-auto px-6 py-4" data-v-e5274d03><div class="glass-card-enhanced rounded-xl p-6 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-e5274d03><div class="mb-6" data-v-e5274d03><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-3" data-v-e5274d03><div class="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg" data-v-e5274d03><i class="bi bi-funnel text-white" data-v-e5274d03></i></div><span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-e5274d03>产品分类</span></h3><div class="flex flex-wrap gap-3" data-v-e5274d03><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<button class="${ssrRenderClass([
          "flex items-center px-5 py-3 rounded-xl font-semibold transition-all duration-300 border backdrop-blur-sm",
          unref(selectedCategory) === cat.id ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border-cyan-400/50 shadow-lg shadow-cyan-500/30" : "bg-gray-800/30 text-gray-300 border-gray-600/30 hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-500/10"
        ])}" data-v-e5274d03><i class="${ssrRenderClass([cat.icon, "mr-2 text-lg"])}" data-v-e5274d03></i><span data-v-e5274d03>${ssrInterpolate(cat.name)}</span>`);
        if (cat.count > 0) {
          _push(`<span class="ml-2 text-sm opacity-75 px-2 py-1 bg-black/20 rounded-full" data-v-e5274d03>(${ssrInterpolate(cat.count)})</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-e5274d03><div data-v-e5274d03><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-e5274d03><i class="bi bi-bookmark text-cyan-400" data-v-e5274d03></i> 品牌 </label><select class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-e5274d03><option value="all" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), "all") : ssrLooseEqual(unref(selectedBrand), "all")) ? " selected" : ""}>全部品牌</option><!--[-->`);
      ssrRenderList(unref(brands), (brand) => {
        _push(`<option${ssrRenderAttr("value", brand.id)} class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), brand.id) : ssrLooseEqual(unref(selectedBrand), brand.id)) ? " selected" : ""}>${ssrInterpolate(brand.name)} (${ssrInterpolate(brand.count)}) </option>`);
      });
      _push(`<!--]--></select></div><div data-v-e5274d03><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-e5274d03><i class="bi bi-currency-dollar text-green-400" data-v-e5274d03></i> 价格区间 </label><select class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-e5274d03><option value="" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "") : ssrLooseEqual(unref(priceRange), "")) ? " selected" : ""}>任意价格</option><option value="0-3600" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "0-3600") : ssrLooseEqual(unref(priceRange), "0-3600")) ? " selected" : ""}>3600元以下</option><option value="3600-7200" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "3600-7200") : ssrLooseEqual(unref(priceRange), "3600-7200")) ? " selected" : ""}>3600-7200元</option><option value="7200-10800" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "7200-10800") : ssrLooseEqual(unref(priceRange), "7200-10800")) ? " selected" : ""}>7200-10800元</option><option value="10800-14400" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "10800-14400") : ssrLooseEqual(unref(priceRange), "10800-14400")) ? " selected" : ""}>10800-14400元</option><option value="14400-99999" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "14400-99999") : ssrLooseEqual(unref(priceRange), "14400-99999")) ? " selected" : ""}>14400元以上</option></select></div><div data-v-e5274d03><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-e5274d03><i class="bi bi-sort-down text-purple-400" data-v-e5274d03></i> 排序 </label><select class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-e5274d03><option value="" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "") : ssrLooseEqual(unref(sortBy), "")) ? " selected" : ""}>推荐</option><option value="price_asc" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price_asc") : ssrLooseEqual(unref(sortBy), "price_asc")) ? " selected" : ""}>价格：从低到高</option><option value="price_desc" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price_desc") : ssrLooseEqual(unref(sortBy), "price_desc")) ? " selected" : ""}>价格：从高到低</option><option value="rating" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "rating") : ssrLooseEqual(unref(sortBy), "rating")) ? " selected" : ""}>评分最高</option><option value="newest" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "newest") : ssrLooseEqual(unref(sortBy), "newest")) ? " selected" : ""}>最新发布</option><option value="popular" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "popular") : ssrLooseEqual(unref(sortBy), "popular")) ? " selected" : ""}>最受欢迎</option></select></div><div data-v-e5274d03><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-e5274d03><i class="bi bi-search text-yellow-400" data-v-e5274d03></i> 搜索产品 </label><input${ssrRenderAttr("value", unref(searchTerm))} placeholder="输入产品名称..." class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm placeholder-gray-400 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-e5274d03></div></div><div class="mt-6 flex justify-end" data-v-e5274d03><button class="px-6 py-3 text-sm font-semibold text-gray-300 bg-gray-800/30 border border-gray-600/50 rounded-xl hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm" data-v-e5274d03><i class="bi bi-arrow-clockwise" data-v-e5274d03></i> 重置筛选 </button></div></div></div></div><main class="container mx-auto px-6 py-8 relative z-10" data-v-e5274d03><div class="glass-card-enhanced rounded-xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 mb-6 backdrop-blur-xl" data-v-e5274d03><div class="px-6 py-4 flex items-center justify-between border-b border-gray-700/50" data-v-e5274d03><div class="flex items-center" data-v-e5274d03><h2 class="text-xl font-bold text-white" data-v-e5274d03>${ssrInterpolate(getCategoryName(unref(selectedCategory)))}</h2><span class="ml-3 text-sm text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30" data-v-e5274d03>(${ssrInterpolate(unref(meta).total)} 个产品)</span></div><div class="text-sm text-gray-400" data-v-e5274d03> 找到 <span class="text-cyan-400 font-semibold" data-v-e5274d03>${ssrInterpolate(unref(meta).total)}</span> 个符合条件的产品 </div></div></div>`);
      if (!unref(loading)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-e5274d03><!--[-->`);
        ssrRenderList(unref(products), (product2) => {
          _push(`<div class="glass-card-enhanced rounded-xl border border-cyan-400/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 group overflow-hidden backdrop-blur-xl" data-v-e5274d03><div class="relative h-48 bg-gradient-to-br from-gray-800/60 to-gray-900/60" data-v-e5274d03>`);
          if (product2.image) {
            _push(`<div class="product-list-image-container" data-v-e5274d03><img${ssrRenderAttr("src", product2.image)}${ssrRenderAttr("alt", product2.name)} class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 filter drop-shadow-lg" data-v-e5274d03></div>`);
          } else {
            _push(`<div class="product-list-placeholder" data-v-e5274d03><div class="product-icon-wrapper" data-v-e5274d03><i class="${ssrRenderClass([getProductIcon(product2.category), "product-icon"])}" data-v-e5274d03></i><div class="product-icon-glow" data-v-e5274d03></div></div><span class="product-category-name" data-v-e5274d03>${ssrInterpolate(getCategoryDisplayName(product2.category))}</span></div>`);
          }
          if (product2.originalPrice && product2.originalPrice > product2.price) {
            _push(`<div class="absolute top-3 left-3 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-red-500/40 animate-pulse" data-v-e5274d03><i class="bi bi-lightning-fill mr-1" data-v-e5274d03></i> -${ssrInterpolate(Math.round((1 - product2.price / product2.originalPrice) * 100))}% </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="absolute top-3 right-3" data-v-e5274d03>`);
          if (!product2.inStock) {
            _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/30 text-red-200 border border-red-400/50 shadow-lg shadow-red-500/30 backdrop-blur-sm" data-v-e5274d03><i class="bi bi-x-circle-fill mr-1" data-v-e5274d03></i>缺货 </span>`);
          } else if (product2.stockCount <= 5) {
            _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/30 text-orange-200 border border-orange-400/50 shadow-lg shadow-orange-500/30 backdrop-blur-sm animate-pulse" data-v-e5274d03><i class="bi bi-exclamation-triangle-fill mr-1" data-v-e5274d03></i>剩余${ssrInterpolate(product2.stockCount)}</span>`);
          } else {
            _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/30 backdrop-blur-sm" data-v-e5274d03><i class="bi bi-check-circle-fill mr-1" data-v-e5274d03></i>现货 </span>`);
          }
          _push(`</div></div><div class="p-6" data-v-e5274d03><div class="mb-4" data-v-e5274d03><div class="flex items-center justify-between mb-3" data-v-e5274d03><span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border border-cyan-400/40 shadow-lg backdrop-blur-sm" data-v-e5274d03><i class="bi bi-award mr-1" data-v-e5274d03></i> ${ssrInterpolate(product2.brand)}</span></div><h3 class="font-bold text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300" data-v-e5274d03>${ssrInterpolate(product2.name)}</h3><p class="text-gray-400 text-sm leading-relaxed line-clamp-2" data-v-e5274d03>${ssrInterpolate(product2.description)}</p></div><div class="flex items-center gap-2 mb-4 p-3 bg-gray-800/40 rounded-lg border border-gray-700/30 backdrop-blur-sm" data-v-e5274d03><div class="flex" data-v-e5274d03><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<i class="${ssrRenderClass([i <= product2.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-sm drop-shadow-lg"])}" data-v-e5274d03></i>`);
          });
          _push(`<!--]--></div><span class="text-sm font-bold text-white" data-v-e5274d03>${ssrInterpolate(product2.rating)}</span><span class="text-xs text-gray-400" data-v-e5274d03>(${ssrInterpolate(product2.reviewCount)})</span></div><div class="space-y-2 mb-4" data-v-e5274d03><!--[-->`);
          ssrRenderList(getMainSpecs(product2), (value, key) => {
            _push(`<div class="flex justify-between items-center p-3 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-lg text-sm border border-gray-600/30 backdrop-blur-sm" data-v-e5274d03><span class="text-gray-300 font-medium" data-v-e5274d03>${ssrInterpolate(translateSpecKey(key))}</span><span class="font-bold text-white" data-v-e5274d03>${ssrInterpolate(value)}</span></div>`);
          });
          _push(`<!--]--></div><div class="flex flex-wrap gap-2 mb-4" data-v-e5274d03><!--[-->`);
          ssrRenderList(product2.features.slice(0, 3), (feature) => {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm" data-v-e5274d03>${ssrInterpolate(translateFeature(feature))}</span>`);
          });
          _push(`<!--]--></div><div class="border-t border-gray-700/50 pt-4" data-v-e5274d03><div class="flex items-center justify-between mb-4" data-v-e5274d03><div data-v-e5274d03><div class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-e5274d03> $${ssrInterpolate(product2.price.toLocaleString())}</div>`);
          if (product2.originalPrice && product2.originalPrice > product2.price) {
            _push(`<div class="text-sm text-gray-500 line-through" data-v-e5274d03> MSRP $${ssrInterpolate(product2.originalPrice.toLocaleString())}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-right text-xs text-gray-400" data-v-e5274d03><div data-v-e5274d03>发布日期</div><div class="text-cyan-400" data-v-e5274d03>${ssrInterpolate(formatDate(product2.releaseDate))}</div></div></div><div class="grid grid-cols-2 gap-3" data-v-e5274d03><button class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-e5274d03> 查看详情 </button><button class="px-4 py-2 border border-gray-600/50 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-300 text-sm font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-1 backdrop-blur-sm" data-v-e5274d03><i class="bi bi-heart" data-v-e5274d03></i> 收藏 </button></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="text-center py-16" data-v-e5274d03><div class="inline-flex flex-col items-center glass-card-enhanced rounded-xl border border-cyan-400/40 p-12 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-e5274d03><div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6" data-v-e5274d03></div><p class="text-xl font-bold text-white" data-v-e5274d03>正在加载产品...</p><p class="text-gray-400 mt-2" data-v-e5274d03>请稍候</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && unref(products).length === 0) {
        _push(`<div class="text-center py-16" data-v-e5274d03><div class="glass-card-enhanced rounded-xl border border-cyan-400/40 p-16 shadow-2xl shadow-cyan-500/25 max-w-md mx-auto backdrop-blur-xl" data-v-e5274d03><div class="text-8xl mb-8 text-cyan-400/50" data-v-e5274d03><i class="bi bi-inbox" data-v-e5274d03></i></div><h3 class="text-2xl font-bold text-white mb-4" data-v-e5274d03>未找到产品</h3><p class="text-gray-400 mb-8 text-lg" data-v-e5274d03>请尝试调整筛选条件或搜索关键词</p><button class="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-e5274d03><i class="bi bi-arrow-clockwise mr-2" data-v-e5274d03></i> 重置筛选 </button></div></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e5274d03"]]);
export {
  index as default
};
//# sourceMappingURL=index-Bx9YYt0O.js.map
