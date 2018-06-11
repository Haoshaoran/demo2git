//app.js app.json里面page第一个页注册的为入口界面
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app onLaunch')
    // 登录
    // wx.login({
    //   success: res => {
    //     // debugger;
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     const requestTask=wx.request({
    //       //做登录开发的时候，如果你已经获取到了code，接下来获取session_key的时候。你需要将code传到你自己的服务器，
    //       // 然后在你自己的服务器请求session_key，而不是在小程序内部直接请求微信的url获取session_key。
    //       url: 'https://api.weixin.qq.com/sns/jscode2session',
    //       data: {
    //         appid: 'wxa313dd62b383db3b',
    //         secret: '4085a2bfe6b9c034afc2935706819f32',
    //         js_code: res.code,
    //         grant_type: 'authorization_code'
    //       },
    //       header: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //       },
    //       method: 'GET',
    //       success: function (res) {
    //         // debugger;
    //         console.log("返回信息:res=",res)
    //         wx.setStorageSync("appid", "wxa313dd62b383db3b")
    //         wx.setStorageSync("sessionkey", res.data.session_key)
    //       },
    //       fail: function (res) { },
    //       complete: function (res) { }
    //     });
    //     // requestTask.abort();
    //   }
    // })
    wx.showShareMenu({
      withShareTicket: true
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     // debugger;
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
 
  globalData: {
    userInfo: null,
    isfastClicked:false
  },
  onShow : function(e){
    console.log('app onshow',e);
    if (e.shareTicket!=null){
      console.log('app onshow.shareTicket', e.shareTicket);
      wx.setStorageSync("shareTicket", e.shareTicket)
    }
  },
  onHide : function(e){
    console.log('app onhide');
  },
  onError : function(msg){
    console.log('app onerror,'+msg);
    console.log("11111");
  }
})