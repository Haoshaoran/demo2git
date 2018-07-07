Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '果味', id: 'guowei' },
      { name: '蔬菜', id: 'shucai' },
      { name: '炒货', id: 'chaohuo' },
      { name: '点心', id: 'dianxin' },
      { name: '粗茶', id: 'cucha' },
      { name: '淡饭', id: 'danfan' }
    ],
    detail: [],
    curIndex: 0,
    isScroll:false,
    curIndex: 0,
    toView: 'tj'
  },
  switchTab:function(e){
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      console.log("类别",e)
      self.setData({
        toView: e.currentTarget.dataset.id,
        curIndex: e.currentTarget.dataset.index
      })
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  itemclick:function(res){
    console.log("itemclick",res)
    console.log("itemclick",res.currentTarget.dataset.thumb)
    console.log("itemclick", res.currentTarget.dataset.name)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    wx.request({
      url: 'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      success(res) {
        console.log("detail",res)
        self.setData({
          detail: res.data
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  
  }
})