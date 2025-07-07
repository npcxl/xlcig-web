import { _ as __nuxt_component_0 } from "./PageLoader-D_8ePMtq.js";
import { _ as __nuxt_component_0$1 } from "./AppHeader-DNVnt9sJ.js";
import { _ as __nuxt_component_0$2 } from "./nuxt-link-CA9RiB7n.js";
import { defineComponent, ref, reactive, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { o as ordersApi, u as usePageLoader, p as pageLoaderPresets } from "./orders-BQZi_qGk.js";
import { a as apiClient, L as LocationApi, c as createDiscreteApi } from "./useLocation-kga13ouX.js";
import { p as productsApi } from "./products-Djdy7C0u.js";
import { a as addressApi } from "./addresses-DgOrW5yr.js";
import { r as reviewsApi } from "./reviews-QOhVSK0r.js";
import { a as useUserStore, _ as _export_sfc } from "../server.mjs";
import "./AppLogo-B139whIQ.js";
import "vue-router";
import "seemly";
import "treemate";
import "vooks";
import "vdirs";
import "lodash-es";
import "css-render";
import "evtd";
import "D:/codeGitee/xlweb/node_modules/ufo/dist/index.mjs";
import "@css-render/plugin-bem";
import "ofetch";
import "#internal/nuxt/paths";
import "D:/codeGitee/xlweb/node_modules/hookable/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/unctx/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/codeGitee/xlweb/node_modules/defu/dist/defu.mjs";
import "D:/codeGitee/xlweb/node_modules/radix3/dist/index.mjs";
import "D:/codeGitee/xlweb/node_modules/klona/dist/index.mjs";
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
        message: "发送过于频繁，请60秒后再试"
      };
    }
    const code = Math.floor(1e5 + Math.random() * 9e5).toString();
    const messageHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>xlCig - 邮箱验证</title>
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
              邮箱验证
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 24px 20px; background: #1a1a1a;">
            
            <!-- Verification Code -->
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #ffffff; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
                验证码
              </h2>
              <p style="color: #888888; font-size: 13px; margin: 0 0 16px 0;">
                请输入以下验证码完成注册
              </p>
              
              <div style="background: #000000; border: 1px solid #333; border-radius: 6px; padding: 20px; margin: 16px 0;">
                <div style="font-size: 28px; font-weight: bold; color: #00f5ff; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                  ${code}
                </div>
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #333;">
                  <span style="color: #888888; font-size: 11px;">
                    有效期：10分钟
                  </span>
                </div>
              </div>
            </div>

            <!-- Security Notice -->
            <div style="background: #111111; border: 1px solid #333; border-radius: 4px; padding: 16px; margin: 16px 0;">
              <p style="color: #ffffff; font-size: 12px; font-weight: bold; margin: 0 0 6px 0;">
                🛡️ 安全提醒
              </p>
              <p style="color: #cccccc; font-size: 11px; margin: 0; line-height: 1.4;">
                • 请勿向任何人透露此验证码<br>
                • 如非本人操作，请忽略此邮件
              </p>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: #000000; border-top: 1px solid #333; padding: 16px 20px; text-align: center;">
            <p style="color: #666666; font-size: 10px; margin: 0; line-height: 1.3;">
              此邮件由 xlCig 系统发送<br>
              <span style="color: #888888;">© 2025 xlCig</span>
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
    const title = "xlCig";
    const mailRequestData = {
      ColaKey: apiKey,
      // API密钥
      tomail: data.email,
      // 目标邮箱地址
      fromTitle: title,
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
        console.error("邮件服务响应错误:", errorData);
        throw new Error("邮件发送失败");
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
        message: "验证码发送成功，请查看您的邮箱",
        data: { message: "验证码已发送" }
      };
    } catch (error) {
      console.error("发送邮箱验证码失败:", error);
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
            message: "验证码发送成功，请查看您的邮箱",
            data: { message: "验证码已发送" }
          };
        }
      } catch (httpError) {
        console.error("HTTP邮件发送也失败:", httpError);
      }
      return {
        success: false,
        message: error instanceof Error ? error.message : "发送验证码失败，请稍后重试"
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
          message: "验证码不存在或已过期"
        });
      }
      const codeInfo = JSON.parse(storedData);
      const now = Date.now();
      if (now > codeInfo.expires) {
        localStorage.removeItem(`emailCode_${data.email}`);
        return Promise.resolve({
          success: false,
          message: "验证码已过期，请重新获取"
        });
      }
      if (codeInfo.code !== data.code) {
        return Promise.resolve({
          success: false,
          message: "验证码错误"
        });
      }
      localStorage.removeItem(`emailCode_${data.email}`);
      return Promise.resolve({
        success: true,
        message: "验证码验证成功",
        data: true
      });
    } catch (error) {
      return Promise.resolve({
        success: false,
        message: "验证码验证失败"
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
        message: "只支持 JPEG、PNG、GIF、WebP 格式的图片文件"
      };
    }
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        valid: false,
        message: "文件大小不能超过2MB"
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
  // 更新购物车项目
  updateCartItem: (id, data) => apiClient.put(`/cart/${id}`, data),
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
  // 检查库存状态
  checkStock: () => apiClient.get("/cart/check-stock"),
  // 刷新购物车产品信息
  refreshCartItems: (productIds) => apiClient.post("/cart/refresh", { productIds }),
  // 获取推荐商品
  getRecommendations: (limit = 8) => apiClient.get(`/cart/recommendations?limit=${limit}`),
  // 预估运费
  estimateShipping: (data) => apiClient.post("/cart/estimate-shipping", data),
  // 应用优惠券
  applyCoupon: (couponCode) => apiClient.post("/cart/apply-coupon", { couponCode }),
  // 移除优惠券
  removeCoupon: () => apiClient.delete("/cart/coupon")
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
  reviews: reviewsApi,
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
    const userReviews = ref([]);
    const reviewsCount = ref(0);
    const averageRating = ref(0);
    const helpfulCount = ref(0);
    const loadingReviews = ref(false);
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
        console.error("获取用户信息失败:", error2);
        throw new Error("获取用户信息失败");
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
      { key: "info", label: "基本信息", icon: "bi bi-person" },
      { key: "edit", label: "编辑资料", icon: "bi bi-pencil-square" },
      { key: "password", label: "修改密码", icon: "bi bi-shield-lock" },
      { key: "reviews", label: "我的评论", icon: "bi bi-chat-dots" }
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
      user: "普通用户",
      merchant: "商家",
      admin: "管理员"
    };
    const statusStyles = {
      active: "bg-green-500/20 text-green-300 border border-green-500/30",
      inactive: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
      banned: "bg-red-500/20 text-red-300 border border-red-500/30"
    };
    const statusLabels = {
      active: "正常",
      inactive: "未激活",
      banned: "已封禁"
    };
    const updateProfile = async () => {
      try {
        updating.value = true;
        const response = await api.auth.updateProfile(editForm);
        if (response.data) {
          userStore.updateUser(response.data);
          success("个人信息更新成功！");
          activeTab.value = "info";
        }
      } catch (error2) {
        console.error("更新个人信息失败:", error2);
        error2(error2.message || "更新失败，请重试");
      } finally {
        updating.value = false;
      }
    };
    const changePassword = async () => {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        error("两次输入的密码不一致");
        return;
      }
      try {
        changingPassword.value = true;
        const response = await api.auth.changePassword({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        });
        if (response.success) {
          success("密码修改成功！");
          resetPasswordForm();
          activeTab.value = "info";
        }
      } catch (error2) {
        console.error("修改密码失败:", error2);
        error2(error2.message || "修改密码失败，请重试");
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
          error(validation.message || "文件格式不支持");
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
          error(validation.message || "文件验证失败");
          return;
        }
        const response = await uploadApi.uploadAvatar(selectedFile.value);
        if (response.success && response.data) {
          userStore.updateUser(response.data.user);
          success("头像上传成功！");
          closeAvatarModal();
        } else {
          throw new Error(response.message || "上传失败");
        }
      } catch (error2) {
        console.error("上传头像失败:", error2);
        error2(error2.message || "上传失败，请重试");
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
      console.log("头像加载失败，使用默认头像");
      const target = event.target;
      target.style.display = "none";
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("zh-CN");
    };
    const loadUserReviews = async () => {
      try {
        loadingReviews.value = true;
        const response = await api.reviews.getMyReviews();
        if (response.data) {
          userReviews.value = response.data.reviews;
          reviewsCount.value = response.data.pagination.total_items;
          if (response.data.reviews.length > 0) {
            const totalRating = response.data.reviews.reduce((sum, review) => sum + review.rating, 0);
            averageRating.value = Math.round(totalRating / response.data.reviews.length * 10) / 10;
          }
          helpfulCount.value = response.data.reviews.reduce((sum, review) => sum + review.helpful_count, 0);
        }
      } catch (error2) {
        console.error("加载用户评论失败:", error2);
      } finally {
        loadingReviews.value = false;
      }
    };
    const editReview = (review) => {
      console.log("编辑评论:", review);
    };
    const deleteReview = async (reviewId) => {
      try {
        const confirmed = confirm("确定要删除这条评论吗？");
        if (!confirmed) return;
        await api.reviews.deleteReview(reviewId);
        success("评论删除成功");
        await loadUserReviews();
      } catch (error2) {
        console.error("删除评论失败:", error2);
        error2("删除评论失败，请重试");
      }
    };
    const getReviewStatusText = (status) => {
      const statusMap = {
        "pending": "待审核",
        "approved": "已通过",
        "rejected": "已拒绝"
      };
      return statusMap[status] || "未知";
    };
    watch(activeTab, (newTab) => {
      if (newTab === "reviews") {
        loadUserReviews();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageLoader = __nuxt_component_0;
      const _component_AppHeader = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_PageLoader, mergeProps({
        "is-page-loading": unref(isPageLoading),
        "is-data-loading": unref(isDataLoading),
        "has-error": unref(hasError),
        "error-message": unref(errorMessage),
        "loading-title": "正在加载用户信息...",
        "loading-message": "请稍候",
        onRetry: unref(reloadPage)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L;
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden" data-v-e0050807${_scopeId}><div class="fixed inset-0 pointer-events-none" data-v-e0050807${_scopeId}><div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse" data-v-e0050807${_scopeId}></div><div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" data-v-e0050807${_scopeId}></div></div>`);
            _push2(ssrRenderComponent(_component_AppHeader, {
              "show-back-button": false,
              "show-nav-menu": false,
              "show-breadcrumb": true,
              "show-location": false,
              "show-search-button": false,
              "show-notification-button": false,
              "show-decorations": false,
              "logo-size": "medium",
              "current-page-title": "个人中心"
            }, null, _parent2, _scopeId));
            _push2(`<div class="relative z-10 py-8" data-v-e0050807${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-v-e0050807${_scopeId}><div class="mb-8 animate-fade-in-up" data-v-e0050807${_scopeId}><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" data-v-e0050807${_scopeId}><h1 class="text-4xl font-bold text-white mb-3 flex items-center gap-3" data-v-e0050807${_scopeId}><i class="bi bi-person-circle text-cyan-400 text-3xl animate-bounce-gentle" data-v-e0050807${_scopeId}></i> 个人中心 </h1><p class="text-gray-300 text-lg" data-v-e0050807${_scopeId}>管理您的个人信息和账户设置</p></div></div><div class="glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6 animate-fade-in-up animation-delay-200" data-v-e0050807${_scopeId}><div class="flex items-center space-x-6" data-v-e0050807${_scopeId}><div class="relative group" data-v-e0050807${_scopeId}><div class="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 transform group-hover:scale-105 overflow-hidden" data-v-e0050807${_scopeId}>`);
            if ((_a2 = unref(userStore).user) == null ? void 0 : _a2.avatar) {
              _push2(`<img${ssrRenderAttr("src", unref(userStore).user.avatar)}${ssrRenderAttr("alt", (((_b = unref(userStore).user) == null ? void 0 : _b.nickname) || ((_c = unref(userStore).user) == null ? void 0 : _c.username) || "U") + "的头像")} class="w-full h-full object-cover" data-v-e0050807${_scopeId}>`);
            } else {
              _push2(`<span data-v-e0050807${_scopeId}>${ssrInterpolate((((_d = unref(userStore).user) == null ? void 0 : _d.nickname) || ((_e = unref(userStore).user) == null ? void 0 : _e.username) || "U").charAt(0).toUpperCase())}</span>`);
            }
            _push2(`</div><button class="absolute bottom-0 right-0 bg-cyan-500 text-white rounded-full p-2 hover:bg-cyan-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-cyan-500/20" data-v-e0050807${_scopeId}><i class="bi bi-camera text-sm" data-v-e0050807${_scopeId}></i></button></div><div class="flex-1" data-v-e0050807${_scopeId}><h2 class="text-2xl font-bold text-white mb-2" data-v-e0050807${_scopeId}>${ssrInterpolate(((_f = unref(userStore).user) == null ? void 0 : _f.nickname) || ((_g = unref(userStore).user) == null ? void 0 : _g.username) || "加载中...")}</h2><p class="text-gray-300 mb-1" data-v-e0050807${_scopeId}>${ssrInterpolate(((_h = unref(userStore).user) == null ? void 0 : _h.email) || "")}</p>`);
            if (((_i = unref(userStore).user) == null ? void 0 : _i.nickname) && ((_j = unref(userStore).user) == null ? void 0 : _j.username)) {
              _push2(`<p class="text-sm text-gray-400" data-v-e0050807${_scopeId}>用户名: ${ssrInterpolate(unref(userStore).user.username)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center space-x-4 mt-3" data-v-e0050807${_scopeId}><span class="${ssrRenderClass([roleStyles[((_k = unref(userStore).user) == null ? void 0 : _k.role) || "user"], "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"])}" data-v-e0050807${_scopeId}>${ssrInterpolate(roleLabels[((_l = unref(userStore).user) == null ? void 0 : _l.role) || "user"])}</span><span class="${ssrRenderClass([statusStyles[((_m = unref(userStore).user) == null ? void 0 : _m.status) || "active"], "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"])}" data-v-e0050807${_scopeId}>${ssrInterpolate(statusLabels[((_n = unref(userStore).user) == null ? void 0 : _n.status) || "active"])}</span></div></div><div class="flex flex-col space-y-3" data-v-e0050807${_scopeId}><button class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-e0050807${_scopeId}><i class="bi bi-pencil-square mr-2" data-v-e0050807${_scopeId}></i> 编辑资料 </button><button class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-e0050807${_scopeId}><i class="bi bi-shield-lock mr-2" data-v-e0050807${_scopeId}></i> 修改密码 </button></div></div></div><div class="glass-card-dark rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in-up animation-delay-400" data-v-e0050807${_scopeId}><div class="border-b border-gray-700/50" data-v-e0050807${_scopeId}><nav class="flex space-x-8" data-v-e0050807${_scopeId}><!--[-->`);
            ssrRenderList(tabs, (tab) => {
              _push2(`<button class="${ssrRenderClass([
                "py-3 px-6 text-sm font-medium border-b-2 transition-all duration-300 flex items-center gap-2",
                activeTab.value === tab.key ? "border-cyan-500 text-cyan-400 bg-cyan-500/10" : "border-transparent text-gray-400 hover:text-white hover:border-gray-500"
              ])}" data-v-e0050807${_scopeId}><i class="${ssrRenderClass(tab.icon)}" data-v-e0050807${_scopeId}></i> ${ssrInterpolate(tab.label)}</button>`);
            });
            _push2(`<!--]--></nav></div><div class="p-8" data-v-e0050807${_scopeId}>`);
            if (activeTab.value === "info") {
              _push2(`<div class="space-y-6 animate-fade-in" data-v-e0050807${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-e0050807${_scopeId}><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-e0050807${_scopeId}><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-e0050807${_scopeId}>用户名</label><p class="text-white text-lg" data-v-e0050807${_scopeId}>${ssrInterpolate(((_o = unref(userStore).user) == null ? void 0 : _o.username) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-e0050807${_scopeId}><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-e0050807${_scopeId}>昵称</label><p class="text-white text-lg" data-v-e0050807${_scopeId}>${ssrInterpolate(((_p = unref(userStore).user) == null ? void 0 : _p.nickname) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-e0050807${_scopeId}><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-e0050807${_scopeId}>邮箱</label><p class="text-white text-lg" data-v-e0050807${_scopeId}>${ssrInterpolate(((_q = unref(userStore).user) == null ? void 0 : _q.email) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-e0050807${_scopeId}><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-e0050807${_scopeId}>手机号</label><p class="text-white text-lg" data-v-e0050807${_scopeId}>${ssrInterpolate(((_r = unref(userStore).user) == null ? void 0 : _r.phone) || "-")}</p></div><div class="glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 md:col-span-2" data-v-e0050807${_scopeId}><label class="block text-sm font-medium text-cyan-400 mb-2" data-v-e0050807${_scopeId}>注册时间</label><p class="text-white text-lg" data-v-e0050807${_scopeId}>${ssrInterpolate(formatDate((_s = unref(userStore).user) == null ? void 0 : _s.created_at) || "-")}</p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "edit") {
              _push2(`<div class="space-y-6 animate-fade-in" data-v-e0050807${_scopeId}><form data-v-e0050807${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-e0050807${_scopeId}><div class="space-y-2" data-v-e0050807${_scopeId}><label for="username" class="block text-sm font-medium text-cyan-400" data-v-e0050807${_scopeId}>用户名</label><input id="username"${ssrRenderAttr("value", editForm.username)} type="text" class="input-dark w-full" placeholder="请输入用户名" data-v-e0050807${_scopeId}></div><div class="space-y-2" data-v-e0050807${_scopeId}><label for="nickname" class="block text-sm font-medium text-cyan-400" data-v-e0050807${_scopeId}>昵称</label><input id="nickname"${ssrRenderAttr("value", editForm.nickname)} type="text" class="input-dark w-full" placeholder="请输入昵称" data-v-e0050807${_scopeId}></div><div class="space-y-2 md:col-span-2" data-v-e0050807${_scopeId}><label for="phone" class="block text-sm font-medium text-cyan-400" data-v-e0050807${_scopeId}>手机号</label><input id="phone"${ssrRenderAttr("value", editForm.phone)} type="tel" class="input-dark w-full" placeholder="请输入手机号" data-v-e0050807${_scopeId}></div></div><div class="flex justify-end space-x-4 mt-8" data-v-e0050807${_scopeId}><button type="button" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-e0050807${_scopeId}><i class="bi bi-arrow-clockwise mr-2" data-v-e0050807${_scopeId}></i> 重置 </button><button type="submit"${ssrIncludeBooleanAttr(updating.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-e0050807${_scopeId}>`);
              if (updating.value) {
                _push2(`<span class="loading loading-spinner loading-sm mr-2" data-v-e0050807${_scopeId}></span>`);
              } else {
                _push2(`<i class="bi bi-check-circle mr-2" data-v-e0050807${_scopeId}></i>`);
              }
              _push2(` ${ssrInterpolate(updating.value ? "保存中..." : "保存修改")}</button></div></form></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "password") {
              _push2(`<div class="space-y-6 animate-fade-in" data-v-e0050807${_scopeId}><form data-v-e0050807${_scopeId}><div class="max-w-md space-y-6" data-v-e0050807${_scopeId}><div class="space-y-2" data-v-e0050807${_scopeId}><label for="currentPassword" class="block text-sm font-medium text-cyan-400" data-v-e0050807${_scopeId}>当前密码</label><input id="currentPassword"${ssrRenderAttr("value", passwordForm.currentPassword)} type="password" class="input-dark w-full" placeholder="请输入当前密码" required data-v-e0050807${_scopeId}></div><div class="space-y-2" data-v-e0050807${_scopeId}><label for="newPassword" class="block text-sm font-medium text-cyan-400" data-v-e0050807${_scopeId}>新密码</label><input id="newPassword"${ssrRenderAttr("value", passwordForm.newPassword)} type="password" class="input-dark w-full" placeholder="请输入新密码（至少6位）" required minlength="6" data-v-e0050807${_scopeId}></div><div class="space-y-2" data-v-e0050807${_scopeId}><label for="confirmPassword" class="block text-sm font-medium text-cyan-400" data-v-e0050807${_scopeId}>确认新密码</label><input id="confirmPassword"${ssrRenderAttr("value", passwordForm.confirmPassword)} type="password" class="input-dark w-full" placeholder="请再次输入新密码" required data-v-e0050807${_scopeId}></div></div><div class="flex justify-end space-x-4 mt-8" data-v-e0050807${_scopeId}><button type="button" class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-e0050807${_scopeId}><i class="bi bi-arrow-clockwise mr-2" data-v-e0050807${_scopeId}></i> 重置 </button><button type="submit"${ssrIncludeBooleanAttr(changingPassword.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-e0050807${_scopeId}>`);
              if (changingPassword.value) {
                _push2(`<span class="loading loading-spinner loading-sm mr-2" data-v-e0050807${_scopeId}></span>`);
              } else {
                _push2(`<i class="bi bi-shield-check mr-2" data-v-e0050807${_scopeId}></i>`);
              }
              _push2(` ${ssrInterpolate(changingPassword.value ? "修改中..." : "修改密码")}</button></div></form></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "reviews") {
              _push2(`<div class="space-y-6 animate-fade-in" data-v-e0050807${_scopeId}><div class="flex items-center justify-between mb-6" data-v-e0050807${_scopeId}><h3 class="text-2xl font-bold text-white flex items-center gap-3" data-v-e0050807${_scopeId}><i class="bi bi-chat-dots text-cyan-400" data-v-e0050807${_scopeId}></i> 我的评论 </h3><p class="text-gray-400" data-v-e0050807${_scopeId}>管理您发表的所有评论</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" data-v-e0050807${_scopeId}><div class="glass-morphism-dark rounded-lg p-6 border border-gray-700/50 text-center" data-v-e0050807${_scopeId}><div class="text-3xl font-bold text-cyan-400 mb-2" data-v-e0050807${_scopeId}>${ssrInterpolate(reviewsCount.value || 0)}</div><div class="text-gray-300" data-v-e0050807${_scopeId}>评论总数</div></div><div class="glass-morphism-dark rounded-lg p-6 border border-gray-700/50 text-center" data-v-e0050807${_scopeId}><div class="text-3xl font-bold text-yellow-400 mb-2" data-v-e0050807${_scopeId}>${ssrInterpolate(averageRating.value || 0)}</div><div class="text-gray-300" data-v-e0050807${_scopeId}>平均评分</div></div><div class="glass-morphism-dark rounded-lg p-6 border border-gray-700/50 text-center" data-v-e0050807${_scopeId}><div class="text-3xl font-bold text-green-400 mb-2" data-v-e0050807${_scopeId}>${ssrInterpolate(helpfulCount.value || 0)}</div><div class="text-gray-300" data-v-e0050807${_scopeId}>获得点赞</div></div></div><div class="space-y-4" data-v-e0050807${_scopeId}>`);
              if (loadingReviews.value) {
                _push2(`<div class="text-center py-8" data-v-e0050807${_scopeId}><div class="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" data-v-e0050807${_scopeId}></div><p class="text-gray-300" data-v-e0050807${_scopeId}>正在加载评论...</p></div>`);
              } else if (userReviews.value.length > 0) {
                _push2(`<div class="space-y-4" data-v-e0050807${_scopeId}><!--[-->`);
                ssrRenderList(userReviews.value, (review) => {
                  var _a3;
                  _push2(`<div class="glass-morphism-dark rounded-lg p-6 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" data-v-e0050807${_scopeId}><div class="flex items-start justify-between mb-4" data-v-e0050807${_scopeId}><div class="flex items-center gap-4" data-v-e0050807${_scopeId}><div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-700/50" data-v-e0050807${_scopeId}>`);
                  if (review.product_images && review.product_images.length > 0) {
                    _push2(`<img${ssrRenderAttr("src", review.product_images[0])}${ssrRenderAttr("alt", review.product_name)} class="w-full h-full object-cover" data-v-e0050807${_scopeId}>`);
                  } else {
                    _push2(`<div class="w-full h-full flex items-center justify-center" data-v-e0050807${_scopeId}><i class="bi bi-image text-gray-500 text-xl" data-v-e0050807${_scopeId}></i></div>`);
                  }
                  _push2(`</div><div data-v-e0050807${_scopeId}><h4 class="font-bold text-white text-lg" data-v-e0050807${_scopeId}>${ssrInterpolate(review.product_name || "产品已下架")}</h4><p class="text-gray-400 text-sm" data-v-e0050807${_scopeId}>${ssrInterpolate(formatDate(review.created_at))}</p><div class="flex items-center gap-2 mt-1" data-v-e0050807${_scopeId}>`);
                  if (review.is_anonymous) {
                    _push2(`<span class="text-xs px-2 py-1 bg-gray-600/50 text-gray-300 rounded" data-v-e0050807${_scopeId}><i class="bi bi-incognito mr-1" data-v-e0050807${_scopeId}></i> 匿名发表 </span>`);
                  } else {
                    _push2(`<span class="text-xs px-2 py-1 bg-blue-600/30 text-blue-300 rounded" data-v-e0050807${_scopeId}><i class="bi bi-person mr-1" data-v-e0050807${_scopeId}></i> ${ssrInterpolate(((_a3 = review.user_info) == null ? void 0 : _a3.nickname) || review.author)}</span>`);
                  }
                  _push2(`</div></div></div><div class="flex items-center gap-2" data-v-e0050807${_scopeId}><div class="flex" data-v-e0050807${_scopeId}><!--[-->`);
                  ssrRenderList(5, (i) => {
                    _push2(`<i class="${ssrRenderClass([i <= review.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-sm"])}" data-v-e0050807${_scopeId}></i>`);
                  });
                  _push2(`<!--]--></div><span class="text-white font-medium" data-v-e0050807${_scopeId}>${ssrInterpolate(review.rating)}</span></div></div><p class="text-gray-300 mb-4" data-v-e0050807${_scopeId}>${ssrInterpolate(review.comment)}</p>`);
                  if (review.images && review.images.length > 0) {
                    _push2(`<div class="grid grid-cols-3 gap-2 mb-4" data-v-e0050807${_scopeId}><!--[-->`);
                    ssrRenderList(review.images, (image, index) => {
                      _push2(`<img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `评论图片${index + 1}`)} class="w-full h-20 object-cover rounded-lg border border-gray-600/30" data-v-e0050807${_scopeId}>`);
                    });
                    _push2(`<!--]--></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="flex items-center justify-between pt-4 border-t border-gray-700/50" data-v-e0050807${_scopeId}><div class="flex items-center gap-4 text-sm text-gray-400" data-v-e0050807${_scopeId}><span class="flex items-center gap-1" data-v-e0050807${_scopeId}><i class="bi bi-hand-thumbs-up" data-v-e0050807${_scopeId}></i> ${ssrInterpolate(review.helpful_count || 0)} 人觉得有帮助 </span>`);
                  if (review.verified_purchase) {
                    _push2(`<span class="text-green-400" data-v-e0050807${_scopeId}><i class="bi bi-check-circle" data-v-e0050807${_scopeId}></i> 已验证购买 </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="text-gray-500" data-v-e0050807${_scopeId}> 状态: ${ssrInterpolate(getReviewStatusText(review.status))}</span></div><div class="flex items-center gap-2" data-v-e0050807${_scopeId}><button class="px-3 py-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-200" data-v-e0050807${_scopeId}><i class="bi bi-pencil mr-1" data-v-e0050807${_scopeId}></i> 编辑 </button><button class="px-3 py-1 text-red-400 hover:text-red-300 transition-colors duration-200" data-v-e0050807${_scopeId}><i class="bi bi-trash mr-1" data-v-e0050807${_scopeId}></i> 删除 </button></div></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="text-center py-12" data-v-e0050807${_scopeId}><div class="text-4xl text-gray-400 mb-4" data-v-e0050807${_scopeId}><i class="bi bi-chat-dots" data-v-e0050807${_scopeId}></i></div><h3 class="text-xl font-semibold text-white mb-2" data-v-e0050807${_scopeId}>暂无评论</h3><p class="text-gray-400 mb-6" data-v-e0050807${_scopeId}>您还没有发表过任何评论</p>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: "/products",
                  class: "inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all duration-300"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<i class="bi bi-plus-circle mr-2" data-v-e0050807${_scopeId2}></i> 去购买商品 `);
                    } else {
                      return [
                        createVNode("i", { class: "bi bi-plus-circle mr-2" }),
                        createTextVNode(" 去购买商品 ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
            if (showAvatarModal.value) {
              _push2(`<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" data-v-e0050807${_scopeId}><div class="glass-card-dark rounded-2xl p-6 max-w-md w-full mx-4 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-scale-in" data-v-e0050807${_scopeId}><h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-3" data-v-e0050807${_scopeId}><i class="bi bi-camera text-cyan-400" data-v-e0050807${_scopeId}></i> 上传头像 </h3><div class="space-y-6" data-v-e0050807${_scopeId}><div class="flex justify-center" data-v-e0050807${_scopeId}><div class="relative" data-v-e0050807${_scopeId}><input id="avatar-input" type="file" accept="image/*" class="hidden" data-v-e0050807${_scopeId}><div class="w-32 h-32 border-2 border-dashed border-cyan-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 transition-colors duration-300 cursor-pointer overflow-hidden" data-v-e0050807${_scopeId}>`);
              if (avatarPreview.value) {
                _push2(`<img${ssrRenderAttr("src", avatarPreview.value)} alt="头像预览" class="w-full h-full object-cover" data-v-e0050807${_scopeId}>`);
              } else {
                _push2(`<div class="text-center" data-v-e0050807${_scopeId}><i class="bi bi-cloud-upload text-3xl text-cyan-400 mb-2 block" data-v-e0050807${_scopeId}></i><span class="text-sm text-gray-400" data-v-e0050807${_scopeId}>点击选择图片</span></div>`);
              }
              _push2(`</div>`);
              if (avatarPreview.value) {
                _push2(`<button class="absolute top-0 right-0 bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-cyan-400 transition-colors duration-200" data-v-e0050807${_scopeId}><i class="bi bi-pencil text-xs" data-v-e0050807${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (selectedFile.value) {
                _push2(`<div class="text-center" data-v-e0050807${_scopeId}><p class="text-sm text-gray-400" data-v-e0050807${_scopeId}>${ssrInterpolate(selectedFile.value.name)}</p><p class="text-xs text-gray-500" data-v-e0050807${_scopeId}>${ssrInterpolate((selectedFile.value.size / 1024 / 1024).toFixed(2))} MB</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-center text-gray-400 text-sm" data-v-e0050807${_scopeId}> 支持 JPG、PNG、GIF、WebP 格式<br data-v-e0050807${_scopeId}> 文件大小不超过 2MB </p><div class="flex justify-end space-x-4" data-v-e0050807${_scopeId}><button class="btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1" data-v-e0050807${_scopeId}><i class="bi bi-x-circle mr-2" data-v-e0050807${_scopeId}></i> 取消 </button><button${ssrIncludeBooleanAttr(!selectedFile.value || uploadingAvatar.value) ? " disabled" : ""} class="btn-premium-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed" data-v-e0050807${_scopeId}>`);
              if (uploadingAvatar.value) {
                _push2(`<span class="loading loading-spinner loading-sm mr-2" data-v-e0050807${_scopeId}></span>`);
              } else {
                _push2(`<i class="bi bi-check-circle mr-2" data-v-e0050807${_scopeId}></i>`);
              }
              _push2(` ${ssrInterpolate(uploadingAvatar.value ? "上传中..." : "确定上传")}</button></div></div></div></div>`);
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
                  "current-page-title": "个人中心"
                }),
                createVNode("div", { class: "relative z-10 py-8" }, [
                  createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                    createVNode("div", { class: "mb-8 animate-fade-in-up" }, [
                      createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" }, [
                        createVNode("h1", { class: "text-4xl font-bold text-white mb-3 flex items-center gap-3" }, [
                          createVNode("i", { class: "bi bi-person-circle text-cyan-400 text-3xl animate-bounce-gentle" }),
                          createTextVNode(" 个人中心 ")
                        ]),
                        createVNode("p", { class: "text-gray-300 text-lg" }, "管理您的个人信息和账户设置")
                      ])
                    ]),
                    createVNode("div", { class: "glass-card-dark rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-6 animate-fade-in-up animation-delay-200" }, [
                      createVNode("div", { class: "flex items-center space-x-6" }, [
                        createVNode("div", { class: "relative group" }, [
                          createVNode("div", { class: "w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 transform group-hover:scale-105 overflow-hidden" }, [
                            ((_t = unref(userStore).user) == null ? void 0 : _t.avatar) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: unref(userStore).user.avatar,
                              alt: (((_u = unref(userStore).user) == null ? void 0 : _u.nickname) || ((_v = unref(userStore).user) == null ? void 0 : _v.username) || "U") + "的头像",
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
                          createVNode("h2", { class: "text-2xl font-bold text-white mb-2" }, toDisplayString(((_y = unref(userStore).user) == null ? void 0 : _y.nickname) || ((_z = unref(userStore).user) == null ? void 0 : _z.username) || "加载中..."), 1),
                          createVNode("p", { class: "text-gray-300 mb-1" }, toDisplayString(((_A = unref(userStore).user) == null ? void 0 : _A.email) || ""), 1),
                          ((_B = unref(userStore).user) == null ? void 0 : _B.nickname) && ((_C = unref(userStore).user) == null ? void 0 : _C.username) ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-gray-400"
                          }, "用户名: " + toDisplayString(unref(userStore).user.username), 1)) : createCommentVNode("", true),
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
                            createTextVNode(" 编辑资料 ")
                          ], 8, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => activeTab.value = "password",
                            class: "btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                          }, [
                            createVNode("i", { class: "bi bi-shield-lock mr-2" }),
                            createTextVNode(" 修改密码 ")
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
                              createVNode("label", { class: "block text-sm font-medium text-cyan-400 mb-2" }, "用户名"),
                              createVNode("p", { class: "text-white text-lg" }, toDisplayString(((_H = unref(userStore).user) == null ? void 0 : _H.username) || "-"), 1)
                            ]),
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" }, [
                              createVNode("label", { class: "block text-sm font-medium text-cyan-400 mb-2" }, "昵称"),
                              createVNode("p", { class: "text-white text-lg" }, toDisplayString(((_I = unref(userStore).user) == null ? void 0 : _I.nickname) || "-"), 1)
                            ]),
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" }, [
                              createVNode("label", { class: "block text-sm font-medium text-cyan-400 mb-2" }, "邮箱"),
                              createVNode("p", { class: "text-white text-lg" }, toDisplayString(((_J = unref(userStore).user) == null ? void 0 : _J.email) || "-"), 1)
                            ]),
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300" }, [
                              createVNode("label", { class: "block text-sm font-medium text-cyan-400 mb-2" }, "手机号"),
                              createVNode("p", { class: "text-white text-lg" }, toDisplayString(((_K = unref(userStore).user) == null ? void 0 : _K.phone) || "-"), 1)
                            ]),
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 md:col-span-2" }, [
                              createVNode("label", { class: "block text-sm font-medium text-cyan-400 mb-2" }, "注册时间"),
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
                                }, "用户名"),
                                withDirectives(createVNode("input", {
                                  id: "username",
                                  "onUpdate:modelValue": ($event) => editForm.username = $event,
                                  type: "text",
                                  class: "input-dark w-full",
                                  placeholder: "请输入用户名"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, editForm.username]
                                ])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("label", {
                                  for: "nickname",
                                  class: "block text-sm font-medium text-cyan-400"
                                }, "昵称"),
                                withDirectives(createVNode("input", {
                                  id: "nickname",
                                  "onUpdate:modelValue": ($event) => editForm.nickname = $event,
                                  type: "text",
                                  class: "input-dark w-full",
                                  placeholder: "请输入昵称"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, editForm.nickname]
                                ])
                              ]),
                              createVNode("div", { class: "space-y-2 md:col-span-2" }, [
                                createVNode("label", {
                                  for: "phone",
                                  class: "block text-sm font-medium text-cyan-400"
                                }, "手机号"),
                                withDirectives(createVNode("input", {
                                  id: "phone",
                                  "onUpdate:modelValue": ($event) => editForm.phone = $event,
                                  type: "tel",
                                  class: "input-dark w-full",
                                  placeholder: "请输入手机号"
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
                                createTextVNode(" 重置 ")
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
                                createTextVNode(" " + toDisplayString(updating.value ? "保存中..." : "保存修改"), 1)
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
                                }, "当前密码"),
                                withDirectives(createVNode("input", {
                                  id: "currentPassword",
                                  "onUpdate:modelValue": ($event) => passwordForm.currentPassword = $event,
                                  type: "password",
                                  class: "input-dark w-full",
                                  placeholder: "请输入当前密码",
                                  required: ""
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, passwordForm.currentPassword]
                                ])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("label", {
                                  for: "newPassword",
                                  class: "block text-sm font-medium text-cyan-400"
                                }, "新密码"),
                                withDirectives(createVNode("input", {
                                  id: "newPassword",
                                  "onUpdate:modelValue": ($event) => passwordForm.newPassword = $event,
                                  type: "password",
                                  class: "input-dark w-full",
                                  placeholder: "请输入新密码（至少6位）",
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
                                }, "确认新密码"),
                                withDirectives(createVNode("input", {
                                  id: "confirmPassword",
                                  "onUpdate:modelValue": ($event) => passwordForm.confirmPassword = $event,
                                  type: "password",
                                  class: "input-dark w-full",
                                  placeholder: "请再次输入新密码",
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
                                createTextVNode(" 重置 ")
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
                                createTextVNode(" " + toDisplayString(changingPassword.value ? "修改中..." : "修改密码"), 1)
                              ], 8, ["disabled"])
                            ])
                          ], 32)
                        ])) : createCommentVNode("", true),
                        activeTab.value === "reviews" ? (openBlock(), createBlock("div", {
                          key: 3,
                          class: "space-y-6 animate-fade-in"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                            createVNode("h3", { class: "text-2xl font-bold text-white flex items-center gap-3" }, [
                              createVNode("i", { class: "bi bi-chat-dots text-cyan-400" }),
                              createTextVNode(" 我的评论 ")
                            ]),
                            createVNode("p", { class: "text-gray-400" }, "管理您发表的所有评论")
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" }, [
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-6 border border-gray-700/50 text-center" }, [
                              createVNode("div", { class: "text-3xl font-bold text-cyan-400 mb-2" }, toDisplayString(reviewsCount.value || 0), 1),
                              createVNode("div", { class: "text-gray-300" }, "评论总数")
                            ]),
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-6 border border-gray-700/50 text-center" }, [
                              createVNode("div", { class: "text-3xl font-bold text-yellow-400 mb-2" }, toDisplayString(averageRating.value || 0), 1),
                              createVNode("div", { class: "text-gray-300" }, "平均评分")
                            ]),
                            createVNode("div", { class: "glass-morphism-dark rounded-lg p-6 border border-gray-700/50 text-center" }, [
                              createVNode("div", { class: "text-3xl font-bold text-green-400 mb-2" }, toDisplayString(helpfulCount.value || 0), 1),
                              createVNode("div", { class: "text-gray-300" }, "获得点赞")
                            ])
                          ]),
                          createVNode("div", { class: "space-y-4" }, [
                            loadingReviews.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center py-8"
                            }, [
                              createVNode("div", { class: "w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }),
                              createVNode("p", { class: "text-gray-300" }, "正在加载评论...")
                            ])) : userReviews.value.length > 0 ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-4"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(userReviews.value, (review) => {
                                var _a3;
                                return openBlock(), createBlock("div", {
                                  key: review.id,
                                  class: "glass-morphism-dark rounded-lg p-6 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300"
                                }, [
                                  createVNode("div", { class: "flex items-start justify-between mb-4" }, [
                                    createVNode("div", { class: "flex items-center gap-4" }, [
                                      createVNode("div", { class: "w-16 h-16 rounded-lg overflow-hidden bg-gray-700/50" }, [
                                        review.product_images && review.product_images.length > 0 ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: review.product_images[0],
                                          alt: review.product_name,
                                          class: "w-full h-full object-cover"
                                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "w-full h-full flex items-center justify-center"
                                        }, [
                                          createVNode("i", { class: "bi bi-image text-gray-500 text-xl" })
                                        ]))
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "font-bold text-white text-lg" }, toDisplayString(review.product_name || "产品已下架"), 1),
                                        createVNode("p", { class: "text-gray-400 text-sm" }, toDisplayString(formatDate(review.created_at)), 1),
                                        createVNode("div", { class: "flex items-center gap-2 mt-1" }, [
                                          review.is_anonymous ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "text-xs px-2 py-1 bg-gray-600/50 text-gray-300 rounded"
                                          }, [
                                            createVNode("i", { class: "bi bi-incognito mr-1" }),
                                            createTextVNode(" 匿名发表 ")
                                          ])) : (openBlock(), createBlock("span", {
                                            key: 1,
                                            class: "text-xs px-2 py-1 bg-blue-600/30 text-blue-300 rounded"
                                          }, [
                                            createVNode("i", { class: "bi bi-person mr-1" }),
                                            createTextVNode(" " + toDisplayString(((_a3 = review.user_info) == null ? void 0 : _a3.nickname) || review.author), 1)
                                          ]))
                                        ])
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode("div", { class: "flex" }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                          return createVNode("i", {
                                            key: i,
                                            class: [i <= review.rating ? "text-yellow-400" : "text-gray-600", "bi bi-star-fill text-sm"]
                                          }, null, 2);
                                        }), 64))
                                      ]),
                                      createVNode("span", { class: "text-white font-medium" }, toDisplayString(review.rating), 1)
                                    ])
                                  ]),
                                  createVNode("p", { class: "text-gray-300 mb-4" }, toDisplayString(review.comment), 1),
                                  review.images && review.images.length > 0 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "grid grid-cols-3 gap-2 mb-4"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(review.images, (image, index) => {
                                      return openBlock(), createBlock("img", {
                                        key: index,
                                        src: image,
                                        alt: `评论图片${index + 1}`,
                                        class: "w-full h-20 object-cover rounded-lg border border-gray-600/30"
                                      }, null, 8, ["src", "alt"]);
                                    }), 128))
                                  ])) : createCommentVNode("", true),
                                  createVNode("div", { class: "flex items-center justify-between pt-4 border-t border-gray-700/50" }, [
                                    createVNode("div", { class: "flex items-center gap-4 text-sm text-gray-400" }, [
                                      createVNode("span", { class: "flex items-center gap-1" }, [
                                        createVNode("i", { class: "bi bi-hand-thumbs-up" }),
                                        createTextVNode(" " + toDisplayString(review.helpful_count || 0) + " 人觉得有帮助 ", 1)
                                      ]),
                                      review.verified_purchase ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "text-green-400"
                                      }, [
                                        createVNode("i", { class: "bi bi-check-circle" }),
                                        createTextVNode(" 已验证购买 ")
                                      ])) : createCommentVNode("", true),
                                      createVNode("span", { class: "text-gray-500" }, " 状态: " + toDisplayString(getReviewStatusText(review.status)), 1)
                                    ]),
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode("button", {
                                        onClick: ($event) => editReview(review),
                                        class: "px-3 py-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                                      }, [
                                        createVNode("i", { class: "bi bi-pencil mr-1" }),
                                        createTextVNode(" 编辑 ")
                                      ], 8, ["onClick"]),
                                      createVNode("button", {
                                        onClick: ($event) => deleteReview(review.id),
                                        class: "px-3 py-1 text-red-400 hover:text-red-300 transition-colors duration-200"
                                      }, [
                                        createVNode("i", { class: "bi bi-trash mr-1" }),
                                        createTextVNode(" 删除 ")
                                      ], 8, ["onClick"])
                                    ])
                                  ])
                                ]);
                              }), 128))
                            ])) : (openBlock(), createBlock("div", {
                              key: 2,
                              class: "text-center py-12"
                            }, [
                              createVNode("div", { class: "text-4xl text-gray-400 mb-4" }, [
                                createVNode("i", { class: "bi bi-chat-dots" })
                              ]),
                              createVNode("h3", { class: "text-xl font-semibold text-white mb-2" }, "暂无评论"),
                              createVNode("p", { class: "text-gray-400 mb-6" }, "您还没有发表过任何评论"),
                              createVNode(_component_NuxtLink, {
                                to: "/products",
                                class: "inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-500 transition-all duration-300"
                              }, {
                                default: withCtx(() => [
                                  createVNode("i", { class: "bi bi-plus-circle mr-2" }),
                                  createTextVNode(" 去购买商品 ")
                                ]),
                                _: 1
                              })
                            ]))
                          ])
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
                      createTextVNode(" 上传头像 ")
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
                              alt: "头像预览",
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-center"
                            }, [
                              createVNode("i", { class: "bi bi-cloud-upload text-3xl text-cyan-400 mb-2 block" }),
                              createVNode("span", { class: "text-sm text-gray-400" }, "点击选择图片")
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
                        createTextVNode(" 支持 JPG、PNG、GIF、WebP 格式"),
                        createVNode("br"),
                        createTextVNode(" 文件大小不超过 2MB ")
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-4" }, [
                        createVNode("button", {
                          onClick: closeAvatarModal,
                          class: "btn-outline-dark px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
                        }, [
                          createVNode("i", { class: "bi bi-x-circle mr-2" }),
                          createTextVNode(" 取消 ")
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
                          createTextVNode(" " + toDisplayString(uploadingAvatar.value ? "上传中..." : "确定上传"), 1)
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
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e0050807"]]);
export {
  profile as default
};
//# sourceMappingURL=profile-OaQnor4W.js.map
