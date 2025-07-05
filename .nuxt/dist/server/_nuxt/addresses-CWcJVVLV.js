import { a as apiClient } from "./useLocation-CdbkT8tR.js";
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
export {
  addressApi as a
};
//# sourceMappingURL=addresses-CWcJVVLV.js.map
