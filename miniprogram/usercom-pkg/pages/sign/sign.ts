// usercom-pkg/pages/sign/sign.ts
import { getSingWeek, userSign } from "../../../api/user";
import { formatSignFav } from "../../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    signList: [
      {
        name: "周一",
      },
      {
        name: "周二",
      },
      {
        name: "周三",
      },
      {
        name: "周四",
      },
      {
        name: "周五",
      },
      {
        name: "周六",
      },
      {
        name: "周日",
      },
    ],
    userinfo: {},
    isShowSignSuccess: false,
  },
  async getWeekSign() {
    const res = await getSingWeek();
    const signList: any = this.data.signList;
    res.data.forEach((item: any, index: number) => {
      signList[index].isSign = item.isSign;
      signList[index].disabled = item.disabled;
      signList[index].fav = "+" + item.fav;
    });
    this.setData({
      signList,
    });
  },
  // 签到
  async handleSign() {
    const res = await userSign();
    if (res.code === 200) {
      const userinfo: any = this.data.userinfo;
      await this.getWeekSign();
      this.setData({
        userinfo: {
          ...userinfo,
          count: userinfo.count + 1,
          favs: userinfo.favs + formatSignFav(userinfo.count),
          isSign: true,
        },
        isShowSignSuccess: true,
        favs: formatSignFav(userinfo.count),
      });
    }
  },
  // 关闭签到成功提示框
  handleConfirm() {
    this.setData({
      isShowSignSuccess: false,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const userinfo = JSON.parse(wx.getStorageSync("userinfo") || "{}");
    this.setData({
      userinfo,
    });
    this.getWeekSign();
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
