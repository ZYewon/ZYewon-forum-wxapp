// components/HotPost/HotPost.ts
import { getHotPost } from "../../api/hot";
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
    tagList: ["3日内", "7日内", "30日内", "全部"],
    currentIndex: 0,
    pager: {
      pageNum: 1,
      limit: 10,
    },
    isRefresh: false, // 控制下拉刷新的状态
    isEnd: false,
    postList: [],
  },
  lifetimes: {
    created() {
      this.getHotPostList();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async getHotPostList() {
      const res = await getHotPost({
        index: this.data.currentIndex,
        ...this.data.pager,
      });
      if (res.code === 200) {
        if (this.data.postList.length === 0) {
          this.setData({
            postList: res.data.list,
          });
        } else {
          const data = this.data.postList;
          data.push(...res.data.list);
          this.setData({
            postList: data,
          });
        }
        if (this.data.postList.length >= res.data.total) {
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
        postList: [],
        pager: {
          pageNum: 1,
          limit: 10,
        },
        isEnd: false,
      });
      this.getHotPostList();
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
        this.getHotPostList();
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
      await this.getHotPostList();
      this.setData({
        isRefresh: false,
      });
    },
  },
});
