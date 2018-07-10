/**
 * 更新小程序
 */
const updateManager = wx.getUpdateManager()

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log('请求完新版本信息',res.hasUpdate)
})

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success: function (res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})

updateManager.onUpdateFailed(function () {
  // 新的版本下载失败
  console.log('新的版本下载失败')
})
//app.js app.json里面page第一个页注册的为入口界面
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app onLaunch')
    //获取access_token
    // const requestTask = wx.request({
    //   //做登录开发的时候，如果你已经获取到了code，接下来获取session_key的时候。你需要将code传到你自己的服务器，
    //   // 然后在你自己的服务器请求session_key，而不是在小程序内部直接请求微信的url获取session_key。
    //   url: 'https://api.weixin.qq.com/cgi-bin/token?',
    //   data: {
    //     appid: 'wxa313dd62b383db3b',
    //     secret: '4085a2bfe6b9c034afc2935706819f32',
    //     grant_type: 'client_credential'
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     // debugger;
    //     console.log("返回信息:res=", res)
    //     wx.setStorageSync("access_token", res.data.access_token)
    //   },
    //   fail: function (res) { },
    //   complete: function (res) { }
    // })
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    // 登录
    wx.login({
      success: res => {
        // debugger;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const requestTask = wx.request({
          //做登录开发的时候，如果你已经获取到了code，接下来获取session_key的时候。你需要将code传到你自己的服务器，
          // 然后在你自己的服务器请求session_key，而不是在小程序内部直接请求微信的url获取session_key。
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wxa313dd62b383db3b',
            secret: '4085a2bfe6b9c034afc2935706819f32',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'GET',
          success: function (res) {
            // debugger;
            console.log("返回信息:res=", res)
            wx.setStorageSync("appid", "wxa313dd62b383db3b")
            wx.setStorageSync("sessionkey", res.data.session_key)
            wx.setStorageSync("openid", res.data.openid)
          },
          fail: function (res) { },
          complete: function (res) { }
        });
        // requestTask.abort();
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        // debugger;
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("返回用户信息",res);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    isfastClicked: false,
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "pages/newtabbar/newtabbar",
          "text": "首页",
          "iconPath": "../../images/icon_API.png",
          "selectedIconPath": "../../images/icon_API_HL.png",
          "clas": "menu-item",
          "selectedColor": "#4EDF80",
          "active": true
        },
        {
          "pagePath": "pages/index/index",
          "text": "商店",
          "iconPath": "../../images/icon_component.png",
          "selectedIconPath": "../../images/icon_component_HL.png",
          "clas": "menu-item",
          "selectedColor": "#4EDF80",
          "active": false
        },
        {
          "pagePath": "pages/logs/logs",
          "text": "发现",
          "iconPath": "../../images/icon_component.png",
          "selectedIconPath": "../../images/icon_component_HL.png",
          "clas": "menu-item",
          "selectedColor": "#4EDF80",
          "active": false
        }
      ],
      "position": "bottom"
    },
    tabBar2: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "pages/newtabbar/newtabbar",
          "text": "首页",
          "iconPath": "../../images/icon_API.png",
          "selectedIconPath": "../../images/icon_API_HL.png",
           "clas": "menu-item",
        },
        {
          "pagePath": "pages/index/index",
          "text": "商店",
          "iconPath": "../../images/icon_component.png",
          "selectedIconPath": "../../images/icon_component_HL.png"
        },
        {
          "pagePath": "pages/logs/logs",
          "text": "发现",
          "iconPath": "../../images/icon_component.png",
          "selectedIconPath": "../../images/icon_component_HL.png"
        },
        {
          "pagePath": "pages/tabbarone/tabbarone",
          "text": "购物车",
          "iconPath": "../../images/icon_component.png",
          "selectedIconPath": "../../images/icon_component_HL.png",
          "clas": "menu-item",
          "selectedColor": "#4EDF80",
          "active": false
        }
      ],
      "position": "bottom"
    }
  },
   
  onShow: function (e) {
    console.log('app onshow', e);
    if (e.shareTicket != null) {
      console.log('app onshow.shareTicket', e.shareTicket);
      wx.setStorageSync("shareTicket", e.shareTicket)
    }
  },
  onHide: function (e) {
    console.log('app onhide');
  },
  onError: function (msg) {
    console.log('app onerror,' + msg);
  },
  //第一种状态的底部
  editTabBar: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    // debugger;
    var _pagePath = _curPage.route;
    var tabBar = this.globalData.tabBar;
    console.log('tabbar', tabBar);
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态  
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  //第二种状态的底部
  editTabBar2: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.route;
    var tabBar = this.globalData.tabBar2;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态  
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
})
