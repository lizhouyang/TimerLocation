Page({
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '设置'
    })
    var appInstance = getApp()
    let isRuning = appInstance.isRuning
    console.debug(isRuning)
    this.setData({
      workTime: wx.getStorageSync('workTime') || 40,
    	restTime: wx.getStorageSync('restTime') || 1,
      isRuning: isRuning
    })
  },
  changeWorkTime: function(e) {
  	wx.setStorage({
  		key: 'workTime',
  		data: e.detail.value
  	})
  },
  changeRestTime: function(e) {
  	wx.setStorage({
  		key: 'restTime',
  		data: e.detail.value
  	})
  }
})
