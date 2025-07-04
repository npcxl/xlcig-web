import { defineStore } from 'pinia';

const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: null
  }),
  getters: {
    // 获取用户头像，优先返回头像URL，否则返回首字母
    userAvatar: (state) => {
      var _a, _b, _c;
      if ((_a = state.user) == null ? void 0 : _a.avatar) {
        return state.user.avatar;
      }
      const displayName = ((_b = state.user) == null ? void 0 : _b.nickname) || ((_c = state.user) == null ? void 0 : _c.username) || "U";
      return displayName.charAt(0).toUpperCase();
    },
    // 获取用户显示名称
    userDisplayName: (state) => {
      var _a, _b;
      return ((_a = state.user) == null ? void 0 : _a.nickname) || ((_b = state.user) == null ? void 0 : _b.username) || "\u7528\u6237";
    },
    // 检查是否有真实头像图片
    hasAvatarImage: (state) => {
      var _a;
      return !!((_a = state.user) == null ? void 0 : _a.avatar);
    }
  },
  actions: {
    // 初始化用户状态（从localStorage加载）
    initializeAuth() {
    },
    // 设置用户登录状态
    setAuth(token, user) {
      this.token = token;
      this.user = user;
      this.isLoggedIn = true;
    },
    // 更新用户信息
    updateUser(user) {
      this.user = user;
    },
    // 清除用户状态
    clearAuth() {
      this.token = null;
      this.user = null;
      this.isLoggedIn = false;
    },
    // 登出
    logout() {
      this.clearAuth();
    }
  }
});

export { useUserStore as u };
//# sourceMappingURL=user-C81snHaJ.mjs.map
