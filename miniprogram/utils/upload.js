import { baseUrl } from "../config/index";
export default async (file) => {
  return new Promise((resolve) => {
    const url = baseUrl + "/content/uploadImg";
    wx.uploadFile({
      filePath: typeof file === "string" ? file : file.url,
      name: "file",
      url,
      header: {
        Authorization: "Bearer " + wx.getStorageSync("token"),
      },
      formData: {
        file: file,
      },
      success: (res) => {
        console.log(res);
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data);
          resolve({
            file,
            data,
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          icon: "none",
          title: "图片上传失败，请稍后再试",
          duration: 1500,
        });
        resolve(false);
      },
    });
  });
};
