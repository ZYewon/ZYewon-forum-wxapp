// usercom-pkg/pages/mypost/mypost.ts

import { getMyPost, deletePostById } from "../../../api/user";
import { formatDay } from "../../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pager: {
      pageNum: 1,
      limit: 10,
    },
    postList: [],
    isEnd: false,
  },
  async getMyPostAsync() {
    const res = await getMyPost(this.data.pager);
    if (res.code === 200) {
      let { postList } = this.data;
      let transtionData = res.data.map((item: any) => {
        return {
          ...item,
          created: formatDay(item.created),
        };
      });
      if (postList.length === 0) {
        this.setData({
          postList: transtionData,
        });
      } else {
        postList = postList.concat(transtionData);
        this.setData({
          postList,
        });
      }
      // 是否是最后的数据
      if (this.data.postList >= res.total) {
        this.setData({
          isEnd: true,
        });
      }
    }
  },
  // 删除帖子
  handleTap(e: any) {
    wx.showModal({
      title: "提示",
      content: "确定要删除该帖子吗？",
      success: async (res) => {
        if (res.confirm) {
          const item = e.target.dataset.item;
          const index = e.target.dataset.index;
          const postList = this.data.postList;
          const res = await deletePostById({ tid: item._id });
          if (res.code === 200) {
            postList.splice(index, 1);
            this.setData({
              postList,
            });
          }
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getMyPostAsync();
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
  async onPullDownRefresh() {
    this.setData({
      postList: [],
      pager: {
        pageNum: 1,
        limit: 10,
      },
    });
    await this.getMyPostAsync();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isEnd) return;
    this.setData({
      pager: {
        pageNum: this.data.pager.pageNum + 1,
        limit: 10,
      },
    });
    this.getMyPostAsync();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
