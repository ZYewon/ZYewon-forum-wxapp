import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
import {
  getMyPostCollectCount
} from "../../api/user";
import sub from '../../utils/subscribe'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userinfo: {},
    centerList: [{
        title: "我的帖子",
        icon: "../../static/images/teizi@2x.png",
        pagePath: "/usercom-pkg/pages/mypost/mypost",
      },
      {
        title: "修改设置",
        icon: "../../static/images/setting@2x.png",
        pagePath: "/usercom-pkg/pages/settings/settings",
      },
      {
        title: "签到中心",
        icon: "../../static/images/sign1.png",
        pagePath: "/usercom-pkg/pages/sign/sign",
      },
      {
        title: "电子书",
        icon: "../../static/images/books.png",
        pagePath: "/usercom-pkg/pages/book/book",
      },
      {
        title: "关于我们",
        icon: "../../static/images/about.png",
        pagePath: "/usercom-pkg/pages/about/about",
      },
      {
        title: "人工客服",
        icon: "../../static/images/support.png",
        pagePath: "/usercom-pkg/pages/support/support",
      },
      {
        title: "意见反馈",
        icon: "../../static/images/lock2@2x.png",
        pagePath: "/usercom-pkg/pages/lock/lock",
      },
    ],
    catalogList: [{
        title: "提问",
        icon: "../../static/images/question@2x.png"
      },
      {
        title: "分享",
        icon: "../../static/images/share@2x.png"
      },
      {
        title: "讨论",
        icon: "../../static/images/taolun@2x.png"
      },
      {
        title: "建议",
        icon: "../../static/images/advice@2x.png"
      },
    ],
    counts: {},
  },
  async getCount() {
    const res = await getMyPostCollectCount();
    if (res.code === 200) {
      this.setData({
        counts: res.data,
      });
    }
  },
  // 校验用户是否登录
  validLogin({
    success = () => {},
    fail = () => {},
    message = "要登陆吗？",
    title = "提示",
  }) {
    sub(app.globalData.tmplIds.splice(0, 3), () => {
      Dialog.confirm({
          title,
          message,
        })
        .then(success)
        .catch(fail);
    })

  },
  // 前往我的主页
  handleClick(e) {
    console.log(12);
    const page = e.target.dataset.page
    if (!this.data.isLogin) {
      sub(app.globalData.tmplIds.splice(0, 3), () => {
        wx.navigateTo({
          url: "/subcom-pkg/pages/auth/auth",
        });
      })
    } else {
      console.log(123);
      wx.navigateTo({
        url: page,
      })
    }
  },
  handleCatalogItemClick() {},

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
    const userinfo = JSON.parse(wx.getStorageSync("userinfo") || "{}");
    const isLogin = app.globalData.isLogin;
    this.setData({
      userinfo,
      isLogin,
    });
    // 获取我的发帖和我的收藏数量
    if (isLogin) {

      this.getCount();
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