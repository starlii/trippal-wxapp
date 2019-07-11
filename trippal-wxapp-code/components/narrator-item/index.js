// components/narrator-item/index.js
const innerAudioContext = wx.createInnerAudioContext()
let { IMAGE_ADDR } = require('../../config.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAlbum: {type: Boolean, value: false}, 
    status: { type: Boolean, value: false, observer(val) {
      if (val) {
        
      }
    }}, 
    disable:{type:Boolean, value: false}, 
    showMoney: {type:Boolean, value: false}, 
    isManage: {type: Boolean, value: false}
  },

  /**
   * 组件的初始数据
   */
  data: {
    IMAGE_ADDR: IMAGE_ADDR,
    clickNum: 0, 
    innerAudioContext: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItem () {
      if (this.data.disable) return 
      wx.navigateTo({
        url: `/pages/${this.data.isAlbum ? 'narrator/narrator' : 'narrator-detail/narrator-detail'}?name=张小游`,
      })   
    }, 
    handlePlay () {
      this.triggerEvent('click', !this.data.status)
    },
    handleBuy() {
      let token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    }, 
    handleManage () {
      wx.navigateTo({
        url: '/pages/my/my-narrate/sound-manage/index'
      }) 
    }
  },

  ready () {}
})
