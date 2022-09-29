import { requestConfig } from "./types";
function errorHandler(err: any) {
  if (err.statusCode === 401) {
    if (err.url && err.url !== "/user/getUserInfo") {
      wx.showToast({
        title: "未登录或登录状态异常",
        duration: 2000,
        icon: "none",
        mask: true,
      });
    }
  } else {
    if (err.data) {
      console.log(err);

      const {
        data: { msg },
      } = err;
      wx.showToast({
        title: msg || "请求异常，请重试",
        duration: 2000,
        icon: "none",
        mask: true,
      });
    } else {
      wx.showToast({
        title: "网络异常，请稍后再试",
        duration: 2000,
        icon: "none",
        mask: true,
      });
    }
  }
}
export default class ZRequest {
  private config: requestConfig;
  constructor(config: requestConfig) {
    this.config = config;
  }
  request(config: requestConfig): Promise<any> {
    let resInterceptor: any = null;
    if (this.config.interceptors) {
      const {
        requestInterceptors,
        responseInterceptors,
      } = this.config.interceptors;
      if (requestInterceptors) {
        const req = requestInterceptors(config);
        this.config = {
          ...this.config,
          ...req,
        };
      }
      if (responseInterceptors) {
        resInterceptor = responseInterceptors;
      }
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: (this.config.baseUrl as string) + config.url,
        method: config.method,
        header: this.config.header,
        timeout: this.config.timeout,
        dataType: this.config.dataType,
        data: config.data,
        success: (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            if (resInterceptor) {
              const result = resInterceptor({
                ...{ ...this.config, ...config },
                ...res,
              });
              resolve(result);
            } else {
              resolve(res.data);
            }
          } else {
            errorHandler({ ...{ ...this.config, ...config }, ...res });
            reject(res);
          }
        },
        fail: (err) => {
          errorHandler({ ...{ ...this.config, ...config }, ...err });
          reject(err);
        },
      });
    });
  }
  get(config: requestConfig | string) {
    if (typeof config === "string") {
      return this.request({ method: "GET", url: config });
    } else {
      return this.request({ method: "GET", ...config });
    }
  }
  post(config: requestConfig) {
    return this.request({ method: "POST", ...config });
  }
  delete(config: requestConfig) {
    return this.request({ method: "DELETE", ...config });
  }
}
