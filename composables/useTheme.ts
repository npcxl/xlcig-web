export const useTheme = () => {
  // 使用 Nuxt Color Mode
  const colorMode = useColorMode()
  
  // 计算属性
  const isDark = computed(() => colorMode.value === 'dark')
  const themeMode = computed(() => colorMode.preference)
  
  // 切换主题
  const toggleTheme = () => {
    if (colorMode.preference === 'system') {
      colorMode.preference = isDark.value ? 'light' : 'dark'
    } else if (colorMode.preference === 'dark') {
      colorMode.preference = 'light'
    } else {
      colorMode.preference = 'dark'
    }
  }
  
  // 设置主题模式
  const setThemeMode = (mode: 'light' | 'dark' | 'system') => {
    colorMode.preference = mode
  }
  
  // 获取主题相关的 CSS 类
  const getThemeClasses = () => {
    const base = isDark.value ? 'dark' : 'light'
    
    return {
      base,
      background: isDark.value 
        ? 'min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black'
        : 'min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50',
      card: isDark.value ? 'glass-card-dark' : 'glass-card-light',
      text: {
        primary: isDark.value ? 'text-white' : 'text-gray-900',
        secondary: isDark.value ? 'text-gray-300' : 'text-gray-600',
        accent: isDark.value ? 'text-cyan-400' : 'text-blue-600'
      },
      border: isDark.value ? 'border-cyan-500/30' : 'border-blue-300/40',
      shadow: isDark.value ? 'shadow-cyan-500/20' : 'shadow-blue-500/20'
    }
  }
  
  // 主题图标
  const getThemeIcon = () => {
    if (colorMode.preference === 'system') {
      return 'bi-circle-half'
    }
    return isDark.value ? 'bi-moon-stars-fill' : 'bi-sun-fill'
  }
  
  // 主题标签
  const getThemeLabel = () => {
    if (colorMode.preference === 'system') {
      return '跟随系统'
    }
    return isDark.value ? '暗黑模式' : '亮色模式'
  }
  
      return {
      // 状态
      themeMode,
      isDark,
      colorMode,
      
      // 方法
      setThemeMode,
      toggleTheme,
      getThemeClasses,
      getThemeIcon,
      getThemeLabel
    }
} 