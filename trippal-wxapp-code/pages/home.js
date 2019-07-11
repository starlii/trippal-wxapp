// pages/home.js

import { BASE_API, IMAGE_ADDR } from '../config.js'
    // init
const { $api } = global
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    IMAGE_ADDR: IMAGE_ADDR,
    // 系统基本账号相关信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    unknownType: false,

  },

  // 获取到用户授权后处理用户相关信息
  onGotUserInfo: function (e) {
    console.log('[onGotUserInfo] UserInfo.detail:', e.detail)
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
      this.setData({
        tipContent: '您拒绝授权访问您的个人信息，这将使您无法正常使用本应用！',
        tipDlgShow: true
      })
      return
    }

    // 开始请求后台服务器解析UnionId
    // 3.请求自己的服务器，解密用户信息 获取unionId等加密信息
    var self = this
    wx.request({
      url: BASE_API + '/public/decodeWxUserInfo', // 自己的服务接口地址
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { encryptedData: e.detail.encryptedData, iv: e.detail.iv, code: app.globalData.loginCode },
      success: function (data) {
        // 4.解密成功后 获取自己服务器返回的结果
        if (data.data.status == 1) {
          app.globalData.userInfo = data.data.userInfo
          wx.setStorageSync('userInfo', data.data.userInfo)
          self.setData({
            userInfo: data.data.userInfo,
            hasUserInfo: true
          })
          console.log('[onGotUserInfo] UserInfo with UnionId', data.data.userInfo)

          // 解密成功后，请求用户数据并跳转页面
          self.processInitUserData()
        } else {
          console.log('解密失败')
        }
      },
      fail: function () {
        console.log('系统错误')
      },
      complete: function () {
      }
    })
  },

  processInitUserData() {
    var targetUrl = '/pages/index/index'
    if (this.data.myTrippalInfo.userMobile) {
      console.log('myTrippalInfo.userMobile:', this.data.myTrippalInfo.userMobile)
      wx.showLoading({
        title: '请稍后...',
        mask: true
      })
      $api.sys.checkUserStatus({
        mobile: this.data.myTrippalInfo.userMobile
      }).then(res => {
        wx.hideLoading()
        console.log('checkUserStatus.res:', res)
        this.setData({
          'myTrippalInfo.statusCode': res.success ? 1 : 0
        })
        wx.setStorageSync('isLogin', res.success ? true : false)
        wx.reLaunch({
          url: targetUrl,
          success: res => {
            console.log('[processInitUserData] Page into ', targetUrl)
          },
          fail: res => {
            console.log('[processInitUserData] Failed to into ', targetUrl)
          }
        })
      }).catch(res => {
        wx.hideLoading()
        console.log('Exception: ', res)
        wx.setStorageSync('isLogin', false)
        wx.reLaunch({
          url: targetUrl,
          success: res => {
            console.log('[processInitUserData] Page into ', targetUrl)
          }
        })
      })
    } else {
      wx.reLaunch({
        url: targetUrl,
      })
    }
  },

  // 重载数据
  reloadData() {
    // 检查是否已经有了用户授权
    if (app.globalData.userInfo && app.globalData.userInfo.unionId) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      // 如果用户Trippal信息已经存在，就检测是否需要验证用户账号状态
      this.processInitUserData()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.myTrippalInfo) {
      this.setData({
        myTrippalInfo: app.globalData.myTrippalInfo
      })
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.reloadData()
  }
})