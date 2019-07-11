// /utils/http.js
import { BASE_API, IMAGE_ADDR } from '../config.js'

/**
 * header: 头文件内容模式，分为如下几种形式：
 *   0 - 标准的 application/x-www-form-urlencoded
 *   1 - 标准的 application/json
 *   10 - 包含JWT的 application/x-www-form-urlencoded
 *   11 - 包含JWT的 application/json
 */
function getHeader(mode) {
  console.log('headerMode: ', mode)
  switch (mode) {
    case 1:
      return { 'content-type': 'application/json' }
    case 10:
      return {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      }
    case 11:
      return {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      }
  }
  return { 'content-type': 'application/x-www-form-urlencoded' }
}

function processRequest(url, method, requestData, headerMode, loading, resolve, reject) {
  console.log('loading', loading)
  if(loading) {
    wx.showLoading({
      title: '加载中...'
    })
  }
  // 网络请求
  wx.request({
    url: BASE_API + url,
    data: requestData,
    method: method,
    header: getHeader(headerMode),
    success: function (res) { // 服务器返回数据
      console.log('Init Res: ', res)
      switch (res.statusCode) { // res.data 为 后台返回数据，格式为{"success": true, "retData": {...}, "retMsg": "成功", "retCode": 1}, 后台规定：如果success为true, 既是正确结果。可以根据自己业务逻辑来设定判断条件
        case 200: // 请求成功
          // 登录操作进行特殊处理
          if (url.indexOf('/oauth/token') >= 0) {
            wx.setStorageSync('token', res.data.access_token)
            wx.setStorageSync('myTrippalInfo', {
              userId: res.data.userId,
              userType: res.data.userType,
              userMobile: res.data.username,
              accessToken: res.data.access_token,
              refreshToken: res.data.refresh_token,
              tokenType: res.data.token_type,
              license: res.data.license
            })
            resolve({
              success: true
            })
          } else {
            resolve({code: 200, ...res.data})
          }
          break
        case 401: // 未授权访问
          console.log('Unauthorized Error: ', res.data)
          wx.navigateTo({
            url: '/pages/login/login'
          })
          reject({ code: 401, message: res.data })
          break
        case 403: // 禁止访问
          console.log('Forbidden Error: ', res.data)
          reject({code:403, message:res.data})
        case 404: // 找不到资源
          console.log('NotFound Error: ', res.data)
          reject({code:403, message:res.data})
          break
        default:
          console.log('Unhandled Error: ', res.data)
          reject({rcode: es.statusCode, message:res.data})
          break
      }
    },
    fail: function (e) {
      console.log('Init Error: ', e)
      reject({
        code:404,
        msg: '网络出错'
      })
    },
    complete: function (e) {
      if(loading) wx.hideLoading()
      console.log('Init Complete: ', e)
    }
  })
}

const post = function (url, data, loading, headerMode = 0) {
  var promise = new Promise((resolve, reject) => {
    // init
    var that = this
    processRequest(url, 'POST', data, headerMode, loading, resolve, reject)
  })

  return promise
}

const get = function (url, data, loading, headerMode = 0) {
  var promise = new Promise((resolve, reject) => {
    processRequest(url, 'GET', data, headerMode, loading, resolve, reject)
  })

  return promise
}

const path = function (url, data, loading, headerMode = 0) {
  var promise = new Promise((resolve, reject) => {
    processRequest(url + '/' + data, 'GET', null, headerMode, loading, resolve, reject)
  })

  return promise
}


module.exports = {
  post,
  get,
  path
}