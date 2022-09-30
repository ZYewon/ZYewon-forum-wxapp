/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
    isLogin?: boolean;
    subscriptionSetting?: any;
    tmplIds?:string[]
    msgCount?:number
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
