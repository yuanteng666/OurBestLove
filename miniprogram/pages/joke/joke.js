// miniprogram/pages/joke/joke.js
let currentPage = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSet:[],
    brick_option: {
      defaultExpandStatus: true,
      forceRepaint: false,
      imageFillMode: 'widthFix',
      fontColor: '#000'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh()
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

  getList(){
    const _this = this;
    wx.request({
      url: `https://v2.sohu.com/public-api/feed?scene=CHANNEL&sceneId=45&page=${currentPage}&size=20`,
      method:'GET',
      success(res){
        console.log(res)
        _this.parseData(res.data)
      },
      fail(err){
        console.log(err)
      },
      complete(){
        wx.stopPullDownRefresh();
        wx.hideLoading()
      }
    })
  },
  parseData(res){
    let arr = this.data.dataSet;
    for(let item of res){
      var obj = this.createItem(item);
      arr.push(obj);
      this.setData({
        dataSet:arr
      })
    }
  },
  createItem(item){
    let obj = new Object();
    obj.id = item.id + '_' + item.authorId;
    obj.content = item.mobileTitle;
    obj.user= {
      'avatar': 'http:' + item.authorPic,
      'username': item.authorName,
      'userId': item.authorId
    };
    obj.images = this.parseImgArr(item.images);
    obj.time = item.publicTime/1000;
    obj.liked = false;
    obj.likedCount = 0;
    return obj;
  },
  parseImgArr(arr){
    let newArr = [];
    for (let item of arr) {
      newArr.push('http:' + item)
    }
    return newArr;
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    currentPage++;
    this.getList();
  },
  tapCard: function (event) {
    const cardId = event.detail.card_id
    // code here.
    console.log('tap card!',cardId)
    wx.navigateTo({
      url: `../joke_detail/joke_detail?id=${cardId}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})