import { apiClient } from '../apiClient';
import type { 
  ApiResponse, 
  Address, 
  AddressCreateInput, 
  AddressUpdateInput, 
  AddressQueryParams 
} from '../../types/api';

// 地址相关API
export const addressApi = {
  // 获取用户地址列表
  getAddresses: (params?: AddressQueryParams): Promise<ApiResponse<Address[]>> => {
    return apiClient.getWithParams('/addresses', params);
  },

  // 获取地址详情
  getAddress: (id: number): Promise<ApiResponse<Address>> => {
    return apiClient.get(`/addresses/${id}`);
  },

  // 获取默认地址
  getDefaultAddress: (): Promise<ApiResponse<Address | null>> => {
    return apiClient.get('/addresses/default');
  },

  // 创建地址
  createAddress: (data: AddressCreateInput): Promise<ApiResponse<Address>> => {
    return apiClient.post('/addresses', data);
  },

  // 更新地址
  updateAddress: (id: number, data: AddressUpdateInput): Promise<ApiResponse<Address>> => {
    return apiClient.put(`/addresses/${id}`, data);
  },

  // 设置默认地址
  setDefaultAddress: (id: number): Promise<ApiResponse<void>> => {
    return apiClient.put(`/addresses/${id}/default`);
  },

  // 删除地址
  deleteAddress: (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/addresses/${id}`);
  }
};

export default addressApi; 