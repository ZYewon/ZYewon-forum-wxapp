import ZRequest from "./request/index";
import { baseUrl } from "../config/index";
export default new ZRequest({
  baseUrl,
  timeout: 5000,
  dataType: "json",
  interceptors: {
    requestInterceptors(config) {
      const publicPath = [/^\/public/, /^\/login/];
      let flag = false;
      for (let i = 0; i < publicPath.length; i++) {
        const item = publicPath[i];
        if (item.test(config.url as string)) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        config.header = {
          Authorization: "Bearer " + wx.getStorageSync("token"),
        };
      }

      return config;
    },
  },
});
