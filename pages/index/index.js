//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'hello world',
    userInfo: {},
    hasUserInfo: false,
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    },
    x: 0,
    y: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onChange: function (e) {
    console.log(e.detail)
  },
  onScale: function (e) {
    console.log(e.detail)
  },
  tap: function (e) {
    this.setData({
      x: 30,
      y: 30
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickback:function(){
    console.log("clickback");
    wx.switchTab({
     url: '../tabbarone/tabbarone',
   })
  },
  onLoad: function (options) {
    // debugger;
    if (typeof options.title!="undefined"){
      this.setData({
        title: options.title
      })
    }
    console.log('index onLoad')
    console.log((Math.random() * 10).toFixed(2)+','+wx.canIUse('button.open-type.getUserInfo')+',test');
    // debugger;
    if (app.globalData.userInfo) {
      
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      debugger;
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (!options.model)return;
    var bean=JSON.parse(options.model);
    if (options.model == null) {
      wx.showToast({
        title: '数据为空',
      })
      return;
    }
    this.setData({
      motto: bean.name+bean.age+bean.sex,
    })
  },
  onShow: function(){
    console.log('index onshow')
  },
  onReady: function(){
    console.log('index onReady')
  },
  onHide: function(){
    console.log('index onHide')
  },
  onUnload: function(){
    console.log('index onUnload')
  },
  onPullDownRefresh:function(){
    console.log('index onPull')
  },
  onReachBottom:function(){
    console.log('index onReaachBottom')
  },
  onShareAppMessage:function(){
    console.log('index onShare')
    return {
      title: '自定义转发标题',
      path: '/pages/index/index'
    }
  },
  bindGetUserInfo: function(e) {
    // debugger;
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
