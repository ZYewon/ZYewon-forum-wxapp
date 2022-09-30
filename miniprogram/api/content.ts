import request from "../service/index";
// 获取文章列表
export const getListAsync = (options: any) => {
  return request.get({
    url: `/public/list`,
    data: options,
  });
};
// 上传图片
export const uploadImg = (data: any) => {
  return request.post({
    url: "/content/upload",
    data,
  });
};
// 获取文章详情
// TODO: 可以添加 token 获取对当前文章的是否收藏、点赞
export const getDetail = (tid: string, isLogin: boolean) => {
  const headers: any = {};
  if (isLogin) {
    headers.Authorization = `Bearer ${wx.getStorageSync("token")}`;
  }
  return request.get({
    url: "/public/content/detail",
    data: {
      tid,
    },
    header: headers,
  });
};
// 编辑文章
export const editPost = (data: any) => {
  return request.post({
    url: "/content/edit",
    data,
  });
};

export const addPost = (data: any) => {
  return request.post({
    url: "/content/wxAdd",
    data,
  });
};

export const delCover = (cover: string) => {
  return request.get({
    url: "/content/delCover",
    data: {
      cover,
    },
  });
};
