import { _ as __nuxt_component_0 } from './PageLoader-GhT5s0Gy.mjs';
import { _ as __nuxt_component_0$1 } from './AppHeader-D4R1WNqE.mjs';
import { defineComponent, ref, reactive, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, createTextVNode, openBlock, toDisplayString, Fragment, renderList, withModifiers, withDirectives, vModelText, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as usePageLoader, p as pageLoaderPresets, o as ordersApi } from './orders-BwSckgWw.mjs';
import { a as apiClient } from './apiClient-C7W98XI_.mjs';
import { p as productsApi } from './products-suYGsOwB.mjs';
import { c as createDiscreteApi, L as LocationApi } from './useLocation-DU515pZE.mjs';
import { u as useUserStore } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import 'seemly';
import 'treemate';
import 'vooks';
import 'vdirs';
import 'lodash-es';
import 'css-render';
import 'evtd';
import '@css-render/plugin-bem';
import 'pinia';

const authApi = {
  // 用户注册
  register: (userData) => apiClient.post("/auth/register", userData, { requireAuth: false }),
  // 用户登录
  login: (credentials) => apiClient.post("/auth/login", credentials, { requireAuth: false }),
  // 获取当前用户信息
  getProfile: () => apiClient.get("/auth/me"),
  // 更新用户信息
  updateProfile: (userData) => apiClient.put("/auth/profile", userData),
  // 修改密码
  changePassword: (passwordData) => apiClient.put("/auth/password", passwordData),
  // 获取用户列表（管理员功能）
  getUsers: () => apiClient.get("/users"),
  // 刷新Token
  refreshToken: (refreshToken) => apiClient.post("/auth/refresh", { refreshToken }, { requireAuth: false }),
  // 登出
  logout: () => apiClient.post("/auth/logout"),
  // 忘记密码
  forgotPassword: (email) => apiClient.post("/auth/forgot-password", { email }, { requireAuth: false }),
  // 重置密码
  resetPassword: (token, newPassword) => apiClient.post("/auth/reset-password", { token, newPassword }, { requireAuth: false }),
  // 验证邮箱
  verifyEmail: (token) => apiClient.post("/auth/verify-email", { token }, { requireAuth: false }),
  // 重新发送验证邮件
  resendVerification: (email) => apiClient.post("/auth/resend-verification", { email }, { requireAuth: false }),
  // 发送邮箱验证码
  sendEmailCode: async (data) => {
    var _a;
    const lastSendKey = `lastSend_${data.email}`;
    const lastSendTime = localStorage.getItem(lastSendKey);
    if (lastSendTime && Date.now() - parseInt(lastSendTime) < 6e4) {
      return {
        success: false,
        message: "\u53D1\u9001\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF760\u79D2\u540E\u518D\u8BD5"
      };
    }
    const code = Math.floor(1e5 + Math.random() * 9e5).toString();
    const messageHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>xlCig - \u90AE\u7BB1\u9A8C\u8BC1</title>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #0a0a0a; font-family: Arial, sans-serif;">
        <div style="max-width: 480px; margin: 0 auto; background: #1a1a1a; border-radius: 8px; border: 1px solid #333; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: #000000; padding: 24px 20px; text-align: center; border-bottom: 1px solid #333;">
            <div style="margin-bottom: 12px;">
              <!-- Logo -->
              <img src="https://xlcig.oss-cn-beijing.aliyuncs.com/avatars/logo.png?Expires=1751639237&OSSAccessKeyId=TMP.3KmZD6t8o3n1rKuSyCorjaftjmjgbsmLYDq74CzmdgC4XQGqBuLsum69r8snmQ2jFs2XMgB46rvT87S3VB9otvmzTpL3fB&Signature=Oax6b3GJVc%2BpH9f69iGgtpTbQdg%3D" alt="xlCig" style="height: 40px; max-width: 160px; display: inline-block;">
            </div>
            <p style="color: #888888; margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
              \u90AE\u7BB1\u9A8C\u8BC1
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 24px 20px; background: #1a1a1a;">
            
            <!-- Verification Code -->
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #ffffff; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
                \u9A8C\u8BC1\u7801
              </h2>
              <p style="color: #888888; font-size: 13px; margin: 0 0 16px 0;">
                \u8BF7\u8F93\u5165\u4EE5\u4E0B\u9A8C\u8BC1\u7801\u5B8C\u6210\u6CE8\u518C
              </p>
              
              <div style="background: #000000; border: 1px solid #333; border-radius: 6px; padding: 20px; margin: 16px 0;">
                <div style="font-size: 28px; font-weight: bold; color: #00f5ff; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                  ${code}
                </div>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #333;">
                  <span style="color: #888888; font-size: 11px;">
                    \u6709\u6548\u671F\uFF1A10\u5206\u949F
                  </span>
                </div>
              </div>
            </div>

            <!-- Security Notice -->
            <div style="background: #111111; border: 1px solid #333; border-radius: 4px; padding: 16px; margin: 16px 0;">
              <p style="color: #ffffff; font-size: 12px; font-weight: bold; margin: 0 0 6px 0;">
                \u{1F6E1}\uFE0F \u5B89\u5168\u63D0\u9192
              </p>
              <p style="color: #cccccc; font-size: 11px; margin: 0; line-height: 1.4;">
                \u2022 \u8BF7\u52FF\u5411\u4EFB\u4F55\u4EBA\u900F\u9732\u6B64\u9A8C\u8BC1\u7801<br>
                \u2022 \u5982\u975E\u672C\u4EBA\u64CD\u4F5C\uFF0C\u8BF7\u5FFD\u7565\u6B64\u90AE\u4EF6
              </p>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: #000000; border-top: 1px solid #333; padding: 16px 20px; text-align: center;">
            <p style="color: #666666; font-size: 10px; margin: 0; line-height: 1.3;">
              \u6B64\u90AE\u4EF6\u7531 xlCig \u7CFB\u7EDF\u53D1\u9001<br>
              <span style="color: #888888;">\xA9 2025 xlCig</span>
            </p>
          </div>
        </div>
      </body>
      </html>`;
    const wyKey = "QUedTyAvtaBLqjjm";
    const qqKey = "odmyaacplscmdfgi";
    const apiKey = "kQkGSVy2vEnsoX1751441583687rSR1yklfuc";
    const emailDomain = (_a = data.email.split("@")[1]) == null ? void 0 : _a.toLowerCase();
    let smtpCode = "";
    let smtpEmail = "";
    let smtpCodeType = "";
    if (emailDomain === "163.com" || emailDomain === "126.com") {
      smtpCode = wyKey;
      smtpEmail = "18569795073@163.com";
      smtpCodeType = emailDomain === "163.com" ? "163" : "126";
    } else if (emailDomain === "qq.com") {
      smtpCode = qqKey;
      smtpEmail = "2966898893@qq.com";
      smtpCodeType = "qq";
    } else {
      smtpCode = wyKey;
      smtpEmail = "18569795073@163.com";
      smtpCodeType = "163";
    }
    const mailRequestData = {
      ColaKey: apiKey,
      // API密钥
      tomail: data.email,
      // 目标邮箱地址
      fromTitle: "xlCig",
      // 邮件标题（发件人名称）
      subject: "register is to xlCig",
      // 邮件主题
      content: messageHtml.trim(),
      // 邮件内容(html)
      isTextContent: false,
      // 邮件内容是HTML格式
      smtpCode,
      // 邮件系统授权码
      smtpEmail,
      // 开启授权码对应的授权邮箱
      smtpCodeType
      // 授权邮箱的类型
    };
    try {
      const mailResponse = await fetch("https://luckycola.com.cn/tools/customMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(mailRequestData)
      });
      if (!mailResponse.ok) {
        const errorData = await mailResponse.text();
        console.error("\u90AE\u4EF6\u670D\u52A1\u54CD\u5E94\u9519\u8BEF:", errorData);
        throw new Error("\u90AE\u4EF6\u53D1\u9001\u5931\u8D25");
      }
      localStorage.setItem(lastSendKey, Date.now().toString());
      const codeData = {
        email: data.email,
        code,
        timestamp: Date.now(),
        expires: Date.now() + 10 * 60 * 1e3
        // 10分钟过期
      };
      localStorage.setItem(`emailCode_${data.email}`, JSON.stringify(codeData));
      return {
        success: true,
        message: "\u9A8C\u8BC1\u7801\u53D1\u9001\u6210\u529F\uFF0C\u8BF7\u67E5\u770B\u60A8\u7684\u90AE\u7BB1",
        data: { message: "\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001" }
      };
    } catch (error) {
      console.error("\u53D1\u9001\u90AE\u7BB1\u9A8C\u8BC1\u7801\u5931\u8D25:", error);
      try {
        const httpResponse = await fetch("http://luckycola.com.cn/tools/customMail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(mailRequestData)
        });
        if (httpResponse.ok) {
          localStorage.setItem(lastSendKey, Date.now().toString());
          return {
            success: true,
            message: "\u9A8C\u8BC1\u7801\u53D1\u9001\u6210\u529F\uFF0C\u8BF7\u67E5\u770B\u60A8\u7684\u90AE\u7BB1",
            data: { message: "\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001" }
          };
        }
      } catch (httpError) {
        console.error("HTTP\u90AE\u4EF6\u53D1\u9001\u4E5F\u5931\u8D25:", httpError);
      }
      return {
        success: false,
        message: error instanceof Error ? error.message : "\u53D1\u9001\u9A8C\u8BC1\u7801\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
      };
    }
  },
  // 验证邮箱验证码
  verifyEmailCode: (data) => {
    try {
      const storedData = localStorage.getItem(`emailCode_${data.email}`);
      if (!storedData) {
        return Promise.resolve({
          success: false,
          message: "\u9A8C\u8BC1\u7801\u4E0D\u5B58\u5728\u6216\u5DF2\u8FC7\u671F"
        });
      }
      const codeInfo = JSON.parse(storedData);
      const now = Date.now();
      if (now > codeInfo.expires) {
        localStorage.removeItem(`emailCode_${data.email}`);
        return Promise.resolve({
          success: false,
          message: "\u9A8C\u8BC1\u7801\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u83B7\u53D6"
        });
      }
      if (codeInfo.code !== data.code) {
        return Promise.resolve({
          success: false,
          message: "\u9A8C\u8BC1\u7801\u9519\u8BEF"
        });
      }
      localStorage.removeItem(`emailCode_${data.email}`);
      return Promise.resolve({
        success: true,
        message: "\u9A8C\u8BC1\u7801\u9A8C\u8BC1\u6210\u529F",
        data: true
      });
    } catch (error) {
      return Promise.resolve({
        success: false,
        message: "\u9A8C\u8BC1\u7801\u9A8C\u8BC1\u5931\u8D25"
      });
    }
  }
};
const categoriesApi = {
  // 获取分类列表
  getCategories: (params) => apiClient.getWithParams("/categories", params, { requireAuth: false }),
  // 获取所有激活的分类（不分页）
  getActiveCategories: () => apiClient.get("/categories/active", { requireAuth: false }),
  // 根据ID获取分类详情
  getCategoryById: (id) => apiClient.get(`/categories/${id}`, { requireAuth: false }),
  // 根据slug获取分类详情
  getCategoryBySlug: (slug) => apiClient.get(`/categories/slug/${slug}`, { requireAuth: false }),
  // 创建分类（管理员功能）
  createCategory: (categoryData) => apiClient.post("/categories", categoryData),
  // 更新分类（管理员功能）
  updateCategory: (id, categoryData) => apiClient.put(`/categories/${id}`, categoryData),
  // 删除分类（管理员功能）
  deleteCategory: (id) => apiClient.delete(`/categories/${id}`),
  // 批量删除分类（管理员功能）
  batchDeleteCategories: (ids) => apiClient.post("/categories/batch-delete", { ids }),
  // 更新分类状态（管理员功能）
  updateCategoryStatus: (id, status) => apiClient.patch(`/categories/${id}/status`, { status }),
  // 更新分类排序（管理员功能）
  updateCategoryOrder: (orders) => apiClient.post("/categories/update-order", { orders }),
  // 获取分类统计信息（管理员功能）
  getCategoryStats: () => apiClient.get("/categories/stats")
};
const configsApi = {
  // 获取配置列表
  getConfigs: (params) => apiClient.getWithParams("/configs", params, { requireAuth: false }),
  // 获取推荐配置
  getFeaturedConfigs: (limit = 10) => apiClient.get(`/configs/featured?limit=${limit}`, { requireAuth: false }),
  // 获取热门配置
  getHotConfigs: (limit = 10) => apiClient.get(`/configs/hot?limit=${limit}`, { requireAuth: false }),
  // 获取最新配置
  getLatestConfigs: (limit = 10) => apiClient.get(`/configs/latest?limit=${limit}`, { requireAuth: false }),
  // 根据分类获取配置
  getConfigsByCategory: (category, params) => apiClient.getWithParams(`/configs/category/${category}`, params, { requireAuth: false }),
  // 根据商家获取配置
  getConfigsByMerchant: (merchantId, params) => apiClient.getWithParams(`/configs/merchant/${merchantId}`, params, { requireAuth: false }),
  // 根据价格区间获取配置
  getConfigsByPrice: (minPrice, maxPrice, params) => apiClient.getWithParams("/configs/price-range", { min_price: minPrice, max_price: maxPrice, ...params }, { requireAuth: false }),
  // 根据ID获取配置详情
  getConfigById: (id) => apiClient.get(`/configs/${id}`, { requireAuth: false }),
  // 根据slug获取配置详情
  getConfigBySlug: (slug) => apiClient.get(`/configs/slug/${slug}`, { requireAuth: false }),
  // 搜索配置
  searchConfigs: (query, params) => apiClient.getWithParams("/configs/search", { search: query, ...params }, { requireAuth: false }),
  // 配置对比
  compareConfigs: (configIds) => apiClient.post("/configs/compare", { configIds }, { requireAuth: false }),
  // 获取相似配置
  getSimilarConfigs: (configId, limit = 6) => apiClient.get(`/configs/${configId}/similar?limit=${limit}`, { requireAuth: false }),
  // 获取配置推荐（基于预算）
  getRecommendedConfigs: (budget, category) => apiClient.getWithParams("/configs/recommend", { budget, category }, { requireAuth: false }),
  // 获取配置性能评分详情
  getConfigPerformance: (configId) => apiClient.get(`/configs/${configId}/performance`, { requireAuth: false }),
  // 获取配置价格历史
  getConfigPriceHistory: (configId, days = 30) => apiClient.get(`/configs/${configId}/price-history?days=${days}`, { requireAuth: false }),
  // 创建配置（商家功能）
  createConfig: (configData) => apiClient.post("/configs", configData),
  // 更新配置（商家功能）
  updateConfig: (id, configData) => apiClient.put(`/configs/${id}`, configData),
  // 删除配置（商家功能）
  deleteConfig: (id) => apiClient.delete(`/configs/${id}`),
  // 批量删除配置（商家功能）
  batchDeleteConfigs: (ids) => apiClient.post("/configs/batch-delete", { ids }),
  // 更新配置状态（商家功能）
  updateConfigStatus: (id, status) => apiClient.patch(`/configs/${id}/status`, { status }),
  // 更新配置库存（商家功能）
  updateConfigStock: (id, stock) => apiClient.patch(`/configs/${id}/stock`, { stock }),
  // 上传配置图片（商家功能）
  uploadConfigImages: (configId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    return apiClient.upload(`/configs/${configId}/images`, formData);
  },
  // 删除配置图片（商家功能）
  deleteConfigImage: (configId, imageUrl) => apiClient.delete(`/configs/${configId}/images?imageUrl=${encodeURIComponent(imageUrl)}`),
  // 复制配置（商家功能）
  cloneConfig: (id, newName) => apiClient.post(`/configs/${id}/clone`, { newName }),
  // 获取配置统计信息（管理员功能）
  getConfigStats: () => apiClient.get("/configs/stats"),
  // 获取配置分类统计
  getCategoryStats: () => apiClient.get("/configs/category-stats", { requireAuth: false })
};
const merchantsApi = {
  // 获取商家列表
  getMerchants: (params) => apiClient.getWithParams("/merchants", params, { requireAuth: false }),
  // 获取推荐商家
  getFeaturedMerchants: (limit = 10) => apiClient.get(`/merchants/featured?limit=${limit}`, { requireAuth: false }),
  // 获取顶级商家
  getTopMerchants: (limit = 10) => apiClient.get(`/merchants/top?limit=${limit}`, { requireAuth: false }),
  // 根据ID获取商家详情
  getMerchantById: (id) => apiClient.get(`/merchants/${id}`, { requireAuth: false }),
  // 根据类型获取商家
  getMerchantsByType: (type, params) => apiClient.getWithParams(`/merchants/type/${type}`, params, { requireAuth: false }),
  // 根据地区获取商家
  getMerchantsByLocation: (location, params) => apiClient.getWithParams(`/merchants/location/${encodeURIComponent(location)}`, params, { requireAuth: false }),
  // 根据专业领域获取商家
  getMerchantsBySpecialty: (specialty) => apiClient.get(`/merchants/specialty/${encodeURIComponent(specialty)}`, { requireAuth: false }),
  // 搜索商家
  searchMerchants: (query, params) => apiClient.getWithParams("/merchants/search", { search: query, ...params }, { requireAuth: false }),
  // 获取商家产品
  getMerchantProducts: (merchantId, params) => apiClient.getWithParams(`/merchants/${merchantId}/products`, params, { requireAuth: false }),
  // 获取商家配置
  getMerchantConfigs: (merchantId, params) => apiClient.getWithParams(`/merchants/${merchantId}/configs`, params, { requireAuth: false }),
  // 获取商家评价
  getMerchantReviews: (merchantId, params) => apiClient.getWithParams(`/merchants/${merchantId}/reviews`, params, { requireAuth: false }),
  // 获取商家订单（商家自己查看）
  getMerchantOrders: (params) => apiClient.getWithParams("/merchants/my/orders", params),
  // 获取商家统计（商家自己查看）
  getMerchantStats: () => apiClient.get("/merchants/my/stats"),
  // 创建商家（用户申请成为商家）
  createMerchant: (merchantData) => apiClient.post("/merchants", merchantData),
  // 更新商家信息（商家自己更新）
  updateMerchant: (merchantData) => apiClient.put("/merchants/my", merchantData),
  // 获取当前商家信息（商家自己查看）
  getMyMerchant: () => apiClient.get("/merchants/my"),
  // 上传商家Logo
  uploadMerchantLogo: (file) => {
    const formData = new FormData();
    formData.append("logo", file);
    return apiClient.upload("/merchants/my/logo", formData);
  },
  // 删除商家（管理员功能）
  deleteMerchant: (id) => apiClient.delete(`/merchants/${id}`),
  // 更新商家状态（管理员功能）
  updateMerchantStatus: (id, status) => apiClient.patch(`/merchants/${id}/status`, { status }),
  // 审核商家（管理员功能）
  approveMerchant: (id) => apiClient.patch(`/merchants/${id}/approve`),
  // 拒绝商家申请（管理员功能）
  rejectMerchant: (id, reason) => apiClient.patch(`/merchants/${id}/reject`, { reason }),
  // 获取待审核商家列表（管理员功能）
  getPendingMerchants: () => apiClient.get("/merchants/pending"),
  // 获取所有商家统计（管理员功能）
  getAllMerchantsStats: () => apiClient.get("/merchants/admin/stats"),
  // 获取商家地区列表
  getMerchantLocations: () => apiClient.get("/merchants/locations", { requireAuth: false }),
  // 获取商家专业领域列表
  getMerchantSpecialties: () => apiClient.get("/merchants/specialties", { requireAuth: false }),
  // 商家认证申请
  applyVerification: (documents) => {
    const formData = new FormData();
    documents.forEach((file, index) => {
      formData.append(`document_${index}`, file);
    });
    return apiClient.upload("/merchants/my/verify", formData);
  },
  // 获取商家认证状态
  getVerificationStatus: () => apiClient.get("/merchants/my/verification")
};
const systemApi = {
  // 获取系统统计信息
  getStats: () => apiClient.get("/system/stats", { requireAuth: false }),
  // 获取首页数据
  getHomeData: () => apiClient.get("/system/home", { requireAuth: false }),
  // 获取系统设置
  getSettings: () => apiClient.get("/system/settings", { requireAuth: false }),
  // 轮播图管理
  banners: {
    // 获取轮播图列表
    getBanners: (status) => apiClient.getWithParams("/system/banners", status ? { status } : void 0, { requireAuth: false }),
    // 获取轮播图详情
    getBannerById: (id) => apiClient.get(`/system/banners/${id}`),
    // 创建轮播图（管理员功能）
    createBanner: (bannerData) => apiClient.post("/system/banners", bannerData),
    // 更新轮播图（管理员功能）
    updateBanner: (id, bannerData) => apiClient.put(`/system/banners/${id}`, bannerData),
    // 删除轮播图（管理员功能）
    deleteBanner: (id) => apiClient.delete(`/system/banners/${id}`),
    // 上传轮播图片（管理员功能）
    uploadBannerImage: (file) => {
      const formData = new FormData();
      formData.append("image", file);
      return apiClient.upload("/system/banners/upload", formData);
    },
    // 批量更新排序（管理员功能）
    updateOrder: (orders) => apiClient.post("/system/banners/update-order", { orders })
  },
  // 公告管理
  notices: {
    // 获取公告列表
    getNotices: (status) => apiClient.getWithParams("/system/notices", status ? { status } : void 0, { requireAuth: false }),
    // 获取弹窗公告
    getPopupNotices: () => apiClient.get("/system/notices/popup", { requireAuth: false }),
    // 获取公告详情
    getNoticeById: (id) => apiClient.get(`/system/notices/${id}`, { requireAuth: false }),
    // 创建公告（管理员功能）
    createNotice: (noticeData) => apiClient.post("/system/notices", noticeData),
    // 更新公告（管理员功能）
    updateNotice: (id, noticeData) => apiClient.put(`/system/notices/${id}`, noticeData),
    // 删除公告（管理员功能）
    deleteNotice: (id) => apiClient.delete(`/system/notices/${id}`),
    // 批量更新排序（管理员功能）
    updateOrder: (orders) => apiClient.post("/system/notices/update-order", { orders })
  },
  // 系统设置管理（管理员功能）
  settings: {
    // 更新系统设置
    updateSettings: (settings) => apiClient.put("/system/settings", settings),
    // 上传系统文件（logo、favicon等）
    uploadFile: (file, type) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      return apiClient.upload("/system/upload", formData);
    },
    // 清除缓存
    clearCache: () => apiClient.post("/system/clear-cache"),
    // 重建搜索索引
    rebuildIndex: () => apiClient.post("/system/rebuild-index"),
    // 导出系统数据
    exportData: (type) => apiClient.post("/system/export", { type }),
    // 导入系统数据
    importData: (file, type) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      return apiClient.upload("/system/import", formData);
    }
  },
  // 日志管理（管理员功能）
  logs: {
    // 获取系统日志
    getSystemLogs: (params) => apiClient.getWithParams("/system/logs", params),
    // 获取用户操作日志
    getUserLogs: (params) => apiClient.getWithParams("/system/user-logs", params),
    // 清理日志
    cleanLogs: (days) => apiClient.post("/system/logs/clean", { days })
  },
  // 健康检查
  health: {
    // 检查系统健康状态
    check: () => apiClient.get("/system/health", { requireAuth: false }),
    // 获取性能指标
    getMetrics: () => apiClient.get("/system/metrics")
  }
};
const addressApi = {
  // 获取用户地址列表
  getAddresses: (params) => {
    return apiClient.getWithParams("/addresses", params);
  },
  // 获取地址详情
  getAddress: (id) => {
    return apiClient.get(`/addresses/${id}`);
  },
  // 获取默认地址
  getDefaultAddress: () => {
    return apiClient.get("/addresses/default");
  },
  // 创建地址
  createAddress: (data) => {
    return apiClient.post("/addresses", data);
  },
  // 更新地址
  updateAddress: (id, data) => {
    return apiClient.put(`/addresses/${id}`, data);
  },
  // 设置默认地址
  setDefaultAddress: (id) => {
    return apiClient.put(`/addresses/${id}/default`);
  },
  // 删除地址
  deleteAddress: (id) => {
    return apiClient.delete(`/addresses/${id}`);
  }
};
const uploadApi = {
  // 上传头像
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return apiClient.upload("/upload/avatar", formData);
  },
  // 验证图片文件
  validateImageFile: (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        message: "\u53EA\u652F\u6301 JPEG\u3001PNG\u3001GIF\u3001WebP \u683C\u5F0F\u7684\u56FE\u7247\u6587\u4EF6"
      };
    }
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        valid: false,
        message: "\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC72MB"
      };
    }
    return { valid: true };
  },
  // 获取文件预览URL
  getFilePreviewUrl: (file) => {
    return URL.createObjectURL(file);
  },
  // 释放文件预览URL
  releaseFilePreviewUrl: (url) => {
    URL.revokeObjectURL(url);
  }
};
const cartApi = {
  // 获取购物车列表
  getCartItems: () => apiClient.get("/cart"),
  // 获取购物车统计信息
  getCartSummary: () => apiClient.get("/cart/summary"),
  // 添加商品到购物车
  addToCart: (data) => apiClient.post("/cart", data),
  // 批量添加商品到购物车
  batchAddToCart: (items) => apiClient.post("/cart/batch", { items }),
  // 更新购物车项目
  updateCartItem: (id, data) => apiClient.put(`/cart/${id}`, data),
  // 批量更新购物车项目
  batchUpdateCartItems: (updates) => apiClient.put("/cart/batch", { updates }),
  // 删除购物车项目
  removeCartItem: (id) => apiClient.delete(`/cart/${id}`),
  // 批量删除购物车项目
  batchRemoveCartItems: (ids) => apiClient.post("/cart/batch-delete", { ids }),
  // 清空购物车
  clearCart: () => apiClient.delete("/cart/clear"),
  // 选择/取消选择购物车项目
  toggleCartItemSelection: (id, selected) => apiClient.patch(`/cart/${id}/select`, { selected }),
  // 全选/取消全选购物车项目
  toggleAllCartItems: (selected) => apiClient.patch("/cart/select-all", { selected }),
  // 移动到收藏夹
  moveToWishlist: (id) => apiClient.post(`/cart/${id}/move-to-wishlist`),
  // 从收藏夹移动到购物车
  moveFromWishlist: (productId, quantity = 1) => apiClient.post("/cart/from-wishlist", { productId, quantity }),
  // 检查库存状态
  checkStock: () => apiClient.get("/cart/check-stock"),
  // 获取推荐商品（基于购物车内容）
  getRecommendations: (limit = 8) => apiClient.get(`/cart/recommendations?limit=${limit}`),
  // 同步本地购物车到服务器
  syncLocalCart: (localCartItems) => apiClient.post("/cart/sync", { items: localCartItems }),
  // 获取购物车商品的优惠券
  getAvailableCoupons: () => apiClient.get("/cart/coupons"),
  // 应用优惠券
  applyCoupon: (couponCode) => apiClient.post("/cart/apply-coupon", { couponCode }),
  // 移除优惠券
  removeCoupon: () => apiClient.delete("/cart/coupon"),
  // 预估运费
  estimateShipping: (addressId, address) => {
    const params = addressId ? { addressId } : address;
    return apiClient.post("/cart/estimate-shipping", params);
  }
};
const api = {
  auth: authApi,
  categories: categoriesApi,
  products: productsApi,
  configs: configsApi,
  merchants: merchantsApi,
  orders: ordersApi,
  system: systemApi,
  addresses: addressApi,
  upload: uploadApi,
  cart: cartApi,
  location: LocationApi
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const userStore = useUserStore();
    const { message } = createDiscreteApi(["message"]);
    const success = (content) => {
      message.success(content, { duration: 3e3 });
    };
    const error = (content) => {
      message.error(content, { duration: 4e3 });
    };
    const updating = ref(false);
    const changingPassword = ref(false);
    const showAvatarModal = ref(false);
    const uploadingAvatar = ref(false);
    const avatarPreview = ref(null);
    const selectedFile = ref(null);
    const activeTab = ref("info");
    const fetchUserInfo = async () => {
      try {
        const response = await api.auth.getProfile();
        if (response.data) {
          userStore.updateUser(response.data);
          editForm.username = response.data.username;
          editForm.nickname = response.data.nickname || "";
          editForm.phone = response.data.phone || "";
          return response.data;
        }
        return null;
      } catch (error2) {
        console.error("\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25:", error2);
        throw new Error("\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25");
      }
    };
    const {
      isPageLoading,
      isDataLoading,
      hasError,
      errorMessage,
      reloadPage
    } = usePageLoader({
      ...pageLoaderPresets.fast,
      cacheKey: `profile-${((_a = userStore.user) == null ? void 0 : _a.id) || "default"}`,
      loadFunction: fetchUserInfo,
      onPageReady: (cachedData) => {
        if (cachedData) {
          userStore.updateUser(cachedData);
          editForm.username = cachedData.username;
          editForm.nickname = cachedData.nickname || "";
          editForm.phone = cachedData.phone || "";
        }
      }
    });
    const tabs = [
      { key: "info", label: "\u57FA\u672C\u4FE1\u606F", icon: "bi bi-person" },
      { key: "edit", label: "\u7F16\u8F91\u8D44\u6599", icon: "bi bi-pencil-square" },
      { key: "password", label: "\u4FEE\u6539\u5BC6\u7801", icon: "bi bi-shield-lock" }
    ];
    const editForm = reactive({
      username: "",
      nickname: "",
      phone: ""
    });
    const passwordForm = reactive({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    const roleStyles = {
      user: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
      merchant: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
      admin: "bg-red-500/20 text-red-300 border border-red-500/30"
    };
    const roleLabels = {
      user: "\u666E\u901A\u7528\u6237",
      merchant: "\u5546\u5BB6",
      admin: "\u7BA1\u7406\u5458"
    };
    const statusStyles = {
      active: "bg-green-500/20 text-green-300 border border-green-500/30",
      inactive: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
      banned: "bg-red-500/20 text-red-300 border border-red-500/30"
    };
    const statusLabels = {
      active: "\u6B63\u5E38",
      inactive: "\u672A\u6FC0\u6D3B",
      banned: "\u5DF2\u5C01\u7981"
    };
    const updateProfile = async () => {
      try {
        updating.value = true;
        const response = await api.auth.updateProfile(editForm);
        if (response.data) {
          userStore.updateUser(response.data);
          success("\u4E2A\u4EBA\u4FE1\u606F\u66F4\u65B0\u6210\u529F\uFF01");
          activeTab.value = "info";
        }
      } catch (error2) {
        console.error("\u66F4\u65B0\u4E2A\u4EBA\u4FE1\u606F\u5931\u8D25:", error2);
        error2(error2.message || "\u66F4\u65B0\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      } finally {
        updating.value = false;
      }
    };
    const changePassword = async () => {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        error("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4");
        return;
      }
      try {
        changingPassword.value = true;
        const response = await api.auth.changePassword({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        });
        if (response.success) {
          success("\u5BC6\u7801\u4FEE\u6539\u6210\u529F\uFF01");
          resetPasswordForm();
          activeTab.value = "info";
        }
      } catch (error2) {
        console.error("\u4FEE\u6539\u5BC6\u7801\u5931\u8D25:", error2);
        error2(error2.message || "\u4FEE\u6539\u5BC6\u7801\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      } finally {
        changingPassword.value = false;
      }
    };
    const resetEditForm = () => {
      if (userStore.user) {
        editForm.username = userStore.user.username;
        editForm.nickname = userStore.user.nickname || "";
        editForm.phone = userStore.user.phone || "";
      }
    };
    const resetPasswordForm = () => {
      passwordForm.currentPassword = "";
      passwordForm.newPassword = "";
      passwordForm.confirmPassword = "";
    };
    const triggerFileInput = () => {
      var _a2;
      (_a2 = (void 0).getElementById("avatar-input")) == null ? void 0 : _a2.click();
    };
    const onFileChange = (event) => {
      var _a2;
      const target = event.target;
      const file = (_a2 = target.files) == null ? void 0 : _a2[0];
      if (file) {
        const validation = uploadApi.validateImageFile(file);
        if (!validation.valid) {
          error(validation.message || "\u6587\u4EF6\u683C\u5F0F\u4E0D\u652F\u6301");
          return;
        }
        selectedFile.value = file;
        avatarPreview.value = uploadApi.getFilePreviewUrl(file);
      }
    };
    const uploadAvatar = async () => {
      if (!selectedFile.value) return;
      try {
        uploadingAvatar.value = true;
        const validation = uploadApi.validateImageFile(selectedFile.value);
        if (!validation.valid) {
          error(validation.message || "\u6587\u4EF6\u9A8C\u8BC1\u5931\u8D25");
          return;
        }
        const response = await uploadApi.uploadAvatar(selectedFile.value);
        if (response.success && response.data) {
          userStore.updateUser(response.data.user);
          success("\u5934\u50CF\u4E0A\u4F20\u6210\u529F\uFF01");
          closeAvatarModal();
        } else {
          throw new Error(response.message || "\u4E0A\u4F20\u5931\u8D25");
        }
      } catch (error2) {
        console.error("\u4E0A\u4F20\u5934\u50CF\u5931\u8D25:", error2);
        error2(error2.message || "\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      } finally {
        uploadingAvatar.value = false;
      }
    };
    const closeAvatarModal = () => {
      showAvatarModal.value = false;
      selectedFile.value = null;
      if (avatarPreview.value) {
        uploadApi.releaseFilePreviewUrl(avatarPreview.value);
        avatarPreview.value = null;
      }
    };
    const handleAvatarError = (event) => {
      console.log("\u5934\u50CF\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u5934\u50CF");
      const target = event.target;
      target.style.display = "none";
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("zh-CN");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageLoader = __nuxt_component_0;
      const _component_AppHeader = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_PageLoader, mergeProps({
        "is-page-loading": unref(isPageLoading),
        "is-data-loading": unref(isDataLoading),
        "has-error": unref(hasError),
        "error-message": unref(errorMessage),
        "loading-title": "\u6B63\u5728\u52A0\u8F7D\u7528\u6237\u4FE1\u606F...",
        "loading-message": "\u8BF7\u7A0D\u5019",
        onRetry: unref(reloadPage)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L;
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" data-v-132164ff${_scopeId}><div class="fixed inset-0 pointer-events-none" data-v-132164ff${_scopeId}><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-132164ff${_scopeId}></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-132164ff${_scopeId}></div></div>`);
            _push2(ssrRenderComponent(_component_AppHeader, {
              "show-back-button": false,
              "show-nav-menu": false,
              "show-breadcrumb": true,
              "show-location": false,
              "show-search-button": false,
              "show-notification-button": false,
              "show-decorations": false,
              "logo-size": "medium",
              "current-page-title": "\u4E2A\u4EBA\u4E2D\u5FC3"
            }, null, _parent2, _scopeId));
            _push2(`<div class="relative z-10 py-8" data-v-132164ff${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-v-132164ff${_scopeId}><div class="mb-8 animate-fade-in-up" data-v-132164ff${_scopeId}><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-132164ff${_scopeId}><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-132164ff${_scopeId}><i class="bi bi-person-circle text-cyan-400 text-3xl animate-bounce-gentle" data-v-132164ff${_scopeId}></i> \u4E2A\u4EBA\u4E2D\u5FC3 </h1><p class="text-gray-300 text-lg" data-v-132164ff${_scopeId}>\u7BA1\u7406\u60A8\u7684\u4E2A\u4EBA\u4FE1\u606F\u548C\u8D26\u6237\u8BBE\u7F6E</p></div></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6 animate-fade-in-up animation-delay-200" data-v-132164ff${_scopeId}><div class="flex items-center space-x-6" data-v-132164ff${_scopeId}><div class="relative group" data-v-132164ff${_scopeId}><div class="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 transform group-hover:scale-105 overflow-hidden" data-v-132164ff${_scopeId}>`);
            if ((_a2 = unref(userStore).user) == null ? void 0 : _a2.avatar) {
              _push2(`<img${ssrRenderAttr("src", unref(userStore).user.avatar)}${ssrRenderAttr("alt", (((_b = unref(userStore).user) == null ? void 0 : _b.nickname) || ((_c = unref(userStore).user) == null ? void 0 : _c.username) || "U") + "\u7684\u5934\u50CF")} class="w-full h-full object-cover" data-v-132164ff${_scopeId}>`);
            } else {
              _push2(`<span data-v-132164ff${_scopeId}>${ssrInterpolate((((_d = unref(userStore).user) == null ? void 0 : _d.nickname) || ((_e = unref(userStore).user) == null ? void 0 : _e.username) || "U").charAt(0).toUpperCase())}</span>`);
            }
            _push2(`</div><button class="absolute bottom-0 right-0 bg-cyan-500 text-white rounded-full p-2 hover:bg-cyan-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-cyan-500/20" data-v-132164ff${_scopeId}><i class="bi bi-camera text-sm" data-v-132164ff${_scopeId}></i></button></div><div class="flex-1" data-v-132164ff${_scopeId}><h2 class="text-2xl font-bold text-white mb-2" data-v-132164ff${_scopeId}>${ssrInterpolate(((_f = unref(userStore).user) == null ? void 0 : _f.nickname) || ((_g = unref(userStore).user) == null ? void 0 : _g.username) || "\u52A0\u8F7D\u4E2D...")}</h2><p class="text-gray-300 mb-1" data-v-132164ff${_scopeId}>${ssrInterpolate(((_h = unref(userStore).user) == null ? void 0 : _h.email) || "")}</p>`);
            if (((_i = unref(userStore).user) == null ? void 0 : _i.nickname) && ((_j = unref(userStore).user) == null ? void 0 : _j.username)) {
              _push2(`<p class="text-sm text-gray-400" data-v-132164ff${_scopeId}>\u7528\u6237\u540D: ${ssrInterpolate(unref(userStore).user.username)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center space-x-4 mt-3" data-v-132164ff${_scopeId}><span class="${ssrRenderClass([roleStyles[((_k = unref(userStore).user) == null ? void 0 : _k.role) || "user"], "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"])}" data-v-132164ff${_scopeId}>${ssrInterpolate(roleLabels[((_l = unref(userStore).user) == null ? void 0 : _l.role) || "user"])}</span><span class="${ssrRenderClass([statusStyles[((_m = unref(userStore).user) == null ? void 0 : _m.status) || "active"], "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"])}" data-v-132164ff${_scopeId}>${ssrInterpolate(statusLabels[((_n = unref(userStore).user) == null ? void 0 : _n.status) || "active"])}</span></div></div><div class="flex flex-col space-y-3" data-v-132164ff${_scopeId}><button class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-132164ff${_scopeId}><i class="bi bi-pencil-square mr-2" data-v-132164ff${_scopeId}></i> \u7F16\u8F91\u8D44\u6599 </button><button class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-132164ff${_scopeId}><i class="bi bi-shield-lock mr-2" data-v-132164ff${_scopeId}></i> \u4FEE\u6539\u5BC6\u7801 </button></div></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-up animation-delay-400" data-v-132164ff${_scopeId}><div class="border-b border-gray-700/50" data-v-132164ff${_scopeId}><nav class="flex space-x-8" data-v-132164ff${_scopeId}><!--[-->`);
            ssrRenderList(tabs, (tab) => {
              _push2(`<button class="${ssrRenderClass([
                "py-3 px-6 text-sm font-medium border-b-2 transition-all duration-300 flex items-center gap-2",
                activeTab.value === tab.key ? "border-cyan-500 text-cyan-400 bg-cyan-500/10" : "border-transparent text-gray-400 hover:text-white hover:border-gray-500"
              ])}" data-v-132164ff${_scopeId}><i class="${ssrRenderClass(tab.icon)}" data-v-132164ff${_scopeId}></i> ${ssrInterpolate(tab.label)}</button>`);
            });
            _push2(`<!--]--></nav></div><div class="p-8" data-v-132164ff${_scopeId}>`);
            if (activeTab.value === "info") {
              _push2(`<div class="space-y-6 animate-fade-in" data-v-132164ff${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-132164ff${_scopeId}><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-132164ff${_scopeId}><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-132164ff${_scopeId}>\u7528\u6237\u540D</label><p class="text-white text-lg" data-v-132164ff${_scopeId}>${ssrInterpolate(((_o = unref(userStore).user) == null ? void 0 : _o.username) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-132164ff${_scopeId}><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-132164ff${_scopeId}>\u6635\u79F0</label><p class="text-white text-lg" data-v-132164ff${_scopeId}>${ssrInterpolate(((_p = unref(userStore).user) == null ? void 0 : _p.nickname) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-132164ff${_scopeId}><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-132164ff${_scopeId}>\u90AE\u7BB1</label><p class="text-white text-lg" data-v-132164ff${_scopeId}>${ssrInterpolate(((_q = unref(userStore).user) == null ? void 0 : _q.email) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-132164ff${_scopeId}><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-132164ff${_scopeId}>\u624B\u673A\u53F7</label><p class="text-white text-lg" data-v-132164ff${_scopeId}>${ssrInterpolate(((_r = unref(userStore).user) == null ? void 0 : _r.phone) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 md:col-span-2" data-v-132164ff${_scopeId}><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-132164ff${_scopeId}>\u6CE8\u518C\u65F6\u95F4</label><p class="text-white text-lg" data-v-132164ff${_scopeId}>${ssrInterpolate(formatDate((_s = unref(userStore).user) == null ? void 0 : _s.created_at) || "-")}</p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "edit") {
              _push2(`<div class="space-y-6 animate-fade-in" data-v-132164ff${_scopeId}><form data-v-132164ff${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-132164ff${_scopeId}><div class="space-y-2" data-v-132164ff${_scopeId}><label for="username" class="block text-sm font-medium text-cyan-400" data-v-132164ff${_scopeId}>\u7528\u6237\u540D</label><input id="username"${ssrRenderAttr("value", editForm.username)} type="text" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u7528\u6237\u540D" data-v-132164ff${_scopeId}></div><div class="space-y-2" data-v-132164ff${_scopeId}><label for="nickname" class="block text-sm font-medium text-cyan-400" data-v-132164ff${_scopeId}>\u6635\u79F0</label><input id="nickname"${ssrRenderAttr("value", editForm.nickname)} type="text" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u6635\u79F0" data-v-132164ff${_scopeId}></div><div class="space-y-2 md:col-span-2" data-v-132164ff${_scopeId}><label for="phone" class="block text-sm font-medium text-cyan-400" data-v-132164ff${_scopeId}>\u624B\u673A\u53F7</label><input id="phone"${ssrRenderAttr("value", editForm.phone)} type="tel" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u624B\u673A\u53F7" data-v-132164ff${_scopeId}></div></div><div class="flex justify-end space-x-4 mt-8" data-v-132164ff${_scopeId}><button type="button" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-132164ff${_scopeId}><i class="bi bi-arrow-clockwise mr-2" data-v-132164ff${_scopeId}></i> \u91CD\u7F6E </button><button type="submit"${ssrIncludeBooleanAttr(updating.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-132164ff${_scopeId}>`);
              if (updating.value) {
                _push2(`<span class="loading loading-spinner loading-sm mr-2" data-v-132164ff${_scopeId}></span>`);
              } else {
                _push2(`<i class="bi bi-check-circle mr-2" data-v-132164ff${_scopeId}></i>`);
              }
              _push2(` ${ssrInterpolate(updating.value ? "\u4FDD\u5B58\u4E2D..." : "\u4FDD\u5B58\u4FEE\u6539")}</button></div></form></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "password") {
              _push2(`<div class="space-y-6 animate-fade-in" data-v-132164ff${_scopeId}><form data-v-132164ff${_scopeId}><div class="max-w-md space-y-6" data-v-132164ff${_scopeId}><div class="space-y-2" data-v-132164ff${_scopeId}><label for="currentPassword" class="block text-sm font-medium text-cyan-400" data-v-132164ff${_scopeId}>\u5F53\u524D\u5BC6\u7801</label><input id="currentPassword"${ssrRenderAttr("value", passwordForm.currentPassword)} type="password" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u5F53\u524D\u5BC6\u7801" required data-v-132164ff${_scopeId}></div><div class="space-y-2" data-v-132164ff${_scopeId}><label for="newPassword" class="block text-sm font-medium text-cyan-400" data-v-132164ff${_scopeId}>\u65B0\u5BC6\u7801</label><input id="newPassword"${ssrRenderAttr("value", passwordForm.newPassword)} type="password" class="input-dark w-full" placeholder="\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801\uFF08\u81F3\u5C116\u4F4D\uFF09" required minlength="6" data-v-132164ff${_scopeId}></div><div class="space-y-2" data-v-132164ff${_scopeId}><label for="confirmPassword" class="block text-sm font-medium text-cyan-400" data-v-132164ff${_scopeId}>\u786E\u8BA4\u65B0\u5BC6\u7801</label><input id="confirmPassword"${ssrRenderAttr("value", passwordForm.confirmPassword)} type="password" class="input-dark w-full" placeholder="\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801" required data-v-132164ff${_scopeId}></div></div><div class="flex justify-end space-x-4 mt-8" data-v-132164ff${_scopeId}><button type="button" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-132164ff${_scopeId}><i class="bi bi-arrow-clockwise mr-2" data-v-132164ff${_scopeId}></i> \u91CD\u7F6E </button><button type="submit"${ssrIncludeBooleanAttr(changingPassword.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-132164ff${_scopeId}>`);
              if (changingPassword.value) {
                _push2(`<span class="loading loading-spinner loading-sm mr-2" data-v-132164ff${_scopeId}></span>`);
              } else {
                _push2(`<i class="bi bi-shield-check mr-2" data-v-132164ff${_scopeId}></i>`);
              }
              _push2(` ${ssrInterpolate(changingPassword.value ? "\u4FEE\u6539\u4E2D..." : "\u4FEE\u6539\u5BC6\u7801")}</button></div></form></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
            if (showAvatarModal.value) {
              _push2(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" data-v-132164ff${_scopeId}><div class="glass-card-dark rounded-2xl p-6 max-w-md w-full mx-4 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-scale-in" data-v-132164ff${_scopeId}><h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-3" data-v-132164ff${_scopeId}><i class="bi bi-camera text-cyan-400" data-v-132164ff${_scopeId}></i> \u4E0A\u4F20\u5934\u50CF </h3><div class="space-y-6" data-v-132164ff${_scopeId}><div class="flex justify-center" data-v-132164ff${_scopeId}><div class="relative" data-v-132164ff${_scopeId}><input id="avatar-input" type="file" accept="image/*" class="hidden" data-v-132164ff${_scopeId}><div class="w-32 h-32 border-2 border-dashed border-cyan-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 transition-colors duration-300 cursor-pointer overflow-hidden" data-v-132164ff${_scopeId}>`);
              if (avatarPreview.value) {
                _push2(`<img${ssrRenderAttr("src", avatarPreview.value)} alt="\u5934\u50CF\u9884\u89C8" class="w-full h-full object-cover" data-v-132164ff${_scopeId}>`);
              } else {
                _push2(`<div class="text-center" data-v-132164ff${_scopeId}><i class="bi bi-cloud-upload text-3xl text-cyan-400 mb-2 block" data-v-132164ff${_scopeId}></i><span class="text-sm text-gray-400" data-v-132164ff${_scopeId}>\u70B9\u51FB\u9009\u62E9\u56FE\u7247</span></div>`);
              }
              _push2(`</div>`);
              if (avatarPreview.value) {
                _push2(`<button class="absolute top-0 right-0 bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-400 transition-colors duration-200" data-v-132164ff${_scopeId}><i class="bi bi-pencil text-xs" data-v-132164ff${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (selectedFile.value) {
                _push2(`<div class="text-center" data-v-132164ff${_scopeId}><p class="text-sm text-gray-400" data-v-132164ff${_scopeId}>${ssrInterpolate(selectedFile.value.name)}</p><p class="text-xs text-gray-500" data-v-132164ff${_scopeId}>${ssrInterpolate((selectedFile.value.size / 1024 / 1024).toFixed(2))} MB</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-center text-gray-400 text-sm" data-v-132164ff${_scopeId}> \u652F\u6301 JPG\u3001PNG\u3001GIF\u3001WebP \u683C\u5F0F<br data-v-132164ff${_scopeId}> \u6587\u4EF6\u5927\u5C0F\u4E0D\u8D85\u8FC7 2MB </p><div class="flex justify-end space-x-4" data-v-132164ff${_scopeId}><button class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-132164ff${_scopeId}><i class="bi bi-x-circle mr-2" data-v-132164ff${_scopeId}></i> \u53D6\u6D88 </button><button${ssrIncludeBooleanAttr(!selectedFile.value || uploadingAvatar.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-132164ff${_scopeId}>`);
              if (uploadingAvatar.value) {
                _push2(`<span class="loading loading-spinner loading-sm mr-2" data-v-132164ff${_scopeId}></span>`);
              } else {
                _push2(`<i class="bi bi-check-circle mr-2" data-v-132164ff${_scopeId}></i>`);
              }
              _push2(` ${ssrInterpolate(uploadingAvatar.value ? "\u4E0A\u4F20\u4E2D..." : "\u786E\u5B9A\u4E0A\u4F20")}</button></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" }, [
                createVNode("div", { class: "fixed inset-0 pointer-events-none" }, [
                  createVNode("div", { class: "absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" }),
                  createVNode("div", { class: "absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" })
                ]),
                createVNode(_component_AppHeader, {
                  "show-back-button": false,
                  "show-nav-menu": false,
                  "show-breadcrumb": true,
                  "show-location": false,
                  "show-search-button": false,
                  "show-notification-button": false,
                  "show-decorations": false,
                  "logo-size": "medium",
                  "current-page-title": "\u4E2A\u4EBA\u4E2D\u5FC3"
                }),
                createVNode("div", { class: "relative z-10 py-8" }, [
                  createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                    createVNode("div", { class: "mb-8 animate-fade-in-up" }, [
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" }, [
                        createVNode("h1", { class: "text-4xl font-bold text-white mb-3 flex items-center gap-3" }, [
                          createVNode("i", { class: "bi bi-person-circle text-cyan-400 text-3xl animate-bounce-gentle" }),
                          createTextVNode(" \u4E2A\u4EBA\u4E2D\u5FC3 ")
                        ]),
                        createVNode("p", { class: "text-gray-300 text-lg" }, "\u7BA1\u7406\u60A8\u7684\u4E2A\u4EBA\u4FE1\u606F\u548C\u8D26\u6237\u8BBE\u7F6E")
                      ])
                    ]),
                    createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6 animate-fade-in-up animation-delay-200" }, [
                      createVNode("div", { class: "flex items-center space-x-6" }, [
                        createVNode("div", { class: "relative group" }, [
                          createVNode("div", { class: "w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 transform group-hover:scale-105 overflow-hidden" }, [
                            ((_t = unref(userStore).user) == null ? void 0 : _t.avatar) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: unref(userStore).user.avatar,
                              alt: (((_u = unref(userStore).user) == null ? void 0 : _u.nickname) || ((_v = unref(userStore).user) == null ? void 0 : _v.username) || "U") + "\u7684\u5934\u50CF",
                              class: "w-full h-full object-cover",
                              onError: handleAvatarError
                            }, null, 40, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString((((_w = unref(userStore).user) == null ? void 0 : _w.nickname) || ((_x = unref(userStore).user) == null ? void 0 : _x.username) || "U").charAt(0).toUpperCase()), 1))
                          ]),
                          createVNode("button", {
                            onClick: ($event) => showAvatarModal.value = true,
                            class: "absolute bottom-0 right-0 bg-cyan-500 text-white rounded-full p-2 hover:bg-cyan-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-cyan-500/20"
                          }, [
                            createVNode("i", { class: "bi bi-camera text-sm" })
                          ], 8, ["onClick"])
                        ]),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("h2", { class: "text-2xl font-bold text-white mb-2" }, toDisplayString(((_y = unref(userStore).user) == null ? void 0 : _y.nickname) || ((_z = unref(userStore).user) == null ? void 0 : _z.username) || "\u52A0\u8F7D\u4E2D..."), 1),
                          createVNode("p", { class: "text-gray-300 mb-1" }, toDisplayString(((_A = unref(userStore).user) == null ? void 0 : _A.email) || ""), 1),
                          ((_B = unref(userStore).user) == null ? void 0 : _B.nickname) && ((_C = unref(userStore).user) == null ? void 0 : _C.username) ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-gray-400"
                          }, "\u7528\u6237\u540D: " + toDisplayString(unref(userStore).user.username), 1)) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center space-x-4 mt-3" }, [
                            createVNode("span", {
                              class: ["inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", roleStyles[((_D = unref(userStore).user) == null ? void 0 : _D.role) || "user"]]
                            }, toDisplayString(roleLabels[((_E = unref(userStore).user) == null ? void 0 : _E.role) || "user"]), 3),
                            createVNode("span", {
                              class: ["inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", statusStyles[((_F = unref(userStore).user) == null ? void 0 : _F.status) || "active"]]
                            }, toDisplayString(statusLabels[((_G = unref(userStore).user) == null ? void 0 : _G.status) || "active"]), 3)
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col space-y-3" }, [
                          createVNode("button", {
                            onClick: ($event) => activeTab.value = "edit",
                            class: "btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                          }, [
                            createVNode("i", { class: "bi bi-pencil-square mr-2" }),
                            createTextVNode(" \u7F16\u8F91\u8D44\u6599 ")
                          ], 8, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => activeTab.value = "password",
                            class: "btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                          }, [
                            createVNode("i", { class: "bi bi-shield-lock mr-2" }),
                            createTextVNode(" \u4FEE\u6539\u5BC6\u7801 ")
                          ], 8, ["onClick"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-up animation-delay-400" }, [
                      createVNode("div", { class: "border-b border-gray-700/50" }, [
                        createVNode("nav", { class: "flex space-x-8" }, [
                          (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                            return createVNode("button", {
                              key: tab.key,
                              onClick: ($event) => activeTab.value = tab.key,
                              class: [
                                "py-3 px-6 text-sm font-medium border-b-2 transition-all duration-300 flex items-center gap-2",
                                activeTab.value === tab.key ? "border-cyan-500 text-cyan-400 bg-cyan-500/10" : "border-transparent text-gray-400 hover:text-white hover:border-gray-500"
                              ]
                            }, [
                              createVNode("i", {
                                class: tab.icon
                              }, null, 2),
                              createTextVNode(" " + toDisplayString(tab.label), 1)
                            ], 10, ["onClick"]);
                          }), 64))
                        ])
                      ]),
                      createVNode("div", { class: "p-8" }, [
                        activeTab.value === "info" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-6 animate-fade-in"
                        }, [
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" }, [
                              createVNode("label", { class: "block text-sm font-medium text-cyan-400 mb-2" }, "\u7528\u6237\u540D"),
                              createVNode("p", { class: "text-white text-lg" }, toDisplayString(((_H = unref(userStore).user) == null ? void 0 : _H.username) || "-"), 1)
                            ]),
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" }, [
                              createVNode("label", { class: "block text-sm font-medium text-cyan-400 mb-2" }, "\u6635\u79F0"),
                              createVNode("p", { class: "text-white text-lg" }, toDisplayString(((_I = unref(userStore).user) == null ? void 0 : _I.nickname) || "-"), 1)
                            ]),
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" }, [
                              createVNode("label", { class: "block text-sm font-medium text-cyan-400 mb-2" }, "\u90AE\u7BB1"),
                              createVNode("p", { class: "text-white text-lg" }, toDisplayString(((_J = unref(userStore).user) == null ? void 0 : _J.email) || "-"), 1)
                            ]),
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" }, [
                              createVNode("label", { class: "block text-sm font-medium text-cyan-400 mb-2" }, "\u624B\u673A\u53F7"),
                              createVNode("p", { class: "text-white text-lg" }, toDisplayString(((_K = unref(userStore).user) == null ? void 0 : _K.phone) || "-"), 1)
                            ]),
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 md:col-span-2" }, [
                              createVNode("label", { class: "block text-sm font-medium text-cyan-400 mb-2" }, "\u6CE8\u518C\u65F6\u95F4"),
                              createVNode("p", { class: "text-white text-lg" }, toDisplayString(formatDate((_L = unref(userStore).user) == null ? void 0 : _L.created_at) || "-"), 1)
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        activeTab.value === "edit" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-6 animate-fade-in"
                        }, [
                          createVNode("form", {
                            onSubmit: withModifiers(updateProfile, ["prevent"])
                          }, [
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("label", {
                                  for: "username",
                                  class: "block text-sm font-medium text-cyan-400"
                                }, "\u7528\u6237\u540D"),
                                withDirectives(createVNode("input", {
                                  id: "username",
                                  "onUpdate:modelValue": ($event) => editForm.username = $event,
                                  type: "text",
                                  class: "input-dark w-full",
                                  placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, editForm.username]
                                ])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("label", {
                                  for: "nickname",
                                  class: "block text-sm font-medium text-cyan-400"
                                }, "\u6635\u79F0"),
                                withDirectives(createVNode("input", {
                                  id: "nickname",
                                  "onUpdate:modelValue": ($event) => editForm.nickname = $event,
                                  type: "text",
                                  class: "input-dark w-full",
                                  placeholder: "\u8BF7\u8F93\u5165\u6635\u79F0"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, editForm.nickname]
                                ])
                              ]),
                              createVNode("div", { class: "space-y-2 md:col-span-2" }, [
                                createVNode("label", {
                                  for: "phone",
                                  class: "block text-sm font-medium text-cyan-400"
                                }, "\u624B\u673A\u53F7"),
                                withDirectives(createVNode("input", {
                                  id: "phone",
                                  "onUpdate:modelValue": ($event) => editForm.phone = $event,
                                  type: "tel",
                                  class: "input-dark w-full",
                                  placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, editForm.phone]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "flex justify-end space-x-4 mt-8" }, [
                              createVNode("button", {
                                type: "button",
                                onClick: resetEditForm,
                                class: "btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                              }, [
                                createVNode("i", { class: "bi bi-arrow-clockwise mr-2" }),
                                createTextVNode(" \u91CD\u7F6E ")
                              ]),
                              createVNode("button", {
                                type: "submit",
                                disabled: updating.value,
                                class: "btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                              }, [
                                updating.value ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "loading loading-spinner loading-sm mr-2"
                                })) : (openBlock(), createBlock("i", {
                                  key: 1,
                                  class: "bi bi-check-circle mr-2"
                                })),
                                createTextVNode(" " + toDisplayString(updating.value ? "\u4FDD\u5B58\u4E2D..." : "\u4FDD\u5B58\u4FEE\u6539"), 1)
                              ], 8, ["disabled"])
                            ])
                          ], 32)
                        ])) : createCommentVNode("", true),
                        activeTab.value === "password" ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "space-y-6 animate-fade-in"
                        }, [
                          createVNode("form", {
                            onSubmit: withModifiers(changePassword, ["prevent"])
                          }, [
                            createVNode("div", { class: "max-w-md space-y-6" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("label", {
                                  for: "currentPassword",
                                  class: "block text-sm font-medium text-cyan-400"
                                }, "\u5F53\u524D\u5BC6\u7801"),
                                withDirectives(createVNode("input", {
                                  id: "currentPassword",
                                  "onUpdate:modelValue": ($event) => passwordForm.currentPassword = $event,
                                  type: "password",
                                  class: "input-dark w-full",
                                  placeholder: "\u8BF7\u8F93\u5165\u5F53\u524D\u5BC6\u7801",
                                  required: ""
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, passwordForm.currentPassword]
                                ])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("label", {
                                  for: "newPassword",
                                  class: "block text-sm font-medium text-cyan-400"
                                }, "\u65B0\u5BC6\u7801"),
                                withDirectives(createVNode("input", {
                                  id: "newPassword",
                                  "onUpdate:modelValue": ($event) => passwordForm.newPassword = $event,
                                  type: "password",
                                  class: "input-dark w-full",
                                  placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801\uFF08\u81F3\u5C116\u4F4D\uFF09",
                                  required: "",
                                  minlength: "6"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, passwordForm.newPassword]
                                ])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("label", {
                                  for: "confirmPassword",
                                  class: "block text-sm font-medium text-cyan-400"
                                }, "\u786E\u8BA4\u65B0\u5BC6\u7801"),
                                withDirectives(createVNode("input", {
                                  id: "confirmPassword",
                                  "onUpdate:modelValue": ($event) => passwordForm.confirmPassword = $event,
                                  type: "password",
                                  class: "input-dark w-full",
                                  placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801",
                                  required: ""
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, passwordForm.confirmPassword]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "flex justify-end space-x-4 mt-8" }, [
                              createVNode("button", {
                                type: "button",
                                onClick: resetPasswordForm,
                                class: "btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                              }, [
                                createVNode("i", { class: "bi bi-arrow-clockwise mr-2" }),
                                createTextVNode(" \u91CD\u7F6E ")
                              ]),
                              createVNode("button", {
                                type: "submit",
                                disabled: changingPassword.value,
                                class: "btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                              }, [
                                changingPassword.value ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "loading loading-spinner loading-sm mr-2"
                                })) : (openBlock(), createBlock("i", {
                                  key: 1,
                                  class: "bi bi-shield-check mr-2"
                                })),
                                createTextVNode(" " + toDisplayString(changingPassword.value ? "\u4FEE\u6539\u4E2D..." : "\u4FEE\u6539\u5BC6\u7801"), 1)
                              ], 8, ["disabled"])
                            ])
                          ], 32)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                showAvatarModal.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
                }, [
                  createVNode("div", { class: "glass-card-dark rounded-2xl p-6 max-w-md w-full mx-4 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-scale-in" }, [
                    createVNode("h3", { class: "text-xl font-semibold text-white mb-6 flex items-center gap-3" }, [
                      createVNode("i", { class: "bi bi-camera text-cyan-400" }),
                      createTextVNode(" \u4E0A\u4F20\u5934\u50CF ")
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "flex justify-center" }, [
                        createVNode("div", { class: "relative" }, [
                          createVNode("input", {
                            id: "avatar-input",
                            type: "file",
                            accept: "image/*",
                            onChange: onFileChange,
                            class: "hidden"
                          }, null, 32),
                          createVNode("div", {
                            onClick: triggerFileInput,
                            class: "w-32 h-32 border-2 border-dashed border-cyan-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 transition-colors duration-300 cursor-pointer overflow-hidden"
                          }, [
                            avatarPreview.value ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: avatarPreview.value,
                              alt: "\u5934\u50CF\u9884\u89C8",
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-center"
                            }, [
                              createVNode("i", { class: "bi bi-cloud-upload text-3xl text-cyan-400 mb-2 block" }),
                              createVNode("span", { class: "text-sm text-gray-400" }, "\u70B9\u51FB\u9009\u62E9\u56FE\u7247")
                            ]))
                          ]),
                          avatarPreview.value ? (openBlock(), createBlock("button", {
                            key: 0,
                            onClick: triggerFileInput,
                            class: "absolute top-0 right-0 bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-400 transition-colors duration-200"
                          }, [
                            createVNode("i", { class: "bi bi-pencil text-xs" })
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      selectedFile.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center"
                      }, [
                        createVNode("p", { class: "text-sm text-gray-400" }, toDisplayString(selectedFile.value.name), 1),
                        createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString((selectedFile.value.size / 1024 / 1024).toFixed(2)) + " MB", 1)
                      ])) : createCommentVNode("", true),
                      createVNode("p", { class: "text-center text-gray-400 text-sm" }, [
                        createTextVNode(" \u652F\u6301 JPG\u3001PNG\u3001GIF\u3001WebP \u683C\u5F0F"),
                        createVNode("br"),
                        createTextVNode(" \u6587\u4EF6\u5927\u5C0F\u4E0D\u8D85\u8FC7 2MB ")
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-4" }, [
                        createVNode("button", {
                          onClick: closeAvatarModal,
                          class: "btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                        }, [
                          createVNode("i", { class: "bi bi-x-circle mr-2" }),
                          createTextVNode(" \u53D6\u6D88 ")
                        ]),
                        createVNode("button", {
                          onClick: uploadAvatar,
                          disabled: !selectedFile.value || uploadingAvatar.value,
                          class: "btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        }, [
                          uploadingAvatar.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "loading loading-spinner loading-sm mr-2"
                          })) : (openBlock(), createBlock("i", {
                            key: 1,
                            class: "bi bi-check-circle mr-2"
                          })),
                          createTextVNode(" " + toDisplayString(uploadingAvatar.value ? "\u4E0A\u4F20\u4E2D..." : "\u786E\u5B9A\u4E0A\u4F20"), 1)
                        ], 8, ["disabled"])
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-132164ff"]]);

export { profile as default };
//# sourceMappingURL=profile-BF2HD-eV.mjs.map
