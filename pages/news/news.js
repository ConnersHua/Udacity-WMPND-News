// pages/news/news.js
const { formatTime } = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsContent:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        'id': options.id
      },
      success: res => {
        if (res.data.code === 200) {
          // 获取数据
          let result = res.data.result;
          console.log(result.date)
          console.log(new Date(result.date))
          this.setData({
            newsContent:{
              ...result,
              date: formatTime(new Date(result.date)),
              source: result.source ? result.source : '独家报道',
              firstImage: result.firstImage ? result.firstImage : '/img/thumb.png'
            }
          })
        } else {
          wx.showToast({
            title: '加载失败',
            duration: 500
          })
        }
      }
    })
  }
})