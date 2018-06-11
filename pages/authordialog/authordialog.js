// pages/authordialog.js
var util=require("../../utils/util.js")
Component({
  properties: {
    inputPlaceHalder: {
      type: String,
      value: ' ',
    },
    inputHidden: {
      type: Boolean,
      value: true
    },
    dialogHidden: {
      type: Boolean,
      value: true
    },
    authorTitle:{
      type:String,
      value:'',
    },
    sureMsg:{
      type:String,
      value:'',
    },
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    titleText: {
      type: String,
      value: '提示',
    },
    titleMsg: {
      type: String,
      value: ' ',
    },
    inputMsg: {
      type: String,
      value: '请输入你他妈想干嘛',
    },
    //确定
    determineBtn: {
      type: String,
      value: 'default value',
    },
    //取消
    cancleBtn: {
      type: Boolean,
      value: true,
    },
    canUse:{
      type:Boolean,
      value: util.compareVersion(wx.getSystemInfoSync().SDKVersion,'2.0.7')
    }
  },
  data: {
    // 这里是一些组件内部数据
    inputValue: "",
    onCancleClick: false,
  },
  methods: {
    // 输入值
    bindKeyInput: function (e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    // 这里是一个自定义方法,取消
    cancleBtn: function () {
      // Properties pro = new Properties();
      console.log("点击取消按钮")
      this.setData({
        dialogHidden: true,
      })
    },
    //去授权
    openBtn:function(){
      let openDetail =
      this.data.inputValue // detail对象，提供给事件监听函数
      this.triggerEvent('openevent', openDetail)
      this.setData({
        dialogHidden: true,
      })
    },
    //确定
    sureBtn: function() {
      var sureDetail =
      this.data.inputValue // detail对象，提供给事件监听函数
      this.triggerEvent('sureevent', sureDetail)
      this.setData({
        dialogHidden: true,
        inputValue: ""
      })
    },
    // 完成设置返回
    determineBtn: function () {
      var determineDetail =
      this.data.inputValue // detail对象，提供给事件监听函数
      this.triggerEvent('determineevent', determineDetail)
      this.setData({
        inputValue: ""
      })
    }
  },
  created: function () {
    //在组件实例进入页面节点树时执行，注意此时不能调用 setData
    var canIUse=wx.canIUse('button.open-type.openSetting')
    console.log("created", canIUse);
  },
  attached: function () {
    //在组件实例进入页面节点树时执行
    console.log("attached")
  },
  ready: function () {
    //在组件布局完成后执行，此时可以获取节点信息
    console.log("ready")
  },
  moved: function (res) {
    //在组件实例被移动到节点树另一个位置时执行
    console.log("moved")
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行<view class='wapper'>
    console.log("detached")
  },
})
