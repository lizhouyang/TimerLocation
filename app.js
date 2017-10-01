//app.js
const defaultTime = {
  defaultWorkTime: 25,
  defaultRestTime: 3
}

App({
  onLaunch: function () {
    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultTime.defaultWorkTime
      })
    }
    if (!restTime) {
      wx.setStorage({
        key: 'restTime',
        data: defaultTime.defaultRestTime
      })
    }
  },
  globalLocationTimer: null,
  isRuning: false,
  //开始记录位置
  startCollectLocation: function () {
    let collectionTimeStamp = Date.now()
    this.logLocation(collectionTimeStamp)
    
    let restTime = wx.getStorageSync('restTime') * 1000 * 60
    this.globalLocationTimer = setTimeout((function () {
      this.collectLocation()
    }).bind(this), restTime);
  },
  //收集一次用户位置信息
  collectLocation: function () {
    let collectionTimeStamp = Date.now()
    this.logLocation(collectionTimeStamp)
    this.startCollectLocation()
  },
  logLocation: function (collectionTimeStamp){
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        res.time = Date.now()
        res.timeStamp = collectionTimeStamp
        let latlong = wx.getStorageSync('latlong') || []
        latlong.unshift(res)
        wx.setStorageSync('latlong', latlong)
      },
      fail: function (res) {
        //TODO:定位失败
        console.debug(res)
      }
    })
  }
})
