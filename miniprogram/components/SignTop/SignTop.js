// components/SignTop/SignTop.ts
import { getHotSignRecord } from "../../api/hot";
import { formatDay } from "../../utils/util";
let timer = null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    tagList: ["总签到榜", "今日签到"],
    currentIndex: 0,
    pager: {
      pageNum: 1,
      limit: 10,
    },
    isRefresh: false, // 控制下拉刷新的状态
    isEnd: false,
    signList: [],
  },
  lifetimes: {
    created() {
      this.getSignRecord();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async getSignRecord() {
      const res = await getHotSignRecord({
        index: this.data.currentIndex,
        ...this.data.pager,
      });
      if (res.code === 200) {
        let transtionData = res.data.list;
        if (this.data.currentIndex === 1) {
          transtionData = transtionData.map((item) => {
            return {
              ...item,
              created: formatDay(item.created),
            };
          });
        }
        if (this.data.signList.length === 0) {
          this.setData({
            signList: transtionData,
          });
        } else {
          const data = this.data.postList;
          data.push(...transtionData);
          this.setData({
            postList: data,
          });
        }
        if (this.data.signList.length >= res.data.total) {
          this.setData({
            isEnd: true,
          });
        }
      }
    },
    handleTagClick(e) {
      const index = e.target.dataset.index;
      this.setData({
        currentIndex: index,
        signList: [],
        pager: {
          pageNum: 1,
          limit: 10,
        },
        isEnd: false,
      });
      this.getSignRecord();
    },
    handleScrollToLower() {
      if (this.data.isEnd) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        this.setData({
          pager: {
            pageNum: this.data.pager.pageNum + 1,
            limit: 10,
          },
        });
        this.getSignRecord();
      }, 300);
    },
    // 下拉刷新
    async handleRefresh() {
      this.setData({
        pager: {
          pageNum: 1,
          limit: 10,
        },
        signList: [],
      });
      await this.getHotPostList();
      this.setData({
        isRefresh: false,
      });
    },
  },
});
