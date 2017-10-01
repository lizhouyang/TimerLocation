var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    modalHidden: true,
    toastHidden: true
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '位置记录'
    })
    this.getLogs()
  },
  set: function () {

  },
  getLogs: function () {
    let logs = wx.getStorageSync('latlong') || []
    logs.forEach(function (item, index, arry) {
      item.time = util.dateFormat(new Date(item.time),'h:mm:ss')
      item.timeStamp = util.dateFormat(new Date(item.timeStamp),'h:mm:ss')
    })
    this.setData({
      logs: logs
    })
  },
  onLoad: function () { },
  switchModal: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  hideToast: function () {
    this.setData({
      toastHidden: true
    })
  },
  clearLog: function (e) {
    wx.setStorageSync('latlong', [])
    this.switchModal()
    this.setData({
      toastHidden: false
    })
    this.getLogs()
  }
})
