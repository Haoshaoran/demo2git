var util = require('../../../utils/util.js')
Page({
  data: {
    srcurl: '',
    hasvideo: false,
    imagepath: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    // 自定义组件authordialog数据
    isHidden: true,
    titleMsg: " ",
    sureMsg: "",
    authorTitle: "",
    inputHidden: false,
    cancleBtn: false,
    inputPlaceHolder: "",
  },
  showToast:function(msg,icon){
    wx.showToast({
      title: msg,
      icon: icon,
      duration: 2000
    })
  },
  showDialog:function(){
    this.setData({
      isHidden: false,
      titleMsg: "请前往设置页打开用户信息授权",
      sureMsg: "去设置",
      authorTitle: "获取用户信息授权",
    })
  },
  sureBtn:function(){
    console.log("sureBtn");
    this.setData({
      isHidden: true,
    })
    wx.openSetting({
      success:res=>{
        var that = this;
        console.log("授权设置完毕 :")
        this.saveImag(this.data.imagepath, true);
      }
    })
  },
  saveImag: function (path, isSetBack) {
    var that = this;
    var hasData = wx.getStorageSync("writePhotosAlbum");
    var storage=wx.getStorageInfoSync();
    console.log("storage",storage);
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum'] && !isSetBack && hasData) {//授权页面返回还没有授权则不弹出,第一次微信授权拒绝后要求弹出
        // debugger;
          that.showDialog();
        }else{
          var that2=that;
          wx.saveImageToPhotosAlbum({
            filePath: path,
            success: res => {
              console.log("保存图片成功", res)
              that2.showToast("保存图片成功", "success");
            },
            fail: res => {
              // debugger;
              console.log("保存图片失败", res)
              that2.showToast("保存图片失败" + res.errMsg, "none");
              wx.clearStorageSync();
              if(!hasData){
                that2.showDialog();
              }
            },
            complete: function (res) {
              wx.setStorageSync("writePhotosAlbum", "1");
              console.log("保存图片完成", res)
             },
          })
        }
      },
      complete:function(){
       
      }
    })
  },
  onMyEvent: function (e) {
    var that = this;
    // console.log("授权设置完毕 :", e)
    that.setData({
      isHidden: true,
      // inputHidden: false
    })
    this.saveImag(this.data.imagepath,true);
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  downloadFile: function (e) {
    wx.downloadFile({
      url: 'http://128.0.19.12:8080/12h888piCneY.mp4', //仅为示例，并非真实的资源
      success: res => {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        // debugger; 
        if (res.statusCode === 200) {
          console.log(res)
          this.setData({
            srcurl: res.tempFilePath,
            hasvideo: true
          })
          console.log('下载成功');
          this.videoCtx = wx.createVideoContext('myVideo', this);
          this.videoCtx.play();
        } else {

        }
      },
      fail: function () {
        debugger;
        console.log('fail');
      }
    })
  },
  play: function (e) {
    this.videoCtx = wx.createVideoContext('myVideo', this);
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
  downloadImage: function () {
    var that=this;
    // debugger;
    const downloadTask=wx.downloadFile({
      url: 'https://p3.pstatp.com/weili/l/238507161885606259.webp',
      success: res => {
        if (res.statusCode === 200) {
          this.showToast("成功","success");
          console.log('下载成功', res)
          var path = res.tempFilePath;
          this.setData({
            imagepath: res.tempFilePath
          })
          this.saveImag(path,false);
        }else{
          this.showToast("失败啊"+res.statusCode, "none");
        }
      },
      fail: function (res) {
        that.showToast("失败"+res.errMsg, "none");
        console.log("下载失败",res)
      },
      complete: function (res) { 
        // that.showToast("完成", "none");
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      },
    })
    downloadTask.onProgressUpdate((res) => {
      this.showToast("下载中" + parseInt(res.totalBytesWritten / res.totalBytesExpectedToWrite * 100)+"%",'loading');
          })
  },
})

