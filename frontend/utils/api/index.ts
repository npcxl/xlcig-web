// 统一API导出文件

// 导出API客户端
export { apiClient } from '../apiClient'

// 导出拦截器
export * from '../interceptors'

// 导出类型
export * from '../../types/api'

// 导入各业务API模块
import { authApi } from './auth'
import { categoriesApi } from './categories'
import { productsApi } from './products'
import { configsApi } from './configs'
import { merchantsApi } from './merchants'
import { ordersApi } from './orders'
import { systemApi } from './system'
import { addressApi } from './addresses'
import { uploadApi } from './upload'
import LocationApi from './location'
import { cartApi } from './cart'

// 导出各业务API模块
export { authApi } from './auth'
export { categoriesApi } from './categories'
export { productsApi } from './products'
export { configsApi } from './configs'
export { merchantsApi } from './merchants'
export { ordersApi } from './orders'
export { systemApi } from './system'
export { addressApi } from './addresses'
export { uploadApi } from './upload'
export { cartApi } from './cart'
export { default as locationApi } from './location'

// 导出额外类型
export type { CategoryQueryParams } from './categories'
export type { PaymentData } from './orders'
export type { SystemSettings, Banner, Notice } from './system'
export type { IpLocationResponse } from './location'

// 创建统一的API对象，方便调用
export const api = {
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
}

// 默认导出
export default api 