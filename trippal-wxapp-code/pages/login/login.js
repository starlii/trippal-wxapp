// pages/login/login.js
const { $api } = global
const { mobileCheck}  = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    target: 60, 
    downShow: false, 
    phone: null, 
    sms: null
  },
  inputPhone (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  inputSms (e) {
    this.setData({
      sms: e.detail.value
    })
  },
  down() {
    let that = this
    let timer = setInterval(() => {
      let target = that.data.target
      if (target > 0) {
        that.setData({
          target: target - 1
        })
      }else {
        clearInterval(timer)
        this.setData({
          downShow: false
        })
      }
    }, 1000)
  },
  login () {
    console.log('login', this.data.phone, this.data.sms)
    if (!mobileCheck(this.data.phone)) {
      wx.showModal({
        content: '手机号码格式错误!',
        showCancel: false
      })
    }else if(!this.data.sms){
      wx.showModal({
        content: '验证码错误!',
        showCancel: false
      })
    }else {
      $api.sys.loginWithSms({
        mobile: this.data.phone,
        smsCode: this.data.sms
      }).then(res => {
        console.log('success', res)
        wx.navigateBack({
          delta: 1
        })
      }).catch(err => {
        console.log('err', err)
        wx.showModal({
          content: err.message,
          showCancel: false
        })
      })
    }
  },
  getSms () {
    if (!mobileCheck(this.data.phone)) {
      wx.showModal({
        content: '手机号码格式错误!',
        showCancel: false
      })
    }else {
      if (this.data.downShow) return 
      this.setData({
        sms: null
      })
      let that = this
      $api.sys.getSmsCode({ userMobile: this.data.phone })
        .then(res => {
          that.setData({
            downShow: true
          })
          that.down()
        }).catch(err => {
          console.log('err', err)
        })
    }
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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