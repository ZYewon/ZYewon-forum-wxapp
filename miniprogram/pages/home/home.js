import { getListAsync } from "../../api/content";
import { formatDay } from "../../utils/util";
import { addPost } from "../../api/content";
let timer = null;

// pages/home.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // statusBarHeight: 0,
    tabList: [
      {
        key: "",
        value: "首页",
      },
      {
        key: "ask",
        value: "提问",
      },
      {
        key: "share",
        value: "分享",
      },
      {
        key: "discuss",
        value: "讨论",
      },
      {
        key: "advice",
        value: "建议",
      },
      {
        key: "notice",
        value: "公告",
      },
      {
        key: "news",
        value: "动态",
      },
    ],
    pager: {
      page: 1,
      limit: 10,
    },
    catalog: "",
    postList: [],
    total: 0,
    isRefresh: false,
    isEnd: false,
  },
  // 点击搜索框跳转到搜索页面
  handleSearchClick() {
    wx.navigateTo({
      url: "/subcom-pkg/pages/search/search",
    });
  },

  async getPostList() {
    try {
      const res = await getListAsync({
        catalog: this.data.catalog == "0" ? "" : this.data.catalog,
        ...this.data.pager,
      });
      const data = res.data.map((item) => {
        return {
          ...item,
          created: formatDay(item.created),
        };
      });
      this.setData({
        postList:
          this.data.postList.length === 0
            ? data
            : this.data.postList.concat(data),
        total: res.total,
      });
      if (this.data.postList.length >= res.total) {
        this.setData({
          isEnd: true,
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  // tabs 标签点击触发
  handleTabsClick(e) {
    this.setData({
      catalog: e.detail.name,
      postList: [],
    });
    this.getPostList();
  },
  // 下拉刷新
  async handleRefresh() {
    this.setData({
      postList: [],
      pager: {
        page: 1,
        limit: 10,
      },
    });
    await this.getPostList();
    this.setData({
      isRefresh: false,
    });
  },
  // 上拉加载更多
  handleScrollToLower() {
    if (this.data.isEnd) return;
    if (timer) return;
    this.setData({
      isLoading: true,
      pager: {
        page: this.data.pager.page + 1,
        limit: 10,
      },
    });
    timer = setTimeout(() => {
      this.getPostList();
      timer = null;
    }, 500);
  },
  // 进入发布帖子页面
  async addPost() {
    const app = getApp();
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: "/subcom-pkg/pages/auth/auth",
      });
    } else {
      // 进入帖子发布页面
      wx.navigateTo({
        url: "/subcom-pkg/pages/add-post/add-post",
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      postList: [],
    });
    this.getPostList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
