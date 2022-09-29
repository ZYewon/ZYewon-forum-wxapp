// app.ts
import { getUserProfile } from "./api/user";
import { getSubIds } from "./api/public";
App<IAppOption>({
  globalData: {
    isLogin: false,
  },
  async onShow() {
    if (wx.getStorageSync("token")) {
      try {
        const res = await getUserProfile();
        wx.setStorageSync("userinfo", JSON.stringify(res.data));
        this.globalData.isLogin = true;
      } catch (error) {
        this.globalData.isLogin = false;
        wx.setStorageSync("token", "");
        wx.setStorageSync("userinfo", "{}");
      }
    }
  },
  // 获取用户的模板订阅信息
  async onLaunch() {
    // 调用 wx.getSetting 获取用户的订阅模板 ID
    // itemSettings 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息
    const res = await wx.getSetting({
      withSubscriptions: true,
    });
    this.globalData.subscriptionSetting = res.subscriptionsSetting;
    // 该项目的所有订阅消息模板 ID
    let arr: string[];
    try {
      const { code, data } = await getSubIds();
      if (code === 200) {
        arr = Object.entries(data).map((item: any) => item[1]);
      } else {
        arr = [
          "H5wZ73hs2TcmE8wmwxuVBdXr1eE8yWBN8prb_lVv1o4",
          "6GNi1SCfKZsAF2pvLq4nKCtpEC7u0nFyhjwmGUVwchU",
          "imAO496kHqsc-rOr0fuU9WzFacojftoSOk9s1Xp64CU",
          "q2jD2q5z3FRm1omLYr6X84P4L04mMtaNHCw6ddKa3G4",
          "_4ZCoDcdUUCYGVXmjlwza8UEDpo_ZHOaDj8CtDr3gnA",
          "rLXK3Gu4f_iP8exCa8wwBFltiUkwic-0590dx1ub2Uw",
        ];
      }
    } catch (error) {
      arr = [
        "H5wZ73hs2TcmE8wmwxuVBdXr1eE8yWBN8prb_lVv1o4",
        "6GNi1SCfKZsAF2pvLq4nKCtpEC7u0nFyhjwmGUVwchU",
        "imAO496kHqsc-rOr0fuU9WzFacojftoSOk9s1Xp64CU",
        "q2jD2q5z3FRm1omLYr6X84P4L04mMtaNHCw6ddKa3G4",
        "_4ZCoDcdUUCYGVXmjlwza8UEDpo_ZHOaDj8CtDr3gnA",
        "rLXK3Gu4f_iP8exCa8wwBFltiUkwic-0590dx1ub2Uw",
      ];
    }
    const { mainSwitch, itemSettings } = this.globalData.subscriptionSetting;
    // mainSwitch 订阅消息总开关，true为开启，false为关闭
    if (!mainSwitch) return;
    // 如果没有代表用户未订阅任何消息
    if (!itemSettings) {
      this.globalData.tmplIds = arr;
    } else {
      // 用户已经有订阅的消息了，那么就找到用户还没订阅的模板ID
      const keysArr = Object.keys(itemSettings);
      this.globalData.tmplIds = arr.filter((item) => !keysArr.includes(item)); // 返回用户没有订阅的模板ID
    }
  },
});
