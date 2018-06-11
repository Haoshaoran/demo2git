//logs.js
// const util = require('../../utils/util.js')
var util=require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    console.log('logs onLoad')
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      
      })
    })
  },
  onShow: function () {
    console.log('logs onshow')
  },
  onReady: function () {
    console.log('logs onReady')
  },
  onHide: function () {
    console.log('logs onHide')
  },
  onUnload: function () {
    console.log('logs onUnload')
  },
  onPullDownRefresh: function () {
    console.log('logs onPull')
  },
  onReachBottom: function () {
    console.log('logs onReaachBottom')
  },
  onShareAppMessage: function () {
    console.log('logs onShare')
  }
})
