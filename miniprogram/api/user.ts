import request from "../service/index";
// 获取用户信息
export const getUserProfile = () => {
  return request.get({
    url: "/user/getUserInfo",
  });
};

// 获取用户未读消息
export const getMsg = (params: any) => {
  return request.get({
    url: "/user/getmsg",
    data: params,
  });
};
// 删除消息（已读）
export const setMsg = (params: any) => {
  return request.get({
    url: "/user/setmsg",
    data: params,
  });
};

// 获取我的收藏和我的帖子个数
export const getMyPostCollectCount = () => {
  return request.get({
    url: "/user/getpost-comments-hands-total",
  });
};

// 修改用户信息
export const updateUser = (data: any) => {
  return request.post({
    url: "/user/basic",
    data,
  });
};
