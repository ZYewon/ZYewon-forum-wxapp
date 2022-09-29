import { observable, action } from "mobx-miniprogram";
import { getUserProfile } from "../api/user";
export const userStore = observable({
  token: wx.getStorageSync("token") || "",
  userinfo: JSON.parse(wx.getStorageSync("userinfo") || "{}"),
  isLogin: false,
  setToken: action(function (value) {
    this.token = value;
    wx.setStorageSync("token", value);
  }),
  setUserInfo: action(function (data) {
    this.userinfo = data;
    wx.setStorageSync("userinfo", JSON.stringify(data));
  }),
  setIsLogin: action(function (bol) {
    this.isLogin = bol;
  }),
  initLoginState: action(async function () {
    try {
      const res = await getUserProfile();
      if (res.code === 200) {
        this.setUserInfo(res.data);
        this.setIsLogin(true);
      } else {
        this.setToken("");
        this.setUserInfo({});
        this.setIsLogin(false);
      }
    } catch (error) {
      this.setToken("");
      this.setUserInfo({});
      this.setIsLogin(false);
    }
  }),
});
