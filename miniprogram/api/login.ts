import request from "../service/index";

export const wxLogin = (data: any) => {
  return request.post({
    url: "/login/wxlogin",
    data,
  });
};
