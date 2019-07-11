// pages/my/common/sound-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlerPlay () {
      this.setData({
        isPlay: !this.data.isPlay
      })
    }
  }
})
