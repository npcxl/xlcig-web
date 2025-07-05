import { defineStore } from 'pinia';
import { a as addressApi } from './addresses-CWcJVVLV.mjs';

const useAddressStore = defineStore("address", {
  state: () => ({
    addresses: [],
    defaultAddress: null,
    isLoading: false,
    isInitialized: false,
    lastUpdated: null
  }),
  getters: {
    // 获取默认地址
    getDefaultAddress: (state) => {
      return state.defaultAddress || state.addresses.find((addr) => addr.is_default) || null;
    },
    // 获取非默认地址列表
    getNonDefaultAddresses: (state) => {
      return state.addresses.filter((addr) => !addr.is_default);
    },
    // 获取地址总数
    addressCount: (state) => {
      return state.addresses.length;
    },
    // 检查是否有地址
    hasAddresses: (state) => {
      return state.addresses.length > 0;
    },
    // 根据ID获取地址
    getAddressById: (state) => (id) => {
      return state.addresses.find((addr) => addr.id === id) || null;
    }
  },
  actions: {
    // 初始化地址数据
    async initializeAddresses() {
      if (this.isInitialized) return;
      try {
        this.isLoading = true;
        await this.fetchAddresses();
        this.isInitialized = true;
      } catch (error) {
        console.error("\u521D\u59CB\u5316\u5730\u5740\u6570\u636E\u5931\u8D25:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    // 获取地址列表
    async fetchAddresses() {
      try {
        this.isLoading = true;
        const response = await addressApi.getAddresses();
        if (response.success && response.data) {
          this.addresses = response.data;
          this.defaultAddress = response.data.find((addr) => addr.is_default) || null;
          this.lastUpdated = /* @__PURE__ */ new Date();
        }
      } catch (error) {
        console.error("\u83B7\u53D6\u5730\u5740\u5217\u8868\u5931\u8D25:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    // 添加新地址
    async addAddress(addressData) {
      try {
        const response = await addressApi.createAddress(addressData);
        if (response.success && response.data) {
          this.addresses.push(response.data);
          if (response.data.is_default) {
            this.addresses.forEach((addr) => {
              if (addr.id !== response.data.id) {
                addr.is_default = false;
              }
            });
            this.defaultAddress = response.data;
          }
          this.lastUpdated = /* @__PURE__ */ new Date();
          return response.data;
        }
        throw new Error(response.message || "\u6DFB\u52A0\u5730\u5740\u5931\u8D25");
      } catch (error) {
        console.error("\u6DFB\u52A0\u5730\u5740\u5931\u8D25:", error);
        throw error;
      }
    },
    // 更新地址
    async updateAddress(id, addressData) {
      try {
        const response = await addressApi.updateAddress(id, addressData);
        if (response.success && response.data) {
          const index = this.addresses.findIndex((addr) => addr.id === id);
          if (index !== -1) {
            this.addresses[index] = response.data;
            if (response.data.is_default) {
              this.addresses.forEach((addr) => {
                if (addr.id !== id) {
                  addr.is_default = false;
                }
              });
              this.defaultAddress = response.data;
            }
          }
          this.lastUpdated = /* @__PURE__ */ new Date();
          return response.data;
        }
        throw new Error(response.message || "\u66F4\u65B0\u5730\u5740\u5931\u8D25");
      } catch (error) {
        console.error("\u66F4\u65B0\u5730\u5740\u5931\u8D25:", error);
        throw error;
      }
    },
    // 设置默认地址
    async setDefaultAddress(id) {
      try {
        const response = await addressApi.setDefaultAddress(id);
        if (response.success) {
          this.addresses.forEach((addr) => {
            addr.is_default = addr.id === id;
          });
          this.defaultAddress = this.addresses.find((addr) => addr.id === id) || null;
          this.lastUpdated = /* @__PURE__ */ new Date();
        }
        return response.success;
      } catch (error) {
        console.error("\u8BBE\u7F6E\u9ED8\u8BA4\u5730\u5740\u5931\u8D25:", error);
        throw error;
      }
    },
    // 删除地址
    async deleteAddress(id) {
      var _a;
      try {
        const response = await addressApi.deleteAddress(id);
        if (response.success) {
          this.addresses = this.addresses.filter((addr) => addr.id !== id);
          if (((_a = this.defaultAddress) == null ? void 0 : _a.id) === id) {
            this.defaultAddress = null;
          }
          this.lastUpdated = /* @__PURE__ */ new Date();
        }
        return response.success;
      } catch (error) {
        console.error("\u5220\u9664\u5730\u5740\u5931\u8D25:", error);
        throw error;
      }
    },
    // 清空地址数据
    clearAddresses() {
      this.addresses = [];
      this.defaultAddress = null;
      this.isInitialized = false;
      this.lastUpdated = null;
    },
    // 强制刷新地址数据
    async refreshAddresses() {
      this.isInitialized = false;
      await this.initializeAddresses();
    }
  }
});

export { useAddressStore as u };
//# sourceMappingURL=address-CU5h3OeV.mjs.map
