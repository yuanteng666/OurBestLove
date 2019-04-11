// miniprogram/pages/addTour/addtour.js
import amap from '../../common/amap-wx.js';  
import {dateFtt} from '../../common/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: [],
    imgIds:[],
    localPosition:'内乡县南王村249省道附近',
    amapPlugin: null,
    key: 'c80a0724125ba2b893265e10a54863b2',
    address:'',
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.amapPlugin = new amap.AMapWX({
      key: this.data.key
    });  
    this.getRegeo();
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
      sizeType: ['compressed'],
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
    wx.showLoading({
      title: '数据提交中...',
      mask:true
    })
    const filePaths = this.data.imgArr, cloudPaths = []; 
    filePaths.forEach((item, i)=>{
        cloudPaths.push(i + '_' + filePaths[i].match(/\.[^.]+?$/)[0])  ;
    })
    const _this = this;
    new Promise((resolve) =>{
      for (let i = 0; i < filePaths.length; i++) {
        wx.cloud.uploadFile({
          cloudPath: cloudPaths[i],
          filePath: filePaths[i],
          success: res => {
            console.log(res)
            let arr = _this.data.imgIds;
            arr.push(res.fileID)
            _this.setData({
              imgIds: arr
            });
            if(i == filePaths.length-1){
              resolve(true)
            }
          },
          fail(){
            resolve(false)
          }
        })
        }
    }).then(res => {
      console.log('res',res)
      if (res) {

        const db = wx.cloud.database();
        
        db.collection('story').add({
          data: {
            position: _this.data.localPosition,
            msg: _this.data.msg,
            createTime: dateFtt("yyyy-MM-dd hh:mm:ss",new Date()),
            imgs: _this.data.imgIds,
            fengmianImg: _this.data.imgIds[0]
          },
          success(res) {
            console.log('data--',res)
            wx.hideLoading()
          },
          fail(err){
            wx.showModal({
              title: '警告',
              content: '数据提交失败，请重试',
              success(res){
                wx.hideLoading()
              }
            })
          }
        })
      }
    });
  },
  setMsg(e){
    this.setData({
      msg : e.detail.value
    })
  },
 
  getRegeo() {  
    const _this = this;
    this.data.amapPlugin.getRegeo({
      success: (data) => {
        console.log(data)
       // this.data.addressName = data[0].name;
        _this.setData({
          localPosition:data[0].desc
        })
      },
      fail: (data) => {
        console.log(JSON.stringify(data))

      }
    });
  }  ,
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