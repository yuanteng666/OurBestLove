// components/EditImg/edit_img.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowDelete:false
  },


  /**
   * 组件的方法列表
   */
  methods: {
    deleteImg(){
      console.log(this.properties.imgSrc)
      this.setData({
        isShowDelete: false
      })
      this.triggerEvent('deleteImg',{
        src:this.properties.imgSrc
      })
    },
    setDeleteShow(){
      this.setData({
        isShowDelete: true
      })
    }
  }
})
