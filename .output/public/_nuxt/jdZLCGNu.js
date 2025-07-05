import{a as t,L as C}from"./CFjwhGiX.js";import{e as R,b as U,c as E,d as N}from"./CFjwhGiX.js";import{p as A}from"./BZyWtx9-.js";import{o as x}from"./Dw2SZdRQ.js";import{a as q}from"./oeYQgGxL.js";import{c as v}from"./CF7zu2V2.js";import{r as b}from"./By1bEtc9.js";const $={register:e=>t.post("/auth/register",e,{requireAuth:!1}),login:e=>t.post("/auth/login",e,{requireAuth:!1}),getProfile:()=>t.get("/auth/me"),updateProfile:e=>t.put("/auth/profile",e),changePassword:e=>t.put("/auth/password",e),getUsers:()=>t.get("/users"),refreshToken:e=>t.post("/auth/refresh",{refreshToken:e},{requireAuth:!1}),logout:()=>t.post("/auth/logout"),forgotPassword:e=>t.post("/auth/forgot-password",{email:e},{requireAuth:!1}),resetPassword:(e,s)=>t.post("/auth/reset-password",{token:e,newPassword:s},{requireAuth:!1}),verifyEmail:e=>t.post("/auth/verify-email",{token:e},{requireAuth:!1}),resendVerification:e=>t.post("/auth/resend-verification",{email:e},{requireAuth:!1}),sendEmailCode:async e=>{var u;const s=`lastSend_${e.email}`,a=localStorage.getItem(s);if(a&&Date.now()-parseInt(a)<6e4)return{success:!1,message:"发送过于频繁，请60秒后再试"};const r=Math.floor(1e5+Math.random()*9e5).toString(),d=`
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
                  ${r}
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
      </html>`,m="QUedTyAvtaBLqjjm",f="odmyaacplscmdfgi",h="kQkGSVy2vEnsoX1751441583687rSR1yklfuc",i=(u=e.email.split("@")[1])==null?void 0:u.toLowerCase();let n="",c="",g="";i==="163.com"||i==="126.com"?(n=m,c="18569795073@163.com",g=i==="163.com"?"163":"126"):i==="qq.com"?(n=f,c="2966898893@qq.com",g="qq"):(n=m,c="18569795073@163.com",g="163");const p={ColaKey:h,tomail:e.email,fromTitle:"xlCig",subject:"register is to xlCig",content:d.trim(),isTextContent:!1,smtpCode:n,smtpEmail:c,smtpCodeType:g};try{const o=await fetch("https://luckycola.com.cn/tools/customMail",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});if(!o.ok){const y=await o.text();throw console.error("邮件服务响应错误:",y),new Error("邮件发送失败")}localStorage.setItem(s,Date.now().toString());const l={email:e.email,code:r,timestamp:Date.now(),expires:Date.now()+10*60*1e3};return localStorage.setItem(`emailCode_${e.email}`,JSON.stringify(l)),{success:!0,message:"验证码发送成功，请查看您的邮箱",data:{message:"验证码已发送"}}}catch(o){console.error("发送邮箱验证码失败:",o);try{if((await fetch("http://luckycola.com.cn/tools/customMail",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)})).ok)return localStorage.setItem(s,Date.now().toString()),{success:!0,message:"验证码发送成功，请查看您的邮箱",data:{message:"验证码已发送"}}}catch(l){console.error("HTTP邮件发送也失败:",l)}return{success:!1,message:o instanceof Error?o.message:"发送验证码失败，请稍后重试"}}},verifyEmailCode:e=>{try{const s=localStorage.getItem(`emailCode_${e.email}`);if(!s)return Promise.resolve({success:!1,message:"验证码不存在或已过期"});const a=JSON.parse(s);return Date.now()>a.expires?(localStorage.removeItem(`emailCode_${e.email}`),Promise.resolve({success:!1,message:"验证码已过期，请重新获取"})):a.code!==e.code?Promise.resolve({success:!1,message:"验证码错误"}):(localStorage.removeItem(`emailCode_${e.email}`),Promise.resolve({success:!0,message:"验证码验证成功",data:!0}))}catch{return Promise.resolve({success:!1,message:"验证码验证失败"})}}},w={getCategories:e=>t.getWithParams("/categories",e,{requireAuth:!1}),getActiveCategories:()=>t.get("/categories/active",{requireAuth:!1}),getCategoryById:e=>t.get(`/categories/${e}`,{requireAuth:!1}),getCategoryBySlug:e=>t.get(`/categories/slug/${e}`,{requireAuth:!1}),createCategory:e=>t.post("/categories",e),updateCategory:(e,s)=>t.put(`/categories/${e}`,s),deleteCategory:e=>t.delete(`/categories/${e}`),batchDeleteCategories:e=>t.post("/categories/batch-delete",{ids:e}),updateCategoryStatus:(e,s)=>t.patch(`/categories/${e}/status`,{status:s}),updateCategoryOrder:e=>t.post("/categories/update-order",{orders:e}),getCategoryStats:()=>t.get("/categories/stats")},S={getConfigs:e=>t.getWithParams("/configs",e,{requireAuth:!1}),getFeaturedConfigs:(e=10)=>t.get(`/configs/featured?limit=${e}`,{requireAuth:!1}),getHotConfigs:(e=10)=>t.get(`/configs/hot?limit=${e}`,{requireAuth:!1}),getLatestConfigs:(e=10)=>t.get(`/configs/latest?limit=${e}`,{requireAuth:!1}),getConfigsByCategory:(e,s)=>t.getWithParams(`/configs/category/${e}`,s,{requireAuth:!1}),getConfigsByMerchant:(e,s)=>t.getWithParams(`/configs/merchant/${e}`,s,{requireAuth:!1}),getConfigsByPrice:(e,s,a)=>t.getWithParams("/configs/price-range",{min_price:e,max_price:s,...a},{requireAuth:!1}),getConfigById:e=>t.get(`/configs/${e}`,{requireAuth:!1}),getConfigBySlug:e=>t.get(`/configs/slug/${e}`,{requireAuth:!1}),searchConfigs:(e,s)=>t.getWithParams("/configs/search",{search:e,...s},{requireAuth:!1}),compareConfigs:e=>t.post("/configs/compare",{configIds:e},{requireAuth:!1}),getSimilarConfigs:(e,s=6)=>t.get(`/configs/${e}/similar?limit=${s}`,{requireAuth:!1}),getRecommendedConfigs:(e,s)=>t.getWithParams("/configs/recommend",{budget:e,category:s},{requireAuth:!1}),getConfigPerformance:e=>t.get(`/configs/${e}/performance`,{requireAuth:!1}),getConfigPriceHistory:(e,s=30)=>t.get(`/configs/${e}/price-history?days=${s}`,{requireAuth:!1}),createConfig:e=>t.post("/configs",e),updateConfig:(e,s)=>t.put(`/configs/${e}`,s),deleteConfig:e=>t.delete(`/configs/${e}`),batchDeleteConfigs:e=>t.post("/configs/batch-delete",{ids:e}),updateConfigStatus:(e,s)=>t.patch(`/configs/${e}/status`,{status:s}),updateConfigStock:(e,s)=>t.patch(`/configs/${e}/stock`,{stock:s}),uploadConfigImages:(e,s)=>{const a=new FormData;return s.forEach(r=>a.append("images",r)),t.upload(`/configs/${e}/images`,a)},deleteConfigImage:(e,s)=>t.delete(`/configs/${e}/images?imageUrl=${encodeURIComponent(s)}`),cloneConfig:(e,s)=>t.post(`/configs/${e}/clone`,{newName:s}),getConfigStats:()=>t.get("/configs/stats"),getCategoryStats:()=>t.get("/configs/category-stats",{requireAuth:!1})},P={getMerchants:e=>t.getWithParams("/merchants",e,{requireAuth:!1}),getFeaturedMerchants:(e=10)=>t.get(`/merchants/featured?limit=${e}`,{requireAuth:!1}),getTopMerchants:(e=10)=>t.get(`/merchants/top?limit=${e}`,{requireAuth:!1}),getMerchantById:e=>t.get(`/merchants/${e}`,{requireAuth:!1}),getMerchantsByType:(e,s)=>t.getWithParams(`/merchants/type/${e}`,s,{requireAuth:!1}),getMerchantsByLocation:(e,s)=>t.getWithParams(`/merchants/location/${encodeURIComponent(e)}`,s,{requireAuth:!1}),getMerchantsBySpecialty:e=>t.get(`/merchants/specialty/${encodeURIComponent(e)}`,{requireAuth:!1}),searchMerchants:(e,s)=>t.getWithParams("/merchants/search",{search:e,...s},{requireAuth:!1}),getMerchantProducts:(e,s)=>t.getWithParams(`/merchants/${e}/products`,s,{requireAuth:!1}),getMerchantConfigs:(e,s)=>t.getWithParams(`/merchants/${e}/configs`,s,{requireAuth:!1}),getMerchantReviews:(e,s)=>t.getWithParams(`/merchants/${e}/reviews`,s,{requireAuth:!1}),getMerchantOrders:e=>t.getWithParams("/merchants/my/orders",e),getMerchantStats:()=>t.get("/merchants/my/stats"),createMerchant:e=>t.post("/merchants",e),updateMerchant:e=>t.put("/merchants/my",e),getMyMerchant:()=>t.get("/merchants/my"),uploadMerchantLogo:e=>{const s=new FormData;return s.append("logo",e),t.upload("/merchants/my/logo",s)},deleteMerchant:e=>t.delete(`/merchants/${e}`),updateMerchantStatus:(e,s)=>t.patch(`/merchants/${e}/status`,{status:s}),approveMerchant:e=>t.patch(`/merchants/${e}/approve`),rejectMerchant:(e,s)=>t.patch(`/merchants/${e}/reject`,{reason:s}),getPendingMerchants:()=>t.get("/merchants/pending"),getAllMerchantsStats:()=>t.get("/merchants/admin/stats"),getMerchantLocations:()=>t.get("/merchants/locations",{requireAuth:!1}),getMerchantSpecialties:()=>t.get("/merchants/specialties",{requireAuth:!1}),applyVerification:e=>{const s=new FormData;return e.forEach((a,r)=>{s.append(`document_${r}`,a)}),t.upload("/merchants/my/verify",s)},getVerificationStatus:()=>t.get("/merchants/my/verification")},M={getStats:()=>t.get("/system/stats",{requireAuth:!1}),getHomeData:()=>t.get("/system/home",{requireAuth:!1}),getSettings:()=>t.get("/system/settings",{requireAuth:!1}),banners:{getBanners:e=>t.getWithParams("/system/banners",e?{status:e}:void 0,{requireAuth:!1}),getBannerById:e=>t.get(`/system/banners/${e}`),createBanner:e=>t.post("/system/banners",e),updateBanner:(e,s)=>t.put(`/system/banners/${e}`,s),deleteBanner:e=>t.delete(`/system/banners/${e}`),uploadBannerImage:e=>{const s=new FormData;return s.append("image",e),t.upload("/system/banners/upload",s)},updateOrder:e=>t.post("/system/banners/update-order",{orders:e})},notices:{getNotices:e=>t.getWithParams("/system/notices",e?{status:e}:void 0,{requireAuth:!1}),getPopupNotices:()=>t.get("/system/notices/popup",{requireAuth:!1}),getNoticeById:e=>t.get(`/system/notices/${e}`,{requireAuth:!1}),createNotice:e=>t.post("/system/notices",e),updateNotice:(e,s)=>t.put(`/system/notices/${e}`,s),deleteNotice:e=>t.delete(`/system/notices/${e}`),updateOrder:e=>t.post("/system/notices/update-order",{orders:e})},settings:{updateSettings:e=>t.put("/system/settings",e),uploadFile:(e,s)=>{const a=new FormData;return a.append("file",e),a.append("type",s),t.upload("/system/upload",a)},clearCache:()=>t.post("/system/clear-cache"),rebuildIndex:()=>t.post("/system/rebuild-index"),exportData:e=>t.post("/system/export",{type:e}),importData:(e,s)=>{const a=new FormData;return a.append("file",e),a.append("type",s),t.upload("/system/import",a)}},logs:{getSystemLogs:e=>t.getWithParams("/system/logs",e),getUserLogs:e=>t.getWithParams("/system/user-logs",e),cleanLogs:e=>t.post("/system/logs/clean",{days:e})},health:{check:()=>t.get("/system/health",{requireAuth:!1}),getMetrics:()=>t.get("/system/metrics")}},D={uploadAvatar:async e=>{const s=new FormData;return s.append("avatar",e),t.upload("/upload/avatar",s)},validateImageFile:e=>{if(!["image/jpeg","image/jpg","image/png","image/gif","image/webp"].includes(e.type))return{valid:!1,message:"只支持 JPEG、PNG、GIF、WebP 格式的图片文件"};const a=2*1024*1024;return e.size>a?{valid:!1,message:"文件大小不能超过2MB"}:{valid:!0}},getFilePreviewUrl:e=>URL.createObjectURL(e),releaseFilePreviewUrl:e=>{URL.revokeObjectURL(e)}},F={auth:$,categories:w,products:A,configs:S,merchants:P,orders:x,system:M,addresses:q,upload:D,cart:v,reviews:b,location:C};export{q as addressApi,F as api,t as apiClient,$ as authApi,v as cartApi,w as categoriesApi,S as configsApi,F as default,R as errorInterceptor,U as getAuthToken,C as locationApi,P as merchantsApi,x as ordersApi,A as productsApi,E as requestInterceptor,N as responseInterceptor,b as reviewsApi,M as systemApi,D as uploadApi};
