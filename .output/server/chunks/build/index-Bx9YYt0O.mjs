import { _ as __nuxt_component_0 } from './AppHeader-D4R1WNqE.mjs';
import { ref, mergeProps, unref, computed, readonly, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { b as useRouter } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useHead } from './v3-CcqVKkZz.mjs';
import './nuxt-link-qhU_stN5.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './AppLogo-B7Z3yKfV.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import './useLocation-DU515pZE.mjs';
import './apiClient-C7W98XI_.mjs';
import 'seemly';
import 'vooks';
import 'vdirs';
import 'css-render';
import '@css-render/plugin-bem';
import 'lodash-es';
import 'evtd';
import 'treemate';
import 'pinia';

const _sfc_main$1 = {
  __name: "SteamCarousel",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    useRouter();
    const gpus = ref([
      {
        id: 1,
        title: "RTX 5090",
        model: "\u65D7\u8230\u7EA7\u663E\u5361",
        rating: "9.8",
        releaseYear: "2025",
        originalPrice: 22999,
        salePrice: 19999,
        image: "",
        description: "\u9769\u547D\u6027Blackwell\u67B6\u6784\uFF0C32GB GDDR7\u663E\u5B58\uFF0C\u4E13\u4E3A8K\u6E38\u620F\u548CAI\u5E94\u7528\u800C\u751F\u3002\u652F\u6301\u6700\u65B0DLSS 4\u6280\u672F\uFF0C\u63D0\u4F9B\u524D\u6240\u672A\u6709\u7684\u6E38\u620F\u6027\u80FD\u548CAI\u52A0\u901F\u80FD\u529B\u3002",
        specs: {
          memory: "32GB GDDR7",
          cores: "21504 CUDA",
          boost: "2900 MHz",
          power: "600W"
        },
        features: ["DLSS 4", "8K\u6E38\u620F", "AI\u8D85\u91C7\u6837", "\u5B9E\u65F6\u5149\u8FFD"]
      },
      {
        id: 2,
        title: "RTX 5080",
        model: "\u9AD8\u7AEF\u6E38\u620F\u663E\u5361",
        rating: "9.5",
        releaseYear: "2025",
        originalPrice: 14999,
        salePrice: 12999,
        image: "",
        description: "\u6B21\u65D7\u8230\u7EA7\u6027\u80FD\uFF0C16GB GDDR7\u663E\u5B58\uFF0C\u5B8C\u7F8E\u652F\u63014K\u9AD8\u5E27\u7387\u6E38\u620F\u3002\u914D\u5907\u5148\u8FDB\u7684Ada Lovelace\u5347\u7EA7\u67B6\u6784\uFF0C\u4E3A\u9AD8\u7AEF\u6E38\u620F\u73A9\u5BB6\u63D0\u4F9B\u6781\u81F4\u4F53\u9A8C\u3002",
        specs: {
          memory: "16GB GDDR7",
          cores: "14080 CUDA",
          boost: "2700 MHz",
          power: "400W"
        },
        features: ["DLSS 4", "4K 120FPS", "\u5149\u8FFD\u4F18\u5316", "\u521B\u4F5C\u52A0\u901F"]
      },
      {
        id: 3,
        title: "RTX 5070 Ti",
        model: "\u6027\u80FD\u7EA7\u663E\u5361",
        rating: "9.2",
        releaseYear: "2025",
        originalPrice: 8999,
        salePrice: 7999,
        image: "",
        description: "\u4E3B\u6D41\u6027\u80FD\u738B\u8005\uFF0C12GB GDDR7\u663E\u5B58\uFF0C1440p\u6E38\u620F\u6700\u4F73\u9009\u62E9\u3002\u91C7\u7528\u6700\u65B0\u67B6\u6784\u4F18\u5316\uFF0C\u63D0\u4F9B\u51FA\u8272\u7684\u6027\u4EF7\u6BD4\u548C\u6E38\u620F\u8868\u73B0\u3002",
        specs: {
          memory: "12GB GDDR7",
          cores: "8960 CUDA",
          boost: "2600 MHz",
          power: "285W"
        },
        features: ["DLSS 4", "1440p\u6781\u81F4", "\u6548\u7387\u4F18\u5316", "\u6E29\u63A7\u51FA\u8272"]
      },
      {
        id: 4,
        title: "RTX 5070",
        model: "\u4E3B\u6D41\u6E38\u620F\u663E\u5361",
        rating: "8.9",
        releaseYear: "2025",
        originalPrice: 6999,
        salePrice: 5999,
        image: "",
        description: "\u4E3B\u6D41\u6E38\u620F\u65B0\u6807\u6746\uFF0C12GB GDDR6X\u663E\u5B58\uFF0C\u63D0\u4F9B1440p\u9AD8\u8BBE\u7F6E\u6E38\u620F\u4F53\u9A8C\u3002\u51FA\u8272\u7684\u80FD\u6548\u6BD4\u548C\u5148\u8FDB\u7684AI\u529F\u80FD\uFF0C\u6EE1\u8DB3\u5927\u591A\u6570\u73A9\u5BB6\u9700\u6C42\u3002",
        specs: {
          memory: "12GB GDDR6X",
          cores: "5888 CUDA",
          boost: "2500 MHz",
          power: "220W"
        },
        features: ["DLSS 4", "1440p\u9AD8\u753B\u8D28", "\u4F4E\u529F\u8017", "\u9759\u97F3\u8FD0\u884C"]
      },
      {
        id: 5,
        title: "RTX 5060 Ti",
        model: "\u5165\u95E8\u7EA7\u663E\u5361",
        rating: "8.6",
        releaseYear: "2025",
        originalPrice: 4999,
        salePrice: 3999,
        image: "",
        description: "\u5165\u95E8\u7EA7RTX\u4F53\u9A8C\uFF0C8GB GDDR6X\u663E\u5B58\uFF0C1080p\u5149\u8FFD\u6E38\u620F\u9996\u9009\u3002\u4E3A\u9884\u7B97\u6709\u9650\u7684\u73A9\u5BB6\u63D0\u4F9BRTX\u6280\u672F\u548CAI\u529F\u80FD\u4F53\u9A8C\u3002",
        specs: {
          memory: "8GB GDDR6X",
          cores: "4352 CUDA",
          boost: "2400 MHz",
          power: "165W"
        },
        features: ["DLSS 4", "1080p\u5149\u8FFD", "\u8282\u80FD\u8BBE\u8BA1", "\u8D85\u503C\u9009\u62E9"]
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
      _push(`<!--]--></div><div class="carousel-background" data-v-29472115><div class="bg-pattern" data-v-29472115></div><div class="bg-glow-1" data-v-29472115></div><div class="bg-glow-2" data-v-29472115></div><div class="bg-glow-3" data-v-29472115></div><div class="light-sweep" data-v-29472115></div><div class="energy-field" data-v-29472115></div></div><div class="text-center mb-16" data-v-29472115><h3 class="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4" data-v-29472115><i class="bi bi-gpu-card text-cyan-400 shadow-lg shadow-cyan-400/50 text-6xl pulse-icon" data-v-29472115></i> RTX 50\u7CFB\u5217\u663E\u5361 </h3><p class="text-gray-300 text-xl" data-v-29472115>\u4E0B\u4E00\u4EE3AI\u6E38\u620F\u7684\u9769\u547D\u6027\u4F53\u9A8C</p><div class="title-underline" data-v-29472115></div></div><div class="carousel-3d-scene" data-v-29472115><div class="carousel-environment" data-v-29472115><div class="env-ring ring-1" data-v-29472115></div><div class="env-ring ring-2" data-v-29472115></div><div class="env-ring ring-3" data-v-29472115></div></div><div class="carousel-3d-stage" style="${ssrRenderStyle({ transform: `rotateY(${unref(rotation)}deg)` })}" data-v-29472115><!--[-->`);
      ssrRenderList(unref(gpus), (gpu, index2) => {
        _push(`<div class="${ssrRenderClass([{ "active": index2 === unref(currentIndex) }, "carousel-3d-item"])}" style="${ssrRenderStyle({
          transform: `rotateY(${index2 * (360 / unref(gpus).length)}deg) translateZ(500px)`,
          "--delay": `${index2 * 0.1}s`,
          "--rotation": `${index2 * (360 / unref(gpus).length)}deg`
        })}" tabindex="0"${ssrRenderAttr("aria-label", `\u663E\u5361: ${gpu.title}`)} data-v-29472115><div class="game-cover glass-morphism-enhanced" data-v-29472115><div class="hologram-effect" data-v-29472115></div>`);
        if (gpu.image) {
          _push(`<div class="gpu-image-container" data-v-29472115><img${ssrRenderAttr("src", gpu.image)}${ssrRenderAttr("alt", gpu.title)} loading="lazy" data-v-29472115></div>`);
        } else {
          _push(`<div class="gpu-placeholder" data-v-29472115><i class="bi bi-gpu-card" data-v-29472115></i><span class="gpu-model-name" data-v-29472115>${ssrInterpolate(gpu.title)}</span></div>`);
        }
        _push(`<div class="game-glow" data-v-29472115></div><div class="glass-overlay-advanced" data-v-29472115></div><div class="glass-reflection-advanced" data-v-29472115></div><div class="${ssrRenderClass([{ "scanning": index2 === unref(currentIndex) }, "light-scan-advanced"])}" data-v-29472115></div><div class="game-info-advanced" data-v-29472115><h4 class="game-title-advanced" data-v-29472115>${ssrInterpolate(gpu.title)}</h4><p class="game-genre-advanced" data-v-29472115>${ssrInterpolate(gpu.model)}</p><div class="game-stats-advanced" data-v-29472115><div class="game-rating-advanced" data-v-29472115><i class="bi bi-star-fill" data-v-29472115></i><span data-v-29472115>${ssrInterpolate(gpu.rating)}</span></div><div class="game-year-advanced" data-v-29472115>${ssrInterpolate(gpu.releaseYear)}</div></div></div><div class="game-price-advanced" data-v-29472115>`);
        if (gpu.originalPrice > 0) {
          _push(`<span class="original-price-advanced" data-v-29472115>\xA5${ssrInterpolate(gpu.originalPrice)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="sale-price-advanced" data-v-29472115>${ssrInterpolate(gpu.salePrice > 0 ? `\xA5${gpu.salePrice}` : "\u514D\u8D39")}</span></div><div class="active-border-advanced" style="${ssrRenderStyle(index2 === unref(currentIndex) ? null : { display: "none" })}" data-v-29472115></div><div class="glass-frame-advanced" data-v-29472115><div class="glass-corner-advanced top-left" data-v-29472115></div><div class="glass-corner-advanced top-right" data-v-29472115></div><div class="glass-corner-advanced bottom-left" data-v-29472115></div><div class="glass-corner-advanced bottom-right" data-v-29472115></div></div><div class="energy-orbs" data-v-29472115><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="energy-orb" style="${ssrRenderStyle({ "--index": i })}" data-v-29472115></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="carousel-controls-advanced" role="navigation" aria-label="\u663E\u5361\u8F6E\u64AD\u63A7\u5236" data-v-29472115><button class="control-btn-advanced prev glass-button-advanced" aria-label="\u4E0A\u4E00\u4E2A\u663E\u5361" tabindex="0" data-v-29472115><i class="bi bi-chevron-left" aria-hidden="true" data-v-29472115></i><div class="button-glow" data-v-29472115></div></button><div class="game-indicators-advanced" role="tablist" aria-label="\u663E\u5361\u9009\u62E9\u6307\u793A\u5668" data-v-29472115><!--[-->`);
      ssrRenderList(unref(gpus), (gpu, index2) => {
        _push(`<button class="${ssrRenderClass([{ "active": index2 === unref(currentIndex) }, "indicator-advanced"])}" role="tab"${ssrRenderAttr("aria-selected", index2 === unref(currentIndex))}${ssrRenderAttr("aria-label", `\u9009\u62E9\u663E\u5361: ${gpu.title}`)}${ssrRenderAttr("tabindex", index2 === unref(currentIndex) ? 0 : -1)} data-v-29472115><div class="indicator-inner" data-v-29472115></div><div class="indicator-ripple" data-v-29472115></div><span class="indicator-tooltip-advanced" data-v-29472115>${ssrInterpolate(gpu.title)}</span></button>`);
      });
      _push(`<!--]--></div><button class="control-btn-advanced next glass-button-advanced" aria-label="\u4E0B\u4E00\u4E2A\u663E\u5361" tabindex="0" data-v-29472115><i class="bi bi-chevron-right" aria-hidden="true" data-v-29472115></i><div class="button-glow" data-v-29472115></div></button></div><div class="current-game-info-advanced" role="main" aria-label="\u5F53\u524D\u9009\u4E2D\u663E\u5361\u8BE6\u60C5" data-v-29472115><div class="glass-card-premium rounded-2xl p-10 max-w-6xl mx-auto border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-29472115><div class="grid md:grid-cols-5 gap-10 items-center" data-v-29472115><div class="md:col-span-2" data-v-29472115><div class="game-detail-cover-advanced" data-v-29472115>`);
      if (unref(selectedGpu).image) {
        _push(`<div class="detail-image-container" data-v-29472115><img${ssrRenderAttr("src", unref(selectedGpu).image)}${ssrRenderAttr("alt", `${unref(selectedGpu).title} \u663E\u5361\u5C01\u9762`)} class="w-full rounded-lg shadow-lg" loading="lazy" data-v-29472115></div>`);
      } else {
        _push(`<div class="detail-gpu-placeholder" data-v-29472115><i class="bi bi-gpu-card" data-v-29472115></i><span class="detail-gpu-name" data-v-29472115>${ssrInterpolate(unref(selectedGpu).title)}</span><span class="detail-gpu-model" data-v-29472115>${ssrInterpolate(unref(selectedGpu).model)}</span></div>`);
      }
      _push(`<div class="cover-overlay-advanced" data-v-29472115><button class="play-button-advanced" aria-label="\u5728Steam\u4E0A\u67E5\u770B\u663E\u5361" tabindex="0" data-v-29472115><i class="bi bi-play-fill" aria-hidden="true" data-v-29472115></i><div class="play-ripple" data-v-29472115></div></button></div><div class="detail-glass-overlay-advanced" data-v-29472115></div><div class="cover-energy-field" data-v-29472115></div></div></div><div class="md:col-span-3" data-v-29472115><header data-v-29472115><h2 class="text-4xl font-bold text-white mb-6 neon-text-advanced" data-v-29472115>${ssrInterpolate(unref(selectedGpu).title)}</h2></header><p class="text-gray-300 text-lg mb-8 leading-relaxed" data-v-29472115>${ssrInterpolate(unref(selectedGpu).description)}</p><div class="game-badges-advanced mb-8" role="list" aria-label="\u663E\u5361\u4FE1\u606F\u6807\u7B7E" data-v-29472115><span class="badge-advanced genre-badge" role="listitem" data-v-29472115><i class="bi bi-tag" aria-hidden="true" data-v-29472115></i><span class="sr-only" data-v-29472115>\u663E\u5361\u7C7B\u578B\uFF1A</span>${ssrInterpolate(unref(selectedGpu).model)}</span><span class="badge-advanced rating-badge" role="listitem" data-v-29472115><i class="bi bi-star-fill" aria-hidden="true" data-v-29472115></i><span class="sr-only" data-v-29472115>\u8BC4\u5206\uFF1A</span>${ssrInterpolate(unref(selectedGpu).rating)}</span><span class="badge-advanced year-badge" role="listitem" data-v-29472115><i class="bi bi-calendar" aria-hidden="true" data-v-29472115></i><span class="sr-only" data-v-29472115>\u53D1\u5E03\u5E74\u4EFD\uFF1A</span>${ssrInterpolate(unref(selectedGpu).releaseYear)}</span></div><div class="gpu-specs-grid mb-8" data-v-29472115><div class="spec-item" data-v-29472115><i class="bi bi-memory text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>\u663E\u5B58</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.memory)}</span></div><div class="spec-item" data-v-29472115><i class="bi bi-cpu text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>CUDA\u6838\u5FC3</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.cores)}</span></div><div class="spec-item" data-v-29472115><i class="bi bi-speedometer2 text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>\u52A0\u901F\u9891\u7387</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.boost)}</span></div><div class="spec-item" data-v-29472115><i class="bi bi-lightning text-cyan-400" data-v-29472115></i><span class="spec-label" data-v-29472115>\u529F\u8017</span><span class="spec-value" data-v-29472115>${ssrInterpolate(unref(selectedGpu).specs.power)}</span></div></div><div class="gpu-features mb-8" data-v-29472115><h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2" data-v-29472115><i class="bi bi-gear-fill text-cyan-400" data-v-29472115></i> \u6838\u5FC3\u7279\u6027 </h4><div class="feature-tags" data-v-29472115><!--[-->`);
      ssrRenderList(unref(selectedGpu).features, (feature) => {
        _push(`<span class="feature-tag" data-v-29472115><i class="bi bi-check-circle-fill text-green-400" data-v-29472115></i> ${ssrInterpolate(feature)}</span>`);
      });
      _push(`<!--]--></div></div><div class="flex items-center justify-between" data-v-29472115><div class="price-section-advanced" role="region" aria-label="\u4EF7\u683C\u4FE1\u606F" data-v-29472115>`);
      if (unref(selectedGpu).originalPrice > 0) {
        _push(`<span class="text-gray-400 text-xl line-through mr-4" aria-label="\u539F\u4EF7" data-v-29472115>\xA5${ssrInterpolate(unref(selectedGpu).originalPrice.toLocaleString())}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-4xl font-bold text-cyan-400 neon-text-price" aria-label="\u5F53\u524D\u4EF7\u683C" data-v-29472115>\xA5${ssrInterpolate(unref(selectedGpu).salePrice.toLocaleString())}</span>`);
      if (unref(selectedGpu).originalPrice > 0 && unref(selectedGpu).salePrice > 0) {
        _push(`<span class="text-green-400 text-lg ml-4 discount-badge" aria-label="\u6298\u6263" data-v-29472115> -${ssrInterpolate(Math.round((1 - unref(selectedGpu).salePrice / unref(selectedGpu).originalPrice) * 100))}% </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="btn-premium-advanced px-8 py-3 rounded-2xl font-bold text-lg flex items-center gap-3 relative overflow-hidden" aria-label="\u67E5\u770B\u663E\u5361\u8BE6\u60C5" tabindex="0" data-v-29472115><i class="bi bi-eye mr-3" aria-hidden="true" data-v-29472115></i> \u67E5\u770B\u8BE6\u60C5 <div class="btn-energy-field" data-v-29472115></div></button></div></div></div></div></div></div>`);
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
        memory: "\u663E\u5B58",
        power: "\u529F\u8017",
        cores: "\u6838\u5FC3",
        threads: "\u7EBF\u7A0B",
        socket: "\u63D2\u69FD",
        chipset: "\u82AF\u7247\u7EC4",
        wattage: "\u529F\u7387",
        efficiency: "\u6548\u7387",
        size: "\u5C3A\u5BF8",
        resolution: "\u5206\u8FA8\u7387"
      };
      return translations[key] || key;
    };
    const translateFeature = (feature) => {
      const translations = {
        "\u5149\u7EBF\u8FFD\u8E2A": "Ray Tracing",
        "DLSS 3.0": "DLSS 3.0",
        "RDNA 3": "RDNA 3",
        "FSR 3.0": "FSR 3.0",
        "\u8D85\u7EBF\u7A0B": "Hyper-Threading",
        "DDR5\u652F\u6301": "DDR5 Support",
        "PCIe 5.0": "PCIe 5.0",
        "WiFi 6E": "WiFi 6E",
        "80+ \u91D1\u724C": "80+ Gold",
        "\u5168\u6A21\u7EC4": "Fully Modular",
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
        graphics: "\u663E\u5361",
        cpu: "\u5904\u7406\u5668",
        motherboard: "\u4E3B\u677F",
        power: "\u7535\u6E90",
        monitor: "\u663E\u793A\u5668"
      };
      return names[category] || "\u786C\u4EF6";
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
    };
    useHead({
      title: "\u4EA7\u54C1\u4E2D\u5FC3 - xlCig",
      meta: [
        { name: "description", content: "\u6D4F\u89C8\u6211\u4EEC\u7CBE\u9009\u7684PC\u786C\u4EF6\u4EA7\u54C1\uFF0C\u5305\u62EC\u663E\u5361\u3001CPU\u3001\u4E3B\u677F\u7B49" }
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
      _push(`<section class="relative z-10" data-v-e5274d03><div class="container mx-auto px-6 py-8" data-v-e5274d03><div class="glass-card-enhanced rounded-3xl p-8 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-e5274d03><div class="text-center" data-v-e5274d03><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/40 mb-6" data-v-e5274d03><i class="bi bi-grid-3x3-gap text-white text-3xl" data-v-e5274d03></i></div><h1 class="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4" data-v-e5274d03><span class="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent" data-v-e5274d03>\u4EA7\u54C1\u4E2D\u5FC3</span></h1><p class="text-gray-300 text-xl max-w-2xl mx-auto" data-v-e5274d03>\u4E13\u4E1A\u7684PC\u786C\u4EF6\u4EA7\u54C1\uFF0C\u4E3A\u60A8\u7684\u9879\u76EE\u63D0\u4F9B\u53EF\u9760\u7684\u89E3\u51B3\u65B9\u6848</p></div></div></div></section><section class="relative z-10" data-v-e5274d03><div class="container mx-auto px-6 py-6" data-v-e5274d03><div class="glass-card-enhanced rounded-2xl p-8 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-e5274d03>`);
      _push(ssrRenderComponent(_component_SteamCarousel, null, null, _parent));
      _push(`</div></div></section><div class="sticky top-0 z-40 backdrop-blur-xl border-b border-cyan-400/20" data-v-e5274d03><div class="container mx-auto px-6 py-4" data-v-e5274d03><div class="glass-card-enhanced rounded-xl p-6 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-e5274d03><div class="mb-6" data-v-e5274d03><h3 class="text-lg font-bold text-white mb-4 flex items-center gap-3" data-v-e5274d03><div class="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg" data-v-e5274d03><i class="bi bi-funnel text-white" data-v-e5274d03></i></div><span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-e5274d03>\u4EA7\u54C1\u5206\u7C7B</span></h3><div class="flex flex-wrap gap-3" data-v-e5274d03><!--[-->`);
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
      _push(`<!--]--></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-e5274d03><div data-v-e5274d03><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-e5274d03><i class="bi bi-bookmark text-cyan-400" data-v-e5274d03></i> \u54C1\u724C </label><select class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-e5274d03><option value="all" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), "all") : ssrLooseEqual(unref(selectedBrand), "all")) ? " selected" : ""}>\u5168\u90E8\u54C1\u724C</option><!--[-->`);
      ssrRenderList(unref(brands), (brand) => {
        _push(`<option${ssrRenderAttr("value", brand.id)} class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrand)) ? ssrLooseContain(unref(selectedBrand), brand.id) : ssrLooseEqual(unref(selectedBrand), brand.id)) ? " selected" : ""}>${ssrInterpolate(brand.name)} (${ssrInterpolate(brand.count)}) </option>`);
      });
      _push(`<!--]--></select></div><div data-v-e5274d03><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-e5274d03><i class="bi bi-currency-dollar text-green-400" data-v-e5274d03></i> \u4EF7\u683C\u533A\u95F4 </label><select class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-e5274d03><option value="" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "") : ssrLooseEqual(unref(priceRange), "")) ? " selected" : ""}>\u4EFB\u610F\u4EF7\u683C</option><option value="0-3600" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "0-3600") : ssrLooseEqual(unref(priceRange), "0-3600")) ? " selected" : ""}>3600\u5143\u4EE5\u4E0B</option><option value="3600-7200" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "3600-7200") : ssrLooseEqual(unref(priceRange), "3600-7200")) ? " selected" : ""}>3600-7200\u5143</option><option value="7200-10800" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "7200-10800") : ssrLooseEqual(unref(priceRange), "7200-10800")) ? " selected" : ""}>7200-10800\u5143</option><option value="10800-14400" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "10800-14400") : ssrLooseEqual(unref(priceRange), "10800-14400")) ? " selected" : ""}>10800-14400\u5143</option><option value="14400-99999" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(priceRange)) ? ssrLooseContain(unref(priceRange), "14400-99999") : ssrLooseEqual(unref(priceRange), "14400-99999")) ? " selected" : ""}>14400\u5143\u4EE5\u4E0A</option></select></div><div data-v-e5274d03><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-e5274d03><i class="bi bi-sort-down text-purple-400" data-v-e5274d03></i> \u6392\u5E8F </label><select class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-e5274d03><option value="" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "") : ssrLooseEqual(unref(sortBy), "")) ? " selected" : ""}>\u63A8\u8350</option><option value="price_asc" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price_asc") : ssrLooseEqual(unref(sortBy), "price_asc")) ? " selected" : ""}>\u4EF7\u683C\uFF1A\u4ECE\u4F4E\u5230\u9AD8</option><option value="price_desc" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price_desc") : ssrLooseEqual(unref(sortBy), "price_desc")) ? " selected" : ""}>\u4EF7\u683C\uFF1A\u4ECE\u9AD8\u5230\u4F4E</option><option value="rating" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "rating") : ssrLooseEqual(unref(sortBy), "rating")) ? " selected" : ""}>\u8BC4\u5206\u6700\u9AD8</option><option value="newest" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "newest") : ssrLooseEqual(unref(sortBy), "newest")) ? " selected" : ""}>\u6700\u65B0\u53D1\u5E03</option><option value="popular" class="bg-gray-800" data-v-e5274d03${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "popular") : ssrLooseEqual(unref(sortBy), "popular")) ? " selected" : ""}>\u6700\u53D7\u6B22\u8FCE</option></select></div><div data-v-e5274d03><label class="block text-sm font-bold text-white mb-2 flex items-center gap-2" data-v-e5274d03><i class="bi bi-search text-yellow-400" data-v-e5274d03></i> \u641C\u7D22\u4EA7\u54C1 </label><input${ssrRenderAttr("value", unref(searchTerm))} placeholder="\u8F93\u5165\u4EA7\u54C1\u540D\u79F0..." class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-white text-sm placeholder-gray-400 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300" data-v-e5274d03></div></div><div class="mt-6 flex justify-end" data-v-e5274d03><button class="px-6 py-3 text-sm font-semibold text-gray-300 bg-gray-800/30 border border-gray-600/50 rounded-xl hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm" data-v-e5274d03><i class="bi bi-arrow-clockwise" data-v-e5274d03></i> \u91CD\u7F6E\u7B5B\u9009 </button></div></div></div></div><main class="container mx-auto px-6 py-8 relative z-10" data-v-e5274d03><div class="glass-card-enhanced rounded-xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 mb-6 backdrop-blur-xl" data-v-e5274d03><div class="px-6 py-4 flex items-center justify-between border-b border-gray-700/50" data-v-e5274d03><div class="flex items-center" data-v-e5274d03><h2 class="text-xl font-bold text-white" data-v-e5274d03>${ssrInterpolate(getCategoryName(unref(selectedCategory)))}</h2><span class="ml-3 text-sm text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30" data-v-e5274d03>(${ssrInterpolate(unref(meta).total)} \u4E2A\u4EA7\u54C1)</span></div><div class="text-sm text-gray-400" data-v-e5274d03> \u627E\u5230 <span class="text-cyan-400 font-semibold" data-v-e5274d03>${ssrInterpolate(unref(meta).total)}</span> \u4E2A\u7B26\u5408\u6761\u4EF6\u7684\u4EA7\u54C1 </div></div></div>`);
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
            _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/30 text-red-200 border border-red-400/50 shadow-lg shadow-red-500/30 backdrop-blur-sm" data-v-e5274d03><i class="bi bi-x-circle-fill mr-1" data-v-e5274d03></i>\u7F3A\u8D27 </span>`);
          } else if (product2.stockCount <= 5) {
            _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/30 text-orange-200 border border-orange-400/50 shadow-lg shadow-orange-500/30 backdrop-blur-sm animate-pulse" data-v-e5274d03><i class="bi bi-exclamation-triangle-fill mr-1" data-v-e5274d03></i>\u5269\u4F59${ssrInterpolate(product2.stockCount)}</span>`);
          } else {
            _push(`<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/30 backdrop-blur-sm" data-v-e5274d03><i class="bi bi-check-circle-fill mr-1" data-v-e5274d03></i>\u73B0\u8D27 </span>`);
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
          _push(`</div><div class="text-right text-xs text-gray-400" data-v-e5274d03><div data-v-e5274d03>\u53D1\u5E03\u65E5\u671F</div><div class="text-cyan-400" data-v-e5274d03>${ssrInterpolate(formatDate(product2.releaseDate))}</div></div></div><div class="grid grid-cols-2 gap-3" data-v-e5274d03><button class="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-e5274d03> \u67E5\u770B\u8BE6\u60C5 </button><button class="px-4 py-2 border border-gray-600/50 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-300 text-sm font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-1 backdrop-blur-sm" data-v-e5274d03><i class="bi bi-heart" data-v-e5274d03></i> \u6536\u85CF </button></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="text-center py-16" data-v-e5274d03><div class="inline-flex flex-col items-center glass-card-enhanced rounded-xl border border-cyan-400/40 p-12 shadow-2xl shadow-cyan-500/25 backdrop-blur-xl" data-v-e5274d03><div class="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6" data-v-e5274d03></div><p class="text-xl font-bold text-white" data-v-e5274d03>\u6B63\u5728\u52A0\u8F7D\u4EA7\u54C1...</p><p class="text-gray-400 mt-2" data-v-e5274d03>\u8BF7\u7A0D\u5019</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && unref(products).length === 0) {
        _push(`<div class="text-center py-16" data-v-e5274d03><div class="glass-card-enhanced rounded-xl border border-cyan-400/40 p-16 shadow-2xl shadow-cyan-500/25 max-w-md mx-auto backdrop-blur-xl" data-v-e5274d03><div class="text-8xl mb-8 text-cyan-400/50" data-v-e5274d03><i class="bi bi-inbox" data-v-e5274d03></i></div><h3 class="text-2xl font-bold text-white mb-4" data-v-e5274d03>\u672A\u627E\u5230\u4EA7\u54C1</h3><p class="text-gray-400 mb-8 text-lg" data-v-e5274d03>\u8BF7\u5C1D\u8BD5\u8C03\u6574\u7B5B\u9009\u6761\u4EF6\u6216\u641C\u7D22\u5173\u952E\u8BCD</p><button class="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40" data-v-e5274d03><i class="bi bi-arrow-clockwise mr-2" data-v-e5274d03></i> \u91CD\u7F6E\u7B5B\u9009 </button></div></div>`);
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

export { index as default };
//# sourceMappingURL=index-Bx9YYt0O.mjs.map
