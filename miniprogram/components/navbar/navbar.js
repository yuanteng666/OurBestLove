// components/navbar/navbar.js

const App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    res_id:{
      type:String,
      value:''
    },
    isFirstPage:{
      type:Boolean,
      value:false
    },
    navTitle:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    navH:0
  },
  
  lifetimes: {
    attached: function () {
      this.setData({
        navH: App.globalData.navHeight
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navBack(){
      wx.navigateBack({
        deleta:1
      })
    },
    doShare(){
      this.triggerEvent('onShare',{
        id:this.properties.res_id
      })
    },
    doLike() {
      this.triggerEvent('onLike', {
        id: this.properties.res_id
      })
    }

  }
})
