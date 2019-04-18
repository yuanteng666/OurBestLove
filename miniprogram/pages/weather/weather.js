// miniprogram/pages/weather/weather.js
//https://www.tianqiapi.com/api/?version=v1&cityid=101110101
var wxCharts = require('../../common/wxcharts.js');
import amap from '../../common/amap-wx.js';  

var app = getApp();
var lineChart = null;
var lineChart2 = null;
Page({
  data: {
    weatherDatas:[],
    amapPlugin: null,
    key: 'c80a0724125ba2b893265e10a54863b2',
    cityId:''
  },
 
  onLoad: function (e) {
    // this.data.amapPlugin = new amap.AMapWX({
    //   key: this.data.key
    // });
    // this.getRegeo();
    this.getWeather()
  },
  getWeather(){
    const _this = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api/?version=v1&cityid=101180706',
      method:'GET',
      success(res){
        let arr = [];
        for(let item of res.data.data){
          _this.parseArrItem(item);
          arr.push(item)
        }
        console.log('newarr', JSON.stringify(arr))
        _this.setData({
          weatherDatas : arr
        });
        _this.createWxChart();
        _this.createLineChart2();
      },
      fail(err){

      }
    })
  },
  parseArrItem(obj){
    obj.temNum = parseInt(obj.tem)
    obj.temNum1 = parseInt(obj.tem1)
    obj.temNum2 = parseInt(obj.tem2)
    obj.wea_img_local = `../../images/${obj.wea_img}.png`
    for(let item of obj.hours){
      item.temNum = parseInt(item.tem)
    }
  },
  createWxChart(){
    let hours = this.data.weatherDatas[0].hours;
    let categories = [];
    let wenduData = [];
    for (let item of hours){
      categories.push(item.day.substring(item.day.indexOf('日')+1))
      wenduData.push(item.temNum)
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name:'今日天气趋势',
        data: wenduData,
        format: function (val, name) {
          return val + '℃';
        }
      }],
      xAxis: {
        disableGrid: true,
        gridColor :'#ffffff',
        fontColor :'#ffffff'
      },
      yAxis: {
        title: '',
        format: function (val) {
          return val + '℃';
        },
        min: -10,
        gridColor: '#ffffff',
        fontColor: '#ffffff'
      },
      width: 320,
      height: 300,
      dataLabel: false,
      dataPointShape: true,
      legend :false,
      extra:{
        legendTextColor :'#ffffff'
      },
    });
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
  
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ':' + item.data
      }
    });
  }, 
  touchHandler2: function (e) {
    console.log(lineChart2.getCurrentDataIndex(e));
    lineChart2.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ':' + item.data
      }
    });
  }, 
  createLineChart2(){
    
    let categories = [];
    let wenduDataMin = [];
    let wenduDataMax = [];
    for (let item of this.data.weatherDatas) {
      categories.push(item.day)
      wenduDataMin.push(item.temNum2)
      wenduDataMax.push(item.temNum1)
    }
    lineChart2 = new wxCharts({
      canvasId: 'lineCanvas2',
      type: 'line',
      categories: categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '最低温度',
        data: wenduDataMin,
        format: function (val, name) {
          return val + '℃';
        }
      },
        {
          name: '最高温度',
          data: wenduDataMax,
          format: function (val, name) {
            return val + '℃';
          }
        }],
      xAxis: {
        disableGrid: false,
        gridColor: '#ffffff',
        fontColor: '#ffffff'
      },
      yAxis: {
        title: '',
        format: function (val) {
          return val + '℃';
        },
        min: -10,
        gridColor: '#ffffff',
        fontColor: '#ffffff'
      },
      width: 320,
      height: 300,
      dataLabel: false,
      dataPointShape: true,
      legend: true,
      extra: {
        legendTextColor: '#ffffff'
      },
    });
  },
  getRegeo() {
    const _this = this;
    this.data.amapPlugin.getRegeo({
      success: (data) => {
        console.log(JSON.stringify(data))
        
        // this.data.addressName = data[0].name;
        // _this.setData({
        //   localPosition: data[0].desc
        // })
      },
      fail: (data) => {
        console.log(JSON.stringify(data))

      }
    });
  }
});