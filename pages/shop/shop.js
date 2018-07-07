// pages/shop/shop.js
var util = require("../../utils/util.js")
var amapFile = require("../../libs/amap-wx.js");
var app = getApp();
var num = 1;
var query = wx.createSelectorQuery();
var systemNum = 0;
var phoneInfo = null;
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden: true,
    titleMsg: " ",
    sureMsg: "去设置",
    authorTitle: "",
    cancleBtn: false,
    location: "获取地址",
    operatetype: 0,
    key: "d29edb092fbe4eabb27aab5f84d56693",
    animationData: {},
    imagehidden: true,
    ctPath: '',
    videohidden: true,
    mimihidden:true,
    linPhone:'',
    getChange:true,
    huozheng:'',
    yanzheng:'',
    time:'60'
  },
  getLocationClick: function() {
    this.data.operatetype = 0;
    this.operatelocation(false, 0);
  },
  //isSetBack 是否为从授权页面返回;operatetype 0获取本地物理地址,1打开地图选择位置
  operatelocation: function(isSetBack, operatetype) {
    var that = this;
    var hasData = wx.getStorageSync("userLocation");
    var storage = wx.getStorageInfoSync();
    console.log("storage", storage);
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation'] && !isSetBack && hasData) { //授权页面返回还没有授权则不弹出,第一次微信授权拒绝后要求弹出
          // debugger;
          that.showDialog();
        } else {
          // debugger;
          if (operatetype == 0) {
            that.getlocationInfo(hasData)
          } else {
            that.chooselocation(hasData)
          }
        }
      },
      complete: function() {

      }
    })
  },
  //获取本地地址并打开
  getlocationInfo: function(hasData) {
    wx.showLoading({
      title: '加载中',
    });
    let that = this
    wx.getLocation({
      // type: "gcj02 ",//可用于wx.openLocation的坐标
      altitude: true,
      success: function(res) {
        console.log("获取地址成功", res)
        let jd = res.longitude; //经度
        let wd = res.latitude; //纬度
        let longitudes = jd > 0 ? "东经" + Math.abs(jd) : "西经" + Math.abs(jd)
        let latitude = wd > 0 ? "北纬" + Math.abs(wd) : "南纬" + Math.abs(wd)
        that.setData({
          location: longitudes + latitude
        })
        that.openlocation(jd, wd);
        that.getLocationDetail(jd, wd);
      },
      fail: function(res) {
        console.log("获取地址失败", res)
        that.showToast("获取地址失败" + res, "none");
        if (!hasData) {
          that.showDialog();
        }
      },
      complete: function(res) {
        wx.setStorageSync("userLocation", "1");
        console.log("获取地址完成", res)
        wx.hideLoading()
      },
    })
  },
  showDialog: function() {
    this.setData({
      isHidden: false,
      titleMsg: "请前往设置页打开用户信息授权",
      sureMsg: "去设置",
      authorTitle: "获取地理位置授权",
    })
  },
  sureBtn: function() {
    console.log("sureBtn");
    this.setData({
      isHidden: true,
    })
    if (!util.compareVersion("2.0.7")) {
      console.log("canuse")
      wx.openSetting({
        success: res => {
          var that = this;
          console.log("授权设置完毕 :")
          this.operatelocation(true, this.data.operatetype);
        }
      })
    }
  },
  onMyEvent: function(e) {
    // console.log("授权设置完毕 :", e)
    this.setData({
      isHidden: true,
    })
    this.operatelocation(true, this.data.operatetype);
  },
  //​使用微信内置地图查看位置。wx.openLocation
  openlocation: function(longitudes, latitude) {
    wx.openLocation({
      latitude: latitude,
      longitude: longitudes,
      success: res => {
        console.log("查看地理位置成功", res)
      },
      fail: res => {
        console.log("查看地理位置失败", res)
      }
    })

  },
  chooseLocationClick: function() {
    this.data.operatetype = 1;
    this.operatelocation(false, 1);
  },
  //  打开地图选择位置。
  chooselocation: function(hasData) {
    wx.showLoading({
      title: '加载中',
    });
    let that = this
    wx.chooseLocation({
      success: function(res) {
        console.log("选择地图位置成功", res);
      },
      fail: function(res) {
        console.log("选择地图位置失败", res);
        wx.getSetting({
          success:res=>{
            if (!hasData &&!res.authSetting['scope.userLocation']){
              that.showDialog();
            }
          } 
        })
      },
      complete: function(res) {
        wx.hideLoading();
        wx.setStorageSync("userLocation", "1");
        console.log("选择地图完成", res)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'XQVBZ-V3RK6-Q7TSG-ENUVB-JGBO5-ZJF7Z'
    });
    console.log("shop is onload")
    var that = this;
    // 监听网络状态变化。
    wx.onNetworkStatusChange(function(res) {
      console.log(res.isConnected)
      console.log(res.networkType)
    })
    // 获取设备信息
    phoneInfo = wx.getSystemInfoSync();
    if (phoneInfo.system.indexOf('Android') != -1) {
      systemNum = util.strTonum(phoneInfo.system);
      console.log('设备信息', phoneInfo, '系统版本号' + systemNum)
      let a = systemNum.substring(0, systemNum.indexOf('.'))
      console.log("a", a);
    }
    // 必须先初始化(startWifi)才能生效
    wx.startWifi({
      success: res => {
        this.connectedWifi();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成//url地址, uri资源
   */
  onReady: function() {
    console.log('shop is onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("shop is onshow")
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation

    animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function() {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  showToast: function(msg, icon) {
    wx.showToast({
      title: msg,
      icon: icon,
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //显示模拟弹窗  
  showModal: function() {
    wx.showModal({
      title: 'showModal',
      content: 'this is showModal' + "\n" + 'hello world',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#0bb50b',
      confirmText: '确定',
      confirmColor: '#4e8cff',
      success: res => {
        console.log("显示模拟窗成功")
      },
      fail: res => {
        console.log("显示模拟窗失败")
      }
    })
  },
  // 显示操作菜单
  showoperamenu: function() {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function(res) {
        console.log("showActionsuccess", res)
      },
      fail: function(res) {
        console.log("showActionfail", res)
      }
    })
  },
  // 动态设置当前页面的标题。
  setNavigationBarTitle: function() {
    wx.setNavigationBarTitle({
      title: '商店bar',
      success: res => {
        console.log("设置bar成功", res)
      },
      fail: res => {
        console.log("设置bar失败", res)
      }
    })
  },
  //动态设置置顶栏文字内容,5s内调用多次会返回fail
  setTopBarText: function() {
    if (util.isfastclick(5000)) {
      wx.showToast({
        title: '设置置顶栏API 5秒内只能调用一次,请稍后再试!',
        icon: "none"
      })
      return;
    }
    app.globalData.isfastClicked = true;
    wx.setTopBarText({
      text: 'hello, world!',
      success: res => {
        console.log("设置topbar成功", res)
      },
      fail: res => {
        console.log("设置topbar失败", res)
      },
      complete: res => {
        console.log("设置topbar完成", res)
      }
    })
  },
  //在当前页面显示导航条加载动画
  showNavigationBarLoading: function() {
    wx.showNavigationBarLoading();
  },
  //隐藏导航条加载动画
  hideNavigationBarLoading: function() {
    wx.hideNavigationBarLoading()
  },
  //
  setNavigationBarColor: function() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 4000,
        timingFunc: 'easeIn'
      }
    })
  },
  //为 tabBar 某一项的右上角添加文本
  setTabBarBadge: function() {
    wx.setTabBarBadge({
      index: 0, //tabBar的哪一项，从左边算起
      text: num++ + "", //文本，超过 3 个字符则显示成“…”
      success: res => {},
      fail: res => {},
      complete: res => {}
    })
  },
  removeTabBarBadge: function() {
    wx.removeTabBarBadge({
      index: 0, //tabbar右上即使没有文本也会回调success
      success: res => {
        console.log("移除TabBarBadge成功", res)
      },
      fail: res => {
        console.log("移除TabBarBadge失败", res)
      },
      complete: res => {
        console.log("移除TabBarBadge完成", res), num = 1
      }
    })
  },
  //显示 tabBar 某一项的右上角的红点
  showTabBarRedDot: function() {
    wx.showTabBarRedDot({
      index: 0,
      success: res => {},
      fail: res => {},
      complete: res => {}
    })
  },
  hideTabBarRedDot: function() {
    wx.hideTabBarRedDot({
      index: 0,
      success: res => {
        console.log("移除TabBarRedDot成功", res)
      },
      fail: res => {
        console.log("移除TabBarRedDot失败", res)
      },
      complete: res => {
        console.log("移除TabBarRedDot完成", res)
      }
    })
  },
  setTabBarStyle: function() {
    wx.setTabBarStyle({
      color: '',
      selectedColor: '',
      backgroundColor: '',
      borderStyle: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //动画
  rotateAndScale: function() {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale: function() {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function() {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({
      duration: 1000
    })
    this.setData({
      animationData: this.animation.export()
    })
  },
  pageScrollTo: function() {
    wx.pageScrollTo({
      scrollTop: 457,
      duration: 3000
    })
  },
  getFields: function() {
    wx.createSelectorQuery().select('#btfield').fields({
      id: true,
      dataset: true,
      rect: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY']
    }, function(res) {
      res.dataset // 节点的dataset
      res.width // 节点的宽度
      res.height // 节点的高度
      res.scrollLeft // 节点的水平滚动位置
      res.scrollTop // 节点的竖直滚动位置
      res.scrollX // 节点 scroll-x 属性的当前值
      res.scrollY // 节点 scroll-y 属性的当前值
      console.log("节点信息", res) //单位:px
    }).exec()
  },
  //起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。

  chooseAddress: function() {
    wx.chooseAddress({
      success: function(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  //获取本机支持的SOTER生物认证方式,需真机调试
  checkIsSupportSoterAuthentication: function() {
    wx.checkIsSupportSoterAuthentication({
      success: res => {
        console.log("获取生物认证方式成功", res)
      },
      fail: res => {
        console.log("获取生物认证方式失败", res);
      },
      complete: res => {
        console.log("获取生物认证方式完成", res);
      }
    })
  },
  //开始 SOTER 生物认证
  startSoterAuthentication: function() {
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'], //暂只支持指纹识别
      challenge: '123456',
      authContent: '请用指纹解锁',
      success(res) {
        console.log("生物认证成功", res);
      },
      fail(res) {
        console.log("生物认证失败", res);
      },
      complete(res) {
        console.log("生物认证完成", res);
      }
    })
  },
  // 获取设备内是否录入如指纹等生物信息的接口
  checkIsSoterEnrolledInDevice: function() {
    wx.checkIsSoterEnrolledInDevice({
      checkAuthMode: 'fingerPrint',
      success(res) {
        console.log("获取生物信息成功", res);
      },
      fail(res) {
        console.log("获取生物信息失败", res);
      },
      complete(res) {
        console.log("获取生物信息完成", res);
      }
    })
  },
  createCanvasContext: function() {
    const ctx = wx.createCanvasContext('firstCanvas')
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 75)
    ctx.draw()
  },
  createLinearGradient: function() {
    const ctx = wx.createCanvasContext('firstCanvas')

    // Create linear gradient
    const grd = ctx.createLinearGradient(0, 0, 200, 0)
    grd.addColorStop(0, 'red')
    grd.addColorStop(1, 'white')

    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 150, 80)
    ctx.draw()
  },
  createCircularGradient: function() {
    const ctx = wx.createCanvasContext('firstCanvas')

    // Create circular gradient
    const grd = ctx.createCircularGradient(75, 50, 50)
    grd.addColorStop(0, 'red')
    grd.addColorStop(1, 'white')

    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 150, 80)
    ctx.draw()
  },
  canvasToTempFilePath: function() {
    wx.canvasToTempFilePath({
      x: 100,
      y: 200,
      width: 50,
      height: 50,
      destWidth: 100,
      destHeight: 100,
      canvasId: 'firstCanvas',
      success: res => {
        console.log(res.tempFilePath)
        this.setData({
          imagehidden: false,
          ctPath: res.tempFilePath
        })
      }
    })

  },
  setShadow: function() {
    const ctx = wx.createCanvasContext('firstCanvas')
    ctx.setFillStyle('red')
    ctx.setShadow(10, 50, 50, 'blue')
    ctx.fillRect(10, 10, 150, 75)
    ctx.draw()
  },
  arc: function() {
    const ctx = wx.createCanvasContext('firstCanvas')

    // Draw coordinates
    ctx.arc(100, 75, 50, 0, 2 * Math.PI)
    ctx.setFillStyle('#EEEEEE')
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(40, 75)
    ctx.lineTo(160, 75)
    ctx.moveTo(100, 15)
    ctx.lineTo(100, 135)
    ctx.setStrokeStyle('#AAAAAA')
    ctx.stroke()

    ctx.setFontSize(12)
    ctx.setFillStyle('black')
    ctx.fillText('0', 165, 78)
    ctx.fillText('0.5*PI', 83, 145)
    ctx.fillText('1*PI', 15, 78)
    ctx.fillText('1.5*PI', 83, 10)

    // Draw points
    ctx.beginPath()
    ctx.arc(100, 75, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('lightgreen')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(100, 25, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('blue')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(150, 75, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('red')
    ctx.fill()

    // Draw arc
    ctx.beginPath()
    ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
    ctx.setStrokeStyle('#333333')
    ctx.stroke()

    ctx.draw()
  },
  scale: function() {
    const ctx = wx.createCanvasContext('firstCanvas')

    ctx.strokeRect(10, 10, 25, 15)
    ctx.scale(2, 2)
    ctx.strokeRect(10, 10, 25, 15)
    ctx.scale(2, 2)
    ctx.strokeRect(10, 10, 25, 15)

    ctx.draw()
  },
  rotate: function() {
    const ctx = wx.createCanvasContext('firstCanvas')

    ctx.strokeRect(100, 10, 150, 100)
    ctx.rotate(20 * Math.PI / 180)
    ctx.strokeRect(100, 10, 150, 100)
    ctx.rotate(20 * Math.PI / 180)
    ctx.strokeRect(100, 10, 150, 100)

    ctx.draw()
  },
  translate: function() {
    const ctx = wx.createCanvasContext('firstCanvas')

    ctx.strokeRect(10, 10, 150, 100)
    ctx.translate(20, 20)
    ctx.strokeRect(10, 10, 150, 100)
    ctx.translate(20, 20)
    ctx.strokeRect(10, 10, 150, 100)

    ctx.draw()
  },
  clip: function() {
    const ctx = wx.createCanvasContext('firstCanvas')

    wx.downloadFile({
      url: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b' +
        '907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
      success: function(res) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(50, 50, 25, 0, 2 * Math.PI)
        ctx.clip()
        ctx.drawImage(res.tempFilePath, 25, 25)
        ctx.restore()
        ctx.draw()
      }
    })
  },
  start: function(e) {
    this.setData({
      hidden: false,
      mimihidden:false,
      x: parseInt(e.touches[0].x),
      y: parseInt(e.touches[0].y)
    })
  },
  move: function(e) {
    this.setData({
      x: parseInt(e.touches[0].x),
      y: parseInt(e.touches[0].y)
    })
  },
  end: function(e) {
    this.setData({
      hidden: false
    })
  },
  addColorStop: function() {
    const ctx = wx.createCanvasContext('firstCanvas')

    // Create circular gradient
    const grd = ctx.createLinearGradient(30, 10, 150, 10)
    grd.addColorStop(0, 'red')
    grd.addColorStop(0.16, 'orange')
    grd.addColorStop(0.33, 'yellow')
    grd.addColorStop(0.5, 'green')
    grd.addColorStop(0.66, 'cyan')
    grd.addColorStop(0.83, 'blue')
    grd.addColorStop(1, 'purple')

    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 150, 80)
    ctx.draw()
  },
  clickminiProgram: function() {
    if (!util.compareVersion('2.0.7')) {
      console.log("低版本")
      wx.navigateToMiniProgram({
        appId: 'wx54ed235e12cf97eb',
        // path: 'pages/index/index?id=123',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          // 打开成功
          console.log("打开思迅购成功")
        },
        fail(res) {
          console.log("打开思迅购失败")
        }
      })
    }
  },
  //查看地点列表
  checkLoactionList: function() {
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getnearbypoilist?',
      method: 'GET',
      data: {
        page: '1',
        page_rows: '20',
        access_token: wx.getStorageSync('access_token')
      },
      success: res => {
        console.log("查看地点列表成功", res)
      },
      fail: res => {
        console.log("查看地点列表失败", res)
      }
    })
  },
  // 获取手机验证码
  yanzhengBtn: function() {
    wx.request({
      url: 'url', //https://www.didu86.com/Clothes-manager-web/codenum
      data: {
        tel: 15972080816,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var result = res.data.code;
        console.log('获取手机验证码成功', result)
      },
      fail: function(res) {
        console.log('获取手机验证码失败')
      }
    })
  },
  // 选取视频
  chooseVideo: function() {
    if (!this.data.videohidden) {
      this.setData({
        videohidden: true
      })
      return;
    }
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      success: res => {
        console.log('选取视频成功', res)
        this.setData({
          src: res.tempFilePath,
          videohidden: false
        })
      },
      fail: res => {
        console.log('选取视频失败', res)
      },
      complete: res => {
        console.log('选取视频完成', res)
      }
    })

  },
  // 动态加载字体
  loadfontface: function() {
    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: "http://developer.mozilla.org/@api/deki/files/2934/=VeraSeBd.ttf",
      success: function(res) {
        console.log('动态加载字体成功', res) //  loaded
      },
      fail: function(res) {
        console.log('动态加载字体失败', res) //  error
      },
      complete: function(res) {
        console.log('动态加载字体完成', res);
      }
    });
  },
  // 打开下载文档
  openDocument: function() {
    wx.downloadFile({
      url: 'http://128.0.19.12:8080/DZ-LED8.doc', //doc, xls, ppt, pdf, docx, xlsx, pptx(<=10M)
      success: function(res) {
        console.log('下载文档成功', res);
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function(res) {
            console.log('打开文档成功', res)
          },
          fail: function(res) {
            console.log('打开文档失败', res)
          },
          complete: function(res) {
            console.log('打开文档完成', res)
          },
        })
      },
      fail: res => {
        console.log('下载文档失败', res);
      },
      complete: res => {
        console.log('下载文档完成', res);
      }
    })
  },
  // 获取网络状态
  getNetworkType: function() {
    wx.getNetworkType({
      success: function(res) {
        console.log('获取网络状态成功', res)
      },
      fail: function(res) {
        console.log('获取网络状态失败', res)
      }
    })
  },
  // 调用微信支付
  requestPayment: function() {
    var ts = new Date().getTime + '';
    var appid = wx.getStorageSync('appid');
    console.log('appid', appid);
    var ns = '5K8264ILTKCH16CQ2502SI8ZNMTM67VS';
    var pk = 'prepay_id=wx2018073010242291fcfe0db70013231072'; //prepay_id:统一下单接口返回的  
    var ps = util.getMD5Data('appId=' + appid + '&nonceStr=' + ns + '&package=' + pk + '&signType=MD5' + '&timeStamp=' + ts + '&key=4085a2bfe6b9c034afc2935706819f32');
    console.log('ps', ps);
    wx.requestPayment({
      timeStamp: ts,
      nonceStr: ns,
      package: pk,
      signType: 'MD5',
      paySign: ps,
      success: function(res) {
        console.log('微信支付成功', res)
      },
      fail: function(res) {
        console.log('微信支付失败', res)
      },
      complete: function(res) {
        console.log('微信支付完成', res)
      },
    })
  },
  // canvas区域隐含的像素数据
  canvasGetImageData: function() {
    wx.canvasGetImageData({
      canvasId: 'firstCanvas',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      success: function(res) {
        console.log('成功,像素数据:', res)
      },
      fail: function(res) {
        console.log('失败,像素数据:', res)
      },
      complete: function(res) {
        console.log('完成,像素数据:', res)
      },
    })
  },
  // 蓝牙
  openbluetooth: function() {
    wx.openBluetoothAdapter({
      success: function(res) {
        console.log('打开蓝牙成功', res)
      },
      fail: function(res) {
        console.log('打开蓝牙失败', res)
      },
      complete: function(res) {
        console.log('打开蓝牙完成', res)
      },
    })
    wx.getBluetoothAdapterState({
      success: function(res) {
        console.log('获取蓝牙状态成功', res)
      },
    })
    wx.onBluetoothAdapterStateChange(function(res) {
      console.log('监听状态变化', res)
    })
    //   stop 方法停止搜索
    wx.startBluetoothDevicesDiscovery({
      success: function(res) {
        wx.getBluetoothDevices({
          success: function(res) {
            console.log('获取周围蓝牙设备成功', res)
            wx.stopBluetoothDevicesDiscovery({
              success: function(res) {
                console.log('成功停止蓝牙搜索', res)
              },
              complete: res => {
                wx.closeBluetoothAdapter({
                  success: function(res) {
                    console.log('成功关闭蓝牙', res)
                  },
                })
              },
            })
          },
        })
      },
    })
  },
  // wifi
  startWifi: function() {
    // 步骤:1.startWifi;2.getWifiList;3.onGetWifiList;4.connectWifi;5.onWifiConnected  ----android
    // 步骤:1.startWifi;2.getWifiList;3.onGetWifiList;4.setWifiList;5.onWifiConnectted ----iOS
    let system = phoneInfo.system;
    var that = this;
    wx.startWifi({
      success: function(res) {
        console.log('打开wifi成功', res)
        wx.getWifiList({
          success: function(res) {
            console.log('初始化获取wifi列表成功', res)
          },
          fail: function(res) {
            console.log('初始化获取wifi列表失败', res)
          },
          complete: function(res) {
            console.log('初始化获取wifi列表完成', res)
          },
        })
        wx.onGetWifiList(function(res) {
          if (res.wifiList.length > 0) {
            let version = util.strTonum(system)
            let a = version.substring(0, version.indexOf('.'))
            console.log("a", a);
            if (system.indexOf('Android') != -1 || system.indexOf('android') != -1 ||
              (system.indexOf('iOS') != -1 && parseInt(a) > 10)) {
              console.log("android系统版本:", system)
              console.log("wifi:", res)
              wx.connectWifi({
                SSID: res.wifiList[1].SSID,
                BSSID: res.wifiList[1].BSSID,
                password: 'tdls365comcn',
                success: function(res) {
                  console.log('连接wifi列表成功', res)
                  that.connectedWifi();
                },
                fail: function(res) {
                  console.log('连接wifi列表失败', res)
                },
                complete: function(res) {
                  console.log('连接wifi列表完成', res)
                },
              })
              //android系统的
            } else if (system.indexOf('iOS') != -1) {
              console.log("ios系统版本:", system)
              wx.setWifiList({
                wifiList: [{
                  SSID: res.wifiList[0].SSID,
                  BSSID: res.wifiList[0].BSSID,
                  password: '123456'
                }],
                success: function(res) {
                  console.log('连接wifi列表成功', res)
                },
                fail: function(res) {
                  console.log('连接wifi列表失败', res)
                },
                complete: function(res) {
                  console.log('连接wifi列表完成', res)
                },
              })
            }
          }
        })
      },
      fail: function(res) {
        console.log('打开wifi失败', res)
      },
      complete: function(res) {
        console.log('打开wifi完成', res)
      },
    })
  },
  // 连接上wifi之后获取wifi信息并监听
  connectedWifi: function() {
    wx.getConnectedWifi({
      success: function(res) {
        console.log('获取连接的wifi信息成功', res)
      },
      fail: function(res) {
        console.log('获取连接的wifi信息失败', res)
      },
      complete: function(res) {
        console.log('获取连接的wifi信息完成', res)
      },
    })
    wx.onWifiConnected(function(res) {
      console.log('当前连接的wifi状态:', res);
    })
  },
  contact:function(res){
    console.log("客服消息回调",res);
  },
  yanZhengInput: function (e) {
    this.setData({
      yanzheng: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      linPhone: e.detail.value
    })
  },
  yanzhengBtn: function () {
    // console.log(app.globalData.userId);
    var getChange = this.data.getChange
    var n = this.data.time;
    var that = this;
    var phone = this.data.linPhone;
    console.log(phone)
    if (!util.isphone(phone)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 1000
      })
    } else {
      if (getChange) {
        this.setData({
          getChange: false
        })
        var time = setInterval(function () {
          var str = '(' + n + ')' + '重新获取'
          that.setData({
            getText: str
          })
          if (n <= 0) {
            that.setData({
              getChange: true,
              getText: '重新获取',
              time: n
            })
            clearInterval(time);
          }
          n--;
        }, 1000);
        wx.request({
          url: 'https://www.didu86.com/Clothes-manager-web/codenum',
          data: {
            tel: phone,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var result = res.data.code;
            console.log("成功",result)
            that.setData({
              huozheng: result,
            })
          },
          fail: res=>{
            console.log('失败', res)
          }
        })
      }
    }
  },
  btnsure:function(){
    var that = this;
    var huozheng = this.data.huozheng
    var yanzheng = this.data.yanzheng
    if (yanzheng.length >= 4) {
      if (yanzheng == huozheng) {
        wx.showModal({
          content: '输入验证码成功',
          showCancel: false,
          success: function (res) {
          }
        })
      } else {
        wx.showModal({
          content: '输入验证码有误',
          showCancel: false,
          success: function (res) {
          }
        })
      }
    }
  },
  getLocationDetail:function(jd,wd){
    // 调用接口
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: wd,
        longitude: jd
      },
      success: function (res) {
        console.log('成功', res);
      },
      fail: function (res) {
        console.log('失败', res);
      },
      complete: function (res) {
        console.log('完成', res);
      }
    });
  }
})