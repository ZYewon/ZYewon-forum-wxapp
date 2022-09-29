// 用户订阅消息
export default (arr, cb, mute = false) => {
  wx.requestSubscribeMessage({
    tmplIds: arr,
    complete: (res) => {
      if (arr.some(item => res[item] === 'reject') || res.errCode === 20004) {
        wx.showModal({
          title: "您关闭了订阅通知",
          content: "需要打开设置进行手动设置吗？",
          // 点击确定后跳转至小程序设置页面
          success: (res) => {
            if (res.confirm) {
              wx.openSetting()
            } else if (res.cancel) {
              // 点击取消
              wx.showToast({
                icon: "error",
                title: '您取消了订阅',
              })
            }
            cb && cb()
          }
        })
      } else if (!arr.some(item => res[item] === 'reject')) { // 判断是否有一个 reject，但凡有一个就不会进入者里
        !mute && wx.showToast({
          icon: "none",
          title: '您已经订阅了该消息',
          duration: 1500
        })
        cb && cb()
      } else if (res.errCode === 10002 || res.errCode === 10003) {
        wx.showToast({
          icon: 'error',
          title: '网络问题订阅失败，请重新订阅',
          duration: 1500
        })
        cb && cb()
      }

    }
  })

}