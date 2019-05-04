const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //1表示显示图标
      title: 'BMI计算器'
    },
    height: app.globalData.height * 2 + 20,
    show:0,
    result:'',
    ideal:'',
    tip: '',
    tips:['羡慕！小仙女,魔鬼身材','小仙女看起来肉肉的，要均衡饮食哦','小仙女太瘦了，要均衡膳食，不要挑食哦','哥们，身材不错哦！','小伙子，要注意合理饮食哦，瘦点更加帅气！！','小伙子有点瘦，大小伙子挑啥食？'],
    
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
  submit: function (e) {
    this.setData({
      show: 0,
      result: '',
      ideal: '',
      tip:''
    })
    console.log(e.detail.value)
    var h2 = ((e.detail.value.height / 100) *(e.detail.value.height / 100))
    var res = Math.round(e.detail.value.weight / h2,1)
    var res2=Math.round(22*h2,0)
    var flag
    console.log(e.detail.value.sex=='女')
    if(e.detail.value.sex=='女'){
      if(res<18.5){flag=2}
        else if(res<24){flag=0}
        else if(res>=24){flag=1}
      }
    else 
    {
      if (res < 18.5) { flag = 5 }
      else if (res < 24) { flag = 3 }
      else if (res >= 24) { flag = 4}
    }
    console.log(flag)
    console.log(this.data.tips[flag])
    this.setData({
      'result':res,
      'ideal':res2,
      'tip':this.data.tips[flag],
      'show':1
    }

    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})