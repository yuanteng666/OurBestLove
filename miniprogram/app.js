//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        //记录用户信息
        traceUser: true,
        //云环境
        env:'test-3a9d82'
      })
    }

    this.globalData = {}
  }
})
