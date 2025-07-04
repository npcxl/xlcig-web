import { _ as __nuxt_component_0 } from "./AppLogo-C8xp92Ad.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-Dq0IxfZC.js";
import { ref, computed, readonly, mergeProps, unref, useSSRContext, withCtx, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _export_sfc, a as useRouter } from "../server.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/hookable/dist/index.mjs";
import "./apiClient-Hs_n9WkJ.js";
import { u as useHead } from "./v3-B75LsvLO.js";
import "D:/codeGitee/xlcig-web/frontend/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlcig-web/frontend/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlcig-web/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/codeGitee/xlcig-web/frontend/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/klona/dist/index.mjs";
import "D:/codeGitee/xlcig-web/frontend/node_modules/@unhead/vue/dist/index.mjs";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "steam-carousel-container" }, _attrs))} data-v-e826ad3e><div class="particle-system" data-v-e826ad3e><!--[-->`);
      ssrRenderList(50, (i) => {
        _push(`<div class="particle" style="${ssrRenderStyle({
          "--delay": `${Math.random() * 5}s`,
          "--duration": `${3 + Math.random() * 4}s`,
          "--x": `${Math.random() * 100}%`,
          "--y": `${Math.random() * 100}%`,
          "--size": `${2 + Math.random() * 3}px`
        })}" data-v-e826ad3e></div>`);
      });
      _push(`<!--]--></div><div class="carousel-background" data-v-e826ad3e><div class="bg-pattern" data-v-e826ad3e></div><div class="bg-glow-1" data-v-e826ad3e></div><div class="bg-glow-2" data-v-e826ad3e></div><div class="bg-glow-3" data-v-e826ad3e></div><div class="light-sweep" data-v-e826ad3e></div><div class="energy-field" data-v-e826ad3e></div></div><div class="text-center mb-16" data-v-e826ad3e><h3 class="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4" data-v-e826ad3e><i class="bi bi-gpu-card text-cyan-400 shadow-lg shadow-cyan-400/50 text-6xl pulse-icon" data-v-e826ad3e></i> RTX 50系列显卡 </h3><p class="text-gray-300 text-xl" data-v-e826ad3e>下一代AI游戏的革命性体验</p><div class="title-underline" data-v-e826ad3e></div></div><div class="carousel-3d-scene" data-v-e826ad3e><div class="carousel-environment" data-v-e826ad3e><div class="env-ring ring-1" data-v-e826ad3e></div><div class="env-ring ring-2" data-v-e826ad3e></div><div class="env-ring ring-3" data-v-e826ad3e></div></div><div class="carousel-3d-stage" style="${ssrRenderStyle({ transform: `rotateY(${unref(rotation)}deg)` })}" data-v-e826ad3e><!--[-->`);
      ssrRenderList(unref(gpus), (gpu, index2) => {
        _push(`<div class="${ssrRenderClass([{ "active": index2 === unref(currentIndex) }, "carousel-3d-item"])}" style="${ssrRenderStyle({
          transform: `rotateY(${index2 * (360 / unref(gpus).length)}deg) translateZ(500px)`,
          "--delay": `${index2 * 0.1}s`,
          "--rotation": `${index2 * (360 / unref(gpus).length)}deg`
        })}" tabindex="0"${ssrRenderAttr("aria-label", `显卡: ${gpu.title}`)} data-v-e826ad3e><div class="game-cover glass-morphism-enhanced" data-v-e826ad3e><div class="hologram-effect" data-v-e826ad3e></div>`);
        if (gpu.image) {
          _push(`<div class="gpu-image-container" data-v-e826ad3e><img${ssrRenderAttr("src", gpu.image)}${ssrRenderAttr("alt", gpu.title)} loading="lazy" data-v-e826ad3e></div>`);
        } else {
          _push(`<div class="gpu-placeholder" data-v-e826ad3e><i class="bi bi-gpu-card" data-v-e826ad3e></i><span class="gpu-model-name" data-v-e826ad3e>${ssrInterpolate(gpu.title)}</span></div>`);
        }
        _push(`<div class="game-glow" data-v-e826ad3e></div><div class="glass-overlay-advanced" data-v-e826ad3e></div><div class="glass-reflection-advanced" data-v-e826ad3e></div><div class="${ssrRenderClass([{ "scanning": index2 === unref(currentIndex) }, "light-scan-advanced"])}" data-v-e826ad3e></div><div class="game-info-advanced" data-v-e826ad3e><h4 class="game-title-advanced" data-v-e826ad3e>${ssrInterpolate(gpu.title)}</h4><p class="game-genre-advanced" data-v-e826ad3e>${ssrInterpolate(gpu.model)}</p><div class="game-stats-advanced" data-v-e826ad3e><div class="game-rating-advanced" data-v-e826ad3e><i class="bi bi-star-fill" data-v-e826ad3e></i><span data-v-e826ad3e>${ssrInterpolate(gpu.rating)}</span></div><div class="game-year-advanced" data-v-e826ad3e>${ssrInterpolate(gpu.releaseYear)}</div></div></div><div class="game-price-advanced" data-v-e826ad3e>`);
        if (gpu.originalPrice > 0) {
          _push(`<span class="original-price-advanced" data-v-e826ad3e>¥${ssrInterpolate(gpu.originalPrice)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="sale-price-advanced" data-v-e826ad3e>${ssrInterpolate(gpu.salePrice > 0 ? `¥${gpu.salePrice}` : "免费")}</span></div><div class="active-border-advanced" style="${ssrRenderStyle(index2 === unref(currentIndex) ? null : { display: "none" })}" data-v-e826ad3e></div><div class="glass-frame-advanced" data-v-e826ad3e><div class="glass-corner-advanced top-left" data-v-e826ad3e></div><div class="glass-corner-advanced top-right" data-v-e826ad3e></div><div class="glass-corner-advanced bottom-left" data-v-e826ad3e></div><div class="glass-corner-advanced bottom-right" data-v-e826ad3e></div></div><div class="energy-orbs" data-v-e826ad3e><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="energy-orb" style="${ssrRenderStyle({ "--index": i })}" data-v-e826ad3e></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="carousel-controls-advanced" role="navigation" aria-label="显卡轮播控制" data-v-e826ad3e><button class="control-btn-advanced prev glass-button-advanced" aria-label="上一个显卡" tabindex="0" data-v-e826ad3e><i class="bi bi-chevron-left" aria-hidden="true" data-v-e826ad3e></i><div class="button-glow" data-v-e826ad3e></div></button><div class="game-indicators-advanced" role="tablist" aria-label="显卡选择指示器" data-v-e826ad3e><!--[-->`);
      ssrRenderList(unref(gpus), (gpu, index2) => {
        _push(`<button class="${ssrRenderClass([{ "active": index2 === unref(currentIndex) }, "indicator-advanced"])}" role="tab"${ssrRenderAttr("aria-selected", index2 === unref(currentIndex))}${ssrRenderAttr("aria-label", `选择显卡: ${gpu.title}`)}${ssrRenderAttr("tabindex", index2 === unref(currentIndex) ? 0 : -1)} data-v-e826ad3e><div class="indicator-inner" data-v-e826ad3e></div><div class="indicator-ripple" data-v-e826ad3e></div><span class="indicator-tooltip-advanced" data-v-e826ad3e>${ssrInterpolate(gpu.title)}</span></button>`);
      });
      _push(`<!--]--></div><button class="control-btn-advanced next glass-button-advanced" aria-label="下一个显卡" tabindex="0" data-v-e826ad3e><i class="bi bi-chevron-right" aria-hidden="true" data-v-e826ad3e></i><div class="button-glow" data-v-e826ad3e></div></button></div><div class="current-game-info-advanced" role="main" aria-label="当前选中显卡详情" data-v-e826ad3e><div class="glass-card-premium rounded-2xl p-10 max-w-6xl mx-auto border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-e826ad3e><div class="grid md:grid-cols-5 gap-10 items-center" data-v-e826ad3e><div class="md:col-span-2" data-v-e826ad3e><div class="game-detail-cover-advanced" data-v-e826ad3e>`);
      if (unref(selectedGpu).image) {
        _push(`<div class="detail-image-container" data-v-e826ad3e><img${ssrRenderAttr("src", unref(selectedGpu).image)}${ssrRenderAttr("alt", `${unref(selectedGpu).title} 显卡封面`)} class="w-full rounded-lg shadow-lg" loading="lazy" data-v-e826ad3e></div>`);
      } else {
        _push(`<div class="detail-gpu-placeholder" data-v-e826ad3e><i class="bi bi-gpu-card" data-v-e826ad3e></i><span class="detail-gpu-name" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).title)}</span><span class="detail-gpu-model" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).model)}</span></div>`);
      }
      _push(`<div class="cover-overlay-advanced" data-v-e826ad3e><button class="play-button-advanced" aria-label="在Steam上查看显卡" tabindex="0" data-v-e826ad3e><i class="bi bi-play-fill" aria-hidden="true" data-v-e826ad3e></i><div class="play-ripple" data-v-e826ad3e></div></button></div><div class="detail-glass-overlay-advanced" data-v-e826ad3e></div><div class="cover-energy-field" data-v-e826ad3e></div></div></div><div class="md:col-span-3" data-v-e826ad3e><header data-v-e826ad3e><h2 class="text-4xl font-bold text-white mb-6 neon-text-advanced" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).title)}</h2></header><p class="text-gray-300 text-lg mb-8 leading-relaxed" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).description)}</p><div class="game-badges-advanced mb-8" role="list" aria-label="显卡信息标签" data-v-e826ad3e><span class="badge-advanced genre-badge" role="listitem" data-v-e826ad3e><i class="bi bi-tag" aria-hidden="true" data-v-e826ad3e></i><span class="sr-only" data-v-e826ad3e>显卡类型：</span>${ssrInterpolate(unref(selectedGpu).model)}</span><span class="badge-advanced rating-badge" role="listitem" data-v-e826ad3e><i class="bi bi-star-fill" aria-hidden="true" data-v-e826ad3e></i><span class="sr-only" data-v-e826ad3e>评分：</span>${ssrInterpolate(unref(selectedGpu).rating)}</span><span class="badge-advanced year-badge" role="listitem" data-v-e826ad3e><i class="bi bi-calendar" aria-hidden="true" data-v-e826ad3e></i><span class="sr-only" data-v-e826ad3e>发布年份：</span>${ssrInterpolate(unref(selectedGpu).releaseYear)}</span></div><div class="gpu-specs-grid mb-8" data-v-e826ad3e><div class="spec-item" data-v-e826ad3e><i class="bi bi-memory text-cyan-400" data-v-e826ad3e></i><span class="spec-label" data-v-e826ad3e>显存</span><span class="spec-value" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).specs.memory)}</span></div><div class="spec-item" data-v-e826ad3e><i class="bi bi-cpu text-cyan-400" data-v-e826ad3e></i><span class="spec-label" data-v-e826ad3e>CUDA核心</span><span class="spec-value" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).specs.cores)}</span></div><div class="spec-item" data-v-e826ad3e><i class="bi bi-speedometer2 text-cyan-400" data-v-e826ad3e></i><span class="spec-label" data-v-e826ad3e>加速频率</span><span class="spec-value" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).specs.boost)}</span></div><div class="spec-item" data-v-e826ad3e><i class="bi bi-lightning text-cyan-400" data-v-e826ad3e></i><span class="spec-label" data-v-e826ad3e>功耗</span><span class="spec-value" data-v-e826ad3e>${ssrInterpolate(unref(selectedGpu).specs.power)}</span></div></div><div class="gpu-features mb-8" data-v-e826ad3e><h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2" data-v-e826ad3e><i class="bi bi-gear-fill text-cyan-400" data-v-e826ad3e></i> 核心特性 </h4><div class="feature-tags" data-v-e826ad3e><!--[-->`);
      ssrRenderList(unref(selectedGpu).features, (feature) => {
        _push(`<span class="feature-tag" data-v-e826ad3e><i class="bi bi-check-circle-fill text-green-400" data-v-e826ad3e></i> ${ssrInterpolate(feature)}</span>`);
      });
      _push(`<!--]--></div></div><div class="flex items-center justify-between" data-v-e826ad3e><div class="price-section-advanced" role="region" aria-label="价格信息" data-v-e826ad3e>`);
      if (unref(selectedGpu).originalPrice > 0) {
        _push(`<span class="text-gray-400 text-xl line-through mr-4" aria-label="原价" data-v-e826ad3e>¥${ssrInterpolate(unref(selectedGpu).originalPrice.toLocaleString())}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-4xl font-bold text-cyan-400 neon-text-price" aria-label="当前价格" data-v-e826ad3e>¥${ssrInterpolate(unref(selectedGpu).salePrice.toLocaleString())}</span>`);
      if (unref(selectedGpu).originalPrice > 0 && unref(selectedGpu).salePrice > 0) {
        _push(`<span class="text-green-400 text-lg ml-4 discount-badge" aria-label="折扣" data-v-e826ad3e> -${ssrInterpolate(Math.round((1 - unref(selectedGpu).salePrice / unref(selectedGpu).originalPrice) * 100))}% </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="btn-premium-advanced px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 relative overflow-hidden" aria-label="查看显卡详情" tabindex="0" data-v-e826ad3e><i class="bi bi-eye mr-3" aria-hidden="true" data-v-e826ad3e></i> 查看详情 <div class="btn-energy-field" data-v-e826ad3e></div></button></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SteamCarousel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e826ad3e"]]);
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
    const getMainSpecs = (product) => {
      const specs = product.specs || {};
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
      const _component_AppLogo = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_SteamCarousel = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative" }, _attrs))} data-v-43890541><div class="bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" data-v-43890541><div class="fixed inset-0 pointer-events-none" data-v-43890541><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-43890541></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-43890541></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-spin-slow" data-v-43890541></div></div><section class="relative z-10" data-v-43890541><div class="container mx-auto px-6 py-8" data-v-43890541><div class="glass-card-dark rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-43890541><div class="flex items-center justify-between" data-v-43890541><div class="flex items-center space-x-6" data-v-43890541>`);
      _push(ssrRenderComponent(_component_AppLogo, {
        size: "medium",
        "show-decorations": false
      }, null, _parent));
      _push(`<div class="h-6 w-px bg-gray-600" data-v-43890541></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-house-door mr-2 text-lg" data-v-43890541${_scopeId}></i><span class="text-sm font-medium" data-v-43890541${_scopeId}>首页</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-house-door mr-2 text-lg" }),
              createVNode("span", { class: "text-sm font-medium" }, "首页")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="text-sm text-gray-400" data-v-43890541><span data-v-43890541>首页</span><i class="bi bi-chevron-right mx-2 text-cyan-400" data-v-43890541></i><span class="text-white font-medium" data-v-43890541>产品中心</span></nav></div><div class="mt-6" data-v-43890541><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-43890541><i class="bi bi-grid-3x3-gap text-cyan-400 text-3xl" data-v-43890541></i> 产品中心 </h1><p class="text-gray-300 text-lg" data-v-43890541>专业的PC硬件产品，为您的项目提供可靠的解决方案</p></div></div></div></section><section class="relative z-10" data-v-43890541><div class="container mx-auto px-6 py-6" data-v-43890541><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-43890541>`);
      _push(ssrRenderComponent(_component_SteamCarousel, null, null, _parent));
      _push(`</div></div></section><div class="h-40 bg-gradient-to-b from-transparent via-gray-800/20 via-gray-700/40 via-gray-600/60 to-gray-100 relative z-10" data-v-43890541></div></div><div class="bg-gray-100 min-h-screen relative" data-v-43890541><div class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200" data-v-43890541><div class="container mx-auto px-6 py-4" data-v-43890541><div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200" data-v-43890541><div class="mb-6" data-v-43890541><h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2" data-v-43890541><i class="bi bi-funnel text-blue-600" data-v-43890541></i> 产品分类 </h3><div class="flex flex-wrap gap-3" data-v-43890541><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<button class="${ssrRenderClass([
          "flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300",
          unref(selectedCategory) === cat.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
        ])}" data-v-43890541><i class="${ssrRenderClass([cat.icon, "mr-2 text-lg"])}" data-v-43890541></i><span data-v-43890541>${ssrInterpolate(cat.name)}</span><span class="ml-2 text-sm opacity-75" data-v-43890541>(${ssrInterpolate(cat.count)})</span></button>`);
      });
      _push(`<!--]--></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-43890541><div data-v-43890541><label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2" data-v-43890541><i class="bi bi-bookmark text-blue-600" data-v-43890541></i> 品牌 </label><select class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm" data-v-43890541><option value="all" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), "all") : ssrLooseEqual(unref(selectedBrand), "all")) ? " selected" : ""}>全部品牌</option><!--[-->`);
      ssrRenderList(unref(brands), (brand) => {
        _push(`<option${ssrRenderAttr("value", brand.id)} data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), brand.id) : ssrLooseEqual(unref(selectedBrand), brand.id)) ? " selected" : ""}>${ssrInterpolate(brand.name)} (${ssrInterpolate(brand.count)}) </option>`);
      });
      _push(`<!--]--></select></div><div data-v-43890541><label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2" data-v-43890541><i class="bi bi-currency-dollar text-blue-600" data-v-43890541></i> 价格区间 </label><select class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm" data-v-43890541><option value="" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "") : ssrLooseEqual(unref(priceRange), "")) ? " selected" : ""}>任意价格</option><option value="0-3600" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "0-3600") : ssrLooseEqual(unref(priceRange), "0-3600")) ? " selected" : ""}>3600元以下</option><option value="3600-7200" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "3600-7200") : ssrLooseEqual(unref(priceRange), "3600-7200")) ? " selected" : ""}>3600-7200元</option><option value="7200-10800" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "7200-10800") : ssrLooseEqual(unref(priceRange), "7200-10800")) ? " selected" : ""}>7200-10800元</option><option value="10800-14400" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "10800-14400") : ssrLooseEqual(unref(priceRange), "10800-14400")) ? " selected" : ""}>10800-14400元</option><option value="14400-99999" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "14400-99999") : ssrLooseEqual(unref(priceRange), "14400-99999")) ? " selected" : ""}>14400元以上</option></select></div><div data-v-43890541><label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2" data-v-43890541><i class="bi bi-sort-down text-blue-600" data-v-43890541></i> 排序 </label><select class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm" data-v-43890541><option value="" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "") : ssrLooseEqual(unref(sortBy), "")) ? " selected" : ""}>推荐</option><option value="price_asc" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price_asc") : ssrLooseEqual(unref(sortBy), "price_asc")) ? " selected" : ""}>价格：从低到高</option><option value="price_desc" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price_desc") : ssrLooseEqual(unref(sortBy), "price_desc")) ? " selected" : ""}>价格：从高到低</option><option value="rating" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "rating") : ssrLooseEqual(unref(sortBy), "rating")) ? " selected" : ""}>评分最高</option><option value="newest" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "newest") : ssrLooseEqual(unref(sortBy), "newest")) ? " selected" : ""}>最新发布</option><option value="popular" data-v-43890541${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "popular") : ssrLooseEqual(unref(sortBy), "popular")) ? " selected" : ""}>最受欢迎</option></select></div><div data-v-43890541><label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2" data-v-43890541><i class="bi bi-search text-blue-600" data-v-43890541></i> 搜索产品 </label><input${ssrRenderAttr("value", unref(searchTerm))} placeholder="输入产品名称..." class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm placeholder-gray-500" data-v-43890541></div></div><div class="mt-4 flex justify-end" data-v-43890541><button class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 flex items-center gap-2" data-v-43890541><i class="bi bi-arrow-clockwise" data-v-43890541></i> 重置筛选 </button></div></div></div></div><main class="container mx-auto px-6 py-8" data-v-43890541><div class="bg-white rounded-xl shadow-lg border border-gray-200 mb-6" data-v-43890541><div class="px-6 py-4 flex items-center justify-between border-b border-gray-200" data-v-43890541><div class="flex items-center" data-v-43890541><h2 class="text-xl font-semibold text-gray-800" data-v-43890541>${ssrInterpolate(getCategoryName(unref(selectedCategory)))}</h2><span class="ml-3 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full" data-v-43890541>(${ssrInterpolate(unref(meta).total)} 个产品)</span></div><div class="text-sm text-gray-500" data-v-43890541> 找到 ${ssrInterpolate(unref(meta).total)} 个符合条件的产品 </div></div></div>`);
      if (!unref(loading)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-43890541><!--[-->`);
        ssrRenderList(unref(products), (product) => {
          _push(`<div class="bg-white rounded-xl shadow-lg border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group overflow-hidden" data-v-43890541><div class="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100" data-v-43890541>`);
          if (product.image) {
            _push(`<div class="product-list-image-container" data-v-43890541><img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" data-v-43890541></div>`);
          } else {
            _push(`<div class="product-list-placeholder-light" data-v-43890541><i class="${ssrRenderClass(getProductIcon(product.category))}" data-v-43890541></i><span class="product-category-name-light" data-v-43890541>${ssrInterpolate(getCategoryDisplayName(product.category))}</span></div>`);
          }
          if (product.originalPrice && product.originalPrice > product.price) {
            _push(`<div class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold" data-v-43890541> -${ssrInterpolate(Math.round((1 - product.price / product.originalPrice) * 100))}% </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="absolute top-3 right-3" data-v-43890541>`);
          if (!product.inStock) {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-200" data-v-43890541><i class="bi bi-x-circle mr-1" data-v-43890541></i>缺货 </span>`);
          } else if (product.stockCount <= 5) {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600 border border-orange-200" data-v-43890541><i class="bi bi-exclamation-triangle mr-1" data-v-43890541></i>剩余${ssrInterpolate(product.stockCount)}</span>`);
          } else {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 border border-green-200" data-v-43890541><i class="bi bi-check-circle mr-1" data-v-43890541></i>现货 </span>`);
          }
          _push(`</div></div><div class="p-6" data-v-43890541><div class="mb-4" data-v-43890541><div class="flex items-center justify-between mb-3" data-v-43890541><span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-600 border border-blue-200" data-v-43890541>${ssrInterpolate(product.brand)}</span></div><h3 class="font-semibold text-gray-800 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200" data-v-43890541>${ssrInterpolate(product.name)}</h3><p class="text-gray-600 text-sm leading-relaxed line-clamp-2" data-v-43890541>${ssrInterpolate(product.description)}</p></div><div class="flex items-center gap-2 mb-4" data-v-43890541><div class="flex" data-v-43890541><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<i class="${ssrRenderClass([i <= product.rating ? "text-yellow-400" : "text-gray-300", "bi bi-star-fill text-sm"])}" data-v-43890541></i>`);
          });
          _push(`<!--]--></div><span class="text-sm font-medium text-gray-800" data-v-43890541>${ssrInterpolate(product.rating)}</span><span class="text-xs text-gray-500" data-v-43890541>(${ssrInterpolate(product.reviewCount)})</span></div><div class="space-y-2 mb-4" data-v-43890541><!--[-->`);
          ssrRenderList(getMainSpecs(product), (value, key) => {
            _push(`<div class="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-sm border border-gray-100" data-v-43890541><span class="text-gray-600 font-medium" data-v-43890541>${ssrInterpolate(translateSpecKey(key))}</span><span class="font-semibold text-gray-800" data-v-43890541>${ssrInterpolate(value)}</span></div>`);
          });
          _push(`<!--]--></div><div class="flex flex-wrap gap-2 mb-4" data-v-43890541><!--[-->`);
          ssrRenderList(product.features.slice(0, 3), (feature) => {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100" data-v-43890541>${ssrInterpolate(translateFeature(feature))}</span>`);
          });
          _push(`<!--]--></div><div class="border-t border-gray-200 pt-4" data-v-43890541><div class="flex items-center justify-between mb-4" data-v-43890541><div data-v-43890541><div class="text-2xl font-bold text-blue-600" data-v-43890541> $${ssrInterpolate(product.price.toLocaleString())}</div>`);
          if (product.originalPrice && product.originalPrice > product.price) {
            _push(`<div class="text-sm text-gray-500 line-through" data-v-43890541> MSRP $${ssrInterpolate(product.originalPrice.toLocaleString())}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-right text-xs text-gray-500" data-v-43890541><div data-v-43890541>发布日期</div><div data-v-43890541>${ssrInterpolate(formatDate(product.releaseDate))}</div></div></div><div class="grid grid-cols-2 gap-3" data-v-43890541><button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40" data-v-43890541> 查看详情 </button><button class="px-4 py-2 border border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-1" data-v-43890541><i class="bi bi-heart" data-v-43890541></i> 收藏 </button></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="text-center py-16" data-v-43890541><div class="inline-flex flex-col items-center bg-white rounded-xl border border-gray-200 p-12 shadow-lg" data-v-43890541><div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6" data-v-43890541></div><p class="text-xl font-medium text-gray-800" data-v-43890541>正在加载产品...</p><p class="text-gray-600 mt-2" data-v-43890541>请稍候</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && unref(products).length === 0) {
        _push(`<div class="text-center py-16" data-v-43890541><div class="bg-white rounded-xl border border-gray-200 p-16 shadow-lg max-w-md mx-auto" data-v-43890541><div class="text-8xl mb-8 text-blue-400 opacity-50" data-v-43890541><i class="bi bi-inbox" data-v-43890541></i></div><h3 class="text-2xl font-semibold text-gray-800 mb-4" data-v-43890541>未找到产品</h3><p class="text-gray-600 mb-8 text-lg" data-v-43890541>请尝试调整筛选条件或搜索关键词</p><button class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40" data-v-43890541><i class="bi bi-arrow-clockwise mr-2" data-v-43890541></i> 重置筛选 </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43890541"]]);
export {
  index as default
};
//# sourceMappingURL=index-yL8WFoul.js.map
