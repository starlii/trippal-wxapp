// pages/narrator-detail/narrator-detail.js
const { chunk, flat} = require('../../utils/_lodash.js')

let { IMAGE_ADDR } = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    IMAGE_ADDR: IMAGE_ADDR,
    showBuy: false, 
    showComment: false, 
    updateFiles: [["/imgs/add_pic.png"]]
  },
  handleBuy () {
    this.setData({
      showBuy: true
    })
  },
  handleBuyClose () {
    this.setData({
      showBuy: false
    })
  },
  handleComment() {
    this.setData({
      showComment: true
    })
  },
  handleCommentClose() {
    this.setData({
      showComment: false
    })
  },

  handleUpload (e) {
    if (e.currentTarget.dataset.src === "/imgs/add_pic.png") {
      let that = this
      wx.chooseImage({
        count: 8 - this.data.updateFiles.length,
        success(res) {
          console.log('choose images', res)
          const tempFilePaths = res.tempFilePaths

          that.setData({
            updateFiles: chunk(tempFilePaths.concat(flat(that.data.updateFiles)), 4)
          })
        }
      })
    }
    
  },

  handleAllComment () {
    wx.navigateTo({
      url: 'comments/comments',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name || "讲解员"
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