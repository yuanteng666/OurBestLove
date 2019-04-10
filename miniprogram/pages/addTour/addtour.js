// miniprogram/pages/addTour/addtour.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: [],
    imgIds:[],
    localPosition:'fasdfdasfdsafsda'
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
    const _this = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        let oldImgArr = _this.data.imgArr;
          _this.setData({
            imgArr: oldImgArr.concat(res.tempFilePaths)
          });
      },
      fail:function(){
          console.log("选图失败")
      }
    })
  },
  uploadFile(){
    //改写: 数组 多图片 
    const filePaths = this.data.imgArr, cloudPaths = []; 
    filePaths.forEach((item, i)=>{
        cloudPaths.push(i + '_' + filePaths[i].match(/\.[^.]+?$/)[i])  ;
    })
    const _this = this;
    for (let i = 0; i < filePaths.length;i++){
      wx.cloud.uploadFile({
        cloudPath: cloudPaths[i],
        filePath: filePaths[i],
        success:res=>{
          console.log(res)
          let arr = _this.data.imgIds;
          arr.push(res.fileID)
          _this.setData({
            imgIds:arr
          });
          console.log(_this.data.imgIds)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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