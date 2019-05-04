const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //1表示显示图标
      title: '基础热量计算器'
    },
    height: app.globalData.height * 2 + 20,
    show: 0,
    result:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
submit:function(e){
  this.setData({
    show: 0,
    result: ''
  })
  console.log(e.detail.value)
  var h=e.detail.value.height
  var w=e.detail.value.weight
  var a=e.detail.value.age
  var res
  if(e.detail.value.sex=='女'){
    res=655+(9.6*w)+(1.7*h)-(4.7*a)
  }else{
    res=66+(13.7*w)+(5.0*h)-(6.8*a)
  }
  this.setData({
    'show':1,
    'result':res
  })
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})