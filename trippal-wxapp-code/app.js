//app.js

import api from './api/api-index.js'
global.$api = api
global.regeneratorRuntime = require('./utils/regenerator/runtime-module.js')

App({
  globalData: {
    userInfo: null,

    // 以下为旅拍用户存储全局信息
    myTrippalInfo: {}
  },

  // 小程序版本更新提示
  checkNewVersion: function () {
    // 检查版本更新
    // 获取小程序更新机制兼容
    if (wx.canIUse("getUpdateManager")) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: "已经有新版本了哟~",
              content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: "提示",
        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
      })
    }
  },

  trippalLogin() {
    // 准备登陆信息
    var that = this
    // 授权头像访问（是否授权等）
    var userInfo = wx.getStorageSync('userInfo') || {}
    // 用户业务会话（当前业务系统基本数据）
    var myTrippalInfo = wx.getStorageSync('myTrippalInfo') || {}

    // 判断是否需要登录微信后台获取UnionId信息
    if (!userInfo.unionId) {
      console.log('[onLaunch] No user Union, need to login wx-open platform...')

      // 如果没有业务平台的登录信息就要重新登陆微信平台认证
      wx.login({
        success: res => {
          console.log('[onLaunch] login.res:', res)
          this.globalData.loginCode = res.code
        },
        fail: res => {
          console.log('[onLaunch] login-fail:', res)
        }
      })
    } else {
      console.log('[onLaunch] userInfo exists:', userInfo)
      this.globalData.userInfo = userInfo
    }
    // 本地旅拍用户业务数据
    if (myTrippalInfo.userMobile && myTrippalInfo.accessToken) {
      this.globalData.myTrippalInfo = myTrippalInfo
    }

    // 获取系统平台信息
    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res
      },
    })
  },

  onLaunch: function () {
    // 检测版本
    this.checkNewVersion()

    // 调用 API 从本地缓存中获取数据
    var me = this

    me.trippalLogin()
    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log('$$$$', res)
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

  },

})