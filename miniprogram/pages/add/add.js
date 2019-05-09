// pages/add/add.js
var util = require('../../utils/util.js');
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    nvabarData: {
      showCapsule: 0, //1表示显示图标
      title: '记一下',
      time:'',    //时间
      date:''    //日期
    },
    height: app.globalData.height * 2 + 20,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime1(new Date());
    var date = util.formatTime2(new Date());
    this.setData({
      time: time,
      date: date
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  record:function() {

  }
})