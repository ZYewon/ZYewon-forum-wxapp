import request from "../service/index";
// 获取热门帖子
const getHotPost = (params: any) => {
  return request.get({
    url: "/public/hotPost",
    data: params,
  });
};
// 获取热门评论
const getHotComments = (params: any) => {
  return request.get({
    url: "/public/hotComments",
    data: params,
  });
};
// 签到排行
const getHotSignRecord = (params: any) => {
  return request.get({
    url: "/public/hotSignRecord",
    data: params,
  });
};

export { getHotPost, getHotComments, getHotSignRecord };
