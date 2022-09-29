// subcom-pkg/pages/detail/detail.ts
import {
  getDetail
} from "../../../api/content";
import {
  formatDay
} from "../../../utils/util";
import {
  getComments
} from "../../../api/comments";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tid: "",
    detailData: {},
    commentsList: [],
    isEnd: false,
    pager: {
      pageNum: 1,
      limit: 10,
    },
    pdb: 0,
    footerType: "static",
  },
  async getDetailAsync() {
    const res = await getDetail(this.data.tid, app.globalData.isLogin);
    if (res.code === 200) {
      let detailData = {
        ...res.data,
        created: formatDay(res.data.created)
      };
      this.setData({
        detailData,
      });
    }
  },
  // 获取当前帖子的评论列表
  async getCommentsList() {
    const res = await getComments({
      ...this.data.pager,
      tid: this.data.tid
    });
    if (res.code === 200) {
      const transtionData = res.data.map((item) => ({
        ...item,
        created: formatDay(item.created),
      }));
      if (this.data.commentsList.length === 0) {
        this.setData({
          commentsList: transtionData,
        });
      } else {
        const data = this.data.commentsList;
        data.push(...transtionData);
        this.setData({
          commentsList: data,
        });
      }
      if (this.data.commentsList.length >= res.total) {
        this.setData({
          isEnd: true,
        });
      }
    }
  },
  // 点赞 and 取消点赞
  setHand(e) {
    const item = e.target.dataset.item;
    const findIndex = this.data.commentsList.find(
      (com) => com._id === item._id
    );
    if (findIndex !== -1) {
      if (item.handed) {
        item.hands--;
        delete item.handed;
      } else {
        item.hands++;
        item.handed = 1;
      }
    }
    const data = this.data.commentsList;
    data.splice(findIndex, 1, item);
    this.setData({
      commentsList: data,
    });
  },
  toggleInput() {
    this.setData({
      footerType: "",
    });
  },
  handleBlur() {
    this.setData({
      footerType: "static",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      tid: options.tid,
    });
    this.setData({
      commentsList: [],
    });
    this.getDetailAsync();
    this.getCommentsList();
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          pdb: result.safeArea.bottom - result.safeArea.height,
        });
      },
    });
  },

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
  onReachBottom() {
    if (this.data.isEnd) return;
    // 翻页
    this.setData({
      pager: {
        pageNum: this.data.pager.pageNum + 1,
        limit: 10,
      },
    });
    this.getCommentsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: this.data.detailData.title,
      path: "/subcom-pkg/pages/detail/detail?tid=" + this.data.detailData._id,
    };
  },
});