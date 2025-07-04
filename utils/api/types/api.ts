// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

// 通用查询参数
export interface BaseQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

// 用户相关类型
export interface User {
  id: number;
  email: string;
  nickname?: string;
  avatar?: string;
  role: 'admin' | 'user' | 'merchant';
  created_at: string;
  updated_at: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface UserRegisterInput {
  email: string;
  password: string;
  nickname?: string;
}

export interface UserUpdateInput {
  nickname?: string;
  avatar?: string;
}

export interface PasswordUpdateInput {
  current_password: string;
  new_password: string;
}

// 商家相关类型
export interface Merchant {
  id: number;
  name: string;
  type: 'verified' | 'premium' | 'basic';
  rating: number;
  review_count: number;
  location: string;
  established: string;
  specialties: string[];
  logo?: string;
  description: string;
  certification: string[];
  commission: number;
  status: 'active' | 'inactive';
  user_id?: number;
  created_at: string;
  updated_at: string;
}

export interface MerchantQueryParams extends BaseQueryParams {
  type?: string;
  location?: string;
  status?: string;
  specialty?: string;
}

// 配置相关类型
export interface ComputerConfig {
  id: number;
  name: string;
  slug: string;
  category: 'office' | 'gaming' | 'workstation' | 'budget' | 'high_end';
  merchant_id: number;
  total_price: number;
  original_price?: number;
  stock: number;
  sales: number;
  rating: number;
  review_count: number;
  description?: string;
  components: Record<string, string>;
  performance_score?: Record<string, number>;
  features?: string[];
  images?: string[];
  tags?: string[];
  warranty?: string;
  install_service: boolean;
  shipping_fee: number;
  delivery_time?: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  merchant?: {
    id: number;
    name: string;
    type: string;
    rating: number;
  };
  merchant_name?: string;
}

export interface ConfigQueryParams extends BaseQueryParams {
  category?: string;
  merchant_id?: number;
  min_price?: number;
  max_price?: number;
  status?: string;
  is_featured?: boolean;
  sort?: string;
}

// 地址相关类型
export interface Address {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  postal_code?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddressCreateInput {
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  postal_code?: string;
  is_default?: boolean;
}

export interface AddressUpdateInput {
  name?: string;
  phone?: string;
  province?: string;
  city?: string;
  district?: string;
  detail?: string;
  postal_code?: string;
  is_default?: boolean;
}

export interface AddressQueryParams extends BaseQueryParams {
  user_id?: number;
}

// 统计相关类型
export interface PlatformStats {
  totalConfigs: number;
  totalMerchants: number;
  totalUsers: number;
  totalSales: number;
  avgRating: number;
}

// 订单相关类型（预留）
export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  merchant_id: number;
  config_id?: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_fee: number;
  payment_method?: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_address: Address;
  items: any[];
  notes?: string;
  paid_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
} 