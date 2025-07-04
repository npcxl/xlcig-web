import { reactive, ref, computed, readonly, toRefs } from "vue";
import { a as apiClient } from "./apiClient-Hs_n9WkJ.js";
import { M as createDiscreteApi } from "./discrete-DcZNj1Jm.js";
import { u as useUserStore } from "./user-C81snHaJ.js";
class LocationApi {
  /**
   * 获取当前用户的IP定位信息
   * 如果用户已登录，会自动更新用户的loginIp字段
   */
  static async getIpLocation() {
    try {
      const response = await apiClient.get("/amap/ip/");
      if (response.success && response.data) {
        const { location, user } = response.data;
        if (process.env.NODE_ENV === "development") {
          console.log("🌍 IP定位信息:", {
            ip: location.ip,
            location: location.error ? "定位失败" : `${location.province || "未知"} ${location.city || ""}`,
            cached: response.data.cached,
            userUpdated: (user == null ? void 0 : user.locationUpdated) || false
          });
        }
      }
      return response;
    } catch (error) {
      console.error("获取IP定位失败:", error);
      throw error;
    }
  }
  /**
   * 强制刷新IP定位信息（忽略缓存）
   * 注意：这会直接调用高德地图API，请谨慎使用
   */
  static async refreshIpLocation() {
    try {
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      const response = await apiClient.get(`/amap/ip/?t=${timestamp}`);
      if (process.env.NODE_ENV === "development") {
        console.log("🔄 强制刷新IP定位信息");
      }
      return response;
    } catch (error) {
      console.error("刷新IP定位失败:", error);
      throw error;
    }
  }
}
const getIpLocation = LocationApi.getIpLocation;
const refreshIpLocation = LocationApi.refreshIpLocation;
const { message, notification, dialog, loadingBar } = createDiscreteApi([
  "message",
  "notification",
  "dialog",
  "loadingBar"
]);
const useMessage = () => {
  const success = (content, duration = 3e3) => {
    message.success(content, { duration });
  };
  const error = (content, duration = 4e3) => {
    message.error(content, { duration });
  };
  const warning = (content, duration = 3e3) => {
    message.warning(content, { duration });
  };
  const info = (content, duration = 3e3) => {
    message.info(content, { duration });
  };
  const loading = (content) => {
    return message.loading(content, { duration: 0 });
  };
  const confirm = (content, title = "确认") => {
    return new Promise((resolve) => {
      dialog.warning({
        title,
        content,
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: () => {
          resolve(true);
        },
        onNegativeClick: () => {
          resolve(false);
        },
        onClose: () => {
          resolve(false);
        }
      });
    });
  };
  const notify = {
    success: (title, content, duration = 4e3) => {
      notification.success({
        title,
        content,
        duration
      });
    },
    error: (title, content, duration = 4e3) => {
      notification.error({
        title,
        content,
        duration
      });
    },
    warning: (title, content, duration = 4e3) => {
      notification.warning({
        title,
        content,
        duration
      });
    },
    info: (title, content, duration = 4e3) => {
      notification.info({
        title,
        content,
        duration
      });
    }
  };
  return {
    success,
    error,
    warning,
    info,
    loading,
    confirm,
    notify,
    loadingBar
  };
};
const useLocation = () => {
  const { success, error, warning } = useMessage();
  const userStore = useUserStore();
  const state = reactive({
    loading: false,
    data: null,
    error: null,
    lastUpdated: null
  });
  const hasAutoFetched = ref(false);
  const fetchLocation = async (showNotification = false, forceRefresh = false) => {
    if (state.loading) return state.data;
    state.loading = true;
    state.error = null;
    try {
      const isLoggedIn = userStore.isLoggedIn;
      if (showNotification && !isLoggedIn) {
        warning("请先登录以启用完整的IP定位功能");
      }
      const response = forceRefresh ? await refreshIpLocation() : await getIpLocation();
      if (response.success && response.data) {
        state.data = response.data;
        state.lastUpdated = /* @__PURE__ */ new Date();
        if (showNotification) {
          const { location, user } = response.data;
          if (location.error) {
            warning("IP定位失败: " + location.error);
          } else {
            const locationText = `${location.province || "未知地区"} ${location.city || ""}`;
            const cacheText = response.data.cached ? "(缓存)" : "";
            if (isLoggedIn && (user == null ? void 0 : user.locationUpdated)) {
              success(`定位成功: ${locationText}${cacheText}，登录信息已更新`);
            } else if (isLoggedIn && !(user == null ? void 0 : user.locationUpdated)) {
              warning(`定位成功: ${locationText}${cacheText}，但登录信息未更新`);
            } else {
              success(`定位成功: ${locationText}${cacheText}（未登录状态）`);
            }
          }
        }
      } else {
        state.error = response.message || "获取定位信息失败";
        if (showNotification) {
          error(state.error);
        }
      }
      return state.data;
    } catch (err) {
      state.error = err.message || "网络错误";
      if (showNotification) {
        error("获取定位信息失败");
      }
      console.error("IP定位错误:", err);
      return null;
    } finally {
      state.loading = false;
    }
  };
  const autoFetchLocation = async () => {
    if (hasAutoFetched.value) return state.data;
    hasAutoFetched.value = true;
    userStore.initializeAuth();
    return await fetchLocation(false, false);
  };
  const refreshLocation = async (showNotification = true) => {
    return await fetchLocation(showNotification, true);
  };
  const getLocationText = () => {
    var _a;
    if (!((_a = state.data) == null ? void 0 : _a.location)) return "未知位置";
    const { location } = state.data;
    if (location.error) return "定位失败";
    return `${location.province || "未知"} ${location.city || ""}`;
  };
  const hasLocation = computed(() => {
    var _a;
    return !!(((_a = state.data) == null ? void 0 : _a.location) && !state.data.location.error);
  });
  const isUserLocationUpdated = computed(() => {
    var _a, _b;
    return !!((_b = (_a = state.data) == null ? void 0 : _a.user) == null ? void 0 : _b.locationUpdated);
  });
  const currentIp = computed(() => {
    var _a;
    return ((_a = state.data) == null ? void 0 : _a.ip) || "未知";
  });
  const isUserLoggedIn = computed(() => {
    return userStore.isLoggedIn;
  });
  return {
    // 状态
    ...toRefs(state),
    hasAutoFetched: readonly(hasAutoFetched),
    // 方法
    fetchLocation,
    autoFetchLocation,
    refreshLocation,
    getLocationText,
    // 计算属性
    hasLocation,
    isUserLocationUpdated,
    currentIp,
    isUserLoggedIn,
    // 原始状态（用于需要完整状态的场景）
    locationState: readonly(state)
  };
};
export {
  useLocation as u
};
//# sourceMappingURL=useLocation-DfI38ycp.js.map
