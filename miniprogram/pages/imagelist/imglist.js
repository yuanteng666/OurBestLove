// miniprogram/pages/imagelist/imglist.js
const PAGE_LIMIT = 10;
let currentPage = 1;
let totalPage = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    const db = wx.cloud.database()
    db.collection('story').count({
      success(res){
        wx.startPullDownRefresh();
        const count = res.total;
        totalPage = Math.ceil(res.total / PAGE_LIMIT);
        _this.getlist()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    currentPage = 1;
    this.getlist();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(currentPage < totalPage){
      this.getlist()
    }else{
      wx.showToast({
        title: '没有数据了',
        duration:2000
      })
    }
  },
  test(){
    return "fasfdsa"
  },
  getlist(){
    const _this = this;
    const db = wx.cloud.database();
    db.collection("story")
    .skip((currentPage-1)*PAGE_LIMIT)
    .limit(PAGE_LIMIT)
    .get({
      success(res){
        console.log('res',res)
        let resArray = res.data;
        _this.setData({
          storyList: _this.data.storyList.concat(resArray)
        });
        currentPage++;
        wx.stopPullDownRefresh();
      },
      fail(err){
        console.log(err)
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})