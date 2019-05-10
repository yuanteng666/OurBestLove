// miniprogram/pages/test/testTemplate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:'',
    appId:'',
    formId:'',
    access_token:'',
    msgId:'ufGxoLY05GVJSpBNVF_5JEUYK78Y-jdi95Hg7Gbecr4'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.cloud.callFunction({
      name:'login',
      success(res){
        console.log(res)
        _this.setData({
          openId:res.result.openid,
          appId:res.result.appid
        });
        wx.request({
          url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${res.result.appid}&secret=530be8eab7008876bdaf9814c62d3d2e`,
          success(res2){
            console.log("token",res2)
            _this.setData({
              access_token: res2.data.access_token
            })
          }
        })
      },
      fail(err){
        console.log(err)
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

  handleSubmit(event){
    console.log(event.detail)
    this.setData({
      formId:event.detail.formId
    })
  },
  sendTemplateMsg(){

    let url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + this.data.access_token;
    let data = {
      touser: this.data.openId ,
      template_id: this.data.msgId,//这个是1、申请的模板消息id，  
      page: '/pages/test/testTemplate',
      form_id: this.data.formId,
      data: {
        "keyword1": {
          "value": "院腾测试",
          "color": "#4a4a4a"
        },
        "keyword2": {
          "value": "院腾测试关键词2",
          "color": "#9b9b9b"
        },
        "keyword3": {
          "value": new Date().getDate(),
          "color": "#9b9b9b"
        },
        "keyword4": {
          "value": "关键词三",
          "color": "#9b9b9b"
        },
        "keyword5": {
          "value": "$300",
          "color": "red"
        }
      },
      color: '#ccc',
      emphasis_keyword: 'keyword5.DATA'
    }
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      success: function (res) {
        console.log("push msg");
        console.log(res);
      },
      fail: function (err) {
        // fail  
        console.log("push err")
        console.log(err);
      }
    });  
  }
})