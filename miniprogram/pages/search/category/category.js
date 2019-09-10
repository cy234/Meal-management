
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //1表示显示图标
      title: ''
    },
    inputVal: '',
    height: app.globalData.height * 2 + 20,
    array: [{
      Name: ''
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      inputVal: options.inputVal, //inputVal食物种类
    })
    that.dd();
  },
  dd: function() {
    var that = this;
    wx.cloud.init();
    const db = wx.cloud.database()
    db.collection('food').where({
      kind: that.data.inputVal
    }).get({
      success(res) {
        var i = 0;
        for (i = 0; i < res.data.length; i++) {
          var a = 'array[' + i + '].Name'
          that.setData({
            [a]: res.data[i].name
          })
        }
      },
    })
    wx.cloud.init();
  },
  goo: function(e) {
    var val;
    val = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/search/detail/detail?inputVal=' + val,
    })
  },
})