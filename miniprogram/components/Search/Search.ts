// components/Search/Search.ts
Component({
  options: {
    styleIsolation: "isolated",
    multipleSlots: true,
  },
  lifetimes: {
    ready() {
      this.getStatusBarHeight();
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    value: {
      type: String,
      value: "",
    },
    width: {
      type: String,
      value: "100%",
    },
    isComputedTop: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getStatusBarHeight: function () {
      if (this.data.isComputedTop) {
        wx.getSystemInfoAsync({
          success: (res) => {
            if (res.system.indexOf("iOS") !== -1) {
              this.setData({
                statusBarHeight: res.statusBarHeight - 6,
              });
            } else {
              this.setData({
                statusBarHeight: res.statusBarHeight - 3,
              });
            }
          },
        });
      }
    },

    handleSearchClick() {
      this.triggerEvent("click-input");
    },
    handleSearchChange(e: any) {
      this.triggerEvent("change-input", e.detail);
    },
    handleSearchClear() {
      this.triggerEvent("clear");
    },
    handleSearch(e: any) {
      this.triggerEvent("search", e.detail);
    },
  },
});
