// components/ListItem/ListItem.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: () => ({}),
    },
  },
  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail() {
      wx.navigateTo({
        url: "/subcom-pkg/pages/detail/detail?tid=" + this.data.item._id,
      });
    },
  },
});
