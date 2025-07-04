# Logo 设计与应用指南

## 设计理念

装机指南的logo以**芯片/处理器**为核心设计元素，体现了专业的PC硬件特色：

### 视觉元素
- **主图标**: 带引脚的芯片图案，象征PC硬件的核心
- **配色方案**: 青色渐变（#00f5ff → #0ea5e9 → #3b82f6），体现科技感
- **字体**: 微软雅黑字体，现代且易读
- **装饰**: 电路线条元素，增强科技氛围

### 特殊效果
- 发光效果 (glow filter)
- 阴影效果 (drop shadow)
- 悬停动画 (hover scale)
- 渐变动画 (gradient animation)

## 组件结构

### AppLogo.vue 组件

可复用的logo组件，支持三种尺寸：

- **small**: 32x32px - 用于紧凑空间
- **medium**: 140x42px - 用于标准导航栏
- **large**: 160x48px - 用于主要页面头部

### 配置选项

```vue
<AppLogo 
  size="medium"           // small | medium | large
  :show-text="true"       // 是否显示文字
  :show-decorations="false" // 是否显示装饰线条
  link-class="..."        // 自定义链接样式
/>
```

## 应用场景

### 1. 网站主导航（首页）
```vue
<AppLogo size="large" />
```
- 完整logo，包含装饰线条
- 最大尺寸，最佳视觉效果

### 2. 内页导航
```vue
<AppLogo size="medium" :show-decorations="false" />
```
- 中等尺寸，适合导航栏
- 不显示装饰线条，保持简洁

### 3. 认证页面
```vue
<AppLogo size="small" />
```
- 小尺寸，仅显示图标
- 用于页面角落或紧凑布局

### 4. 页脚
```vue
<AppLogo size="medium" :show-decorations="false" />
```
- 标准尺寸
- 无装饰，保持整洁

## 文件结构

```
frontend/
├── assets/
│   └── images/
│       └── logo.svg              # 完整SVG logo文件
├── components/
│   └── AppLogo.vue              # 可复用logo组件
├── public/
│   └── favicon.svg              # 网站图标
└── pages/
    ├── index.vue                # 首页 - large logo
    ├── checkout.vue             # 购物车 - medium logo
    ├── orders.vue               # 订单 - medium logo
    ├── products/
    │   ├── index.vue            # 产品列表 - medium logo
    │   └── [id].vue             # 产品详情 - medium logo
    └── auth/
        ├── login.vue            # 登录 - small + medium logo
        └── register.vue         # 注册 - small + medium logo
```

## 技术实现

### SVG 优势
- 矢量图形，任意缩放不失真
- 支持CSS动画和交互效果
- 文件体积小
- 支持渐变和滤镜效果

### 响应式设计
- 自适应不同屏幕尺寸
- 移动端优化
- 保持清晰度和可读性

### 无障碍设计
- 充足的颜色对比度
- 清晰的视觉层次
- 支持屏幕阅读器

## 品牌一致性

通过统一的logo应用，确保：
- 视觉识别的一致性
- 品牌形象的专业性
- 用户体验的连贯性
- 技术特色的突出

## 使用注意事项

1. **颜色一致性**: 始终使用规定的青色渐变配色
2. **尺寸适配**: 根据使用场景选择合适的尺寸
3. **留白空间**: 确保logo周围有足够的留白
4. **背景对比**: 在深色背景上使用，确保清晰可见

---

*最后更新: 2024年1月* 