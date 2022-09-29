// subcom-pkg/pages/mobile-login/mobile-login.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sms: "",
    code: "",
    disabled: true, // 默认发送验证码按钮是禁用状态
    btnColor: "#ccc",
    btnText: "发送验证码",
  },
  // 倒计时
  countDown(options) {
    const { count, delay, run, stop } = options;
    let timer = null;
    let tempCount = count;
    function interval() {
      run(tempCount);
      timer = setInterval(() => {
        tempCount--;
        run(tempCount);
        if (tempCount <= 0) {
          clearInterval(timer);
          timer = null;
          stop();
        }
      }, delay);
    }
    interval();
  },
  // 手机号输入框
  handleInputMobile(e) {
    this.setData({
      sms: e.detail,
    });
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (reg.test(e.detail)) {
      this.setData({
        disabled: false,
        btnColor: "#02d199",
      });
    } else {
      this.setData({
        disabled: true,
        btnColor: "#ccc",
        btnText: "发送验证码",
      });
    }
  },
  // 验证码输入框
  handleInputCode(e) {
    this.setData({
      code: e.detail,
    });
  },
  // 发送验证码
  sendBtnClick() {
    this.countDown({
      count: 5,
      delay: 1000,
      run: (count) => {
        this.setData({
          btnText: `${count}s后重新发送`,
          disabled: true,
        });
      },
      stop: () => {
        this.setData({
          btnText: "重新发送",
          disabled: false,
        });
      },
    });
  },
  // 立即登录
  handleMobileLogin() {},
  // 回到微信登陆
  goWxLogin() {
    wx.navigateBack();
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
