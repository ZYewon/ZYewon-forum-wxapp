// subcom-pkg/pages/add-post/add-post.ts
import { baseUrl } from "../../../config/index";
import { addPost, delCover } from "../../../api/content";
import { formatCatalog } from "../../../utils/util";
import upload from "../../../utils/upload";
async function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 	帖子分类：index-全部，ask-提问，advice-建议，discuss-交流，share-分享，news-动态
    columns: {
      catalogList: ["提问", "建议", "交流", "分享", "动态"],
      favsList: [20, 40, 60, 80, 100],
    },
    title: "",
    content: "",
    fileList: [],
    catalog: "",
    fav: "",
    action: "",
    cover: "",
    isPublish: false,
  },
  // 弹出选择框
  handlePickerInputClick(e) {
    const key = e.target.dataset.key;
    this.setData({
      action: key,
    });
  },
  // 选择框取消按钮
  pickerCancel() {
    this.setData({
      action: "",
    });
  },
  // 选择框确认按钮
  pickerConfirm(e) {
    if (this.data.action === "catalogList") {
      this.setData({
        catalog: e.detail.value,
      });
    } else if (this.data.action === "favsList") {
      this.setData({
        fav: e.detail.value,
      });
    }
    this.setData({
      action: "",
    });
  },
  // 上传图片，需经过图片安全校验后方可使用
  async afterRead(e) {
    const fileList = this.data.fileList;
    const file = e.detail.file;
    const res = await upload(file);
    if (res) {
      fileList.push(res.file);
      this.setData({
        fileList,
        cover: res.data,
      });
    }
  },
  titleChange(e) {
    this.setData({
      title: e.detail,
    });
  },
  contentChange(e) {
    this.setData({
      content: e.detail,
    });
  },
  // 删除图片
  async handleDeleteCover() {
    // 发送请求服务器删除已经存储的图片
    const res = await delCover(this.data.cover);
    if (res.code === 200) {
      this.setData({
        fileList: [],
        cover: "",
      });
    } else {
      wx.showToast({
        icon: "none",
        title: "网络请求错误，请稍后再试",
        duration: 1500,
      });
    }
  },
  // 发布帖子
  async handleSubmit() {
    if (this.data.isPublish) return;
    this.setData({
      isPublish: true,
    });
    const keys = ["catalog", "fav", "title", "content", "cover"];
    const data = {};
    Object.keys(this.data).forEach((key) => {
      if (keys.includes(key)) {
        data[key] = this.data[key];
      }
    });
    data.catalog = formatCatalog(data.catalog);
    const res = await addPost(data);
    if (res.code === 200) {
      wx.showToast({
        title: "发布成功",
        duration: 1500,
        icon: "success",
      });
      await delay(1000);
      wx.redirectTo({
        url: "/subcom-pkg/pages/detail/detail?tid=" + res.data._id,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
