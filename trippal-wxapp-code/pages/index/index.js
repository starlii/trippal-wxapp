//index.js
//获取应用实例
const app = getApp()
const { $api } = global
const {chunk} = require('../../utils/_lodash.js')
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
const http = require('../../utils/http')
let qqmapsdk
//  D6XBZ-2H23V-SNRPR-UQCX5-XKLI3-JJFJH
let {IMAGE_ADDR} = require('../../config.js')

Page({
  data: {
    imgUrls: [],
    IMAGE_ADDR: IMAGE_ADDR,
    autoplay: true,
    activeHotPage: 0,
    activeHot: 0,
    hotList: [],
    ad_info: {}, 
    scenicList: [
      { title: '世界之窗世界之窗世界之窗世界之窗世界之窗世界之窗世界之窗世界之窗世界之窗'}, 
      {title: '世界之窗2'}
    ]
  },
  handleHotPage (e) {
    console.log('&&&&')
  },
  getMoreScenic () {
    // let scenicList = ''
    // this.setData({
    //   scenicList: this.data.scenicList.push(this.data.scenicList)
    // })
  }, 
  handleHotCity (e) {
    this.setData({
      activeHot: e.currentTarget.dataset.index
    })
    
  },

  handleAddress () {
    wx.navigateTo({
      url: './citys/citys'
    })
  },
  handleScenic (event) {
    console.log()
    wx.navigateTo({
      url: `../scenic/scenic?name=${event.currentTarget.dataset.title}`,     
    })
  },
  handleScan () {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },
  openSetting () {
     wx.openSetting({
      success(res) {
        console.log('openSetting res', res)
      }
    })
  },

  getIndexData () {
    let that = this
    $api.open.getHotCities({
      locationCode:this.data.ad_info.adcode
    })
      .then(res => {
        console.log(JSON.stringify(chunk(chunk(that.data.hotList2, 5), 2)))
        that.setData({
          hotList: chunk(res.retData.lsCities, 5), 
          imgUrls: res.retData.lsBanners, 
          scenicList: res.retData.lsZones
        })
        wx.hideLoading()
      })
      .catch(err => {

      })
  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
      wx.getLocation({
        success(res) {
          // 2.2 获取用户位置成功后，将会返回 latitude, longitude 两个字段，代表用户的经纬度位置
          console.log(res)

          // 2.3 将获取到的 经纬度传值给 getAddress 解析出 具体的地址
          vm.getAddress(res.latitude, res.longitude)
        }, 
        fail (err) {
            wx.showModal({
              content: err
            })
        }
      })

    const vm = this

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.useInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      
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
  onPullDownRefresh() {
    this.getIndexData()
    wx.stopPullDownRefresh()
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getAddress(latitude, longitude) {
    qqmapsdk = new QQMapWX({
      key: 'D6XBZ-2H23V-SNRPR-UQCX5-XKLI3-JJFJH'
    })
    let vm = this
    qqmapsdk.reverseGeocoder({
      location: {latitude,longitude},
      success(res) {
        console.log('success', res)
        vm.setData({
          ad_info: res.result.ad_info
        })
        vm.getIndexData()
      },
      fail(error) {
        console.log('fail res', error)
      },
      complete(res) {
        console.log(res)
      }
    })
  }
})
