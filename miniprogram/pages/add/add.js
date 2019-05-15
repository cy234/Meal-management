// pages/add/add.js
var util = require('../../utils/util.js');
const app = getApp();
var openid=""

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    nvabarData: {
      showCapsule: 0, //1表示显示图标
      title: '记一下',

    },
    userInfo:{},
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    height: app.globalData.height * 2 + 20,
    time: '', //时间
    nowdate:'',     //日期
    foodList:[]     //记录列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //授权登录
    var that=this;
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
     
      if (app.globalData.userInfo) {
        wx.navigateTo({
          url: '/pages/add/add'
        })
      }
      else {
        wx.showToast({
          title: '请先授权再使用',
          icon: 'none',
          duration: 2000
        })
      }
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        
        if (app.globalData.userInfo) {
          wx.navigateTo({
            url: '/pages/add/add'
          })
        }
        else {
          wx.showToast({
            title: '请先授权再使用',
            icon: 'none',
            duration: 2000
          })
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
         
        }
      })
    };
    
    //查询记录
    var time = util.formatTime1(new Date());
    var date = util.formatTime2(new Date());

    if (app.globalData.openid) {
      that.setData({
        openid: app.globalData.openid
      })
    };
   
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('user_meal').where({
      uid:'1'
    }).get({
      success(res){
        console.log(res.data);
        that.setData({
          foodList:res.data
        })
      }

    });

    that.setData({
      time: time,
      nowdate:date
    })
  },
  
  getUserInfo: function (e) {
    console.log('userInfo'+e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    
    if (app.globalData.userInfo){
      wx.navigateTo({
        url: '/pages/add/add'
      })
    }
    else{
      wx.showToast({
        title: '请先授权再使用',
        icon:'none',
        duration:2000
      })
    }
   
  },
  
  bindViewTap:function(){

    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/add/mark/mark'
      })
    }
    else {
      wx.showToast({
        title: '请先授权再使用',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})