// pages/my/my.js
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, 
    hasUserInfo: false, 
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo) {
      console.log('1111')
      this.setData({
        userInfo: app.globalData.userInfo, 
        hasUserInfo: true
      })
    }else if (this.data.canIUse){
        wx.getUserInfo({
            success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    }
  },

  getUserInfo(e) {
    app.globalData.userInfo =  e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindFeedback () {
    console.log(1111)
  },
  toNew () {
    wx.navigateTo({
      url: './my-news/news'
    })
  },
  toAccount() {
    wx.navigateTo({
      url: `./account/account`,
    })
  },
  toNarrate() {
    wx.navigateTo({
      url: './my-narrate/narrate'
    })
  },

  toBought() {
    wx.navigateTo({
      url: './my-bought/bought'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})