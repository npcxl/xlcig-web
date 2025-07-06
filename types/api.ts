// API通用响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  meta?: PaginationMeta
}

// 分页元数据
export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

// 分页查询参数
export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

// 用户相关类型
export interface User {
  id: number
  username: string
  nickname?: string
  email: string
  phone?: string
  avatar?: string
  role: 'user' | 'merchant' | 'admin'
  status: 'active' | 'inactive' | 'banned'
  created_at: string
  updated_at: string
}

export interface UserCreateInput {
  username: string
  nickname?: string
  email: string
  password: string
  phone?: string
  role?: 'user' | 'merchant'
}

export interface UserLoginInput {
  email: string // 登录账号：邮箱、用户名或手机号
  password: string
}

export interface UserLoginResponse {
  user: User
  token: string
  refreshToken: string
}

export interface UserUpdateInput {
  username?: string
  nickname?: string
  phone?: string
  avatar?: string
}

export interface PasswordChangeInput {
  currentPassword: string
  newPassword: string
}

// 地址相关类型
export interface Address {
  id: number
  user_id: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  postal_code?: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface AddressCreateInput {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  postal_code?: string
  is_default?: boolean
}

export interface AddressUpdateInput {
  name?: string
  phone?: string
  province?: string
  city?: string
  district?: string
  detail?: string
  postal_code?: string
  is_default?: boolean
}

export interface AddressQueryParams extends PaginationParams {
  user_id?: number
}

// 商家相关类型
export interface Merchant {
  id: number
  name: string
  type: 'verified' | 'premium' | 'basic'
  rating: number
  review_count: number
  location: string
  established: string
  specialties: string[]
  logo?: string
  description: string
  certification: string[]
  commission: number
  status: 'active' | 'inactive'
  user_id?: number
  created_at: string
  updated_at: string
}

export interface MerchantCreateInput {
  name: string
  type?: 'verified' | 'premium' | 'basic'
  location: string
  established: string
  specialties: string[]
  description: string
  certification?: string[]
}

export interface MerchantQueryParams extends PaginationParams {
  type?: string
  location?: string
  status?: string
  minRating?: number
}

// 产品分类类型
export interface ProductCategory {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  sort_order: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface CategoryCreateInput {
  name: string
  slug: string
  description?: string
  icon?: string
  sort_order?: number
}

// 产品相关类型
export interface Product {
  id: number
  name: string
  slug: string
  category_id: number
  brand?: string
  model?: string
  sku?: string
  price: number
  original_price?: number
  stock: number
  sales: number
  rating: number
  review_count: number
  short_description?: string
  description?: string
  specifications?: Record<string, any>
  features?: string[]
  images?: string[]
  tags?: string[]
  status: 'active' | 'inactive' | 'out_of_stock'
  is_featured: boolean
  is_hot: boolean
  meta_title?: string
  meta_description?: string
  weight?: number
  dimensions?: Record<string, any>
  warranty?: string
  created_at: string
  updated_at: string
  // 关联数据
  category?: ProductCategory
}

export interface ProductCreateInput {
  name: string
  slug: string
  category_id: number
  brand?: string
  model?: string
  sku?: string
  price: number
  original_price?: number
  stock?: number
  short_description?: string
  description?: string
  specifications?: Record<string, any>
  features?: string[]
  images?: string[]
  tags?: string[]
  is_featured?: boolean
  is_hot?: boolean
  weight?: number
  dimensions?: Record<string, any>
  warranty?: string
}

export interface ProductQueryParams extends PaginationParams {
  category_id?: number
  brand?: string
  min_price?: number
  max_price?: number
  status?: string
  is_featured?: boolean
  is_hot?: boolean
  search?: string
  tags?: string[]
}

// 电脑配置相关类型
export interface ComputerConfig {
  id: number
  name: string
  slug: string
  category: 'office' | 'gaming' | 'workstation' | 'budget' | 'high_end'
  merchant_id: number
  total_price: number
  original_price?: number
  stock: number
  sales: number
  rating: number
  review_count: number
  description?: string
  components: Record<string, string>
  performance_score?: Record<string, number>
  features?: string[]
  images?: string[]
  tags?: string[]
  warranty?: string
  install_service: boolean
  shipping_fee: number
  delivery_time?: string
  status: 'active' | 'inactive' | 'out_of_stock'
  is_featured: boolean
  created_at: string
  updated_at: string
  // 关联数据
  merchant?: Merchant
}

export interface ConfigCreateInput {
  name: string
  slug: string
  category: 'office' | 'gaming' | 'workstation' | 'budget' | 'high_end'
  merchant_id: number
  total_price: number
  original_price?: number
  stock?: number
  description?: string
  components: Record<string, string>
  performance_score?: Record<string, number>
  features?: string[]
  images?: string[]
  tags?: string[]
  warranty?: string
  install_service?: boolean
  shipping_fee?: number
  delivery_time?: string
  is_featured?: boolean
}

export interface ConfigQueryParams extends PaginationParams {
  category?: string
  merchant_id?: number
  min_price?: number
  max_price?: number
  status?: string
  is_featured?: boolean
  search?: string
  tags?: string[]
}

// 订单相关类型
export interface ShippingAddress {
  name: string
  phone: string
  address: string
  city: string
  province: string
  zipCode: string
}

export interface Order {
  id: number
  order_no: string
  user_id: number
  product_type: 'single' | 'config'
  product_id?: number
  config_id?: number
  merchant_id: number
  quantity: number
  unit_price: number
  total_price: number
  shipping_fee: number
  discount_amount: number
  final_price: number
  status: 'pending' | 'paid' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  payment_method?: string
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  shipping_address: ShippingAddress | string // 可能是JSON字符串
  notes?: string
  remark?: string
  paid_at?: string
  shipped_at?: string
  delivered_at?: string
  created_at: string
  updated_at: string
  
  // 关联数据 - 从JOIN查询返回
  username?: string
  nickname?: string
  user_email?: string
  config_name?: string
  config_price?: number
  config_specs?: any
  config_images?: any
  config_warranty?: string
  
  // 前端兼容字段（计算得出或映射）
  orderNumber?: string // 映射自 order_no
  total?: number // 映射自 final_price
  createdAt?: string // 映射自 created_at
  items?: OrderItem[] // 单个订单的商品信息
}

export interface OrderItem {
  id: number
  name: string
  brand?: string
  price: number
  quantity: number
  image?: string
  product_id?: number
}

export interface OrderCreateInput {
  product_type: 'single' | 'config'
  product_id?: number
  config_id?: number
  merchant_id: number
  quantity: number
  shipping_address: ShippingAddress
  notes?: string
}

export interface OrderQueryParams extends PaginationParams {
  user_id?: number
  merchant_id?: number
  status?: string
  payment_status?: string
  start_date?: string
  end_date?: string
}

// 系统统计类型
export interface SystemStats {
  users: number
  merchants: number
  products: number
  configs: number
  orders: number
  revenue: number
}

// 请求配置类型
export interface RequestConfig {
  headers?: Record<string, string>
  requireAuth?: boolean
  timeout?: number
} 