// usercom-pkg/pages/settings/settings.ts
import upload from "../../../utils/upload";
import { updateUser } from "../../../api/user";
import { delay } from "../../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    genders: ["男", "女"],
    showPicker: false,
    userinfo: {
      gender: "",
      username: "",
      nickname: "",
      location: "",
      remark: "",
      pic: "",
    },
    isRequest: false,
  },
  // 头像昵称填写能力之获得微信头像
  onChooseAvatar(e: any) {
    this.setData({
      userinfo: {
        ...this.data.userinfo,
        pic: e.detail.avatarUrl,
      },
    });
  },
  // TODO:如果想要使用昵称填写能力，2022-09-29 目前必须配合 form 使用，blur 获取不到修改后的值
  onChange(e: any) {
    this.setData({
      userinfo: {
        ...this.data.userinfo,
        [e.target.dataset.field]: e.detail,
      },
    });
  },

  // 打开 picker 选择框
  handleGenderClick() {
    this.setData({
      showPicker: true,
    });
  },
  onCancel() {
    this.setData({
      showPicker: false,
    });
  },
  onConfirm(e: any) {
    this.setData({
      userinfo: {
        ...this.data.userinfo,
        gender: e.detail.value,
      },
      showPicker: false,
    });
  },
  // 提交修改信息
  async handleSubmit() {
    // 防止频繁点击
    if (this.data.isRequest) return;
    wx.showLoading({
      title: "加载中...",
    });
    this.setData({
      isRequest: true,
    });
    // 故意等待两秒钟
    await delay(2000);
    const userinfo = JSON.parse(wx.getStorageSync("userinfo") || "{}");
    const data = this.data.userinfo;
    let result: any = "";
    if (userinfo.pic !== data.pic) {
      result = await upload(data.pic);
    }
    // 代表用户更新了头像
    if (result && result.data.code === 200) {
      // 发送请求修改用户个人信息
      data.pic = result.data.data;
    }
    // 代表用户更新了性别
    if (data.gender) {
      data.gender = this.formatGender(data.gender);
    }
    const res = await updateUser(data);
    wx.hideLoading();
    this.setData({
      isRequest: false,
    });
    if (res.code === 200) {
      wx.showToast({
        title: res.msg,
        icon: "success",
        duration: 1500,
      });
    } else {
      wx.showToast({
        title: res.msg,
        duration: 1500,
      });
    }
  },
  formatGender(sex: string) {
    const data: any = {
      男: 0,
      女: 1,
    };
    return data[sex];
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const userinfo = JSON.parse(wx.getStorageSync("userinfo") || "{}");
    const userKeys = [
      "pic",
      "username",
      "nickname",
      "location",
      "gender",
      "remark",
    ];
    const arr = Object.keys(userinfo);
    let data: any = {};
    if (arr.length !== 0) {
      arr.forEach((item) => {
        if (userKeys.includes(item)) {
          if (item === "gender") {
            data[item] = +userinfo[item] === 0 ? "男" : "女";
          } else {
            data[item] = userinfo[item];
          }
        }
      });
      this.setData({
        userinfo: data,
      });
    }
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
