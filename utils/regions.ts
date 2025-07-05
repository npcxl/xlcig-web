import divisions from 'china-division/dist/pcas.json'

// 省市区数据类型
export interface Province {
  code: string
  name: string
  province?: string
}

export interface City {
  code: string
  name: string
  province?: string
  city?: string
}

export interface Area {
  code: string
  name: string
  province?: string
  city?: string
  area?: string
}

export interface RegionItem {
  code: string
  name: string
  children?: RegionItem[]
}

// china-division 包的数据类型
type DivisionData = Record<string, Record<string, Record<string, string[]>>>

// 获取所有省份
export const getProvinces = (): Province[] => {
  const divisionData = divisions as DivisionData
  const provinceNames = Object.keys(divisionData)
  
  return provinceNames.map((provinceName, index) => ({
    code: `${String(index + 1).padStart(2, '0')}0000`,
    name: provinceName
  }))
}

// 根据省份名称获取城市列表
export const getCitiesByProvinceName = (provinceName: string): City[] => {
  const divisionData = divisions as DivisionData
  const provinceData = divisionData[provinceName]
  
  if (!provinceData) {
    return []
  }
  
  const cityNames = Object.keys(provinceData)
  return cityNames.map((cityName, index) => ({
    code: `${String(index + 1).padStart(2, '0')}01`,
    name: cityName,
    province: provinceName
  }))
}

// 根据省份代码获取城市列表（通过省份名查找）
export const getCitiesByProvinceCode = (provinceCode: string): City[] => {
  const provinces = getProvinces()
  const province = provinces.find(p => p.code === provinceCode)
  
  if (!province) {
    return []
  }
  
  return getCitiesByProvinceName(province.name)
}

// 根据城市名称和省份名称获取区县列表
export const getAreasByCityName = (provinceName: string, cityName: string): Area[] => {
  const divisionData = divisions as DivisionData
  const provinceData = divisionData[provinceName]
  
  if (!provinceData || !provinceData[cityName]) {
    return []
  }
  
  // 区县名是 provinceData[cityName] 的键
  const areaNames = Object.keys(provinceData[cityName])
  return areaNames.map((areaName, index) => ({
    code: `${String(index + 1).padStart(2, '0')}02`,
    name: areaName,
    province: provinceName,
    city: cityName,
    area: areaName
  }))
}

// 根据区县名称获取街道列表
export const getStreetsByAreaName = (provinceName: string, cityName: string, areaName: string): string[] => {
  const divisionData = divisions as DivisionData
  const provinceData = divisionData[provinceName]
  
  if (!provinceData || !provinceData[cityName] || !provinceData[cityName][areaName]) {
    return []
  }
  
  return provinceData[cityName][areaName] || []
}

// 根据省市区名称获取详细数据（包含街道信息）
export const getRegionDetails = (provinceName: string, cityName?: string, areaName?: string) => {
  const divisionData = divisions as DivisionData
  const provinceData = divisionData[provinceName]
  
  if (!provinceData) {
    return null
  }
  
  if (!cityName) {
    return {
      province: provinceName,
      cities: Object.keys(provinceData)
    }
  }
  
  const cityData = provinceData[cityName]
  if (!cityData) {
    return null
  }
  
  if (!areaName) {
    return {
      province: provinceName,
      city: cityName,
      areas: Object.keys(cityData)
    }
  }
  
  const streets = cityData[areaName]
  return {
    province: provinceName,
    city: cityName,
    area: areaName,
    streets: streets || []
  }
}

// 验证省市区组合是否有效
export const validateRegion = (provinceName: string, cityName?: string, areaName?: string): boolean => {
  try {
    const result = getRegionDetails(provinceName, cityName, areaName)
    return result !== null
  } catch {
    return false
  }
}

// 搜索地区（支持模糊匹配）
export const searchRegions = (keyword: string): RegionItem[] => {
  const divisionData = divisions as DivisionData
  const results: RegionItem[] = []
  
  // 搜索省份
  Object.keys(divisionData).forEach(provinceName => {
    if (provinceName.includes(keyword)) {
      results.push({
        code: `province_${provinceName}`,
        name: provinceName
      })
    }
    
    // 搜索城市
    const provinceData = divisionData[provinceName]
    Object.keys(provinceData).forEach(cityName => {
      if (cityName.includes(keyword)) {
        results.push({
          code: `city_${provinceName}_${cityName}`,
          name: `${provinceName} ${cityName}`
        })
      }
      
      // 搜索区县
      const cityData = provinceData[cityName]
      Object.keys(cityData).forEach(areaName => {
        if (areaName.includes(keyword)) {
          results.push({
            code: `area_${provinceName}_${cityName}_${areaName}`,
            name: `${provinceName} ${cityName} ${areaName}`
          })
        }
      })
    })
  })
  
  return results
}

// 获取完整的地址字符串
export const getFullAddress = (provinceName: string, cityName: string, areaName: string, detail: string): string => {
  return `${provinceName}${cityName}${areaName}${detail}`
}

// 获取层级化的省市区数据（用于树形选择器）
export const getRegionTree = (level: number = 3): RegionItem[] => {
  const divisionData = divisions as DivisionData
  
  return Object.keys(divisionData).map(provinceName => {
    const provinceItem: RegionItem = {
      code: `province_${provinceName}`,
      name: provinceName
    }
    
    if (level > 1) {
      const provinceData = divisionData[provinceName]
      provinceItem.children = Object.keys(provinceData).map(cityName => {
        const cityItem: RegionItem = {
          code: `city_${provinceName}_${cityName}`,
          name: cityName
        }
        
        if (level > 2) {
          const cityData = provinceData[cityName]
          cityItem.children = Object.keys(cityData).map(areaName => ({
            code: `area_${provinceName}_${cityName}_${areaName}`,
            name: areaName
          }))
        }
        
        return cityItem
      })
    }
    
    return provinceItem
  })
} 