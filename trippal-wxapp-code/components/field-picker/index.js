// components/field-picker/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    label: {
      type: String,
      value: null
    }, 
    placeholder: {
      type: String, 
      value: null
    }, 
    required: {
      type: Boolean, 
      value: false
    }, 
    index: {
      type: [String, Number],
      value: null
    }, 
    array: {
      type: Array,
      value: ['美国', '中国', '巴西', '日本']
    }
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
    bindPickerChange(e) {
      this.setData({
        index: e.detail.value
      })
      this.triggerEvent('change', { value: e.detail.value })
    }
  }
})
