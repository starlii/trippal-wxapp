
let { IMAGE_ADDR } = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    IMAGE_ADDR: IMAGE_ADDR,
    show: false,
    issuesShow: false,
    imgUrls: [
      IMAGE_ADDR + '6f242ac53e96df67d7b77c0dbd6deef9.png',
      IMAGE_ADDR + '6f242ac53e96df67d7b77c0dbd6deef9.png',
      IMAGE_ADDR + '6f242ac53e96df67d7b77c0dbd6deef9.png'
    ],
    narrators: [
      {name: '解说员1', status: false, id: 1},
      {name: '解说员2', status: false, id: 2}, 
      {name: '解说员3', status: false, id: 3}
    ], 
    autoplay: true,
    items: [{
        label: '解说',
        template: 'narrator'
      },
      {
        label: '景区简介',
        template: 'intro'
      },
      {
        label: '景区目录',
        template: 'catalog'
      }
    ],
    active: 0,
    catalogShow: false,
    activeNames: ['1']
  },
  handlerShow () {
    this.setData({
      show: !this.data.show
    })
  },
  handlerMy () {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  handlerCloseShow () {
    this.setData({
      show: false
    })
  },
  clickIssues () {
    this.setData({
      issuesShow: true
    })
  },


  handleClick (e) {
    let idx = e.currentTarget.dataset.index
    let narrators = this.data.narrators
    narrators.forEach((n, index) => {
      if (index === idx) n.status = e.detail
      if (e.detail && idx !== index) {
        n.status = false
      }
    })
    this.setData({
      narrators: narrators
    })

  },
  handleTab(event) {
    this.setData({
      active: event.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name || "景区简介"
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})