import request from "../service/index";
// 获取文章评论
// TODO: 如果传入TOKEN 会获取用户的点赞记录
export const getComments = (params: any, bol: boolean) => {
  const header: any = {};
  if (bol) {
    header.Authorization = `Bearer ${wx.getStorageSync("token")}`;
  }
  return request.get({
    url: "/public/comments",
    data: params,
    header,
  });
};
// 发表评论 or 更新评论
export const addComment = (data: any) => {
  return request.post({
    url: "/comments/reply",
    data,
  });
};
// 采纳评论
export const setBestAsync = (data: any) => {
  return request.get({
    url: "/comments/accept",
    data,
  });
};
// 点赞 or 取消点赞
export const setHadns = (data: any) => {
  return request.get({
    url: "/comments/hands",
    data,
  });
};
