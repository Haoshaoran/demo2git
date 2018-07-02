Component({
  properties: {
   
    dialogHidden: {
      type: Boolean,
      value: true
    },
    animationData:{
      type:Object,
      value:{}
    }
   
  },
  data: {
    // 这里是一些组件内部数据
    inputValue: "",
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled' 
  },
  methods: {
    //添加购物车
    addCar: function () {
      console.log('shop--addCar')
      let openDetail =
        this.data.inputValue // detail对象，提供给事件监听函数
      this.triggerEvent('addCarEvent', openDetail)
    },
    hdialog:function(){
      console.log('shop--hiddendialog')
      let openDetail =
        this.data.inputValue // detail对象，提供给事件监听函数
      this.triggerEvent('hideDialogEvent', openDetail)
    },
    //确认购买
    buyshop: function () {
      console.log('shop--buyshop')
      var sureDetail =
        this.data.inputValue // detail对象，提供给事件监听函数
      this.triggerEvent('buyshopEvent', sureDetail)
    },
    /* 点击减号 */
    bindMinus: function () {
      var num = this.data.num;
      // 如果大于1时，才可以减  
      if (num > 1) {
        num--;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      // 将数值与状态写回  
      this.setData({
        num: num,
        minusStatus: minusStatus
      });
    },
    /* 点击加号 */
    bindPlus: function () {
      var num = this.data.num;
      // 不作过多考虑自增1  
      num++;
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      // 将数值与状态写回  
      this.setData({
        num: num,
        minusStatus: minusStatus
      });
    },
    /* 输入框事件 */
    bindManual: function (e) {
      var num = e.detail.value;
      // 将数值与状态写回  
      this.setData({
        num: num
      });
    } ,
    
  },
  created: function () {
    //在组件实例进入页面节点树时执行，注意此时不能调用 setData
    var canIUse = wx.canIUse('button.open-type.openSetting')
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