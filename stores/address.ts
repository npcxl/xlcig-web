import { defineStore } from 'pinia'
import { addressApi } from '../utils/api/addresses'
import type { Address, AddressCreateInput, AddressUpdateInput } from '../types/api'

export interface AddressState {
  addresses: Address[]
  defaultAddress: Address | null
  isLoading: boolean
  isInitialized: boolean
  lastUpdated: Date | null
}

export const useAddressStore = defineStore('address', {
  state: (): AddressState => ({
    addresses: [],
    defaultAddress: null,
    isLoading: false,
    isInitialized: false,
    lastUpdated: null
  }),

  getters: {
    // 获取默认地址
    getDefaultAddress: (state): Address | null => {
      return state.defaultAddress || state.addresses.find(addr => addr.is_default) || null
    },

    // 获取非默认地址列表
    getNonDefaultAddresses: (state): Address[] => {
      return state.addresses.filter(addr => !addr.is_default)
    },

    // 获取地址总数
    addressCount: (state): number => {
      return state.addresses.length
    },

    // 检查是否有地址
    hasAddresses: (state): boolean => {
      return state.addresses.length > 0
    },

    // 根据ID获取地址
    getAddressById: (state) => (id: number): Address | null => {
      return state.addresses.find(addr => addr.id === id) || null
    }
  },

  actions: {
    // 初始化地址数据
    async initializeAddresses() {
      if (this.isInitialized) return
      
      try {
        this.isLoading = true
        await this.fetchAddresses()
        this.isInitialized = true
      } catch (error) {
        console.error('初始化地址数据失败:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 获取地址列表
    async fetchAddresses() {
      try {
        this.isLoading = true
        const response = await addressApi.getAddresses()
        
        if (response.success && response.data) {
          this.addresses = response.data
          this.defaultAddress = response.data.find(addr => addr.is_default) || null
          this.lastUpdated = new Date()
        }
      } catch (error) {
        console.error('获取地址列表失败:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 添加新地址
    async addAddress(addressData: AddressCreateInput) {
      try {
        const response = await addressApi.createAddress(addressData)
        
        if (response.success && response.data) {
          this.addresses.push(response.data)
          
          // 如果是默认地址，更新默认地址状态
          if (response.data.is_default) {
            // 将其他地址设为非默认
            this.addresses.forEach(addr => {
              if (addr.id !== response.data!.id) {
                addr.is_default = false
              }
            })
            this.defaultAddress = response.data
          }
          
          this.lastUpdated = new Date()
          return response.data
        }
        
        throw new Error(response.message || '添加地址失败')
      } catch (error) {
        console.error('添加地址失败:', error)
        throw error
      }
    },

    // 更新地址
    async updateAddress(id: number, addressData: AddressUpdateInput) {
      try {
        const response = await addressApi.updateAddress(id, addressData)
        
        if (response.success && response.data) {
          const index = this.addresses.findIndex(addr => addr.id === id)
          if (index !== -1) {
            this.addresses[index] = response.data
            
            // 更新默认地址
            if (response.data.is_default) {
              this.addresses.forEach(addr => {
                if (addr.id !== id) {
                  addr.is_default = false
                }
              })
              this.defaultAddress = response.data
            }
          }
          
          this.lastUpdated = new Date()
          return response.data
        }
        
        throw new Error(response.message || '更新地址失败')
      } catch (error) {
        console.error('更新地址失败:', error)
        throw error
      }
    },

    // 设置默认地址
    async setDefaultAddress(id: number) {
      try {
        const response = await addressApi.setDefaultAddress(id)
        
        if (response.success) {
          // 更新本地状态
          this.addresses.forEach(addr => {
            addr.is_default = addr.id === id
          })
          
          this.defaultAddress = this.addresses.find(addr => addr.id === id) || null
          this.lastUpdated = new Date()
        }
        
        return response.success
      } catch (error) {
        console.error('设置默认地址失败:', error)
        throw error
      }
    },

    // 删除地址
    async deleteAddress(id: number) {
      try {
        const response = await addressApi.deleteAddress(id)
        
        if (response.success) {
          this.addresses = this.addresses.filter(addr => addr.id !== id)
          
          // 如果删除的是默认地址，清除默认地址状态
          if (this.defaultAddress?.id === id) {
            this.defaultAddress = null
          }
          
          this.lastUpdated = new Date()
        }
        
        return response.success
      } catch (error) {
        console.error('删除地址失败:', error)
        throw error
      }
    },

    // 清空地址数据
    clearAddresses() {
      this.addresses = []
      this.defaultAddress = null
      this.isInitialized = false
      this.lastUpdated = null
    },

    // 强制刷新地址数据
    async refreshAddresses() {
      this.isInitialized = false
      await this.initializeAddresses()
    }
  }
}) 