var util = require('../../utils/util.js')
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcphoto:'',
    imagesrc:[],
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    focus: false,
    inputValue: '',
    phonemsg: 'phonemsg',
    srcurl: '',
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60rpx; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }],
    time: "00:00",
    data1: {
      name: 'john',
      age: '18',
      sex: 'boy'
    },
    textone: "第一个tabbar界面",
    id: 0,
    condition: Math.random() * 10 > 5,
    src: '/images/icon_API.png',
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    },
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,//显示指示点
    current_color: '#dc2f2f',
    indicator_color: '#4e8cff',
    autoplay: false,//自动播放
    interval: 3000,//播放间隔时间
    duration: 1000,//播放持续时间
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ]
  },
  downfile:function(){
  wx.navigateTo({
    url: '../api/downfile/downfile',
  })
  },
  chooseImage:function(){
    wx.chooseImage({
      count: 5,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success :res=> { 
        console.log("image",res)
        this.setData({
          imagesrc: res.tempFilePaths
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
 
  tap() {
    console.log('tap')
  },
  animationfinish: function (e) {
    console.log("swpie," + e.detail.current + ",动画播放结束")
  },
  bindChangepickerview: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  bindchange1: function (e) {
    // debugger;
    console.log('current=' + e.detail.current);
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoCtx = wx.createVideoContext('myVideo', this);
    console.log("tabbarone onLoad" + "Math.E=" + Math.E + ",Math.LN10=" + Math.LN10 + ",Math.LN2=" + Math.LN2 +
      ",Math.LOG2E=" + Math.LOG2E + ",Math.LOG10E=" + Math.LOG10E + ",Math.PI=" + Math.PI + ",Math.SQRT2=" + Math.SQRT2
      + ",Math.SQRT1_2=" + Math.SQRT1_2);
  },
  clickText: function () {
    var model = JSON.stringify(this.data.data1);
    wx.navigateTo({
      url: '../index/index?model=' + model,
    })
  },
  longpress: function (e) {
    // debugger;
    console.log('presslong' + e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('tabbarone onReady'+this.videoCtx)
    // this.videoCtx = wx.createVideoContext('myVideo')
    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('tabbarone onshow')
    // var res = wx.getSystemInfoSync()
    // wx.showToast({
    //   title: '成功' + res.SDKVersion,
    //   icon: 'none',
    //   duration: 10000
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('tabbarone onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('tabbarone onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('tabbarone onPull')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('tabbarone onReaachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('tabbarone onShare')
  },
  onTabItemTap: function () {
    console.log('tabarone onTabItemTap')
  },
  play: function (e) {
    this.videoCtx.play();
  },
  pause: function () {
    this.videoCtx.pause()
  },
  updatetime: function (e) {
    // debugger;
    this.setData({
      time: util.gettime(e.detail.currentTime)
    })
  },
  binderror: function (e) {
    debugger;
    console.log("play error," + e.msg)
  },
  bindfullscreenchange: function (e) {

  },
  bindcontact:function(e){
    // debugger;
  console.log("客服消息回调");
  },
  bindgetphonenumber:function(e){
    var num = util.decryptData(e.detail.encryptedData,e.detail.iv);
    if(num=="")return;
    // debugger;
    console.log("获取手机号",num);
    this.setData({
      phonemsg:num.phoneNumber
    })
  },
  bindchange:function(e){
    debugger;
    var value=e.detail.value;
    var log='';
    for(var i=0;i<value.length;i++){
      log+=i+":"+value[i]+',';
    }
    console.log("checkbok change"+log);
  },
  // form表单
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos)
      //计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    //或者直接返回字符串,光标在最后边
    //return value.replace(/11/g,'2'),
  },
  gotoweb:function(e){
    wx.navigateTo({
      url: '../webview/webview',
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          srcphoto: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})