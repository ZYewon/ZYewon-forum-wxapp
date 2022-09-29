// pages/msg/msg.ts
import {
  getMsg
} from "../../api/user";
import {
  formatDay
} from "../../utils/util";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    active: 0,
    pager: {
      pageNum: 1,
      limit: 10,
    },
    commentsList: [],
    isEnd: false,
  },
  async getMsgAsync() {
    const res = await getMsg(this.data.pager);
    if (res.code === 200) {
      let transtionData = res.data.map((item) => ({
        ...item,
        created: formatDay(item.created),
      }));

      if (this.data.commentsList.length === 0) {
        this.setData({
          commentsList: transtionData,
        });
      } else {
        const data = this.data.commentsList;
        data.push(...transtionData);
        this.setData({
          commentsList: data,
        });
      }
      if (this.data.commentsList.length >= res.total) {
        this.setData({
          isEnd: true,
        });
      }
    }
  },
  onChange(e) {
    this.setData({
      active: e.detail.index,
    });
  },
  goLogin() {
    wx.navigateTo({
      url: "/subcom-pkg/pages/auth/auth",
    });
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
  onShow() {
    this.setData({
      isLogin: app.globalData.isLogin,
    });
    if (this.data.isLogin) {
      this.getMsgAsync();
    }

  },

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