import request from "../service/index";

// 获取验证码
export const getCaptcha = (sid: string) => {
  return request.get("/public/getCaptcha?sid=" + sid);
};

export const getSubIds = () => {
  return request.get("/public/subids");
};
