// pages/shop/shop.js
var util=require("../../utils/util.js")
var amapFile = require("../../libs/amap-wx.js");
var app = getApp();
var num=1;
var query = wx.createSelectorQuery();
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
    location:"获取地址",
    operatetype:0,
    key:"d29edb092fbe4eabb27aab5f84d56693",
    animationData: {}
  },
  getLocationClick: function () {
    this.data.operatetype=0;
    this.operatelocation(false, 0);
  },
  //isSetBack 是否为从授权页面返回;operatetype 0获取本地物理地址,1打开地图选择位置
  operatelocation: function (isSetBack,operatetype) {
    var that = this;
    var hasData = wx.getStorageSync("userLocation");
    var storage = wx.getStorageInfoSync();
    console.log("storage", storage);
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation'] && !isSetBack && hasData) {//授权页面返回还没有授权则不弹出,第一次微信授权拒绝后要求弹出
          // debugger;
          that.showDialog();
        } else {
          // debugger;
          if(operatetype==0){
            that.getlocationInfo(hasData)
          }else{
            that.chooselocation(hasData)
          }
        }
      },
      complete: function () {

      }
    })
  },
  //获取本地地址并打开
  getlocationInfo:function(hasData){
    wx.showLoading({
      title: '加载中',
    });
    let that=this
    wx.getLocation({
      // type: "gcj02 ",//可用于wx.openLocation的坐标
      altitude: true,
      success: function (res) {
        console.log("获取地址成功", res)
        let jd = res.longitude;//经度
        let wd = res.latitude;//纬度
        let longitudes = jd > 0 ? "东经" + Math.abs(jd) : "西经" + Math.abs(jd)
        let latitude = wd > 0 ? "北纬" + Math.abs(wd) : "南纬" + Math.abs(wd)
        that.setData({
          location: longitudes + latitude
        })
        that.openlocation(jd, wd);
      },
      fail: function (res) {
        console.log("获取地址失败", res)
        that.showToast("获取地址失败"+res,"none");
        if (!hasData) {
          that.showDialog();
        }
      },
      complete: function (res) {
        wx.setStorageSync("userLocation", "1");
        console.log("获取地址完成", res)
        wx.hideLoading()
      },
    })
  },
  showDialog: function () {
    this.setData({
      isHidden: false,
      titleMsg: "请前往设置页打开用户信息授权",
      sureMsg: "去设置",
      authorTitle: "获取地理位置授权",
    })
  },
  sureBtn: function () {
    console.log("sureBtn");
    this.setData({
      isHidden: true,
    })
    var version=wx.getSystemInfoSync().SDKVersion;
    console.log("version=",version);
    if (!util.compareVersion(version,"2.0.7")) {
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
  onMyEvent: function (e) {
    // console.log("授权设置完毕 :", e)
    this.setData({
      isHidden: true,
    })
    this.operatelocation(true, this.data.operatetype);
  },
  //​使用微信内置地图查看位置。wx.openLocation
  openlocation: function (longitudes, latitude){
    wx.openLocation({
      latitude: latitude,
      longitude: longitudes,
      success:res=>{
        console.log("查看地理位置成功",res)
      },
      fail:res=>{
        console.log("查看地理位置失败", res)
      }
    })

  },
  chooseLocationClick:function(){
    this.data.operatetype = 1;
    this.operatelocation(false, 1);
  },
//  打开地图选择位置。
  chooselocation: function (hasData){
    wx.showLoading({
      title: '加载中',
    });
    let that = this
   wx.chooseLocation({
     success: function(res) {
       console.log("选择地图位置成功",res);
     },
     fail:function(res){
       console.log("选择地图位置失败", res);
       if (!hasData) {
         that.showDialog();
       }
     },
      complete: function (res) {
       wx.hideLoading();
       wx.setStorageSync("userLocation", "1");
       console.log("选择地图完成", res)
     },
   })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    console.log("shop is onload")
    var that = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation

    animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  showToast: function (msg, icon) {
    wx.showToast({
      title: msg,
      icon: icon,
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //显示模拟弹窗  
  showModal: function () {
    wx.showModal({
      title: 'showModal',
      content: 'this is showModal'+"\n"+'hello world',
      showCancel:true,
      cancelText:'取消',
      cancelColor:'#0bb50b',
      confirmText:'确定',
      confirmColor:'#4e8cff',
      success:res=>{
        console.log("显示模拟窗成功")
      },
      fail:res=>{
        console.log("显示模拟窗失败")
      }
    })
  },
  // 显示操作菜单
  showoperamenu: function () {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        console.log("showActionsuccess",res)
      },
      fail: function (res) {
        console.log("showActionfail",res)
      }
    })
  },
  // 动态设置当前页面的标题。
  setNavigationBarTitle:function(){
    wx.setNavigationBarTitle({
      title: '商店bar',
      success:res=>{
        console.log("设置bar成功",res)
      },
      fail:res=>{
        console.log("设置bar失败", res)
      }
    })
  },
  //动态设置置顶栏文字内容,5s内调用多次会返回fail
  setTopBarText:function(){
    if (util.isfastclick(5000)){
      wx.showToast({
        title: '设置置顶栏API 5秒内只能调用一次,请稍后再试!',
        icon:"none"
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
      complete:res=>{
        console.log("设置topbar完成", res)
      }
    })
  },
  //在当前页面显示导航条加载动画
  showNavigationBarLoading:function(){
    wx.showNavigationBarLoading();
  },
  //隐藏导航条加载动画
  hideNavigationBarLoading:function(){
    wx.hideNavigationBarLoading()
  },
  //
  setNavigationBarColor:function(){
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
  setTabBarBadge:function(){
    wx.setTabBarBadge({
      index: 0,//tabBar的哪一项，从左边算起
      text: num++ + "",//文本，超过 3 个字符则显示成“…”
      success:res=>{},
      fail:res=>{},
      complete:res=>{}
    })
  },
  removeTabBarBadge:function(){
    wx.removeTabBarBadge({
      index: 0,//tabbar右上即使没有文本也会回调success
      success: res => { console.log("移除TabBarBadge成功", res) },
      fail: res => { console.log("移除TabBarBadge失败", res)},
      complete: res => { console.log("移除TabBarBadge完成", res),num=1}
    })
  },
  //显示 tabBar 某一项的右上角的红点
  showTabBarRedDot:function(){
    wx.showTabBarRedDot({
      index: 0,
      success: res => { },
      fail: res => { },
      complete: res => { }
    })
  },
  hideTabBarRedDot:function(){
    wx.hideTabBarRedDot({
      index: 0,
      success: res => { console.log("移除TabBarRedDot成功", res) },
      fail: res => { console.log("移除TabBarRedDot失败", res) },
      complete: res => { console.log("移除TabBarRedDot完成", res)}
    })
  },
  setTabBarStyle:function(){
    wx.setTabBarStyle({
      color: '',
      selectedColor: '',
      backgroundColor: '',
      borderStyle: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }, 
  //动画
  rotateAndScale: function () {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale: function () {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function () {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  },
  pageScrollTo:function(){
    wx.pageScrollTo({
      scrollTop: 457,
      duration: 3000
    })
  },
  getFields: function () {
    wx.createSelectorQuery().select('#btfield').fields({
      id:true,
      dataset: true,
      rect:true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY']
    }, function (res) {
      res.dataset    // 节点的dataset
      res.width      // 节点的宽度
      res.height     // 节点的高度
      res.scrollLeft // 节点的水平滚动位置
      res.scrollTop  // 节点的竖直滚动位置
      res.scrollX    // 节点 scroll-x 属性的当前值
      res.scrollY    // 节点 scroll-y 属性的当前值
      console.log("节点信息",res)//单位:px
    }).exec()
  },
  //起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
  chooseAddress:function(){
    wx.chooseAddress({
      success: function (res) {
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
})