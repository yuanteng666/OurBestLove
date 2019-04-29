// miniprogram/pages/nav/nav.js
// key  WMABZ-KK3RQ-OII5A-GJLPY-Q4AGK-H6FK4
var QQMapWX = require('../../common/qqmap-wx-jssdk.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索出来的提示地点
    positions :[],
    //路线规划用到的点
    polylines:[],
    //当前点的名称
    currentPoint:'我的位置',
    //要去的点名称
    toPoint:'',
    qqmapsdk:null,
    fromPositon:null,
    toPosition:null,
    //驾驶模式
    mode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.qqmapsdk = new QQMapWX({
      key: 'WMABZ-KK3RQ-OII5A-GJLPY-Q4AGK-H6FK4' // 必填
    });
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
  endInput(event){
    let _this = this;
    let input = event.detail.value;
    console.log(input)
    if(input.length > 2){
      let promise = new Promise((resolve,reject)=>{
        //获取当前位置
        wx.getLocation({
          type: 'wgs84',
          success(res) {
            console.log("res",res)
            const latitude = res.latitude
            const longitude = res.longitude
            const speed = res.speed
            const accuracy = res.accuracy
            let position = {
              latitude,
              longitude
            }
            _this.setData({
              fromPositon:position
            })
            resolve(res.latitude + "," + res.longitude);
          },
          fail(err){
            reject(err)
          }
        });
      });
      

      promise.then(function(resolve){
        //关键词输入提示
        _this.data.qqmapsdk.getSuggestion({
          //获取输入框值并设置keyword参数
          keyword: input, //用户输入的关键词，可设置固定值,如keyword:'KFC'
          //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
          location:resolve,
          success: function (res) {//搜索成功后的回调
            console.log(res);
            var sug = [];
            for (var i = 0; i < res.data.length; i++) {
              sug.push({ // 获取返回结果，放到sug数组中
                title: res.data[i].title,
                id: res.data[i].id,
                addr: res.data[i].address,
                city: res.data[i].city,
                district: res.data[i].district,
                latitude: res.data[i].location.lat,
                longitude: res.data[i].location.lng
              });              
            }
            _this.getDistance(sug, resolve)

           
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      },function(reject){

      })
    }
  },
  getDistance(arr, current){
    let toArr = [];
    let _this = this;
    for(let item of arr){
      let obj = new Object();
      obj.latitude =  item.latitude;
      obj.longitude = item.longitude;
      toArr.push(obj);
    }

    this.data.qqmapsdk.calculateDistance({
            //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
            //from参数不填默认当前地址
            //获取表单提交的经纬度并设置from和to参数（示例为string格式）
            from:current, //若起点有数据则采用起点坐标，若为空默认当前地址
            to:toArr, //终点坐标
            success: function(res) {//成功后的回调
              
              var res = res.result;
              console.log("distance",res);
              for (var i = 0; i < res.elements.length; i++) {
                if (res.elements[i].distance > 1000){
                  arr[i].distance = Math.ceil(res.elements[i].distance / 1000) + "千米"
                }else{
                  arr[i].distance = res.elements[i].distance  + "米"
                }
              }
              _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
                positions: arr
              });
            },
            fail: function(error) {
              console.error(error);
            },
            complete: function(res) {
              console.log(res);
            }
        });
  },
  selectItem(event){
    console.log('item',event.target.dataset.item)
    let item = event.target.dataset.item;
    let postion = {
      latitude: item.latitude,
      longitude: item.longitude
    }
    this.setData({
      toPosition:postion,
      toPoint:item.title
    })
  },
  exChangePosition(){
    //交换来往的位置
    let tempPositon = this.data.fromPositon;
    let temPosition2 = this.data.toPosition;
    let tempFromName = this.data.currentPoint;
    let tempToName = this.data.toPoint;
    this.setData({
      fromPositon:temPosition2,
      toPosition:tempPositon,
      currentPoint:tempToName,
      toPoint:tempFromName
    })
  },
  selectMode(event){
    console.log('mode', event.target.dataset.mode)
    this.setData({
      mode: event.target.dataset.mode
    });
    let _this = this;
    //如果来往点不为空 下一步 路线规划
    if(this.data.fromPositon && this.data.toPosition){
      _this.data.qqmapsdk.direction({
        mode:_this.data.mode,
        from:_this.data.fromPositon,
        to:_this.data.toPosition,
        success(res){
          console.log('dirction',res)
        },
        fail(err){
          console.log('dirction fail', err)
        }
      });
    }
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


 
})