// components/HotComments/HotComments.ts
import { getHotComments } from "../../api/hot";
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
    tagList: ["热门评论", "最新评论"],
    currentIndex: 0,
    pager: {
      pageNum: 1,
      limit: 10,
    },
    isRefresh: false, // 控制下拉刷新的状态
    isEnd: false,
    commentsList: [],
  },
  lifetimes: {
    created() {
      this.getHotCommentsList();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async getHotCommentsList() {
      const res = await getHotComments({
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
        if (this.data.commentsList.length >= res.data.total) {
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
        pager: {
          pageNum: 1,
          limit: 10,
        },
        commentsList: [],
        isEnd: false,
      });
      this.getHotCommentsList();
    },
    // 上拉加载更多
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
        this.getHotCommentsList();
      }, 300);
    },
    // 下拉刷新
    async handleRefresh() {
      this.setData({
        pager: {
          pageNum: 1,
          limit: 10,
        },
        postList: [],
      });
      await this.getHotCommentsList();
      this.setData({
        isRefresh: false,
      });
    },
  },
});
