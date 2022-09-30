// subcom-pkg/pages/auth/auth.ts
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { userStore } from "../../../store/user";
import { wxLogin } from "../../../api/login";
import Ws from "../../../config/ws";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code: "",
  },
  // 登陆成功后初始化 ws
  initWs() {
    const ws = new Ws({}, (msg) => {
      app.globalData.msgCount = msg.message;
      if (msg.message !== 0) {
        wx.setTabBarBadge({
          index: 1,
          text: String(msg.message),
        });
      }
    });
    ws.connet();
  },
  // 微信登陆
  wxLogin() {
    wx.showLoading();
    wx.login({
      success: async (res) => {
        this.setData({
          code: res.code,
        });
        const result = await wxLogin({ code: this.data.code });
        if (result.code === 200) {
          wx.setStorageSync("token", result.token);
          wx.setStorageSync("userinfo", JSON.stringify(result.data));
          this.initWs();
          app.globalData.isLogin = true;
        }
        wx.hideLoading();
        // 跳转至我的页面
        wx.switchTab({
          url: "/pages/home/home",
        });
      },
      fail: (err) => {
        wx.showToast({
          title: "请求错误，请稍后重试",
        });
      },
    });
  },
  // 手机登录
  goMobileLogin() {
    wx.navigateTo({
      url: "/subcom-pkg/pages/mobile-login/mobile-login",
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
