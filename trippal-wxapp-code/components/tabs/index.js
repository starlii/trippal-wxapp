// components/tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: {type: Number, value: null},
    items: {type: Array, value: []}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      handleItem (detail) {
        this.setData({
            active: detail.currentTarget.dataset.index
        })

        console.log(detail, this.data.active)
        this.triggerEvent('change', this.data.active)
      }
  }
})
