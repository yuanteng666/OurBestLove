// miniprogram/pages/addTour/addtour.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: ["https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg", "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg", "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg", "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product4.jpg","https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product5.jpg",
    "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },  

  deleteImg(e){
    const src = e.detail.src;
    console.log("com---"+src)
    let index = this.data.imgArr.findIndex((val,index,arr)=>{
      return val == src;
    });
    if(index != -1){
      const newarr = this.data.imgArr;
       newarr.splice(index,1);
      this.setData({
        imgArr:newarr
      });
    }
  },
  chooseImg(){

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.chooseImage({
      success: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})