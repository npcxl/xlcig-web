# 更新日志

所有关于此项目的重要更改都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/spec/v2.0.0.html)。

## [0.3.0] - 2025-07-05 21:03 已发布

### 🎉 新增功能
- **头像上传功能**: 完善个人中心头像上传
  - 配置uploadApi.uploadAvatar方法
  - 添加文件格式验证（JPEG、PNG、GIF、WebP）
  - 支持文件大小限制（最大2MB）
  - 实现头像预览和错误处理

### 🔧 改进
- **UI按钮优化**: 统一优化所有页面按钮间距
  - 将按钮上下内边距从 `py-4` 调整为 `py-3`
  - 覆盖页面：商品详情、订单、购物车结算、首页、个人中心
  - 优化组件：SteamCarousel、PageLoader等
  - 按钮外观更加紧凑美观

- **页面头部统一**: 统一个人中心相关页面导航栏
  - 个人中心、订单页面、地址管理页面使用统一AppHeader组件
  - 移除所有返回按钮，保持导航一致性
  - 显示用户登录信息和头像
  - 统一面包屑导航样式

- **用户状态管理优化**: 改进头像更新机制
  - 使用Pinia store进行响应式用户信息更新
  - 头像上传后立即更新UI显示
  - 移除本地存储依赖，确保数据一致性

- **产品分类性能优化**: 简化分类数量计算
  - 只显示"全部产品"的总数量
  - 移除各分类单独数量计算，减少API调用
  - 从4次API调用优化为1次，提升页面加载速度
  - 避免产品数量多时的性能负担

### 📦 依赖管理
- 完善uploadApi模块的类型支持
- 优化文件上传相关依赖

### 待完成
- [ ] 替换 Babylon.js 为 Three.js 重新实现 3D 加载动画（解决 SSR 渲染冲突问题）
- [ ] 优化 SSR 兼容性
---


## [0.2.0] - 2025-07-05 04:10 此版本未发布至服务器

### 🎉 新增功能
- **3D加载屏幕**: 开始开发3D加载动画效果
  - 创建 `LoadingScreen3D.vue` 组件
  - 添加 Babylon.js 3D 渲染支持

### 🔧 改进
- **用户状态管理**: 解决登录状态闪烁问题
  - 在 `app.vue` 中添加用户状态初始化逻辑
  - 避免 SSR 环境下的状态不一致
  - 改善用户体验，消除页面加载时的状态跳跃

### 📦 依赖管理
- 添加 Babylon.js 相关依赖
  - `@babylonjs/core`: 核心3D渲染引擎
  - `@babylonjs/loaders`: 模型加载器
  - `@babylonjs/materials`: 材质库

### 🐛 已知问题
- **Babylon.js SSR 兼容性**: 在 Nuxt.js SSR 环境中存在兼容性问题
  - `camera.attachControls is not a function`
  - `Cannot read properties of undefined (setting 'isScatteringEnabled')`
  - Shadow generator 相关错误
- **解决方案**: 计划改用 Three.js 替代 Babylon.js

---

## [0.1.0] 初始化

### 🎉 项目初始化
- **项目结构重构**: 从 monorepo 转换为纯前端项目
  - 移除所有后端相关文件 (Docker, nginx, 部署脚本等)
  - 将 `frontend/` 目录内容移动到根目录
  - 清理不必要的配置文件

### 🔧 环境配置
- **依赖管理**: 修复缺失的依赖问题
  - 解决 `Cannot find module 'concurrently'` 错误
  - 运行 `npm install` 安装所有必需依赖

### 📁 文件结构
```
xlweb/
├── components/           # Vue 组件
│   ├── LoadingScreen.vue
│   ├── LoadingScreen3D.vue
│   └── ...
├── pages/               # 页面路由
├── stores/              # 状态管理
├── utils/               # 工具函数
├── composables/         # 组合式函数
└── assets/              # 静态资源
```

### 🚀 核心功能
- **Nuxt.js 3**: 基于 Vue 3 的现代化框架
- **Tailwind CSS**: 实用优先的CSS框架
- **TypeScript**: 类型安全的JavaScript
- **用户认证**: 完整的登录/注册系统
- **API 集成**: 完整的后端API调用封装

---

## 更新说明

### 版本号规则
- **主版本号**: 不兼容的API修改
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

### 变更类型
- **🎉 新增功能**: 新增的功能
- **🔧 改进**: 对现有功能的改进
- **🐛 修复**: 错误修复
- **📦 依赖管理**: 依赖包的变更
- **🔒 安全**: 安全性相关修复
- **📚 文档**: 文档更新
- **🎨 样式**: 代码格式、UI/UX改进
- **⚡ 性能**: 性能优化
- **🔨 重构**: 代码重构
- **🗑 移除**: 移除的功能或文件

