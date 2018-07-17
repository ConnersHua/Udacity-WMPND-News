//index.js
const { formatTime } = require('../../utils/util.js')

let that = this;

Page({
  data: {
    categoryList: [
      { key: "gn", text: "国内" },
      { key: "gj", text: "国际" },
      { key: "cj", text: "财经" },
      { key: "yl", text: "娱乐" },
      { key: "js", text: "军事" },
      { key: "ty", text: "体育" },
      { key: "other", text: "其他" }
    ],
    activeCategory: null,
    nowNews: ''
  },
  onLoad() {
    this.setData({
        activeCategory: this.data.categoryList[0].key
    })
    this.getNews();
  },
  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh() // 传入一个匿名函数
    })
  },
  getNews(callback) {
    const category = this.data.activeCategory;
    wx.showLoading({
      title: '加载中',
      duration: 500
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        'type': category
      },
      success: res => {
        if (res.data.code === 200){
          // 获取数据
          let result = res.data.result;
          let list = []
          result.forEach( news => {
            list.push({
              ...news,
              date: formatTime(new Date(news.date)),
              source: news.source ? news.source : '独家报道',
              firstImage: news.firstImage ? news.firstImage : '/img/thumb.png'
            })
          })

          this.setData({
            nowNews: list
          })
        } else {
          wx.showToast({
            title: '加载失败',
            duration: 500
          })
        }
      },
      fail() {
        wx.showToast({
          title: '加载失败',
          duration: 500
        })
      },
      complete: () => {
        callback && callback() // 如果存在传入的函数就执行
      }
    })
  },
  onSelectCategory: function (event){
    let test = event.currentTarget.dataset.category;
    this.setData({
      activeCategory: event.currentTarget.dataset.category
    })
    this.getNews();
  }
})
