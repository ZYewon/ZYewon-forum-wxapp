// subcom-pkg/pages/search/search.ts
import { getListAsync } from "../../../api/content";
import Dialog from "../../../miniprogram_npm/@vant/weapp/dialog/dialog";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    historyList: JSON.parse(wx.getStorageSync("historyList") || "[]"),
    hotList: ["前端", "vue", "node", "react", "小程序", "uniapp", "测试"],
    pager: {
      page: 1,
      limit: 10,
      title: "",
    },
    isLoading: false,
    searchSuggestion: [],
    showResult: false,
  },
  debounce(func: any, time: number) {
    let timer: any = null;
    return (e?: any) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(e);
      }, time);
    };
  },
  // 搜索框输入的内容
  handleSearchChange(e: any) {
    this.setData({
      searchValue: e.detail,
    });
    // 节流请求搜索建议
    const fn = this.debounce(this.getSearchList.bind(this), 500);
    fn(this.data.searchValue);
  },
  // 添加历史记录
  addHis(value: string) {
    const index = this.data.historyList.indexOf(value);
    const data = this.data.historyList;
    if (index !== -1) {
      data.splice(index, 1);
      data.unshift(value);
    } else {
      data.unshift(value);
    }
    this.setData({
      historyList: data,
    });
    wx.setStorageSync("historyList", JSON.stringify(data));
  },
  // 获取搜索建议
  async getSearchList(title: string) {
    if (this.data.isLoading) return;
    if (!title.trim()) return;
    this.setData({
      isLoading: true,
      pager: {
        ...this.data.pager,
        title,
      },
    });
    // 发起请求获取搜索建议的列表
    try {
      const res = await getListAsync(this.data.pager);
      if (res.code === 200) {
        this.setData({
          isLoading: false,
          searchSuggestion: res.data,
          showResult: true,
        });
      }
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },
  // 点击了输入框的清空按钮
  handleSearchClear() {
    this.setData({
      showResult: false,
      searchSuggestion: [],
    });
  },
  // 点击 tab
  querySearch(e: any) {
    const tab = e.target.dataset.tab;
    this.setData({
      searchValue: tab,
    });
    // 添加到搜索历史
    this.addHis(tab);
    // 发起请求
    this.getSearchList(tab);
  },
  // 确认搜索搜索按钮点击事件
  handleSearch() {
    if (this.data.searchValue.trim() === "") {
      wx.showToast({
        title: "关键词不能为空",
        icon: "none",
      });
      return;
    }
    // 跳转至搜索结果页
  },
  // 清空搜索历史
  handleDeleteHis() {
    Dialog.confirm({
      message: "删除全部搜索历史？",
    })
      .then(() => {
        this.setData({
          historyList: [],
        });
        wx.removeStorageSync("historyList");
      })
      .catch(() => {});
  },
  goDetail(e: any) {
    const data = e.target.dataset.detail;
    // 跳转至帖子详情页
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

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
